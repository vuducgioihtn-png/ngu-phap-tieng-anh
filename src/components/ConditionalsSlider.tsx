import React, { useState } from 'react';
import { Sparkles, Sliders, Volume2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ConditionalType {
  level: number;
  name: string;
  realityScore: string;
  timeContext: string;
  ifFormula: string;
  mainFormula: string;
  situation: string;
  exampleEn: string;
  exampleVi: string;
  inversion?: string;
}

const CONDITIONALS: ConditionalType[] = [
  {
    level: 0,
    name: 'Câu Điều Kiện Loại 0 (Zero Conditional)',
    realityScore: '100% Sự Thật Hiển Nhiên / Chân Lý Khoa Học',
    timeContext: 'Hiện tại / Bất biến',
    ifFormula: 'If + S + V(s/es)',
    mainFormula: 'S + V(s/es)',
    situation: 'Nếu nước đạt 100°C thì chắc chắn nó sẽ sôi. Không thể khác được!',
    exampleEn: 'If water reaches 100°C, it boils.',
    exampleVi: 'Nếu nước đạt tới 100°C, nó sôi.'
  },
  {
    level: 1,
    name: 'Câu Điều Kiện Loại 1 (First Conditional)',
    realityScore: '50% Có Thể Xảy Ra Trong Tương Lai',
    timeContext: 'Hiện tại & Tương lai',
    ifFormula: 'If + S + V(s/es) (hiện tại đơn)',
    mainFormula: 'S + will / can + V-nguyên mẫu',
    situation: 'Dự đoán một điều kiện có khả năng thành hiện thực nếu ta hành động.',
    exampleEn: 'If I study hard, I will pass the exam.',
    exampleVi: 'Nếu tôi học chăm chỉ, tôi sẽ đỗ kỳ thi.'
  },
  {
    level: 2,
    name: 'Câu Điều Kiện Loại 2 (Second Conditional)',
    realityScore: '0% Giả Định Trái Với Hiện Tại',
    timeContext: 'Hiện tại (nhưng phi thực tế)',
    ifFormula: 'If + S + V2/ed (Be chia là WERE cho mọi ngôi)',
    mainFormula: 'S + would / could + V-nguyên mẫu',
    situation: 'Ước một điều trái với thực tế bây giờ: "Bây giờ tôi đang ở nhà, ước gì đang ở Paris".',
    exampleEn: 'If I were in Paris now, I would take a lot of photos with my friends.',
    exampleVi: 'Nếu bây giờ tôi ở Paris (thực tế tôi đang ở nhà), tôi sẽ chụp thật nhiều ảnh với bạn bè.',
    inversion: 'Đảo ngữ: Were I in Paris now, I would take a lot of photos...'
  },
  {
    level: 3,
    name: 'Câu Điều Kiện Loại 3 (Third Conditional)',
    realityScore: '0% Tiếc Nuối Trái Với Quá Khứ (Không Thể Thay Đổi)',
    timeContext: 'Quá khứ đã chấm dứt',
    ifFormula: 'If + S + had + V3/ed',
    mainFormula: 'S + would / could + have + V3/ed',
    situation: 'Hôm qua bạn đi ra đường không mang dù nên bị ướt. Nay nhìn lại và tiếc nuối.',
    exampleEn: 'If I had brought an umbrella with me yesterday, I wouldn\'t have got wet.',
    exampleVi: 'Nếu hôm qua tôi mang theo ô thì tôi đã không bị ướt sũng.',
    inversion: 'Đảo ngữ: Had I brought an umbrella yesterday, I wouldn\'t have got wet.'
  }
];

export const ConditionalsSlider: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const cond = CONDITIONALS[currentLevel];

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Thanh Trượt Thực Tế & Giả Định (Reality Slider)
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bộ So Sánh Câu Điều Kiện 0, 1, 2, 3
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kéo thanh trượt để cảm nhận sự dịch chuyển từ 100% Chân lý ➔ Dự đoán ➔ Giả định ➔ Tiếc nuối quá khứ
          </p>
        </div>

        {/* Level buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
          {[0, 1, 2, 3].map(lvl => (
            <button
              key={lvl}
              onClick={() => setCurrentLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentLevel === lvl
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Loại {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Slider Bar */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            100% Thực tế (Loại 0)
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">
            Loại 1 (Có thể xảy ra)
          </span>
          <span className="text-purple-600 dark:text-purple-400 font-bold">
            Loại 2 (Giả định)
          </span>
          <span className="text-rose-600 dark:text-rose-400 font-bold">
            Loại 3 (Tiếc nuối)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={currentLevel}
          onChange={(e) => setCurrentLevel(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          aria-label="Chọn cấp độ câu điều kiện"
        />
      </div>

      {/* Conditional Detail Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-blue-50/20 dark:from-slate-800 dark:to-slate-800/50 border border-emerald-200 dark:border-emerald-900/60 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200 dark:border-emerald-900/60">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {cond.name}
            </h4>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              Mức độ thực tế: {cond.realityScore}
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold self-start">
            {cond.timeContext}
          </span>
        </div>

        {/* Formulas Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
              Mệnh đề IF (Điều kiện)
            </div>
            <div className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {cond.ifFormula}
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
              Mệnh đề CHÍNH (Kết quả)
            </div>
            <div className="text-sm font-mono font-bold text-blue-700 dark:text-blue-400">
              {cond.mainFormula}
            </div>
          </div>
        </div>

        {/* Situation explanation */}
        <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-emerald-100 dark:border-emerald-900 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <span className="font-bold text-slate-800 dark:text-slate-200">Tình huống thực tế: </span>
          {cond.situation}
        </div>

        {/* Example with Audio */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              {cond.exampleEn}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {cond.exampleVi}
            </div>
          </div>
          <button
            onClick={() => speak(cond.exampleEn)}
            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 transition-colors shrink-0"
            title="Nghe câu ví dụ"
            aria-label="Phát âm câu ví dụ câu điều kiện"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Inversion Tip if available */}
        {cond.inversion && (
          <div className="mt-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold">{cond.inversion}</span>
          </div>
        )}
      </div>
    </div>
  );
};
