import { audio } from "../../libraries/caseSpinConfig";
export const audioContext = new AudioContext();

const loadAudioFile = async (url) => {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return await audioContext.decodeAudioData(data);
};

const initAudio = async () => {
  try {
    const snapBackBuffer = await loadAudioFile(`/assets/${audio.snapBack}`);
    const bigWinBuffer = await loadAudioFile(`/assets/${audio.onBigWin}`);
    const confettiBuffer = await loadAudioFile(`/assets/${audio.confetti}`);
    return {
      snapBackBuffer: { buffer: snapBackBuffer, volume: audio.snapBackVolume },
      bigWinBuffer: { buffer: bigWinBuffer, volume: audio.onBigWinVolume },
      confettiBuffer: { buffer: confettiBuffer, volume: audio.confettiVolume },
    };
  } catch (e) {
    console.error(e);
  }
};

export default async function getAudioBuffers() {
  const audioBuffers = await initAudio();
  return audioBuffers;
}
