import DomeBg from "./DomeBg.png";
import Spinner from "./Spinner";
import DomeSpaceRemoved from "./DomeSpaceRemoved.webm";
import ScreenWithWire from "./ScreenWithWire.png";
import Screen from "./Screen";
import Triangle from "./Triangle.svg";

import {
  activeItem,
  betValue,
  underOver,
  isAnimationShown
} from "../../../views/upgrader/Upgrader";

const Dome = (props) => {
  return (
    <div class="relative flex items-center justify-center">
      <img src={DomeBg} alt="dome background" class="" />

      <img src={Triangle} alt="triangle" class="absolute top-[3%]" />
      <img
        src={Triangle}
        alt="triangle"
        class="absolute top-[11%] rotate-180 scale-75 z-10"
      />

      <Spinner
        betValue={betValue}
        activeItem={activeItem}
        over={underOver() === "Over"}
      />

      <video
        src={DomeSpaceRemoved}
        alt="rotating dome"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%]"
        autoPlay
        loop
        playsinline
        muted
        onLoadStart="this.playbackRate = 0.7;"
      />

      <img
        src={ScreenWithWire}
        alt="screen image"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-full max-w-[604px]"
      />
         <div class={`w-full ${isAnimationShown() ? 'animate' : ''} absolute upgrader-wires -left-[80%] -top-[14%] scale-[20%] sm:-left-[68%] sm:-top-[4%] sm:scale-[25%] md:-left-[64%] md:-top-[2%] xxl:top-[38%] xxl:scale-[35%] xxl:-translate-x-[27%] xxl:-translate-y-[42%] xxl:left-auto `} />
      <Screen />
    </div>
  );
};

export default Dome;
