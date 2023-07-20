import {createSignal, createEffect, For, onCleanup} from "solid-js";
// import SpinnerReelVertical from "./SpinnerReelVertical";
import {spinReelsTrigger, setSpinReelsTrigger} from "../store";
import {spinnerTimings, otherOptions} from "../../../libraries/caseSpinConfig";
import {isFastAnimation, setIsRolling} from "../../../views/unbox/CaseUnboxing";
import BattleSpinnerReelTest from "../../battle/BattleSpinnerReelTest";
import {useSpinnerStatus} from "../../../utilities/hooks/spinnerStatus";
import confetti, {create} from "canvas-confetti";
import {
  playCaseBattlesSound,
  playCaseBattlesConfettiSound,
} from "../../../utilities/Sounds/SoundButtonClick";

const SpinnersContainerVertical = (props) => {
  const [activeSpinners, setActiveSpinners] = createSignal(0);
  const [containsBigWin, setContainsBigWin] = createSignal(false);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);
  const [containerRef, setContainerRef] = createSignal();
  const {changeStatus} = useSpinnerStatus();
  const [spinIndexes, setSpinIndexes] = createSignal([]);
  const [spinLists, setSpinLists] = createSignal([]);
  const [spinOffsets, setSpinOffsets] = createSignal([]);
  const [confettiData, setConfettiData] = createSignal([]);
  const [isFastSpin, setIsFastSpin] = createSignal(false);
  const [confettiCanvas, setConfettiCanvas] = createSignal(null);

  const generateSpinData = () => {
    const newSpinIndexes = [];
    const newSpinLists = [];

    for (let i = 0; i < props.numSpinners(); i++) {
      const spinIndex = getRandomIndex();
      let spinList = generateSpinList();
      spinList[spinIndex] = props.spinnerOptions()[i].winningItem;
      if (props.spinnerOptions()[i].isBigWin) {
        setContainsBigWin(true);
      }
      if (props.spinnerOptions()[i].isConfettiWin) {
        setContainsConfettiWin(true);
        setConfettiData((prev) => {
          const newConfettiData = [...prev];
          newConfettiData.push({
            item: props.spinnerOptions()[i].winningItem,
          });
          return newConfettiData;
        });
      } else {
        setConfettiData((prev) => {
          const newConfettiData = [...prev];
          newConfettiData.push({
            item: null,
          });
          return newConfettiData;
        });
      }
      newSpinLists.push(spinList);
      newSpinIndexes.push(spinIndex);
    }
    setSpinIndexes(newSpinIndexes);
    setSpinLists(newSpinLists);
  };

  const resetValues = () => {
    setConfettiFired(false);
    setContainsBigWin(false);
    setContainsConfettiWin(false);
    setSpinLists([]);
    setSpinIndexes(null);
    setSpinOffsets([]);
    setActiveSpinners();
  };

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
          (otherOptions.verticalEndBound - otherOptions.verticalStartBound + 1)
      ) + otherOptions.verticalStartBound
    );
  };

  const spinReels = () => {
    resetValues();
    setActiveSpinners(props.numSpinners());
    generateSpinData();
    if (!isFastAnimation()) {
      if (containsConfettiWin()) {
        playCaseBattlesConfettiSound();
      } else {
        playCaseBattlesSound();
      }
    }
    setIsFastSpin(isFastAnimation());
    changeStatus("spinning");
  };

  createEffect(() => {
    if (spinReelsTrigger.triggered) {
      spinReels();
      setSpinReelsTrigger({triggered: false});
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

  const createConfetti = () => {
    if (!confettiFired()) {
      setConfettiFired(true);
      for (let i = 0; i < activeSpinners(); i++) {
        const ref = [
          confettiCannonRefA,
          confettiCannonRefB,
          confettiCannonRefC,
          confettiCannonRefD,
        ][i]();
        if (confettiData()[i].item) {
          fireCannon(ref, confettiData()[i]);
        }
      }
      setConfettiData([]);
    } else {
      console.log("confetti already fired");
    }
  };

  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();
  const [confettiCannonRefC, setConfettiCannonRefC] = createSignal();
  const [confettiCannonRefD, setConfettiCannonRefD] = createSignal();

  const refForIndex = {
    0: setConfettiCannonRefA,
    1: setConfettiCannonRefB,
    2: setConfettiCannonRefC,
    3: setConfettiCannonRefD,
  };

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

  const fireCannon = (ref, item) => {
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
      const color = getColor(item.item.price);
      const ticks = 70;

      const end = Date.now() + 0.05 * 1000;

      (function frame() {
        confettiCanvas().confetti({
          particleCount,
          spread,
          origin: {x: normalizedXA, y: normalizedYA},
          startVelocity,
          colors: ["#FFFFFF", colorCodes[color]],
          ticks,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  createEffect(() => {
    if (confettiCanvas()) {
      confettiCanvas().confetti =
        confettiCanvas().confetti || create(confettiCanvas(), {resize: true});
    }
  });
  const [spinners, setSpinners] = createSignal();
  createEffect(() => {
    if (spinLists().length > 0) {
      setSpinners(
        <For each={Array(activeSpinners())}>
          {(_, index) => {
            return (
              <div class="relative w-full h-full">
                {/* <SpinnerReelVertical
            spinnerIndex={index()}
            isConfettiWin={props.spinnerOptions()[index()].isConfettiWin}
            isBigWin={props.spinnerOptions()[index()].isBigWin}
            isFastSpin={isFastAnimation()}
            setBeginClickSound={props.setBeginClickSound}
            setBeginPullBackSound={props.setBeginPullBackSound}
            setBeginWinSound={props.setBeginWinSound}
          /> */}

                <BattleSpinnerReelTest
                  spinnerIndex={index()}
                  isConfettiWin={props.spinnerOptions()[index()].isConfettiWin}
                  isBigWin={props.spinnerOptions()[index()].isBigWin}
                  isFastSpin={isFastSpin()}
                  randomFunction={Math.random}
                  // spinnerStatus={spinnerStatus}
                  spinList={spinLists()[index()]}
                  spinIndex={spinIndexes()[index()]}
                  setToIntersectA={setToIntersectA}
                  spinOffsets={spinOffsets}
                  setSpinOffsets={setSpinOffsets}
                  containerRef={containerRef}
                  solo
                />

                <div
                  class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2`}
                  ref={refForIndex[index()]}
                />
              </div>
            );
          }}
        </For>
      );
    } else {
      setSpinners();
    }
  });

  return (
    <div class="relative w-full">
      <div
        class="relative flex rounded w-full h-[326px] min-w-max "
        ref={setContainerRef}
      >
        <canvas class="absolute w-full h-full" ref={setConfettiCanvas} />

        <div class="arrow-down absolute top-1/2 -left-[8px] -translate-y-1/2 -rotate-90" />

        {spinners()}

        <div class="arrow-down absolute top-1/2 -right-[8px] -translate-y-1/2 rotate-90" />
        <div
          class="absolute left-0 top-0 w-full h-[68px]"
          style={{
            background:
              "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
          }}
        />
        <div
          class="absolute left-0 bottom-0 w-full h-[68px]"
          style={{
            background:
              "linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)",
            transform: "matrix(-1, 0, 0, -1, 0, 0)",
          }}
        />
      </div>
    </div>
  );
};

export default SpinnersContainerVertical;
