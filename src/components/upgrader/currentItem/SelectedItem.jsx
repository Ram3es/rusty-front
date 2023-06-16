import MaskUnselectedItem from "../../../assets/img/new-upgrader/MaskUnselectedItem.svg";

const SelectedItem = () => {
  return (
    <div
      class="flex-1 bg-[#00000014] flex flex-col items-center font-SpaceGrotesk text-13 pt-9
    text-[#9A9EC8]"
    >
      <div>Your Selection</div>
      <div class="flex h-full">
        <img src={MaskUnselectedItem} alt="" class="" />
      </div>
      <div
        class="text-semibold text-22 w-full p-5"
        style={{
          background: `radial-gradient(50% 261.36% at 0% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 
`,
        }}
      >
        SELECT A SKIN
      </div>
    </div>
  );
};

export default SelectedItem;
