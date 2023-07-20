import {For, Match, Switch, createEffect, createSignal} from "solid-js";

import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";

import bglogo_gold from "../../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../../assets/img/case-battles/bglogo_gray.png";

import CoinStack from "../../../assets/img/case-battles/CoinStack.png";
import {getCurrencyString} from "../../mines_new/utils/tools";
import GoldText from "../../shared/GoldText";
import CaseLineMobile from "../../../assets/img/case/caselinemobile.svg";
import CaseLineMobileRight from "../../../assets/img/case/caselinemobileright.svg";

import {useSpinnerStatus} from "../../../utilities/hooks/spinnerStatus";

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceVertical;

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const SpinnerReelVerticalMobile = (props) => {
  const [timeMultiplier, setTimeMultiplier] = createSignal(1);
  createEffect(() => {
    if (props.isFastSpin) {
      setTimeMultiplier(spinnerTimings.fastSpinMultiplier);
    } else {
      setTimeMultiplier(1);
    }
  });

  // createEffect(() => {
  //   if (spinLists()) {
  //     setReelItem(() => document.querySelector('[data-reel-item]'))
  //   }
  //   console.log(spinLists(), 'spinLISTS')
  // })

  const [reelItem, setReelItem] = createSignal();
  const [imgItem, setImgItem] = createSignal();
  const [reel, setReel] = createSignal();

  const calculateTopIndexOffset = () => {
    setReelItem(() => document.querySelector("[data-reel-item]"));
    const getCurrentRatio = props.spinLists().length > 2 ? 4 : 2;

    const referencePoint = props.containerRef().offsetHeight / getCurrentRatio;
    const itemHeight = reelItem().offsetHeight;
    const imgHeight = imgItem().offsetHeight;
    return referencePoint - itemHeight - imgHeight / 2;
  };

  const [timingFunction, setTimingFunction] = createSignal(
    // "cubic-bezier(.48,.84,.49,1)"
    "cubic-bezier(.2,1,.53,1)"
    // "cubic-bezier(.2,.96,.24,.99)"
  );

  // const [spinComplete, setSpinComplete] = createSignal(false);

  // let hasSpun = false;

  const {getStatus} = useSpinnerStatus();

  createEffect(() => {
    if (getStatus() === "spinning") {
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
  };

  const getOffsetCorrection = () => {
    const itemHeight = reelItem().offsetHeight;
    let moveAmount = (props.spinIndex - 1) * itemHeight;
    setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");

    return moveAmount;
  };

  // const correctForOffset = (index) => {
  //   const itemHeight = reelItem().offsetHeight;
  //   let moveAmount = (index - 1) * itemHeight;

  //   setSpinTime(spinnerTimings.verticalSnapBack);
  //   setTimeMultiplier(1);
  //   setTimingFunction("cubic-bezier(0.25, 1, 0.5, 1)");

  //   setTopIndex(moveAmount);

  //   props.setBeginPullBackSound(true);

  //   setTimeout(() => {
  //     setSpinComplete(true);

  //     if (props.isConfettiWin) {
  //       createConfetti();
  //       props.setBeginWinSound(true);
  //     }

  //     setTimeout(() => {
  //       hasSpun = false;
  //       setIsRolling(false);
  //     }, 500);
  //   }, 500);
  // };

  const withinOtherReelBounds = (newOffset) => {
    for (let i = 0; i < props.spinOffsets().length; i++) {
      const currOffset = props.spinOffsets()[i];

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
    const newOffsets = props.spinOffsets();
    if (landInMiddle) {
      let newOffset =
        itemHeight / 2 - props.randomFunction() * 0.1 * itemHeight;

      if (withinOtherReelBounds(newOffset)) {
        newOffset = itemHeight / 2 - props.randomFunction() * 0.1 * itemHeight;
      }

      newOffsets.push(newOffset);
      props.setSpinOffsets(newOffsets);

      return newOffset;
    }
    const newOffset =
      Math.floor((props.randomFunction() * 0.95 + 0.05) * itemHeight) / 2;

    newOffsets.push(newOffset);
    props.setSpinOffsets(newOffsets);
    return newOffset;
  };

  const [spinnerKeyframes, setSpinnerKeyframes] = createSignal(``);
  const [totalTime, setTotalTime] = createSignal(0);

  createEffect(() => {
    const timings = {
      initialSpin: 3.85 * timeMultiplier(), // 70
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
        0% { transform: translateY(0px);}
        ${(seventy / totalTime()) * 100}% { transform: translateY(${
        calculateTopIndexOffset() - initialMoveAmount()
      }px);}
        ${(seventyEight / totalTime()) * 100}% {transform: translateY(${
        calculateTopIndexOffset() - getOffsetCorrection()
      }px);}
        ${(eightyThree / totalTime()) * 100}% {transform: translateY(${
        calculateTopIndexOffset() - getOffsetCorrection()
      }px);}
        100% {transform: translateY(${
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
        0% { transform: scale(1); }
        ${(eightyThree / totalTime()) * 100}% { transform: scale(1);}
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
      class="relative gap-2 w-full h-[264px] flex flex-col items-center justify-center overflow-hidden"
      classList={{
        "border-r-[2px] border-black/20": !(props.spinnerIndex % 2),
        "horisontal-borders-right rounded-tr-8 rounded-br-8":
          (props.spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
          (props.spinLists().length === 3 && props.spinnerIndex % 2),
        "horisontal-borders-left rounded-tl-8 rounded-bl-8":
          (props.spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
          (props.spinLists().length === 3 &&
            !(props.spinnerIndex % 2) &&
            !(props.spinLists().length === 3 && props.spinnerIndex === 2)),
        "horisontal-borders rounded-8":
          props.spinLists().length === 3 && props.spinnerIndex === 2,
      }}
      style={{
        background:
          "linear-gradient(90deg, rgba(118, 124, 255, 0.00) 0%, rgba(118, 124, 255, 0.12) 50.00%, rgba(118, 124, 255, 0.00) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), radial-gradient(226.07% 93.40% at 60.38% 107.30%, #1F2344 0%, #23253D 100%)",
      }}
    >
      <style>{spinnerKeyframes()}</style>
      <Switch>
        <Match
          when={
            (props.spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
            (props.spinLists().length === 3 && props.spinnerIndex === 0)
          }
        >
          <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
        </Match>
        <Match
          when={
            (props.spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
            (props.spinLists().length === 3 && props.spinnerIndex % 2)
          }
        >
          <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
        </Match>
        <Match
          when={props.spinLists().length === 3 && props.spinnerIndex === 2}
        >
          <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
          <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
        </Match>
      </Switch>
      <div class={`overflow-y-hidden w-full overflow-x-hidden`}>
        <div
          id="reels"
          ref={setReel}
          class={`relative flex flex-col transition-all w-full`}
          // eslint-disable-next-line solid/style-prop
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
                  class={`h-[95px] flex flex-col gap-1 text-3xl transition-all duration-500 items-center`}
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
                  data-reel-item
                >
                  <div
                    class="relative z-10 flex"
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
                        class={`h-[80px] z-20 transition-all duration-500`}
                        src={item.img}
                        ref={setImgItem}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        class={`h-[80px] z-20 transition-all duration-500`}
                        src={item.img}
                        alt={item.name}
                      />
                    )}
                    <img
                      src={bglogos[item.rarity]}
                      alt={item.rarity + " glow"}
                      class="absolute z-10 scale-1"
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
                        "animation-duration": `${totalTime()}s`,
                        "animation-timing-function":
                          "cubic-bezier(0.25, 1, 0.5, 1)",
                        "animation-fill-mode": "forwards",
                      }}
                    >
                      <div class="text-[#A2A5C6] text-14 font-semibold">
                        {item.name}
                      </div>
                      <div class="flex  items-center justify-center gap-1">
                        <img src={CoinStack} alt="" />
                        <GoldText
                          text={getCurrencyString(item.price)}
                          size="13"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </For>
          ) : (
            <div ref={setReelItem} data-reel-item class="h-[49px]">
              <div class={`h-[80px] w-2`} ref={setImgItem} />
            </div>
          )}
        </div>
      </div>
      <Switch>
        <Match
          when={
            (props.spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
            (props.spinLists().length === 3 &&
              (props.spinnerIndex === 0 || props.spinnerIndex === 2))
          }
        >
          <img
            src={CaseLineMobile}
            alt="caseline"
            class={`absolute w-full left-3 transition-all duration-500 `}
            style={{
              "animation-name": `caseLineAnimation`,
              "animation-duration": `${totalTime()}s`,
              "animation-timing-function": "cubic-bezier(.2,1,.53,1)",
              "animation-fill-mode": "forwards",
            }}
          />
        </Match>
        <Match
          when={
            (props.spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
            (props.spinLists().length === 3 && props.spinnerIndex % 2)
          }
        >
          <img
            src={CaseLineMobileRight}
            alt="caseline"
            class={`right-3 absolute w-full  transition-all duration-500`}
            style={{
              "animation-name": `caseLineAnimation`,
              "animation-duration": `${totalTime()}s`,
              "animation-timing-function": "cubic-bezier(.2,1,.53,1)",
              "animation-fill-mode": "forwards",
            }}
          />
        </Match>
      </Switch>
      <div
        class="absolute left-0 top-0 w-full h-[47px]"
        style={{
          background:
            "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
        }}
      />
      <div
        class="absolute left-0 bottom-0 w-full h-[47px]"
        style={{
          background:
            "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
          transform: "matrix(-1, 0, 0, -1, 0, 0)",
        }}
      />
      {props.spinnerIndex === 0
        ? () => {
            return (
              <>
                <div
                  class="absolute w-1 h-1 bg-white opacity-[0.01]"
                  ref={props.setToIntersectA}
                  style={{
                    "animation-name": `confettiAnimation`,
                    "animation-duration": `${totalTime()}s`,
                    "animation-timing-function": "linear",
                    "animation-fill-mode": "forwards",
                  }}
                />
              </>
            );
          }
        : null}
    </div>
  );
};

export default SpinnerReelVerticalMobile;
