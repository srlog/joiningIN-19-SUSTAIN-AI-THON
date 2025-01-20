import type { User, MoodEntry, ForumPost, ForumReply, Appointment, Counselor, Challenge, Resource } from './types';

// Mock data
const mockCounselors: Counselor[] = [/* ... existing counselors ... */];

// Mock resources data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes and symptoms of anxiety disorders.',
    type: 'article',
    content: 'Comprehensive guide about anxiety disorders...',
    category: 'Mental Health',
    tags: ['anxiety', 'mental health', 'self-help'],
    author: 'Dr. Sarah Johnson',
    createdAt: new Date('2024-01-15'),
    difficulty: 'beginner',
  },
  {
    id: '2',
    title: 'Meditation for Beginners',
    description: 'A guided introduction to meditation practices.',
    type: 'video',
    content: 'https://example.com/meditation-video',
    category: 'Mindfulness',
    tags: ['meditation', 'mindfulness', 'relaxation'],
    author: 'Mark Williams',
    createdAt: new Date('2024-02-01'),
    duration: 15,
    difficulty: 'beginner',
  },
  {
    id: '3',
    title: 'Advanced Cognitive Behavioral Therapy Techniques',
    description: 'Learn advanced CBT techniques for managing thoughts.',
    type: 'article',
    content: 'Detailed guide on CBT techniques...',
    category: 'Therapy',
    tags: ['CBT', 'therapy', 'mental health'],
    author: 'Dr. Emily Chen',
    createdAt: new Date('2024-02-15'),
    difficulty: 'advanced',
  },
  {
    id: '4',
    title: 'Stress Management Workshop',
    description: 'Interactive workshop on managing daily stress.',
    type: 'video',
    content: 'https://example.com/stress-workshop',
    category: 'Stress Management',
    tags: ['stress', 'well-being', 'workshop'],
    author: 'Dr. Michael Brown',
    createdAt: new Date('2024-03-01'),
    duration: 45,
    difficulty: 'intermediate',
  },
  {
    id: '5',
    title: 'Daily Mindfulness Exercises',
    description: 'Quick and effective mindfulness exercises.',
    type: 'exercise',
    content: 'Step-by-step guide for mindfulness exercises...',
    category: 'Mindfulness',
    tags: ['mindfulness', 'exercises', 'daily practice'],
    author: 'Lisa Anderson',
    createdAt: new Date('2024-03-10'),
    duration: 10,
    difficulty: 'beginner',
  },
];

// Mock challenges data with upcoming and ongoing categories
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Meditation',
    description: 'Practice mindfulness meditation for 10 minutes each day',
    duration: 7,
    difficulty: 'easy',
    category: 'ongoing',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    tasks: [
      { id: 't1', challengeId: '1', title: 'Day 1 Meditation', description: '10-minute guided meditation', completed: true, order: 1 },
      { id: 't2', challengeId: '1', title: 'Day 2 Meditation', description: '10-minute guided meditation', completed: true, order: 2 },
      { id: 't3', challengeId: '1', title: 'Day 3 Meditation', description: '10-minute guided meditation', completed: false, order: 3 },
    ],
    rewards: {
      points: 100,
      badge: 'Mindfulness Master',
    },
  },
  {
    id: '2',
    title: 'Gratitude Journal',
    description: 'Write down three things youre grateful for each day',
    duration: 5,
    difficulty: 'easy',
    category: 'ongoing',
    startDate: new Date('2024-03-18'),
    endDate: new Date('2024-03-23'),
    tasks: [
      { id: 't4', challengeId: '2', title: 'Day 1 Journaling', description: 'Write three gratitudes', completed: true, order: 1 },
      { id: 't5', challengeId: '2', title: 'Day 2 Journaling', description: 'Write three gratitudes', completed: false, order: 2 },
      { id: 't6', challengeId: '2', title: 'Day 3 Journaling', description: 'Write three gratitudes', completed: false, order: 3 },
    ],
    rewards: {
      points: 75,
      badge: 'Gratitude Guru',
    },
  },
  {
    id: '3',
    title: 'Sleep Improvement Challenge',
    description: 'Develop better sleep habits over two weeks',
    duration: 14,
    difficulty: 'medium',
    category: 'upcoming',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-04-15'),
    tasks: [
      { id: 't7', challengeId: '3', title: 'Set Regular Sleep Schedule', description: 'Go to bed and wake up at the same time', completed: false, order: 1 },
      { id: 't8', challengeId: '3', title: 'Create Bedtime Routine', description: 'Develop a relaxing routine', completed: false, order: 2 },
      { id: 't9', challengeId: '3', title: 'Screen-Free Hour', description: 'No screens one hour before bed', completed: false, order: 3 },
    ],
    rewards: {
      points: 150,
      badge: 'Sleep Master',
    },
  },
  {
    id: '4',
    title: 'Social Connection Challenge',
    description: 'Strengthen your social bonds over one week',
    duration: 7,
    difficulty: 'easy',
    category: 'upcoming',
    startDate: new Date('2024-04-05'),
    endDate: new Date('2024-04-12'),
    tasks: [
      { id: 't10', challengeId: '4', title: 'Reach Out', description: 'Contact an old friend', completed: false, order: 1 },
      { id: 't11', challengeId: '4', title: 'Quality Time', description: 'Spend quality time with family', completed: false, order: 2 },
      { id: 't12', challengeId: '4', title: 'Group Activity', description: 'Join a group activity', completed: false, order: 3 },
    ],
    rewards: {
      points: 100,
      badge: 'Social Butterfly',
    },
  },
];

// APIs
export const resourceApi = {
  getResources: async (): Promise<Resource[]> => {
    return mockResources;
  },

  getResourcesByType: async (type: 'article' | 'video' | 'exercise'): Promise<Resource[]> => {
    return mockResources.filter(r => r.type === type);
  },
};

// Challenge APIs
export const challengeApi = {
  getChallenges: async (): Promise<Challenge[]> => {
    return mockChallenges;
  },

  getChallengesByCategory: async (category: 'upcoming' | 'ongoing'): Promise<Challenge[]> => {
    return mockChallenges.filter(c => c.category === category);
  },

  getChallenge: async (id: string): Promise<Challenge | undefined> => {
    return mockChallenges.find(c => c.id === id);
  },

  startChallenge: async (challengeId: string): Promise<Challenge> => {
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    challenge.category = 'ongoing';
    return challenge;
  },

  updateProgress: async (challengeId: string, taskId: string, completed: boolean): Promise<void> => {
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    const task = challenge.tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    task.completed = completed;
  },

  getUserProgress: async (userId: string): Promise<{ challengeId: string; progress: number }[]> => {
    return mockChallenges
      .filter(c => c.category === 'ongoing')
      .map(challenge => ({
        challengeId: challenge.id,
        progress: (challenge.tasks.filter(t => t.completed).length / challenge.tasks.length) * 100,
      }));
  },

  getRewards: async (userId: string): Promise<{ points: number; badges: string[] }> => {
    return {
      points: 275,
      badges: ['Mindfulness Master', 'Gratitude Guru'],
    };
  },
};

// Rest of the existing APIs...
export const authApi = {/* ... */};
export const counselorApi = {/* ... */};
export const appointmentApi = {/* ... */};