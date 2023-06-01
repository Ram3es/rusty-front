import GoldText from "../../MISC/GoldText";
import CoinLogo from "../../MISC/CoinLogo";

import { getCurrencyString } from "../../utils/tools";
import { isPlaying } from "../../TilesContainer";

const Prev = (props) => {
  return (
    <div
      class={`flex gap-1 items-center  px-4 py-2 transition-all duration-100 
      ${isPlaying() ? "scale-100" : "scale-0"}`}
      style="background: linear-gradient(270deg, rgba(255, 180, 54, 0.08) 0%, rgba(255, 180, 54, 0) 93.23%);"
    >
      <CoinLogo h={"22"} />
      <GoldText text={"+" + getCurrencyString(props.addition)} size={"22"} />
    </div>
  );
};

export default Prev;
