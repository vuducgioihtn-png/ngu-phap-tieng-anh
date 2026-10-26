import React, { useState } from 'react';
import { MessageSquareQuote, ArrowRight, Sparkles, Volume2 } from 'lucide-react';

interface DirectSpeechExample {
  id: string;
  direct: string;
  directVi: string;
  speaker: string;
  reported: string;
  reportedVi: string;
  changes: {
    pronoun?: string;
    tense?: string;
    time?: string;
  };
}

const REPORTED_EXAMPLES: DirectSpeechExample[] = [
  {
    id: '1',
    speaker: 'Peter',
    direct: 'I clean the black shoes.',
    directVi: 'Tôi lau những đôi giày đen.',
    reported: 'Peter told me that he cleaned the black shoes.',
    reportedVi: 'Peter bảo tôi rằng anh ấy đã lau những đôi giày đen.',
    changes: {
      pronoun: 'I ➔ he',
      tense: 'clean (V1) ➔ cleaned (V2)',
      time: 'Không có trạng từ'
    }
  },
  {
    id: '2',
    speaker: 'John',
    direct: 'Mandy is in the living room talking with her parents.',
    directVi: 'Mandy đang ở phòng khách nói chuyện với ba mẹ cô ấy.',
    reported: 'John said that Mandy was in the living room talking with her parents.',
    reportedVi: 'John nói rằng Mandy lúc đó đang ở phòng khách nói chuyện với ba mẹ.',
    changes: {
      pronoun: 'Mandy (giữ nguyên)',
      tense: 'is (hiện tại tiếp diễn) ➔ was (quá khứ tiếp diễn)',
      time: 'Không có trạng từ'
    }
  },
  {
    id: '3',
    speaker: 'Emily',
    direct: 'My parents and I will go to the USA tomorrow.',
    directVi: 'Bố mẹ tôi và tôi sẽ đi Mỹ ngày mai.',
    reported: 'Emily said that her parents and she would go to the USA the following day.',
    reportedVi: 'Emily nói rằng bố mẹ cô ấy và cô ấy sẽ đi Mỹ vào ngày hôm sau.',
    changes: {
      pronoun: 'My parents and I ➔ her parents and she',
      tense: 'will ➔ would',
      time: 'tomorrow ➔ the following day (hoặc the next day)'
    }
  },
  {
    id: '4',
    speaker: 'Stephen & Claire',
    direct: 'We have cleaned the windows.',
    directVi: 'Chúng tôi vừa lau các cửa sổ xong.',
    reported: 'Stephen and Claire told me that they had cleaned the windows.',
    reportedVi: 'Stephen và Claire bảo tôi rằng họ đã lau các cửa sổ xong.',
    changes: {
      pronoun: 'We ➔ they',
      tense: 'have cleaned (Hiện tại hoàn thành) ➔ had cleaned (Quá khứ hoàn thành)',
      time: 'Không có'
    }
  }
];

export const ReportedSpeechSimulator: React.FC = () => {
  const [selectedExId, setSelectedExId] = useState<string>('3');
  const [activeTab, setActiveTab] = useState<'tenses' | 'pronouns' | 'time'>('tenses');

  const example = REPORTED_EXAMPLES.find(e => e.id === selectedExId) || REPORTED_EXAMPLES[0];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Mô Phỏng Câu Tường Thuật Trực Quan
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bộ Quy Tắc Lùi Thì & Đổi Đại Từ
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Xem ngay cách biến đổi từ câu nói trực tiếp trong ngoặc kép sang câu gián tiếp
          </p>
        </div>

        {/* Example tabs */}
        <div className="flex flex-wrap gap-1.5">
          {REPORTED_EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExId(ex.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedExId === ex.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Ví dụ {i + 1}: {ex.speaker}
            </button>
          ))}
        </div>
      </div>

      {/* Direct vs Reported Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Direct */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
              Trực tiếp (Direct Speech)
            </span>
            <button
              onClick={() => speak(example.direct)}
              className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
              title="Phát âm"
              aria-label="Phát âm câu trực tiếp"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-base font-semibold text-slate-800 dark:text-white mb-1">
            "{example.direct}"
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {example.directVi}
          </div>
        </div>

        {/* Reported */}
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
              Gián tiếp (Reported Speech)
            </span>
            <button
              onClick={() => speak(example.reported)}
              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
              title="Phát âm"
              aria-label="Phát âm câu gián tiếp"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-base font-semibold text-blue-900 dark:text-blue-200 mb-1">
            {example.reported}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {example.reportedVi}
          </div>
        </div>
      </div>

      {/* Changes breakdown chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">1. Đổi Đại Từ</div>
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {example.changes.pronoun}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">2. Lùi Thì Động Từ</div>
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">
            {example.changes.tense}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">3. Đổi Trạng Từ Thời Gian</div>
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            {example.changes.time}
          </div>
        </div>
      </div>

      {/* Reference Tabs for Quick Lookups */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tenses')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'tenses'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Bảng lùi thì (Tenses)
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'time'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Bảng đổi trạng từ (Time & Place)
          </button>
          <button
            onClick={() => setActiveTab('pronouns')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'pronouns'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Bảng đổi đại từ (Pronouns)
          </button>
        </div>

        <div className="p-4 text-xs bg-white dark:bg-slate-900">
          {activeTab === 'tenses' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Hiện tại đơn (V1/s/es)</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Quá khứ đơn (V2/ed)</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Hiện tại tiếp diễn (am/is/are + V-ing)</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Quá khứ tiếp diễn (was/were + V-ing)</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Hiện tại hoàn thành (have/has + V3)</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Quá khứ hoàn thành (had + V3)</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Quá khứ đơn (V2/ed)</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Quá khứ hoàn thành (had + V3)</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Will / Can / May</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Would / Could / Might</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400 block font-medium">Must / Have to</span>
                <span className="font-bold text-slate-800 dark:text-white">➔ Had to</span>
              </div>
            </div>
          )}

          {activeTab === 'time' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">now</span> ➔ <b className="text-slate-800 dark:text-white">then</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">today</span> ➔ <b className="text-slate-800 dark:text-white">that day</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">tonight</span> ➔ <b className="text-slate-800 dark:text-white">that night</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">tomorrow</span> ➔ <b className="text-slate-800 dark:text-white">the next day</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">yesterday</span> ➔ <b className="text-slate-800 dark:text-white">the day before</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">here</span> ➔ <b className="text-slate-800 dark:text-white">there</b>
              </div>
            </div>
          )}

          {activeTab === 'pronouns' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">I</span> ➔ <b className="text-slate-800 dark:text-white">he / she</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">We</span> ➔ <b className="text-slate-800 dark:text-white">they</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">my</span> ➔ <b className="text-slate-800 dark:text-white">his / her</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">our</span> ➔ <b className="text-slate-800 dark:text-white">their</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">me</span> ➔ <b className="text-slate-800 dark:text-white">him / her</b>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded">
                <span className="text-slate-400">us</span> ➔ <b className="text-slate-800 dark:text-white">them</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
