import React, { useState } from 'react';
import { Compass, Volume2, Sparkles, MapPin } from 'lucide-react';

interface PrepositionDetail {
  id: string;
  name: string;
  type: 'place' | 'movement' | 'time';
  ruleVi: string;
  exampleEn: string;
  exampleVi: string;
  spatialPosition: string; // for visual display
}

const PREPOSITIONS: PrepositionDetail[] = [
  {
    id: 'in',
    name: 'IN (Trong / Ở trong)',
    type: 'place',
    ruleVi: 'Không gian đóng hoặc vùng địa lý rộng (phòng, nhà, xe hơi, thành phố, quốc gia): in my room, in Vietnam. Với thời gian: Tháng, Năm, Mùa (in July, in 2026, in summer).',
    exampleEn: 'She is reading a book in her room.',
    exampleVi: 'Cô ấy đang đọc sách ở trong phòng của mình.',
    spatialPosition: 'Trung tâm bên trong'
  },
  {
    id: 'on',
    name: 'ON (Trên bề mặt)',
    type: 'place',
    ruleVi: 'Bề mặt phẳng hoặc đường thẳng (trên bàn, trên tường, trên bờ biển): on the table, on the wall. Với thời gian: Thứ, Ngày cụ thể (on Monday, on June 9th).',
    exampleEn: 'There is a laptop on the table.',
    exampleVi: 'Có một chiếc máy tính xách tay ở trên mặt bàn.',
    spatialPosition: 'Phía trên bề mặt'
  },
  {
    id: 'at',
    name: 'AT (Tại một điểm cụ thể)',
    type: 'place',
    ruleVi: 'Tọa độ, điểm mốc cụ thể (tại trạm xe buýt, tại nhà, tại rạp chiếu phim): at the bus stop, at home. Với thời gian: Giờ giấc chính xác (at 7:00, at noon, at night).',
    exampleEn: 'I am waiting for you at the bus stop.',
    exampleVi: 'Tôi đang đợi bạn tại điểm dừng xe buýt.',
    spatialPosition: 'Điểm mốc tọa độ'
  },
  {
    id: 'under',
    name: 'UNDER (Ở dưới / Bên dưới)',
    type: 'place',
    ruleVi: 'Ở phía dưới của một vật thể khác và thường được che phủ bởi vật đó.',
    exampleEn: 'The cat is sleeping under the table.',
    exampleVi: 'Con mèo đang ngủ ở dưới gầm bàn.',
    spatialPosition: 'Bên dưới gầm'
  },
  {
    id: 'into',
    name: 'INTO (Đi vào bên trong)',
    type: 'movement',
    ruleVi: 'Chuyển động từ bên ngoài tiến vào bên trong một không gian.',
    exampleEn: 'They walked into the room with confidence.',
    exampleVi: 'Họ tự tin bước vào bên trong căn phòng.',
    spatialPosition: 'Mũi tên đi vào'
  },
  {
    id: 'out-of',
    name: 'OUT OF (Ra khỏi)',
    type: 'movement',
    ruleVi: 'Chuyển động từ bên trong thoát ra bên ngoài.',
    exampleEn: 'They walked out of the office in a hurry.',
    exampleVi: 'Họ vội vã đi ra khỏi văn phòng.',
    spatialPosition: 'Mũi tên đi ra'
  },
  {
    id: 'across',
    name: 'ACROSS (Băng qua)',
    type: 'movement',
    ruleVi: 'Băng từ bên này sang bên kia của con đường, dòng sông, cây cầu.',
    exampleEn: 'They swam across the river with strong determination.',
    exampleVi: 'Họ đã bơi băng qua con sông với lòng quyết tâm cao độ.',
    spatialPosition: 'Băng ngang mặt'
  },
  {
    id: 'through',
    name: 'THROUGH (Xuyên qua)',
    type: 'movement',
    ruleVi: 'Di chuyển xuyên qua một đường hầm, cửa sổ, rừng rậm hoặc không gian 3 chiều.',
    exampleEn: 'The cat jumped through the open window.',
    exampleVi: 'Con mèo nhảy xuyên qua khung cửa sổ đang mở.',
    spatialPosition: 'Xuyên qua ống'
  }
];

