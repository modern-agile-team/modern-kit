import { StorageType } from '../types';
import { isClient } from '../../device';

export const clearStorage = (type: StorageType) => {
  if (!isClient()) {
    console.error('Cannot be executed unless it is a client environment.');
    return;
  }

  try {
    const storage = window[type];
    storage.clear();
  } catch (error) {
    console.error(`Error clearing ${type}`);
  }
};
