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
  Activity, 
  HelpCircle,
  Filter
} from 'lucide-react';

interface PresentPerfectContinuousLabProps {
  onOpenPdf?: () => void;
}

export const PresentPerfectContinuousLab: React.FC<PresentPerfectContinuousLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'usecases' | 'comparison' | 'practice27' | 'practice28' | 'scans'>('formulas');

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
      .replace(/\s+/g, ' ');
  };

  // State for Formula Sandbox
  const [subjectGroup, setSubjectGroup] = useState<'S1' | 'S2'>('S1'); // S1: I/You/We/They/Plural, S2: She/He/It/Singular
  const [sentenceForm, setSentenceForm] = useState<'pos' | 'neg' | 'ques'>('pos');
  const [isContracted, setIsContracted] = useState(true);
  const [selectedVerbKey, setSelectedVerbKey] = useState<'live' | 'wait' | 'work' | 'study' | 'rain' | 'play'>('wait');

  const verbOptions: Record<string, { base: string; ving: string; vi: string; context: string; object: string }> = {
    wait: { base: 'wait', ving: 'waiting', vi: 'chờ đợi', context: 'for the bus for 4 hours', object: 'xe buýt suốt 4 tiếng' },
    live: { base: 'live', ving: 'living', vi: 'sinh sống', context: 'here for two years', object: 'ở đây được 2 năm' },
    work: { base: 'work', ving: 'working', vi: 'làm việc', context: 'here since 2010', object: 'ở đây từ năm 2010' },
    study: { base: 'study', ving: 'studying', vi: 'học tập miệt mài', context: 'all day', object: 'cả ngày hôm nay' },
    rain: { base: 'rain', ving: 'raining', vi: 'mưa rơi', context: 'for hours', object: 'suốt nhiều giờ liền' },
    play: { base: 'play', ving: 'playing', vi: 'chơi thể thao', context: 'badminton', object: 'cầu lông vừa mới xong' }
  };

  // State for Practice Page 27
  const [p27SubTab, setP27SubTab] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [p27Answers, setP27Answers] = useState<{ [key: string]: string }>({});
  const [p27Feedback, setP27Feedback] = useState<{ [key: string]: boolean }>({});
  const [showP27Solution, setShowP27Solution] = useState<{ [key: string]: boolean }>({});

  // State for Practice Page 28 (Comprehensive 4 Present Tenses)
  const [p28Answers, setP28Answers] = useState<{ [key: string]: string }>({});
  const [p28Feedback, setP28Feedback] = useState<{ [key: string]: boolean }>({});
  const [showP28Solution, setShowP28Solution] = useState<{ [key: string]: boolean }>({});
  const [p28Filter, setP28Filter] = useState<'all' | 'simple' | 'continuous' | 'perfect' | 'perf_cont'>('all');

  // State for Book Scans tab
  const [selectedScanPage, setSelectedScanPage] = useState<26 | 27 | 28>(26);

  // DATA: Practice Page 27 - Part 1 (10 questions)
  const p27Part1 = [
    {
      id: 'p27-1-1',
      prefix: 'She',
      prompt: '(work)',
      suffix: 'in this firm for five years.',
      validAnswers: ['has been working', "'s been working"],
      hint: 'She (S2) + has been + working',
      explanation: 'Chủ ngữ "She" ngôi 3 số ít dùng "has been working". Dấu hiệu "for five years" chỉ hành động kéo dài liên tục.'
    },
    {
      id: 'p27-1-2',
      prefix: 'I',
      prompt: '(study)',
      suffix: 'all day.',
      validAnswers: ['have been studying', "'ve been studying"],
      hint: 'I (S1) + have been + studying',
      explanation: 'Chủ ngữ "I" dùng "have been studying". "All day" nhấn mạnh tính liên tục suốt cả ngày.'
    },
    {
      id: 'p27-1-3',
      prefix: 'Your eyes are red.',
      prompt: '(you / cry)',
      suffix: '?',
      validAnswers: ['have you been crying', "'ve you been crying"],
      hint: 'Câu hỏi với you: Have you been + crying?',
      explanation: 'Đôi mắt đỏ hoe là bằng chứng ở hiện tại của hành động vừa mới xảy ra xong ➔ "Have you been crying?".'
    },
    {
      id: 'p27-1-4',
      prefix: 'We',
      prompt: '(live)',
      suffix: 'in Singapore for six months.',
      validAnswers: ['have been living', "'ve been living"],
      hint: 'We (S1) + have been + living',
      explanation: 'Chủ ngữ "We" dùng "have been living". Live bỏ "e" thêm "ing" ➔ living.'
    },
    {
      id: 'p27-1-5',
      prefix: 'He',
      prompt: '(play)',
      suffix: 'soccer so he looks so tired.',
      validAnswers: ['has been playing', "'s been playing"],
      hint: 'He (S2) + has been + playing',
      explanation: 'Kết quả hiện tại "he looks so tired" (trông rất mệt mỏi) vì vừa mới đá bóng liên tục ➔ "has been playing".'
    },
    {
      id: 'p27-1-6',
      prefix: 'They',
      prompt: '(learn)',
      suffix: 'French for three years.',
      validAnswers: ['have been learning', "'ve been learning"],
      hint: 'They (S1) + have been + learning',
      explanation: 'Hành động học tiếng Pháp kéo dài 3 năm qua và vẫn đang tiếp diễn ➔ "have been learning".'
    },
    {
      id: 'p27-1-7',
      prefix: 'How long',
      prompt: '(she / learn)',
      suffix: 'English? – For over 10 years.',
      validAnswers: ['has she been learning'],
      hint: 'Câu hỏi How long: Has she been learning...?',
      explanation: 'Câu hỏi về độ dài thời gian với "How long" đi với thì HTHTTD ➔ "How long has she been learning English?".'
    },
    {
      id: 'p27-1-8',
      prefix: 'We',
      prompt: '(cook)',
      suffix: 'so we are really hot.',
      validAnswers: ['have been cooking', "'ve been cooking"],
      hint: 'We (S1) + have been + cooking',
      explanation: 'Hiện tại thấy nóng nực ("really hot") do vừa mới nấu nướng liên tục trong bếp ➔ "have been cooking".'
    },
    {
      id: 'p27-1-9',
      prefix: 'My brother',
      prompt: '(sleep)',
      suffix: "for twelve hours. I'm really worried.",
      validAnswers: ['has been sleeping', "'s been sleeping"],
      hint: 'My brother (ngôi số ít S2) + has been + sleeping',
      explanation: 'Chủ ngữ "My brother" số ít dùng "has been sleeping" kéo dài 12 tiếng liên tục.'
    },
    {
      id: 'p27-1-10',
      prefix: "It's so annoying. People",
      prompt: '(phone)',
      suffix: 'me all day.',
      validAnswers: ['have been phoning'],
      hint: 'People (danh từ số nhiều S1) + have been + phoning',
      explanation: 'People là danh từ số nhiều, diễn tả hành động lặp đi lặp lại làm phiền suốt cả ngày ➔ "have been phoning".'
    }
  ];

  // DATA: Practice Page 27 - Part 2 (10 questions)
  const p27Part2 = [
    {
      id: 'p27-2-1',
      prefix: 'I',
      prompt: '(not eat)',
      suffix: 'well recently. I think I should go to see a doctor.',
      validAnswers: ["haven't been eating", 'have not been eating'],
      hint: 'I + have not / haven\'t been + eating',
      explanation: 'Thể phủ định với "I" và từ nhận biết "recently" ➔ "haven\'t been eating well recently".'
    },
    {
      id: 'p27-2-2',
      prefix: 'She',
      prompt: '(go)',
      suffix: 'to the cinema every weekend for years.',
      validAnswers: ['has been going', "'s been going"],
      hint: 'She (S2) + has been + going',
      explanation: 'Thói quen đi xem phim duy trì đều đặn suốt nhiều năm qua ➔ "has been going".'
    },
    {
      id: 'p27-2-3',
      prefix: 'He',
      prompt: '(not play)',
      suffix: 'soccer for five years.',
      validAnswers: ["hasn't been playing", 'has not been playing', "hasn't played"],
      hint: 'He + has not / hasn\'t been + playing',
      explanation: 'Phủ định với "He" và "for five years" ➔ "hasn\'t been playing soccer".'
    },
    {
      id: 'p27-2-4',
      prefix: 'They',
      prompt: '(wait)',
      suffix: 'five hours already.',
      validAnswers: ['have been waiting', "'ve been waiting"],
      hint: 'They (S1) + have been + waiting',
      explanation: 'Họ đã đợi suốt 5 tiếng đồng hồ liên tục ➔ "have been waiting".'
    },
    {
      id: 'p27-2-5',
      prefix: '',
      prompt: '(they / live)',
      suffix: "here for a long time? – No, they haven't. About three weeks.",
      validAnswers: ['have they been living'],
      hint: 'Câu hỏi nghi vấn: Have they been living...?',
      explanation: 'Câu hỏi "Have they been living here for a long time?" ➔ Trả lời "No, they haven\'t".'
    },
    {
      id: 'p27-2-6',
      prefix: '',
      prompt: '(I / do)',
      suffix: 'too much lately? – Yes, you have.',
      validAnswers: ['have i been doing'],
      hint: 'Have I been doing...?',
      explanation: 'Câu hỏi với "lately" ➔ "Have I been doing too much lately?".'
    },
    {
      id: 'p27-2-7',
      prefix: 'We',
      prompt: '(go)',
      suffix: 'out with each other for three years already.',
      validAnswers: ['have been going', "'ve been going"],
      hint: 'We (S1) + have been + going',
      explanation: 'Đi chơi / hẹn hò cùng nhau suốt 3 năm ➔ "have been going out".'
    },
    {
      id: 'p27-2-8',
      prefix: '',
      prompt: '(it / rain)',
      suffix: 'today?',
      validAnswers: ['has it been raining'],
      hint: 'Has it been raining...?',
      explanation: 'Chủ ngữ "it" trong câu hỏi thì HTHTTD ➔ "Has it been raining today?".'
    },
    {
      id: 'p27-2-9',
      prefix: '',
      prompt: '(she / run)',
      suffix: 'much recently?',
      validAnswers: ['has she been running'],
      hint: 'Has she been + running (gấp đôi n)?',
      explanation: 'Chủ ngữ "she", run có CVC gấp đôi phụ âm n ➔ "Has she been running much recently?".'
    },
    {
      id: 'p27-2-10',
      prefix: '',
      prompt: '(Julie / work)',
      suffix: 'in this company for more than ten years?',
      validAnswers: ['has julie been working'],
      hint: 'Has Julie been working...?',
      explanation: 'Julie là ngôi thứ ba số ít ➔ "Has Julie been working in this company for more than ten years?".'
    }
  ];

  // DATA: Practice Page 27 - Part 3 (5 questions with box words: rain, spend, write, learn, make)
  const p27Part3 = [
    {
      id: 'p27-3-1',
      prefix: '1. She',
      blankPrompt: 'learn',
      suffix: 'English for five years.',
      validAnswers: ['has been learning', "'s been learning"],
      hint: 'Chọn từ learn ➔ has been learning',
      explanation: 'Học tiếng Anh suốt 5 năm ➔ dùng động từ "learn": "has been learning".'
    },
    {
      id: 'p27-3-2',
      prefix: '2. It',
      blankPrompt: 'rain',
      suffix: 'so the roads are very wet.',
      validAnswers: ['has been raining', "'s been raining"],
      hint: 'Mặt đường ướt sũng do trời vừa mưa xong ➔ chọn rain',
      explanation: 'Mặt đường ướt nhẹp là kết quả của việc trời vừa mưa liên tục ➔ "has been raining".'
    },
    {
      id: 'p27-3-3',
      prefix: '3. I',
      blankPrompt: 'write',
      suffix: "this book for months, but I haven't finished it yet.",
      validAnswers: ['have been writing', "'ve been writing"],
      hint: 'Viết sách suốt nhiều tháng mà chưa xong ➔ chọn write',
      explanation: 'Đang viết dở cuốn sách suốt mấy tháng qua ➔ "have been writing".'
    },
    {
      id: 'p27-3-4',
      prefix: '4. The people next door',
      blankPrompt: 'make',
      suffix: 'a lot of noise all day.',
      validAnswers: ['have been making'],
      hint: 'Làm ồn cả ngày (make noise) ➔ chọn make',
      explanation: 'Cụm từ "make a lot of noise", chủ ngữ số nhiều ➔ "have been making a lot of noise all day".'
    },
    {
      id: 'p27-3-5',
      prefix: '5. I',
      blankPrompt: 'spend',
      suffix: "my money for a holiday, so I'm out of money.",
      validAnswers: ['have been spending', "'ve been spending"],
      hint: 'Tiêu tiền (spend money) cho kỳ nghỉ nên hết sạch tiền ➔ chọn spend',
      explanation: 'Tiêu tiền liên tục dẫn đến cạn túi ở hiện tại ➔ "have been spending my money".'
    }
  ];

  // DATA: Practice Page 28 (22 comprehensive questions comparing 4 present tenses)
  const p28Questions = [
    {
      id: 1,
      tenseType: 'simple',
      tenseLabel: 'Hiện Tại Đơn',
      prefix: '1. We',
      blankPrompt: '(eat/usually)',
      suffix: 'dinner at 6:00 P.M.',
      validAnswers: ['usually eat'],
      explanation: 'Thói quen lặp đi lặp lại hàng ngày (thường ăn tối lúc 6h) ➔ Hiện tại đơn, trạng từ usually đứng trước động từ thường: "usually eat".'
    },
    {
      id: 2,
      tenseType: 'continuous',
      tenseLabel: 'Tiếp Diễn & Đơn',
      prefix: '2. Look! A man',
      blankPrompt: '(run / want)',
      suffix: 'after the train. He wants to catch it.',
      validAnswers: ['is running', 'is running / wants', 'is running, wants'],
      customBlank1: 'is running',
      explanation: 'Sau câu cảm thán "Look!" dùng Hiện tại tiếp diễn: "is running". Vế sau "want" là động từ chỉ trạng thái (stative verb) luôn chia thì đơn: "wants".'
    },
    {
      id: 3,
      tenseType: 'continuous',
      tenseLabel: 'Tiếp Diễn & Đơn',
      prefix: '3. I',
      blankPrompt: '(do / think / know)',
      suffix: 'on the present tenses at this moment and I think I know how to use them now.',
      validAnswers: ['am doing', "'m doing"],
      explanation: '"at this moment" (ngay lúc này) ➔ Hiện tại tiếp diễn "am doing". Các động từ nhận thức "think", "know" chia hiện tại đơn: "think", "know".'
    },
    {
      id: 4,
      tenseType: 'simple',
      tenseLabel: 'Hiện Tại Đơn',
      prefix: '4. My mother',
      blankPrompt: '(buy/sometimes)',
      suffix: 'vegetables at this market.',
      validAnswers: ['sometimes buys'],
      explanation: 'Chủ ngữ "My mother" ngôi thứ 3 số ít, trạng từ tần suất sometimes đứng trước động từ: "sometimes buys".'
    },
    {
      id: 5,
      tenseType: 'perfect',
      tenseLabel: 'Hoàn Thành / HTHTTD',
      prefix: '5. They',
      blankPrompt: '(live)',
      suffix: 'in Ho Chi Minh City since 1975.',
      validAnswers: ['have lived', 'have been living', "'ve lived", "'ve been living"],
      explanation: '"since 1975" là mốc thời gian trong quá khứ kéo dài đến nay. Với động từ "live", có thể dùng Hiện tại hoàn thành "have lived" hoặc HTHTTD "have been living".'
    },
    {
      id: 6,
      tenseType: 'perf_cont',
      tenseLabel: 'HTHTTD & Hoàn Thành',
      prefix: '6. She',
      blankPrompt: '(wait / not come)',
      suffix: "for two hours, but he hasn't come yet.",
      validAnswers: ['has been waiting', 'has waited', "'s been waiting"],
      explanation: 'Vế đầu nhấn mạnh thời gian chờ suốt 2 tiếng ➔ "has been waiting". Vế sau có từ "yet" (chưa đến) ➔ Hiện tại hoàn thành phủ định "hasn\'t come".'
    },
    {
      id: 7,
      tenseType: 'continuous',
      tenseLabel: 'Tiếp Diễn & Đơn',
      prefix: '7. Daisy',
      blankPrompt: '(cook / always cook)',
      suffix: 'some food in the kitchen at the present. She always cooks in the morning.',
      validAnswers: ['is cooking', "'s cooking"],
      explanation: '"at the present" (hiện tại) ➔ "is cooking". Vế sau có "always" chỉ thói quen ➔ hiện tại đơn "always cooks".'
    },
    {
      id: 8,
      tenseType: 'simple',
      tenseLabel: 'Đơn & Tiếp Diễn',
      prefix: '8. It',
      blankPrompt: '(rain / rain now)',
      suffix: 'much in the summer. It is raining now.',
      validAnswers: ['rains', 'rains / is raining'],
      explanation: 'Vế 1 là chân lý mùa hè hay mưa ➔ Hiện tại đơn "rains". Vế 2 có từ "now" (ngay bây giờ) ➔ Hiện tại tiếp diễn "is raining".'
    },
    {
      id: 9,
      tenseType: 'perfect',
      tenseLabel: 'Hiện Tại Hoàn Thành',
      prefix: '9. John',
      blankPrompt: '(see)',
      suffix: 'the film several times because he likes it.',
      validAnswers: ['has seen', "'s seen"],
      explanation: 'Nói về số lần đã xem ("several times" = vài lần) ➔ Bắt buộc dùng Hiện tại hoàn thành: "has seen".'
    },
    {
      id: 10,
      tenseType: 'perf_cont',
      tenseLabel: 'HTHTTD & HTHT',
      prefix: '10. He and Mary',
      blankPrompt: '(write / not finish)',
      suffix: "a novel for two years, but they haven't finished it yet.",
      validAnswers: ['have been writing', "'ve been writing"],
      explanation: 'Viết tiểu thuyết ròng rã suốt 2 năm qua ➔ "have been writing". Chưa hoàn thành (yet) ➔ "haven\'t finished".'
    },
    {
      id: 11,
      tenseType: 'continuous',
      tenseLabel: 'Hiện Tại Tiếp Diễn',
      prefix: '11. Look! The boy',
      blankPrompt: '(cry)',
      suffix: '.',
      validAnswers: ['is crying', "'s crying"],
      explanation: 'Mệnh lệnh cảm thán "Look!" báo hiệu hành động đang diễn ra trước mắt ➔ "is crying".'
    },
    {
      id: 12,
      tenseType: 'simple',
      tenseLabel: 'Hiện Tại Đơn',
      prefix: '12. Mrs. Green always',
      blankPrompt: '(go)',
      suffix: 'to work by bus.',
      validAnswers: ['goes'],
      explanation: 'Chủ ngữ số ít Mrs. Green, thói quen đi làm có "always", động từ go thêm -es ➔ "goes".'
    },
    {
      id: 13,
      tenseType: 'simple',
      tenseLabel: 'Đơn & Hoàn Thành',
      prefix: '13. We',
      blankPrompt: '(be / live)',
      suffix: 'French. We have lived there for 20 years.',
      validAnswers: ['are', 'are / have lived', 'are / have been living'],
      explanation: 'Chúng tôi là người Pháp (bản chất hiển nhiên) ➔ To Be "are". Đã sống ở đó 20 năm ➔ "have lived" / "have been living".'
    },
    {
      id: 14,
      tenseType: 'perfect',
      tenseLabel: 'Hiện Tại Hoàn Thành',
      prefix: '14. Mai',
      blankPrompt: '(lose)',
      suffix: 'her dictionary.',
      validAnswers: ['has lost', "'s lost"],
      explanation: 'Hành động làm mất từ điển xảy ra không rõ thời điểm nhưng kết quả là hiện tại không có từ điển để dùng ➔ "has lost".'
    },
    {
      id: 15,
      tenseType: 'perfect',
      tenseLabel: 'Đơn & Hoàn Thành',
      prefix: '15. I am sorry. I',
      blankPrompt: '(forget)',
      suffix: "the girl's name already.",
      validAnswers: ['have forgotten', "'ve forgotten"],
      explanation: 'Có từ nhận biết "already" (đã quên mất rồi) ➔ Hiện tại hoàn thành: "have forgotten".'
    },
    {
      id: 16,
      tenseType: 'perfect',
      tenseLabel: 'Hiện Tại Hoàn Thành',
      prefix: '16. How many times',
      blankPrompt: '(you / see)',
      suffix: 'him since he went to Edinburgh?',
      validAnswers: ['have you seen'],
      explanation: 'Hỏi về số lần ("How many times") kể từ khi (since) ➔ Hiện tại hoàn thành: "have you seen".'
    },
    {
      id: 17,
      tenseType: 'simple',
      tenseLabel: 'Hiện Tại Đơn',
      prefix: '17. The summer',
      blankPrompt: '(go / come)',
      suffix: 'after the spring.',
      validAnswers: ['goes', 'comes'],
      explanation: 'Quy luật tự nhiên bất biến (Mùa hè nối tiếp sau mùa xuân) ➔ Hiện tại đơn: "goes" hoặc "comes".'
    },
    {
      id: 18,
      tenseType: 'continuous',
      tenseLabel: 'Hiện Tại Tiếp Diễn',
      prefix: '18. She',
      blankPrompt: '(act)',
      suffix: 'so strangely today.',
      validAnswers: ['is acting', "'s acting"],
      explanation: 'Hành vi khác thường mang tính tạm thời trong ngày hôm nay ("today") ➔ Hiện tại tiếp diễn: "is acting".'
    },
    {
      id: 19,
      tenseType: 'perfect',
      tenseLabel: 'Hiện Tại Hoàn Thành',
      prefix: '19. Up to now, we',
      blankPrompt: '(write)',
      suffix: 'almost every lesson.',
      validAnswers: ['have written', "'ve written"],
      explanation: 'Dấu hiệu nhận biết "Up to now" (Cho đến tận bây giờ) ➔ Hiện tại hoàn thành: "have written".'
    },
    {
      id: 20,
      tenseType: 'simple',
      tenseLabel: 'Hiện Tại Đơn',
      prefix: '20. The earth',
      blankPrompt: '(circle)',
      suffix: 'the sun once every 365 days.',
      validAnswers: ['circles'],
      explanation: 'Chân lý thiên văn khoa học bất biến (Trái đất quay quanh mặt trời 365 ngày một vòng) ➔ Hiện tại đơn: "circles".'
    },
    {
      id: 21,
      tenseType: 'continuous',
      tenseLabel: 'Tiếp Diễn (Bực mình)',
      prefix: '21. He',
      blankPrompt: '(always / leave)',
      suffix: "his things everywhere in the house. It's so annoying.",
      validAnswers: ['is always leaving', "'s always leaving"],
      explanation: 'Thói quen bừa bộn gây bực mình khó chịu ("It\'s so annoying") đi kèm "always" ➔ Cấu trúc HTTD phàn nàn: "is always leaving".'
    },
    {
      id: 22,
      tenseType: 'perf_cont',
      tenseLabel: 'HTHTTD',
      prefix: '22. We',
      blankPrompt: '(work)',
      suffix: 'very hard recently.',
      validAnswers: ['have been working', "'ve been working"],
      explanation: 'Dấu hiệu "recently" nhấn mạnh sự làm việc chăm chỉ liên tục suốt thời gian gần đây ➔ "have been working".'
    }
  ];

  // Scoring handlers for Page 27
  const handleCheckP27 = (id: string, validAnswers: string[]) => {
    const userVal = normalize(p27Answers[id] || '');
    const isCorrect = validAnswers.some(ans => normalize(ans) === userVal);
    setP27Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP27Solution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllP27Part = (list: any[]) => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    list.forEach(q => {
      const userVal = normalize(p27Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some((ans: string) => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP27Feedback(prev => ({ ...prev, ...fb }));
    setShowP27Solution(prev => ({ ...prev, ...sol }));
  };

  const resetP27Part = (list: any[]) => {
    const newAns = { ...p27Answers };
    const newFb = { ...p27Feedback };
    const newSol = { ...showP27Solution };
    list.forEach(q => {
      delete newAns[q.id];
      delete newFb[q.id];
      delete newSol[q.id];
    });
    setP27Answers(newAns);
    setP27Feedback(newFb);
    setShowP27Solution(newSol);
  };

  // Scoring handlers for Page 28
  const handleCheckP28 = (id: number) => {
    const q = p28Questions.find(item => item.id === id);
    if (!q) return;
    const userVal = normalize(p28Answers[id] || '');
    const isCorrect = q.validAnswers.some(ans => normalize(ans) === userVal);
    setP28Feedback(prev => ({ ...prev, [id]: isCorrect }));
    setShowP28Solution(prev => ({ ...prev, [id]: true }));
  };

  const checkAllP28 = () => {
    const fb: { [key: string]: boolean } = {};
    const sol: { [key: string]: boolean } = {};
    p28Questions.forEach(q => {
      const userVal = normalize(p28Answers[q.id] || '');
      fb[q.id] = q.validAnswers.some(ans => normalize(ans) === userVal);
      sol[q.id] = true;
    });
    setP28Feedback(fb);
    setShowP28Solution(sol);
  };

  const resetP28 = () => {
    setP28Answers({});
    setP28Feedback({});
    setShowP28Solution({});
  };

  const p27Score = Object.values(p27Feedback).filter(Boolean).length;
  const p28Score = Object.values(p28Feedback).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-amber-100 mb-3">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Chuyên Đề 11 • Trang 26, 27 & 28 Sách Ngữ Pháp Tiếng Anh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              11. Present Perfect Continuous (Hiện Tại Hoàn Thành Tiếp Diễn)
            </h2>
            <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
              Cấu trúc thần thánh <code className="bg-amber-950/60 px-2 py-0.5 rounded font-mono font-bold text-amber-300">have/has + been + V-ING</code>, 
              nhấn mạnh <span className="font-bold text-white underline decoration-white">tính liên tục</span>, 
              hành động vừa mới dừng lại để lại dấu vết ở hiện tại, kèm <span className="font-bold text-white">Đấu Trường So Sánh 4 Thì Hiện Tại Trang 28</span>!
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 transition-all shadow-md flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Xem Bản Scan Trang 26-28</span>
            </button>
            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="px-4 py-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-950 text-white font-bold text-xs sm:text-sm transition-all border border-amber-300/30 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Mở Sách PDF Gốc</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick summary strip */}
        <div className="mt-6 pt-4 border-t border-amber-400/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-amber-200 block text-[10px] uppercase font-bold">Chủ ngữ S1 (Nhiều)</span>
            <span className="font-bold text-white text-sm">have been + V-ing</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-amber-200 block text-[10px] uppercase font-bold">Chủ ngữ S2 (Ít)</span>
            <span className="font-bold text-white text-sm">has been + V-ing</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-amber-200 block text-[10px] uppercase font-bold">Trọng tâm thì</span>
            <span className="font-bold text-amber-200 text-sm">Nhấn mạnh TÍNH LIÊN TỤC</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-amber-200 block text-[10px] uppercase font-bold">Dấu vết hiện tại</span>
            <span className="font-bold text-amber-200 text-sm">You look hot/tired!</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'formulas'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Bảng Công Thức S1 & S2</span>
        </button>

        <button
          onClick={() => setActiveTab('usecases')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'usecases'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>2. 6 Cách Dùng Kinh Điển</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>3. Đối Chiếu: HTHT vs HTHTTD</span>
        </button>

        <button
          onClick={() => setActiveTab('practice27')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice27'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>4. Thực Hành Trang 27 (25 câu)</span>
          {p27Score > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">{p27Score}/25</span>}
        </button>

        <button
          onClick={() => setActiveTab('practice28')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'practice28'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>5. Tổng Hợp 4 Thì Trang 28 (22 câu)</span>
          {p28Score > 0 && <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">{p28Score}/22</span>}
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'scans'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>6. Bản Scan Gốc (Trang 26-28)</span>
        </button>
      </div>

      {/* TAB 1: FORMULAS EXPLORER */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* Table from Page 26 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                Bảng Công Thức Chuẩn S1 vs S2 (Trích Trang 26 Sách Gốc)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Luôn có cặp đôi: <code className="font-bold text-amber-600">have/has</code> + <code className="font-bold text-indigo-600">been</code> + <code className="font-bold text-emerald-600">V-ing</code>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Thể câu</th>
                    <th className="py-3 px-4 font-bold text-amber-700 dark:text-amber-300">
                      S1 (I, You, We, They, Danh từ số nhiều)
                    </th>
                    <th className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">
                      S2 (She, He, It, Danh từ số ít)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs mr-2">(+) Khẳng định</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">S1 + have + been + V_ING</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • I have been living here for two years.<br />
                        • They've been waiting for the bus for 4 hours.
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">S2 + has + been + V_ING</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • She's been working here since 2010.<br />
                        • I'm so tired. I've been studying.
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-xs mr-2">(-) Phủ định</span>
                      <span className="block text-[11px] text-slate-400 font-normal">Thêm not sau have/has</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-rose-600 dark:text-rose-400">S1 + have not (haven't) + been + V_ING</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • They haven't been walking.<br />
                        • They haven't been sleeping for hours.
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-rose-600 dark:text-rose-400">S2 + has not (hasn't) + been + V_ING</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • She has not been eating anything.<br />
                        • He hasn't been playing tennis for a long time.
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs mr-2">(?) Nghi vấn</span>
                      <span className="block text-[11px] text-slate-400 font-normal">Đưa Have/Has ra đầu</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Have + S1 + been + V_ING ?</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • Have you been watching TV for hours?<br />
                        ➔ Yes, I have / No, I haven't.
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">Has + S2 + been + V_ING ?</div>
                      <div className="text-slate-600 dark:text-slate-400 italic text-xs mt-1">
                        • Has it been raining for hours?<br />
                        ➔ Yes, it has / No, it hasn't.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Formula Builder */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Phòng Thí Nghiệm Lắp Ráp Cấu Trúc (Interactive Sandbox)
                </span>
                <h4 className="text-xl font-extrabold text-white">Thử nghiệm câu khẳng định, phủ định & nghi vấn</h4>
              </div>

              {/* Form buttons */}
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setSentenceForm('pos')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sentenceForm === 'pos' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
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
                    sentenceForm === 'ques' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  (?) Nghi vấn
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Subject Group */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">1. Chọn Chủ Ngữ:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSubjectGroup('S1')}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      subjectGroup === 'S1'
                        ? 'border-amber-500 bg-amber-950/60 text-amber-300 font-bold'
                        : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-white">Nhóm S1</div>
                    <div className="text-[11px]">They / We / You / I</div>
                    <div className="text-[10px] text-amber-400 font-mono mt-1">➔ have been</div>
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
                    <div className="text-[11px]">She / He / It</div>
                    <div className="text-[10px] text-indigo-400 font-mono mt-1">➔ has been</div>
                  </button>
                </div>
              </div>

              {/* Action verb */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">2. Chọn Động Từ V-ing:</label>
                <select
                  value={selectedVerbKey}
                  onChange={(e) => setSelectedVerbKey(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="wait">wait ➔ waiting (chờ đợi)</option>
                  <option value="live">live ➔ living (sinh sống)</option>
                  <option value="work">work ➔ working (làm việc)</option>
                  <option value="study">study ➔ studying (học tập)</option>
                  <option value="rain">rain ➔ raining (mưa)</option>
                  <option value="play">play ➔ playing (chơi)</option>
                </select>
                <div className="text-[11px] text-slate-400 mt-2 px-1">
                  Động từ: <strong className="text-amber-400">{verbOptions[selectedVerbKey].base}</strong> ➔ V-ing: <strong className="text-white">{verbOptions[selectedVerbKey].ving}</strong>
                </div>
              </div>

              {/* Short form */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">3. Viết Tắt (Contraction):</label>
                <button
                  onClick={() => setIsContracted(!isContracted)}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    isContracted
                      ? 'border-amber-500 bg-amber-900/40 text-amber-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{isContracted ? "Đang bật: 've / 's / haven't" : 'Đang tắt: have / has not'}</span>
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px]">Đổi</span>
                </button>
                <p className="text-[11px] text-slate-400 mt-1">
                  Trang 26: <em>They've been waiting</em>, <em>She's been working</em>
                </p>
              </div>
            </div>

            {/* Dynamic Result Box */}
            {(() => {
              const verbInfo = verbOptions[selectedVerbKey];
              let sentenceText = '';
              let vietnamese = '';

              if (sentenceForm === 'pos') {
                if (subjectGroup === 'S1') {
                  const aux = isContracted ? "They've" : "They have";
                  sentenceText = `${aux} been ${verbInfo.ving} ${verbInfo.context}.`;
                  vietnamese = `Họ đã và đang ${verbInfo.vi} ${verbInfo.object}.`;
                } else {
                  const aux = isContracted ? "She's" : "She has";
                  sentenceText = `${aux} been ${verbInfo.ving} ${verbInfo.context}.`;
                  vietnamese = `Cô ấy đã và đang ${verbInfo.vi} ${verbInfo.object}.`;
                }
              } else if (sentenceForm === 'neg') {
                if (subjectGroup === 'S1') {
                  const aux = isContracted ? "haven't" : "have not";
                  sentenceText = `They ${aux} been ${verbInfo.ving} ${verbInfo.context}.`;
                  vietnamese = `Họ không ${verbInfo.vi} ${verbInfo.object} trong suốt thời gian qua.`;
                } else {
                  const aux = isContracted ? "hasn't" : "has not";
                  sentenceText = `She ${aux} been ${verbInfo.ving} ${verbInfo.context}.`;
                  vietnamese = `Cô ấy không ${verbInfo.vi} ${verbInfo.object} trong suốt thời gian qua.`;
                }
              } else {
                if (subjectGroup === 'S1') {
                  sentenceText = `Have you been ${verbInfo.ving} ${verbInfo.context}?`;
                  vietnamese = `Bạn đã ${verbInfo.vi} ${verbInfo.object} suốt thời gian qua phải không?`;
                } else {
                  sentenceText = `Has she been ${verbInfo.ving} ${verbInfo.context}?`;
                  vietnamese = `Cô ấy đã ${verbInfo.vi} ${verbInfo.object} suốt thời gian qua phải không?`;
                }
              }

              return (
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      Cấu Trúc Hoàn Chỉnh:
                    </span>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white tracking-wide">
                      {sentenceText}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      ➔ {vietnamese}
                    </div>
                  </div>

                  <button
                    onClick={() => speak(sentenceText)}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start sm:self-auto"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Phát âm (Audio)</span>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 2: 6 USE CASES */}
      {activeTab === 'usecases' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Lý Thuyết Cốt Lõi Trang 26
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                6 Cách Sử Dụng Kinh Điển Của Thì Hiện Tại Hoàn Thành Tiếp Diễn
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Trích xuất nguyên bản từ giáo trình của thầy Lê Công Đức kèm câu ví dụ và bản dịch tiếng Việt:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Bắt đầu trong quá khứ và sẽ tiếp tục xảy ra tiếp
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Dùng để nhìn lại hành động hoặc tình huống nào đó đã bắt đầu trong quá khứ và sẽ tiếp tục xảy ra tiếp trong tương lai.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"House prices have been growing up steadily this year."</span>
                        <button onClick={() => speak("House prices have been growing up steadily this year.")} className="text-amber-600 hover:text-amber-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Giá nhà đất liên tục tăng đều đặn trong năm nay.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've been working hard recently."</span>
                        <button onClick={() => speak("I've been working hard recently.")} className="text-amber-600 hover:text-amber-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Dạo gần đây tôi đã và đang làm việc rất cật lực.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Nói về việc sử dụng thời gian của ai đó
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Thường sử dụng để nói về cách ai đó đã dùng quỹ thời gian của mình từ một mốc nào đó cho đến thời điểm hiện tại.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"That kid has been watching TV non-stop since breakfast."</span>
                        <button onClick={() => speak("That kid has been watching TV non-stop since breakfast.")} className="text-indigo-600 hover:text-indigo-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Đứa trẻ đó đã dán mắt vào TV không ngừng nghỉ kể từ bữa sáng.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"What have you been doing with yourself? I've been trying to write a novel."</span>
                        <button onClick={() => speak("What have you been doing with yourself? I've been trying to write a novel.")} className="text-indigo-600 hover:text-indigo-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Dạo này làm gì thế? - Tôi đang tập trung viết một cuốn tiểu thuyết.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Hành động chỉ vừa mới kết thúc (Có dấu vết hiện tại)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Diễn tả hành động kéo dài vừa mới dừng lại xong, để lại hiện tượng rõ ràng ngay trước mắt người nói (mồ hôi, người nóng, mắt đỏ, mệt).
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"You look hot. – Yes, I've been playing badminton."</span>
                        <button onClick={() => speak("You look hot. – Yes, I've been playing badminton.")} className="text-rose-600 hover:text-rose-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Trông cậu nóng thế! - Ừ, tôi vừa mới đánh cầu lông xong đấy.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I must just go and wash. I've been gardening."</span>
                        <button onClick={() => speak("I must just go and wash. I've been gardening.")} className="text-rose-600 hover:text-rose-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Tôi phải đi rửa ráy ngay đây. Tôi vừa làm vườn xong (người dính đất).</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      4
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Hoạt động lặp lại liên tục và đang xảy ra
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Diễn tả những hoạt động lặp đi lặp lại nhiều lần suốt một khoảng thời gian, gây ấn tượng hoặc cảm xúc mạnh.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"People have been phoning me all day."</span>
                        <button onClick={() => speak("People have been phoning me all day.")} className="text-emerald-600 hover:text-emerald-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Người ta cứ gọi điện cho tôi suốt cả ngày à.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've been waking up in the night a lot. I must see a doctor."</span>
                        <button onClick={() => speak("I've been waking up in the night a lot. I must see a doctor.")} className="text-emerald-600 hover:text-emerald-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Dạo này tôi hay bị giật mình thức giấc giữa đêm nhiều quá.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                      5
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Đi với các cụm từ chỉ khoảng thời gian kéo dài tới nay
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Thường đi với: <code>recently</code>, <code>lately</code>, <code>this week</code>, <code>since + mốc</code>, <code>for + khoảng</code>.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've been doing a new job since January."</span>
                        <button onClick={() => speak("I've been doing a new job since January.")} className="text-teal-600 hover:text-teal-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Tôi đã bắt đầu công việc mới kể từ tháng giêng đến nay.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"It's been raining for the last three days."</span>
                        <button onClick={() => speak("It's been raining for the last three days.")} className="text-teal-600 hover:text-teal-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Trời đã mưa suốt ba ngày qua liên tục.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                      6
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Hỏi và trả lời hành động đã diễn ra trong bao lâu (How long)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Đặc trưng nhất là câu hỏi với <strong>How long</strong> để hỏi về độ dài thời gian tính đến nay.
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"How long have you been studying English? – For over 10 years."</span>
                        <button onClick={() => speak("How long have you been studying English? – For over 10 years.")} className="text-purple-600 hover:text-purple-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Bạn học tiếng Anh được bao lâu rồi? – Hơn 10 năm qua rồi.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>"I've been working here for two months."</span>
                        <button onClick={() => speak("I've been working here for two months.")} className="text-purple-600 hover:text-purple-700">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">➔ Tôi đã làm việc ở đây được hai tháng rồi.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPARISON (HTHT vs HTHTTD) */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Bí Quyết Phân Biệt Sống Còn
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Hiện Tại Hoàn Thành (HTHT) vs Hiện Tại Hoàn Thành Tiếp Diễn (HTHTTD)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Làm sao để không bao giờ bị nhầm lẫn giữa 2 thì này trong bài kiểm tra?
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* HTHT Card */}
              <div className="p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs uppercase">
                    HTHT
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Hiện Tại Hoàn Thành (have/has + V3)
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                    <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">🎯 TRỌNG TÂM: KẾT QUẢ ĐÃ XONG</strong>
                    Nhấn mạnh vào việc hành động <em>đã hoàn tất</em> và kết quả hoặc số lượng thành phẩm tạo ra.
                  </div>

                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li>Hỏi <strong>How much / How many / How many times</strong> (Bao nhiêu lần, bao nhiêu cái).</li>
                    <li>Ví dụ: <em>"She has written six letters."</em> (Nhấn mạnh đã viết xong 6 lá thư).</li>
                    <li>Ví dụ: <em>"John has seen that film 3 times."</em> (Nhấn mạnh số lần xem).</li>
                  </ul>
                </div>
              </div>

              {/* HTHTTD Card */}
              <div className="p-6 rounded-2xl border-2 border-amber-400 bg-amber-50/40 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-mono font-bold text-xs uppercase">
                    HTHTTD
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Hiện Tại Hoàn Thành Tiếp Diễn (have/has + been + V-ing)
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
                    <strong className="text-amber-700 dark:text-amber-300 block mb-1">⏳ TRỌNG TÂM: QUÁ TRÌNH & TÍNH LIÊN TỤC</strong>
                    Nhấn mạnh hành động <em>kéo dài liên tục</em>, có thể chưa xong, hoặc vừa mới dừng để lại dấu vết.
                  </div>

                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li>Hỏi <strong>How long</strong> (Bao lâu rồi).</li>
                    <li>Ví dụ: <em>"She has been writing letters all morning."</em> (Viết thư miệt mài cả buổi sáng).</li>
                    <li>Ví dụ: <em>"He has been playing soccer so he looks tired."</em> (Đá bóng nên mệt đứt hơi).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Note on Stative Verbs */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>LƯU Ý CỰC KỲ QUAN TRỌNG: ĐỘNG TỪ CHỈ TRẠNG THÁI (STATIVE VERBS)</strong>
                <p className="mt-1 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  Các động từ tri giác, sở hữu, cảm xúc như: <code>know, want, like, love, understand, believe, hear, belong to...</code> 
                  <strong>KHÔNG BAO GIỜ</strong> chia ở thì tiếp diễn (không có <em>"have been knowing"</em> hay <em>"is wanting"</em>). 
                  Khi muốn diễn tả hành động kéo dài đến nay với các động từ này, ta bắt buộc phải dùng <strong>Hiện Tại Hoàn Thành (have/has + V3)</strong>!
                  <br />
                  Ví dụ: <em>"I have known him for ten years"</em> (ĐÚNG) – KHÔNG NÓI: <em>"I have been knowing him..."</em> (SAI).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE PAGE 27 */}
      {activeTab === 'practice27' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            {/* Header & Subtabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Thực Hành Toàn Diện • Trang 27 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Bài Tập Thực Hành Hiện Tại Hoàn Thành Tiếp Diễn
                </h3>
              </div>

              {/* Subtabs for Part 1, 2, 3 */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setP27SubTab('part1')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    p27SubTab === 'part1' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 1 (10 câu)
                </button>
                <button
                  onClick={() => setP27SubTab('part2')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    p27SubTab === 'part2' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 2 (10 câu)
                </button>
                <button
                  onClick={() => setP27SubTab('part3')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    p27SubTab === 'part3' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bài 3 (5 câu khung)
                </button>
              </div>
            </div>

            {/* PART 1 */}
            {p27SubTab === 'part1' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>1. Chia thì hiện tại hoàn thành tiếp diễn với những từ trong ngoặc</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllP27Part(p27Part1)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500"
                    >
                      Chấm Bài 1
                    </button>
                    <button
                      onClick={() => resetP27Part(p27Part1)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {p27Part1.map((q, idx) => {
                  const userAns = p27Answers[q.id] || '';
                  const isChecked = showP27Solution[q.id];
                  const isCorrect = p27Feedback[q.id];

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
                            {q.prefix && <span>{q.prefix} </span>}
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{q.prompt}</span>
                            {q.suffix && <span> {q.suffix}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setP27Answers({ ...p27Answers, [q.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckP27(q.id, q.validAnswers);
                            }}
                            placeholder="Nhập đáp án..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 w-48"
                          />
                          <button
                            onClick={() => handleCheckP27(q.id, q.validAnswers)}
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
            {p27SubTab === 'part2' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500">
                    <strong>2. Hoàn thành thì hiện tại hoàn thành tiếp diễn với các cụm từ recently, lately, this week, since, for...</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllP27Part(p27Part2)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500"
                    >
                      Chấm Bài 2
                    </button>
                    <button
                      onClick={() => resetP27Part(p27Part2)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {p27Part2.map((q, idx) => {
                  const userAns = p27Answers[q.id] || '';
                  const isChecked = showP27Solution[q.id];
                  const isCorrect = p27Feedback[q.id];

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
                            {q.prefix && <span>{q.prefix} </span>}
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{q.prompt}</span>
                            {q.suffix && <span> {q.suffix}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setP27Answers({ ...p27Answers, [q.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckP27(q.id, q.validAnswers);
                            }}
                            placeholder="Nhập đáp án..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 w-48"
                          />
                          <button
                            onClick={() => handleCheckP27(q.id, q.validAnswers)}
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

            {/* PART 3 */}
            {p27SubTab === 'part3' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500">
                      <strong>3. Hoàn thành câu với thì HTHTTD với những từ trong khung sao cho phù hợp ngữ cảnh:</strong>
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 font-mono font-bold text-xs text-amber-900 dark:text-amber-200">
                        rain • spend • write • learn • make
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkAllP27Part(p27Part3)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500"
                    >
                      Chấm Bài 3
                    </button>
                    <button
                      onClick={() => resetP27Part(p27Part3)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Làm Lại
                    </button>
                  </div>
                </div>

                {p27Part3.map((q) => {
                  const userAns = p27Answers[q.id] || '';
                  const isChecked = showP27Solution[q.id];
                  const isCorrect = p27Feedback[q.id];

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
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.prefix} </span>
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">______</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setP27Answers({ ...p27Answers, [q.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckP27(q.id, q.validAnswers);
                            }}
                            placeholder="Nhập cụm have/has been V-ing..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 w-52"
                          />
                          <button
                            onClick={() => handleCheckP27(q.id, q.validAnswers)}
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
          </div>
        </div>
      )}

      {/* TAB 5: PRACTICE PAGE 28 (COMPREHENSIVE 4 PRESENT TENSES) */}
      {activeTab === 'practice28' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Đấu Trường Tổng Hợp • Trang 28 Sách Gốc
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  BÀI TẬP ÁP DỤNG: Điền Thì Thích Hợp Trong 4 Thì Hiện Tại
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Chọn giữa: <strong>Hiện Tại Đơn</strong> • <strong>Hiện Tại Tiếp Diễn</strong> • <strong>Hiện Tại Hoàn Thành</strong> • <strong>Hiện Tại Hoàn Thành Tiếp Diễn</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={checkAllP28}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Chấm Tất Cả (22 câu)</span>
                </button>
                <button
                  onClick={resetP28}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm Lại</span>
                </button>
              </div>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs font-semibold">
              <span className="text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Lọc theo thì:
              </span>
              <button
                onClick={() => setP28Filter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  p28Filter === 'all' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Tất cả (22)
              </button>
              <button
                onClick={() => setP28Filter('simple')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  p28Filter === 'simple' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Hiện tại đơn
              </button>
              <button
                onClick={() => setP28Filter('continuous')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  p28Filter === 'continuous' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Hiện tại tiếp diễn
              </button>
              <button
                onClick={() => setP28Filter('perfect')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  p28Filter === 'perfect' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Hiện tại hoàn thành
              </button>
              <button
                onClick={() => setP28Filter('perf_cont')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  p28Filter === 'perf_cont' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                HTHT tiếp diễn
              </button>
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {p28Questions
                .filter(q => p28Filter === 'all' || q.tenseType === p28Filter)
                .map((q) => {
                  const userAns = p28Answers[q.id] || '';
                  const isChecked = showP28Solution[q.id];
                  const isCorrect = p28Feedback[q.id];

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
                            <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{q.blankPrompt}</span>
                            <span> {q.suffix}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => setP28Answers({ ...p28Answers, [q.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckP28(q.id);
                            }}
                            placeholder="Nhập thì thích hợp..."
                            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 w-48"
                          />
                          <button
                            onClick={() => handleCheckP28(q.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-slate-900"
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

                          <div className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 self-end sm:self-auto">
                            {q.tenseLabel}
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

      {/* TAB 6: SCANS (PAGE 26, 27, 28) */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Tài Liệu Gốc • Bản Chụp Sách Thật
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Trang 26, 27 & 28 - Sách Ngữ Pháp Tiếng Anh (Lê Công Đức)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Đối chiếu nguyên vẹn lý thuyết, thực hành HTHTTD và bài tập áp dụng 4 thì
                </p>
              </div>

              {/* Page Toggle */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto flex-wrap gap-1">
                <button
                  onClick={() => setSelectedScanPage(26)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 26
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Trang 26 (Lý thuyết)</span>
                </button>
                <button
                  onClick={() => setSelectedScanPage(27)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 27
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trang 27 (Thực hành)</span>
                </button>
                <button
                  onClick={() => setSelectedScanPage(28)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    selectedScanPage === 28
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Trang 28 (Tổng hợp 4 thì)</span>
                </button>
              </div>
            </div>

            {/* Scan Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 flex flex-col items-center">
              <div className="mb-3 w-full flex items-center justify-between text-xs text-slate-500 px-2">
                <span>
                  Đang xem: <strong>Trang {selectedScanPage} / 196</strong>
                </span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  Tập tin ảnh gốc: {
                    selectedScanPage === 26 ? 'image_f5bd6f7f.png' :
                    selectedScanPage === 27 ? 'image_2fc7a3a1.png' :
                    'image_b07a49d5.png'
                  }
                </span>
              </div>

              <div className="max-w-2xl w-full shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                <img
                  src={
                    selectedScanPage === 26 ? '/assets/aistudio/image_f5bd6f7f.png' :
                    selectedScanPage === 27 ? '/assets/aistudio/image_2fc7a3a1.png' :
                    '/assets/aistudio/image_b07a49d5.png'
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
