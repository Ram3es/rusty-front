import MinesLogo from "../../MISC/MinesLogo";
import AdjustBtn from "../../MISC/AdjustBtn";
import {FaSolidPlus, FaSolidMinus} from "solid-icons/fa";

import {minesAmount, setMinesAmount} from "../../TilesContainer";

const MinesDisplay = (props) => {
  const addMine = () => {
    setMinesAmount(minesAmount() + 1);
  };
  const removeMine = () => {
    setMinesAmount(minesAmount() - 1);
  };

  const maxMines = () => {
    setMinesAmount(24);
  };
  return (
    <div
      class="w-full min-w-max p-[2px] rounded-[4px] h-full"
      style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(214, 51, 51, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(214, 51, 51, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));


"
    >
      <div
        class="flex w-full p-2 rounded-[4px] justify-between items-center h-full"
        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(214, 51, 51, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(214, 51, 51, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));


      "
      >
        <div class="flex gap-2 items-center relative flex-1">
          <MinesLogo active />
          {/* <div class="text-white font-semibold">{minesAmount}</div> */}
          <input
            class="text-17 text-white absolute left-7 w-[59%] overflow-hidden font-semibold"
            type="number"
            onInput={(e) => props.callbackFn(e)}
            value={minesAmount()}
            placeholder="0"
          />
        </div>
        <div class="flex gap-3 h-full items-center">
          <AdjustBtn text={<FaSolidMinus />} small onClick={removeMine} />
          <AdjustBtn text={<FaSolidPlus />} small onClick={addMine} />
          <div class="h-[175%] w-[1px] bg-[#1C1F3D] "></div>
          <AdjustBtn text={"MAX"} onClick={maxMines} />
        </div>
      </div>
    </div>
  );
};

export default MinesDisplay;
