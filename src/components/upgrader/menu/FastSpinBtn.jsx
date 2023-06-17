import LightningIcon from "../../icons/LightningIcon";

import {fastSpinner, setFastSpinner} from "../../../views/upgrader/Upgrader";

const FastSpinBtn = () => {
  return (
    <div
      class={`h-11 center drop-shadow-sm rounded-4 group border-opacity-20 hover:border-opacity-20 border 
      cursor-pointer px-2 flex items-center gap-3
            ${
              !fastSpinner()
                ? "border-gray-9a hover:border-white text-blue-9b text-white"
                : "border-yellow-ffb text-yellow-ffb"
            }
            `}
      onClick={() => setFastSpinner((prev) => !prev)}
    >
      <div
        class={`w-6 h-6 border-opacity-20 hover:border-opacity-20 border rounded-4 center 
                ${
                  !fastSpinner()
                    ? "border-gray-9a hover:border-white"
                    : "border-yellow-ffb"
                }
            `}
      >
        {fastSpinner() && <LightningIcon />}
      </div>
      <span class={`shrink-0 ${fastSpinner() ? "opacity-100" : "opacity-50"}`}>
        Fast Spin
      </span>
    </div>
  );
};

export default FastSpinBtn;
