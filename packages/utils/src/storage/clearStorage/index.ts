import { StorageType } from '../types';
import { isClient } from '../../device';

export const clearStorage = (type: StorageType) => {
  if (!isClient()) {
    console.warn('Not running in a client environment.');
    return;
  }

  try {
    const storage = window[type];
    storage.clear();
  } catch (error) {
    console.warn(`Error clearing ${type}`);
  }
};
