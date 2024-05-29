export function exclude<E>(array: E[], ...args: E[]) {
  const excludeSet = new Set(args.map((arg) => JSON.stringify(arg)));

  return array.filter((element) => !excludeSet.has(JSON.stringify(element)));
}
