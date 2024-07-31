import { extractNumber } from '../../string/extractNumber';

export function formatPhoneNumber(value: string) {
  const cleanedValue = extractNumber(value);
  const isSeoul = cleanedValue.startsWith('02');

  if (cleanedValue.length === 8) {
    return cleanedValue.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  if (isSeoul && (cleanedValue.length === 9 || cleanedValue.length === 10)) {
    return cleanedValue.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }

  return cleanedValue.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
}
