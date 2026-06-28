import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Lock, 
  Send, 
  ExternalLink,
  Twitter,
  Facebook,
  Link2,
  CheckCircle2,
  X,
  Clock,
  Calendar,
  List,
  ChevronRight,
  BookOpen,
  ThumbsUp
} from 'lucide-react';
import { Article, Comment, Author, AffiliateProduct } from '../types';

interface ArticleViewProps {
  key?: string | number;
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  userTier: 'Free' | 'Premium';
  onUpgradeTier: () => void;
  comments: Comment[];
  onAddComment: (articleId: string, content: string) => void;
  onToggleLike: (articleId: string) => void;
  hasLiked: boolean;
  allArticles: Article[];
  onSelectArticle: (art: Article) => void;
  setActiveCategory: (cat: string) => void;
}

export default function ArticleView({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  userTier,
  onUpgradeTier,
  comments,
  onAddComment,
  onToggleLike,
  hasLiked,
  allArticles,
  onSelectArticle,
  setActiveCategory
}: ArticleViewProps) {
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const articleComments = comments.filter(c => c.articleId === article.id);
  const isGated = article.isPremium && userTier === 'Free';

  // Generate customized Table of Contents based on article category / slug
  const getTOCForArticle = (slug: string) => {
    if (slug.includes('butter-chicken')) {
      return [
        { title: 'Murgh Makhani Heritage & Introduction', index: 0 },
        { title: 'The Makhani Sauce Secrets', index: 1 },
        { title: 'Prepping the Overnight Marinade', index: 2 },
        { title: 'Compiling the Silky Tomato Gravy', index: 3 },
        { title: 'Culinary Pairings & Serving', index: 4 }
      ];
    } else if (slug.includes('dosa')) {
      return [
        { title: 'The Aromas of VV Puram Street', index: 0 },
        { title: 'Anatomy of Bengaluru Ghee Roast', index: 1 },
        { title: 'The Golden Batter Ratio Formula', index: 2 },
        { title: 'Harnessing Cast-Iron Griddles', index: 3 },
        { title: 'Accompanying Chutneys & Saagu', index: 4 }
      ];
    } else if (slug.includes('high-protein')) {
      return [
        { title: 'Nutrition vs IT Corporate Schedules', index: 0 },
        { title: 'Breaking the Protein Myth', index: 1 },
        { title: 'High-Protein Indian Meal Prep Guides', index: 2 },
        { title: 'Sunday Meal Prep Time Hacks', index: 3 },
        { title: 'Financial & Energy Payoffs', index: 4 }
      ];
    } else if (slug.includes('cloud-kitchen')) {
      return [
        { title: 'The Ghost Kitchen Myth of 2026', index: 0 },
        { title: 'Cost Savings vs Operational Realities', index: 1 },
        { title: 'Dissecting the Unit Economics', index: 2 },
        { title: 'Platforms Commissions & Marketing CAC', index: 3 },
        { title: 'Direct Ordering and Waste Control', index: 4 }
      ];
    } else if (slug.includes('food-cost-formula')) {
      return [
        { title: 'Why Restaurants Fail in Year One', index: 0 },
        { title: 'The Target Food Cost Margin Ratio', index: 1 },
        { title: 'The Step-by-Step Plate Costing Formula', index: 2 },
        { title: 'Factoring in the Kitchen "K-Factor"', index: 3 },
        { title: 'Downloadable Menu Pricing Spreadsheets', index: 4 }
      ];
    } else if (slug.includes('food-festival-2026')) {
      return [
        { title: 'South India’s Premier Culinary Celebration', index: 0 },
        { title: 'Stall Categories & Must-Visit Hubs', index: 1 },
        { title: 'Live Cooking & Culinary Theatres', index: 2 },
        { title: 'Tickets, Timings & Namma Metro Shuttles', index: 3 },
        { title: 'Pre-crediting Your Digital Festival Wallet', index: 4 }
      ];
    } else if (slug.includes('yellow-line')) {
      return [
        { title: 'Electronic City Road Congestion Relief', index: 0 },
        { title: 'Metro Yellow Line Progress Update', index: 1 },
        { title: 'Silk Board to Bommasandra Station Grid', index: 2 },
        { title: 'Driverless Trains Frequency & Speed', index: 3 },
        { title: 'Safety Sign-offs & Commercial Launch', index: 4 }
      ];
    } else if (slug.includes('sip-mutual-fund')) {
      return [
        { title: 'Salaried Financial Freedom Strategy', index: 0 },
        { title: 'Systematic Investment Plan Discipline', index: 1 },
        { title: 'The Power of Compounding Numbers', index: 2 },
        { title: 'Step-Up SIP: Your Compound Multiplier', index: 3 },
        { title: 'Interactive Retirement Portfolio Planners', index: 4 }
      ];
    } else if (slug.includes('tax-saving')) {
      return [
        { title: 'Beyond the 80C Investment Rush', index: 0 },
        { title: 'Claiming NPS Section 80CCD Deductions', index: 1 },
        { title: 'Optimizing Health Insurance Premiums', index: 2 },
        { title: 'HRA, Home Loans & LTA Allowances', index: 3 },
        { title: 'New Tax Regime vs Old Tax Regime Maps', index: 4 }
      ];
    } else if (slug.includes('generative-ai')) {
      return [
        { title: 'Koramangala & HSR Tech Corridors', index: 0 },
        { title: 'AI Co-Pilots Writing 40% of Codebase', index: 1 },
        { title: 'CTO Surveys on Review Complexity', index: 2 },
        { title: 'Are Junior Developers Becoming Obsolete?', index: 3 },
        { title: 'Transforming From Coders to Orchestrators', index: 4 }
      ];
    }
    // Fallback generator based on paragraphs
    return article.content.slice(0, 4).map((p, i) => ({
      title: `Overview and Core Insights - Part ${i + 1}`,
      index: i
    }));
  };

  const tocList = getTOCForArticle(article.id);

  const scrollToParagraph = (index: number) => {
    const element = document.getElementById(`paragraph-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href || 'https://www.tadkatime.online');
    const text = encodeURIComponent(`Read "${article.title}" on Tadka Time!`);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(window.location.href || 'https://www.tadkatime.online');
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(article.id, commentText);
    setCommentText('');
  };

  // Filter Related Articles (same category, excluding current article)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Filter other articles by Ravi Kumar
  const moreByRavi = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      id={`article-reader-${article.id}`}
    >
      {/* Breadcrumbs Navigation */}
      <nav className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex flex-wrap items-center gap-1.5 font-sans" aria-label="Breadcrumb">
        <button onClick={onBack} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <button onClick={() => { setActiveCategory(article.category); onBack(); }} className="hover:text-orange-600 transition capitalize">{article.category}</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold line-clamp-1">{article.title}</span>
      </nav>

      {/* Primary Action Row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 px-4 text-xs font-bold text-neutral-600 transition hover:border-orange-500 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
          id="back-feed-btn"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
              isBookmarked 
                ? 'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900/40 dark:bg-orange-950/20' 
                : 'border-neutral-200 bg-white text-neutral-400 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-950'
            }`}
            title={isBookmarked ? "Saved Story" : "Save Story"}
            id="bookmark-article-btn"
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>

          {/* Inline Social Share Controls */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-950"
              title="Share Article"
            >
              <Share2 className="h-4 w-4" />
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-100 bg-white p-2 shadow-xl z-10 dark:bg-neutral-950 dark:border-neutral-800">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-3 py-1">Share on</p>
                <button onClick={() => { handleShare('twitter'); setShowShareMenu(false); }} className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 dark:text-neutral-300 dark:hover:bg-neutral-900">
                  <span className="text-neutral-400">🐦</span> X / Twitter
                </button>
                <button onClick={() => { handleShare('facebook'); setShowShareMenu(false); }} className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 dark:text-neutral-300 dark:hover:bg-neutral-900">
                  <span className="text-neutral-400">🌐</span> Facebook
                </button>
                <button onClick={() => { handleShare('whatsapp'); setShowShareMenu(false); }} className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 dark:text-neutral-300 dark:hover:bg-neutral-900">
                  <span className="text-neutral-400">💬</span> WhatsApp
                </button>
                <button onClick={() => { handleShare('linkedin'); setShowShareMenu(false); }} className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 dark:text-neutral-300 dark:hover:bg-neutral-900">
                  <span className="text-neutral-400">💼</span> LinkedIn
                </button>
                <hr className="my-1.5 dark:border-neutral-800" />
                <button onClick={() => { handleShare('copy'); setShowShareMenu(false); }} className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 dark:text-neutral-300 dark:hover:bg-neutral-900">
                  <Link2 className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Page URL'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title & Metadata Header */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider dark:bg-orange-950/30 dark:text-orange-400">
            🍲 {article.category}
          </span>
          {article.isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1 text-xs font-extrabold text-white uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3 w-3 text-yellow-300" />
              <span>Premium Exclusive</span>
            </span>
          )}
          {article.isSponsored && (
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-extrabold text-neutral-100 uppercase tracking-wider dark:bg-white dark:text-neutral-950">
              Sponsored Content
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
          {article.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
          {article.excerpt}
        </p>

        {/* Author Bio Card Header */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-100 py-4 dark:border-neutral-900">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover border-2 border-orange-500/20"
            />
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white">{article.author.name}</h4>
              <p className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-medium font-sans">
                {article.author.role} • Published {article.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 dark:text-neutral-500 font-sans">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Last updated: June 27, 2026
            </span>
          </div>
        </div>
      </header>

      {/* Prominent Floating Social Sharing Strip */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-neutral-50 rounded-xl dark:bg-neutral-900/40">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mr-2">Share this:</span>
        <button onClick={() => handleShare('twitter')} className="flex items-center gap-1 bg-white hover:bg-neutral-50 border border-neutral-200/60 text-xs px-3 py-1.5 rounded-lg text-neutral-700 font-bold dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-300">
          <span>🐦</span> <span>X</span>
        </button>
        <button onClick={() => handleShare('facebook')} className="flex items-center gap-1 bg-white hover:bg-neutral-50 border border-neutral-200/60 text-xs px-3 py-1.5 rounded-lg text-neutral-700 font-bold dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-300">
          <span>🌐</span> <span>Facebook</span>
        </button>
        <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-1 bg-white hover:bg-neutral-50 border border-neutral-200/60 text-xs px-3 py-1.5 rounded-lg text-neutral-700 font-bold dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-300">
          <span>💬</span> <span>WhatsApp</span>
        </button>
        <button onClick={() => handleShare('linkedin')} className="flex items-center gap-1 bg-white hover:bg-neutral-50 border border-neutral-200/60 text-xs px-3 py-1.5 rounded-lg text-neutral-700 font-bold dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-300">
          <span>💼</span> <span>LinkedIn</span>
        </button>
        <button onClick={() => handleShare('copy')} className="flex items-center gap-1 bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold ml-auto hover:bg-orange-700">
          <Link2 className="h-3 w-3" />
          <span>{copiedLink ? 'Copied' : 'Copy link'}</span>
        </button>
      </div>

      {/* TABLE OF CONTENTS CARD */}
      <div className="mb-8 border border-neutral-100 bg-white p-5 rounded-2xl shadow-sm dark:bg-neutral-950 dark:border-neutral-800" id="table-of-contents-box">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <List className="h-4 w-4 text-orange-600" />
          <span>Table of Contents</span>
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-300 font-sans">
          {tocList.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => scrollToParagraph(item.index)}
                className="w-full text-left font-semibold hover:text-orange-600 flex items-start gap-1.5 transition py-1 hover:bg-neutral-50 rounded dark:hover:bg-neutral-900/40 px-1"
              >
                <span className="text-orange-600 font-extrabold shrink-0">0{item.index + 1}.</span>
                <span className="line-clamp-1">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Cover Image */}
      <div className="relative mb-8 overflow-hidden rounded-2xl aspect-video border dark:border-neutral-800">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Reading Core */}
      <div className="prose prose-neutral max-w-none dark:prose-invert" id="article-content-body">
        {isGated ? (
          // Paywall Overlay Gating
          <div className="relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50/50 to-orange-100/50 p-6 text-center dark:border-orange-900/40 dark:from-orange-950/20 dark:to-neutral-900 shadow-sm" id="premium-paywall">
            <p className="text-sm text-neutral-400 dark:text-neutral-600 line-clamp-2 blur-xs select-none">
              {article.content[0]}
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-neutral-950 dark:via-neutral-950/80" />

            <div className="relative z-10 pt-10 pb-6 max-w-md mx-auto">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-500/20 animate-bounce">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                Unlock This Premium Recipe & Blueprint
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                Tadka Time Premium subscribers gain access to high-protein meal plans, restaurant gross margin tools, and private street food recipes.
              </p>

              {/* Plans Grid */}
              <div className="mt-6 border border-neutral-200/60 bg-white p-4 rounded-xl text-left shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-sm font-bold text-neutral-900 dark:text-white">Monthly Club Pass</h5>
                    <p className="text-xs text-neutral-400">Cancel anytime, full 24/7 access</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-orange-600">₹149</span>
                    <span className="text-xs text-neutral-400"> / mo</span>
                  </div>
                </div>
                <button
                  onClick={onUpgradeTier}
                  className="mt-4 w-full rounded-lg bg-orange-600 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/10 hover:bg-orange-700 transition"
                >
                  Join Premium Club Now
                </button>
              </div>

              <p className="mt-4 text-[10px] text-neutral-400">
                Join 1,250+ food business owners & chefs who trust Tadka Time Premium daily.
              </p>
            </div>
          </div>
        ) : (
          // Full Reading Content
          <div className="space-y-6 text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base">
            {article.content.map((para, idx) => (
              <React.Fragment key={idx}>
                <p id={`paragraph-${idx}`} className="font-sans font-light border-l-2 border-transparent hover:border-orange-500 pl-3 transition-all duration-200">
                  {para}
                </p>

                {/* Google AdSense Integration Banner (rendered after Paragraph 2) */}
                {idx === 1 && (
                  <div className="my-8 overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center dark:border-neutral-800 dark:bg-neutral-900" id="adsense-banner">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">Advertisement • Sponsored Ad</span>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 py-6 px-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 dark:from-neutral-950 dark:to-neutral-950 border border-orange-100 dark:border-neutral-800">
                      <div className="text-left">
                        <span className="bg-orange-500/10 text-orange-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full dark:bg-orange-950/40">Zomato Special</span>
                        <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mt-1">Get 50% Off on North Indian Diners in Bengaluru!</h4>
                        <p className="text-xs text-neutral-500">Use promo code <span className="font-bold text-orange-600">TADKA50</span> inside the Zomato App.</p>
                      </div>
                      <a 
                        href="https://zomato.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rounded-full bg-red-500 hover:bg-red-600 px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1 whitespace-nowrap"
                      >
                        <span>Order Now</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Affiliate Marketing Integration System */}
            {article.affiliateProducts && article.affiliateProducts.length > 0 && (
              <div className="mt-10 border border-orange-200 bg-orange-50/20 rounded-xl p-5 dark:border-orange-900/30 dark:bg-orange-950/10" id="affiliate-widget">
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 text-orange-600 text-[10px] font-extrabold px-3 py-1 tracking-wider uppercase mb-3 dark:bg-orange-950/40 dark:text-orange-400">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  <span>Editor Recommended Resource</span>
                </span>
                
                {article.affiliateProducts.map((prod) => (
                  <div key={prod.id} className="flex flex-col sm:flex-row gap-4 items-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full sm:w-28 h-28 object-cover rounded-xl border dark:border-neutral-800"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">{prod.name}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{prod.description}</p>
                      <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <span className="text-base font-extrabold text-neutral-900 dark:text-white">{prod.price}</span>
                        <a
                          href={prod.affiliateUrl}
                          className="inline-flex items-center gap-1 rounded-lg bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-bold text-white transition"
                        >
                          <span>Get Template</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reaction likes widget */}
        <div className="mt-8 flex items-center justify-between border-y py-4 dark:border-neutral-900">
          <button
            onClick={() => onToggleLike(article.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border transition ${
              hasLiked 
                ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-900' 
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:border-neutral-800'
            }`}
            id={`like-btn-${article.id}`}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
            <span>{hasLiked ? 'Liked!' : 'Enjoyed this? Leave a Like'}</span>
            <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-xs dark:bg-neutral-800 dark:text-neutral-300 font-sans">
              {article.likes}
            </span>
          </button>

          <div className="text-xs text-neutral-400 font-semibold font-sans">
            {article.views} views • {articleComments.length} discussions
          </div>
        </div>

        {/* AUTHOR BIO PANEL */}
        <div className="mt-8 p-6 border rounded-2xl bg-neutral-50/50 flex flex-col sm:flex-row gap-5 dark:bg-neutral-950/40 dark:border-neutral-900" id="author-bio-section">
          <img
            src="/Ravi.png"
            alt="Ravi Kumar"
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange-500 shadow-sm shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">Written by: Ravi Kumar</h4>
              <span className="text-[9px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full dark:bg-orange-950/40">Founder</span>
            </div>
            <p className="text-xs text-orange-600 font-bold mt-0.5 font-sans">Founder of Tadka Time & Dabba Meals</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed font-sans font-light">
              Ravi Kumar is a food entrepreneur, digital publisher, and technology professional. With experience as an RPA Developer and in running Dabba Meals, he founded Tadka Time to share authentic recipes, restaurant strategies, Bengaluru local news, and financial guides.
            </p>
            <div className="mt-3">
              <button 
                onClick={() => { setActiveCategory('about'); onBack(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1.5 transition"
              >
                <span>View Author Profile & Story</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* MORE ARTICLES BY RAVI KUMAR SECTION */}
        {moreByRavi.length > 0 && (
          <div className="mt-12 pt-8 border-t dark:border-neutral-900" id="author-more-articles">
            <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">
              More articles by Ravi Kumar
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {moreByRavi.map((art) => (
                <div 
                  key={art.id} 
                  onClick={() => { onSelectArticle(art); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer border rounded-2xl p-4 bg-white hover:shadow-md transition dark:bg-neutral-950 dark:border-neutral-900"
                >
                  <div className="aspect-video overflow-hidden rounded-xl bg-neutral-100 mb-3 relative">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      referrerPolicy="no-referrer"
                    />
                    {art.isPremium && (
                      <span className="absolute top-2 right-2 bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                    {art.category}
                  </h4>
                  <h5 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition dark:text-white line-clamp-1">
                    {art.title}
                  </h5>
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1 font-sans">
                    <Clock className="h-3 w-3" /> {art.readTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t dark:border-neutral-900" id="related-articles-section">
            <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <div 
                  key={art.id} 
                  onClick={() => { onSelectArticle(art); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden rounded-xl bg-neutral-100 mb-2 relative border dark:border-neutral-900">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition dark:text-white line-clamp-2 leading-snug">
                    {art.title}
                  </h5>
                  <p className="text-[10px] text-neutral-400 mt-1 font-sans font-medium">
                    {art.readTime} • Published {art.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t dark:border-neutral-900" id="comments-section">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-orange-600" />
            <span>Discussions ({articleComments.length})</span>
          </h3>

          {/* New Comment Submission Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="relative">
              <textarea
                placeholder="Share your thoughts on this recipe or report. Keep it friendly!"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white p-4 pr-12 text-xs font-semibold outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
              <button
                type="submit"
                className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition shadow"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          {articleComments.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-xl border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-400">No comments yet. Be the first to start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articleComments.map((comm) => (
                <div key={comm.id} className="flex gap-3 p-4 rounded-xl border border-neutral-100 bg-white dark:border-neutral-900 dark:bg-neutral-950">
                  <img
                    src={comm.authorAvatar}
                    alt={comm.author}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-neutral-900 dark:text-white">{comm.author}</h5>
                      <span className="text-[10px] text-neutral-400 font-sans">{comm.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed font-sans">
                      {comm.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
