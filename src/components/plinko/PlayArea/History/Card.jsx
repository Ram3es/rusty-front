import { createEffect, createSignal } from "solid-js";

const Card = (props) => {
  const [opacity, setOpacity] = createSignal(1);
  const [color, setColor] = createSignal("");
  createEffect(() => {
    if (props.index < 6) {
      setOpacity(1);
    } else if (props.index === 7) {
      setOpacity(0.75);
    } else if (props.index === 8) {
      setOpacity(0.5);
    } else if (props.index === 9) {
      setOpacity(0.25);
    }

    if (props.multiplier < 1) {
      setColor("40,152,255");
    } else if (props.multiplier < 5) {
      setColor("214,48,255");
    } else if (props.multiplier < 25) {
      setColor("255,27,27");
    } else {
      setColor("255,180,54");
    }
  });
  return (
    <div
      class={`p-[1px] rounded-md flex items-center justify-center  `}
      style={`background: linear-gradient(180deg, rgba(${color()}, 0.2) 0%, rgba(${color()}, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08));
        opacity: ${opacity()};
`}
    >
      <div class="bg-[#161928] rounded-md flex items-center justify-center">
        <div
          class={`flex items-center justify-center font-bold min-w-[100px] p-[2px] rounded-md text-lg  `}
          style={`background: radial-gradient(66.67% 100% at 50% 0%, rgba(${color()}, 0.24) 0%, rgba(${color()}, 0) 100%), radial-gradient(48.92% 122.5% at 46.04% 8.75%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(80.69% 44.35% at 50% 24.46%, #1F2344 0%, rgba(35, 37, 61, 0) 100%);
          color: rgb(${color()});`}
        >
          x{props.multiplier}
        </div>
      </div>
    </div>
  );
};

export default Card;
