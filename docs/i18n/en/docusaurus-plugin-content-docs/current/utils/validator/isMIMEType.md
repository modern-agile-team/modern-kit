# isMIMEType

A function that checks whether a given argument is a `MIME Type`, and if so, narrows the type of the argument to `MIME Type`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isMIMEType/index.ts)

## Interface
```ts title="typescript"
export const MIME_TYPES = [
  'application/json',
  'application/javascript',
  'application/pdf',
  'application/xml',
  'application/zip',
  'application/x-www-form-urlencoded',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'text/css',
  'text/html',
  'text/plain',
  'text/xml',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
] as const;

export type MIMEType = (typeof MIME_TYPES)[number];


const isMIMEType: (arg: unknown) => arg is MIMEType
```

<br />

## Usage
```ts title="typescript"
import { isMIMEType } from '@modern-kit/utils';

isMIMEType('image/png'); // true
isMIMEType('application/json'); // true

isMIMEType(''); // false
isMIMEType('abc'); // false
isMIMEType([]); // false
isMIMEType({}); // false
```

## References
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
