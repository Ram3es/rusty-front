import {createSignal} from "solid-js";

import UpgraderMenu from "./menu/UpgraderMenu";
import DomeContainer from "./dome/DomeContainer";
import CurrentItemContainer from "./currentItem/CurrentItemContainer";
import ItemsListContainer from "./itemsList/ItemsListContainer";

export const [underOver, setUnderOver] = createSignal("Over");
export const [isFastAnimation, setIsFastAnimation] = createSignal(false);

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
