import { describe, it, expect } from 'vitest';
import { repeatCharacters } from '.';

describe('repeatCharacters', () => {
  it('각 문자를 반복 횟수만큼 반복한 새로운 문자열을 반환해야 합니다', () => {
    const str1 = 'A!B@C';
    const repeatedStr1 = repeatCharacters(str1, 2);

    expect(repeatedStr1).toBe('AA!!BB@@CC');

    const str2 = 'Grace';
    const repeatedStr2 = repeatCharacters(str2, 3);

    expect(repeatedStr2).toBe('GGGrrraaaccceee');
  });

  it('반복 횟수가 1 이하인 경우 입력 값을 그대로 반환해야 합니다', () => {
    const str1 = 'Hello';
    const repeatedStr1 = repeatCharacters(str1, 1);

    expect(repeatedStr1).toBe(str1);

    const str2 = 'Test';
    const repeatedStr2 = repeatCharacters(str2, 0);

    expect(repeatedStr2).toBe(str2);

    const str3 = 'Test';
    const repeatedStr3 = repeatCharacters(str2, -1);

    expect(repeatedStr3).toBe(str3);
  });

  it('입력 문자열이 빈 문자열인 경우 빈 문자열을 반환해야 합니다', () => {
    const str = '';
    const repeatedStr = repeatCharacters(str, 3);

    expect(repeatedStr).toBe('');
  });
});
