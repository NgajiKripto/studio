'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UploadCloud, FileText, X, Loader2, ServerCrash, CheckCircle, XCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { AiResumeKeywordFilteringOutput } from '@/ai/flows/ai-resume-keyword-filtering-flow';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

type Status = 'idle' | 'analyzing' | 'result';

export function JobMatchModal({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [manualInput, setManualInput] = useState({ lastPosition: '', experience: '', skills: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [analysisResult, setAnalysisResult] = useState<AiResumeKeywordFilteringOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleFileValidation = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: 'destructive',
        title: 'File terlalu besar',
        description: 'Ukuran file maksimal adalah 5MB.',
      });
      return false;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Format file tidak didukung',
        description: 'Mohon unggah file dengan format .pdf atau .docx.',
      });
      return false;
    }
    return true;
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'idle') return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'idle') return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'idle') return;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'idle') return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (handleFileValidation(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (handleFileValidation(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setManualInput(prev => ({ ...prev, [id]: value }));
  };

  const resetState = () => {
    setFile(null);
    setManualInput({ lastPosition: '', experience: '', skills: '' });
    setStatus('idle');
    setAnalysisResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file && !manualInput.skills) {
      toast({
        variant: 'destructive',
        title: 'Input tidak lengkap',
        description: 'Mohon unggah CV atau isi 5 skill utama Anda.',
      });
      return;
    }

    setStatus('analyzing');
    setError(null);

    try {
      let resumeText = '';
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
      } else {
        resumeText = `Jabatan Terakhir: ${manualInput.lastPosition}\nLama Pengalaman: ${manualInput.experience}\nSkill Utama: ${manualInput.skills}`;
        formData.append('resumeText', resumeText);
      }
      
      const response = await fetch('/api/match-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Terjadi kesalahan saat memproses CV.');
      }
      
      setAnalysisResult(result);
      setStatus('result');

    } catch (e: any) {
      setError(e.message || 'Gagal terhubung ke server.');
      setStatus('result'); // Still go to result view to show the error
      toast({
        variant: 'destructive',
        title: 'Analisis Gagal',
        description: e.message || 'Tidak dapat memproses permintaan Anda saat ini.',
      });
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'analyzing':
        return (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <h3 className="text-xl font-semibold text-foreground">Menganalisis CV Anda...</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              AI kami sedang membandingkan keahlian Anda dengan deskripsi pekerjaan. Mohon tunggu sebentar.
            </p>
          </div>
        );
      
      case 'result':
        if (error) {
          return (
             <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <ServerCrash className="h-16 w-16 text-destructive" />
              <h3 className="text-xl font-semibold text-destructive">Terjadi Kesalahan</h3>
              <p className="text-muted-foreground max-w-sm">{error}</p>
              <Button variant="outline" onClick={resetState}>Coba Lagi</Button>
            </div>
          );
        }
        if (analysisResult) {
            const isQualified = analysisResult.status === 'Lolos';
            return (
              <div className="flex flex-col items-center justify-center h-auto text-center p-6">
                {isQualified ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <XCircle className="h-16 w-16 text-destructive" />
                )}
                <h3 className={cn(
                  "text-2xl font-bold mt-4",
                  isQualified ? "text-green-600" : "text-destructive"
                )}>
                  Status: {analysisResult.status}
                </h3>
                <div className="bg-muted text-muted-foreground p-2 px-4 rounded-full text-sm font-semibold my-4">
                  Skor Kecocokan: <span className={cn("font-bold", isQualified ? "text-green-600" : "text-destructive")}>{analysisResult.score}</span> / 100
                </div>

                <div className="w-full max-w-md text-left grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Keahlian Sesuai</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {analysisResult.cocok.map((skill, i) => (
                        <li key={`cocok-${i}`} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                       {analysisResult.cocok.length === 0 && <li className='text-xs italic'>Tidak ada keahlian yang cocok.</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Keahlian Kurang</h4>
                     <ul className="space-y-1 text-sm text-muted-foreground">
                      {analysisResult.kurang.map((skill, i) => (
                        <li key={`kurang-${i}`} className="flex items-center gap-2">
                          <X className="h-4 w-4 text-destructive flex-shrink-0" />
                           <span>{skill}</span>
                        </li>
                      ))}
                      {analysisResult.kurang.length === 0 && <li className='text-xs italic'>Semua keahlian terpenuhi.</li>}
                    </ul>
                  </div>
                </div>

                <DialogFooter className="mt-8 w-full flex-col gap-2">
                   {isQualified && (
                     <Button size="lg" className="w-full">Lanjutkan Kirim CV ke HRD</Button>
                   )}
                   <Button size="lg" variant={isQualified ? "outline" : "default"} className="w-full" onClick={resetState}>Analisis CV Lain</Button>
                </DialogFooter>
              </div>
            )
        }
        return null;

      case 'idle':
      default:
        return (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl font-bold">Cek Kecocokan CV</DialogTitle>
              <DialogDescription>
                Unggah CV Anda dan isi beberapa detail untuk melihat seberapa cocok Anda dengan lowongan yang ada.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6 grid gap-6">
              <div 
                className={cn(
                  "relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-md transition-colors duration-200",
                  isDragging ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700",
                  "hover:border-primary/50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                  <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                      onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-primary">Klik untuk unggah</span> atau seret dan lepas
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOCX (maks. 5MB)</p>
                  </label>
              </div>
              
              {file && (
                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                      <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="h-6 w-6 text-primary flex-shrink-0"/>
                          <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => setFile(null)}>
                          <X className="h-4 w-4" />
                      </Button>
                  </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Atau isi manual jika CV gagal dibaca</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                      <Label htmlFor="lastPosition">Jabatan Terakhir</Label>
                      <Input id="lastPosition" placeholder="Contoh: Software Engineer" value={manualInput.lastPosition} onChange={handleManualInputChange} />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="experience">Lama Pengalaman</Label>
                      <Input id="experience" placeholder="Contoh: 2 tahun" value={manualInput.experience} onChange={handleManualInputChange} />
                  </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="skills">5 Skill Utama</Label>
                  <Textarea id="skills" placeholder="Sebutkan 5 skill utama Anda, pisahkan dengan koma..." value={manualInput.skills} onChange={handleManualInputChange} />
              </div>
            </div>
            <DialogFooter className="p-6 pt-0 bg-muted/50 rounded-b-lg">
                <Button type="submit" size="lg" className="w-full" onClick={handleSubmit}>
                    Cek Kecocokan Sekarang
                </Button>
            </DialogFooter>
          </>
        );
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetState()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px] p-0 border-gray-200 rounded-lg">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
