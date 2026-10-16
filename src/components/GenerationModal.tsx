import React, { useState } from 'react';
import { Sparkles, X, AlertCircle, RefreshCw, Layers, BookCheck, Sliders, CheckCircle } from 'lucide-react';
import { SubjectType, GradeType, EnglishLevel, ClilProjectData } from '../types/clil';

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateSuccess: (newProject: ClilProjectData) => void;
}

interface PresetOption {
  label: string;
  subject: SubjectType;
  grade: GradeType;
  topic: string;
  content: string;
  level: EnglishLevel;
  terms: number;
  kGoal: string;
  lGoal: string;
}

const PRESETS: PresetOption[] = [
  {
    label: 'Vật lí 10 - Định luật II Newton',
    subject: 'Vật lí',
    grade: 'Lớp 10',
    topic: 'Định luật II Newton - Mối quan hệ Lực, Khối lượng và Gia tốc',
    content: 'Độ lớn gia tốc của một chất điểm tỉ lệ thuận với độ lớn của hợp lực tác dụng và tỉ lệ nghịch với khối lượng của chất điểm. Biểu thức: a = F/m hay F = ma. Đơn vị đo hệ SI: F(N), m(kg), a(m/s²). 1 N = 1 kg·m/s².',
    level: 'B1',
    terms: 8,
    kGoal: 'Học sinh phát biểu và vận dụng công thức F = ma để giải bài toán động lực học.',
    lGoal: 'Học sinh sử dụng chính xác các thuật ngữ gia tốc, hợp lực, tỉ lệ thuận/nghịch.',
  },
  {
    label: 'Hóa học 10 - Liên kết cộng hóa trị',
    subject: 'Hóa học',
    grade: 'Lớp 10',
    topic: 'Liên kết cộng hóa trị (Covalent Bonding) và Quy tắc Octet',
    content: 'Liên kết cộng hóa trị là liên kết được hình thành giữa hai nguyên tử bằng một hay nhiều cặp electron dùng chung. Quy tắc octet: nguyên tử có xu hướng đạt cấu hình electron bền vững của khí hiếm với 8 electron ở lớp ngoài cùng. Phân biệt liên kết phân cực (polar) và không phân cực (nonpolar) dựa vào hiệu độ âm điện.',
    level: 'B1',
    terms: 8,
    kGoal: 'Học sinh giải thích được sự hình thành cặp electron dùng chung và phân biệt liên kết phân cực.',
    lGoal: 'Học sinh diễn đạt các khái niệm electron chia sẻ, độ âm điện và cấu trúc phân tử bằng tiếng Anh.',
  },
  {
    label: 'Sinh học 11 - Quang hợp ở thực vật',
    subject: 'Sinh học',
    grade: 'Lớp 11',
    topic: 'Quang hợp ở thực vật (Photosynthesis in Plants): Pha sáng & Pha tối',
    content: 'Quang hợp là quá trình lục lạp hấp thụ năng lượng ánh sáng mặt trời để tổng hợp chất hữu cơ từ CO₂ và H₂O, đồng thời giải phóng O₂. Pha sáng diễn ra trên màng thylakoid tạo ATP và NADPH. Pha tối (chu trình Calvin) diễn ra trong chất nền stroma cố định CO₂ thành glucose.',
    level: 'B1',
    terms: 8,
    kGoal: 'Học sinh so sánh được pha sáng và pha tối của quang hợp, viết được phương trình tổng quát.',
    lGoal: 'Học sinh sử dụng thành thạo từ vựng về lục lạp, năng lượng ATP và chu trình chuyển hóa.',
  },
  {
    label: 'Toán học 11 - Đạo hàm & Ý nghĩa vật lí',
    subject: 'Toán học',
    grade: 'Lớp 11',
    topic: 'Khái niệm Đạo hàm và Vận tốc tức thời (Derivatives & Instantaneous Rate of Change)',
    content: 'Đạo hàm của hàm số y = f(x) tại điểm x₀ là giới hạn của tỉ số giữa số gia của hàm số và số gia của đối số khi số gia của đối số tiến dần về 0. Ý nghĩa vật lí: vận tốc tức thời v(t) = s\'(t); gia tốc tức thời a(t) = v\'(t). Ý nghĩa hình học: hệ số góc của tiếp tuyến.',
    level: 'B2',
    terms: 8,
    kGoal: 'Học sinh hiểu bản chất đạo hàm là tốc độ thay đổi tức thời và ứng dụng trong chuyển động.',
    lGoal: 'Học sinh trình bày giới hạn, tỉ số gia số và tiếp tuyến bằng tiếng Anh học thuật.',
  },
];

