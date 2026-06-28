import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  BookOpen, 
  Bell, 
  Menu, 
  X, 
  Trophy, 
  Sparkles,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeCategory: string;
  setActiveCategory: (cat: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userPoints: number;
  userTier: 'Free' | 'Premium';
  setShowLoginModal: (val: boolean) => void;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  onOpenNewsletter: () => void;
  isAdmin: boolean;
}

export default function Header({
  darkMode,
  setDarkMode,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  userPoints,
  userTier,
  setShowLoginModal,
  isLoggedIn,
  username,
  onLogout,
  onOpenNewsletter,
  isAdmin
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'Home', icon: '🏠' },
    { id: 'food', label: 'Food', icon: '🍲' },
    { id: 'business', label: 'Business', icon: '🍽' },
    { id: 'bengaluru', label: 'Bengaluru News', icon: '🏙' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'puzzles', label: 'Quiz', icon: '🧩' },
    { id: 'about', label: 'About Us', icon: 'ℹ️' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/95" id="tadka-header">
      {/* Top Banner Alert / Announcement */}
      <div className="bg-orange-600 py-1.5 px-4 text-center text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 animate-pulse text-yellow-300" />
        <span>Tadka Time Premium is LIVE! Get restaurant blueprints & premium recipes today.</span>
        <button 
          onClick={() => setActiveCategory('shop')}
          className="underline hover:text-orange-100 ml-1 transition"
        >
          Explore Shop
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div 
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="flex cursor-pointer items-center gap-2 transition hover:opacity-90"
            id="brand-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-lg shadow-orange-100 dark:shadow-none">
              <Flame className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tighter text-slate-800 dark:text-white">
                Tadka<span className="text-orange-600 font-extrabold">Time</span>
              </span>
              <p className="text-[9px] text-slate-500 dark:text-neutral-400 font-bold tracking-widest uppercase">
                Spice Up Your Day
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative" id="search-desktop">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
            </div>
            <input
              type="text"
              placeholder="Search recipes, city news, financial guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:bg-neutral-950"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Utility Controls & User Profile */}
          <div className="flex items-center gap-3">
            {/* Gamification Points Badge */}
            <div 
              onClick={() => setActiveCategory('puzzles')}
              className="flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900"
              title="Your loyalty rewards points. Play quizzes to earn more!"
            >
              <Trophy className="h-3.5 w-3.5 text-orange-600" />
              <span>{userPoints} pts</span>
            </div>

            {/* Newsletter Button */}
            <button
              onClick={onOpenNewsletter}
              className="hidden lg:flex items-center gap-1.5 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 px-3.5 py-1 text-xs font-semibold border border-orange-100 transition dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-900"
            >
              <Bell className="h-3.5 w-3.5 animate-bounce text-orange-600" />
              <span>Subscribe</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Theme"
              id="theme-toggle"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Profile / Login */}
            <div className="relative">
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 p-1 pr-3 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      {username}
                    </span>
                    {userTier === 'Premium' && (
                      <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase leading-none">
                        PRO
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-950 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b dark:border-neutral-800 mb-1">
                        <p className="text-xs text-neutral-400">Signed in as</p>
                        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">{username}</p>
                        <p className="text-[10px] mt-0.5 font-semibold text-orange-600">Tier: {userTier} Member</p>
                      </div>

                      <button
                        onClick={() => { setActiveCategory('dashboard'); setShowProfileDropdown(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        <User className="h-4 w-4 text-neutral-400" />
                        My Dashboard & saves
                      </button>

                      <button
                        onClick={() => { setActiveCategory('admin'); setShowProfileDropdown(false); }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-neutral-400" />
                          <span>Admin Panel / CMS</span>
                        </div>
                        {isAdmin ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black dark:bg-emerald-950/40 dark:text-emerald-400">Chief</span>
                        ) : (
                          <span className="text-[9px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-black dark:bg-neutral-900 dark:text-neutral-400">🔒 Lock</span>
                        )}
                      </button>

                      <hr className="my-1 border-neutral-100 dark:border-neutral-800" />
                      
                      <button
                        onClick={() => { onLogout(); setShowProfileDropdown(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 px-4 py-2 text-xs font-bold text-white dark:text-neutral-950 transition shadow-sm"
                  id="login-button"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Join Club</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-900"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Category Navigation Menu Bar - Desktop */}
      <nav className="hidden md:block border-t border-neutral-100 bg-neutral-50/50 py-1 dark:border-neutral-900 dark:bg-neutral-950/40" id="category-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/10'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Shortcuts */}
            <div className="flex items-center gap-2 border-l border-neutral-200 pl-4 dark:border-neutral-800">
              <button 
                onClick={() => setActiveCategory('dashboard')}
                className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1.5 rounded-md transition ${
                  activeCategory === 'dashboard'
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/20'
                    : 'text-neutral-500 hover:text-orange-600 dark:text-neutral-400'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveCategory('admin')}
                className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition ${
                  activeCategory === 'admin'
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/20'
                    : 'text-neutral-500 hover:text-orange-600 dark:text-neutral-400'
                }`}
              >
                <span>CMS Panel</span>
                {!isAdmin && <span className="text-[9px] opacity-75">🔒</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 shadow-inner dark:bg-neutral-950 dark:border-neutral-800 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-sm outline-none transition dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          {/* Mobile Categories list */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-2 mb-2">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <hr className="border-neutral-100 dark:border-neutral-800" />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setActiveCategory('dashboard'); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => { setActiveCategory('admin'); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              <Settings className="h-4 w-4" />
              <span>CMS Panel</span>
              {!isAdmin && <span className="text-[10px]">🔒</span>}
            </button>
          </div>

          {/* Mobile Newsletter button */}
          <button
            onClick={() => { onOpenNewsletter(); setMobileMenuOpen(false); }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 py-2.5 text-xs font-bold dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-900"
          >
            <Bell className="h-4 w-4" />
            <span>Subscribe to Newsletter</span>
          </button>
        </div>
      )}
    </header>
  );
}
