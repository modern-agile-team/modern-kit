export function removeSpecialCharacters(value: string) {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  return value.replace(regex, '');
}
