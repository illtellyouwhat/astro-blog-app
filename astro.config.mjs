import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

const canonicalHost = (process.env.SITE_URL || "https://automationarchitech.com").replace(/\/+$/, "");
const basePath = process.env.BASE_PATH || "/blog";

export default defineConfig({
  site: canonicalHost,
  base: basePath,
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
