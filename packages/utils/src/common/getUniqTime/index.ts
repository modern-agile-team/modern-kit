let dt = 0;
let memorizedTime = 0;

export function getUniqTime() {
  const currentTime = new Date().getTime();

  if (memorizedTime === currentTime) {
    dt += 1;
  } else {
    memorizedTime = currentTime;
    dt = 0;
  }

  return (currentTime * 1000 + dt) / 1000;
}
