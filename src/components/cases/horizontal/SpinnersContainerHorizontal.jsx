import { createSignal, createEffect } from "solid-js";
import SpinnerReelHorizontal from "./SpinnerReelHorizontal";
import { playClicksOnBezier } from "../../../utilities/Sounds/clickAudio";
import { spinReelsTrigger, setSpinReelsTrigger } from "../store";
import getAudioBuffers, { audioContext } from "../../../utilities/Sounds/audioBuffers";
import { spinnerTimings, otherOptions } from "../../../libraries/caseSpinConfig";
import { isFastAnimation } from "../../../views/unbox/CaseUnboxing";

export const [containerRef, setContainerRef] = createSignal();


export const [reelsSpinning, setReelsSpinning] = createSignal(false);
const [activeSpinners, setActiveSpinners] = createSignal(0);
export const [spinIndex, setSpinIndex] = createSignal();
export const [spinList, setSpinList] = createSignal([]);
export const [spinOffsets, setSpinOffsets] = createSignal([]);

const [clickPlayed, setClickPlayed] = createSignal(false);
const [snapBackPlayed, setSnapBackPlayed] = createSignal(false);

const [containsBigWin, setContainsBigWin] = createSignal(false);
const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);

let snapBackBuffer, bigWinBuffer, confettiBuffer;

const init = async () => {
  // const audioBuffers = await getAudioBuffers();
  // snapBackBuffer = audioBuffers.snapBackBuffer;
  // bigWinBuffer = audioBuffers.bigWinBuffer;
  // confettiBuffer = audioBuffers.confettiBuffer;
};

init();

const playAudioBuffer = (buffer, volume) => {
  const source = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();

  source.buffer = buffer;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = volume;
  source.start();

  return source;
};

export const playEndAudio = () => {
  if (snapBackPlayed()) return;
  setSnapBackPlayed(true);
  const snapBackSource = playAudioBuffer(
    snapBackBuffer.buffer,
    snapBackBuffer.volume
  );

  snapBackSource.onended = () => {
    if (containsBigWin()) {
      playAudioBuffer(bigWinBuffer.buffer, bigWinBuffer.volume);
    }
    if (containsConfettiWin()) {
      playAudioBuffer(confettiBuffer.buffer, confettiBuffer.volume);
    }
  };
};

export const playClickAudio = () => {
  if (clickPlayed()) return;
  setClickPlayed(true);
  let durationInSeconds = spinnerTimings.horizontalInitialSpin; // For example, a 2-second duration
  if (isFastAnimation()) {
    durationInSeconds = durationInSeconds * spinnerTimings.fastSpinMultiplier;
  }
  const p1 = 1; // Control point 1 (0.25, 1)
  const p2 = 1; // Control point 2 (0.5, 1)
  playClicksOnBezier(durationInSeconds, p1, p2, 0.04);
};

const resetValues = () => {
  setClickPlayed(false);
  setSnapBackPlayed(false);
  setContainsBigWin(false);
  setContainsConfettiWin(false);

  setSpinIndex(null);
  setSpinList([]);
  setSpinOffsets([]);
  setActiveSpinners(0);
};

const SpinnersContainerHorizontal = ({
  numSpinners,
  caseItemList,
  spinnerOptions,
}) => {
  const generateSpinData = () => {
    const spinIndex = getRandomIndex();
    let spinList = generateSpinList();
    spinList[spinIndex] = spinnerOptions()[0].winningItem;
    if (spinnerOptions()[0].isBigWin) {
      setContainsBigWin(true);
    }
    if (spinnerOptions()[0].isConfettiWin) {
      setContainsConfettiWin(true);
    }

    setSpinIndex(spinIndex);
    setSpinList(spinList);
  };

  const generateSpinList = () => {
    setSpinOffsets([]);
    const newSpinList = [];
    for (let i = 0; i < otherOptions.horizontalEndBound + 10; i++) {
      newSpinList.push(
        caseItemList()[Math.floor(Math.random() * caseItemList().length)]
      );
    }
    return newSpinList;
  };

  const getRandomIndex = () => {
    return (
      Math.floor(
        Math.random() *
          (otherOptions.horizontalEndBound -
            otherOptions.horizontalStartBound +
            1)
      ) + otherOptions.horizontalStartBound
    );
  };

  const spinReels = () => {
    if (reelsSpinning()) {
      setActiveSpinners(0);
    }
    resetValues();
    setActiveSpinners(1);
    generateSpinData();
    setReelsSpinning(true);
  };

  createEffect(() => {
    if (spinReelsTrigger.triggered) {
      setTimeout(() => {
        spinReels();
        setSpinReelsTrigger({ triggered: false });
      }, 0);
    }
  });

  return (
    <div class="relative w-full">
      <div
        class="relative w-full h-[326px] overflow-hidden "
        ref={setContainerRef}
      >
        {Array.from({ length: activeSpinners() }).map((_, index) => {
          return spinnerOptions()[0] && (
            <SpinnerReelHorizontal
              spinnerIndex={0}
              isConfettiWin={spinnerOptions()[0].isConfettiWin}
              isBigWin={spinnerOptions()[0].isBigWin}
              isFastSpin={isFastAnimation()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpinnersContainerHorizontal;
