import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Initialise GoogleGenAI SDK with server telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// CLIL Generation Endpoint
app.post('/api/generate-clil', async (req: Request, res: Response) => {
  try {
    const {
      subject,
      grade,
      topic,
      contentKnowledge,
      englishLevel = 'B1',
      termCount = 8,
      knowledgeGoal = '',
      languageGoal = '',
    } = req.body;

    if (!subject || !grade || !topic) {
      return res.status(400).json({
        error: 'Thiếu thông tin bắt buộc: Môn học, Khối lớp và Chủ đề bài giảng.',
      });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trong hệ thống máy chủ. Vui lòng kiểm tra cấu hình.',
      });
    }

    const clampedCount = Math.max(5, Math.min(12, Number(termCount) || 8));

    const systemInstruction = `Bạn là Chuyên gia phương pháp Sư phạm CLIL (Content and Language Integrated Learning) kiêm Giảng viên Sư phạm cao cấp về các môn KHTN & Toán THPT Việt Nam (Chương trình GDPT 2018: Toán, Vật lí, Hóa học, Sinh học, STEM Lớp 10, 11, 12).

QUY TẮC SƯ PHẠM BẮT BUỘC:
1. TÍNH CHÍNH XÁC KHOA HỌC TUYỆT ĐỐI: Không bao giờ bịa đặt công thức, định luật, danh pháp IUPAC hay kiến thức khoa học. Mọi thuật ngữ phải chuẩn xác theo chương trình THPT Việt Nam và danh pháp quốc tế.
2. PHIÊN ÂM IPA & NGUỒN: Chỉ cung cấp phiên âm IPA chuẩn xác (Oxford/Cambridge Learners Dictionary). Nếu thuật ngữ ghép phức tạp hoặc có nhiều cách đọc chưa chắc chắn, ghi rõ [Cần xác minh] sau phiên âm.
3. PHÙ HỢP KHUNG CEFR: Ngôn ngữ định nghĩa tiếng Anh, câu ví dụ và khung câu phải bám sát trình độ tiếng Anh được yêu cầu (${englishLevel}: A1/A2/B1/B2).
4. MA TRẬN CLIL 3x3 CHUẨN DO COYLE:
   - Language OF Learning: Ngôn ngữ kiến thức cốt lõi (thuật ngữ, định nghĩa, công thức).
   - Language FOR Learning: Ngôn ngữ để học tập (giao tiếp lớp học, thảo luận nhóm, so sánh, đặt câu hỏi, báo cáo thực hành).
   - Language THROUGH Learning: Ngôn ngữ phát triển qua trải nghiệm (tư duy phản biện, lập luận độc lập, diễn đạt sáng tạo khi tư duy bằng tiếng Anh).
   - 3 mức độ nhận thức: Nhận biết (Remembering/Recognizing), Diễn giải (Understanding/Explaining), Vận dụng (Applying/Analyzing).
5. TẤT CẢ THUẬT NGỮ MỚI PHẢI CÓ verified = false (để giáo viên kiểm duyệt thủ công).
6. TOÀN BỘ PHẦN GIẢI THÍCH, HƯỚNG DẪN DÀNH CHO GIÁO VIÊN BẰNG TIẾNG VIỆT, CÁC CÂU MẪU & THUẬT NGỮ CHUYÊN NGÀNH BẰNG TIẾNG ANH CHUẨN.`;

    const userPrompt = `Hãy thiết kế trọn bộ học liệu CLIL hoàn chỉnh gồm 5 mô-đun cho bài học sau:
- Môn học: ${subject}
- Khối lớp: ${grade}
- Chủ đề: ${topic}
- Nội dung kiến thức giáo viên cung cấp:
${contentKnowledge || 'Bám sát chuẩn kiến thức kĩ năng chương trình GDPT môn ' + subject + ' ' + grade + ' về chủ đề ' + topic}
- Trình độ tiếng Anh mục tiêu: ${englishLevel}
- Số lượng thuật ngữ trọng tâm: Đúng ${clampedCount} thuật ngữ
- Mục tiêu kiến thức mong đợi: ${knowledgeGoal || 'Học sinh nắm vững khái niệm, công thức và quy luật cốt lõi'}
- Mục tiêu ngôn ngữ mong đợi: ${languageGoal || 'Học sinh hiểu và sử dụng thành thạo từ vựng, mẫu câu khoa học'}

Hãy trả về định dạng JSON hợp lệ theo đúng cấu trúc yêu cầu:
{
  "title": "Tên bài học kết hợp song ngữ",
  "knowledgeGoal": "Mục tiêu kiến thức chi tiết (tiếng Việt)",
  "languageGoal": "Mục tiêu ngôn ngữ chi tiết (tiếng Việt)",
  "glossary": [
    {
      "id": "term-1",
      "term": "English Term",
      "vietnamese": "Thuật ngữ tiếng Việt chuẩn xác",
      "englishDefinition": "Accurate definition in English matching CEFR ${englishLevel}",
      "ipa": "/.../ (hoặc ghi rõ [Cần xác minh] nếu chưa chắc chắn)",
      "partOfSpeech": "noun / verb / adjective / phrase",
      "exampleSentence": "A clear academic example sentence",
      "collocations": ["collocation 1", "collocation 2", "collocation 3"],
      "commonMistakes": "Lỗi phổ biến học sinh Việt Nam hay mắc (nhầm lẫn khái niệm, sai giới từ, phát âm...)",
      "verified": false,
      "notes": "Ghi chú sư phạm bổ sung"
    }
  ],
  "teacherLanguageBank": {
    "instructionalPhrases": [
      {
        "category": "Giảng giải khái niệm / Hướng dẫn thí nghiệm / Chốt kiến thức",
        "vietnamesePurpose": "Mục đích sư phạm của câu",
        "englishPhrase": "Classroom instruction sentence in English",
        "notes": "Mẹo nhấn mạnh ngữ điệu hoặc cử chỉ"
      }
    ],
    "questioningPrompts": [
      {
        "cognitiveLevel": "Nhận biết",
        "vietnamesePrompt": "Mục đích câu hỏi kiểm tra",
        "englishPrompt": "Question prompt in English",
        "followUp": "Follow-up question if needed"
      },
      {
        "cognitiveLevel": "Diễn giải",
        "vietnamesePrompt": "Mục đích câu hỏi thông hiểu",
        "englishPrompt": "Question prompt in English",
        "followUp": "Follow-up question if needed"
      },
      {
        "cognitiveLevel": "Vận dụng",
        "vietnamesePrompt": "Mục đích câu hỏi vận dụng / giải quyết vấn đề",
        "englishPrompt": "Question prompt in English",
        "followUp": "Follow-up question if needed"
      }
    ],
    "activityInstructions": [
      {
        "activityType": "Matching / Fill-in-the-blank / Pair Discussion",
        "vietnameseInstruction": "Chỉ dẫn cho giáo viên",
        "englishInstruction": "Direct instruction to speak to students"
      }
    ],
    "studentScaffoldingFrames": [
      {
        "purpose": "Khung trả lời khi suy luận / so sánh / kết luận",
        "starterFrame": "Khung câu mồi (Sentence Starter) có chỗ trống [.....]",
        "exampleCompletion": "Câu hoàn chỉnh mẫu mà học sinh có thể nói"
      }
    ]
  },
  "clilMatrix": [
    // Đúng 9 ô cho ma trận 3x3:
    // 3 dimensions: "Language of Learning", "Language for Learning", "Language through Learning"
    // 3 cognitive levels: "Nhận biết", "Diễn giải", "Vận dụng"
    // Mỗi ô gồm: dimension, cognitiveLevel, dimensionLabelVi, cognitiveLabelVi, focusDescription, sampleItems (3-5 cụm từ/câu), emergingLanguage (mảng rỗng [] để giáo viên tự ghi chú)
  ],
  "activities": {
    "matching": {
      "knowledgeGoal": "Mục tiêu kiến thức của bài ghép từ",
      "languageGoal": "Mục tiêu ngôn ngữ của bài ghép từ",
      "instructions": "Hướng dẫn làm bài",
      "pairs": [
        {
          "id": "match-1",
          "term": "Term",
          "definition": "Clear English scientific definition",
          "vietnameseHint": "Gợi ý nghĩa tiếng Việt"
        }
      ],
      "answersSummary": "Đáp án tóm tắt đầy đủ"
    },
    "fillInBlank": {
      "knowledgeGoal": "Mục tiêu kiến thức của bài điền khuyết",
      "languageGoal": "Mục tiêu ngôn ngữ của bài điền khuyết",
      "instructions": "Hướng dẫn làm bài",
      "wordBank": ["term1", "term2", "term3", "term4", "term5"],
      "items": [
        {
          "id": "fill-1",
          "sentenceWithBlank": "Sentence with [.....] representing the blank",
          "missingTerm": "term1",
          "vietnameseHint": "Gợi ý tiếng Việt",
          "explanation": "Giải thích ngắn gọn tại sao chọn từ này"
        }
      ]
    },
    "pairDiscussion": {
      "knowledgeGoal": "Mục tiêu kiến thức của bài thảo luận",
      "languageGoal": "Mục tiêu ngôn ngữ của bài thảo luận",
      "scenario": "Bối cảnh tình huống thực tế hoặc thí nghiệm giả định",
      "roleA": "Vai trò học sinh A",
      "roleB": "Vai trò học sinh B",
      "guidingQuestions": ["Câu hỏi gợi ý 1", "Câu hỏi gợi ý 2", "Câu hỏi gợi ý 3"],
      "suggestedVocabulary": ["cụm từ 1", "cụm từ 2", "cụm từ 3", "cụm từ 4"],
      "scaffoldingModelDialogue": [
        { "speaker": "Student A", "line": "..." },
        { "speaker": "Student B", "line": "..." },
        { "speaker": "Student A", "line": "..." },
        { "speaker": "Student B", "line": "..." }
      ]
    }
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for high factual accuracy and consistency
      },
    });

    const rawText = response.text || '';
    if (!rawText) {
      throw new Error('Mô hình AI không trả về phản hồi văn bản.');
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseError) {
      // Attempt clean-up of markdown fences
      const cleanJson = rawText.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1').trim();
      parsedData = JSON.parse(cleanJson);
    }

    // Ensure all terms have unique IDs and verified is false
    const finalGlossary = (parsedData.glossary || []).map((item: any, idx: number) => ({
      ...item,
      id: item.id || `term-${Date.now()}-${idx}`,
      verified: false,
    }));

    // Ensure 9 matrix cells exist with emergingLanguage initialized
    const dimensions = [
      { en: 'Language of Learning', vi: 'Ngôn ngữ kiến thức cốt lõi' },
      { en: 'Language for Learning', vi: 'Ngôn ngữ để tham gia học tập' },
      { en: 'Language through Learning', vi: 'Ngôn ngữ phát sinh qua trải nghiệm' },
    ];
    const cognitiveLevels = ['Nhận biết', 'Diễn giải', 'Vận dụng'];

    let finalMatrix = parsedData.clilMatrix || [];
    if (!Array.isArray(finalMatrix) || finalMatrix.length < 9) {
      // Re-map or fallback construct
      const generatedMap = new Map();
      if (Array.isArray(finalMatrix)) {
        for (const cell of finalMatrix) {
          const key = `${cell.dimension}_${cell.cognitiveLevel}`;
          generatedMap.set(key, cell);
        }
      }

      finalMatrix = [];
      for (const d of dimensions) {
        for (const c of cognitiveLevels) {
          const key = `${d.en}_${c}`;
          const existing = generatedMap.get(key);
          if (existing) {
            finalMatrix.push({
              ...existing,
              dimensionLabelVi: d.vi,
              cognitiveLabelVi: c,
              emergingLanguage: existing.emergingLanguage || [],
            });
          } else {
            finalMatrix.push({
              dimension: d.en,
              cognitiveLevel: c,
              dimensionLabelVi: d.vi,
              cognitiveLabelVi: c,
              focusDescription: `Trọng tâm ngôn ngữ cho ${d.vi} ở mức độ ${c}`,
              sampleItems: [],
              emergingLanguage: [],
            });
          }
        }
      }
    } else {
      finalMatrix = finalMatrix.map((cell: any) => ({
        ...cell,
        emergingLanguage: Array.isArray(cell.emergingLanguage) ? cell.emergingLanguage : [],
      }));
    }

    const assembledProject = {
      id: `clil-${Date.now()}`,
      title: parsedData.title || `${topic} - ${subject} ${grade}`,
      subject,
      grade,
      topic,
      contentKnowledge,
      englishLevel,
      termCount: finalGlossary.length,
      knowledgeGoal: parsedData.knowledgeGoal || knowledgeGoal,
      languageGoal: parsedData.languageGoal || languageGoal,
      isDemo: false,
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      glossary: finalGlossary,
      teacherLanguageBank: parsedData.teacherLanguageBank || {
        instructionalPhrases: [],
        questioningPrompts: [],
        activityInstructions: [],
        studentScaffoldingFrames: [],
      },
      clilMatrix: finalMatrix,
      activities: parsedData.activities || {
        matching: { knowledgeGoal: '', languageGoal: '', instructions: '', pairs: [], answersSummary: '' },
        fillInBlank: { knowledgeGoal: '', languageGoal: '', instructions: '', items: [], wordBank: [] },
        pairDiscussion: { knowledgeGoal: '', languageGoal: '', scenario: '', roleA: '', roleB: '', guidingQuestions: [], suggestedVocabulary: [], scaffoldingModelDialogue: [] },
      },
    };

    return res.json(assembledProject);
  } catch (err: any) {
    console.error('Error generating CLIL content:', err);
    return res.status(500).json({
      error: err.message || 'Đã xảy ra lỗi khi tạo dữ liệu CLIL từ máy chủ AI. Vui lòng thử lại.',
    });
  }
});

// Vite / Static setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[CLIL VOCAB MATRIX AI] Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
