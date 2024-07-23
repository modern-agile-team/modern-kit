export type Reference =
  | Record<PropertyKey, any>
  | any[]
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Function
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error;
