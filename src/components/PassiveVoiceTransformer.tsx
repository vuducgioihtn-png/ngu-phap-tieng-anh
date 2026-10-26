import React, { useState } from 'react';
import { Shuffle, ArrowDown, ArrowRight, CheckCircle2, Volume2, Sparkles } from 'lucide-react';

interface PresetSentence {
  id: string;
  tenseName: string;
  active: {
    subject: string;
    verb: string;
    object: string;
    rest: string;
    fullVi: string;
  };
  passive: {
    subject: string;
    beVerb: string;
    v3: string;
    agent: string;
    omitAgent: boolean;
    rest: string;
    fullVi: string;
  };
  ruleHighlight: string;
}

const PRESETS: PresetSentence[] = [
  {
    id: 'present-simple',
    tenseName: 'Hiện tại đơn',
    active: {
      subject: 'People',
      verb: 'speak',
      object: 'English',
      rest: 'all over the world',
      fullVi: 'Mọi người nói tiếng Anh trên toàn thế giới.'
    },
    passive: {
      subject: 'English',
      beVerb: 'is',
      v3: 'spoken',
      agent: '(by people)',
      omitAgent: true,
      rest: 'all over the world',
      fullVi: 'Tiếng Anh được nói trên toàn thế giới (lược bỏ by people).'
    },
    ruleHighlight: 'Tân ngữ "English" thành Chủ ngữ số ít ➔ dùng "is" + V3 "spoken". "By people" chung chung nên lược bỏ.'
  },
  {
    id: 'present-continuous',
    tenseName: 'Hiện tại tiếp diễn',
    active: {
      subject: 'They',
      verb: 'are building',
      object: 'a new hospital',
      rest: 'in the town',
      fullVi: 'Họ đang xây một bệnh viện mới trong thị trấn.'
    },
    passive: {
      subject: 'A new hospital',
      beVerb: 'is being',
      v3: 'built',
      agent: '(by them)',
      omitAgent: true,
      rest: 'in the town',
      fullVi: 'Một bệnh viện mới đang được xây dựng trong thị trấn.'
    },
    ruleHighlight: 'Tiếp diễn cần có chữ "being": is/are + being + V3/ed (is being built).'
  },
  {
    id: 'past-simple',
    tenseName: 'Quá khứ đơn',
    active: {
      subject: 'My father',
      verb: 'gave',
      object: 'a great present',
      rest: 'to me yesterday',
      fullVi: 'Bố tôi đã tặng một món quà tuyệt vời cho tôi hôm qua.'
    },
    passive: {
      subject: 'A great present',
      beVerb: 'was',
      v3: 'given',
      agent: 'by my father',
      omitAgent: false,
      rest: 'to me yesterday',
      fullVi: 'Một món quà tuyệt vời đã được bố tôi tặng cho tôi hôm qua.'
    },
    ruleHighlight: 'Vì "by my father" là đối tượng cụ thể quan trọng, nên bắt buộc PHẢI GIỮ LẠI (không để trong ngoặc).'
  },
  {
    id: 'modal',
    tenseName: 'Động từ khiếm khuyết (Modals)',
    active: {
      subject: 'You',
      verb: 'must lock',
      object: 'all doors',
      rest: 'carefully',
      fullVi: 'Bạn phải khóa tất cả các cửa cẩn thận.'
    },
    passive: {
      subject: 'All doors',
      beVerb: 'must be',
      v3: 'locked',
      agent: '',
      omitAgent: true,
      rest: 'carefully',
      fullVi: 'Tất cả các cửa phải được khóa cẩn thận.'
    },
    ruleHighlight: 'Modal verb + be + V3/ed: must be locked / can be done / should be cleaned.'
  },
  {
    id: 'causative',
    tenseName: 'Bị động nhờ vả (Causative)',
    active: {
      subject: 'A mechanic',
      verb: 'repaired',
      object: 'my bike',
      rest: 'yesterday',
      fullVi: 'Người thợ sửa xe đã sửa chiếc xe đạp của tôi hôm qua.'
    },
    passive: {
      subject: 'I had / got',
      beVerb: '',
      v3: 'repaired',
      agent: 'by a mechanic',
      omitAgent: false,
      rest: 'yesterday',
      fullVi: 'Tôi đã nhờ thợ sửa xe đạp (I had my bike repaired).'
    },
    ruleHighlight: 'Cấu trúc nhờ vả: S + have / get + VẬT (my bike) + V3/ed (repaired).'
  }
];

