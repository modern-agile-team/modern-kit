export function reverseString(value: string) {
  if (!value) return '';

  return [...value].reverse().join('');
}