export const PrepositionVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('in');

  const selectedPrep = PREPOSITIONS.find(p => p.id === selectedId) || PREPOSITIONS[0];

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 mb-2">
            <Compass className="w-3.5 h-3.5" />
            Không Gian Tương Tác Giới Từ (Spatial Prepositions)
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bản Đồ Trực Quan In - On - At & Giới Từ Chuyển Động
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Chạm vào từng vị trí không gian để nắm vững quy tắc sử dụng và ví dụ sinh động
          </p>
        </div>
      </div>

      {/* Visual Spatial Box Representation */}
      <div className="relative h-64 sm:h-72 bg-gradient-to-b from-sky-50 via-slate-50 to-blue-50/50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 rounded-2xl border-2 border-dashed border-sky-300 dark:border-sky-800/80 p-4 mb-6 flex flex-col justify-between overflow-hidden">
        {/* Sky / Top: ON */}
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedId('on')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              selectedId === 'on'
                ? 'bg-amber-500 text-white ring-4 ring-amber-200 dark:ring-amber-900 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50'
            }`}
          >
            <span>ON</span>
            <span className="text-[10px] opacity-80">(Trên bề mặt bàn/tường)</span>
          </button>
        </div>

        {/* Middle row: INTO ➔ IN ➔ OUT OF & ACROSS / THROUGH */}
        <div className="flex items-center justify-between gap-2 px-2 sm:px-8">
          <button
            onClick={() => setSelectedId('into')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              selectedId === 'into'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 dark:ring-emerald-900 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            INTO ➔
          </button>

          {/* Central Cube: IN */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-2 border-blue-400 dark:border-blue-600 shadow-md flex flex-col items-center">
            <button
              onClick={() => setSelectedId('in')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all mb-2 ${
                selectedId === 'in'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-900 scale-105'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
              }`}
            >
              IN (Bên trong không gian kín)
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedId('through')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                  selectedId === 'through' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                }`}
              >
                THROUGH (Xuyên qua)
              </button>
              <button
                onClick={() => setSelectedId('across')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                  selectedId === 'across' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                }`}
              >
                ACROSS (Băng qua)
              </button>
            </div>
          </div>

          <button
            onClick={() => setSelectedId('out-of')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              selectedId === 'out-of'
                ? 'bg-rose-600 text-white ring-4 ring-rose-200 dark:ring-rose-900 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            ➔ OUT OF
          </button>
        </div>

        {/* Bottom row: UNDER & AT */}
        <div className="flex justify-around items-center">
          <button
            onClick={() => setSelectedId('under')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              selectedId === 'under'
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 dark:ring-indigo-900 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            UNDER (Bên dưới)
          </button>

          <button
            onClick={() => setSelectedId('at')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedId === 'at'
                ? 'bg-pink-600 text-white ring-4 ring-pink-200 dark:ring-pink-900 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            AT (Tại điểm mốc)
          </button>
        </div>
      </div>

      {/* Selected Preposition Rule Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-800 dark:to-slate-800/50 border border-sky-200 dark:border-sky-900">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{selectedPrep.name}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              {selectedPrep.spatialPosition}
            </span>
          </h4>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {selectedPrep.type === 'place' ? 'Nơi chốn' : 'Chuyển động'}
          </span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          {selectedPrep.ruleVi}
        </p>

        {/* Example with Audio */}
        <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-sky-100 dark:border-sky-800 flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              {selectedPrep.exampleEn}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {selectedPrep.exampleVi}
            </div>
          </div>
          <button
            onClick={() => speak(selectedPrep.exampleEn)}
            className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300 transition-colors"
            title="Nghe phát âm"
            aria-label="Phát âm câu ví dụ giới từ"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
