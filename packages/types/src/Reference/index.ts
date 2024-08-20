export type Reference =
  | Record<PropertyKey, any>
  | any[]
  | ((...args: any[]) => any) // Function
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error;
