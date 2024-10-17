let dt = 0;
let memorizedTime = 0;

/**
 * @description 고유한 시간을 밀리초 단위로 반환합니다.
 *
 * 이 함수는 현재 시간을 밀리초 단위로 반환하며, 동일한 밀리초 내에서
 * 여러 번 호출될 경우 내부 카운터(`count`)를 사용하여 고유성을 보장합니다.
 *
 * 동일한 밀리초에 함수가 여러 번 호출되면 `count`가 1씩 증가하여, 고유한 값이 반환됩니다.
 *
 * @returns {number} 고유한 시간을 나타내는 숫자. 밀리초 단위로 계산되며, 중복 호출 방지를 위해 증가된 값이 포함됩니다.
 *
 * @example
 * // 동일한 밀리초 내에 호출되었을 경우
 * const time1 = getUniqueTime(); // 1704099600000
 * const time2 = getUniqueTime(); // 1704099600000.001
 *
 */
export function getUniqTime(): number {
  const currentTime = new Date().getTime();

  if (memorizedTime === currentTime) {
    dt += 1;
  } else {
    memorizedTime = currentTime;
    dt = 0;
  }

  return (currentTime * 1000 + dt) / 1000;
}
