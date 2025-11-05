import {
  site as baseSite,
  config as baseConfig,
  categories as baseCategories,
  infoLinks as baseInfoLinks,
  donate as baseDonate,
  comment as baseComment,
  friendshipLinks as baseFriendshipLinks,
  analytics as baseAnalytics
} from "@aa/astro-yi/src/__original_consts";

const siteUrl = process.env.SITE_URL ?? "https://automationarchitech.com";
const siteUrlObject = new URL(siteUrl);
const sitePath = siteUrlObject.pathname.replace(/\/$/, "");
const derivedBaseUrl = sitePath === "/" ? "" : sitePath;

export const site = {
  ...baseSite,
  title: "Automation Architech",
  description:
    "Automation Architech insights on automation engineering, architecture, and resilient operations.",
  author: "Automation Architech",
  avatar: "/images/blog-avatar.svg",
  favicon: "/favicon.svg",
  url: siteUrl,
  baseUrl: derivedBaseUrl,
  motto: "Design. Automate. Deliver.",
  recentBlogSize: 3
};

export const config = {
  ...baseConfig,
  lang: "en"
};

export const categories = [
  {
    name: "Home",
    iconClass: "ri-home-4-line",
    href: "/",
    target: "_self"
  },
  {
    name: "Blog",
    iconClass: "ri-article-line",
    href: "/blog/",
    target: "_self"
  }
];

export const infoLinks = [
  {
    icon: "ri-github-fill",
    name: "GitHub",
    outlink: "https://github.com/illtellyouwhat"
  },
  {
    icon: "ri-rss-fill",
    name: "RSS",
    outlink: "/blog/rss.xml"
  }
];

export const donate = {
  ...baseDonate,
  enable: false
};

export const comment = {
  ...baseComment,
  enable: false
};

export const friendshipLinks = baseFriendshipLinks;

export const analytics = {
  ...baseAnalytics,
  enable: false,
  umamiConfig: {
    enable: false,
    id: "",
    url: ""
  },
  gaConfig: {
    enable: false,
    id: ""
  },
  busuanzi: false
};
