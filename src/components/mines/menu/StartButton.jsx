import {createEffect, createSignal} from "solid-js";

import CoinLogo from "../../shared/CoinLogo";
import GoldText from "../../shared/GoldText";
import GreenText from "../../shared/GreenText";

import {getCurrencyString} from "../../../utilities/tools";
let factorial = (n, to) => {
  if (n <= to + 1) return n;
  if (n < 0) return;
  if (n < 2) return 1;
  return n * factorial(n - 1, to);
};

const StartButton = (props) => {
  let calculateMultiplier = () => {
    const multiplier = Number(
      (
        (1 /
          (factorial(
            25 - props.mines.mines,
            25 - props.mines.mines - props.mines.cleared.length
          ) /
            factorial(25, 25 - props.mines.cleared.length))) *
        0.9
      ).toFixed(2)
    );
    return multiplier < 1 ? 1.01 : multiplier;
  };

  return (
    <div
      class={`w-full p-[1px] rounded-md ${
        props.mines.status === "playing" && props.mines.cleared.length < 1
          ? "opacity-30 pointer-events-none"
          : "hover"
      } `}
      style={{
        background: `linear-gradient(180deg, ${
          props.mines.status === "playing"
            ? "rgba(39, 242, 120, 0)"
            : "rgba(255, 180, 54, 0)"
        } -197.12%, ${
          props.mines.status === "playing"
            ? "rgba(39, 242, 120, 0.36)"
            : "rgba(255, 180, 54, 0.36)"
        } 100%)`,
        "box-shadow": `0px 2px 2px 0px #0000001F, 0px 2px 2px 0px #0000001F,  0px 0px 6px 0px ${
          props.mines.status === "playing"
            ? "rgba(39, 242, 120, 0.1)"
            : "#FFB4363D"
        }`,
      }}
      onClick={() => props.onClick()}
    >
      <div class="bg-[#1A1C31] rounded-md">
        <div
          class="w-full flex items-center justify-center p-2 rounded-md gap-2 "
          style={{
            background: `radial-gradient(72.88% 182.5% at 47.87% -51.25%, ${
              props.mines.status === "playing"
                ? "rgba(39, 242, 120, 0.24)"
                : "rgba(255, 180, 54, 0.24)"
            } 0%, rgba(255, 180, 54, 0) 100%)`,
            filter: `drop-shadow(0px 0px 6px ${
              props.mines.status === "playing"
                ? "rgba(39, 242, 120, 0.24)"
                : "rgba(255, 180, 54, 0.24)"
            }) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))`,
          }}
        >
          {props.mines.status === "playing" &&
          props.mines.cleared.length < 1 ? (
            <div class="text-[#27F278] font-SpaceGrotesk font-semibold">
              Reveal a Tile
            </div>
          ) : (
            <>
              <div
                class={`font-semibold`}
                style={{
                  color: `${
                    props.mines.status === "playing" ? "#27F278" : "#FFB436"
                  }`,
                }}
              >
                {props.mines.status === "playing" ? "Cashout" : "Start Game"}
              </div>
              <CoinLogo h="16" />
              {props.mines.status === "playing" ? (
                <GreenText
                  text={getCurrencyString(
                    Math.floor(calculateMultiplier() * props.mines.value)
                  )}
                />
              ) : (
                <GoldText text={getCurrencyString(props.betValue() || 0)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartButton;
