import {For, mergeProps, createSignal, createEffect} from "solid-js";
import NewPotentialDropItem from "../shared/NewPotentialDropItem";

import {VirtualContainer} from "@minht11/solid-virtual-container";

const NewItemsList = (props) => {
  let scrollTargetElement;

  const getParentProps = () => {
    return {
      ...props,
    };
  };

  const ListItem = (props) => {
    return (
      <div
        class="w-full h-full"
        tabIndex={props.tabIndex}
        role="listitem"
        style={props.style}
      >
        {props.item ? (
          <div
            onClick={() => {
              // if (Number(props.item.locked) != 1) {
                getParentProps().toggle(props.item);
              // }
            }}
            class="w-full h-full"
          >
            <NewPotentialDropItem
              item={props.item}
              activeItem={() => ({id: 1, name: "test"})}
              clickable
              isActive={
                getParentProps()
                  .activeItems()
                  .findIndex((i) => props.item.id === i.id) >= 0
              }
              lessGap
            />
          </div>
        ) : (
          <div class="w-[97%] h-[97%] rounded-6 animate-pulse bg-[#23253d]" />
        )}
      </div>
    );
  };

  const [sortedItemList, setSortedItemList] = createSignal([]);
  createEffect(() => {
    if (props.items()) {
      if (props.descending()) {
        setSortedItemList([...props.items()].reverse()); // create a copy before reversing
      } else {
        setSortedItemList([...props.items()]); // create a copy here as well for consistency
      }
    }
  });

  const calculateItemSize = (crossAxisSize) => {
    // Choose minimum size depending on the available space.
    const minWidth = crossAxisSize > 560 ? 150 : 117;

    const count = Math.floor(crossAxisSize / minWidth);
    const width = Math.floor(crossAxisSize / count);

    return {
      width,
      height: width / 0.81135024111,
    };
  };

  return (
    <>
      <div
        class={`w-full justify-center items-center h-[474px] lg:h-160 
         max-h-[60vh] overflow-y-scroll
        `}
      >
        <div
          class="show-scrollbar h-[474px] lg:h-160 
         max-h-[60vh]"
          style={{
            overflow: "auto",
            position: "relative",
            width: "100%",
          }}
          ref={(element) => {
            scrollTargetElement = element;
          }}
        >
          <VirtualContainer
            items={props.items().length > 0 ? sortedItemList() : Array(30)}
            scrollTarget={scrollTargetElement}
            // Calculate how many grid columns to show.
            itemSize={calculateItemSize}
            crossAxisCount={(measurements) =>
              Math.floor(
                measurements.container.cross / measurements.itemSize.cross
              )
            }
          >
            {ListItem}
          </VirtualContainer>
        </div>
      </div>
    </>
  );
};

export default NewItemsList;
