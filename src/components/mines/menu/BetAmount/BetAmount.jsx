import BetDisplay from "./BetDisplay";
import BetButtons from "./BetButtons";

import injector from "../../../../injector/injector";

const BetAmount = (props) => {
  const {userObject} = injector;

  return (
    <div
      class={`relative flex flex-col gap-1 w-full transition-opacity duration-200 ${
        props.mines.status === "playing" && "opacity-30 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Bet</div>
      <BetDisplay
        betValue={props.betValue}
        callbackFn={(e) => {
          if (e.currentTarget.value < 0) {
            e.currentTarget.value = 0;
            props.setBetValue(0);
          } else if (e.currentTarget.value > userObject.user.balance) {
            e.currentTarget.value = userObject.user.balance;
            props.setBetValue(userObject.user.balance);
          } else {
            props.setBetValue(e.currentTarget.value);
          }
        }}
        variant="input"
      />
      <BetButtons betValue={props.betValue} setBetValue={props.setBetValue} />
    </div>
  );
};

export default BetAmount;
