import { describe, it, expect } from 'vitest';
import { truncate } from '.';

describe('truncate', () => {
  it('기본 설정으로 문자열을 자른다', () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe(
      'hi-diddly-ho there, neighbo...'
    );
  });

  it('설정된 길이로 문자열을 자른다', () => {
    expect(truncate('Hello World!', { length: 8 })).toBe('Hello...');
  });

  it('사용자 지정 생략 문자열을 사용한다', () => {
    expect(
      truncate('안녕하세요 반갑습니다.', { length: 11, omission: '[...]' })
    ).toBe('안녕하세요 [...]');
  });

  it('설정된 길이로 문자열을 자른 후 문자열 separator를 기준으로 자른다', () => {
    expect(
      truncate('구분자는 띄어쓰기 입니다.', { length: 10, separator: ' ' })
    ).toBe('구분자는...');
  });

  it('설정된 길이로 문자열을 자른 후 정규식 separator를 기준으로 자른다', () => {
    expect(
      truncate('Hello, world! How are you?', { length: 15, separator: /,?\s+/ })
    ).toBe('Hello...');
  });

  it('문자열 길이가 설정된 길이 이하일 경우 그대로 반환한다', () => {
    expect(truncate('Short', { length: 10 })).toBe('Short');
  });

  it('생략 문자열(omission) 이 너무 길면 omission을 그대로 반환한다', () => {
    expect(
      truncate('Short!!!', { length: 5, omission: '...............' })
    ).toBe('...............');
  });
  it('separator가 있지만 매치되지 않으면 잘린 그대로 반환한다', () => {
    const result = truncate('hello world', {
      length: 8,
      separator: ',',
    });
    expect(result).toBe('hello...');
  });
  it('separator 문자열이 포함된 경우 처음 등장하는 위치 기준으로 잘린다', () => {
    const str2 = truncate('hi-diddly-ho there, neighborino', {
      length: 24,
      separator: 'there',
    });
    expect(str2).toBe('hi-diddly-ho ...');
  });
});
