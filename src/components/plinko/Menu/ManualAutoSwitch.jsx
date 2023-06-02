import { setIsAutoMode, isAutoMode } from "../../components/PlinkoContainer";

const ManualAutoSwitch = () => {
  return (
    <div class="flex text-[#9A9EC8] text-[14px] font-bold text-center ">
      <div
        class={`p-[1px] rounded-l-sm  min-w-[124px]
        ${isAutoMode() && "cursor-pointer"}`}
        style={`background: ${
          !isAutoMode()
            ? "rgba(255, 195, 93, 1)"
            : "linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)),linear-gradient(84.53deg, rgba(214, 51, 51, 0.25) 0%, rgba(0, 0, 0, 0) 15.36%),linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));"
        }`}
        onClick={() => {
          setIsAutoMode(false);
        }}
      >
        <div
          class={`${
            !isAutoMode() ? "bg-[#181C31]" : "bg-[#3A3C5C]"
          } rounded-l-sm`}
        >
          <div
            class={`p-2  rounded-l-sm `}
            style={`${
              !isAutoMode()
                ? "color: #FFC35D;"
                : "background: radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%,rgba(29, 31, 48, 0.48) 100%); "
            }
            `}
          >
            Manual
          </div>
        </div>
      </div>

      <div
        class={`p-[1px] rounded-r-sm  min-w-[124px]
        ${!isAutoMode() && "cursor-pointer"}`}
        style={`background: ${
          isAutoMode()
            ? "rgba(255, 195, 93, 1)"
            : "linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)),linear-gradient(84.53deg, rgba(214, 51, 51, 0.25) 0%, rgba(0, 0, 0, 0) 15.36%),linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));"
        }`}
        onClick={() => {
          setIsAutoMode(true);
        }}
      >
        <div
          class={`${
            isAutoMode() ? "bg-[#181C31]" : "bg-[#3A3C5C]"
          } rounded-r-sm`}
        >
          <div
            class={`p-2  rounded-r-sm `}
            style={`${
              isAutoMode()
                ? "color: #FFC35D;"
                : "background: radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%,rgba(29, 31, 48, 0.48) 100%); "
            }
            `}
          >
            Automatic
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAutoSwitch;
