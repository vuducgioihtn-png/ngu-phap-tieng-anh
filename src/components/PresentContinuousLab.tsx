import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  Flame, 
  BookOpen, 
  HelpCircle,
  Eye,
  Clock,
  Zap,
  Info
} from 'lucide-react';

interface PresentContinuousLabProps {
  onOpenPdf?: () => void;
}

export const PresentContinuousLab: React.FC<PresentContinuousLabProps> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'rules' | 'usecases' | 'practice1' | 'practice2' | 'practice3' | 'scans'>('formulas');

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

  // State for Formula Explorer
  const [subjectGroup, setSubjectGroup] = useState<'I' | 'S1' | 'S2'>('S1'); // S1: We/You/They, S2: He/She/It
  const [sentenceForm, setSentenceForm] = useState<'pos' | 'neg' | 'ques'>('pos');
  const [isContracted, setIsContracted] = useState(true);
  const [selectedVerb, setSelectedVerb] = useState('study');

  // State for V-ing Rules Explorer
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<'normal' | 'silent_e' | 'double_consonant' | 'ie_to_y'>('silent_e');

  // State for Practice 1 (10 questions - Page 22)
  const [p1Answers, setP1Answers] = useState<Record<string, string>>({});
  const [p1Feedback, setP1Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP1Solution, setShowP1Solution] = useState<{ [key: number]: boolean }>({});

  // State for Practice 2 (5 dialogue complaining questions - Page 22)
  const [p2Answers, setP2Answers] = useState<{ [key: number]: string }>({});
  const [p2Feedback, setP2Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP2Solution, setShowP2Solution] = useState<{ [key: number]: boolean }>({});

  // State for Practice 3 (7 trend questions - Page 23)
  const [p3Answers, setP3Answers] = useState<{ [key: number]: string }>({});
  const [p3Feedback, setP3Feedback] = useState<{ [key: number]: boolean }>({});
  const [showP3Solution, setShowP3Solution] = useState<{ [key: number]: boolean }>({});

  // State for Book Scans tab
  const [selectedScanPage, setSelectedScanPage] = useState<21 | 22 | 23>(21);

  // V-ing rules examples
  const vingRules = {
    normal: {
      title: '1. Đa số động từ bình thường: Thêm -ing',
      rule: 'V + ing',
      examples: [
        { base: 'work', result: 'working', vi: 'đang làm việc', note: 'work + ing' },
        { base: 'study', result: 'studying', vi: 'đang học tập', note: 'giữ nguyên y rồi thêm ing' },
        { base: 'play', result: 'playing', vi: 'đang chơi', note: 'play + ing' },
        { base: 'watch', result: 'watching', vi: 'đang xem', note: 'watch + ing' },
        { base: 'sing', result: 'singing', vi: 'đang hát', note: 'sing + ing' }
      ]
    },
    silent_e: {
      title: '2. Tận cùng là 1 chữ "e" câm: BỎ "e" rồi thêm -ing',
      rule: 'V (bỏ e) + ing',
      examples: [
        { base: 'come', result: 'coming', vi: 'đang đến', note: 'bỏ e → coming (Look! The bus is coming)' },
        { base: 'take', result: 'taking', vi: 'đang tham gia / lấy', note: 'bỏ e → taking' },
        { base: 'rehearse', result: 'rehearsing', vi: 'đang diễn tập', note: 'bỏ e → rehearsing (Trang 22)' },
        { base: 'phone', result: 'phoning', vi: 'đang gọi điện', note: 'bỏ e → phoning' },
        { base: 'become', result: 'becoming', vi: 'đang trở nên', note: 'bỏ e → becoming' },
        { base: 'change', result: 'changing', vi: 'đang thay đổi', note: 'bỏ e → changing' }
      ]
    },
    double_consonant: {
      title: '3. 1 nguyên âm kẹp giữa 2 phụ âm (CVC) & trọng âm rơi vào: GẤP ĐÔI phụ âm cuối',
      rule: 'Phụ âm + Nguyên âm + Phụ âm → Gấp đôi phụ âm cuối + ing',
      examples: [
        { base: 'sit', result: 'sitting', vi: 'đang ngồi', note: 's-i-t → gấp đôi t: sitting (Trang 22 câu 8)' },
        { base: 'get', result: 'getting', vi: 'đang dần trở nên', note: 'g-e-t → gấp đôi t: getting (Trang 21, 23)' },
        { base: 'run', result: 'running', vi: 'đang chạy', note: 'r-u-n → gấp đôi n: running' },
        { base: 'swim', result: 'swimming', vi: 'đang bơi', note: 's-w-i-m → gấp đôi m: swimming' },
        { base: 'stop', result: 'stopping', vi: 'đang dừng lại', note: 's-t-o-p → gấp đôi p: stopping' }
      ]
    },
    ie_to_y: {
      title: '4. Tận cùng bằng đuôi "ie": Đổi "ie" thành "y" rồi thêm -ing',
      rule: 'đuôi -ie → -y + ing',
      examples: [
        { base: 'lie', result: 'lying', vi: 'đang nằm / đang nói dối', note: 'lie → lying' },
        { base: 'die', result: 'dying', vi: 'đang hấp hối', note: 'die → dying' },
        { base: 'tie', result: 'tying', vi: 'đang cột / thắt', note: 'tie → tying' }
      ]
    }
  };

  // 6 Use Cases Data from Page 21
  const useCases = [
    {
      id: 1,
      badge: 'Cách dùng 1',
      title: 'Đang diễn ra ngay tại thời điểm nói',
      icon: '⚡',
      color: 'blue',
      markers: ['now', 'right now', 'at the moment', 'at the present'],
      examples: [
        {
          en: 'They are playing football in the school yard now.',
          vi: 'Họ đang chơi bóng đá trong sân trường bây giờ.',
          context: 'Hành động sút bóng đang đập vào mắt người nói ngay lúc này.'
        },
        {
          en: 'She is talking to a strange man.',
          vi: 'Cô ấy đang nói chuyện với một người đàn ông lạ mặt.',
          context: 'Việc nói chuyện đang tiếp diễn trước mắt.'
        }
      ]
    },
    {
      id: 2,
      badge: 'Cách dùng 2',
      title: 'Hành động mang tính chất tạm thời',
      icon: '⏳',
      color: 'amber',
      markers: ['today', 'this week', 'these days', 'just for today', 'for a few days'],
      examples: [
        {
          en: 'He is staying with his friend for a few days.',
          vi: 'Anh ấy đang ở trọ với bạn vài ngày (tạm thời, không phải nhà cố định).',
          context: 'Chỉ ở vài ngày rồi sẽ chuyển về nhà mình.'
        },
        {
          en: "She isn't working today.",
          vi: 'Hôm nay cô ấy không đi làm (nghỉ phép/ốm tạm thời hôm nay).',
          context: 'Bình thường cô ấy vẫn đi làm, chỉ hôm nay tạm nghỉ.'
        },
        {
          en: 'He is sitting here just for today because his room is being repaired.',
          vi: 'Hôm nay cậu ấy ngồi tạm ở đây vì phòng cậu ấy đang được sửa.',
          context: 'Ví dụ chuẩn trích từ bài thực hành 1 câu 8 - Trang 22.'
        }
      ]
    },
    {
      id: 3,
      badge: 'Cách dùng 3',
      title: 'Kế hoạch tương lai đã ấn định & chuẩn bị cụ thể',
      icon: '📅',
      color: 'emerald',
      markers: ['this afternoon', 'tonight', 'tomorrow morning', 'next Friday'],
      examples: [
        {
          en: 'I am playing tennis this afternoon with my teacher.',
          vi: 'Chiều nay tôi sẽ chơi quần vợt với thầy giáo tôi.',
          context: 'Đã hẹn trước với thầy, chuẩn bị vợt và đặt sân sẵn.'
        },
        {
          en: 'We are meeting them at 7 tonight.',
          vi: 'Chúng tôi sẽ gặp họ lúc 7 giờ tối nay.',
          context: 'Đã thống nhất thời gian và địa điểm gặp mặt.'
        }
      ]
    },
    {
      id: 4,
      badge: 'Cách dùng 4',
      title: 'Sau câu mệnh lệnh gây chú ý đột ngột',
      icon: '🚨',
      color: 'rose',
      markers: ['Look!', 'Listen!', 'Be quiet!', 'Hurry up!', 'Be hurry!'],
      examples: [
        {
          en: 'Be quiet! The babies are sleeping now.',
          vi: 'Trật tự nào! Các em bé đang ngủ bây giờ.',
          context: 'Yêu cầu im lặng vì tiếng ồn làm phiền em bé đang ngủ.'
        },
        {
          en: 'Look! The bus is coming. Be hurry!',
          vi: 'Nhìn kìa! Xe buýt đang tới. Nhanh lên nào!',
          context: 'Chiếc xe buýt đang lăn bánh tới trước mắt.'
        },
        {
          en: 'Listen! Someone is singing in the room.',
          vi: 'Nghe kìa! Ai đó đang hát trong phòng.',
          context: 'Tiếng hát đang phát ra ngay thời điểm nói.'
        }
      ]
    },
    {
      id: 5,
      badge: 'Cách dùng 5',
      title: 'Hành động xảy ra thường xuyên đến mức GÂY BỰC MÌNH (với ALWAYS)',
      icon: '😤',
      color: 'purple',
      markers: ['is / are ALWAYS + V-ing', 'phàn nàn', 'khó chịu', 'thói quen xấu'],
      examples: [
        {
          en: 'He is always asking stupid questions.',
          vi: 'Hắn ta lúc nào cũng hỏi những câu ngớ ngẩn (khiến người khác phát cáu).',
          context: 'Không chỉ là thói quen mà còn thể hiện thái độ bực mình của người nói.'
        },
        {
          en: 'Why are you always annoyed with Peter? - Because he is always borrowing my pens.',
          vi: 'Sao cậu lúc nào cũng bực mình với Peter thế? - Vì nó suốt ngày mượn bút của tớ!',
          context: 'Mượn liên tục không chịu mua bút riêng khiến đối phương rất phiền.'
        },
        {
          en: "Because he is always forgetting where they are.",
          vi: 'Vì anh ấy lúc nào cũng quên mất chìa khóa ở đâu.',
          context: 'Bài tập 2 câu 4 Trang 22.'
        }
      ]
    },
    {
      id: 6,
      badge: 'Cách dùng 6',
      title: 'Sự biến đổi, phát triển hoặc xu hướng đang dần thay đổi',
      icon: '📈',
      color: 'cyan',
      markers: ['get', 'become', 'change', 'rise', 'fall', 'increase', 'grow'],
      examples: [
        {
          en: "It's getting darker.",
          vi: 'Trời đang tối dần rồi.',
          context: 'Ánh sáng mặt trời đang chuyển dần sang ban đêm.'
        },
        {
          en: 'The air is becoming more polluted every day.',
          vi: 'Không khí đang ngày càng trở nên ô nhiễm hơn mỗi ngày.',
          context: 'Tình trạng ô nhiễm gia tăng liên tục theo thời gian.'
        },
        {
          en: 'More and more people are going abroad for higher education.',
          vi: 'Ngày càng nhiều người đi du học để nâng cao trình độ.',
          context: 'Xu hướng xã hội đang tăng lên rõ rệt.'
        },
        {
          en: "The earth's climate is getting warmer.",
          vi: 'Khí hậu trái đất đang dần ấm lên.',
          context: 'Hiện tượng nóng lên toàn cầu.'
        }
      ]
    }
  ];

  // Helper for checking answers flexibly
  const cleanStr = (s: string) => {
    return (s || '')
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ');
  };

  // Check Practice 1 (10 sentences - Page 22)
  const p1Questions = [
    {
      id: 1,
      prefix: '1. They',
      inputHint: 'chia work',
      suffix: 'very hard for their coming exams.',
      correct: ['are working'],
      vietnamese: 'Họ đang học tập rất chăm chỉ cho các kỳ thi sắp tới.',
      rule: 'Chủ ngữ "They" (số nhiều) đi với "are" + V-ing ("working").'
    },
    {
      id: 2,
      prefix: '2. My aunt, Jane',
      inputHint: 'chia not listen',
      middle: 'to music, she',
      inputHint2: 'chia study',
      suffix: 'English.',
      isDouble: true,
      correct1: ["isn't listening", "is not listening"],
      correct2: ["is studying"],
      vietnamese: 'Dì của tôi, Jane, không phải đang nghe nhạc, cô ấy đang học tiếng Anh.',
      rule: 'My aunt Jane là ngôi 3 số ít: isn\'t listening và is studying.'
    },
    {
      id: 3,
      prefix: '3. The air',
      inputHint: 'chia become',
      suffix: 'more polluted every day.',
      correct: ['is becoming'],
      vietnamese: 'Không khí đang ngày càng trở nên ô nhiễm hơn mỗi ngày.',
      rule: 'The air (danh từ không đếm được số ít) + is becoming (bỏ đuôi e khi thêm ing).'
    },
    {
      id: 4,
      prefix: '4.',
      inputHint: 'What / they / discuss',
      suffix: 'in this summit?',
      correct: ['what are they discussing', 'are they discussing'],
      vietnamese: 'Họ đang thảo luận điều gì trong hội nghị thượng đỉnh này?',
      rule: 'Câu hỏi có từ để hỏi: What + are + they + discussing...? (discuss + ing).'
    },
    {
      id: 5,
      prefix: '5. More women',
      inputHint: 'chia study',
      suffix: 'at university these days.',
      correct: ['are studying'],
      vietnamese: 'Ngày càng nhiều phụ nữ học đại học vào thời gian này.',
      rule: 'Women là danh từ số nhiều bất quy tắc của woman ➔ đi với are studying.'
    },
    {
      id: 6,
      prefix: '6. My friends',
      inputHint: 'chia take',
      suffix: 'an English course to improve their language skills.',
      correct: ['are taking'],
      vietnamese: 'Những người bạn của tôi đang tham gia một khóa học tiếng Anh để nâng cao kỹ năng ngôn ngữ.',
      rule: 'My friends là số nhiều + are taking (take bỏ chữ e câm trước khi thêm ing).'
    },
    {
      id: 7,
      prefix: '7. We',
      inputHint: 'chia rehearse',
      suffix: 'a play for our school anniversary celebration.',
      correct: ['are rehearsing'],
      vietnamese: 'Chúng tôi đang tập dượt một vở kịch cho lễ kỷ niệm ngày thành lập trường.',
      rule: 'We đi với are + rehearsing (bỏ e câm thêm ing).'
    },
    {
      id: 8,
      prefix: '8. He',
      inputHint: 'chia sit',
      suffix: 'here just for today because his room is being repaired.',
      correct: ['is sitting'],
      vietnamese: 'Hôm nay cậu ấy ngồi tạm ở đây vì phòng của cậu ấy đang được sửa.',
      rule: 'Sit có cấu trúc phụ âm - nguyên âm - phụ âm (s-i-t) ➔ gấp đôi t: is sitting.'
    },
    {
      id: 9,
      prefix: '9.',
      inputHint: 'where / he / go',
      suffix: '?',
      correct: ['where is he going', 'is he going'],
      vietnamese: 'Anh ấy đang đi đâu vậy?',
      rule: 'Câu hỏi Wh- với chủ ngữ he: Where + is + he + going?'
    },
    {
      id: 10,
      prefix: '10. Look! The bus',
      inputHint: 'chia come',
      suffix: '. Be hurry!',
      correct: ['is coming'],
      vietnamese: 'Nhìn kìa! Xe buýt đang tới. Nhanh lên nào!',
      rule: 'Sau câu cảm thán Look! + The bus số ít ➔ is coming (come bỏ e thêm ing).'
    }
  ];

  // Check Practice 2 (Page 22 - Always + V-ing complaining)
  const p2Questions = [
    {
      id: 1,
      prompt: '1. Why don\'t you like Tom? – (Because he / always / tell / stupid stories)',
      modelAnswer: 'Because he is always telling stupid stories.',
      validList: ['because he is always telling stupid stories', 'he is always telling stupid stories'],
      vi: 'Vì hắn lúc nào cũng kể những câu chuyện ngớ ngẩn.',
      isSample: true
    },
    {
      id: 2,
      prompt: '2. Why are you always annoyed with Peter? – (Because he / always / borrow / my pens)',
      modelAnswer: 'Because he is always borrowing my pens.',
      validList: [
        'because he is always borrowing my pens',
        'he is always borrowing my pens',
        'because hes always borrowing my pens'
      ],
      vi: 'Bởi vì nó lúc nào cũng mượn bút của tớ.'
    },
    {
      id: 3,
      prompt: '3. Why don\'t you like talking to Susan? – (Because she / always / talk about herself)',
      modelAnswer: 'Because she is always talking about herself.',
      validList: [
        'because she is always talking about herself',
        'she is always talking about herself',
        'because shes always talking about herself'
      ],
      vi: 'Bởi vì cô ta lúc nào cũng chỉ biết nói về bản thân mình.'
    },
    {
      id: 4,
      prompt: '4. Why don\'t you let Tom keep the keys? – (Because he / always / forget where they are)',
      modelAnswer: 'Because he is always forgetting where they are.',
      validList: [
        'because he is always forgetting where they are',
        'he is always forgetting where they are',
        'because hes always forgetting where they are'
      ],
      vi: 'Bởi vì anh ấy lúc nào cũng quên mất chìa khóa ở đâu (forget gấp đôi t ➔ forgetting).'
    },
    {
      id: 5,
      prompt: '5. Why do you turn off your phone at night? – (Because a boy / always / phone / me at night)',
      modelAnswer: 'Because a boy is always phoning me at night.',
      validList: [
        'because a boy is always phoning me at night',
        'a boy is always phoning me at night'
      ],
      vi: 'Bởi vì có một thằng nhóc đêm nào cũng gọi điện quấy rầy tôi (phone bỏ e ➔ phoning).'
    }
  ];

  // Practice 3 (Page 23 - Trends: get, change, rise, fall, increase)
  const p3Questions = [
    {
      id: 1,
      prefix: '1. The pollution of the world',
      suffix: 'very fast.',
      correct: ['is increasing', 'is rising', 'is getting worse'],
      preferred: 'is increasing',
      vi: 'Tình trạng ô nhiễm của thế giới đang gia tăng rất nhanh chóng.'
    },
    {
      id: 2,
      prefix: '2. Your son',
      suffix: 'taller. He looks like a real man.',
      correct: ['is getting', 'is growing'],
      preferred: 'is getting',
      vi: 'Con trai của bạn đang cao lớn dần lên. Cậu bé trông như một người đàn ông thực thụ.'
    },
    {
      id: 3,
      prefix: '3. The world',
      suffix: '. Things never stay the same.',
      correct: ['is changing'],
      preferred: 'is changing',
      vi: 'Thế giới đang thay đổi từng ngày. Vạn vật không bao giờ đứng yên.'
    },
    {
      id: 4,
      prefix: '4. The sky',
      suffix: 'darker. It\'s going to rain soon.',
      correct: ['is getting'],
      preferred: 'is getting',
      vi: 'Bầu trời đang tối dần lại. Trời sắp đổ mưa rồi.'
    },
    {
      id: 5,
      prefix: '5. The cost of living',
      suffix: '. Every year things are more expensive.',
      correct: ['is rising', 'is increasing'],
      preferred: 'is rising',
      vi: 'Chi phí sinh hoạt đang tăng lên. Mỗi năm mọi thứ lại đắt đỏ hơn.'
    },
    {
      id: 6,
      prefix: '6. The earth\'s climate',
      suffix: 'warmer.',
      correct: ['is getting', 'is becoming', 'is changing'],
      preferred: 'is getting',
      vi: 'Khí hậu của trái đất đang dần ấm lên.'
    },
    {
      id: 7,
      prefix: '7. Fashion',
      suffix: 'all the time these days.',
      correct: ['is changing'],
      preferred: 'is changing',
      vi: 'Thời trang đang thay đổi liên tục trong thời đại ngày nay.'
    }
  ];

  const handleCheckP1 = (qId: number) => {
    const val = cleanStr(p1Answers[qId] || '');
    const q = p1Questions.find(item => item.id === qId);
    if (!q) return;

    if (q.isDouble) {
      // Split or check compound
      const ans1 = cleanStr(p1Answers[`${qId}_1`] || '');
      const ans2 = cleanStr(p1Answers[`${qId}_2`] || '');
      const ok1 = q.correct1?.some(c => cleanStr(c) === ans1);
      const ok2 = q.correct2?.some(c => cleanStr(c) === ans2);
      setP1Feedback(prev => ({ ...prev, [qId]: !!(ok1 && ok2) }));
    } else {
      const isOk = (q.correct || []).some(c => cleanStr(c) === val);
      setP1Feedback(prev => ({ ...prev, [qId]: isOk }));
    }
  };

  const handleCheckP2 = (qId: number) => {
    const val = cleanStr(p2Answers[qId] || '');
    const q = p2Questions.find(item => item.id === qId);
    if (!q) return;
    const isOk = q.validList.some(c => cleanStr(c) === val);
    setP2Feedback(prev => ({ ...prev, [qId]: isOk }));
  };

  const handleCheckP3 = (qId: number) => {
    const val = cleanStr(p3Answers[qId] || '');
    const q = p3Questions.find(item => item.id === qId);
    if (!q) return;
    const isOk = q.correct.some(c => cleanStr(c) === val);
    setP3Feedback(prev => ({ ...prev, [qId]: isOk }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyên Đề 9: Trang 21, 22, 23 (Giáo trình Lê Công Đức)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Hiện Tại Tiếp Diễn (Present Continuous)
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Khám phá toàn diện công thức <span className="font-bold underline decoration-amber-300 decoration-2">am / is / are + V-ing</span>, 4 quy tắc thêm đuôi -ing, 6 cách dùng kinh điển, và trọn vẹn 3 bài thực hành chấm điểm tức thì từ sách gốc.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="px-4 py-2.5 rounded-xl bg-white text-blue-800 font-bold text-xs hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Mở PDF Trang 21-23</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('scans')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 font-bold text-xs text-white transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>Xem 3 Ảnh Sách Gốc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'formulas'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>⚡ 1. Công Thức (S1 & S2)</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'rules'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>🎯 2. Quy Tắc Thêm -ING</span>
        </button>

        <button
          onClick={() => setActiveTab('usecases')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'usecases'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>🔥 3. 6 Cách Dùng Kinh Điển</span>
        </button>

        <button
          onClick={() => setActiveTab('practice1')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'practice1'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>✍️ 4. Thực Hành 1 (10 câu)</span>
        </button>

        <button
          onClick={() => setActiveTab('practice2')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'practice2'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>😤 5. Thực Hành 2: Phàn Nàn</span>
        </button>

        <button
          onClick={() => setActiveTab('practice3')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'practice3'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📈 6. Thực Hành 3: Xu Hướng</span>
        </button>

        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition-all flex items-center gap-2 ${
            activeTab === 'scans'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📖 7. Bản Scan Sách Gốc</span>
        </button>
      </div>

      {/* TAB 1: FORMULAS EXPLORER */}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          {/* S1 vs S2 Formula Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Bóc Tách Cấu Trúc Khối Màu (Trang 21)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Thì Hiện Tại Tiếp Diễn luôn luôn phải có đủ bộ đôi: <span className="font-bold text-purple-600 dark:text-purple-400">Động từ TO BE (am/is/are)</span> + <span className="font-bold text-emerald-600 dark:text-emerald-400">Động từ thêm -ING</span>.
                </p>
              </div>

              {/* Contraction Switch */}
              <button
                onClick={() => setIsContracted(!isContracted)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isContracted
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {isContracted ? 'Dạng Viết Tắt (I\'m, isn\'t, aren\'t)' : 'Dạng Đầy Đủ (am not, is not, are not)'}
              </button>
            </div>

            {/* Interactive S1, S2, I selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSubjectGroup('I')}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  subjectGroup === 'I'
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  Đặc biệt: Ngôi "I"
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                  I + AM + V-ing
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Duy nhất chủ ngữ "I" đi với "am" (viết tắt là I'm).
                </div>
              </button>

              <button
                onClick={() => setSubjectGroup('S1')}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  subjectGroup === 'S1'
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  Nhóm S1: Số nhiều (Trang 21)
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                  We / You / They / N(pl) + ARE + V-ing
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Số nhiều đi với "are" (viết tắt 're, aren't).
                </div>
              </button>

              <button
                onClick={() => setSubjectGroup('S2')}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  subjectGroup === 'S2'
                    ? 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                  Nhóm S2: Số ít (Trang 21)
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                  He / She / It / N(sing) + IS + V-ing
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Số ít đi với "is" (viết tắt 's, isn't).
                </div>
              </button>
            </div>

            {/* Form Toggle: Positive, Negative, Question */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
              <button
                onClick={() => setSentenceForm('pos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  sentenceForm === 'pos'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Khẳng định (+)
              </button>
              <button
                onClick={() => setSentenceForm('neg')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  sentenceForm === 'neg'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Phủ định (-)
              </button>
              <button
                onClick={() => setSentenceForm('ques')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  sentenceForm === 'ques'
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Nghi vấn (?)
              </button>
            </div>

            {/* Verb quick picker */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Chọn động từ mẫu:</span>
              {[
                { v: 'study', ing: 'studying' },
                { v: 'play', ing: 'playing' },
                { v: 'work', ing: 'working' },
                { v: 'come', ing: 'coming' },
                { v: 'sit', ing: 'sitting' },
                { v: 'change', ing: 'changing' }
              ].map(item => (
                <button
                  key={item.v}
                  onClick={() => setSelectedVerb(item.v)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedVerb === item.v
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {item.v} → {item.ing}
                </button>
              ))}
            </div>

            {/* Interactive Render Box */}
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Mô hình lắp ghép từng thành phần:
              </div>

              {/* Color coded blocks */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-bold">
                {/* Subject Block */}
                {sentenceForm !== 'ques' && (
                  <div className="px-4 py-2.5 rounded-xl bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border border-blue-200 dark:border-blue-900 shadow-xs">
                    {subjectGroup === 'I' ? 'I' : subjectGroup === 'S1' ? 'They / We / The students' : 'He / She / The bus'}
                  </div>
                )}

                {/* To Be Block */}
                <div className="px-4 py-2.5 rounded-xl bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-900 shadow-xs">
                  {sentenceForm === 'pos' && (
                    subjectGroup === 'I'
                      ? (isContracted ? "'m" : 'am')
                      : subjectGroup === 'S1'
                      ? (isContracted ? "'re" : 'are')
                      : (isContracted ? "'s" : 'is')
                  )}
                  {sentenceForm === 'neg' && (
                    subjectGroup === 'I'
                      ? "am not (I'm not)"
                      : subjectGroup === 'S1'
                      ? (isContracted ? "aren't" : 'are not')
                      : (isContracted ? "isn't" : 'is not')
                  )}
                  {sentenceForm === 'ques' && (
                    subjectGroup === 'I' ? 'Am I' : subjectGroup === 'S1' ? 'Are they' : 'Is he'
                  )}
                </div>

                {/* V-ing Block */}
                <div className="px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900 shadow-xs">
                  {selectedVerb === 'come'
                    ? 'coming'
                    : selectedVerb === 'sit'
                    ? 'sitting'
                    : selectedVerb === 'change'
                    ? 'changing'
                    : `${selectedVerb}ing`}
                </div>

                {/* Object / Time Signal Block */}
                <div className="px-4 py-2.5 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-900 shadow-xs">
                  {sentenceForm === 'ques' ? 'right now?' : 'at the moment.'}
                </div>
              </div>

              {/* Real complete sentence with audio */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100">
                    {sentenceForm === 'pos' && (
                      subjectGroup === 'I'
                        ? "I am studying English at the moment."
                        : subjectGroup === 'S1'
                        ? "They are working very hard for their coming exams."
                        : "Look! The bus is coming."
                    )}
                    {sentenceForm === 'neg' && (
                      subjectGroup === 'I'
                        ? "I'm not listening to music right now."
                        : subjectGroup === 'S1'
                        ? "We aren't watching TV at the moment."
                        : "She isn't working today."
                    )}
                    {sentenceForm === 'ques' && (
                      subjectGroup === 'I'
                        ? "Am I disturbing you right now?"
                        : subjectGroup === 'S1'
                        ? "What are they discussing in this summit?"
                        : "Where is he going right now?"
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {sentenceForm === 'pos' && (
                      subjectGroup === 'I'
                        ? "Tôi đang học tiếng Anh vào lúc này."
                        : subjectGroup === 'S1'
                        ? "Họ đang ôn thi rất chăm chỉ cho các kỳ thi sắp tới."
                        : "Nhìn kìa! Xe buýt đang tới rồi."
                    )}
                    {sentenceForm === 'neg' && (
                      subjectGroup === 'I'
                        ? "Lúc này tôi không đang nghe nhạc."
                        : subjectGroup === 'S1'
                        ? "Chúng tôi không đang xem ti vi vào lúc này."
                        : "Hôm nay cô ấy không đi làm (nghỉ tạm thời)."
                    )}
                    {sentenceForm === 'ques' && (
                      subjectGroup === 'I'
                        ? "Tôi có đang làm phiền bạn lúc này không?"
                        : subjectGroup === 'S1'
                        ? "Họ đang thảo luận điều gì trong hội nghị thượng đỉnh này?"
                        : "Anh ấy đang đi đâu bây giờ thế?"
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const text = sentenceForm === 'pos'
                      ? (subjectGroup === 'I' ? "I am studying English at the moment." : subjectGroup === 'S1' ? "They are working very hard for their coming exams." : "Look! The bus is coming.")
                      : sentenceForm === 'neg'
                      ? (subjectGroup === 'I' ? "I'm not listening to music right now." : subjectGroup === 'S1' ? "We aren't watching TV at the moment." : "She isn't working today.")
                      : (subjectGroup === 'I' ? "Am I disturbing you right now?" : subjectGroup === 'S1' ? "What are they discussing in this summit?" : "Where is he going right now?");
                    speak(text);
                  }}
                  className="p-3 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 transition-all shrink-0"
                  title="Nghe phát âm chuẩn"
                  aria-label="Phát âm câu mẫu"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Time Signal Badges (Dấu hiệu nhận biết - Trang 21) */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                Dấu Hiệu Nhận Biết Bắt Buộc Nhớ (Trang 21)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">now</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">bây giờ</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">right now</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">ngay bây giờ</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-sm font-extrabold text-purple-600 dark:text-purple-400">at the moment</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">vào lúc này</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400">at the present</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">ở hiện tại</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: V-ING RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  4 Quy Tắc Biến Đổi Đuôi -ING Chuẩn Giáo Trình
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Nắm chắc các trường hợp câm chữ 'e', gấp đôi phụ âm và đổi đuôi 'ie' để không bao giờ bị trừ điểm chính tả.
                </p>
              </div>
            </div>

            {/* Rule Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(['silent_e', 'double_consonant', 'ie_to_y', 'normal'] as const).map(catKey => {
                const ruleInfo = vingRules[catKey];
                const isSelected = selectedRuleCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedRuleCategory(catKey)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {catKey === 'silent_e' && '⚠️ BỎ "e" CÂM'}
                      {catKey === 'double_consonant' && '⚡ GẤP ĐÔI PHỤ ÂM'}
                      {catKey === 'ie_to_y' && '🔀 ĐỔI IE THÀNH Y'}
                      {catKey === 'normal' && '✅ THÊM ING THƯỜNG'}
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">
                      {ruleInfo.rule}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Rule Details & Card list */}
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {vingRules[selectedRuleCategory].title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Công thức: <span className="font-bold text-indigo-600 dark:text-indigo-400">{vingRules[selectedRuleCategory].rule}</span>
                  </p>
                </div>
              </div>

              {/* Grid of examples with pronunciation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vingRules[selectedRuleCategory].examples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-400 text-sm line-through decoration-rose-400">{item.base}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">{item.result}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.vi}</div>
                      <div className="text-[11px] text-slate-400 italic">Mẹo: {item.note}</div>
                    </div>

                    <button
                      onClick={() => speak(item.result)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Phát âm"
                      aria-label={`Nghe phát âm từ ${item.result}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 6 USE CASES (PAGE 21) */}
      {activeTab === 'usecases' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                6 Cách Sử Dụng Kinh Điển Trích Trang 21
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Thầy Lê Công Đức đã đúc kết 6 tình huống ngữ cảnh then chốt nhất của Hiện Tại Tiếp Diễn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((uc) => (
                <div
                  key={uc.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-3 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {uc.badge}
                      </span>
                      <span className="text-xl">{uc.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {uc.title}
                    </h4>

                    {/* Signal words */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-slate-400">Từ khóa:</span>
                      {uc.markers.map((m, idx) => (
                        <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Sentences */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      {uc.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900 dark:text-slate-100">{ex.en}</span>
                            <button
                              onClick={() => speak(ex.en)}
                              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Nghe"
                              aria-label={`Nghe câu: ${ex.en}`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-slate-600 dark:text-slate-300">{ex.vi}</div>
                          <div className="text-[11px] text-blue-600 dark:text-blue-400 italic">💡 {ex.context}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE 1 (10 câu chia động từ - Trang 22) */}
      {activeTab === 'practice1' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Bài Tập 1 - Trang 22 (Giáo trình Lê Công Đức)
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  1. Chia Thì Hiện Tại Tiếp Diễn Ở Các Dạng Câu Cho Dưới Đây
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Nhập đáp án vào chỗ trống và bấm "Kiểm tra" hoặc nhấn Enter. Có thể viết dạng rút gọn (isn't, aren't) hoặc đầy đủ.
                </p>
              </div>

              {/* Reset all button */}
              <button
                onClick={() => {
                  setP1Answers({});
                  setP1Feedback({});
                  setShowP1Solution({});
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại từ đầu
              </button>
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {p1Questions.map((q) => {
                const isChecked = p1Feedback[q.id] !== undefined;
                const isCorrect = p1Feedback[q.id] === true;
                const showingSol = showP1Solution[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 flex flex-wrap items-center gap-2">
                        <span>{q.prefix}</span>

                        {q.isDouble ? (
                          <>
                            <input
                              type="text"
                              value={p1Answers[`${q.id}_1`] || ''}
                              onChange={(e) => setP1Answers(prev => ({ ...prev, [`${q.id}_1`]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleCheckP1(q.id); }}
                              placeholder={q.inputHint}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-36 shadow-2xs font-sans"
                            />
                            <span>{q.middle}</span>
                            <input
                              type="text"
                              value={p1Answers[`${q.id}_2`] || ''}
                              onChange={(e) => setP1Answers(prev => ({ ...prev, [`${q.id}_2`]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleCheckP1(q.id); }}
                              placeholder={q.inputHint2}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-36 shadow-2xs font-sans"
                            />
                          </>
                        ) : (
                          <input
                            type="text"
                            value={p1Answers[q.id] || ''}
                            onChange={(e) => setP1Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleCheckP1(q.id); }}
                            placeholder={q.inputHint}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-blue-500 min-w-[150px] shadow-2xs font-sans"
                          />
                        )}

                        <span>{q.suffix}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCheckP1(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          Kiểm tra
                        </button>
                        <button
                          onClick={() => setShowP1Solution(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                          {showingSol ? 'Ẩn đáp án' : 'Xem đáp án'}
                        </button>
                      </div>
                    </div>

                    {/* Result and explanation */}
                    {isChecked && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                              <CheckCircle2 className="w-4 h-4" /> Chính xác!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                              <XCircle className="w-4 h-4" /> Chưa đúng, hãy thử lại!
                            </span>
                          )}
                          <span className="text-slate-500 dark:text-slate-400">| Dịch: {q.vietnamese}</span>
                        </div>
                      </div>
                    )}

                    {showingSol && (
                      <div className="mt-2.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                        <div className="font-bold text-blue-900 dark:text-blue-200">
                          Đáp án đúng:{' '}
                          {q.isDouble
                            ? `${q.correct1?.[0]} / ${q.correct2?.[0]}`
                            : (q.correct || []).join(' hoặc ')}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">
                          Giải thích: {q.rule}
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

      {/* TAB 5: PRACTICE 2 (5 câu phàn nàn bực bội - Trang 22) */}
      {activeTab === 'practice2' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
                  Bài Tập 2 - Trang 22 (Giáo trình Lê Công Đức)
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  2. Hoàn Thành Đoạn Hội Thoại Diễn Tả Sự Bực Mình Với ALWAYS
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Cấu trúc cố định: <span className="font-bold text-purple-600 dark:text-purple-400">S + is/are ALWAYS + V-ing...</span> để thể hiện thái độ phàn nàn, bực bội với thói quen xấu của người khác.
                </p>
              </div>

              <button
                onClick={() => {
                  setP2Answers({});
                  setP2Feedback({});
                  setShowP2Solution({});
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại
              </button>
            </div>

            <div className="space-y-4">
              {p2Questions.map((q) => {
                const isChecked = p2Feedback[q.id] !== undefined;
                const isCorrect = p2Feedback[q.id] === true;
                const showingSol = showP2Solution[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      q.isSample
                        ? 'border-blue-300 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/20'
                        : isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {q.prompt}
                        </div>
                        {q.isSample && (
                          <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                            Câu mẫu trong sách
                          </span>
                        )}
                      </div>

                      {/* Input for answer */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 sm:w-16">
                          Đáp án:
                        </span>
                        <input
                          type="text"
                          disabled={q.isSample}
                          value={q.isSample ? q.modelAnswer : p2Answers[q.id] || ''}
                          onChange={(e) => setP2Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleCheckP2(q.id); }}
                          placeholder="Nhập trọn vẹn câu: Because he is always borrowing..."
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-purple-500 shadow-2xs font-sans"
                        />
                        {!q.isSample && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleCheckP2(q.id)}
                              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-xs"
                            >
                              Kiểm tra
                            </button>
                            <button
                              onClick={() => setShowP2Solution(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            >
                              {showingSol ? 'Ẩn' : 'Xem'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Pronounce model answer */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <div className="flex items-center gap-2">
                          <span>Dịch nghĩa: {q.vi}</span>
                          {isChecked && !q.isSample && (
                            <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isCorrect ? '✓ Hoàn toàn chính xác!' : '✗ Chưa đúng cấu trúc'}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => speak(q.modelAnswer)}
                          className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          Nghe đọc mẫu
                        </button>
                      </div>

                      {showingSol && !q.isSample && (
                        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs">
                          <div className="font-bold text-purple-900 dark:text-purple-200">
                            Đáp án chuẩn sách: {q.modelAnswer}
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

      {/* TAB 6: PRACTICE 3 (Xu hướng & Thay đổi - Trang 23) */}
      {activeTab === 'practice3' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                  Bài Tập 3 - Trang 23 (Giáo trình Lê Công Đức)
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  3. Hoàn Thành Câu Diễn Tả Xu Hướng & Sự Dần Thay Đổi
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Chọn và chia thì Hiện Tại Tiếp Diễn với các động từ xu hướng: <span className="font-bold text-cyan-600 dark:text-cyan-400">get, change, rise, fall, increase</span>. Có thể dùng 1 động từ nhiều lần!
                </p>
              </div>

              {/* Word Bank Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Ngân hàng động từ:</span>
                {['get → getting', 'change → changing', 'rise → rising', 'fall → falling', 'increase → increasing'].map(w => (
                  <span key={w} className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {p3Questions.map((q) => {
                const isChecked = p3Feedback[q.id] !== undefined;
                const isCorrect = p3Feedback[q.id] === true;
                const showingSol = showP3Solution[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                          : 'border-rose-300 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 flex flex-wrap items-center gap-2">
                        <span>{q.prefix}</span>
                        <input
                          type="text"
                          value={p3Answers[q.id] || ''}
                          onChange={(e) => setP3Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleCheckP3(q.id); }}
                          placeholder="chia be + V-ing"
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-cyan-500 min-w-[140px] shadow-2xs font-sans"
                        />
                        <span>{q.suffix}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCheckP3(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          Kiểm tra
                        </button>
                        <button
                          onClick={() => setShowP3Solution(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                          {showingSol ? 'Ẩn' : 'Xem gợi ý'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Dịch nghĩa: {q.vi}</span>
                      {isChecked && (
                        <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isCorrect ? '✓ Tuyệt vời!' : '✗ Hãy kiểm tra lại dạng V-ing'}
                        </span>
                      )}
                    </div>

                    {showingSol && (
                      <div className="mt-2.5 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900 text-xs">
                        <div className="font-bold text-cyan-900 dark:text-cyan-200">
                          Đáp án đề xuất: {q.preferred} (hoặc các từ hợp ngữ cảnh: {q.correct.join(', ')})
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

      {/* TAB 7: ORIGINAL BOOK SCANS (Trang 21, 22, 23) */}
      {activeTab === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Bản Scan Gốc Giáo Trình (Trang 21, 22 & 23)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Đối chiếu trực tiếp với tài liệu gốc của Thầy Lê Công Đức để kiểm tra tính chính xác và đối sánh lý thuyết.
                </p>
              </div>

              {/* Page Selector Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <button
                  onClick={() => setSelectedScanPage(21)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedScanPage === 21
                      ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 21 (Lý Thuyết & 6 Cách Dùng)
                </button>
                <button
                  onClick={() => setSelectedScanPage(22)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedScanPage === 22
                      ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 22 (Thực Hành 1 & 2)
                </button>
                <button
                  onClick={() => setSelectedScanPage(23)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedScanPage === 23
                      ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Trang 23 (Thực Hành 3)
                </button>
              </div>
            </div>

            {/* Scan Image Container */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-800 bg-white">
                <img
                  src={
                    selectedScanPage === 21
                      ? '/assets/aistudio/image_44a3bd6b.png'
                      : selectedScanPage === 22
                      ? '/assets/aistudio/image_8ba50fc2.png'
                      : '/assets/aistudio/image_2ee85573.png'
                  }
                  alt={`Bản scan sách giáo trình Ngữ Pháp Tiếng Anh trang ${selectedScanPage}`}
                  className="w-full h-auto object-contain select-none"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center max-w-lg">
                {selectedScanPage === 21 && (
                  <span>
                    <strong>Trang 21:</strong> Công thức S1 & S2, 4 dấu hiệu thời gian (now, right now, at the moment, at the present), và 6 cách sử dụng kinh điển.
                  </span>
                )}
                {selectedScanPage === 22 && (
                  <span>
                    <strong>Trang 22:</strong> Thực hành 1 (10 câu chia động từ tiếp diễn) & Thực hành 2 (5 câu phàn nàn bực mình với ALWAYS).
                  </span>
                )}
                {selectedScanPage === 23 && (
                  <span>
                    <strong>Trang 23:</strong> Thực hành 3 (7 câu diễn tả xu hướng và sự biến đổi với các động từ get, change, rise, fall, increase).
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
