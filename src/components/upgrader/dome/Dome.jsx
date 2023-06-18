import DomeBg from "./DomeBg.png";
import Spinner from "./Spinner";
import DomeSpaceRemoved from "./DomeSpaceRemoved.webm"
import ScreenWithWire from "./ScreenWithWire.png";
import Screen from "./Screen";

import {
  activeItem,
  betValue,
  underOver,
} from "../../../views/upgrader/Upgrader";

const Dome = () => {
  return (
    <div class="relative flex items-center justify-center">
      <img src={DomeBg} alt="dome background" class="h-" />

        <Spinner
          betValue={betValue}
          activeItem={activeItem}
          over={underOver() === "Over"}
        />

      <video
        src={DomeSpaceRemoved}
        alt="rotating dome"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%]"
        style={{
      
        }}
        autoPlay
        loop
        playsinline
        muted
      />

      <img
        src={ScreenWithWire}
        alt="screen image"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-full max-w-[604px]"
      />
      
      <Screen />
    </div>
  );
};

export default Dome;
