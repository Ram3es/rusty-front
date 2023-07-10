import Coin from "../../../../utilities/Coin";
import { copyToClipboard } from "../../../../utilities/tools";

const UpgraderStructure = (props) => {
  const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");

  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]
  }`;

  return (
    <>
      <p
        class="col-span-3 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10"
        onClick={() => {
          copyToClipboard(props?.val?.pf_id);
        }}
      >
        #{props?.val?.pf_id}
      </p>
      <div class="col-span-3 col-start-1 row-start-2 lg:col-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.bet_value).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Total
        </span>
      </div>
      <div class="col-span-3 col-start-4 row-start-2 lg:col-start-3 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.winnings).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Winnings
        </span>
      </div>
      <div class="col-span-2 col-start-1 row-start-3 lg:col-start-4 lg:row-auto lg:col-auto my-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2 relative z-10">
        <span class="col-start-1 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase">
          {(props?.val?.winnings / props?.val?.bet_value || 0)?.toFixed(2)}x
        </span>
        <span class="text-gray-a2 font-bold capitalize col-start-1 lg:hidden text-13">
          Multiplier
        </span>
      </div>
      <div class="col-span-2 col-start-3 row-start-3 lg:col-start-5 lg:row-auto lg:col-auto my-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2 relative z-10">
        <span class="col-start-1 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase">
          {props?.val?.info || 0}%
        </span>
        <span class="text-gray-a2 font-bold capitalize col-start-1 lg:hidden text-13">
          Chance
        </span>
      </div>
      <div
        class={`col-span-2 col-start-1 row-start-4 lg:col-start-6 lg:row-auto lg:col-auto flex items-center gap-2 ${
          props?.val?.winnings <= 0
            ? "text-gray-9aa"
            : "text-gradient-green-secondary"
        }`}
      >
        <p class="text-current text-14 font-bold font-SpaceGrotesk uppercase">
          {props?.val?.winnings > 0 ? "win" : "loss"}
        </p>
      </div>
      <div class="col-span-2 col-start-5 row-start-3 lg:col-start-7 lg:row-auto lg:col-auto my-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2 relative z-10">
        <span class="col-start-1 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase">
          {props?.val?.extra_data}
        </span>
        <span class="text-gray-a2 font-bold capitalize col-start-1 lg:hidden text-13">
          Status
        </span>
      </div>
      <div class="col-span-3 col-start-4 row-start-1 lg:col-start-8 lg:row-auto lg:col-auto w-full flex items-center justify-end overflow-hidden">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate">
          {date}
        </p>
      </div>
    </>
  );
};

export default UpgraderStructure;
