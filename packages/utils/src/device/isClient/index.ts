import { isServer } from '../isServer';

export const isClient = () => {
  return !isServer();
}
