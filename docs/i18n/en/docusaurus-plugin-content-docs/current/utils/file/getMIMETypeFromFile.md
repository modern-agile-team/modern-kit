# getMIMETypeFromFile

A function that takes a `File` object and extracts the `MIME type` from it. Returns an `empty string ('')` if it fails to retrieve the MIME type.

💡 You can narrow the type to `MIMEType` using the **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** function.

💡 See the `Note` section below for all available MIME type values.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromFile/index.ts)

<br />

## Interface
```ts title="typescript"
const getMIMETypeFromFile: (file: File) => string
```

<br />

## Usage

```ts title="typescript"
import { getMIMETypeFromFile, isMIMEType } from '@modern-kit/utils';

const mimeType = getMIMETypeFromFile(file);

if (isMIMEType(mimeType)) {
  mimeType; // type: MIMEType
} else {
  mimeType; // type: string
}
```
