import { audio } from "../../libraries/caseSpinConfig";
const audioContext = new AudioContext();
let clickBuffer;

fetch(`/assets/${audio.click}`)
  .then((response) => response.arrayBuffer())
  .then((data) => audioContext.decodeAudioData(data))
  .then((buffer) => {
    clickBuffer = buffer;
  })
  .catch((e) => {
    console.error(e);
  });

function cubicBezier(t, p1, p2) {
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const tSquared = t * t;

  return (
    3 * oneMinusTSquared * t * p1 + 3 * oneMinusT * tSquared * p2 + tSquared * t
  );
}

function playClick(volume) {
  if (!clickBuffer) return;
  const source = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();

  source.buffer = clickBuffer;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = volume;
  source.start();
}

export function playClicksOnBezier(duration, p1, p2, yStep = 0.01) {
  const yValues = [];
  for (let y = 0; y <= 1; y += yStep) {
    yValues.push(y);
  }

  const times = yValues.map((y) => findTimeForY(y, p1, p2) * duration);

  for (let i = 0; i < times.length; i++) {
    setTimeout(() => playClick(audio.clickVolume), times[i] * 1000);
  }
}

function findTimeForY(yTarget, p1, p2, precision = 0.0001) {
  let lower = 0;
  let upper = 1;
  let t = (upper + lower) / 2;
  let y = cubicBezier(t, p1, p2);

  while (Math.abs(y - yTarget) > precision) {
    if (y < yTarget) {
      lower = t;
    } else {
      upper = t;
    }
    t = (upper + lower) / 2;
    y = cubicBezier(t, p1, p2);
  }

  return t;
}
