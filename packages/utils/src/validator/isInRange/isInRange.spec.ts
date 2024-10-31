import { describe, it, expect } from 'vitest';
import { isInRange } from '.';

describe('isInRange', () => {
  it('값이 min/max 범위 내에 있을 경우 true를 반환해야 합니다.', () => {
    expect(
      isInRange({
        value: 5,
        min: 0,
        max: 10,
      })
    ).toBeTruthy();
  });

  it('값이 min/max 범위 내에 없을 경우 false를 반환해야 합니다.', () => {
    expect(
      isInRange({
        value: 15,
        min: 0,
        max: 10,
      })
    ).toBeFalsy();
  });

  it('기본적으로 min을 경계 값으로 포함하며, max는 경계 값으로 포함하지 않아야 합니다.', () => {
    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
      })
    ).toBeTruthy();
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
      })
    ).toBeFalsy();
  });

  it('withinMin/withinMax 옵션을 통해 경계 값 포함 여부를 지정 할 수 있어야 합니다.', () => {
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
        inclusiveMin: false,
        inclusiveMax: true,
      })
    ).toBeTruthy();

    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
        inclusiveMin: false,
        inclusiveMax: true,
      })
    ).toBeFalsy();
  });

  it('min이 max보다 클 경우 오류를 발생시켜야 합니다.', () => {
    expect(() =>
      isInRange({
        value: 5,
        min: 10,
        max: 0,
      })
    ).toThrowError('최소값은 최대값보다 크거나 같은 수 없습니다.');
  });
});
