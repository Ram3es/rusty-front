import {createEffect, createSignal} from "solid-js";
import CoinLogo from "../shared/CoinLogo";

import AdjustBtn from "../shared/AdjustBtn";

import {setBetAmount, betAmount} from "./PvpMineMode";

const BetDisplay = (props) => {
  const [isActive, setActive] = createSignal(false);
  const halveBet = (e) => {
    e.stopPropagation();
    setBetAmount(props.betAmount() / 2);
  };

  const doubleBet = (e) => {
    e.stopPropagation();
    setBetAmount(props.betAmount() * 2);
  };

  const clearBet = (e) => {
    e.stopPropagation();
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
        class="flex w-full px-2 py-1.5 rounded-[4px] justify-between items-center h-full"
        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

          "
      >
        <div
          class={`flex gap-2 items-center ${
            isActive() && "pointer-events-none"
          }`}
        >
          <div class="flex gap-2 items-center flex-1 h-full">
            <CoinLogo h="16" />
            {/* <GoldText text={getCurrencyString(betValue())} size="15" /> */}
            <input
              class="text-14 gold-input absolute left-9 overflow-hidden w-[35%] font-semibold"
              type="number"
              onInput={(e) => props.callbackFn(e)}
              value={props.betAmount()}
              placeholder="0"
            />
          </div>
        </div>
        <div
          class={`flex gap-3 h-full items-center ${
            isActive() && "pointer-events-none"
          }`}
        >
          <AdjustBtn text={"1/2"} onClick={halveBet} small={props.small} />
          <AdjustBtn text={"x2"} onClick={doubleBet} small={props.small} />
          <div class="h-[175%] w-[1px] bg-[#1C1F3D]" />
          <AdjustBtn text={"Clear"} onClick={clearBet} small={props.small} />
        </div>
      </div>
    </div>
  );
};

export default BetDisplay;