export const PassiveVoiceTransformer: React.FC = () => {
  const [activePresetId, setActivePresetId] = useState<string>('present-simple');
  const [step, setStep] = useState<number>(3); // 1 = highlight, 2 = crossing, 3 = full result

  const preset = PRESETS.find(p => p.id === activePresetId) || PRESETS[0];

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 mb-2">
            <Shuffle className="w-3.5 h-3.5" />
            Máy Biến Đổi Bị Động Tương Tác (Voice Transformer)
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bộ Chuyển Đổi Chủ Động ➔ Bị Động
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quan sát trực quan cách tân ngữ tráo đổi vị trí làm chủ từ mới và động từ biến đổi thành Be + V3/ed
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setActivePresetId(p.id);
                setStep(3);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePresetId === p.id
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300 dark:ring-purple-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {p.tenseName}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Interactive Transformation Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/20 dark:from-slate-800/80 dark:to-slate-800/40 border border-purple-100 dark:border-purple-900/50 mb-6">
        {/* Step 1: Active Sentence Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              1. CÂU CHỦ ĐỘNG (ACTIVE)
            </span>
            <button
              onClick={() => speak(`${preset.active.subject} ${preset.active.verb} ${preset.active.object} ${preset.active.rest}`)}
              className="p-1.5 text-slate-400 hover:text-purple-600 transition-colors"
              title="Nghe câu chủ động"
              aria-label="Nghe câu chủ động"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-base font-semibold">
            {/* Subject */}
            <div className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-blue-500">Chủ từ (S)</span>
              <span>{preset.active.subject}</span>
            </div>

            {/* Verb */}
            <div className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-sm flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-purple-500">Động từ (V)</span>
              <span>{preset.active.verb}</span>
            </div>

            {/* Object */}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-emerald-500">Tân ngữ (O)</span>
              <span>{preset.active.object}</span>
            </div>

            {/* Rest */}
            {preset.active.rest && (
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] block text-slate-400">Bổ ngữ</span>
                <span>{preset.active.rest}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
            Nghĩa: {preset.active.fullVi}
          </div>
        </div>

        {/* Visual Swap Arrows */}
        <div className="relative py-4 flex items-center justify-center">
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-300 via-purple-400 to-emerald-300 dark:from-blue-700 dark:via-purple-600 dark:to-emerald-700 absolute" />
          <div className="relative px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 shadow-sm">
            <Shuffle className="w-3.5 h-3.5 animate-spin text-purple-600" />
            Hoán đổi & Biến hình động từ: Be + V3/ed
          </div>
        </div>

        {/* Step 2: Passive Sentence Result */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              2. CÂU BỊ ĐỘNG (PASSIVE)
            </span>
            <button
              onClick={() => speak(`${preset.passive.subject} ${preset.passive.beVerb} ${preset.passive.v3} ${preset.passive.agent} ${preset.passive.rest}`)}
              className="p-1.5 text-purple-600 hover:text-purple-800 transition-colors"
              title="Nghe câu bị động"
              aria-label="Nghe câu bị động"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-base font-semibold">
            {/* New Subject (old Object) */}
            <div className="px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-2 border-emerald-400 dark:border-emerald-600 shadow-sm flex flex-col items-center animate-bounce">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-300">
                Chủ từ mới (từ O cũ)
              </span>
              <span>{preset.passive.subject}</span>
            </div>

            {/* Be verb */}
            {preset.passive.beVerb && (
              <div className="px-3 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 border-2 border-purple-400 dark:border-purple-600 flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-300">
                  Động từ TO BE
                </span>
                <span>{preset.passive.beVerb}</span>
              </div>
            )}

            {/* V3 / ed */}
            <div className="px-3 py-2 rounded-xl bg-pink-100 dark:bg-pink-900/50 text-pink-900 dark:text-pink-200 border-2 border-pink-400 dark:border-pink-600 flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-pink-600 dark:text-pink-300">
                Động từ V3 / ED
              </span>
              <span>{preset.passive.v3}</span>
            </div>

            {/* Agent by O */}
            {preset.passive.agent && (
              <div className={`px-3 py-2 rounded-xl border flex flex-col items-center ${
                preset.passive.omitAgent
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-dashed border-slate-300'
                  : 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-200 border-blue-400'
              }`}>
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  {preset.passive.omitAgent ? 'Có thể bỏ' : 'Bắt buộc giữ'}
                </span>
                <span>{preset.passive.agent}</span>
              </div>
            )}

            {/* Rest */}
            {preset.passive.rest && (
              <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200">
                <span className="text-[10px] block text-slate-400">Nơi chốn/Thời gian</span>
                <span>{preset.passive.rest}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-purple-700 dark:text-purple-300 mt-2 font-medium">
            Nghĩa: {preset.passive.fullVi}
          </div>
        </div>
      </div>

      {/* Golden Rule Tip Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-sm">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Mẹo vàng ghi nhớ: </span>
          {preset.ruleHighlight}
        </div>
      </div>
    </div>
  );
};
