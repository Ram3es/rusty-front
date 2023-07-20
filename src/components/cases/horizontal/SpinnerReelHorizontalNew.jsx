import {For, createSignal, createEffect} from "solid-js";
import confetti from "canvas-confetti";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";

import bglogo_gold from "../../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../../assets/img/case-battles/bglogo_gray.png";

import Coin from "../../../utilities/Coin";
import CaseLineYellow from "../../../assets/img/case-battles/caseLineHorizontal.svg";

import {useSpinnerStatus} from "../../../utilities/hooks/spinnerStatus";

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceHorizontal;

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const SpinnerReelHorizontal = (props) => {
  const [timeMultiplier, setTimeMultiplier] = createSignal(1);
  createEffect(() => {
    if (props.isFastSpin) {
      setTimeMultiplier(spinnerTimings.fastSpinMultiplier);
    } else {
      setTimeMultiplier(1);
    }
  });

  const [reel, setReel] = createSignal();
  const [reelItem, setReelItem] = createSignal();
  const [imgItem, setImgItem] = createSignal();
  const [lineHeight, setLineHeight] = createSignal(0);

  const calculateTopIndexOffset = () => {
    // setReelItem(() => document.querySelector("[data-reel-item]"));
    const referencePoint = props.containerRef()?.offsetWidth / 2;
    // const reelWidth = reel()?.offsetWidth;
    const itemWidth = reelItem()?.offsetWidth;
    // const imgWidth = imgItem().offsetWidth;
    return referencePoint - itemWidth - itemWidth / 2;
  };

  // const [spinTime, setSpinTime] = createSignal(
  //   spinnerTimings.horizontalInitialSpin
  // );
  // const [timingFunction, setTimingFunction] = createSignal(
  //   // "cubic-bezier(.48,.84,.49,1)"
  //   "cubic-bezier(.2,1,.53,1)"
  //   // "cubic-bezier(.2,.96,.24,.99)"
  //   // "cubic-bezier(.09,.99,.09,.99)"
  // );
  // const [spinComplete, setSpinComplete] = createSignal(false);
  const {getStatus} = useSpinnerStatus();

  createEffect(() => {
    if (getStatus() === "spinning") {
      moveToIndex();
    }
  });

  const [initialMoveAmount, setInitialMoveAmount] = createSignal(0);

  const moveToIndex = () => {
    const itemHeight = reelItem()?.offsetWidth;
    let moveAmount = (props.spinIndex - 1) * itemHeight;
    const spinOffSet = getSpinOffSet();
    const positiveOffSet = Math.floor(props.randomFunction() * 2);
    if (positiveOffSet) {
      moveAmount += spinOffSet;
    } else {
      moveAmount -= spinOffSet;
    }

    setInitialMoveAmount(moveAmount);
    // setTopIndex(moveAmount);
    // setBeginClickSound(true);
    // setTimeout(() => {
    //   setTimeout(() => {
    //     correctForOffset(index);
    //   }, 200);
    // }, spinnerTimings.horizontalInitialSpin * 1000 * timeMultiplier());
  };

  // const correctForOffset = () => {
  //   const itemHeight = reelItem?.offsetWidth;
  //   let moveAmount = (props.spinIndex - 1) * itemHeight;
  //   setSpinTime(spinnerTimings.horizontalSnapBack);
  //   setTimeMultiplier(1);
  //   setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");
  //   setTopIndex(moveAmount + 3);
  //   setBeginPullBackSound(true);
  //   setTimeout(() => {
  //     setReelsSpinning(false);

  //     setSpinComplete(true);
  //     if (isConfettiWin) {
  //       createConfetti();
  //       setBeginWinSound(true);
  //     }
  //     setTimeout(() => {
  //       hasSpun = false;
  //       setIsRolling(false);
  //     }, 500);
  //   }, 500);
  // };

  const getOffsetCorrection = () => {
    const itemWidth = reelItem()?.offsetWidth;
    let moveAmount = (props.spinIndex - 1) * itemWidth;
    return moveAmount;
  };

  const getSpinOffSet = () => {
    const itemHeight = reelItem()?.offsetWidth;
    const landInMiddle = props.randomFunction() <= LAND_IN_MIDDLE_CHANCE;
    if (landInMiddle) {
      let newOffset =
        itemHeight / 2 - props.randomFunction() * 0.1 * itemHeight;
      return newOffset;
    }
    const newOffset =
      Math.floor((props.randomFunction() * 0.95 + 0.05) * itemHeight) / 2;
    return newOffset;
  };

  createEffect(() => {
    setLineHeight(reel().offsetHeight - 46);
  });

  const [spinnerKeyframes, setSpinnerKeyframes] = createSignal(``);
  const [totalTime, setTotalTime] = createSignal(0);

  createEffect(() => {
    const timings = {
      initialSpin: 5.85 * timeMultiplier(), // 70
      snapback: 0.4565, // 78.3
      snapbackHold: 0.2585, // 83
      items: 0.4785, // 91.7
      confettiHold: 0.33, // 83.6
      confettiVisible: 0.055, // 83.7
      confettiVisibleHold: 0.11, // 85.7
      confettiExit: 0.055, // 85.8
    };
    setTotalTime(
      timings.initialSpin +
        timings.snapback +
        timings.snapbackHold +
        timings.items +
        timings.confettiHold +
        timings.confettiVisible +
        timings.confettiVisibleHold
    );

    const seventy = timings.initialSpin;
    const seventyEight = seventy + timings.snapback;
    const eightyThree = seventyEight + timings.snapbackHold;
    const ninetyOne = eightyThree + timings.items;

    const confettiEightyThreeSix = eightyThree + timings.confettiHold;
    const confettiEightyThreeSeven =
      confettiEightyThreeSix + timings.confettiVisible;
    const confettiEightyFiveSeven =
      confettiEightyThreeSeven + timings.confettiVisibleHold;
    const confettiEightyFiveEight =
      confettiEightyFiveSeven + timings.confettiExit;

    if (initialMoveAmount() !== 0) {
      setSpinnerKeyframes(`
      @keyframes spinnerAnimation${props.spinnerIndex} {
        0% { transform: translateX(0px);}
        ${(seventy / totalTime()) * 100}% { transform: translateX(${
        calculateTopIndexOffset() - initialMoveAmount()
      }px);}
        ${(seventyEight / totalTime()) * 100}% {transform: translateX(${
        calculateTopIndexOffset() - getOffsetCorrection()
      }px);}
        ${(eightyThree / totalTime()) * 100}% {transform: translateX(${
        calculateTopIndexOffset() - getOffsetCorrection()
      }px);}
        100% {transform: translateX(${
          calculateTopIndexOffset() - getOffsetCorrection()
        }px);}
      }

      @keyframes caseLineAnimation {
        0% { opacity: 1; }
        ${(eightyThree / totalTime()) * 100}% { opacity: 1;}
        ${(ninetyOne / totalTime()) * 100}% {opacity: 0.3;}
        100% {opacity: 0.3;}
      }

      @keyframes winItemAnimation {
        0% { transform: scale(1)  translateY(0); }
        ${
          (eightyThree / totalTime()) * 100
        }% { transform: scale(1)  translateY(0);}
        ${
          (ninetyOne / totalTime()) * 100
        }% {transform: scale(1.25) translateY(-2rem);}
        100% {transform: scale(1.25) translateY(-2rem);}
      }

      @keyframes otherItemAnimation {
        0% { transform: scale(1); opacity: 1;}
        ${
          (eightyThree / totalTime()) * 100
        }% { transform: scale(1); opacity: 1;}
        ${(ninetyOne / totalTime()) * 100}% {transform: scale(0); opacity: 0;}
        100% {transform: scale(0); opacity: 0;}
      }

      @keyframes textAnimation {
        0% { transform: scale(0); }
        ${(eightyThree / totalTime()) * 100}% { transform: scale(0);}
        ${(ninetyOne / totalTime()) * 100}% {transform: scale(1);}
        100% {transform: scale(1);}
      }

      @keyframes confettiAnimation {
        0% { top: 150vh; }
        ${(confettiEightyThreeSix / totalTime()) * 100}% { top: 150vh;}
        ${(confettiEightyThreeSeven / totalTime()) * 100}% {top: 0;}
        ${(confettiEightyFiveSeven / totalTime()) * 100}% {top: 0;}
        ${(confettiEightyFiveEight / totalTime()) * 100}% {top: 150vh;}
        100% {top: 150vh;}
      }

      @keyframes winItemBounceAnimation {
        0% {transform: translateY(0px);}
        50% {transform: translateY(-10px);}
        100% {transform: translateY(0px);}
      }
        `);
    }
  });

  return (
    <div
      id="slot-screen"
      class="relative gap-2 w-full h-full flex flex-col 
       justify-center items-start"
    >
      <style>{spinnerKeyframes()}</style>
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
          style={{
            "animation-name": `${`spinnerAnimation${props.spinnerIndex}`}`,
            "animation-duration": `${totalTime()}s`,
            "animation-timing-function": "cubic-bezier(.2,1,.53,1)",
            "animation-fill-mode": "forwards",
          }}
        >
          {props.spinList.length > 0 ? (
            <For each={props.spinList}>
              {(item, index) => (
                <div
                  ref={setReelItem}
                  class={`w-32 flex flex-col gap-2 text-3xl 
                transition-all duration-500 items-center justify-center
                `}
                  style={{
                    "animation-name": `${
                      index() === props.spinIndex
                        ? "winItemAnimation"
                        : "otherItemAnimation"
                    }`,
                    "animation-duration": `${totalTime()}s`,
                    "animation-timing-function":
                      "cubic-bezier(0.25, 1, 0.5, 1)",
                    "animation-fill-mode": "forwards",
                  }}
                >
                  <div
                    class="relative z-10 flex flex-col"
                    style={{
                      animation: `1s ease-in-out ${
                        props.isFastSpin
                          ? totalTime() - totalTime() * 0.3
                          : totalTime() - totalTime() * 0.15
                      }s infinite normal forwards running ${
                        index() === props.spinIndex && "winItemBounceAnimation"
                      }`,
                    }}
                  >
                    {index() === 0 ? (
                      <img
                        src={item.img}
                        ref={setImgItem}
                        alt={item.name}
                        class={`h-[71px] md:h-24 z-20`}
                      />
                    ) : (
                      <img
                        src={item.img}
                        alt={item.name}
                        class={`h-[71px] md:h-24 z-20`}
                      />
                    )}

                    <img
                      src={bglogos[item.rarity]}
                      alt={item.rarity + " glow"}
                      class="absolute z-10 md:scale-[1.6]"
                    />
                  </div>
                  {index() === props.spinIndex && (
                    <div
                      class={`absolute top-3/4 font-[lato] flex flex-col items-center 
                  transition-all duration-500 overflow-visible gap-[4px] -translate-y-1/2
                  `}
                      style={{
                        "animation-name": `${
                          index() === props.spinIndex && "textAnimation"
                        }`,
                        "animation-duration": `${totalTime()}s`,
                        "animation-timing-function":
                          "cubic-bezier(0.25, 1, 0.5, 1)",
                        "animation-fill-mode": "forwards",
                      }}
                    >
                      <div class="text-gray-a2 font-SpaceGrotesk truncate font-bold text-13 leading-[13px]">
                        {item.name}
                      </div>
                      <div class="flex gap-1.5">
                        <Coin width="5" />
                        <span class="font-bold text-sm potential-drop--price">
                          {Number(item.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </For>
          ) : (
            <div ref={setReelItem} data-reel-item class="w-32">
              <div class={`h-[71px] md:h-24`} ref={setImgItem} />
            </div>
          )}
        </div>
      </div>
      {/* <div
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
      ></div> */}
      <div class="scale-[0.6] md:scale-[1.0] -mt-2 md:-mt-0 arrow-down absolute left-1/2 top-0.5 -translate-x-1/2" />
      <div class="scale-[0.6] md:scale-[1.0] -mb-2 md:-mb-0 arrow-down absolute left-1/2 bottom-0.5 -translate-x-1/2 rotate-180" />
      <div
        class="hidden lg:block absolute right-0 top-0 h-full w-[186px]"
        style={{
          background:
            "linear-gradient(270deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
        }}
      />
      <div
        class="hidden lg:block absolute left-0 top-0 h-full w-[186px]"
        style={{
          background:
            "linear-gradient(270deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
          transform: "matrix(-1, 0, 0, 1, 0, 0)",
        }}
      />
      <img
        src={CaseLineYellow}
        alt="caseline"
        class={`absolute h-full   self-center rotate-90`}
        style={{
          width: `${lineHeight()}px`,
          "animation-name": `caseLineAnimation`,
          "animation-duration": `${totalTime()}s`,
          "animation-timing-function": "cubic-bezier(.2,1,.53,1)",
          "animation-fill-mode": "forwards",
        }}
      />
      <div
        class="fixed w-1 h-1 bg-white opacity-[0.01]"
        ref={props.setToIntersectA}
        style={{
          "animation-name": `confettiAnimation`,
          "animation-duration": `${totalTime()}s`,
          "animation-timing-function": "linear",
          "animation-fill-mode": "forwards",
        }}
      />
    </div>
  );
};

export default SpinnerReelHorizontal;
