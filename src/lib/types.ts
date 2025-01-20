// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  role: 'user' | 'counselor' | 'admin';
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
  };
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: number; // 1-5 scale
  note?: string;
  createdAt: Date;
  tags?: string[];
  activities?: string[];
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  category: string;
  tags: string[];
  likes: number;
  replies: ForumReply[];
  isAnonymous: boolean;
}

export interface ForumReply {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  isAnonymous: boolean;
  parentReplyId?: string;
}

export interface Counselor {
  id: string;
  userId: string;
  specializations: string[];
  education: string[];
  experience: number;
  bio: string;
  rating: number;
  availability: TimeSlot[];
  languages: string[];
  pricing: {
    hourlyRate: number;
    currency: string;
  };
}

export interface TimeSlot {
  id: string;
  counselorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  userId: string;
  counselorId: string;
  timeSlotId: string;
  date: Date;
  duration: number; // in minutes
  type: 'video' | 'audio' | 'chat';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
  feedback?: string;
  payment: {
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'refunded';
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  startDate: Date;
  endDate: Date;
  tasks: ChallengeTask[];
  rewards: {
    points: number;
    badge?: string;
  };
  prerequisites?: string[];
}

export interface ChallengeTask {
  id: string;
  challengeId: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'exercise';
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  duration?: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserProgress {
  id: string;
  userId: string;
  resourceId: string;
  progress: number; // percentage
  completed: boolean;
  lastAccessed: Date;
  timeSpent: number; // in minutes
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}