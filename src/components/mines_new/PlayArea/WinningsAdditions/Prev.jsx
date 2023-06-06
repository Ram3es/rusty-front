import { createEffect, createSignal } from "solid-js";
import GreenText from "../../MISC/GreenText";
import CoinLogo from "../../MISC/CoinLogo";

import { getCurrencyString } from "../../utils/tools";

const Prev = (props) => {
  const [opacity, setOpacity] = createSignal(100);
  createEffect(() => {
    // index 0 is 60 opacity
    // index 1 is 50 opacity
    // index 2 is 40 opacity
    // index 3 is 30 opacity
    // index 4 is 20 opacity
    // index 5 is 10 opacity

    const opacity = (60 - props.index * 10) / 100;
    setOpacity(opacity);
  });
  return (
    <div
      class={`flex gap-1 items-center w-36 px-4 absolute transition-transform duration-100
         `}
      style={`right: -10px; transform: translateY(${
        props.prevOffsets()[props.index]
      }px);
      opacity: ${opacity()};
      `}
      key={props.index}
    >
      <CoinLogo h={"22"} />
      <GreenText text={"+" + getCurrencyString(props.addition)} size={"22"} />
    </div>
  );
};

export default Prev;
