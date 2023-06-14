import AdjustBtn from "../../../shared/AdjustBtn";

import { betAmount, setBetAmount } from "../../MainUpgraderContainer";

const BetButtons = () => {
  const adjustBet = (amount) => {
    setBetAmount(betAmount() * amount);
  };
  return (
    <div class="flex items-center justify-between w-full mt-2 gap-2">
      <AdjustBtn text={"5%"} onClick={() => adjustBet(0.5)} />
      <AdjustBtn text={"10%"} onClick={() => adjustBet(0.1)} />
      <AdjustBtn text={"25%"} onClick={() => adjustBet(0.25)} />
      <AdjustBtn text={"50%"} onClick={() => adjustBet(0.5)} />
      <AdjustBtn text={"MAX"} onClick={() => adjustBet(1)} />
    </div>
  );
};

export default BetButtons;
