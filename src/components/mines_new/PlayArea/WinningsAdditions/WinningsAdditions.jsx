import {createEffect, createSignal, For} from "solid-js";
import Prev from "./Prev";
import Current from "./Current";
import Next from "./Next";

import {
  betAdditions,
  squaresLeft,
  betAmount,
  isPlaying,
  minesAmount,
} from "../../TilesContainer";
import {
  calculateAddition,
  calculateWinningsAmount,
  calculateMultiplier,
} from "../../utils/tools";
const [prevOffsets, setPrevOffsets] = createSignal([]);

const WinningsAdditions = () => {
  const [nextAddition, setNextAddition] = createSignal(0);
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

  createEffect(() => {
    const next = calculateAddition(
      betAmount(),
      minesAmount(),
      25 - squaresLeft() - minesAmount() + 1
    );

    if (next !== 0) {
      setNextAddition(
        calculateWinningsAmount(
          betAmount(),
          calculateMultiplier(
            minesAmount(),
            25 - squaresLeft() + 1 - minesAmount()
          )
        )
      );
    } else {
      setNextAddition(
        calculateWinningsAmount(
          betAmount(),
          calculateMultiplier(minesAmount(), 25 - squaresLeft() - minesAmount())
        )
      );
    }
  });

  return (
    <div class="hidden md:flex absolute right-0 flex-col gap-2 top-1/3 items-end overflow-hidden h-[65%]">
      <Next addition={nextAddition()} />

      <Current addition={betAdditions()[betAdditions().length - 1]} />
      {isPlaying() && (
        <div class="flex flex-col">
          <For each={betAdditions().slice(-7, -1).reverse()}>
            {(addition, index) =>
              addition !== 0 && (
                <Prev
                  addition={addition}
                  index={index()}
                  prevOffsets={prevOffsets}
                />
              )
            }
          </For>
        </div>
      )}
    </div>
  );
};

export default WinningsAdditions;
