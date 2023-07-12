import Mine from "../MISC/Mine";
import BustImg from "./BustImg";
import RedText from "../MISC/RedText";
import {isPlaying, hasLost} from "../TilesContainer";
import {squaresLeft} from "../TilesContainer";

const RemainingMines = () => {
  return (
    <div
      class={`relative flex flex-col px-14 items-center h-14 transition-opacity duration-200 overflow-visible ${
        !isPlaying() && !hasLost() && "opacity-0"
      }`}
      style={`${
        hasLost()
          ? "background: radial-gradient(50% 100% at 50% 0%, rgba(214, 51, 51, 0.24) 0%, rgba(214, 51, 51, 0) 100%);"
          : "background: radial-gradient(50% 100% at 50% 0%, rgba(74, 147, 255, 0.24) 0%, rgba(74, 147, 255, 0) 100%);"
      }`}
    >
      <div class="w-full flex items-center justify-items-center ">
        {hasLost() ? <BustImg /> : <Mine size="40" />}

        {hasLost() ? (
          <div class="">
            <RedText text={"BUST"} />
          </div>
        ) : (
          <div class="text-[20px] font-semibold text-[#9A9EC8]">
            <span class="text-white">{squaresLeft()}</span> Left
          </div>
        )}
      </div>
      <div
        class="w-[200%] h-[3px]"
        style={`${
          hasLost()
            ? "background: radial-gradient(36.46% 36.46% at 50% 100%, rgba(214, 51, 51, 0.36) 0%, rgba(214, 51, 51, 0) 100%);"
            : "background: radial-gradient(36.46% 36.46% at 50% 100%, rgba(62, 139, 255, 0.36) 0%, rgba(62, 139, 255, 0) 100%);"
        }`}
      ></div>
    </div>
  );
};

export default RemainingMines;
