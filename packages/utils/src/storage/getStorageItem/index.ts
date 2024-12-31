import { StorageType } from '../types';
import { isClient } from '../../device';
import { isFunction } from '../../validator/isFunction';
import { parseJSON } from '../../common';

export function getStorageItem<T>(
  type: StorageType,
  key: string,
  initialValue: T | (() => T) | null = null
) {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const initialValueToUse = isFunction(initialValue)
      ? initialValue()
      : initialValue;

    const storage = window[type];
    const storedValue = storage.getItem(key);

    return storedValue ? parseJSON(storedValue) : initialValueToUse;
  } catch (err) {
    throw new Error(`Failed to read data for key "${key}" in ${type}: ${err}`);
  }
}
