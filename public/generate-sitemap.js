// scripts/generate-sitemap.ts
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';

// Mock your dynamic blog slugs — replace with DB or CMS fetch
// const blogSlugs = ['how-to-code', 'vite-is-fast', 'gen-z-dev-vibes'];

const hostname = 'https://recodepush.com'; // change to your real domain

(async () => {
  const sitemap = new SitemapStream({ hostname });

  const blogSlugs = await fetch('https://cms.recodepush.com/api/v1/blog/bulk?limit=1000&page=1&filter[0]=deletedAt||isnull')
  .then(res => res.json())
  .then(data => data?.data?.map(post => post.slug));

  const writeStream = createWriteStream(path.resolve('public', 'sitemap.xml'));
  sitemap.pipe(writeStream);

  // Add static routes
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/blog', changefreq: 'daily' });

  // Add dynamic blog routes
  blogSlugs.forEach(slug => {
    sitemap.write({ url: `/blog/${slug}`, changefreq: 'weekly' });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('✅ Sitemap generated');
})();

// "build": "vite build && ts-node scripts/generate-sitemap.ts"
