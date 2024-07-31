import { getUniqTime } from '../getUniqTime';

export function getUniqId() {
  return (getUniqTime() * 1000).toString(16);
}
