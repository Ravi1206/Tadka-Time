import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Article, Category } from '../types';

interface ArticleCardProps {
  key?: string | number;
  article: Article;
  onSelect: (art: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  index: number;
}

export default function ArticleCard({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  index
}: ArticleCardProps) {
  
  const getCategoryTheme = (cat: Category) => {
    switch (cat) {
      case 'food':
        return { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-100 dark:border-orange-900', icon: '🍲' };
      case 'business':
        return { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-900', icon: '🍽' };
      case 'bengaluru':
        return { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-900', icon: '🏙' };
      case 'puzzles':
        return { bg: 'bg-pink-50 dark:bg-pink-950/40', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-100 dark:border-pink-900', icon: '🧩' };
      case 'finance':
        return { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-900', icon: '💰' };
      default:
        return { bg: 'bg-neutral-50 dark:bg-neutral-950/40', text: 'text-neutral-600 dark:text-neutral-400', border: 'border-neutral-100 dark:border-neutral-900', icon: '📚' };
    }
  };

  const theme = getCategoryTheme(article.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
      id={`article-card-${article.id}`}
    >
      {/* Article Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Categories / Badges Overlays */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${theme.bg} ${theme.text} ${theme.border}`}>
            <span>{theme.icon}</span>
            <span>{article.category === 'business' ? 'Biz Tips' : article.category}</span>
          </span>

          {article.isPremium && (
            <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-600 text-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3 w-3 animate-spin text-yellow-300" />
              <span>Premium</span>
            </span>
          )}

          {article.isSponsored && (
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-900/95 text-neutral-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
              <span>Sponsor: {article.sponsorName}</span>
            </span>
          )}
        </div>

        {/* Bookmark Action Bubble */}
        <button
          onClick={(e) => onToggleBookmark(article.id, e)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-neutral-700 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 dark:bg-neutral-900/95 dark:text-neutral-300"
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
          id={`bookmark-btn-${article.id}`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-4.5 w-4.5 text-orange-600 fill-orange-600" />
          ) : (
            <Bookmark className="h-4.5 w-4.5 text-neutral-500 hover:text-orange-600" />
          )}
        </button>

        {/* Date / Readtime bottom pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-neutral-950/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2 text-xs text-neutral-400 font-semibold">
          <span>{article.date}</span>
          <span>•</span>
          <span>By {article.author.name}</span>
        </div>

        <h3 
          onClick={() => onSelect(article)}
          className="cursor-pointer text-base sm:text-lg font-bold tracking-tight text-neutral-900 transition-colors line-clamp-2 hover:text-orange-600 dark:text-white dark:hover:text-orange-500"
        >
          {article.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-50 dark:border-neutral-900">
          
          {/* Reaction Statistics */}
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1" title="Views">
              <Eye className="h-3.5 w-3.5" />
              <span>{article.views}</span>
            </span>
            <span className="flex items-center gap-1" title="Likes">
              <Heart className="h-3.5 w-3.5 text-red-500" />
              <span>{article.likes}</span>
            </span>
          </div>

          <button
            onClick={() => onSelect(article)}
            className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
          >
            <span>Read Article</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
