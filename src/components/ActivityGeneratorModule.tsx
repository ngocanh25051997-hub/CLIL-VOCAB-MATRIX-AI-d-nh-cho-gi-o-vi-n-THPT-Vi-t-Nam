import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Users,
  Target,
  FileCheck2,
  Check
} from 'lucide-react';
import { ActivityGenerator } from '../types/clil';

interface ActivityGeneratorModuleProps {
  activities: ActivityGenerator;
}

export const ActivityGeneratorModule: React.FC<ActivityGeneratorModuleProps> = ({ activities }) => {
  const [activeTab, setActiveTab] = useState<'matching' | 'fill' | 'discussion'>('matching');

  // MATCHING STATE
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // termId -> definitionId
  const [showMatchingAnswers, setShowMatchingAnswers] = useState(false);

  // Shuffle definitions once per pairs change
  const shuffledDefs = useMemo(() => {
    return [...activities.matching.pairs].sort(() => 0.5 - Math.random());
  }, [activities.matching.pairs]);

  const handleSelectTerm = (termId: string) => {
    setSelectedTermId(termId);
  };

  const handleSelectDef = (defId: string) => {
    if (selectedTermId) {
      setMatches((prev) => ({
        ...prev,
        [selectedTermId]: defId,
      }));
      setSelectedTermId(null);
    }
  };

  const resetMatching = () => {
    setMatches({});
    setSelectedTermId(null);
    setShowMatchingAnswers(false);
  };

  // FILL IN THE BLANK STATE
  const [userFillAnswers, setUserFillAnswers] = useState<Record<string, string>>({});
  const [showFillAnswers, setShowFillAnswers] = useState(false);

  const handleFillChange = (id: string, value: string) => {
    setUserFillAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetFill = () => {
    setUserFillAnswers({});
    setShowFillAnswers(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">4</span>
            ACTIVITY GENERATOR: Bộ tạo hoạt động học tập CLIL
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Gồm 3 dạng hoạt động thực tế: Ghép nối định nghĩa, Điền khuyết ngữ cảnh và Thảo luận cặp đôi có khung phân vai.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'matching' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Ghép nối thuật ngữ
          </button>
          <button
            onClick={() => setActiveTab('fill')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'fill' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Điền khuyết ngữ cảnh
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'discussion' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Thảo luận cặp đôi
          </button>
        </div>
      </div>

      {/* TAB 1: MATCHING ACTIVITY */}
      {activeTab === 'matching' && (
        <div className="space-y-4">
          {/* Goals Card */}
          <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-teal-900">Mục tiêu kiến thức (Content Goal):</span>
                <p className="text-teal-800 mt-0.5">{activities.matching.knowledgeGoal}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-900">Mục tiêu ngôn ngữ (Language Goal):</span>
                <p className="text-cyan-800 mt-0.5">{activities.matching.languageGoal}</p>
              </div>
            </div>
          </div>

          {/* Interactive Game Arena */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Thực hành tương tác: Ghép thuật ngữ với định nghĩa</h4>
                <p className="text-xs text-slate-500 mt-0.5">{activities.matching.instructions}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowMatchingAnswers(!showMatchingAnswers)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition"
                >
                  {showMatchingAnswers ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Ẩn đáp án</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Hiện đáp án GV</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetMatching}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại</span>
                </button>
              </div>
            </div>

            {/* Matching Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left Column: Terms */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Cột A: Thuật ngữ (Terms)
                </p>
                {activities.matching.pairs.map((p, idx) => {
                  const isSelected = selectedTermId === p.id;
                  const matchedDefId = matches[p.id];
                  const isCorrect = matchedDefId === p.id;

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectTerm(p.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-500/20'
                          : matchedDefId
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/50'
                            : 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-white hover:border-teal-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">{idx + 1}.</span>
                          <span className="text-sm font-bold text-slate-900">{p.term}</span>
                        </div>
                        <p className="text-xs text-teal-700 mt-0.5">({p.vietnameseHint})</p>
                      </div>

                      {matchedDefId && (
                        <span className="text-xs font-semibold">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Definitions */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Cột B: Định nghĩa khoa học (Definitions)
                </p>
                {shuffledDefs.map((def, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isAssigned = Object.values(matches).includes(def.id);

                  return (
                    <div
                      key={def.id}
                      onClick={() => handleSelectDef(def.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isAssigned
                          ? 'border-slate-300 bg-slate-50 opacity-90'
                          : selectedTermId
                          ? 'border-teal-300 bg-teal-50/30 hover:border-teal-500 hover:bg-teal-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                          {def.definition}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answer Summary Box */}
            {showMatchingAnswers && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <p className="font-bold text-slate-800">Đáp án chuẩn dành cho giáo viên:</p>
                <p className="text-slate-700 leading-relaxed">{activities.matching.answersSummary}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FILL IN THE BLANK ACTIVITY */}
      {activeTab === 'fill' && (
        <div className="space-y-4">
          {/* Goals Card */}
          <div className="bg-cyan-50/60 border border-cyan-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-900">Mục tiêu kiến thức (Content Goal):</span>
                <p className="text-cyan-800 mt-0.5">{activities.fillInBlank.knowledgeGoal}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-teal-900">Mục tiêu ngôn ngữ (Language Goal):</span>
                <p className="text-teal-800 mt-0.5">{activities.fillInBlank.languageGoal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Thực hành điền khuyết theo ngữ cảnh học thuật</h4>
                <p className="text-xs text-slate-500 mt-0.5">{activities.fillInBlank.instructions}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFillAnswers(!showFillAnswers)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition"
                >
                  {showFillAnswers ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Ẩn đáp án</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Kiểm tra đáp án</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetFill}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại</span>
                </button>
              </div>
            </div>

            {/* Word Bank Chips */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Ngân hàng từ vựng (Word Bank):
              </span>
              <div className="flex flex-wrap gap-2">
                {activities.fillInBlank.wordBank.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium bg-white text-slate-800 border border-slate-300 rounded-md shadow-2xs font-mono"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3.5 pt-1">
              {activities.fillInBlank.items.map((item, idx) => {
                const parts = item.sentenceWithBlank.split('[.....]');
                const userAnswer = userFillAnswers[item.id] || '';
                const isCorrect = userAnswer.trim().toLowerCase() === item.missingTerm.trim().toLowerCase();

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">
                        Câu {idx + 1}
                      </span>
                      <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                        {parts[0]}
                        <span className="inline-block mx-1">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleFillChange(item.id, e.target.value)}
                            placeholder="chọn từ điền vào..."
                            className={`px-2.5 py-1 text-xs sm:text-sm font-semibold rounded border outline-none transition ${
                              showFillAnswers
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                  : 'border-red-400 bg-red-50 text-red-800'
                                : 'border-teal-300 bg-teal-50/50 focus:border-teal-600 focus:bg-white'
                            }`}
                          />
                        </span>
                        {parts[1]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 pl-8">
                      <span>Gợi ý nghĩa: {item.vietnameseHint}</span>
                      {showFillAnswers && (
                        <div className="flex items-center gap-1.5 font-medium">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Chính xác!
                            </span>
                          ) : (
                            <span className="text-red-700">
                              Đáp án: <strong className="font-mono">{item.missingTerm}</strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {showFillAnswers && item.explanation && (
                      <div className="pl-8 pt-1 text-xs text-slate-600 italic">
                        Giải thích: {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAIR DISCUSSION ACTIVITY */}
      {activeTab === 'discussion' && (
        <div className="space-y-4">
          {/* Goals Card */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900">Mục tiêu kiến thức (Content Goal):</span>
                <p className="text-emerald-800 mt-0.5">{activities.pairDiscussion.knowledgeGoal}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-teal-900">Mục tiêu ngôn ngữ (Language Goal):</span>
                <p className="text-teal-800 mt-0.5">{activities.pairDiscussion.languageGoal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            {/* Scenario */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-teal-700" />
                <h4 className="font-bold text-slate-900 text-sm">Tình huống thảo luận (Scenario):</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {activities.pairDiscussion.scenario}
              </p>
            </div>

            {/* Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Vai trò A (Student A)
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-1">
                  {activities.pairDiscussion.roleA}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40">
                <span className="text-xs font-bold text-cyan-900 uppercase tracking-wide">
                  Vai trò B (Student B)
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-1">
                  {activities.pairDiscussion.roleB}
                </p>
              </div>
            </div>

            {/* Guiding Questions & Suggested Vocabulary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Câu hỏi định hướng thảo luận (Guiding Questions):
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activities.pairDiscussion.guidingQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold shrink-0">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Từ vựng & Cụm từ gợi ý (Vocabulary Cues):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activities.pairDiscussion.suggestedVocabulary.map((voc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium bg-teal-50 text-teal-800 rounded-md border border-teal-100"
                    >
                      {voc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Model Dialogue */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Hội thoại mẫu minh họa (Scaffolding Model Dialogue):
              </span>
              <div className="space-y-2.5">
                {activities.pairDiscussion.scaffoldingModelDialogue.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      d.speaker.includes('A')
                        ? 'bg-teal-50/80 border-teal-200 text-teal-950 ml-0 mr-8'
                        : 'bg-white border-slate-200 text-slate-800 mr-0 ml-8'
                    }`}
                  >
                    <span className="font-bold block text-[11px] uppercase tracking-wider text-teal-800 mb-0.5">
                      {d.speaker}:
                    </span>
                    <p className="italic font-normal">"{d.line}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
