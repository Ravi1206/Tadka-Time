import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  PlusCircle, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Globe, 
  Layers, 
  Tag, 
  Sparkles, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  DollarSign, 
  ToggleLeft, 
  ToggleRight,
  Eye,
  Mail,
  Search,
  Lock,
  ShieldAlert,
  KeyRound,
  Users
} from 'lucide-react';
import { Article, Category, Comment, AdSetting, Quiz, UserAccount } from '../types';
import { verifyPassword } from '../utils/crypto';

interface AdminPanelProps {
  articles: Article[];
  onAddArticle: (art: Article) => void;
  onEditArticle: (art: Article) => void;
  onDeleteArticle: (id: string) => void;
  comments: Comment[];
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
  adSettings: AdSetting[];
  onToggleAd: (id: string) => void;
  newsletterSubscribers: string[];
  quizzes: Quiz[];
  onAddQuiz: (quiz: Quiz) => void;
  onEditQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (id: string) => void;
  isAdmin: boolean;
  onAdminUnlock: (email: string, name: string) => void;
  
  // Categories and Tags
  categories: string[];
  onAddCategory: (cat: string) => void;
  onDeleteCategory: (cat: string) => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  
  // User Management
  users: UserAccount[];
  onUpdateUser: (id: string, updates: Partial<UserAccount>) => void;
  onDeleteUser: (id: string) => void;
}

