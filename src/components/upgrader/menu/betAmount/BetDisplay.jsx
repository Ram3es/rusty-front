import CoinLogo from "../../../shared/CoinLogo";
import GoldText from "../../../shared/GoldText";
import AdjustBtn from "../../../shared/AdjustBtn";
import GoldTextWrapper from "../../../shared/GoldTextWrapper";

import {
  betValue,
  setBetValue,
  activeItem,
  userObject,
} from "../../../../views/upgrader/Upgrader";

import {getCurrencyString} from "../../../../utilities/tools.js";

const BetDisplay = () => {
  const halveBet = () => {
    setBetValue(() => Math.round(betValue() / 2 < 0 ? 0 : betValue() / 2));
  };

  const doubleBet = () => {
    const userBalance = userObject.user.balance || 9999999;
    const maxBet =
      activeItem()?.price < userBalance
        ? Math.round(activeItem()?.price * 0.9)
        : userBalance;
    setBetValue(() =>
      Math.round(betValue() * 2 > maxBet ? maxBet : betValue() * 2)
    );
  };

  const clearBet = () => {
    setBetValue(0);
  };

  const inputValueUpdate = (e) => {
    const maxPrice = Math.round(activeItem()?.price * 0.9);
    const maxBet = userObject.user.balance || 9999999;
    if (activeItem().price) {
      if (maxBet > maxPrice) {
        if (e.currentTarget.value > maxPrice) {
          e.currentTarget.value = maxPrice;
          setBetValue(maxPrice);
        } else {
          setBetValue(e.currentTarget.value);
        }
      } else {
        if (e.currentTarget.value > maxBet) {
          e.currentTarget.value = maxBet;
          setBetValue(maxBet);
        } else {
          setBetValue(e.currentTarget.value);
        }
      }
    } else {
      e.currentTarget.value = 0;
    }
  };

  return (
    <div
      class="max-w-[320px] min-w-[320px] p-[2px] rounded-[4px] h-full"
      style={{
        background: `radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                      radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                      linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                      radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                      linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                      linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)`,
      }}
    >
      <div
        class="flex w-full p-2 rounded-[4px]  items-center h-full"
        style={{
          background: `radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                      radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                      linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                      radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                      linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                      linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))`,
        }}
      >
        <div class="flex gap-2 items-center flex-1 h-full">
          <CoinLogo h="16" />
          {/* <GoldText text={getCurrencyString(betValue())} size="15" /> */}
            <input
              class="text-14 gold-input absolute left-9 overflow-hidden w-[35%] font-semibold"
              type="number"
              onInput={(e) => inputValueUpdate(e)}
              value={betValue()}
              placeholder='0'
              disabled={!activeItem()}
            />
        </div>
        <div class="flex h-[27px] items-center">
          <div class={`flex gap-1 w-22 ${!activeItem() && "pointer-events-none"}`}>
            <AdjustBtn text={"1/2"} onClick={halveBet} />
            <AdjustBtn text={"x2"} onClick={doubleBet} />
          </div>
          <div class={`h-[175%] w-[1px] bg-[#1C1F3D] mx-2 `} />
          <div class={`${!activeItem() && "pointer-events-none"}`}>
            <AdjustBtn text={"Clear"} onClick={clearBet} small />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetDisplay;
