# getBlobFromUrl

A function that takes a `URL` string, makes a `fetch` request to that `URL`, and returns the response `Response` object converted to a `Blob` object.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getBlobFromUrl/index.ts)

<br />

## Interface
```ts title="typescript"
const getBlobFromUrl: (url: string) => Promise<Blob>
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { getBlobFromUrl } from '@modern-kit/utils';

getBlobFromUrl("URL");
```
