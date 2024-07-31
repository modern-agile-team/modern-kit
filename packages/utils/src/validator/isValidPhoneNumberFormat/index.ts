export function isValidPhoneNumberFormat(value: string) {
  const regex = /^(\d{2,3}-)?\d{3,4}-\d{4}$/;

  return regex.test(value);
}
