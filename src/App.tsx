import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Shuffle, 
  MessageSquareQuote, 
  Sliders, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Flame, 
  Award, 
  HelpCircle,
  Search,
  ChevronRight,
  Filter,
  GraduationCap
} from 'lucide-react';
import { CATEGORIES, GRAMMAR_TOPICS } from './data/grammarData';
import { CategoryId, GrammarTopic, UserProgress } from './types/grammar';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { LessonDetail } from './components/LessonDetail';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { PassiveVoiceTransformer } from './components/PassiveVoiceTransformer';
import { ReportedSpeechSimulator } from './components/ReportedSpeechSimulator';
import { ConditionalsSlider } from './components/ConditionalsSlider';
import { PrepositionVisualizer } from './components/PrepositionVisualizer';
import { GrammarLab } from './components/GrammarLab';
import { PronounsVisualizer } from './components/PronounsVisualizer';
import { ThisThatDistanceLab } from './components/ThisThatDistanceLab';
import { NounsVisualizer } from './components/NounsVisualizer';
import { PresentSimpleLab } from './components/PresentSimpleLab';
import { PresentContinuousLab } from './components/PresentContinuousLab';
import { PresentPerfectLab } from './components/PresentPerfectLab';
import { PresentPerfectContinuousLab } from './components/PresentPerfectContinuousLab';
import { PdfModal } from './components/PdfModal';

