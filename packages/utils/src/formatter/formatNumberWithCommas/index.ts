export function formatNumberWithCommas(value: string | number) {
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  return value.toString().replace(regex, ',');
}
