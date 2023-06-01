import { createEffect, createSignal } from "solid-js";
import CoinLogo from "../MISC/CoinLogo";
import GoldText from "../MISC/GoldText";
import GreenText from "../MISC/GreenText";

import { isPlaying, betAmount, betAdditions, squaresLeft, minesAmount } from "../TilesContainer";

import { getCurrencyString, calculateCurrentWinnings, calculateAddition, calculateMultiplier } from "../utils/tools";

const StartButton = ({ onClick }) => {
  const [currentWinnings, setCurrentWinnings] = createSignal(0);
  createEffect(() => {
    setCurrentWinnings(calculateAddition(betAmount(), calculateMultiplier(minesAmount() || 0, 25 - squaresLeft() - minesAmount())))
  });
  return (
    <div
      class="w-full p-[1px] rounded-md cursor-pointer"
      style={`background: linear-gradient(180deg, ${
        isPlaying() ? "rgba(39, 242, 120, 0)" : "rgba(255, 180, 54, 0)"
      } -197.12%, ${
        isPlaying() ? "rgba(39, 242, 120, 0.36)" : "rgba(255, 180, 54, 0.36)"
      } 100%);
      box-shadow: 0px 2px 2px 0px #0000001F;
      box-shadow: 0px 2px 2px 0px #0000001F;
      box-shadow: 0px 0px 6px 0px ${
        isPlaying() ? "rgba(39, 242, 120, 0.1)" : "#FFB4363D"
      };
 `}
      onClick={onClick}
    >
      <div class="bg-[#1A1C31] rounded-md">
        <div
          class="w-full flex items-center justify-center p-2 rounded-md gap-2 "
          style={`background: radial-gradient(72.88% 182.5% at 47.87% -51.25%, ${
            isPlaying()
              ? "rgba(39, 242, 120, 0.24)"
              : "rgba(255, 180, 54, 0.24)"
          } 0%, rgba(255, 180, 54, 0) 100%) ;
                    filter: drop-shadow(0px 0px 6px ${
                      isPlaying()
                        ? "rgba(39, 242, 120, 0.24)"
                        : "rgba(255, 180, 54, 0.24)"
                    }) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12));
                    `}
        >
          <div
            class={` font-semibold`}
            style={`color: ${isPlaying() ? "#27F278" : "#FFB436"};`}
          >
            {isPlaying() ? "Cashout" : "Start Game"}
          </div>
          <CoinLogo h="16" />
          {isPlaying() ? (
            <GreenText text={getCurrencyString(currentWinnings())} />
          ) : (
            <GoldText text={getCurrencyString(betAmount())} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StartButton;
