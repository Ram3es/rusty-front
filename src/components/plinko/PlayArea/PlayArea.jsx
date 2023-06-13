import { createSignal, createEffect } from "solid-js";
import TriangleBg from "../../../assets/img/plinko/new/TriangleBg.svg";
import TriangleCap from "../../../assets/img/plinko/new/TriangleCap.svg";

import Plinko from "./Plinko/Plinko";
import PlinkoBins from "./Plinko/PlinkoBins";
import Cannon from "./Cannon/Cannon";
import History from "./History/History";

import { lastWinIndex, binMultipliers } from "../PlinkoContainer";

export const [color, setColor] = createSignal("");
const PlayArea = () => {
  return (
    <div
      class="relative h-full w-full flex items-center justify-center z-10 "
      style={`background: radial-gradient(100% 200% at 50% 0%, rgba(${color()}, 0.1) 0%, rgba(${color()}, 0.05) 20%, rgba(${color()}, 0) 50%)`}
    >
      <Cannon />
      <div class="z-20 flex items-center justify-center w-full">
        <Plinko />
        <PlinkoBins />
      </div>
      <div class="absolute h-0 w-[800px] z-10 top-3 translate-x-1 ">
        <img src={TriangleBg} alt="background" class="" />
        <img
          src={TriangleCap}
          alt="background"
          class="absolute top-[0.95rem] left-1/2 -translate-x-[51%] "
        />
      </div>
      <History />
    </div>
  );
};

export default PlayArea;
