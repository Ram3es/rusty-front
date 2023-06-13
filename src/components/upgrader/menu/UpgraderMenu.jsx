import BetAmount from "./betAmount/BetAmount";
import UnderOverToggle from "./underOver/UnderOverToggle";
import UpgradeBtn from "./UpgradeBtn";
import FastSpinBtn from "./FastSpinBtn";
import FairnessBtn from "./FairnessBtn";

import {upgrade} from "../MainUpgraderContainer";

const UpgraderMenu = () => {
  return (
    <div
      class="relative w-max px-8 pt-10 pb-6 rounded-l-lg h-full flex flex-col items-center gap-4 font-SpaceGrotesk"
      style={{
        background: `linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`,
      }}
    >
      <BetAmount />
      <div class="h-[1px] w-[120%] bg-[#14162d]" />
      <UnderOverToggle />
      <UpgradeBtn onClick={upgrade} />
      <div class="flex-1" />
      <div class="flex w-full gap-3">
        <FastSpinBtn />
        <FairnessBtn />
      </div>
    </div>
  );
};

export default UpgraderMenu;
