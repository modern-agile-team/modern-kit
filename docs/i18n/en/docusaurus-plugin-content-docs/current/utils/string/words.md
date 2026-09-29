# words

Splits a string into an array of words. Whitespace and punctuation are treated as separators, and word boundaries in `camelCase` and `PascalCase` as well as consecutive uppercase letters (acronyms) are recognized.

<br />

Characters without case, such as Hangul, Kanji, and Kana, are treated like lowercase letters, so they are not split from the lowercase Latin letters that follow them. (`'번개장터bunjangApp'` → `['번개장터bunjang', 'App']`)

<br />

Emojis are separated from surrounding characters and each becomes its own word, and flags, keycaps, skin tones, and ZWJ emoji sequences are kept as a single word. Conversely, non-emoji symbols (`₩`, `⇒`, etc.) do not break words and attach like letters.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/words/index.ts)

<br />

## Interface

```ts title="typescript"
function words(str: string): string[];
```

<br />

## Remarks

:::caution Caution

- Because it uses Unicode property escapes (`\p{...}`), it does not work on engines older than Chrome 64 / Safari 11.1.
  - The regular expression is created on the first call to `words`, so merely importing the module does not throw.
    :::

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { words } from '@modern-kit/utils';

words('fred, barney, & pebbles'); // ['fred', 'barney', 'pebbles']
words('camelCaseHTTPRequest'); // ['camel', 'Case', 'HTTP', 'Request']
words('foo_bar-baz qux'); // ['foo', 'bar', 'baz', 'qux']
words('Lunedì 18 Set'); // ['Lunedì', '18', 'Set']
words("it's the 1st time"); // ["it's", 'the', '1st', 'time']
```

<br />

### Hangul

```ts title="typescript"
words('상품12개'); // ['상품', '12', '개']
words('번개장터Bunjang'); // ['번개장터', 'Bunjang']
words('번개장터bunjangApp'); // ['번개장터bunjang', 'App']
```

<br />

### Symbols and Emojis

```ts title="typescript"
// Non-emoji symbols do not break words
words('정가₩1000'); // ['정가₩', '1000']

// Emojis are separated from surrounding characters
words('알람⏰설정'); // ['알람', '⏰', '설정']

// ZWJ emoji sequences are kept as a single word
words('가족 👨‍👩‍👧'); // ['가족', '👨‍👩‍👧']
```

<br />

### Non-ASCII Digits

```ts title="typescript"
// Non-ASCII digits are treated as letters
words('상품 １２ 개'); // ['상품', '１２', '개']
```
