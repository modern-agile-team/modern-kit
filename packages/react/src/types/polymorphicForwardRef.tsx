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
 * 조건부 타입을 사용하여 분배법칙처럼 동작합니다.
 *
 * @example
 * type Union = { a: string } | { b: number }
 * type Result = DistributiveOmit<Union, 'a'>
 * // Result = Omit<{a: string}, 'a'> | Omit<{b: number}, 'a'>
 * // Result = {} | {b: number}
 */
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;

/**
 * @description 두 타입을 병합하는 타입입니다.
 * B 타입의 속성이 A 타입의 속성을 덮어씁니다.
 *
 * @example
 * type A = { a: string, b: number }
 * type B = { b: string, c: boolean }
 * type Result = Merge<A, B>
 * // Result = { a: string, b: string, c: boolean }
 */
type Merge<A, B> = Omit<A, keyof B> & B;

/**
 * @description DistributiveMerge 타입은 유니온 타입의 각 구성 요소에 대해 B제네릭 key를 Omit한 후, B 타입과 병합합니다.
 *
 * @example
 * type A = { a: string, c: boolean } | { b: number }
 * type B = { c: boolean }
 * type Result = DistributiveMerge<A, B>
 * // Result = (Omit<{ a: string, c: boolean }, "c"> | Omit<{ b: number }, 'c'>) & B;
 * // Result = { a: string } & B | { b: number } & B;
 * // Result = { a: string, c: boolean } | { b: number, c: boolean }
 */
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

/**
 * @description 다형성 컴포넌트의 props 타입을 정의하는 타입입니다. as 프로퍼티를 포함합니다.
 *
 * - Component: 렌더링할 요소의 타입을 지정합니다. 예를 들어, 'button', 'div' 등 HTML 요소가 될 수 있습니다.
 * - PermanentProps: 항상 존재해야 하는 props를 정의합니다.
 * - ComponentProps: 지정된 요소 타입에 기본적으로 제공하는 props를 정의합니다. 예를 들어 button 요소의 경우 type, disabled 등이 있습니다.
 *
 * @example
 * interface ButtonProps {
 *   variant: 'primary' | 'secondary';
 *   size: 'sm' | 'md' | 'lg';
 * }
 *
 * // button 요소로 렌더링될 때의 타입
 * type HtmlButtonProps = AsProps<'button', ButtonProps, ComponentProps<'button'>>
 * // Result: {
 * //   variant: 'primary' | 'secondary';
 * //   size: 'sm' | 'md' | 'lg';
 * //   as?: 'button';
 * //   type?: 'button' | 'submit' | 'reset';
 * //   disabled?: boolean;
 * //   ... 기타 button의 HTML 속성들
 * // }
 */
type AsProps<
  Component extends ElementType,
  PermanentProps extends object,
  ComponentProps extends object
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>;

/**
 * @description ref를 포함한 다형성 컴포넌트의 함수 시그니처를 정의하는 타입입니다.
 * 이 타입은 다양한 요소 타입으로 렌더링될 수 있는 컴포넌트를 정의할 때 사용됩니다.
 *
 * - Default: 기본 요소 타입을 지정합니다.
 * - Props: 컴포넌트에 추가할 사용자 정의 props를 정의합니다.
 * - OnlyAs: 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. 기본적으로 모든 React 요소 타입이 허용됩니다.
 *
 * @example
 * // Button 컴포넌트의 사용자 정의 props를 정의합니다.
 * interface ButtonProps {
 *   variant: 'primary' | 'secondary';
 *   size: 'sm' | 'md' | 'lg';
 * }
 *
 * type ButtonComponent = PolymorphicWithRef<'button', ButtonProps>;
 */
type PolymorphicWithRef<
  Default extends OnlyAs,
  Props extends object = Record<string, never>,
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
 * @description forwardRef를 사용한 다형성 컴포넌트의 전체 타입을 정의합니다.
 * ForwardRefExoticComponent와 PolymorphicWithRef를 결합합니다.
 * ref 전달과 다형성을 모두 지원하는 컴포넌트를 생성합니다.
 *
 * - Default: 기본 요소 타입을 지정합니다.
 * - Props: 컴포넌트에 추가할 사용자 정의 props를 정의합니다.
 * - OnlyAs: 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. 기본적으로 모든 React 요소 타입이 허용됩니다.
 */
type PolyForwardComponent<
  Default extends OnlyAs,
  Props extends object = Record<string, never>,
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
 * 컴포넌트에 다형성과 ref 전달 기능을 모두 부여합니다. 다양한 요소 타입으로 렌더링할 수 있는 컴포넌트를 생성합니다.
 *
 * - Default: 기본 요소 타입을 지정합니다.
 * - Props: 컴포넌트에 추가할 사용자 정의 props를 정의합니다.
 * - OnlyAs: 컴포넌트가 렌더링될 수 있는 요소 타입을 제한합니다. 기본적으로 모든 React 요소 타입이 허용됩니다.
 */
type PolyRefFunction = <
  Default extends OnlyAs,
  Props extends object = Record<string, never>,
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
