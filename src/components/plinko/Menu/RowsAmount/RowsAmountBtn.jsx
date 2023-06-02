import {
  rowsAmount,
  setRowsAmount,
  setLastWinIndex,
} from "../../PlinkoContainer";

import { updateMultipliers } from "../../PlayArea/Plinko/PlinkoBins";

const RowsAmountBtn = (props) => {
  return (
    <div
      class={`min-w-[57px] h-[41px] border rounded-md
            flex items-center justify-center ${
              rowsAmount() === props.value
                ? "text-[#FFB436] border-[#FFB436]"
                : "text-[#9A9EC8] border-[#FFFFFF0A] cursor-pointer"
            } font-semibold`}
      onClick={() => {
        setLastWinIndex(0);
        setRowsAmount(props.value);
        updateMultipliers();
      }}
    >
      {props.value}
    </div>
  );
};

export default RowsAmountBtn;
