import {createSignal, createEffect} from "solid-js";
import SpinnerReelVertical from "./SpinnerReelVertical";
import {spinReelsTrigger, setSpinReelsTrigger} from "../store";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";
import {isFastAnimation} from "../../../views/unbox/CaseUnboxing";

export const [containerRef, setContainerRef] = createSignal();

const [activeSpinners, setActiveSpinners] = createSignal(0);
export const [reelsSpinning, setReelsSpinning] = createSignal(false);
export const [spinIndexes, setSpinIndexes] = createSignal([]);
export const [spinLists, setSpinLists] = createSignal([]);
export const [spinOffsets, setSpinOffsets] = createSignal([]);

const [clickPlayed, setClickPlayed] = createSignal(false);
const [snapBackPlayed, setSnapBackPlayed] = createSignal(false);

const [containsBigWin, setContainsBigWin] = createSignal(false);
const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);

const SpinnersContainerVertical = (props) => {
  const generateSpinData = () => {
    const newSpinIndexes = [];
    const newSpinLists = [];

    for (let i = 0; i < props.numSpinners(); i++) {
      const spinIndex = getRandomIndex();
      let spinList = generateSpinList();
      spinList[spinIndex] = props.spinnerOptions()[i].winningItem;
      if (props.spinnerOptions()[i].isBigWin) {
        setContainsBigWin(true);
      }
      if (props.spinnerOptions()[i].isConfettiWin) {
        setContainsConfettiWin(true);
      }
      newSpinLists.push(spinList);
      newSpinIndexes.push(spinIndex);
    }
    setSpinIndexes(newSpinIndexes);
    setSpinLists(newSpinLists);
  };

  const resetValues = () => {
    setClickPlayed(false);
    setSnapBackPlayed(false);
    setContainsBigWin(false);
    setContainsConfettiWin(false);
    setSpinLists([]);
    setSpinIndexes(null);
    setSpinOffsets([]);
    setActiveSpinners(0);
  };

  const generateSpinList = () => {
    setSpinOffsets([]);
    const newSpinList = [];
    for (let i = 0; i < 35; i++) {
      newSpinList.push(
        props.caseItemList()[
          Math.floor(Math.random() * props.caseItemList().length)
        ]
      );
    }
    return newSpinList;
  };

  const getRandomIndex = () => {
    return (
      Math.floor(
        Math.random() *
          (otherOptions.verticalEndBound - otherOptions.verticalStartBound + 1)
      ) + otherOptions.verticalStartBound
    );
  };

  const spinReels = () => {
    if (reelsSpinning()) {
      setActiveSpinners(0);
    }
    resetValues();
    setActiveSpinners(props.numSpinners());
    generateSpinData();
    setReelsSpinning(true);
  };

  createEffect(() => {
    console.log(
      spinReelsTrigger.triggered,
      activeSpinners(),
      props.spinnerOptions()
    );
    if (spinReelsTrigger.triggered) {
      console.log(activeSpinners());
      spinReels();
      setSpinReelsTrigger({triggered: false});
    }
  });

  return (
    <div class="relative w-full">
      <div
        class="relative flex rounded w-full h-[326px] min-w-max "
        ref={setContainerRef}
      >
        <div class="arrow-down absolute top-1/2 -left-[8px] -translate-y-1/2 -rotate-90" />
        {Array.from({length: activeSpinners()}).map((_, index) => {
          return (
            props.spinnerOptions()[index] && (
              <SpinnerReelVertical
                spinnerIndex={index}
                isConfettiWin={props.spinnerOptions()[index].isConfettiWin}
                isBigWin={props.spinnerOptions()[index].isBigWin}
                isFastSpin={isFastAnimation()}
                setBeginClickSound={props.setBeginClickSound}
                setBeginPullBackSound={props.setBeginPullBackSound}
                setBeginWinSound={props.setBeginWinSound}
              />
            )
          );
        })}
        <div class="arrow-down absolute top-1/2 -right-[8px] -translate-y-1/2 rotate-90" />
        <div
          class="absolute left-0 top-0 w-full h-[68px]"
          style={{
            background:
              "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
          }}
        />
        <div
          class="absolute left-0 bottom-0 w-full h-[68px]"
          style={{
            background:
              "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
            transform: "matrix(-1, 0, 0, -1, 0, 0)",
          }}
        />
      </div>
    </div>
  );
};

export default SpinnersContainerVertical;
