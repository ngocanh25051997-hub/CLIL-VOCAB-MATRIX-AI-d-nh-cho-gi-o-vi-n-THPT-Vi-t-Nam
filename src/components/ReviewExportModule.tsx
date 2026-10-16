import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Printer,
  Check,
  FileText,
  ShieldCheck,
  Edit2,
  FileSpreadsheet
} from 'lucide-react';
import { ClilProjectData } from '../types/clil';
import { exportGlossaryToCsvWithBom, generateProjectMarkdown } from '../utils/exportUtils';

interface ReviewExportModuleProps {
  project: ClilProjectData;
  onVerifyAll: (verify: boolean) => void;
  onPrint: () => void;
}

export const ReviewExportModule: React.FC<ReviewExportModuleProps> = ({
  project,
  onVerifyAll,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  const totalTerms = project.glossary.length;
  const verifiedTerms = project.glossary.filter((t) => t.verified).length;
  const allVerified = totalTerms > 0 && verifiedTerms === totalTerms;

  const handleCopyMarkdown = () => {
    const md = generateProjectMarkdown(project);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportCsv = () => {
    exportGlossaryToCsvWithBom(project);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">5</span>
            REVIEW & EXPORT: Kiểm duyệt sư phạm & Xuất bản tài liệu
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Xác nhận chất lượng học liệu trước khi ban hành. Hỗ trợ xuất file CSV tương thích Excel tiếng Việt và in PDF chuẩn A4.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg flex items-center gap-1.5 transition shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-600" />
            <span>Xuất CSV (UTF-8 có BOM)</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg flex items-center gap-1.5 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-teal-600" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Sao chép Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={onPrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-lg flex items-center gap-1.5 transition shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>In / Xuất PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* Review Checklist Status */}
      <div
        className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          allVerified
            ? 'bg-teal-50/70 border-teal-200 text-teal-900'
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/80 shrink-0">
            {allVerified ? (
              <ShieldCheck className="w-6 h-6 text-teal-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-sm">
              {allVerified
                ? 'Tài liệu đã được giáo viên kiểm duyệt toàn diện (Ready for Classroom)'
                : `Còn ${totalTerms - verifiedTerms} thuật ngữ đang chờ rà soát`}
            </h4>
            <p className="text-xs mt-0.5 opacity-90">
              {allVerified
                ? 'Tất cả thuật ngữ khoa học và mẫu câu đã được xác nhận đúng chuẩn chuyên môn và không còn dấu hiệu lỗi.'
                : 'Theo quy chuẩn sư phạm CLIL, tài liệu chưa duyệt chỉ mang tính tham khảo. Hãy kiểm tra các thuật ngữ và định nghĩa ở Mô-đun 1.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onVerifyAll(!allVerified)}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition shrink-0 ${
            allVerified
              ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-600'
          }`}
        >
          {allVerified ? 'Hủy phê duyệt tất cả' : 'Xác nhận duyệt tất cả thuật ngữ'}
        </button>
      </div>

      {/* Print Document Preview (Clean academic layout) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Academic Header */}
        <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
            <span>SỞ GIÁO DỤC VÀ ĐÀO TẠO THPT</span>
            <span>KẾ HOẠCH BÀI DẠY TÍCH HỢP CLIL</span>
            <span>NĂM HỌC 2026 - 2027</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            {project.title}
          </h2>
          <div className="flex justify-center items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
            <span>Môn: {project.subject}</span>
            <span>•</span>
            <span>{project.grade}</span>
            <span>•</span>
            <span>Trình độ Tiếng Anh: {project.englishLevel}</span>
            <span>•</span>
            <span>
              Trạng thái: {project.isDemo ? 'Dữ liệu mẫu (Demo)' : 'Học liệu AI tạo (Đã qua rà soát)'}
            </span>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 border-b border-teal-100 pb-1">
            I. Mục tiêu bài dạy tích hợp (Lesson Objectives)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">1. Mục tiêu kiến thức (Content Goal):</span>
              <p className="text-slate-700">{project.knowledgeGoal}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">2. Mục tiêu ngôn ngữ (Language Goal):</span>
              <p className="text-slate-700">{project.languageGoal}</p>
            </div>
          </div>
        </div>

        {/* Vocabulary Table */}
        <div className="space-y-3 print-break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 border-b border-teal-100 pb-1">
            II. Bảng thuật ngữ học thuật (Academic Vocabulary & Definitions)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-2.5 border-b border-r border-slate-200 w-8 text-center">STT</th>
                  <th className="p-2.5 border-b border-r border-slate-200 w-36">Thuật ngữ & IPA</th>
                  <th className="p-2.5 border-b border-r border-slate-200 w-32">Nghĩa tiếng Việt</th>
                  <th className="p-2.5 border-b border-r border-slate-200">Định nghĩa & Ví dụ tiếng Anh</th>
                  <th className="p-2.5 border-b border-slate-200 w-28 text-center">Kiểm duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {project.glossary.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-600">
                      {idx + 1}
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{item.term}</div>
                      <div className="text-[11px] font-mono text-slate-500">{item.ipa}</div>
                      <span className="text-[10px] text-teal-700 italic">{item.partOfSpeech}</span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-medium text-teal-900">
                      {item.vietnamese}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 space-y-1">
                      <p className="text-slate-800 font-normal">{item.englishDefinition}</p>
                      <p className="text-[11px] text-slate-600 italic">Ví dụ: "{item.exampleSentence}"</p>
                      {item.collocations && item.collocations.length > 0 && (
                        <p className="text-[10px] text-teal-800">
                          Collocations: {item.collocations.join(', ')}
                        </p>
                      )}
                    </td>
                    <td className="p-2.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.verified
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.verified ? 'ĐÃ DUYỆT' : 'CHỜ DUYỆT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Scaffolding & Activities Summary */}
        <div className="space-y-3 print-break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 border-b border-teal-100 pb-1">
            III. Khung câu hỗ trợ học sinh (Scaffolding Sentence Frames)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {project.teacherLanguageBank.studentScaffoldingFrames.map((frame, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block mb-1">{frame.purpose}</span>
                <p className="font-mono text-teal-900 mb-1">{frame.starterFrame}</p>
                <p className="text-[11px] text-slate-600 italic">Mẫu: "{frame.exampleCompletion}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs text-slate-700 print-break-inside-avoid">
          <div>
            <p className="font-bold">TỔ TRƯỞNG CHUYÊN MÔN</p>
            <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-16"></div>
          </div>
          <div>
            <p className="font-bold">GIÁO VIÊN SOẠN BÀI</p>
            <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký và xác nhận kiểm duyệt)</p>
            <div className="h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
