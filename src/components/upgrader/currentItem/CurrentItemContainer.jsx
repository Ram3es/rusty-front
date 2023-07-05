import SelectedItem from "./SelectedItem";
import BtnSection from "./BtnSection";

const CurrentItemContainer = () => {
  return (
    <div
      class="w-[384px] h-full flex flex-col lg:pb-6"
      style={{
        background: `radial-gradient(84.53% 46.64% at 50% 44.84%, rgba(118, 124, 255, 0.16) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)
`,
      }}
    >
      <SelectedItem />
      <BtnSection />
    </div>
  );
};

export default CurrentItemContainer;
