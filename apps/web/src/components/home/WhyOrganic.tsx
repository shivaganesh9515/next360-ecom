'use client';

import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sprout, Recycle } from 'lucide-react';

const benefits = [
  {
    icon: Sprout,
    title: 'Farm Fresh',
    desc: 'Sourced directly from certified organic farms and local growers near you.',
    color: 'bg-green-50 text-primary',
  },
  {
    icon: ShieldCheck,
    title: 'Chemical Free',
    desc: 'No pesticides, no preservatives â€” just pure, honest, clean food.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    desc: 'Every product supports eco-friendly and regenerative farming practices.',
    color: 'bg-lime-50 text-lime-700',
  },
  {
    icon: Recycle,
    title: 'Eco Packaged',
    desc: 'Recyclable and compostable packaging, always â€” zero compromise.',
    color: 'bg-amber-50 text-earth',
  },
];

const WhyOrganic = () => {
  return (
    <section className="mt-14">
      <div className="text-center mb-8">
        <h2 className="gc-display text-2xl sm:text-[30px] leading-[0.95] text-text">
          Why Choose Organic?
        </h2>
        <p className="mt-2 text-muted text-sm font-semibold">
          Organic isn&apos;t just a label â€” it&apos;s a promise
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-[22px] border border-border bg-surface-muted px-5 py-7 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto`}>
              <item.icon size={26} />
            </div>
            <h3 className="gc-display text-base mt-4 text-text">{item.title}</h3>
            <p className="mt-2 text-muted text-sm font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyOrganic;
