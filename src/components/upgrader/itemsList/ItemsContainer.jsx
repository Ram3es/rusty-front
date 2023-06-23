import {For, createEffect} from "solid-js";
import PotentialDropItem from "../../../views/case/PotentialDropItem";
import {
  setActiveItem,
  setBetValue,
  activeItem,
  isGameStarted,
} from "../../../views/upgrader/Upgrader";

const ItemsContainer = (props) => {
  // createEffect(() => {
  //   console.log(activeItem());
  // });
  return (
    <div
      class="w-full grid grid-cols-potential-drop--item gap-2 max-h-[70vh] overflow-y-scroll 
    show-scrollbar"
    >
      <For each={props.items}>
        {(item) => (
          <div
            onClick={() => {
              if (isGameStarted()) {
                return;
              }
              setBetValue(0);
              setActiveItem(item);
            }}
          >
            <PotentialDropItem
              skin={item}
              id={item.id}
              smallImg
              upgraderItem
              activeItem={activeItem}
            />
          </div>
        )}
      </For>
    </div>
  );
};

export default ItemsContainer;
