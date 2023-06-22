import BetDisplay from "./BetDisplay";
import BetButtons from "./BetButtons";
import {betAmount, setBetAmount} from "../../TilesContainer";
import {isPlaying} from "../../TilesContainer";
import injector from "../../../../injector/injector";

const BetAmount = () => {
  const {userObject} = injector;
  return (
    <div
      class={`relative flex flex-col gap-1 w-full transition-opacity duration-200 ${
        isPlaying() && "opacity-30 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Bet</div>
      <BetDisplay
        betAmount={betAmount}
        callbackFn={(e) => {
          if (e.currentTarget.value < 0) {
            e.currentTarget.value = 0;
            setBetAmount(0);
          } else if (e.currentTarget.value > userObject.user.balance) {
            e.currentTarget.value = userObject.user.balance;
            setBetAmount(userObject.user.balance);
          } else {
            setBetAmount(e.currentTarget.value);
          }
        }}
        variant="input"
      />
      <BetButtons />
    </div>
  );
};

export default BetAmount;
