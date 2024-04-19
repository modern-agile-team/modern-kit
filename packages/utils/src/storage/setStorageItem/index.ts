import { StorageType } from '../types';
import { isClient } from '../../device';
import { isFunction } from '../../validator';

export const setStorageItem = <T>(
  type: StorageType,
  key: string,
  value: T | (() => T)
) => {
  if (!isClient()) {
    console.warn('Not running in a client environment.');
    return;
  }

  try {
    const storage = window[type];
    const newValue = isFunction(value) ? value() : value;

    storage.setItem(key, JSON.stringify(newValue));
  } catch (error) {
    console.warn(`Error setting ${type} key "${key}"`);
  }
};
