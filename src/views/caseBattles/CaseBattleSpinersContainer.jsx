import { For, Switch, Match, createSignal, createEffect, onCleanup } from "solid-js";
import {
  getGradientForWinners,
  getModeColorByName,
  getModeRgbByTextColor,
  getColorByPrice,
} from "../../utilities/caseBattles-tools";
import { spinLists } from "./GameCaseBattle"
import {getRandomFunction} from "../../utilities/Random/randomGen";
import injector from "../../injector/injector";
import confetti, {create} from "canvas-confetti";
import {getCurrencyString} from "../../components/mines_new/utils/tools";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png";
import CoinStack from "../../assets/img/case-battles/CoinStack.png";

import bgVectorCaseBattle from "../../assets/img/case-battles/bgVectorCaseBattle.png";
import GrayWrapperdWithBorders from "../../components/battle/GrayWrapperdWithBorders";
import BattleRoyaleIcon from "../../components/icons/BattleRoyaleIcon";
import BattleCursedIcon from "../../components/icons/BattleCursedIcon";
import BattleGroupIcon from "../../components/icons/BattleGroupIcon";
import BattleSpinnerReel from "../../components/battle/BattleSpinnerReelTest";
import Spiner from "../../components/battle/Spiner";
import GoldText from "../../components/shared/GoldText";
import CountDownText from "../../components/battle/CountDownText";
import ResultsAnimation from "../../components/battle/ResultsAnimation";

