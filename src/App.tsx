import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  MessageSquare,
  Activity,
  FileCheck,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  GraduationCap
} from 'lucide-react';

import { ClilProjectData, GlossaryItem, MatrixDimension, CognitiveLevel } from './types/clil';
import { demoNewtonLaw } from './data/demoNewtonLaw';
import { Navbar } from './components/Navbar';
import { GenerationModal } from './components/GenerationModal';
import { SmartGlossaryModule } from './components/SmartGlossaryModule';
import { TeacherLanguageBankModule } from './components/TeacherLanguageBankModule';
import { ClilMatrixModule } from './components/ClilMatrixModule';
import { ActivityGeneratorModule } from './components/ActivityGeneratorModule';
import { ReviewExportModule } from './components/ReviewExportModule';
import { EditTermModal } from './components/EditTermModal';
import { exportGlossaryToCsvWithBom } from './utils/exportUtils';

export default function App() {
  // Initialize with saved state or Demo data
  const [project, setProject] = useState<ClilProjectData>(() => {
    try {
      const saved = localStorage.getItem('clil_vocab_matrix_project');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return demoNewtonLaw;
  });

  const [activeTab, setActiveTab] = useState<'glossary' | 'bank' | 'matrix' | 'activities' | 'review'>('glossary');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GlossaryItem | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('clil_vocab_matrix_project', JSON.stringify(project));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [project]);

  // Handlers
  const handleLoadDemo = () => {
    setProject(demoNewtonLaw);
    setActiveTab('glossary');
  };

  const handleGenerateSuccess = (newProject: ClilProjectData) => {
    setProject(newProject);
    setActiveTab('glossary');
  };

  const handleToggleVerify = (id: string) => {
    setProject((prev) => ({
      ...prev,
      lastModifiedAt: new Date().toISOString(),
      glossary: prev.glossary.map((item) =>
        item.id === id ? { ...item, verified: !item.verified } : item
      ),
    }));
  };

  const handleVerifyAll = (verify: boolean) => {
    setProject((prev) => ({
      ...prev,
      lastModifiedAt: new Date().toISOString(),
      glossary: prev.glossary.map((item) => ({ ...item, verified: verify })),
    }));
  };

  const handleSaveEditedTerm = (updatedItem: GlossaryItem) => {
    setProject((prev) => {
      const exists = prev.glossary.some((item) => item.id === updatedItem.id);
      let newGlossary;
      if (exists) {
        newGlossary = prev.glossary.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      } else {
        newGlossary = [...prev.glossary, updatedItem];
      }
      return {
        ...prev,
        lastModifiedAt: new Date().toISOString(),
        glossary: newGlossary,
      };
    });
  };

  const handleAddNewTerm = () => {
    const newItem: GlossaryItem = {
      id: `term-custom-${Date.now()}`,
      term: '',
      vietnamese: '',
      englishDefinition: '',
      ipa: '',
      partOfSpeech: 'noun',
      exampleSentence: '',
      collocations: [],
      commonMistakes: '',
      verified: true,
      notes: 'Thuật ngữ do giáo viên thêm thủ công',
    };
    setEditingItem(newItem);
  };

  const handleAddEmergingLanguage = (
    dimension: MatrixDimension,
    cognitiveLevel: CognitiveLevel,
    text: string
  ) => {
    setProject((prev) => ({
      ...prev,
      lastModifiedAt: new Date().toISOString(),
      clilMatrix: prev.clilMatrix.map((cell) => {
        if (cell.dimension === dimension && cell.cognitiveLevel === cognitiveLevel) {
          return {
            ...cell,
            emergingLanguage: [...(cell.emergingLanguage || []), text],
          };
        }
        return cell;
      }),
    }));
  };

  const handleRemoveEmergingLanguage = (
    dimension: MatrixDimension,
    cognitiveLevel: CognitiveLevel,
    index: number
  ) => {
    setProject((prev) => ({
      ...prev,
      lastModifiedAt: new Date().toISOString(),
      clilMatrix: prev.clilMatrix.map((cell) => {
        if (cell.dimension === dimension && cell.cognitiveLevel === cognitiveLevel) {
          const updated = [...cell.emergingLanguage];
          updated.splice(index, 1);
          return { ...cell, emergingLanguage: updated };
        }
        return cell;
      }),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    exportGlossaryToCsvWithBom(project);
  };

  const totalTerms = project.glossary.length;
  const verifiedCount = project.glossary.filter((t) => t.verified).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation */}
      <Navbar
        project={project}
        onOpenCreateModal={() => setIsGenerateModalOpen(true)}
        onLoadDemo={handleLoadDemo}
        onPrint={handlePrint}
        onExportCsv={handleExportCsv}
        verifiedCount={verifiedCount}
        totalTerms={totalTerms}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Lesson Overview Banner */}
        <section className="bg-white rounded-2xl border border-teal-100 p-5 sm:p-6 shadow-xs relative overflow-hidden no-print">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-50 to-transparent -mr-20 -mt-20 rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800">
                  {project.subject} • {project.grade}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Chuẩn CEFR: {project.englishLevel}
                </span>
                {project.isDemo ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Dữ liệu mẫu (Vật lí 10)
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Học liệu AI tạo
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {project.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-0.5">Mục tiêu kiến thức:</span>
                  <p className="line-clamp-2">{project.knowledgeGoal}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-100">
                  <span className="font-bold text-teal-900 block mb-0.5">Mục tiêu ngôn ngữ:</span>
                  <p className="text-teal-950 line-clamp-2">{project.languageGoal}</p>
                </div>
              </div>
            </div>

            {/* Quick stats on the right */}
            <div className="shrink-0 flex md:flex-col gap-2 items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
              <div className="text-left md:text-right">
                <span className="text-[11px] text-slate-500 block">Tiến độ kiểm duyệt</span>
                <span className="text-sm font-bold text-slate-800">
                  {verifiedCount} / {totalTerms} thuật ngữ
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Tạo chủ đề khác</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5 Module Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-px no-print">
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'glossary'
                ? 'border-teal-600 text-teal-700 bg-teal-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Smart Glossary</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-semibold">
              {project.glossary.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'bank'
                ? 'border-teal-600 text-teal-700 bg-teal-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>2. Teacher Language Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'matrix'
                ? 'border-teal-600 text-teal-700 bg-teal-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. CLIL Matrix 3 × 3</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'activities'
                ? 'border-teal-600 text-teal-700 bg-teal-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>4. Activity Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'review'
                ? 'border-teal-600 text-teal-700 bg-teal-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>5. Review & Export</span>
            {verifiedCount < totalTerms && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Có thuật ngữ chưa duyệt" />
            )}
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="pt-2">
          {activeTab === 'glossary' && (
            <SmartGlossaryModule
              items={project.glossary}
              onToggleVerify={handleToggleVerify}
              onVerifyAll={handleVerifyAll}
              onEditItem={(item) => setEditingItem(item)}
              onAddNewItem={handleAddNewTerm}
            />
          )}

          {activeTab === 'bank' && (
            <TeacherLanguageBankModule bank={project.teacherLanguageBank} />
          )}

          {activeTab === 'matrix' && (
            <ClilMatrixModule
              matrix={project.clilMatrix}
              onAddEmergingLanguage={handleAddEmergingLanguage}
              onRemoveEmergingLanguage={handleRemoveEmergingLanguage}
            />
          )}

          {activeTab === 'activities' && (
            <ActivityGeneratorModule activities={project.activities} />
          )}

          {activeTab === 'review' && (
            <ReviewExportModule
              project={project}
              onVerifyAll={handleVerifyAll}
              onPrint={handlePrint}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-700">CLIL VOCAB MATRIX AI</span>
            <span>— Đồng hành cùng giáo viên THPT Việt Nam hội nhập quốc tế</span>
          </div>
          <div className="text-slate-600 flex items-center gap-4">
            <span>Phương pháp CLIL (Do Coyle)</span>
            <span>•</span>
            <span>Khung GDPT 2018 (Toán, Vật lí, Hóa học, Sinh học, STEM)</span>
          </div>
        </div>
      </footer>

      {/* Generation Input Modal */}
      <GenerationModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerateSuccess={handleGenerateSuccess}
      />

      {/* Edit Term Modal */}
      <EditTermModal
        isOpen={Boolean(editingItem)}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEditedTerm}
      />
    </div>
  );
}
