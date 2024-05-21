import { StorageType } from '../types';
import { isClient } from '../../device';
import { isFunction } from '../../validator/isFunction';
import { Nullable } from '@modern-kit/types';

export const getStorageItem = <T>(
  type: StorageType,
  key: string,
  initialValue: Nullable<T | (() => T)> = null
) => {
  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;

  if (!isClient()) {
    console.error('Cannot be executed unless it is a client environment.');
    return initialValueToUse;
  }

  try {
    const storage = window[type];
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialValueToUse;
  } catch (error) {
    console.error(`Error reading ${type} key "${key}"`);
    return initialValueToUse;
  }
};
