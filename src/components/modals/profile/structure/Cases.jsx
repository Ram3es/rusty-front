import Coin from "../../../../utilities/Coin";
import { copyToClipboard } from "../../../../utilities/tools";

const CasesStructure = (props) => {
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
      <div class="col-start-1 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-y-0 gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.bet_value).toLocaleString() ?? 1000}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Total
        </span>
      </div>
      <div class="col-start-2 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-y-0 gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.winnings).toLocaleString() ?? 1000}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Winnings
        </span>
      </div>
      <div class="col-start-1 row-start-3 lg:row-auto lg:col-auto flex flex-col lg:flex-row">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa capitalize my-auto truncate">
          {props?.val?.info.split("_")[0]}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Case
        </span>
      </div>
      <div class="col-start-2 row-start-3 lg:row-auto lg:col-auto flex flex-col lg:flex-row" onClick={() => {
          copyToClipboard(props?.val?.pf_id);
        }}>
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa capitalize my-auto truncate">
          {props?.val?.extra_data}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Result
        </span>
      </div>
      <div class="col-start-1 row-start-4 lg:row-auto lg:col-auto flex flex-col lg:flex-row">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa capitalize my-auto truncate">
          {props?.val?.info.split("_")[1]}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Drop
        </span>
      </div>
      <div class="col-start-2 row-start-1 lg:row-auto lg:col-auto w-full my-auto lg:flex items-center justify-end overflow-hidden">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate">
          {date}
        </p>
      </div>
    </>
  );
};

export default CasesStructure;
