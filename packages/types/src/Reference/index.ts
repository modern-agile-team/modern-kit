export type Reference =
  | object
  | any[]
  | ((...args: any[]) => any)
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error;
