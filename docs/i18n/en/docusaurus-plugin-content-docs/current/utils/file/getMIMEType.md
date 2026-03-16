# getMIMEType

A function that retrieves the `MIME type` by integrating **[getMIMETypeFromFile](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromFile)**, **[getMIMETypeFromResponse](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromResponse)**, and **[getMIMETypeFromUrl](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromUrl)**. Returns an `empty string ('')` if it fails to retrieve the MIME type.

💡 You can narrow the type to `MIMEType` using the **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** function.

💡 See the `Note` section below for all available MIME type values.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMEType/index.ts)

<br />

## Interface
```ts title="typescript"
const getMIMEType: (data: string | File | Response) => Promise<string>
```

<br />

## Usage

```ts title="typescript"
import { getMIMEType, isMIMEType } from '@modern-kit/utils';

const mimeType1 = await getMIMEType(response); // Gets MIME type via getMIMETypeFromResponse
const mimeType2 = await getMIMEType(url); // Gets MIME type via getMIMETypeFromUrl
const mimeType3 = await getMIMEType(file); // Gets MIME type via getMIMETypeFromFile

if (isMIMEType(mimeType1)) {
  mimeType1; // type: MIMEType
} else {
  mimeType1; // type: string
}
```
