import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const canonicalHost = (process.env.SITE_URL || "https://automationarchitech.com").replace(/\/+$/, "");

export default defineConfig({
  site: canonicalHost,
  base: "/blog",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  output: "static"
});
