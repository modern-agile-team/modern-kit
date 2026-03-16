# getUTCTime

로컬 시간을 `UTC` 시간으로 변환합니다.

`YYYY-MM-DD HH:mm:ss`와 같은 로컬 시간은 나라마다 다르게 해석됩니다.

```ts title="typescript"
new Date('2025-01-01 09:30:15').getTime(); // 한국(서울): 1735704015000
new Date('2025-01-01 09:30:15').getTime(); // 인도(뉴델리): 1735691415000
```

어떤 나라에서든 동일한 timestamp를 얻기 위해서는 UTC 시간으로 보정해야 합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getUTCTime/index.ts)

<br />

## Interface
```ts title="typescript"
function getUTCTime(birthDate: string | number | Date): number
```

<br />

## Usage

```ts title="typescript"
import { getUTCTime } from '@modern-kit/utils';

// 한국(서울) 기준
const kstDate = new Date('2025-01-01 09:30:15');
const kstDateTime = kstDate.getTime(); // 1735704015000
const utcTime = getUTCTime(kstDate); // 1735723815000

// 인도(뉴델리) 기준
const indiaDate = new Date('2025-01-01 09:30:15');
const indiaTime = indiaDate.getTime(); // 1735691415000
const utcTime = getUTCTime(indiaDate); // 1735723815000
```