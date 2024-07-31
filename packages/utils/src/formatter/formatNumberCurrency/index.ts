import {
  formatNumberByUnits,
  FormatNumberByUnitsOption,
} from '../formatNumberByUnits';

interface CurrencyOption {
  currency: string;
  currencyPosition: 'prefix' | 'suffix';
}

type FormatNumberCurrencyOptions = FormatNumberByUnitsOption &
  Partial<CurrencyOption>;

const addCurrency = (value: string, currencyOption: CurrencyOption) => {
  const { currency, currencyPosition } = currencyOption;

  if (currencyPosition === 'prefix') {
    return currency + value;
  }
  return value + currency;
};

export function formatNumberCurrency(
  value: number,
  options: FormatNumberCurrencyOptions = {}
) {
  const {
    currency = '',
    currencyPosition = 'suffix',
    ...restOptions
  } = options;

  return addCurrency(formatNumberByUnits(value, restOptions), {
    currency,
    currencyPosition,
  });
}
