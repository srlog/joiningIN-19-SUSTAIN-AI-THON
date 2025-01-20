// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: number; // 1-5 scale
  note?: string;
  createdAt: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  counselorId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}