const CaseBattleSpinersContainer = (props) => {
  const [containerRef, setContainerRef] = createSignal(null);
  const {userObject} = injector;

  const [toIntersectA, setToIntersectA] = createSignal();
  const [toIntersectB, setToIntersectB] = createSignal();
  const [isIntersectingA, setIsIntersectingA] = createSignal(false);
  const [isIntersectingB, setIsIntersectingB] = createSignal(false);
  const [lastAction, setLastAction] = createSignal({});
  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();
  const [confettiCannonRefC, setConfettiCannonRefC] = createSignal();
  const [confettiCannonRefD, setConfettiCannonRefD] = createSignal();

  const bglogos = {
    gold: bglogo_gold,
    blue: bglogo_blue,
    red: bglogo_red,
    purple: bglogo_purple,
    gray: bglogo_gray,
  };

  const createRandomFunction = (
    gameId,
    currentRound,
    playerIndex = 2,
    i = 0
  ) => {
    const rng = getRandomFunction(
      `${gameId.toString()}${currentRound.toString()}${playerIndex.toString()}${i.toString()}}`
    );
    return rng;
  };
  
  const fireCannon = (ref, item) => {
    if (item) {
      console.log("fire confetti");
      const rectA = ref.getBoundingClientRect();

      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

      const intervalDuration = 30;
      const particleCount = 5;
      const spread = 30;
      const startVelocity = 25;
      const colorCodes = {
        purple: "#9c27b0",
        gold: "#ffeb3b",
        red: "#f44336",
        blue: "#2196f3",
        gray: "#9e9e9e",
      };
      const color = getColorByPrice(item.item.price);
      const ticks = 70;

      // const confettiInterval = setInterval(() => {
      //   confetti({
      //     particleCount,
      //     spread,
      //     origin: {x: xA, y: yA},
      //     startVelocity,
      //     colors: ["#FFFFFF", colorCodes[color]],
      //     ticks,
      //   });
      // }, intervalDuration);

      // asyncInterval(
      //   () => {
      //     confetti({
      //       particleCount,
      //       spread,
      //       origin: {x: xA, y: yA},
      //       startVelocity,
      //       colors: ["#FFFFFF", colorCodes[color]],
      //       ticks,
      //     });
      //   },
      //   70,
      //   4
      // );

      for (let i = 0; i < 6; i++) {
        confetti({
          particleCount,
          spread,
          origin: {x: xA, y: yA},
          startVelocity,
          colors: ["#FFFFFF", colorCodes[color]],
          ticks,
        });
      }

      // setConfettiIntervals([...confettiIntervals(), confettiInterval]);
    }
  };

  const createConfetti = () => {
    if (!props.confettiFired()) {
      props.setConfettiFired(true);
      for (let i = 0; i < props.game().playersQty; i++) {
        const ref = [
          confettiCannonRefA,
          confettiCannonRefB,
          confettiCannonRefC,
          confettiCannonRefD,
        ][i]();
        if (props.confettiData()[i].item) {
          fireCannon(ref, props.confettiData()[i]);
        }
      }
      props.setConfettiData([]);
    } else {
      console.log("confetti already fired");
    }
  };

  createEffect(() => {
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
    if (toIntersectB()) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIsIntersectingB(entry.isIntersecting);
        });
      });

      observer.observe(toIntersectB());

      onCleanup(() => {
        observer.unobserve(toIntersectB());
      });
    }
    if (isIntersectingA()) {
      if (!props.confettiFired()) {
        console.log("activate", props.game().currentRound);
        setLastAction({type: "activate", round: props.game().currentRound});
        createConfetti();
      }
    }
  });

  return (
    <div
      class={`${props.isFullRounded ? 'p-0.5 rounded-4' : 'px-[2px] rounded-b-4'} shadow-xl transition-colors duration-200 ${innerWidth < 700 && props.players.length === 1 ? "w-1/2" : "w-full"} `}
      style={{
        background: `linear-gradient(0deg, rgba(255, 255, 255, 0.02) 15%, rgba(255, 255, 255, 0.06) 30%, rgba(${
          props.game().status === "ended"
            ? "154, 158, 200"
            : `${getModeRgbByTextColor(getModeColorByName(props.game().mode))}`
        },0.6) 45.5%, transparent ${innerWidth > 700 ? '45.5%' : '47.5%' }, transparent ${innerWidth > 700 ? '54.5%' : '51.5%' }, rgba(${
          props.game().status === "ended"
            ? "154, 158, 200"
            : `${getModeRgbByTextColor(getModeColorByName(props.game().mode))}`
        },0.6) 54.5%, rgba(255, 255, 255, 0.035) 70%`,
      }}
    >
      <div class={`${props.isFullRounded ? 'rounded-4' : 'rounded-b-4'} bg-[#13152A]`}>
        <div
          class={`${props.isFullRounded ? 'rounded-4' : 'rounded-b-4'} ${
            props.game().status !== "ended" &&
            `case-opening-wrapper-horizontal-${getModeColorByName(
              props.game().mode
            )}`
          }`}
        >
          <div class="relative w-full h-[326px] flex" ref={setContainerRef}>
            <div
              class={`absolute w-full inset-0 z-0 bg-repeat m-1 p-1 mix-blend-plus-lighter ${props.isFullRounded ? 'rounded-4' : 'rounded-b-4'}`}
              style={{
                "background-image": `url('${bgVectorCaseBattle}')`,
                opacity: 0.002,
              }}
            />
            <div
              class={`scale-50 md:scale-100 arrow-down absolute top-1/2 -right-[16px] md:-right-[10px] -translate-y-1/2 rotate-90 ${
                props.game().status === "ended"
                  ? "gray"
                  : `${getModeColorByName(props.game().mode)}`
              }
                              transition-colors duration-200`}
            />
            <div
              class={`scale-50 md:scale-100 arrow-down absolute top-1/2 -left-[16px] md:-left-[10px] -translate-y-1/2 -rotate-90 ${
                props.game().status === "ended"
                  ? "gray"
                  : `${getModeColorByName(props.game().mode)}`
              }
                              transition-colors duration-200`}
            />
            <div
              class="absolute left-0 top-0 w-full h-[68px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26, 28, 51, 1) 5.86%, rgba(26, 28, 51, 0) 100%)",
                opacity: 0.5,
              }}
            />
            <div
              class="absolute left-0 bottom-0 w-full h-[68px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26, 28, 51, 1) 5.86%, rgba(26, 28, 51, 0) 100%)",
                transform: "matrix(-1, 0, 0, -1, 0, 0)",
              }}
            />
            <For
              each={
                props.players
              }
            >
              {(playerIndex) => (
                <div class="relative w-full center">
                  {playerIndex + 1 !== props.game().playersQty &&
                    (props.game().mode === "royal" ||
                      props.game().mode === "group" ||
                      (props.game().mode === "team" &&
                        playerIndex !== 0 &&
                        playerIndex !== 2)) &&
                    (getModeColorByName(props.game().mode) === "yellow" ? (
                      <div
                        class={`absolute z-40 text-yellow-ffb center ${
                          innerWidth < 700 ? 
                          playerIndex === 0 || playerIndex === 2 ?
                            "right-0 top-0"
                            : "right-full top-1/2"
                          : "right-0 top-0"
                        }  h-full ${
                          props.game().status !== "ended" &&
                          props.game().status !== "results" &&
                          "border-r border-black border-opacity-10"
                        }`}
                      >
                        <div class={`absolute left-1/2 top-1/2 ${innerWidth < 700 && playerIndex !== 0 ? "-translate-y-1/3" : " -translate-y-1/2"} -translate-x-1/2`}>
                          {props.game().status !== "ended" &&
                          props.game().status !== "results" ? (
                            <GrayWrapperdWithBorders
                              classes="rounded-6"
                              gradientColor={getModeColorByName(
                                props.game().mode
                              )}
                            >
                              <BattleRoyaleIcon
                                additionClasses="w-6 m-2"
                                glowColor={"255, 180, 54"}
                              />
                            </GrayWrapperdWithBorders>
                          ) : null}
                        </div>
                      </div>
                    ) : getModeColorByName(props.game().mode) === "green" ? (
                      <div class={`absolute z-40 text-[#DAFD09] center ${
                        innerWidth < 700 ? 
                        playerIndex === 0 || playerIndex === 2 ?
                          "right-0 top-0"
                          : "right-full top-1/2"
                        : "right-0 top-0"
                      } h-full border-r border-black border-opacity-10`}>
                        <div class={`absolute left-1/2 top-1/2 -translate-x-1/2 ${innerWidth < 700 && playerIndex !== 0 ? "-translate-y-1/3" : " -translate-y-1/2"}`}>
                          {props.game().status !== "ended" &&
                          props.game().status !== "results" ? (
                            <GrayWrapperdWithBorders
                              classes="rounded-6"
                              gradientColor={getModeColorByName(
                                props.game().mode
                              )}
                            >
                              <BattleCursedIcon
                                additionClasses="w-7 m-2"
                                glowColor={"218, 253, 9"}
                              />
                            </GrayWrapperdWithBorders>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div class={`absolute z-40 text-[#5AC3FF] center ${
                        innerWidth < 700 ? 
                        playerIndex === 0 || playerIndex === 2 ?
                          "right-0 top-0"
                          : "right-full top-1/2"
                        : "right-0 top-0"
                      } h-full border-r border-black border-opacity-10`}>
                        <div class={`absolute left-1/2 top-1/2 -translate-x-1/2 ${innerWidth < 700 && playerIndex !== 0 ? "-translate-y-1/3" : " -translate-y-1/2"} `}>
                          {props.game().status !== "ended" &&
                          props.game().status !== "results" ? (
                            <GrayWrapperdWithBorders
                              classes="rounded-6"
                              gradientColor={getModeColorByName(
                                props.game().mode
                              )}
                            >
                              <BattleGroupIcon
                                additionClasses="w-7 mx-1 my-2"
                                glowColor="90, 195, 255"
                              />
                            </GrayWrapperdWithBorders>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  <Switch>
                    <Match
                      when={
                        (props.game().status === "playing" ||
                          props.game().status === "syncing") &&
                        spinLists().length > 0 &&
                        props.game().players["1"].round_0.id !== null
                      }
                    >
                      {() => {
                        const randomFunction = createRandomFunction(
                          props.game().id,
                          props.game().currentRound,
                          playerIndex
                        );
                        return !!props.spinnerOptions()[playerIndex] &&
                          !!spinLists()[playerIndex] ? (
                          props.game().status === "playing" ? (
                            <BattleSpinnerReel
                              containerRef={containerRef}
                              spinnerIndex={playerIndex}
                              isConfettiWin={
                                props.spinnerOptions()[playerIndex].isConfettiWin ||
                                false
                              }
                              isBigWin={props.spinnerOptions()[playerIndex].isBigWin}
                              isFastSpin={false}
                              lineColor={getModeColorByName(props.game().mode)}
                              randomFunction={randomFunction}
                              user={userObject}
                              containsConfettiWin={props.containsConfettiWin}
                              gameType={props.game().mode}
                              round={props.game().currentRound}
                              spinQueue={props.spinQueue}
                              setSpinQueue={props.setSpinQueue}
                              // spinnerStatus={spinnerStatus}
                              spinList={spinLists()[playerIndex]}
                              spinIndex={props.spinIndexes()[playerIndex]}
                              setToIntersectA={setToIntersectA}
                              setToIntersectB={setToIntersectB}
                            />
                          ) : (
                            <div class="h-32 flex flex-col gap-2 text-3xl  items-center scale-125 -translate-y-8">
                              <div class="relative z-10 flex">
                                <img
                                  class={`h-24 z-20 transition-all duration-500`}
                                  src={
                                    spinLists()[playerIndex][
                                      props.spinIndexes()[playerIndex]
                                    ].img
                                  }
                                  alt={
                                    spinLists()[playerIndex][
                                      props.spinIndexes()[playerIndex]
                                    ].name
                                  }
                                />
                                <img
                                  src={
                                    bglogos[
                                      spinLists()[playerIndex][
                                        props.spinIndexes()[playerIndex]
                                      ].rarity
                                    ]
                                  }
                                  alt={
                                    spinLists()[playerIndex][
                                      props.spinIndexes()[playerIndex]
                                    ].rarity + " glow"
                                  }
                                  class="absolute z-10 scale-[1.4]"
                                />
                              </div>
                              <div
                                class={`flex flex-col items-center justify-center 
                                                   overflow-visible h-min `}
                              >
                                <div class="text-[#A2A5C6] text-14 font-semibold">
                                  {
                                    spinLists()[playerIndex][
                                      props.spinIndexes()[playerIndex]
                                    ].name
                                  }
                                </div>
                                <div class="flex  items-center justify-center gap-1">
                                  <img src={CoinStack} alt="" />
                                  <GoldText
                                    text={getCurrencyString(
                                      spinLists()[playerIndex][
                                        props.spinIndexes()[playerIndex]
                                      ].price
                                    )}
                                    size="13"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        ) : (
                          <Spiner classes="w-9 text-yellow-ffb" />
                        );
                      }}
                      {playerIndex === 0 && (
                        <div
                          class={`absolute self-center h-20 w-20  -bottom-2  left-1/2 -translate-x-1/2`}
                          ref={setConfettiCannonRefA}
                        />
                      )}
                      {playerIndex === 1 && (
                        <div
                          class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                          ref={setConfettiCannonRefB}
                        />
                      )}
                      {playerIndex === 2 && (
                        <div
                          class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                          ref={setConfettiCannonRefC}
                        />
                      )}
                      {playerIndex === 3 && (
                        <div
                          class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                          ref={setConfettiCannonRefD}
                        />
                      )}
                    </Match>
                    <Match when={props.game().status === "open"}>
                      {props.game().players[playerIndex + 1] ? (
                        <div
                          class="w-full h-full center text-gradient font-SpaceGrotesk text-28 font-bold"
                          style={{
                            "text-shadow": `0px 0px 20px rgba(255, 180, 54, 0.56), 0px 2px 2px rgba(0, 0, 0, 0.12)`,
                          }}
                        >
                          Ready
                        </div>
                      ) : (
                        <Spiner classes="w-9 text-yellow-ffb" />
                      )}
                    </Match>
                    <Match when={props.game().status === "countdown"}>
                      <div class="w-full h-full center">
                        <CountDownText text={props.currentCountdown()} size={54} />
                      </div>
                    </Match>
                  </Switch>
                </div>
              )}
            </For>
            <Switch>
              <Match when={props.showResults() && props.game().status === "ended"}>
                <ResultsAnimation
                  players={props.players}
                  game={props.game}
                  getGradientForWinners={getGradientForWinners}
                  playerBarRef={props.playerBarRef}
                />
              </Match>
              <Match when={!props.showResults() && props.game().status === "ended"}>
                <ResultsAnimation
                  game={props.game}
                  players={props.players}
                  getGradientForWinners={getGradientForWinners}
                  playerBarRef={props.playerBarRef}
                  noAnimation
                />
              </Match>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseBattleSpinersContainer;
