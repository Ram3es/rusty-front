import {createSignal, createEffect} from "solid-js";
import {For} from "solid-js";
import GreenText from "../shared/GreenText";
import GoldText from "../shared/GoldText";
import {getCurrencyString} from "../../utilities/tools";
import CoinLogo from "../shared/CoinLogo";
import RedText from "../shared/RedText";

let factorial = (n, to) => {
  if (n <= to + 1) return n;
  if (n < 0) return;
  if (n < 2) return 1;
  return n * factorial(n - 1, to);
};

const Winnings = (props) => {
  const [winningsMemory, setWinningsMemory] = createSignal([]);
  createEffect(() => {
    if (props.mines.status === "playing") {
      setWinningsMemory(props.betValue());
    }
  });

  let calculateMultiplier = (cleared) => {
    const multiplier = Number(
      (
        (1 /
          (factorial(25 - props.mines.mines, 25 - props.mines.mines - cleared) /
            factorial(25, 25 - cleared))) *
        0.9
      ).toFixed(2)
    );
    return multiplier < 1 ? 1.01 : multiplier;
  };
  return (
    <div class="flex flex-col relative items-end w-10/12 lg:w-full gap-2">
      <div
        class={`whitespace-nowrap pr-2 hidden lg:flex items-center gap-1  py-1
          ${props.mines.status === "playing" ? "opacity-30" : "opacity-0"}`}
        style={{
          background:
            "linear-gradient(270deg, rgba(255, 180, 54, 0.23) 0%, rgba(255, 180, 54, 0.00) 93.23%)",
        }}
      >
        <CoinLogo h={30} />
        <GoldText
          text={`+ ${getCurrencyString(
            calculateMultiplier(props.mines.cleared.length + 1) *
              props.betValue()
          )}`}
          size={22.5}
        />
      </div>

      {props.mines.cleared.length > 0 && props.mines.status !== "lost" ? (
        <For each={props.mines.cleared}>
          {(i, index) => (
            <>
              {index() === 0 ? (
                <div
                  class="whitespace-nowrap pr-2 flex items-center gap-1 py-1 w-full lg:w-auto"
                  style={{
                    background:
                      "linear-gradient(270deg, rgba(92, 222, 144, 0.24) 0%, rgba(92, 222, 144, 0.00) 100%)",
                  }}
                >
                  <CoinLogo h={40} />
                  <GreenText
                    text={`+ ${getCurrencyString(
                      calculateMultiplier(
                        props.mines.cleared.length - index()
                      ) * winningsMemory()
                    )}`}
                    size={30}
                  />
                </div>
              ) : (
                <>
                  {index() <= 5 && props.mines.status === "playing" ? (
                    <div
                      class={`whitespace-nowrap pr-2 hidden lg:flex items-center gap-1 py-1`}
                      style={{
                        opacity: `${(60 - index() * 10) / 100}`,
                      }}
                    >
                      <CoinLogo h={30} />
                      <GreenText
                        text={`+ ${getCurrencyString(
                          calculateMultiplier(
                            props.mines.cleared.length - index()
                          ) * props.betValue()
                        )}`}
                        size={22.5}
                      />
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
        </For>
      ) : (
        <>
          {props.mines.status === "lost" ? (
            <div
              class="whitespace-nowrap pr-2 flex items-center gap-1 py-1"
              style={{
                background:
                  "linear-gradient(270deg, rgba(214, 51, 51, 0.24) 0%, rgba(214, 51, 51, 0.00) 100%)",
              }}
            >
              <CoinLogo h={40} />
              <RedText text={`+ 0.00`} size={30} />
            </div>
          ) : (
            <div
              class="whitespace-nowrap pr-2 flex items-center gap-1 py-1"
              style={{
                background:
                  "linear-gradient(270deg, rgba(92, 222, 144, 0.24) 0%, rgba(92, 222, 144, 0.00) 100%)",
              }}
            >
              <CoinLogo h={40} />
              <GreenText text={`+ 0.00`} size={30} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Winnings;
