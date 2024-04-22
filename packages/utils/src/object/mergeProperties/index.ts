import { hasProperty } from '../../validator';

export const mergeProperties = <
  T extends Record<PropertyKey, any>,
  K extends Record<PropertyKey, any>
>(
  target: T,
  source: K,
  exclude?: string[]
): T & K => {
  if (typeof target !== 'object' || typeof source !== 'object') {
    return target;
  }

  const merged = { ...target };

  for (const key in source) {
    if (exclude && exclude.includes(key)) continue;

    if (hasProperty(source, key)) {
      if (typeof source[key] === 'object') {
        if (Array.isArray(source[key])) {
          merged[key] = [...target[key], ...source[key]] as any;
        } else {
          merged[key] = mergeProperties(target[key], source[key]);
        }
      } else {
        merged[key] = source[key];
      }
    }
  }

  return merged;
};
