import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Zap, Music, Smile, Film } from 'lucide-react';
import { askVibraAI } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const SparkView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Get AI Response
    const response = await askVibraAI(textToSend);
    
    // Add AI Message
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: response };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const suggestions = [
    { icon: <Music size={16} />, text: "Moduma göre şarkı öner", prompt: "Şu an biraz melankoliğim ama enerjik hissetmek istiyorum. Bana Türkçe ve Yabancı karışık 3 şarkı önerir misin?" },
    { icon: <Film size={16} />, text: "Bu akşam ne izlesem?", prompt: "Bilim kurgu ve gerilim seven biriyim. Bu akşam izlemelik, beynimi yakacak bir film öner." },
    { icon: <Zap size={16} />, text: "Instagram biyografimi düzelt", prompt: "Adım Can, gezmeyi ve fotoğraf çekmeyi severim. Instagram profilim için havalı, kısa bir biyografi yazar mısın?" },
    { icon: <Smile size={16} />, text: "Bana bir şaka yap", prompt: "Beni güldürecek kısa ve zekice bir espri yap." },
  ];

  return (
    <div className="h-full bg-black flex flex-col relative pt-10 pb-24 overflow-hidden">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        </div>

        {/* Header */}
        <div className="text-center z-10 mb-4 shrink-0">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-vibra-neon to-cyan-400 inline-flex items-center gap-2">
                <Sparkles className="text-vibra-neon" fill="currentColor" /> VIBRA AI
            </h1>
            <p className="text-gray-400 text-xs tracking-widest mt-1">YAPAY ZEKA ASİSTANI</p>
        </div>

        {/* Chat Area / Central Orb */}
        <div className="flex-1 overflow-y-auto px-4 z-10 no-scrollbar relative">
            
            {messages.length === 0 ? (
                /* Empty State - The "Orb" */
                <div className="h-full flex flex-col items-center justify-center -mt-10">
                    <div className="relative w-48 h-48 mb-8 shrink-0">
                         {/* Core Orb */}
                         <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-vibra-neon blur-md ${loading ? 'animate-spin-slow' : 'animate-pulse'}`}></div>
                         <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center z-10">
                             <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-900 to-black border border-white/10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,255,157,0.2)]">
                                <Zap size={48} className={`text-vibra-neon ${loading ? 'animate-bounce' : ''}`} />
                             </div>
                         </div>
                         {/* Outer Rings */}
                         <div className="absolute -inset-4 border border-vibra-neon/20 rounded-full animate-spin-slow" style={{animationDuration: '10s'}}></div>
                         <div className="absolute -inset-8 border border-dashed border-vibra-neon/10 rounded-full animate-spin-reverse" style={{animationDuration: '15s'}}></div>
                    </div>
                    
                    <p className="text-gray-300 text-center max-w-xs mb-8 text-lg font-light">
                        Merhaba! Ben Vibra. <br/>
                        Senin için ne yapabilirim?
                    </p>

                    {/* Quick Chips */}
                    <div className="grid grid-cols-2 gap-3 w-full max-w-sm pb-10">
                        {suggestions.map((s, i) => (
                            <button 
                                key={i}
                                onClick={() => handleSend(s.prompt)}
                                className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-vibra-neon/50 transition-all p-3 rounded-2xl text-left flex items-center space-x-3 group active:scale-95"
                            >
                                <div className="p-2 bg-black rounded-full text-vibra-neon group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <span className="text-xs text-gray-300 font-medium group-hover:text-white">{s.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Chat History */
                <div className="space-y-6 pb-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-vibra-neon to-cyan-500 flex items-center justify-center mr-2 mt-2 shadow-[0_0_10px_rgba(0,255,157,0.4)]">
                                    <Sparkles size={14} className="text-black" fill="black" />
                                </div>
                            )}
                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-white text-black rounded-tr-none font-medium' 
                                : 'bg-gray-900 border border-white/10 text-gray-100 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-vibra-neon to-cyan-500 flex items-center justify-center mr-2 shadow-[0_0_10px_rgba(0,255,157,0.4)]">
                                <Sparkles size={14} className="text-black animate-spin" />
                            </div>
                            <div className="bg-gray-900 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-1">
                                <div className="w-2 h-2 bg-vibra-neon rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-vibra-neon rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-vibra-neon rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-[90px] left-0 right-0 px-4 z-20">
            <div className="glass-morphism rounded-[2rem] p-2 flex items-center shadow-2xl border-white/20">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Vibra'ya bir şeyler sor..." 
                    className="bg-transparent border-none outline-none text-white flex-1 px-4 py-2 placeholder-gray-500"
                    disabled={loading}
                />
                <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || loading}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        input.trim() 
                        ? 'bg-vibra-neon text-black hover:scale-105 shadow-[0_0_15px_rgba(185,251,192,0.5)]' 
                        : 'bg-white/10 text-gray-500'
                    }`}
                >
                    <Send size={20} className={input.trim() ? "translate-x-0.5" : ""} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default SparkView;