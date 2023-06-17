import {createSignal, onMount, onCleanup} from "solid-js";

import {activeItem, betValue} from "../../../views/upgrader/Upgrader";

import GoldGlowText from "./GoldGlowText";
const Screen = () => {
  const [screenDiv, setScreenDiv] = createSignal(null);
  const [textSize, setTextSize] = createSignal(20);
  const [smallTextSize, setSmallTextSize] = createSignal(10);

  onMount(() => {
    const resizeListener = () => {
      if (screenDiv().offsetHeight) {
        setTextSize(screenDiv().offsetHeight / 3);
        setSmallTextSize(screenDiv().offsetHeight / 5.41);
      }
    };

    // Set timeout to ensure that layout is rendered before resizeListener is called
    requestAnimationFrame(resizeListener);

    window.addEventListener("resize", resizeListener);

    onCleanup(() => {
      // Clean up the listener when the component is unmounted
      window.removeEventListener("resize", resizeListener);
    });
  });

  return (
    <div class="w-full absolute flex h-[12.5%] top-[43%]">
      <div class=" w-full" />
      <div
        ref={setScreenDiv}
        class="w-[50%] flex items-center justify-center flex-col"
      >
        <GoldGlowText
          text={
            activeItem()
              ? ((betValue() || 0) / (activeItem().price || 1)) * 90
              : 0
          }
          size={textSize()}
        />
        <span
          class={`font-SpaceGrotesk font-semibold text-[#EBAC32]`}
          style={{
            "font-size": `${smallTextSize()}px`,
          }}
        >
          WIN CHANCE
        </span>
      </div>
      <div class=" w-full" />
    </div>
  );
};

export default Screen;
