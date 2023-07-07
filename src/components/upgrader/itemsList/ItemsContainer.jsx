import {createSignal} from "solid-js";
import NewPotentialDropItem from "../../shared/NewPotentialDropItem";
import {
  setActiveItem,
  setBetValue,
  activeItem,
  isGameStarted,
} from "../../../views/upgrader/Upgrader";

import {VirtualContainer} from "@minht11/solid-virtual-container";

const ItemsContainer = (props) => {
  let scrollTargetElement;

  const ListItem = (props) => {
    return (
      <div
        // Use CSS to set width to 100% or any other value.
        class="w-full h-full"
        // Used for keyboard navigation and accessibility.
        tabIndex={props.tabIndex}
        role="listitem"
        style={props.style}
      >
        <div
          onClick={() => {
            if (isGameStarted()) {
              return;
            }
            setBetValue(0);
            setActiveItem(props.item);
          }}
          class="w-full h-full"
        >
          <NewPotentialDropItem
            item={props.item}
            activeItem={activeItem}
            clickable
          />
        </div>
      </div>
    );
  };

  const calculateItemSize = (crossAxisSize) => {
    // Choose minimum size depending on the available space.
    const minWidth = crossAxisSize > 560 ? 180 : 140;

    const count = Math.floor(crossAxisSize / minWidth);
    const width = Math.floor(crossAxisSize / count);

    return {
      width,
      height: width / 0.81135024111,
    };
  };

  return (
    <div
      class="show-scrollbar"
      style={{
        overflow: "auto",
        position: "relative",
        height: "70vh",
        width: "100%",
      }}
      ref={(element) => {
        scrollTargetElement = element;
      }}
    >
      <VirtualContainer
        items={props.items || []}
        scrollTarget={scrollTargetElement}
        // Calculate how many grid columns to show.
        itemSize={calculateItemSize}
        crossAxisCount={(measurements) =>
          Math.floor(measurements.container.cross / measurements.itemSize.cross)
        }
      >
        {ListItem}
      </VirtualContainer>
    </div>
  );
};

export default ItemsContainer;
