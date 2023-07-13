import MaskUnselectedItem from "../../../assets/img/new-upgrader/MaskUnselectedItem.svg";
import PotentialDropItem from "../../../views/case/PotentialDropItem";
import NewPotentialDropItem from "../../shared/NewPotentialDropItem";
import GoldText from "../../shared/GoldText";

import {activeItem, betValue} from "../../../views/upgrader/Upgrader";

const SelectedItem = () => {
  return (
    <div
      class={`flex-1 bg-[#00000014] flex flex-col items-center justify-between font-SpaceGrotesk text-13 ${
        !activeItem() && "pt-9"
      }
    text-[#9A9EC8]`}
    >
      {activeItem() && (
        <div
          class="text-semibold w-full min-h-[73px] flex justify-center pl-5 flex-col gap-1"
          style={{
            background: `radial-gradient(50% 261.36% at 0% 50%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%)

`,
          }}
        >
          <div class="text-14">Multiplier</div>
          <GoldText
            text={`x${
              betValue() !== 0 && betValue()
                ? ((activeItem()?.price || 0) / (betValue() || 1)).toFixed(2)
                : 0
            }`}
            size={22}
            noSmallDecimal
          />
        </div>
      )}

      <div class={`${activeItem() && "pt-[10%]"}`}>Your Selection</div>
      <div
        class={`flex w-[190px] h-[235px] items-center justify-center pointer-events-none ${
          activeItem() && ""
        }`}
      >
        {activeItem() ? (
          <NewPotentialDropItem item={activeItem()} />
        ) : (
          <img src={MaskUnselectedItem} alt="" class="" />
        )}
      </div>
      {!activeItem() && (
        <div
          class="text-semibold text-22 w-full min-h-[73px] flex items-center pl-5"
          style={{
            background: `radial-gradient(50% 261.36% at 0% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 
`,
          }}
        >
          SELECT A SKIN
        </div>
      )}
    </div>
  );
};

export default SelectedItem;
