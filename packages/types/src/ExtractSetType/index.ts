export type ExtractSetType<T> = T extends Set<infer U> ? U : never;
