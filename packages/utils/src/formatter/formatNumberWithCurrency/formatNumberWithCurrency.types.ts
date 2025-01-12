import { LOCALE_CURRENCY_MAP } from './formatNumberWithCurrency.constants';

export type Locale = keyof typeof LOCALE_CURRENCY_MAP;

export interface FormatNumberCurrencyOptions {
  symbol?: string;
  position?: 'prefix' | 'suffix';
  space?: boolean;
  commas?: boolean;
  locale?: Locale;
}
