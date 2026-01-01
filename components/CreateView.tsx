import React, { useState } from 'react';
import { Image as ImageIcon, X, Send, Sparkles } from 'lucide-react';
import { generateVibeCheck } from '../services/geminiService';

interface CreateViewProps {
  onCancel: () => void;
  onSubmit: (content: string, image?: string) => void;
}

const CreateView: React.FC<CreateViewProps> = ({ onCancel, onSubmit }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Simulate image selection
  const handleImageSelect = () => {
    // Random cyberpunk images for demo
    const images = [
      'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1000'
    ];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    setSelectedImage(randomImg);
  };

  const handleAiEnhance = async () => {
    if (!text) return;
    setIsAiLoading(true);
    const improved = await generateVibeCheck(text);
    setText(improved);
    setIsAiLoading(false);
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text, selectedImage || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-full duration-500">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button onClick={onCancel} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          <X size={24} className="text-white" />
        </button>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vibra-neon to-cyan-400">
          Yeni Vibe
        </h2>
        <button 
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`px-6 py-2 rounded-full font-bold transition-all ${text.trim() ? 'bg-vibra-neon text-black hover:scale-105 shadow-[0_0_15px_rgba(185,251,192,0.4)]' : 'bg-gray-800 text-gray-500'}`}
        >
          Paylaş
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Şu an ne düşünüyorsun? #future"
          className="w-full bg-transparent text-xl text-white placeholder-gray-500 border-none outline-none resize-none flex-1 font-light"
          autoFocus
        />

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="relative mt-4 mb-4 rounded-2xl overflow-hidden group border border-white/10 max-h-64">
            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-red-500/80 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Tools Bar */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center space-x-4">
          <button 
            onClick={handleImageSelect}
            className="flex items-center space-x-2 text-vibra-neon hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5"
          >
            <ImageIcon size={24} />
            <span className="text-sm font-medium">Medya Ekle</span>
          </button>

          <button 
            onClick={handleAiEnhance}
            disabled={isAiLoading || !text}
            className="flex items-center space-x-2 text-vibra-laser hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-vibra-laser/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            {isAiLoading ? <Sparkles size={24} className="animate-spin" /> : <Sparkles size={24} />}
            <span className="text-sm font-medium">AI ile Parlat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateView;
