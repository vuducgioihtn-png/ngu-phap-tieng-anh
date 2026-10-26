import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, XCircle, ArrowRight, BookOpen, RotateCcw, Zap, HelpCircle } from 'lucide-react';

interface PresentSimpleLabProps {
  onOpenPdf?: () => void;
}

export const PresentSimpleLab: React.FC<PresentSimpleLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'tobe' | 'verbs' | 'adverbs' | 'practice1' | 'practice2' | 'scans'>('tobe');

  // Audio helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // State for TO BE interactive explorer
  const [toBeSubjectGroup, setToBeSubjectGroup] = useState<'I' | 'S1' | 'S2'>('S2');
  const [toBeForm, setToBeForm] = useState<'pos' | 'neg' | 'ques'>('pos');
  const [showContraction, setShowContraction] = useState(true);

  // State for Verbs ES Transformer
  const [verbCategory, setVerbCategory] = useState<'ong_chin' | 'consonant_y' | 'vowel_y' | 'normal'>('ong_chin');
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(0);

  // State for Adverbs of Frequency
  const [selectedAdverbIndex, setSelectedAdverbIndex] = useState(1); // 1 = usually

  // State for Quick Interactive Exercises in Practice 1 & 2
  const [userAnswersP1, setUserAnswersP1] = useState<{ [key: string]: string }>({});
  const [feedbackP1, setFeedbackP1] = useState<{ [key: string]: boolean }>({});
  const [userAnswersP2, setUserAnswersP2] = useState<{ [key: string]: string }>({});
  const [feedbackP2, setFeedbackP2] = useState<{ [key: string]: boolean }>({});

  // Ong Chin San Xuat SH verb examples from Page 18-20
  const verbSets = {
    ong_chin: [
      { base: 'go', rule: '-o → -es', result: 'goes', example: 'She goes to school by bus.', vi: 'Cô ấy đi học bằng xe buýt.' },
      { base: 'watch', rule: '-ch → -es', result: 'watches', example: 'He watches TV every night.', vi: 'Anh ấy xem TV mỗi tối.' },
      { base: 'wash', rule: '-sh → -es', result: 'washes', example: 'My friend washes her clothes every morning.', vi: 'Bạn tôi giặt quần áo mỗi sáng.' },
      { base: 'relax', rule: '-x → -es', result: 'relaxes', example: 'My sister relaxes by listening to classical music.', vi: 'Chị tôi thư giãn bằng cách nghe nhạc cổ điển.' },
      { base: 'kiss', rule: '-s/-ss → -es', result: 'kisses', example: 'The mother kisses her baby gently.', vi: 'Người mẹ hôn con yêu nhẹ nhàng.' },
    ],
    consonant_y: [
      { base: 'fly', rule: 'Phụ âm (l) + y → -ies', result: 'flies', example: 'My father flies to Korea regularly.', vi: 'Bố tôi bay sang Hàn Quốc thường xuyên.' },
      { base: 'study', rule: 'Phụ âm (d) + y → -ies', result: 'studies', example: 'Nam studies English every day.', vi: 'Nam học tiếng Anh mỗi ngày.' },
      { base: 'carry', rule: 'Phụ âm (r) + y → -ies', result: 'carries', example: 'He carries a heavy backpack.', vi: 'Cậu ấy mang ba lô nặng.' },
    ],
    vowel_y: [
      { base: 'play', rule: 'Nguyên âm (a) + y → thêm s bình thường', result: 'plays', example: 'He plays football on Sundays.', vi: 'Cậu ấy chơi bóng đá vào Chủ nhật.' },
      { base: 'stay', rule: 'Nguyên âm (a) + y → thêm s bình thường', result: 'stays', example: 'She stays at home when it rains.', vi: 'Cô ấy ở nhà khi trời mưa.' },
      { base: 'buy', rule: 'Nguyên âm (u) + y → thêm s bình thường', result: 'buys', example: 'My mother buys fruits at the market.', vi: 'Mẹ tôi mua hoa quả ngoài chợ.' },
    ],
    normal: [
      { base: 'work', rule: 'Còn lại thêm s', result: 'works', example: 'He works in a bank.', vi: 'Anh ấy làm việc tại ngân hàng.' },
      { base: 'rain', rule: 'Còn lại thêm s', result: 'rains', example: 'It often rains at this time of the year.', vi: 'Trời thường mưa vào thời điểm này trong năm.' },
      { base: 'read', rule: 'Còn lại thêm s', result: 'reads', example: 'She reads Tap Chi Phu Nu every day.', vi: 'Bà ấy đọc Tạp Chí Phụ Nữ mỗi ngày.' },
      { base: 'speak', rule: 'Còn lại thêm s', result: 'speaks', example: 'She speaks English very fluently.', vi: 'Cô ấy nói tiếng Anh rất lưu loát.' },
    ]
  };

  // Adverbs of Frequency data
  const adverbsData = [
    { word: 'Always', percent: '100%', vi: 'Luôn luôn', exBe: 'She is always friendly and cheerful.', exV: 'She always gets up at 6 every morning.' },
    { word: 'Usually', percent: '80%', vi: 'Thường xuyên', exBe: 'They are usually on time.', exV: 'He usually walks to work.' },
    { word: 'Often', percent: '60%', vi: 'Thường', exBe: 'It is often very cold in winter.', exV: 'She often goes shopping at the weekend.' },
    { word: 'Sometimes', percent: '40%', vi: 'Thỉnh thoảng', exBe: 'The bus is sometimes late.', exV: 'I sometimes eat out with my colleagues.' },
    { word: 'Rarely / Seldom', percent: '20%', vi: 'Hiếm khi', exBe: 'He is rarely angry.', exV: 'They rarely watch movies at the cinema.' },
    { word: 'Never', percent: '0%', vi: 'Không bao giờ', exBe: 'She is never late for class.', exV: 'They never go shopping because they don\'t have enough money.' },
  ];

  // TO BE combinations
  const getToBeCard = () => {
    if (toBeSubjectGroup === 'I') {
      if (toBeForm === 'pos') {
        return {
          subject: 'I',
          be: 'am',
          short: "I'm",
          full: 'I am a doctor.',
          shortSentence: "I'm a doctor.",
          vi: 'Tôi là bác sĩ.',
          rule: 'I luôn đi với am'
        };
      } else if (toBeForm === 'neg') {
        return {
          subject: 'I',
          be: 'am not',
          short: "I'm not",
          full: 'I am not a doctor.',
          shortSentence: "I'm not a doctor.",
          vi: 'Tôi không phải là bác sĩ.',
          rule: 'Viết tắt: I\'m not (không có amn\'t)'
        };
      } else {
        return {
          subject: 'I',
          be: 'Am I...?',
          short: 'Am I late?',
          full: 'Am I late?',
          shortSentence: 'Am I late?',
          vi: 'Tôi có bị trễ không?',
          rule: 'Đảo Am lên trước I'
        };
      }
    } else if (toBeSubjectGroup === 'S1') {
      // You, We, They, Plural
      if (toBeForm === 'pos') {
        return {
          subject: 'You / We / They',
          be: 'are',
          short: "You're / We're / They're",
          full: 'They are in the park. / We are students.',
          shortSentence: "They're in the park. / We're students.",
          vi: 'Họ đang ở trong công viên. / Chúng tôi là học sinh.',
          rule: 'Chủ ngữ số nhiều đi với ARE'
        };
      } else if (toBeForm === 'neg') {
        return {
          subject: 'You / We / They',
          be: 'are not',
          short: "aren't",
          full: 'My parents are not rich. / They are not at home.',
          shortSentence: "My parents aren't rich. / They aren't at home.",
          vi: 'Bố mẹ tôi không giàu có. / Họ không có ở nhà.',
          rule: 'Phủ định viết tắt: are not → aren\'t'
        };
      } else {
        return {
          subject: 'You / We / They',
          be: 'Are + S...?',
          short: 'Are you Spanish? / Are they from America?',
          full: 'Are you Spanish? / Are they from America?',
          shortSentence: 'Are you Spanish? / Are they from America?',
          vi: 'Bạn có phải người Tây Ban Nha không? / Họ đến từ Mỹ à?',
          rule: 'Đảo Are lên đầu câu'
        };
      }
    } else {
      // S2: She, He, It, Singular
      if (toBeForm === 'pos') {
        return {
          subject: 'She / He / It / Danh từ số ít',
          be: 'is',
          short: "She's / He's / It's",
          full: 'My father is a teacher. / She is twenty-six years old.',
          shortSentence: "My father's a teacher. / She's twenty-six years old.",
          vi: 'Bố tôi là giáo viên. / Cô ấy 26 tuổi.',
          rule: 'Ngôi thứ 3 số ít đi với IS'
        };
      } else if (toBeForm === 'neg') {
        return {
          subject: 'She / He / It / Danh từ số ít',
          be: 'is not',
          short: "isn't",
          full: 'It is not cold today. / She is not friendly.',
          shortSentence: "It isn't cold today. / She isn't friendly.",
          vi: 'Hôm nay trời không lạnh. / Cô ấy không thân thiện.',
          rule: 'Phủ định viết tắt: is not → isn\'t'
        };
      } else {
        return {
          subject: 'She / He / It',
          be: 'Is + S...?',
          short: 'Is she Vietnamese? / Is he twenty?',
          full: 'Is she Vietnamese? / Is he twenty?',
          shortSentence: 'Is she Vietnamese? / Is he twenty?',
          vi: 'Cô ấy là người Việt Nam phải không? / Cậu ấy 20 tuổi à?',
          rule: 'Đảo Is lên đầu câu'
        };
      }
    }
  };

  const currentToBe = getToBeCard();
  const currentVerbList = verbSets[verbCategory];
  const currentVerb = currentVerbList[selectedVerbIndex] || currentVerbList[0];
  const currentAdv = adverbsData[selectedAdverbIndex];

  // Practice 1 items (Sample from Page 19)
  const p1Items = [
    { id: 'p1_1', prompt: '1. My father _____ (be) a teacher.', answer: 'is', shortAns: "My father's a teacher", hint: 'Chủ ngữ ngôi thứ 3 số ít My father' },
    { id: 'p1_2', prompt: '2. I _____ (be) a doctor.', answer: 'am', shortAns: "I'm a doctor", hint: 'Ngôi thứ nhất số ít I' },
    { id: 'p1_3', prompt: '3. She _____ (be) twenty-six years old.', answer: 'is', shortAns: "She's twenty-six years old", hint: 'Ngôi She số ít' },
    { id: 'p1_4', prompt: '4. They _____ (be) in the park.', answer: 'are', shortAns: "They're in the park", hint: 'Chủ ngữ số nhiều They' },
    { id: 'p1_5', prompt: '5. John and I _____ (be) fourteen years old.', answer: 'are', shortAns: 'John and I are fourteen years old', hint: 'John and I = We (số nhiều 2 người)' },
    { id: 'p1_6', prompt: '6. My parents _____ (not be) rich.', answer: "aren't", altAnswer: 'are not', hint: 'Phủ định số nhiều My parents' },
    { id: 'p1_7', prompt: '7. It _____ (not be) cold today.', answer: "isn't", altAnswer: 'is not', hint: 'Phủ định số ít It' },
    { id: 'p1_8', prompt: '8. You/ Spanish? → _____', answer: 'Are you Spanish?', altAnswer: 'Are you Spanish', hint: 'Đảo Are lên đầu câu hỏi' },
    { id: 'p1_9', prompt: '9. She/ Vietnamese? → _____', answer: 'Is she Vietnamese?', altAnswer: 'Is she Vietnamese', hint: 'Đảo Is lên đầu câu hỏi' }
  ];

  // Practice 2 items (Sample from Page 20)
  const p2Items = [
    { id: 'p2_1', prompt: '1. They _____ (live) in Saigon, Vietnam.', answer: 'live', hint: 'Chủ ngữ số nhiều They giữ nguyên V' },
    { id: 'p2_2', prompt: '2. It often _____ (rain) at this time of the year.', answer: 'rains', hint: 'Chủ ngữ số ít It → thêm s' },
    { id: 'p2_3', prompt: '3. She _____ (read) Tap Chi Phu Nu every day.', answer: 'reads', hint: 'Chủ ngữ số ít She → thêm s' },
    { id: 'p2_4', prompt: '4. My father _____ (fly) to Korea regularly.', answer: 'flies', hint: 'Tận cùng phụ âm + y → -ies' },
    { id: 'p2_5', prompt: '5. He often _____ (watch) TV two hours a day.', answer: 'watches', hint: 'Tận cùng -ch (Ong CHín...) → -es' },
    { id: 'p2_6', prompt: '6. Tony _____ (go) to school on foot on Wednesdays.', answer: 'goes', hint: 'Tận cùng -o (Ong CHín...) → -es' },
    { id: 'p2_7', prompt: '7. My sister _____ (relax) by listening to music.', answer: 'relaxes', hint: 'Tận cùng -x (Sản Xuất) → -es' },
    { id: 'p2_8', prompt: '8. I _____ (not ride) to work. I go by bus.', answer: "don't ride", altAnswer: 'do not ride', hint: 'Ngôi I mượn trợ từ don\'t' },
    { id: 'p2_9', prompt: '9. She _____ (not like) watching sports on TV.', answer: "doesn't like", altAnswer: 'does not like', hint: 'Ngôi She mượn doesn\'t + V nguyên mẫu' },
    { id: 'p2_10', prompt: '10. Peter _____ (not eat) meat, he is a vegetarian.', answer: "doesn't eat", altAnswer: 'does not eat', hint: 'Peter số ít mượn doesn\'t' },
    { id: 'p2_11', prompt: '11. She goes to school by bus. → Đặt câu hỏi: _____', answer: 'How does she go to school?', altAnswer: 'How does she go to school', hint: 'Hỏi phương tiện: How does she go to school?' }
  ];

  const handleCheckP1 = (id: string, correct: string, alt?: string) => {
    const userVal = (userAnswersP1[id] || '').trim().toLowerCase().replace(/[.,?]/g, '');
    const cleanCorrect = correct.toLowerCase().replace(/[.,?]/g, '');
    const cleanAlt = alt ? alt.toLowerCase().replace(/[.,?]/g, '') : null;
    const isCorrect = userVal === cleanCorrect || (cleanAlt && userVal === cleanAlt);
    setFeedbackP1(prev => ({ ...prev, [id]: !!isCorrect }));
  };

  const handleCheckP2 = (id: string, correct: string, alt?: string) => {
    const userVal = (userAnswersP2[id] || '').trim().toLowerCase().replace(/[.,?]/g, '');
    const cleanCorrect = correct.toLowerCase().replace(/[.,?]/g, '');
    const cleanAlt = alt ? alt.toLowerCase().replace(/[.,?]/g, '') : null;
    const isCorrect = userVal === cleanCorrect || (cleanAlt && userVal === cleanAlt);
    setFeedbackP2(prev => ({ ...prev, [id]: !!isCorrect }));
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-800 shadow-xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Phòng Thí Nghiệm Hiện Tại Đơn (Trang 18 - 20)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Hiện Tại Đơn Trực Quan: TO BE vs Động Từ Thường
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Minh họa thần chú <span className="font-bold text-amber-600 dark:text-amber-400">"Ong CHín Sản Xuất SH"</span>, quy tắc mượn trợ từ Do/Does và vị trí vàng trạng từ tần suất.
          </p>
        </div>

        {/* Action: Open Original Scan from Book */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('scans')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            Xem Ảnh Trang 18, 19, 20
          </button>
        </div>
      </div>

      {/* Nav Tabs inside Lab */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('tobe')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'tobe'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
          }`}
        >
          ⚡ 1. Động Từ TO BE (am/is/are)
        </button>
        <button
          onClick={() => setActiveTab('verbs')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'verbs'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
          }`}
        >
          🐝 2. Động Từ Thường & "Ong CHín..."
        </button>
        <button
          onClick={() => setActiveTab('adverbs')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'adverbs'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
          }`}
        >
          ⏱️ 3. Vị Trí Vàng Trạng Từ Tần Suất
        </button>
        <button
          onClick={() => setActiveTab('practice1')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'practice1'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
          }`}
        >
          ✍️ Luyện Tập 1 (BE - Trang 19)
        </button>
        <button
          onClick={() => setActiveTab('practice2')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'practice2'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
          }`}
        >
          ✍️ Luyện Tập 2 (VERB - Trang 20)
        </button>
      </div>

      {/* TAB 1: TO BE EXPLORER */}
      {activeTab === 'tobe' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                1. Chọn nhóm chủ từ:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setToBeSubjectGroup('I')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeSubjectGroup === 'I'
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100'
                  }`}
                >
                  I (Tôi) → am
                </button>
                <button
                  onClick={() => setToBeSubjectGroup('S1')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeSubjectGroup === 'S1'
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100'
                  }`}
                >
                  You/We/They → are
                </button>
                <button
                  onClick={() => setToBeSubjectGroup('S2')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeSubjectGroup === 'S2'
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100'
                  }`}
                >
                  He/She/It → is
                </button>
              </div>
            </div>

            {/* Form Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                2. Chọn thể của câu:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setToBeForm('pos')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeForm === 'pos'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100'
                  }`}
                >
                  (+) Khẳng định
                </button>
                <button
                  onClick={() => setToBeForm('neg')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeForm === 'neg'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                  }`}
                >
                  (-) Phủ định (not)
                </button>
                <button
                  onClick={() => setToBeForm('ques')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    toBeForm === 'ques'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                  }`}
                >
                  (?) Câu hỏi
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Display */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Mô hình trực quan: {toBeForm === 'pos' ? 'Khẳng định (+)' : toBeForm === 'neg' ? 'Phủ định (-)' : 'Câu hỏi (?)}'}
              </span>
              <button
                onClick={() => setShowContraction(!showContraction)}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-white/20 hover:bg-white/30 text-white transition-all flex items-center gap-1.5"
              >
                🔄 Đổi Dạng: {showContraction ? 'Viết Tắt (Short Form)' : 'Đầy Đủ (Full Form)'}
              </button>
            </div>

            {/* The Big Sentence */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide">
                  "{showContraction ? currentToBe.shortSentence : currentToBe.full}"
                </div>
                <div className="text-sm text-slate-300 italic">
                  Nghĩa: {currentToBe.vi}
                </div>
              </div>
              <button
                onClick={() => speak(showContraction ? currentToBe.shortSentence : currentToBe.full)}
                className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold transition-all shrink-0 self-start sm:self-center"
                title="Nghe phát âm chuẩn"
                aria-label="Phát âm câu tiếng Anh"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Rule Explanatory Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ghi chú từ sách: {currentToBe.rule}</span>
            </div>
          </div>

          {/* Table from Page 18: TOBE Matrix */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Thể</th>
                  <th className="p-3.5">S1 (I, You, We, They, Số nhiều)</th>
                  <th className="p-3.5">S2 (She, He, It, Số ít)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3.5 font-bold text-emerald-600">(+) Khẳng định</td>
                  <td className="p-3.5">
                    <div>I am → <span className="font-bold text-blue-600">I'm</span></div>
                    <div>You/We/They are → <span className="font-bold text-blue-600">You're / We're / They're</span></div>
                  </td>
                  <td className="p-3.5">
                    She/He/It is → <span className="font-bold text-blue-600">She's / He's / It's</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-rose-600">(-) Phủ định</td>
                  <td className="p-3.5">
                    <div>I am not → <span className="font-bold text-rose-600">I'm not</span></div>
                    <div>You/We/They are not → <span className="font-bold text-rose-600">You aren't / We aren't / They aren't</span></div>
                  </td>
                  <td className="p-3.5">
                    She/He/It is not → <span className="font-bold text-rose-600">She isn't / He isn't / It isn't</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-purple-600">(?) Nghi vấn</td>
                  <td className="p-3.5">
                    <span className="font-bold text-purple-600">Am I...? / Are you/we/they...?</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-purple-600">Is she/he/it...?</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ACTION VERBS & ONG CHIN SAN XUAT SH */}
      {activeTab === 'verbs' && (
        <div className="space-y-6">
          {/* Mnemonic Banner: Ong Chin San Xuat SH */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐝</span>
              <h3 className="text-lg font-black tracking-wide">
                Thần Chú: "Ong CHín Sản Xuất SH"
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed font-medium">
              Khi chủ ngữ là ngôi thứ 3 số ít (<span className="font-bold underline">She, He, It, Danh từ số ít</span>), động từ tận cùng bằng các chữ cái này bắt buộc phải thêm đuôi <span className="font-black bg-white text-orange-600 px-1.5 py-0.5 rounded shadow-xs">-ES</span>:
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-sans">
              <span className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-xs backdrop-blur-xs">O (Ong) <span className="font-mono">→ goes</span></span>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-xs backdrop-blur-xs">CH (CHín) <span className="font-mono">→ watches</span></span>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-xs backdrop-blur-xs">S / SS (Sản) <span className="font-mono">→ kisses</span></span>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-xs backdrop-blur-xs">X (Xuất) <span className="font-mono">→ relaxes / fixes</span></span>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-xs backdrop-blur-xs">SH (SH) <span className="font-mono">→ washes</span></span>
            </div>
          </div>

          {/* Interactive Rule Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => { setVerbCategory('ong_chin'); setSelectedVerbIndex(0); }}
              className={`p-3 rounded-xl text-xs font-bold transition-all text-left border ${
                verbCategory === 'ong_chin'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-black">1. Ong CHín...</div>
              <div className="text-[10px] opacity-80 mt-0.5">-o, -ch, -s, -x, -sh → -es</div>
            </button>

            <button
              onClick={() => { setVerbCategory('consonant_y'); setSelectedVerbIndex(0); }}
              className={`p-3 rounded-xl text-xs font-bold transition-all text-left border ${
                verbCategory === 'consonant_y'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-black">2. Phụ âm + y</div>
              <div className="text-[10px] opacity-80 mt-0.5">fly → flies, study → studies</div>
            </button>

            <button
              onClick={() => { setVerbCategory('vowel_y'); setSelectedVerbIndex(0); }}
              className={`p-3 rounded-xl text-xs font-bold transition-all text-left border ${
                verbCategory === 'vowel_y'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-black">3. Nguyên âm + y</div>
              <div className="text-[10px] opacity-80 mt-0.5">play → plays (+s thường)</div>
            </button>

            <button
              onClick={() => { setVerbCategory('normal'); setSelectedVerbIndex(0); }}
              className={`p-3 rounded-xl text-xs font-bold transition-all text-left border ${
                verbCategory === 'normal'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-black">4. Còn lại</div>
              <div className="text-[10px] opacity-80 mt-0.5">Thêm s thông thường</div>
            </button>
          </div>

          {/* Interactive Verb Chooser Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Chọn từ minh họa:</span>
            {currentVerbList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVerbIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
                  selectedVerbIndex === idx
                    ? 'bg-slate-900 text-amber-300 dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span className="font-mono">{item.base}</span> <span>→</span> <span className="font-mono">{item.result}</span>
              </button>
            ))}
          </div>

          {/* Transformation Machine Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Cỗ Máy Biến Đổi Động Từ Ngôi Thứ 3 Số Ít</span>
              <span className="text-amber-400 font-sans">{currentVerb.rule}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
              <div className="px-5 py-3 rounded-2xl bg-slate-800 border-2 border-slate-700 text-center">
                <div className="text-xs text-slate-400 uppercase font-bold">Nguyên mẫu (V-inf)</div>
                <div className="text-2xl font-black font-mono text-white mt-1">{currentVerb.base}</div>
              </div>

              <ArrowRight className="w-6 h-6 text-amber-400 animate-pulse shrink-0 rotate-90 sm:rotate-0" />

              <div className="px-6 py-3.5 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-center">
                <div className="text-xs text-amber-300 uppercase font-bold">Sau biến đổi (V-s/es)</div>
                <div className="text-3xl font-black font-mono text-amber-400 mt-1">{currentVerb.result}</div>
              </div>
            </div>

            {/* Example sentence from the book */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-bold text-white">
                  "{currentVerb.example}"
                </div>
                <div className="text-xs text-slate-400 italic">
                  {currentVerb.vi}
                </div>
              </div>
              <button
                onClick={() => speak(currentVerb.example)}
                className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 transition-colors shrink-0"
                title="Phát âm câu ví dụ"
                aria-label="Phát âm câu ví dụ động từ"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Do vs Does Shield Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                <span>🛡️ Nhóm 1: I, You, We, They (Số nhiều)</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• Khẳng định (+): <span className="font-bold">Động từ GIỮ NGUYÊN</span> ("I go to school", "We work in the factory")</div>
                <div>• Phủ định (-): Mượn trợ từ <span className="font-bold text-rose-600">DON'T</span> ("We don't like the film")</div>
                <div>• Nghi vấn (?): Đưa <span className="font-bold text-purple-600">DO / DON'T</span> lên đầu ("Do you like it?", "Don't they play?")</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-extrabold text-sm">
                <span>🛡️ Nhóm 2: She, He, It, Danh từ số ít</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• Khẳng định (+): <span className="font-bold">Thêm -S hoặc -ES</span> ("He works", "She goes to school")</div>
                <div>• Phủ định (-): Mượn trợ từ <span className="font-bold text-rose-600">DOESN'T</span> → <span className="underline font-bold">V trở về nguyên mẫu!</span> ("He doesn't like the film")</div>
                <div>• Nghi vấn (?): Đưa <span className="font-bold text-purple-600">DOES / DOESN'T</span> lên đầu → <span className="underline font-bold">V nguyên mẫu!</span> ("Does she like it?")</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADVERBS OF FREQUENCY & POSITION */}
      {activeTab === 'adverbs' && (
        <div className="space-y-6">
          {/* Golden Rule Formula */}
          <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-300 dark:border-purple-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-black text-sm uppercase">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Quy Tắc Vị Trí Vàng: "Đứng SAU TOBE, đứng TRƯỚC Động Từ Thường"
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900">
              <div className="text-center font-bold text-xs text-slate-600 dark:text-slate-300">
                <span className="text-blue-600">BE</span> &lt; <span className="text-purple-600">TRẠNG TỪ TẦN SUẤT</span>
                <div className="text-[11px] text-slate-400 italic mt-0.5">She IS always cheerful.</div>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
              <div className="text-center font-bold text-xs text-slate-600 dark:text-slate-300">
                <span className="text-purple-600">TRẠNG TỪ TẦN SUẤT</span> &lt; <span className="text-emerald-600">ĐỘNG TỪ THƯỜNG</span>
                <div className="text-[11px] text-slate-400 italic mt-0.5">They NEVER go shopping.</div>
              </div>
            </div>
          </div>

          {/* Interactive Spectrum Slider */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
              Mức độ thường xuyên của hành động (Bấm chọn trạng từ):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {adverbsData.map((adv, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAdverbIndex(idx)}
                  className={`p-3 rounded-2xl text-center transition-all border ${
                    selectedAdverbIndex === idx
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300 scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-black">{adv.word}</div>
                  <div className="text-[10px] opacity-80">{adv.percent}</div>
                  <div className="text-[11px] font-medium mt-1">{adv.vi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Cards for the Selected Adverb */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* With TO BE */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                1. Đi với động từ TO BE (Đứng SAU BE):
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    "{currentAdv.exBe}"
                  </div>
                </div>
                <button
                  onClick={() => speak(currentAdv.exBe)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"
                  aria-label="Phát âm câu ví dụ to be"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* With Normal Verb */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                2. Đi với Động từ thường (Đứng TRƯỚC V):
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    "{currentAdv.exV}"
                  </div>
                </div>
                <button
                  onClick={() => speak(currentAdv.exV)}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg"
                  aria-label="Phát âm câu ví dụ động từ thường"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE 1 (BE - TRANG 19) */}
      {activeTab === 'practice1' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Practice 1: Bài tập Động từ BE (Trang 19 sách giáo trình)
            </h3>
            <span className="text-xs text-slate-400">9 câu trích lục từ sách</span>
          </div>

          <div className="space-y-3">
            {p1Items.map((item) => {
              const status = feedbackP1[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    status === true
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                      : status === false
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {item.prompt}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      💡 {item.hint}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={userAnswersP1[item.id] || ''}
                      onChange={(e) => setUserAnswersP1({ ...userAnswersP1, [item.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckP1(item.id, item.answer, item.altAnswer);
                      }}
                      placeholder="Nhập đáp án (ví dụ: is / aren't / Are you Spanish?)..."
                      className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-blue-500 font-sans"
                    />
                    <button
                      onClick={() => handleCheckP1(item.id, item.answer, item.altAnswer)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0"
                    >
                      Kiểm tra
                    </button>
                    {status !== undefined && (
                      <button
                        onClick={() => {
                          setUserAnswersP1({ ...userAnswersP1, [item.id]: item.answer });
                          setFeedbackP1({ ...feedbackP1, [item.id]: true });
                        }}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-600 bg-slate-100 dark:bg-slate-800"
                        title="Xem đáp án"
                      >
                        Đáp án
                      </button>
                    )}
                  </div>

                  {status === true && (
                    <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác! Đáp án chuẩn: {item.answer} {item.shortAns && `(Viết tắt: ${item.shortAns})`}
                    </div>
                  )}
                  {status === false && (
                    <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Chưa chính xác. Thử lại hoặc xem gợi ý: {item.hint}.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: PRACTICE 2 (VERBS - TRANG 20) */}
      {activeTab === 'practice2' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Practice 2: Bài tập Động từ Thường & Trợ Từ (Trang 20 sách giáo trình)
            </h3>
            <span className="text-xs text-slate-400">11 câu trích lục từ sách</span>
          </div>

          <div className="space-y-3">
            {p2Items.map((item) => {
              const status = feedbackP2[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    status === true
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                      : status === false
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {item.prompt}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      💡 {item.hint}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={userAnswersP2[item.id] || ''}
                      onChange={(e) => setUserAnswersP2({ ...userAnswersP2, [item.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckP2(item.id, item.answer, item.altAnswer);
                      }}
                      placeholder="Nhập đáp án (ví dụ: goes / doesn't like / How does she go to school?)..."
                      className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-blue-500 font-sans"
                    />
                    <button
                      onClick={() => handleCheckP2(item.id, item.answer, item.altAnswer)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0"
                    >
                      Kiểm tra
                    </button>
                    {status !== undefined && (
                      <button
                        onClick={() => {
                          setUserAnswersP2({ ...userAnswersP2, [item.id]: item.answer });
                          setFeedbackP2({ ...feedbackP2, [item.id]: true });
                        }}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-600 bg-slate-100 dark:bg-slate-800"
                        title="Xem đáp án"
                      >
                        Đáp án
                      </button>
                    )}
                  </div>

                  {status === true && (
                    <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác! Đáp án: {item.answer}
                    </div>
                  )}
                  {status === false && (
                    <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Chưa chính xác. Gợi ý: {item.hint}.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: ORIGINAL SCANS FROM BOOK (PAGES 18, 19, 20) */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Ảnh Chụp Bản Gốc Giáo Trình Lê Công Đức (Trang 18, 19, 20)
            </h3>
            <span className="text-xs text-slate-500">Đối chiếu học liệu gốc</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Page 18 */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Trang 18: Bảng Lý Thuyết Hiện Tại Đơn
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm max-h-96 overflow-y-auto">
                <img
                  src="/assets/aistudio/image_c70cf41f.png"
                  alt="Trang 18 - Lý thuyết Hiện tại đơn"
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Page 19 */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Trang 19: Practice 1 (Động từ BE)
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm max-h-96 overflow-y-auto">
                <img
                  src="/assets/aistudio/image_b8fec9cb.png"
                  alt="Trang 19 - Practice 1 Động từ BE"
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Page 20 */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                Trang 20: Practice 2 (Động từ thường & Trợ từ)
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm max-h-96 overflow-y-auto">
                <img
                  src="/assets/aistudio/image_6032de6d.png"
                  alt="Trang 20 - Practice 2 Động từ thường"
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
