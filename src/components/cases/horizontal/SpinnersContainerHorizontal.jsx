import {createSignal, createEffect} from "solid-js";
import SpinnerReelHorizontal from "./SpinnerReelHorizontal";
import {spinReelsTrigger, setSpinReelsTrigger} from "../store";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";
import {isFastAnimation} from "../../../views/unbox/CaseUnboxing";

export const [containerRef, setContainerRef] = createSignal();

export const [reelsSpinning, setReelsSpinning] = createSignal(false);
const [activeSpinners, setActiveSpinners] = createSignal(0);
export const [spinIndex, setSpinIndex] = createSignal();
export const [spinList, setSpinList] = createSignal([]);
export const [spinOffsets, setSpinOffsets] = createSignal([]);

const [containsBigWin, setContainsBigWin] = createSignal(false);
const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);

const resetValues = () => {
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
  setBeginClickSound,
  setBeginPullBackSound,
  setBeginWinSound,
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
        setSpinReelsTrigger({triggered: false});
      }, 0);
    }
  });

  return (
    <div class="relative w-full">
      <div
        class="relative w-full h-[178px] md:h-[326px] overflow-hidden"
        ref={setContainerRef}
      >
        {Array.from({length: activeSpinners()}).map((_, index) => {
          return (
            spinnerOptions()[0] && (
              <SpinnerReelHorizontal
                spinnerIndex={0}
                isConfettiWin={spinnerOptions()[0].isConfettiWin}
                isBigWin={spinnerOptions()[0].isBigWin}
                isFastSpin={isFastAnimation()}
                setBeginClickSound={setBeginClickSound}
                setBeginPullBackSound={setBeginPullBackSound}
                setBeginWinSound={setBeginWinSound}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default SpinnersContainerHorizontal;
