import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout.shared";
import {
  absoluteUrl,
  getHomeImageUrl,
  homeLinks,
  ogLocales,
} from "@/lib/shared";

import { LandingShell } from "./-components/landing-shell";
import { AdminShot } from "./-components/sections/admin-shot";
import { ApiNote, Closing, Footer } from "./-components/sections/closing";
import { Features } from "./-components/sections/features";
import { Hero } from "./-components/sections/hero";
import { ShareFlow } from "./-components/sections/share-flow";
import { StorageSetups } from "./-components/sections/storage-setups";
import { TearLine } from "./-components/tear-line";
import { getLandingText, shotLocale } from "./-landing-text";

// The landing page only arranges sections; each lives in -components/sections
// and takes its copy from -landing-text. HomeLayout renders the <main>.
const Home = () => {
  const { lang } = Route.useParams();
  const text = getLandingText(lang);
  const shots = shotLocale[lang] ?? "en";

  return (
    <LandingShell>
      <HomeLayout
        {...baseOptions(lang)}
        links={[
          { text: text.docs, url: `/${lang}/docs` },
          { text: text.apiReference, url: `/${lang}/docs/api` },
        ]}
        // Always dark here, so a light/dark switch would do nothing.
        themeSwitch={{ enabled: false }}
      >
        <div className="flex flex-1 flex-col">
          <Hero
            cta={text.getStarted}
            lang={lang}
            shots={shots}
            text={text.hero}
          />
          <TearLine />
          <ShareFlow shots={shots} text={text.flow} />
          <Features shots={shots} text={text.features} />
          <TearLine />
          <AdminShot lang={lang} shots={shots} text={text.admin} />
          <StorageSetups lang={lang} text={text.setups} />
          <ApiNote lang={lang} link={text.apiReference} text={text.api} />
          <Closing
            cta={text.getStarted}
            lang={lang}
            copied={text.hero.copied}
            copy={text.hero.copy}
            links={text.footer.links}
            text={text.closing}
          />
          <Footer lang={lang} text={text.footer} />
        </div>
      </HomeLayout>
    </LandingShell>
  );
};

export const Route = createFileRoute("/$lang/")({
  component: Home,
  head: ({ params }) => {
    const text = getLandingText(params.lang);
    const title = `tessera · ${text.hero.title}`;
    return {
      meta: [
        { title },
        { content: text.hero.lead, name: "description" },
        { content: title, property: "og:title" },
        { content: text.hero.lead, property: "og:description" },
        { content: absoluteUrl(`/${params.lang}`), property: "og:url" },
        { content: ogLocales[params.lang] ?? "en_US", property: "og:locale" },
        {
          content: absoluteUrl(getHomeImageUrl(params.lang)),
          property: "og:image",
        },
        { content: "summary_large_image", name: "twitter:card" },
      ],
      links: homeLinks(params.lang),
    };
  },
});
