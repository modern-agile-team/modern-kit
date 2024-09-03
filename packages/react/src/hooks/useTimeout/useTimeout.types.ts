export interface TimeoutOptions {
  delay: number;
  enabled?: boolean;
}

export interface UseTimeoutReturnType {
  set: () => void;
  clear: () => void;
  reset: () => void;
}
