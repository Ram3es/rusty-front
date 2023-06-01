import { createEffect, createSignal } from "solid-js";
import Prev from "./Prev";
import Current from "./Current";
import Next from "./Next";

import {
  betAdditions,
  squaresLeft,
  betAmount,
  isPlaying,
  minesAmount
} from "../../TilesContainer";
import { calculateNextAddition } from "../../utils/tools";
const [prevOffsets, setPrevOffsets] = createSignal([]);

const WinningsAdditions = () => {
  createEffect(() => {
    const prevOffsets = betAdditions()
      .slice(0, -1)
      .reverse()
      .map((addition, index) => {
        const prevOffset = index * 30;
        return prevOffset;
      });
    setPrevOffsets(prevOffsets);
  });
  return (
    <div class="hidden md:flex absolute right-0 flex-col gap-2 top-1/3 items-end overflow-hidden h-[65%]">
      <Next addition={calculateNextAddition(minesAmount(), squaresLeft(), betAmount())} />

      <Current addition={betAdditions()[betAdditions().length - 1]} />
      {isPlaying() && (
        <div class="relative ">
          {betAdditions()
            .slice(-7, -1)
            .reverse()
            .map((addition, index) => (
              <Prev
                addition={addition}
                index={index}
                prevOffsets={prevOffsets}
              />
            ))}
        </div>
      )}
      {/* <div
        class="absolute  bottom-0 right-0 w-2/3 h-[100px] z-10"
        style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #141622);"
      /> */}
    </div>
  );
};

export default WinningsAdditions;
