import React, { useState } from 'react';
import { MapPin, Users, Ticket } from 'lucide-react';
import { Announcement } from '../types';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Cyber Rave', category: 'EVENT', description: 'Şehrin altında gizli techno gecesi.', date: 'Bu Gece', image: 'https://images.unsplash.com/photo-1574391884720-385e97488863?q=80&w=1000' },
  { id: 'a2', title: 'Start-up Zirvesi', category: 'NEWS', description: 'Yatırımcılarla buluşma noktası.', date: 'Yarın', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000' },
  { id: 'a3', title: 'E-Spor Turnuvası', category: 'EVENT', description: 'League of Legends final maçı izleme etkinliği.', date: 'Hafta Sonu', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000' },
  { id: 'a4', title: 'Sokak Lezzetleri', category: 'NEWS', description: 'Kadıköy sahilinde yemek festivali.', date: 'Cuma', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000' },
  { id: 'a5', title: 'Retro Pazarı', category: 'EVENT', description: 'Vintage kıyafetler ve plaklar.', date: 'Pazar', image: 'https://images.unsplash.com/photo-1551532070-42af02f29ad2?q=80&w=1000' },
  { id: 'a6', title: 'Kodlama Kampı', category: 'EVENT', description: '48 saat aralıksız kodlama maratonu.', date: 'Haftaya', image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1000' },
];

const RadarView: React.FC = () => {
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());

  const handleJoin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(20);
    
    const newJoined = new Set(joinedEvents);
    if (newJoined.has(id)) {
        newJoined.delete(id);
    } else {
        newJoined.add(id);
    }
    setJoinedEvents(newJoined);
  };

  return (
    <div className="h-full w-full bg-black pt-20 px-4 relative overflow-y-auto pb-32">
        
        {/* Radar Animation Background - Fixed position so it stays while scrolling */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-vibra-neon/20 rounded-full opacity-30 pointer-events-none"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-vibra-neon/30 rounded-full opacity-40 pointer-events-none"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-vibra-neon/50 rounded-full opacity-50 pointer-events-none"></div>
        
        {/* Scanning Line */}
        <div className="fixed top-1/2 left-1/2 w-[300px] h-[300px] origin-top-left bg-gradient-to-r from-transparent to-vibra-neon/10 animate-scan pointer-events-none z-0"></div>

        <div className="relative z-10">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-vibra-neon to-cyan-400 mb-8 neon-text text-center sticky top-0 bg-black/50 backdrop-blur-sm py-2 z-20">
                AKTİF BÖLGELER
            </h1>

            <div className="grid grid-cols-1 gap-6">
                {MOCK_ANNOUNCEMENTS.map((item, idx) => {
                    const isJoined = joinedEvents.has(item.id);
                    return (
                        <div key={item.id} className={`glass-morphism p-1 rounded-3xl relative group active:scale-[0.98] transition-transform duration-200 border ${isJoined ? 'border-vibra-neon' : 'border-white/10'}`}>
                            <div className="bg-gray-900 rounded-[1.3rem] overflow-hidden flex h-36">
                                <div className="w-32 relative shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-vibra-neon/20 mix-blend-overlay"></div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono backdrop-blur-md">
                                        {0.8 + idx * 0.5} km
                                    </div>
                                </div>
                                <div className="flex-1 p-4 flex flex-col min-w-0 relative">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-white text-lg leading-tight truncate pr-2">{item.title}</h3>
                                        {idx === 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0 mt-1"></span>}
                                    </div>
                                    <p className="text-gray-400 text-xs mt-1 font-mono uppercase truncate">{item.description}</p>
                                    
                                    <div className="mt-2 flex items-center space-x-3 text-gray-500 text-xs">
                                        <div className="flex items-center"><Users size={12} className="mr-1"/> 124</div>
                                        <div className="flex items-center"><Ticket size={12} className="mr-1"/> ₺0</div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between">
                                      <span className="text-vibra-neon font-bold text-xs">{item.date}</span>
                                      <button 
                                        onClick={(e) => handleJoin(item.id, e)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isJoined ? 'bg-vibra-neon text-black shadow-[0_0_10px_var(--color-primary)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                      >
                                          {isJoined ? 'KATILDIN' : 'KATIL'}
                                      </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default RadarView;