import React, { useState } from 'react';
import { Grid, Plus, X, Info, Sparkles, BookOpen, Layers } from 'lucide-react';
import { MatrixCell, MatrixDimension, CognitiveLevel } from '../types/clil';

interface ClilMatrixModuleProps {
  matrix: MatrixCell[];
  onAddEmergingLanguage: (dimension: MatrixDimension, cognitiveLevel: CognitiveLevel, text: string) => void;
  onRemoveEmergingLanguage: (dimension: MatrixDimension, cognitiveLevel: CognitiveLevel, index: number) => void;
}

export const ClilMatrixModule: React.FC<ClilMatrixModuleProps> = ({
  matrix,
  onAddEmergingLanguage,
  onRemoveEmergingLanguage,
}) => {
  const [activeCellKey, setActiveCellKey] = useState<string | null>(null);
  const [newEmergingText, setNewEmergingText] = useState('');

  const dimensions: { key: MatrixDimension; titleVi: string; desc: string; color: string }[] = [
    {
      key: 'Language of Learning',
      titleVi: 'Language OF Learning (Ngôn ngữ kiến thức cốt lõi)',
      desc: 'Từ vựng chuyên ngành, ký hiệu, công thức và cấu trúc ngữ pháp cần thiết để tiếp cận tri thức môn học.',
      color: 'border-l-4 border-l-teal-600 bg-teal-50/30',
    },
    {
      key: 'Language for Learning',
      titleVi: 'Language FOR Learning (Ngôn ngữ để tham gia học tập)',
      desc: 'Ngôn ngữ giao tiếp học thuật trong lớp: thảo luận nhóm, đặt câu hỏi phản biện, so sánh và báo cáo.',
      color: 'border-l-4 border-l-cyan-600 bg-cyan-50/30',
    },
    {
      key: 'Language through Learning',
      titleVi: 'Language THROUGH Learning (Ngôn ngữ phát sinh qua trải nghiệm)',
      desc: 'Ngôn ngữ mới nảy sinh khi học sinh tư duy sâu, hình thành ý niệm và liên hệ thực tiễn ngoài SGK.',
      color: 'border-l-4 border-l-emerald-600 bg-emerald-50/30',
    },
  ];

  const cognitiveLevels: CognitiveLevel[] = ['Nhận biết', 'Diễn giải', 'Vận dụng'];

  const getCell = (dim: MatrixDimension, cog: CognitiveLevel): MatrixCell => {
    const found = matrix.find((c) => c.dimension === dim && c.cognitiveLevel === cog);
    if (found) return found;
    return {
      dimension: dim,
      cognitiveLevel: cog,
      dimensionLabelVi: dim,
      cognitiveLabelVi: cog,
      focusDescription: `Trọng tâm ngôn ngữ cho ${dim} ở mức độ ${cog}`,
      sampleItems: [],
      emergingLanguage: [],
    };
  };

  const handleAddSubmit = (dim: MatrixDimension, cog: CognitiveLevel) => {
    if (!newEmergingText.trim()) return;
    onAddEmergingLanguage(dim, cog, newEmergingText.trim());
    setNewEmergingText('');
    setActiveCellKey(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            CLIL MATRIX 3 × 3: Ma trận ngôn ngữ Do Coyle
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Giao thoa giữa 3 chiều ngôn ngữ (Of - For - Through) và 3 mức độ nhận thức (Nhận biết - Diễn giải - Vận dụng).
            Giáo viên có thể trực tiếp ghi nhận ngôn ngữ phát sinh từ học sinh trong giờ học.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 shrink-0">
          <Info className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Bấm <strong>+ Thêm từ phát sinh</strong> ở bất kỳ ô nào để lưu nhanh.</span>
        </div>
      </div>

      {/* Desktop / Tablet 3x3 Table */}
      <div className="hidden lg:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-4 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-700">
          <div className="p-3.5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>3 Chiều Ngôn ngữ \ Mức nhận thức</span>
          </div>
          {cognitiveLevels.map((lvl) => (
            <div key={lvl} className="p-3.5 text-center border-l border-slate-200">
              <span className="text-slate-900">{lvl}</span>
              <p className="text-[10px] text-slate-500 font-normal">
                {lvl === 'Nhận biết' && '(Remembering / Recognizing)'}
                {lvl === 'Diễn giải' && '(Understanding / Explaining)'}
                {lvl === 'Vận dụng' && '(Applying / Analyzing)'}
              </p>
            </div>
          ))}
        </div>

        {/* Rows */}
        {dimensions.map((dim) => (
          <div key={dim.key} className="grid grid-cols-4 border-b border-slate-100 last:border-b-0">
            {/* Dimension Label Column */}
            <div className={`p-4 ${dim.color} flex flex-col justify-between`}>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{dim.titleVi}</h4>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{dim.desc}</p>
              </div>
            </div>

            {/* 3 Cognitive Level Cells */}
            {cognitiveLevels.map((cog) => {
              const cell = getCell(dim.key, cog);
              const cellKey = `${dim.key}-${cog}`;
              const isAdding = activeCellKey === cellKey;

              return (
                <div key={cog} className="p-3.5 border-l border-slate-100 flex flex-col justify-between bg-white hover:bg-slate-50/50 transition">
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-500 italic leading-snug">
                      {cell.focusDescription}
                    </p>

                    {/* Sample items */}
                    <div className="space-y-1">
                      {cell.sampleItems.map((item, i) => (
                        <div key={i} className="text-xs text-slate-800 flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold shrink-0">•</span>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Emerging language tags */}
                    {cell.emergingLanguage && cell.emergingLanguage.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-teal-800 uppercase tracking-wider mb-1">
                          Ngôn ngữ phát sinh (Emerging):
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cell.emergingLanguage.map((em, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                            >
                              <span>{em}</span>
                              <button
                                type="button"
                                onClick={() => onRemoveEmergingLanguage(dim.key, cog, idx)}
                                className="text-emerald-600 hover:text-emerald-900 p-0.5"
                                title="Xóa từ phát sinh"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add emerging language form */}
                  <div className="mt-3 pt-2">
                    {isAdding ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          autoFocus
                          value={newEmergingText}
                          onChange={(e) => setNewEmergingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSubmit(dim.key, cog);
                            } else if (e.key === 'Escape') {
                              setActiveCellKey(null);
                            }
                          }}
                          placeholder="Nhập cụm từ phát sinh..."
                          className="w-full text-xs px-2 py-1 border border-teal-300 rounded focus:outline-teal-600"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSubmit(dim.key, cog)}
                          className="px-2 py-1 bg-teal-600 text-white text-xs font-semibold rounded hover:bg-teal-700"
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveCellKey(null)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCellKey(cellKey);
                          setNewEmergingText('');
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 hover:text-teal-800 hover:bg-teal-50 px-2 py-0.5 rounded transition"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm từ phát sinh</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Accordion Grid */}
      <div className="block lg:hidden space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className={`p-4 ${dim.color}`}>
              <h4 className="text-sm font-bold text-slate-900">{dim.titleVi}</h4>
              <p className="text-xs text-slate-600 mt-1">{dim.desc}</p>
            </div>

            <div className="divide-y divide-slate-100">
              {cognitiveLevels.map((cog) => {
                const cell = getCell(dim.key, cog);
                const cellKey = `m-${dim.key}-${cog}`;
                const isAdding = activeCellKey === cellKey;

                return (
                  <div key={cog} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                        Mức: {cog}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 italic">{cell.focusDescription}</p>

                    <div className="space-y-1">
                      {cell.sampleItems.map((item, i) => (
                        <div key={i} className="text-xs text-slate-800 flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {cell.emergingLanguage && cell.emergingLanguage.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[10px] font-bold text-teal-800 uppercase mb-1">
                          Ngôn ngữ phát sinh:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cell.emergingLanguage.map((em, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                            >
                              <span>{em}</span>
                              <button
                                type="button"
                                onClick={() => onRemoveEmergingLanguage(dim.key, cog, idx)}
                                className="text-emerald-600 p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      {isAdding ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            autoFocus
                            value={newEmergingText}
                            onChange={(e) => setNewEmergingText(e.target.value)}
                            placeholder="Nhập cụm từ phát sinh..."
                            className="w-full text-xs px-2.5 py-1.5 border border-teal-300 rounded focus:outline-teal-600"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddSubmit(dim.key, cog)}
                            className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded"
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCellKey(null)}
                            className="p-1 text-slate-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCellKey(cellKey);
                            setNewEmergingText('');
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thêm từ phát sinh</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
