export const SKIN_TYPES = [
  { value: 'OILY', label: 'Oily' },
  { value: 'DRY', label: 'Dry' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'COMBINATION', label: 'Combination' },
  { value: 'SENSITIVE', label: 'Sensitive' },
] as const;

export const SKIN_TONES = [
  { value: 'FAIR_COOL', label: 'Fair Cool' },
  { value: 'FAIR_WARM', label: 'Fair Warm' },
  { value: 'FAIR_NEUTRAL', label: 'Fair Neutral' },
  { value: 'LIGHT_COOL', label: 'Light Cool' },
  { value: 'LIGHT_WARM', label: 'Light Warm' },
  { value: 'LIGHT_NEUTRAL', label: 'Light Neutral' },
  { value: 'MEDIUM_COOL', label: 'Medium Cool' },
  { value: 'MEDIUM_WARM', label: 'Medium Warm' },
  { value: 'MEDIUM_NEUTRAL', label: 'Medium Neutral' },
  { value: 'TAN_COOL', label: 'Tan Cool' },
  { value: 'TAN_WARM', label: 'Tan Warm' },
  { value: 'TAN_NEUTRAL', label: 'Tan Neutral' },
  { value: 'DEEP_COOL', label: 'Deep Cool' },
  { value: 'DEEP_WARM', label: 'Deep Warm' },
  { value: 'DEEP_NEUTRAL', label: 'Deep Neutral' },
] as const;

export const FACE_SHAPES = [
  { value: 'OVAL', label: 'Oval' },
  { value: 'ROUND', label: 'Round' },
  { value: 'SQUARE', label: 'Square' },
  { value: 'HEART', label: 'Heart' },
  { value: 'DIAMOND', label: 'Diamond' },
  { value: 'OBLONG', label: 'Oblong' },
] as const;

export type SkinType = typeof SKIN_TYPES[number]['value'];
export type SkinTone = typeof SKIN_TONES[number]['value'];
export type FaceShape = typeof FACE_SHAPES[number]['value'];