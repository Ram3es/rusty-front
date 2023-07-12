import {createSignal, createEffect} from "solid-js";
import MinesLogo from "./MinesLogo";

const Button = (props) => {
  const [isActive, setIsActive] = createSignal(false);
  createEffect(() => {
    if (props.minesAmount() === parseInt(props.num)) {
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
      onClick={() => props.onClick()}
    >
      <MinesLogo active={isActive()} />
      <div
        class={`${
          isActive() && "text-white"
        } text-[#9A9EC8]  font-bold text-sm`}
      >
        x{props.num}
      </div>
    </div>
  );
};

export default Button;
