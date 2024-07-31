export function containsSpecialCharacters(string: string) {
  const regex = /[~!@#$%^&*_\-+=\\|(){}[\]:;"'`<>,.?/]/;
  return regex.test(string);
}
