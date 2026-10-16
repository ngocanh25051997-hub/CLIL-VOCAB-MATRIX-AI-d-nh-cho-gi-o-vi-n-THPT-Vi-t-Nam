import { ClilProjectData } from '../types/clil';

export const demoNewtonLaw: ClilProjectData = {
  id: 'demo-physics-10-newton-2nd-law',
  title: 'Định luật II Newton (Newton’s Second Law of Motion)',
  subject: 'Vật lí',
  grade: 'Lớp 10',
  topic: 'Định luật II Newton - Mối quan hệ giữa Lực, Khối lượng và Gia tốc',
  contentKnowledge: `Gia tốc của một vật cùng hướng với lực tác dụng lên vật. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực tác dụng và tỉ lệ nghịch với khối lượng của vật.
Biểu thức vectơ: a⃗ = F⃗ / m hay F⃗ = m · a⃗.
Trong hệ SI: Lực F tính bằng Newton (N), khối lượng m tính bằng kilôgam (kg), gia tốc a tính bằng mét trên giây bình phương (m/s²). 1 N = 1 kg·m/s².
Nếu vật chịu tác dụng của nhiều lực thì F⃗ là hợp lực của các lực đó (F⃗ = ΣF⃗_i).`,
  englishLevel: 'B1',
  termCount: 8,
  knowledgeGoal: 'Học sinh phát biểu được định luật II Newton, viết được hệ thức vectơ và vô hướng F = ma, tính toán được gia tốc, hợp lực và giải thích được mối quan hệ tỉ lệ.',
  languageGoal: 'Học sinh sử dụng chính xác các thuật ngữ vật lí (net force, acceleration, directly/inversely proportional), cấu trúc so sánh kép (The greater the..., the...) và mẫu câu lập luận khoa học trong thảo luận cặp đôi.',
  isDemo: true,
  createdAt: '2026-10-15T08:00:00.000Z',
  lastModifiedAt: '2026-10-15T08:00:00.000Z',

  // MODULE 1: SMART GLOSSARY
  glossary: [
    {
      id: 'term-1',
      term: 'Net force',
      vietnamese: 'Hợp lực',
      englishDefinition: 'The overall force acting on an object when all individual forces are combined together.',
      ipa: '/ˌnet ˈfɔːs/',
      partOfSpeech: 'noun phrase',
      exampleSentence: 'If the net force acting on a cart is zero, it will maintain its state of motion.',
      collocations: ['calculate the net force', 'nonzero net force', 'direction of the net force'],
      commonMistakes: 'Học sinh thường nhầm lẫn giữa một lực đơn lẻ (single force) và hợp lực (net force / resultant force). Lưu ý: phải cộng vectơ các lực.',
      verified: true,
      notes: 'Thuật ngữ nền tảng của động lực học Newton.'
    },
    {
      id: 'term-2',
      term: 'Acceleration',
      vietnamese: 'Gia tốc',
      englishDefinition: 'The rate at which an object changes its velocity over time.',
      ipa: '/əkˌsel.əˈreɪ.ʃən/',
      partOfSpeech: 'noun',
      exampleSentence: 'The car has a constant acceleration of 2 meters per second squared.',
      collocations: ['uniform acceleration', 'rate of acceleration', 'produce an acceleration'],
      commonMistakes: 'Nhầm lẫn giữa tốc độ (speed), vận tốc (velocity) và gia tốc (acceleration). Nhầm dấu âm của gia tốc chỉ hướng chuyển động thay vì sự giảm vận tốc.',
      verified: true,
      notes: 'Đơn vị đo: m/s².'
    },
    {
      id: 'term-3',
      term: 'Mass',
      vietnamese: 'Khối lượng',
      englishDefinition: 'A quantitative measure of an object’s resistance to acceleration (inertia).',
      ipa: '/mæs/',
      partOfSpeech: 'noun',
      exampleSentence: 'An object with a larger mass requires a greater net force to accelerate.',
      collocations: ['measure the mass', 'inertial mass', 'constant mass'],
      commonMistakes: 'Nhầm lẫn nghiêm trọng giữa "mass" (khối lượng, đơn vị kg, vô hướng, không đổi theo vị trí) và "weight" (trọng lượng, đơn vị N, là một lực hút trọng trường).',
      verified: true,
      notes: 'Thước đo mức quán tính của vật.'
    },
    {
      id: 'term-4',
      term: 'Directly proportional',
      vietnamese: 'Tỉ lệ thuận',
      englishDefinition: 'Related in such a way that as one quantity increases, the other increases at the same rate.',
      ipa: '/dɪˈrekt.li prəˈpɔː.ʃən.əl/',
      partOfSpeech: 'adjective phrase',
      exampleSentence: 'According to Newton’s law, acceleration is directly proportional to the applied net force.',
      collocations: ['be directly proportional to', 'directly proportional relationship'],
      commonMistakes: 'Dùng nhầm giới từ "with" thay vì "to" (sai: *directly proportional with). Đúng: "directly proportional to".',
      verified: true,
      notes: 'Cấu trúc toán học: y = k · x.'
    },
    {
      id: 'term-5',
      term: 'Inversely proportional',
      vietnamese: 'Tỉ lệ nghịch',
      englishDefinition: 'Related in such a way that as one quantity increases, the other quantity decreases proportionally.',
      ipa: '/ɪnˈvɜːs.li prəˈpɔː.ʃən.əl/',
      partOfSpeech: 'adjective phrase',
      exampleSentence: 'For a given force, acceleration is inversely proportional to the mass of the cart.',
      collocations: ['be inversely proportional to', 'vary inversely with'],
      commonMistakes: 'Nhầm lẫn giữa tỉ lệ nghịch (y = k/x) và tương quan âm tính bất kỳ (negative trend). Giới từ chuẩn là "to".',
      verified: true,
      notes: 'Cấu trúc toán học: y = k / x.'
    },
    {
      id: 'term-6',
      term: 'Inertia',
      vietnamese: 'Quán tính',
      englishDefinition: 'The tendency of an object to resist any change in its state of rest or motion.',
      ipa: '/ɪˈnɜː.ʃə/',
      partOfSpeech: 'noun',
      exampleSentence: 'Heavier trucks have greater inertia and require a longer distance to come to a stop.',
      collocations: ['principle of inertia', 'overcome inertia', 'measure of inertia'],
      commonMistakes: 'Học sinh nghĩ quán tính là một loại "lực" tác dụng (sai: "inertia force pushes"). Quán tính là thuộc tính cố hữu gắn liền với khối lượng, không phải ngoại lực.',
      verified: true,
      notes: 'Gắn liền với Định luật I và II.'
    },
    {
      id: 'term-7',
      term: 'Magnitude',
      vietnamese: 'Độ lớn (độ dài vectơ)',
      englishDefinition: 'The numerical size, quantity, or absolute value of a physical property, without regard to direction.',
      ipa: '/ˈmæɡ.nɪ.tʃuːd/',
      partOfSpeech: 'noun',
      exampleSentence: 'The magnitude of the gravitational force between the two spheres is 50 Newtons.',
      collocations: ['order of magnitude', 'magnitude of the force', 'equal in magnitude'],
      commonMistakes: 'Học sinh bỏ qua sự phân biệt giữa đại lượng vectơ (có cả magnitude và direction) và đại lượng vô hướng (chỉ có magnitude).',
      verified: true,
      notes: 'Thường biểu diễn bằng ký hiệu trị tuyệt đối |F⃗| hoặc F.'
    },
    {
      id: 'term-8',
      term: 'Uniform motion',
      vietnamese: 'Chuyển động thẳng đều',
      englishDefinition: 'Motion of an object along a straight path with constant speed and zero acceleration.',
      ipa: '/ˈjuː.nɪ.fɔːm ˈməʊ.ʃən/',
      partOfSpeech: 'noun phrase',
      exampleSentence: 'When the net force is zero, the object continues in uniform motion in a straight line.',
      collocations: ['maintain uniform motion', 'rectilinear uniform motion'],
      commonMistakes: 'Nhầm giữa "uniform motion" (vận tốc không đổi, gia tốc = 0) và "uniformly accelerated motion" (chuyển động thẳng biến đổi đều, gia tốc = const).',
      verified: true,
      notes: 'Được nhắc đến trong sự tương phản khi F = 0.'
    }
  ],

  // MODULE 2: TEACHER LANGUAGE BANK
  teacherLanguageBank: {
    instructionalPhrases: [
      {
        category: 'Giảng giải khái niệm & công thức',
        vietnamesePurpose: 'Khẳng định mối quan hệ định lượng giữa lực và gia tốc',
        englishPhrase: 'Notice how the acceleration vector always points in the exact same direction as the net force.',
        notes: 'Nhấn mạnh tính vectơ của biểu thức F = ma'
      },
      {
        category: 'Giảng giải khái niệm & công thức',
        vietnamesePurpose: 'Nêu bật mối quan hệ tỉ lệ thuận',
        englishPhrase: 'If we double the net force applied to the cart, its acceleration will also double.',
        notes: 'Dùng câu điều kiện loại 1 kết hợp so sánh tỉ lệ'
      },
      {
        category: 'Giảng giải khái niệm & công thức',
        vietnamesePurpose: 'Nêu bật mối quan hệ tỉ lệ nghịch với khối lượng',
        englishPhrase: 'Holding the force constant, a heavier object will accelerate much more slowly because mass resists change.',
        notes: 'Giải thích nguyên nhân bằng quán tính'
      },
      {
        category: 'Khái quát & Chốt kiến thức',
        vietnamesePurpose: 'Tóm tắt phương trình cốt lõi của định luật',
        englishPhrase: 'In mathematical terms, F equals m times a. Therefore, one Newton is the force needed to accelerate one kilogram at one meter per second squared.',
        notes: 'Định nghĩa đơn vị Newton'
      }
    ],
    questioningPrompts: [
      {
        cognitiveLevel: 'Nhận biết',
        vietnamesePrompt: 'Hỏi về đơn vị đo chuẩn trong hệ SI của các đại lượng',
        englishPrompt: 'What is the SI unit for force, and how is it expressed in base units?',
        followUp: 'Can you show how 1 Newton is equivalent to 1 kg·m/s²?'
      },
      {
        cognitiveLevel: 'Diễn giải',
        vietnamesePrompt: 'Yêu cầu học sinh giải thích bằng lời mối quan hệ tỉ lệ',
        englishPrompt: 'Why does a loaded shopping cart accelerate more slowly than an empty one pushed with the same force?',
        followUp: 'Which quantity in Newton’s second law explains this difference?'
      },
      {
        cognitiveLevel: 'Vận dụng',
        vietnamesePrompt: 'Đặt bài toán thực tế yêu cầu tính toán và lập luận',
        englishPrompt: 'A 1200-kg car accelerates from rest at 2.5 m/s². What is the net forward force acting on it?',
        followUp: 'If a passenger adds 80 kg to the car, how will the acceleration change if the engine force stays unchanged?'
      }
    ],
    activityInstructions: [
      {
        activityType: 'Hoạt động ghép từ (Matching)',
        vietnameseInstruction: 'Hướng dẫn học sinh ghép thuật ngữ tiếng Anh với định nghĩa vật lí phù hợp',
        englishInstruction: 'Match each physics term on the left with its accurate scientific definition on the right. Check your answers with your shoulder partner.'
      },
      {
        activityType: 'Hoạt động điền khuyết (Fill-in-the-blank)',
        vietnameseInstruction: 'Hướng dẫn học sinh điền từ ngữ cảnh vào bài toán',
        englishInstruction: 'Complete the summary sentences using appropriate academic terms from the word bank. Pay close attention to singular and plural forms.'
      },
      {
        activityType: 'Thảo luận cặp đôi (Pair Work)',
        vietnameseInstruction: 'Hướng dẫn học sinh phân vai và thảo luận thí nghiệm',
        englishInstruction: 'Student A will describe the experimental hypothesis using the frame provided, and Student B will predict the acceleration using Newton’s formula.'
      }
    ],
    studentScaffoldingFrames: [
      {
        purpose: 'Khung trả lời khi so sánh lực và gia tốc',
        starterFrame: 'When the net force acting on the object increases by a factor of [number], the acceleration...',
        exampleCompletion: 'When the net force acting on the object increases by a factor of 3, the acceleration will also increase threefold.'
      },
      {
        purpose: 'Khung trả lời khi giải thích ảnh hưởng của khối lượng',
        starterFrame: 'Because acceleration is inversely proportional to mass, an object with greater mass will...',
        exampleCompletion: 'Because acceleration is inversely proportional to mass, an object with greater mass will experience a smaller acceleration under the same force.'
      },
      {
        purpose: 'Khung kết luận định luật trong báo cáo thực hành',
        starterFrame: 'Based on our experimental data, we can conclude that F_net is equal to...',
        exampleCompletion: 'Based on our experimental data, we can conclude that F_net is equal to the product of mass and acceleration (F = ma).'
      }
    ]
  },

  // MODULE 3: CLIL MATRIX 3 × 3
  clilMatrix: [
    // ROW 1: Language OF Learning (Ngôn ngữ kiến thức cốt lõi)
    {
      dimension: 'Language of Learning',
      cognitiveLevel: 'Nhận biết',
      dimensionLabelVi: 'Ngôn ngữ kiến thức cốt lõi',
      cognitiveLabelVi: 'Nhận biết',
      focusDescription: 'Nhận diện các danh từ khoa học, ký hiệu đại lượng và đơn vị đo chuẩn trong định luật II Newton.',
      sampleItems: [
        'Net force (F_net)',
        'Acceleration (a, m/s²)',
        'Mass (m, kg)',
        'Newton (N = kg·m/s²)',
        'Vector quantity vs scalar quantity'
      ],
      emergingLanguage: ['Friction force (Lực ma sát cản trở)', 'Resultant vector']
    },
    {
      dimension: 'Language of Learning',
      cognitiveLevel: 'Diễn giải',
      dimensionLabelVi: 'Ngôn ngữ kiến thức cốt lõi',
      cognitiveLabelVi: 'Diễn giải',
      focusDescription: 'Định nghĩa khoa học và các cụm từ diễn đạt quan hệ hàm số, tỉ lệ thuận, tỉ lệ nghịch.',
      sampleItems: [
        'Is directly proportional to...',
        'Is inversely proportional to...',
        'Rate of change of velocity',
        'State of constant motion',
        'Inertial property of matter'
      ],
      emergingLanguage: ['Ratio between force and mass']
    },
    {
      dimension: 'Language of Learning',
      cognitiveLevel: 'Vận dụng',
      dimensionLabelVi: 'Ngôn ngữ kiến thức cốt lõi',
      cognitiveLabelVi: 'Vận dụng',
      focusDescription: 'Thuật ngữ dùng trong phân tích bài toán lực, biểu diễn vectơ lực tự do và tính toán số liệu.',
      sampleItems: [
        'Free-body diagram',
        'Sum of horizontal forces (ΣF_x)',
        'Normal force (N) and gravitational force (P)',
        'Unbalanced force produces non-zero acceleration'
      ],
      emergingLanguage: []
    },

    // ROW 2: Language FOR Learning (Ngôn ngữ để tham gia học tập)
    {
      dimension: 'Language for Learning',
      cognitiveLevel: 'Nhận biết',
      dimensionLabelVi: 'Ngôn ngữ để tham gia học tập',
      cognitiveLabelVi: 'Nhận biết',
      focusDescription: 'Mẫu câu hỏi thông tin, tra cứu công thức và xác nhận ý nghĩa của dữ liệu trong phòng thí nghiệm.',
      sampleItems: [
        '"What does the symbol ‘a’ stand for?"',
        '"What is the given value of mass in this problem?"',
        '"Could you repeat the unit of force?"'
      ],
      emergingLanguage: []
    },
    {
      dimension: 'Language for Learning',
      cognitiveLevel: 'Diễn giải',
      dimensionLabelVi: 'Ngôn ngữ để tham gia học tập',
      cognitiveLabelVi: 'Diễn giải',
      focusDescription: 'Ngôn ngữ trao đổi nhóm để so sánh các trường hợp, diễn giải đồ thị F-a hoặc v-t.',
      sampleItems: [
        '"According to graph 1, as the force increases, what happens to the slope?"',
        '"In my opinion, the two carts will not accelerate at the same rate because..."',
        '"Do you agree that mass is the independent variable here?"'
      ],
      emergingLanguage: ['"Let’s double-check the calculations together."']
    },
    {
      dimension: 'Language for Learning',
      cognitiveLevel: 'Vận dụng',
      dimensionLabelVi: 'Ngôn ngữ để tham gia học tập',
      cognitiveLabelVi: 'Vận dụng',
      focusDescription: 'Ngôn ngữ lập luận chứng minh, biện luận kết quả thí nghiệm và bảo vệ quan điểm khoa học.',
      sampleItems: [
        '"We calculated a net force of 15 N, which accounts for the measured acceleration of 3 m/s²."',
        '"However, experimental error occurred due to unmeasured track friction."',
        '"How can we minimize resistive forces to verify F = ma more accurately?"'
      ],
      emergingLanguage: []
    },

    // ROW 3: Language THROUGH Learning (Ngôn ngữ phát triển qua trải nghiệm)
    {
      dimension: 'Language through Learning',
      cognitiveLevel: 'Nhận biết',
      dimensionLabelVi: 'Ngôn ngữ phát sinh qua trải nghiệm',
      cognitiveLabelVi: 'Nhận biết',
      focusDescription: 'Các diễn đạt tự nhiên mới xuất hiện khi học sinh quan sát chuyển động của xe lăn hoặc vật thể.',
      sampleItems: [
        '"It picks up speed rapidly."',
        '"It moves sluggishly because of heavy load."',
        '"The sensor reads a fluctuating number."'
      ],
      emergingLanguage: ['"It feels resistant to turning."']
    },
    {
      dimension: 'Language through Learning',
      cognitiveLevel: 'Diễn giải',
      dimensionLabelVi: 'Ngôn ngữ phát sinh qua trải nghiệm',
      cognitiveLabelVi: 'Diễn giải',
      focusDescription: 'Khái niệm trừu tượng học sinh tự phát biểu bằng tiếng Anh khi tư duy sâu về lực và quán tính.',
      sampleItems: [
        '"Mass basically tells us how stubborn an object is against changing speed."',
        '"Even in space, mass still creates inertia regardless of gravity."',
        '"Force isn’t something inside the cart; it’s an external interaction."'
      ],
      emergingLanguage: ['"Net force is the winning force between tugs."']
    },
    {
      dimension: 'Language through Learning',
      cognitiveLevel: 'Vận dụng',
      dimensionLabelVi: 'Ngôn ngữ phát sinh qua trải nghiệm',
      cognitiveLabelVi: 'Vận dụng',
      focusDescription: 'Ngôn ngữ sáng tạo, ứng dụng vào thiết kế kỹ thuật, an toàn giao thông và phóng tên lửa.',
      sampleItems: [
        '"In vehicle crash testing, crumple zones reduce the deceleration magnitude, decreasing the impact force on passengers."',
        '"Multi-stage rockets shed mass to boost acceleration under constant thrust."'
      ],
      emergingLanguage: []
    }
  ],

  // MODULE 4: ACTIVITY GENERATOR
  activities: {
    matching: {
      knowledgeGoal: 'Học sinh củng cố định nghĩa chính xác của 5 khái niệm cốt lõi trong định luật II Newton.',
      languageGoal: 'Học sinh phân biệt cấu trúc định nghĩa khoa học sử dụng đại từ quan hệ (that/which) và danh từ học thuật.',
      instructions: 'Hãy nối mỗi thuật ngữ tiếng Anh ở Cột A với định nghĩa khoa học chính xác nhất ở Cột B.',
      pairs: [
        {
          id: 'match-1',
          term: 'Net force',
          definition: 'The vector sum of all external forces acting simultaneously on a body.',
          vietnameseHint: 'Hợp lực tác dụng lên vật'
        },
        {
          id: 'match-2',
          term: 'Acceleration',
          definition: 'The rate at which the velocity of an object changes with respect to time.',
          vietnameseHint: 'Gia tốc (m/s²)'
        },
        {
          id: 'match-3',
          term: 'Inertia',
          definition: 'The natural tendency of an object to resist changes in its state of motion.',
          vietnameseHint: 'Mức quán tính của vật thể'
        },
        {
          id: 'match-4',
          term: 'Inversely proportional',
          definition: 'A relationship where an increase in one variable leads to a proportionate decrease in another.',
          vietnameseHint: 'Mối quan hệ tỉ lệ nghịch'
        },
        {
          id: 'match-5',
          term: 'Magnitude',
          definition: 'The absolute numerical size or amount of a vector, independent of its direction.',
          vietnameseHint: 'Độ lớn của đại lượng vectơ'
        }
      ],
      answersSummary: 'Đáp án chuẩn: 1 - Vector sum of all forces | 2 - Rate at which velocity changes | 3 - Natural tendency to resist changes | 4 - Proportionate decrease relationship | 5 - Absolute numerical size independent of direction.'
    },

    fillInBlank: {
      knowledgeGoal: 'Học sinh điền đúng các thuật ngữ vào ngữ cảnh diễn giải định luật II Newton trong hệ SI.',
      languageGoal: 'Học sinh sử dụng chính xác từ loại và thuật ngữ chuyên ngành trong đoạn văn học thuật vật lí.',
      instructions: 'Chọn thuật ngữ thích hợp nhất từ Ngân hàng từ (Word Bank) để điền vào chỗ trống [.....].',
      wordBank: ['net force', 'acceleration', 'mass', 'directly proportional', 'inversely proportional', 'magnitude'],
      items: [
        {
          id: 'fill-1',
          sentenceWithBlank: 'Newton’s Second Law states that the [.....] of an object is directly proportional to the net force acting upon it.',
          missingTerm: 'acceleration',
          vietnameseHint: 'Gia tốc của vật',
          explanation: 'Gia tốc (acceleration) tỉ lệ thuận với hợp lực theo công thức a = F/m.'
        },
        {
          id: 'fill-2',
          sentenceWithBlank: 'When the pulling force is kept constant, the acceleration of the cart is [.....] to its total mass.',
          missingTerm: 'inversely proportional',
          vietnameseHint: 'Tỉ lệ nghịch',
          explanation: 'Khối lượng ở mẫu số nên gia tốc tỉ lệ nghịch (inversely proportional) với khối lượng.'
        },
        {
          id: 'fill-3',
          sentenceWithBlank: 'If an object experiences a non-zero [.....], it must change either its speed or its direction of motion.',
          missingTerm: 'net force',
          vietnameseHint: 'Hợp lực',
          explanation: 'Hợp lực khác không (non-zero net force) luôn gây ra gia tốc làm thay đổi vận tốc.'
        },
        {
          id: 'fill-4',
          sentenceWithBlank: 'A larger [.....] indicates that an object possesses greater inertia and is harder to accelerate.',
          missingTerm: 'mass',
          vietnameseHint: 'Khối lượng',
          explanation: 'Khối lượng (mass) là thước đo định lượng cho quán tính của vật.'
        }
      ]
    },

    pairDiscussion: {
      knowledgeGoal: 'Học sinh vận dụng định luật II Newton để dự đoán và giải thích kết quả của thí nghiệm thay đổi tải trọng và lực kéo.',
      languageGoal: 'Học sinh thực hành hỏi đáp tương tác bằng tiếng Anh, sử dụng câu điều kiện và khung lập luận so sánh tỉ lệ.',
      scenario: 'Tình huống thí nghiệm: Hai học sinh đang quan sát chuyển động của xe trượt điện tử trên đệm khí. Thí nghiệm 1: tăng gấp đôi quả nặng kéo. Thí nghiệm 2: đặt thêm thanh chì 500g lên thân xe.',
      roleA: 'Học sinh A (Người đưa ra giả thuyết và câu hỏi thách thức)',
      roleB: 'Học sinh B (Người giải thích bằng công thức định luật II Newton và đối chiếu dữ liệu)',
      guidingQuestions: [
        'What will happen to the acceleration if we double the hanging weight (net force) while keeping the cart mass the same?',
        'If we add 500 g of mass onto the cart without changing the pulling force, why does the accelerometer display a smaller reading?',
        'How does this experimental observation prove that acceleration is inversely proportional to mass?'
      ],
      suggestedVocabulary: [
        'double the net force',
        'inversely proportional',
        'inertia',
        'constant pulling force',
        'rate of acceleration',
        'sensor reading'
      ],
      scaffoldingModelDialogue: [
        {
          speaker: 'Student A',
          line: 'Look at the data table from Trial 1. If we double the hanging mass to increase the net force, what do you predict will happen to the acceleration of the cart?'
        },
        {
          speaker: 'Student B',
          line: 'Based on Newton’s Second Law, acceleration is directly proportional to net force. Therefore, doubling the force should cause the acceleration to double as well.'
        },
        {
          speaker: 'Student A',
          line: 'Now in Trial 2, the teacher added a 500-gram block onto the cart. Why did the cart take longer to reach the photo gate?'
        },
        {
          speaker: 'Student B',
          line: 'Because acceleration is inversely proportional to the total mass. The heavier mass increases the cart’s inertia, resulting in a lower acceleration under the same pulling force.'
        }
      ]
    }
  }
};