const STORAGE_KEY = 'grammarvisi_user_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  completedTopics: [8], // Demo seeded topic 8 completed
  topicScores: {
    8: { correct: 4, total: 4, percentage: 100 }
  },
  bookmarkedTopics: [],
  streakDays: 3,
  lastStudyDate: new Date().toISOString().split('T')[0]
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  const [activeNav, setActiveNav] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);

  // PDF modal state
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfTitle, setPdfTitle] = useState<string>('');

  // Persist progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      // ignore
    }
  }, [progress]);

  // Handle completing a topic exercise session
  const handleCompleteTopic = (
    topicId: number,
    score: { correct: number; total: number; percentage: number }
  ) => {
    setProgress(prev => {
      const alreadyCompleted = prev.completedTopics.includes(topicId);
      const newCompleted = alreadyCompleted
        ? prev.completedTopics
        : [...prev.completedTopics, topicId];

      return {
        ...prev,
        completedTopics: newCompleted,
        topicScores: {
          ...prev.topicScores,
          [topicId]: score
        }
      };
    });
  };

  // Open PDF at page
  const handleOpenPdf = (page: number = 1, title: string = 'Ngữ Pháp Tiếng Anh') => {
    setPdfPage(page);
    setPdfTitle(title);
    setIsPdfOpen(true);
  };

  // Filter topics based on category and search query
  const filteredTopics = useMemo(() => {
    return GRAMMAR_TOPICS.filter(t => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      const inTitle = t.title.toLowerCase().includes(q);
      const inEnTitle = t.englishTitle.toLowerCase().includes(q);
      const inSummary = t.summary.toLowerCase().includes(q);
      const inMnem = t.mnemonics?.some(m => m.toLowerCase().includes(q));

      return inTitle || inEnTitle || inSummary || inMnem;
    });
  }, [selectedCategory, searchTerm]);

  // Switch nav view handler
  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
    setSelectedTopic(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        progress={progress}
        onOpenPdf={() => handleOpenPdf(3, 'Lời Nói Đầu & Giới Thiệu Sách')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If a topic is selected, render the detailed interactive view */}
        {selectedTopic ? (
          <LessonDetail
            topic={selectedTopic}
            progress={progress}
            onBack={() => setSelectedTopic(null)}
            onOpenPdf={handleOpenPdf}
            onCompleteTopic={handleCompleteTopic}
          />
        ) : (
          <>
            {/* View Switching based on Nav */}
            {activeNav === 'pronouns' && (
              <div className="space-y-6">
                <PronounsVisualizer />
              </div>
            )}

            {activeNav === 'thisthat' && (
              <div className="space-y-6">
                <ThisThatDistanceLab />
              </div>
            )}

            {activeNav === 'nouns' && (
              <div className="space-y-6">
                <NounsVisualizer />
              </div>
            )}

            {activeNav === 'presentsimple' && (
              <div className="space-y-6">
                <PresentSimpleLab onOpenPdf={() => handleOpenPdf(18, 'Hiện Tại Đơn (Trang 18-20)')} />
              </div>
            )}

            {activeNav === 'presentcontinuous' && (
              <div className="space-y-6">
                <PresentContinuousLab onOpenPdf={() => handleOpenPdf(21, 'Hiện Tại Tiếp Diễn (Trang 21-23)')} />
              </div>
            )}

            {activeNav === 'presentperfect' && (
              <div className="space-y-6">
                <PresentPerfectLab onOpenPdf={() => handleOpenPdf(24, 'Hiện Tại Hoàn Thành (Trang 24-25)')} />
              </div>
            )}

            {activeNav === 'presentperfectcontinuous' && (
              <div className="space-y-6">
                <PresentPerfectContinuousLab onOpenPdf={() => handleOpenPdf(26, 'Hiện Tại Hoàn Thành Tiếp Diễn (Trang 26-28)')} />
              </div>
            )}

            {activeNav === 'timeline' && (
              <div className="space-y-6">
                <InteractiveTimeline />
              </div>
            )}

            {activeNav === 'passive' && (
              <div className="space-y-6">
                <PassiveVoiceTransformer />
              </div>
            )}

            {activeNav === 'reported' && (
              <div className="space-y-6">
                <ReportedSpeechSimulator />
              </div>
            )}

            {activeNav === 'conditionals' && (
              <div className="space-y-6">
                <ConditionalsSlider />
              </div>
            )}

            {activeNav === 'prepositions' && (
              <div className="space-y-6">
                <PrepositionVisualizer />
              </div>
            )}

            {activeNav === 'lab' && (
              <div className="space-y-6">
                <GrammarLab />
              </div>
            )}

            {activeNav === 'all' && (
              <div className="space-y-8">
                {/* Visual Hero Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl">
                  {/* Decorative background circle */}
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-100 mb-4">
                      <GraduationCap className="w-4 h-4 text-amber-300" />
                      Giáo Trình Chuẩn: Ngữ Pháp Tiếng Anh - Lê Công Đức
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                      Học Ngữ Pháp Trực Quan, Dễ Hiểu & Dễ Nhớ Vĩnh Viễn
                    </h1>

                    <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
                      Bóc tách cấu trúc câu bằng màu sắc trực quan, minh họa tranh truyện hoạt hình (Trang 5), mẹo nhớ nhanh (Ong CHín Sản Xuất SH, Since mốc - For khoảng, Thần chú Have/Get) và hệ thống bài tập thực hành chấm điểm tức thì.
                    </p>

                    {/* Quick Access Badges */}
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => handleNavChange('pronouns')}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>👤 Tranh Đại Từ Trang 5</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('thisthat')}
                        className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>🐱 This / That Lab</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('nouns')}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>🍎 Danh Từ C vs U</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('presentsimple')}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>⚡ Hiện Tại Đơn Lab</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('presentcontinuous')}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>🔥 Hiện Tại Tiếp Diễn Lab</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('presentperfect')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>✨ Hiện Tại Hoàn Thành Lab</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('presentperfectcontinuous')}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>⏳ HTHT Tiếp Diễn Lab</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('timeline')}
                        className="px-4 py-2 rounded-xl bg-white text-blue-800 text-xs font-bold hover:bg-blue-50 transition-all shadow-md flex items-center gap-1.5"
                      >
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Trục 12 Thì</span>
                      </button>
                      <button
                        onClick={() => handleNavChange('passive')}
                        className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
                      >
                        <Shuffle className="w-4 h-4 text-pink-300" />
                        <span>Chuyển Bị Động</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categories Filter Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-600" />
                      Nhóm Chuyên Đề Ngữ Pháp
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Hiển thị {filteredTopics.length} bài học
                    </span>
                  </div>

                  <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      Tất cả ({GRAMMAR_TOPICS.length})
                    </button>
                    {CATEGORIES.map(cat => {
                      const isSelected = selectedCategory === cat.id;
                      const count = GRAMMAR_TOPICS.filter(t => t.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                          }`}
                        >
                          {cat.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Topics Grid */}
                {filteredTopics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTopics.map(topic => (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        progress={progress}
                        onSelectTopic={setSelectedTopic}
                        onOpenPdf={handleOpenPdf}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                      Không tìm thấy bài học nào phù hợp
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Hãy thử tìm với từ khóa khác như "thì", "bị động", "if", "used to", "giới từ"...
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">GrammarVisi</span>
            <span>• Biên soạn dựa theo cẩm nang Ngữ Pháp Tiếng Anh của Lê Công Đức</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenPdf(1, 'Bìa Sách & Mục Lục')}
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem tài liệu PDF gốc (196 trang)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pageNumber={pdfPage}
        topicTitle={pdfTitle}
      />
    </div>
  );
}
