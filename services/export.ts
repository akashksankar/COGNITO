
import { PsychologicalDossier } from '../types';

export const exportReport = {
  generateTxt(dossier: PsychologicalDossier, userInfo: any): string {
    const date = new Date().toLocaleDateString();
    let txt = `COGNITO PSYCHOLOGICAL DOSSIER\n`;
    txt += `============================\n`;
    txt += `Subject: ${userInfo?.fullName || 'N/A'} (${dossier.subjectOverview.codename})\n`;
    txt += `Date: ${date}\n\n`;

    txt += `[SUBJECT OVERVIEW]\n`;
    txt += `${dossier.subjectOverview.summary}\n\n`;

    txt += `[PERSONALITY ARCHITECTURE]\n`;
    txt += `MBTI: ${dossier.architecture.mbtiType} - ${dossier.architecture.mbtiDescription}\n`;
    txt += `EQ: ${dossier.architecture.emotionalIntelligence}\n\n`;

    txt += `[MORAL REASONING]\n`;
    txt += `Framework: ${dossier.moralReasoning.framework}\n`;
    txt += `${dossier.moralReasoning.analysis}\n\n`;

    txt += `[BEHAVIORAL PATTERNS]\n`;
    Object.entries(dossier.behavioralPatterns).forEach(([key, val]) => {
      txt += `- ${key}: ${val}\n`;
    });
    txt += `\n`;

    txt += `[PUBLIC SERVICE SUITABILITY]\n`;
    dossier.publicServiceSuitability.forEach(s => {
      txt += `- Department: ${s.department}\n`;
      txt += `  Suitability: ${s.why}\n`;
      txt += `  Challenges: ${s.challenges}\n`;
    });

    return txt;
  },

  generateLaTeX(dossier: PsychologicalDossier, userInfo: any): string {
    const date = new Date().toLocaleDateString();
    const clean = (str: string) => str.replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/\$/g, '\\$');

    let tex = `\\documentclass[a4paper,11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}

\\title{\\textbf{COGNITO: Psychological Intelligence Dossier}}
\\author{Confidential Analysis Engine}
\\date{${date}}

\\begin{document}
\\maketitle

\\section*{Subject Overview}
\\textbf{Codename:} ${clean(dossier.subjectOverview.codename)} \\\\
\\textbf{Subject Name:} ${clean(userInfo?.fullName || 'Classified')} \\\\
\\textit{Summary: ${clean(dossier.subjectOverview.summary)}}

\\section*{Personality Architecture}
\\subsection*{MBTI Type: ${dossier.architecture.mbtiType}}
${clean(dossier.architecture.mbtiDescription)}

\\subsection*{Big Five Traits}
\\begin{itemize}
${dossier.architecture.bigFive.map(t => `\\item \\textbf{${clean(t.trait)}:} ${t.score}/100 - ${clean(t.description)}`).join('\n')}
\\end{itemize}

\\section*{Moral Reasoning \\& Decision Strategy}
\\textbf{Ethical Framework:} ${dossier.moralReasoning.framework} \\\\
${clean(dossier.moralReasoning.analysis)}

\\section*{Public Service Suitability (India)}
\\begin{itemize}
${dossier.publicServiceSuitability.map(s => `\\item \\textbf{${clean(s.department)}:} ${clean(s.why)} \\\\ \\textit{Challenges: ${clean(s.challenges)}}`).join('\n')}
\\end{itemize}

\\section*{Strategic Guidance}
\\textbf{Growth Path:} ${clean(dossier.growthPath.generalAdvice)} \\\\
\\textbf{Ideal Environments:} ${clean(dossier.careerGuidance.thrivingEnvironment)}

\\end{document}`;

    return tex;
  },

  download(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
