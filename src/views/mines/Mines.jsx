import {onMount, createSignal, onCleanup, For} from "solid-js";
import {createStore} from "solid-js/store";

import mineFineSound from "../../assets/sounds/safeSoundv2.mp3";
import mineMissSound from "../../assets/sounds/boomSoundv2.mp3";
import creditedSound from "../../assets/sounds/cashoutv2.mp3";
import PlaceBet from "../../assets/sounds/place-bet.wav";

const placeBetSound = new Audio(PlaceBet);
const safeSound = new Audio(mineFineSound);
const bombSound = new Audio(mineMissSound);
const cashoutSound = new Audio(creditedSound);

import injector from "../../injector/injector";

import LoadingLogo from "../../components/mines/LoadingLogo";
import ClearedSquare from "../../components/mines/ClearedSquare";
import Menu from "../../components/mines/menu/Menu";
import RemainingMines from "../../components/mines/RemainingMines";
import Winnings from "../../components/mines/Winnings";
import RedMineImg from "../../assets/img/mines/RedMine.png";
import BlueMineImg from "../../assets/img/mines/BlueMine.png";
// import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png";
import MinesBg from "../../assets/img/mines/MinesBg.png";

import confetti from "canvas-confetti";

const Mines = () => {
  const {socket, toastr, userObject} = injector;

  const [betValue, setBetValue] = createSignal(500);
  const [minesAmount, setMinesAmount] = createSignal(1);

  const [mines, setMines] = createStore({
    mines: 0,
    value: 0,
    cleared: [],
    minePositions: [],
  });

  // let factorial = (n, to) => {
  //   if (n <= to + 1) return n;
  //   if (n < 0) return;
  //   if (n < 2) return 1;
  //   return n * factorial(n - 1, to);
  // };

  // let calculateMultiplier = () => {
  //   return Number(
  //     (
  //       (1 /
  //         (factorial(
  //           25 - mines.mines,
  //           25 - mines.mines - mines.cleared.length
  //         ) /
  //           factorial(25, 25 - mines.cleared.length))) *
  //       0.94
  //     ).toFixed(2)
  //   );
  // };

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

      // setHistory(data.history);
    });

    // socket.on("mines:history", (data) => {
    //   setHistory((prev) => [data, ...prev].slice(0, 10));
    // });

    new Image().src = RedMineImg;
    new Image().src = BlueMineImg;
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
          if (
            data.msg !== "You don't have a game active!" &&
            data.msg !== "You have already revealed this tile!"
          ) {
            toastr(data);
          }
        }

        if (!data.error && userObject?.user?.sounds) {
          placeBetSound.currentTime = 0;
          placeBetSound.volume = userObject.user.sounds * 0.7;

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
          if (
            data.msg !== "You don't have a game active!" &&
            data.msg !== "You have already revealed this tile!"
          ) {
            toastr(data);
          }
        }

        if (!data.error) {
          if (data.end) {
            setMines("minePositions", data.data.mines);
            setMines("cleared", data.data.cleared);
            if (
              data.data.mines.filter((element) =>
                data.data.cleared.includes(element)
              ).length > 0
            ) {
              setMines("status", "lost");
              if (userObject?.user?.sounds) {
                bombSound.currentTime = 0;
                bombSound.volume = userObject.user.sounds;
                bombSound.play();
              }
            } else {
              setMines("status", "ended");
              if (userObject?.user?.sounds) {
                fireCannon(confettiCannonRefA(), 75);
                fireCannon(confettiCannonRefB(), 105);
                safeSound.currentTime = 0;
                safeSound.volume = userObject.user.sounds;
                safeSound.play();

                cashoutSound.currentTime = 0;
                cashoutSound.volume = userObject.user.sounds;
                cashoutSound.play();
              }
            }

            return;
          } else {
            setMines("cleared", data.data.cleared);
            setMines("status", "playing");
            if (userObject?.user?.sounds) {
              safeSound.currentTime = 0;
              safeSound.volume = userObject.user.sounds;
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
        if (
          data.msg !== "You don't have a game active!" &&
          data.msg !== "You have already revealed this tile!"
        ) {
          toastr(data);
        }
      }

      if (!data.error) {
        setMines("minePositions", data.data.mines);
        setMines("status", "ended");
        if (userObject?.user?.sounds) {
          cashoutSound.currentTime = 0;
          cashoutSound.volume = userObject.user.sounds;
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

  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();

  const fireCannon = (ref, angle) => {
    const rectA = ref.getBoundingClientRect();

    const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
    const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

    const particleCount = 5;
    const spread = 30;
    const startVelocity = 40;
    // const colorCodes = {
    //   purple: "#9c27b0",
    //   gold: "#ffeb3b",
    //   red: "#f44336",
    //   blue: "#2196f3",
    //   gray: "#9e9e9e",
    // };
    const ticks = 70;

    // for (let i = 0; i < 10; i++) {

    // }
    const interval = setInterval(() => {
      confetti({
        particleCount,
        spread,
        origin: {x: xA, y: yA},
        startVelocity,
        angle,
        //   colors: ["#FFFFFF", colorCodes[color]],
        ticks,
      });
    }, 40);

    setTimeout(() => {
      clearInterval(interval);
    }, 500);
  };

  return (
    <>
      <div class="w-full h-full flex flex-col gap-24 overflow-y-scroll relative pt-6 pb-[40vh]">
        <div
          class="w-full flex flex-col-reverse lg:flex-row gap-10 border border-[#ffff640a] rounded-md h-full overflow-y-hidden relative"
          style={{
            background: `
                        radial-gradient(60% 100% at 40.95% 0%, ${
                          mines.status === "playing"
                            ? "rgba(118, 124, 255, 0.12)"
                            : mines.status === "lost"
                            ? "rgba(214, 51, 51, 0.12)"
                            : "rgba(214, 51, 51, 0)"
                        } 0%, rgba(118, 124, 255, 0) 100%),
                        linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
                        linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
                        radial-gradient(100% 186.19% at 0% 50%, rgba(29, 35, 82, 0.56) 0%, rgba(29, 31, 48, 0.56) 100%),
                        radial-gradient(100% 186.19% at 0% 50%, #1F2344 0%, #23253D 100%),
                        linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))`,
          }}
        >
          <div
            class="absolute top-0 left-0  w-full h-full opacity-[0.999] "
            style={{
              "background-image": `url(${MinesBg})`,
              "background-repeat": "repeat",
              "background-size": "contain",
            }}
          />
          <Menu
            betValue={betValue}
            setBetValue={setBetValue}
            minesAmount={minesAmount}
            setMinesAmount={setMinesAmount}
            handleStartButtonClick={handleStartButtonClick}
            mines={mines}
          />
          <div class="center flex-col relative w-full ">
            <div class="flex gap-6 flex-col lg:flex-row w-full justify-between ">
              <div class="h-full flex flex-col items-center justify-center gap-4 w-full ">
                <div class="flex justify-start lg:justify-center items-center relative w-full">
                  <RemainingMines mines={mines} />
                </div>
                <div class="relative">
                  <div class={`grid grid-cols-5 gap-3 pb-10 `}>
                    <For
                      each={[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25,
                      ]}
                    >
                      {(i) => (
                        <div
                          class={`center w-16 h-16 lg:w-22 lg:h-22 ${
                            mines?.status == "playing" &&
                            !mines.cleared.includes(i)
                              ? "hover click-large"
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
                                <ClearedSquare
                                  color="red"
                                  mines={mines}
                                  i={i}
                                />
                              ) : (
                                <ClearedSquare
                                  color="blue"
                                  mines={mines}
                                  i={i}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                  <div
                    class={`absolute self-center h-20 w-20  -bottom-2  -left-10`}
                    ref={setConfettiCannonRefA}
                  />
                  <div
                    class={`absolute self-center h-20 w-20  -bottom-2  -right-10`}
                    ref={setConfettiCannonRefB}
                  />
                </div>
              </div>
              <div
                class={`flex absolute lg:relative top-0 right-0 lg:top-1/3 min-w-[210px] justify-end
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
