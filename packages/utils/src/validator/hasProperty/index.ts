export const hasProperty = <
  T extends Record<PropertyKey, any>,
  K extends PropertyKey
>(
  obj: T,
  key: K
): key is K & keyof T => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
