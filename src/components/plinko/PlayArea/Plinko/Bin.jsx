import {createEffect, createSignal} from "solid-js";

import {binLiftList, setBinLiftList} from "../../PlinkoContainer";

const Bin = (props) => {
  const [color, setColor] = createSignal("");
  const [colorRgb, setColorRgb] = createSignal("0,0,0");
  createEffect(() => {
    if (props.multiplier < 1) {
      setColor("#2898FF");
      setColorRgb("40,152,255");
    } else if (props.multiplier < 5) {
      setColor("#D630FF");
      setColorRgb("214,48,255");
    } else if (props.multiplier < 25) {
      setColor("#FF1B1B");
      setColorRgb("255,27,27");
    } else {
      setColor("#FFB436");
      setColorRgb("255,180,54");
    }
  });

  createEffect(() => {
    if (binLiftList().includes(props.row)) {
      setTimeout(() => {
        // remove the row from the list once
        // the animation is done
        setBinLiftList((prev) => prev.filter((row) => row !== props.row));
      }, 250);
    }
  });

  return (
    <div
      class={`w-full h-full relative  ${
        binLiftList().includes(props.row) ? "animate-bounce" : ""
      }`}
    >
      <div
        class="w-full h-3 absolute  -translate-y-2"
        style={`background: linear-gradient(0deg, rgba(${colorRgb()}, 0.16) 0%, rgba(40, 152, 255, 0) 100%);`}
      ></div>
      <div
        class={`h-full w-full border-2  font-bold flex items-center justify-center text-sm overflow-hidden 
        border-[#ffffff0b] rounded-b-lg`}
        style={`color: ${color()};
        background: radial-gradient(66.67% 100% at 50% 0%, rgba(${colorRgb()}, 0.24) 0%, rgba(${colorRgb()}, 0) 100%), radial-gradient(48.92% 122.5% at 46.04% 8.75%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(80.69% 44.35% at 50% 24.46%, #1F2344 0%, rgba(35, 37, 61, 0) 100%);
        font-size: ${props.fontSize}px;`}
      >
        {props.multiplier}
      </div>
    </div>
  );
};

export default Bin;
