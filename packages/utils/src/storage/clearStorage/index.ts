import { StorageType } from '../types';
import { isClient } from '../../device';

export const clearStorage = (type: StorageType) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const storage = window[type];
    storage.clear();
  } catch (err) {
    throw new Error(`Failed to clear ${type}: ${err}`);
  }
};
