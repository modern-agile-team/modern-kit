# truncate

문자열이 지정한 길이를 넘으면 잘라내고, 잘린 자리에 생략 기호를 붙이는 함수입니다.

`length`는 `omission`을 포함한 결과 문자열 전체의 길이이므로, 반환값은 `length`를 넘지 않습니다. (단, `length`가 `omission`의 길이 이하이면 `omission`만 반환합니다.)

<br />

길이는 코드 단위가 아닌 그래핌 클러스터(사용자가 한 글자로 인식하는 단위)로 셉니다. 덕분에 이모지 시퀀스(`'👨‍👩‍👧'`)나 결합 문자가 중간에서 쪼개지지 않습니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/truncate/index.ts)

<br />

## Interface

```ts title="typescript"
interface TruncateOptions {
  length?: number;
  omission?: string;
  separator?: string | RegExp;
}

function truncate(str: string, options?: TruncateOptions): string;
```

<br />

## Parameters

| Name                | Type               | Default | Description                                                               |
| ------------------- | ------------------ | ------- | ------------------------------------------------------------------------- |
| `str`               | `string`           | -       | 자를 문자열입니다.                                                        |
| `options.length`    | `number`           | `30`    | `omission`을 포함한 결과 문자열의 최대 길이입니다.                        |
| `options.omission`  | `string`           | `'...'` | 잘린 자리에 덧붙일 문자열입니다.                                          |
| `options.separator` | `string \| RegExp` | -       | 단어 중간이 끊기지 않도록, 잘리는 지점 앞의 마지막 구분자까지만 남깁니다. |

<br />

## Remarks

:::info 참고사항

- `separator`로 전달한 문자열은 정규 표현식이 아닌 문자 그대로 다룹니다. (`'.'`, `'('` 등)
- `separator`로 전달한 정규 표현식의 `lastIndex`는 변경되지 않습니다.
- `Intl.Segmenter`를 지원하지 않는 환경에서는 코드 포인트 단위로 폴백합니다. 이때 서로게이트 페어는 안전하지만, ZWJ 이모지 시퀀스나 결합 문자 등은 여러 글자로 세어집니다.
  :::

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { truncate } from '@modern-kit/utils';

truncate('hi-diddly-ho there, neighborino');
// 'hi-diddly-ho there, neighbo...' (기본 length: 30)

// length 는 omission 까지 포함한 길이입니다 (21 + 3 = 24)
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// 'hi-diddly-ho there, n...'

// 원본이 length 이하면 그대로 반환합니다
truncate('번개장터', { length: 10 }); // '번개장터'
```

<br />

### omission

```ts title="typescript"
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// 'hi-diddly-ho there, neig [...]'
```

<br />

### separator

```ts title="typescript"
// separator 를 주면 단어 중간에서 끊기지 않습니다
truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' });
// 'hi-diddly-ho there,...'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ });
// 'hi-diddly-ho there...'
```

<br />

### 그래핌 클러스터

```ts title="typescript"
// 이모지 시퀀스는 쪼개지지 않고 한 글자로 세어집니다
truncate('가족은 👨‍👩‍👧 입니다', { length: 8 }); // '가족은 👨‍👩‍👧...'
truncate('😀😀😀😀😀', { length: 4 }); // '😀...'
```
