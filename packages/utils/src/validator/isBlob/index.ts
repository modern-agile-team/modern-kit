/**
 * @description 주어진 값이 `Blob` 타입인지 확인하고, 맞다면 인자의 타입을 `Blob`로 좁혀주는 함수입니다.
 *
 * @param {unknown} x - 확인할 값입니다.
 * @returns {x is Blob} 값이 `Blob` 객체일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
 * isBlob(blob); // true
 *
 * const notBlob = "Not a Blob";
 * isBlob(notBlob); // false
 */
export function isBlob(x: unknown): x is Blob {
  // Blob 타입을 지원하지 않는 경우 false를 반환
  if (typeof Blob === 'undefined') {
    return false;
  }

  return x instanceof Blob;
}
