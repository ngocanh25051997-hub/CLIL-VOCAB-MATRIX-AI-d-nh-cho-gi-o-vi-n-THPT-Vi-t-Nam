import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  Compass,
  MessageCircleQuestion,
  Copy,
  Check,
  Sparkles,
  Volume2
} from 'lucide-react';
import { TeacherLanguageBank } from '../types/clil';

interface TeacherLanguageBankModuleProps {
  bank: TeacherLanguageBank;
}

export const TeacherLanguageBankModule: React.FC<TeacherLanguageBankModuleProps> = ({ bank }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'instruction' | 'questions' | 'activities' | 'scaffolding'>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const speakSentence = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">2</span>
            TEACHER LANGUAGE BANK: Ngân hàng ngôn ngữ giảng dạy
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Mẫu câu sư phạm chuẩn mực bằng tiếng Anh giúp giáo viên tự tin tương tác, đặt câu hỏi phân hóa và cung cấp khung câu mồi (scaffolding) cho học sinh.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === 'all' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('instruction')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === 'instruction' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mẫu câu giảng bài
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === 'questions' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Câu hỏi phân hóa
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === 'activities' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chỉ dẫn hoạt động
          </button>
          <button
            onClick={() => setActiveTab('scaffolding')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === 'scaffolding' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Khung câu cho HS
          </button>
        </div>
      </div>

      {/* 1. Instructional Phrases */}
      {(activeTab === 'all' || activeTab === 'instruction') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <h4 className="font-bold text-slate-800 text-sm">1. Mẫu câu giảng bài & Chốt kiến thức (Instructional Phrases)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bank.instructionalPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-teal-200 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                      {phrase.category}
                    </span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => speakSentence(phrase.englishPhrase)}
                        title="Nghe phát âm"
                        className="p-1 text-slate-400 hover:text-teal-600 rounded"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(phrase.englishPhrase)}
                        title="Sao chép câu"
                        className="p-1 text-slate-400 hover:text-teal-600 rounded"
                      >
                        {copiedText === phrase.englishPhrase ? (
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    "{phrase.englishPhrase}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <p><span className="font-medium text-slate-700">Mục đích:</span> {phrase.vietnamesePurpose}</p>
                  {phrase.notes && <p className="text-[11px] text-teal-700 mt-0.5 italic">Gợi ý: {phrase.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Questioning Prompts */}
      {(activeTab === 'all' || activeTab === 'questions') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-600" />
            <h4 className="font-bold text-slate-800 text-sm">2. Mẫu câu hỏi phân hóa 3 bậc nhận thức (Questioning Prompts)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bank.questioningPrompts.map((q, idx) => {
              const badgeColors = {
                'Nhận biết': 'bg-blue-50 text-blue-700 border-blue-200',
                'Diễn giải': 'bg-teal-50 text-teal-700 border-teal-200',
                'Vận dụng': 'bg-purple-50 text-purple-700 border-purple-200',
              }[q.cognitiveLevel] || 'bg-slate-50 text-slate-700 border-slate-200';

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${badgeColors}`}>
                        Bậc nhận thức: {q.cognitiveLevel}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(q.englishPrompt)}
                        className="text-slate-400 hover:text-teal-600 p-1"
                      >
                        {copiedText === q.englishPrompt ? (
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      "{q.englishPrompt}"
                    </p>

                    <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg">
                      <span className="font-medium text-slate-700">Mục đích:</span> {q.vietnamesePrompt}
                    </p>
                  </div>

                  {q.followUp && (
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs">
                      <p className="text-[11px] font-semibold text-slate-500">Câu hỏi tiếp nối (Follow-up):</p>
                      <p className="text-xs text-teal-800 italic mt-0.5">"{q.followUp}"</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Activity Instructions */}
      {(activeTab === 'all' || activeTab === 'activities') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-slate-800 text-sm">3. Chỉ dẫn tổ chức hoạt động lớp học (Activity Instructions)</h4>
          </div>

          <div className="space-y-2.5">
            {bank.activityInstructions.map((act, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {act.activityType}
                    </span>
                    <span className="text-xs text-slate-500">Lời hướng dẫn giáo viên nói trước lớp:</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 italic">
                    "{act.englishInstruction}"
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Ý nghĩa tiếng Việt: {act.vietnameseInstruction}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => speakSentence(act.englishInstruction)}
                    title="Nghe phát âm"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-teal-600 hover:bg-slate-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(act.englishInstruction)}
                    title="Sao chép"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-teal-600 hover:bg-slate-50"
                  >
                    {copiedText === act.englishInstruction ? (
                      <Check className="w-4 h-4 text-teal-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Student Scaffolding Frames */}
      {(activeTab === 'all' || activeTab === 'scaffolding') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="w-4 h-4 text-teal-600" />
            <h4 className="font-bold text-slate-800 text-sm">
              4. Khung câu hỗ trợ học sinh trả lời (Student Scaffolding Sentence Frames)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bank.studentScaffoldingFrames.map((frame, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {frame.purpose}
                  </span>

                  <div className="mt-2.5 p-3 bg-teal-50/60 border border-teal-100 rounded-lg">
                    <p className="text-[11px] font-semibold text-teal-900 mb-0.5">Khung câu mồi (Starter Frame):</p>
                    <p className="text-xs font-mono font-medium text-teal-950">
                      {frame.starterFrame}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500">Ví dụ hoàn chỉnh của học sinh:</p>
                  <p className="text-xs text-slate-700 italic mt-0.5">
                    "{frame.exampleCompletion}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
