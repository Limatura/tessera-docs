import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { Suspense, use } from "react";

import { OpenAPIPage } from "@/components/api-page";
import { useMDXComponents } from "@/components/mdx";
import { docs } from "@/lib/docs";
import { baseOptions } from "@/lib/layout.shared";
import {
  absoluteUrl,
  encodeMarkdownUrl,
  getPageImageUrl,
  gitConfig,
} from "@/lib/shared";
import { source } from "@/lib/source";

const serverLoader = createServerFn({
  method: "GET",
})
  .validator((input: { slugs: string[]; lang: string }) => input)
  .handler(async ({ data: { slugs, lang } }) => {
    const page = source.getPage(slugs, lang);
    if (!page) {
      throw notFound();
    }

    const pageTree = await source.serializePageTree(source.getPageTree(lang));

    if (page.type === "openapi") {
      return {
        type: "openapi" as const,
        lang,
        title: page.data.title,
        url: page.url,
        imageUrl: getPageImageUrl(page).url,
        pageTree,
        props: page.data.getOpenAPIPageProps(),
      };
    }

    return {
      type: "docs" as const,
      lang,
      title: page.data.title,
      url: page.url,
      imageUrl: getPageImageUrl(page).url,
      description: page.data.description,
      path: page.path,
      markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
      pageTree,
    };
  });

const Content = ({
  path,
  markdownUrl,
}: {
  path: string;
  markdownUrl: string;
}) => {
  const page = docs.getPage(path);
  if (!page) {
    throw new Error(`unknown page: ${path}`);
  }

  const { toc } = use(page.load());
  const MdxBody = page.body;

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <div className="-mt-4 flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`}
        />
      </div>
      <DocsBody>
        <MdxBody components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
};

const Page = () => {
  const page = useFumadocsLoader(Route.useLoaderData());

  const content =
    page.type === "openapi" ? (
      <DocsPage full>
        <DocsTitle>{page.title}</DocsTitle>
        <DocsBody>
          <OpenAPIPage {...page.props} />
        </DocsBody>
      </DocsPage>
    ) : (
      <Content path={page.path} markdownUrl={page.markdownUrl} />
    );

  return (
    <DocsLayout {...baseOptions(page.lang)} tree={page.pageTree}>
      <Suspense>{content}</Suspense>
    </DocsLayout>
  );
};

// Typed by hand so the head does not feed back into the loader's inferred type.
type PageHead =
  | { title?: string; description?: string; url?: string; imageUrl?: string }
  | undefined;

export const Route = createFileRoute("/$lang/docs/$")({
  component: Page,
  head: (context: { loaderData?: unknown }) => {
    const page = context.loaderData as PageHead;
    if (!page?.title) {
      return { meta: [] };
    }
    return {
      meta: [
        { title: `${page.title} · tessera` },
        ...(page.description
          ? [
              { name: "description", content: page.description },
              { property: "og:description", content: page.description },
            ]
          : []),
        { property: "og:title", content: page.title },
        ...(page.imageUrl
          ? [
              { property: "og:image", content: absoluteUrl(page.imageUrl) },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
      ],
      links: page.url
        ? [{ rel: "canonical", href: absoluteUrl(page.url) }]
        : [],
    };
  },
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: { slugs, lang: params.lang } });
    // Only mdx pages have something to preload.
    if (data.type === "docs") {
      await docs.getPage(data.path)?.preload();
    }
    return data;
  },
});
