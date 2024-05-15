import type { UserConfig } from "vitepress";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

export const vite: UserConfig["vite"] = {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    // Git Changelog
    GitChangelog({
      includeDirs: ["src/wiki/**/*.md"],
      repoURL: () => "https://github.com/zotero-chinese/wiki",
    }),
    GitChangelogMarkdownSection({
      exclude: (id) =>
        !id.match("src/wiki/") || id.endsWith("src/wiki/index.md"),
    }),
  ],
  // @ts-ignore
  ssr: {
    noExternal: [
      "element-plus",
      "highcharts",
      "highcharts-vue",
      "@highcharts/dashboards",
    ],
  },
};
