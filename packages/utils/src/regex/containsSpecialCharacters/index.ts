export const containsSpecialCharacters = (string: string) => {
  const regex = /[~!@#$%^&*_\-+=\\|(){}[\]:;"'`<>,.?/]/;
  return regex.test(string);
};
