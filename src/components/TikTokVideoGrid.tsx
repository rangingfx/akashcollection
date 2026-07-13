import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';

interface TikTokVideo {
  id: string;
  title: string;
  views: string;
  likes: string;
  coverImage: string;
  url: string;
  duration: string;
}

export default function TikTokVideoGrid() {
  // Curated list of popular articles corresponding to Akash Collection's unstitched lawn video content
  const videos: TikTokVideo[] = [
    {
      id: '1',
      title: 'Zamzam Luxury Lawn 3-Piece Unboxing & Fabric Feel 🌸',
      views: '45.2K',
      likes: '3.4K',
      coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80',
      url: 'https://www.tiktok.com/@akashcollection.pk',
      duration: '0:34'
    },
    {
      id: '2',
      title: 'Islamabad Store Walkthrough & New Festive Arrivals 🛍️',
      views: '88.1K',
      likes: '7.9K',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
      url: 'https://www.tiktok.com/@akashcollection.pk',
      duration: '0:58'
    },
    {
      id: '3',
      title: 'Digital Print Voile Dupatta Color Guarantee Check 🧪🎨',
      views: '32.7K',
      likes: '2.8K',
      coverImage: 'https://images.unsplash.com/photo-1524295981966-c447a170158d?w=500&q=80',
      url: 'https://www.tiktok.com/@akashcollection.pk',
      duration: '0:45'
    }
  ];

  return (
    <div className="space-y-4" id="tiktok-featured-videos-dock">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-widest text-pink-600 font-bold uppercase block">RECENT SHORTS & REELS</span>
        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="tiktok-videos-inner-grid">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-lg cursor-pointer"
            id={`tiktok-video-item-${video.id}`}
            onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
          >
            {/* Thumbnail Cover */}
            <img 
              src={video.coverImage} 
              alt={video.title} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              referrerPolicy="no-referrer"
            />

            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Floating Play Button Accent */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                whileHover={{ scale: 1.15 }}
                className="bg-pink-600 text-white p-3.5 rounded-full shadow-2xl shadow-pink-600/40 border border-pink-500/30 group-hover:bg-pink-500 transition-colors"
              >
                <Play size={18} className="fill-current text-white ml-0.5" />
              </motion.div>
            </div>

            {/* Stats Badge Top Right */}
            <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-sm border border-stone-800/60 rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold text-pink-400">
              {video.duration}
            </div>

            {/* Video Meta Info Bottom */}
            <div className="absolute bottom-0 inset-x-0 p-4 space-y-3 text-left">
              <h4 className="font-sans text-xs font-bold text-stone-100 leading-snug line-clamp-2">
                {video.title}
              </h4>

              {/* View/Likes Stats line */}
              <div className="flex items-center gap-3 text-[10px] font-mono text-stone-300 border-t border-stone-800/40 pt-2">
                <span className="flex items-center gap-1">
                  <Play size={11} className="text-pink-500" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={11} className="text-pink-500 fill-pink-500/10" />
                  {video.likes}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
