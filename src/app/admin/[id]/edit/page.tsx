"use client";

import { useEffect, useState, use } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            toast({ variant: "destructive", title: "404", description: "Produk tidak ditemukan." });
            router.push("/admin");
            return;
          }
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal memuat detail produk.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router, toast]);

  return (
    <main className="flex-grow bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/admin" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Panel
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-2">Edit Produk</h1>
          <p className="text-muted-foreground">Perbarui informasi dan tag untuk produk ini.</p>
        </header>

        <div className="bg-card rounded-lg shadow-sm border p-8 md:p-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Memuat detail produk...</p>
            </div>
          ) : product ? (
            <ProductForm initialData={product} productId={id} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Produk tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
