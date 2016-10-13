export function getRamdomValueInRange(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

export function getRandomDeg() {
  let deg = Math.ceil(Math.random() * 30);
  return Math.random() > 0.5 ? deg : -deg;
}
