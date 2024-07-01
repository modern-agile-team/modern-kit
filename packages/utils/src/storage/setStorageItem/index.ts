import { StorageType } from '../types';
import { isClient } from '../../device';
import { isFunction } from '../../validator';

export const setStorageItem = <T>(
  type: StorageType,
  key: string,
  value: T | (() => T)
) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const storage = window[type];
    const newValue = isFunction(value) ? value() : value;

    storage.setItem(key, JSON.stringify(newValue));
  } catch (err) {
    throw new Error(`Failed to store data for key "${key}" in ${type}: ${err}`);
  }
};
