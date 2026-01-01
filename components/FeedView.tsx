import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music2, Quote, Zap } from 'lucide-react';
import { Post } from '../types';

interface FeedViewProps {
  posts: Post[];
}

const FeedView: React.FC<FeedViewProps> = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showHeartOverlay, setShowHeartOverlay] = useState<string | null>(null);

  // Haptic Feedback Helper
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
      triggerHaptic();
    }
    setLikedPosts(newLiked);
  };

  const handleDoubleTap = (postId: string) => {
    if (!likedPosts.has(postId)) {
        handleLike(postId);
    }
    setShowHeartOverlay(postId);
    triggerHaptic();
    
    // Reset overlay after animation
    setTimeout(() => setShowHeartOverlay(null), 800);
  };

  return (
    <div className="snap-container bg-black">
      {/* Top Overlay Gradient for status bar area */}
      <div className="fixed top-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

      {posts.map((post, index) => {
        const hasImage = !!post.image;
        const isLiked = likedPosts.has(post.id);

        return (
          <div key={post.id} className="snap-child relative w-full h-full overflow-hidden flex flex-col justify-end">
            
            {/* BACKGROUND LAYER */}
            <div 
                className="absolute inset-0 z-0 active:scale-[0.98] transition-transform duration-200"
                onDoubleClick={() => handleDoubleTap(post.id)}
            >
               {hasImage ? (
                 <>
                   <img src={post.image} className="w-full h-full object-cover opacity-90" />
                   {/* Gradient overlay for readability */}
                   <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95" />
                 </>
               ) : (
                 /* Dynamic Gradient for Text-Only Posts */
                 <div className={`w-full h-full bg-gradient-to-br ${index % 3 === 0 ? 'from-purple-900 via-black to-blue-900' : index % 3 === 1 ? 'from-red-900 via-black to-orange-900' : 'from-emerald-900 via-black to-teal-900'} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-vibra-neon/5 blur-[100px] rounded-full animate-pulse-slow"></div>
                    <Quote className="absolute top-1/4 left-8 text-white/5 w-32 h-32" />
                 </div>
               )}
               
               {/* DOUBLE TAP HEART OVERLAY */}
               {showHeartOverlay === post.id && (
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 animate-in zoom-in duration-300 fade-out slide-out-to-top-10">
                       <Heart size={120} className="text-vibra-laser fill-vibra-laser drop-shadow-[0_0_20px_rgba(255,0,85,0.8)]" />
                   </div>
               )}
            </div>

            {/* CONTENT LAYER */}
            <div className={`relative z-20 px-4 pb-28 ${!hasImage ? 'h-full flex flex-col justify-center px-8 text-center' : ''} pointer-events-none`}>
               
               {/* User Info */}
               <div className={`flex items-center space-x-3 mb-4 pointer-events-auto ${!hasImage ? 'justify-center mb-8' : 'w-max px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10'}`}>
                  <img src={post.user.avatar} className="w-9 h-9 rounded-full border border-vibra-neon object-cover" />
                  <div className={!hasImage ? 'text-left' : ''}>
                    <span className="font-bold text-sm text-white block drop-shadow-md">{post.user.handle}</span>
                    {!hasImage && <span className="text-xs text-gray-400">{post.time} önce</span>}
                  </div>
                  {post.user.isVerified && <Zap size={14} className="text-blue-400 fill-blue-400" />}
               </div>

               {/* The Content Text */}
               <p className={`text-white drop-shadow-lg leading-relaxed pointer-events-auto ${!hasImage ? 'text-2xl font-bold tracking-tight' : 'text-lg font-light max-w-[85%]'}`}>
                  {post.content} 
               </p>
               
               {/* Hashtags */}
               <div className={`mt-2 ${!hasImage ? 'mt-6 flex justify-center gap-2' : ''}`}>
                 <span className="text-vibra-neon/90 font-medium drop-shadow-md">#vibra</span>
                 <span className="text-vibra-laser/90 font-medium ml-2 drop-shadow-md">#future</span>
               </div>

               {/* Audio Indicator */}
               {hasImage && (
                 <div className="flex items-center text-xs text-gray-300 space-x-2 mt-4 pointer-events-auto w-max">
                     <div className="p-1.5 bg-white/10 rounded-full backdrop-blur-sm">
                        <Music2 size={12} className="animate-spin-slow text-vibra-neon" />
                     </div>
                     <div className="h-4 overflow-hidden w-32">
                         <p className="animate-marquee whitespace-nowrap">Orijinal Ses - Vibra Mix 2024 • Trend Olanlar • </p>
                     </div>
                 </div>
               )}
            </div>

            {/* RIGHT ACTION BAR */}
            <div className="absolute bottom-32 right-3 flex flex-col items-center space-y-6 z-30 pointer-events-auto">
                <button 
                    onClick={() => handleLike(post.id)}
                    className="flex flex-col items-center group active:scale-90 transition-transform"
                >
                    <div className={`p-3 glass-morphism rounded-full transition-all duration-300 border border-white/10 ${isLiked ? 'bg-vibra-laser/20 border-vibra-laser/50' : 'bg-black/20'}`}>
                        <Heart size={26} className={`transition-colors duration-300 ${isLiked ? 'text-vibra-laser fill-vibra-laser' : 'text-white group-hover:text-vibra-laser'}`} />
                    </div>
                    <span className="text-xs font-bold mt-1 text-white/90 drop-shadow-md">{post.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <button className="flex flex-col items-center active:scale-90 transition-transform">
                    <div className="p-3 glass-morphism rounded-full bg-black/20 border border-white/10 group">
                        <MessageCircle size={26} className="text-white group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold mt-1 text-white/90 drop-shadow-md">{post.comments}</span>
                </button>

                <button className="p-3 glass-morphism rounded-full bg-black/20 border border-white/10 active:scale-90 transition-transform">
                    <Share2 size={24} className="text-vibra-neon" />
                </button>
                
                <button className="p-3 rounded-full opacity-60">
                    <MoreHorizontal size={24} className="text-white" />
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-black border-2 border-gray-600 flex items-center justify-center animate-spin-slow mt-4 shadow-lg">
                   <div className="w-3 h-3 bg-vibra-neon rounded-full box-shadow-[0_0_10px_var(--color-primary)]"></div>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedView;