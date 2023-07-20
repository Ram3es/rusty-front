import {createEffect, For, onMount, createSignal, onCleanup} from "solid-js";
import WinningsDisplay from "./WinningsDisplay";
import TotalUnboxedCount from "./TotalUnboxedCount";
import UserBadge from "./UserBadge";
import CoinLogo from "../shared/CoinLogo";
import UserGameAvatar from "./UserGameAvatar";
import confetti, {create} from "canvas-confetti";

import {
  playCounter35Sound,
  playCounter45Sound,
  playCounter55Sound,
  playCounter60Sound,
  playCounter65Sound,
} from "../../utilities/Sounds/SoundButtonClick";
import {
  getCountDuration,
  getModeColorByName,
  getModeRgbByTextColor,
} from "../../utilities/caseBattles-tools";

const ResultsAnimation = (props) => {
  const [timings, setTimings] = createSignal({});
  const [keyframes, setKeyframes] = createSignal("");
  const [totalTime, setTotalTime] = createSignal(0);

  const [confettiFired, setConfettiFired] = createSignal(false);
  const [confettiCanvas, setConfettiCanvas] = createSignal(null);

  const gradientClip = `-webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;`;

  const goldGradient = ` linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.16) 41.3%,
                         rgba(0, 0, 0, 0.16) 68.93%, rgba(255, 255, 255, 0.16) 100%),
                        radial-gradient(70% 70% at 50% 80%, #ffb436 0%, #ffd58f 100%); text-shadow: 0px 0px 20px #ffb436f;`;

  const greenGradient = `radial-gradient(70% 70% at 50% 80%, #27F278 0%, #86FFB6 100%),
                        linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, 
                        rgba(255, 255, 255, 0.16) 41.3%, rgba(0, 0, 0, 0.16) 68.93%, rgba(255, 255, 255, 0.16) 100%); text-shadow: 0px 0px 20px #27F278f;`;

  onMount(() => {
    const countDuration = getCountDuration(props.game().cases.length);
    setTimings({
      countDuration: countDuration,
      countRisePause: 0.3,
      winnerRise: 0.3,
      riseExitPause: 0.5,
      countsExit: 0.5,
      exitTotalPause: 0,
      totalUnboxed: 1,
      individualWinnings: 0.5,
      exitIndividualPause: 0.4 + 0,
    });

    if (props.noAnimation) {
      setTotalTime(0);
    } else {
      setTotalTime(
        timings().countDuration +
          timings().countRisePause +
          timings().winnerRise +
          timings().riseExitPause +
          timings().countsExit +
          timings().exitIndividualPause +
          timings().individualWinnings
      );
    }

    setKeyframes(`
    @keyframes slightupWinner {
        0%, ${
          ((timings().countDuration + timings().countRisePause) / totalTime()) *
          100
        }% {transform: translateY(0px); 
            background: ${goldGradient} ${gradientClip}
        }
        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise) /
            totalTime()) *
          100
        }% {transform: translateY(-20px) scale(1.2); 
            background: ${greenGradient} ${gradientClip}
        }
        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause) /
            totalTime()) *
          100
        }% {transform: translateY(-20px) scale(1.2); 
            background: ${greenGradient} ${gradientClip}
        }

        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit) /
            totalTime()) *
          100
        }%, 100% {transform: translateY(-150vh) scale(1.2); 
            background: ${greenGradient} ${gradientClip}
        }
    }
    
    @keyframes slightupLoser {
        0%, ${
          ((timings().countDuration + timings().countRisePause) / totalTime()) *
          100
        }% {transform: translateY(0px); 
            background:  ${goldGradient} ${gradientClip}
            opacity: 1;
        }

        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise) /
            totalTime()) *
          100
        }% {transform: translateY(10px) scale(0.8); opacity: 0.5;
            background:  ${goldGradient} ${gradientClip}
        }

        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause) /
            totalTime()) *
          100
        }% {transform: translateY(10px) scale(0.8); opacity: 0.5;
                background:  ${goldGradient} ${gradientClip}
        }
        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit) /
            totalTime()) *
          100
        }%, 100% {transform: translateY(150vh) scale(0.8); opacity: 0.5;
            background:  ${goldGradient} ${gradientClip}
        }
    }

    @keyframes totalUnboxed {
        0%, ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().exitTotalPause) /
            totalTime()) *
          100
        }% {
            transform: translateY(-100vh) translateX(-50%); 
        }
        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().exitTotalPause +
            timings().totalUnboxed) /
            totalTime()) *
          100
        }%, 100% {
              transform: translateY(0px) translateX(-50%);
        }
    }

    @keyframes individualWinningsBadge {
        0%, ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit +
            timings().exitIndividualPause) /
            totalTime()) *
          100
        }% {
            transform: translateY(0px); 
        }
        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit +
            timings().exitIndividualPause +
            timings().individualWinnings) /
            totalTime()) *
          100
        }%, 100% {
            transform: translateY(-10px); 
        }
    }

    @keyframes individualWinningsAmount {
        0%, ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit +
            timings().exitIndividualPause) /
            totalTime()) *
          100
        }% {
            transform: scale(0); 
        }

        ${
          ((timings().countDuration +
            timings().countRisePause +
            timings().winnerRise +
            timings().riseExitPause +
            timings().countsExit +
            timings().exitIndividualPause +
            timings().individualWinnings) /
            totalTime()) *
          100
        }%, 100% {
            transform: scale(1); 
        }
    }

    @keyframes floatingWinnings {
        0% {transform: translateY(0px) translateX(-50%);}
        50% {transform: translateY(-10px) translateX(-50%);}
        100% {transform: translateY(0px) translateX(-50%);}
    }

    @keyframes winnersGradient {
        0%, ${
          (timings().countDuration / totalTime()) * 100
        }% {background: none;}

        ${
          ((timings().countDuration + timings().countRisePause) / totalTime()) *
          100
        }%, 100% { }
    }

    @keyframes loserOpacity {
      0%, ${(timings().countDuration / totalTime()) * 100}% {opacity: 1;}

      ${
        ((timings().countDuration +
          timings().countRisePause +
          timings().winnerRise) /
          totalTime()) *
        100
      }%, 100% {opacity: 0.3; }
  }

    }
    `);

    if (!props.noAnimation) {
      if (countDuration === 3.5) {
        playCounter35Sound();
      } else if (countDuration === 4.5) {
        playCounter45Sound();
      } else if (countDuration === 5.5) {
        playCounter55Sound();
      } else if (countDuration === 6) {
        playCounter60Sound();
      } else if (countDuration === 6.5) {
        playCounter65Sound();
      }
    }
  });

  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();

  const [isIntersectingA, setIsIntersectingA] = createSignal(false);
  const [toIntersectA, setToIntersectA] = createSignal();

  createEffect(() => {
    if (!props.noAnimation) {
      if (toIntersectA()) {
        let observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setIsIntersectingA(entry.isIntersecting);
          });
        });

        observer.observe(toIntersectA());

        onCleanup(() => {
          observer.unobserve(toIntersectA());
        });
      }
    }
  });

  createEffect(() => {
    if (!props.noAnimation) {
      if (isIntersectingA()) {
        if (!confettiFired()) {
          setConfettiFired(true);
          fireCannon(confettiCannonRefA(), 45);
          fireCannon(confettiCannonRefB(), 135);
        }
      }
    }
  });

  const fireCannon = (ref, angle) => {
    const parent = ref.parentNode;
    const grandParent = parent.parentNode;

    const rectA = ref.getBoundingClientRect();
    const rectGP = grandParent.getBoundingClientRect();

    const xA = rectA.left - rectGP.left + ref.offsetWidth / 2;
    const yA = rectA.top - rectGP.top + ref.offsetHeight / 2;

    const normalizedXA = xA / grandParent.offsetWidth;
    const normalizedYA = yA / grandParent.offsetHeight;

    const particleCount = 5;
    const spread = 30;
    const startVelocity = 40;
    const colorCodes = {
      purple: "#9c27b0",
      gold: "#ffeb3b",
      red: "#f44336",
      blue: "#2196f3",
      gray: "#9e9e9e",
    };
    const ticks = 70;

    const end = Date.now() + 0.095 * 1000;

    (function frame() {
      confettiCanvas().confetti({
        particleCount,
        spread,
        origin: {x: normalizedXA, y: normalizedYA},
        startVelocity,
        angle,
        ticks,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  createEffect(() => {
    if (confettiCanvas()) {
      confettiCanvas().confetti =
        confettiCanvas().confetti || create(confettiCanvas(), {resize: true});
    }
  });

  const [playerBarWidth, setPlayerBarWidth] = createSignal(0);
  createEffect(() => {
    const handleResize = () => {
      if (props.playerBarRef()) {
        setPlayerBarWidth(props.playerBarRef().offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div class="w-full h-full absolute z-20">
      <canvas class="absolute w-full h-full" ref={setConfettiCanvas} />
      <style>{keyframes()}</style>
      <div class="w-full h-full overflow-hidden ">
        <div class="w-full h-full flex items-center justify-between ">
          <For each={props.players}>
            {(player) => (
              <div class="flex-1 flex items-center justify-center">
                <span
                  class={`font-SpaceGrotesk text-28 font-bold `}
                  style={{
                    animation: `${
                      isPlayerWinner(
                        props.game().players[player + 1],
                        props.players
                      )
                        ? "slightupWinner"
                        : "slightupLoser"
                    } ${totalTime()}s ease-in-out forwards`,
                  }}
                >
                  {!props.noAnimation && (
                    <WinningsDisplay
                      value={calculatePlayerIndivdualWinnings(
                        props.game().players[player + 1]
                      )}
                      countdownDuration={timings().countDuration}
                    />
                  )}
                </span>
              </div>
            )}
          </For>
          <div
            class="absolute left-1/2 -translate-x-1/2"
            style={{
              animation: `${totalTime()}s ease-in-out 0s 1 normal forwards running totalUnboxed, 3.5s ease-in-out ${
                totalTime() - 0.2
              }s infinite normal forwards running floatingWinnings`,
            }}
            ref={setToIntersectA}
          >
            <TotalUnboxedCount total={getTotalUnboxed(props.game().winners)} />
          </div>
        </div>
      </div>
      <div
        class={`absolute self-center h-20 w-20  -bottom-2  left-0 `}
        ref={setConfettiCannonRefA}
      />
      <div
        class={`absolute self-center h-20 w-20  -bottom-2  right-0 `}
        ref={setConfettiCannonRefB}
      />
      {/* <div
        class={`grid rounded-8 border border-black border-opacity-5 relative z-10 grid-cols-${
          props.game().playersQty
        } 
        mt-3 -translate-x-[2px]`}
        style={{
          // background: `radial-gradient(25% 50% at 50% 0%, rgba(${props.getModeColorRgb()}, ${
          //   props.game().status === "ended" ? 0 : "0.07"
          // }) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`,
          width: `${playerBarWidth()}px`,
        }}
      >
        <For each={Array.from(Array(props.game().playersQty).keys())}>
          {(playerIndex) => (
            <div
              class={`center relative pb-2 transition-opacity
              ${
                playerIndex === 0
                  ? "rounded-l-8"
                  : playerIndex ===
                    Array.from(Array(props.game().playersQty).keys()).at(-1)
                  ? "rounded-r-8"
                  : ""
              }`}
              style={{
                background: `${props.getGradientForWinners(
                  props.game().playersQty,
                  props.game().winners,
                  playerIndex
                )}`,
                animation: `${
                  isWinnerFromIndex(props.game().winners, playerIndex)
                    ? "winnersGradient"
                    : "loserOpacity"
                } ${totalTime()}s ease-in-out forwards`,
              }}
            >
              <div class="center p-2">
                <div class="pl-2 pr-6 flex flex-row gap-2 center">
                  <div class="w-max">
                    <UserGameAvatar
                      mode={
                        props.game()?.cursed === 1
                          ? "cursed"
                          : props.game()?.mode === "group" &&
                            props.game()?.cursed !== 1
                          ? "group"
                          : "royal"
                      }
                      isBot={
                        props.game().players[playerIndex + 1] &&
                        !props.game().players[playerIndex + 1]?.avatar
                      }
                      avatar={props.game().players[playerIndex + 1]?.avatar}
                      name={props.game().players[playerIndex + 1]?.name}
                    />
                  </div>
                  <div
                    class={`${
                      props.noAnimation &&
                      isWinnerFromIndex(props.game().winners, playerIndex) &&
                      "-translate-y-[10px] "
                    }`}
                    style={{
                      animation: `${
                        isWinnerFromIndex(props.game().winners, playerIndex) &&
                        "individualWinningsBadge"
                      } ${totalTime()}s ease-in-out forwards`,
                    }}
                  >
                    <UserBadge game={props.game} playerIndex={playerIndex} />
                    {isWinnerFromIndex(props.game().winners, playerIndex) && (
                      <div
                        class="flex gap-1 items-center justify-center absolute left-2"
                        style={{
                          animation: `${
                            isWinnerFromIndex(
                              props.game().winners,
                              playerIndex
                            ) && "individualWinningsAmount"
                          } ${totalTime()}s ease-in-out forwards`,
                        }}
                      >
                        <CoinLogo h="15" />
                        <span class="text-green-gradient text-18 font-SpaceGrotesk font-semibold">
                          {parseFloat(
                            getWinnerValueById(
                              props.game().winners,
                              props.game().players[playerIndex + 1].id
                            )
                          ).toLocaleString("en-US")}
                          <span class="text-14">.00</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div> */}
    </div>
  );
};

const calculatePlayerIndivdualWinnings = (playerObject) => {
  let total = 0;

  // Loop through each key in the object
  Object.keys(playerObject).forEach((key) => {
    // If the key starts with 'round_', add its 'item_price' to the total
    if (
      key.startsWith("round_") &&
      Object.prototype.hasOwnProperty.call(playerObject[key], "item_price")
    ) {
      total += playerObject[key].item_price;
    }
  });

  return total;
};

const isPlayerWinner = (playerObject, index = 0) => {
  return playerObject.winner;
};
export const isWinnerFromIndex = (winnersArray, playerIndex) => {
  if (winnersArray) {
    return winnersArray.some(
      (winner) => winner.player_index === playerIndex + 1
    );
  }
  return false;
};

export const getWinnerValueById = (winnersArray, id) => {
  for (let i = 0; i < winnersArray.length; i++) {
    // If the current object's id matches the id we're looking for
    if (winnersArray[i].id === id) {
      // Return the winnerValue of this object
      return winnersArray[i].winnerValue;
    }
  }
  // If no matching id was found, return null
  return null;
};

const getTotalUnboxed = (winnersArray) => {
  let total = 0;
  for (let i = 0; i < winnersArray.length; i++) {
    total += winnersArray[i].winnerValue;
  }
  return total;
};

export default ResultsAnimation;
