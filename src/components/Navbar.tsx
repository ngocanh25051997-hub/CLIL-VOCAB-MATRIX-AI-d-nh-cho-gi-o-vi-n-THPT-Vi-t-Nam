import React from 'react';
import { BookOpen, Sparkles, RefreshCw, Printer, Download, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { ClilProjectData } from '../types/clil';

interface NavbarProps {
  project: ClilProjectData;
  onOpenCreateModal: () => void;
  onLoadDemo: () => void;
  onPrint: () => void;
  onExportCsv: () => void;
  verifiedCount: number;
  totalTerms: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  project,
  onOpenCreateModal,
  onLoadDemo,
  onPrint,
  onExportCsv,
  verifiedCount,
  totalTerms,
}) => {
  return (
    <header className="bg-white border-b border-teal-100 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-teal-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">CLIL VOCAB MATRIX</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  AI THPT
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Hỗ trợ dạy học KHTN & Toán bằng Tiếng Anh (Lớp 10–12)
              </p>
            </div>
          </div>

          {/* Center Badge: Demo vs AI Data */}
          <div className="hidden md:flex items-center gap-2">
            {project.isDemo ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                DỮ LIỆU MẪU (DEMO: Vật lí 10)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                KẾT QUẢ AI TẠO (Đang chỉnh sửa)
              </span>
            )}

            <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              <CheckCircle2 className={`w-3.5 h-3.5 ${verifiedCount === totalTerms ? 'text-teal-600' : 'text-slate-400'}`} />
              Đã duyệt: {verifiedCount}/{totalTerms} thuật ngữ
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onLoadDemo}
              title="Nạp nhanh ví dụ mẫu Vật lí 10 - Định luật II Newton"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Nạp mẫu Vật lí 10
            </button>

            <button
              onClick={onExportCsv}
              title="Xuất file CSV UTF-8 có BOM mở trong Excel"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Xuất CSV (BOM)</span>
            </button>

            <button
              onClick={onPrint}
              title="In hoặc Lưu thành PDF chuẩn A4"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">In / PDF</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-lg shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tạo bằng AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
