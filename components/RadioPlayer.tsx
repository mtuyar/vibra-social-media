import React, { useState, useEffect } from 'react';
import { Disc, Play, Pause, SkipForward, Music } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Fake equalizer animation delay
  const bars = [1, 2, 3, 4, 5];

  return (
    <div 
      className={`fixed right-4 z-50 transition-all duration-300 ${isExpanded ? 'w-48' : 'w-12'} h-12`}
      style={{ top: 'calc(1rem + env(safe-area-inset-top))' }} // Respects the iPhone Notch
    >
      <div className={`
        relative w-full h-full glass-morphism rounded-full flex items-center overflow-hidden
        ${isPlaying ? 'border-vibra-neon' : 'border-white/20'}
      `}>
        
        {/* Collapsed State: Just the spinning disc */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center z-20 bg-black/50 rounded-full"
        >
          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-black border border-white/30 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
             <Disc size={16} className={isPlaying ? 'text-vibra-neon' : 'text-gray-400'} />
          </div>
        </button>

        {/* Expanded State: Controls & Visualizer */}
        <div 
            className={`flex-1 pl-12 pr-2 flex items-center justify-between transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="flex space-x-0.5 h-4 items-end mx-2">
                {bars.map((i) => (
                    <div 
                        key={i} 
                        className={`w-1 bg-vibra-neon rounded-t-sm ${isPlaying ? 'animate-equalizer' : 'h-1'}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>

            <div className="flex items-center space-x-1">
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:text-vibra-neon transition-colors">
                    {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                </button>
                <button className="p-1 hover:text-vibra-neon transition-colors">
                    <SkipForward size={14} />
                </button>
            </div>
        </div>

        {/* Background Glow */}
        {isPlaying && (
            <div className="absolute inset-0 bg-vibra-neon/10 animate-pulse pointer-events-none"></div>
        )}
      </div>
      
      {/* Track Name Popup */}
      {isExpanded && isPlaying && (
          <div className="absolute top-14 right-0 bg-black/80 backdrop-blur border border-vibra-neon/30 px-3 py-1 rounded-lg text-[10px] whitespace-nowrap text-vibra-neon animate-in fade-in slide-in-from-top-2">
              <span className="animate-pulse">●</span> CANLI: Cyberpunk Lo-Fi Radio
          </div>
      )}
    </div>
  );
};

export default RadioPlayer;