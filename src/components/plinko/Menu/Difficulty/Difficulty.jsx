import EasyBtn from "./EasyBtn";
import NormalBtn from "./NormalBtn";
import HardBtn from "./HardBtn";
import {playOptionClickSound} from "../../../../utilities/Sounds/SoundButtonClick";

import {
  setDifficulty,
  ballActive,
  setLastWinIndex,
} from "../../PlinkoContainer";

import {updateMultipliers} from "../../PlayArea/Plinko/PlinkoBins";

const Difficulty = () => {
  const changeDifficulty = (newDifficulty) => {
    playOptionClickSound();
    setLastWinIndex(0);
    setDifficulty(newDifficulty);
    updateMultipliers();
  };
  return (
    <div class="w-full flex flex-col gap-1">
      <div class="text-[#9A9EC8] text-[12px] font-medium">Difficulty</div>
      <div
        class={`flex w-full justify-between gap-4 duration-200
      transition-opacity ${ballActive() && "pointer-events-none opacity-25"}`}
      >
        <EasyBtn onClick={() => changeDifficulty("easy")} />
        <NormalBtn onClick={() => changeDifficulty("normal")} />
        <HardBtn onClick={() => changeDifficulty("hard")} />
      </div>
    </div>
  );
};
9;

export default Difficulty;
