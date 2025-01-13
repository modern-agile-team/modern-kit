type FloorUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

export interface Unit {
  unit: string;
  value: number;
}

export interface FormatNumberWithUnitsOptions {
  units?: Unit[] | readonly Unit[];
  separator?: string;
  floorUnit?: FloorUnit;
  space?: boolean;
  decimal?: number;
}
