import { Nullable, StorageType } from '../types';
import { isClient } from '../../device';
import { isFunction } from '../../validator/isFunction';

export const getStorageItem = <T>(
  type: StorageType,
  key: string,
  initialValue: Nullable<T | (() => T)> = null
) => {
  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;

  if (!isClient()) {
    console.warn('Not running in a client environment.');
    return initialValueToUse;
  }

  try {
    const storage = window[type];
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialValueToUse;
  } catch (error) {
    console.warn(`Error reading ${type} key "${key}"`);
    return initialValueToUse;
  }
};
