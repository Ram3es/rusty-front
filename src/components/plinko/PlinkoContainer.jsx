import { createSignal, createEffect } from "solid-js";

import PlinkoMenu from "./Menu/PlinkoMenu";
import PlayArea from "./PlayArea/PlayArea";

import { setColor } from "./PlayArea/PlayArea";

export const [isAutoMode, setIsAutoMode] = createSignal(false);
export const [betAmount, setBetAmount] = createSignal(100);
export const [rowsAmount, setRowsAmount] = createSignal(12);
export const [difficulty, setDifficulty] = createSignal("normal");
export const [binLiftList, setBinLiftList] = createSignal([]);
export const [ballDroppedXPos, setBallDroppedXPos] = createSignal(400);
export const [binMultipliers, setBinMultipliers] = createSignal([]);
export const [lastWinIndex, setLastWinIndex] = createSignal(-1);
export const [multiplierHistory, setMultiplierHistory] = createSignal([]);
export const [indexHistory, setIndexHistory] = createSignal([]);
export const [ballActive, setBallActive] = createSignal(false);
export const [ballCounter, setBallCounter] = createSignal(0);
export const [isAutoDropping, setIsAutoDropping] = createSignal(false);

export const addToIndexHistory = (index) => {
  setIndexHistory((prev) => [...prev, index]);
  const multiplier = binMultipliers()[index];
  setMultiplierHistory((prev) => [...prev, multiplier]);

  if (multiplier >= 1) {
    if (multiplier < 5) {
      setColor("214,48,255");
    } else if (multiplier < 25) {
      setColor("255,27,27");
    } else {
      setColor("255,180,54");
    }
  }
};

const PlinkoContainer = () => {
  return (
    <div
      class="h-[641px] w-[1348px] mt-20 border border-[#FFFFFF0A] rounded-sm flex relative"
      style="background: linear-gradient(to right, #16182E 60%, #131521);"
    >
      <div
        class="absolute top-0 left-0 z-10 w-full h-full opacity-[0.006]"
        style={`background-image: url(assets/RustyLogoBg.svg); background-repeat: repeat;`}
      ></div>
      <div class="relative flex h-full w-full z-20 ">
        <PlinkoMenu />
        <PlayArea />
      </div>
    </div>
  );
};

export default PlinkoContainer;
