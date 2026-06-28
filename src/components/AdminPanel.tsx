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
  Search
} from 'lucide-react';
import { Article, Category, Comment, AdSetting } from '../types';

interface AdminPanelProps {
  articles: Article[];
  onAddArticle: (art: Article) => void;
  comments: Comment[];
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
  adSettings: AdSetting[];
  onToggleAd: (id: string) => void;
  newsletterSubscribers: string[];
}

export default function AdminPanel({
  articles,
  onAddArticle,
  comments,
  onApproveComment,
  onDeleteComment,
  adSettings,
  onToggleAd,
  newsletterSubscribers
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'create' | 'comments' | 'ads' | 'seo'>('stats');

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
                <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">19.5K</p>
                <p className="text-[10px] text-emerald-500 mt-1 font-bold">+12% traffic spike today</p>
              </div>

              <div className="border rounded-2xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Active Subscribed Emails</span>
                <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                  {newsletterSubscribers.length + 142}
                </p>
                <p className="text-[10px] text-emerald-500 mt-1 font-bold">In-app newsletters active</p>
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
          </div>
        )}

        {/* TAB 2: WRITE ARTICLE POST */}
        {activeTab === 'create' && (
          <div className="max-w-3xl mx-auto border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-base font-extrabold text-neutral-950 dark:text-white mb-6">Write & Publish New Post</h3>

            <form onSubmit={handleCreatePost} className="space-y-5">
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
