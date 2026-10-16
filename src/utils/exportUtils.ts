import { ClilProjectData } from '../types/clil';

/**
 * Xuất danh sách thuật ngữ sang file CSV mã hóa UTF-8 kèm ký tự BOM (\uFEFF)
 * Giúp Microsoft Excel hiển thị đúng 100% tiếng Việt có dấu mà không bị lỗi font chữ.
 */
export function exportGlossaryToCsvWithBom(project: ClilProjectData) {
  const headers = [
    'STT',
    'Thuật ngữ (English)',
    'Nghĩa tiếng Việt',
    'Phiên âm IPA',
    'Loại từ',
    'Định nghĩa tiếng Anh',
    'Câu ví dụ',
    'Collocations',
    'Lỗi thường gặp',
    'Trạng thái kiểm duyệt',
    'Ghi chú',
  ];

  const rows = project.glossary.map((item, index) => {
    return [
      (index + 1).toString(),
      item.term,
      item.vietnamese,
      item.ipa,
      item.partOfSpeech,
      item.englishDefinition,
      item.exampleSentence,
      item.collocations.join('; '),
      item.commonMistakes,
      item.verified ? 'Đã kiểm duyệt (Approved)' : 'Chưa kiểm duyệt (Pending Review)',
      item.notes || '',
    ].map((val) => `"${(val || '').replace(/"/g, '""')}"`);
  });

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  // \uFEFF là UTF-8 BOM
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeTitle = project.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  link.setAttribute('href', url);
  link.setAttribute('download', `CLIL_Glossary_${project.subject}_${project.grade}_${safeTitle}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Định dạng trọn bộ giáo án và học liệu CLIL sang Markdown chuẩn để giáo viên sao chép vào Word/Docs
 */
export function generateProjectMarkdown(project: ClilProjectData): string {
  let md = `# KẾ HỌACH BÀI DẠY TÍCH HỢP CLIL (CONTENT & LANGUAGE INTEGRATED LEARNING)\n\n`;
  md += `**Chủ đề:** ${project.topic}\n`;
  md += `**Môn học:** ${project.subject} | **Khối lớp:** ${project.grade} | **Trình độ Tiếng Anh mục tiêu:** ${project.englishLevel}\n`;
  md += `**Trạng thái tài liệu:** ${project.isDemo ? 'Dữ liệu mẫu (Demo)' : 'Học liệu AI tạo (Đã qua rà soát của giáo viên)'}\n\n`;

  md += `## I. MỤC TIÊU BÀI HỌC (LESSON OBJECTIVES)\n`;
  md += `1. **Mục tiêu kiến thức (Content Goal):** ${project.knowledgeGoal}\n`;
  md += `2. **Mục tiêu ngôn ngữ (Language Goal):** ${project.languageGoal}\n\n`;

  md += `## II. SMART GLOSSARY (TỪ ĐIỂN THUẬT NGỮ CHUYÊN NGÀNH)\n\n`;
  project.glossary.forEach((item, idx) => {
    md += `### ${idx + 1}. ${item.term} [${item.ipa}] - *${item.partOfSpeech}*\n`;
    md += `- **Tiếng Việt:** ${item.vietnamese}\n`;
    md += `- **Định nghĩa:** ${item.englishDefinition}\n`;
    md += `- **Ví dụ:** "${item.exampleSentence}"\n`;
    md += `- **Collocations:** ${item.collocations.join(', ')}\n`;
    md += `- **Lưu ý & Lỗi thường gặp:** ${item.commonMistakes}\n`;
    md += `- **Kiểm duyệt bởi GV:** ${item.verified ? 'ĐÃ DUYỆT' : 'CHƯA DUYỆT'}\n\n`;
  });

  md += `## III. TEACHER LANGUAGE BANK (NGÂN HÀNG NGÔN NGỮ GIẢNG DẠY)\n\n`;
  md += `### 1. Mẫu câu giảng bài & Chốt kiến thức\n`;
  project.teacherLanguageBank.instructionalPhrases.forEach((p) => {
    md += `- [${p.category}] **${p.englishPhrase}** *(Ý đồ: ${p.vietnamesePurpose})*\n`;
  });

  md += `\n### 2. Mẫu câu hỏi phân hóa nhận thức\n`;
  project.teacherLanguageBank.questioningPrompts.forEach((q) => {
    md += `- [${q.cognitiveLevel}] **${q.englishPrompt}**\n  *Mục đích: ${q.vietnamesePrompt}*\n`;
    if (q.followUp) md += `  *Câu hỏi tiếp nối: ${q.followUp}*\n`;
  });

  md += `\n### 3. Khung câu hỗ trợ học sinh (Student Scaffolding Frames)\n`;
  project.teacherLanguageBank.studentScaffoldingFrames.forEach((s) => {
    md += `- **${s.purpose}:** \`${s.starterFrame}\`\n  *Ví dụ hoàn chỉnh: "${s.exampleCompletion}"*\n`;
  });

  md += `\n## IV. MA TRẬN CLIL 3 × 3 (DO COYLE'S LANGUAGE TRIPTYCH)\n\n`;
  const dimensions = ['Language of Learning', 'Language for Learning', 'Language through Learning'];
  dimensions.forEach((dim) => {
    md += `### ${dim}\n`;
    const cells = project.clilMatrix.filter((c) => c.dimension === dim);
    cells.forEach((cell) => {
      md += `#### Mức độ: ${cell.cognitiveLevel}\n`;
      md += `*Mô tả:* ${cell.focusDescription}\n`;
      cell.sampleItems.forEach((item) => {
        md += `- ${item}\n`;
      });
      if (cell.emergingLanguage && cell.emergingLanguage.length > 0) {
        md += `- *Ngôn ngữ phát sinh thêm:* ${cell.emergingLanguage.join('; ')}\n`;
      }
    });
    md += `\n`;
  });

  md += `## V. HOẠT ĐỘNG HỌC TẬP (LEARNING ACTIVITIES)\n\n`;
  md += `### Hoạt động 1: Ghép nối thuật ngữ (Matching Activity)\n`;
  md += `*Mục tiêu:* ${project.activities.matching.knowledgeGoal} - ${project.activities.matching.languageGoal}\n`;
  project.activities.matching.pairs.forEach((p, i) => {
    md += `${i + 1}. **${p.term}** (${p.vietnameseHint}) --> ${p.definition}\n`;
  });
  md += `\n*Đáp án:* ${project.activities.matching.answersSummary}\n\n`;

  md += `### Hoạt động 2: Điền từ vào chỗ trống (Fill-in-the-blank)\n`;
  md += `*Ngân hàng từ:* ${project.activities.fillInBlank.wordBank.join(', ')}\n`;
  project.activities.fillInBlank.items.forEach((item, i) => {
    md += `${i + 1}. ${item.sentenceWithBlank} [Gợi ý: ${item.vietnameseHint}] (Đáp án: **${item.missingTerm}** - ${item.explanation})\n`;
  });
  md += `\n`;

  md += `### Hoạt động 3: Thảo luận cặp đôi (Pair Discussion)\n`;
  md += `*Tình huống:* ${project.activities.pairDiscussion.scenario}\n`;
  md += `*Vai trò A:* ${project.activities.pairDiscussion.roleA}\n`;
  md += `*Vai trò B:* ${project.activities.pairDiscussion.roleB}\n`;
  md += `*Đối thoại mẫu:*\n`;
  project.activities.pairDiscussion.scaffoldingModelDialogue.forEach((d) => {
    md += `- **${d.speaker}:** "${d.line}"\n`;
  });

  return md;
}
