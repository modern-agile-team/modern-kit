export function repeatCharacters(value: string, repeatCount: number) {
  let result = '';

  if (repeatCount <= 1) return value;

  for (let i = 0; i < value.length; i++) {
    result += value[i].repeat(repeatCount);
  }

  return result;
}
