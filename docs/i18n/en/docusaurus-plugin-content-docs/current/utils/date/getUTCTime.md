# getUTCTime

Converts local time to `UTC` time.

Local times such as `YYYY-MM-DD HH:mm:ss` are interpreted differently by country.

```ts title="typescript"
new Date('2025-01-01 09:30:15').getTime(); // Korea (Seoul): 1735704015000
new Date('2025-01-01 09:30:15').getTime(); // India (New Delhi): 1735691415000
```

To obtain the same timestamp regardless of country, you need to normalize to UTC time.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getUTCTime/index.ts)

<br />

## Interface
```ts title="typescript"
function getUTCTime(birthDate: string | number | Date): number
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { getUTCTime } from '@modern-kit/utils';

// Korea (Seoul) timezone
const kstDate = new Date('2025-01-01 09:30:15');
const kstDateTime = kstDate.getTime(); // 1735704015000
const utcTime = getUTCTime(kstDate); // 1735723815000

// India (New Delhi) timezone
const indiaDate = new Date('2025-01-01 09:30:15');
const indiaTime = indiaDate.getTime(); // 1735691415000
const utcTime = getUTCTime(indiaDate); // 1735723815000
```
