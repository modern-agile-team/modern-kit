import { StorageType } from '../types';
import { isClient } from '../../device';

export const removeStorageItem = (type: StorageType, key: string) => {
  if (!isClient()) {
    console.error('Cannot be executed unless it is a client environment.');
    return;
  }

  try {
    const storage = window[type];
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${type} key "${key}"`);
  }
};
