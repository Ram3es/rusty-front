import {NavLink} from "solid-app-router";
import {onMount, createEffect, createSignal, onCleanup} from "solid-js";
import {createStore} from "solid-js/store";

import {URL} from "../../libraries/url";
import Coin from "../../utilities/Coin";

import Bg from "../../assets/img/bg.png";

import Question from "../../assets/img/mines/question.svg";

import mineFineSound from "../../assets/sounds/mines-tile.wav";
import mineMissSound from "../../assets/sounds/mines-mine.wav";
import creditedSound from "../../assets/sounds/credited.wav";
import PlaceBet from "../../assets/sounds/place-bet.wav";

const placeBetSound = new Audio(PlaceBet);
const safeSound = new Audio(mineFineSound);
const bombSound = new Audio(mineMissSound);
const cashoutSound = new Audio(creditedSound);

import injector from "../../injector/injector";
import History from "../history";

import LoadingLogo from "../../components/mines/LoadingLogo";
import ClearedSquare from "../../components/mines/ClearedSquare";
import Menu from "../../components/mines/menu/Menu";
import RemainingMines from "../../components/mines/RemainingMines";
import Winnings from "../../components/mines/Winnings";

const Mines = () => {
  const {socket, toastr, props} = injector;

  const [betValue, setBetValue] = createSignal(500);
  const [minesAmount, setMinesAmount] = createSignal(10);

  const [history, setHistory] = createSignal([]);

  const [mines, setMines] = createStore({
    mines: 0,
    value: 0,
    cleared: [],
    minePositions: [],
  });

  let factorial = (n, to) => {
    if (n <= to + 1) return n;
    if (n < 0) return;
    if (n < 2) return 1;
    return n * factorial(n - 1, to);
  };

  let calculateMultiplier = () => {
    return Number(
      (
        (1 /
          (factorial(
            25 - mines.mines,
            25 - mines.mines - mines.cleared.length
          ) /
            factorial(25, 25 - mines.cleared.length))) *
        0.94
      ).toFixed(2)
    );
  };

  onMount(() => {
    socket.emit("mines:connect", {}, (data) => {
      if (data?.user?.data) {
        setMines("status", "playing");
        setMines("cleared", data?.user?.data.cleared);
        setMines("minePositions", []);
        setMines("value", data?.user?.data?.activeInfo?.bet);
        setMines("mines", data?.user?.data?.activeInfo?.mines);
        setMines("hash", data?.user?.data?.hash);
        setBetValue(data?.user?.data?.activeInfo?.bet);
      }

      setHistory(data.history);
    });

    socket.on("mines:history", (data) => {
      setHistory((prev) => [data, ...prev].slice(0, 10));
    });
  });

  const bet = () => {
    socket.emit(
      "mines:bet",
      {
        bet: betValue(),
        mines: minesAmount(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error && props?.user?.sounds) {
          placeBetSound.currentTime = 0;
          placeBetSound.play();
        }

        if (!data.error) {
          setMines("status", "playing");
          setMines("cleared", []);
          setMines("minePositions", []);
          setMines("value", betValue());
          setMines("mines", data?.data?.mines);
          setMines("hash", data?.data?.hash);
        }
      }
    );
  };

  const check = (position) => {
    socket.emit(
      "mines:check",
      {
        position,
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          if (data.end) {
            setMines("minePositions", data.data.mines);
            setMines("cleared", data.data.cleared);
            if (mines.cleared.length === 25 - mines.mines) {
              setMines("status", "ended");
            } else {
              setMines("status", "lost");
            }
            if (props?.user?.sounds) {
              bombSound.currentTime = 0;
              bombSound.play();
            }
            return;
          } else {
            setMines("cleared", data.data.cleared);
            setMines("status", "playing");
            if (props?.user?.sounds) {
              safeSound.currentTime = 0;
              safeSound.play();
            }
          }
        }
      }
    );
  };

  const cashout = () => {
    socket.emit("mines:cashout", {}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        setMines("minePositions", data.data.mines);
        setMines("status", "ended");
        if (props?.user?.sounds) {
          cashoutSound.currentTime = 0;
          cashoutSound.play();
        }
      }
    });
  };

  const handleStartButtonClick = () => {
    mines.status == "playing" ? cashout() : bet();
  };

  onCleanup(() => {
    // socket.off("mines:check");
  });

  return (
    <>
      <div class="w-full h-full flex flex-col gap-24 overflow-y-scroll relative pt-10 ">
        <div
          class="w-full flex gap-10 border border-[#ffff640a] rounded-md h-full overflow-y-hidden"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%), radial-gradient(47.48% 100.00% at 41.02% -0.00%, 
            ${
              mines.status === "playing"
                ? "rgba(118, 124, 255, 0.12)"
                : mines.status === "lost"
                ? "rgba(214, 51, 51, 0.12)"
                : "rgba(214, 51, 51, 0)"
            }  0%, rgba(118, 124, 255, 0.00) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), 
            radial-gradient(186.19% 100.00% at 100.00% 50.00%, rgba(29, 35, 82, 0.56) 0%, rgba(29, 31, 48, 0.56) 100%), 
            radial-gradient(186.19% 100.00% at 100.00% 50.00%, #1F2344 0%, #23253D 100%)`,
          }}
        >
          <Menu
            betValue={betValue}
            setBetValue={setBetValue}
            minesAmount={minesAmount}
            setMinesAmount={setMinesAmount}
            handleStartButtonClick={handleStartButtonClick}
            mines={mines}
          />

          <div class="center flex-col relative w-full ">
            <div class="flex gap-6 w-full justify-between ">
              <div class="h-full flex flex-col items-center justify-center gap-4 w-full ">
                <div class="center relative w-full">
                  <RemainingMines mines={mines} />
                </div>
                <div class={`grid grid-cols-5 gap-3 pb-10 `}>
                  <For
                    each={[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20, 21, 22, 23, 24, 25,
                    ]}
                  >
                    {(i) => (
                      <div
                        class={`center w-22 h-22 ${
                          mines?.status == "playing" &&
                          !mines.cleared.includes(i)
                            ? "hover2"
                            : "pointer-events-none"
                        } `}
                        onClick={() => {
                          if (mines?.status == "playing") {
                            check(i);
                          }
                        }}
                      >
                        <div
                          class="w-full h-full relative transition-all duration-200"
                          style={
                            mines.minePositions.includes(i) ||
                            mines.cleared.includes(i)
                              ? {
                                  "transform-style": "preserve-3d",
                                  transform: "rotateY(180deg)",
                                }
                              : {}
                          }
                        >
                          <div
                            class={`w-full h-full absolute z-10 duration-200
                            ${
                              mines.status === "playing"
                                ? "opacity-100"
                                : mines.status === "lost"
                                ? "opacity-30"
                                : mines.status === "ended"
                                ? "opacity-30"
                                : "opacity-30"
                            }`}
                            style={{
                              "backface-visibility": "hidden",
                              transform: "rotateX(0deg)",
                            }}
                          >
                            <LoadingLogo xy={i} mines={mines} />
                          </div>
                          <div
                            class="w-full h-full absolute"
                            style={{
                              "backface-visibility": "hidden",
                              transform: "rotateX(180deg)",
                            }}
                          >
                            {mines.minePositions.includes(i) ? (
                              <ClearedSquare color="red" mines={mines} i={i} />
                            ) : (
                              <ClearedSquare color="blue" mines={mines} i={i} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
              <div
                class={`flex relative top-1/3 min-w-[210px] justify-end 
                transition-transform duration-100 ease-in-out`}
              >
                <Winnings mines={mines} betValue={betValue} />
              </div>
            </div>
            {/* <p class="text-gray-8c text-14 font-medium font-Oswald absolute -bottom-8">
              {mines?.hash || "No hash"}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mines;
