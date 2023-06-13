import DomeBg from "./DomeBg.png";
import Spinner from "./Spinner";

import {betAmount, activeItem, underOver} from "../../MainUpgraderContainer";

const Dome = () => {
  return (
    <div class="relative flex items-center justify-center">
      <img src={DomeBg} alt="" class="" />
      <Spinner
        betValue={betAmount}
        activeItem={activeItem}
        over={underOver() === "Over"}
      />
    </div>
  );
};

export default Dome;
