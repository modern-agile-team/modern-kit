/**
 * @description 여러 이벤트 핸들러를 하나의 핸들러로 병합합니다.
 *
 * 이벤트 핸들러가 반환하는 값이 `false`일 경우 이후 전달된 이벤트 핸들러의 실행을 중단합니다.
 *
 * @param {((event: E) => boolean | void)[]} handlers 병합할 이벤트 핸들러 배열
 * @returns {((event: E) => void)} 병합된 이벤트 핸들러
 *
 * @example
 * const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('clicked');
 * };
 * const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('clicked2');
 * };
 *
 * const mergedEventHandler = mergeEventHandlers(handleClick, handleClick2);
 *
 * @example
 * // 이벤트 핸들러가 반환하는 값이 `false`일 경우 이후 전달된 이벤트 핸들러의 실행을 중단합니다.
 * const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('clicked');
 *
 *   // 짝수일 경우 false를 반환하여 이후 전달된 이벤트 핸들러의 실행을 중단합니다.
 *   if (num % 2 === 0) {
 *     return false;
 *   }
 * };
 *
 * const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('clicked2');
 * };
 *
 * const mergedEventHandler = mergeEventHandlers(handleClick1, handleClick2);
 */
export const mergeEventHandlers = <E>(
  ...handlers: ((event: E) => boolean | void)[]
): ((event: E) => void) => {
  return (event: E) => {
    for (let i = 0; i < handlers.length; i++) {
      const result = handlers[i](event);

      if (result === false) {
        break;
      }
    }
  };
};
