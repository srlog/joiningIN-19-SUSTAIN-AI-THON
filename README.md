Easemind - A Mental Health Support Platform
Easemind is a one-stop mental health support platform, offering users resources, counseling services, and interactive aids to help them with their mental wellness journey.

Overview
Easemind offers holistic, comprehensive support for mental health:

Professional counseling services
Community forums for support
Educational resources 
Interactive challenges
Mood tracking 
Progress tracking 


# Website hosted link
https://easemind-ai.vercel.app/

## Workflow

**Overall Workflow**
![EaseMind_page-0001](https://github.com/user-attachments/assets/ae8049a1-63e8-4d84-841c-01a6f7d74590)

1. **User Journey**
   ```mermaid
   graph TD
     A[User Sign Up] --> B[Initial Assessment]
     B --> C[Personalized Dashboard]
     C --> D[Access Services]
     D --> E[Track Progress]
     E --> F[Complete Challenges]
     F --> G[Earn Rewards]
     G --> D
   ```

2. **System Architecture**
   ```mermaid
   graph LR
     A[Frontend React App] --> B[API Layer]
     B --> C[Authentication]
     B --> D[Resource Management]
     B --> E[Challenge System]
     B --> F[Appointment Booking]
     B --> G[Progress Tracking]
   ```

## Concept Map

```mermaid
mindmap
  root((Easemind))
    User Support
      Counseling
        Video Sessions
        Audio Sessions
        Chat Support
      Community Forum
        Discussions
        Peer Support
    Resources
      Articles
      Videos
      Exercises
    Progress Tracking
      Mood Tracking
      Challenge Progress
      Achievements
    Gamification
      Challenges
      Rewards
      Badges
```
## Output Snapshot

![image](https://github.com/user-attachments/assets/dd1f763c-6d2c-450a-9d54-bc7e06d7ecbb)
![image](https://github.com/user-attachments/assets/b360c39e-a880-409b-9efd-25b45b539c6b)
![image](https://github.com/user-attachments/assets/d37bcfc8-dc4c-48d9-a3b1-f85c3b58a8df)
![image](https://github.com/user-attachments/assets/fcd97347-a5d0-413a-adba-2009c75e8092)
![image](https://github.com/user-attachments/assets/aa5b03a0-25c4-4258-b930-37bbca436f19)
![image](https://github.com/user-attachments/assets/bd1f9469-75ef-4bd8-87be-57f2fdd91fdd)

## Workflow Snapshot
![image](https://github.com/user-attachments/assets/42496ef9-092e-4bc8-b795-0ea6e2776689)
![image](https://github.com/user-attachments/assets/6db52d56-7b7c-4bdc-87d1-eda689d0a81a)
![image](https://github.com/user-attachments/assets/815b7dd5-c3a3-49b8-bb68-7768d0ee236f)


## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Lucide Icons
- React Router DOM
- React Hook Form
- Zod
- Recharts

### Development Tools
- ESLint
- PostCSS
- Autoprefixer

## Novel Features
1. Intelligent Mood Tracking
- Visual Mood Tracking Interface
- Visualisation of Historical Mood Data
- Mood Trend Recognition

2. Gamified Challenges
- Progressively Challenging Levels
- Reward System
- Achievement Badges
- Task-Based Progress Tracking

3. Resource Personalisation
- Content Filtering, Based on the Levels of Difficulty
- Progress Tracking
- Multimedia Content Support

4. Community Integration
- Moderated Forums
- Anonymous Posting Option
- Peer Support System

## Solution Architecture 

The platform is built with a modular architecture focusing on:

1. **Core Modules**
   - Authentication & Authorization
   - User Management
   - Resource Management
   - Challenge System
   - Appointment Booking
   - Progress Tracking

2. **API Integration**
   ```typescript
   // Authentication API
   authApi: {
     login(email: string, password: string): Promise<User>
     signup(userData: Partial<User>): Promise<User>
   }

   // Counselor API
   counselorApi: {
     getCounselors(): Promise<Counselor[]>
     getAvailability(counselorId: string, date: string): Promise<TimeSlot[]>
   }

   // Resource API
   resourceApi: {
     getResources(): Promise<Resource[]>
     getResourcesByType(type: string): Promise<Resource[]>
   }

   // Challenge API
   challengeApi: {
     getChallenges(): Promise<Challenge[]>
     startChallenge(challengeId: string): Promise<Challenge>
     updateProgress(challengeId: string, taskId: string, completed: boolean): Promise<void>
   }
   ```

## Installation Guide

1. **Prerequisites**
   - Node.js 18+
   - npm or yarn

2. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/Easemind.git
   cd ease-mind
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the environment variables as needed.

## Running the Application

1. **Development Mode**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

## API Documentation

### Authentication API

```typescript
interface AuthAPI {
  login(email: string, password: string): Promise<{ user: User }>;
  signup(userData: Partial<User>): Promise<{ user: User }>;
}
```

### Counselor API

```typescript
interface CounselorAPI {
  getCounselors(): Promise<Counselor[]>;
  getCounselor(id: string): Promise<Counselor | undefined>;
  getAvailability(counselorId: string, date: string): Promise<TimeSlot[]>;
}
```

### Appointment API

```typescript
interface AppointmentAPI {
  getAppointments(): Promise<Appointment[]>;
  bookAppointment(appointment: Partial<Appointment>): Promise<Appointment>;
}
```

### Resource API

```typescript
interface ResourceAPI {
  getResources(): Promise<Resource[]>;
  getResourcesByType(type: 'article' | 'video' | 'exercise'): Promise<Resource[]>;
}
```

### Challenge API

```typescript
interface ChallengeAPI {
  getChallenges(): Promise<Challenge[]>;
  getChallengesByCategory(category: 'upcoming' | 'ongoing'): Promise<Challenge[]>;
  getChallenge(id: string): Promise<Challenge | undefined>;
  startChallenge(challengeId: string): Promise<Challenge>;
  updateProgress(challengeId: string, taskId: string, completed: boolean): Promise<void>;
  getUserProgress(userId: string): Promise<{ challengeId: string; progress: number }[]>;
  getRewards(userId: string): Promise<{ points: number; badges: string[] }>;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

