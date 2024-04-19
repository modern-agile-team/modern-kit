import { getUniqTime } from '../getUniqTime';

export const getUniqId = () => {
  return (getUniqTime() * 1000).toString(16);
};
