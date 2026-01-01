import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Search, CheckCheck, Mic, Play } from 'lucide-react';
import { ChatPreview, ChatMessage } from '../types';

const MOCK_CHATS: ChatPreview[] = [
  { id: 'c1', user: { id: 'u2', name: 'Can Tekin', handle: '@cantekin', avatar: 'https://picsum.photos/id/91/100/100', isVerified: true }, lastMessage: 'Yarınki hackathon için kayıtlar açılmış!', unreadCount: 3, time: '14:30', isOnline: true },
  { id: 'c2', user: { id: 'u4', name: 'Kampüs Grubu', handle: '@grup_muhabbet', avatar: 'https://picsum.photos/id/111/100/100' }, lastMessage: 'Ahmet: Notları drive\'a yükledim arkadaşlar.', unreadCount: 0, time: '12:15', isOnline: false },
  { id: 'c3', user: { id: 'u3', name: 'Zeynep Su', handle: '@zeynoo', avatar: 'https://picsum.photos/id/65/100/100' }, lastMessage: 'Görüşürüz 👋', unreadCount: 0, time: 'Dün', isOnline: true },
  { id: 'c4', user: { id: 'u5', name: 'Mert Yılmaz', handle: '@merty', avatar: 'https://picsum.photos/id/338/100/100' }, lastMessage: 'Fotoğrafı beğendim, çok iyi çıkmış.', unreadCount: 1, time: 'Dün', isOnline: false },
];

const ChatView: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', senderId: 'u2', text: 'Selam! Naber? Proje ne durumda?', timestamp: new Date(Date.now() - 100000), isMe: false },
    { id: 'm2', senderId: 'me', text: 'İyidir, tasarım bitti sayılır. Sen naptın?', timestamp: new Date(Date.now() - 90000), isMe: true },
    { id: 'm3', senderId: 'u2', text: 'Ben de backend tarafını toparlıyorum. Yarınki hackathon için kayıtlar açılmış bu arada!', timestamp: new Date(Date.now() - 5000), isMe: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeChat]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    if(navigator.vibrate) navigator.vibrate(10); // Haptic

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date(),
      isMe: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate Reply
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            senderId: 'u2',
            text: 'Harika görünüyor! 🔥 Detayları konuşalım.',
            timestamp: new Date(),
            isMe: false
        }]);
        if(navigator.vibrate) navigator.vibrate([10, 50, 10]); // Double vibration for received message
    }, 2500);
  };

  // Chat List View
  if (!activeChat) {
    return (
      <div className="pt-20 pb-24 px-4 h-full bg-black overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Mesajlar</h1>
        
        {/* Search */}
        <div className="relative mb-6">
            <Search className="absolute left-4 top-3 text-gray-500" size={20} />
            <input 
                type="text" 
                placeholder="Sohbet veya kişi ara..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
        </div>

        {/* Online Users */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar mb-8 pb-2">
            {MOCK_CHATS.filter(c => c.isOnline).map(chat => (
                <div key={chat.id} className="flex flex-col items-center flex-shrink-0 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <img src={chat.user.avatar} className="w-14 h-14 rounded-full border-2 border-white/10 object-cover" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                    </div>
                    <span className="text-xs mt-2 text-gray-400">{chat.user.name.split(' ')[0]}</span>
                </div>
            ))}
        </div>

        {/* Chat List */}
        <div className="space-y-2 pb-10">
          {MOCK_CHATS.map((chat) => (
            <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className="flex items-center p-4 rounded-2xl active:bg-white/5 transition-colors cursor-pointer glass-morphism hover:bg-white/5 border-transparent active:scale-[0.98]"
            >
              <div className="relative mr-4 shrink-0">
                <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover" />
                {chat.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-vibra-card"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-white truncate">{chat.user.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                </div>
                <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-white font-semibold' : 'text-gray-400'}`}>
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="ml-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-[0_0_10px_#9333ea]">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Chat View
  const activeUser = MOCK_CHATS.find(c => c.id === activeChat)?.user;

  return (
    <div className="fixed inset-0 z-50 bg-vibra-dark flex flex-col bg-black">
      {/* Chat Header */}
      <div className="glass-morphism px-4 py-3 flex items-center justify-between border-b border-white/5 pt-12 shrink-0">
        <div className="flex items-center">
          <button onClick={() => setActiveChat(null)} className="mr-3 text-gray-300 hover:text-white p-2 -ml-2 rounded-full active:bg-white/10">
            <ArrowLeft size={24} />
          </button>
          <div className="relative">
             <img src={activeUser?.avatar} className="w-10 h-10 rounded-full object-cover" />
             {MOCK_CHATS.find(c => c.id === activeChat)?.isOnline && (
                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black shadow-[0_0_5px_#22c55e]"></div>
             )}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-sm text-white">{activeUser?.name}</h3>
            <span className="text-xs text-purple-400 font-medium">Yazıyor...</span>
          </div>
        </div>
        <div className="flex space-x-4 text-purple-400">
            <button className="active:scale-90 transition-transform"><Phone size={22} /></button>
            <button className="active:scale-90 transition-transform"><Video size={22} /></button>
            <MoreVertical size={22} className="text-gray-400"/>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-gray-900">
        
        {/* Fake Voice Message Example */}
        <div className="flex justify-start">
             <div className="bg-white/10 text-gray-100 rounded-2xl rounded-bl-none p-3 flex items-center space-x-3 min-w-[200px]">
                 <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center pl-0.5"><Play size={14} fill="black" /></button>
                 <div className="flex-1 flex items-center space-x-1 h-6">
                    {[3,6,4,2,7,4,3,6,8,4,2,5,3,6,4].map((h, i) => (
                        <div key={i} className="w-1 bg-vibra-neon rounded-full" style={{ height: `${h * 10}%` }}></div>
                    ))}
                 </div>
                 <span className="text-xs text-gray-400">0:14</span>
             </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[75%] rounded-2xl p-3 ${msg.isMe ? 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white rounded-br-none shadow-[0_5px_15px_rgba(147,51,234,0.3)]' : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 opacity-70`}>
                 <span className="text-[10px]">{msg.timestamp.getHours()}:{msg.timestamp.getMinutes().toString().padStart(2, '0')}</span>
                 {msg.isMe && <CheckCheck size={12} className="text-blue-300" />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
             <div className="flex justify-start">
                 <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-none p-4 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                 </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-white/5 pb-8 shrink-0">
        <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-purple-500 transition-colors">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Mesaj yaz..."
                    className="flex-1 bg-transparent text-white outline-none py-2 placeholder-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
            </div>
            {inputText.trim() ? (
                <button 
                    onClick={handleSend}
                    className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-600/30 active:scale-90 transition-transform"
                >
                    <Send size={20} className="ml-0.5" />
                </button>
            ) : (
                <button className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 active:scale-90 transition-transform active:bg-vibra-neon active:text-black">
                    <Mic size={22} />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;