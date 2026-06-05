import { defineCollection, z } from 'astro:content';

const tier = z.object({
  name: z.string(),
  price: z.string(),
  turnaround: z.string(),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.string(),
    heroImage: z.string().optional(),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    deliverables: z.array(z.string()).default([]),
    tiers: z.array(tier).default([]),
    relatedProjects: z.array(z.string()).default([]),
    description: z.string().optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    categories: z.array(z.string()).default([]),
    heroImage: z.string(),
    thumbnailImage: z.string(),
    gallery: z.array(z.string()).default([]),
    challenge: z.string(),
    outcome: z.string(),
    tags: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    description: z.string(),
  }),
});

export const collections = { services, work };
