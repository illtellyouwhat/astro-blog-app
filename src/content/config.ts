import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    excerpt: z.string().optional(),
    hero: z.string().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional()
  })
});

export const collections = {
  posts
};
