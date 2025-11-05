import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

const siteEnv = process.env.SITE_URL || "https://automationarchitech.com";
const canonicalHost = siteEnv.replace(/\/+$/, "");
const siteUrl = new URL(siteEnv);
const sitePath = siteUrl.pathname.replace(/\/$/, "");
const basePath =
  process.env.BASE_PATH ||
  `${sitePath}${sitePath.endsWith("/blog") ? "" : "/blog"}`.replace(/\/\/+/g, "/") ||
  "/blog";
const normalizedBase = basePath.startsWith("/") ? basePath : `/${basePath}`;

export default defineConfig({
  site: canonicalHost,
  base: normalizedBase,
  trailingSlash: "always",
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@/consts": fileURLToPath(new URL("./src/theme/consts.ts", import.meta.url)),
        "@": fileURLToPath(new URL("./node_modules/@aa/astro-yi/src", import.meta.url)),
        "~": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
