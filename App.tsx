import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import FeedView from './components/FeedView';
import ChatView from './components/ChatView';
import RadarView from './components/RadarView';
import SparkView from './components/SparkView';
import ProfileView from './components/ProfileView';
import CreateView from './components/CreateView';
import RadioPlayer from './components/RadioPlayer';
import { View, Post } from './types';

// Moved Mock Data here for State Initialization
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    user: { id: 'u1', name: 'Melis Vibe', handle: '@melis', avatar: 'https://picsum.photos/id/64/100/100', isVerified: true },
    content: 'Gelecek burada. Teknoloji ve sanatın birleştiği o ince çizgideyiz. 🌌',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', 
    likes: 1240,
    comments: 85,
    time: '2d'
  },
  {
    id: '2',
    user: { id: 'u2', name: 'Cyber Düşünür', handle: '@felsefe_ai', avatar: 'https://picsum.photos/id/91/100/100' },
    content: 'Bazen sadece durup gökyüzüne bakmak, bin satır kod yazmaktan daha fazla ilham verir. Yaratıcılık boşlukta saklıdır.',
    likes: 3400,
    comments: 120,
    time: '4s'
  },
  {
    id: '3',
    user: { id: 'u3', name: 'Neon Gezgin', handle: '@gece_modu', avatar: 'https://picsum.photos/id/122/100/100' },
    content: 'Bu şehrin ışıkları hiç sönmüyor. ⚡️ #cyberpunk #istanbul',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    likes: 856,
    comments: 42,
    time: '5s'
  },
  {
    id: '4',
    user: { id: 'u4', name: 'Kod Art', handle: '@coder_art', avatar: 'https://picsum.photos/id/250/100/100' },
    content: 'Algoritmaların dansı. Bugün yeni bir yapay zeka modeli deniyorum.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000',
    likes: 543,
    comments: 12,
    time: '12s'
  },
  {
    id: '5',
    user: { id: 'u5', name: 'Müzik Kutusu', handle: '@retro_ses', avatar: 'https://picsum.photos/id/338/100/100' },
    content: 'Eski şarkıların ruhu, yeni dünyanın hızında kaybolmuyor mu sizce de? 🎵',
    likes: 2100,
    comments: 340,
    time: '20s'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.FEED);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        id: 'me',
        name: 'Vibra User',
        handle: '@vibra_tr',
        avatar: 'https://picsum.photos/id/64/200/200',
        isVerified: true
      },
      content: content,
      image: image,
      likes: 0,
      comments: 0,
      time: 'Şimdi'
    };
    
    // Add new post to the top
    setPosts([newPost, ...posts]);
    setCurrentView(View.FEED);
  };

  // Dummy function for now, logic handled inside ProfileView directly manipulating DOM
  const handleThemeSet = (p: string, s: string) => {};

  const renderView = () => {
    switch (currentView) {
      case View.FEED:
        return <FeedView posts={posts} />;
      case View.CHAT:
        return <ChatView />;
      case View.RADAR:
        return <RadarView />;
      case View.SPARK:
        return <SparkView />;
      case View.PROFILE:
        return <ProfileView setTheme={handleThemeSet} />;
      case View.CREATE:
        return (
          <CreateView 
            onCancel={() => setCurrentView(View.FEED)} 
            onSubmit={handleCreatePost} 
          />
        );
      default:
        return <FeedView posts={posts} />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden relative">
      
      {/* GLOBAL RADIO PLAYER - Always visible */}
      {currentView !== View.CREATE && <RadioPlayer />}

      <main className="h-screen w-full relative">
        {renderView()}
      </main>

      {/* Floating Navigation Dock (Hidden when creating post) */}
      {currentView !== View.CREATE && (
        <BottomNav currentView={currentView} onChange={setCurrentView} />
      )}
    </div>
  );
};

export default App;
