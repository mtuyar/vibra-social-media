import React, { useState } from 'react';
import { Home, MessageSquare, Radio, Hexagon, User, Plus } from 'lucide-react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onChange: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: View.FEED, icon: Home, label: 'Akış' },
    { id: View.RADAR, icon: Radio, label: 'Radar' },
    { id: 'CENTER', icon: Plus, label: 'Oluştur' }, // Action button
    { id: View.SPARK, icon: Hexagon, label: 'Asistan' },
    { id: View.PROFILE, icon: User, label: 'Kimlik' },
  ];

  return (
    <>
      {/* Floating Dock Container - Respects Home Indicator Area */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
        style={{ bottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
      >
        
        {/* The Morphing Dock */}
        <div 
          className={`
            glass-morphism transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isExpanded ? 'w-[340px] px-6 rounded-[3rem]' : 'w-16 px-0 rounded-full'}
            h-16 flex items-center justify-between overflow-hidden relative
          `}
        >
            {/* The Trigger (Collapsed State) */}
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-vibra-neon to-cyan-400 animate-pulse-slow shadow-[0_0_15px_rgba(185,251,192,0.6)]"></div>
            </div>

            {/* The Menu Items (Expanded State) */}
            <div className={`flex w-full justify-between items-center transition-opacity duration-500 ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}`}>
                {menuItems.map((item) => {
                    const isActive = currentView === item.id;
                    
                    if (item.id === 'CENTER') {
                        return (
                            <button 
                              key="center" 
                              onClick={() => {
                                onChange(View.CREATE);
                                setIsExpanded(false);
                              }}
                              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <Plus size={24} />
                            </button>
                        )
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onChange(item.id as View);
                            }}
                            className={`flex flex-col items-center justify-center w-10 h-10 transition-all ${isActive ? 'text-vibra-neon scale-110' : 'text-gray-400 hover:text-white'}`}
                        >
                            <item.icon 
                                size={22} 
                                strokeWidth={isActive ? 2.5 : 2}
                                className={isActive ? 'drop-shadow-[0_0_8px_rgba(185,251,192,0.8)]' : ''}
                            />
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Message Indicator (Floating Separate Bubble) */}
        {currentView !== View.CHAT && currentView !== View.CREATE && (
            <button 
                onClick={() => onChange(View.CHAT)}
                className="absolute -right-16 bottom-2 w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
                <MessageSquare size={20} />
                <span className="absolute top-2 right-3 w-2 h-2 bg-vibra-laser rounded-full animate-ping"></span>
            </button>
        )}
      </div>
      
      {/* Tap outside to close */}
      {isExpanded && <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)} />}
    </>
  );
};

export default BottomNav;