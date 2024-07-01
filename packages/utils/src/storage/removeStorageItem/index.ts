import { StorageType } from '../types';
import { isClient } from '../../device';

export const removeStorageItem = (type: StorageType, key: string) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const storage = window[type];
    storage.removeItem(key);
  } catch (err) {
    throw new Error(`Failed to remove key "${key}" from ${type}: ${err}`);
  }
};
