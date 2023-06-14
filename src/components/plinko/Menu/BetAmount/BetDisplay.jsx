import CoinLogo from "../../MISC/CoinLogo";
import GoldText from "../../MISC/GoldText";
import AdjustBtn from "../../MISC/AdjustBtn";

import { betAmount, setBetAmount } from "../../PlinkoContainer";
import { getCurrencyString } from "../../../../utilities/tools";

const BetDisplay = () => {
  const halveBet = () => {
    setBetAmount(betAmount() / 2);
  };

  const doubleBet = () => {
    setBetAmount(betAmount() * 2);
  };

  const clearBet = () => {
    setBetAmount(0);
  };

  return (
    <div
      class="w-full min-w-max p-[2px] rounded-[4px] h-full"
      style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

"
    >
      <div
        class="flex w-full p-2 rounded-[4px] justify-between items-center h-full"
        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

          "
      >
        <div class="flex gap-2 items-center ">
          <CoinLogo h="16" />
          <GoldText text={getCurrencyString(betAmount())} />
        </div>
        <div class="flex gap-3 h-full items-center">
          <AdjustBtn text={"1/2"} onClick={halveBet} />
          <AdjustBtn text={"x2"} onClick={doubleBet} />
          <div class="h-[175%] w-[1px] bg-[#1C1F3D] "></div>
          <AdjustBtn text={"Clear"} onClick={clearBet} />
        </div>
      </div>
    </div>
  );
};

export default BetDisplay;
