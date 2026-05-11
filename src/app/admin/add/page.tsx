import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <main className="flex-grow bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/admin" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Panel
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-2">Tambah Produk Baru</h1>
          <p className="text-muted-foreground">Isi detail produk untuk menambahkannya ke katalog publik.</p>
        </header>

        <div className="bg-card rounded-lg shadow-sm border p-8 md:p-12">
          <ProductForm />
        </div>
      </div>
    </main>
  );
}
