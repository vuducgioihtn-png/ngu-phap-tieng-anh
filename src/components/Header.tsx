import React from 'react';
import { BookOpen, Search, Sparkles, Flame, CheckCircle2, Moon, Sun, Layers, Shuffle, Sliders, Compass, MessageSquareQuote } from 'lucide-react';
import { UserProgress } from '../types/grammar';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
  progress: UserProgress;
  onOpenPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  activeNav,
  onNavChange,
  progress,
  onOpenPdf
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => onNavChange('all')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  GrammarVisi
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  Lê Công Đức
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Ngữ Pháp Tiếng Anh Trực Quan & Dễ Nhớ
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm chủ đề (12 thì, bị động, wish, used to, giới từ, if...)"
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                aria-label="Tìm kiếm chủ đề ngữ pháp"
              />
            </div>
          </div>

          {/* User Progress Stats & PDF button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300 text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
              <span>{progress.streakDays} ngày</span>
            </div>

            {/* Learned Count */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{progress.completedTopics.length} đã học</span>
            </div>

            {/* Open Original PDF Button */}
            <button
              onClick={onOpenPdf}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all shadow-xs"
              title="Đọc toàn bộ sách PDF 196 trang"
              aria-label="Xem sách PDF gốc"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="hidden lg:inline">Sách Gốc (PDF)</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm ngữ pháp..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
              aria-label="Tìm kiếm chủ đề trên điện thoại"
            />
          </div>
        </div>

        {/* Visual Tools Navigation Bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onNavChange('all')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📚 Danh Mục Chủ Đề
          </button>
          <button
            onClick={() => onNavChange('pronouns')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'pronouns'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            👤 Đại Từ & Tranh Trang 5
          </button>
          <button
            onClick={() => onNavChange('thisthat')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'thisthat'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🐱 This / That Lab
          </button>
          <button
            onClick={() => onNavChange('nouns')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'nouns'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🍎 Danh Từ C vs U
          </button>
          <button
            onClick={() => onNavChange('presentsimple')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'presentsimple'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⚡ Hiện Tại Đơn (Trang 18-20)
          </button>
          <button
            onClick={() => onNavChange('presentcontinuous')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'presentcontinuous'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🔥 Hiện Tại Tiếp Diễn (Trang 21-23)
          </button>
          <button
            onClick={() => onNavChange('presentperfect')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'presentperfect'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ✨ Hiện Tại Hoàn Thành (Trang 24-25)
          </button>
          <button
            onClick={() => onNavChange('presentperfectcontinuous')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'presentperfectcontinuous'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⏳ HTHT Tiếp Diễn (Trang 26-28)
          </button>
          <button
            onClick={() => onNavChange('pastsimple')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'pastsimple'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📜 Quá Khứ Đơn (Trang 29-31)
          </button>
          <button
            onClick={() => onNavChange('pastcontinuous')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'pastcontinuous'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⚡ QK Tiếp Diễn (Trang 32-33)
          </button>
          <button
            onClick={() => onNavChange('pastperfect')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'pastperfect'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🎯 QK Hoàn Thành (Trang 34-35)
          </button>
          <button
            onClick={() => onNavChange('timeline')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'timeline'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⏱️ Trục 12 Thì
          </button>
          <button
            onClick={() => onNavChange('passive')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'passive'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            Bị Động Lab
          </button>
          <button
            onClick={() => onNavChange('reported')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'reported'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Tường Thuật
          </button>
          <button
            onClick={() => onNavChange('conditionals')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'conditionals'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Điều Kiện If
          </button>
          <button
            onClick={() => onNavChange('prepositions')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'prepositions'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Giới Từ In/On/At
          </button>
          <button
            onClick={() => onNavChange('lab')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
              activeNav === 'lab'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Cú Pháp Lab
          </button>
        </div>
      </div>
    </header>
  );
};
