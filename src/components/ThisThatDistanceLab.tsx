import React, { useState } from 'react';
import { Sparkles, Volume2, MoveRight, ArrowRight, Eye } from 'lucide-react';

interface DemonstrativeItem {
  id: 'this' | 'that' | 'these' | 'those';
  word: string;
  distance: 'near' | 'far';
  quantity: 'singular' | 'plural';
  distanceVi: string;
  quantityVi: string;
  emoji: string;
  objectName: string;
  sentenceEn: string;
  sentenceVi: string;
  timeUsageEn: string;
  timeUsageVi: string;
}

const DEMONSTRATIVES: Record<string, DemonstrativeItem> = {
  this: {
    id: 'this',
    word: 'This',
    distance: 'near',
    quantity: 'singular',
    distanceVi: 'Ở GẦN (Đây, này)',
    quantityVi: 'Số ÍT (1 vật)',
    emoji: '🐱',
    objectName: 'This cat',
    sentenceEn: 'This cat is very cute.',
    sentenceVi: 'Chú mèo này (ở ngay gần tôi) rất dễ thương.',
    timeUsageEn: 'I like this painting. / How much is this computer?',
    timeUsageVi: 'Dùng cho sự việc đang xảy ra gần về mặt thời gian hiện tại.'
  },
  that: {
    id: 'that',
    word: 'That',
    distance: 'far',
    quantity: 'singular',
    distanceVi: 'Ở XA (Đó, kia)',
    quantityVi: 'Số ÍT (1 vật)',
    emoji: '⌚',
    objectName: 'That watch',
    sentenceEn: 'How much is that watch over there?',
    sentenceVi: 'Chiếc đồng hồ đằng kia (ở xa tôi) giá bao nhiêu vậy?',
    timeUsageEn: 'Some of those songs were beautiful.',
    timeUsageVi: 'Dùng cho sự việc đã qua trong quá khứ hoặc xa về mặt thời gian.'
  },
  these: {
    id: 'these',
    word: 'These',
    distance: 'near',
    quantity: 'plural',
    distanceVi: 'Ở GẦN (Những cái này)',
    quantityVi: 'Số NHIỀU (Nhiều vật)',
    emoji: '🐱🐱',
    objectName: 'These cats',
    sentenceEn: 'These cats are playing together.',
    sentenceVi: 'Những chú mèo này (ở ngay gần tôi) đang chơi cùng nhau.',
    timeUsageEn: 'These suitcases are heavy! (Mike xách vali)',
    timeUsageVi: 'Dùng thay thế khi danh từ đã rõ: "These are heavy!"'
  },
  those: {
    id: 'those',
    word: 'Those',
    distance: 'far',
    quantity: 'plural',
    distanceVi: 'Ở XA (Những cái kia)',
    quantityVi: 'Số NHIỀU (Nhiều vật)',
    emoji: '⌚⌚',
    objectName: 'Those watches',
    sentenceEn: 'Those watches in the glass case are expensive.',
    sentenceVi: 'Những chiếc đồng hồ trong tủ kính đằng kia rất đắt tiền.',
    timeUsageEn: 'How much are those computers?',
    timeUsageVi: 'Chỉ các đồ vật ở khoảng cách xa người nói.'
  }
};

