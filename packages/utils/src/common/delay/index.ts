export function delay(time: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!Number.isInteger(time) || time < 0) {
      reject(new Error('Invalid time value'));
    }

    setTimeout(resolve, time);
  });
}
