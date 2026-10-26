import React, { useState } from 'react';
import { Sparkles, Play, Volume2, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface ParsedToken {
  text: string;
  role: 'subject' | 'auxiliary' | 'verb' | 'object' | 'preposition' | 'adverb' | 'conjunction' | 'other';
  label: string;
  colorClass: string;
}

const SAMPLE_SENTENCES: { en: string; vi: string; tokens: ParsedToken[] }[] = [
  {
    en: 'The doctor treated me with great kindness yesterday.',
    vi: 'Bác sĩ đã điều trị cho tôi rất tận tình ngày hôm qua.',
    tokens: [
      { text: 'The doctor', role: 'subject', label: 'Chủ từ (S)', colorClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { text: 'treated', role: 'verb', label: 'Động từ V2 (V)', colorClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300' },
      { text: 'me', role: 'object', label: 'Tân ngữ (O)', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' },
      { text: 'with great kindness', role: 'preposition', label: 'Cụm giới từ (Prep Phrase)', colorClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300' },
      { text: 'yesterday', role: 'adverb', label: 'Trạng từ thời gian', colorClass: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300' }
    ]
  },
  {
    en: 'English is spoken all over the world by millions of people.',
    vi: 'Tiếng Anh được nói trên toàn thế giới bởi hàng triệu người.',
    tokens: [
      { text: 'English', role: 'subject', label: 'Chủ từ bị động (S)', colorClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { text: 'is', role: 'auxiliary', label: 'Trợ động từ Be', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300' },
      { text: 'spoken', role: 'verb', label: 'Quá khứ phân từ (V3)', colorClass: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950 dark:text-pink-300' },
      { text: 'all over the world', role: 'adverb', label: 'Nơi chốn', colorClass: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950 dark:text-teal-300' },
      { text: 'by millions of people', role: 'preposition', label: 'Tác nhân (by + Agent)', colorClass: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300' }
    ]
  },
  {
    en: 'If we lower the volume, we will not bother our neighbors.',
    vi: 'Nếu chúng ta vặn nhỏ âm lượng, chúng ta sẽ không làm phiền hàng xóm.',
    tokens: [
      { text: 'If', role: 'conjunction', label: 'Liên từ điều kiện', colorClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300' },
      { text: 'we', role: 'subject', label: 'Chủ từ 1', colorClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { text: 'lower', role: 'verb', label: 'Động từ hiện tại', colorClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300' },
      { text: 'the volume,', role: 'object', label: 'Tân ngữ 1', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' },
      { text: 'we', role: 'subject', label: 'Chủ từ chính', colorClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { text: 'will not bother', role: 'verb', label: 'Tương lai phủ định', colorClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300' },
      { text: 'our neighbors', role: 'object', label: 'Tân ngữ chính', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ]
  }
];

export const GrammarLab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeToken, setActiveToken] = useState<ParsedToken | null>(null);

  const currentSample = SAMPLE_SENTENCES[selectedIndex];

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 mb-2">
            <Layers className="w-3.5 h-3.5" />
            Phòng Thí Nghiệm Cú Pháp Trực Quan (Sentence Visualizer)
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bộ Phân Tích Cấu Trúc Câu Tương Tác
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Xem thành phần câu được bóc tách màu sắc: Chủ ngữ, Động từ, Tân ngữ, Trợ từ, Mệnh đề
          </p>
        </div>

        {/* Sentence presets */}
        <div className="flex flex-wrap gap-2">
          {SAMPLE_SENTENCES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setActiveToken(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedIndex === idx
                  ? 'bg-violet-600 text-white shadow-sm ring-2 ring-violet-300 dark:ring-violet-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Mẫu {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sentence Block Rendering */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-violet-50/20 to-blue-50/20 dark:from-slate-800 dark:to-slate-800/50 border border-violet-100 dark:border-violet-900/50 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Bấm vào bất kỳ khối từ nào để soi chi tiết vai trò ngữ pháp:
          </span>
          <button
            onClick={() => speak(currentSample.en)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            title="Nghe câu"
            aria-label="Phát âm câu phân tích"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Token Chips */}
        <div className="flex flex-wrap gap-2.5 items-center mb-4">
          {currentSample.tokens.map((tok, i) => {
            const isHighlighted = activeToken?.text === tok.text;
            return (
              <button
                key={i}
                onClick={() => setActiveToken(tok)}
                className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all shadow-sm flex flex-col items-start ${tok.colorClass} ${
                  isHighlighted ? 'ring-4 ring-violet-400 scale-105' : 'hover:scale-102'
                }`}
              >
                <span className="text-[10px] uppercase font-bold opacity-75">{tok.label}</span>
                <span>{tok.text}</span>
              </button>
            );
          })}
        </div>

        {/* Translation */}
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium italic">
          Ý nghĩa tiếng Việt: "{currentSample.vi}"
        </div>
      </div>

      {/* Role Explanation Card */}
      {activeToken ? (
        <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 text-sm">
          <div className="font-bold text-violet-950 dark:text-violet-200 mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span>Thành phần: "{activeToken.text}" ➔ {activeToken.label}</span>
          </div>
          <div className="text-xs text-violet-800 dark:text-violet-300">
            {activeToken.role === 'subject' && 'Chủ từ thực hiện hành động chính hoặc là đối tượng trung tâm của câu.'}
            {activeToken.role === 'verb' && 'Động từ diễn tả hành động, trạng thái hoặc thì của câu.'}
            {activeToken.role === 'object' && 'Tân ngữ là người/vật chịu tác động trực tiếp hoặc gián tiếp của động từ.'}
            {activeToken.role === 'auxiliary' && 'Trợ động từ bổ trợ ngữ pháp cho thì (am/is/are, have/has, will, did).'}
            {activeToken.role === 'preposition' && 'Cụm giới từ bổ sung thông tin phương tiện, cách thức, địa điểm hoặc quan hệ.'}
            {activeToken.role === 'adverb' && 'Trạng từ chỉ thời gian, nơi chốn hoặc tần suất, mô tả bối cảnh xảy ra hành động.'}
            {activeToken.role === 'conjunction' && 'Liên từ nối các mệnh đề lại với nhau (if, because, although, and, but).'}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center">
          💡 Chọn một khối từ phía trên để xem phân tích cú pháp chi tiết
        </div>
      )}
    </div>
  );
};
