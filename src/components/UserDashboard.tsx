import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  History, 
  User, 
  Award, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Trash2, 
  Share2, 
  Crown, 
  ChevronRight, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { Article } from '../types';
import { hashPassword } from '../utils/crypto';

interface UserDashboardProps {
  username: string;
  loginEmail: string;
  userTier: 'Free' | 'Premium';
  userPoints: number;
  bookmarks: string[];
  likedArticleIds: string[];
  readingHistory: string[];
  articles: Article[];
  onUpdateProfile: (updates: { name?: string; email?: string; password?: string; tier?: 'Free' | 'Premium'; points?: number }) => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onToggleLike: (id: string) => void;
  onClearReadingHistory: () => void;
  onAddPoints: (points: number) => void;
}

export default function UserDashboard({
  username,
  loginEmail,
  userTier,
  userPoints,
  bookmarks,
  likedArticleIds,
  readingHistory,
  articles,
  onUpdateProfile,
  onSelectArticle,
  onToggleBookmark,
  onToggleLike,
  onClearReadingHistory,
  onAddPoints
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'liked' | 'history'>('profile');

  // Profile forms
  const [editName, setEditName] = useState(username);
  const [editEmail, setEditEmail] = useState(loginEmail);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150');
  
  // States for feedback
  const [profileSuccess, setProfileSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150', // Female chic
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150', // Male professional
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150', // Female creative
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150', // Male techie
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150'  // Neutrally modern
  ];

  const handleUpdateBasic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      alert('Name and Email cannot be blank.');
      return;
    }
    onUpdateProfile({ name: editName.trim(), email: editEmail.trim().toLowerCase() });
    setProfileSuccess('Profile details updated successfully!');
    setTimeout(() => setProfileSuccess(''), 3000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    try {
      const encryptedPassword = await hashPassword(newPassword);
      onUpdateProfile({ password: encryptedPassword });
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setPasswordSuccess('Password securely hashed and updated!');
      setTimeout(() => setPasswordSuccess(''), 4000);
    } catch (err) {
      setPasswordError('An error occurred while securely encrypting your password.');
    }
  };

  const handleUpgradeTier = () => {
    if (userTier === 'Premium') {
      alert('You are already a Premium Tadka Club member with all exclusive access!');
      return;
    }
    
    if (userPoints >= 150) {
      // deduct points and upgrade
      onUpdateProfile({ 
        tier: 'Premium',
        points: userPoints - 150 
      });
      alert('Congratulations! You have successfully upgraded to Tadka Premium using 150 loyalty points. Experience ad-free cooking templates, finance trackers, and elite insights.');
    } else {
      alert(`Insufficient loyalty points! Premium membership costs 150 points. You currently have ${userPoints} points. Solve daily quizzes or bookmark and read posts to earn more points!`);
    }
  };

  const handleShare = (title: string, slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/article/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShareFeedback(`Copied share link to clipboard for: "${title}"`);
      setTimeout(() => setShareFeedback(null), 3000);
    } else {
      alert(`Share this article: ${shareUrl}`);
    }
  };

  // Filter lists based on articles
  const savedArticles = articles.filter(art => bookmarks.includes(art.id));
  const likedArticles = articles.filter(art => likedArticleIds.includes(art.id));
  const historyArticles = readingHistory
    .map(id => articles.find(art => art.id === id))
    .filter((art): art is Article => !!art);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8" id="user-dashboard-root">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden border rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 mb-8 shadow-xl dark:border-neutral-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl" />
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={selectedAvatar} 
                alt={username} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-orange-500 object-cover shadow-lg"
              />
              {userTier === 'Premium' && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full p-1 shadow-md">
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{username}</h2>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                  userTier === 'Premium' 
                    ? 'bg-amber-500 text-neutral-950' 
                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                }`}>
                  {userTier} Tier
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-neutral-500" />
                <span>{loginEmail}</span>
              </p>
              <p className="text-[10px] text-neutral-400 mt-0.5">Role: Reader / Platform Contributor</p>
            </div>
          </div>

          {/* User loyalty balance and action card */}
          <div className="bg-neutral-950/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800 flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-orange-500" />
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Loyalty Points</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-orange-500 mt-0.5">{userPoints} pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Solve quizzes to multiply points</p>
            </div>
            
            {userTier !== 'Premium' && (
              <button 
                onClick={handleUpgradeTier}
                className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-md shrink-0"
              >
                Upgrade (150 pts)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Share Toast Notification */}
      {shareFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{shareFeedback}</span>
        </div>
      )}

      {/* Content grid */}
      <div className="grid md:grid-cols-4 gap-8">
        
        {/* Left column navigation */}
        <div className="space-y-4">
          <div className="border rounded-2xl bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            {[
              { id: 'profile', label: 'Profile Settings', icon: User },
              { id: 'saved', label: `Saved Articles (${bookmarks.length})`, icon: BookOpen },
              { id: 'liked', label: `Liked Articles (${likedArticleIds.length})`, icon: Heart },
              { id: 'history', label: `Reading History (${readingHistory.length})`, icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left rounded-xl px-4 py-3 text-xs font-bold transition flex items-center gap-2.5 ${
                  activeTab === tab.id
                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20'
                    : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-orange-600' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="border rounded-2xl bg-orange-50/40 p-5 dark:border-orange-950/10 dark:bg-orange-950/5">
            <h4 className="text-[10px] font-black uppercase text-orange-600 tracking-wider">Cooking Rewards Program</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Unlock exclusive Premium features, advanced compound calculators, restaurant cost sheet downloads, and ad-free browsing by accumulating loyalty points.
            </p>
            <div className="mt-4 space-y-2 text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
              <div className="flex justify-between">
                <span>Like an article</span>
                <span className="text-orange-600">+10 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Complete any quiz</span>
                <span className="text-orange-600">Up to +100 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Newsletter subscription</span>
                <span className="text-orange-600">+50 pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column tab details */}
        <div className="md:col-span-3">
          
          {/* TAB 1: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Basic Details Form */}
              <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h3 className="text-base font-black text-neutral-900 dark:text-white mb-4 flex items-center gap-1.5">
                  <User className="h-4 w-4 text-orange-600" />
                  <span>Personal Account Details</span>
                </h3>
                
                {profileSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-[11px] text-emerald-600 rounded-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{profileSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateBasic} className="space-y-4">
                  {/* Avatar Picker */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-2">Select Profile Avatar</label>
                    <div className="flex gap-3">
                      {avatars.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                            selectedAvatar === av ? 'border-orange-500 scale-110 shadow-md' : 'border-neutral-200 dark:border-neutral-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">Display Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs transition dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                  >
                    Save Details
                  </button>
                </form>
              </div>

              {/* Secure Password Update */}
              <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h3 className="text-base font-black text-neutral-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-orange-600" />
                  <span>Secure Hashed Cryptographic Password Change</span>
                </h3>
                <p className="text-[10px] text-neutral-400 mb-4">
                  For your zero-trust safety, your password is mathematically encrypted using the <strong className="text-neutral-700 dark:text-neutral-300">SHA-256 (Secure Hash Algorithm)</strong> inside your sandbox browser environment prior to database updates. Plaintext passwords are never stored.
                </p>

                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-[11px] text-emerald-600 rounded-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-[11px] text-red-600 rounded-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition shadow-sm"
                  >
                    Change Secure Password
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: SAVED ARTICLES (BOOKMARKS) */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-neutral-900 dark:text-white mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-orange-600" />
                <span>Your Saved Culinary Guides ({savedArticles.length})</span>
              </h3>

              {savedArticles.length === 0 ? (
                <div className="border border-dashed rounded-2xl p-12 text-center bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
                  <BookOpen className="h-8 w-8 mx-auto text-neutral-300 mb-3" />
                  <p className="text-xs font-bold text-neutral-500">No saved articles yet.</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Explore recipe guides or business insights and tap bookmark on any post.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedArticles.map(art => (
                    <div 
                      key={art.id}
                      onClick={() => onSelectArticle(art)}
                      className="border rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition flex gap-4 cursor-pointer items-center dark:border-neutral-800 dark:bg-neutral-950"
                    >
                      <img src={art.image} alt={art.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black uppercase text-orange-600 tracking-wider bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded">{art.category}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-white mt-1 truncate">{art.title}</h4>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{art.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-400">
                          <span>{art.date}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={(e) => handleShare(art.title, art.slug, e)}
                          className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-400 hover:text-neutral-600"
                          title="Share"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => onToggleBookmark(art.id, e)}
                          className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 hover:text-red-700"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIKED ARTICLES */}
          {activeTab === 'liked' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-neutral-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-orange-600" />
                <span>Articles You Liked ({likedArticles.length})</span>
              </h3>

              {likedArticles.length === 0 ? (
                <div className="border border-dashed rounded-2xl p-12 text-center bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
                  <Heart className="h-8 w-8 mx-auto text-neutral-300 mb-3 animate-pulse" />
                  <p className="text-xs font-bold text-neutral-500">No liked articles yet.</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Liking articles shows creators support and grants you loyalty points!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {likedArticles.map(art => (
                    <div 
                      key={art.id}
                      onClick={() => onSelectArticle(art)}
                      className="border rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition flex gap-4 cursor-pointer items-center dark:border-neutral-800 dark:bg-neutral-950"
                    >
                      <img src={art.image} alt={art.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black uppercase text-orange-600 tracking-wider bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded">{art.category}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-white mt-1 truncate">{art.title}</h4>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-400">
                          <span className="flex items-center gap-1 text-red-500"><Heart className="h-3 w-3 fill-current" /> {art.likes} likes</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {art.views} views</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleLike(art.id)}
                          className="rounded-full bg-red-50 text-red-600 border border-red-100 p-2 text-xs font-bold transition hover:bg-red-100 dark:bg-red-950/40 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950"
                        >
                          Unlike
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: READING HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <History className="h-4 w-4 text-orange-600" />
                  <span>Your Reading History ({historyArticles.length})</span>
                </h3>
                {historyArticles.length > 0 && (
                  <button 
                    onClick={onClearReadingHistory}
                    className="text-[10px] font-black uppercase text-red-600 hover:underline tracking-wider"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {historyArticles.length === 0 ? (
                <div className="border border-dashed rounded-2xl p-12 text-center bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
                  <History className="h-8 w-8 mx-auto text-neutral-300 mb-3" />
                  <p className="text-xs font-bold text-neutral-500">No reading history yet.</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Start reading published articles, news, and insights to build your profile history!</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-neutral-100 dark:border-neutral-800 ml-4 pl-6 space-y-6">
                  {historyArticles.map((art, idx) => (
                    <div key={`${art.id}-${idx}`} className="relative group">
                      {/* Circle icon marker */}
                      <span className="absolute -left-[31px] top-1 bg-white border-2 border-orange-500 rounded-full w-4 h-4 dark:bg-neutral-950" />
                      
                      <div 
                        onClick={() => onSelectArticle(art)}
                        className="rounded-2xl border bg-white p-4 hover:shadow-sm transition cursor-pointer dark:border-neutral-800 dark:bg-neutral-950 hover:border-orange-500/40 flex justify-between items-center gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase text-neutral-400">{art.category}</span>
                            <span className="text-[9px] text-neutral-300">•</span>
                            <span className="text-[9px] text-neutral-400">{art.readTime}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-neutral-800 dark:text-white mt-1 group-hover:text-orange-600 transition">{art.title}</h4>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
