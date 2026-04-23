'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { JobMatchModal } from '@/components/job-match-modal';

const jobListings = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'Membangun antarmuka pengguna yang modern dan responsif untuk aplikasi web kami.',
    requirements:
      'Dibutuhkan: Pengalaman profesional minimal 2 tahun dalam pengembangan frontend. Sangat mahir dengan Next.js, Tailwind CSS, dan TypeScript.',
    skills: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React'],
  },
  {
    id: 2,
    title: 'Backend Developer',
    description: 'Merancang dan mengelola arsitektur sisi server, database, dan logika aplikasi.',
    requirements:
      'Dibutuhkan: Pengalaman dengan Python dan FastAPI. Memahami PostgreSQL dan arsitektur Microservices. Familiar dengan Docker.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Microservices', 'Docker'],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    description: 'Menciptakan pengalaman pengguna yang intuitif dan menarik secara visual.',
    requirements:
      'Dibutuhkan: Mahir menggunakan Figma. Memiliki pemahaman mendalam tentang prinsip desain minimalis dan pengalaman membangun design system.',
    skills: ['Figma', 'Design System', 'Minimalist Design', 'User Research'],
  },
];

export function JobListingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobDescription, setSelectedJobDescription] = useState('');

  const handleOpenModal = (requirements: string) => {
    setSelectedJobDescription(requirements);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="job-listings" className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-primary">Lowongan Tersedia</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Temukan posisi yang paling cocok untuk Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-gray-200 rounded-md p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => handleOpenModal(job.requirements)}
                className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Cek Kecocokan
              </Button>
            </div>
          ))}
        </div>
      </section>
      <JobMatchModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        jobDescription={selectedJobDescription}
      />
    </>
  );
}
