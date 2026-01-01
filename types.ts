export enum View {
  FEED = 'FEED',
  CHAT = 'CHAT',
  RADAR = 'RADAR', // Announcements/Events
  SPARK = 'SPARK', // AI Tool
  PROFILE = 'PROFILE',
  CREATE = 'CREATE' // New Post Creation
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export interface ChatPreview {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  time: string;
  isOnline: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'EVENT' | 'NEWS' | 'ALERT';
  description: string;
  date: string;
  image: string;
}
