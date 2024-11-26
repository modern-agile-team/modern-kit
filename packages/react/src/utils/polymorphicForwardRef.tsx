import {
  forwardRef,
  Fragment,
  type ComponentProps,
  type ComponentPropsWithRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type ForwardRefRenderFunction,
  type ReactElement,
} from 'react';

/**
 * @description 유니온 타입에서 각각의 타입에 대해 Omit을 적용하는 타입입니다.
 * `조건부 타입`을 사용하여 분배법칙처럼 동작합니다.
 *
 * @template T - 분배 대상이 되는 유니온 타입
 * @template K - 제거할 프로퍼티 키
 *
 * @example
 * type Union = { a: string } | { b: number }
 * type Result = DistributiveOmit<Union, 'a'>
 *
 * // 동작 원리와 순서
 * // 1. Result = DistributiveOmit<Union, 'a'>
 * // 2. Result = Omit<{ a: string }, 'a'> | Omit<{ b: number }, 'a'>
 * // 3. Result = {} | { b: number }
 */
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;

/**
 * @description 두 타입을 병합하는 타입입니다.
 *
 * @template A - 첫 번째 타입
 * @template B - 두 번째 타입
 *
 * @example
 * type A = { a: string, b: number }
 * type B = { b: string, c: boolean }
 * type Result = Merge<A, B>
 *
 * // 동작 원리와 순서
 * // 1. Result = Merge<A, B>
 * // 2. Result = Omit<A, 'b' | 'c'> & B
 * // 3. Result = { a: string } & B
 * // 4. Result = { a: string, b: string, c: boolean }
 */
type Merge<A, B> = Omit<A, keyof B> & B;

/**
 * @description 유니온 타입의 각 구성 요소에 대해 B 타입과의 병합을 수행하는 타입입니다.
 * 각 유니온 멤버에서 B의 키들을 제거한 후, B 타입과 병합합니다.
 *
 * @template A - 병합의 대상이 되는 유니온 타입
 * @template B - 각 유니온 멤버와 병합될 타입
 *
 * @example
 * type A = { a: string, c: boolean } | { b: number }
 * type B = { c: boolean }
 * type Result = DistributiveMerge<A, B>
 *
 * // 동작 원리와 순서
 * // 1. Result = (Omit<{ a: string, c: boolean }, "c"> | Omit<{ b: number }, 'c'>) & B;
 * // 2. Result = { a: string } & B | { b: number } & B;
 * // 3. Result = { a: string, c: boolean } | { b: number, c: boolean }
 */
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

/**
 * @description 다형성 컴포넌트의 props 타입을 정의하는 타입입니다. 이때, `as` 프로퍼티를 포함합니다.
 *
 * @template Component - 렌더링할 요소의 타입을 지정합니다. 예를 들어, 'button', 'div' 등 HTML 요소가 될 수 있습니다.
 * @template PermanentProps - 컴포넌트의 고정 props 타입입니다.
 * @template ComponentProps - 지정된 요소 타입에 기본적으로 제공하는 props 타입입니다. 예를 들어 button 요소의 경우 type, disabled 등이 있습니다.
 *
 * @example
 * interface ButtonProps {
 *   variant: 'primary' | 'secondary';
 *   size: 'sm' | 'md' | 'lg';
 * }
 *
 * // button 요소로 렌더링될 때의 타입
 * type HtmlButtonProps = AsProps<'button', ButtonProps, ComponentProps<'button'>>
 * // HtmlButtonProps = {
 * //   variant: 'primary' | 'secondary';
 * //   size: 'sm' | 'md' | 'lg';
 * //   as?: 'button';
 * //   ... 기타 button의 HTML 속성들
 * // }
 */
type AsProps<
  Component extends ElementType,
  PermanentProps extends Record<string, any>,
  ComponentProps extends Record<string, any>
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>;

/**
 * @description ref를 포함한 다형성 컴포넌트의 함수 시그니처를 정의하는 타입입니다.
 * 하나의 컴포넌트가 여러 HTML 요소로 렌더링될 수 있도록 하며, 각 요소에 맞는 props와 ref를 자동으로 처리합니다.
 *
 * @template Default - 렌더링할 요소의 타입을 지정합니다. 예를 들어, 'button', 'div' 등 HTML 요소가 될 수 있습니다.
 * @template Props - 컴포넌트의 커스텀 props 타입입니다.
 * @template OnlyAs - 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. (선택적, 기본값: ElementType)
 */
type PolymorphicWithRef<
  Default extends OnlyAs,
  Props extends Record<string, any>,
  OnlyAs extends ElementType = ElementType
> = <T extends OnlyAs = Default>(
  props: AsProps<
    T,
    Props,
    T extends ElementType
      ? ComponentPropsWithRef<T>
      : ComponentProps<typeof Fragment>
  >
) => ReactElement | null;

/**
 * @description React.forwardRef를 사용한 다형성 컴포넌트의 전체 타입을 정의합니다.
 * ForwardRefExoticComponent와 PolymorphicWithRef를 결합합니다.
 *
 * @template Default - 렌더링할 요소의 타입을 지정합니다. 예를 들어, 'button', 'div' 등 HTML 요소가 될 수 있습니다.
 * @template Props - 컴포넌트의 커스텀 props 타입입니다.
 * @template OnlyAs - 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. (선택적, 기본값: ElementType)
 */
type PolyForwardComponent<
  Default extends OnlyAs,
  Props extends Record<string, any>,
  OnlyAs extends ElementType = ElementType
> = Merge<
  ForwardRefExoticComponent<
    Merge<
      Default extends ElementType
        ? ComponentPropsWithRef<Default>
        : ComponentProps<typeof Fragment>,
      Props & { as?: Default }
    >
  >,
  PolymorphicWithRef<Default, Props, OnlyAs>
>;

/**
 * @description React.forwardRef를 위한 다형성 타입 래퍼입니다.
 * 컴포넌트에 다형성과 ref 전달 기능을 모두 부여합니다.
 *
 * @template Default - 렌더링할 요소의 타입을 지정합니다. 예를 들어, 'button', 'div' 등 HTML 요소가 될 수 있습니다.
 * @template Props - 컴포넌트의 커스텀 props 타입입니다.
 * @template OnlyAs - 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. (선택적, 기본값: ElementType)
 *
 * @returns 다형성과 ref 전달이 가능한 새로운 컴포넌트 타입을 반환합니다.
 */
type PolyRefFunction = <
  Default extends OnlyAs,
  Props extends Record<string, any>,
  OnlyAs extends ElementType = ElementType
>(
  Component: ForwardRefRenderFunction<any, Props & { as?: OnlyAs }>
) => PolyForwardComponent<Default, Props, OnlyAs>;

/**
 * @description React.forwardRef를 다형성 컴포넌트를 위한 타입으로 캐스팅하는 유틸리티입니다.
 * 기존의 forwardRef를 PolyRefFunction 타입으로 변환하여 다형성과 ref 전달을 모두 지원하는 컴포넌트를 생성할 수 있게 합니다.
 *
 * @example
 * interface ButtonProps {
 *   variant: 'primary' | 'secondary';
 *   size: 'sm' | 'md' | 'lg';
 * }
 *
 * const Button = polymorphicForwardRef<'button', ButtonProps>((props, ref) => {
 *   const Component = props.as ?? 'button';
 *   return <Component ref={ref} {...props} />;
 * });
 */
export const polymorphicForwardRef = forwardRef as PolyRefFunction;