export const ThisThatDistanceLab: React.FC = () => {
  const [distance, setDistance] = useState<'near' | 'far'>('near');
  const [quantity, setQuantity] = useState<'singular' | 'plural'>('singular');

  const activeKey = distance === 'near' 
    ? (quantity === 'singular' ? 'this' : 'these')
    : (quantity === 'singular' ? 'that' : 'those');

  const current = DEMONSTRATIVES[activeKey];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Phòng Thí Nghiệm Khoảng Cách (Distance & Quantity Lab)
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Trực Quan Hóa This - That - These - Those
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Chỉ khoảng cách không gian (Gần vs Xa) và số lượng (Số ít vs Số nhiều) theo trang 16 sách giáo trình
        </p>
      </div>

      {/* Control Switchers: Distance & Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        {/* Distance Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
            1. Khoảng cách (Distance):
          </label>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDistance('near')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                distance === 'near'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              📍 Ở GẦN (Near)
            </button>
            <button
              onClick={() => setDistance('far')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                distance === 'far'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🔭 Ở XA (Far)
            </button>
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
            2. Số lượng (Quantity):
          </label>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setQuantity('singular')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                quantity === 'singular'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              1️⃣ Số ÍT (Singular)
            </button>
            <button
              onClick={() => setQuantity('plural')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                quantity === 'plural'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🔢 Số NHIỀU (Plural)
            </button>
          </div>
        </div>
      </div>

      {/* Visual Distance Stage */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-100 via-blue-50/30 to-purple-50/30 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-700 min-h-[220px] flex flex-col justify-between overflow-hidden">
        {/* Top Indicators */}
        <div className="flex items-center justify-between text-xs font-extrabold">
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Vị trí người nói: "Tôi đang đứng ở đây"
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            Khoảng cách: {current.distanceVi}
          </span>
        </div>

        {/* The Animated Distance Scene */}
        <div className="my-6 relative flex items-center justify-between px-4 sm:px-12">
          {/* Speaker Hand / Finger */}
          <div className="flex flex-col items-center">
            <div className="text-4xl animate-pulse">👉</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">Người nói</div>
          </div>

          {/* Dynamic Distance Line */}
          <div className="flex-1 mx-4 sm:mx-8 relative flex items-center">
            <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
              distance === 'near' 
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 max-w-[120px]' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-rose-400'
            }`} />
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full absolute -top-5 ${
              distance === 'near'
                ? 'left-10 bg-emerald-100 text-emerald-800 text-left'
                : 'left-1/2 -translate-x-1/2 bg-purple-100 text-purple-800'
            }`}>
              {distance === 'near' ? 'GẦN (Trong tầm tay)' : 'XA (Khoảng cách lớn)'}
            </span>
          </div>

          {/* The Object(s) */}
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-md border-2 border-blue-400 dark:border-blue-600 transition-all scale-110">
            <div className="text-4xl">{current.emoji}</div>
            <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              {current.objectName}
            </div>
          </div>
        </div>

        {/* Big Word Result */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <div className="text-xs text-slate-400 uppercase font-bold">Từ chỉ định chính xác:</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="font-mono">{current.word}</span>
              <span className="text-sm font-normal text-slate-500 font-sans">
                ({current.quantityVi} • {current.distanceVi})
              </span>
            </div>
          </div>
          <button
            onClick={() => speak(current.sentenceEn)}
            className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors"
            title="Nghe câu ví dụ"
            aria-label="Phát âm câu ví dụ this that"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Examples & Context Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Space Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Ví dụ về khoảng cách đồ vật:</div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            "{current.sentenceEn}"
          </div>
          <div className="text-xs text-slate-500 italic">
            {current.sentenceVi}
          </div>
        </div>

        {/* Time / Abstract Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Ứng dụng về thời gian / ngữ cảnh:</div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            "{current.timeUsageEn}"
          </div>
          <div className="text-xs text-slate-500 italic">
            {current.timeUsageVi}
          </div>
        </div>
      </div>

      {/* Comparison Grid Table from Page 16 */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-3">Từ</th>
              <th className="p-3">Khoảng cách</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Ví dụ trong sách</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-3 font-mono font-bold text-blue-600">This</td>
              <td className="p-3 font-semibold text-emerald-600">Gần (Near)</td>
              <td className="p-3">Số ít (1)</td>
              <td className="p-3">I like this painting. / This cat.</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-3 font-mono font-bold text-purple-600">That</td>
              <td className="p-3 font-semibold text-rose-600">Xa (Far)</td>
              <td className="p-3">Số ít (1)</td>
              <td className="p-3">How much is that computer? / That watch.</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-3 font-mono font-bold text-blue-600">These</td>
              <td className="p-3 font-semibold text-emerald-600">Gần (Near)</td>
              <td className="p-3">Số nhiều (2+)</td>
              <td className="p-3">I like these paintings. / These cats.</td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-bold text-purple-600">Those</td>
              <td className="p-3 font-semibold text-rose-600">Xa (Far)</td>
              <td className="p-3">Số nhiều (2+)</td>
              <td className="p-3">How much are those computers? / Those watches.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
