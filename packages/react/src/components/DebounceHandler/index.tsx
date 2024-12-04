import { Children, cloneElement } from 'react';
import { DebounceParameters, useDebounce } from '../../hooks/useDebounce';
import { isFunction } from '@modern-kit/utils';

interface DebounceHandlerProps {
  children: JSX.Element;
  capture: string;
  wait: DebounceParameters[1];
  options?: DebounceParameters[2];
}

/**
 * @description 자식 컴포넌트의 이벤트 핸들러에 디바운스를 선언적으로 적용할 수 있는 컴포넌트입니다.
 *
 * @param {DebounceHandlerProps} props - `DebounceHandler` 컴포넌트의 속성
 * @param {JSX.Element} props.children - 디바운스를 적용할 자식 컴포넌트
 * @param {string} props.capture - 디바운스를 적용할 이벤트 핸들러 이름 (예: 'onClick', 'onChange')
 * @param {number} props.wait - 디바운스가 적용될 시간(ms)입니다. 이 시간이 지나면 콜백이 실행됩니다.
 * @param {object} props.options - 디바운스 동작에 영향을 주는 추가 옵션입니다.
 *
 * @returns {JSX.Element} - 디바운스가 적용된 자식 컴포넌트
 *
 * @example
 * ```tsx
 * // onClick debounce
 * <DebounceHandler capture="onClick" wait={300}>
 *   <button onClick={handleClick}>Button</button>
 * </DebounceHandler>
 * ```
 *
 * @example
 * ```tsx
 * // onChange debounce
 * const [debouncedValue, setDebouncedValue] = useState('');
 *
 * const onChange = (value: string) => {
 *   setDebouncedValue(value);
 * };
 *
 * // 컴포넌트로 래핑이 필요합니다
 * const Input = ({ onChange }: { onChange: (value: string) => void }) => {
 *   const [value, setValue] = useState('');
 *
 *   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
 *     setValue(e.target.value);
 *     onChange(e.target.value);
 *   };
 *
 *   return <input onChange={handleChange} value={value} />;
 * };
 *
 * <DebounceHandler capture="onChange" wait={300}>
 *   <Input onChange={onChange} />
 * </DebounceHandler>
 * ```
 */
export const DebounceHandler = ({
  children,
  capture,
  wait,
  options,
}: DebounceHandlerProps): JSX.Element => {
  const child = Children.only(children);

  const debouncedCallback = useDebounce(
    (...args: any[]) => {
      const childProps = child?.props;

      if (!childProps) return;
      if (isFunction(childProps[capture])) {
        return childProps[capture](...args);
      }
    },
    wait,
    options
  );

  return cloneElement(child, {
    [capture]: debouncedCallback,
  });
};