export default function AdminPanel({
  articles,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  comments,
  onApproveComment,
  onDeleteComment,
  adSettings,
  onToggleAd,
  newsletterSubscribers,
  quizzes,
  onAddQuiz,
  onEditQuiz,
  onDeleteQuiz,
  isAdmin,
  onAdminUnlock,
  
  categories,
  onAddCategory,
  onDeleteCategory,
  tags,
  onAddTag,
  onDeleteTag,
  
  users,
  onUpdateUser,
  onDeleteUser
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'create' | 'manage' | 'comments' | 'ads' | 'seo'>('stats');
  
  // --- Active Sub-tab under Manage Tab ---
  const [activeManageSubTab, setActiveManageSubTab] = useState<'articles' | 'quizzes' | 'categories' | 'users'>('articles');

  // --- Article Editing state ---
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('food');
  const [editImage, setEditImage] = useState('');
  const [editPremium, setEditPremium] = useState(false);
  const [editTagsString, setEditTagsString] = useState('');
  const [editIsSponsored, setEditIsSponsored] = useState(false);
  const [editSponsorName, setEditSponsorName] = useState('');

  // --- Quiz Editing state ---
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editQuizTitle, setEditQuizTitle] = useState('');
  const [editQuizDesc, setEditQuizDesc] = useState('');
  const [editQuizCategory, setEditQuizCategory] = useState('food');
  const [editQuizDifficulty, setEditQuizDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [editQuizReward, setEditQuizReward] = useState(100);

  // --- Category / Tag creation states ---
  const [newCatInput, setNewCatInput] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  // local unlock form state
  const [unlockEmail, setUnlockEmail] = useState('');
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const handleLocalUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockEmail.trim() || !unlockPassword.trim()) {
      setUnlockError('Please enter both Email and Password.');
      return;
    }
    const cleanEmail = unlockEmail.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    
    if (!foundUser) {
      setUnlockError('Account not found. That email is not registered.');
      return;
    }

    if (foundUser.role !== 'Admin') {
      setUnlockError('Access Denied. You do not have Administrator permissions.');
      return;
    }

    const isMatch = await verifyPassword(unlockPassword, foundUser.passwordHash);
    if (!isMatch) {
      setUnlockError('Invalid email or password.');
      return;
    }
    
    onAdminUnlock(cleanEmail, foundUser.name);
    setUnlockError('');
    alert(`Welcome Chief Admin, ${foundUser.name}! You now have permission to change portal news, articles and quizzes.`);
  };

  // --- Publish Type toggle (article vs quiz)
  const [publishType, setPublishType] = useState<'article' | 'quiz'>('article');

  // --- 1. Post Creation form state
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<Category>('food');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800');
  const [isPremiumPost, setIsPremiumPost] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSponsored, setIsSponsored] = useState(false);
  const [sponsorName, setSponsorName] = useState('');

  // --- 1b. Quiz Creation form state
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizCategory, setQuizCategory] = useState('food');
  const [quizDifficulty, setQuizDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [quizRewardPoints, setQuizRewardPoints] = useState(100);

  // Custom question form state
  const [qQuestion, setQQuestion] = useState('');
  const [qOpt1, setQOpt1] = useState('');
  const [qOpt2, setQOpt2] = useState('');
  const [qOpt3, setQOpt3] = useState('');
  const [qOpt4, setQOpt4] = useState('');
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState('');

  // --- 2. SEO states
  const [seoTargetKeyword, setSeoTargetKeyword] = useState('Dosa recipe Bengaluru');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postExcerpt.trim() || !postContent.trim()) {
      alert('Please fill out all required fields!');
      return;
    }

    const newArticle: Article = {
      id: `food-${Date.now()}`,
      title: postTitle,
      slug: postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: postExcerpt,
      content: postContent.split('\n\n').filter(p => p.trim() !== ''),
      category: postCategory,
      image: postImage,
      readTime: `${Math.ceil(postContent.split(' ').length / 150)} min read`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: {
        name: 'Administrator (You)',
        avatar: '/Ravi.png',
        role: 'Chief Editor'
      },
      isPremium: isPremiumPost,
      likes: 0,
      views: 1,
      commentsCount: 0,
      tags: [postCategory, 'New Post'],
      isSponsored: isSponsored || undefined,
      sponsorName: isSponsored ? sponsorName : undefined,
      scheduledTime: scheduledTime || undefined
    };

    onAddArticle(newArticle);
    
    // reset form
    setPostTitle('');
    setPostExcerpt('');
    setPostContent('');
    setIsPremiumPost(false);
    setIsSponsored(false);
    setSponsorName('');
    setScheduledTime('');
    
    alert('Post created successfully and published into Tadka Time feed!');
    setActiveTab('stats');
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim() || !quizDesc.trim() || !qQuestion.trim() || !qOpt1.trim() || !qOpt2.trim()) {
      alert('Please fill out the quiz title, description, and at least two options for the question!');
      return;
    }

    const options = [qOpt1.trim(), qOpt2.trim()];
    if (qOpt3.trim()) options.push(qOpt3.trim());
    if (qOpt4.trim()) options.push(qOpt4.trim());

    const questionsList = [
      {
        id: `question-${Date.now()}-1`,
        question: qQuestion,
        options,
        correctAnswer: qCorrect,
        explanation: qExplanation || 'Correct answer verified!'
      }
    ];

    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: quizTitle,
      description: quizDesc,
      category: quizCategory,
      questions: questionsList,
      difficulty: quizDifficulty,
      rewardPoints: Number(quizRewardPoints)
    };

    if (onAddQuiz) {
      onAddQuiz(newQuiz);
      alert('Interactive Quiz created successfully and published into the Quiz Arena!');
      
      // Reset Quiz fields
      setQuizTitle('');
      setQuizDesc('');
      setQQuestion('');
      setQOpt1('');
      setQOpt2('');
      setQOpt3('');
      setQOpt4('');
      setQCorrect(0);
      setQExplanation('');
      
      setActiveTab('stats');
    } else {
      alert('Quiz creation interface loaded successfully! However, saving quizzes requires active server state. It has been cached locally.');
    }
  };

  const calculateTotalEarnings = () => {
    return adSettings
      .filter(ad => ad.enabled)
      .reduce((sum, ad) => sum + ad.earnings, 0);
  };

  const handleGenerateSEO = () => {
    const slugified = seoTargetKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setSeoTitle(`${seoTargetKeyword} - Tadka Time Blogs`);
    setSeoDesc(`Read the ultimate guide on ${seoTargetKeyword}. Learn secrets from expert chefs, restaurant insights, and Bengaluru events on Tadka Time.`);
  };

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16" id="admin-restricted-portal">
        <div className="border rounded-3xl bg-white p-8 shadow-xl text-center dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 mb-6">
            <Lock className="h-8 w-8 animate-bounce" />
          </div>
          
          <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">Admin Portal Locked</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            Only authorized administrators can change Daily News, Articles, and Interactive Quizzes/Trivia Challenges on this portal.
          </p>

          <form onSubmit={handleLocalUnlockSubmit} className="mt-8 space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">Admin Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g., ravikumar870317@gmail.com"
                value={unlockEmail}
                onChange={(e) => setUnlockEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">Access Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
              <p className="text-[10px] text-neutral-400 mt-1 font-semibold">Hint: Enter any password with an authorized admin email.</p>
            </div>

            {unlockError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30 text-[11px] text-red-600 font-bold flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{unlockError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>Verify credentials & Unlock CMS</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8" id="admin-dashboard">
      
      {/* Dashboard Brand Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-8 gap-4 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <Settings className="h-6 w-6 text-orange-600 animate-spin" />
            <span>Tadka CMS Control Tower</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">Manage articles, audit comments, set Google AdSense slots and monitor organic SEO rankings.</p>
        </div>

        {/* Action Grid Subnavigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'stats', label: 'Dashboard Stats', icon: TrendingUp },
            { id: 'create', label: 'Write Article', icon: PlusCircle },
            { id: 'manage', label: 'Manage Platform', icon: Layers },
            { id: 'comments', label: 'Moderation', icon: MessageSquare },
            { id: 'ads', label: 'Ad & Income', icon: DollarSign },
            { id: 'seo', label: 'SEO Config', icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      <div>
        
        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            {/* Quick Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Aggregated Content Views</span>
                <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                  {articles.reduce((acc, art) => acc + (art.views || 0), 0).toLocaleString()}
                </p>
                <p className="text-[10px] text-emerald-500 mt-1 font-bold">+12% traffic spike today</p>
              </div>

              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Total Platform Users</span>
                <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                  {users.length}
                </p>
                <p className="text-[10px] text-emerald-500 mt-1 font-bold">Admin & Reader accounts</p>
              </div>

              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">AdSense Net Yield</span>
                <p className="text-2xl font-black text-orange-600 mt-1">
                  ₹{calculateTotalEarnings().toFixed(2)}
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">Based on active banner configurations</p>
              </div>

              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Articles in Database</span>
                <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">{articles.length}</p>
                <p className="text-[10px] text-neutral-400 mt-1">Food, City News & Finance</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Traffic / Earnings Simulator graph */}
              <div className="md:col-span-2 border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6">Simulated AdSense Revenue Trend (Last 7 Days)</h4>
                
                {/* Simulated bar chart */}
                <div className="flex items-end justify-between h-48 gap-4 pt-4 border-b dark:border-neutral-800">
                  {[
                    { day: 'Fri', amount: 45, height: 'h-16' },
                    { day: 'Sat', amount: 62, height: 'h-24' },
                    { day: 'Sun', amount: 84, height: 'h-32' },
                    { day: 'Mon', amount: 51, height: 'h-20' },
                    { day: 'Tue', amount: 68, height: 'h-28' },
                    { day: 'Wed', amount: 95, height: 'h-36' },
                    { day: 'Thu', amount: 110, height: 'h-44' },
                  ].map((d, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[10px] font-extrabold text-neutral-400">₹{d.amount}</div>
                      <div className={`w-full bg-gradient-to-t from-orange-500 to-orange-600 rounded-t ${d.height} transition-all duration-300 shadow-sm`} />
                      <div className="text-[10px] font-bold text-neutral-500 uppercase mt-1">{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscribers side column */}
              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Newsletter Subscribers ({newsletterSubscribers.length})</h4>
                
                {newsletterSubscribers.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-xs text-neutral-400">No new organic subscribers yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {newsletterSubscribers.map((email, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
                        <Mail className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 truncate">{email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Article Analytics & Top Content Section */}
            <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 mt-6">
              <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Article Analytics & Top Content</h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-[11px] font-black uppercase text-orange-600 mb-3 tracking-wider">Most Viewed Articles</h5>
                  <div className="space-y-2">
                    {articles.slice().sort((a,b) => b.views - a.views).slice(0, 5).map(art => (
                      <div key={art.id} className="flex justify-between items-center text-xs p-2 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
                        <span className="font-bold truncate max-w-[200px]">{art.title}</span>
                        <span className="text-[10px] font-black text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded shrink-0">{art.views} views</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black uppercase text-orange-600 mb-3 tracking-wider">Most Liked Articles</h5>
                  <div className="space-y-2">
                    {articles.slice().sort((a,b) => b.likes - a.likes).slice(0, 5).map(art => (
                      <div key={art.id} className="flex justify-between items-center text-xs p-2 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
                        <span className="font-bold truncate max-w-[200px]">{art.title}</span>
                        <span className="text-[10px] font-black text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded shrink-0">{art.likes} likes</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WRITE ARTICLE POST */}
        {activeTab === 'create' && (
          <div className="max-w-3xl mx-auto border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            {/* SUB-TABS SELECTOR */}
            <div className="flex border-b pb-4 mb-6 gap-4 justify-center dark:border-neutral-900">
              <button
                type="button"
                onClick={() => setPublishType('article')}
                className={`pb-2 px-4 text-xs font-black transition relative ${
                  publishType === 'article'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                }`}
              >
                🍲 Write News/Article Post
              </button>
              <button
                type="button"
                onClick={() => setPublishType('quiz')}
                className={`pb-2 px-4 text-xs font-black transition relative ${
                  publishType === 'quiz'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                }`}
              >
                🧩 Create Interactive Quiz
              </button>
            </div>

            {publishType === 'article' ? (
              <form onSubmit={handleCreatePost} className="space-y-5">
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-2">Publish an Article / Local News</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Article Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Authentic Karnataka Sambar Recipe"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Category *</label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value as Category)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    >
                      <option value="food">🍲 Food Recipes</option>
                      <option value="business">🍽 Restaurant Business</option>
                      <option value="bengaluru">🏙 Bengaluru Local News</option>
                      <option value="puzzles">🧩 Puzzles & Quizzes</option>
                      <option value="finance">💰 Finance & Investment</option>
                      <option value="other">📚 Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Excerpt (Short Summary for Cards) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Unveil the blend of coriander, cumin, and fresh coconut for the perfect tiffin hotel sambar."
                    value={postExcerpt}
                    onChange={(e) => setPostExcerpt(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Article Body Content (Double newline for paragraphs) *</label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Type or paste your article body paragraph text here..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs font-semibold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                {/* Toggles */}
                <div className="grid sm:grid-cols-2 gap-4 border-t pt-4 dark:border-neutral-900">
                  <div className="flex items-center justify-between p-3 border rounded-xl dark:border-neutral-900">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-white block">Gated Premium Post</span>
                      <span className="text-[10px] text-neutral-400">Available to Premium members only</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPremiumPost(!isPremiumPost)}
                      className="text-orange-600"
                    >
                      {isPremiumPost ? <ToggleRight className="h-8 w-8 text-orange-600" /> : <ToggleLeft className="h-8 w-8 text-neutral-400" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-xl dark:border-neutral-900">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-white block">Sponsored Content</span>
                      <span className="text-[10px] text-neutral-400">Enable brand endorsement tags</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSponsored(!isSponsored)}
                      className="text-orange-600"
                    >
                      {isSponsored ? <ToggleRight className="h-8 w-8 text-orange-600" /> : <ToggleLeft className="h-8 w-8 text-neutral-400" />}
                    </button>
                  </div>
                </div>

                {isSponsored && (
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Sponsor / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Swiggy, Amul, MTR"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                )}

                {/* Scheduling Control */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Post (Optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3 dark:border-neutral-900">
                  <button
                    type="submit"
                    className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-xs font-extrabold transition shadow-md"
                  >
                    Publish Now
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateQuiz} className="space-y-5">
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-2">Publish an Interactive Quiz / Trivia Challenge</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Quiz Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bengaluru Coffee Culture Trivia"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Quiz Category *</label>
                    <select
                      value={quizCategory}
                      onChange={(e) => setQuizCategory(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    >
                      <option value="food">🍲 Food & Spices</option>
                      <option value="business">🏙 Bengaluru Culture</option>
                      <option value="finance">💰 Personal Finance</option>
                      <option value="other">📚 General Knowledge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Test your knowledge on filters, beans, and historic coffee spots."
                    value={quizDesc}
                    onChange={(e) => setQuizDesc(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 border-t pt-4 dark:border-neutral-900">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Difficulty *</label>
                    <select
                      value={quizDifficulty}
                      onChange={(e) => setQuizDifficulty(e.target.value as any)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    >
                      <option value="Easy">🟢 Easy</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Hard">🔴 Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Reward Points *</label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={1000}
                      value={quizRewardPoints}
                      onChange={(e) => setQuizRewardPoints(Number(e.target.value))}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Question Section */}
                <div className="border-t pt-4 mt-4 space-y-4 dark:border-neutral-900">
                  <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest">Setup Quiz Question #1</h4>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Question Text *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Which coffee bean is primarily grown in Chickmagalur, Karnataka?"
                      value={qQuestion}
                      onChange={(e) => setQQuestion(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Option 1 *</label>
                      <input
                        type="text"
                        required
                        placeholder="Option 1"
                        value={qOpt1}
                        onChange={(e) => setQOpt1(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Option 2 *</label>
                      <input
                        type="text"
                        required
                        placeholder="Option 2"
                        value={qOpt2}
                        onChange={(e) => setQOpt2(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Option 3 (Optional)</label>
                      <input
                        type="text"
                        placeholder="Option 3"
                        value={qOpt3}
                        onChange={(e) => setQOpt3(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Option 4 (Optional)</label>
                      <input
                        type="text"
                        placeholder="Option 4"
                        value={qOpt4}
                        onChange={(e) => setQOpt4(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Correct Answer *</label>
                      <select
                        value={qCorrect}
                        onChange={(e) => setQCorrect(Number(e.target.value))}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      >
                        <option value={0}>Option 1 is correct</option>
                        <option value={1}>Option 2 is correct</option>
                        {qOpt3.trim() && <option value={2}>Option 3 is correct</option>}
                        {qOpt4.trim() && <option value={3}>Option 4 is correct</option>}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Correct Explanation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Arabica coffee constitutes the majority of Karnataka's premium output."
                        value={qExplanation}
                        onChange={(e) => setQExplanation(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-3 dark:border-neutral-900">
                  <button
                    type="submit"
                    className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-xs font-extrabold transition shadow-md"
                  >
                    Publish Quiz
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB: MANAGE PLATFORM CONTENT, CATEGORIES, AND USERS */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            {/* Sub Tabs */}
            <div className="flex border-b pb-3 mb-6 gap-6 dark:border-neutral-800">
              {[
                { id: 'articles', label: 'Manage Articles', icon: FileText },
                { id: 'quizzes', label: 'Manage Quizzes', icon: Sparkles },
                { id: 'categories', label: 'Categories & Tags', icon: Tag },
                { id: 'users', label: 'Manage Users', icon: Users }
              ].map(sub => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setActiveManageSubTab(sub.id as any);
                    setEditingArticle(null);
                    setEditingQuiz(null);
                  }}
                  className={`pb-2 text-xs font-black transition relative ${
                    activeManageSubTab === sub.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <sub.icon className="h-4 w-4" />
                    <span>{sub.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* SUBTAB 1: MANAGE ARTICLES */}
            {activeManageSubTab === 'articles' && (
              <div className="space-y-4">
                {editingArticle ? (
                  // EDITING ARTICLE FORM
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!editTitle.trim() || !editExcerpt.trim() || !editContent.trim()) {
                      alert('Please fill out all fields.');
                      return;
                    }
                    onEditArticle({
                      ...editingArticle,
                      title: editTitle,
                      slug: editTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      excerpt: editExcerpt,
                      content: editContent.split('\n\n').filter(p => p.trim() !== ''),
                      category: editCategory,
                      image: editImage,
                      isPremium: editPremium,
                      tags: editTagsString.split(',').map(t => t.trim()).filter(Boolean),
                      isSponsored: editIsSponsored || undefined,
                      sponsorName: editIsSponsored ? editSponsorName : undefined
                    });
                    setEditingArticle(null);
                    alert('Article updated successfully!');
                  }} className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-black text-neutral-800 dark:text-white uppercase tracking-wider">Edit Recipe / Article Post</h4>
                      <button type="button" onClick={() => setEditingArticle(null)} className="text-xs text-neutral-500 hover:underline font-bold">Cancel</button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Article Title *</label>
                        <input
                          type="text"
                          required
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Category *</label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as Category)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        >
                          <option value="food">🍲 Food Recipes</option>
                          <option value="business">🍽 Restaurant Business</option>
                          <option value="bengaluru">🏙 Bengaluru Local News</option>
                          <option value="puzzles">🧩 Puzzles & Quizzes</option>
                          <option value="finance">💰 Finance & Investment</option>
                          <option value="other">📚 Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Excerpt *</label>
                      <input
                        type="text"
                        required
                        value={editExcerpt}
                        onChange={(e) => setEditExcerpt(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Article Body Content (Double newline for paragraphs) *</label>
                      <textarea
                        rows={6}
                        required
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs font-semibold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 border-t pt-4 dark:border-neutral-900">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Tags (Comma-separated)</label>
                        <input
                          type="text"
                          value={editTagsString}
                          onChange={(e) => setEditTagsString(e.target.value)}
                          placeholder="e.g., Spicy, Curries, South Indian"
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-xl dark:border-neutral-900">
                        <div>
                          <span className="text-xs font-bold text-neutral-800 dark:text-white block">Gated Premium Post</span>
                          <span className="text-[10px] text-neutral-400">Available to Premium members only</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditPremium(!editPremium)}
                          className="text-orange-600"
                        >
                          {editPremium ? <ToggleRight className="h-8 w-8 text-orange-600" /> : <ToggleLeft className="h-8 w-8 text-neutral-400" />}
                        </button>
                      </div>
                    </div>

                    {/* Sponsoring */}
                    <div className="flex flex-col sm:flex-row gap-4 border-t pt-4 dark:border-neutral-900">
                      <div className="flex-1 flex items-center justify-between p-3 border rounded-xl dark:border-neutral-900">
                        <div>
                          <span className="text-xs font-bold text-neutral-800 dark:text-white block">Mark as Sponsored / Ad</span>
                          <span className="text-[10px] text-neutral-400">Inserts dynamic brand banners</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditIsSponsored(!editIsSponsored)}
                          className="text-orange-600"
                        >
                          {editIsSponsored ? <ToggleRight className="h-8 w-8 text-orange-600" /> : <ToggleLeft className="h-8 w-8 text-neutral-400" />}
                        </button>
                      </div>

                      {editIsSponsored && (
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Sponsor Brand Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Nandini Dairy, MTR Foods"
                            value={editSponsorName}
                            onChange={(e) => setEditSponsorName(e.target.value)}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setEditingArticle(null)} className="rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white px-4 py-2 text-xs font-bold">Cancel</button>
                      <button type="submit" className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 text-xs font-bold shadow-md">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  // ARTICLES LIST
                  <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">Active Database Articles ({articles.length})</h4>
                      <p className="text-[11px] text-neutral-500 font-bold">Click Edit to modify or Trash to permanently remove.</p>
                    </div>

                    <div className="divide-y dark:divide-neutral-800 space-y-3">
                      {articles.map(art => (
                        <div key={art.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-4">
                          <div className="flex items-center gap-3">
                            <img src={art.image} alt={art.title} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black uppercase text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded dark:bg-orange-950/20">{art.category}</span>
                                {art.isPremium && <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded dark:bg-amber-950/20">Premium</span>}
                                {art.isSponsored && <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded dark:bg-blue-950/20">Ad</span>}
                              </div>
                              <h5 className="text-xs font-black text-neutral-800 dark:text-white mt-1 line-clamp-1">{art.title}</h5>
                              <p className="text-[10px] text-neutral-400 mt-0.5">Likes: {art.likes} • Views: {art.views}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 justify-end shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArticle(art);
                                setEditTitle(art.title);
                                setEditExcerpt(art.excerpt);
                                setEditContent(art.content.join('\n\n'));
                                setEditCategory(art.category);
                                setEditImage(art.image);
                                setEditPremium(art.isPremium);
                                setEditTagsString(art.tags.join(', '));
                                setEditIsSponsored(!!art.isSponsored);
                                setEditSponsorName(art.sponsorName || '');
                              }}
                              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 px-2.5 py-1.5 rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you absolutely sure you want to delete the article: "${art.title}"?`)) {
                                  onDeleteArticle(art.id);
                                }
                              }}
                              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 px-2.5 py-1.5 rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBTAB 2: MANAGE QUIZZES */}
            {activeManageSubTab === 'quizzes' && (
              <div className="space-y-4">
                {editingQuiz ? (
                  // EDITING QUIZ FORM
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!editQuizTitle.trim() || !editQuizDesc.trim()) {
                      alert('Please fill out all fields.');
                      return;
                    }
                    onEditQuiz({
                      ...editingQuiz,
                      title: editQuizTitle,
                      description: editQuizDesc,
                      category: editQuizCategory,
                      difficulty: editQuizDifficulty,
                      rewardPoints: editQuizReward
                    });
                    setEditingQuiz(null);
                    alert('Quiz updated successfully!');
                  }} className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-black text-neutral-800 dark:text-white uppercase tracking-wider">Edit Trivia Quiz</h4>
                      <button type="button" onClick={() => setEditingQuiz(null)} className="text-xs text-neutral-500 hover:underline font-bold">Cancel</button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Quiz Title *</label>
                        <input
                          type="text"
                          required
                          value={editQuizTitle}
                          onChange={(e) => setEditQuizTitle(e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Category *</label>
                        <select
                          value={editQuizCategory}
                          onChange={(e) => setEditQuizCategory(e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        >
                          <option value="food">🍲 Food & Spices</option>
                          <option value="bengaluru">🏙 Bengaluru Local Trivia</option>
                          <option value="finance">💰 Business & Finance</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Description *</label>
                      <input
                        type="text"
                        required
                        value={editQuizDesc}
                        onChange={(e) => setEditQuizDesc(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Difficulty Level</label>
                        <select
                          value={editQuizDifficulty}
                          onChange={(e) => setEditQuizDifficulty(e.target.value as any)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        >
                          <option value="Easy">🟢 Easy</option>
                          <option value="Medium">🟡 Medium</option>
                          <option value="Hard">🔴 Hard</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Completion Reward Points</label>
                        <input
                          type="number"
                          required
                          value={editQuizReward}
                          onChange={(e) => setEditQuizReward(parseInt(e.target.value) || 50)}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setEditingQuiz(null)} className="rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white px-4 py-2 text-xs font-bold">Cancel</button>
                      <button type="submit" className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 text-xs font-bold shadow-md">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  // QUIZZES LIST
                  <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">Trivia Challenges in Database ({quizzes?.length || 0})</h4>
                    </div>

                    <div className="divide-y dark:divide-neutral-800 space-y-3">
                      {quizzes?.map(q => (
                        <div key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black uppercase text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded dark:bg-orange-950/20">{q.category}</span>
                              <span className="text-[9px] font-black uppercase text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded dark:bg-neutral-800">{q.difficulty}</span>
                            </div>
                            <h5 className="text-xs font-black text-neutral-800 dark:text-white mt-1">{q.title}</h5>
                            <p className="text-[10px] text-neutral-400 mt-0.5">{q.description}</p>
                            <p className="text-[10px] text-orange-600 font-bold mt-1">Reward: {q.rewardPoints} points • Questions: {q.questions.length}</p>
                          </div>

                          <div className="flex items-center gap-2 justify-end shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingQuiz(q);
                                setEditQuizTitle(q.title);
                                setEditQuizDesc(q.description);
                                setEditQuizCategory(q.category);
                                setEditQuizDifficulty(q.difficulty);
                                setEditQuizReward(q.rewardPoints);
                              }}
                              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 px-2.5 py-1.5 rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete quiz "${q.title}"?`)) {
                                  onDeleteQuiz(q.id);
                                }
                              }}
                              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 px-2.5 py-1.5 rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBTAB 3: MANAGE CATEGORIES & TAGS */}
            {activeManageSubTab === 'categories' && (
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Categories Panel */}
                <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Active Core Categories</h4>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCatInput.trim()) return;
                    onAddCategory(newCatInput.trim().toLowerCase());
                    setNewCatInput('');
                    alert('New Category added successfully!');
                  }} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      required
                      placeholder="e.g., hospitality"
                      value={newCatInput}
                      onChange={(e) => setNewCatInput(e.target.value)}
                      className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 py-1.5 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                    <button type="submit" className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 text-xs font-bold">Add</button>
                  </form>

                  <div className="space-y-2">
                    {categories.map(cat => (
                      <div key={cat} className="flex justify-between items-center text-xs p-2 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
                        <span className="font-bold uppercase tracking-wider text-orange-600 text-[10px]">{cat}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (['food', 'business', 'bengaluru', 'puzzles', 'finance', 'other'].includes(cat)) {
                              alert('Core system categories cannot be deleted to preserve schema safety.');
                              return;
                            }
                            if (confirm(`Delete category: ${cat}?`)) {
                              onDeleteCategory(cat);
                            }
                          }}
                          className="text-[10px] text-red-600 hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Panel */}
                <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Trending Article Tags</h4>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newTagInput.trim()) return;
                    onAddTag(newTagInput.trim());
                    setNewTagInput('');
                    alert('New Tag added successfully!');
                  }} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      required
                      placeholder="e.g., South Indian"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 py-1.5 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                    <button type="submit" className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 text-xs font-bold">Add</button>
                  </form>

                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                    {tags.map(t => (
                      <div key={t} className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
                        <span>#{t}</span>
                        <button
                          type="button"
                          onClick={() => onDeleteTag(t)}
                          className="text-red-500 hover:text-red-700 text-[10px] font-black"
                          title="Delete tag"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB 4: MANAGE REGISTERED USERS */}
            {activeManageSubTab === 'users' && (
              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Registered Platform Accounts ({users.length})</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b dark:border-neutral-800 text-neutral-400 text-[10px] uppercase font-black">
                        <th className="py-2.5">User Info</th>
                        <th className="py-2.5">Email Address</th>
                        <th className="py-2.5">System Role</th>
                        <th className="py-2.5">User Tier</th>
                        <th className="py-2.5">Loyalty Points</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-neutral-800">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                          <td className="py-3 font-bold text-neutral-800 dark:text-white">{u.name}</td>
                          <td className="py-3 text-neutral-500 dark:text-neutral-400">{u.email}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              u.role === 'Admin' ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              u.tier === 'Premium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                            }`}>
                              {u.tier}
                            </span>
                          </td>
                          <td className="py-3 font-black text-neutral-700 dark:text-neutral-300">{u.points} pts</td>
                          <td className="py-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => {
                                const newRole = u.role === 'Admin' ? 'User' : 'Admin';
                                if (u.email === 'ravikumar870317@gmail.com') {
                                  alert('Cannot revoke master admin permissions for Ravi Kumar.');
                                  return;
                                }
                                onUpdateUser(u.id, { role: newRole });
                                alert(`Updated role of ${u.name} to ${newRole}`);
                              }}
                              className="text-[10px] font-black uppercase text-orange-600 hover:underline"
                            >
                              Toggle Role
                            </button>
                            <span className="text-neutral-300 dark:text-neutral-800">|</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newTier = u.tier === 'Premium' ? 'Free' : 'Premium';
                                onUpdateUser(u.id, { tier: newTier });
                                alert(`Updated membership tier of ${u.name} to ${newTier}`);
                              }}
                              className="text-[10px] font-black uppercase text-amber-600 hover:underline"
                            >
                              Toggle Tier
                            </button>
                            <span className="text-neutral-300 dark:text-neutral-800">|</span>
                            <button
                              type="button"
                              onClick={() => {
                                if (u.email === 'ravikumar870317@gmail.com') {
                                  alert('Cannot delete master admin account.');
                                  return;
                                }
                                if (confirm(`Are you sure you want to permanently delete user: ${u.name}?`)) {
                                  onDeleteUser(u.id);
                                }
                              }}
                              className="text-[10px] font-black uppercase text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMENT MODERATION BOARD */}
        {activeTab === 'comments' && (
          <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-6 uppercase tracking-wider">
              Comment Moderation Queue
            </h4>

            {comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xs text-neutral-400">All discussions approved. queue clean!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comm) => (
                  <div 
                    key={comm.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-neutral-50/50 justify-between items-start dark:bg-neutral-900/30 dark:border-neutral-900"
                  >
                    <div className="flex gap-3">
                      <img
                        src={comm.authorAvatar}
                        alt={comm.author}
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full object-cover border"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-neutral-900 dark:text-white">{comm.author}</h5>
                          <span className="text-[10px] text-neutral-400">Post ID: {comm.articleId}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 font-sans">{comm.content}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            comm.approved ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-orange-50 text-orange-600 dark:bg-orange-950/20'
                          }`}>
                            {comm.approved ? 'Approved' : 'Pending Review'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end sm:self-center">
                      {!comm.approved && (
                        <button
                          onClick={() => onApproveComment(comm.id)}
                          className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 text-xs font-bold transition flex items-center gap-1"
                          title="Approve Comment"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Approve</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteComment(comm.id)}
                        className="rounded-lg bg-red-100 hover:bg-red-200 text-red-600 p-1.5 text-xs font-bold transition flex items-center gap-1 dark:bg-red-950/30 dark:text-red-400"
                        title="Delete Comment"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: AD ADSENSE CONFIGURATION */}
        {activeTab === 'ads' && (
          <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
            <div>
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
                Google AdSense Slots Configurator
              </h4>
              <p className="text-xs text-neutral-400 mt-1">Configure individual ad layout slots on the Tadka Time reader viewport to optimize RPM yields.</p>
            </div>

            <div className="space-y-4">
              {adSettings.map((ad) => (
                <div 
                  key={ad.id}
                  className="p-4 border rounded-xl bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-4 dark:bg-neutral-900 dark:border-neutral-800"
                >
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h5 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">{ad.name}</h5>
                      <span className="text-[10px] bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full dark:bg-neutral-800 dark:text-neutral-300 font-semibold uppercase">{ad.type}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">{ad.location}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center sm:text-right">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase block">Ad Income Simulated</span>
                      <span className="text-sm font-extrabold text-orange-600">₹{ad.earnings.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onToggleAd(ad.id)}
                      className="text-orange-600"
                    >
                      {ad.enabled ? (
                        <ToggleRight className="h-10 w-10 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="h-10 w-10 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SEO MANAGEMENT COMPONENT */}
        {activeTab === 'seo' && (
          <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
            <div>
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
                SEO Optimizer & Google Discover Tools
              </h4>
              <p className="text-xs text-neutral-400 mt-1">Generate meta titles, clean canonical URLs and copy discover sitemaps dynamically.</p>
            </div>

            <div className="max-w-xl space-y-4">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase">Target Search Focus Keywords</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={seoTargetKeyword}
                    onChange={(e) => setSeoTargetKeyword(e.target.value)}
                    className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                  <button
                    onClick={handleGenerateSEO}
                    className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs font-bold transition"
                  >
                    Generate Preview
                  </button>
                </div>
              </div>

              {/* SEO preview display card */}
              {seoTitle && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 border rounded-xl bg-neutral-50/50 space-y-3 dark:bg-neutral-900/30 dark:border-neutral-800"
                >
                  <div>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">Google Organic SERP Preview</span>
                    <h5 className="text-sm font-bold text-blue-600 hover:underline cursor-pointer leading-tight mt-1 truncate">
                      {seoTitle}
                    </h5>
                    <span className="text-xs text-emerald-600 block">https://tadkatime.com/posts/{seoTargetKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-normal font-sans">
                      {seoDesc}
                    </p>
                  </div>

                  <div className="border-t pt-3 space-y-2 dark:border-neutral-900">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">Generated Schema.org JSON-LD Markup</span>
                    <pre className="p-3 bg-neutral-900 rounded-lg text-[10px] text-orange-500 font-mono overflow-x-auto max-h-36">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${seoTitle}",
  "description": "${seoDesc}",
  "author": {
    "@type": "Person",
    "name": "Tadka Time Chef Network"
  }
}`}
                    </pre>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
