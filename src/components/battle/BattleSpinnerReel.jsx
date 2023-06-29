import {For, createSignal, createEffect} from "solid-js";
import {
  containerRef,
  reelsSpinning,
  spinIndexes,
  spinLists,
  spinOffsets,
} from "../../views/caseBattles/GameCaseBattle";
import {setIsRolling} from "../../views/caseBattles/GameCaseBattle";
import {spinnerTimings, otherOptions} from "../../libraries/caseSpinConfig";
import GoldText from "../shared/GoldText"
import { getCurrencyString } from "../mines_new/utils/tools";
import Coin from "../../utilities/Coin"
// import ObserverItem from "./ObserverItem";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png"
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png"
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png"
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png"
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png"

import confetti from "canvas-confetti";
// import { Fireworks } from "fireworks-js";

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceVertical;

const [timeMultiplier, setTimeMultiplier] = createSignal(1);

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const BattleSpinnerReel = ({
  spinnerIndex,
  isConfettiWin,
  isFastSpin,
  lineColor,
  randomFunction,
  setBeginClickSound,
  setBeginPullBackSound,
  setBeginWinSound,
  containsConfettiWin,
  gameType
}) => {
  createEffect(() => {
    if (isFastSpin) {
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

  const [topIndex, setTopIndex] = createSignal(0);
  const [translateY, setTranslateY] = createSignal(0);

  const calculateTopIndexOffset = () => {
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
  const [spinComplete, setSpinComplete] = createSignal(false);

  createEffect(() => {
    // console.log(reelsSpinning());
    // console.log(reelItem());
    if (reelsSpinning()) {
      setTranslateY(calculateTopIndexOffset());
      // console.log("moveToIndex", spinnerIndex, spinIndexes()[spinnerIndex]);
      moveToIndex(spinIndexes()[spinnerIndex]);
    }
  });
  createEffect(() => {
    if (spinLists()) {
      // console.log("here spin", spinLists());
      setReelItem(() => document.querySelector("[data-reel-item]"));
      // console.log(reelItem());
    }
  });

  const moveToIndex = (index) => {
    const itemHeight = reelItem().offsetHeight;
    let moveAmount = (index - 1) * itemHeight;
    const spinOffSet = getSpinOffSet();
    const positiveOffSet = Math.floor(randomFunction() * 2);
    if (positiveOffSet) {
      moveAmount += spinOffSet;
    } else {
      moveAmount -= spinOffSet;
    }
    setTopIndex(moveAmount);
    if(spinnerIndex === 0){
      setBeginClickSound(true);
    }
    setTimeout(() => {
      setTimeout(() => {
        correctForOffset(index);
        setSpinComplete(true);
      }, 200);
    }, spinnerTimings.battleInitialSpin * 1000 * timeMultiplier());
  };

  const correctForOffset = (index) => {
    const itemHeight = reelItem().offsetHeight;
    let moveAmount = (index - 1) * itemHeight;
    setSpinTime(spinnerTimings.verticalSnapBack);
    setTimeMultiplier(1);
    setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");

    setTopIndex(moveAmount);
    if(spinnerIndex === 0){
      setBeginPullBackSound(true);
    }
      
    setTimeout(() => {
      if (isConfettiWin) {
        createConfetti();
      }
      if(spinnerIndex === 0){
        setBeginWinSound(true);
      }
      // createFireworks();
      setTimeout(() => {
        setIsRolling(false);
      }, 500);
    }, 500);
  };

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
    const landInMiddle = randomFunction() <= LAND_IN_MIDDLE_CHANCE;
    if (landInMiddle) {
      let newOffset = itemHeight / 2 - randomFunction() * 0.1 * itemHeight;

      if (withinOtherReelBounds(newOffset)) {
        newOffset = itemHeight / 2 - randomFunction() * 0.1 * itemHeight;
      }
      spinOffsets().push(newOffset);
      return newOffset;
    }
    const newOffset =
      Math.floor((randomFunction() * 0.95 + 0.05) * itemHeight) / 2;
    spinOffsets().push(newOffset);
    return newOffset;
  };

  const [confettiActive, setConfettiActive] = createSignal(false);
  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();

  const createConfetti = () => {
    if (!confettiActive()) {
      setConfettiActive(true);

      const rectA = confettiCannonRefA().getBoundingClientRect();

      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

      // Fire confetti every 100 milliseconds (you can adjust this value)
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
      const spinList = spinLists()[spinnerIndex];
      const color = spinList[spinIndexes()[spinnerIndex]].rarity;
      const ticks = 70;
      const confettiInterval = setInterval(() => {
        
        confetti({
          particleCount,
          spread,
          origin: {x: xA, y: yA},
          startVelocity,
          colors: ["#FFFFFF", colorCodes[color]],
          ticks,
        });
      }, intervalDuration);

      // Clear the interval after 3 seconds
      setTimeout(() => {
        clearInterval(confettiInterval);
        setConfettiActive(false);
      }, 200);
    }
  };

  // const createFireworks = () => {
  //   const options = {
  //     explosion: 2,
  //   };
  //   const fireworks = new Fireworks(fireworksContainer(), options);

  //   setFireworksActive(true);
  //   let i = 0;
  //   setInterval(() => {
  //     if (i < 5) {
  //       fireworks.launch(1);
  //       i++;
  //     }
  //   }, 300);
  // };

  createEffect(() => {
    if(gameType === "team"){
      setLineWidth(reel().offsetWidth);
    }else{
      setLineWidth(reel().offsetWidth - 42);
    }
  });

  return (
    <div
      id="slot-screen"
      class="relative gap-2 w-full h-full flex flex-col 
      items-center justify-center overflow-hidden font-SpaceGrotesk"
    >
      <div class={`overflow-y-hidden w-full overflow-x-hidden`}>
        <div
          id="reels"
          ref={setReel}
          class={`relative
              flex flex-col
              transition-all 
              w-full

              `}
          style={`transform: translateY(${translateY() - topIndex()}px);
            transition-timing-function: ${timingFunction()};
            transition-duration: ${spinTime() * timeMultiplier()}s;
                `}
        >
          <For each={spinLists()[spinnerIndex]}>
            {(item, index) => (
              <div
                ref={setReelItem}
                class={`h-32 flex flex-col gap-2 text-3xl 
                transition-all duration-500 items-center
                 ${
                   spinComplete()
                     ? index() === spinIndexes()[spinnerIndex]
                       ? "scale-125 -translate-y-8"
                       : "scale-0"
                     : null
                 }`}
                data-reel-item
              >
                <div class="relative z-10 flex">
                {/* {spinnerIndex === 0 &&  <ObserverItem />}  */}
                 
                  <img
                    class={`h-24 z-20 transition-all duration-500`}
                    src={item.img}
                    ref={setImgItem}
                    alt={item.name}
                  />
                  <img
                    src={bglogos[item.rarity]}
                    alt={item.rarity + " glow"}
                    class="absolute z-10 scale-[1.4]"
                  />
                </div>
                <div
                  class={`flex flex-col items-center justify-center 
                  transition-all duration-500 overflow-visible h-min
                  ${
                    spinComplete() && index() === spinIndexes()[spinnerIndex]
                      ? "scale-1"
                      : "scale-0"
                  } `}
                >
                  <div class="text-[#A2A5C6] text-14 font-semibold">{item.name}</div>
                  <div class="flex  items-center justify-center gap-1">
                      <Coin width="5"/>
                      <GoldText text={getCurrencyString(item.price)} size="13"/>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <img
        src={
          lineColor === "yellow"
            ? "/assets/caseLineHorizontal.svg"
            : lineColor === "blue"
            ? "/assets/caseLineHorizontalBlue.svg"
            : "/assets/caseLineHorizontalGreen.svg"

        }
        alt="caseline"
        class={`absolute h-32  self-center transition-opacity duration-500
          ${spinComplete() ? "opacity-30" : "opacity-100"}`}
        style={{
          width: lineWidth() + "px",
        }}
      />
      <div
        class={`absolute self-center h-20 w-20
         -bottom-2`}
        ref={setConfettiCannonRefA}
      />
      {/* <div
        class={`absolute self-center w-max h-full overflow-visible
         -bottom-2`}
        ref={setFireworksContainer}
      ></div> */}
    </div>
  );
};

export default BattleSpinnerReel;
