export const removeSpecialCharacters = (value: string) => {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  return value.replace(regex, '');
};
