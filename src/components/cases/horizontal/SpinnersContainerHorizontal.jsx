import {createSignal, createEffect, onCleanup} from "solid-js";
import SpinnerReelHorizontal from "./SpinnerReelHorizontalNew";
import {spinReelsTrigger, setSpinReelsTrigger} from "../store";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";
import {isFastAnimation, setIsRolling} from "../../../views/unbox/CaseUnboxing";
import {useSpinnerStatus} from "../../../utilities/hooks/spinnerStatus";
import confetti, {create} from "canvas-confetti";

// import {
//   playCaseBattlesSound,
//   playCaseBattlesConfettiSound,
// } from "../../../utilities/Sounds/SoundButtonClick";

export const [containerRef, setContainerRef] = createSignal();

const SpinnersContainerHorizontal = (props) => {
  const [spinIndex, setSpinIndex] = createSignal();
  const [spinList, setSpinList] = createSignal([]);
  const [containsBigWin, setContainsBigWin] = createSignal(false);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);
  const {changeStatus} = useSpinnerStatus();
  const [confettiData, setConfettiData] = createSignal();
  const [isFastSpin, setIsFastSpin] = createSignal(false);
  const [confettiCanvas, setConfettiCanvas] = createSignal(null);

  const generateSpinData = () => {
    const spinIndex = getRandomIndex();
    let spinList = generateSpinList();
    spinList[spinIndex] = props.spinnerOptions()[0].winningItem;
    if (props.spinnerOptions()[0].isBigWin) {
      setContainsBigWin(true);
    }
    if (props.spinnerOptions()[0].isConfettiWin) {
      setContainsConfettiWin(true);
    }

    setSpinIndex(spinIndex);
    setSpinList(spinList);
  };

  // const generateSpinList = () => {
  //   console.log(props.caseItemList());
  //   const newSpinList = [];
  //   for (let i = 0; i < otherOptions.horizontalEndBound + 10; i++) {
  //     newSpinList.push(
  //       props.caseItemList()[
  //         Math.floor(Math.random() * props.caseItemList().length)
  //       ]
  //     );
  //   }
  //   return newSpinList;
  // };
  const generateSpinList = () => {
    const newSpinList = [];
    const caseItems = props.caseItemList();
    const totalChance = caseItems.reduce(
      (total, item) => total + item.chance,
      0
    );

    for (let i = 0; i < otherOptions.horizontalEndBound + 10; i++) {
      const randomValue = Math.random() * totalChance;
      let accumulatedChance = 0;
      for (const item of caseItems) {
        accumulatedChance += item.chance;
        if (randomValue <= accumulatedChance) {
          newSpinList.push(item);
          break;
        }
      }
    }

    return newSpinList;
  };

  const getRandomIndex = () => {
    return (
      Math.floor(
        Math.random() *
          (otherOptions.horizontalEndBound -
            otherOptions.horizontalStartBound +
            1)
      ) + otherOptions.horizontalStartBound
    );
  };

  const spinReels = () => {
    resetValues();
    generateSpinData();
    setIsFastSpin(isFastAnimation());
    changeStatus("spinning");
  };

  const resetValues = () => {
    setContainsBigWin(false);
    setContainsConfettiWin(false);
    setSpinIndex(null);
    setSpinList([]);
    setConfettiFired(false);
  };

  createEffect(() => {
    if (spinReelsTrigger.triggered) {
      setTimeout(() => {
        spinReels();
        setSpinReelsTrigger({triggered: false});
      }, 0);
    }
  });

  const [toIntersectA, setToIntersectA] = createSignal();
  const [isIntersectingA, setIsIntersectingA] = createSignal(false);

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
  });

  const [confettiFired, setConfettiFired] = createSignal(false);
  createEffect(() => {
    if (isIntersectingA()) {
      if (!confettiFired()) {
        // setLastAction({type: "activate", round: game().currentRound});
        setIsRolling(false);
        changeStatus("inactive");

        createConfetti();
      }
    }
  });

  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();

  const createConfetti = () => {
    if (!confettiFired()) {
      setConfettiFired(true);
      if (containsConfettiWin()) {
        fireCannon(
          confettiCannonRefA(),
          props.spinnerOptions()[0].winningItem,
          45
        );
        fireCannon(
          confettiCannonRefB(),
          props.spinnerOptions()[0].winningItem,
          135
        );
      }
    }
    setConfettiData();
  };

  createEffect(() => {
    if (confettiCanvas()) {
      confettiCanvas().confetti =
        confettiCanvas().confetti || create(confettiCanvas(), {resize: true});
    }
  });

  const getColor = (item_price) => {
    const color =
      item_price > 1000 * 100
        ? "gold"
        : item_price > 1000 * 30
        ? "red"
        : item_price > 1000 * 10
        ? "purple"
        : item_price > 1000 * 2
        ? "blue"
        : "gray";
    return color;
  };

  const fireCannon = (ref, item, angle) => {
    if (item) {
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
      const startVelocity = 35;
      const colorCodes = {
        purple: "#9c27b0",
        gold: "#ffeb3b",
        red: "#f44336",
        blue: "#2196f3",
        gray: "#9e9e9e",
      };
      const color = getColor(item.price);
      const ticks = 70;

      const end = Date.now() + 0.095 * 1000;

      (function frame() {
        confettiCanvas().confetti({
          particleCount,
          spread,
          origin: {x: normalizedXA, y: normalizedYA},
          colors: ["#FFFFFF", colorCodes[color]],
          startVelocity,
          angle,
          ticks,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  const [spinner, setSpinner] = createSignal();
  createEffect(() => {
    if (spinList().length > 0) {
      setSpinner(
        <>
          <SpinnerReelHorizontal
            spinnerIndex={0}
            isConfettiWin={props.spinnerOptions()[0].isConfettiWin}
            isBigWin={props.spinnerOptions()[0].isBigWin}
            isFastSpin={isFastSpin()}
            randomFunction={Math.random}
            spinList={spinList()}
            spinIndex={spinIndex()}
            containerRef={containerRef}
            setToIntersectA={setToIntersectA}
          />
          <div
            class={`absolute self-center h-20 w-20  -bottom-2 left-0  `}
            ref={setConfettiCannonRefA}
          />
          <div
            class={`absolute self-center h-20 w-20  -bottom-2 right-0   `}
            ref={setConfettiCannonRefB}
          />
        </>
      );
    } else {
      setSpinner();
    }
  });

  return (
    <div class="relative w-full">
      <canvas class="absolute w-full h-full " ref={setConfettiCanvas} />
      <div
        class="relative w-full h-[185px] md:h-[326px] overflow-hidden"
        ref={setContainerRef}
      >
        {spinner()}
      </div>
    </div>
  );
};

export default SpinnersContainerHorizontal;
