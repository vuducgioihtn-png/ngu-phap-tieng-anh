import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, RotateCcw, ArrowRight, Award, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExerciseItem } from '../types/grammar';
import { checkAnswer } from '../utils/answerChecker';

interface ExerciseSessionProps {
  topicId: number;
  topicTitle: string;
  exercises: ExerciseItem[];
  onCompleteTopic?: (topicId: number, score: { correct: number; total: number; percentage: number }) => void;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  topicId,
  topicTitle,
  exercises,
  onCompleteTopic
}) => {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [checkedStatus, setCheckedStatus] = useState<Record<string, { isCorrect: boolean; matchedAnswer: string }>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleInputChange = (id: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [id]: val }));
  };

  const handleCheckSingle = (ex: ExerciseItem) => {
    const input = userInputs[ex.id] || '';
    if (!input.trim()) return;
    const res = checkAnswer(input, ex.correctAnswer);
    setCheckedStatus(prev => ({ ...prev, [ex.id]: res }));
    setShowExplanation(prev => ({ ...prev, [ex.id]: true }));
  };

  const handleCheckAll = () => {
    const newStatus: Record<string, { isCorrect: boolean; matchedAnswer: string }> = {};
    const newShow: Record<string, boolean> = {};
    let correctCount = 0;

    exercises.forEach(ex => {
      const input = userInputs[ex.id] || '';
      const res = checkAnswer(input, ex.correctAnswer);
      newStatus[ex.id] = res;
      newShow[ex.id] = true;
      if (res.isCorrect) correctCount++;
    });

    setCheckedStatus(newStatus);
    setShowExplanation(newShow);
    setIsCompleted(true);

    const percentage = Math.round((correctCount / exercises.length) * 100);
    if (onCompleteTopic) {
      onCompleteTopic(topicId, {
        correct: correctCount,
        total: exercises.length,
        percentage
      });
    }

    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setCheckedStatus({});
    setShowExplanation({});
    setIsCompleted(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const correctAnswersCount = Object.values(checkedStatus).filter(s => s.isCorrect).length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Thực Hành Tương Tác Có Chấm Điểm & Giải Thích
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bài Tập Luyện Tập: {topicTitle}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {exercises.length} câu hỏi chọn lọc chính xác từ giáo trình gốc
          </p>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 self-start sm:self-auto">
            <Award className="w-5 h-5 text-emerald-600" />
            <div className="text-xs font-bold">
              Kết quả: {correctAnswersCount}/{exercises.length} câu đúng ({Math.round((correctAnswersCount / exercises.length) * 100)}%)
            </div>
          </div>
        )}
      </div>

      {/* Exercises List */}
      <div className="space-y-6 mb-8">
        {exercises.map((ex, index) => {
          const status = checkedStatus[ex.id];
          const hasAnswered = !!userInputs[ex.id]?.trim();
          const isExpVisible = showExplanation[ex.id];

          return (
            <div
              key={ex.id}
              className={`p-5 rounded-2xl border transition-all ${
                status
                  ? status.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/20'
                    : 'border-rose-300 bg-rose-50/30 dark:border-rose-800 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {ex.type === 'fill' ? 'Điền từ' : ex.type === 'choice' ? 'Trắc nghiệm' : 'Viết lại câu'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speak(ex.prompt.replace(/[_—]+/g, '...'))}
                    className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Nghe câu hỏi"
                    aria-label="Phát âm câu hỏi"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {status && (
                    status.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-4 h-4" /> Chính xác
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4" /> Chưa đúng
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Prompt */}
              <div className="text-base font-medium text-slate-800 dark:text-white mb-3">
                {ex.prompt}
              </div>

              {/* Context Hint */}
              {ex.contextHint && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  Gợi ý: {ex.contextHint}
                </div>
              )}

              {/* Input Area by Type */}
              {ex.type === 'choice' && ex.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {ex.options.map((opt) => {
                    const isSelected = userInputs[ex.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleInputChange(ex.id, opt)}
                        className={`p-3 rounded-xl text-left text-sm font-medium border transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-700 font-semibold ring-2 ring-blue-300'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {(ex.type === 'fill' || ex.type === 'rewrite') && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={userInputs[ex.id] || ''}
                    onChange={(e) => handleInputChange(ex.id, e.target.value)}
                    placeholder={ex.type === 'fill' ? 'Nhập từ/cụm từ đúng...' : 'Viết lại câu hoàn chỉnh...'}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    aria-label={`Câu trả lời cho câu ${index + 1}`}
                  />
                  <button
                    onClick={() => handleCheckSingle(ex)}
                    disabled={!hasAnswered}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Kiểm tra
                  </button>
                </div>
              )}

              {/* Explanation Card */}
              {isExpVisible && (
                <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>
                      Đáp án mẫu: <span className="text-blue-600 dark:text-blue-400 font-mono">{Array.isArray(ex.correctAnswer) ? ex.correctAnswer.join(' / ') : ex.correctAnswer}</span>
                    </span>
                    <button
                      onClick={() => speak(Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer)}
                      className="text-slate-400 hover:text-blue-600"
                      title="Phát âm đáp án"
                      aria-label="Phát âm đáp án đúng"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    💡 <span className="font-medium">Giải thích:</span> {ex.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Làm lại từ đầu
        </button>

        <button
          onClick={handleCheckAll}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Chấm Toàn Bộ Bài Tập</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
