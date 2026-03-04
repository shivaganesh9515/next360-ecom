'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    slug: '5-benefits-of-organic-eating',
    title: '5 Surprising Benefits of Switching to Organic Eating',
    excerpt: 'Discover how organic food can improve your health, support local farmers, and help the environment.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
    date: 'Feb 28, 2026',
    category: 'Wellness',
  },
  {
    id: '2',
    slug: 'seasonal-organic-guide',
    title: 'Your Complete Guide to Seasonal Organic Produce',
    excerpt: 'Learn which organic fruits and vegetables are in season and how to get the best quality at fair prices.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
    date: 'Feb 22, 2026',
    category: 'Guides',
  },
  {
    id: '3',
    slug: 'organic-kitchen-essentials',
    title: '10 Organic Pantry Essentials Every Kitchen Needs',
    excerpt: 'Stock your kitchen with these must-have organic staples for healthy, delicious meals every day.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    date: 'Feb 15, 2026',
    category: 'Recipes',
  },
];

const BlogTeaser = () => {
  return (
    <section className="mt-14">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="gc-display text-2xl sm:text-[30px] leading-[0.95] text-text">
            From Our Blog
          </h2>
          <p className="mt-2 text-muted text-sm font-semibold">
            Organic living tips, recipes & wellness guides
          </p>
        </div>
        <Link href="/blog" className="gc-display text-[13px] text-primary hover:text-primary-light font-semibold whitespace-nowrap">
          Read All â†’
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-[22px] border border-border bg-surface-muted overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 gc-display text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-primary/90 text-white">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted font-medium mb-2">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
                <h3 className="gc-display text-sm leading-tight text-text line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-muted font-medium leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-primary">
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogTeaser;
