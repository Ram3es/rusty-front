import {For, createSignal, createEffect} from "solid-js";
import {
  containerRef,
  reelsSpinning,
  spinIndex,
  spinList,
  spinOffsets,
  setReelsSpinning,
} from "./SpinnersContainerHorizontal";
import confetti from "canvas-confetti";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";

import bglogo_gold from "../../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../../assets/img/case-battles/bglogo_gray.png";

import {setIsRolling} from "../../../views/unbox/CaseUnboxing";
import Coin from "../../../utilities/Coin";

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceHorizontal;

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const [timeMultiplier, setTimeMultiplier] = createSignal(1);

const SpinnerReelHorizontal = ({
  spinnerIndex,
  isConfettiWin,
  isFastSpin,
  setBeginClickSound,
  setBeginPullBackSound,
  setBeginWinSound,
}) => {
  let reelItem;
  let imgItem;
  createEffect(() => {
    if (isFastSpin) {
      setTimeMultiplier(spinnerTimings.fastSpinMultiplier);
    } else {
      setTimeMultiplier(1);
    }
  });
  const [reel, setReel] = createSignal();

  const [topIndex, setTopIndex] = createSignal(0);
  const [translateY, setTranslateY] = createSignal(0);

  const [confettiOffset, setConfettiOffset] = createSignal(0);

  createEffect(() => {
    setConfettiOffset(containerRef().offsetWidth / 2 + 128);
  });

  const calculateTopIndexOffset = () => {
    const referencePoint = containerRef()?.offsetWidth / 2;
    const reelWidth = reel()?.offsetWidth;
    const itemWidth = reelItem?.offsetWidth;
    const imgWidth = imgItem?.offsetWidth;
    return referencePoint - itemWidth - itemWidth / 2;
  };

  const [spinTime, setSpinTime] = createSignal(
    spinnerTimings.horizontalInitialSpin
  );
  const [timingFunction, setTimingFunction] = createSignal(
    // "cubic-bezier(.48,.84,.49,1)"
    "cubic-bezier(.2,1,.53,1)"
    // "cubic-bezier(.2,.96,.24,.99)"
    // "cubic-bezier(.09,.99,.09,.99)"
  );
  const [spinComplete, setSpinComplete] = createSignal(false);

  let hasSpun = false;
  createEffect(() => {
    // console.log(reelsSpinning());
    if (reelsSpinning() && !hasSpun) {
      hasSpun = true;
      setTranslateY(calculateTopIndexOffset());
      moveToIndex(spinIndex());
    }
  });

  const moveToIndex = (index) => {
    const itemHeight = reelItem?.offsetWidth;
    let moveAmount = (index - 1) * itemHeight;
    const spinOffSet = getSpinOffSet();
    const positiveOffSet = Math.floor(Math.random() * 2);
    if (positiveOffSet) {
      moveAmount += spinOffSet;
    } else {
      moveAmount -= spinOffSet;
    }
    setTopIndex(moveAmount);
    setBeginClickSound(true);
    setTimeout(() => {
      setTimeout(() => {
        correctForOffset(index);
      }, 200);
    }, spinnerTimings.horizontalInitialSpin * 1000 * timeMultiplier());
  };

  const correctForOffset = (index) => {
    const itemHeight = reelItem?.offsetWidth;
    let moveAmount = (index - 1) * itemHeight;
    setSpinTime(spinnerTimings.horizontalSnapBack);
    setTimeMultiplier(1);
    setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");
    setTopIndex(moveAmount + 3);
    setBeginPullBackSound(true);
    setTimeout(() => {
      setReelsSpinning(false);

      setSpinComplete(true);
      if (isConfettiWin) {
        createConfetti();
        setBeginWinSound(true);
      }
      setTimeout(() => {
        hasSpun = false;
        setIsRolling(false);
      }, 500);
    }, 500);
  };

  const getSpinOffSet = () => {
    const itemHeight = reelItem?.offsetWidth;
    const landInMiddle = Math.random() <= LAND_IN_MIDDLE_CHANCE;
    if (landInMiddle) {
      console.log("land in middle");
      let newOffset = itemHeight / 2 - Math.random() * 0.1 * itemHeight;
      spinOffsets().push(newOffset);
      return newOffset;
    }
    const newOffset =
      Math.floor((Math.random() * 0.95 + 0.05) * itemHeight) / 2;
    spinOffsets().push(newOffset);
    return newOffset;
  };

  const [confettiActive, setConfettiActive] = createSignal(false);
  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();

  const createConfetti = () => {
    if (!confettiActive()) {
      setConfettiActive(true);

      const rectA = confettiCannonRefA()?.getBoundingClientRect();
      const rectB = confettiCannonRefB()?.getBoundingClientRect();
      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;
      const xB = (rectB.left + rectB.right) / 2 / window.innerWidth;
      const yB = (rectB.top + rectB.bottom) / 2 / window.innerHeight;

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

      const color = spinList()[spinIndex()].rarity;
      const ticks = 70;

      const confettiInterval = setInterval(() => {
        confetti({
          particleCount,
          spread,
          origin: {x: xA, y: yA},
          angle: 60,
          startVelocity,
          colors: ["#FFFFFF", colorCodes[color]],
          ticks,
        });
        confetti({
          particleCount,
          spread,
          origin: {x: xB, y: yB},
          angle: 120,
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

  return (
    <div
      id="slot-screen"
      class="relative gap-2 w-full h-full flex flex-col 
       justify-center items-start"
    >
      <div class={`overflow-hidden h-full`}>
        <div
          id="reels"
          ref={setReel}
          class={`relative
              flex flex-row
              transition-all 
              w-full
              h-full
              overflow-hidden
              `}
          style={`transform: translateX(${translateY() - topIndex()}px);
            transition-timing-function: ${timingFunction()};
            transition-duration: ${spinTime() * timeMultiplier()}s;
                `}
        >
          <For each={spinList()}>
            {(item, index) => (
              <div
                ref={reelItem}
                class={`w-32 flex flex-col gap-2 text-3xl 
                transition-all duration-500 items-center justify-center
                translate-y-[28px]
                 ${
                   spinComplete()
                     ? index() === spinIndex()
                       ? "scale-110 -translate-y-4"
                       : "opacity-40 grayscale"
                     : null
                 }`}
              >
                <div class="relative z-10 flex flex-col">
                  {/* <div class="absolute ">{index()}</div> */}
                  <img
                    src={item.img}
                    ref={imgItem}
                    alt={item.name}
                    class={`${
                      spinComplete()
                        ? index() === spinIndex()
                          ? "animate-bounce"
                          : ""
                        : null
                    } h-24 z-20`}
                  />
                  <img
                    src={bglogos[item.rarity]}
                    alt={item.rarity + " glow"}
                    class="absolute z-10 scale-[1.6]"
                  />
                </div>
                <div
                  class={`relative font-[lato] flex flex-col items-center 
                  transition-all duration-500 overflow-visible gap-[4px]
                  ${
                    spinComplete() && index() === spinIndex()
                      ? "scale-1"
                      : "scale-0"
                  } `}
                >
                  <div class="text-gray-a2 font-SpaceGrotesk font-bold text-13 leading-[13px]">
                    {item.name}
                  </div>
                  <div class="flex gap-1.5">
                    <Coin width="5" />
                    <span class="font-bold text-sm potential-drop--price">
                      {Number(item.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        class={`absolute bottom-0 self-center h-20 w-20 
         `}
        style={`
        right: ${confettiOffset()}px;`}
        ref={setConfettiCannonRefA}
      ></div>
      <div
        class={`absolute bottom-0 self-center h-20 w-20 
         `}
        style={`
        left: ${confettiOffset()}px;`}
        ref={setConfettiCannonRefB}
      ></div>
      <div class="arrow-down absolute left-1/2 top-0.5 -translate-x-1/2" />
      <div class="arrow-down absolute left-1/2 bottom-0.5 -translate-x-1/2 rotate-180" />
      <div
        class="absolute right-0 top-0 h-full w-[186px]"
        style={{
          background:
            "linear-gradient(270deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
        }}
      />
      <div
        class="absolute left-0 top-0 h-full w-[186px]"
        style={{
          background:
            "linear-gradient(270deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
          transform: "matrix(-1, 0, 0, 1, 0, 0)",
        }}
      />
      <img
        src="assets/caseline.svg"
        alt="caseline"
        class={`absolute h-[280px] w-32 transition-all duration-500 self-center
          ${spinComplete() ? "opacity-30" : "opacity-100"}
        `}
      />
    </div>
  );
};

export default SpinnerReelHorizontal;
