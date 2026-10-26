import React from 'react';
import { BookOpen, CheckCircle, ChevronRight, Sparkles, Award } from 'lucide-react';
import { GrammarTopic, UserProgress } from '../types/grammar';

interface TopicCardProps {
  topic: GrammarTopic;
  progress: UserProgress;
  onSelectTopic: (topic: GrammarTopic) => void;
  onOpenPdf: (pageNumber: number, title: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  progress,
  onSelectTopic,
  onOpenPdf
}) => {
  const isCompleted = progress.completedTopics.includes(topic.id);
  const score = progress.topicScores[topic.id];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
              #{topic.id}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {topic.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                {score ? `${score.percentage}%` : 'Đã học'}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPdf(topic.pageNumber, topic.title);
              }}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title={`Mở trang ${topic.pageNumber} sách PDF`}
              aria-label={`Xem trang ${topic.pageNumber} sách PDF`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-1">
          {topic.title}
        </h4>
        <div className="text-xs font-medium text-slate-400 mb-2">
          {topic.englishTitle}
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {topic.summary}
        </p>

        {/* Mnemonic Teaser */}
        {topic.mnemonics && topic.mnemonics.length > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 font-medium line-clamp-1 flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{topic.mnemonics[0]}</span>
          </div>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          {topic.exercises.length} câu bài tập • Trang {topic.pageNumber}
        </span>
        <button
          onClick={() => onSelectTopic(topic)}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Học ngay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
