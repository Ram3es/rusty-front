import DomeBg from "./DomeBg.png";
import Spinner from "./Spinner";
import DDome from "./DDome.webm";

import {betAmount, activeItem, underOver} from "../../MainUpgraderContainer";

const Dome = () => {
  return (
    <div class="relative flex items-center justify-center">
      <img src={DomeBg} alt="" class="h-" />
      <Spinner
        betValue={betAmount}
        activeItem={activeItem}
        over={underOver() === "Over"}
      />
      <video
        src={DDome}
        alt=""
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "120%",
          height: "120%",
        }}
        autoPlay
        loop
        playsinline
        muted
      />
    </div>
  );
};

export default Dome;
