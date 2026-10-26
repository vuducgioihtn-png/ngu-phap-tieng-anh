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
  Eye, 
  Info, 
  Layers, 
  Award, 
  Calendar, 
  Zap, 
  Check, 
  Search,
  HelpCircle,
  History
} from 'lucide-react';

interface PastSimpleLabProps {
  onOpenPdf?: () => void;
}

export const PastSimpleLab: React.FC<PastSimpleLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'signals' | 'practice_be' | 'practice_verbs' | 'irregular_verbs' | 'scans'>('formulas');

  // Audio speech helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Normalizer helper
  const normalize = (val: string) => {
    return (val || '')
      .toLowerCase()
      .trim()
      .replace(/[’‘`]/g, "'")
      .replace(/[?.,!]/g, '')
      .replace(/\s+/g, ' ');
  };

  // State for Formula Builder
  const [formulaBranch, setFormulaBranch] = useState<'tobe' | 'verb'>('tobe');
  const [selectedSubject, setSelectedSubject] = useState<'I' | 'You' | 'He' | 'She' | 'They'>('I');
  const [sentenceForm, setSentenceForm] = useState<'pos' | 'neg' | 'ques'>('pos');
  const [selectedVerbKey, setSelectedVerbKey] = useState<'play' | 'come' | 'visit' | 'leave' | 'live'>('play');

  const regularIrregularVerbs: Record<string, { base: string; v2: string; type: 'regular' | 'irregular'; vi: string; context: string }> = {
    play: { base: 'play', v2: 'played', type: 'regular', vi: 'chơi', context: 'games late last night' },
    come: { base: 'come', v2: 'came', type: 'irregular', vi: 'đến', context: 'home late yesterday' },
    visit: { base: 'visit', v2: 'visited', type: 'regular', vi: 'thăm', context: 'their parents last week' },
    leave: { base: 'leave', v2: 'left', type: 'irregular', vi: 'rời khỏi', context: 'university in 2010' },
    live: { base: 'live', v2: 'lived', type: 'regular', vi: 'sinh sống', context: 'in Japan from 2006 to 2008' }
  };

  // State for Practice 1 (TO BE - Page 30)
  const [beSubTab, setBeSubTab] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [beAnswers, setBeAnswers] = useState<{ [key: string]: string }>({});
  const [beFeedback, setBeFeedback] = useState<{ [key: string]: boolean }>({});
  const [showBeSolution, setShowBeSolution] = useState<{ [key: string]: boolean }>({});

  // State for Practice 2 (VERBS - Page 31)
  const [verbSubTab, setVerbSubTab] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [verbAnswers, setVerbAnswers] = useState<{ [key: string]: string }>({});
  const [verbFeedback, setVerbFeedback] = useState<{ [key: string]: boolean }>({});
  const [showVerbSolution, setShowVerbSolution] = useState<{ [key: string]: boolean }>({});

  // State for Book Scans tab
  const [selectedScanPage, setSelectedScanPage] = useState<29 | 30 | 31>(29);

  // Search filter for irregular verbs list
  const [searchVerb, setSearchVerb] = useState('');

  // DATA: Page 30 - Practice 1: TO BE - Part 1 (10 affirmative questions)
  const bePart1Questions = [
    {
      id: 'be-1-1',
      prefix: 'My father',
      prompt: '(be)',
      suffix: "a teacher from 1999 to 2012. Now he's a businessman.",
      validAnswers: ['was'],
      hint: 'My father (ngôi thứ 3 số ít) ➔ was',
      explanation: 'Chủ ngữ "My father" là số ít, thời gian "from 1999 to 2012" đã chấm dứt trong quá khứ ➔ dùng "was".'
    },
    {
      id: 'be-1-2',
      prefix: 'She',
      prompt: '(be)',
      suffix: 'in the garden minutes ago.',
      validAnswers: ['was'],
      hint: 'She ➔ was',
      explanation: 'Chủ ngữ "She" đi với "was", dấu hiệu "minutes ago" (cách đây vài phút).'
    },
    {
      id: 'be-1-3',
      prefix: 'They',
      prompt: '(be)',
      suffix: 'in the party last night.',
      validAnswers: ['were'],
      hint: 'They (số nhiều) ➔ were',
      explanation: 'Chủ ngữ "They" đi với "were", dấu hiệu "last night" (tối qua).'
    },
    {
      id: 'be-1-4',
      prefix: 'We',
      prompt: '(be)',
      suffix: 'in New York last month.',
      validAnswers: ['were'],
      hint: 'We ➔ were',
      explanation: 'Chủ ngữ "We" số nhiều đi với "were", dấu hiệu "last month".'
    },
    {
      id: 'be-1-5',
      prefix: 'He',
      prompt: '(be)',
      suffix: "twenty-two years old last year. This year he's twenty-three.",
      validAnswers: ['was'],
      hint: 'He ➔ was',
      explanation: 'Nói về tuổi tác năm ngoái (last year), chủ ngữ "He" dùng "was".'
    },
    {
      id: 'be-1-6',
      prefix: 'I',
      prompt: '(be)',
      suffix: 'the second-year student at university in 2010.',
      validAnswers: ['was'],
      hint: 'I ➔ was',
      explanation: 'Chủ ngữ "I" trong quá khứ đi với "was", thời điểm "in 2010".'
    },
    {
      id: 'be-1-7',
      prefix: 'It',
      prompt: '(be)',
      suffix: "very cold yesterday. Today it's warmer.",
      validAnswers: ['was'],
      hint: 'It ➔ was',
      explanation: 'Chủ ngữ giả định thời tiết "It" đi với "was yesterday".'
    },
    {
      id: 'be-1-8',
      prefix: 'You',
      prompt: '(be)',
      suffix: 'tired, right. You looked so sick then.',
      validAnswers: ['were'],
      hint: 'You ➔ were',
      explanation: 'Đại từ "You" luôn đi với "were" trong quá khứ.'
    },
    {
      id: 'be-1-9',
      prefix: 'My children',
      prompt: '(be)',
      suffix: 'very happy with their birthday presents.',
      validAnswers: ['were'],
      hint: 'My children (danh từ số nhiều) ➔ were',
      explanation: '"Children" là danh từ số nhiều bất quy tắc của "child", nên dùng "were".'
    },
    {
      id: 'be-1-10',
      prefix: 'President Ho Chi Minh',
      prompt: '(be)',
      suffix: 'born in Kim Lien, Nam Dan, Nghe An.',
      validAnswers: ['was'],
      hint: 'Chủ tịch Hồ Chí Minh (ngôi số ít) + was born',
      explanation: 'Cấu trúc ngày sinh nơi sinh luôn dùng "was born" với người số ít.'
    }
  ];

  // DATA: Page 30 - Practice 1: TO BE - Part 2 (10 negative questions)
  const bePart2Questions = [
    {
      id: 'be-2-1',
      prefix: 'It',
      prompt: '(not be)',
      suffix: 'sunny yesterday.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'It đi với was not / wasn\'t.'
    },
    {
      id: 'be-2-2',
      prefix: 'I',
      prompt: '(not be)',
      suffix: 'late for school.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'I đi với was not / wasn\'t.'
    },
    {
      id: 'be-2-3',
      prefix: 'They',
      prompt: '(not be)',
      suffix: 'in Kien Giang last week.',
      validAnswers: ["weren't", 'were not'],
      explanation: 'They số nhiều đi với were not / weren\'t.'
    },
    {
      id: 'be-2-4',
      prefix: 'She',
      prompt: '(not be)',
      suffix: 'hungry.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'She đi với was not / wasn\'t.'
    },
    {
      id: 'be-2-5',
      prefix: 'We',
      prompt: '(not be)',
      suffix: 'happy with the result.',
      validAnswers: ["weren't", 'were not'],
      explanation: 'We số nhiều đi với were not / weren\'t.'
    },
    {
      id: 'be-2-6',
      prefix: 'You',
      prompt: '(not be)',
      suffix: 'on time.',
      validAnswers: ["weren't", 'were not'],
      explanation: 'You luôn đi với were not / weren\'t.'
    },
    {
      id: 'be-2-7',
      prefix: 'My friends',
      prompt: '(not be)',
      suffix: 'fine.',
      validAnswers: ["weren't", 'were not'],
      explanation: 'My friends có "s" số nhiều ➔ were not / weren\'t.'
    },
    {
      id: 'be-2-8',
      prefix: 'He',
      prompt: '(not be)',
      suffix: 'busy then.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'He đi với was not / wasn\'t.'
    },
    {
      id: 'be-2-9',
      prefix: 'My school',
      prompt: '(not be)',
      suffix: 'as big as today.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'My school là trường học số ít ➔ was not / wasn\'t.'
    },
    {
      id: 'be-2-10',
      prefix: 'The information',
      prompt: '(not be)',
      suffix: 'very useful.',
      validAnswers: ["wasn't", 'was not'],
      explanation: 'Information là danh từ không đếm được số ít ➔ bắt buộc dùng was not / wasn\'t.'
    }
  ];

  // DATA: Page 30 - Practice 1: TO BE - Part 3 (5 question making)
  const bePart3Questions = [
    {
      id: 'be-3-1',
      prompt: '1. (Where / you / last night?)',
      answerHint: 'At home.',
      validAnswers: ['where were you last night', 'where were you last night?'],
      explanation: 'Đảo were lên trước you: "Where were you last night?".'
    },
    {
      id: 'be-3-2',
      prompt: '2. (We / late for the meeting?)',
      answerHint: "No, you weren't.",
      validAnswers: ['were we late for the meeting', 'were we late for the meeting?'],
      explanation: 'Đảo Were lên đầu câu: "Were we late for the meeting?".'
    },
    {
      id: 'be-3-3',
      prompt: '3. (How old / you / last year?)',
      answerHint: 'Twenty-seven.',
      validAnswers: ['how old were you last year', 'how old were you last year?'],
      explanation: '"How old were you last year?".'
    },
    {
      id: 'be-3-4',
      prompt: '4. (The weather / sunny / yesterday?)',
      answerHint: 'No, it was rainy.',
      validAnswers: ['was the weather sunny yesterday', 'was the weather sunny yesterday?'],
      explanation: 'The weather là số ít, đảo Was lên đầu: "Was the weather sunny yesterday?".'
    },
    {
      id: 'be-3-5',
      prompt: '5. (How much / they?)',
      answerHint: '$45.',
      validAnswers: ['how much were they', 'how much were they?'],
      explanation: 'They đi với were: "How much were they?".'
    }
  ];

  // DATA: Page 31 - Practice 2: VERBS - Part 1 (10 affirmative V-ed & V2)
  const verbPart1Questions = [
    {
      id: 'v-1-1',
      prefix: 'We',
      prompt: '(play)',
      suffix: 'soccer yesterday.',
      validAnswers: ['played'],
      hint: 'play là có quy tắc thêm -ed',
      explanation: 'Động từ "play" thêm đuôi -ed ➔ "played".'
    },
    {
      id: 'v-1-2',
      prefix: 'They',
      prompt: '(visit)',
      suffix: 'their parents last week.',
      validAnswers: ['visited'],
      hint: 'visit thêm -ed',
      explanation: 'Động từ "visit" thêm -ed ➔ "visited".'
    },
    {
      id: 'v-1-3',
      prefix: 'I',
      prompt: '(come)',
      suffix: 'to Vietnam last summer vacation.',
      validAnswers: ['came'],
      hint: 'come là bất quy tắc: come ➔ came ➔ come',
      explanation: 'Động từ bất quy tắc "come" chuyển sang cột 2 (V2) là "came".'
    },
    {
      id: 'v-1-4',
      prefix: 'She',
      prompt: '(arrive)',
      suffix: 'in Hue three days ago.',
      validAnswers: ['arrived'],
      hint: 'arrive tận cùng e chỉ cần thêm -d',
      explanation: 'Động từ "arrive" có sẵn chữ "e" chỉ cần thêm "d" ➔ "arrived".'
    },
    {
      id: 'v-1-5',
      prefix: 'My students',
      prompt: '(go)',
      suffix: 'to Da Lat on their last vacation.',
      validAnswers: ['went'],
      hint: 'go ➔ went ➔ gone',
      explanation: 'Động từ bất quy tắc "go" chuyển thành "went".'
    },
    {
      id: 'v-1-6',
      prefix: 'He',
      prompt: '(leave)',
      suffix: 'university in 2010.',
      validAnswers: ['left'],
      hint: 'leave ➔ left ➔ left',
      explanation: 'Động từ bất quy tắc "leave" (rời khỏi/tốt nghiệp) thành "left".'
    },
    {
      id: 'v-1-7',
      prefix: 'You',
      prompt: '(live)',
      suffix: 'in Japan from 2006 to 2008, right?',
      validAnswers: ['lived'],
      hint: 'live thêm -d',
      explanation: 'Động từ "live" thêm "d" ➔ "lived".'
    },
    {
      id: 'v-1-8',
      prefix: 'My teacher',
      prompt: '(teach)',
      suffix: 'English in Duc Tri School for 2 years.',
      validAnswers: ['taught'],
      hint: 'teach ➔ taught ➔ taught',
      explanation: 'Động từ bất quy tắc "teach" (dạy học) chuyển thành "taught".'
    },
    {
      id: 'v-1-9',
      prefix: 'My grandfather',
      prompt: '(die)',
      suffix: 'at the age of 99.',
      validAnswers: ['died'],
      hint: 'die thêm -d',
      explanation: 'Động từ "die" (qua đời) thêm "d" ➔ "died".'
    },
    {
      id: 'v-1-10',
      prefix: 'My brother and I',
      prompt: '(study)',
      suffix: 'English in this center for 3 years.',
      validAnswers: ['studied'],
      hint: 'phụ âm + y ➔ đổi thành -ied',
      explanation: 'Động từ "study" có phụ âm "d" đứng trước "y", đổi "y" thành "ied" ➔ "studied".'
    }
  ];

  // DATA: Page 31 - Practice 2: VERBS - Part 2 (10 negative didn't + V)
  const verbPart2Questions = [
    {
      id: 'v-2-1',
      prefix: 'We',
      prompt: '(not go)',
      suffix: 'to school last Saturday.',
      validAnswers: ["didn't go", 'did not go'],
      explanation: 'Phủ định mượn didn\'t + V nguyên mẫu ➔ "didn\'t go".'
    },
    {
      id: 'v-2-2',
      prefix: 'I',
      prompt: '(not visit)',
      suffix: 'Japan last summer vacation. I visited Son Doong in Vietnam.',
      validAnswers: ["didn't visit", 'did not visit'],
      explanation: 'Phủ định ➔ "didn\'t visit".'
    },
    {
      id: 'v-2-3',
      prefix: 'My friends and I',
      prompt: '(not enjoy)',
      suffix: 'the film very much.',
      validAnswers: ["didn't enjoy", 'did not enjoy'],
      explanation: 'Phủ định ➔ "didn\'t enjoy".'
    },
    {
      id: 'v-2-4',
      prefix: "I went to my friend's house. The place was strange, so I",
      prompt: '(not sleep)',
      suffix: 'well.',
      validAnswers: ["didn't sleep", 'did not sleep'],
      explanation: 'Phủ định ➔ "didn\'t sleep".'
    },
    {
      id: 'v-2-5',
      prefix: "Jane wasn't hungry, so she",
      prompt: '(not eat)',
      suffix: 'anything.',
      validAnswers: ["didn't eat", 'did not eat'],
      explanation: 'Phủ định ➔ "didn\'t eat".'
    },
    {
      id: 'v-2-6',
      prefix: 'My father was busy, so he',
      prompt: '(not take)',
      suffix: 'me to the park.',
      validAnswers: ["didn't take", 'did not take'],
      explanation: 'Phủ định ➔ "didn\'t take".'
    },
    {
      id: 'v-2-7',
      prefix: 'They',
      prompt: '(not live)',
      suffix: 'in Singapore from 2010 to 2011.',
      validAnswers: ["didn't live", 'did not live'],
      explanation: 'Phủ định ➔ "didn\'t live".'
    },
    {
      id: 'v-2-8',
      prefix: 'It',
      prompt: '(not rain)',
      suffix: 'very much last month.',
      validAnswers: ["didn't rain", 'did not rain'],
      explanation: 'Phủ định ➔ "didn\'t rain".'
    },
    {
      id: 'v-2-9',
      prefix: 'My sister',
      prompt: '(not go)',
      suffix: 'out last night.',
      validAnswers: ["didn't go", 'did not go'],
      explanation: 'Phủ định ➔ "didn\'t go".'
    },
    {
      id: 'v-2-10',
      prefix: 'They',
      prompt: '(not play)',
      suffix: 'the piano at the party last week.',
      validAnswers: ["didn't play", 'did not play'],
      explanation: 'Phủ định ➔ "didn\'t play".'
    }
  ];

  // DATA: Page 31 - Practice 2: VERBS - Part 3 (5 Wh-questions)
  const verbPart3Questions = [
    {
      id: 'v-3-1',
      sentence: '1. We went to the bookstore last week.',
      underlined: 'last week (khi nào)',
      validAnswers: [
        'when did you go to the bookstore',
        'when did you go to the bookstore?',
        'when did we go to the bookstore',
        'when did we go to the bookstore?'
      ],
      hint: 'Hỏi thời gian dùng When did you go...',
      explanation: 'Phần gạch chân "last week" là mốc thời gian ➔ Dùng từ để hỏi "When" + trợ từ did + S + V nguyên mẫu: "When did you go to the bookstore?".'
    },
    {
      id: 'v-3-2',
      sentence: '2. They visited New York long time ago.',
      underlined: 'New York (nơi nào / thành phố nào)',
      validAnswers: [
        'where did they visit long time ago',
        'where did they visit long time ago?',
        'what place did they visit long time ago',
        'which city did they visit long time ago'
      ],
      hint: 'Hỏi địa điểm dùng Where did they visit...',
      explanation: 'Phần gạch chân "New York" là địa danh ➔ "Where did they visit long time ago?".'
    },
    {
      id: 'v-3-3',
      sentence: '3. She left university in 2009.',
      underlined: 'in 2009 (năm nào / khi nào)',
      validAnswers: [
        'when did she leave university',
        'when did she leave university?',
        'what year did she leave university',
        'what year did she leave university?'
      ],
      hint: 'Hỏi thời gian dùng When did she leave...',
      explanation: '"in 2009" chỉ thời gian ➔ "When did she leave university?". Động từ left quay về nguyên mẫu leave!'
    },
    {
      id: 'v-3-4',
      sentence: '4. He watched TV last night.',
      underlined: 'watched TV (làm gì)',
      validAnswers: [
        'what did he do last night',
        'what did he do last night?'
      ],
      hint: 'Hỏi hành động đã làm gì dùng What did he do...',
      explanation: '"watched TV" là hành động ➔ "What did he do last night?".'
    },
    {
      id: 'v-3-5',
      sentence: '5. We stayed in Sealight hotel in Rach Gia City.',
      underlined: 'in Sealight (khách sạn nào / ở đâu)',
      validAnswers: [
        'where did you stay in rach gia city',
        'where did you stay in rach gia city?',
        'which hotel did you stay in in rach gia city',
        'which hotel did you stay at in rach gia city'
      ],
      hint: 'Hỏi khách sạn nào hoặc ở đâu dùng Where did you stay in Rach Gia City?',
      explanation: 'Phần gạch chân "in Sealight" chỉ khách sạn ➔ "Where did you stay in Rach Gia City?".'
    }
  ];

  // Common Irregular Verbs List
  const commonIrregularVerbs = [
    { v1: 'be', v2: 'was / were', v3: 'been', vi: 'thì, là, ở' },
    { v1: 'become', v2: 'became', v3: 'become', vi: 'trở thành' },
    { v1: 'begin', v2: 'began', v3: 'begun', vi: 'bắt đầu' },
    { v1: 'break', v2: 'broke', v3: 'broken', vi: 'làm vỡ, gãy' },
    { v1: 'bring', v2: 'brought', v3: 'brought', vi: 'mang đến' },
    { v1: 'buy', v2: 'bought', v3: 'bought', vi: 'mua' },
    { v1: 'catch', v2: 'caught', v3: 'caught', vi: 'bắt, chụp' },
    { v1: 'choose', v2: 'chose', v3: 'chosen', vi: 'chọn lựa' },
    { v1: 'come', v2: 'came', v3: 'come', vi: 'đến' },
    { v1: 'cost', v2: 'cost', v3: 'cost', vi: 'trị giá' },
    { v1: 'cut', v2: 'cut', v3: 'cut', vi: 'cắt' },
    { v1: 'do', v2: 'did', v3: 'done', vi: 'làm' },
    { v1: 'drink', v2: 'drank', v3: 'drunk', vi: 'uống' },
    { v1: 'drive', v2: 'drove', v3: 'driven', vi: 'lái xe' },
    { v1: 'eat', v2: 'ate', v3: 'eaten', vi: 'ăn' },
    { v1: 'fall', v2: 'fell', v3: 'fallen', vi: 'rơi, ngã' },
    { v1: 'feel', v2: 'felt', v3: 'felt', vi: 'cảm thấy' },
    { v1: 'find', v2: 'found', v3: 'found', vi: 'tìm thấy' },
    { v1: 'fly', v2: 'flew', v3: 'flown', vi: 'bay' },
    { v1: 'forget', v2: 'forgot', v3: 'forgotten', vi: 'quên' },
    { v1: 'get', v2: 'got', v3: 'got / gotten', vi: 'nhận được' },
    { v1: 'give', v2: 'gave', v3: 'given', vi: 'cho, tặng' },
    { v1: 'go', v2: 'went', v3: 'gone', vi: 'đi' },
    { v1: 'have', v2: 'had', v3: 'had', vi: 'có' },
    { v1: 'hear', v2: 'heard', v3: 'heard', vi: 'nghe' },
    { v1: 'know', v2: 'knew', v3: 'known', vi: 'biết' },
    { v1: 'leave', v2: 'left', v3: 'left', vi: 'rời khỏi' },
    { v1: 'lose', v2: 'lost', v3: 'lost', vi: 'đánh mất' },
    { v1: 'make', v2: 'made', v3: 'made', vi: 'làm, chế tạo' },
    { v1: 'meet', v2: 'met', v3: 'met', vi: 'gặp gỡ' },
    { v1: 'pay', v2: 'paid', v3: 'paid', vi: 'thanh toán' },
    { v1: 'read', v2: 'read', v3: 'read', vi: 'đọc' },
    { v1: 'run', v2: 'ran', v3: 'run', vi: 'chạy' },
    { v1: 'say', v2: 'said', v3: 'said', vi: 'nói' },
    { v1: 'see', v2: 'saw', v3: 'seen', vi: 'nhìn thấy' },
    { v1: 'send', v2: 'sent', v3: 'sent', vi: 'gửi đi' },
    { v1: 'sing', v2: 'sang', v3: 'sung', vi: 'hát' },
    { v1: 'sleep', v2: 'slept', v3: 'slept', vi: 'ngủ' },
    { v1: 'speak', v2: 'spoke', v3: 'spoken', vi: 'nói chuyện' },
    { v1: 'spend', v2: 'spent', v3: 'spent', vi: 'tiêu xài' },
    { v1: 'take', v2: 'took', v3: 'taken', vi: 'cầm, lấy' },
    { v1: 'teach', v2: 'taught', v3: 'taught', vi: 'dạy học' },
    { v1: 'tell', v2: 'told', v3: 'told', vi: 'kể, bảo' },
    { v1: 'think', v2: 'thought', v3: 'thought', vi: 'nghĩ' },
    { v1: 'understand', v2: 'understood', v3: 'understood', vi: 'hiểu' },
    { v1: 'wear', v2: 'wore', v3: 'worn', vi: 'mặc, đeo' },
    { v1: 'win', v2: 'won', v3: 'won', vi: 'chiến thắng' },
    { v1: 'write', v2: 'wrote', v3: 'written', vi: 'viết' }
  ];

  // Scoring helpers for BE
  const handleCheckBe = (id: string, validAnswers: string[], overrideVal?: string) => {
    const rawVal = overrideVal !== undefined ? overrideVal : (beAnswers[id] || '');
    const userVal = normalize(rawVal);
    const isCorrect = validAnswers.some(ans => normalize(ans) === userVal);
    setBeFeedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowBeSolution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllBePart = (list: any[]) => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    list.forEach(q => {
      const userVal = normalize(beAnswers[q.id] || '');
      fb[q.id] = q.validAnswers.some((ans: string) => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setBeFeedback(prev => ({ ...prev, ...fb }));
    setShowBeSolution(prev => ({ ...prev, ...sol }));
  };

  const resetBePart = (list: any[]) => {
    const newAns = { ...beAnswers };
    const newFb = { ...beFeedback };
    const newSol = { ...showBeSolution };
    list.forEach(q => {
      delete newAns[q.id];
      delete newFb[q.id];
      delete newSol[q.id];
    });
    setBeAnswers(newAns);
    setBeFeedback(newFb);
    setShowBeSolution(newSol);
  };

  // Scoring helpers for VERBS
  const handleCheckVerb = (id: string, validAnswers: string[], overrideVal?: string) => {
    const rawVal = overrideVal !== undefined ? overrideVal : (verbAnswers[id] || '');
    const userVal = normalize(rawVal);
    const isCorrect = validAnswers.some(ans => normalize(ans) === userVal);
    setVerbFeedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowVerbSolution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllVerbPart = (list: any[]) => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    list.forEach(q => {
      const userVal = normalize(verbAnswers[q.id] || '');
      fb[q.id] = q.validAnswers.some((ans: string) => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setVerbFeedback(prev => ({ ...prev, ...fb }));
    setShowVerbSolution(prev => ({ ...prev, ...sol }));
  };

  const resetVerbPart = (list: any[]) => {
    const newAns = { ...verbAnswers };
    const newFb = { ...verbFeedback };
    const newSol = { ...showVerbSolution };
    list.forEach(q => {
      delete newAns[q.id];
      delete newFb[q.id];
      delete newSol[q.id];
    });
    setVerbAnswers(newAns);
    setVerbFeedback(newFb);
    setShowVerbSolution(newSol);
  };

  const beScore = Object.values(beFeedback).filter(Boolean).length;
  const verbScore = Object.values(verbFeedback).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-100 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyên Đề 12 • Trang 29, 30 & 31 Sách Ngữ Pháp Tiếng Anh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              12. Past Simple (Quá Khứ Đơn)
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Diễn tả hành động <span className="font-bold text-white underline decoration-amber-400">đã xảy ra và chấm dứt dứt điểm</span> trong quá khứ. 
              Tách bạch 2 nhánh lớn: Động từ <code className="bg-blue-900/60 px-2 py-0.5 rounded font-mono font-bold text-amber-300">TO BE (was / were)</code> 
              và Động từ thường <code className="bg-blue-900/60 px-2 py-0.5 rounded font-mono font-bold text-emerald-300">VERBS (V-ed / V2 / didn't)</code>!
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Xem Bản Scan Trang 29-31</span>
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

        {/* Quick summary strip */}
        <div className="mt-6 pt-4 border-t border-blue-400/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">To Be (Số ít)</span>
            <span className="font-bold text-white text-sm">I / He / She / It ➔ WAS</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">To Be (Số nhiều)</span>
            <span className="font-bold text-white text-sm">You / We / They ➔ WERE</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">Động từ thường</span>
            <span className="font-bold text-amber-300 text-sm">V-ed hoặc V2 (Bất quy tắc)</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">Phủ định & Nghi vấn</span>
            <span className="font-bold text-emerald-300 text-sm">didn't + V / Did + S + V?</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'formulas'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Cấu Trúc To Be & Động Từ</span>
        </button>

        <button
          onClick={() => setActiveTab('signals')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'signals'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>2. Dấu Hiệu & Quá Khứ vs HTHT</span>
        </button>

        <button
          onClick={() => setActiveTab('practice_be')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice_be'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>3. Thực Hành To Be Trang 30 (25 câu)</span>
          {beScore > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px]">{beScore}/25</span>}
        </button>

        <button
          onClick={() => setActiveTab('practice_verbs')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice_verbs'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>4. Thực Hành Động Từ Trang 31 (25 câu)</span>
          {verbScore > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[10px]">{verbScore}/25</span>}
        </button>

        <button
          onClick={() => setActiveTab('irregular_verbs')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'irregular_verbs'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>5. Bảng Động Từ Bất Quy Tắc (V1-V2-V3)</span>
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'scans'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>6. Bản Scan Sách Gốc (Trang 29-31)</span>
        </button>
      </div>

      {/* TAB 1: FORMULAS */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* Branch Switcher: TO BE vs VERBS */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
            <button
              onClick={() => setFormulaBranch('tobe')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                formulaBranch === 'tobe'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Nhánh 1: Động Từ TO BE (was / were)</span>
            </button>
            <button
              onClick={() => setFormulaBranch('verb')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                formulaBranch === 'verb'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Nhánh 2: Động Từ Thường (V-ed / V2 / didn't)</span>
            </button>
          </div>

          {/* Table from Page 29 */}
          {formulaBranch === 'tobe' ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Bảng Cấu Trúc Động Từ TO BE Trong Quá Khứ (Trang 29)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Lưu ý: <code>I, He, She, It, Danh từ số ít</code> đi với <strong>WAS</strong>; <code>You, We, They, Danh từ số nhiều</code> đi với <strong>WERE</strong>.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Thể câu</th>
                      <th className="py-3 px-4 font-bold text-blue-700 dark:text-blue-300">
                        Số nhiều & You (You, We, They, Tom and Mary)
                      </th>
                      <th className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">
                        Số ít & I (I, She, He, It, Tom)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs mr-2">(+) Khẳng định</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-blue-600 dark:text-blue-400">S (nhiều) + WERE</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • You were here last night.<br />
                          • They were late for ten minutes.<br />
                          • We were in Korea three days ago.<br />
                          • Tom and Mary were on holiday.
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">S (ít / I) + WAS</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • I was in New York last week.<br />
                          • She was in the garden minutes ago.<br />
                          • He was late.<br />
                          • It was sunny yesterday.<br />
                          • Tom was on holiday.
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-xs mr-2">(-) Phủ định</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-rose-600 dark:text-rose-400">were not = weren't</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • You were not here last night.<br />
                          • They weren't busy.<br />
                          • We weren't at work.<br />
                          • Tom and Mary weren't on holiday.
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-rose-600 dark:text-rose-400">was not = wasn't</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • I was not in New York last week.<br />
                          • She was not in the garden.<br />
                          • He wasn't late.<br />
                          • It wasn't sunny yesterday.<br />
                          • Tom wasn't on holiday.
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs mr-2">(?) Nghi vấn</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Were + S ...?</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • Were you here last night? ➔ Yes, I was.<br />
                          • Were they late? ➔ No, they weren't.
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Was + S ...?</div>
                        <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                          • Was I late? ➔ No, you weren't.<br />
                          • Was she in the garden? ➔ Yes, she was.<br />
                          • Was he late? ➔ Yes, he was.<br />
                          • Was it rainy yesterday? ➔ No, it wasn't.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Bảng Cấu Trúc Động Từ Thường (VERBS) Trong Quá Khứ (Trang 29)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Khi dùng trợ động từ <strong>DID / DIDN'T</strong> thì động từ chính <strong>LUÔN QUAY VỀ DẠNG NGUYÊN MẪU</strong>!
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Thể câu</th>
                      <th className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">
                        Cấu trúc & Quy tắc
                      </th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">
                        Ví dụ mẫu từ sách
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs mr-2">(+) Khẳng định</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">S + V-ED / V2</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          • Có quy tắc: Thêm <code>-ED</code> (play ➔ played)<br />
                          • Bất quy tắc: Tra cột 2 bảng BQT (come ➔ came)
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs italic text-slate-700 dark:text-slate-300">
                        • She <strong>played</strong> games late last night.<br />
                        • He <strong>came</strong> home late yesterday.
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-xs mr-2">(-) Phủ định</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-rose-600 dark:text-rose-400">S + DIDN'T + V(nguyên mẫu)</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Thêm trợ động từ DIDN'T trước mọi chủ ngữ!
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs italic text-slate-700 dark:text-slate-300">
                        • She <strong>didn't work</strong> last Sunday.<br />
                        • We <strong>didn't go</strong> to school last Monday.
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs mr-2">(?) Nghi vấn</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-amber-600 dark:text-amber-400">DID + S + V(nguyên mẫu) ?</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Đảo Did / Didn't lên đầu câu.
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs italic text-slate-700 dark:text-slate-300">
                        • <strong>Did</strong> you <strong>come</strong> Hoa's birthday party last night?<br />
                        • <strong>Didn't</strong> you <strong>enjoy</strong> the party last night?
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Interactive Past Sandbox */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Phòng Lắp Ráp Câu Quá Khứ (Interactive Past Builder)
                </span>
                <h4 className="text-xl font-extrabold text-white">Thử nghiệm chia To Be và Động từ</h4>
              </div>

              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setSentenceForm('pos')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sentenceForm === 'pos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
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

            {/* Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Subject */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">1. Chọn Chủ Ngữ:</label>
                <div className="flex flex-wrap gap-2">
                  {(['I', 'You', 'He', 'She', 'They'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSubject(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSubject === s
                          ? 'border-blue-500 bg-blue-900/60 text-white'
                          : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verb / To Be target */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">2. Chọn Động Từ:</label>
                <select
                  value={selectedVerbKey}
                  onChange={(e) => setSelectedVerbKey(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="play">play (chơi - có quy tắc ➔ played)</option>
                  <option value="come">come (đến - bất quy tắc ➔ came)</option>
                  <option value="visit">visit (thăm - có quy tắc ➔ visited)</option>
                  <option value="leave">leave (rời khỏi - bất quy tắc ➔ left)</option>
                  <option value="live">live (sinh sống - có quy tắc ➔ lived)</option>
                </select>
              </div>
            </div>

            {/* Live Result Box */}
            {(() => {
              const verbInfo = regularIrregularVerbs[selectedVerbKey];
              let sentenceText = '';
              let viText = '';

              if (formulaBranch === 'tobe') {
                const isSingular = selectedSubject === 'I' || selectedSubject === 'He' || selectedSubject === 'She';
                const beWord = isSingular ? 'was' : 'were';
                const beNeg = isSingular ? "wasn't" : "weren't";

                if (sentenceForm === 'pos') {
                  sentenceText = `${selectedSubject} ${beWord} in New York last week.`;
                  viText = `${selectedSubject} đã ở New York tuần trước.`;
                } else if (sentenceForm === 'neg') {
                  sentenceText = `${selectedSubject} ${beNeg} in New York last week.`;
                  viText = `${selectedSubject} đã không ở New York tuần trước.`;
                } else {
                  sentenceText = `${isSingular ? 'Was' : 'Were'} ${selectedSubject.toLowerCase()} in New York last week?`;
                  viText = `${selectedSubject} đã ở New York tuần trước phải không?`;
                }
              } else {
                if (sentenceForm === 'pos') {
                  sentenceText = `${selectedSubject} ${verbInfo.v2} ${verbInfo.context}.`;
                  viText = `${selectedSubject} đã ${verbInfo.vi} (${verbInfo.context}).`;
                } else if (sentenceForm === 'neg') {
                  sentenceText = `${selectedSubject} didn't ${verbInfo.base} ${verbInfo.context}.`;
                  viText = `${selectedSubject} đã không ${verbInfo.vi} (${verbInfo.context}).`;
                } else {
                  sentenceText = `Did ${selectedSubject.toLowerCase()} ${verbInfo.base} ${verbInfo.context}?`;
                  viText = `${selectedSubject} có ${verbInfo.vi} (${verbInfo.context}) không?`;
                }
              }

              return (
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                      Câu Hoàn Chỉnh:
                    </span>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white tracking-wide">
                      {sentenceText}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      ➔ {viText}
                    </div>
                  </div>

                  <button
                    onClick={() => speak(sentenceText)}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start sm:self-auto"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Audio</span>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 2: SIGNALS & COMPARISON */}
      {activeTab === 'signals' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Dấu Hiệu & Bản Chất Thì Trang 29
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Các Dấu Hiệu Nhận Biết Vàng Của Thì Quá Khứ Đơn
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Last */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-xs font-bold inline-block mb-2">
                  LAST ...
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Trước, vừa qua: <em>last summer, last night, last Monday, last weekend, last year...</em>
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  "She went shopping last weekend."
                </div>
              </div>

              {/* Ago */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
                <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-mono text-xs font-bold inline-block mb-2">
                  ... AGO
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Cách đây: <em>three years ago, minutes ago, long time ago, two days ago...</em>
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  "I saw him a minute ago."
                </div>
              </div>

              {/* In Past Year */}
              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                <span className="px-2.5 py-1 rounded bg-purple-600 text-white font-mono text-xs font-bold inline-block mb-2">
                  IN [YEAR] / FROM... TO...
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Mốc quá khứ: <em>in 2000, in 2010, from 1990 to 2000, yesterday...</em>
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  "They lived in New York in 2000."
                </div>
              </div>
            </div>

            {/* Crucial difference: Past Simple vs Present Perfect */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800">
              <h4 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                CÁCH SỬ DỤNG CỐT LÕI & PHÂN BIỆT VỚI HIỆN TẠI HOÀN THÀNH (Trang 29):
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Thì Quá Khứ Đơn dùng để <strong>diễn tả hành động đã diễn ra và KẾT THÚC DỨT ĐIỂM trong quá khứ</strong>, không còn liên can gì tới hiện tại.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900">
                  <span className="font-bold text-blue-600 block mb-1">Quá Khứ Đơn (Past Simple):</span>
                  <em>"I lived in New York three years ago."</em>
                  <div className="text-slate-500 text-[11px] mt-1">
                    ➔ <strong>Nghĩa thực tế:</strong> Bây giờ người nói KHÔNG CÒN sống ở New York nữa, mà đã chuyển đi nơi khác sinh sống (hành động đã kết thúc dứt điểm).
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900">
                  <span className="font-bold text-emerald-600 block mb-1">Hiện Tại Hoàn Thành (Present Perfect):</span>
                  <em>"I have lived in New York for three years."</em>
                  <div className="text-slate-500 text-[11px] mt-1">
                    ➔ <strong>Nghĩa thực tế:</strong> Bắt đầu sống cách đây 3 năm và HIỆN TẠI VẪN ĐANG SỐNG ở New York!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE TO BE (PAGE 30) */}
      {activeTab === 'practice_be' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Thực Hành 1 • Trang 30 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  ĐỘNG TỪ TO BE: Khẳng Định, Phủ Định & Đặt Câu Hỏi
                </h3>
              </div>

              {/* Subtabs for BE 1, 2, 3 */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setBeSubTab('part1')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    beSubTab === 'part1' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 1 (10 câu was/were)
                </button>
                <button
                  onClick={() => setBeSubTab('part2')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    beSubTab === 'part2' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 2 (10 câu phủ định)
                </button>
                <button
                  onClick={() => setBeSubTab('part3')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    beSubTab === 'part3' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 3 (5 câu đặt câu hỏi)
                </button>
              </div>
            </div>

            {/* PART 1: 10 was/were questions */}
            {beSubTab === 'part1' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>1. Chia thì quá khứ đơn ở dạng khẳng định với động từ be (was / were):</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllBePart(bePart1Questions)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                    >
                      Chấm Bài 1
                    </button>
                    <button
                      onClick={() => resetBePart(bePart1Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {bePart1Questions.map((q, idx) => {
                  const userAns = beAnswers[q.id] || '';
                  const isChecked = showBeSolution[q.id];
                  const isCorrect = beFeedback[q.id];

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
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">______</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        {/* Fast was / were buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => {
                              setBeAnswers(prev => ({ ...prev, [q.id]: 'was' }));
                              handleCheckBe(q.id, q.validAnswers, 'was');
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                              (userAns || '').toLowerCase() === 'was'
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-500'
                            }`}
                          >
                            WAS
                          </button>
                          <button
                            onClick={() => {
                              setBeAnswers(prev => ({ ...prev, [q.id]: 'were' }));
                              handleCheckBe(q.id, q.validAnswers, 'were');
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                              (userAns || '').toLowerCase() === 'were'
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                            }`}
                          >
                            WERE
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
            )}

            {/* PART 2: 10 negative questions */}
            {beSubTab === 'part2' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>2. Chia thì quá khứ đơn ở dạng phủ định với động từ be (wasn't / weren't / was not / were not):</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllBePart(bePart2Questions)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                    >
                      Chấm Bài 2
                    </button>
                    <button
                      onClick={() => resetBePart(bePart2Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {bePart2Questions.map((q, idx) => {
                  const userAns = beAnswers[q.id] || '';
                  const isChecked = showBeSolution[q.id];
                  const isCorrect = beFeedback[q.id];

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
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">(not be)</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
                          <button
                            onClick={() => {
                              setBeAnswers(prev => ({ ...prev, [q.id]: "wasn't" }));
                              handleCheckBe(q.id, q.validAnswers, "wasn't");
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border ${
                              (userAns || '').toLowerCase().includes("wasn't")
                                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-rose-400'
                            }`}
                          >
                            wasn't
                          </button>
                          <button
                            onClick={() => {
                              setBeAnswers(prev => ({ ...prev, [q.id]: "weren't" }));
                              handleCheckBe(q.id, q.validAnswers, "weren't");
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border ${
                              (userAns || '').toLowerCase().includes("weren't")
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-indigo-400'
                            }`}
                          >
                            weren't
                          </button>
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setBeAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckBe(q.id, q.validAnswers, userAns);
                            }}
                            placeholder="hoặc gõ..."
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 w-28"
                          />
                          <button
                            onClick={() => handleCheckBe(q.id, q.validAnswers, userAns)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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
            )}

            {/* PART 3: 5 question making */}
            {beSubTab === 'part3' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>3. Đặt câu hỏi cho các câu sau đây với động từ To Be:</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllBePart(bePart3Questions)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                    >
                      Chấm Bài 3
                    </button>
                    <button
                      onClick={() => resetBePart(bePart3Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {bePart3Questions.map((q) => {
                  const userAns = beAnswers[q.id] || '';
                  const isChecked = showBeSolution[q.id];
                  const isCorrect = beFeedback[q.id];

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
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                            {q.prompt}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            ➔ Câu trả lời tương ứng: <em>"{q.answerHint}"</em>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setBeAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckBe(q.id, q.validAnswers, userAns);
                            }}
                            placeholder="Nhập câu hỏi đầy đủ..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 w-60"
                          />
                          <button
                            onClick={() => handleCheckBe(q.id, q.validAnswers, userAns)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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
                              {isCorrect ? 'Chính xác! ' : `Chưa đúng! Đáp án: "${q.validAnswers[0]}?" • `}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE VERBS (PAGE 31) */}
      {activeTab === 'practice_verbs' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Thực Hành 2 • Trang 31 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  ĐỘNG TỪ CÓ QUY TẮC & BẤT QUY TẮC
                </h3>
              </div>

              {/* Subtabs for VERBS 1, 2, 3 */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setVerbSubTab('part1')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    verbSubTab === 'part1' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 1 (10 câu khẳng định)
                </button>
                <button
                  onClick={() => setVerbSubTab('part2')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    verbSubTab === 'part2' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 2 (10 câu phủ định didn't)
                </button>
                <button
                  onClick={() => setVerbSubTab('part3')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    verbSubTab === 'part3' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 3 (5 câu Wh-question)
                </button>
              </div>
            </div>

            {/* PART 1 */}
            {verbSubTab === 'part1' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>1. Chia thì quá khứ đơn ở dạng khẳng định với động từ trong ngoặc (V-ed hoặc V2):</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllVerbPart(verbPart1Questions)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                    >
                      Chấm Bài 1
                    </button>
                    <button
                      onClick={() => resetVerbPart(verbPart1Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {verbPart1Questions.map((q, idx) => {
                  const userAns = verbAnswers[q.id] || '';
                  const isChecked = showVerbSolution[q.id];
                  const isCorrect = verbFeedback[q.id];

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
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{q.prompt}</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setVerbAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckVerb(q.id, q.validAnswers, userAns);
                            }}
                            placeholder="Nhập V-ed hoặc V2..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 w-44"
                          />
                          <button
                            onClick={() => handleCheckVerb(q.id, q.validAnswers, userAns)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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
            )}

            {/* PART 2 */}
            {verbSubTab === 'part2' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>2. Chia thì quá khứ đơn ở dạng phủ định với động từ trong ngoặc (didn't + V_inf):</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllVerbPart(verbPart2Questions)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                    >
                      Chấm Bài 2
                    </button>
                    <button
                      onClick={() => resetVerbPart(verbPart2Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {verbPart2Questions.map((q, idx) => {
                  const userAns = verbAnswers[q.id] || '';
                  const isChecked = showVerbSolution[q.id];
                  const isCorrect = verbFeedback[q.id];

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
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{q.prompt}</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setVerbAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckVerb(q.id, q.validAnswers, userAns);
                            }}
                            placeholder="didn't + V..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 w-44"
                          />
                          <button
                            onClick={() => handleCheckVerb(q.id, q.validAnswers, userAns)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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
            )}

            {/* PART 3: Wh-questions */}
            {verbSubTab === 'part3' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>3. Đặt câu hỏi cho phần gạch chân trong các câu sau đây:</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllVerbPart(verbPart3Questions)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                    >
                      Chấm Bài 3
                    </button>
                    <button
                      onClick={() => resetVerbPart(verbPart3Questions)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {verbPart3Questions.map((q) => {
                  const userAns = verbAnswers[q.id] || '';
                  const isChecked = showVerbSolution[q.id];
                  const isCorrect = verbFeedback[q.id];

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
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                            {q.sentence}
                          </div>
                          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                            Gạch chân: <u>{q.underlined}</u>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setVerbAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckVerb(q.id, q.validAnswers, userAns);
                            }}
                            placeholder="Nhập câu hỏi (When / Where / What)..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 w-64"
                          />
                          <button
                            onClick={() => handleCheckVerb(q.id, q.validAnswers, userAns)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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
                              {isCorrect ? 'Chính xác! ' : `Chưa đúng! Đáp án chuẩn: "${q.validAnswers[0]}?" • `}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: IRREGULAR VERBS TABLE */}
      {activeTab === 'irregular_verbs' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Bảng Tra Cứu Nhanh
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Động Từ Bất Quy Tắc Thông Dụng Nhất (V1 - V2 - V3)
                </h3>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchVerb}
                  onChange={(e) => setSearchVerb(e.target.value)}
                  placeholder="Tìm động từ (go, come, eat...)"
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="py-3 px-4">STT</th>
                    <th className="py-3 px-4 font-mono">V1 (Nguyên mẫu)</th>
                    <th className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">V2 (Quá khứ đơn)</th>
                    <th className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">V3 (Quá khứ phân từ)</th>
                    <th className="py-3 px-4">Ý nghĩa</th>
                    <th className="py-3 px-4 text-center">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {commonIrregularVerbs
                    .filter(v => 
                      !searchVerb || 
                      v.v1.toLowerCase().includes(searchVerb.toLowerCase()) ||
                      v.v2.toLowerCase().includes(searchVerb.toLowerCase()) ||
                      v.vi.toLowerCase().includes(searchVerb.toLowerCase())
                    )
                    .map((item, index) => (
                      <tr key={item.v1} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-4 text-slate-400 text-xs font-mono">{index + 1}</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">{item.v1}</td>
                        <td className="py-2.5 px-4 font-mono font-extrabold text-blue-600 dark:text-blue-400">{item.v2}</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">{item.v3}</td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{item.vi}</td>
                        <td className="py-2.5 px-4 text-center">
                          <button
                            onClick={() => speak(`${item.v1}, ${item.v2}, ${item.v3}`)}
                            className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            title="Nghe 3 cột phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SCANS (PAGE 29, 30, 31) */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Tài Liệu Gốc • Bản Chụp Sách Thật
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Trang 29, 30 & 31 - Sách Ngữ Pháp Tiếng Anh (Lê Công Đức)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Đối chiếu nguyên vẹn lý thuyết Quá Khứ Đơn, Thực hành To Be và Thực hành Động từ
                </p>
              </div>

              {/* Page Toggle */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto flex-wrap gap-1">
                <button
                  onClick={() => setSelectedScanPage(29)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 29
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Trang 29 (Lý thuyết)</span>
                </button>
                <button
                  onClick={() => setSelectedScanPage(30)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 30
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trang 30 (Thực hành To Be)</span>
                </button>
                <button
                  onClick={() => setSelectedScanPage(31)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 31
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Trang 31 (Thực hành Động từ)</span>
                </button>
              </div>
            </div>

            {/* Scan Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 flex flex-col items-center">
              <div className="mb-3 w-full flex items-center justify-between text-xs text-slate-500 px-2">
                <span>
                  Đang xem: <strong>Trang {selectedScanPage} / 196</strong>
                </span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                  Tập tin ảnh gốc: {
                    selectedScanPage === 29 ? 'image_445922b5.png' :
                    selectedScanPage === 30 ? 'image_babb4dc2.png' :
                    'image_398a0b2f.png'
                  }
                </span>
              </div>

              <div className="max-w-2xl w-full shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                <img
                  src={
                    selectedScanPage === 29 ? '/assets/aistudio/image_445922b5.png' :
                    selectedScanPage === 30 ? '/assets/aistudio/image_babb4dc2.png' :
                    '/assets/aistudio/image_398a0b2f.png'
                  }
                  alt={`Bản scan trang ${selectedScanPage} Sách Ngữ Pháp Tiếng Anh`}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center text-xs text-slate-500">
                💡 <em>Mẹo: Bạn có thể chuyển qua các tab bên trên để tương tác, luyện tập và làm bài tập chấm điểm cho trang sách này!</em>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
