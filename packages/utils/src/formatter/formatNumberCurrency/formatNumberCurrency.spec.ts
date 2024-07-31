import { describe, it, expect } from 'vitest';
import { formatNumberCurrency } from '.';

const ONE_HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;

const testUnits = [
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

describe('formatNumberCurrency', () => {
  it('should format numbers based on the provided options', () => {
    const testValue1 = formatNumberCurrency(4500000, {
      withCommas: false,
      units: testUnits,
      currency: '원',
      currencyPosition: 'suffix',
    });
    expect(testValue1).toBe('450만원');

    const testValue2 = formatNumberCurrency(459005300, {
      withCommas: false,
      units: testUnits,
      currency: '원',
      currencyPosition: 'suffix',
    });
    expect(testValue2).toBe('4억5900만5300원');

    const testValue3 = formatNumberCurrency(4500, {
      withCommas: false,
      currency: '$',
      currencyPosition: 'prefix',
    });
    expect(testValue3).toBe('$4500');

    const testValue4 = formatNumberCurrency(459005300, {
      withCommas: true,
      units: testUnits,
      currency: '원',
      currencyPosition: 'suffix',
    });
    expect(testValue4).toBe('4억5,900만5,300원');

    const testValue5 = formatNumberCurrency(4500, {
      withCommas: true,
      currency: '$',
      currencyPosition: 'prefix',
    });
    expect(testValue5).toBe('$4,500');
  });

  it('should add spaces between units when the insertSpace option is provided', () => {
    const testValue2 = formatNumberCurrency(450000000, {
      withCommas: true,
      units: testUnits,
      insertSpace: true,
      currency: '원',
      currencyPosition: 'suffix',
    });
    expect(testValue2).toBe('4억 5,000만원');
  });

  it('should discard values below the specified floorUnit when provided', () => {
    const testValue1 = formatNumberCurrency(459325300, {
      floorUnit: 10000,
      withCommas: false,
      units: testUnits,
      currency: '원',
    });
    expect(testValue1).toBe('4억5932만원');

    const testValue2 = formatNumberCurrency(459325300, {
      floorUnit: 10000000,
      withCommas: false,
      units: testUnits,
      currency: '원',
    });
    expect(testValue2).toBe('4억5000만원');

    const testValue4 = formatNumberCurrency(4000000, {
      floorUnit: 100000000,
      withCommas: false,
      units: testUnits,
      currency: '원',
    });
    expect(testValue4).toBe('0원');
  });

  it('should format using default values if no options are provided', () => {
    const testValue = formatNumberCurrency(450000000);
    expect(testValue).toBe('450000000');
  });
});
