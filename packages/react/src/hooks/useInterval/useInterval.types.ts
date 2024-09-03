export interface IntervalOptions {
  delay: number;
  enabled?: boolean;
}

export interface UseIntervalReturnType {
  set: () => void;
  clear: () => void;
  reset: () => void;
}
