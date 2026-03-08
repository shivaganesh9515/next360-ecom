'use client';

import { m } from 'framer-motion';
import { Leaf, ShieldCheck, Sprout, Recycle } from 'lucide-react';
import { Marquee } from '@next360/ui';

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
    desc: 'No pesticides, no preservatives — just pure, honest, clean food.',
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
    desc: 'Recyclable and compostable packaging, always — zero compromise.',
    color: 'bg-amber-50 text-earth',
  },
];

const certificates = [
  'USDA Organic',
  'Non-GMO Project Verified',
  'Fair Trade Certified',
  'Eco-Cert',
  'Certified B Corp',
  'Regenerative Organic Certified',
  '100% Carbon Neutral'
];

const WhyOrganic = () => {
  return (
    <section className="mt-14 overflow-hidden overflow-x-hidden">
      <div className="text-center mb-8">
        <h2 className="gc-display text-2xl sm:text-[30px] leading-[0.95] text-text">
          Why Choose Organic?
        </h2>
        <p className="mt-2 text-muted text-sm font-semibold">
          Organic isn&apos;t just a label — it&apos;s a promise
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((item, i) => (
          <m.div
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
          </m.div>
        ))}
      </div>

      <div className="mt-24 mb-10 w-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <Marquee pauseOnHover repeat={4} className="[--duration:40s]">
          {certificates.map((cert) => (
             <div key={cert} className="px-8 py-3 bg-surface-muted/50 rounded-full border border-border flex items-center justify-center font-bold text-muted/60 text-sm whitespace-nowrap">
                 {cert}
             </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default WhyOrganic;
