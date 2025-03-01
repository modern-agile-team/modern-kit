import { trimEnd } from '../trimEnd';
import { trimStart } from '../trimStart';

const getChar = (char: string | { start: string; end: string }) => {
  if (typeof char === 'string') {
    return { start: char, end: char };
  }

  return { start: char.start, end: char.end };
};

export function trim(str: string): string;

export function trim(str: string, char: string): string;

export function trim(str: string, char: { start: string; end: string }): string;

export function trim(
  str: string,
  char?: string | { start: string; end: string }
) {
  if (!char) {
    return str.trim();
  }

  const { start, end } = getChar(char);

  return trimStart(trimEnd(str, end), start);
}
