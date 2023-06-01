import { createSignal, createEffect } from "solid-js";
import MinesLogo from "../../MISC/MinesLogo";

import { minesAmount } from "../../TilesContainer";

const Button = ({ num, onClick }) => {
  const [isActive, setIsActive] = createSignal(false);
  createEffect(() => {
    if (minesAmount() === parseInt(num)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });
  return (
    <div
      class={`flex border rounded-[4px] p-1 items-center justify-center gap-2 w-1/4 h-10 ${
        isActive() ? "border-[#FFB436]" : "border-[#FFFFFF0A]"
      }`}
      onClick={onClick}
    >
      <MinesLogo active={isActive()} />
      <div
        class={`${
          isActive() && "text-white"
        } text-[#9A9EC8]  font-bold text-sm`}
      >
        x{num}
      </div>
    </div>
  );
};

export default Button;
