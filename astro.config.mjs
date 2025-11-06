import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

const siteEnv = process.env.SITE_URL || "https://automationarchitech.com";
const siteUrl = new URL(siteEnv);
const repoBase = siteUrl.pathname.replace(/\/$/, "");
const canonicalHost = siteUrl.origin + (repoBase || "");
const normalizedBase = (() => {
  const override = process.env.BASE_PATH;
  if (override) {
    return override.startsWith("/") ? override : `/${override}`;
  }
  if (repoBase === "" || repoBase === "/") {
    return "/";
  }
  return repoBase;
})();

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
        "@aa/astro-yi/src/__original_consts": fileURLToPath(
          new URL("./node_modules/@aa/astro-yi/src/consts.ts", import.meta.url)
        ),
        "@aa/astro-yi/src/consts": fileURLToPath(new URL("./src/theme/consts.ts", import.meta.url)),
        "@": fileURLToPath(new URL("./node_modules/@aa/astro-yi/src", import.meta.url)),
        "~": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
