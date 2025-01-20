import type { User, MoodEntry, ForumPost, ForumReply, Appointment } from './types';

const API_BASE_URL = '/api';

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (userData: Partial<User>) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  logout: async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
  },
};

// Mood APIs
export const moodApi = {
  trackMood: async (mood: number, note?: string) => {
    const response = await fetch(`${API_BASE_URL}/mood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, note }),
    });
    return response.json();
  },

  getMoodHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/mood/history`);
    return response.json();
  },
};



// Forum APIs
export const forumApi = {
  getPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/forum/posts`);
    return response.json();
  },

  createPost: async (post: Partial<ForumPost>) => {
    const response = await fetch(`${API_BASE_URL}/forum/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  addReply: async (postId: string, reply: Partial<ForumReply>) => {
    const response = await fetch(`${API_BASE_URL}/forum/posts/${postId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reply),
    });
    return response.json();
  },
};

// Appointment APIs
export const appointmentApi = {
  getCounselors: async () => {
    const response = await fetch(`${API_BASE_URL}/counselors`);
    return response.json();
  },

  getAvailability: async (counselorId: string, date: string) => {
    const response = await fetch(
      `${API_BASE_URL}/counselors/${counselorId}/availability?date=${date}`
    );
    return response.json();
  },

  bookAppointment: async (appointment: Partial<Appointment>) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    return response.json();
  },
};

// Challenge APIs
export const challengeApi = {
  getChallenges: async () => {
    const response = await fetch(`${API_BASE_URL}/challenges`);
    return response.json();
  },

  startChallenge: async (challengeId: string) => {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/start`, {
      method: 'POST',
    });
    return response.json();
  },

  updateProgress: async (challengeId: string, taskId: string, completed: boolean) => {
    const response = await fetch(
      `${API_BASE_URL}/challenges/${challengeId}/tasks/${taskId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      }
    );
    return response.json();
  },
};

// Resource APIs
export const resourceApi = {
  getResources: async (type: 'article' | 'video' | 'exercise') => {
    const response = await fetch(`${API_BASE_URL}/resources?type=${type}`);
    return response.json();
  },

  updateProgress: async (resourceId: string, progress: number) => {
    const response = await fetch(`${API_BASE_URL}/resources/${resourceId}/progress`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress }),
    });
    return response.json();
  },
};