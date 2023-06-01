import { isPlaying } from "../TilesContainer";

const RandomButton = () => {
  return (
    <div
      class={`flex items-center justify-center w-full border-[1px] border-[#2B2E46] rounded-md
            text-[${isPlaying() ? "#9A9EC8" : "#474B69"}] p-2 font-semibold`}
      style={`background: ${
        isPlaying()
          ? "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)"
          : "#242741"
      }
                `}
    >
      Pick Random Tile
    </div>
  );
};

export default RandomButton;
