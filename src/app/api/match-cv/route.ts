import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { aiResumeKeywordFiltering } from '@/ai/flows/ai-resume-keyword-filtering-flow';

// Data dummy untuk kualifikasi pekerjaan
const jobKualifikasi = `
Posisi: Senior Frontend Engineer (React)

Deskripsi Pekerjaan:
Kami mencari seorang Senior Frontend Engineer yang berpengalaman untuk bergabung dengan tim kami.
Anda akan bertanggung jawab untuk mengembangkan antarmuka pengguna (UI) berkualitas tinggi, modern, dan responsif untuk aplikasi web kami.

Kualifikasi Wajib:
- Pengalaman profesional minimal 5 tahun dalam pengembangan frontend.
- Sangat mahir dengan React.js dan ekosistemnya (Redux, React Router).
- Keahlian mendalam dalam TypeScript, JavaScript (ES6+), HTML5, dan CSS3.
- Pengalaman dengan state management library seperti Zustand atau Recoil.
- Memahami prinsip-prinsip desain UI/UX dan mampu menerjemahkan desain Figma ke dalam kode.
- Familiar dengan CI/CD dan Git.
- Kemampuan menulis kode yang bersih, teruji, dan mudah dipelihara.
`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const resumeTextFromForm = formData.get('resumeText') as string | null;

    let candidateResume = '';

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (file.type === 'application/pdf') {
        const data = await pdf(buffer);
        candidateResume = data.text;
      } else if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const { value } = await mammoth.extractRawText({ buffer });
        candidateResume = value;
      } else {
        return NextResponse.json(
          { error: 'Unsupported file type. Please upload a PDF or DOCX file.' },
          { status: 400 }
        );
      }
    } else if (resumeTextFromForm) {
      candidateResume = resumeTextFromForm;
    } else {
       return NextResponse.json(
          { error: 'No file or resume text provided.' },
          { status: 400 }
        );
    }
    
    if (!candidateResume.trim()) {
        return NextResponse.json(
          { error: 'Failed to extract text from the document or text is empty.' },
          { status: 400 }
        );
    }

    // Panggil Genkit AI flow untuk analisis
    const analysisResult = await aiResumeKeywordFiltering({
      jobDescription: jobKualifikasi,
      candidateResume,
    });

    return NextResponse.json(analysisResult, { status: 200 });
    
  } catch (error: any) {
    console.error('Error processing CV:', error);
    // Jika pdf-parse atau API model gagal, kembalikan response JSON yang rapi
    return NextResponse.json(
      { error: 'An unexpected error occurred on the server while processing the CV.' },
      { status: 500 }
    );
  }
}
