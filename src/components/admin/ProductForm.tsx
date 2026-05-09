
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  brand: z.string().min(1, "Brand wajib diisi"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  priceEstimate: z.string().min(1, "Harga estimasi wajib diisi"),
  affiliateUrl: z.string().url("URL Affiliate tidak valid"),
  imageUrl: z.string().url("URL Gambar tidak valid"),
  muaVerdict: z.string().min(10, "MUA Verdict minimal 10 karakter"),
  skinTypes: z.array(z.string()).min(1, "Pilih minimal satu jenis kulit"),
  skinTones: z.array(z.string()).min(1, "Pilih minimal satu warna kulit"),
  faceShapes: z.array(z.string()).min(1, "Pilih minimal satu bentuk wajah"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  productId?: string;
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      ...initialData,
      skinTypes: initialData.skinTypes.map((t: any) => t.skinType),
      skinTones: initialData.skinTones.map((t: any) => t.skinTone),
      faceShapes: initialData.faceShapes.map((t: any) => t.faceShape),
    } : {
      name: "",
      brand: "",
      category: "",
      description: "",
      priceEstimate: "",
      affiliateUrl: "",
      imageUrl: "",
      muaVerdict: "",
      skinTypes: [],
      skinTones: [],
      faceShapes: [],
    },
  });

  async function onSubmit(values: ProductFormValues) {
    setIsLoading(true);
    try {
      const url = productId ? `/api/products/${productId}` : "/api/products";
      const method = productId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Gagal menyimpan produk");

      toast({
        title: "Berhasil!",
        description: productId ? "Produk diperbarui." : "Produk ditambahkan.",
      });
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan produk.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: SuperStay Matte Ink" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Maybelline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Lipstick">Lipstick</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Blush">Blush</SelectItem>
                    <SelectItem value="Mascara">Mascara</SelectItem>
                    <SelectItem value="Powder">Powder</SelectItem>
                    <SelectItem value="Concealer">Concealer</SelectItem>
                    <SelectItem value="Sunscreen">Sunscreen</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceEstimate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimasi Harga</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: $10 - $15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Produk</FormLabel>
              <FormControl>
                <Textarea placeholder="Berikan deskripsi singkat produk..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="affiliateUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Affiliate</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Gambar</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="muaVerdict"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MUA Verdict</FormLabel>
              <FormControl>
                <Textarea placeholder="Verdict profesional dari MUA..." {...field} />
              </FormControl>
              <FormDescription>Analisis ahli mengenai produk ini.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-bold font-headline">Target Profile Tags</h3>
          
          <div className="space-y-4">
            <FormLabel>Jenis Kulit</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {SKIN_TYPES.map((type) => (
                <FormField
                  key={type.value}
                  control={form.control}
                  name="skinTypes"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(type.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, type.value])
                              : field.onChange(field.value?.filter((value) => value !== type.value))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{type.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {form.formState.errors.skinTypes && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.skinTypes.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <FormLabel>Warna Kulit</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {SKIN_TONES.map((tone) => (
                <FormField
                  key={tone.value}
                  control={form.control}
                  name="skinTones"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(tone.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, tone.value])
                              : field.onChange(field.value?.filter((value) => value !== tone.value))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-[10px]">{tone.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {form.formState.errors.skinTones && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.skinTones.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <FormLabel>Bentuk Wajah</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {FACE_SHAPES.map((shape) => (
                <FormField
                  key={shape.value}
                  control={form.control}
                  name="faceShapes"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(shape.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, shape.value])
                              : field.onChange(field.value?.filter((value) => value !== shape.value))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{shape.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {form.formState.errors.faceShapes && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.faceShapes.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {productId ? "Simpan Perubahan" : "Tambah Produk"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
