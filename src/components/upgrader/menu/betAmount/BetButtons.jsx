import AdjustBtn from "../../../shared/AdjustBtn";

import {
  betValue,
  setBetValue,
  activeItem,
  userObject,
} from "../../../../views/upgrader/Upgrader";

const getBetPercent = (item) => {
  const userBalance = userObject.user.balance || 9999999;
  const maxBet =
    activeItem()?.price < userBalance ? 0.9 : userBalance / activeItem()?.price;
  if (item === "max") {
    return maxBet;
  } else if (item === "x2") {
    if (activeItem()?.price) {
      const percent = Number(Number(betValue() / activeItem()?.price)) * 2;
      return percent <= maxBet ? percent : maxBet;
    } else {
      return 0;
    }
  } else {
    const tempNumber = activeItem()?.price * (item / 100);
    const finalBet = tempNumber / ((tempNumber * 0.9) / tempNumber);
    const finalPercent = finalBet / activeItem()?.price;
    return finalPercent <= maxBet ? finalPercent : maxBet;
  }
};

const BetButtons = () => {
  const adjustBet = (adjust) => {
    if (activeItem()) {
      setBetValue(Math.round(activeItem()?.price * getBetPercent(adjust)) || 0);
    }
  };
  return (
    <div class="flex items-center justify-between w-full mt-2 gap-2">
      <AdjustBtn text={"5%"} onClick={() => adjustBet(5)} />
      <AdjustBtn text={"10%"} onClick={() => adjustBet(10)} />
      <AdjustBtn text={"25%"} onClick={() => adjustBet(25)} />
      <AdjustBtn text={"50%"} onClick={() => adjustBet(50)} />
      <AdjustBtn text={"MAX"} onClick={() => adjustBet("max")} />
    </div>
  );
};

export default BetButtons;
