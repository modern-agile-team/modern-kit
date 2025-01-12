type Locale = 'KRW' | 'KRW_SYMBOL' | 'USD' | 'JPY' | 'CNY' | 'EUR';

export interface FormatNumberCurrencyOptions {
  symbol?: string;
  position?: 'prefix' | 'suffix';
  space?: boolean;
  commas?: boolean;
  locale?: Locale;
}
