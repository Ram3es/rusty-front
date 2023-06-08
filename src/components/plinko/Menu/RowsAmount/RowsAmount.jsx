import RowsAmountBtn from "./RowsAmountBtn";

import { ballActive } from "../../PlinkoContainer";

const RowsAmount = () => {
  return (
    <div class={`w-full flex flex-col gap-1 duration-200 `}>
      <div class="text-[#9A9EC8] text-[12px] font-medium">Rows</div>
      <div
        class={`flex w-full justify-between 
      transition-opacity ${ballActive() && "pointer-events-none opacity-25"}`}
      >
        <RowsAmountBtn value={8} />
        <RowsAmountBtn value={10} />
        <RowsAmountBtn value={12} />
        <RowsAmountBtn value={14} />
        <RowsAmountBtn value={16} />
      </div>
    </div>
  );
};
9;

export default RowsAmount;
