import GrayGradientButton from "../../../components/elements/GrayGradientButton";

const BtnSection = () => {
  return (
    <div class="h-[200px] flex items-center justify-center w-full">
      <GrayGradientButton additionalClass="opacity-0 max-w-[260px] py-2 w-full">
        <span class="text-[#A2A5C6] font-SpaceGrotesk font-semibold">
          Clear Selection
        </span>
      </GrayGradientButton>
    </div>
  );
};

export default BtnSection;
