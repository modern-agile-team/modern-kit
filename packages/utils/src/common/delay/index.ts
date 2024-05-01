export const delay = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });
};
