import { defineConfig } from 'tinacms';

// Tina edits the same Markdown files Astro reads. Fields here mirror
// src/content/config.ts: keep the two in step when you add a field.

const SERVICE_CATEGORIES = ['Core Creative', 'AI Services', 'Bundle', 'Core Service'];

const WORK_CATEGORIES = [
  'Ad Creative',
  'Brand Identity',
  'Web Design',
  'Social Media Creative',
  'Email Design',
  'Presentations',
  'Motion Design',
  'Print & Collateral',
  'Packaging & Merch',
  'AI-Enhanced Creative',
];

const slugify = (value?: string) =>
  (value || 'new-item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'service',
        label: 'Services',
        path: 'src/content/services',
        format: 'md',
        ui: { filename: { slugify: (v) => slugify(v?.title) } },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'tagline', label: 'Tagline', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'category', label: 'Category', required: true, options: SERVICE_CATEGORIES },
          { type: 'string', name: 'description', label: 'Meta description (search and social)', ui: { component: 'textarea' } },
          { type: 'image', name: 'heroImage', label: 'Hero image' },
          { type: 'string', name: 'icon', label: 'Icon name' },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'number', name: 'order', label: 'Sort order (lower shows first)' },
          { type: 'string', name: 'deliverables', label: 'Deliverables', list: true },
          {
            type: 'object',
            name: 'tiers',
            label: 'Pricing tiers',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Tier name', required: true },
              { type: 'string', name: 'price', label: 'Price (e.g. $4,500)', required: true },
              { type: 'string', name: 'turnaround', label: 'Turnaround (e.g. 2–3 weeks)', required: true },
            ],
          },
          { type: 'string', name: 'relatedProjects', label: 'Related case studies (file names without .md)', list: true },
          { type: 'rich-text', name: 'body', label: 'Page copy', isBody: true },
        ],
      },
      {
        name: 'work',
        label: 'Work (case studies)',
        path: 'src/content/work',
        format: 'md',
        ui: { filename: { slugify: (v) => slugify(v?.client) } },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'client', label: 'Client', required: true },
          { type: 'number', name: 'year', label: 'Year', required: true },
          { type: 'string', name: 'description', label: 'Meta description (search and social)', required: true, ui: { component: 'textarea' } },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'number', name: 'order', label: 'Sort order (lower shows first)' },
          { type: 'string', name: 'categories', label: 'Categories', list: true, options: WORK_CATEGORIES },
          { type: 'image', name: 'heroImage', label: 'Hero image', required: true },
          { type: 'image', name: 'thumbnailImage', label: 'Thumbnail', required: true },
          { type: 'image', name: 'gallery', label: 'Gallery', list: true },
          { type: 'string', name: 'challenge', label: 'The challenge', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'outcome', label: 'The outcome', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          { type: 'string', name: 'relatedServices', label: 'Related services (file names without .md)', list: true },
          { type: 'rich-text', name: 'body', label: 'Case study', isBody: true },
        ],
      },
    ],
  },
});
