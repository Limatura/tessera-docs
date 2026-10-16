import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { Logo } from "@/components/logo";

import { i18n } from "./i18n";
import { appName, projectRepo } from "./shared";

export function baseOptions(
  lang: string = i18n.defaultLanguage
): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo />
          <span className="font-semibold">{appName}</span>
        </>
      ),
      url: `/${lang}`,
      transparentMode: "top",
    },
    // Default is light-dark only, no "follow system".
    themeSwitch: { mode: "light-dark-system" },
    githubUrl: projectRepo,
  };
}
