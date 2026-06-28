import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Search, 
  Bell, 
  Send, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Heart, 
  Bookmark, 
  BookOpen, 
  CheckCircle2, 
  X,
  Mail,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

import { Category, Article, Comment, AdSetting, Quiz, UserAccount } from './types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_QUIZZES, 
  INITIAL_EBOOKS, 
  INITIAL_LEADERBOARD, 
  INITIAL_AD_SETTINGS, 
  INITIAL_COMMENTS 
} from './data';

import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';
import PuzzlesTab from './components/PuzzlesTab';
import FinanceCalculator from './components/FinanceCalculator';
import EcommerceTab from './components/EcommerceTab';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import { AboutUs, ContactUs, PrivacyPolicy, TermsConditions, Disclaimer } from './components/LegalPages';

export default function App() {
  // Global states with standard persistence in localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tadka_dark_mode');
    return saved ? saved === 'true' : false;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('tadka_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('tadka_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [adSettings, setAdSettings] = useState<AdSetting[]>(() => {
    const saved = localStorage.getItem('tadka_ad_settings');
    return saved ? JSON.parse(saved) : INITIAL_AD_SETTINGS;
  });

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_subscribers');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [likedArticleIds, setLikedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_liked_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('tadka_points');
    return saved ? parseInt(saved) : 100;
  });

  const [userTier, setUserTier] = useState<'Free' | 'Premium'>(() => {
    const saved = localStorage.getItem('tadka_user_tier');
    return saved ? (saved as 'Free' | 'Premium') : 'Free';
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('tadka_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_categories');
    return saved ? JSON.parse(saved) : ['food', 'business', 'bengaluru', 'puzzles', 'finance', 'other'];
  });

  const [tags, setTags] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_tags');
    return saved ? JSON.parse(saved) : ['Sambar', 'Bengaluru', 'AdSense', 'Spices', 'Idli', 'Filter Coffee', 'Restaurant', 'Investment'];
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('tadka_users');
    if (saved) return JSON.parse(saved);
    const initialUsers: UserAccount[] = [
      {
        id: 'user-1',
        name: 'Ravi Kumar',
        email: 'ravikumar870317@gmail.com',
        passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        role: 'Admin',
        tier: 'Premium',
        points: 1250,
        registeredAt: '2026-06-01T10:00:00Z'
      },
      {
        id: 'user-2',
        name: 'Amit Patel',
        email: 'amit@tadkaclub.com',
        passwordHash: 'f2d81a0270cd155c8112e522444391693e4933a362024b4247545b6db760e1d5',
        role: 'User',
        tier: 'Free',
        points: 180,
        registeredAt: '2026-06-15T12:30:00Z'
      },
      {
        id: 'user-3',
        name: 'Ananya Rao',
        email: 'ananya@tadkaclub.com',
        passwordHash: 'f2d81a0270cd155c8112e522444391693e4933a362024b4247545b6db760e1d5',
        role: 'User',
        tier: 'Premium',
        points: 620,
        registeredAt: '2026-06-20T14:45:00Z'
      }
    ];
    return initialUsers;
  });

  const [readingHistory, setReadingHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('tadka_reading_history');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Active Navigation states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Modal display states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterInputEmail, setNewsletterInputEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Authenticated state (Preloaded user Ravi based on system specs!)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('tadka_is_logged_in');
    return saved !== null ? saved === 'true' : true;
  });
  const [username, setUsername] = useState<string>(() => {
    const saved = localStorage.getItem('tadka_username');
    return saved !== null ? saved : 'Ravi Kumar';
  });
  const [loginEmail, setLoginEmail] = useState<string>(() => {
    const saved = localStorage.getItem('tadka_login_email');
    return saved !== null ? saved : 'ravikumar870317@gmail.com';
  });
  const [loginPassword, setLoginPassword] = useState('');

  const isAdmin = isLoggedIn && (
    loginEmail.toLowerCase() === 'ravikumar870317@gmail.com' || 
    loginEmail.toLowerCase() === 'admin@tadkaclub.com' ||
    loginEmail.toLowerCase().includes('admin')
  );

  // Save states to localStorage upon changes
  useEffect(() => {
    localStorage.setItem('tadka_is_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('tadka_username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('tadka_login_email', loginEmail);
  }, [loginEmail]);

  useEffect(() => {
    localStorage.setItem('tadka_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('tadka_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('tadka_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('tadka_ad_settings', JSON.stringify(adSettings));
  }, [adSettings]);

  useEffect(() => {
    localStorage.setItem('tadka_subscribers', JSON.stringify(newsletterSubscribers));
  }, [newsletterSubscribers]);

  useEffect(() => {
    localStorage.setItem('tadka_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('tadka_liked_ids', JSON.stringify(likedArticleIds));
  }, [likedArticleIds]);

  useEffect(() => {
    localStorage.setItem('tadka_points', String(userPoints));
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('tadka_user_tier', userTier);
  }, [userTier]);

  useEffect(() => {
    localStorage.setItem('tadka_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('tadka_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tadka_tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('tadka_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('tadka_reading_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  const handleAddQuiz = (newQuiz: Quiz) => {
    setQuizzes((prev) => [newQuiz, ...prev]);
  };

  // Auth Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      alert('Please fill out all credentials.');
      return;
    }
    const existingUser = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (existingUser) {
      setUsername(existingUser.name);
      setUserTier(existingUser.tier);
      setUserPoints(existingUser.points);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      alert(`Welcome back to Tadka Club, ${existingUser.name}!`);
    } else {
      const extractedUser = loginEmail.split('@')[0];
      const beautifulName = extractedUser.charAt(0).toUpperCase() + extractedUser.slice(1);
      setUsername(beautifulName);
      setUserTier('Free');
      setUserPoints(100);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      alert(`Welcome back to Tadka Club, ${beautifulName}!`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserTier('Free');
    setActiveCategory('all');
    setActiveArticle(null);
    alert('Logged out successfully.');
  };

  // Bookmark Toggle
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarks.includes(id)) {
      setBookmarks(prev => prev.filter(bId => bId !== id));
    } else {
      setBookmarks(prev => [...prev, id]);
    }
  };

  // Reactions Likes Toggle
  const handleToggleLike = (articleId: string) => {
    if (likedArticleIds.includes(articleId)) {
      setLikedArticleIds(prev => prev.filter(id => id !== articleId));
      setArticles(prev => prev.map(art => {
        if (art.id === articleId) {
          return { ...art, likes: Math.max(0, art.likes - 1) };
        }
        return art;
      }));
    } else {
      setLikedArticleIds(prev => [...prev, articleId]);
      setArticles(prev => prev.map(art => {
        if (art.id === articleId) {
          return { ...art, likes: art.likes + 1 };
        }
        return art;
      }));
      // reward loyalty points for participation!
      handleAddPoints(10);
    }
  };

  // Add loyalty rewards points
  const handleAddPoints = (amount: number) => {
    setUserPoints(pts => Math.max(0, pts + amount));
  };

  // Submit Comments
  const handleAddComment = (articleId: string, contentStr: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      author: isLoggedIn ? username : 'Anonymous Foodie',
      authorAvatar: isLoggedIn 
        ? '/Ravi.png' 
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop',
      content: contentStr,
      timestamp: 'Just now',
      approved: true, // Auto approved for immediate live preview satisfaction!
      likes: 0
    };

    setComments(prev => [newComment, ...prev]);
    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return { ...art, commentsCount: art.commentsCount + 1 };
      }
      return art;
    }));
  };

  const handleSelectArticle = (art: Article) => {
    // Increase views count dynamically
    setArticles(prev => prev.map(a => {
      if (a.id === art.id) {
        const updated = { ...a, views: (a.views || 0) + 1 };
        if (activeArticle && activeArticle.id === art.id) {
          setActiveArticle(updated);
        }
        return updated;
      }
      return a;
    }));

    // Add to history
    setReadingHistory(prev => {
      const filtered = prev.filter(id => id !== art.id);
      return [art.id, ...filtered];
    });

    setActiveArticle(art);
  };

  // Admin CMS handlers
  const handleAddArticle = (newArt: Article) => {
    setArticles(prev => [newArt, ...prev]);
  };

  const handleEditArticle = (updatedArt: Article) => {
    setArticles(prev => prev.map(art => art.id === updatedArt.id ? updatedArt : art));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  const handleEditQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(prev => prev.map(q => q.id === updatedQuiz.id ? updatedQuiz : q));
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const handleAddCategory = (cat: string) => {
    if (!categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
    }
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleUpdateUser = (id: string, updates: Partial<UserAccount>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const updated = { ...u, ...updates };
        if (updated.email === loginEmail) {
          if (updates.tier) setUserTier(updates.tier);
          if (updates.points !== undefined) setUserPoints(updates.points);
          if (updates.name) setUsername(updates.name);
        }
        return updated;
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleApproveComment = (commId: string) => {
    setComments(prev => prev.map(c => c.id === commId ? { ...c, approved: true } : c));
  };

  const handleDeleteComment = (commId: string) => {
    setComments(prev => prev.filter(c => c.id !== commId));
  };

  const handleToggleAd = (adId: string) => {
    setAdSettings(prev => prev.map(ad => ad.id === adId ? { ...ad, enabled: !ad.enabled } : ad));
  };

  // Newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInputEmail.trim() || !newsletterInputEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (newsletterSubscribers.includes(newsletterInputEmail)) {
      alert('This email is already subscribed to the Tadka newsletter!');
      return;
    }

    setNewsletterSubscribers(prev => [...prev, newsletterInputEmail]);
    setNewsletterSuccess(true);
    setNewsletterInputEmail('');
    // award subscription points
    handleAddPoints(50);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setShowNewsletterModal(false);
    }, 2500);
  };

  // Upgrade user tier to Premium
  const handleUpgradeTier = () => {
    setUserTier('Premium');
    alert('🎉 Welcome to Tadka Time Premium Club! Your account has been upgraded.');
  };

  // Filters articles list based on active category tabs and searches
  const getFilteredArticles = () => {
    let list = articles;

    // 1. category filter
    if (activeCategory === 'bookmarks') {
      list = articles.filter(art => bookmarks.includes(art.id));
    } else if (activeCategory !== 'all' && activeCategory !== 'admin' && activeCategory !== 'shop') {
      list = articles.filter(art => art.category === activeCategory);
    }

    // 2. search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(art => 
        art.title.toLowerCase().includes(q) || 
        art.excerpt.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const filteredArticles = getFilteredArticles();

  // Pick a "Featured" article for the hero layout (top most article)
  const featuredArticle = articles.find(art => !art.isPremium);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-100 font-sans" id="tadka-root">
      
      {/* Sticky Header component */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setActiveArticle(null); // Reset reading view when changing main tabs
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim() && (activeCategory === 'admin' || activeCategory === 'shop')) {
            setActiveCategory('all'); // force back to feed when searching
          }
        }}
        userPoints={userPoints}
        userTier={userTier}
        setShowLoginModal={setShowLoginModal}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        onOpenNewsletter={() => setShowNewsletterModal(true)}
        isAdmin={isAdmin}
      />

      {/* Main Core Section */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* ARTICLE FULL READING SCREEN */}
          {activeArticle ? (
            <ArticleView
              key="article-view"
              article={activeArticle}
              onBack={() => setActiveArticle(null)}
              isBookmarked={bookmarks.includes(activeArticle.id)}
              onToggleBookmark={handleToggleBookmark}
              userTier={userTier}
              onUpgradeTier={handleUpgradeTier}
              comments={comments}
              onAddComment={handleAddComment}
              onToggleLike={handleToggleLike}
              hasLiked={likedArticleIds.includes(activeArticle.id)}
              allArticles={articles}
              onSelectArticle={setActiveArticle}
              setActiveCategory={setActiveCategory}
            />
          ) : (
            <div key="portal-tab-content">
              {/* PUZZLES & QUIZ ARENA TAB */}
              {activeCategory === 'puzzles' && (
                <PuzzlesTab
                  quizzes={quizzes}
                  userPoints={userPoints}
                  onAddPoints={handleAddPoints}
                  leaderboard={INITIAL_LEADERBOARD}
                />
              )}

              {/* FINANCE & COMPOUND CALCULATOR TAB */}
              {activeCategory === 'finance' && (
                <FinanceCalculator />
              )}

              {/* DIGITAL PRODUCTS E-COMMERCE TAB */}
              {activeCategory === 'shop' && (
                <EcommerceTab
                  products={INITIAL_EBOOKS}
                  userPoints={userPoints}
                />
              )}

              {/* CMS CONTROL PANEL / ADMIN TAB */}
              {activeCategory === 'admin' && (
                <AdminPanel
                  articles={articles}
                  onAddArticle={handleAddArticle}
                  onEditArticle={handleEditArticle}
                  onDeleteArticle={handleDeleteArticle}
                  comments={comments}
                  onApproveComment={handleApproveComment}
                  onDeleteComment={handleDeleteComment}
                  adSettings={adSettings}
                  onToggleAd={handleToggleAd}
                  newsletterSubscribers={newsletterSubscribers}
                  quizzes={quizzes}
                  onAddQuiz={handleAddQuiz}
                  onEditQuiz={handleEditQuiz}
                  onDeleteQuiz={handleDeleteQuiz}
                  isAdmin={isAdmin}
                  onAdminUnlock={(email, name) => {
                    setLoginEmail(email);
                    setUsername(name);
                    setIsLoggedIn(true);
                  }}
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  tags={tags}
                  onAddTag={handleAddTag}
                  onDeleteTag={handleDeleteTag}
                  users={users}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                />
              )}

              {/* USER PROFILE & SAVED ARTICLES DASHBOARD TAB */}
              {activeCategory === 'dashboard' && (
                <UserDashboard
                  username={username}
                  loginEmail={loginEmail}
                  userTier={userTier}
                  userPoints={userPoints}
                  bookmarks={bookmarks}
                  likedArticleIds={likedArticleIds}
                  readingHistory={readingHistory}
                  articles={articles}
                  onUpdateProfile={(updates) => {
                    if (updates.name) setUsername(updates.name);
                    if (updates.email) setLoginEmail(updates.email);
                    if (updates.tier) setUserTier(updates.tier);
                    if (updates.points !== undefined) setUserPoints(updates.points);
                    
                    const currentUser = users.find(u => u.email === loginEmail);
                    if (currentUser) {
                      handleUpdateUser(currentUser.id, updates);
                    }
                  }}
                  onSelectArticle={handleSelectArticle}
                  onToggleBookmark={(id, e) => handleToggleBookmark(id, e)}
                  onToggleLike={handleToggleLike}
                  onClearReadingHistory={() => setReadingHistory([])}
                  onAddPoints={handleAddPoints}
                />
              )}

              {/* ABOUT US TAB */}
              {activeCategory === 'about' && (
                <AboutUs 
                  onBackToHome={() => setActiveCategory('all')} 
                  setActiveCategory={setActiveCategory} 
                />
              )}

              {/* CONTACT US TAB */}
              {activeCategory === 'contact' && (
                <ContactUs onBackToHome={() => setActiveCategory('all')} />
              )}

              {/* PRIVACY POLICY TAB */}
              {activeCategory === 'privacy' && (
                <PrivacyPolicy onBackToHome={() => setActiveCategory('all')} />
              )}

              {/* TERMS & CONDITIONS TAB */}
              {activeCategory === 'terms' && (
                <TermsConditions onBackToHome={() => setActiveCategory('all')} />
              )}

              {/* DISCLAIMER TAB */}
              {activeCategory === 'disclaimer' && (
                <Disclaimer onBackToHome={() => setActiveCategory('all')} />
              )}

              {/* ALL RECIPES & STORIES FEED TABS (Category default feed) */}
              {activeCategory !== 'puzzles' && 
               activeCategory !== 'finance' && 
               activeCategory !== 'shop' && 
               activeCategory !== 'admin' && 
               activeCategory !== 'dashboard' && 
               activeCategory !== 'about' && 
               activeCategory !== 'contact' && 
               activeCategory !== 'privacy' && 
               activeCategory !== 'terms' && 
               activeCategory !== 'disclaimer' && (
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                  
                  {/* Category Header text */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white capitalize">
                      {activeCategory === 'all' ? 'Trending Updates & Guides' : activeCategory === 'bookmarks' ? 'Your Bookmarked Stories' : `${activeCategory} Feed`}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      {activeCategory === 'all' 
                        ? 'Stay briefed on North Indian recipe guides, Bangalore business models, and local events.' 
                        : `Browse highly curated content filtered inside ${activeCategory} catalog.`}
                    </p>
                  </div>

                  {/* 1. HERO FEATURED ARTICLE (Rendered only on 'all' tab with empty search) */}
                  {activeCategory === 'all' && !searchQuery.trim() && featuredArticle && (
                    <div 
                      className="group relative mb-10 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-md transition hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950 flex flex-col lg:flex-row cursor-pointer"
                      onClick={() => handleSelectArticle(featuredArticle)}
                      id="hero-featured-block"
                    >
                      <div className="relative aspect-video lg:aspect-auto lg:w-1/2 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                        <img
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <span className="absolute left-4 top-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                          🔥 Editor\'s Pick
                        </span>
                      </div>

                      <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-orange-600 font-bold uppercase tracking-wider mb-3">
                            <span>🍲 {featuredArticle.category}</span>
                            <span>•</span>
                            <span className="text-neutral-400">{featuredArticle.readTime}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight group-hover:text-orange-600 transition">
                            {featuredArticle.title}
                          </h3>
                          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                            {featuredArticle.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={featuredArticle.author.avatar}
                              alt={featuredArticle.author.name}
                              referrerPolicy="no-referrer"
                              className="h-9 w-9 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{featuredArticle.author.name}</p>
                              <p className="text-[10px] text-neutral-400 font-medium">{featuredArticle.date}</p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Read Featured</span>
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. CORE ARTICLES GRID */}
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-16 border border-dashed rounded-3xl bg-white dark:bg-neutral-950 dark:border-neutral-800">
                      <HelpCircle className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white">No stories found</h4>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">We couldn\'t find any published records matching your search queries or bookmarks.</p>
                      <button
                        onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                        className="mt-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.map((art, idx) => (
                        <ArticleCard
                          key={art.id}
                          article={art}
                          onSelect={handleSelectArticle}
                          isBookmarked={bookmarks.includes(art.id)}
                          onToggleBookmark={handleToggleBookmark}
                          index={idx}
                        />
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER: Highly styled, detailed news layout footer */}
      <footer className="border-t bg-white dark:bg-neutral-950 dark:border-neutral-800 mt-16" id="tadka-footer">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white shadow-md">
                  <Flame className="h-5 w-5" />
                </div>
                <span className="text-base font-extrabold text-neutral-900 dark:text-white">Tadka Time</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                Tadka Time is a modern digital platform covering Food Blogs & Recipes, Restaurant Business Tips, Bengaluru Local News, Finance, and Quizzes. Founded by Ravi Kumar.
              </p>
              <div className="text-[11px] text-neutral-400 font-semibold font-sans">
                © 2026 Tadka Time. All Rights Reserved.
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-widest mb-4">Quick Links</h5>
              <ul className="space-y-2.5 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                <li>
                  <button onClick={() => { setActiveCategory('all'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('about'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('privacy'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('terms'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('disclaimer'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('contact'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-600 transition">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Social Column */}
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-widest mb-3">Contact Information</h5>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  Email: <a href="mailto:ravikumar870317@gmail.com" className="text-orange-600 hover:underline">ravikumar870317@gmail.com</a>
                </p>
              </div>

              <div>
                <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-widest mb-3">Follow Us</h5>
                <div className="flex flex-col gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  <a href="#facebook" className="hover:text-orange-600 transition flex items-center gap-1">🌐 Facebook</a>
                  <a href="#instagram" className="hover:text-orange-600 transition flex items-center gap-1">📸 Instagram</a>
                  <a href="#youtube" className="hover:text-orange-600 transition flex items-center gap-1">🎥 YouTube</a>
                  <a href="#x" className="hover:text-orange-600 transition flex items-center gap-1">🐦 X (Twitter)</a>
                  <a href="#linkedin" className="hover:text-orange-600 transition flex items-center gap-1">💼 LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <h5 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-widest flex items-center gap-1">
                <Bell className="h-3.5 w-3.5 text-orange-600" />
                <span>Join Tadka Club</span>
              </h5>
              <p className="text-xs text-neutral-400 leading-normal font-sans font-light">
                Sign up for weekly restaurant financial templates and secret Indian spice pairings. No spam.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="chef@example.com"
                  value={newsletterInputEmail}
                  onChange={(e) => setNewsletterInputEmail(e.target.value)}
                  className="flex-1 rounded-md border border-neutral-200 bg-neutral-50 py-1.5 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  <Send className="h-3 w-3" />
                  <span>Join</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </footer>

      {/* LOGIN MODAL OVERLAY */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border p-6 shadow-2xl dark:bg-neutral-950 dark:border-neutral-800">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleLoginSubmit}>
              <div className="text-center mb-6">
                <span className="bg-orange-500/15 text-orange-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase dark:bg-orange-950/40">Tadka Club Members</span>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white mt-2">Join Our Free Club</h3>
                <p className="text-xs text-neutral-400 mt-1">Unlock comments, reactions, and daily reward point trackers.</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., ravi@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 py-3 text-xs font-extrabold text-white hover:bg-orange-700 transition shadow-md shadow-orange-500/10 text-center"
              >
                Sign In / Join Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEWSLETTER POPUP MODAL */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border p-6 shadow-2xl dark:bg-neutral-950 dark:border-neutral-800 text-center">
            <button 
              onClick={() => setShowNewsletterModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>

            {newsletterSuccess ? (
              <div className="py-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">Subscription Successful!</h4>
                <p className="text-xs text-neutral-400 mt-1">We awarded you +50 points for signing up!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 shadow-inner">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>
                
                <h3 className="text-base font-black text-neutral-900 dark:text-white">Subscribe to Tadka Dispatch</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  Join 140+ hospitality owners and developers receiving weekly spreadsheets and exclusive recipe alerts.
                </p>

                <div className="my-5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterInputEmail}
                    onChange={(e) => setNewsletterInputEmail(e.target.value)}
                    className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-orange-600 py-3 text-xs font-extrabold text-white hover:bg-orange-700 transition shadow-md shadow-orange-500/10 text-center"
                >
                  Join Premium Dispatch (+50 Points)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
