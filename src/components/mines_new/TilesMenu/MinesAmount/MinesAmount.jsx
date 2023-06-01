import MinesDisplay from "./MinesDisplay";
import MinesButtons from "./MinesButtons";

import { isPlaying } from "../../TilesContainer";
const MinesAmount = () => {
  return (
    <div
      class={`flex flex-col gap-1 w-full transition-opacity duration-200 ${
        isPlaying() && "opacity-30 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Mines</div>
      <MinesDisplay />
      <MinesButtons />
    </div>
  );
};

export default MinesAmount;
