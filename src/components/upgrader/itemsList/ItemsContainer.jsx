import {For} from "solid-js";
import PotentialDropItem from "../../../views/case/PotentialDropItem";
import {
  setActiveItem,
  setBetValue,
  activeItem,
} from "../../../views/upgrader/Upgrader";

const ItemsContainer = (props) => {
  return (
    <div
      class="w-full grid grid-cols-potential-drop--item gap-2 max-h-[70vh] overflow-y-scroll 
    show-scrollbar"
    >
      <For each={props.items}>
        {(item) => (
          <div
            onClick={() => {
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
