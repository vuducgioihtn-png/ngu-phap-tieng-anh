import { Category, GrammarTopic } from '../types/grammar';

export const CATEGORIES: Category[] = [
  {
    id: 'tenses',
    name: '12 Thì Tiếng Anh',
    englishName: 'Verb Tenses',
    icon: 'Clock',
    description: 'Dòng thời gian tương tác: Hiện tại, Quá khứ, Tương lai & Hoàn thành',
    color: 'from-blue-600 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
  },
  {
    id: 'passive',
    name: 'Thể Bị Động',
    englishName: 'Passive Voice',
    icon: 'Shuffle',
    description: 'Bộ biến đổi Chủ động ↔ Bị động, Thể nhờ vả Have/Get something done',
    color: 'from-purple-600 to-pink-600',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
  },
  {
    id: 'reported',
    name: 'Câu Tường Thuật',
    englishName: 'Reported Speech',
    icon: 'MessageSquareQuote',
    description: 'Quy tắc lùi thì, đổi đại từ, biến đổi trạng từ thời gian & câu rút gọn',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
  },
  {
    id: 'conditionals_wish',
    name: 'Câu Điều Kiện & Ao Ước',
    englishName: 'Conditionals & Wish',
    icon: 'Sparkles',
    description: 'If loại 0, 1, 2, 3, Đảo ngữ điều kiện và Mệnh đề Wish loại 1, 2',
    color: 'from-emerald-600 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
  },
  {
    id: 'comparison',
    name: 'Cấu Trúc So Sánh',
    englishName: 'Comparisons',
    icon: 'Scale',
    description: 'So sánh hơn, nhất, bằng, so sánh danh từ, trạng từ và so sánh kép càng... càng',
    color: 'from-rose-600 to-red-600',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  },
  {
    id: 'pronouns_nouns',
    name: 'Đại Từ & Danh Từ',
    englishName: 'Pronouns & Nouns',
    icon: 'Layers',
    description: 'Chủ từ, túc từ, phản thân, sở hữu; Danh từ đếm được, không đếm được & This/That',
    color: 'from-cyan-600 to-blue-700',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300'
  },
  {
    id: 'verb_forms',
    name: 'Dạng Động Từ & Thói Quen',
    englishName: 'Verb Forms & Habits',
    icon: 'BookmarkCheck',
    description: 'To-V vs V-ing, động từ đặc biệt (stop, try, remember...), Used to, Would rather',
    color: 'from-violet-600 to-indigo-700',
    badgeBg: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300'
  },
  {
    id: 'clauses_phrases',
    name: 'Mệnh Đề & Cụm Từ',
    englishName: 'Clauses & Phrases',
    icon: 'Workflow',
    description: 'Mệnh đề quan hệ, giản lược, mệnh đề chỉ mục đích, kết quả, lý do, nhượng bộ',
    color: 'from-teal-600 to-emerald-700',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
  },
  {
    id: 'advanced_prepositions',
    name: 'Quy Tắc Vàng & Giới Từ',
    englishName: 'Grammar Rules & Prepositions',
    icon: 'Compass',
    description: '11 quy tắc hòa hợp S-V, Đảo ngữ nhấn mạnh, Câu hỏi đuôi, Giới từ nơi chốn/thời gian',
    color: 'from-indigo-600 to-sky-600',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'
  }
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // 1. SUBJECT PRONOUNS
  {
    id: 1,
    slug: 'subject-pronouns',
    title: 'Đại Từ Làm Chủ Từ',
    englishTitle: 'Subject Pronouns',
    category: 'pronouns_nouns',
    pageNumber: 4,
    difficulty: 'Cơ bản',
    summary: 'Chủ từ thực hiện hành động của động từ. Dùng để thay thế danh từ nhằm tránh lặp từ (I, You, He, She, It, We, They).',
    mnemonics: [
      'Tránh lặp tên người/vật: "John is tall and John is smart" ➔ "John is tall and he is smart"',
      '"It" dùng cho con vật, đồ vật, ý kiến, thời tiết, nhiệt độ ("It is 5 o\'clock", "It is raining")',
      'Khi nói về em bé chưa rõ giới tính: dùng "It" ("The baby is very small. It only weighs 2 kilos")'
    ],
    formulas: [
      {
        label: 'Vị trí trong câu',
        structure: 'Subject Pronoun (I, We, You, He, She, It, They) + Verb + Object/Complement',
        example: {
          en: 'He is a teacher, and they are students.',
          vi: 'Anh ấy là giáo viên, và họ là học sinh.',
          breakdown: [
            { label: 'Subject', text: 'He', color: 'bg-blue-100 text-blue-800 border-blue-300' },
            { label: 'Verb', text: 'is', color: 'bg-purple-100 text-purple-800 border-purple-300' },
            { label: 'Complement', text: 'a teacher', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '1. Phân loại ngôi trong Tiếng Anh',
        content: [
          'Ngôi thứ nhất (người nói): Số ít = I (Tôi, mình); Số nhiều = We (Chúng ta, chúng tôi)',
          'Ngôi thứ hai (người nghe): Số ít = You (Bạn); Số nhiều = You (Các bạn)',
          'Ngôi thứ ba (người/vật được nói tới): He (Anh ấy), She (Cô ấy), It (Nó); Số nhiều = They (Họ, chúng nó)'
        ],
        table: {
          headers: ['Ngôi', 'Số ít', 'Số nhiều', 'Ví dụ'],
          rows: [
            ['1 (Người nói)', 'I (Tôi)', 'We (Chúng tôi)', 'I am a student. / We are students.'],
            ['2 (Người nghe)', 'You (Bạn)', 'You (Các bạn)', 'You are a doctor. / You are doctors.'],
            ['3 (Được nói đến)', 'He / She / It', 'They (Chúng nó/Họ)', 'He is tall. / They are friendly.']
          ]
        }
      }
    ],
    visualType: 'pronouns_visualizer',
    exercises: [
      {
        id: 'ex-sp-1',
        type: 'choice',
        prompt: 'John is handsome and _____ is very kind.',
        options: ['he', 'him', 'his', 'himself'],
        correctAnswer: 'he',
        explanation: 'Vị trí đứng trước động từ "is" làm chủ từ, thay thế cho danh từ nam John số ít, nên dùng "he".'
      },
      {
        id: 'ex-sp-2',
        type: 'fill',
        prompt: 'The weather is so cold outside. _____ is only 10°C.',
        contextHint: 'Đại từ chỉ thời tiết, nhiệt độ',
        correctAnswer: 'It',
        explanation: 'Trong tiếng Anh, nói về thời tiết, thời gian, nhiệt độ ta dùng chủ từ giả "It".'
      },
      {
        id: 'ex-sp-3',
        type: 'fill',
        prompt: 'My parents are doctors. _____ work in Rach Gia hospital.',
        contextHint: 'Đại từ ngôi thứ 3 số nhiều',
        correctAnswer: 'They',
        explanation: 'My parents là danh từ số nhiều, thay thế bằng đại từ chủ từ "They".'
      }
    ]
  },

  // 2. OBJECT PRONOUNS (ĐẠI TỪ LÀM TÚC TỪ)
  {
    id: 2,
    slug: 'object-pronouns',
    title: 'Đại Từ Làm Túc Từ (Tân Ngữ)',
    englishTitle: 'Object Pronouns',
    category: 'pronouns_nouns',
    pageNumber: 6,
    difficulty: 'Cơ bản',
    summary: 'Túc từ (Object) là đối tượng chịu ảnh hưởng bởi hành động của chủ từ. Đứng SAU động từ hoặc sau giới từ: me, us, you, him, her, it, them.',
    mnemonics: [
      '🎯 Vị trí vàng: Chủ từ (S) đứng TRƯỚC động từ, Túc từ (O) đứng SAU động từ hoặc giới từ',
      'Ví dụ: "I like soccer" (I là S) vs "They like me" (me là O)',
      'Sau giới từ (with, to, for, at, between...) luôn dùng Túc Từ: "Go with him", "Listen to us"'
    ],
    formulas: [
      {
        label: 'Cấu trúc câu với Túc Từ',
        structure: 'Subject + Verb + OBJECT PRONOUN (me / us / you / him / her / it / them) + Rest',
        example: {
          en: 'Tom and John are very cute. He likes them.',
          vi: 'Tom và John rất dễ thương. Cậu ấy thích họ.',
          breakdown: [
            { label: 'Chủ từ (S)', text: 'He', color: 'bg-blue-100 text-blue-800' },
            { label: 'Động từ (V)', text: 'likes', color: 'bg-purple-100 text-purple-800' },
            { label: 'Túc từ (O)', text: 'them', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Bảng đối chiếu Chủ từ và Túc từ',
        content: [
          'I ➔ me: She likes me.',
          'We ➔ us: He likes us.',
          'You ➔ you: I love you.',
          'He ➔ him: We work with him.',
          'She ➔ her: They like her a lot.',
          'It ➔ it: This pen is nice. We like it.',
          'They ➔ them: These pens are nice. We like them.'
        ]
      }
    ],
    visualType: 'pronouns_visualizer',
    exercises: [
      {
        id: 'ex-op-1',
        type: 'fill',
        prompt: 'I go to school with _____ (he) every day.',
        contextHint: 'Đứng sau giới từ with ➔ dùng túc từ của he',
        correctAnswer: 'him',
        explanation: 'Sau giới từ "with" phải dùng đại từ làm túc từ. Túc từ của "he" là "him".'
      },
      {
        id: 'ex-op-2',
        type: 'fill',
        prompt: 'John and Mary are my children. I love _____ very much.',
        contextHint: 'Đại từ thay thế cho John and Mary sau động từ love',
        correctAnswer: 'them',
        explanation: 'John and Mary là ngôi thứ ba số nhiều, đứng sau động từ "love" làm túc từ nên dùng "them".'
      },
      {
        id: 'ex-op-3',
        type: 'fill',
        prompt: 'Where is my dog? I can’t find _____ anywhere.',
        contextHint: 'Đại từ thay thế cho my dog',
        correctAnswer: 'it',
        explanation: 'My dog là con vật số ít, làm túc từ cho động từ "find" nên dùng "it".'
      },
      {
        id: 'ex-op-4',
        type: 'choice',
        prompt: 'We are studying. Don’t bother _____, please.',
        options: ['us', 'we', 'our', 'ours'],
        correctAnswer: 'us',
        explanation: 'Đứng sau động từ "bother" làm tân ngữ, tương ứng với chủ từ "We" ở câu trước là túc từ "us".'
      }
    ]
  },

  // 3. REFLEXIVE PRONOUNS (ĐẠI TỪ PHẢN THÂN)
  {
    id: 3,
    slug: 'reflexive-pronouns',
    title: 'Đại Từ Phản Thân (Reflexive Pronouns)',
    englishTitle: 'Reflexive Pronouns',
    category: 'pronouns_nouns',
    pageNumber: 8,
    difficulty: 'Trung cấp',
    summary: 'Dùng khi chủ ngữ và tân ngữ là cùng một người/vật (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) hoặc để nhấn mạnh tự làm một mình.',
    mnemonics: [
      '🪞 Tự mình soi gương: "I usually talk to myself" (Tôi thường tự nói chuyện với chính mình)',
      '👤 by + đại từ phản thân = tự làm một mình, không cần ai giúp ("I drew this picture by myself")',
      '⚠️ BẪY CỰC QUAN TRỌNG (Trang 8): Giới từ chỉ NƠI CHỐN (on, next to, beside) dùng ĐẠI TỪ TÚC TỪ: "He put the backpack next to him" (KHÔNG dùng himself!)',
      'V + đại từ phản thân + túc từ: "I cooked myself a bowl of noodles" (Tôi tự nấu cho mình một tô mì)'
    ],
    formulas: [
      {
        label: 'Cấu trúc phản thân',
        structure: 'Subject + Verb + REFLEXIVE PRONOUN (myself / yourself / himself / herself / itself / ourselves / yourselves / themselves)',
        example: {
          en: 'I taught myself to play the guitar.',
          vi: 'Tôi tự học chơi đàn ghi-ta (chính tôi dạy cho bản thân tôi).',
          breakdown: [
            { label: 'Chủ từ (S)', text: 'I', color: 'bg-blue-100 text-blue-800' },
            { label: 'Động từ', text: 'taught', color: 'bg-purple-100 text-purple-800' },
            { label: 'Phản thân', text: 'myself', color: 'bg-rose-100 text-rose-800' },
            { label: 'Hành động', text: 'to play the guitar', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '4 lưu ý đặc biệt từ trang 8 giáo trình',
        content: [
          '1. by + đại từ phản thân: nhấn mạnh tự làm không nhờ ai giúp (She walked home by herself).',
          '2. Giới từ chỉ nơi chốn (next to, beside, behind): dùng đại từ túc từ thường (He had a suitcase beside him).',
          '3. Động từ + phản thân + túc từ: tự làm cho mình (We taught ourselves French).',
          '4. Động từ + túc từ + phản thân: nhấn mạnh người khác không làm hộ (They did the homework themselves).'
        ]
      }
    ],
    visualType: 'pronouns_visualizer',
    exercises: [
      {
        id: 'ex-rp-1',
        type: 'fill',
        prompt: 'Don’t help us, Dad! Jim and I can paint the car all by _____ (we).',
        contextHint: 'Nhấn mạnh chúng con tự sơn xe một mình',
        correctAnswer: 'ourselves',
        explanation: 'Chủ ngữ "Jim and I" tương đương với "We". Cấu trúc by + phản thân số nhiều là "ourselves".'
      },
      {
        id: 'ex-rp-2',
        type: 'fill',
        prompt: 'She put her schoolbag next to _____ (she).',
        contextHint: '⚠️ Chú ý: next to là giới từ chỉ nơi chốn!',
        correctAnswer: 'her',
        explanation: 'Quy tắc trang 8: Sau giới từ chỉ nơi chốn (next to, beside...) ta dùng đại từ túc từ "her", KHÔNG dùng herself.'
      },
      {
        id: 'ex-rp-3',
        type: 'fill',
        prompt: 'Peter lives alone, so he has to cook meals _____ (he).',
        contextHint: 'Anh ấy phải tự nấu ăn lấy',
        correctAnswer: 'himself',
        explanation: 'Peter (he) tự nấu các bữa ăn cho chính mình nên dùng đại từ phản thân "himself".'
      },
      {
        id: 'ex-rp-4',
        type: 'fill',
        prompt: 'She always talks to _____ (she) when she is sad.',
        contextHint: 'Cô ấy tự nói chuyện với chính mình',
        correctAnswer: 'herself',
        explanation: 'Nói chuyện với chính bản thân mình (talk to oneself) ➔ talks to herself.'
      }
    ]
  },

  // 4. POSSESSIVE PRONOUNS (ĐẠI TỪ SỞ HỮU)
  {
    id: 4,
    slug: 'possessive-pronouns',
    title: 'Đại Từ Sở Hữu & Tính Từ Sở Hữu',
    englishTitle: 'Possessive Pronouns vs Adjectives',
    category: 'pronouns_nouns',
    pageNumber: 10,
    difficulty: 'Trung cấp',
    summary: 'Phân biệt Tính từ sở hữu (bắt buộc có danh từ theo sau: my car) và Đại từ sở hữu (đứng độc lập một mình: mine = my car).',
    mnemonics: [
      '🔑 Công thức quy đổi: ĐẠI TỪ SỞ HỮU = TÍNH TỪ SỞ HỮU + DANH TỪ',
      'Ví dụ: "That is my coat" = "That coat is MINE"',
      '"This is your car" = "This is YOURS"',
      '⚠️ Cảnh báo viết chính tả: Chữ s trong đại từ sở hữu viết LIỀN TỤC (yours, hers, theirs) ➔ TUYỆT ĐỐI KHÔNG VIẾT your\'s!',
      'Đại từ sở hữu có thể đứng đầu câu làm chủ ngữ: "My car is black and HERS is red"'
    ],
    formulas: [
      {
        label: 'Bảng đối chiếu sở hữu',
        structure: '• Tính từ sở hữu: my / your / his / her / its / our / their + NOUN\n• Đại từ sở hữu: mine / yours / his / hers / its / ours / theirs (ĐỨNG MỘT MÌNH)',
        example: {
          en: 'My flowers are dying. Yours are lovely.',
          vi: 'Những bông hoa của tôi đang tàn. Những bông của bạn (Yours = Your flowers) thật đáng yêu.',
          breakdown: [
            { label: 'Tính từ sở hữu + N', text: 'My flowers', color: 'bg-amber-100 text-amber-800' },
            { label: 'Đại từ sở hữu', text: 'Yours', color: 'bg-purple-100 text-purple-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '3 vị trí then chốt của Đại từ sở hữu',
        content: [
          '1. Làm chủ ngữ đầu câu: My car is black and hers is red (hers = her car).',
          '2. Làm tân ngữ sau động từ: I love my family. Do you love yours? (yours = your family).',
          '3. Làm bổ ngữ sau Be: This is my pen and that is yours.'
        ]
      }
    ],
    visualType: 'pronouns_visualizer',
    exercises: [
      {
        id: 'ex-pp-pos-1',
        type: 'choice',
        prompt: '_____ pencil is broken. Can I borrow _____?',
        options: ['Mine – your', 'My – your', 'Your – mine', 'My - yours'],
        correctAnswer: 'My - yours',
        explanation: 'Vị trí 1 có danh từ "pencil" nên dùng tính từ sở hữu "My". Vị trí 2 đứng cuối câu không có danh từ theo sau nên dùng đại từ sở hữu "yours" (yours = your pencil).'
      },
      {
        id: 'ex-pp-pos-2',
        type: 'choice',
        prompt: 'Katy has lost _____ Iphone.',
        options: ['hers', 'her', 'she', 'herself'],
        correctAnswer: 'her',
        explanation: 'Đứng trước danh từ "Iphone" phải là tính từ sở hữu "her".'
      },
      {
        id: 'ex-pp-pos-3',
        type: 'choice',
        prompt: 'This is not my parents’ car. _____ is black and white.',
        options: ['Ours', 'Yours', 'Theirs', 'His'],
        correctAnswer: 'Theirs',
        explanation: 'Chủ ngữ câu 2 thay thế cho "my parents\' car" (xe của bố mẹ tôi = xe của họ), dùng đại từ sở hữu "Theirs".'
      },
      {
        id: 'ex-pp-pos-4',
        type: 'choice',
        prompt: 'This bird has broken _____ wing.',
        options: ['it', 'its', "it's", "its'"],
        correctAnswer: 'its',
        explanation: 'Tính từ sở hữu của con chim (it) là "its" (không có dấu phẩy trên, vì it\'s = it is).'
      }
    ]
  },

  // 5. COUNTABLE NOUNS (DANH TỪ ĐẾM ĐƯỢC)
  {
    id: 5,
    slug: 'countable-nouns',
    title: 'Danh Từ Đếm Được & Mạo Từ A/AN',
    englishTitle: 'Countable Nouns & Plural Rules',
    category: 'pronouns_nouns',
    pageNumber: 12,
    difficulty: 'Cơ bản',
    summary: 'Danh từ chỉ vật thể, con người có thể đếm bằng số đếm (1, 2, 3...). Ở số ít dùng với mạo từ a/an; ở số nhiều có quy tắc biến đổi đặc trưng.',
    mnemonics: [
      '🅰️ Mẹo A vs AN theo PHÁT ÂM: An apple, an umbrella NHƯNG "A university", "A uniform" (vì phát âm phụ âm /j/)',
      '⏰ Bẫy âm h câm: "An hour", "An honest man" (chữ h không đọc nên dùng AN!)',
      '🔥 Mẹo thêm ES: "Ong CHín Sản Xuất SH" (-o, -ch, -s, -x, -sh ➔ mangoes, watches, kisses, boxes, brushes)',
      '🍂 Tận cùng -f / -fe ➔ -ves: knife ➔ knives, leaf ➔ leaves, wife ➔ wives, shelf ➔ shelves',
      '👥 Bất quy tắc: man ➔ men, child ➔ children, person ➔ people, tooth ➔ teeth, mouse ➔ mice, goose ➔ geese'
    ],
    formulas: [
      {
        label: 'Hình thái số ít và số nhiều',
        structure: '• Số ít: a / an + Singular Countable Noun (a book, an apple)\n• Số nhiều: Noun + s / es / ies / ves (two books, boxes, countries, knives)',
        example: {
          en: 'A child is playing with two mice and three geese.',
          vi: 'Một đứa trẻ đang chơi với hai con chuột và ba con ngỗng (danh từ số nhiều bất quy tắc).',
          breakdown: [
            { label: 'Số ít', text: 'A child', color: 'bg-blue-100 text-blue-800' },
            { label: 'Số nhiều bất quy tắc', text: 'two mice', color: 'bg-purple-100 text-purple-800' },
            { label: 'Số nhiều bất quy tắc', text: 'three geese', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Các bước biến đổi số nhiều từ trang 12',
        content: [
          '1. Thêm -es vào danh từ tận cùng bằng -o, -ch, -s, -x, -sh: a mango ➔ mangoes, a watch ➔ watches, a kiss ➔ kisses, a box ➔ boxes.',
          '2. Phụ âm + y ➔ -ies: a country ➔ countries, a lady ➔ ladies. Nguyên âm + y ➔ thêm s: a play ➔ plays, a key ➔ keys.',
          '3. Tận cùng -f / -fe ➔ -ves: a knife ➔ knives, a life ➔ lives, a shelf ➔ shelves.',
          '4. Bất quy tắc đặc biệt: A man ➔ Men, A woman ➔ Women, A child ➔ Children, A person ➔ People, A tooth ➔ Teeth, A foot ➔ Feet, A mouse ➔ Mice, A goose ➔ Geese.'
        ]
      }
    ],
    visualType: 'nouns_visualizer',
    exercises: [
      {
        id: 'ex-cn-1',
        type: 'choice',
        prompt: 'Chọn mạo từ đúng: "She is studying at _____ university in Hanoi."',
        options: ['a', 'an', 'the', 'some'],
        correctAnswer: 'a',
        explanation: 'Từ "university" bắt đầu bằng âm bán nguyên âm /j/ (phụ âm) nên dùng mạo từ "a", không dùng "an".'
      },
      {
        id: 'ex-cn-2',
        type: 'choice',
        prompt: 'Chọn mạo từ đúng: "We have to wait for _____ hour."',
        options: ['an', 'a', 'the', 'one'],
        correctAnswer: 'an',
        explanation: 'Từ "hour" có âm /h/ câm, phát âm bắt đầu bằng nguyên âm /aʊər/ nên bắt buộc dùng "an".'
      },
      {
        id: 'ex-cn-3',
        type: 'fill',
        prompt: 'Viết dạng số nhiều của danh từ "watch": a watch ➔ _____',
        contextHint: 'Tận cùng bằng ch (Ong CHín Sản Xuất SH)',
        correctAnswer: 'watches',
        explanation: 'Danh từ tận cùng bằng "ch" thêm đuôi "es" ➔ watches.'
      },
      {
        id: 'ex-cn-4',
        type: 'fill',
        prompt: 'Viết dạng số nhiều của danh từ "shelf": a shelf ➔ _____',
        contextHint: 'Tận cùng -f đổi thành -ves',
        correctAnswer: 'shelves',
        explanation: 'Danh từ tận cùng bằng "f" chuyển thành "ves" ➔ shelves.'
      },
      {
        id: 'ex-cn-5',
        type: 'fill',
        prompt: 'Viết dạng số nhiều của danh từ bất quy tắc "tooth": a tooth ➔ _____',
        contextHint: 'Bất quy tắc oo ➔ ee',
        correctAnswer: 'teeth',
        explanation: 'Số nhiều bất quy tắc của tooth là teeth.'
      }
    ]
  },

  // 6. UNCOUNTABLE NOUNS (DANH TỪ KHÔNG ĐẾM ĐƯỢC)
  {
    id: 6,
    slug: 'uncountable-nouns',
    title: 'Danh Từ Không Đếm Được (Uncountable Nouns)',
    englishTitle: 'Uncountable Nouns & Measure Units',
    category: 'pronouns_nouns',
    pageNumber: 14,
    difficulty: 'Trung cấp',
    summary: 'Tên gọi chất liệu, chất lỏng, khái niệm trừu tượng không thể đếm bằng 1, 2, 3 và luôn chia động từ ở số ít.',
    mnemonics: [
      '🍞 Chất liệu & thực phẩm: bread, cream, gold, paper, tea, beer, dust, water, coffee, wood...',
      '💭 Danh từ trừu tượng: advice, information, courage, knowledge, beauty, fear, help, experience...',
      '⚠️ Danh từ có S nhưng VẪN KHÔNG ĐẾM ĐƯỢC: news (tin tức), mumps (quai bị), diabetes (tiểu đường), physics (vật lý), mathematics (toán), billiards (bi-da)',
      '🥛 Muốn đếm phải mượn lượng từ: "a piece of news", "a bottle of water", "a loaf of bread", "a piece of advice"'
    ],
    formulas: [
      {
        label: 'Quy tắc chia động từ',
        structure: 'Uncountable Noun + VERB SỐ ÍT (is / has / V-s/es)',
        example: {
          en: 'The news is very surprising today.',
          vi: 'Tin tức hôm nay rất bất ngờ (news có "s" nhưng động từ chia "is" số ít).',
          breakdown: [
            { label: 'Danh từ không đếm được', text: 'The news', color: 'bg-amber-100 text-amber-800' },
            { label: 'Động từ số ít', text: 'is', color: 'bg-purple-100 text-purple-800' },
            { label: 'Bổ ngữ', text: 'very surprising', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '3 nhóm danh từ không đếm được theo trang 14',
        content: [
          '1. Chất liệu chung chung: bread, gold, paper, tea, beer, water, soap, coffee, sand, ice, wood.',
          '2. Trừu tượng: advice (lời khuyên), information (thông tin), courage, knowledge, help, beauty, hope.',
          '3. Hoạt động & tập hợp: luggage/baggage (hành lý), furniture (nội thất), weather, damage, shopping, traffic.'
        ]
      }
    ],
    visualType: 'nouns_visualizer',
    exercises: [
      {
        id: 'ex-un-1',
        type: 'choice',
        prompt: 'Từ nào sau đây là danh từ KHÔNG ĐẾM ĐƯỢC (Uncountable)?',
        options: ['information', 'child', 'country', 'key'],
        correctAnswer: 'information',
        explanation: 'Information là khái niệm trừu tượng không đếm được, không bao giờ có "informations".'
      },
      {
        id: 'ex-un-2',
        type: 'choice',
        prompt: 'The news on TV _____ very shocking last night.',
        options: ['was', 'were', 'are', 'have been'],
        correctAnswer: 'was',
        explanation: 'News (tin tức) là danh từ không đếm được, chia động từ số ít trong quá khứ là "was".'
      },
      {
        id: 'ex-un-3',
        type: 'choice',
        prompt: 'Để đếm danh từ "advice" (lời khuyên), ta dùng cụm từ nào?',
        options: ['a piece of advice', 'an advice', 'many advices', 'one advice'],
        correctAnswer: 'a piece of advice',
        explanation: 'Advice là danh từ không đếm được, muốn chỉ 1 lời khuyên ta dùng cụm lượng từ: "a piece of advice".'
      }
    ]
  },

  // 7. THIS, THAT, THESE, THOSE
  {
    id: 7,
    slug: 'this-that-these-those',
    title: 'This, That, These, Those (Chỉ Định Từ)',
    englishTitle: 'Demonstratives (Distance & Time)',
    category: 'pronouns_nouns',
    pageNumber: 16,
    difficulty: 'Cơ bản',
    summary: 'Chỉ khoảng cách không gian (Gần vs Xa), số lượng (Số ít vs Số nhiều) và thời gian (Hiện tại vs Quá khứ đã qua).',
    mnemonics: [
      '📍 GẦN (Đây, này): THIS (số ít - 1 con mèo ở gần) & THESE (số nhiều - đàn mèo ở gần)',
      '🔭 XA (Kia, đó): THAT (số ít - 1 đồng hồ ở xa) & THOSE (số nhiều - các đồng hồ ở xa)',
      '⏳ Về thời gian: THIS / THESE dùng cho sự việc đang gần lúc nói ("Some of these songs are beautiful" - nghe tại chỗ); THAT / THOSE dùng cho sự việc đã qua trong quá khứ ("Those exams last week were difficult")'
    ],
    formulas: [
      {
        label: 'Ma trận khoảng cách và số lượng',
        structure: '• Gần + Số ít ➔ THIS + N (This book, this painting)\n• Gần + Số nhiều ➔ THESE + N (These sandwiches, these cats)\n• Xa + Số ít ➔ THAT + N (That mountain, that car)\n• Xa + Số nhiều ➔ THOSE + N (Those clouds, those pictures)',
        example: {
          en: 'I like this painting, but how much is that computer over there?',
          vi: 'Tôi thích bức tranh này (ở gần), nhưng chiếc máy tính đằng kia (ở xa) giá bao nhiêu?',
          breakdown: [
            { label: 'Gần số ít', text: 'this painting', color: 'bg-blue-100 text-blue-800' },
            { label: 'Xa số ít', text: 'that computer', color: 'bg-purple-100 text-purple-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Sử dụng độc lập không kèm danh từ',
        content: [
          'Khi nghĩa đã rõ ràng, ta có thể dùng this, that, these, those đứng một mình:',
          '• "I have a lot of pens, but THIS is the one I like best" (THIS = this pen).',
          '• Mike xách vali giúp mẹ và kêu lên: "THESE are heavy!" (THESE = these suitcases).'
        ]
      }
    ],
    visualType: 'this_that_lab',
    exercises: [
      {
        id: 'ex-tt-1',
        type: 'fill',
        prompt: 'Look at _____ clouds in the sky. I’m sure it’s going to rain.',
        contextHint: 'Clouds là số nhiều, ở xa trên bầu trời',
        correctAnswer: 'those',
        explanation: 'Những đám mây ở trên trời cao (khoảng cách xa) và là số nhiều (clouds) nên dùng "those".'
      },
      {
        id: 'ex-tt-2',
        type: 'fill',
        prompt: 'I love reading _____ book in my hands. It is very interesting.',
        contextHint: 'Quyển sách đang cầm trên tay (ở gần, số ít)',
        correctAnswer: 'this',
        explanation: 'Quyển sách đang cầm trên tay ở khoảng cách gần, số ít nên dùng "this".'
      },
      {
        id: 'ex-tt-3',
        type: 'fill',
        prompt: 'Come here. _____ is our hotel.',
        contextHint: 'Đi lại gần đây (Come here)',
        correctAnswer: 'This',
        explanation: 'Người nói bảo "Come here" (Lại đây nào) ➔ địa điểm ở gần người nói ➔ "This is our hotel".'
      },
      {
        id: 'ex-tt-4',
        type: 'choice',
        prompt: 'A: Do you have cheaper pens? _____ are very expensive.',
        options: ['These', 'This', 'That', 'Those'],
        correctAnswer: 'These',
        explanation: 'Chỉ các cây bút đang xem trước mặt (số nhiều, ở gần) nên dùng "These".'
      }
    ]
  },

  // 8. PRESENT SIMPLE (HIỆN TẠI ĐƠN)
  {
    id: 8,
    slug: 'present-simple',
    title: 'Hiện Tại Đơn (Present Simple)',
    englishTitle: 'Present Simple Tense (TO BE & VERBS)',
    category: 'tenses',
    pageNumber: 18,
    difficulty: 'Cơ bản',
    summary: 'Diễn tả thói quen lặp đi lặp lại hàng ngày hoặc sự thật hiển nhiên, chân lý bất biến (Trang 18 - 20 sách Lê Công Đức). Chia theo 2 nhánh lớn: Động từ TO BE (am/is/are) và Động từ thường (V / V-s/es).',
    mnemonics: [
      '🐝 Mẹo thêm ES: "Ong CHín Sản Xuất SH" (Tận cùng: -o, -ch, -s, -x, -sh ➔ thêm -es: goes, watches, kisses, fixes, washes)',
      'Phụ âm + y ➔ -ies (fly ➔ flies, study ➔ studies). Nguyên âm + y ➔ thêm s bình thường (play ➔ plays, stay ➔ stays)',
      '🎯 Khi mượn trợ từ DOES/DOESN\'T trong phủ định (-) và nghi vấn (?): Động từ chính quay về NGUYÊN MẪU (không còn s/es)!',
      '⏱️ Vị trí vàng trạng từ tần suất: Đứng SAU động từ TOBE, đứng TRƯỚC động từ thường: (BE < always/often/never < VERB)'
    ],
    formulas: [
      {
        label: 'Nhánh 1: Với Động từ TO BE (am / is / are)',
        structure: '(+) S + am/is/are ➔ Viết tắt: I\'m, You\'re, We\'re, They\'re, He\'s, She\'s, It\'s\n(-) S + am/is/are + not ➔ Viết tắt: I\'m not, aren\'t, isn\'t\n(?) Am/Is/Are + S...?',
        notes: 'I ➔ am; He/She/It/Số ít ➔ is; We/You/They/Số nhiều ➔ are',
        example: {
          en: 'My father is a teacher. He isn\'t twenty-six years old.',
          vi: 'Bố tôi là giáo viên. Bố không phải 26 tuổi (câu thực tế từ Trang 19).',
          breakdown: [
            { label: 'Chủ từ (S)', text: 'My father', color: 'bg-blue-100 text-blue-800' },
            { label: 'TO BE', text: 'is', color: 'bg-purple-100 text-purple-800' },
            { label: 'Bổ ngữ', text: 'a teacher', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      },
      {
        label: 'Nhánh 2: Với Động từ Thường (Action Verbs)',
        structure: '(+) S1 (I/You/We/They) + V(nguyên mẫu) | S2 (He/She/It) + V(-s / -es)\n(-) S1 + don\'t + V(nguyên mẫu) | S2 + doesn\'t + V(nguyên mẫu)\n(?) Do + S1 + V(nguyên mẫu)? | Does + S2 + V(nguyên mẫu)?',
        notes: 'Chú ý: Khi đã dùng don\'t/doesn\'t hoặc do/does thì V luôn ở dạng nguyên mẫu!',
        example: {
          en: 'Tony goes to school on foot, but he doesn\'t like the rain.',
          vi: 'Tony đi bộ đến trường (go ➔ goes vì có đuôi -o), nhưng cậu ấy không thích mưa (doesn\'t like).',
          breakdown: [
            { label: 'Chủ từ ngôi 3 số ít', text: 'Tony', color: 'bg-blue-100 text-blue-800' },
            { label: 'V thêm -es (Ong CHín...)', text: 'goes', color: 'bg-amber-100 text-amber-800' },
            { label: 'Trợ từ + V nguyên mẫu', text: 'doesn\'t like', color: 'bg-rose-100 text-rose-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '1. Hai cách sử dụng kinh điển theo Trang 18',
        content: [
          '• Diễn tả thói quen (hành động thường xuyên lặp đi lặp lại): "She always gets up at 6 every morning", "They often go swimming twice a week".',
          '• Những khái niệm bất biến, chân lý khoa học: "The sun rises in the East" (Mặt trời mọc hướng Đông), "Water boils at 100°C" (Nước sôi ở 100°C).'
        ]
      },
      {
        heading: '2. Dấu hiệu nhận biết & Vị trí trạng từ chỉ tần suất',
        content: [
          '• Từ chỉ thời gian: Every morning, every month, every week, every day, at the weekend...',
          '• Vị trí chuẩn: BE < Never/sometimes/often/usually/always < VERB.',
          '• Ví dụ: "They NEVER go shopping because they don\'t have enough money" (đứng trước go); "She IS ALWAYS friendly" (đứng sau is).'
        ]
      }
    ],
    visualType: 'present_simple_lab',
    exercises: [
      {
        id: 'ex-ps-1',
        type: 'fill',
        prompt: 'Tony _____ (go) to school on foot on Wednesdays and Fridays.',
        contextHint: 'Chia động từ tận cùng -o (Ong CHín Sản Xuất SH) với chủ ngữ số ít Tony',
        correctAnswer: 'goes',
        explanation: 'Chủ ngữ Tony là ngôi thứ ba số ít, động từ "go" tận cùng bằng chữ "o" (thần chú Ong CHín Sản Xuất SH) nên thêm "es" thành "goes".'
      },
      {
        id: 'ex-ps-2',
        type: 'fill',
        prompt: 'Water _____ (boil) at 100°C.',
        contextHint: 'Sự thật hiển nhiên, danh từ không đếm được số ít',
        correctAnswer: 'boils',
        explanation: 'Water là danh từ không đếm được số ít, diễn tả chân lý khoa học bất biến nên động từ boil thêm "s" ➔ boils.'
      },
      {
        id: 'ex-ps-3',
        type: 'fill',
        prompt: 'My father _____ (fly) to Korea regularly.',
        contextHint: 'Tận cùng là phụ âm + y ➔ chuyển thành -ies',
        correctAnswer: 'flies',
        explanation: 'Fly có chữ "y" đứng sau phụ âm "l", khi đi với chủ ngữ số ít "My father" thì đổi "y" thành "ies" ➔ flies.'
      },
      {
        id: 'ex-ps-4',
        type: 'fill',
        prompt: 'My parents _____ (not drink) much coffee every evening.',
        contextHint: 'Dạng phủ định thì hiện tại đơn với chủ ngữ số nhiều My parents',
        correctAnswer: ["don't drink", "do not drink"],
        explanation: 'My parents là danh từ số nhiều nên dùng trợ động từ phủ định don\'t + V nguyên mẫu (don\'t drink).'
      },
      {
        id: 'ex-ps-5',
        type: 'fill',
        prompt: 'She _____ (not like) watching sports on TV. She likes playing them.',
        contextHint: 'Chủ ngữ số ít She ➔ mượn doesn\'t + V nguyên mẫu',
        correctAnswer: ["doesn't like", "does not like"],
        explanation: 'Chủ ngữ ngôi thứ ba số ít "She", câu phủ định mượn trợ từ "doesn\'t", động từ like quay về nguyên mẫu ➔ doesn\'t like.'
      },
      {
        id: 'ex-ps-6',
        type: 'choice',
        prompt: 'Chọn câu hỏi đúng: "_____ you / Spanish?" - "No, I’m French."',
        options: ['Are you Spanish?', 'Do you Spanish?', 'Is you Spanish?', 'Are you Span'],
        correctAnswer: 'Are you Spanish?',
        explanation: 'Spanish là quốc tịch (tính từ), đi với động từ to be "are", câu hỏi đảo "Are" lên trước chủ từ "you".'
      },
      {
        id: 'ex-ps-7',
        type: 'choice',
        prompt: 'He often _____ (watch) TV two hours a day.',
        options: ['watches', 'watchs', 'watch', 'is watch'],
        correctAnswer: 'watches',
        explanation: 'Watch tận cùng bằng "ch" (thần chú CHín), chủ ngữ ngôi He số ít ➔ thêm "es" thành "watches".'
      },
      {
        id: 'ex-ps-8',
        type: 'fill',
        prompt: 'My sister _____ (relax) by listening to classical music.',
        contextHint: 'Tận cùng bằng -x (Xuất) ➔ thêm -es',
        correctAnswer: 'relaxes',
        explanation: 'Động từ relax tận cùng bằng chữ "x", chủ ngữ số ít My sister ➔ thêm "es" thành "relaxes".'
      }
    ]
  },

  // 9. PRESENT CONTINUOUS (HIỆN TẠI TIẾP DIỄN)
  {
    id: 9,
    slug: 'present-continuous',
    title: 'Hiện Tại Tiếp Diễn (Present Continuous)',
    englishTitle: 'Present Continuous Tense',
    category: 'tenses',
    pageNumber: 21,
    difficulty: 'Cơ bản',
    summary: 'Diễn tả hành động đang diễn ra tại thời điểm nói, tính chất tạm thời, kế hoạch tương lai, sau câu mệnh lệnh, thói quen gây bực mình (always) và xu hướng biến đổi.',
    mnemonics: [
      'Công thức luôn phải có cặp đôi: TO BE (am/is/are) + V-ing (thiếu 1 trong 2 là sai ngay!)',
      'Sau câu mệnh lệnh gây chú ý (Look!, Listen!, Be quiet!) ➔ dùng ngay Tiếp Diễn: "Look! The bus is coming."',
      'Thói quen gây bực mình: S + is/are ALWAYS + V-ing ("Because he is always borrowing my pens")',
      'Xu hướng & sự biến đổi với các động từ: get, change, rise, fall, increase ("The air is becoming more polluted")',
      'Quy tắc V-ing: câm "e" bỏ "e" (coming, taking); CVC gấp đôi phụ âm (sitting, getting); đuôi "ie" đổi thành "y" (lying, dying)'
    ],
    formulas: [
      {
        label: 'Cấu trúc cốt lõi theo S1 & S2 (Trang 21)',
        structure: 'S1 (I/We/You/They/N nhiều) + am/are + V-ing\nS2 (He/She/It/N ít) + is + V-ing\n(-) S + am/is/are + not + V-ing (aren\'t / isn\'t)\n(?) (Wh-) + Am/Is/Are + S + V-ing...?',
        notes: 'Dấu hiệu: now, right now, at the moment, at the present',
        example: {
          en: 'Look! The bus is coming. Be hurry!',
          vi: 'Nhìn kìa! Xe buýt đang tới. Nhanh lên nào! (Trích câu 10 bài thực hành 1 - Trang 22).',
          breakdown: [
            { label: 'Mệnh lệnh', text: 'Look!', color: 'bg-rose-100 text-rose-800' },
            { label: 'Chủ từ số ít (S2)', text: 'The bus', color: 'bg-blue-100 text-blue-800' },
            { label: 'is + V-ing (bỏ e)', text: 'is coming', color: 'bg-purple-100 text-purple-800' },
            { label: 'Khuyên giục', text: 'Be hurry!', color: 'bg-amber-100 text-amber-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '6 cách sử dụng kinh điển trích Trang 21',
        content: [
          '1. Đang diễn ra ngay lúc nói: "They are playing football in the school yard now."',
          '2. Hành động mang tính tạm thời: "He is staying with his friend for a few days", "She isn\'t working today."',
          '3. Kế hoạch tương lai đã ấn định: "I am playing tennis this afternoon with my teacher", "We are meeting them at 7 tonight."',
          '4. Sau câu mệnh lệnh gây chú ý: "Be quiet! The babies are sleeping now", "Listen! Someone is singing in the room."',
          '5. Hành động xảy ra thường xuyên đến mức gây bực mình (với always): "He is always asking stupid questions", "Because he is always borrowing my pens."',
          '6. Diễn tả sự biến đổi, xu hướng đang thay đổi: "It\'s getting darker", "The air is becoming more polluted every day", "The world is changing."'
        ]
      }
    ],
    visualType: 'present_continuous_lab',
    exercises: [
      {
        id: 'ex-pc-1',
        type: 'fill',
        prompt: 'Look! The bus __________ (come). Be hurry!',
        contextHint: 'Sau câu cảm thán Look!, chủ ngữ The bus số ít',
        correctAnswer: 'is coming',
        explanation: 'Look! là dấu hiệu hành động đang diễn ra trước mắt, chủ ngữ the bus số ít đi với "is", động từ come có chữ "e" câm nên bỏ "e" rồi thêm "ing" ➔ is coming.'
      },
      {
        id: 'ex-pc-2',
        type: 'fill',
        prompt: 'Why are you always annoyed with Peter? - Because he is always __________ (borrow) my pens.',
        contextHint: 'Cấu trúc phàn nàn bực mình: is always + V-ing',
        correctAnswer: 'borrowing',
        explanation: 'Diễn tả thói quen lặp đi lặp lại gây khó chịu dùng is always + V-ing ➔ borrowing.'
      },
      {
        id: 'ex-pc-3',
        type: 'fill',
        prompt: 'The air __________ (become) more polluted every day.',
        contextHint: 'Diễn tả xu hướng thay đổi, chủ ngữ the air số ít',
        correctAnswer: 'is becoming',
        explanation: 'The air là danh từ không đếm được số ít, động từ become mang nghĩa biến đổi, bỏ chữ "e" câm trước khi thêm "ing" ➔ is becoming.'
      },
      {
        id: 'ex-pc-4',
        type: 'fill',
        prompt: 'He __________ (sit) here just for today because his room is being repaired.',
        contextHint: 'Hành động tạm thời, sit có CVC (phụ âm - nguyên âm - phụ âm)',
        correctAnswer: 'is sitting',
        explanation: 'Diễn tả hành động tạm thời ("just for today"), động từ "sit" có cấu trúc phụ âm - nguyên âm - phụ âm nên gấp đôi phụ âm "t" ➔ is sitting.'
      },
      {
        id: 'ex-pc-5',
        type: 'fill',
        prompt: 'The pollution of the world __________ (increase) very fast.',
        contextHint: 'Diễn tả xu hướng tăng lên, ô nhiễm số ít',
        correctAnswer: 'is increasing',
        explanation: 'The pollution of the world là danh từ số ít, increase bỏ chữ "e" rồi thêm "ing" ➔ is increasing.'
      }
    ]
  },

  // 10. PRESENT PERFECT (HIỆN TẠI HOÀN THÀNH)
  {
    id: 10,
    slug: 'present-perfect',
    title: 'Hiện Tại Hoàn Thành (Present Perfect)',
    englishTitle: 'Present Perfect Tense (Trang 24 - 25)',
    category: 'tenses',
    pageNumber: 24,
    difficulty: 'Trung cấp',
    summary: 'Diễn tả hành động xảy ra trong quá khứ kéo dài đến hiện tại hoặc kết quả còn lưu lại ở hiện tại (Trang 24 - 25 sách Lê Công Đức). Phân định rõ nhóm S1 (have) và S2 (has), thần chú Since (mốc) vs For (khoảng), cấu trúc The first time và so sánh nhất.',
    mnemonics: [
      '🎯 Nhóm S1 vs S2: S1 (I, You, We, They, N nhiều) + HAVE + V3/ed | S2 (He, She, It, N ít) + HAS + V3/ed',
      '⏳ Thần chú SinCe vs FoR: "SINCE đi với MỐC thời gian (1999, last week, yesterday, college), FOR đi với KHOẢNG thời gian (2 years, five years, a long time)"',
      '📍 Vị trí từ khóa vàng: Just/Already/Never đứng GIỮA have/has và V3; Yet đứng CUỐI câu phủ định và nghi vấn',
      '👑 Cấu trúc kinh điển: "This is the first / second / nth time + S + have/has + V3" & "So sánh nhất + S + have/has + ever + V3"'
    ],
    formulas: [
      {
        label: 'Nhóm S1 (I, You, We, They, Danh từ số nhiều)',
        structure: '(+) S1 + have + V3/ED ➔ Rút gọn: They\'ve met each other before\n(-) S1 + have not (haven\'t) + V3/ED ➔ They haven\'t finished that work yet\n(?) Have + S1 + V3/ED ? ➔ Have you watched this movie yet?',
        example: {
          en: 'I have done my homework, and they have lived in Rach Gia City for 2 years.',
          vi: 'Tôi đã làm xong bài tập về nhà, và họ đã sống ở TP Rạch Giá được 2 năm (Trang 24).',
          breakdown: [
            { label: 'S1', text: 'I', color: 'bg-blue-100 text-blue-800' },
            { label: 'have + V3', text: 'have done', color: 'bg-purple-100 text-purple-800' },
            { label: 'Tân ngữ', text: 'my homework', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      },
      {
        label: 'Nhóm S2 (He, She, It, Danh từ số ít)',
        structure: '(+) S2 + has + V3/ED ➔ Rút gọn: She\'s finished her homework / Peter\'s met John since 2001\n(-) S2 + has not (hasn\'t) + V3/ED ➔ She has not eaten her dinner yet\n(?) Has + S2 + V3/ED ? ➔ Has he eaten this kind of food?',
        example: {
          en: 'She has sold her car so now she goes to work by bus.',
          vi: 'Cô ấy đã bán xe hơi rồi nên bây giờ cô ấy đi làm bằng xe buýt (Hành động quá khứ để lại kết quả ở hiện tại).',
          breakdown: [
            { label: 'S2', text: 'She', color: 'bg-blue-100 text-blue-800' },
            { label: 'has + V3', text: 'has sold', color: 'bg-purple-100 text-purple-800' },
            { label: 'Kết quả hiện tại', text: 'now she goes to work by bus', color: 'bg-amber-100 text-amber-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '4 cách sử dụng kinh điển trích Trang 24',
        content: [
          '1. Diễn tả hành động đã xảy ra rồi nhưng thời gian không xác định là khi nào và cho đến hiện tại hành động đó chưa kết thúc hoàn toàn (I\'ve lived in Spain, and the trains are so much reliable there; She has read that newspaper).',
          '2. Diễn tả hành động đã xảy ra dẫn đến 1 kết quả khác ở hiện tại (She has sold her car so now she goes to work by bus; She has lost her pen. Can you lend her yours?).',
          '3. Khi nói về số lần hành động nào đó diễn ra (I\'ve arrived late for work twice this week so far; She has written six letters since lunchtime).',
          '4. Dùng sau so sánh nhất, hoặc diễn đạt ý đây là lần đầu tiên, hoặc lần thứ n nào đó thực hiện một hành động nào đó (This is the loveliest baby I have ever seen; This is the first time that I have heard her sing; It\'s the fifth time you\'ve asked me the same question; This is only the second opera I\'ve ever seen).'
        ]
      }
    ],
    visualType: 'present_perfect_lab',
    exercises: [
      {
        id: 'ex-pp-1',
        type: 'fill',
        prompt: 'I __________ (not see) her since last month.',
        contextHint: 'Chủ ngữ I + phủ định haven\'t + V3 của see (seen)',
        correctAnswer: ["haven't seen", "have not seen"],
        explanation: 'Chủ ngữ I đi với have not / haven\'t, V3 của see là seen ➔ haven\'t seen (Câu 1 Bài thực hành 1 Trang 25).'
      },
      {
        id: 'ex-pp-2',
        type: 'fill',
        prompt: 'They __________ (be) married for 4 years.',
        contextHint: 'They + have + V3 của be (been)',
        correctAnswer: 'have been',
        explanation: 'Chủ ngữ They đi với have, V3 của be là been ➔ have been (Câu 2 Bài 1 Trang 25).'
      },
      {
        id: 'ex-pp-3',
        type: 'fill',
        prompt: 'She __________ (lose) her pen. Can you lend her yours?',
        contextHint: 'She (S2) + has + V3 của lose (lost)',
        correctAnswer: ['has lost', "'s lost"],
        explanation: 'She là ngôi thứ ba số ít dùng has + V3 lost ➔ has lost (Câu 3 Bài 1 Trang 25).'
      },
      {
        id: 'ex-pp-4',
        type: 'choice',
        prompt: 'We haven\'t met John __________ a long time.',
        options: ['for', 'since', 'in', 'at'],
        correctAnswer: 'for',
        explanation: '"a long time" là khoảng thời gian kéo dài nên bắt buộc dùng "for" (Câu 2 Bài 2 Trang 25).'
      },
      {
        id: 'ex-pp-5',
        type: 'fill',
        prompt: 'This is the first time that (I / met) __________ a famous person.',
        contextHint: 'Cấu trúc This is the first time that + S + have/has + V3',
        correctAnswer: ['I have met', "I've met", 'have met'],
        explanation: 'Sau "This is the first time that..." dùng thì hiện tại hoàn thành ➔ I have met (Câu 1 Bài 3 Trang 25).'
      },
      {
        id: 'ex-pp-6',
        type: 'fill',
        prompt: 'This is the prettiest girl (they / ever see) __________ .',
        contextHint: 'So sánh nhất + they have ever seen',
        correctAnswer: ['they have ever seen', "they've ever seen", 'have ever seen'],
        explanation: 'Sau tính từ so sánh nhất "the prettiest girl", dùng "they have ever seen" (Câu 2 Bài 4 Trang 25).'
      }
    ]
  },

  // 11. PRESENT PERFECT CONTINUOUS (HIỆN TẠI HOÀN THÀNH TIẾP DIỄN)
  {
    id: 11,
    slug: 'present-perfect-continuous',
    title: 'Hiện Tại Hoàn Thành Tiếp Diễn (Present Perfect Continuous)',
    englishTitle: 'Present Perfect Continuous Tense (Trang 26 - 28)',
    category: 'tenses',
    pageNumber: 26,
    difficulty: 'Trung cấp',
    summary: 'Diễn tả hành động bắt đầu trong quá khứ kéo dài liên tục tới hiện tại (và có thể tiếp diễn ở tương lai), hoặc hành động vừa mới dừng lại để lại dấu vết rõ rệt ở hiện tại (Trang 26 - 28 sách Lê Công Đức).',
    mnemonics: [
      'Công thức bộ ba bất biến: HAVE / HAS + BEEN + V-ING (không bao giờ được thiếu BEEN hoặc đuôi -ING)',
      '🎯 Nhấn mạnh QUÁ TRÌNH & TÍNH LIÊN TỤC: Trong khi HTHT nhấn mạnh KẾT QUẢ/SỐ LƯỢNG (How many), thì HTHTTD nhấn mạnh THỜI LƯỢNG KÉO DÀI (How long)',
      'Dấu vết hiện tại: "You look hot/tired! – Yes, I\'ve been playing badminton / I\'ve been gardening"',
      '⚠️ Động từ chỉ trạng thái (know, want, like, understand, believe...) KHÔNG chia tiếp diễn, chuyển về Hiện Tại Hoàn Thành (have known)'
    ],
    formulas: [
      {
        label: 'Nhóm S1 (I, You, We, They, Danh từ số nhiều)',
        structure: '(+) S1 + have + been + V_ING ➔ They\'ve been waiting for the bus for 4 hours\n(-) S1 + have not (haven\'t) + been + V_ING ➔ They haven\'t been walking\n(?) Have + S1 + been + V_ING ? ➔ Have you been watching TV for hours?',
        example: {
          en: 'I have been living here for two years.',
          vi: 'Tôi đã và đang sống ở đây liên tục được 2 năm rồi (Trang 26).',
          breakdown: [
            { label: 'S1', text: 'I', color: 'bg-blue-100 text-blue-800' },
            { label: 'have been', text: 'have been', color: 'bg-purple-100 text-purple-800' },
            { label: 'V-ING', text: 'living', color: 'bg-amber-100 text-amber-800' },
            { label: 'Thời lượng', text: 'here for two years', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      },
      {
        label: 'Nhóm S2 (She, He, It, Danh từ số ít)',
        structure: '(+) S2 + has + been + V_ING ➔ She\'s been working here since 2010\n(-) S2 + has not (hasn\'t) + been + V_ING ➔ She has not been eating anything\n(?) Has + S2 + been + V_ING ? ➔ Has it been raining for hours?',
        example: {
          en: 'You look hot. – Yes, I\'ve been playing badminton.',
          vi: 'Trông cậu nóng thế. – Ừ, tôi vừa mới chơi cầu lông xong (hành động vừa kết thúc để lại dấu vết).',
          breakdown: [
            { label: 'Dấu vết hiện tại', text: 'You look hot', color: 'bg-rose-100 text-rose-800' },
            { label: 'S + have been + V-ing', text: "I've been playing badminton", color: 'bg-amber-100 text-amber-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '6 cách sử dụng kinh điển trích Trang 26',
        content: [
          '1. Nhìn lại hành động/tình huống bắt đầu trong quá khứ và sẽ tiếp tục xảy ra tiếp: "House prices have been growing up steadily this year", "I\'ve been working hard recently".',
          '2. Nói về việc sử dụng thời gian của ai đó cho đến thời điểm hiện tại: "That kid has been watching TV non-stop since breakfast", "What have you been doing with yourself? I\'ve been trying to write a novel".',
          '3. Diễn tả hành động chỉ vừa mới kết thúc (có dấu vết): "You look hot. – Yes, I\'ve been playing badminton", "I must just go and wash. I\'ve been gardening".',
          '4. Diễn tả hoạt động lặp lại và cũng như đang xảy ra: "People have been phoning me all day", "I\'ve been waking up in the night a lot".',
          '5. Đi với những từ đề cập đến khoảng thời gian vẫn tiếp tục tới hiện tại: recently, lately, this week, since + mốc, for + khoảng ("I\'ve been doing a new job since January", "It\'s been raining for the last three days").',
          '6. Dùng để nói về hành động nào đó đã và đang xảy ra trong bao lâu rồi (How long): "How long have you been studying English? – For over 10 years", "I\'ve been working here for two months".'
        ]
      }
    ],
    visualType: 'present_perfect_continuous_lab',
    exercises: [
      {
        id: 'ex-ppc-1',
        type: 'fill',
        prompt: 'She __________ (work) in this firm for five years.',
        contextHint: 'Chủ ngữ She (S2) + has been + V-ing',
        correctAnswer: ['has been working', "'s been working"],
        explanation: 'She đi với has been working, diễn tả hành động làm việc liên tục suốt 5 năm (Câu 1 Bài 1 Trang 27).'
      },
      {
        id: 'ex-ppc-2',
        type: 'fill',
        prompt: 'Your eyes are red. __________ (you / cry)?',
        contextHint: 'Đôi mắt đỏ hoe là dấu vết của hành động vừa mới dừng lại',
        correctAnswer: ['Have you been crying', 'have you been crying'],
        explanation: 'Nhìn thấy mắt đỏ (dấu vết ở hiện tại) ➔ dùng câu hỏi HTHTTD: "Have you been crying?" (Câu 3 Bài 1 Trang 27).'
      },
      {
        id: 'ex-ppc-3',
        type: 'fill',
        prompt: 'How long __________ (she / learn) English? – For over 10 years.',
        contextHint: 'Hỏi bao lâu với How long',
        correctAnswer: ['has she been learning'],
        explanation: 'Câu hỏi "How long has she been learning English?" (Câu 7 Bài 1 Trang 27).'
      },
      {
        id: 'ex-ppc-4',
        type: 'fill',
        prompt: 'It __________ (rain) so the roads are very wet.',
        contextHint: 'Mặt đường ướt nhẹp là kết quả của việc vừa mưa xong',
        correctAnswer: ['has been raining', "'s been raining"],
        explanation: 'Đường ướt sũng do trời vừa mưa liên tục ➔ "has been raining" (Câu 2 Bài 3 Trang 27).'
      }
    ]
  },

  // 12. PAST SIMPLE (QUÁ KHỨ ĐƠN)
  {
    id: 12,
    slug: 'past-simple',
    title: 'Quá Khứ Đơn (Past Simple)',
    englishTitle: 'Past Simple Tense (Trang 29 - 31)',
    category: 'tenses',
    pageNumber: 29,
    difficulty: 'Cơ bản',
    summary: 'Diễn tả hành động đã diễn ra và KẾT THÚC DỨT ĐIỂM trong quá khứ (Trang 29 - 31 sách Lê Công Đức). Phân biệt rành mạch nhánh TO BE (was / were) và nhánh Động từ thường (V-ed / V2 / didn\'t).',
    mnemonics: [
      '⏳ Dấu hiệu nhận biết vàng: Last... (last night, last summer), ...ago (3 days ago, minutes ago), in 2000, from 1999 to 2010',
      '🎯 To Be trong quá khứ: I, He, She, It, Danh từ số ít ➔ WAS | You, We, They, Danh từ số nhiều ➔ WERE',
      '⚡ Động từ thường: Khẳng định dùng V-ed hoặc V2 (Bất quy tắc). Khi mượn trợ từ DID / DIDN\'T ➔ Động từ quay về NGUYÊN MẪU (V1)!',
      '💡 Khác biệt sống còn với HTHT: "I lived in New York 3 years ago" (nay KHÔNG CÒN sống ở đó nữa), khác với "I have lived in NY for 3 years" (nay vẫn đang sống)'
    ],
    formulas: [
      {
        label: 'Nhánh 1: Với Động Từ TO BE (was / were)',
        structure: '(+) S(I, He, She, It, N ít) + WAS | S(You, We, They, N nhiều) + WERE\n(-) wasn\'t (was not) / weren\'t (were not)\n(?) Was / Were + S ...? ➔ Yes, S was/were / No, S wasn\'t/weren\'t',
        example: {
          en: 'We were in Korea three days ago, but Tom was on holiday.',
          vi: 'Chúng tôi đã ở Hàn Quốc cách đây 3 ngày, còn Tom thì đi nghỉ mát (Trang 29).',
          breakdown: [
            { label: 'S (nhiều)', text: 'We', color: 'bg-blue-100 text-blue-800' },
            { label: 'were', text: 'were', color: 'bg-purple-100 text-purple-800' },
            { label: 'Thời gian', text: 'three days ago', color: 'bg-amber-100 text-amber-800' }
          ]
        }
      },
      {
        label: 'Nhánh 2: Với Động Từ Thường (VERBS)',
        structure: '(+) S + V-ED (có quy tắc) hoặc V2 (bảng bất quy tắc)\n(-) S + didn\'t + V(nguyên mẫu)\n(?) Did + S + V(nguyên mẫu) ...?',
        example: {
          en: 'He came home late yesterday and she didn\'t work last Sunday.',
          vi: 'Anh ấy đã về nhà trễ ngày hôm qua và cô ấy đã không đi làm vào chủ nhật tuần trước (Trang 29).',
          breakdown: [
            { label: 'S', text: 'He', color: 'bg-blue-100 text-blue-800' },
            { label: 'V2 (come ➔ came)', text: 'came', color: 'bg-purple-100 text-purple-800' },
            { label: 'didn\'t + V nguyên mẫu', text: "didn't work", color: 'bg-rose-100 text-rose-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Hai nhánh ngữ pháp và lưu ý dứt điểm',
        content: [
          '1. Diễn tả hành động đã diễn ra và kết thúc (dứt điểm) trong quá khứ: "I lived in New York three years ago" (Hiện tại người nói không còn sống ở New York nữa mà là một nơi nào đó khác).',
          '2. Dấu hiệu nhận biết: Last summer, last night, last Monday, last weekend; minutes ago, three years ago, long time ago; in 2000, from 1990 to 2000.',
          '3. Khi dùng trợ động từ DID hoặc DIDN\'T: Bắt buộc động từ chính phải trở về dạng nguyên mẫu không "ed" và không chia bất quy tắc!'
        ]
      }
    ],
    visualType: 'past_simple_lab',
    exercises: [
      {
        id: 'ex-past-1',
        type: 'fill',
        prompt: 'They __________ (visit) their parents last week.',
        contextHint: 'visit thêm ed',
        correctAnswer: 'visited',
        explanation: 'Last week là dấu hiệu quá khứ đơn, động từ visit thêm ed ➔ visited (Câu 2 Bài 1 Trang 31).'
      },
      {
        id: 'ex-past-2',
        type: 'fill',
        prompt: 'We __________ (not go) to school last Saturday.',
        contextHint: 'Phủ định với didn\'t + go',
        correctAnswer: ["didn't go", "did not go"],
        explanation: 'Phủ định quá khứ đơn mượn didn\'t + V nguyên mẫu ➔ didn\'t go (Câu 1 Bài 2 Trang 31).'
      },
      {
        id: 'ex-past-3',
        type: 'fill',
        prompt: 'My father __________ (be) a teacher from 1999 to 2012. Now he\'s a businessman.',
        contextHint: 'My father là số ít trong quá khứ',
        correctAnswer: 'was',
        explanation: 'Chủ ngữ My father là số ít trong quá khứ dùng was (Câu 1 Bài 1 Trang 30).'
      },
      {
        id: 'ex-past-4',
        type: 'fill',
        prompt: 'I __________ (come) to Vietnam last summer vacation.',
        contextHint: 'come chuyển sang V2 bất quy tắc',
        correctAnswer: 'came',
        explanation: 'Động từ bất quy tắc của come là came (Câu 3 Bài 1 Trang 31).'
      },
      {
        id: 'ex-past-5',
        type: 'fill',
        prompt: 'Where __________ (you / last night)? – At home.',
        contextHint: 'Đặt câu hỏi với To Be cho you',
        correctAnswer: ['were you', 'were you last night'],
        explanation: 'You đi với were trong câu hỏi ➔ Where were you last night? (Câu 1 Bài 3 Trang 30).'
      }
    ]
  },

  // 13. PAST CONTINUOUS (QUÁ KHỨ TIẾP DIỄN)
  {
    id: 13,
    slug: 'past-continuous',
    title: 'Quá Khứ Tiếp Diễn (Past Continuous)',
    englishTitle: 'Past Continuous Tense (Trang 32 - 33)',
    category: 'tenses',
    pageNumber: 32,
    difficulty: 'Trung cấp',
    summary: 'Diễn tả hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ, hoặc hành động đang xảy ra (Dài - was/were + V-ing) thì có hành động khác xen vào ngắn hơn (Quá Khứ Đơn) - Trang 32 & 33 sách Lê Công Đức.',
    mnemonics: [
      '⏳ Cấu trúc vàng: I, He, She, It, Danh từ số ít ➔ WAS + V-ING | You, We, They, Danh từ số nhiều ➔ WERE + V-ING',
      '⚡ Thần chú Dài vs Ngắn: Hành động DÀI đang diễn ra chia Quá Khứ Tiếp Diễn, hành động NGẮN xen vào chia Quá Khứ Đơn',
      '🎯 Thần chú While vs When: While + Quá Khứ Tiếp Diễn (While I was driving home...), When + Quá Khứ Đơn (When I came...)',
      '💡 Tạm thời vs Lâu bền: Tạm thời dùng QKTD ("was living in Eastbourne"), lâu dài định cư dùng QKĐ ("lived in London for ten years")',
      '⚠️ Thói quen bất ngờ / Phàn nàn: Đi với always / continually ("was always turning up without warning")'
    ],
    formulas: [
      {
        label: 'Cấu trúc Khẳng định, Phủ định & Nghi vấn',
        structure: '(+) S(I, He, She, It, N ít) + WAS + V-ING\n(+) S(You, We, They, N nhiều) + WERE + V-ING\n(-) S + wasn\'t / weren\'t + V-ING\n(?) Was / Were + S + V-ING ...? ➔ Yes, S was/were / No, S wasn\'t/weren\'t',
        example: {
          en: 'She was doing her homework at 8 o\'clock last night.',
          vi: 'Cô ấy đã đang làm bài tập về nhà vào lúc 8 giờ tối hôm qua (Trang 32).',
          breakdown: [
            { label: 'S (ít)', text: 'She', color: 'bg-blue-100 text-blue-800' },
            { label: 'was', text: 'was', color: 'bg-purple-100 text-purple-800' },
            { label: 'V-ing', text: 'doing her homework', color: 'bg-emerald-100 text-emerald-800' },
            { label: 'Thời điểm cụ thể', text: 'at 8 o\'clock last night', color: 'bg-amber-100 text-amber-800' }
          ]
        }
      },
      {
        label: 'Mô hình Dài xen Ngắn (While / When)',
        structure: 'While + S + was/were + V-ing (hành động DÀI), S + V2/ed (hành động NGẮN xen vào)\nWhen + S + V2/ed (hành động NGẮN), S + was/were + V-ing (hành động DÀI)',
        example: {
          en: 'I saw an accident while I was driving home from work.',
          vi: 'Tôi nhìn thấy một vụ tai nạn khi tôi đang lái xe từ chỗ làm về nhà (Trang 32).',
          breakdown: [
            { label: 'Hành động ngắn (QKĐ)', text: 'I saw an accident', color: 'bg-rose-100 text-rose-800' },
            { label: 'Liên từ', text: 'while', color: 'bg-amber-100 text-amber-800' },
            { label: 'Hành động dài (QKTD)', text: 'I was driving home', color: 'bg-indigo-100 text-indigo-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '5 Cách sử dụng cốt lõi của Thì Quá Khứ Tiếp Diễn (Trang 32)',
        content: [
          '1. Diễn tả hành động đang diễn ra tại 1 thời điểm cụ thể nào đó trong quá khứ: "She was talking to a strange man this time yesterday.", "What were they doing at eight o\'clock last night?".',
          '2. Diễn tả hành động đang xảy ra ở quá khứ thì có hành động khác nảy sinh trong quá trình hành động ban đầu đang xảy ra hoặc xen vào: Hành động kéo dài hơn dùng Quá Khứ Tiếp Diễn, hành động ngắn hơn dùng Quá Khứ Đơn ("When I came yesterday, he was sleeping.", "I saw an accident while I was driving home from work.").',
          '3. Diễn tả hành động mang tính tạm thời (QKTD), còn lâu bền hơn thì dùng QKĐ: "It happened when I was living in Eastbourne last year" (tạm thời) vs "I lived in London for ten years while I was a child" (lâu dài).',
          '4. Hay sử dụng với động từ say để nhấn mạnh những gì được nói: "John was saying that he still can\'t find a job."',
          '5. Với always, continually: Diễn đạt việc thường xuyên xảy ra rất bất ngờ hoặc không theo kế hoạch trước (phàn nàn): "Aunt Lucy was always turning up without warning and bringing us presents.", "I didn\'t like him – he was continually borrowing money."'
        ]
      }
    ],
    visualType: 'past_continuous_lab',
    exercises: [
      {
        id: 'ex-pc-1',
        type: 'fill',
        prompt: 'I __________ (play) soccer with my friends at 9 p.m yesterday.',
        contextHint: 'at 9 p.m yesterday là thời điểm cụ thể, I đi với was + V-ing',
        correctAnswer: 'was playing',
        explanation: 'Thời điểm cụ thể trong quá khứ (at 9 p.m yesterday) ➔ dùng Quá Khứ Tiếp Diễn: was playing (Câu 1 Bài 1 Trang 33).'
      },
      {
        id: 'ex-pc-2',
        type: 'fill',
        prompt: 'We __________ (sit) in a restaurant when the accident happened.',
        contextHint: 'We đi với were, lưu ý gấp đôi phụ âm t của sit',
        correctAnswer: 'were sitting',
        explanation: 'Hành động đang ngồi trong nhà hàng kéo dài ➔ were sitting (sit gấp đôi chữ t) thì tai nạn xảy ra xen vào (Câu 3 Bài 1 Trang 33).'
      },
      {
        id: 'ex-pc-3',
        type: 'fill',
        prompt: 'While we were cooking, the phone __________ (ring).',
        contextHint: 'Chuông reo là hành động ngắn xen vào ➔ chia Quá Khứ Đơn',
        correctAnswer: 'rang',
        explanation: 'Khi chúng tôi đang nấu ăn (dài), chuông reo chen ngang (ngắn) ➔ dùng Quá Khứ Đơn: ring biến thành rang (Câu 3 Bài 2 Trang 33).'
      },
      {
        id: 'ex-pc-4',
        type: 'fill',
        prompt: 'She __________ (make) a cake when the light went out.',
        contextHint: 'Đang làm bánh thì đèn tắt (went out)',
        correctAnswer: 'was making',
        explanation: 'Hành động đang làm bánh kéo dài thì bị cúp điện chen ngang ➔ was making (make bỏ e thêm ing) (Câu 6 Bài 2 Trang 33).'
      },
      {
        id: 'ex-pc-5',
        type: 'fill',
        prompt: 'I went to that park very often while I __________ (live) in London for my MA course.',
        contextHint: 'Tạm thời đi học khóa MA ➔ dùng Quá Khứ Tiếp Diễn',
        correctAnswer: 'was living',
        explanation: 'Sống tạm thời trong thời gian học cao học (MA course) ➔ was living (Câu 9 Bài 1 Trang 33).'
      }
    ]
  },

  // 14. PAST PERFECT (QUÁ KHỨ HOÀN THÀNH)
  {
    id: 14,
    slug: 'past-perfect',
    title: 'Quá Khứ Hoàn Thành (Past Perfect)',
    englishTitle: 'Past Perfect Tense (Trang 34 - 35)',
    category: 'tenses',
    pageNumber: 34,
    difficulty: 'Trung cấp',
    summary: 'Diễn tả hành động đã xảy ra và hoàn tất TRƯỚC một thời điểm hoặc một hành động khác trong quá khứ (Trang 34 & 35 sách Lê Công Đức). Áp dụng công thức S + had + V3/ED cho tất cả các ngôi.',
    mnemonics: [
      '⏳ Cấu trúc bất biến: S + HAD + V3/ED (áp dụng cho mọi ngôi I, You, We, They, He, She, It, Danh từ số ít hay số nhiều)',
      '⚡ Quy tắc vàng Trước - Sau: Hành động xảy ra TRƯỚC dùng Quá Khứ Hoàn Thành, hành động xảy ra SAU dùng Quá Khứ Đơn',
      '🎯 Thần chú Before - After: QKHT + before + QKĐ (Trước Before là QKHT) | QKĐ + after + QKHT (Sau After là QKHT)',
      '💡 Dấu hiệu nhận biết: By the time + QKĐ, QKHT | By 2010, before 1975, before it was shown...',
      '🏆 Cấu trúc số lần trong quá khứ: It was the first / second / third time + (that) + S + had + V3/ed'
    ],
    formulas: [
      {
        label: 'Cấu trúc Khẳng định, Phủ định & Nghi vấn',
        structure: '(+) S + had + V3/ED\n(-) S + had not (hadn\'t) + V3/ED\n(?) Had + S + V3/ED ...? ➔ Yes, S had / No, S hadn\'t',
        example: {
          en: 'We had left before you came.',
          vi: 'Chúng tôi đã rời đi trước khi bạn đến (Trang 34).',
          breakdown: [
            { label: 'S', text: 'We', color: 'bg-blue-100 text-blue-800' },
            { label: 'had + V3 (xảy ra trước)', text: 'had left', color: 'bg-purple-100 text-purple-800' },
            { label: 'before', text: 'before', color: 'bg-amber-100 text-amber-800' },
            { label: 'QKĐ (xảy ra sau)', text: 'you came', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      },
      {
        label: 'Mô hình liên từ Trước - Sau',
        structure: 'By the time + S + V2/ed (SAU), S + had + V3/ed (TRƯỚC)\nS + had + V3/ed + before + S + V2/ed\nS + V2/ed + after + S + had + V3/ed',
        example: {
          en: 'By the time you arrived, I had prepared our dinner.',
          vi: 'Vào lúc bạn đến, tôi đã chuẩn bị xong bữa tối cho chúng ta rồi (Trang 34).',
          breakdown: [
            { label: 'Liên từ', text: 'By the time', color: 'bg-amber-100 text-amber-800' },
            { label: 'Xảy ra sau (QKĐ)', text: 'you arrived', color: 'bg-blue-100 text-blue-800' },
            { label: 'Xảy ra trước (QKHT)', text: 'I had prepared our dinner', color: 'bg-purple-100 text-purple-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: '4 Cách sử dụng cốt lõi của Thì Quá Khứ Hoàn Thành (Trang 34)',
        content: [
          '1. Diễn tả hành động đã xảy ra rồi trước 1 thời điểm nào đó trong quá khứ: "Duc Tri High School had been built by August 2010.", "I suddenly realized that we had met before.", "She had lived in Hue before 1975.".',
          '2. Diễn tả hành động đã xảy ra trước 1 hành động nào đó trong quá khứ: Nếu hành động nào xảy ra trước thì dùng quá khứ hoàn thành, hành động nào xảy ra sau đó thì dùng thì quá khứ đơn ("By the time you arrived, I had prepared our dinner.", "I went to school after I had eaten my breakfast.", "I had met him before he flew to New York.").',
          '3. Để nói về hành động nào đó đã xảy ra trong bao lâu rồi cho đến 1 thời điểm nào đó trong quá khứ: "I was sorry to sell my car. I had had it since College." (sở hữu từ thời đại học cho đến lúc bán).',
          '4. Cấu trúc số lần trong quá khứ: It was the first / second / third ... + (that) + subject + had + V3/ed ("It was the first time I had eaten such delicious food.", "It was the second time that I had sung this song.").'
        ]
      }
    ],
    visualType: 'past_perfect_lab',
    exercises: [
      {
        id: 'ex-pp-1',
        type: 'fill',
        prompt: 'Did you think that we __________ (meet) before?',
        contextHint: 'Hành động gặp xảy ra trước thời điểm nghĩ ➔ had + V3',
        correctAnswer: 'had met',
        explanation: 'Gặp nhau trước thời điểm nghĩ trong quá khứ ➔ dùng Quá Khứ Hoàn Thành: had met (Câu 1 Bài 1 Trang 35).'
      },
      {
        id: 'ex-pp-2',
        type: 'fill',
        prompt: 'We __________ (not finish) our assignments before you came.',
        contextHint: 'Trước before chia QKHT phủ định',
        correctAnswer: ["hadn't finished", 'had not finished'],
        explanation: 'Trước khi bạn đến (before you came - QKĐ) thì bài tập chưa xong (xảy ra trước đó) ➔ hadn\'t finished (Câu 2 Bài 1 Trang 35).'
      },
      {
        id: 'ex-pp-3',
        type: 'fill',
        prompt: 'My brother __________ (graduate) by 2010.',
        contextHint: 'by + mốc thời gian quá khứ (by 2010) ➔ QKHT',
        correctAnswer: 'had graduated',
        explanation: 'Dấu hiệu "by 2010" ➔ hành động tốt nghiệp hoàn thành trước năm 2010 ➔ had graduated (Câu 3 Bài 1 Trang 35).'
      },
      {
        id: 'ex-pp-4',
        type: 'fill',
        prompt: 'This was the third time she __________ (visit) this country.',
        contextHint: 'This was the third time + had + V3/ed',
        correctAnswer: 'had visited',
        explanation: 'Cấu trúc "This was the third time..." trong quá khứ bắt buộc đi với quá khứ hoàn thành ➔ had visited (Câu 4 Bài 1 Trang 35).'
      },
      {
        id: 'ex-pp-5',
        type: 'fill',
        prompt: 'They played soccer after they __________ (study) for 5 hours.',
        contextHint: 'Sau after là hành động xảy ra trước ➔ chia QKHT',
        correctAnswer: 'had studied',
        explanation: 'Học bài 5 tiếng xảy ra trước (had studied) rồi sau đó mới đi đá bóng (played) (Câu 7 Bài 2 Trang 35).'
      }
    ]
  },

  // 20. PRESENT SIMPLE PASSIVE (BỊ ĐỘNG HIỆN TẠI ĐƠN)
  {
    id: 20,
    slug: 'present-simple-passive',
    title: 'Bị Động Hiện Tại Đơn',
    englishTitle: 'Present Simple Passive',
    category: 'passive',
    pageNumber: 48,
    difficulty: 'Trung cấp',
    summary: 'Nhấn mạnh vào đối tượng chịu tác động hoặc khi người thực hiện hành động không quan trọng / đã rõ ràng.',
    mnemonics: [
      '3 bước thần tốc: 1. Đưa Tân ngữ (O) lên làm Chủ ngữ mới (S) | 2. Thêm Be (am/is/are) theo chủ ngữ mới | 3. Đổi V chính sang V3/ed',
      'Khi nào bỏ "by..."? Bỏ khi tác nhân chung chung (by people, by them, by someone, by everyone)',
      'Khi nào giữ "by..."? Giữ khi tác nhân cụ thể, quan trọng (by my mother, by Shakespeare, by the police)'
    ],
    formulas: [
      {
        label: 'Công thức chuyển đổi trực quan',
        structure: 'Chủ động: S + V(s/es) + O\n➔ Bị động: S(bị động) + am/is/are + V3/ed + (by O)',
        example: {
          en: 'English is spoken all over the world.',
          vi: 'Tiếng Anh được nói trên toàn thế giới.',
          breakdown: [
            { label: 'S (O cũ)', text: 'English', color: 'bg-blue-100 text-blue-800' },
            { label: 'Be', text: 'is', color: 'bg-purple-100 text-purple-800' },
            { label: 'V3', text: 'spoken', color: 'bg-pink-100 text-pink-800' },
            { label: 'Nơi chốn', text: 'all over the world', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Ví dụ so sánh đối chiếu',
        content: [
          'Chủ động: People plant trees to protect the environment.',
          'Bị động: Trees are planted to protect the environment (bỏ by people vì chung chung).',
          'Chủ động: My mother wakes me up every morning.',
          'Bị động: I am waken up by my mother every morning (giữ by my mother vì cụ thể).'
        ]
      }
    ],
    visualType: 'passive_transformer',
    exercises: [
      {
        id: 'ex-psp-1',
        type: 'rewrite',
        prompt: 'Chuyển sang bị động: "Somebody cleans the office every day."',
        contextHint: 'The office là số ít ➔ is + V3',
        correctAnswer: [
          'The office is cleaned every day',
          'The office is cleaned every day by somebody'
        ],
        explanation: 'Tân ngữ "the office" chuyển lên làm chủ ngữ số ít + is + V3 cleaned + every day (lược bỏ by somebody).'
      },
      {
        id: 'ex-psp-2',
        type: 'rewrite',
        prompt: 'Chuyển sang bị động: "People speak English here."',
        contextHint: 'English là danh từ không đếm được số ít',
        correctAnswer: [
          'English is spoken here',
          'English is spoken here by people'
        ],
        explanation: 'English + is + V3 spoken + here (bỏ by people).'
      },
      {
        id: 'ex-psp-3',
        type: 'fill',
        prompt: 'In Asian countries, rice __________ (plant) in large fields.',
        contextHint: 'Chia bị động thì hiện tại đơn',
        correctAnswer: 'is planted',
        explanation: 'Rice là danh từ không đếm được nên chia số ít: is planted.'
      }
    ]
  },

  // 29. HAVE/GET SOMETHING DONE (BỊ ĐỘNG NHỜ VẢ)
  {
    id: 29,
    slug: 'causative-have-get',
    title: 'Thể Nhờ Vả (Have & Get Something Done)',
    englishTitle: 'Causative Forms: Have & Get',
    category: 'passive',
    pageNumber: 69,
    difficulty: 'Nâng cao',
    summary: 'Diễn tả việc nhờ người khác làm điều gì đó cho mình, hoặc không may bị ai đó gây thiệt hại.',
    mnemonics: [
      '🏆 Thần chú Nhờ Vả:',
      '• Have someone DO something (Have người ➔ V nguyên mẫu)',
      '• Get someone TO DO something (Get người ➔ TO V)',
      '• Have / Get SOMETHING DONE (Vật ở giữa ➔ luôn luôn dùng V3/ed)'
    ],
    formulas: [
      {
        label: '1. Nhờ làm một vật gì đó (Bị động)',
        structure: 'S + have / get + SOMETHING + V3/ed (+ by O)',
        notes: 'Dùng khi mang đồ vật đi sửa, cắt tóc, giặt ủi hoặc rủi ro (had money stolen)',
        example: {
          en: 'I had my bike repaired by a mechanic.',
          vi: 'Tôi đã đem xe đạp đi tiệm sửa (nhờ thợ sửa chứ không tự sửa).',
          breakdown: [
            { label: 'S', text: 'I', color: 'bg-blue-100 text-blue-800' },
            { label: 'Have', text: 'had', color: 'bg-purple-100 text-purple-800' },
            { label: 'Vật', text: 'my bike', color: 'bg-amber-100 text-amber-800' },
            { label: 'V3/ed', text: 'repaired', color: 'bg-rose-100 text-rose-800' }
          ]
        }
      },
      {
        label: '2. Nêu rõ người được nhờ (Chủ động)',
        structure: '• S + have + SOMEBODY + V-nguyên mẫu\n• S + get + SOMEBODY + TO-V',
        example: {
          en: 'I will have Mike repair my bike = I will get Mike to repair my bike.',
          vi: 'Tôi sẽ nhờ Mike sửa xe đạp giúp tôi.'
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Hai tình huống sử dụng',
        content: [
          'Tình huống 1 (Nhờ vả chủ đích): I am going to get my hair cut (Tôi sắp đi cắt tóc).',
          'Tình huống 2 (Rủi ro bất ngờ): John had all his money stolen in the hotel (John bị trộm hết sạch tiền).'
        ]
      }
    ],
    visualType: 'passive_transformer',
    exercises: [
      {
        id: 'ex-have-1',
        type: 'fill',
        prompt: 'I always get Mr. Nguyen __________ (cut) my hair.',
        contextHint: 'Sau get + người ➔ V ở dạng nào?',
        correctAnswer: 'to cut',
        explanation: 'Công thức "Get someone TO DO something" nên động từ chia là "to cut".'
      },
      {
        id: 'ex-have-2',
        type: 'fill',
        prompt: 'I usually have Phuong, my sister, __________ (type) important letters.',
        contextHint: 'Sau have + người ➔ V ở dạng nào?',
        correctAnswer: 'type',
        explanation: 'Công thức "Have someone DO something" (V nguyên mẫu không to) ➔ type.'
      },
      {
        id: 'ex-have-3',
        type: 'fill',
        prompt: 'My hair was so long, so I got my hair __________ (cut) yesterday.',
        contextHint: 'Sau got + vật (my hair) ➔ V3',
        correctAnswer: 'cut',
        explanation: 'Công thức "Get something DONE (V3)" ➔ V3 của cut vẫn là cut.'
      }
    ]
  },

  // 31. REPORTED SPEECH (CÂU TƯỜNG THUẬT)
  {
    id: 31,
    slug: 'reported-speech',
    title: 'Câu Tường Thuật (Reported Speech)',
    englishTitle: 'Indirect / Reported Speech',
    category: 'reported',
    pageNumber: 74,
    difficulty: 'Trung cấp',
    summary: 'Thuật lại lời nói của người khác bằng cách lùi thì, biến đổi đại từ xưng hô và trạng từ chỉ thời gian, nơi chốn.',
    mnemonics: [
      '3 Bước lùi thần thánh:',
      '1. Lùi thì một bước: Hiện tại đơn ➔ Quá khứ đơn; Hiện tại tiếp diễn ➔ Quá khứ tiếp diễn; Quá khứ đơn & Hiện tại hoàn thành ➔ Quá khứ hoàn thành (had + V3)',
      '2. Modals lùi: Will ➔ Would, Can ➔ Could, Must ➔ Had to',
      '3. Đổi thời gian: Today ➔ That day; Tomorrow ➔ The following/next day; Yesterday ➔ The day before; Now ➔ Then; Here ➔ There'
    ],
    formulas: [
      {
        label: 'Câu phát biểu gián tiếp',
        structure: 'S + said (that) + S\' + V(lùi thì) + Trạng từ đổi',
        notes: 'Nếu có người nghe: S + told me/him/her that...',
        example: {
          en: '"I am working now" ➔ He said that he was working then.',
          vi: '"Tôi đang làm việc bây giờ" ➔ Anh ấy nói rằng lúc đó anh ấy đang làm việc.',
          breakdown: [
            { label: 'Chủ ngữ tường thuật', text: 'He said that', color: 'bg-blue-100 text-blue-800' },
            { label: 'Đại từ đổi (I ➔ he)', text: 'he', color: 'bg-indigo-100 text-indigo-800' },
            { label: 'Thì lùi (am ➔ was)', text: 'was working', color: 'bg-purple-100 text-purple-800' },
            { label: 'Trạng từ đổi (now ➔ then)', text: 'then', color: 'bg-amber-100 text-amber-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Bảng lùi thì chi tiết',
        content: [
          'V1/s/es ➔ V2/ed',
          'am/is/are + Ving ➔ was/were + Ving',
          'have/has + V3 ➔ had + V3',
          'V2/ed (quá khứ đơn) ➔ had + V3 (quá khứ hoàn thành)'
        ]
      }
    ],
    visualType: 'speech_shift',
    exercises: [
      {
        id: 'ex-rep-1',
        type: 'rewrite',
        prompt: 'John: "Mandy is in the living room talking with her parents." ➔ John said that Mandy ____________________',
        contextHint: 'Lùi is ➔ was',
        correctAnswer: [
          'was in the living room talking with her parents',
          'Mandy was in the living room talking with her parents'
        ],
        explanation: 'Thì hiện tại tiếp diễn "is talking / is in..." lùi về quá khứ tiếp diễn "was in the living room talking with her parents".'
      },
      {
        id: 'ex-rep-2',
        type: 'rewrite',
        prompt: 'Emily: "My parents and I will go to the USA tomorrow." ➔ Emily said that her parents and she ____________________',
        contextHint: 'will ➔ would, tomorrow ➔ the following day',
        correctAnswer: [
          'would go to the USA the following day',
          'would go to the USA the next day'
        ],
        explanation: 'Will lùi thành would, tomorrow đổi thành the next day hoặc the following day.'
      }
    ]
  },

  // 36. TAG QUESTIONS (CÂU HỎI ĐUÔI)
  {
    id: 36,
    slug: 'tag-questions',
    title: 'Câu Hỏi Đuôi (Tag Questions)',
    englishTitle: 'Tag Questions',
    category: 'advanced_prepositions',
    pageNumber: 86,
    difficulty: 'Trung cấp',
    summary: 'Câu hỏi ngắn ở cuối câu để xác nhận thông tin. Quy tắc cơ bản: Vế trước khẳng định (+) ➔ Đuôi phủ định (-), và ngược lại.',
    mnemonics: [
      '⚖️ Quy tắc đòn bẩy: Trước (+) thì Đuôi (-); Trước (-) thì Đuôi (+)',
      '⭐ 5 Trường hợp đặc biệt cực dễ ra thi:',
      '1. "I am..." ➔ đuôi luôn là "...aren\'t I?" (không có amn\'t I)',
      '2. "Let\'s..." ➔ đuôi luôn là "...shall we?"',
      '3. Chủ ngữ Nothing/Everything ➔ đuôi dùng đại từ "it"',
      '4. Chủ ngữ Nobody/Somebody/Everyone ➔ đuôi dùng đại từ "they"',
      '5. Câu mệnh lệnh: "Be quiet, can\'t you? / Don\'t forget, will you?"'
    ],
    formulas: [
      {
        label: 'Công thức chung',
        structure: 'Mệnh đề (+), Trợ động từ (-) + Đại từ chủ ngữ?\nMệnh đề (-), Trợ động từ (+) + Đại từ chủ ngữ?',
        example: {
          en: 'You come from Australia, don\'t you?',
          vi: 'Bạn đến từ Úc, phải không?',
          breakdown: [
            { label: 'Mệnh đề (+)', text: 'You come from Australia', color: 'bg-emerald-100 text-emerald-800' },
            { label: 'Đuôi (-)', text: "don't you?", color: 'bg-rose-100 text-rose-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Ví dụ các trường hợp đặc biệt',
        content: [
          'I am right, aren\'t I? (Tôi đúng chứ?)',
          'Let\'s play soccer, shall we? (Chúng mình chơi bóng đá nhé?)',
          'Nobody phoned, did they? (Không ai gọi điện cả, đúng không? - Vì Nobody mang nghĩa phủ định nên đuôi ở dạng khẳng định, và nobody đổi thành they)',
          'Nothing happened, did it? (Chẳng có gì xảy ra cả, đúng không?)'
        ]
      }
    ],
    visualType: 'mnemonic_card',
    exercises: [
      {
        id: 'ex-tag-1',
        type: 'fill',
        prompt: 'I am right, __________?',
        contextHint: 'Đặc biệt của I am',
        correctAnswer: "aren't I",
        explanation: 'Sau "I am..." trong câu hỏi đuôi luôn dùng "aren\'t I?".'
      },
      {
        id: 'ex-tag-2',
        type: 'fill',
        prompt: 'Let’s have a party tonight, __________?',
        contextHint: 'Đặc biệt của Let’s',
        correctAnswer: 'shall we',
        explanation: 'Mệnh đề bắt đầu bằng "Let\'s..." thì câu hỏi đuôi luôn là "shall we?".'
      },
      {
        id: 'ex-tag-3',
        type: 'fill',
        prompt: 'Nothing happened, __________?',
        contextHint: 'Nothing là phủ định, đại từ thay thế là it',
        correctAnswer: 'did it',
        explanation: 'Happened là thì quá khứ đơn, "nothing" mang nghĩa phủ định nên đuôi ở dạng khẳng định "did", đại từ thay thế cho nothing là "it" ➔ "did it?".'
      }
    ]
  },

  // 41. GERUND OR INFINITIVE (STOP, TRY, REMEMBER...)
  {
    id: 41,
    slug: 'verb-ing-or-to',
    title: 'Thêm -ING Hay Thêm TO Đặc Biệt',
    englishTitle: 'Verbs with To-V vs V-ing',
    category: 'verb_forms',
    pageNumber: 97,
    difficulty: 'Trung cấp',
    summary: 'Các động từ thay đổi nghĩa hoàn toàn khi đi với To-V hoặc V-ing: Stop, Try, Remember, Forget, Regret, Need.',
    mnemonics: [
      '🛑 STOP: Stop V-ing = DỪNG HẲN việc đang làm; Stop To-V = DỪNG LẠI ĐỂ LÀM việc khác',
      '🎯 TRY: Try V-ing = THỬ làm thử xem sao; Try To-V = CỐ GẮNG, nỗ lực hết sức',
      '🧠 REMEMBER / FORGET: + V-ing = Nhớ/Quên chuyện ĐÃ LÀM trong quá khứ; + To-V = Nhớ/Quên việc PHẢI LÀM ở hiện tại/tương lai',
      '🏠 NEED: Vật + need V-ing (= need to be done): "The car needs washing" = "The car needs to be washed"'
    ],
    formulas: [
      {
        label: 'Cặp đối chiếu kinh điển',
        structure: '• S + stop + V-ing (bỏ hẳn thói quen)\n• S + stop + to-V (tạm dừng việc này để chuyển sang việc kia)',
        example: {
          en: 'He stopped smoking 3 years ago (dừng hẳn) vs He stopped to buy some flowers (dừng lại để mua hoa).',
          vi: 'Anh ấy đã bỏ thuốc lá 3 năm trước vs Anh ấy dừng lại để mua hoa.'
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Bảng đối chiếu 5 động từ trọng tâm',
        content: [
          '1. Remember V-ing (nhớ đã làm gì): I remember locking the door.',
          '   Remember to-V (nhớ phải làm gì): Please remember to lock the door.',
          '2. Forget V-ing (quên đã làm gì): I forgot buying milk (đã mua rồi mà quên).',
          '   Forget to-V (quên phải làm gì): Don\'t forget to buy milk (đừng quên mua nhé).',
          '3. Regret V-ing (hối tiếc vì đã làm): I regret telling him my secret.',
          '   Regret to-V (lấy làm tiếc khi phải báo tin): We regret to inform you that your application failed.'
        ]
      }
    ],
    visualType: 'mnemonic_card',
    exercises: [
      {
        id: 'ex-vform-1',
        type: 'choice',
        prompt: 'The teacher told us to stop _____ noise because he was lecturing.',
        options: ['making', 'to make', 'make', 'made'],
        correctAnswer: 'making',
        explanation: 'Ngừng hẳn việc gây ồn ➔ dùng stop + V-ing (making).'
      },
      {
        id: 'ex-vform-2',
        type: 'fill',
        prompt: 'Please remember __________ (lock) the door before you leave home.',
        contextHint: 'Nhớ phải làm việc trong tương lai',
        correctAnswer: 'to lock',
        explanation: 'Nhớ thực hiện một bổn phận, hành động chưa diễn ra ➔ remember to-V ➔ to lock.'
      },
      {
        id: 'ex-vform-3',
        type: 'fill',
        prompt: 'The windows are very dirty. They need __________ (clean).',
        contextHint: 'Chủ ngữ là vật (the windows) cần được làm sạch',
        correctAnswer: ['cleaning', 'to be cleaned'],
        explanation: 'Chủ ngữ chỉ vật + need + V-ing (hoặc need to be V3) mang nghĩa bị động ➔ cleaning / to be cleaned.'
      }
    ]
  },

  // 60. CONDITIONALS (CÂU ĐIỀU KIỆN)
  {
    id: 60,
    slug: 'conditionals-0-1-2-3',
    title: 'Câu Điều Kiện (Loại 0, 1, 2, 3)',
    englishTitle: 'Conditionals (Types 0, 1, 2, 3)',
    category: 'conditionals_wish',
    pageNumber: 133,
    difficulty: 'Trung cấp',
    summary: 'Hệ thống câu điều kiện từ sự thật hiển nhiên (Loại 0), có thể xảy ra ở hiện tại/tương lai (Loại 1), giả định trái hiện tại (Loại 2), đến tiếc nuối quá khứ (Loại 3).',
    mnemonics: [
      '🌡️ Loại 0 (Chân lý 100%): If + Hiện tại đơn, Hiện tại đơn ("If water reaches 100°C, it boils")',
      '🌱 Loại 1 (Có thể xảy ra): If + Hiện tại đơn, will + V nguyên mẫu ("If it rains, we will stay home")',
      '💭 Loại 2 (Trái hiện tại - Giả định): If + Quá khứ đơn (Be dùng WERE cho mọi ngôi), would/could + V ("If I were rich, I would travel the world")',
      '⏳ Loại 3 (Trái quá khứ - Tiếc nuối): If + had + V3/ed, would/could + have + V3/ed ("If I had studied harder, I would have passed")',
      '⚡ Đảo ngữ Loại 3: Bỏ IF, đảo HAD lên trước S ("Had I brought an umbrella, I wouldn\'t have got wet")'
    ],
    formulas: [
      {
        label: 'Cây phả hệ 4 loại điều kiện',
        structure: 'Type 0: If + S + V(s/es), S + V(s/es)\nType 1: If + S + V(s/es), S + will + V\nType 2: If + S + V2/were, S + would + V\nType 3: If + S + had + V3, S + would have + V3',
        example: {
          en: 'If I were you, I would accept that job offer.',
          vi: 'Nếu tôi là bạn (thực tế tôi không phải là bạn), tôi sẽ nhận lời mời làm việc đó.',
          breakdown: [
            { label: 'If clause (unreal)', text: 'If I were you', color: 'bg-blue-100 text-blue-800' },
            { label: 'Main clause', text: 'I would accept', color: 'bg-purple-100 text-purple-800' },
            { label: 'Tân ngữ', text: 'that job offer', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Bản đồ xác suất thực tế',
        content: [
          'Loại 0: 100% Chắc chắn xảy ra theo quy luật tự nhiên.',
          'Loại 1: ~50% Khả năng cao sẽ xảy ra nếu điều kiện được đáp ứng.',
          'Loại 2: 0% Giả định ngược lại hoàn toàn với hiện tại.',
          'Loại 3: 0% Quá khứ đã xong xuôi rồi, không thể sửa đổi được nữa.'
        ]
      }
    ],
    visualType: 'conditionals_slider',
    exercises: [
      {
        id: 'ex-cond-1',
        type: 'fill',
        prompt: 'If I __________ (be) in Paris now, I would take a lot of photos with my friends.',
        contextHint: 'Điều kiện loại 2 giả định trái hiện tại, to be chia là gì?',
        correctAnswer: 'were',
        explanation: 'Điều kiện loại 2 giả định trái ngược với thực tế ở hiện tại, động từ to be ưu tiên dùng "were" cho tất cả các ngôi.'
      },
      {
        id: 'ex-cond-2',
        type: 'fill',
        prompt: 'If she __________ (earn) a lot of money in the future, she will fly to New York.',
        contextHint: 'Điều kiện loại 1 (mệnh đề If chia thì gì?)',
        correctAnswer: 'earns',
        explanation: 'Mệnh đề If của điều kiện loại 1 chia thì hiện tại đơn, chủ ngữ she số ít ➔ earns.'
      },
      {
        id: 'ex-cond-3',
        type: 'fill',
        prompt: 'If I had brought an umbrella with me yesterday, I __________ (not get) wet.',
        contextHint: 'Điều kiện loại 3 (vế chính would have V3)',
        correctAnswer: ["wouldn't have got", "would not have got", "wouldn't have gotten"],
        explanation: 'Điều kiện loại 3 mệnh đề chính có công thức: would have + V3 ➔ wouldn\'t have got.'
      }
    ]
  },

  // 68. COMPARISONS (SO SÁNH HƠN, NHẤT, KÉP)
  {
    id: 68,
    slug: 'comparisons-all',
    title: 'Nghệ Thuật So Sánh (Hơn, Nhất, Kép)',
    englishTitle: 'Comparative & Superlative Forms',
    category: 'comparison',
    pageNumber: 151,
    difficulty: 'Trung cấp',
    summary: 'Quy tắc tính từ ngắn, tính từ dài, các trường hợp bất quy tắc và cấu trúc so sánh kép "Càng... Càng...".',
    mnemonics: [
      '📏 Tính từ NGẮN (1 âm tiết, hoặc 2 âm tận cùng -y): thêm -er / -est (tall ➔ taller, easy ➔ easier)',
      '📜 Tính từ DÀI (2 âm tiết trở lên): thêm MORE / THE MOST (beautiful ➔ more beautiful ➔ the most beautiful)',
      '🌟 Bất quy tắc cần thuộc nằm lòng: Good ➔ Better ➔ The Best | Bad ➔ Worse ➔ The Worst',
      '🚀 So sánh kép "Càng... thì càng...": "THE + so sánh hơn..., THE + so sánh hơn..." ("The more you practice, the better you become!")'
    ],
    formulas: [
      {
        label: 'Công thức so sánh kép (Double Comparative)',
        structure: 'The + Comparative (more/adj-er) + S + V, The + Comparative (more/adj-er) + S + V',
        example: {
          en: 'The more you study, the more intelligent you become.',
          vi: 'Bạn càng học nhiều, bạn càng trở nên thông minh hơn.',
          breakdown: [
            { label: 'Vế 1 (Nguyên nhân)', text: 'The more you study', color: 'bg-blue-100 text-blue-800' },
            { label: 'Vế 2 (Kết quả tăng dần)', text: 'the more intelligent you become', color: 'bg-emerald-100 text-emerald-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'So sánh danh từ số lượng',
        content: [
          'Đếm được số nhiều: MORE books (nhiều hơn), FEWER friends (ít hơn)',
          'Không đếm được: MORE money (nhiều hơn), LESS information (ít hơn)'
        ]
      }
    ],
    visualType: 'comparison_scale',
    exercises: [
      {
        id: 'ex-comp-1',
        type: 'fill',
        prompt: 'Bernard is 1.75m and Alison is 1.6m. Bernard is __________ (tall) than Alison.',
        contextHint: 'So sánh hơn với tính từ ngắn tall',
        correctAnswer: 'taller',
        explanation: 'Tall là tính từ ngắn 1 âm tiết, thêm đuôi -er ➔ taller.'
      },
      {
        id: 'ex-comp-2',
        type: 'choice',
        prompt: 'This is _____ expensive watch in the luxury shop.',
        options: ['the most', 'more', 'the more', 'most'],
        correctAnswer: 'the most',
        explanation: 'So sánh nhất với tính từ dài expensive dùng "the most expensive".'
      },
      {
        id: 'ex-comp-3',
        type: 'fill',
        prompt: 'The more you exercise, the __________ (healthy) you will be.',
        contextHint: 'So sánh kép: healthy biến đổi đuôi y',
        correctAnswer: 'healthier',
        explanation: 'Healthy tận cùng là "y", đổi thành i rồi thêm er ➔ the healthier.'
      }
    ]
  },

  // 80. SUBJECT-VERB AGREEMENT (SỰ HÒA HỢP S-V)
  {
    id: 80,
    slug: 'subject-verb-agreement',
    title: '11 Quy Tắc Hòa Hợp Chủ Từ & Động Từ',
    englishTitle: 'Subject and Verb Agreement',
    category: 'advanced_prepositions',
    pageNumber: 178,
    difficulty: 'Nâng cao',
    summary: '11 bí quyết chia động từ chính xác khi chủ ngữ và động từ bị ngăn cách bởi các cụm từ gây nhiễu.',
    mnemonics: [
      '1. Cụm xen vào (along with, together with, as well as) ➔ Động từ chỉ chia theo CHỦ NGỮ ĐẦU TIÊN!',
      '2. Đại từ bất định (everyone, somebody, nothing, anyone...) ➔ Luôn tính là SỐ ÍT',
      '3. Cặp "Either... or", "Neither... nor", "Not only... but also" ➔ Động từ chia theo CHỦ NGỮ GẦN NÓ NHẤT!',
      '4. Danh từ chỉ tiền, thời gian, khoảng cách ("Five dollars", "Ten miles") ➔ Tính là 1 đơn vị ➔ Động từ SỐ ÍT',
      '5. "A number of + N số nhiều" ➔ V SỐ NHIỀU (nghĩa là nhiều học sinh)\n"The number of + N số nhiều" ➔ V SỐ ÍT (nghĩa là con số số lượng)'
    ],
    formulas: [
      {
        label: 'Cụm chen ngang không ảnh hưởng',
        structure: 'S1 + [along with / together with / as well as + S2] + Verb (chia theo S1!)',
        example: {
          en: 'The actress, along with her manager and friends, is going to a party tonight.',
          vi: 'Nữ diễn viên, cùng với người quản lý và bạn bè của cô ấy, sẽ đi dự tiệc tối nay (chia "is" theo The actress).',
          breakdown: [
            { label: 'Chủ ngữ chính (S1 số ít)', text: 'The actress', color: 'bg-blue-100 text-blue-800' },
            { label: 'Cụm xen vào (bỏ qua)', text: ', along with her manager and friends,', color: 'bg-slate-100 text-slate-600' },
            { label: 'Động từ (chia theo S1)', text: 'is going', color: 'bg-purple-100 text-purple-800' }
          ]
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Phân biệt A Number Of vs The Number Of',
        content: [
          'A number of students ARE planting trees (Một số lượng lớn học sinh đang trồng cây ➔ số nhiều).',
          'The number of students IS increasing (Số lượng học sinh đang tăng lên ➔ số ít vì chủ thể là "con số").'
        ]
      }
    ],
    visualType: 'mnemonic_card',
    exercises: [
      {
        id: 'ex-sva-1',
        type: 'fill',
        prompt: 'Mr. Obama, accompanied with his staffs, __________ (visit) Vietnam in 2016.',
        contextHint: 'Chia động từ theo Mr. Obama (quá khứ đơn)',
        correctAnswer: 'visited',
        explanation: 'Cụm "accompanied with his staffs" chỉ là thành phần bổ trợ, động từ chia theo Mr. Obama.'
      },
      {
        id: 'ex-sva-2',
        type: 'choice',
        prompt: 'Neither John nor his friends _____ going to the beach today.',
        options: ['are', 'is', 'was', 'be'],
        correctAnswer: 'are',
        explanation: 'Trong cấu trúc "Neither... nor...", động từ chia theo danh từ gần nó nhất ("his friends" là số nhiều) ➔ are.'
      },
      {
        id: 'ex-sva-3',
        type: 'choice',
        prompt: 'Five hundred dollars _____ too expensive for this jacket.',
        options: ['is', 'are', 'were', 'have been'],
        correctAnswer: 'is',
        explanation: 'Số tiền (Five hundred dollars) được xem là một đơn vị tổng thể duy nhất, nên đi với động từ số ít "is".'
      }
    ]
  },

  // 84. PREPOSITIONS (GIỚI TỪ NƠI CHỐN & THỜI GIAN)
  {
    id: 84,
    slug: 'prepositions-place-time',
    title: 'Giới Từ Nơi Chốn & Thời Gian (In, On, At)',
    englishTitle: 'Prepositions of Place and Time',
    category: 'advanced_prepositions',
    pageNumber: 190,
    difficulty: 'Cơ bản',
    summary: 'Quy tắc hình phễu kinh điển In - On - At cho cả không gian (tổng quát đến điểm cụ thể) và thời gian.',
    mnemonics: [
      '🔻 Hình phễu thời gian & nơi chốn:',
      '• IN (Rộng nhất): Năm (in 2026), Mùa (in summer), Tháng (in June); Đất nước (in Vietnam), Thành phố (in Hanoi), Không gian kín (in the room)',
      '• ON (Vừa phải): Thứ (on Monday), Ngày cụ thể (on June 9th), Bề mặt (on the table, on the wall)',
      '• AT (Chính xác nhất): Giờ chính xác (at 7:00, at noon, at midnight); Địa điểm cụ thể (at the bus stop, at school, at home)'
    ],
    formulas: [
      {
        label: 'Giới từ chuyển động',
        structure: '• INTO (vào bên trong) vs OUT OF (ra khỏi)\n• ONTO (lên trên bề mặt) vs OFF (rời khỏi bề mặt)\n• ACROSS (băng qua) / THROUGH (xuyên qua đường hầm/rừng)',
        example: {
          en: 'The cat jumped onto the table, then ran through the window.',
          vi: 'Con mèo nhảy lên bàn, rồi chạy xuyên qua cửa sổ.'
        }
      }
    ],
    detailedTheory: [
      {
        heading: 'Các cụm từ ngoại lệ cần chú ý',
        content: [
          'In the morning, in the afternoon, in the evening NHƯNG lại dùng AT NIGHT, AT NOON.',
          'At the weekend (Anh-Anh) hoặc On the weekend (Anh-Mỹ).'
        ]
      }
    ],
    visualType: 'preposition_map',
    exercises: [
      {
        id: 'ex-prep-1',
        type: 'fill',
        prompt: 'My birthday is __________ (in / on / at) June 09th.',
        contextHint: 'Có ngày cụ thể 09th đi kèm tháng',
        correctAnswer: 'on',
        explanation: 'Nếu chỉ có tháng thì dùng "in June", nhưng có ngày cụ thể (June 09th) thì bắt buộc dùng "on".'
      },
      {
        id: 'ex-prep-2',
        type: 'fill',
        prompt: 'I am waiting for you __________ (in / on / at) the bus stop.',
        contextHint: 'Điểm dừng cụ thể',
        correctAnswer: 'at',
        explanation: 'Trạm xe buýt (bus stop) là một địa điểm tọa độ cụ thể nên dùng "at the bus stop".'
      },
      {
        id: 'ex-prep-3',
        type: 'choice',
        prompt: 'The runners ran _____ the bridge to the finish line.',
        options: ['across', 'in', 'at', 'into'],
        correctAnswer: 'across',
        explanation: 'Chạy băng qua một cây cầu dùng giới từ chuyển động "across the bridge".'
      }
    ]
  }
];

// Helper to find a topic by slug or ID
export function getTopicById(id: number): GrammarTopic | undefined {
  return GRAMMAR_TOPICS.find(t => t.id === id);
}

export function getTopicsByCategory(catId: string): GrammarTopic[] {
  return GRAMMAR_TOPICS.filter(t => t.category === catId);
}
