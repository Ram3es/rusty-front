import { For, mergeProps, createSignal, createEffect } from "solid-js";
import PageLoader from "../PageLoader";
import PotentialDropItem from "../../views/case/PotentialDropItem";

const Items = (_props) => {
  const props = mergeProps({ activeItems: () => [] }, _props);
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false);
  let paymentModalWrapper;

  createEffect(() => {
    if (props.items()?.length > 0) setIsItemsLoaded(true);
  });

  return (
    <>
      <div
        class={`w-full justify-center items-center h-[474px] lg:h-160 ${
          props.heightClasses ?? "max-h-[60vh] overflow-y-scroll"
        }`}
      >
        <div
          id="itemsWrapper"
          ref={paymentModalWrapper}
          class={`grid ${isItemsLoaded() ? "" : "opacity-0"} ${
            props.itemsClasses ??
            "w-full grid-cols-2 md:grid-cols-skins gap-2 relative"
          }`}
        >
          {/* <div
            class={`w-full h-full ${
              props.disabled ? "" : "hidden"
            } z-20 bg-dark-16 bg-opacity-50 absolute bottom-0 left-0`}
          /> */}
          <For each={props.items()}>
            {(item, index) => (
              <div
                // class={`rounded-4 ${
                //   props.activeItems().findIndex((i) => item.id === i.id) >= 0
                //     ? "border border-yellow-ffb"
                //     : ""
                // }`}
                data-withdrow-item
                onClick={() => {
                  if (Number(item.locked) != 1) {
                    props.toggle(item);
                  }
                }}
              >
                <PotentialDropItem
                  skin={item}
                  withdrawModalItem
                  activeItems={props.activeItems}
                  mobileTellCard
                />
              </div>
            )}
          </For>
        </div>
        <div
          class={`absolute left-0 top-0 w-full h-full ${
            !isItemsLoaded() ? "center" : "hidden"
          } `}
        >
          <PageLoader size="small" isShown={!isItemsLoaded()} />
        </div>
      </div>
    </>
  );
};

export default Items;
