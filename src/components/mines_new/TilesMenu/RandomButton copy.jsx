import { createSignal } from "solid-js";
const RandomButton = ({ playing }) => {
  const [isPlaying, setIsPlaying] = createSignal(playing);
  return (
    <div
      class="flex items-center justify-center w-full bg-[#242741] border-[1px] border-[#2B2E46] rounded-sm
            text-[#474B69] p-2 font-semibold"
    >
      Pick Random Tile
    </div>
  );
};

export default RandomButton;
