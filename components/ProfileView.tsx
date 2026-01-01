import React, { useState } from 'react';
import { QrCode, Share, Hexagon, Zap, Palette, Trophy, Check } from 'lucide-react';

interface ProfileViewProps {
  setTheme: (primary: string, secondary: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ setTheme }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (navigator.vibrate) navigator.vibrate(20);
    setIsConnected(!isConnected);
  };
  
  const handleThemeChange = (mode: 'neon' | 'cyber' | 'void') => {
    if (navigator.vibrate) navigator.vibrate(10);
    const root = document.documentElement;
    if (mode === 'neon') {
        root.style.setProperty('--color-primary', '#b9fbc0'); // Green
        root.style.setProperty('--color-secondary', '#d60270'); // Pink
    } else if (mode === 'cyber') {
        root.style.setProperty('--color-primary', '#00f2ff'); // Cyan
        root.style.setProperty('--color-secondary', '#7000ff'); // Purple
    } else if (mode === 'void') {
        root.style.setProperty('--color-primary', '#ff0055'); // Red
        root.style.setProperty('--color-secondary', '#ffffff'); // White
    }
  };

  return (
    <div className="h-full w-full bg-black relative flex flex-col items-center pt-16 px-6 overflow-y-auto pb-32">
       
       {/* Background Glow */}
       <div className="absolute top-20 left-10 w-64 h-64 bg-vibra-laser rounded-full filter blur-[100px] opacity-20 animate-pulse pointer-events-none"></div>
       <div className="absolute bottom-20 right-10 w-64 h-64 bg-vibra-neon rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>

       {/* Top Actions */}
       <div className="w-full flex justify-between items-center mb-6 z-10">
           <button className="p-3 bg-white/5 rounded-full border border-white/10 active:scale-95 transition-transform hover:bg-white/10">
                <QrCode className="text-white" size={20} />
           </button>
           <button className="p-3 bg-white/5 rounded-full border border-white/10 active:scale-95 transition-transform hover:bg-white/10">
                <Share className="text-white" size={20} />
           </button>
       </div>

       {/* The Holo-Card */}
       <div className="w-full glass-morphism rounded-[2.5rem] p-6 relative z-10 border border-white/20 mb-8 overflow-hidden group shrink-0 transition-all hover:border-vibra-neon/30">
           {/* Scan Line Animation inside card */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10px] w-full animate-scan opacity-30 pointer-events-none"></div>
           
           {/* Avatar Area */}
           <div className="relative mx-auto w-32 h-32 mb-6">
               <div className="absolute inset-0 rounded-full border-2 border-dashed border-vibra-neon animate-spin-slow"></div>
               <div className="absolute -inset-2 rounded-full border border-vibra-laser opacity-50 animate-spin-reverse"></div>
               <img src="https://picsum.photos/id/64/200/200" className="w-full h-full rounded-full object-cover p-1.5" />
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-xs font-black font-mono px-3 py-1 rounded-full border border-vibra-neon text-vibra-neon shadow-[0_0_10px_var(--color-primary)]">
                   LVL 99
               </div>
           </div>

           {/* Info */}
           <div className="text-center mb-8">
               <h1 className="text-3xl font-black text-white tracking-tighter glitch-text" data-text="Vibra Kullanıcısı">Vibra Kullanıcısı</h1>
               <p className="text-vibra-neon font-mono text-sm mt-2 tracking-widest">@vibra_tr</p>
               <p className="text-gray-400 text-sm mt-4 px-2 leading-relaxed">Dijital Sanatçı 🎨 | Geleceği piksel piksel işliyoruz. | #cyberpunk</p>
           </div>

           {/* Stats Matrix */}
           <div className="grid grid-cols-3 gap-3 mb-6">
               <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/5 hover:border-vibra-neon/50 transition-colors">
                   <span className="block text-xl font-bold text-white">1.2K</span>
                   <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Takipçi</span>
               </div>
               <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/5 hover:border-vibra-neon/50 transition-colors">
                   <span className="block text-xl font-bold text-white">450</span>
                   <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Takip</span>
               </div>
               <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/5 hover:border-vibra-neon/50 transition-colors">
                   <span className="block text-xl font-bold text-white">9.9</span>
                   <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Vibe Puan</span>
               </div>
           </div>
           
           <button 
            onClick={handleConnect}
            className={`w-full py-4 rounded-xl font-black tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 active:scale-95 ${isConnected ? 'bg-white/10 text-white border border-white/20' : 'bg-gradient-to-r from-vibra-neon to-vibra-laser text-black shadow-lg shadow-vibra-neon/20'}`}
           >
                {isConnected ? <Check size={20} /> : <Zap size={20} fill={isConnected ? "transparent" : "black"} />}
                <span>{isConnected ? 'BAĞLANDI' : 'BAĞLANTI KUR'}</span>
           </button>
       </div>

       {/* Theme Shifter Section */}
       <div className="w-full mb-8 shrink-0">
            <h3 className="text-white font-bold flex items-center mb-4 text-sm tracking-wider">
                <Palette size={16} className="mr-2 text-vibra-neon" />
                SİSTEM TEMASI
            </h3>
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                <button onClick={() => handleThemeChange('neon')} className="flex-none w-24 h-16 rounded-2xl bg-gray-900 border border-[#b9fbc0] relative overflow-hidden group active:scale-95 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black to-[#b9fbc0] opacity-20"></div>
                    <span className="relative z-10 text-[#b9fbc0] font-bold text-xs">NEON</span>
                </button>
                <button onClick={() => handleThemeChange('cyber')} className="flex-none w-24 h-16 rounded-2xl bg-gray-900 border border-[#00f2ff] relative overflow-hidden group active:scale-95 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black to-[#00f2ff] opacity-20"></div>
                    <span className="relative z-10 text-[#00f2ff] font-bold text-xs">CYBER</span>
                </button>
                <button onClick={() => handleThemeChange('void')} className="flex-none w-24 h-16 rounded-2xl bg-gray-900 border border-[#ff0055] relative overflow-hidden group active:scale-95 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black to-[#ff0055] opacity-20"></div>
                    <span className="relative z-10 text-[#ff0055] font-bold text-xs">VOID</span>
                </button>
            </div>
       </div>

       {/* Badges / Achievements */}
       <div className="w-full shrink-0">
           <h3 className="text-white font-bold flex items-center mb-4 text-sm tracking-wider">
                <Trophy size={16} className="mr-2 text-yellow-500" />
                ROZETLER
           </h3>
           <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4,5,6,7,8].map(i => (
                   <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors active:scale-90">
                       <Hexagon size={24} className={i===1 ? "text-vibra-neon" : i===2 ? "text-vibra-laser" : "text-gray-600"} />
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

export default ProfileView;