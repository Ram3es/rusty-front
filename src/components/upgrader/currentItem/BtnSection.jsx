import GrayGradientButton from "../../../components/elements/GrayGradientButton";

import {
  activeItem,
  setActiveItem,
  setBetValue,
  isGameStarted,
} from "../../../views/upgrader/Upgrader";

const BtnSection = () => {
  return (
    <div
      class={`h-[82px] lg:h-[200px] flex items-center justify-center w-full transition-opacity duration-200
    ${isGameStarted() && "opacity-40 pointer-events-none"}`}
    >
      {activeItem() && (
        <GrayGradientButton
          additionalClass={` max-w-[260px] py-2 w-full`}
          callbackFn={() => {
            if (activeItem()) {
              setActiveItem();
              setBetValue();
            }
          }}
        >
          <span class="text-[#A2A5C6] font-SpaceGrotesk font-semibold">
            Clear Selection
          </span>
        </GrayGradientButton>
      )}
    </div>
  );
};

export default BtnSection;
