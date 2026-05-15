export interface ProductWithRelations {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceEstimate: string;
  description: string;
  affiliateUrl: string;
  muaVerdict: string;
  createdAt: Date;
  updatedAt: Date;
  skinTypes: { id: string; productId: string; skinType: string }[];
  skinTones: { id: string; productId: string; skinTone: string }[];
  faceShapes: { id: string; productId: string; faceShape: string }[];
}
