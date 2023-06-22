import MinesDisplay from "./MinesDisplay";
import MinesButtons from "./MinesButtons";

import {isPlaying, setMinesAmount, minesAmount} from "../../TilesContainer";
const MinesAmount = () => {
  return (
    <div
      class={`flex flex-col gap-1 w-full transition-opacity duration-200 ${
        isPlaying() && "opacity-30 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Mines</div>
      <MinesDisplay
        minesAmount={minesAmount}
        callbackFn={(e) => {
          if (e.currentTarget.value < 0) {
            e.currentTarget.value = 0;
            setMinesAmount(0);
          } else if (e.currentTarget.value > 24) {
            e.currentTarget.value = 24;
            setMinesAmount(24);
          } else {
            setMinesAmount(
              e.currentTarget.value && parseInt(e.currentTarget.value)
            );
          }
        }}
      />
      <MinesButtons />
    </div>
  );
};

export default MinesAmount;
