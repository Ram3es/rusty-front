import Dome from "./Dome";
import GameInfo from "./GameInfo";

const DomeContainer = () => {
  return (
    <div
      class="relative flex-1 border-y border-[#FFFFFF0A] w-full h-full pt-4 pb-6
            flex flex-col max-w-[604px]"
    >
      <Dome />
      <div class="flex-1" />
      <GameInfo />
    </div>
  );
};

export default DomeContainer;
