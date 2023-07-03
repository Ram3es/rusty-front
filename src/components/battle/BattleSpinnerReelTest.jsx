import {For, createSignal, createEffect, onCleanup, onMount} from "solid-js";
import {
  containerRef,
  spinOffsets,
  reelsSpinning,
  setReelsSpinning,
} from "../../views/caseBattles/GameCaseBattle";
import {spinnerTimings, otherOptions} from "../../libraries/caseSpinConfig";
import GoldText from "../shared/GoldText";
import {getCurrencyString} from "../mines_new/utils/tools";
import Coin from "../../utilities/Coin";
// import ObserverItem from "./ObserverItem";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png";

import CaseLineYellow from "../../assets/img/case-battles/caseLineHorizontal.svg";
import CaseLineBlue from "../../assets/img/case-battles/caseLineHorizontalBlue.svg";
import CaseLineGreen from "../../assets/img/case-battles/caseLineHorizontalGreen.svg";

import confetti from "canvas-confetti";
import {useSpinnerStatus} from "../../utilities/hooks/spinnerStatus";
// import { Fireworks } from "fireworks-js";
import {init} from "snowf";

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceVertical;
const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const BattleSpinnerReel = (props) => {
  const [timeMultiplier, setTimeMultiplier] = createSignal(1);
  createEffect(() => {
    if (props.isFastSpin) {
      setTimeMultiplier(spinnerTimings.fastSpinMultiplier);
    } else {
      setTimeMultiplier(1);
    }
  });

  const [reelItem, setReelItem] = createSignal();
  const [imgItem, setImgItem] = createSignal();
  const [reel, setReel] = createSignal();
  const [lineWidth, setLineWidth] = createSignal(0);

  // const [fireworksContainer, setFireworksContainer] = createSignal();

  // const [fireworksActive, setFireworksActive] = createSignal(false);

  const calculateTopIndexOffset = () => {
    setReelItem(() => document.querySelector("[data-reel-item]"));
    const referencePoint = containerRef().offsetHeight / 2;
    const itemHeight = reelItem().offsetHeight;
    const imgHeight = imgItem().offsetHeight;
    return referencePoint - itemHeight - imgHeight / 2;
  };

  const [spinTime, setSpinTime] = createSignal(
    spinnerTimings.battleInitialSpin
  );
  const [timingFunction, setTimingFunction] = createSignal(
    // "cubic-bezier(.48,.84,.49,1)"
    "cubic-bezier(.2,1,.53,1)"
    // "cubic-bezier(.2,.96,.24,.99)"
  );
  // const [spinComplete, setSpinComplete] = createSignal(false);

  const {getStatus} = useSpinnerStatus();

  const [hasRun, setHasRun] = createSignal(false);

  createEffect(() => {
    if (getStatus() === "spinning" && !hasRun()) {
      setHasRun(true);
      moveToIndex();
    }
  });

  const [initialMoveAmount, setInitialMoveAmount] = createSignal(0);

  const moveToIndex = () => {
    const itemHeight = reelItem().offsetHeight;
    let moveAmount = (props.spinIndex - 1) * itemHeight;
    const spinOffSet = getSpinOffSet();
    const positiveOffSet = Math.floor(props.randomFunction() * 2);
    if (positiveOffSet) {
      moveAmount += spinOffSet;
    } else {
      moveAmount -= spinOffSet;
    }
    setInitialMoveAmount(moveAmount);
    // if (props.spinnerIndex === 0) {
    //   props.setBeginClickSound(true);
    // }
  };

  const getOffsetCorrection = () => {
    const itemHeight = reelItem().offsetHeight;
    let moveAmount = (props.spinIndex - 1) * itemHeight;
    setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");
    // if (props.spinnerIndex === 0) {
    //   props.setBeginPullBackSound(true);
    // }
    return moveAmount;
  };

  // const handleEnd = () => {
  //   if (props.isConfettiWin) {
  //     createConfetti();
  //   }
  //   // if (props.spinnerIndex === 0) {
  //   //   props.setBeginWinSound(true);
  //   // }
  // };

  const withinOtherReelBounds = (newOffset) => {
    for (let i = 0; i < spinOffsets().length; i++) {
      const currOffset = spinOffsets()[i];

      const lowerBound = currOffset * 0.9;
      const upperBound = currOffset * 1.1;

      if (newOffset >= lowerBound && newOffset <= upperBound) {
        return true;
      }
    }
    return false;
  };

  const getSpinOffSet = () => {
    const itemHeight = reelItem().offsetHeight;
    const landInMiddle = props.randomFunction() <= LAND_IN_MIDDLE_CHANCE;
    if (landInMiddle) {
      let newOffset =
        itemHeight / 2 - props.randomFunction() * 0.1 * itemHeight;

      if (withinOtherReelBounds(newOffset)) {
        newOffset = itemHeight / 2 - props.randomFunction() * 0.1 * itemHeight;
      }
      spinOffsets().push(newOffset);

      return newOffset;
    }
    const newOffset =
      Math.floor((props.randomFunction() * 0.95 + 0.05) * itemHeight) / 2;
    spinOffsets().push(newOffset);
    return newOffset;
  };

  // const [confettiActive, setConfettiActive] = createSignal(false);
  // const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();

  // let confettiInterval;
  // // const createConfetti = () => {
  //   if (!confettiActive()) {
  //     setConfettiActive(true);

  //     const rectA = confettiCannonRefA().getBoundingClientRect();

  //     const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
  //     const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

  //     // Fire confetti every 100 milliseconds (you can adjust this value)
  //     const intervalDuration = 30;
  //     const particleCount = 5;
  //     const spread = 30;
  //     const startVelocity = 25;
  //     const colorCodes = {
  //       purple: "#9c27b0",
  //       gold: "#ffeb3b",
  //       red: "#f44336",
  //       blue: "#2196f3",
  //       gray: "#9e9e9e",
  //     };
  //     const spinList = props.spinList;
  //     const color = spinList[props.spinIndex].rarity;
  //     const ticks = 70;

  //     confettiInterval = setInterval(() => {
  //       confetti({
  //         particleCount,
  //         spread,
  //         origin: {x: xA, y: yA},
  //         startVelocity,
  //         colors: ["#FFFFFF", colorCodes[color]],
  //         ticks,
  //       });
  //     }, intervalDuration);

  //     // Clear the interval after 3 seconds
  //     setTimeout(() => {
  //       clearInterval(confettiInterval);
  //       setConfettiActive(false);
  //     }, 200);
  //   }
  // };

  createEffect(() => {
    if (props.gameType === "team") {
      setLineWidth(reel().offsetWidth);
    } else {
      setLineWidth(reel().offsetWidth - 42);
    }
  });

  const [spinnerKeyframes, setSpinnerKeyframes] = createSignal(``);
  createEffect(() => {
    if (initialMoveAmount() !== 0) {
      setSpinnerKeyframes(`
      @keyframes spinnerAnimation${props.spinnerIndex} {
        0% { transform: translateY(0px);}
        70% { transform: translateY(${
          calculateTopIndexOffset() - initialMoveAmount()
        }px);}
        78.3% {transform: translateY(${
          calculateTopIndexOffset() - getOffsetCorrection()
        }px);}
        83% {transform: translateY(${
          calculateTopIndexOffset() - getOffsetCorrection()
        }px);}
        100% {transform: translateY(${
          calculateTopIndexOffset() - getOffsetCorrection()
        }px);}
      }

      @keyframes winItemAnimation {
        0% { transform: scale(1); }
        83% { transform: scale(1);}
        91.7% {transform: scale(1.25) translateY(-2rem);}
        100% {transform: scale(1.25) translateY(-2rem);}
      }

      @keyframes otherItemAnimation {
        0% { transform: scale(1); opacity: 1;}
        83% { transform: scale(1); opacity: 1;}
        91.7% {transform: scale(0); opacity: 0;}
        100% {transform: scale(0); opacity: 0;}
      }

      @keyframes textAnimation {
        0% { transform: scale(0); }
        83% { transform: scale(0);}
        91.7% {transform: scale(1);}
        100% {transform: scale(1);}
      }

      @keyframes confettiAnimation {
        0% { top: 150vh; }
        83.6% { top: 150vh;}
        83.7% {top: 0;}
        85.7% {top: 0;}
        85.7% {top: 150vh;}
        100% {top: 150vh;}
      }
      @keyframes confettiCleanupAnimation {
        0% { top: 150vh; }
        86.6% { top: 150vh;}
        87.7% {top: 0;}
        89.7% {top: 0;}
        89.7% {top: 150vh;}
        100% {top: 150vh;}
      }

      @keyframes dualConfettiAnimation {
        0% { content: 'none'; top: 150vh;}
        83.6% {  content: 'none'; top: 150vh;}
        83.7% { content: 'fire'; top: 0;}
        85.7% { content: 'none'; top: 150vh;}
        86.6% {  content: 'none'; top: 150vh;}
        87.7% { content: 'clean'; top: 0;}
        89.7% { content: 'none'; top: 150vh;}
        100% { content: 'none'; top: 150vh;}
      }

        `);
    }
  });

  return (
    <div
      id="slot-screen"
      class="relative gap-2 w-full h-full flex flex-col 
      items-center justify-center overflow-hidden font-SpaceGrotesk"
    >
      <style>{spinnerKeyframes()}</style>
      <div class={`overflow-y-hidden w-full overflow-x-hidden`}>
        <div
          id="reels"
          ref={setReel}
          class={`relative
              flex flex-col
              w-full
              `}
          style={{
            "animation-name": `${`spinnerAnimation${props.spinnerIndex}`}`,
            "animation-duration": `5.5s`,
            "animation-timing-function": "cubic-bezier(.2,1,.53,1)",
            "animation-fill-mode": "forwards",
          }}
        >
          {props.spinList.length > 0 ? (
            <For each={props.spinList}>
              {(item, index) => (
                <div
                  ref={setReelItem}
                  class={`h-32 flex flex-col gap-2 text-3xl 
                transition-all duration-500 items-center`}
                  data-reel-item
                  style={{
                    "animation-name": `${
                      index() === props.spinIndex
                        ? "winItemAnimation"
                        : "otherItemAnimation"
                    }`,
                    "animation-duration": `5.5s`,
                    "animation-timing-function":
                      "cubic-bezier(0.25, 1, 0.5, 1)",
                    "animation-fill-mode": "forwards",
                  }}
                >
                  <div class="relative z-10 flex">
                    {/* {props.spinnerIndex === 0 &&  <ObserverItem />}  */}
                    {index() === 0 ? (
                      <img
                        class={`h-24 z-20 transition-all duration-500`}
                        src={item.img}
                        ref={setImgItem}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        class={`h-24 z-20 transition-all duration-500`}
                        src={item.img}
                        alt={item.name}
                      />
                    )}

                    <img
                      src={bglogos[item.rarity]}
                      alt={item.rarity + " glow"}
                      class="absolute z-10 scale-[1.4]"
                    />
                  </div>
                  {index() === props.spinIndex && (
                    <div
                      class={`flex flex-col items-center justify-center 
                  transition-all duration-500 overflow-visible h-min `}
                      style={{
                        "animation-name": `${
                          index() === props.spinIndex && "textAnimation"
                        }`,
                        "animation-duration": `5.5s`,
                        "animation-timing-function":
                          "cubic-bezier(0.25, 1, 0.5, 1)",
                        "animation-fill-mode": "forwards",
                      }}
                    >
                      <div class="text-[#A2A5C6] text-14 font-semibold">
                        {item.name}
                      </div>
                      <div class="flex  items-center justify-center gap-1">
                        <Coin width="5" />
                        <GoldText
                          text={getCurrencyString(item.price)}
                          size="13"
                        />
                      </div>
                    </div>
                  )}

                  {/* {index() === props.spinIndex && (
                    <>
                      <div
                        class="absolute w-2 h-2"
                        ref={setToIntersectA}
                        style={{
                          "animation-name": "confettiAnimation",
                          "animation-duration": `4.5s`,
                          "animation-timing-function": timingFunction(),
                          "animation-fill-mode": "forwards",
                        }}
                      />
                      <div
                        class="absolute w-2 h-2"
                        ref={setToIntersectB}
                        style={{
                          "animation-name": "confettiAnimation",
                          "animation-duration": `4.6s`,
                          "animation-timing-function": timingFunction(),
                          "animation-fill-mode": "forwards",
                        }}
                      />
                    </>
                  )} */}
                </div>
              )}
            </For>
          ) : (
            <div ref={setReelItem} data-reel-item class="h-32">
              <div class={`h-24 w-2`} ref={setImgItem} />
            </div>
          )}
        </div>
      </div>
      <img
        src={
          props.lineColor === "yellow"
            ? CaseLineYellow
            : props.lineColor === "blue"
            ? CaseLineBlue
            : CaseLineGreen
        }
        alt="caseline"
        class={`absolute h-32  self-center transition-opacity duration-500 opacity-100
         `}
        // ${getStatus() === "end" ? "opacity-30" : "opacity-100"}
        style={{
          width: lineWidth() + "px",
        }}
      />
      {/* <div
        class={`absolute self-center h-20 w-20 
         -bottom-2`}
        ref={setConfettiCannonRefA}
      /> */}
      {props.spinnerIndex === 0
        ? () => {
            return (
              <>
                <div
                  class="absolute w-1 h-1 bg-white opacity-[0.01]"
                  ref={props.setToIntersectA}
                  style={{
                    "animation-name": "confettiAnimation",
                    "animation-duration": `5.5s`,
                    "animation-timing-function": "linear",
                    "animation-fill-mode": "forwards",
                  }}
                />
                <div
                  class="absolute w-1 h-1 bg-white opacity-[0.01]"
                  ref={props.setToIntersectB}
                  style={{
                    "animation-name": "confettiCleanupAnimation",
                    "animation-duration": `5.5s`,
                    "animation-timing-function": "linear",
                    "animation-fill-mode": "forwards",
                  }}
                />
              </>
            );
          }
        : null}
      {/* <div
        class={`absolute self-center w-max h-full oveDrflow-visible
         -bottom-2`}
        ref={setFireworksContainer}
      ></div> */}
    </div>
  );
};

export default BattleSpinnerReel;
