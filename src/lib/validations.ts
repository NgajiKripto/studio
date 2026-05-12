import { z } from "zod";

const SkinTypeEnum = z.enum([
  "OILY",
  "DRY",
  "COMBINATION",
  "NORMAL",
  "SENSITIVE",
]);

const SkinToneEnum = z.enum([
  "FAIR_COOL",
  "FAIR_WARM",
  "FAIR_NEUTRAL",
  "LIGHT_COOL",
  "LIGHT_WARM",
  "LIGHT_NEUTRAL",
  "MEDIUM_COOL",
  "MEDIUM_WARM",
  "MEDIUM_NEUTRAL",
  "TAN_COOL",
  "TAN_WARM",
  "TAN_NEUTRAL",
  "DEEP_COOL",
  "DEEP_WARM",
  "DEEP_NEUTRAL",
]);

const FaceShapeEnum = z.enum([
  "OVAL",
  "ROUND",
  "SQUARE",
  "HEART",
  "DIAMOND",
  "OBLONG",
]);

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  brand: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  description: z.string().min(10).max(5000),
  priceEstimate: z.string().min(1).max(100),
  affiliateUrl: z.string().url().refine((url) => url.startsWith("https"), {
    message: "affiliateUrl must start with https",
  }),
  imageUrl: z.string().url(),
  muaVerdict: z.string().min(10).max(5000),
  skinTypes: z.array(SkinTypeEnum).min(1),
  skinTones: z.array(SkinToneEnum).min(1),
  faceShapes: z.array(FaceShapeEnum).min(1),
});

export const affiliateClickSchema = z.object({
  ref: z.string().min(1).max(100),
  product: z.string().min(1).max(100),
});

export const dashboardProductsSchema = z.object({
  productIds: z.array(z.string().min(1).max(100)).max(20),
});

export const skinTwinsSchema = z.object({
  skinType: SkinTypeEnum,
  skinTone: SkinToneEnum,
  faceShape: FaceShapeEnum,
});

export const adminAccessSchema = z.object({
  accessKey: z.string().min(1).max(256),
});
