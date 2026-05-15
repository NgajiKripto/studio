export interface ProductWithRelations {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceEstimate: string;
  description: string | null;
  affiliateUrl: string | null;
  muaVerdict: string | null;
  skinTypes: { id: string; productId: string; skinType: string }[];
  skinTones: { id: string; productId: string; skinTone: string }[];
  faceShapes: { id: string; productId: string; faceShape: string }[];
}
