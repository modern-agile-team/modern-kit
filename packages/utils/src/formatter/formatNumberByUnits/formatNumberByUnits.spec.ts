import { formatNumberByUnits } from '.';

const ONE_HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;

const testUnits = [
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

describe('formatNumberByUnits', () => {
  it('should format numbers based on the provided options', () => {
    const testValue1 = formatNumberByUnits(4500000, {
      withCommas: false,
      units: testUnits,
    });
    expect(testValue1).toBe('450만');

    const testValue2 = formatNumberByUnits(450000000, {
      withCommas: false,
      units: testUnits,
    });
    expect(testValue2).toBe('4억5000만');

    const testValue3 = formatNumberByUnits(459005300, {
      withCommas: false,
      units: testUnits,
    });
    expect(testValue3).toBe('4억5900만5300');

    const testValue4 = formatNumberByUnits(459005300, {
      withCommas: true,
      units: testUnits,
    });
    expect(testValue4).toBe('4억5,900만5,300');
  });

  it('should add spaces between units when the insertSpace option is provided', () => {
    const testValue2 = formatNumberByUnits(450000000, {
      withCommas: true,
      units: testUnits,
      insertSpace: true,
    });
    expect(testValue2).toBe('4억 5,000만');
  });

  it('should discard values below the specified floorUnit when provided', () => {
    const testValue1 = formatNumberByUnits(459325300, {
      floorUnit: 10000,
      withCommas: false,
      units: testUnits,
    });
    expect(testValue1).toBe('4억5932만');

    const testValue2 = formatNumberByUnits(459325300, {
      floorUnit: 10000000,
      withCommas: false,
      units: testUnits,
    });
    expect(testValue2).toBe('4억5000만');

    const testValue4 = formatNumberByUnits(4000000, {
      floorUnit: 100000000,
      withCommas: false,
      units: testUnits,
    });
    expect(testValue4).toBe('');
  });

  it('should format using default values if no options are provided', () => {
    const testValue1 = formatNumberByUnits(450000000);
    expect(testValue1).toBe('450000000');
  });
});
