import { repeatCharacters } from '../../string';

const FULL_HEX_LENGTH = 6;
const REPEAT_COUNT = 2;

export const getExpandedHex = (hex: string) => {
  const hexString = hex.replace('#', '');

  return hexString.length === FULL_HEX_LENGTH
    ? hexString
    : repeatCharacters(hexString, REPEAT_COUNT);
};
