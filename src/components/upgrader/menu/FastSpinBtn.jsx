import LightningIcon from "../../icons/LightningIcon";

import { isFastAnimation, setIsFastAnimation } from "../MainUpgraderContainer";

const FastSpinBtn = () => {
  return (
    <div
      class={`h-11 center drop-shadow-sm rounded-4 group border-opacity-20 hover:border-opacity-20 border 
      cursor-pointer px-2 flex items-center gap-3
            ${
              !isFastAnimation()
                ? "border-gray-9a hover:border-white text-blue-9b text-white"
                : "border-yellow-ffb text-yellow-ffb"
            }
            `}
      onClick={() => setIsFastAnimation((prev) => !prev)}
    >
      <div
        class={`w-6 h-6 border-opacity-20 hover:border-opacity-20 border rounded-4 center 
                ${
                  !isFastAnimation()
                    ? "border-gray-9a hover:border-white"
                    : "border-yellow-ffb"
                }
            `}
      >
        {isFastAnimation() && <LightningIcon />}
      </div>
      <span
        class={`shrink-0 ${isFastAnimation() ? "opacity-100" : "opacity-50"}`}
      >
        Fast Spin
      </span>
    </div>
  );
};

export default FastSpinBtn;
