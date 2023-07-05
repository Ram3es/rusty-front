import {createSignal} from "solid-js";

import UpgraderMenu from "./menu/UpgraderMenu";
import DomeContainer from "./dome/DomeContainer";
import CurrentItemContainer from "./currentItem/CurrentItemContainer";
import ItemsListContainer from "./itemsList/ItemsListContainer";

export const [underOver, setUnderOver] = createSignal("Over");
export const [isFastAnimation, setIsFastAnimation] = createSignal(false);

const MainUpgraderContainer = () => {
  return (
    <div class="flex flex-col w-full relative gap-10 items-center">
      <div class="relative w-full lg:h-[640px] flex flex-col lg:flex-row items-center rounded-lg justify-center">
        <UpgraderMenu />
        <DomeContainer />
        <CurrentItemContainer />
      </div>
      <div class="max-w-[1370px] w-full">
        <ItemsListContainer />
      </div>
    </div>
  );
};

export default MainUpgraderContainer;
