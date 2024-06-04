export const delay = (time: number, callback?: () => void): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!Number.isInteger(time) || time < 0) {
      reject(new Error('Invalid time value'));
    }

    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, time);
  });
};
