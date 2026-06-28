export type Category = 
  | 'food' 
  | 'business' 
  | 'bengaluru' 
  | 'puzzles' 
  | 'finance' 
  | 'other';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateUrl: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[]; // split into paragraphs/sections
  category: Category;
  image: string;
  readTime: string;
  date: string;
  author: Author;
  isPremium: boolean;
  likes: number;
  views: number;
  commentsCount: number;
  tags: string[];
  affiliateProducts?: AffiliateProduct[];
  isSponsored?: boolean;
  sponsorName?: string;
  scheduledTime?: string; // for scheduled posts
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  approved: boolean;
  likes: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: QuizQuestion[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewardPoints: number;
}

export interface EbookProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  rank: number;
}

export interface AdSetting {
  id: string;
  name: string;
  location: string;
  enabled: boolean;
  type: 'banner' | 'sidebar' | 'in-feed';
  earnings: number;
}
