import {
  formatNumberByUnits,
  formatNumberByUnitsOption,
} from '../formatNumberByUnits';

interface currencyOption {
  currency: string;
  currencyPosition: 'prefix' | 'suffix';
}

type formatNumberCurrencyOptions = formatNumberByUnitsOption &
  Partial<currencyOption>;

const addCurrency = (value: string, currencyOption: currencyOption) => {
  const { currency, currencyPosition } = currencyOption;

  if (currencyPosition === 'prefix') {
    return currency + value;
  }
  return value + currency;
};

export const formatNumberCurrency = (
  value: number,
  options: formatNumberCurrencyOptions = {}
) => {
  const {
    currency = '',
    currencyPosition = 'suffix',
    ...restOptions
  } = options;

  return addCurrency(formatNumberByUnits(value, restOptions), {
    currency,
    currencyPosition,
  });
};
