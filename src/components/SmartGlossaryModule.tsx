import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  CircleDashed,
  Edit3,
  Plus,
  AlertTriangle,
  Search,
  Sparkles,
  CheckCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { GlossaryItem } from '../types/clil';

interface SmartGlossaryModuleProps {
  items: GlossaryItem[];
  onToggleVerify: (id: string) => void;
  onVerifyAll: (verify: boolean) => void;
  onEditItem: (item: GlossaryItem) => void;
  onAddNewItem: () => void;
}

export const SmartGlossaryModule: React.FC<SmartGlossaryModuleProps> = ({
  items,
  onToggleVerify,
  onVerifyAll,
  onEditItem,
  onAddNewItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const speakTerm = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishDefinition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedCount = items.filter((i) => i.verified).length;
  const allVerified = verifiedCount === items.length && items.length > 0;

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              SMART GLOSSARY: Từ điển thuật ngữ thông minh
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {items.length} thuật ngữ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Định nghĩa học thuật chuẩn mực, phiên âm IPA, loại từ, ngữ cảnh ứng dụng, cụm từ kết hợp và cảnh báo lỗi thường gặp.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Verification Status */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
            <span className="text-slate-600">Kiểm duyệt bởi GV:</span>
            <span className={`font-semibold ${allVerified ? 'text-teal-700' : 'text-amber-700'}`}>
              {verifiedCount}/{items.length}
            </span>
          </div>

          <button
            onClick={() => onVerifyAll(!allVerified)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              allVerified
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-300'
            }`}
          >
            {allVerified ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bỏ duyệt tất cả</span>
              </>
            ) : (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Xác nhận duyệt tất cả</span>
              </>
            )}
          </button>

          <button
            onClick={onAddNewItem}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5 text-teal-600" />
            <span>Thêm từ</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm nhanh theo thuật ngữ tiếng Anh, nghĩa tiếng Việt hoặc định nghĩa..."
          className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition"
        />
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item, index) => {
          const isNeedVerify = item.ipa.includes('[Cần xác minh]') || item.ipa.includes('?');

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition-all p-5 shadow-xs flex flex-col justify-between print-break-inside-avoid ${
                item.verified
                  ? 'border-teal-200 ring-1 ring-teal-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Term Header */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-600">#{index + 1}</span>
                      <h4 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                        {item.term}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {item.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {item.vietnamese}
                      </span>

                      {/* IPA */}
                      <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {item.ipa}
                      </span>

                      {isNeedVerify && (
                        <span
                          title="Phiên âm hoặc biến thể cần giáo viên kiểm tra lại theo từ điển chuẩn"
                          className="text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Cần xác minh
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Pronunciation */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => speakTerm(item.id, item.term)}
                      title="Nghe phát âm tiếng Anh"
                      className={`p-1.5 rounded-lg border transition ${
                        playingId === item.id
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditItem(item)}
                      title="Chỉnh sửa nội dung thuật ngữ"
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleVerify(item.id)}
                      title={item.verified ? 'Bấm để hủy duyệt' : 'Bấm để xác nhận kiểm duyệt thuật ngữ này'}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
                        item.verified
                          ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100'
                          : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      {item.verified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>Đã duyệt</span>
                        </>
                      ) : (
                        <>
                          <CircleDashed className="w-3.5 h-3.5 text-amber-600" />
                          <span>Chưa duyệt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Definition */}
                <div className="mt-3 bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Định nghĩa tiếng Anh:</p>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {item.englishDefinition}
                  </p>
                </div>

                {/* Example sentence */}
                <div className="mt-2.5">
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Câu ví dụ học thuật:</p>
                  <p className="text-xs text-slate-700 italic border-l-2 border-teal-500 pl-2.5 py-0.5">
                    "{item.exampleSentence}"
                  </p>
                </div>

                {/* Collocations */}
                {item.collocations && item.collocations.length > 0 && (
                  <div className="mt-2.5">
                    <p className="text-xs text-slate-500 font-semibold mb-1">Cụm từ thường gặp (Collocations):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.collocations.map((col, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50/80 text-teal-800 border border-teal-100 font-medium"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common mistakes */}
                {item.commonMistakes && (
                  <div className="mt-3 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Lưu ý & lỗi thường gặp của học sinh: </span>
                      <span className="text-amber-800">{item.commonMistakes}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes footer */}
              {item.notes && (
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Ghi chú: {item.notes}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-8">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">Không tìm thấy thuật ngữ phù hợp</p>
          <p className="text-xs text-slate-600 mt-1">Thử đổi từ khóa tìm kiếm hoặc bấm Thêm từ mới.</p>
        </div>
      )}
    </div>
  );
};
