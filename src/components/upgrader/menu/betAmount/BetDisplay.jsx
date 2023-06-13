import CoinLogo from "../../../shared/CoinLogo";
import GoldText from "../../../shared/GoldText";
import AdjustBtn from "../../../shared/AdjustBtn";

import { betAmount, setBetAmount } from "../../MainUpgraderContainer";
import { getCurrencyString } from "../../../../utilities/tools.js";

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
      class="max-w-[320px] min-w-[320px] p-[2px] rounded-[4px] h-full"
      style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

"
    >
      <div
        class="flex w-full p-2 rounded-[4px]  items-center h-full"
        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));"
      >
        <div class="flex gap-2 items-center flex-1 h-full">
          <CoinLogo h="16" />
          <GoldText text={getCurrencyString(betAmount())} size="15"/>
        </div>
        <div class="flex h-[27px] items-center">
          <div class="flex gap-1 w-22">
            <AdjustBtn text={"1/2"} onClick={halveBet} />
            <AdjustBtn text={"x2"} onClick={doubleBet} />
          </div>
          <div class="h-[175%] w-[1px] bg-[#1C1F3D] mx-2"/>
          <AdjustBtn text={"Clear"} onClick={clearBet} small/>
        </div>
      </div>
    </div>
  );
};

export default BetDisplay;
