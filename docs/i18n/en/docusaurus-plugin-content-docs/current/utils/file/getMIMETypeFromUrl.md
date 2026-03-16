# getMIMETypeFromUrl

An async function that takes a `URL` string, makes a `fetch` request to that `URL`, and extracts the `MIME type` from the response `Response` object. Returns an `empty string ('')` if it fails to retrieve the MIME type.

💡 You can narrow the type to `MIMEType` using the **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** function.

💡 See the `Note` section below for all available MIME type values.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromUrl/index.ts)

<br />

## Interface
```ts title="typescript"
const getMIMETypeFromUrl: (url: string) => Promise<string>
```

<br />

## Usage

```ts title="typescript"
import { getMIMETypeFromUrl, isMIMEType } from '@modern-kit/utils';

const mimeType = await getMIMETypeFromUrl("URL");

if (isMIMEType(mimeType)) {
  mimeType; // type: MIMEType
} else {
  mimeType; // type: string
}
```
