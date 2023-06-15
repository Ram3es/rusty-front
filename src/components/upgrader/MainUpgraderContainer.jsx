import {createSignal} from "solid-js";

import UpgraderMenu from "./menu/UpgraderMenu";
import DomeContainer from "./dome/DomeContainer";
import CurrentItemContainer from "./currentItem/CurrentItemContainer";
import ItemsListContainer from "./itemsList/ItemsListContainer";

export const [betAmount, setBetAmount] = createSignal(607);
export const [underOver, setUnderOver] = createSignal("Over");
export const [isFastAnimation, setIsFastAnimation] = createSignal(false);
export const [activeItem, setActiveItem] = createSignal({price: 2185});

export const upgrade = () => {
  console.log("upgrade");
};

const MainUpgraderContainer = () => {
  return (
    <div class="flex flex-col w-full relative gap-10">
      <div class="relative w-full h-[640px] flex rounded-lg">
        <UpgraderMenu />
        <DomeContainer />
        <CurrentItemContainer />
      </div>
      <ItemsListContainer />
    </div>
  );
};

export default MainUpgraderContainer;
