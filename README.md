# Tessera Docs

<p align="center">
  <strong>Documentation for Tessera</strong><br />
  The self-hosted file courier for sharing files, notes, and links with a retrieval code.
</p>

<p align="center">
  <a href="https://github.com/Limatura/tessera">
    <img alt="Tessera stars" src="https://img.shields.io/github/stars/Limatura/tessera?style=flat-square&logo=github" />
  </a>
  <a href="https://github.com/Limatura/tessera-docs/commits/main">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/Limatura/tessera-docs/main?style=flat-square&logo=git" />
  </a>
  <a href="https://fumadocs.dev">
    <img alt="Fumadocs" src="https://img.shields.io/badge/Fumadocs-docs-2563EB?style=flat-square" />
  </a>
  <a href="https://tanstack.com/start">
    <img alt="TanStack Start" src="https://img.shields.io/badge/TanStack-Start-16A34A?style=flat-square" />
  </a>
  <a href="https://vite.dev">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-build-8B5CF6?style=flat-square&logo=vite" />
  </a>
</p>

This repository contains the documentation site for [Tessera](https://github.com/Limatura/tessera). It explains how to use and operate Tessera; implementation details and source-level design notes belong in the main repository.

Documentation is maintained in **English**, **日本語**, **繁體中文**, and **简体中文**.

## Contents

- [Getting started](#getting-started)
- [How the site is built](#how-the-site-is-built)
- [Repository layout](#repository-layout)
- [Localization](#localization)
- [Homepage screenshots](#homepage-screenshots)
- [API reference](#api-reference)
- [Writing documentation](#writing-documentation)
- [Validation](#validation)
- [License](#license)

## Getting started

### Requirements

- Node.js compatible with the versions required by the project dependencies
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000).

| Command            | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `pnpm dev`         | Start the local development server on port 4000 |
| `pnpm build`       | Build the production site into `.vercel/output` |
| `pnpm start`       | Preview the production build                    |
| `pnpm types:check` | Run the TypeScript type check                   |
| `pnpm lint`        | Run Oxlint                                      |
| `pnpm fmt`         | Format with Oxfmt                               |

## How the site is built

The site uses **Fumadocs** with **TanStack Start**, powered by **Vite**.

- **TanStack Start** provides the application and routing.
- **Fumadocs** provides the documentation UI and MDX integration.
- **Vite** drives development and production builds.
- **Fumadocs OpenAPI** generates API reference pages from the checked-in OpenAPI contract.

> [!IMPORTANT]
> This is a TanStack Start project, not a Next.js application. Routes live in `src/routes/`; do not apply Next.js-specific Fumadocs setup instructions without adapting them to this stack.

## Repository layout

```text
.
├── content/
│   └── docs/
│       ├── en/       # English documentation
│       ├── ja/       # Japanese documentation
│       ├── zh-TW/    # Traditional Chinese documentation
│       └── zh-CN/    # Simplified Chinese documentation
├── openapi/
│   └── tessera.json  # OpenAPI contract used to generate the API reference
├── public/
│   └── landing/      # Homepage screenshots of the real app, one folder per app locale
└── src/
    ├── routes/       # TanStack Start routes
    └── components/
        └── mdx.tsx   # Registered MDX components
```

The `(core)/meta.json` file in each locale controls the ordering of the core guide. API introduction pages live under each locale's `api/` section.

## Localization

Each language has its own URL prefix. For example:

- English: `/en/docs/shares`
- 日本語: `/ja/docs/shares`
- 繁體中文: `/zh-TW/docs/shares`
- 简体中文: `/zh-CN/docs/shares`

The unprefixed `/docs/*` paths redirect to English.

When changing user-facing documentation:

1. Update every locale in the same change.
2. Keep terminology and page structure consistent across translations.
3. Use locale-prefixed paths for internal documentation links.
4. Check that links point to pages that exist in the target locale.

## Homepage screenshots

The homepage shows screenshots of the real app, not redrawn components. They live in `public/landing/<locale>/` as WebP: the upload page, the result (also a wide one for the hero), the share page on desktop and on a phone, the admin dashboard, and three link-preview cards the server drew (`og-photo`, `og-locked`, `og-snippet`, fetched from `/s/<code>/og.png` with `site.language` set to the locale). The server cannot draw link previews in Simplified Chinese yet, so `zh-CN` reuses the `zh-TW` cards; everything else has its own set.

Retake them when the app's UI changes: run the current `main` image, switch to dark mode and the orange accent, upload a picture, and capture each of them in `en`, `ja`, `zh-TW` and `zh-CN`. A share page that previews an image spends a retrieval each time it is opened, so shoot it from a share with no download limit. The QR code in the result shots is swapped for one that opens `https://koimsurai.com` before capturing; keep that when retaking them.

## API reference

The API reference is generated at build time from `openapi/tessera.json`. This file is a copy of the contract in the main Tessera repository.

After updating the API contract in the main repository, refresh the copy from the documentation repository root:

```bash
cp ../tessera/openapi.json openapi/tessera.json
```

Review the resulting API reference after rebuilding. Avoid manually duplicating generated endpoint details in the guide: the guide explains behaviour, while the generated reference documents the contract.

## Writing documentation

Write for the person trying to complete a task or understand a behaviour.

- **Verify behaviour against source code.** Check configuration defaults in `config.rs` and runtime behaviour in the relevant handlers.
- **Explain outcomes, not just endpoints.** Describe what a user or operator should expect; leave exact request and schema details to the API reference.
- **Keep prose direct.** Prefer short sentences, consistent terminology, and concrete examples.
- **Make warnings actionable.** A callout should explain a specific consequence or decision, not repeat a generic reminder.
- **Keep translations in sync.** A documentation change is not complete until all supported locales are updated.

### MDX components

The components registered in `src/components/mdx.tsx` are available in MDX:

| Component   | Use                                           |
| ----------- | --------------------------------------------- |
| `Callout`   | Highlight an important note or consequence    |
| `Steps`     | Present a sequence of actions                 |
| `Files`     | Show file-oriented content                    |
| `Tabs`      | Group alternative instructions                |
| `TypeTable` | Present structured type information           |
| `Accordion` | Hide optional details until needed            |
| `Cards`     | Present grouped navigation or related content |
| `Mermaid`   | Render a diagram as SVG during the build      |

For Mermaid diagrams, use the registered `<Mermaid chart="..." />` component and put the diagram definition on its own line. Confirm the rendered output in the production build; do not assume an MDX component rendered correctly just because the build completed.

## Validation

Before submitting a documentation change, run:

```bash
pnpm build
pnpm types:check
pnpm lint
pnpm fmt:check
```

You can also check the generated HTML for component tags that were accidentally left as escaped text:

```bash
grep -o '&lt;/\?\(Callout\|Steps\|Files\|Tabs\|TypeTable\|Accordions\?\|Mermaid\)' \
  .vercel/output/static/*/docs/*/index.html
```

Any output may indicate a component name typo or an MDX component that was not processed. Inspect the affected page before merging.

## Related project

- **Tessera source code:** [github.com/Limatura/tessera](https://github.com/Limatura/tessera)
- **Reporting a security issue, or contributing to Tessera itself:** see [SECURITY.md](https://github.com/Limatura/tessera/blob/main/SECURITY.md) and [CONTRIBUTING.md](https://github.com/Limatura/tessera/blob/main/CONTRIBUTING.md) in the main repository.

## License

- The documentation under `content/` is licensed under [CC BY 4.0](LICENSE).
- The site's source code is licensed under the [MIT License](LICENSE-CODE).
- `openapi/tessera.json` is copied from the main repository and stays under its license, AGPL-3.0.
