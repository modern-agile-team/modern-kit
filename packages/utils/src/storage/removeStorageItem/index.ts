import { StorageType } from '../types';
import { isClient } from '../../device';

export const removeStorageItem = (type: StorageType, key: string) => {
  if (!isClient()) {
    console.warn('Not running in a client environment.');
    return;
  }

  try {
    const storage = window[type];
    storage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing ${type} key "${key}"`);
  }
};
