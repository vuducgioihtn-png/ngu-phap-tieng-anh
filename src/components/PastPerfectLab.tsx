import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Eye,
  RotateCcw,
  Clock,
  Zap,
  Info,
  Layers,
  Split,
  AlertTriangle,
  History,
  Search,
  Check
} from 'lucide-react';

interface PastPerfectLabProps {
  onOpenPdf?: () => void;
}

export const PastPerfectLab: React.FC<PastPerfectLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<
    'formulas' | 'timeline_rules' | 'practice_1' | 'practice_2' | 'magic_formulas' | 'scans'
  >('formulas');

  // TTS speech helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Normalizer for answer checking
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ');
  };

  // ==========================================
  // TAB 1: INTERACTIVE BUILDER STATE
  // ==========================================
  const [builderSubject, setBuilderSubject] = useState<'I' | 'She' | 'They' | 'We' | 'He'>('She');
  const [builderPolarity, setBuilderPolarity] = useState<'pos' | 'neg' | 'quest'>('pos');
  const [builderVerbIndex, setBuilderVerbIndex] = useState<number>(0);

  const VERB_OPTIONS = [
    { base: 'live in Hue by 2010', v3: 'lived in Hue by 2010', vi: 'đã sống ở Huế trước năm 2010', note: 'Có quy tắc thêm -d' },
    { base: 'leave before you came', v3: 'left before you came', vi: 'đã rời đi trước khi bạn đến', note: 'leave ➔ left (V3)' },
    { base: 'prepare the lesson', v3: 'prepared the lesson before school', vi: 'chuẩn bị bài trước khi đến trường', note: 'prepare ➔ prepared' },
    { base: 'watch that film', v3: 'watched that film before it was shown', vi: 'xem bộ phim đó trước khi nó được chiếu', note: 'watch ➔ watched' },
    { base: 'build the building', v3: 'built the building by June 2010', vi: 'xây xong tòa nhà trước tháng 6/2010', note: 'build ➔ built (V3)' },
    { base: 'meet him before', v3: 'met him before he flew to New York', vi: 'gặp anh ấy trước khi anh bay qua New York', note: 'meet ➔ met (V3)' },
    { base: 'eat breakfast', v3: 'eaten breakfast before going to school', vi: 'ăn sáng xong trước khi đi học', note: 'eat ➔ ate ➔ eaten (V3)' },
    { base: 'have that car', v3: 'had that car since College', vi: 'sở hữu chiếc xe đó từ thời đại học', note: 'Cấu trúc had had đặc biệt!' },
    { base: 'sing this song', v3: 'sung this song before', vi: 'hát bài hát này trước đó', note: 'sing ➔ sang ➔ sung (V3)' }
  ];

  const currentVerb = VERB_OPTIONS[builderVerbIndex];

  let builtEn = '';
  let builtVi = '';
  if (builderPolarity === 'pos') {
    builtEn = `${builderSubject} had ${currentVerb.v3}.`;
    builtVi = `${builderSubject === 'I' ? 'Tôi' : builderSubject === 'She' ? 'Cô ấy' : builderSubject === 'They' ? 'Họ' : builderSubject === 'We' ? 'Chúng tôi' : 'Anh ấy'} đã ${currentVerb.vi}.`;
  } else if (builderPolarity === 'neg') {
    builtEn = `${builderSubject} hadn't ${currentVerb.v3}.`;
    builtVi = `${builderSubject === 'I' ? 'Tôi' : builderSubject === 'She' ? 'Cô ấy' : builderSubject === 'They' ? 'Họ' : builderSubject === 'We' ? 'Chúng tôi' : 'Anh ấy'} đã chưa / không ${currentVerb.vi}.`;
  } else {
    builtEn = `Had ${builderSubject.toLowerCase()} ${currentVerb.v3}?`;
    builtVi = `Có phải ${builderSubject === 'I' ? 'tôi' : builderSubject === 'She' ? 'cô ấy' : builderSubject === 'They' ? 'họ' : builderSubject === 'We' ? 'chúng tôi' : 'anh ấy'} đã ${currentVerb.vi} không?`;
  }

  // ==========================================
  // TAB 2: TIMELINE RULES SIMULATOR
  // ==========================================
  const [selectedRuleId, setSelectedRuleId] = useState<number>(2); // Default Rule 2: Trước - Sau
  const [timelineScenario, setTimelineScenario] = useState<'before' | 'after' | 'by_the_time'>('before');

  // ==========================================
  // TAB 3: PRACTICE 1 (Trang 35 - 10 câu QKHT)
  // ==========================================
  const p1Questions = [
    {
      id: 'p1-1',
      prefix: '1. Did you think that we',
      prompt: '(meet)',
      suffix: 'before?',
      validAnswers: ['had met'],
      hint: 'had + V3 của meet (meet ➔ met ➔ met)',
      explanation: 'Hành động gặp nhau đã xảy ra trước thời điểm suy nghĩ trong quá khứ ➔ dùng "had met" (Câu 1 Bài 1 Trang 35).'
    },
    {
      id: 'p1-2',
      prefix: '2. We',
      prompt: '(not finish)',
      suffix: 'our assignments before you came.',
      validAnswers: ["hadn't finished", 'had not finished'],
      hint: "hadn't / had not + finished",
      explanation: 'Trước khi bạn đến (before you came - QKĐ) thì bài tập chưa hoàn thành (xảy ra trước đó) ➔ dùng "hadn\'t finished" (Câu 2 Bài 1 Trang 35).'
    },
    {
      id: 'p1-3',
      prefix: '3. My brother',
      prompt: '(graduate)',
      suffix: 'by 2010.',
      validAnswers: ['had graduated'],
      hint: 'by + mốc thời gian quá khứ (by 2010) ➔ chia QKHT',
      explanation: 'Dấu hiệu "by 2010" (trước năm 2010) ➔ hành động tốt nghiệp đã xong trước mốc đó ➔ dùng "had graduated" (Câu 3 Bài 1 Trang 35).'
    },
    {
      id: 'p1-4',
      prefix: '4. This was the third time she',
      prompt: '(visit)',
      suffix: 'this country.',
      validAnswers: ['had visited'],
      hint: 'It/This was the third time + S + had + V3/ed',
      explanation: 'Cấu trúc "This was the third time..." trong quá khứ bắt buộc đi với quá khứ hoàn thành ➔ "had visited" (Câu 4 Bài 1 Trang 35 & Quy tắc 4 Trang 34).'
    },
    {
      id: 'p1-5',
      prefix: '5. By the time she left, she',
      prompt: '(ask)',
      suffix: 'me to give you this letter.',
      validAnswers: ['had asked'],
      hint: 'By the time + S + V2/ed, S + had + V3/ed',
      explanation: 'Trước lúc cô ấy rời đi (by the time she left), cô ấy đã nhờ tôi chuyển thư ➔ hành động nhờ xảy ra trước ➔ "had asked" (Câu 5 Bài 1 Trang 35).'
    },
    {
      id: 'p1-6',
      prefix: '6. They',
      prompt: '(build)',
      suffix: 'that building by 2009. I think I was just a little boy then.',
      validAnswers: ['had built'],
      hint: 'by 2009 ➔ had + V3 của build (built)',
      explanation: '"by 2009" là trước năm 2009 ➔ dùng quá khứ hoàn thành: build biến thành "had built" (Câu 6 Bài 1 Trang 35).'
    },
    {
      id: 'p1-7',
      prefix: '7. He',
      prompt: '(know)',
      suffix: 'the answer before you told him.',
      validAnswers: ['had known'],
      hint: 'know ➔ knew ➔ known (had known)',
      explanation: 'Anh ấy đã biết đáp án từ trước khi bạn nói cho anh ấy biết ➔ "had known" (Câu 7 Bài 1 Trang 35).'
    },
    {
      id: 'p1-8',
      prefix: '8. My parents',
      prompt: '(buy)',
      suffix: 'that present for me before my birthday several weeks.',
      validAnswers: ['had bought'],
      hint: 'buy ➔ bought (had bought)',
      explanation: 'Bố mẹ đã mua quà trước sinh nhật vài tuần ➔ hành động mua xảy ra trước ➔ "had bought" (Câu 8 Bài 1 Trang 35).'
    },
    {
      id: 'p1-9',
      prefix: '9.',
      prompt: '(you / watch)',
      suffix: "this film before? – No, I hadn't. This was the first time.",
      validAnswers: ['Had you watched', 'had you watched'],
      hint: 'Đảo Had lên đầu câu hỏi: Had + you + watched...?',
      explanation: 'Câu hỏi ở quá khứ hoàn thành đưa "Had" ra trước chủ ngữ ➔ "Had you watched" (Câu 9 Bài 1 Trang 35).'
    },
    {
      id: 'p1-10',
      prefix: '10. It',
      prompt: '(be)',
      suffix: 'bought since I was a little child. I was willing to give you it although I loved it very much.',
      validAnswers: ['had been'],
      hint: 'be chuyển thành V3 là been ➔ had been',
      explanation: 'Đã được mua từ thời còn bé (kéo dài cho tới thời điểm trong quá khứ) ➔ "had been" (Câu 10 Bài 1 Trang 35).'
    }
  ];

  const [p1Answers, setP1Answers] = useState<{ [key: string]: string }>({});
  const [p1Feedback, setP1Feedback] = useState<{ [key: string]: boolean }>({});
  const [showP1Solution, setShowP1Solution] = useState<{ [key: string]: boolean }>({});

  const handleCheckP1 = (id: string, validAnswers: string[], overrideVal?: string) => {
    const rawVal = overrideVal !== undefined ? overrideVal : (p1Answers[id] || '');
    const userVal = normalize(rawVal);
    const isCorrect = validAnswers.some(ans => normalize(ans) === userVal);
    setP1Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP1Solution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllP1 = () => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    p1Questions.forEach(q => {
      const userVal = normalize(p1Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some(ans => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP1Feedback(prev => ({ ...prev, ...fb }));
    setShowP1Solution(prev => ({ ...prev, ...sol }));
  };

  const resetP1 = () => {
    setP1Answers({});
    setP1Feedback({});
    setShowP1Solution({});
  };

  // ==========================================
  // TAB 4: PRACTICE 2 (Trang 35 - 10 câu kết hợp QKĐ vs QKHT)
  // ==========================================
  const p2Questions = [
    {
      id: 'p2-1',
      sentence: '1. I _____ (forget) to tell you that I _____ (pass) the TOEFL test.',
      inputs: [
        { label: 'forget', valid: ['forgot'], placeholder: 'forgot...' },
        { label: 'pass', valid: ['had passed'], placeholder: 'had passed...' }
      ],
      concept: 'Thi đỗ trước ➔ Quên kể sau',
      explanation: 'Hành động thi đỗ TOEFL xảy ra trước (had passed), sau đó mới quên kể (forgot).'
    },
    {
      id: 'p2-2',
      sentence: '2. My parents _____ (prepare) everything for me before I _____ (leave) home for university.',
      inputs: [
        { label: 'prepare', valid: ['had prepared'], placeholder: 'had prepared...' },
        { label: 'leave', valid: ['left'], placeholder: 'left...' }
      ],
      concept: 'Trước BEFORE dùng QKHT, sau BEFORE dùng QKĐ',
      explanation: 'Bố mẹ chuẩn bị mọi thứ trước (had prepared) trước khi tôi rời nhà đi học đại học (left).'
    },
    {
      id: 'p2-3',
      sentence: '3. It was the first time I _____ (read) this book. It _____ (be) so amazing.',
      inputs: [
        { label: 'read', valid: ['had read'], placeholder: 'had read...' },
        { label: 'be', valid: ['was'], placeholder: 'was...' }
      ],
      concept: 'It was the first time + QKHT',
      explanation: 'Cấu trúc "It was the first time" ➔ chia "had read", vế sau kể lại cảm xúc ➔ "was".'
    },
    {
      id: 'p2-4',
      sentence: '4. She was sorry to sell the house. She _____ (have) a lot of memory with it since moving to live here in the house.',
      inputs: [
        { label: 'have', valid: ['had had'], placeholder: 'had had...' }
      ],
      concept: 'Kéo dài bao lâu cho đến quá khứ (had had)',
      explanation: 'Cô ấy đã có rất nhiều kỷ niệm từ lúc dọn tới cho đến khi bán nhà ➔ "had had" (Quy tắc 3 Trang 34).'
    },
    {
      id: 'p2-5',
      sentence: '5. President Ho Chi Minh _____ (leave) Vietnam since 1911. Then he was 21 years old.',
      inputs: [
        { label: 'leave', valid: ['had left', 'left'], placeholder: 'had left / left...' }
      ],
      concept: 'Rời đi từ mốc 1911',
      explanation: 'Bác Hồ đã rời Việt Nam từ năm 1911 (khi đó Bác 21 tuổi) ➔ "had left" (hoặc "left").'
    },
    {
      id: 'p2-6',
      sentence: '6. It was the last time they _____ (meet) each other.',
      inputs: [
        { label: 'meet', valid: ['had met', 'met'], placeholder: 'had met / met...' }
      ],
      concept: 'Lần cuối cùng gặp nhau',
      explanation: '"It was the last time..." ➔ dùng "had met" (hoặc "met").'
    },
    {
      id: 'p2-7',
      sentence: '7. They _____ (play) soccer after they _____ (study) for 5 hours.',
      inputs: [
        { label: 'play', valid: ['played'], placeholder: 'played...' },
        { label: 'study', valid: ['had studied'], placeholder: 'had studied...' }
      ],
      concept: 'Sau AFTER dùng QKHT, trước AFTER dùng QKĐ',
      explanation: 'Học 5 tiếng xảy ra trước (had studied), sau đó mới đi đá bóng (played).'
    },
    {
      id: 'p2-8',
      sentence: '8. My school _____ (be) built by August 2010.',
      inputs: [
        { label: 'be', valid: ['had been'], placeholder: 'had been...' }
      ],
      concept: 'by + mốc thời gian quá khứ (bị động)',
      explanation: '"by August 2010" ➔ trường đã được xây xong trước mốc đó ➔ "had been" built (Quy tắc 1 Trang 34).'
    },
    {
      id: 'p2-9',
      sentence: '9. My younger brother _____ (finish) his MA degree by the age of 20.',
      inputs: [
        { label: 'finish', valid: ['had finished'], placeholder: 'had finished...' }
      ],
      concept: 'by the age of 20 ➔ hoàn thành trước 20 tuổi',
      explanation: 'Trước năm 20 tuổi đã hoàn thành bằng thạc sĩ (hành động xong trước mốc tuổi) ➔ "had finished".'
    },
    {
      id: 'p2-10',
      sentence: '10. They _____ (realize) that they _____ (buy) the flowers already.',
      inputs: [
        { label: 'realize', valid: ['realized'], placeholder: 'realized...' },
        { label: 'buy', valid: ['had bought'], placeholder: 'had bought...' }
      ],
      concept: 'Đã mua hoa từ trước ➔ Sau đó mới nhận ra',
      explanation: 'Họ đã mua hoa rồi từ trước (had bought), sau đó mới nhận ra điều đó (realized).'
    }
  ];

  const [p2Answers, setP2Answers] = useState<{ [key: string]: string }>({});
  const [p2Feedback, setP2Feedback] = useState<{ [key: string]: boolean }>({});
  const [showP2Solution, setShowP2Solution] = useState<{ [key: string]: boolean }>({});

  const handleCheckP2 = (questionId: string, inputIndex: number, validAnswers: string[], overrideVal?: string) => {
    const key = `${questionId}_${inputIndex}`;
    const rawVal = overrideVal !== undefined ? overrideVal : (p2Answers[key] || '');
    const userVal = normalize(rawVal);
    const isCorrect = validAnswers.some(ans => normalize(ans) === userVal);
    setP2Feedback(prev => ({ ...prev, [key]: isCorrect }));
    setShowP2Solution(prev => ({ ...prev, [questionId]: true }));
  };

  const checkAllP2 = () => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    p2Questions.forEach(q => {
      sol[q.id] = true;
      q.inputs.forEach((inp, idx) => {
        const key = `${q.id}_${idx}`;
        const userVal = normalize(p2Answers[key] || '');
        fb[key] = inp.valid.some(ans => normalize(ans) === userVal);
      });
    });
    setP2Feedback(prev => ({ ...prev, ...fb }));
    setShowP2Solution(prev => ({ ...prev, ...sol }));
  };

  const resetP2 = () => {
    setP2Answers({});
    setP2Feedback({});
    setShowP2Solution({});
  };

  // ==========================================
  // TAB 6: SCANS STATE
  // ==========================================
  const [selectedScanPage, setSelectedScanPage] = useState<34 | 35>(34);

  const p1Score = Object.values(p1Feedback).filter(Boolean).length;
  const p2Score = Object.values(p2Feedback).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-100 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyên Đề 14 • Trang 34 & 35 Sách Ngữ Pháp Tiếng Anh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              14. Past Perfect (Quá Khứ Hoàn Thành)
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Diễn tả một hành động <span className="font-bold text-white underline decoration-amber-400">đã xảy ra và hoàn tất TRƯỚC</span> một thời điểm hoặc một hành động khác trong quá khứ! 
              Công thức đồng nhất cho mọi ngôi: <code className="bg-blue-900/60 px-2 py-0.5 rounded font-mono font-bold text-amber-300">S + had + V3/ED</code>.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Xem Bản Scan Trang 34-35</span>
            </button>
            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="px-4 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm transition-all border border-blue-300/30 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Mở Sách PDF Gốc</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="mt-6 pt-4 border-t border-blue-400/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Công thức chung (Tất cả ngôi)</div>
            <div className="font-mono font-extrabold text-white text-sm">S + had + V3/ED</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Quy tắc vàng Trước - Sau</div>
            <div className="font-mono font-bold text-amber-300 text-xs">Trước: QKHT • Sau: QKĐ</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Thần chú Before & After</div>
            <div className="font-mono font-bold text-emerald-300 text-xs">QKHT before QKĐ • QKĐ after QKHT</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Dấu hiệu nhận biết</div>
            <div className="font-mono font-bold text-purple-200 text-xs">by 2010, by the time, before...</div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'formulas'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-500" />
          <span>1. Bảng Cấu Trúc & Thử Nghiệm</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline_rules')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'timeline_rules'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>2. Trục Thời Gian & 4 Quy Tắc Cốt Lõi</span>
        </button>

        <button
          onClick={() => setActiveTab('practice_1')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'practice_1'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>3. Thực Hành 1: QK Hoàn Thành ({p1Score}/{p1Questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('practice_2')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'practice_2'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Split className="w-4 h-4 text-purple-500" />
          <span>4. Thực Hành 2: QKHT vs QKĐ ({p2Score}/14)</span>
        </button>

        <button
          onClick={() => setActiveTab('magic_formulas')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'magic_formulas'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>5. Thần Chú Before / After & Tra Cứu V3</span>
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'scans'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-rose-500" />
          <span>6. Bản Scan Sách Gốc (Trang 34-35)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FORMULAS & INTERACTIVE SENTENCE BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* Authentic Book Table (Trang 34) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Bảng Cấu Trúc Gốc • Trang 34 Sách Lê Công Đức
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  14. Past Perfect (Quá Khứ Hoàn Thành)
                </h3>
              </div>
              <button
                onClick={() => speak('She had lived in Hue by 2010. We had left before you came.')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 border border-blue-200 dark:border-blue-900 w-fit"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc mẫu câu</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <th className="py-3 px-4 font-extrabold text-slate-900 dark:text-white w-1/4">Sentence (Loại câu)</th>
                    <th className="py-3 px-4 font-extrabold text-blue-700 dark:text-blue-300 w-3/4">
                      Áp dụng chung cho TẤT CẢ các ngôi: S (I, You, We, They, He, She, It, Danh từ số ít & số nhiều)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {/* Positive */}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                        <span>(+) Positive</span>
                      </div>
                      <div className="text-slate-500 text-xs">(Khẳng định)</div>
                    </td>
                    <td className="py-4 px-4 space-y-2">
                      <div className="font-mono font-bold text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                        S + had + V3/ED
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 italic space-y-1">
                        <div>• <em>She had lived in Hue by 2010.</em> (Cô ấy đã từng sống ở Huế trước năm 2010).</div>
                        <div>• <em>We had left before you came.</em> (Chúng tôi đã rời đi trước khi bạn đến).</div>
                      </div>
                    </td>
                  </tr>

                  {/* Negative */}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5 text-rose-600 font-extrabold">
                        <span>(-) Negative</span>
                      </div>
                      <div className="text-slate-500 text-xs">(Phủ định)</div>
                    </td>
                    <td className="py-4 px-4 space-y-2">
                      <div className="text-xs text-rose-600 font-bold">Thêm "not" sau had. Viết tắt: had not = hadn't</div>
                      <div className="font-mono font-bold text-rose-700 dark:text-rose-400 text-sm sm:text-base">
                        S + had not (hadn't) + V3/ED
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 italic space-y-1">
                        <div>• <em>We hadn't prepared the lesson before we went to school.</em> (Chúng tôi đã chưa soạn bài trước khi đến trường).</div>
                        <div>• <em>He hadn't watched that film before it was shown.</em> (Anh ấy chưa từng xem bộ phim đó trước khi nó được trình chiếu).</div>
                      </div>
                    </td>
                  </tr>

                  {/* Questions */}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5 text-amber-600 font-extrabold">
                        <span>(?) Questions</span>
                      </div>
                      <div className="text-slate-500 text-xs">(Câu hỏi)</div>
                    </td>
                    <td className="py-4 px-4 space-y-2">
                      <div className="text-xs text-amber-600 font-bold">Đưa "Had" ra đầu câu:</div>
                      <div className="font-mono font-bold text-amber-700 dark:text-amber-400 text-sm sm:text-base">
                        Had + S + V3/ED ?
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 italic space-y-1">
                        <div>• <em>Had they built the building by June, 2010?</em> (Họ đã xây xong tòa nhà đó trước tháng 6 năm 2010 chưa?)</div>
                        <div className="text-slate-500 text-xs">➔ Trả lời ngắn: <em>Yes, they had. / No, they hadn't.</em></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Past Perfect Builder */}
          <div className="bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Phòng Lắp Ráp Trực Quan (Interactive Past Perfect Builder)
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Thử nghiệm phối ghép Chủ Ngữ + HAD / HADN'T + V3/ED
                </h4>
              </div>

              {/* Polarity switcher */}
              <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setBuilderPolarity('pos')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    builderPolarity === 'pos' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  (+) Khẳng định
                </button>
                <button
                  onClick={() => setBuilderPolarity('neg')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    builderPolarity === 'neg' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  (-) Phủ định
                </button>
                <button
                  onClick={() => setBuilderPolarity('quest')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    builderPolarity === 'quest' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  (?) Nghi vấn
                </button>
              </div>
            </div>

            {/* Step 1: Pick Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Chọn Chủ Ngữ (Subject - Tất cả đều dùng HAD):
              </label>
              <div className="flex flex-wrap gap-2">
                {['I', 'She', 'They', 'We', 'He'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBuilderSubject(s as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      builderSubject === s
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Verb Phrase */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Chọn Động Từ & Mệnh Đề Quá Khứ:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {VERB_OPTIONS.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBuilderVerbIndex(idx)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      builderVerbIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs truncate">{v.base}</div>
                    <div className="text-[11px] opacity-80 truncate">{v.vi}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Visualizer Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Câu hoàn chỉnh được lắp ráp:
                </span>
                <button
                  onClick={() => speak(builtEn)}
                  className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 hover:bg-indigo-100"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Phát âm</span>
                </button>
              </div>

              {/* Color breakdown badges */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-base sm:text-lg font-extrabold">
                {builderPolarity === 'quest' ? (
                  <>
                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300">
                      Had
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300">
                      {builderSubject}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300">
                      {currentVerb.v3}
                    </span>
                    <span className="text-slate-600">?</span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300">
                      {builderSubject}
                    </span>
                    <span className={`px-3 py-1 rounded-xl border ${
                      builderPolarity === 'pos'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300'
                    }`}>
                      {builderPolarity === 'pos' ? 'had' : "hadn't"}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300">
                      {currentVerb.v3}
                    </span>
                    <span className="text-slate-600">.</span>
                  </>
                )}
              </div>

              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                ➔ Dịch nghĩa: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{builtVi}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Ghi nhớ: </strong>
                  {currentVerb.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TIMELINE RULES SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'timeline_rules' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Nguyên Lý Sách Gốc • Trang 34
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
              4 Cách Sử Dụng Cốt Lõi Của Thì Quá Khứ Hoàn Thành
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Khám phá trục thời gian "Quá khứ của Quá khứ" (Past of the Past) với quy tắc vàng Trước - Sau.
            </p>

            {/* Rule Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 my-6">
              {[
                { id: 1, title: '1. Trước 1 Mốc Quá Khứ', subtitle: 'by 2010, before 1975' },
                { id: 2, title: '2. Trước 1 Hành Động Khác', subtitle: 'Trước: QKHT • Sau: QKĐ' },
                { id: 3, title: '3. Kéo Dài Bao Lâu Đến QK', subtitle: 'had had it since College' },
                { id: 4, title: '4. Cấu Trúc Số Lần (First/Second)', subtitle: 'It was the first time...' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRuleId(r.id)}
                  className={`p-3 rounded-2xl text-left transition-all border ${
                    selectedRuleId === r.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/30'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <div className="font-extrabold text-xs">{r.title}</div>
                  <div className="text-[10px] opacity-80 truncate">{r.subtitle}</div>
                </button>
              ))}
            </div>

            {/* RULE 1 DETAIL */}
            {selectedRuleId === 1 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-900 space-y-4">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-extrabold text-base">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Quy Tắc 1: Diễn tả hành động ĐÃ XẢY RA RỒI TRƯỚC 1 thời điểm nào đó trong quá khứ
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Trạng từ nhận biết thường gặp: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded font-mono font-bold text-blue-800 dark:text-blue-200">by 2010</code>, <code className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded font-mono font-bold text-blue-800 dark:text-blue-200">before 2009</code>, <code className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded font-mono font-bold text-blue-800 dark:text-blue-200">by August 2010</code>...
                </p>

                {/* Timeline Visualizer */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">Trục thời gian: Xảy ra trước mốc quá khứ</div>
                  
                  <div className="relative py-8">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />

                    {/* Action in Past Perfect */}
                    <div className="absolute top-2 left-1/5 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-emerald-200 dark:ring-emerald-900 flex items-center justify-center text-[10px] text-white font-bold">
                        ✓
                      </div>
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mt-2 text-center">
                        had lived in Hue<br />
                        <span className="text-[10px] text-slate-500">(Xong trước)</span>
                      </div>
                    </div>

                    {/* Past Marker Pin */}
                    <div className="absolute top-2 left-3/5 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-rose-500 ring-4 ring-rose-200 dark:ring-rose-900 flex items-center justify-center text-[10px] text-white font-bold">
                        📍
                      </div>
                      <div className="text-[11px] font-bold text-rose-700 dark:text-rose-300 mt-2 text-center">
                        Mốc: by 2010 / before 1975<br />
                        <span className="text-[10px] text-slate-500">(Thời điểm quá khứ)</span>
                      </div>
                    </div>

                    {/* Present Pin */}
                    <div className="absolute top-2 right-4 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-slate-400 flex items-center justify-center text-[10px] text-white font-bold">
                        NOW
                      </div>
                      <div className="text-[11px] font-bold text-slate-500 mt-2">
                        Hiện tại
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentic Examples from Book */}
                <div className="space-y-2 pt-2">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                        "Duc Tri High School <span className="text-blue-600 font-bold">had been built by August 2010</span>."
                      </div>
                      <div className="text-xs text-slate-500">
                        (Trường THPT Đức Trí đã được xây xong trước tháng 8 năm 2010 - Trang 34).
                      </div>
                    </div>
                    <button
                      onClick={() => speak('Duc Tri High School had been built by August 2010.')}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                        "I suddenly realized that we <span className="text-blue-600 font-bold">had met before</span>."
                      </div>
                      <div className="text-xs text-slate-500">
                        (Tôi chợt nhận ra rằng chúng tôi đã gặp nhau từ trước đó rồi - Trang 34).
                      </div>
                    </div>
                    <button
                      onClick={() => speak('I suddenly realized that we had met before.')}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RULE 2 DETAIL (THE GOLDEN RULE: TRƯỚC - SAU) */}
            {selectedRuleId === 2 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/40 dark:from-indigo-950/30 dark:to-purple-950/20 border-2 border-indigo-300 dark:border-indigo-800 space-y-5">
                <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-extrabold text-base">
                  <Split className="w-5 h-5 text-indigo-600" />
                  Quy Tắc 2 (Quan trọng nhất): Xảy Ra Trước Dùng QKHT • Xảy Ra Sau Dùng QKĐ
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-medium">
                  <strong>Thần chú bất hủ Trang 34: </strong>
                  <em>"Nếu hành động nào <span className="font-bold text-purple-700 dark:text-purple-300 underline">xảy ra trước</span> thì dùng thì Quá Khứ Hoàn Thành (had + V3/ed), hành động nào <span className="font-bold text-blue-700 dark:text-blue-300 underline">xảy ra sau đó</span> thì dùng thì Quá Khứ Đơn (V2/ed)."</em>
                </div>

                {/* Scenario Toggle */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTimelineScenario('before')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      timelineScenario === 'before'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Mẫu 1: BEFORE (Trước)
                  </button>
                  <button
                    onClick={() => setTimelineScenario('after')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      timelineScenario === 'after'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Mẫu 2: AFTER (Sau)
                  </button>
                  <button
                    onClick={() => setTimelineScenario('by_the_time')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      timelineScenario === 'by_the_time'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Mẫu 3: BY THE TIME (Vào lúc)
                  </button>
                </div>

                {/* Scenario Breakdown Card */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  {timelineScenario === 'before' && (
                    <div className="space-y-3">
                      <div className="font-mono text-xs font-bold text-indigo-600">
                        Cấu trúc: S + had + V3/ed (Xảy ra TRƯỚC) + BEFORE + S + V2/ed (Xảy ra SAU)
                      </div>
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                          "I <span className="text-purple-600 underline">had met</span> him before he <span className="text-blue-600 underline">flew</span> to New York."
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          ➔ <strong>Gặp anh ấy</strong> xảy ra trước ➔ dùng <code className="font-bold text-purple-600">had met</code>.<br />
                          ➔ <strong>Anh ấy bay qua New York</strong> xảy ra sau ➔ dùng <code className="font-bold text-blue-600">flew</code> (Trang 34).
                        </div>
                      </div>
                    </div>
                  )}

                  {timelineScenario === 'after' && (
                    <div className="space-y-3">
                      <div className="font-mono text-xs font-bold text-indigo-600">
                        Cấu trúc: S + V2/ed (Xảy ra SAU) + AFTER + S + had + V3/ed (Xảy ra TRƯỚC)
                      </div>
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                          "I <span className="text-blue-600 underline">went</span> to school after I <span className="text-purple-600 underline">had eaten</span> my breakfast."
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          ➔ <strong>Ăn sáng xong trước</strong> ➔ dùng <code className="font-bold text-purple-600">had eaten</code>.<br />
                          ➔ <strong>Đi đến trường sau</strong> ➔ dùng <code className="font-bold text-blue-600">went</code> (Trang 34).
                        </div>
                      </div>
                    </div>
                  )}

                  {timelineScenario === 'by_the_time' && (
                    <div className="space-y-3">
                      <div className="font-mono text-xs font-bold text-indigo-600">
                        Cấu trúc: BY THE TIME + S + V2/ed (SAU), S + had + V3/ed (TRƯỚC)
                      </div>
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                          "By the time you <span className="text-blue-600 underline">arrived</span>, I <span className="text-purple-600 underline">had prepared</span> our dinner."
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          ➔ <strong>Tôi nấu xong cơm trước</strong> ➔ dùng <code className="font-bold text-purple-600">had prepared</code>.<br />
                          ➔ <strong>Bạn mới tới sau</strong> ➔ dùng <code className="font-bold text-blue-600">arrived</code> (Trang 34).
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* RULE 3 DETAIL: DURATION UP TO PAST */}
            {selectedRuleId === 3 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-extrabold text-base">
                  <History className="w-5 h-5 text-emerald-600" />
                  Quy Tắc 3: Hành Động Đã Xảy Ra Bao Lâu Cho Đến 1 Thời Điểm Quá Khứ
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Để nói về một hành động kéo dài trong bao lâu cho đến một mốc sự việc trong quá khứ:
                </p>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300">
                      "I was sorry to sell my car. I <span className="underline decoration-amber-400 font-extrabold">had had</span> it since College."
                    </span>
                    <button onClick={() => speak('I was sorry to sell my car. I had had it since College.')} className="text-emerald-600">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    ➔ <strong>Giải thích hiện tượng "had had":</strong> Chữ <em>had</em> đầu tiên là trợ động từ của thì Quá Khứ Hoàn Thành, chữ <em>had</em> thứ hai là dạng phân từ 3 ($V_3$) của động từ <em>have</em> (sở hữu). Có nghĩa là: Tôi đã sở hữu chiếc xe đó từ thời đại học cho đến lúc phải bán nó đi (Trang 34).
                  </div>
                </div>
              </div>
            )}

            {/* RULE 4 DETAIL: NUMBER OF TIMES IN THE PAST */}
            {selectedRuleId === 4 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/40 dark:from-purple-950/30 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-800 space-y-4">
                <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-extrabold text-base">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Quy Tắc 4: Cấu Trúc Đặc Biệt "It was the first / second / third time..."
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm border border-slate-800">
                  It was the first / second / third ... + (that) + Subject + had + V3/ED
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">
                      "It was the first time I <span className="text-purple-600 font-bold">had eaten</span> such delicious food."
                    </div>
                    <div className="text-[11px] text-slate-500">
                      (Đó là lần đầu tiên tôi được ăn món ăn ngon đến thế - Trang 34).
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">
                      "It was the second time that I <span className="text-purple-600 font-bold">had sung</span> this song."
                    </div>
                    <div className="text-[11px] text-slate-500">
                      (Đó là lần thứ hai mà tôi hát bài hát này - Trang 34).
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRACTICE 1 (Trang 35 - 10 câu QKHT) */}
      {/* ========================================================================= */}
      {activeTab === 'practice_1' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Thực Hành 1 • Trang 35 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  1. Chia thì Quá Khứ Hoàn Thành với động từ trong ngoặc
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dạng khẳng định, phủ định hoặc câu hỏi (10 câu nguyên văn sách in).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={checkAllP1}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all shadow-sm"
                >
                  Chấm Tất Cả
                </button>
                <button
                  onClick={resetP1}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {p1Questions.map((q) => {
                const userAns = p1Answers[q.id] || '';
                const isChecked = showP1Solution[q.id];
                const isCorrect = p1Feedback[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 flex-1">
                        <span>{q.prefix} </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{q.prompt}</span>
                        <span> {q.suffix}</span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <input
                          type="text"
                          value={userAns}
                          onChange={(e) => setP1Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCheckP1(q.id, q.validAnswers, userAns);
                          }}
                          placeholder="had + V3..."
                          className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-44"
                        />
                        <button
                          onClick={() => handleCheckP1(q.id, q.validAnswers, userAns)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500"
                        >
                          Kiểm tra
                        </button>
                      </div>
                    </div>

                    {isChecked && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-rose-700 dark:text-rose-300 font-bold'}>
                            {isCorrect ? 'Chính xác! ' : `Chưa đúng! Đáp án: "${q.validAnswers[0]}" • `}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRACTICE 2 (Trang 35 - 10 câu kết hợp QKHT vs QKĐ) */}
      {/* ========================================================================= */}
      {activeTab === 'practice_2' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Thực Hành 2 • Trang 35 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  2. Chia động từ trong ngoặc với thì Quá Khứ Hoàn Thành hoặc Quá Khứ Đơn
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Xác định hành động xảy ra TRƯỚC (had + V3/ed) và hành động xảy ra SAU (V2/ed).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={checkAllP2}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all shadow-sm"
                >
                  Chấm Bài 2
                </button>
                <button
                  onClick={resetP2}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {p2Questions.map((q) => {
                const isChecked = showP2Solution[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? 'border-purple-300 bg-purple-50/30 dark:border-purple-800 dark:bg-purple-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          {q.concept}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {q.sentence}
                      </div>

                      {/* Inputs */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        {q.inputs.map((inp, idx) => {
                          const key = `${q.id}_${idx}`;
                          const val = p2Answers[key] || '';
                          const isInputCorrect = p2Feedback[key];

                          return (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-500">[{inp.label}]:</span>
                              <input
                                type="text"
                                value={val}
                                onChange={(e) => setP2Answers(prev => ({ ...prev, [key]: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleCheckP2(q.id, idx, inp.valid, val);
                                }}
                                placeholder={inp.placeholder}
                                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono border focus:outline-none w-44 ${
                                  isChecked
                                    ? isInputCorrect
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                                      : 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
                                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-purple-500'
                                }`}
                              />
                            </div>
                          );
                        })}

                        <button
                          onClick={() => {
                            q.inputs.forEach((inp, idx) => {
                              const key = `${q.id}_${idx}`;
                              handleCheckP2(q.id, idx, inp.valid, p2Answers[key]);
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 ml-auto"
                        >
                          Kiểm tra câu
                        </button>
                      </div>

                      {isChecked && (
                        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                          <div className="font-bold text-purple-700 dark:text-purple-300">
                            Đáp án chuẩn: {q.inputs.map(i => `"${i.valid[0]}"`).join(' & ')}
                          </div>
                          <div>
                            💡 <span className="font-semibold">{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BEFORE / AFTER RULES & V3 LOOKUP */}
      {/* ========================================================================= */}
      {activeTab === 'magic_formulas' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Mẹo Nhớ Siêu Tốc & Bảng Tra Cứu Phân Từ 2 (V3)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Thần Chú "Trước Trước - Sau Sau" với Before, After & By The Time
            </h3>

            {/* 3 Golden Formula Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-900 space-y-2">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
                  1. Với liên từ BEFORE
                </div>
                <div className="font-mono text-sm font-extrabold text-blue-900 dark:text-blue-200">
                  QKHT + before + QKĐ
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  👉 <strong>Trước BEFORE là Quá Khứ Hoàn Thành!</strong><br />
                  Ví dụ: <em>We had left before you came.</em>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                  2. Với liên từ AFTER
                </div>
                <div className="font-mono text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                  QKĐ + after + QKHT
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  👉 <strong>Sau AFTER là Quá Khứ Hoàn Thành!</strong><br />
                  Ví dụ: <em>I went to school after I had eaten breakfast.</em>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-900 space-y-2">
                <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase">
                  3. Với BY THE TIME
                </div>
                <div className="font-mono text-sm font-extrabold text-purple-900 dark:text-purple-200">
                  By the time + QKĐ, QKHT
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  👉 <strong>Mệnh đề By the time chia QKĐ, vế còn lại chia QKHT!</strong><br />
                  Ví dụ: <em>By the time she left, she had asked me...</em>
                </div>
              </div>
            </div>

            {/* Quick Irregular V3 Lookup for Past Perfect */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Các Động Từ Bất Quy Tắc V3 Xuất Hiện Trong Bài Tập (Trang 34 & 35):
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {[
                  { v1: 'meet', v2: 'met', v3: 'had met', vi: 'gặp' },
                  { v1: 'leave', v2: 'left', v3: 'had left', vi: 'rời đi' },
                  { v1: 'build', v2: 'built', v3: 'had built', vi: 'xây dựng' },
                  { v1: 'buy', v2: 'bought', v3: 'had bought', vi: 'mua' },
                  { v1: 'know', v2: 'knew', v3: 'had known', vi: 'biết' },
                  { v1: 'eat', v2: 'ate', v3: 'had eaten', vi: 'ăn' },
                  { v1: 'have', v2: 'had', v3: 'had had', vi: 'sở hữu / có' },
                  { v1: 'be', v2: 'was/were', v3: 'had been', vi: 'thì / là / ở' },
                  { v1: 'sing', v2: 'sang', v3: 'had sung', vi: 'hát' },
                  { v1: 'see', v2: 'saw', v3: 'had seen', vi: 'nhìn thấy' },
                  { v1: 'go', v2: 'went', v3: 'had gone', vi: 'đi' },
                  { v1: 'tell', v2: 'told', v3: 'had told', vi: 'kể / bảo' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-blue-600 dark:text-blue-400">{item.v1} ➔ {item.v3}</div>
                    <div className="text-[11px] text-slate-500 font-sans">{item.vi}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: AUTHENTIC SCANS (Trang 34 & 35) */}
      {/* ========================================================================= */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Tài Liệu Gốc • Bản Chụp Sách Thật
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Trang 34 & 35 - Sách Ngữ Pháp Tiếng Anh (Lê Công Đức)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đối chiếu nguyên vẹn lý thuyết Quá Khứ Hoàn Thành và 2 bài tập thực hành.
                </p>
              </div>

              {/* Page Switcher */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedScanPage(34)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedScanPage === 34 ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 34 (Lý thuyết)
                </button>
                <button
                  onClick={() => setSelectedScanPage(35)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedScanPage === 35 ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 35 (Thực hành 1 & 2)
                </button>
              </div>
            </div>

            {/* Scan Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex flex-col items-center p-4">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800 mb-4 px-2">
                <div>
                  Đang xem: <strong className="text-white">Trang {selectedScanPage} / 196</strong>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {selectedScanPage === 34 ? 'Tập tin ảnh gốc: image_c4d6dcdd.png' : 'Tập tin ảnh gốc: image_0de1c31b.png'}
                </div>
              </div>

              <div className="relative max-w-3xl w-full flex justify-center bg-white rounded-xl shadow-2xl p-2">
                <img
                  src={
                    selectedScanPage === 34
                      ? '/assets/aistudio/image_c4d6dcdd.png'
                      : '/assets/aistudio/image_0de1c31b.png'
                  }
                  alt={`Bản scan trang ${selectedScanPage} Sách Ngữ Pháp Tiếng Anh`}
                  className="w-full h-auto object-contain rounded-lg shadow-sm"
                  loading="lazy"
                />
              </div>

              <div className="text-xs text-slate-400 pt-4 text-center">
                💡 <em>Mẹo: Bạn có thể chuyển qua các tab bên trên để tương tác, luyện tập và làm bài tập chấm điểm cho trang sách này!</em>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
