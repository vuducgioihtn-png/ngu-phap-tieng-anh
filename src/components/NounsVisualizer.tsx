import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Volume2, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';

interface NounTestItem {
  word: string;
  type: 'C' | 'U';
  vi: string;
  reason: string;
}

const NOUNS_LIST: NounTestItem[] = [
  { word: 'keys', type: 'C', vi: 'chìa khóa', reason: 'Danh từ đếm được số nhiều (1 key, 2 keys)' },
  { word: 'work', type: 'U', vi: 'công việc', reason: 'Danh từ chỉ hoạt động, trừu tượng không đếm được' },
  { word: 'news', type: 'U', vi: 'tin tức', reason: 'Có đuôi -s nhưng là danh từ không đếm được (a piece of news)' },
  { word: 'information', type: 'U', vi: 'thông tin', reason: 'Danh từ trừu tượng không đếm được' },
  { word: 'children', type: 'C', vi: 'trẻ em', reason: 'Số nhiều bất quy tắc của "child" (1 child, 2 children)' },
  { word: 'teeth', type: 'C', vi: 'răng', reason: 'Số nhiều bất quy tắc của "tooth" (1 tooth, many teeth)' },
  { word: 'politics', type: 'U', vi: 'chính trị học', reason: 'Môn khoa học có đuôi -s nhưng là danh từ không đếm được' },
  { word: 'mumps', type: 'U', vi: 'bệnh quai bị', reason: 'Tên bệnh tật có đuôi -s nhưng là danh từ không đếm được' },
  { word: 'luggage', type: 'U', vi: 'hành lý', reason: 'Danh từ tập hợp không đếm được (a piece of luggage)' },
  { word: 'languages', type: 'C', vi: 'ngôn ngữ', reason: 'Danh từ đếm được (1 language, 2 languages)' },
  { word: 'advice', type: 'U', vi: 'lời khuyên', reason: 'Danh từ trừu tượng không đếm được (a piece of advice)' },
  { word: 'beauty', type: 'U', vi: 'vẻ đẹp', reason: 'Khái niệm trừu tượng không đếm được' },
  { word: 'mathematics', type: 'U', vi: 'toán học', reason: 'Môn khoa học tính là danh từ không đếm được' },
  { word: 'people', type: 'C', vi: 'mọi người', reason: 'Số nhiều của person (1 person, 2 people)' },
  { word: 'countries', type: 'C', vi: 'các quốc gia', reason: 'Số nhiều của country (phụ âm + y ➔ -ies)' },
  { word: 'geese', type: 'C', vi: 'những con ngỗng', reason: 'Số nhiều bất quy tắc của goose (1 goose ➔ 2 geese)' },
  { word: 'cheese', type: 'U', vi: 'phô mai', reason: 'Chất liệu thực phẩm không đếm được' },
  { word: 'shampoo', type: 'U', vi: 'dầu gội', reason: 'Chất lỏng không đếm được' },
  { word: 'chairwomen', type: 'C', vi: 'các nữ chủ tịch', reason: 'Số nhiều của chairwoman' },
  { word: 'suspicion', type: 'U', vi: 'sự nghi ngờ', reason: 'Danh từ trừu tượng chỉ tâm lý không đếm được' },
  { word: 'calves', type: 'C', vi: 'những con bê', reason: 'Số nhiều của calf (tận cùng f ➔ -ves)' },
  { word: 'forms', type: 'C', vi: 'mẫu đơn', reason: 'Danh từ đếm được thêm -s' },
  { word: 'damage', type: 'U', vi: 'sự thiệt hại', reason: 'Danh từ không đếm được' },
  { word: 'bread', type: 'U', vi: 'bánh mì', reason: 'Chất liệu lương thực không đếm được (a loaf of bread)' },
  { word: 'mice', type: 'C', vi: 'những con chuột', reason: 'Số nhiều bất quy tắc của mouse (1 mouse ➔ mice)' }
];

