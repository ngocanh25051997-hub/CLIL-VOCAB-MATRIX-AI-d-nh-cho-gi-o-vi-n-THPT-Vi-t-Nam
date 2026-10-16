import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GlossaryItem } from '../types/clil';

interface EditTermModalProps {
  isOpen: boolean;
  item: GlossaryItem | null;
  onClose: () => void;
  onSave: (updatedItem: GlossaryItem) => void;
}

export const EditTermModal: React.FC<EditTermModalProps> = ({
  isOpen,
  item,
  onClose,
  onSave,
}) => {
  const [term, setTerm] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [englishDefinition, setEnglishDefinition] = useState('');
  const [ipa, setIpa] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [collocationsStr, setCollocationsStr] = useState('');
  const [commonMistakes, setCommonMistakes] = useState('');
  const [verified, setVerified] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (item) {
      setTerm(item.term || '');
      setVietnamese(item.vietnamese || '');
      setEnglishDefinition(item.englishDefinition || '');
      setIpa(item.ipa || '');
      setPartOfSpeech(item.partOfSpeech || 'noun');
      setExampleSentence(item.exampleSentence || '');
      setCollocationsStr((item.collocations || []).join(', '));
      setCommonMistakes(item.commonMistakes || '');
      setVerified(Boolean(item.verified));
      setNotes(item.notes || '');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GlossaryItem = {
      ...item,
      term: term.trim(),
      vietnamese: vietnamese.trim(),
      englishDefinition: englishDefinition.trim(),
      ipa: ipa.trim(),
      partOfSpeech: partOfSpeech.trim(),
      exampleSentence: exampleSentence.trim(),
      collocations: collocationsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      commonMistakes: commonMistakes.trim(),
      verified,
      notes: notes.trim(),
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-teal-800 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm">Chỉnh sửa & Kiểm duyệt thuật ngữ chuyên ngành</h3>
          <button onClick={onClose} className="p-1 rounded text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          {/* Term & Vietnamese */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Thuật ngữ Tiếng Anh *</label>
              <input
                type="text"
                required
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nghĩa Tiếng Việt *</label>
              <input
                type="text"
                required
                value={vietnamese}
                onChange={(e) => setVietnamese(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>
          </div>

          {/* IPA & POS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phiên âm IPA chuẩn</label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="/.../ hoặc ghi [Cần xác minh]"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-teal-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Loại từ (Part of speech)</label>
              <input
                type="text"
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                placeholder="noun, verb, adjective..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>
          </div>

          {/* English Definition */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Định nghĩa Tiếng Anh học thuật *</label>
            <textarea
              rows={3}
              required
              value={englishDefinition}
              onChange={(e) => setEnglishDefinition(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600 leading-relaxed"
            />
          </div>

          {/* Example Sentence */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Câu ví dụ minh họa ngữ cảnh</label>
            <textarea
              rows={2}
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600 italic"
            />
          </div>

          {/* Collocations */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Collocations (phân cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={collocationsStr}
              onChange={(e) => setCollocationsStr(e.target.value)}
              placeholder="e.g. constant acceleration, calculate net force"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
            />
          </div>

          {/* Common Mistakes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Lỗi thường gặp hoặc nhầm lẫn khái niệm của học sinh
            </label>
            <textarea
              rows={2}
              value={commonMistakes}
              onChange={(e) => setCommonMistakes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-teal-600"
            />
          </div>

          {/* Verification Toggle */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-5 h-5 ${verified ? 'text-teal-600' : 'text-slate-400'}`} />
              <div>
                <p className="font-bold text-xs text-slate-900">Xác nhận kiểm duyệt sư phạm</p>
                <p className="text-[11px] text-slate-500">
                  Đánh dấu thuật ngữ này đã được giáo viên thẩm định khoa học.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
