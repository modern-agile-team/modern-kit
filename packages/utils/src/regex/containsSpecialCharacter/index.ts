export const containsSpecialCharacter = (string: string) => {
  const regex = /[~!@#$%^&*_\-+=\\|(){}[\]:;"'`<>,.?/]/;
  return regex.test(string);
};
