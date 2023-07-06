import Coin from "../../../../utilities/Coin";
import { copyToClipboard } from "../../../../utilities/tools";

const WheelStructure = (props) => {
  const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]
  }`;

  return (
    <>
      <p
        class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10"
        onClick={() => {
          copyToClipboard(props?.val?.pf_id);
        }}
      >
        #{props?.val?.pf_id}
      </p>
      <div class="col-start-1 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.bet_value).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Total
        </span>
      </div>
      <div class="col-start-2 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.winnings).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Winnings
        </span>
      </div>
      <div class="col-start-1 row-start-3 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center my-auto relative z-10">
        <p class="col-start-2 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase ">
          {(props?.val?.winnings / props?.val?.bet_value || 0).toFixed(2)}x
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Multiplier
        </span>
      </div>
      <div
        class={`col-start-2 row-start-3 lg:row-auto lg:col-auto lg:flex lg:items-center gap-2 ${
          props?.val?.winnings <= 0
            ? "text-gray-9aa"
            : "text-gradient-green-secondary"
        }`}
      >
        <p class="text-current text-14 font-bold font-SpaceGrotesk uppercase">
          {props?.val?.winnings > 0 ? "win" : "loss"}
        </p>
      </div>
      <div class="col-start-2 row-start-1 lg:row-auto lg:col-auto w-full flex items-center justify-end overflow-hidden">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate">
          {date}
        </p>
      </div>
    </>
  );
};

export default WheelStructure;