export const NounsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sorter' | 'articles' | 'plurals'>('sorter');
  const [testedWordIndex, setTestedWordIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<'C' | 'U' | null>(null);
  const [score, setScore] = useState<number>(0);

  const currentItem = NOUNS_LIST[testedWordIndex];

  const handleGuess = (guess: 'C' | 'U') => {
    setUserGuess(guess);
    if (guess === currentItem.type) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setUserGuess(null);
    setTestedWordIndex(prev => (prev + 1) % NOUNS_LIST.length);
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Phòng Thí Nghiệm Danh Từ (Nouns Lab)
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Danh Từ Đếm Được (C), Không Đếm Được (U) & Mạo Từ A/AN
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Dựa trên Trang 12 - 15 sách giáo trình Lê Công Đức: Phân loại, quy tắc số nhiều và ngoại lệ a/an
        </p>
      </div>

      {/* Tab Nav */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl gap-1 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('sorter')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            activeTab === 'sorter'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          🎮 Thử Thách Phân Loại C vs U (30 Từ)
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            activeTab === 'articles'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          🅰️ Quy Tắc Mạo Từ A vs AN
        </button>
        <button
          onClick={() => setActiveTab('plurals')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            activeTab === 'plurals'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          🔢 5 Quy Tắc Biến Đổi Số Nhiều
        </button>
      </div>

      {/* Tab 1: Interactive C vs U Sorter */}
      {activeTab === 'sorter' && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-slate-800 dark:to-slate-800/50 border border-emerald-200 dark:border-emerald-900 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Từ {testedWordIndex + 1} / {NOUNS_LIST.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
              Điểm: {score}
            </span>
          </div>

          {/* Word Card */}
          <div className="text-center py-6 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                {currentItem.word}
              </span>
              <button
                onClick={() => speak(currentItem.word)}
                className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors"
                title="Phát âm từ"
                aria-label="Phát âm từ vựng"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Nghĩa tiếng Việt: "{currentItem.vi}"
            </div>
          </div>

          {/* Choice Buttons: C vs U */}
          {!userGuess ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGuess('C')}
                className="py-4 px-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-extrabold text-base transition-all shadow-sm flex flex-col items-center"
              >
                <span className="text-2xl mb-1">📦 (C)</span>
                <span>Countable Noun</span>
                <span className="text-xs font-normal text-slate-500">(Đếm được)</span>
              </button>

              <button
                onClick={() => handleGuess('U')}
                className="py-4 px-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-extrabold text-base transition-all shadow-sm flex flex-col items-center"
              >
                <span className="text-2xl mb-1">💧 (U)</span>
                <span>Uncountable Noun</span>
                <span className="text-xs font-normal text-slate-500">(Không đếm được)</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {userGuess === currentItem.type ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Chính xác tuyệt đối!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                      <XCircle className="w-5 h-5" />
                      <span>Chưa chính xác! Đáp án đúng là {currentItem.type === 'C' ? '(C) Đếm được' : '(U) Không đếm được'}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-700"
                >
                  <span>Từ tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg leading-relaxed">
                💡 <span className="font-bold text-slate-800 dark:text-slate-200">Quy tắc ghi nhớ: </span>
                {currentItem.reason}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Articles A vs AN */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
            <h4 className="text-base font-bold text-blue-900 dark:text-blue-200">
              Quy Tắc Vàng Dùng "A" hay "AN" (Dựa trên PHÁT ÂM, không chỉ mặt chữ!)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mẹo kinh điển: Dùng <b>AN</b> khi từ bắt đầu bằng một <b>nguyên âm phát âm</b>. Dùng <b>A</b> khi bắt đầu bằng một <b>phụ âm phát âm</b>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AN Cases */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs">
                Dùng AN (Nguyên âm phát âm)
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-2">
                <li>• <b>an apple</b> (một quả táo)</li>
                <li>• <b>an orange</b> (một quả cam)</li>
                <li>• <b>an elephant</b> (một con voi)</li>
                <li>• <b>an umbrella</b> (một cây dù - âm /ʌ/)</li>
                <li>• <b>an hour</b> (⚠️ Âm 'h' CÂM nên dùng AN, không dùng A)</li>
                <li>• <b>an honest man</b> (⚠️ Âm 'h' CÂM nên dùng AN)</li>
              </ul>
            </div>

            {/* A Cases & Traps */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold text-xs">
                Dùng A (Phụ âm phát âm & Bẫy 'U')
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-2">
                <li>• <b>a boy, a girl, a teacher, a doctor</b></li>
                <li>• <b>a university</b> (⚠️ Bắt đầu bằng chữ U nhưng phát âm là /juː/ bán nguyên âm phụ âm ➔ DÙNG A, KHÔNG DÙNG AN!)</li>
                <li>• <b>a uniform</b> (⚠️ Tương tự: phát âm /juːnɪfɔːm/ ➔ DÙNG A!)</li>
                <li>• <b>a one-way street</b> (phát âm /wʌn/)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Plural Transformation Machine */}
      {activeTab === 'plurals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                1. Mẹo thêm -ES: "Ong CHín Sản Xuất SH"
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tận cùng bằng <b>-o, -ch, -s, -x, -sh</b>:
              </p>
              <div className="text-xs font-mono text-amber-700 dark:text-amber-400">
                a watch ➔ watches<br />
                a bus ➔ buses<br />
                a box ➔ boxes<br />
                a tomato ➔ tomatoes<br />
                a brush ➔ brushes
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                2. Tận cùng bằng -Y và -F/-FE
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                • Phụ âm + y ➔ <b>-ies</b>: a country ➔ countries, a lady ➔ ladies<br />
                • Nguyên âm + y ➔ thêm s: a day ➔ days, a boy ➔ boys<br />
                • Tận cùng -f / -fe ➔ <b>-ves</b>: a knife ➔ knives, a wife ➔ wives, a leaf ➔ leaves
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 sm:col-span-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                3. Bảng Danh Từ Bất Quy Tắc Cực Kì Hay Gặp
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono font-semibold">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">man ➔ men</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">woman ➔ women</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">child ➔ children</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">person ➔ people</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">tooth ➔ teeth</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">foot ➔ feet</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">mouse ➔ mice</div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">goose ➔ geese</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
