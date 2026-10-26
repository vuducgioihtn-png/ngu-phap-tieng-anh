import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  HelpCircle,
  Eye,
  Info,
  Layers,
  Award,
  Calendar,
  Zap,
  Check
} from 'lucide-react';

interface PresentPerfectLabProps {
  onOpenPdf?: () => void;
}

export const PresentPerfectLab: React.FC<PresentPerfectLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'signals' | 'usecases' | 'practice1' | 'practice2' | 'practice3_4' | 'scans'>('formulas');

  // Speech TTS helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // State for Formula Builder
  const [subjectGroup, setSubjectGroup] = useState<'S1' | 'S2'>('S1'); // S1: I/You/We/They/Plural, S2: She/He/It/Singular
  const [sentenceForm, setSentenceForm] = useState<'pos' | 'neg' | 'ques'>('pos');
  const [isContracted, setIsContracted] = useState(true);
  const [selectedVerbKey, setSelectedVerbKey] = useState<'finish' | 'do' | 'see' | 'eat' | 'meet'>('finish');

  const verbOptions: Record<string, { base: string; v2: string; v3: string; vi: string; object: string }> = {
    finish: { base: 'finish', v2: 'finished', v3: 'finished', vi: 'hoàn thành', object: 'the homework' },
    do: { base: 'do', v2: 'did', v3: 'done', vi: 'làm / thực hiện', object: 'the project' },
    see: { base: 'see', v2: 'saw', v3: 'seen', vi: 'xem / thấy', object: 'this movie before' },
    eat: { base: 'eat', v2: 'ate', v3: 'eaten', vi: 'ăn', object: 'this kind of food' },
    meet: { base: 'meet', v2: 'met', v3: 'met', vi: 'gặp gỡ', object: 'John since 2001' }
  };

  // State for Since vs For Interactive Timeline Explorer
  const [timelineMode, setTimelineMode] = useState<'since' | 'for'>('since');
  const [selectedSignalKeyword, setSelectedSignalKeyword] = useState<string>('just');

  // State for Practice 1 (10 fill-in-the-blank questions - Page 25)
  const [p1Answers, setP1Answers] = useState<{ [key: number]: string }>({});
  const [p1Feedback, setP1Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP1Solution, setShowP1Solution] = useState<{ [key: number]: boolean }>({});

  // State for Practice 2 (5 since/for questions - Page 25)
  const [p2Answers, setP2Answers] = useState<{ [key: number]: string }>({});
  const [p2Feedback, setP2Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP2Solution, setShowP2Solution] = useState<{ [key: number]: boolean }>({});

  // State for Practice 3 & 4 (10 questions: First time & Superlative - Page 25)
  const [p3Answers, setP3Answers] = useState<{ [key: number]: string }>({});
  const [p3Feedback, setP3Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP3Solution, setShowP3Solution] = useState<{ [key: number]: boolean }>({});

  // State for Book Scans tab
  const [selectedScanPage, setSelectedScanPage] = useState<24 | 25>(24);

  // Normalizer helper for answer comparison
  const normalize = (val: string) => {
    return (val || '')
      .toLowerCase()
      .trim()
      .replace(/[’‘`]/g, "'")
      .replace(/\s+/g, ' ');
  };

  // Practice 1 Data (Trang 25 - Bài 1)
  const p1Questions = [
    {
      id: 1,
      prefix: 'I',
      blankPrompt: '(not see)',
      suffix: 'her since last month.',
      validAnswers: ["haven't seen", 'have not seen', "'ve not seen"],
      hint: 'Chủ ngữ I + have not / haven\'t + V3 của see (seen)',
      explanation: 'Chủ ngữ là "I" (thuộc nhóm S1) dùng trợ từ "have". Thể phủ định: "haven\'t seen" hoặc "have not seen". Dấu hiệu "since last month" (từ tháng trước).'
    },
    {
      id: 2,
      prefix: 'They',
      blankPrompt: '(be)',
      suffix: 'married for 4 years.',
      validAnswers: ['have been', "'ve been"],
      hint: 'Chủ ngữ They + have + V3 của be (been)',
      explanation: 'Chủ ngữ "They" (S1) dùng "have". Động từ "be" chuyển thành V3 là "been" ➔ "have been married" (đã kết hôn được 4 năm).'
    },
    {
      id: 3,
      prefix: 'She',
      blankPrompt: '(lose)',
      suffix: 'her pen. Can you lend her yours?',
      validAnswers: ['has lost', "'s lost"],
      hint: 'Chủ ngữ She (S2) + has + V3 của lose (lost)',
      explanation: 'Chủ ngữ "She" (S2) đi với "has". V3 của "lose" là "lost" ➔ "has lost her pen" (vừa đánh mất bút, kết quả ở hiện tại là cần mượn bút).'
    },
    {
      id: 4,
      prefix: '',
      blankPrompt: '(you / come)',
      suffix: "here before? I've been here four times.",
      validAnswers: ['have you come', 'have you been', 'have you came'],
      hint: 'Câu hỏi với you: Have you + V3 của come (come)?',
      explanation: 'Câu hỏi nghi vấn đưa "Have" ra đầu câu trước chủ từ "you", V3 của "come" vẫn là "come" ➔ "Have you come here before?"'
    },
    {
      id: 5,
      prefix: 'He',
      blankPrompt: '(not play)',
      suffix: 'badminton for five years.',
      validAnswers: ["hasn't played", 'has not played', "'s not played"],
      hint: 'Chủ ngữ He (S2) + has not / hasn\'t + V3/ed (played)',
      explanation: 'Chủ ngữ "He" (S2) dùng "has not" / "hasn\'t". Play là động từ có quy tắc thêm "ed" ➔ "hasn\'t played". Dấu hiệu "for five years" (khoảng thời gian 5 năm).'
    },
    {
      id: 6,
      prefix: '',
      blankPrompt: '(you / decide)',
      suffix: "which one to buy yet? – No, I haven't.",
      validAnswers: ['have you decided'],
      hint: 'Câu hỏi với yet: Have you + V3/ed của decide (decided)?',
      explanation: 'Câu hỏi kết thúc bằng "yet", đưa "Have" lên đầu câu + S (you) + V-ed (decided) ➔ "Have you decided which one to buy yet?".'
    },
    {
      id: 7,
      prefix: 'We',
      blankPrompt: '(buy)',
      suffix: 'this car since last week.',
      validAnswers: ['have bought', "'ve bought"],
      hint: 'Chủ ngữ We (S1) + have + V3 của buy (bought)',
      explanation: 'Chủ ngữ "We" (S1) đi với "have". V3 của "buy" là "bought" ➔ "have bought this car since last week".'
    },
    {
      id: 8,
      prefix: 'John',
      blankPrompt: '(spend)',
      suffix: 'his money already.',
      validAnswers: ['has spent', "'s spent"],
      hint: 'John (S2 số ít) + has + V3 của spend (spent)',
      explanation: 'John là ngôi thứ ba số ít (S2) nên dùng "has". V3 của "spend" là "spent" ➔ "has spent his money already".'
    },
    {
      id: 9,
      prefix: '',
      blankPrompt: '(Mary and Jane / be)',
      suffix: 'to India yet?',
      validAnswers: ['have mary and jane been', 'have mary & jane been'],
      hint: 'Mary and Jane (2 người = số nhiều S1) ➔ Have Mary and Jane been...?',
      explanation: 'Mary and Jane là chủ ngữ số nhiều (2 người), câu hỏi dùng "Have" + Mary and Jane + V3 của be là "been" ➔ "Have Mary and Jane been to India yet?".'
    },
    {
      id: 10,
      prefix: 'Is Mary home? – Oh, she',
      blankPrompt: '(just leave)',
      suffix: '.',
      validAnswers: ['has just left', "'s just left"],
      hint: 'She (S2) + has + trạng từ just + V3 của leave (left)',
      explanation: 'Trạng từ "just" (vừa mới) đứng giữa trợ từ "has" và động từ V3 "left" ➔ "has just left" (Cô ấy vừa mới rời đi).'
    }
  ];

  // Practice 2 Data (Trang 25 - Bài 2: Since vs For)
  const p2Questions = [
    {
      id: 1,
      prefix: "I haven't played tennis",
      blankPrompt: 'since / for',
      suffix: 'last summer.',
      validAnswers: ['since'],
      hint: '"last summer" (mùa hè năm ngoái) là MỐC thời gian cụ thể',
      explanation: '"last summer" là mốc thời gian xác định trong quá khứ ➔ dùng "since" (since last summer = kể từ mùa hè năm ngoái).'
    },
    {
      id: 2,
      prefix: "We haven't met John",
      blankPrompt: 'since / for',
      suffix: 'a long time.',
      validAnswers: ['for'],
      hint: '"a long time" (một thời gian dài) là KHOẢNG thời gian',
      explanation: '"a long time" là khoảng thời gian kéo dài (duration) ➔ dùng "for" (for a long time = đã lâu lắm rồi).'
    },
    {
      id: 3,
      prefix: "He's known her",
      blankPrompt: 'since / for',
      suffix: 'over ten years.',
      validAnswers: ['for'],
      hint: '"over ten years" (hơn mười năm) là KHOẢNG thời gian',
      explanation: '"over ten years" là khoảng độ dài thời gian 10 năm ➔ dùng "for" (for over ten years = hơn 10 năm qua).'
    },
    {
      id: 4,
      prefix: 'Jill has been a good friend',
      blankPrompt: 'since / for',
      suffix: 'we were at school together.',
      validAnswers: ['since'],
      hint: '"we were at school together" là MỆNH ĐỀ MỐC THỜI GIAN',
      explanation: 'Sau "since" có thể là một mệnh đề chỉ mốc thời gian quá khứ (since + S + V2/ed) ➔ "since we were at school together".'
    },
    {
      id: 5,
      prefix: 'Have you seen Harry',
      blankPrompt: 'since / for',
      suffix: 'the party last week?',
      validAnswers: ['since'],
      hint: '"the party last week" (bữa tiệc tuần trước) là MỐC sự kiện',
      explanation: '"the party last week" là mốc thời điểm diễn ra sự kiện trong quá khứ ➔ dùng "since" (since the party last week).'
    }
  ];

  // Practice 3 & 4 Data (Trang 25 - Bài 3 & 4: First Time & Superlatives)
  const p3Questions = [
    // Bài 3: The first/second... time
    {
      id: 1,
      section: 'Bài 3: Cấu trúc số lần (This is the first / second / third... time)',
      prefix: 'This is the first time that (I / met)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'a famous person.',
      validAnswers: ['i have met', "i've met", 'have met'],
      hint: 'that I have met / I\'ve met (V3 của meet là met)',
      explanation: 'Cấu trúc: This is the first time (that) + S + have/has + V3 ➔ "I have met" (hoặc "I\'ve met").'
    },
    {
      id: 2,
      section: 'Bài 3: Cấu trúc số lần (This is the first / second / third... time)',
      prefix: 'This is the third time (she / eat)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'pizza.',
      validAnswers: ['she has eaten', "she's eaten", 'has eaten'],
      hint: 'she has eaten / she\'s eaten (V3 của eat là eaten)',
      explanation: 'Cấu trúc lần thứ 3 (third time), chủ ngữ "she" đi với "has" + V3 "eaten" ➔ "she has eaten pizza".'
    },
    {
      id: 3,
      section: 'Bài 3: Cấu trúc số lần (This is the first / second / third... time)',
      prefix: 'It is the fifteen time that (they / beat)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'Everton.',
      validAnswers: ['they have beaten', "they've beaten", 'have beaten'],
      hint: 'they have beaten / they\'ve beaten (V3 của beat là beaten)',
      explanation: 'Cấu trúc số lần, chủ ngữ "they" đi với "have", V3 của beat là beaten ➔ "they have beaten Everton".'
    },
    {
      id: 4,
      section: 'Bài 3: Cấu trúc số lần (This is the first / second / third... time)',
      prefix: 'This is the second time that (he / be)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'to the US.',
      validAnswers: ['he has been', "he's been", 'has been'],
      hint: 'he has been / he\'s been (V3 của be là been)',
      explanation: 'Cấu trúc lần thứ hai (second time), chủ ngữ "he" đi với "has" + V3 "been" ➔ "he has been to the US".'
    },
    {
      id: 5,
      section: 'Bài 3: Cấu trúc số lần (This is the first / second / third... time)',
      prefix: 'This is the first time (we / win)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'the lottery.',
      validAnswers: ['we have won', "we've won", 'have won'],
      hint: 'we have won / we\'ve won (V3 của win là won)',
      explanation: 'Cấu trúc lần đầu tiên (first time), chủ ngữ "we" đi với "have", V3 của win là won ➔ "we have won the lottery".'
    },

    // Bài 4: So sánh nhất + ever
    {
      id: 6,
      section: 'Bài 4: Dùng sau so sánh nhất + ever (Trải nghiệm từ trước đến nay)',
      prefix: 'This is one of the best beers (I / ever drink)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: '.',
      validAnswers: ['i have ever drunk', "i've ever drunk", 'have ever drunk'],
      hint: 'I have ever drunk / I\'ve ever drunk (V3 của drink là drunk)',
      explanation: 'Sau tính từ so sánh nhất "the best beers", dùng "I have ever drunk" (đây là một trong những loại bia ngon nhất tôi từng uống).'
    },
    {
      id: 7,
      section: 'Bài 4: Dùng sau so sánh nhất + ever (Trải nghiệm từ trước đến nay)',
      prefix: 'This is the prettiest girl (they / ever see)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: '.',
      validAnswers: ['they have ever seen', "they've ever seen", 'have ever seen'],
      hint: 'they have ever seen / they\'ve ever seen (V3 của see là seen)',
      explanation: 'Sau so sánh nhất "the prettiest girl", dùng "they have ever seen" (cô gái xinh xắn nhất họ từng thấy).'
    },
    {
      id: 8,
      section: 'Bài 4: Dùng sau so sánh nhất + ever (Trải nghiệm từ trước đến nay)',
      prefix: 'This is the happiest moment (we / ever experience)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: '.',
      validAnswers: ['we have ever experienced', "we've ever experienced", 'have ever experienced'],
      hint: 'we have ever experienced / we\'ve ever experienced (V-ed)',
      explanation: 'Sau so sánh nhất "the happiest moment", động từ experience thêm -d ➔ "we have ever experienced".'
    },
    {
      id: 9,
      section: 'Bài 4: Dùng sau so sánh nhất + ever (Trải nghiệm từ trước đến nay)',
      prefix: 'This is the hottest country (she / ever live in)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: '.',
      validAnswers: ['she has ever lived in', "she's ever lived in", 'has ever lived in'],
      hint: 'she has ever lived in / she\'s ever lived in (she đi với has)',
      explanation: 'Sau so sánh nhất "the hottest country", chủ ngữ "she" đi với "has" ➔ "she has ever lived in" (quốc gia nóng nhất cô ấy từng sinh sống).'
    },
    {
      id: 10,
      section: 'Bài 4: Dùng sau so sánh nhất + ever (Trải nghiệm từ trước đến nay)',
      prefix: 'This is one of the best restaurants (he / ever be)',
      blankPrompt: 'chia thì hiện tại hoàn thành',
      suffix: 'to.',
      validAnswers: ['he has ever been', "he's ever been", 'has ever been'],
      hint: 'he has ever been / he\'s ever been (he đi với has + been)',
      explanation: 'Sau cụm so sánh "one of the best restaurants", chủ ngữ "he" đi với "has" + V3 "been" ➔ "he has ever been to".'
    }
  ];

  // Scoring helpers
  const handleCheckP1 = (id: number) => {
    const userVal = normalize(p1Answers[id] || '');
    const q = p1Questions.find(item => item.id === id);
    if (!q) return;
    const isCorrect = q.validAnswers.some(ans => normalize(ans) === userVal);
    setP1Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP1Solution(prev => ({ ...prev, [id]: true }));
  };

  const handleCheckP2 = (id: number) => {
    const userVal = normalize(p2Answers[id] || '');
    const q = p2Questions.find(item => item.id === id);
    if (!q) return;
    const isCorrect = q.validAnswers.some(ans => normalize(ans) === userVal);
    setP2Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP2Solution(prev => ({ ...prev, [id]: true }));
  };

  const handleCheckP3 = (id: number) => {
    const userVal = normalize(p3Answers[id] || '');
    const q = p3Questions.find(item => item.id === id);
    if (!q) return;
    const isCorrect = q.validAnswers.some(ans => normalize(ans) === userVal);
    setP3Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP3Solution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllP1 = () => {
    const fb: { [key: number]: boolean } = {};
    const sol: { [key: number]: boolean } = {};
    p1Questions.forEach(q => {
      const userVal = normalize(p1Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some(ans => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP1Feedback(fb);
    setShowP1Solution(sol);
  };

  const checkAllP2 = () => {
    const fb: { [key: number]: boolean } = {};
    const sol: { [key: number]: boolean } = {};
    p2Questions.forEach(q => {
      const userVal = normalize(p2Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some(ans => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP2Feedback(fb);
    setShowP2Solution(sol);
  };

  const checkAllP3 = () => {
    const fb: { [key: number]: boolean } = {};
    const sol: { [key: number]: boolean } = {};
    p3Questions.forEach(q => {
      const userVal = normalize(p3Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some(ans => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP3Feedback(fb);
    setShowP3Solution(sol);
  };

  const resetP1 = () => {
    setP1Answers({});
    setP1Feedback({});
    setShowP1Solution({});
  };

  const resetP2 = () => {
    setP2Answers({});
    setP2Feedback({});
    setShowP2Solution({});
  };

  const resetP3 = () => {
    setP3Answers({});
    setP3Feedback({});
    setShowP3Solution({});
  };

  const p1Score = Object.values(p1Feedback).filter(Boolean).length;
  const p2Score = Object.values(p2Feedback).filter(Boolean).length;
  const p3Score = Object.values(p3Feedback).filter(Boolean).length;

  // Signal words details
  const signalKeywords: Record<string, { meaning: string; position: string; en: string; vi: string; note: string }> = {
    just: {
      meaning: 'Vừa mới',
      position: 'Đứng giữa have/has và V3/ed',
      en: 'They have just finished their homework.',
      vi: 'Họ vừa mới hoàn thành bài tập về nhà xong.',
      note: 'Dùng trong câu khẳng định, diễn tả hành động vừa xảy ra cách đây ít phút.'
    },
    already: {
      meaning: 'Đã... rồi (sớm hơn dự kiến)',
      position: 'Đứng giữa have/has và V3/ed, hoặc đứng cuối câu',
      en: "She's already been to Paris.",
      vi: 'Cô ấy đã từng đến Paris rồi.',
      note: 'Nhấn mạnh sự việc đã hoàn thành xong xuôi.'
    },
    yet: {
      meaning: 'Chưa / ...xong chưa?',
      position: 'Đứng CUỐI câu phủ định (-) và câu hỏi (?)',
      en: "Tom hasn't had dinner yet. / Have you finished yet?",
      vi: 'Tom vẫn chưa ăn tối. / Bạn đã làm xong chưa?',
      note: 'Không dùng yet trong câu khẳng định! Luôn đi với not hoặc câu hỏi.'
    },
    ever: {
      meaning: 'Đã từng (bao giờ chưa)',
      position: 'Đứng trước V3/ed (trong câu hỏi hoặc so sánh nhất)',
      en: "I've ever been to Egypt. / Have you ever seen a ghost?",
      vi: 'Tôi đã từng đến Ai Cập. / Bạn đã từng thấy ma bao giờ chưa?',
      note: 'Hỏi hoặc kể về trải nghiệm cuộc đời tính từ trước tới nay.'
    },
    never: {
      meaning: 'Chưa bao giờ',
      position: 'Đứng giữa have/has và V3/ed',
      en: 'He has never been to Vietnam.',
      vi: 'Anh ấy chưa bao giờ đến Việt Nam.',
      note: 'Bản thân "never" đã mang nghĩa phủ định, không dùng thêm not.'
    },
    recently: {
      meaning: 'Dạo gần đây, gần đây',
      position: 'Thường đứng cuối câu hoặc đầu câu',
      en: 'The firm has lost money recently.',
      vi: 'Công ty dạo gần đây đã bị thua lỗ tiền bạc.',
      note: 'Có thể thay thế bằng "lately".'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-emerald-100 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyên Đề 10 • Trang 24 - 25 Sách Ngữ Pháp Tiếng Anh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              10. Present Perfect (Hiện Tại Hoàn Thành)
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Khám phá cấu trúc <code className="bg-emerald-900/60 px-2 py-0.5 rounded font-mono font-bold text-amber-300">have / has + V3/ed</code>, 
              thần chú phân biệt <span className="font-bold text-white underline decoration-amber-400">SINCE (Mốc)</span> vs <span className="font-bold text-white underline decoration-amber-400">FOR (Khoảng)</span>, 
              4 tình huống kinh điển và hệ thống 25 câu thực hành bám sát 100% sách gốc Lê Công Đức!
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Xem Bản Scan Trang 24-25</span>
            </button>
            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all border border-emerald-400/30 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Mở Sách PDF Gốc</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick summary strip */}
        <div className="mt-6 pt-4 border-t border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">Chủ ngữ S1 (Nhiều)</span>
            <span className="font-bold text-amber-300 text-sm">have + V3/ed</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">Chủ ngữ S2 (Ít)</span>
            <span className="font-bold text-amber-300 text-sm">has + V3/ed</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">Thần chú Since</span>
            <span className="font-bold text-white text-sm">SINCE + Mốc thời gian</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">Thần chú For</span>
            <span className="font-bold text-white text-sm">FOR + Khoảng thời gian</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'formulas'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Công Thức S1 & S2</span>
        </button>

        <button
          onClick={() => setActiveTab('signals')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'signals'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Dấu Hiệu & Since vs For</span>
        </button>

        <button
          onClick={() => setActiveTab('usecases')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'usecases'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. 4 Cách Dùng Kinh Điển</span>
        </button>

        <button
          onClick={() => setActiveTab('practice1')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice1'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>4. Thực Hành 1 (10 câu chia V)</span>
          {p1Score > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">{p1Score}/10</span>}
        </button>

        <button
          onClick={() => setActiveTab('practice2')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice2'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>5. Thực Hành 2 (Since / For)</span>
          {p2Score > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">{p2Score}/5</span>}
        </button>

        <button
          onClick={() => setActiveTab('practice3_4')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice3_4'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>6. Thực Hành 3 & 4 (Lần thứ N & So Sánh)</span>
          {p3Score > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">{p3Score}/10</span>}
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'scans'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>7. Bản Scan Sách Gốc</span>
        </button>
      </div>

      {/* TAB 1: FORMULAS EXPLORER */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* S1 vs S2 Matrix Table from Page 24 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  Bảng Đối Chiếu Cấu Trúc S1 vs S2 (Trang 24)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phân biệt rõ ràng nhóm chủ ngữ đi với trợ từ <span className="font-bold text-emerald-600 dark:text-emerald-400">have</span> và <span className="font-bold text-indigo-600 dark:text-indigo-400">has</span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Thể câu</th>
                    <th className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-300">
                      S1 (I, You, We, They, Danh từ số nhiều)
                    </th>
                    <th className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">
                      S2 (He, She, It, Danh từ số ít)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs mr-2">(+) Khẳng định</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">S1 + have + V3/ED</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • I have done my homework.<br />
                        • They've met each other before.
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">S2 + has + V3/ED</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • She's finished her homework.<br />
                        • Peter's met John since 2001.
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-xs mr-2">(-) Phủ định</span>
                      <span className="block text-[11px] text-slate-400 font-normal">Thêm not sau have/has</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-rose-600 dark:text-rose-400">S1 + have not (haven't) + V3/ED</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • They haven't finished that work yet.<br />
                        • We haven't seen this movie before.
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-rose-600 dark:text-rose-400">S2 + has not (hasn't) + V3/ED</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • She has not eaten her dinner yet.<br />
                        • He hasn't come home yet.
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs mr-2">(?) Nghi vấn</span>
                      <span className="block text-[11px] text-slate-400 font-normal">Đưa Have/Has ra đầu</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Have + S1 + V3/ED ?</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • Have you watched this movie yet?
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Has + S2 + V3/ED ?</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • Has he eaten this kind of food?
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Formula Sandbox */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Phòng Thí Nghiệm Lắp Ghép Cấu Trúc Động (Interactive Formula Builder)
                </span>
                <h4 className="text-xl font-extrabold text-white">Thử nghiệm ghép câu & dạng viết tắt</h4>
              </div>

              {/* Form switch */}
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setSentenceForm('pos')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sentenceForm === 'pos' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  (+) Khẳng định
                </button>
                <button
                  onClick={() => setSentenceForm('neg')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sentenceForm === 'neg' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  (-) Phủ định
                </button>
                <button
                  onClick={() => setSentenceForm('ques')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sentenceForm === 'ques' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  (?) Nghi vấn
                </button>
              </div>
            </div>

            {/* Selection Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Subject Group */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">1. Chọn Nhóm Chủ Từ (Subject):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSubjectGroup('S1')}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      subjectGroup === 'S1'
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold'
                        : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-white">Nhóm S1</div>
                    <div className="text-[11px]">I, You, We, They, N nhiều</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">➔ Trợ từ HAVE</div>
                  </button>

                  <button
                    onClick={() => setSubjectGroup('S2')}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      subjectGroup === 'S2'
                        ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 font-bold'
                        : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-white">Nhóm S2</div>
                    <div className="text-[11px]">He, She, It, N số ít</div>
                    <div className="text-[10px] text-indigo-400 font-mono mt-1">➔ Trợ từ HAS</div>
                  </button>
                </div>
              </div>

              {/* Verb Selection */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">2. Chọn Động Từ V1 ➔ V3:</label>
                <div className="space-y-1.5">
                  <select
                    value={selectedVerbKey}
                    onChange={(e) => setSelectedVerbKey(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="finish">finish ➔ finished (có quy tắc -ed)</option>
                    <option value="do">do ➔ done (bất quy tắc)</option>
                    <option value="see">see ➔ seen (bất quy tắc)</option>
                    <option value="eat">eat ➔ eaten (bất quy tắc)</option>
                    <option value="meet">meet ➔ met (bất quy tắc)</option>
                  </select>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
                    <span>V1: <strong className="text-white">{verbOptions[selectedVerbKey].base}</strong></span>
                    <span>V2: <strong className="text-white">{verbOptions[selectedVerbKey].v2}</strong></span>
                    <span>V3: <strong className="text-amber-400">{verbOptions[selectedVerbKey].v3}</strong></span>
                  </div>
                </div>
              </div>

              {/* Contraction switch */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">3. Dạng Rút Gọn (Short form):</label>
                <button
                  onClick={() => setIsContracted(!isContracted)}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    isContracted
                      ? 'border-emerald-500 bg-emerald-900/40 text-emerald-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{isContracted ? "Đang bật: 've / 's / haven't" : 'Đang tắt: have / has not'}</span>
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px]">Đổi</span>
                </button>
                <p className="text-[11px] text-slate-400 mt-1">
                  Trang 24: <em>They've met</em>, <em>She's finished</em>, <em>haven't</em>, <em>hasn't</em>
                </p>
              </div>
            </div>

            {/* Live Result Card */}
            {(() => {
              const subj = subjectGroup === 'S1' ? 'They' : 'She';
              const verbInfo = verbOptions[selectedVerbKey];

              let resultSentence = '';
              let vietnamese = '';

              if (sentenceForm === 'pos') {
                if (subjectGroup === 'S1') {
                  const aux = isContracted ? "'ve" : 'have';
                  resultSentence = `${isContracted ? 'They' : 'They '}${aux} ${verbInfo.v3} ${verbInfo.object}.`;
                } else {
                  const aux = isContracted ? "'s" : 'has';
                  resultSentence = `${isContracted ? 'She' : 'She '}${aux} ${verbInfo.v3} ${verbInfo.object}.`;
                }
                vietnamese = `${subjectGroup === 'S1' ? 'Họ' : 'Cô ấy'} đã ${verbInfo.vi} ${verbInfo.object}.`;
              } else if (sentenceForm === 'neg') {
                if (subjectGroup === 'S1') {
                  const aux = isContracted ? "haven't" : 'have not';
                  resultSentence = `They ${aux} ${verbInfo.v3} ${verbInfo.object} yet.`;
                } else {
                  const aux = isContracted ? "hasn't" : 'has not';
                  resultSentence = `She ${aux} ${verbInfo.v3} ${verbInfo.object} yet.`;
                }
                vietnamese = `${subjectGroup === 'S1' ? 'Họ' : 'Cô ấy'} vẫn chưa ${verbInfo.vi} ${verbInfo.object}.`;
              } else {
                if (subjectGroup === 'S1') {
                  resultSentence = `Have you ${verbInfo.v3} ${verbInfo.object} yet?`;
                } else {
                  resultSentence = `Has ${subj.toLowerCase()} ${verbInfo.v3} ${verbInfo.object}?`;
                }
                vietnamese = `Bạn / ${subj === 'They' ? 'họ' : 'cô ấy'} đã ${verbInfo.vi} ${verbInfo.object} chưa?`;
              }

              return (
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                      Câu Hoàn Chỉnh Trực Quan:
                    </span>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white tracking-wide">
                      {resultSentence}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      ➔ {vietnamese}
                    </div>
                  </div>

                  <button
                    onClick={() => speak(resultSentence)}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start sm:self-auto"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Phát âm (Audio)</span>
                  </button>
                </div>
              );
            })()}

            {/* Golden note about 's distinction */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Mẹo tránh bẫy dấu nháy <code>'s</code>:</strong> 
                <span className="text-slate-300"> <code>She's finished</code> là viết tắt của <code>She has finished</code> (sau đó là V3), 
                khác hoàn toàn với <code>She's a teacher</code> (viết tắt của <code>She is</code>). Nhìn từ đứng sau để biết là <em>is</em> hay <em>has</em>!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIGNALS & SINCE VS FOR */}
      {activeTab === 'signals' && (
        <div className="space-y-6">
          {/* Golden Mnemonic: Since Mốc vs For Khoảng */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Thần Chú Kinh Điển Trang 24
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Phân Biệt Cực Chuẩn: SINCE (Mốc) vs FOR (Khoảng)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Hai giới từ xuất hiện liên tục trong bài thi và giao tiếp thực tế. Chỉ cần nhớ quy tắc 1 dòng:
              </p>
            </div>

            {/* Visual Timeline Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* SINCE CARD */}
              <div 
                onClick={() => setTimelineMode('since')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  timelineMode === 'since'
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                      S
                    </span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">SINCE + Point of time</h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Đi với MỐC THỜI GIAN</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold">
                    Khởi điểm
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Hành động bắt đầu từ một thời điểm xác định trong quá khứ và kéo dài tới hiện tại.
                </p>

                {/* Example pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-semibold">since 1999</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-semibold">since last month</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-semibold">since last week</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-semibold">since I was at college</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-semibold">since yesterday</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                    <span>"I have met John since 1999."</span>
                    <button onClick={(e) => { e.stopPropagation(); speak('I have met John since 1999.'); }} className="text-emerald-600 hover:text-emerald-700">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">➔ Tôi đã quen John từ năm 1999 (Trang 24).</div>
                </div>
              </div>

              {/* FOR CARD */}
              <div 
                onClick={() => setTimelineMode('for')}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  timelineMode === 'for'
                    ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                      F
                    </span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">FOR + Period of time</h4>
                      <p className="text-xs text-indigo-700 dark:text-indigo-400 font-bold">Đi với KHOẢNG THỜI GIAN</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-bold">
                    Độ dài thời lượng
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Đo lường thời gian hành động đã diễn ra được bao lâu (có số đếm: 2 năm, 5 ngày, hoặc a long time).
                </p>

                {/* Example pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 font-semibold">for 2 years</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 font-semibold">for 4 years</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 font-semibold">for five years</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 font-semibold">for a long time</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 font-semibold">for over ten years</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                    <span>"I have lived in Rach Gia City for 2 years."</span>
                    <button onClick={(e) => { e.stopPropagation(); speak('I have lived in Rach Gia City for 2 years.'); }} className="text-indigo-600 hover:text-indigo-700">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">➔ Tôi đã sống ở TP Rạch Giá được 2 năm (Trang 24).</div>
                </div>
              </div>
            </div>

            {/* Visual Time Arrow Graphic */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-4 tracking-wider">
                Trục thời gian trực quan (Timeline Visualization)
              </h5>
              
              <div className="relative py-6 px-4">
                {/* Horizontal time line */}
                <div className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full w-full relative">
                  {/* Since point */}
                  <div className="absolute left-[20%] -top-2.5 w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-emerald-100 dark:ring-emerald-950">
                    S
                  </div>
                  <div className="absolute left-[20%] top-6 -translate-x-1/2 text-center">
                    <span className="block text-xs font-extrabold text-emerald-700 dark:text-emerald-400">SINCE (Mốc)</span>
                    <span className="text-[10px] text-slate-500">2022 / Last week</span>
                  </div>

                  {/* For span bracket */}
                  <div className="absolute left-[20%] right-[10%] -top-5 h-4 border-t-2 border-l-2 border-r-2 border-indigo-500 rounded-t-lg">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">
                      FOR 2 YEARS (Độ dài khoảng cách)
                    </span>
                  </div>

                  {/* Now point */}
                  <div className="absolute right-[10%] -top-2.5 w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-amber-100 dark:ring-amber-950">
                    N
                  </div>
                  <div className="absolute right-[10%] top-6 translate-x-1/2 text-center">
                    <span className="block text-xs font-extrabold text-amber-600 dark:text-amber-400">NOW (Hiện tại)</span>
                    <span className="text-[10px] text-slate-500">Hành động vẫn tiếp diễn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signal Keywords Gallery (Just, Already, Yet, Ever, Never, Recently) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Các Trạng Từ Nhận Biết Đặc Trưng
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                6 Dấu Hiệu Vàng Nhận Diện Thì Hiện Tại Hoàn Thành (Trang 24)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Bấm vào từng từ khóa để xem vị trí đứng trong câu và câu ví dụ chuẩn âm thanh:
              </p>
            </div>

            {/* Keyword selector pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(signalKeywords).map((key) => {
                const kw = signalKeywords[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSignalKeyword(key)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      selectedSignalKeyword === key
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="font-mono uppercase">{key}</span>
                    <span className="text-[11px] opacity-80">({kw.meaning})</span>
                  </button>
                );
              })}
            </div>

            {/* Active Keyword Showcase Card */}
            {(() => {
              const kw = signalKeywords[selectedSignalKeyword];
              return (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border-2 border-emerald-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-black text-base uppercase">
                          {selectedSignalKeyword}
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          Nghĩa: {kw.meaning}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold mt-1">
                        📍 Vị trí: {kw.position}
                      </p>
                    </div>

                    <button
                      onClick={() => speak(kw.en)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm self-start sm:self-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe ví dụ</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 mb-3">
                    <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono">
                      "{kw.en}"
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      ➔ {kw.vi}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Ghi chú từ sách:</strong> {kw.note}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: 4 USE CASES */}
      {activeTab === 'usecases' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Lý Thuyết Trọng Tâm Trang 24
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                4 Cách Sử Dụng Kinh Điển Của Thì Hiện Tại Hoàn Thành
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hiểu bản chất qua 4 bối cảnh thực tế trích nguyên văn từ giáo trình của thầy Lê Công Đức:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Usecase 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Thời gian không xác định & chưa kết thúc
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Diễn tả hành động đã xảy ra rồi nhưng thời gian không xác định là khi nào và cho đến hiện tại hành động đó chưa kết thúc hoàn toàn.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've lived in Spain, and the trains are so much reliable there."</span>
                        <button onClick={() => speak("I've lived in Spain, and the trains are so much reliable there.")} className="text-emerald-600 hover:text-emerald-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Tôi từng sống ở Tây Ban Nha, và tàu hỏa ở đó chạy rất đúng giờ.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"She has read that newspaper."</span>
                        <button onClick={() => speak("She has read that newspaper.")} className="text-emerald-600 hover:text-emerald-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Cô ấy đã đọc tờ báo đó rồi (không nói rõ đọc lúc mấy giờ).</div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                  💡 Điểm mấu chốt: Không có thời gian cụ thể (như yesterday, in 1990) ➔ Hiện tại hoàn thành!
                </div>
              </div>

              {/* Usecase 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Để lại kết quả rõ ràng ở hiện tại
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Diễn tả hành động đã xảy ra trong quá khứ dẫn đến 1 kết quả khác vẫn còn thấy rõ hoặc có tác động trực tiếp ở hiện tại.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"She has sold her car so now she goes to work by bus."</span>
                        <button onClick={() => speak("She has sold her car so now she goes to work by bus.")} className="text-indigo-600 hover:text-indigo-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Cô ấy đã bán ô tô (kết quả hiện tại: phải đi làm bằng xe buýt).</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"She has lost her pen. Can you lend her yours?"</span>
                        <button onClick={() => speak("She has lost her pen. Can you lend her yours?")} className="text-indigo-600 hover:text-indigo-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Vừa làm mất bút (kết quả: hiện tại không có bút để viết).</div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-lg">
                  💡 Điểm mấu chốt: Hành động trong quá khứ gắn chặt với thực tại!
                </div>
              </div>

              {/* Usecase 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Số lần hành động diễn ra (Lặp lại)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Khi nói về số lần một hành động nào đó diễn ra tính đến thời điểm hiện tại (once, twice, three times, so far...).
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've arrived late for work twice this week so far."</span>
                        <button onClick={() => speak("I've arrived late for work twice this week so far.")} className="text-amber-600 hover:text-amber-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Cho đến nay tuần này tôi đã đi làm muộn hai lần rồi.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"She has written six letters since lunchtime."</span>
                        <button onClick={() => speak("She has written six letters since lunchtime.")} className="text-amber-600 hover:text-amber-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Kể từ bữa trưa cô ấy đã viết được sáu lá thư.</div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg">
                  💡 Điểm mấu chốt: Đếm số lượng, số lần thực hiện một việc tính đến nay.
                </div>
              </div>

              {/* Usecase 4 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                      4
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      So sánh nhất & Lần đầu tiên / Lần thứ n
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Dùng sau cấu trúc so sánh nhất (the best, the prettiest), hoặc diễn đạt ý đây là lần đầu tiên, lần thứ n thực hiện hành động đó.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"This is the loveliest baby I have ever seen."</span>
                        <button onClick={() => speak("This is the loveliest baby I have ever seen.")} className="text-rose-600 hover:text-rose-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Đây là đứa bé đáng yêu nhất mà tôi từng thấy.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"This is the first time that I have heard her sing."</span>
                        <button onClick={() => speak("This is the first time that I have heard her sing.")} className="text-rose-600 hover:text-rose-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Đây là lần đầu tiên tôi nghe cô ấy hát.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"It's the fifth time you've asked me the same question."</span>
                        <button onClick={() => speak("It's the fifth time you've asked me the same question.")} className="text-rose-600 hover:text-rose-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Đây là lần thứ 5 bạn hỏi tôi cùng một câu hỏi đấy nhé!</div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
                  💡 Điểm mấu chốt: Bắt buộc dùng thì hiện tại hoàn thành sau The first/second... time!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE 1 (10 VERB TENSE QUESTIONS - PAGE 25) */}
      {activeTab === 'practice1' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Thực Hành 1 • Trang 25 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  1. Hoàn thành các câu dưới đây sử dụng các động từ cho trong ngoặc
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Chia thì hiện tại hoàn thành với have/has + V3/ed (hỗ trợ cả dạng viết tắt như <em>haven't seen</em> hoặc <em>have not seen</em>)
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={checkAllP1}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Chấm Tất Cả</span>
                </button>
                <button
                  onClick={resetP1}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Làm lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm Lại</span>
                </button>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {p1Questions.map((q) => {
                const userAns = p1Answers[q.id] || '';
                const isChecked = showP1Solution[q.id];
                const isCorrect = p1Feedback[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                          {q.id}
                        </span>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                          {q.prefix && <span>{q.prefix} </span>}
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{q.blankPrompt}</span>
                          {q.suffix && <span> {q.suffix}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <input
                          type="text"
                          value={userAns}
                          onChange={(e) => setP1Answers({ ...p1Answers, [q.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCheckP1(q.id);
                          }}
                          placeholder="Nhập đáp án..."
                          className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-44"
                        />
                        <button
                          onClick={() => handleCheckP1(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900 transition-all"
                        >
                          Kiểm tra
                        </button>
                      </div>
                    </div>

                    {isChecked && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-rose-700 dark:text-rose-300 font-bold'}>
                              {isCorrect ? 'Chính xác! ' : `Chưa đúng! Đáp án chuẩn: "${q.validAnswers[0]}" • `}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">{q.explanation}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => speak(`${q.prefix} ${q.validAnswers[0]} ${q.suffix}`)}
                          className="text-slate-500 hover:text-emerald-600 flex items-center gap-1 shrink-0 self-end sm:self-auto text-[11px]"
                          title="Nghe câu hoàn chỉnh"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe audio</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PRACTICE 2 (SINCE VS FOR - PAGE 25) */}
      {activeTab === 'practice2' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Thực Hành 2 • Trang 25 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  2. Hoàn thành các câu sau đây với since hoặc for
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Mẹo nhớ: <span className="font-bold text-emerald-600">SINCE</span> đi với mốc thời gian, <span className="font-bold text-indigo-600">FOR</span> đi với khoảng thời gian!
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={checkAllP2}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Chấm Tất Cả</span>
                </button>
                <button
                  onClick={resetP2}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Làm lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm Lại</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {p2Questions.map((q) => {
                const userAns = p2Answers[q.id] || '';
                const isChecked = showP2Solution[q.id];
                const isCorrect = p2Feedback[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                          {q.id}
                        </span>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                          <span>{q.prefix} </span>
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                            ______
                          </span>
                          <span> {q.suffix}</span>
                        </div>
                      </div>

                      {/* Fast selection buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setP2Answers({ ...p2Answers, [q.id]: 'since' });
                            setTimeout(() => handleCheckP2(q.id), 50);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                            userAns.toLowerCase() === 'since'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                          }`}
                        >
                          SINCE
                        </button>
                        <button
                          onClick={() => {
                            setP2Answers({ ...p2Answers, [q.id]: 'for' });
                            setTimeout(() => handleCheckP2(q.id), 50);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                            userAns.toLowerCase() === 'for'
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                          }`}
                        >
                          FOR
                        </button>
                      </div>
                    </div>

                    {isChecked && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-start gap-2">
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

                        <button
                          onClick={() => speak(`${q.prefix} ${q.validAnswers[0]} ${q.suffix}`)}
                          className="text-slate-500 hover:text-emerald-600 flex items-center gap-1 shrink-0 self-end sm:self-auto text-[11px]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe câu</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRACTICE 3 & 4 (FIRST TIME & SUPERLATIVES - PAGE 25) */}
      {activeTab === 'practice3_4' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Thực Hành 3 & 4 • Trang 25 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  3. The first/second... time & 4. So sánh nhất + ever
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hai cấu trúc đặc trưng nhất trong các đề thi chứng chỉ và bài tập ngữ pháp
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={checkAllP3}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Chấm Tất Cả</span>
                </button>
                <button
                  onClick={resetP3}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Làm lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm Lại</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {p3Questions.map((q, idx) => {
                const userAns = p3Answers[q.id] || '';
                const isChecked = showP3Solution[q.id];
                const isCorrect = p3Feedback[q.id];

                const isFirstOfGroup = idx === 0 || p3Questions[idx - 1].section !== q.section;

                return (
                  <React.Fragment key={q.id}>
                    {isFirstOfGroup && (
                      <div className="pt-2 pb-1">
                        <div className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold inline-block">
                          {q.section}
                        </div>
                      </div>
                    )}

                    <div
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isChecked
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20'
                            : 'border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                            {q.id}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">______</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setP3Answers({ ...p3Answers, [q.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckP3(q.id);
                            }}
                            placeholder="Nhập câu trả lời..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-52"
                          />
                          <button
                            onClick={() => handleCheckP3(q.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900 transition-all"
                          >
                            Kiểm tra
                          </button>
                        </div>
                      </div>

                      {isChecked && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-start gap-2">
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

                          <button
                            onClick={() => speak(`${q.prefix} ${q.validAnswers[0]} ${q.suffix}`)}
                            className="text-slate-500 hover:text-emerald-600 flex items-center gap-1 shrink-0 self-end sm:self-auto text-[11px]"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe câu</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BOOK SCANS TAB (PAGE 24 & PAGE 25) */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Tài Liệu Gốc • Bản Chụp Sách Thật
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Trang 24 & Trang 25 - Sách Ngữ Pháp Tiếng Anh (Lê Công Đức)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Đối chiếu nguyên vẹn từng câu chữ, bảng công thức, dấu hiệu và bài tập thực hành
                </p>
              </div>

              {/* Page Toggle */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedScanPage(24)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 24
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Trang 24 (Lý thuyết)</span>
                </button>
                <button
                  onClick={() => setSelectedScanPage(25)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 25
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trang 25 (Thực hành 4 bài)</span>
                </button>
              </div>
            </div>

            {/* Scan Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 flex flex-col items-center">
              <div className="mb-3 w-full flex items-center justify-between text-xs text-slate-500 px-2">
                <span>
                  Đang xem: <strong>Trang {selectedScanPage} / 196</strong>
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Tập tin ảnh gốc: {selectedScanPage === 24 ? 'image_e35da350.png' : 'image_5dfa096d.png'}
                </span>
              </div>

              <div className="max-w-2xl w-full shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                <img
                  src={selectedScanPage === 24 ? '/assets/aistudio/image_e35da350.png' : '/assets/aistudio/image_5dfa096d.png'}
                  alt={`Bản scan trang ${selectedScanPage} Sách Ngữ Pháp Tiếng Anh`}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center text-xs text-slate-500">
                💡 <em>Mẹo: Bạn có thể chuyển qua các tab bên trên để tương tác, luyện tập và nghe phát âm từng câu trong bản scan này!</em>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
