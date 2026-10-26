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
  ChevronRight,
  Split,
  AlertTriangle,
  Flame,
  Search
} from 'lucide-react';

interface PastContinuousLabProps {
  onOpenPdf?: () => void;
}

export const PastContinuousLab: React.FC<PastContinuousLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<
    'formulas' | 'rules' | 'practice_1' | 'practice_2' | 'spelling_rules' | 'scans'
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
  // TAB 1: INTERACTIVE FORMULA BUILDER STATE
  // ==========================================
  const [builderSubject, setBuilderSubject] = useState<'I' | 'She' | 'They' | 'Tom and Mary' | 'Peter'>('I');
  const [builderPolarity, setBuilderPolarity] = useState<'pos' | 'neg' | 'quest'>('pos');
  const [builderVerbIndex, setBuilderVerbIndex] = useState<number>(0);

  const VERB_OPTIONS = [
    { base: 'work', ing: 'working', vi: 'làm việc', rule: 'Thêm đuôi -ing thông thường' },
    { base: 'play games', ing: 'playing games', vi: 'chơi game', rule: 'Tận cùng y giữ nguyên thêm -ing' },
    { base: 'sit in a restaurant', ing: 'sitting in a restaurant', vi: 'ngồi trong nhà hàng', rule: '1 nguyên âm + 1 phụ âm ➔ gấp đôi t: sitting' },
    { base: 'do homework', ing: 'doing homework', vi: 'làm bài tập về nhà', rule: 'Thêm -ing thông thường' },
    { base: 'drive home from work', ing: 'driving home from work', vi: 'lái xe từ chỗ làm về', rule: 'Tận cùng -e bỏ e thêm -ing: driving' },
    { base: 'cook dinner', ing: 'cooking dinner', vi: 'nấu bữa tối', rule: '2 nguyên âm oo + phụ âm k ➔ chỉ thêm -ing: cooking' },
    { base: 'rain heavily', ing: 'raining heavily', vi: 'mưa to', rule: 'Thêm -ing thông thường' },
    { base: 'watch TV at 7 yesterday', ing: 'watching TV at 7 yesterday', vi: 'xem TV lúc 7h tối hôm qua', rule: 'Thêm -ing thông thường' },
    { base: 'sing in his room', ing: 'singing in his room', vi: 'hát trong phòng', rule: 'Thêm -ing thông thường' }
  ];

  const currentVerb = VERB_OPTIONS[builderVerbIndex];

  // Helper to determine was vs were
  const isSingular = (subj: string) => subj === 'I' || subj === 'She' || subj === 'Peter' || subj === 'He' || subj === 'It';
  const beAux = isSingular(builderSubject) ? 'was' : 'were';
  const beAuxNeg = isSingular(builderSubject) ? "wasn't" : "weren't";

  // Build the sentence dynamically
  let builtEn = '';
  let builtVi = '';
  if (builderPolarity === 'pos') {
    builtEn = `${builderSubject} ${beAux} ${currentVerb.ing}.`;
    builtVi = `${builderSubject === 'I' ? 'Tôi' : builderSubject === 'She' ? 'Cô ấy' : builderSubject === 'They' ? 'Họ' : builderSubject} đã đang ${currentVerb.vi}.`;
  } else if (builderPolarity === 'neg') {
    builtEn = `${builderSubject} ${beAuxNeg} ${currentVerb.ing}.`;
    builtVi = `${builderSubject === 'I' ? 'Tôi' : builderSubject === 'She' ? 'Cô ấy' : builderSubject === 'They' ? 'Họ' : builderSubject} đã không đang ${currentVerb.vi}.`;
  } else {
    builtEn = `${beAux.charAt(0).toUpperCase() + beAux.slice(1)} ${builderSubject} ${currentVerb.ing}?`;
    builtVi = `Có phải ${builderSubject === 'I' ? 'tôi' : builderSubject === 'She' ? 'cô ấy' : builderSubject === 'They' ? 'họ' : builderSubject} đã đang ${currentVerb.vi} không?`;
  }

  // ==========================================
  // TAB 2: 5 GOLDEN RULES & TIMELINE STATE
  // ==========================================
  const [selectedRuleId, setSelectedRuleId] = useState<number>(2); // Default rule 2 (Long vs Short)
  const [timelineInterrupted, setTimelineInterrupted] = useState<boolean>(true);

  // ==========================================
  // TAB 3: PRACTICE 1 (Trang 33 - 10 câu QKTD)
  // ==========================================
  const p1Questions = [
    {
      id: 'p1-1',
      prefix: '1. I',
      prompt: '(play)',
      suffix: 'soccer with my friends at 9 p.m yesterday.',
      validAnswers: ['was playing'],
      hint: 'I đi với was + V-ing',
      explanation: 'Chủ ngữ "I" đi với "was", động từ play thêm -ing ➔ "was playing" (thời điểm cụ thể at 9 p.m yesterday).'
    },
    {
      id: 'p1-2',
      prefix: '2. She',
      prompt: '(not watch)',
      suffix: 'TV at that time last night. She was doing her homework then.',
      validAnswers: ["wasn't watching", 'was not watching'],
      hint: 'She đi với was not / wasn\'t + watching',
      explanation: 'Phủ định với chủ ngữ "She" là "wasn\'t watching" hoặc "was not watching".'
    },
    {
      id: 'p1-3',
      prefix: '3. We',
      prompt: '(sit)',
      suffix: 'in a restaurant when the accident happened.',
      validAnswers: ['were sitting'],
      hint: 'We đi với were; sit gấp đôi t ➔ sitting',
      explanation: 'Chủ ngữ "We" số nhiều đi với "were". Từ "sit" (1 phụ âm - 1 nguyên âm - 1 phụ âm) phải gấp đôi phụ âm cuối ➔ "were sitting".'
    },
    {
      id: 'p1-4',
      prefix: '4. He',
      prompt: '(say)',
      suffix: "that he still can't find a job.",
      validAnswers: ['was saying'],
      hint: 'He đi với was + saying',
      explanation: 'Dùng quá khứ tiếp diễn với động từ "say" để nhấn mạnh những gì đã được nói: "was saying" (Quy tắc 4 Trang 32).'
    },
    {
      id: 'p1-5',
      prefix: '5. They',
      prompt: '(not read)',
      suffix: 'books when I arrived home. Guess what? They were playing games. I was so angry with them.',
      validAnswers: ["weren't reading", 'were not reading'],
      hint: 'They đi với weren\'t / were not + reading',
      explanation: 'Chủ ngữ "They" đi với "weren\'t reading" hoặc "were not reading".'
    },
    {
      id: 'p1-6',
      prefix: "6. Why didn't you answer the phone when I called you? – Oh, sorry. I",
      prompt: '(plant)',
      suffix: 'some flowers in the garden then.',
      validAnswers: ['was planting'],
      hint: 'I đi với was + planting',
      explanation: 'Tại thời điểm "when I called you", người nói đang trồng hoa ➔ "was planting".'
    },
    {
      id: 'p1-7',
      prefix: '7. It',
      prompt: '(rain)',
      suffix: "when you called me, so I couldn't go out with you.",
      validAnswers: ['was raining'],
      hint: 'It đi với was + raining',
      explanation: 'Hành động trời đang mưa kéo dài tại thời điểm gọi ➔ "was raining".'
    },
    {
      id: 'p1-8',
      prefix: '8. When we came to their house, Tom and Mary',
      prompt: '(cook)',
      suffix: 'dinner.',
      validAnswers: ['were cooking'],
      hint: 'Tom and Mary (2 người số nhiều) ➔ were cooking',
      explanation: '"Tom and Mary" là 2 người (số nhiều) ➔ dùng "were cooking".'
    },
    {
      id: 'p1-9',
      prefix: '9. I went to that park very often while I',
      prompt: '(live)',
      suffix: 'in London for my MA course.',
      validAnswers: ['was living'],
      hint: 'while I was living (tạm thời học cao học MA)',
      explanation: 'Sống tạm thời trong thời gian học cao học (MA course) ➔ dùng quá khứ tiếp diễn "was living" (Quy tắc 3 Trang 32).'
    },
    {
      id: 'p1-10',
      prefix: '10. She',
      prompt: '(always ask)',
      suffix: "for help when calling me. I didn't like it very much.",
      validAnswers: ['was always asking'],
      hint: 'was + always + V-ing (phàn nàn)',
      explanation: 'Dùng "always" trong quá khứ tiếp diễn để diễn tả sự việc xảy ra liên tục gây phiền toái hoặc phàn nàn ➔ "was always asking" (Quy tắc 5 Trang 32).'
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
  // TAB 4: PRACTICE 2 (Trang 33 - 10 câu kết hợp QKĐ vs QKTD)
  // ==========================================
  const p2Questions = [
    {
      id: 'p2-1',
      sentence: '1. I _____ (live) in Ho Chi Minh City for three years when I was a child.',
      partCount: 1,
      inputs: [
        { label: 'live', valid: ['lived'], placeholder: 'lived...' }
      ],
      concept: 'Lâu dài vs Tạm thời',
      nature: 'Hành động lâu bền trong thời thơ ấu (when I was a child) ➔ dùng Quá Khứ Đơn "lived" (Quy tắc 3 Trang 32).'
    },
    {
      id: 'p2-2',
      sentence: '2. When she _____ (drive) home from work, she had an amazing idea for her new project.',
      partCount: 1,
      inputs: [
        { label: 'drive', valid: ['was driving'], placeholder: 'was driving...' }
      ],
      concept: 'Hành động Dài (đang diễn ra)',
      nature: 'Đang trên đường lái xe về nhà là hành động dài đang diễn ra ➔ "was driving", thì bất chợt nảy ra ý tưởng (had - ngắn).'
    },
    {
      id: 'p2-3',
      sentence: '3. While we were cooking, the phone _____ (ring).',
      partCount: 1,
      inputs: [
        { label: 'ring', valid: ['rang'], placeholder: 'rang...' }
      ],
      concept: 'Hành động Ngắn (xen vào)',
      nature: 'While we were cooking (đang nấu ăn = dài), chuông điện thoại reo chen ngang (ngắn) ➔ QKĐ của ring là "rang".'
    },
    {
      id: 'p2-4',
      sentence: '4. When we came yesterday, Scott and Andy _____ (paint) their room.',
      partCount: 1,
      inputs: [
        { label: 'paint', valid: ['were painting'], placeholder: 'were painting...' }
      ],
      concept: 'Hành động Dài (đang diễn ra)',
      nature: 'Khi chúng tôi đến (came - ngắn), Scott và Andy đang sơn phòng (hành động dài đang tiếp diễn) ➔ "were painting".'
    },
    {
      id: 'p2-5',
      sentence: '5. The children were frightened when it _____ (get) dark.',
      partCount: 1,
      inputs: [
        { label: 'get', valid: ['got'], placeholder: 'got...' }
      ],
      concept: 'Hành động Ngắn (thời điểm xen vào)',
      nature: 'Khi trời bắt đầu sập tối (got dark - mốc ngắn xen vào) ➔ chia Quá Khứ Đơn "got".'
    },
    {
      id: 'p2-6',
      sentence: '6. She _____ (make) a cake when the light went out. I had to light a candle to finish it.',
      partCount: 1,
      inputs: [
        { label: 'make', valid: ['was making'], placeholder: 'was making...' }
      ],
      concept: 'Hành động Dài (bị gián đoạn)',
      nature: 'Cô ấy đang làm bánh (dài ➔ "was making") thì đèn vụt tắt (went out - ngắn xen vào).'
    },
    {
      id: 'p2-7',
      sentence: '7. He suddenly _____ (realize) he _____ (travel) in the wrong direction.',
      partCount: 2,
      inputs: [
        { label: 'realize', valid: ['realized'], placeholder: 'realized...' },
        { label: 'travel', valid: ['was traveling', 'was travelling'], placeholder: 'was traveling / travelling...' }
      ],
      concept: 'Ngắn (chợt nhận ra) & Dài (đang di chuyển)',
      nature: 'Anh ấy chợt nhận ra (realized - ngắn) rằng mình đã và đang đi lạc hướng (was traveling / was travelling - dài).'
    },
    {
      id: 'p2-8',
      sentence: '8. They _____ (not allow) us to go out in the boat yesterday because a strong wind _____ (blow).',
      partCount: 2,
      inputs: [
        { label: 'not allow', valid: ["didn't allow", 'did not allow'], placeholder: "didn't allow..." },
        { label: 'blow', valid: ['was blowing'], placeholder: 'was blowing...' }
      ],
      concept: 'Ngắn (quyết định cấm) & Dài (gió đang thổi mạnh)',
      nature: 'Họ không cho phép (didn\'t allow - ngắn) vì lúc đó gió bão đang thổi rất mạnh (was blowing - dài).'
    },
    {
      id: 'p2-9',
      sentence: '9. He _____ (listen) to his favorite music when the phone rang. Very unwillingly he _____ (turn) down the sound and _____ (go) to answer it.',
      partCount: 3,
      inputs: [
        { label: 'listen', valid: ['was listening'], placeholder: 'was listening...' },
        { label: 'turn', valid: ['turned'], placeholder: 'turned...' },
        { label: 'go', valid: ['went'], placeholder: 'went...' }
      ],
      concept: 'Dài (đang nghe nhạc) & Chuỗi hành động ngắn kế tiếp',
      nature: 'Đang nghe nhạc (was listening - dài), điện thoại reo ➔ anh ấy vặn nhỏ loa (turned - ngắn) và đi bắt máy (went - ngắn).'
    },
    {
      id: 'p2-10',
      sentence: '10. You looked very busy when I _____ (see) you last night. _____ (what / you / do?)',
      partCount: 2,
      inputs: [
        { label: 'see', valid: ['saw'], placeholder: 'saw...' },
        { label: 'what / you / do', valid: ['what were you doing', 'what were you doing?'], placeholder: 'What were you doing?...' }
      ],
      concept: 'Ngắn (nhìn thấy) & Câu hỏi quá khứ tiếp diễn',
      nature: 'Khi tôi nhìn thấy bạn (saw - ngắn). Bạn đang làm gì thế vào lúc đó? ➔ "What were you doing?".'
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
  const [selectedScanPage, setSelectedScanPage] = useState<32 | 33>(32);
  const [zoomScan, setZoomScan] = useState<boolean>(false);

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
              <span>Chuyên Đề 13 • Trang 32 & 33 Sách Ngữ Pháp Tiếng Anh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              13. Past Continuous (Quá Khứ Tiếp Diễn)
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Diễn tả hành động <span className="font-bold text-white underline decoration-amber-400">đang diễn ra</span> tại một thời điểm xác định trong quá khứ, 
              hoặc hành động đang xảy ra kéo dài (<code className="bg-blue-900/60 px-2 py-0.5 rounded font-mono font-bold text-amber-300">was/were + V-ing</code>) 
              thì có hành động khác xen vào ngắn hơn (<code className="bg-blue-900/60 px-2 py-0.5 rounded font-mono font-bold text-emerald-300">Quá Khứ Đơn</code>)!
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Xem Bản Scan Trang 32-33</span>
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
            <div className="text-blue-200 text-[10px] uppercase font-bold">Số ít (I, He, She, It)</div>
            <div className="font-mono font-extrabold text-white text-sm">was + V-ing</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Số nhiều (You, We, They)</div>
            <div className="font-mono font-extrabold text-white text-sm">were + V-ing</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Dài xen Ngắn</div>
            <div className="font-mono font-bold text-amber-300 text-xs">While QKTD, QKĐ (When)</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="text-blue-200 text-[10px] uppercase font-bold">Tạm thời vs Lâu bền</div>
            <div className="font-mono font-bold text-emerald-300 text-xs">was living vs lived</div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
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
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'rules'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>2. Trục Thời Gian & 5 Quy Tắc Vàng</span>
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
          <span>3. Thực Hành 1: QK Tiếp Diễn ({p1Score}/{p1Questions.length})</span>
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
          <span>4. Thực Hành 2: QKĐ vs QKTD ({p2Score}/14)</span>
        </button>

        <button
          onClick={() => setActiveTab('spelling_rules')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
            activeTab === 'spelling_rules'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>5. Quy Tắc Thêm -ING & Stative Verbs</span>
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
          <span>6. Bản Scan Sách Gốc (Trang 32-33)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FORMULAS & INTERACTIVE SENTENCE BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* Authentic Book Table (Trang 32) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Bảng Cấu Trúc Gốc • Trang 32 Sách Lê Công Đức
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  13. Past Continuous (Quá Khứ Tiếp Diễn)
                </h3>
              </div>
              <button
                onClick={() => speak('I was working. She was doing her homework. They were playing games.')}
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
                    <th className="py-3 px-4 font-extrabold text-blue-700 dark:text-blue-300 w-3/8">
                      S1 (I, You, We, They, Plural - Số nhiều)
                    </th>
                    <th className="py-3 px-4 font-extrabold text-purple-700 dark:text-purple-300 w-3/8">
                      S2 (She, He, It, Singular - Số ít)
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
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
                        I + was + V-ING
                      </div>
                      <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
                        You, We, They + were + V-ING
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>I was working.</em><br />
                        • <em>They were playing games.</em>
                      </div>
                    </td>
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="font-mono font-bold text-purple-700 dark:text-purple-300">
                        S2 + was + V-ING
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>She was doing her homework.</em><br />
                        • <em>Peter was singing in his room.</em>
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
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="text-xs text-rose-600 font-bold">Thêm "not" sau Be:</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        I + was not (wasn't) + V-ING
                      </div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        S1 + were not (weren't) + V-ING
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>They were not working.</em><br />
                        • <em>We were not studying.</em>
                      </div>
                    </td>
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="text-xs text-rose-600 font-bold">Thêm "not" sau Be:</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        S2 + was not (wasn't) + V-ING
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>She wasn't eating her dinner.</em><br />
                        • <em>He was not playing games.</em>
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
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="text-xs text-amber-600 font-bold">Đưa Be ra đầu câu:</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        Was + I + V-ING?
                      </div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        Were + S1 + V-ING?
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>Were you watching TV at 7 yesterday, John?</em>
                      </div>
                    </td>
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="text-xs text-amber-600 font-bold">Đưa Be ra đầu câu:</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        Was + S2 + V-ING?
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 italic pt-1">
                        • <em>Was she studying then?</em><br />
                        ➔ <em>Yes, she was. / No, she wasn't.</em>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Past Continuous Builder */}
          <div className="bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Phòng Lắp Ráp Trực Quan (Interactive Continuous Builder)
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Thử nghiệm phối ghép Chủ Ngữ + WAS/WERE + V-ing
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
                1. Chọn Chủ Ngữ (Subject):
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'I (Tôi - Số ít)', val: 'I' },
                  { label: 'She (Cô ấy - Số ít)', val: 'She' },
                  { label: 'Peter (Số ít)', val: 'Peter' },
                  { label: 'They (Họ - Số nhiều)', val: 'They' },
                  { label: 'Tom and Mary (2 người - Số nhiều)', val: 'Tom and Mary' }
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setBuilderSubject(s.val as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      builderSubject === s.val
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Verb Phrase */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Chọn Động Từ (Verb Phrase):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {VERB_OPTIONS.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBuilderVerbIndex(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      builderVerbIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs">{v.base}</div>
                    <div className="text-[11px] opacity-80">{v.vi}</div>
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
                    <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300">
                      {beAux.charAt(0).toUpperCase() + beAux.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300">
                      {builderSubject}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300">
                      {currentVerb.ing}
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
                      {builderPolarity === 'pos' ? beAux : beAuxNeg}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300">
                      {currentVerb.ing}
                    </span>
                    <span className="text-slate-600">.</span>
                  </>
                )}
              </div>

              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                ➔ Dịch nghĩa: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{builtVi}</span>
              </div>

              {/* Spelling Note for this verb */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Mẹo chính tả thêm đuôi -ing: </strong>
                  {currentVerb.rule} ({currentVerb.base} ➔ <code className="font-bold underline">{currentVerb.ing}</code>).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TIMELINE & 5 GOLDEN USAGE RULES */}
      {/* ========================================================================= */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Nguyên Lý Sách Gốc • Trang 32
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
              5 Cách Sử Dụng Cốt Lõi Của Thì Quá Khứ Tiếp Diễn
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Bấm vào từng quy tắc bên dưới để xem mô hình trực quan, sơ đồ trục thời gian và các cặp câu phân biệt kinh điển.
            </p>

            {/* Rule Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-6">
              {[
                { id: 1, title: '1. Mốc Thời Điểm Cụ Thể', subtitle: 'At 8 o\'clock last night' },
                { id: 2, title: '2. Dài Bị Xen Ngang (Vàng)', subtitle: 'While QKTD, QKĐ' },
                { id: 3, title: '3. Tạm Thời vs Lâu Bền', subtitle: 'Eastbourne vs London' },
                { id: 4, title: '4. Nhấn Mạnh Lời Nói', subtitle: 'John was saying...' },
                { id: 5, title: '5. Phàn Nàn / Bất Ngờ', subtitle: 'Always / Continually' }
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
                  Quy Tắc 1: Diễn tả hành động ĐANG DIỄN RA tại 1 thời điểm cụ thể nào đó trong quá khứ
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Tại thời điểm đó, hành động đã bắt đầu trước đó, đang diễn ra tại mốc đó và chưa kết thúc.
                </p>

                {/* Timeline Visualizer */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">Trục thời gian trực quan:</div>
                  <div className="relative py-6">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
                    
                    {/* Ongoing process bar */}
                    <div className="absolute top-4 left-1/4 w-1/2 h-5 bg-blue-500/30 border-2 border-blue-500 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-blue-800 dark:text-blue-200 animate-pulse">
                      She was talking to a strange man...
                    </div>

                    {/* Specific point pin */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-200 dark:ring-rose-900" />
                      <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 whitespace-nowrap">
                        📍 at 8 o'clock / this time yesterday
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentic Examples */}
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                        "She was talking to a strange man <span className="text-blue-600 font-bold">this time yesterday</span>."
                      </div>
                      <div className="text-xs text-slate-500">
                        (Vào giờ này ngày hôm qua, cô ấy đang nói chuyện với một người đàn ông lạ mặt - Trang 32).
                      </div>
                    </div>
                    <button
                      onClick={() => speak('She was talking to a strange man this time yesterday.')}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                        "What were they doing <span className="text-blue-600 font-bold">at eight o'clock last night</span>?"
                      </div>
                      <div className="text-xs text-slate-500">
                        (Họ đã đang làm gì vào lúc 8 giờ tối hôm qua? - Trang 32).
                      </div>
                    </div>
                    <button
                      onClick={() => speak("What were they doing at eight o'clock last night?")}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RULE 2 DETAIL (THE GOLDEN RULE) */}
            {selectedRuleId === 2 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/40 dark:from-indigo-950/30 dark:to-purple-950/20 border-2 border-indigo-300 dark:border-indigo-800 space-y-5">
                <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-extrabold text-base">
                  <Split className="w-5 h-5 text-indigo-600" />
                  Quy Tắc 2 (Quan trọng nhất): Hành động DÀI Đang Xảy Ra ➔ Bị Hành động NGẮN Xen Vào
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-medium">
                  <strong>Thần chú bất tử Trang 32: </strong>
                  <em>"Hành động nào xảy ra kéo dài hơn thì dùng <span className="font-bold text-indigo-700 dark:text-indigo-300 underline">Quá Khứ Tiếp Diễn</span> (was/were + V-ing). Hành động nào ngắn hơn (xen vào) sử dụng thì <span className="font-bold text-emerald-700 dark:text-emerald-300 underline">Quá Khứ Đơn</span> (V2/ed)."</em>
                </div>

                {/* Animated Interactive Diagram */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Mô Phỏng Trực Quan Thanh Kéo Dài & Mũi Tên Xen Ngang</span>
                    <button
                      onClick={() => setTimelineInterrupted(!timelineInterrupted)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100"
                    >
                      {timelineInterrupted ? 'Đổi: While driving ➔ accident' : 'Đổi: When I came ➔ sleeping'}
                    </button>
                  </div>

                  {timelineInterrupted ? (
                    <div className="space-y-4">
                      {/* Bar 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-indigo-600">Hành động DÀI (Quá Khứ Tiếp Diễn):</span>
                          <span className="text-indigo-600 font-mono">While I was driving home from work...</span>
                        </div>
                        <div className="relative h-10 bg-indigo-100 dark:bg-indigo-950/60 rounded-xl border-2 border-indigo-400 flex items-center px-4 text-xs font-extrabold text-indigo-800 dark:text-indigo-200">
                          🚗 ĐANG LÁI XE TRÊN ĐƯỜNG VỀ NHÀ (Kéo dài liên tục...)
                          
                          {/* Interruption Arrow */}
                          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                            💥 I saw an accident!
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-indigo-400">
                        ➔ Đang lái xe (hành động dài: <strong>was driving</strong>) thì bất ngờ nhìn thấy tai nạn (hành động ngắn chen ngang: <strong>saw</strong>).
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Bar 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-indigo-600">Hành động DÀI (Quá Khứ Tiếp Diễn):</span>
                          <span className="text-indigo-600 font-mono">He was sleeping...</span>
                        </div>
                        <div className="relative h-10 bg-indigo-100 dark:bg-indigo-950/60 rounded-xl border-2 border-indigo-400 flex items-center px-4 text-xs font-extrabold text-indigo-800 dark:text-indigo-200">
                          😴 ANH ẤY ĐANG NGỦ SAY (Kéo dài cả tiếng đồng hồ...)
                          
                          {/* Interruption Arrow */}
                          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                            🚪 When I came yesterday
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-indigo-400">
                        ➔ Anh ấy đang ngủ (dài: <strong>was sleeping</strong>), tôi bước vào nhà (ngắn: <strong>came</strong>).
                      </div>
                    </div>
                  )}

                  {/* 3 Core Examples from Book */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">Ví dụ 1 (Trang 32):</div>
                      <div className="italic text-indigo-600 font-mono mt-1">"When I came yesterday, he was sleeping."</div>
                      <div className="text-[11px] text-slate-500 mt-1">came = QKĐ ngắn; was sleeping = QKTD dài.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">Ví dụ 2 (Trang 32):</div>
                      <div className="italic text-indigo-600 font-mono mt-1">"I saw an accident while I was driving home."</div>
                      <div className="text-[11px] text-slate-500 mt-1">saw = QKĐ ngắn; was driving = QKTD dài.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">Ví dụ 3 (Trang 32):</div>
                      <div className="italic text-indigo-600 font-mono mt-1">"As I was walking down the road, I saw Bill."</div>
                      <div className="text-[11px] text-slate-500 mt-1">was walking = QKTD dài; saw = QKĐ ngắn.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RULE 3 DETAIL: TEMPORARY VS PERMANENT */}
            {selectedRuleId === 3 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-extrabold text-base">
                  <Split className="w-5 h-5 text-emerald-600" />
                  Quy Tắc 3: Tình Huống Tạm Thời (QKTD) vs Tình Huống Lâu Bền (QKĐ)
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Trang 32 chỉ rõ sự khác biệt tinh tế giữa hành động mang tính <strong>tạm thời</strong> (như đi công tác, học khóa ngắn hạn) với hành động <strong>lâu dài, ổn định</strong> (như sinh sống cả tuổi thơ).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Case 1: Temporary */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-300 dark:border-blue-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Tạm Thời ➔ Quá Khứ Tiếp Diễn
                      </span>
                      <button onClick={() => speak('It happened when I was living in Eastbourne last year.')} className="text-blue-600">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-mono text-sm font-bold text-blue-700 dark:text-blue-300">
                      "It happened when I was living in Eastbourne last year."
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      ➔ Diễn đạt việc nhân vật tôi có thể chỉ sống ở Eastbourne trong thời gian công tác hoặc một thời gian ngắn nào đó.
                    </div>
                  </div>

                  {/* Case 2: Permanent */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                        Lâu Bền ➔ Quá Khứ Đơn
                      </span>
                      <button onClick={() => speak('I lived in London for ten years while I was a child.')} className="text-emerald-600">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      "I lived in London for ten years while I was a child."
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      ➔ Diễn đạt một khoảng thời gian khá lâu dài thời thơ ấu nhân vật sinh sống ở London, sau đó chuyển đi nơi khác.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RULE 4 DETAIL */}
            {selectedRuleId === 4 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/40 dark:from-purple-950/30 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-800 space-y-4">
                <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-extrabold text-base">
                  <Volume2 className="w-5 h-5 text-purple-600" />
                  Quy Tắc 4: Đi Với Động Từ "Say" Để Nhấn Mạnh Lời Được Nói
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Thì quá khứ tiếp diễn cũng hay sử dụng với động từ <strong>say</strong> để nhấn mạnh những gì đã được nói:
                </p>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-sm sm:text-base text-purple-700 dark:text-purple-300">
                      "John was saying that he still can't find a job."
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      (John có nói rằng anh ấy vẫn chưa thể tìm được một công việc - Trang 32).
                    </div>
                  </div>
                  <button
                    onClick={() => speak("John was saying that he still can't find a job.")}
                    className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* RULE 5 DETAIL */}
            {selectedRuleId === 5 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 dark:from-amber-950/30 dark:to-orange-950/20 border-2 border-amber-300 dark:border-amber-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-extrabold text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Quy Tắc 5: Đi Với "Always, Continually" Diễn Đạt Ý Phàn Nàn / Bất Ngờ
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Với những từ như: <strong>always, continually</strong> và những từ tương tự thế, thì quá khứ tiếp diễn diễn đạt ý các việc thường xuyên xảy ra và xảy ra rất bất ngờ hoặc theo một cách không theo kế hoạch trước (thường ngụ ý phàn nàn):
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                        "Aunt Lucy was always turning up without warning and bringing us presents."
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        (Dì Lucy lúc nào cũng xuất hiện mà chẳng thông báo chi hết và luôn mang quà cho chúng tôi - Trang 32).
                      </div>
                    </div>
                    <button
                      onClick={() => speak("Aunt Lucy was always turning up without warning and bringing us presents.")}
                      className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                        "I didn't like him – he was continually borrowing money."
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        (Tôi không thích anh ta - Anh lúc nào cũng mượn tiền hết ấy - Trang 32).
                      </div>
                    </div>
                    <button
                      onClick={() => speak("I didn't like him – he was continually borrowing money.")}
                      className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRACTICE 1 (Trang 33 - 10 câu QKTD) */}
      {/* ========================================================================= */}
      {activeTab === 'practice_1' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Thực Hành 1 • Trang 33 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  1. Hoàn thành các câu sau đây với thì Quá Khứ Tiếp Diễn
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
              {p1Questions.map((q, idx) => {
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
                          placeholder="was/were + V-ing..."
                          className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-48"
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
      {/* TAB 4: PRACTICE 2 (Trang 33 - 10 câu kết hợp QKĐ vs QKTD) */}
      {/* ========================================================================= */}
      {activeTab === 'practice_2' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Thực Hành 2 • Trang 33 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  2. Chia động từ trong ngoặc bằng thì Quá Khứ Đơn hoặc Quá Khứ Tiếp Diễn
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Xác định hành động nào DÀI (was/were + V-ing) và hành động nào NGẮN xen vào (V2/ed).
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

                      {/* Input fields for this question */}
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
                                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono border focus:outline-none w-48 ${
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
                            💡 <span className="font-semibold">{q.nature}</span>
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
      {/* TAB 5: SPELLING RULES FOR -ING & STATIVE VERBS */}
      {/* ========================================================================= */}
      {activeTab === 'spelling_rules' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Cẩm Nang Quy Tắc Chính Tả & Động Từ Không Chia Tiếp Diễn
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Bí Kíp Thêm Đuôi -ING Chuẩn Không Cần Chỉnh
            </h3>

            {/* 4 Spelling Rules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 flex items-center justify-center text-xs">1</span>
                  Tận Cùng Bằng "-E" Câm ➔ BỎ "E" RỒI THÊM "-ING"
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div>• drive ➔ <strong className="text-blue-600">driving</strong> (Câu 2 Bài 2 Trang 33)</div>
                  <div>• live ➔ <strong className="text-blue-600">living</strong> (Câu 9 Bài 1 Trang 33)</div>
                  <div>• make ➔ <strong className="text-blue-600">making</strong> (Câu 6 Bài 2 Trang 33)</div>
                  <div>• take ➔ <strong className="text-blue-600">taking</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 flex items-center justify-center text-xs">2</span>
                  1 Nguyên Âm + 1 Phụ Âm ➔ GẤP ĐÔI PHỤ ÂM RỒI THÊM "-ING"
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div>• sit ➔ <strong className="text-purple-600">sitting</strong> (Câu 3 Bài 1 Trang 33)</div>
                  <div>• run ➔ <strong className="text-purple-600">running</strong></div>
                  <div>• swim ➔ <strong className="text-purple-600">swimming</strong></div>
                  <div>• travel ➔ <strong className="text-purple-600">travelling</strong> (UK) / traveling (US)</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 flex items-center justify-center text-xs">3</span>
                  Tận Cùng Bằng "-IE" ➔ ĐỔI THÀNH "-Y" RỒI THÊM "-ING"
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div>• lie (nói dối/nằm) ➔ <strong className="text-emerald-600">lying</strong></div>
                  <div>• die (chết) ➔ <strong className="text-emerald-600">dying</strong></div>
                  <div>• tie (thắt/buộc) ➔ <strong className="text-emerald-600">tying</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 flex items-center justify-center text-xs">4</span>
                  Tận Cùng Bằng "-Y" Hoặc 2 Nguyên Âm ➔ CHỈ THÊM "-ING"
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div>• play ➔ <strong className="text-rose-600">playing</strong> (không đổi y)</div>
                  <div>• cook ➔ <strong className="text-rose-600">cooking</strong> (oo là 2 nguyên âm)</div>
                  <div>• rain ➔ <strong className="text-rose-600">raining</strong> (ai là 2 nguyên âm)</div>
                  <div>• study ➔ <strong className="text-rose-600">studying</strong></div>
                </div>
              </div>
            </div>

            {/* Stative Verbs Warning Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 border-2 border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-extrabold text-sm uppercase">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Cực Kỳ Lưu Ý: Các Động Từ Trạng Thái KHÔNG Chia Thì Tiếp Diễn
              </div>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                Các động từ chỉ nhận thức, cảm xúc, sở hữu (như <em>know, realize, understand, like, love, hate, want, belong to...</em>) 
                khi xảy ra trong quá khứ <strong>chỉ chia thì Quá Khứ Đơn</strong>, không chia tiếp diễn!
              </p>
              <div className="font-mono text-xs p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900 space-y-1">
                <div>❌ Sai: <em>He was suddenly realizing he was traveling in the wrong direction.</em></div>
                <div>✔️ Đúng: <strong>He suddenly realized he was traveling in the wrong direction.</strong> (Câu 7 Bài 2 Trang 33)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: AUTHENTIC SCANS (Trang 32 & 33) */}
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
                  Trang 32 & 33 - Sách Ngữ Pháp Tiếng Anh (Lê Công Đức)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đối chiếu nguyên vẹn lý thuyết Quá Khứ Tiếp Diễn và 2 bài tập thực hành.
                </p>
              </div>

              {/* Page Switcher */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedScanPage(32)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedScanPage === 32 ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 32 (Lý thuyết)
                </button>
                <button
                  onClick={() => setSelectedScanPage(33)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedScanPage === 33 ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 33 (Thực hành 1 & 2)
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
                  {selectedScanPage === 32 ? 'Tập tin ảnh gốc: image_e39ee64a.png' : 'Tập tin ảnh gốc: image_6845b15f.png'}
                </div>
              </div>

              <div className="relative max-w-3xl w-full flex justify-center bg-white rounded-xl shadow-2xl p-2">
                <img
                  src={
                    selectedScanPage === 32
                      ? '/assets/aistudio/image_e39ee64a.png'
                      : '/assets/aistudio/image_6845b15f.png'
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
