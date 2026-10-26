import React, { useState } from 'react';
import { Play, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface TenseInfo {
  id: string;
  nameVi: string;
  nameEn: string;
  timePosition: 'past' | 'present' | 'future';
  aspect: 'simple' | 'continuous' | 'perfect';
  formula: string;
  signals: string[];
  example: string;
  exampleVi: string;
  visualDesc: string;
}

const TENSES_DATA: TenseInfo[] = [
  {
    id: 'past-simple',
    nameVi: 'Quá khứ đơn',
    nameEn: 'Past Simple',
    timePosition: 'past',
    aspect: 'simple',
    formula: 'S + V2/ed',
    signals: ['yesterday', 'ago', 'last night', 'in 2010'],
    example: 'I lived in New York 3 years ago.',
    exampleVi: 'Tôi đã sống ở New York 3 năm trước (nay không còn ở đó).',
    visualDesc: 'Chấm dứt hoàn toàn tại một điểm mốc trong quá khứ.'
  },
  {
    id: 'past-continuous',
    nameVi: 'Quá khứ tiếp diễn',
    nameEn: 'Past Continuous',
    timePosition: 'past',
    aspect: 'continuous',
    formula: 'S + was/were + V-ing',
    signals: ['at 8 p.m. yesterday', 'while', 'when'],
    example: 'I was watching TV when the phone rang.',
    exampleVi: 'Tôi đang xem TV (hành động kéo dài) thì chuông điện thoại reo (xen vào).',
    visualDesc: 'Hành động đang diễn ra tại một thời điểm quá khứ hoặc bị hành động khác xen ngang.'
  },
  {
    id: 'past-perfect',
    nameVi: 'Quá khứ hoàn thành',
    nameEn: 'Past Perfect',
    timePosition: 'past',
    aspect: 'perfect',
    formula: 'S + had + V3/ed',
    signals: ['before', 'after', 'by the time', 'by 2010'],
    example: 'She had lived in Hue before she moved here.',
    exampleVi: 'Cô ấy đã sống ở Huế trước khi dọn đến đây (xảy ra trước 1 mốc quá khứ).',
    visualDesc: 'Hành động xảy ra trước một hành động khác trong quá khứ.'
  },
  {
    id: 'present-simple',
    nameVi: 'Hiện tại đơn',
    nameEn: 'Present Simple',
    timePosition: 'present',
    aspect: 'simple',
    formula: 'S + V(s/es)',
    signals: ['every day', 'always', 'usually', 'often'],
    example: 'The sun rises in the East.',
    exampleVi: 'Mặt trời mọc ở hướng Đông (sự thật hiển nhiên/thói quen).',
    visualDesc: 'Lặp đi lặp lại tuần hoàn quanh hiện tại như một thói quen hoặc chân lý.'
  },
  {
    id: 'present-continuous',
    nameVi: 'Hiện tại tiếp diễn',
    nameEn: 'Present Continuous',
    timePosition: 'present',
    aspect: 'continuous',
    formula: 'S + am/is/are + V-ing',
    signals: ['now', 'at the moment', 'right now', 'Look!'],
    example: 'She is doing her homework right now.',
    exampleVi: 'Cô ấy đang làm bài tập về nhà ngay lúc này.',
    visualDesc: 'Đang diễn ra ngay tại thời điểm nói (Now).'
  },
  {
    id: 'present-perfect',
    nameVi: 'Hiện tại hoàn thành',
    nameEn: 'Present Perfect',
    timePosition: 'present',
    aspect: 'perfect',
    formula: 'S + have/has + V3/ed',
    signals: ['since', 'for', 'already', 'yet', 'ever', 'just'],
    example: 'I have lived in Rach Gia for 2 years.',
    exampleVi: 'Tôi đã sống ở Rạch Giá 2 năm (bắt đầu trong quá khứ, đến nay vẫn đang sống).',
    visualDesc: 'Bắt đầu từ quá khứ, kéo dài và chạm tới điểm Hiện Tại (Now).'
  },
  {
    id: 'future-simple',
    nameVi: 'Tương lai đơn',
    nameEn: 'Future Simple',
    timePosition: 'future',
    aspect: 'simple',
    formula: 'S + will + V-nguyên mẫu',
    signals: ['tomorrow', 'next week', 'soon', 'I think', 'promise'],
    example: 'I think it will rain tomorrow.',
    exampleVi: 'Tôi nghĩ ngày mai trời sẽ mưa (dự đoán tự phát / quyết định ngay lúc nói).',
    visualDesc: 'Hành động sẽ xảy ra trong tương lai hoặc quyết định tức thời.'
  },
  {
    id: 'future-continuous',
    nameVi: 'Tương lai tiếp diễn',
    nameEn: 'Future Continuous',
    timePosition: 'future',
    aspect: 'continuous',
    formula: 'S + will + be + V-ing',
    signals: ['at this time tomorrow', 'at 8 p.m next Sunday'],
    example: 'At this time tomorrow, I will be flying to Singapore.',
    exampleVi: 'Vào giờ này ngày mai, tôi sẽ đang bay sang Singapore.',
    visualDesc: 'Hành động sẽ đang diễn ra tại một thời điểm xác định trong tương lai.'
  },
  {
    id: 'future-perfect',
    nameVi: 'Tương lai hoàn thành',
    nameEn: 'Future Perfect',
    timePosition: 'future',
    aspect: 'perfect',
    formula: 'S + will + have + V3/ed',
    signals: ['by tomorrow', 'by the time', 'by next month'],
    example: 'By next year, I will have finished this course.',
    exampleVi: 'Trước năm sau, tôi sẽ đã hoàn thành khóa học này.',
    visualDesc: 'Hành động sẽ được hoàn tất TRƯỚC một mốc thời gian trong tương lai.'
  }
];

export const InteractiveTimeline: React.FC = () => {
  const [selectedTenseId, setSelectedTenseId] = useState<string>('present-simple');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'past' | 'present' | 'future'>('all');

  const selectedTense = TENSES_DATA.find(t => t.id === selectedTenseId) || TENSES_DATA[0];

  const filteredTenses = TENSES_DATA.filter(t => {
    if (filterPeriod === 'all') return true;
    return t.timePosition === filterPeriod;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Trực quan hóa Dòng Thời Gian (Interactive Timeline)
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Bản Đồ 12 Thì Tiếng Anh
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bấm chọn thì để quan sát vị trí trên trục thời gian, công thức màu sắc và ví dụ minh họa
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
          {(['all', 'past', 'present', 'future'] as const).map(period => (
            <button
              key={period}
              onClick={() => setFilterPeriod(period)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterPeriod === period
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {period === 'all' && 'Tất cả'}
              {period === 'past' && 'Quá khứ'}
              {period === 'present' && 'Hiện tại'}
              {period === 'future' && 'Tương lai'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Diagram */}
      <div className="relative bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 mb-6 overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            ◀ Quá khứ (Past)
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-bold">
            BÂY GIỜ (NOW)
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            Tương lai (Future) ▶
          </span>
        </div>

        {/* Central Axis Line */}
        <div className="relative h-12 flex items-center justify-between">
          <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-400 rounded-full" />
          
          {/* NOW Indicator Pin */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-200 dark:ring-blue-900 animate-pulse" />
          </div>

          {/* Quick markers */}
          <div className="relative w-full flex justify-between z-0 px-4">
            <div className="flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-medium">Đã xong</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Thời điểm nói</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-medium">Sắp tới</div>
            </div>
          </div>
        </div>

        {/* Visual representation of the active tense */}
        <div className="mt-4 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
            ⏱️
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Đặc tính trực quan của {selectedTense.nameVi}:
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {selectedTense.visualDesc}
            </div>
          </div>
        </div>
      </div>

      {/* Tense Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {filteredTenses.map(tense => {
          const isSelected = tense.id === selectedTenseId;
          return (
            <button
              key={tense.id}
              onClick={() => setSelectedTenseId(tense.id)}
              className={`p-3 rounded-xl text-left border transition-all relative ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm ring-1 ring-blue-400'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  tense.timePosition === 'past'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : tense.timePosition === 'present'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {tense.timePosition === 'past' ? 'Quá khứ' : tense.timePosition === 'present' ? 'Hiện tại' : 'Tương lai'}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                )}
              </div>
              <div className="font-bold text-sm text-slate-800 dark:text-white truncate">
                {tense.nameVi}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {tense.nameEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tense Deep Dive Details */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/80 dark:to-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedTense.nameVi}</span>
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                ({selectedTense.nameEn})
              </span>
            </h4>
          </div>
          <div className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-mono font-semibold self-start sm:self-auto">
            {selectedTense.formula}
          </div>
        </div>

        {/* Signals */}
        <div className="mb-4">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Dấu hiệu nhận biết đặc trưng:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedTense.signals.map(sig => (
              <span
                key={sig}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              >
                {sig}
              </span>
            ))}
          </div>
        </div>

        {/* Example with Audio */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-3.5 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
              Câu ví dụ chuẩn:
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              {selectedTense.example}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {selectedTense.exampleVi}
            </div>
          </div>
          <button
            onClick={() => speakText(selectedTense.example)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 transition-colors shrink-0"
            title="Nghe phát âm chuẩn"
            aria-label="Phát âm câu ví dụ"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
