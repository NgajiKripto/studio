
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface OutPageProps {
  searchParams: Promise<{ productId?: string }>;
}

function isSafeAffiliateUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function OutPage({ searchParams }: OutPageProps) {
  const { productId } = await searchParams;

  if (!productId) {
    redirect("/products");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { affiliateUrl: true, name: true, brand: true },
  });

  if (!product) {
    redirect("/products");
  }

  // Logic: In a real app, you'd record a click event to analytics here
  console.log(`[CLICK TRACKING] User redirecting to ${product.brand} - ${product.name}`);

  // Security: only allow absolute http(s) URLs to block javascript:/data: URL redirects.
  if (!isSafeAffiliateUrl(product.affiliateUrl)) {
    redirect("/products");
  }

  // Server-side redirect to the affiliate store
  redirect(product.affiliateUrl);
}
