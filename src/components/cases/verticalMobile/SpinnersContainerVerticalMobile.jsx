/* eslint-disable solid/prefer-for */
import {
  createSignal,
  createEffect,
  Switch,
  Match,
  For,
  onCleanup,
} from "solid-js";
import {spinReelsTrigger, setSpinReelsTrigger} from "../store";
import {otherOptions} from "../../../libraries/caseSpinConfig";
import {isFastAnimation, setIsRolling} from "../../../views/unbox/CaseUnboxing";
import SpinnerReelVerticalMobile from "./SpinnerReelVerticalMobile";
import {useSpinnerStatus} from "../../../utilities/hooks/spinnerStatus";
import confetti from "canvas-confetti";
import {
  playCaseBattlesSound,
  playCaseBattlesConfettiSound,
} from "../../../utilities/Sounds/SoundButtonClick";

const SpinnersContainerVerticalMobile = (props) => {
  const [containerRef, setContainerRef] = createSignal();
  const [activeSpinners, setActiveSpinners] = createSignal(0);
  const [reelsSpinning, setReelsSpinning] = createSignal(false);
  const [spinIndexes, setSpinIndexes] = createSignal([]);
  const [spinLists, setSpinLists] = createSignal([]);
  const [spinOffsets, setSpinOffsets] = createSignal([]);
  const [confettiData, setConfettiData] = createSignal([]);
  const {changeStatus} = useSpinnerStatus();
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);
  const [isFastSpin, setIsFastSpin] = createSignal(false);

  const generateSpinData = () => {
    const newSpinIndexes = [];
    const newSpinLists = [];

    for (let i = 0; i < props.numSpinners(); i++) {
      const spinIndex = getRandomIndex();
      let spinList = generateSpinList();
      spinList[spinIndex] = props.spinnerOptions()[i].winningItem;

      newSpinLists.push(spinList);
      newSpinIndexes.push(spinIndex);

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
    }

    setSpinIndexes(newSpinIndexes);
    setSpinLists(newSpinLists);
  };

  const resetValues = () => {
    setConfettiFired(false);
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
      const rectA = ref.getBoundingClientRect();

      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

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
      const color = getColor(item.item.price);
      const ticks = 70;

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
    }
  };

  const [spinners, setSpinners] = createSignal();
  createEffect(() => {
    if (spinLists().length > 0) {
      setSpinners(
        <For each={Array(activeSpinners())}>
          {(_, index) => {
            return (
              <div class="relative w-full h-full">
                <SpinnerReelVerticalMobile
                  spinnerIndex={index()}
                  isConfettiWin={props.spinnerOptions()[index()].isConfettiWin}
                  isBigWin={props.spinnerOptions()[index()].isBigWin}
                  isFastSpin={isFastSpin()}
                  randomFunction={Math.random}
                  spinList={spinLists()[index()]}
                  spinIndex={spinIndexes()[index()]}
                  setToIntersectA={setToIntersectA}
                  spinOffsets={spinOffsets}
                  setSpinOffsets={setSpinOffsets}
                  containerRef={containerRef}
                  spinLists={spinLists}
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
      <Switch>
        <Match when={props.numSpinners()}>
          <div
            class={`relative flex rounded w-full min-w-max`}
            g
            ref={setContainerRef}
          >
            <div class="grid grid-cols-2 gap-y-4 w-full">{spinners()}</div>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default SpinnersContainerVerticalMobile;
