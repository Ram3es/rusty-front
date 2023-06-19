import { difficulty } from "../../PlinkoContainer";

const HardBtn = (props) => {
  return (
    <div
      class={`p-[1px] w-full rounded-md ${
        difficulty() !== "hard" && "cursor-pointer"
      }`}
      style={`background: ${
        difficulty() === "hard"
          ? "linear-gradient(180deg, rgba(255, 180, 54, 0) -37.12%, rgba(255, 180, 54, 0.36) 100%);"
          : "linear-gradient(32.81deg, rgba(255, 27, 27, 0.36) 0%, rgba(0, 0, 0, 0) 35.12%),linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03));"
      } `}
      onClick={props.onClick}
    >
      <div class="bg-[#181C31] rounded-md">
        <div
          class={`flex items-center justify-center rounded-md py-1 ${
            difficulty() === "hard" ? "text-[#FFB436]" : "text-[#9A9EC8]"
          } font-semibold`}
          style={`background: ${
            difficulty() === "hard"
              ? "radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.28) 0%, rgba(255, 180, 54, 0) 100%);"
              : "radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(218, 253, 9, 0.08) 0%, rgba(255, 27, 27, 0.08) 0.01%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;"
          }`}
        >
          Hard
        </div>
      </div>
    </div>
  );
};

export default HardBtn;
