import BetDisplay from "./BetDisplay";
import BetButtons from "./BetButtons";

import {isGameStarted} from "../../../../views/upgrader/Upgrader";

const BetAmount = () => {
  return (
    <div
      class={`relative flex flex-col gap-1 w-full transition-opacity duration-200 ${
        isGameStarted() && "opacity-40 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Bet</div>
      <BetDisplay />
      <BetButtons />
    </div>
  );
};

export default BetAmount;
