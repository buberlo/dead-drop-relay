export const APP_NAME = 'Local Dead Drop';

export const DB_NAME = 'dead-drop.db';
export const DB_VERSION = 1;
export const DROPS_TABLE = 'drops';
export const AUDIT_TABLE = 'audit';

export const DEFAULT_GEOFENCE_RADIUS_M = 50;
export const MIN_GEOFENCE_RADIUS_M = 5;
export const MAX_GEOFENCE_RADIUS_M = 500;

export const LOCATION_UPDATE_INTERVAL_MS = 5000;
export const LOCATION_TIMEOUT_MS = 10000;
export const LOCATION_ENABLE_HIGH_ACCURACY = true;

export const QR_PAYLOAD_VERSION = 1;
export const QR_PAYLOAD_PREFIX = 'DDP';
export const QR_PAYLOAD_SEPARATOR = '|';
export const QR_MAX_PAYLOAD_CHARS = 256;

export const SECRET_QUESTION_MIN_LENGTH = 8;
export const SECRET_QUESTION_MAX_LENGTH = 80;
export const ONE_TIME_CODE_MIN_LENGTH = 4;
export const CLAIM_TTL_MINUTES = 60;
export const AUDIT_PAGE_SIZE = 100;

export const PICTOGRAMS = {
  food: { glyph: '🍞', label: 'Food' },
  water: { glyph: '💧', label: 'Water' },
  meds: { glyph: '💊', label: 'Meds' },
  battery: { glyph: '🔋', label: 'Battery' },
  cash: { glyph: '💵', label: 'Cash' },
  phone: { glyph: '📱', label: 'Phone' },
  keys: { glyph: '🔑', label: 'Keys' },
  docs: { glyph: '📄', label: 'Docs' },
  clothes: { glyph: '🧥', label: 'Clothes' },
  tool: { glyph: '🔧', label: 'Tool' },
  fuel: { glyph: '⛽', label: 'Fuel' },
  other: { glyph: '📦', label: 'Other' },
} as const;

export type PictogramKey = keyof typeof PICTOGRAMS;
export type Pictogram = (typeof PICTOGRAMS)[PictogramKey];

export const PICTOGRAM_KEYS = Object.keys(PICTOGRAMS) as PictogramKey[];
export const DEFAULT_PICTOGRAMS: PictogramKey[] = ['food', 'water'];

export function getPictogram(key: string): Pictogram | undefined {
  return (PICTOGRAMS as Record<string, Pictogram>)[key];
}

export function isPictogramKey(value: string): value is PictogramKey {
  return value in PICTOGRAMS;
}

export function getPictogramGlyph(key: PictogramKey): string {
  return PICTOGRAMS[key].glyph;
}

export function getPictogramLabel(key: PictogramKey): string {
  return PICTOGRAMS[key].label;
}