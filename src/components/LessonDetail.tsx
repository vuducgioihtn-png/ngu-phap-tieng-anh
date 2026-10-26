import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Volume2, CheckCircle2, ChevronRight, Layers, HelpCircle } from 'lucide-react';
import { GrammarTopic, UserProgress } from '../types/grammar';
import { ExerciseSession } from './ExerciseSession';
import { InteractiveTimeline } from './InteractiveTimeline';
import { PassiveVoiceTransformer } from './PassiveVoiceTransformer';
import { ReportedSpeechSimulator } from './ReportedSpeechSimulator';
import { ConditionalsSlider } from './ConditionalsSlider';
import { PrepositionVisualizer } from './PrepositionVisualizer';
import { PronounsVisualizer } from './PronounsVisualizer';
import { ThisThatDistanceLab } from './ThisThatDistanceLab';
import { NounsVisualizer } from './NounsVisualizer';
import { PresentSimpleLab } from './PresentSimpleLab';
import { PresentContinuousLab } from './PresentContinuousLab';
import { PresentPerfectLab } from './PresentPerfectLab';
import { PresentPerfectContinuousLab } from './PresentPerfectContinuousLab';
import { PastSimpleLab } from './PastSimpleLab';

interface LessonDetailProps {
  topic: GrammarTopic;
  progress: UserProgress;
  onBack: () => void;
  onOpenPdf: (pageNumber: number, title: string) => void;
  onCompleteTopic: (topicId: number, score: { correct: number; total: number; percentage: number }) => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  topic,
  progress,
  onBack,
  onOpenPdf,
  onCompleteTopic
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const isCompleted = progress.completedTopics.includes(topic.id);
  const score = progress.topicScores[topic.id];

  return (
    <div className="space-y-6">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Quay lại danh sách bài học"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                Bài #{topic.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {topic.difficulty}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  ✓ Hoàn thành ({score?.percentage}%)
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {topic.title}
            </h2>
            <div className="text-sm font-medium text-slate-400">
              {topic.englishTitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenPdf(topic.pageNumber, topic.title)}
            className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 hover:bg-blue-100/70 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mở Trang {topic.pageNumber} Sách Gốc</span>
          </button>
        </div>
      </div>

      {/* View Switcher Tabs (Lý Thuyết vs Luyện Tập) */}
      <div className="flex bg-slate-200/80 dark:bg-slate-800 p-1.5 rounded-2xl w-full sm:w-fit">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'theory'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          📖 Lý Thuyết & Trực Quan Hóa
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'practice'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>✍️ Luyện Tập Trắc Nghiệm ({topic.exercises.length})</span>
          {isCompleted && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-6">
          {/* Summary Callout */}
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            💡 <span className="font-bold text-slate-900 dark:text-white">Tóm tắt ngắn gọn: </span>
            {topic.summary}
          </div>

          {/* Golden Mnemonics ("Mẹo Nhớ Siêu Tốc") */}
          {topic.mnemonics && topic.mnemonics.length > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 dark:from-amber-950/30 dark:to-orange-950/20 border-2 border-amber-300 dark:border-amber-800 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm uppercase tracking-wider mb-3">
                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                Mẹo Nhớ Siêu Tốc Không Thể Quên
              </div>
              <ul className="space-y-2">
                {topic.mnemonics.map((mnem, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-200">
                    <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{mnem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Embedded Specialized Interactive Visual Component */}
          {topic.visualType === 'timeline' && <InteractiveTimeline />}
          {topic.visualType === 'passive_transformer' && <PassiveVoiceTransformer />}
          {topic.visualType === 'speech_shift' && <ReportedSpeechSimulator />}
          {topic.visualType === 'conditionals_slider' && <ConditionalsSlider />}
          {topic.visualType === 'preposition_map' && <PrepositionVisualizer />}
          {topic.visualType === 'pronouns_visualizer' && <PronounsVisualizer />}
          {topic.visualType === 'this_that_lab' && <ThisThatDistanceLab />}
          {topic.visualType === 'nouns_visualizer' && <NounsVisualizer />}
          {topic.visualType === 'present_simple_lab' && <PresentSimpleLab onOpenPdf={() => onOpenPdf(topic.pageNumber, topic.title)} />}
          {topic.visualType === 'present_continuous_lab' && <PresentContinuousLab onOpenPdf={() => onOpenPdf(topic.pageNumber, topic.title)} />}
          {topic.visualType === 'present_perfect_lab' && <PresentPerfectLab onOpenPdf={() => onOpenPdf(topic.pageNumber, topic.title)} />}
          {topic.visualType === 'present_perfect_continuous_lab' && <PresentPerfectContinuousLab onOpenPdf={() => onOpenPdf(topic.pageNumber, topic.title)} />}
          {topic.visualType === 'past_simple_lab' && <PastSimpleLab onOpenPdf={() => onOpenPdf(topic.pageNumber, topic.title)} />}

          {/* Color-Coded Formula Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Công Thức Cốt Lõi Phân Màu (Color-Coded Formulas)
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {topic.formulas.map((form, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {form.label}
                    </span>
                    {form.notes && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {form.notes}
                      </span>
                    )}
                  </div>

                  {/* Formula Code */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-line border border-slate-800">
                    {form.structure}
                  </div>

                  {/* Visual Example Breakdown */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Ví dụ mẫu phân tích:
                      </span>
                      <button
                        onClick={() => speak(form.example.en)}
                        className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Nghe câu ví dụ"
                        aria-label="Phát âm câu ví dụ công thức"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {form.example.breakdown ? (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.example.breakdown.map((item, bIdx) => (
                          <div
                            key={bIdx}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex flex-col items-start ${item.color}`}
                          >
                            <span className="text-[9px] uppercase opacity-75 font-bold">{item.label}</span>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                        {form.example.en}
                      </div>
                    )}

                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                      Dịch nghĩa: {form.example.vi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Theory Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Chi Tiết Ngữ Pháp & Quy Tắc Sử Dụng
            </h3>
            {topic.detailedTheory.map((dt, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <h4 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {dt.heading}
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {dt.content.map((c, cIdx) => (
                    <li key={cIdx}>{c}</li>
                  ))}
                </ul>

                {dt.table && (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                          {dt.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2.5 font-bold text-slate-700 dark:text-slate-300">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dt.table.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50">
                            {r.map((cell, cellIdx) => (
                              <td key={cellIdx} className="p-2.5 text-slate-600 dark:text-slate-400 font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Jump to Practice CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h4 className="text-lg font-bold mb-1">
                Sẵn sàng kiểm tra kiến thức vừa học?
              </h4>
              <p className="text-xs text-blue-100">
                Thực hành {topic.exercises.length} câu bài tập từ dễ đến khó để ghi nhớ vĩnh viễn!
              </p>
            </div>
            <button
              onClick={() => setActiveTab('practice')}
              className="px-6 py-2.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Vào Làm Bài Tập Ngay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <ExerciseSession
          topicId={topic.id}
          topicTitle={topic.title}
          exercises={topic.exercises}
          onCompleteTopic={onCompleteTopic}
        />
      )}
    </div>
  );
};
