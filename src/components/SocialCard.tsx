import React from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, Users, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SocialCard() {
  const socialMetrics = [
    {
      icon: <ThumbsUp className="text-blue-500 w-5 h-5" />,
      value: "50,000+",
      label: "Organic Likes",
      desc: "Our nationwide clothing community who loves our wholesale rates."
    },
    {
      icon: <Users className="text-teal-500 w-5 h-5" />,
      value: "100k+ Reach",
      label: "Monthly Visitors",
      desc: "Verified Pakistani lawn lovers browsing daily catalogs."
    },
    {
      icon: <Award className="text-amber-500 w-5 h-5" />,
      value: "100% Genuine",
      label: "FBR Registered",
      desc: "Akash Collection guarantees premium original lawn fabric components."
    }
  ];

  return (
    <div className="space-y-4" id="facebook-social-metrics-panel">
      {socialMetrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          whileHover={{ x: 4 }}
          className="bg-stone-50 border border-stone-200/50 hover:border-blue-500/30 hover:bg-stone-100/40 p-4 rounded-xl flex items-start gap-4 transition-all group"
          id={`social-metric-card-${idx}`}
        >
          <div className="bg-white p-2.5 rounded-lg border border-stone-200/40 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            {metric.icon}
          </div>
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-bold text-stone-900 tracking-tight">
                {metric.value}
              </span>
              <CheckCircle2 size={13} className="text-blue-500 fill-blue-50" />
            </div>
            <h4 className="font-serif text-xs font-bold text-stone-700 uppercase tracking-wide">
              {metric.label}
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
              {metric.desc}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Trust reassurance banner inside social card column */}
      <div className="p-4 bg-blue-50/40 border border-blue-100/50 rounded-xl flex items-start gap-3 text-left">
        <ThumbsUp size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-mono text-[9px] font-bold text-blue-700 tracking-wider uppercase block">GIVE US A THUMBS UP!</span>
          <p className="text-[10px] text-stone-600 font-sans leading-relaxed">
            Support a local FBR registered brand. Like and follow our official Facebook Page for live video announcements, real-time unstitched launch collections, and wholesale discounts.
          </p>
        </div>
      </div>
    </div>
  );
}
