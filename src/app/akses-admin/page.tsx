"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminAccessPage() {
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessKey }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error ?? "Akses ditolak.");
        return;
      }

      router.push(result.adminPath ?? "/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow bg-background py-16">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white border rounded-3xl shadow-sm p-8 md:p-10 space-y-6">
          <div className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold font-headline">Akses Admin</h1>
            <p className="text-sm text-muted-foreground">
              Masukkan kunci akses untuk membuka panel admin.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              placeholder="Kunci akses admin"
              autoComplete="one-time-code"
              required
            />

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memverifikasi...
                </>
              ) : (
                <>
                  Masuk Admin <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
