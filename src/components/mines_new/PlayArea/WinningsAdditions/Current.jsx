import { onMount, createSignal, onCleanup } from "solid-js";
import GreenText from "../../MISC/GreenText";
import RedText from "../../MISC/RedText";
import CoinLogo from "../../MISC/CoinLogo";

import { getCurrencyString } from "../../utils/tools";
import { isPlaying, hasLost, betAdditions } from "../../TilesContainer";

const Current = (props) => {
  return (
    <div
      class={`flex gap-3 items-center ${
        !hasLost() && "py-2"
      } px-4 transition-all  ${
        (isPlaying() && betAdditions().length > 0) ||
        hasLost() ||
        (!isPlaying() && betAdditions().length > 0)
          ? "scale-100 duration-100"
          : "duration-0 scale-0"
      }`}
      style={`
      ${
        hasLost()
          ? "background: linear-gradient(270deg, rgba(214, 51, 51, 0.24) 0%, rgba(214, 51, 51, 0) 100%);"
          : "background: linear-gradient(270deg, rgba(92, 222, 144, 0.24) 0%, rgba(92, 222, 144, 0) 100%);"
      }
      `}
    >
      <CoinLogo h={"30"} />
      <div class="">
        {hasLost() ? (
          <RedText
            text={hasLost() ? "0.00" : "+" + getCurrencyString(props.addition)}
            size={"30"}
            proccessed
          />
        ) : (
          <GreenText
            text={hasLost() ? "0.00" : "+" + getCurrencyString(props.addition)}
            size={"30"}
          />
        )}
      </div>
    </div>
  );
};

export default Current;
