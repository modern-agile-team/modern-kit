const SUFFIX_UNITS = [
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'pt',
  'px',
  'em',
  'ex',
  'ch',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  '%',
] as const;

type SuffixUnit = (typeof SUFFIX_UNITS)[number];

export function formatSizeStyleValue(value: string): string;
export function formatSizeStyleValue(value: number): string;
export function formatSizeStyleValue(value: number, suffix: SuffixUnit): string;

export function formatSizeStyleValue(
  value: string | number,
  suffix?: SuffixUnit
): string {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}${suffix ?? 'px'}`;
}
