import type { CollectionEntry } from "astro:content";

export interface ThemePostMeta {
  slug: string;
  title: string;
  date: Date;
  draft: boolean;
  tags: string[];
  description?: string;
}

export const toThemePost = (entry: CollectionEntry<"posts">): ThemePostMeta => ({
  slug: entry.slug,
  title: entry.data.title,
  date: entry.data.date,
  draft: entry.data.draft ?? false,
  tags: entry.data.tags ?? [],
  description: entry.data.excerpt ?? ""
});

export const toThemePosts = (entries: CollectionEntry<"posts">[]): ThemePostMeta[] =>
  entries.map(toThemePost);