export const GenerationModal: React.FC<GenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerateSuccess,
}) => {
  const [subject, setSubject] = useState<SubjectType>('Vật lí');
  const [grade, setGrade] = useState<GradeType>('Lớp 10');
  const [topic, setTopic] = useState('');
  const [contentKnowledge, setContentKnowledge] = useState('');
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>('B1');
  const [termCount, setTermCount] = useState<number>(8);
  const [knowledgeGoal, setKnowledgeGoal] = useState('');
  const [languageGoal, setLanguageGoal] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: PresetOption) => {
    setSubject(preset.subject);
    setGrade(preset.grade);
    setTopic(preset.topic);
    setContentKnowledge(preset.content);
    setEnglishLevel(preset.level);
    setTermCount(preset.terms);
    setKnowledgeGoal(preset.kGoal);
    setLanguageGoal(preset.lGoal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage('Vui lòng nhập tên chủ đề bài học.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setLoadingStep(1);

    // Simulate animated step indicators while API executes
    const stepTimer1 = setTimeout(() => setLoadingStep(2), 2500);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 5500);

    try {
      const response = await fetch('/api/generate-clil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic: topic.trim(),
          contentKnowledge: contentKnowledge.trim(),
          englishLevel,
          termCount,
          knowledgeGoal: knowledgeGoal.trim(),
          languageGoal: languageGoal.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Lỗi máy chủ HTTP ${response.status}`);
      }

      const newProject: ClilProjectData = await response.json();
      onGenerateSuccess(newProject);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Không thể tạo dữ liệu học liệu. Vui lòng thử lại.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Thiết lập học liệu CLIL bằng AI</h2>
              <p className="text-xs text-teal-200">
                Tạo 5 mô-đun: Smart Glossary, Teacher Language Bank, CLIL Matrix 3x3, Hoạt động học tập & Xuất bản
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-600 shrink-0 flex items-center gap-1">
            <BookCheck className="w-3.5 h-3.5 text-teal-600" />
            Mẫu nhanh:
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              disabled={loading}
              className="px-2.5 py-1 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-md border border-slate-200 font-medium shrink-0 transition"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Đã xảy ra lỗi khi tạo học liệu:</p>
                <p className="text-xs mt-0.5 text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Row 1: Subject, Grade, CEFR, Term Count */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Môn học *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectType)}
                disabled={loading}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-teal-600"
              >
                <option value="Toán học">Toán học</option>
                <option value="Vật lí">Vật lí</option>
                <option value="Hóa học">Hóa học</option>
                <option value="Sinh học">Sinh học</option>
                <option value="STEM">STEM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Khối lớp *</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeType)}
                disabled={loading}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-teal-600"
              >
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trình độ Tiếng Anh</label>
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
                disabled={loading}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-teal-600"
              >
                <option value="A1">A1 (Cơ bản)</option>
                <option value="A2">A2 (Sơ trung cấp)</option>
                <option value="B1">B1 (Trung cấp - Phổ biến THPT)</option>
                <option value="B2">B2 (Trung cao cấp)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số lượng thuật ngữ: <span className="text-teal-700 font-bold">{termCount}</span>
              </label>
              <input
                type="range"
                min={5}
                max={12}
                value={termCount}
                onChange={(e) => setTermCount(Number(e.target.value))}
                disabled={loading}
                className="w-full accent-teal-600 mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-600 px-0.5">
                <span>5</span>
                <span>8 (chuẩn)</span>
                <span>12</span>
              </div>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chủ đề bài học (Tiếng Việt hoặc Song ngữ) *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="VD: Định luật II Newton (Newton's Second Law of Motion)"
              disabled={loading}
              className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none"
            />
          </div>

          {/* Content Knowledge Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nội dung kiến thức do giáo viên cung cấp / Ghi chú trọng tâm
            </label>
            <textarea
              rows={3}
              value={contentKnowledge}
              onChange={(e) => setContentKnowledge(e.target.value)}
              placeholder="Dán nội dung trọng tâm bài học từ SGK hoặc giáo án (công thức, quy luật, hiện tượng) để AI xây dựng học liệu chính xác nhất..."
              disabled={loading}
              className="w-full text-xs sm:text-sm px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none"
            />
            <p className="text-[11px] text-slate-600 mt-0.5">
              Gợi ý: Càng cung cấp chi tiết công thức và thuật ngữ, AI càng tạo định nghĩa và câu ví dụ bám sát bài dạy của thầy/cô.
            </p>
          </div>

          {/* Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mục tiêu kiến thức (Tùy chọn)</label>
              <input
                type="text"
                value={knowledgeGoal}
                onChange={(e) => setKnowledgeGoal(e.target.value)}
                placeholder="VD: Học sinh phát biểu được định luật và áp dụng tính toán F = ma"
                disabled={loading}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mục tiêu ngôn ngữ (Tùy chọn)</label>
              <input
                type="text"
                value={languageGoal}
                onChange={(e) => setLanguageGoal(e.target.value)}
                placeholder="VD: Học sinh sử dụng cấu trúc tỉ lệ thuận/nghịch và thuật ngữ vật lí"
                disabled={loading}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>
          </div>

          {/* Loading Progress State */}
          {loading && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 space-y-3">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
                <span className="font-semibold text-sm">Đang kiến tạo bộ học liệu CLIL bằng Gemini 3.8 Flash...</span>
              </div>
              <div className="space-y-1.5 text-xs text-teal-800">
                <div className={`flex items-center gap-2 ${loadingStep >= 1 ? 'font-medium text-teal-900' : 'opacity-40'}`}>
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Bước 1: Trích xuất {termCount} thuật ngữ trọng tâm, xác minh IPA chuẩn, định nghĩa {englishLevel} & collocations.</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 2 ? 'font-medium text-teal-900' : 'opacity-40'}`}>
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Bước 2: Xây dựng Ngân hàng ngôn ngữ & Ma trận CLIL 3x3 (Do Coyle Triptych).</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 3 ? 'font-medium text-teal-900' : 'opacity-40'}`}>
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Bước 3: Thiết kế 3 hoạt động học tập (Matching, Điền khuyết, Thảo luận cặp đôi) kèm đáp án.</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-lg shadow-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Tạo trọn bộ CLIL Matrix</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
