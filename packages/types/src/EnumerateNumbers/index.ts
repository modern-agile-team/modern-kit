export type EnumerateNumbers<N, Acc extends number[] = []> = N extends number
  ? Acc['length'] extends N
    ? Acc[number]
    : EnumerateNumbers<N, [...Acc, Acc['length']]>
  : never;
