import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { aiResumeKeywordFiltering } from '@/ai/flows/ai-resume-keyword-filtering-flow';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const resumeTextFromForm = formData.get('resumeText') as string | null;
    const jobDescription = formData.get('jobDescription') as string | null;

    if (!jobDescription) {
        return NextResponse.json(
          { error: 'Job description is missing.' },
          { status: 400 }
        );
    }

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
      jobDescription: jobDescription,
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
