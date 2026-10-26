import React, { useState } from 'react';
import { Sparkles, Volume2, User, Users, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface ComicBubble {
  id: number;
  label: string;
  type: 'Singular' | 'Plural';
  character: string;
  correctPronoun: string;
  explanation: string;
}

const COMIC_BUBBLES: ComicBubble[] = [
  {
    id: 1,
    label: 'Hình 1 (Góc trên trái)',
    type: 'Singular',
    character: 'Chàng trai cầm biển "LOOK HERE! I ❤️ ME!"',
    correctPronoun: 'I',
    explanation: 'Anh ấy đang tự chỉ vào bản thân mình với tấm biển "ME!", nói về chính mình ở ngôi thứ nhất số ít ➔ "I".'
  },
  {
    id: 2,
    label: 'Hình 2 (Góc trên phải)',
    type: 'Plural',
    character: 'Hai người bạn khoác vai nhau cùng bước đi',
    correctPronoun: 'We',
    explanation: 'Hai người cùng nhau đi và nói về nhóm của mình (Chúng tôi/Chúng ta) ➔ "We".'
  },
  {
    id: 3,
    label: 'Hình 3 (Hàng 2 trái)',
    type: 'Singular',
    character: 'Người đàn ông chỉ tay vào người đang gọi điện thoại',
    correctPronoun: 'You',
    explanation: 'Người nói đang hướng ngón tay chỉ thẳng vào người nghe đối diện (Bạn) ➔ "You".'
  },
  {
    id: 4,
    label: 'Hình 4 (Hàng 2 phải)',
    type: 'Plural',
    character: 'Người thợ ảnh chỉ tay về phía cặp cô dâu chú rể',
    correctPronoun: 'They',
    explanation: 'Chỉ về một nhóm người khác gồm 2 người trở lên (Họ / Chúng nó) ➔ "They".'
  },
  {
    id: 5,
    label: 'Hình 5 (Hàng 3 trái)',
    type: 'Singular',
    character: 'Quý ông lịch lãm chỉ tay vào chàng trai lực lưỡng xăm hình',
    correctPronoun: 'He',
    explanation: 'Chỉ về một người nam giới thứ ba (Anh ấy / Chú ấy) ➔ "He".'
  },
  {
    id: 6,
    label: 'Hình 6 (Hàng 3 phải)',
    type: 'Singular',
    character: 'Bà lão chỉ tay về phía cô gái mặc váy vàng đang uống nước',
    correctPronoun: 'She',
    explanation: 'Chỉ về một người nữ giới thứ ba (Cô ấy / Chị ấy) ➔ "She".'
  },
  {
    id: 7,
    label: 'Hình 7 (Góc dưới trái)',
    type: 'Singular',
    character: 'Chú cún nhỏ vẫy đuôi đang nghĩ về khúc xương',
    correctPronoun: 'It',
    explanation: 'Con vật hoặc đồ vật ở số ít ➔ "It".'
  },
  {
    id: 8,
    label: 'Hình 8 (Góc dưới phải)',
    type: 'Plural',
    character: 'Viên cảnh sát chỉ vào màn hình có 2 tên cướp',
    correctPronoun: 'They',
    explanation: 'Chỉ về hai tên cướp (nhiều người ở ngôi thứ ba) ➔ "They".'
  }
];

const PRONOUN_MATRIX = [
  { person: 'Ngôi 1 (số ít)', subject: 'I', object: 'me', possAdj: 'my', possPro: 'mine', reflexive: 'myself', vi: 'Tôi, mình' },
  { person: 'Ngôi 1 (số nhiều)', subject: 'We', object: 'us', possAdj: 'our', possPro: 'ours', reflexive: 'ourselves', vi: 'Chúng tôi, chúng ta' },
  { person: 'Ngôi 2 (số ít)', subject: 'You', object: 'you', possAdj: 'your', possPro: 'yours', reflexive: 'yourself', vi: 'Bạn' },
  { person: 'Ngôi 2 (số nhiều)', subject: 'You', object: 'you', possAdj: 'your', possPro: 'yours', reflexive: 'yourselves', vi: 'Các bạn' },
  { person: 'Ngôi 3 (nam)', subject: 'He', object: 'him', possAdj: 'his', possPro: 'his', reflexive: 'himself', vi: 'Anh ấy, chú ấy' },
  { person: 'Ngôi 3 (nữ)', subject: 'She', object: 'her', possAdj: 'her', possPro: 'hers', reflexive: 'herself', vi: 'Cô ấy, chị ấy' },
  { person: 'Ngôi 3 (vật/con vật)', subject: 'It', object: 'it', possAdj: 'its', possPro: 'its', reflexive: 'itself', vi: 'Nó' },
  { person: 'Ngôi 3 (số nhiều)', subject: 'They', object: 'them', possAdj: 'their', possPro: 'theirs', reflexive: 'themselves', vi: 'Họ, chúng nó' },
];

export const PronounsVisualizer: React.FC = () => {
  const [selectedBubbleId, setSelectedBubbleId] = useState<number>(1);
  const [revealedBubbles, setRevealedBubbles] = useState<Record<number, boolean>>({});
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'subject' | 'object' | 'possessive' | 'reflexive'>('all');

  const selectedBubble = COMIC_BUBBLES.find(b => b.id === selectedBubbleId) || COMIC_BUBBLES[0];

  const handleReveal = (id: number) => {
    setRevealedBubbles(prev => ({ ...prev, [id]: true }));
  };

  const handleRevealAll = () => {
    const all: Record<number, boolean> = {};
    COMIC_BUBBLES.forEach(b => { all[b.id] = true; });
    setRevealedBubbles(all);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Phòng Thí Nghiệm Đại Từ Trực Quan (Pronouns Lab)
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Thực Hành Tranh Truyện & Bảng Ma Trận Đại Từ
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Minh họa từ Trang 5 của giáo trình Lê Công Đức: Khám phá trực quan 8 nhân vật hoạt hình và đối chiếu ma trận đại từ
        </p>
      </div>

      {/* Part 1: Comic Cartoon Interactive Practice (Page 5 from book!) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-blue-50/20 to-indigo-50/20 dark:from-slate-800 dark:to-slate-800/50 border border-cyan-200 dark:border-cyan-900">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Left: Original Comic Image from page 5 */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wide">
                Tranh gốc minh họa Trang 5 (Lê Công Đức)
              </span>
              <button
                onClick={handleRevealAll}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Hiện đáp án tất cả
              </button>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-white shadow-md max-w-md w-full">
              <img
                src="/assets/aistudio/image_c0fc1caf.png"
                alt="Tranh hoạt hình điền đại từ thích hợp trang 5"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-center">
              Nhìn vào hình ảnh hoạt họa và cử chỉ tay để xác định đại từ tương ứng
            </p>
          </div>

          {/* Right: Interactive Bubble Selector & Answers */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chọn nhân vật để xem lời giải trực quan:
            </div>

            <div className="grid grid-cols-2 gap-2">
              {COMIC_BUBBLES.map(b => {
                const isSelected = selectedBubbleId === b.id;
                const isRevealed = revealedBubbles[b.id];
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBubbleId(b.id);
                      handleReveal(b.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 shadow-sm ring-2 ring-cyan-400'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-500">{b.type}</span>
                      {isRevealed ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold font-mono">
                          {b.correctPronoun}
                        </span>
                      ) : (
                        <span className="text-[10px] text-blue-600 font-semibold">Bấm xem</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {b.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {b.character}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Character Detail */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                    {selectedBubble.label} • {selectedBubble.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedBubble.character}
                  </h4>
                </div>
                <button
                  onClick={() => speak(selectedBubble.correctPronoun)}
                  className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 transition-colors"
                  title="Nghe phát âm đại từ"
                  aria-label="Nghe phát âm đại từ"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-lg bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Đại từ chính xác:</span>
                <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {selectedBubble.correctPronoun}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                💡 <span className="font-semibold text-slate-800 dark:text-slate-200">Vì sao dùng đại từ này: </span>
                {selectedBubble.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Complete Pronoun Master Matrix */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Bảng Ma Trận 5 Dạng Đại Từ Tiếng Anh
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chủ từ ➔ Túc từ ➔ Tính từ sở hữu ➔ Đại từ sở hữu ➔ Đại từ phản thân
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {(['all', 'subject', 'object', 'possessive', 'reflexive'] as const).map(f => (
              <button
                key={f}
                onClick={() => setMatrixFilter(f)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  matrixFilter === f
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {f === 'all' && 'Tất cả'}
                {f === 'subject' && 'Chủ từ (S)'}
                {f === 'object' && 'Túc từ (O)'}
                {f === 'possessive' && 'Sở hữu'}
                {f === 'reflexive' && 'Phản thân'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <th className="p-3 font-bold">Ngôi / Đối tượng</th>
                {(matrixFilter === 'all' || matrixFilter === 'subject') && (
                  <th className="p-3 font-bold text-blue-600 dark:text-blue-400">Chủ từ (Subject)</th>
                )}
                {(matrixFilter === 'all' || matrixFilter === 'object') && (
                  <th className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Túc từ (Object)</th>
                )}
                {(matrixFilter === 'all' || matrixFilter === 'possessive') && (
                  <th className="p-3 font-bold text-amber-600 dark:text-amber-400">Tính từ sở hữu</th>
                )}
                {(matrixFilter === 'all' || matrixFilter === 'possessive') && (
                  <th className="p-3 font-bold text-purple-600 dark:text-purple-400">Đại từ sở hữu</th>
                )}
                {(matrixFilter === 'all' || matrixFilter === 'reflexive') && (
                  <th className="p-3 font-bold text-rose-600 dark:text-rose-400">Đại từ phản thân</th>
                )}
                <th className="p-3 font-bold text-slate-500">Nghĩa tiếng Việt</th>
              </tr>
            </thead>
            <tbody>
              {PRONOUN_MATRIX.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{row.person}</td>
                  {(matrixFilter === 'all' || matrixFilter === 'subject') && (
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{row.subject}</td>
                  )}
                  {(matrixFilter === 'all' || matrixFilter === 'object') && (
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.object}</td>
                  )}
                  {(matrixFilter === 'all' || matrixFilter === 'possessive') && (
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{row.possAdj} + N</td>
                  )}
                  {(matrixFilter === 'all' || matrixFilter === 'possessive') && (
                    <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">{row.possPro}</td>
                  )}
                  {(matrixFilter === 'all' || matrixFilter === 'reflexive') && (
                    <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">{row.reflexive}</td>
                  )}
                  <td className="p-3 text-slate-500 dark:text-slate-400">{row.vi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
