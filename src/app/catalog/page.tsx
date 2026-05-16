import { redirect } from "next/navigation";

interface CatalogPageProps {
  searchParams: Promise<{
    type?: string;
    tone?: string;
    shape?: string;
    q?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const newParams = new URLSearchParams();

  if (params.type) {
    newParams.set("skin_types", params.type);
  }
  if (params.tone) {
    newParams.set("skin_tones", params.tone);
  }
  if (params.shape) {
    newParams.set("face_shapes", params.shape);
  }
  if (params.q) {
    newParams.set("q", params.q);
  }

  const queryString = newParams.toString();
  const destination = queryString ? `/products?${queryString}` : "/products";

  redirect(destination);
}
