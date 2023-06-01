import { STEAM } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import ItemGray from "../../assets/img/itemsBackground/ItemGray.png";
import ItemBlue from "../../assets/img/itemsBackground/ItemBlue.png";
import ItemPurple from "../../assets/img/itemsBackground/ItemPurple.png";
import ItemRed from "../../assets/img/itemsBackground/ItemRed.png";
import ItemGold from "../../assets/img/itemsBackground/ItemGold.png";
import LazyImage from "../LazyImage";
import { For, mergeProps, createSignal, createEffect } from "solid-js";
import { playHoverItemSound } from "../../utilities/Sounds/ItemsSound";
import PageLoader from "../PageLoader";
import PotentialDropItem from "../../views/case/PotentialDropItem";

const Items = (_props) => {
  const props = mergeProps({ activeItems: () => [] }, _props);
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false)
  let paymentModalWrapper;

  const checkImageLoaded = () => {
    const updateStatus = (images) => {
        setIsItemsLoaded(
          images.map((image) => image.complete).every((item) => item === true)
        );
      };

      const imagesLoaded = Array.from(paymentModalWrapper.querySelectorAll("img"));
      if (imagesLoaded.length === 0) {
        return;
      }
      imagesLoaded.forEach((image) => {
        image.addEventListener("load", () => updateStatus(imagesLoaded), {
          once: true
        });
        image.addEventListener("error", () => updateStatus(imagesLoaded), {
          once: true
        });
      });
  }

  

  createEffect(() => {
    console.log("props items", props.items());

    if(props.items()?.length > 0) return;

    setIsItemsLoaded(false);
  })

  createEffect(() => {
    if (!isItemsLoaded() && props?.items()?.length) {
      checkImageLoaded()
    }
  })

  return (
    <>
      <div
        class={`w-full justify-center items-center h-160 ${props.heightClasses ?? "max-h-[60vh] overflow-y-scroll"}`}
      >
        <div
          id="itemsWrapper"
          ref={paymentModalWrapper}
          class={`${isItemsLoaded() ? 'grid' : 'hidden'} ${props.itemsClasses ?? 'w-full grid-cols-2 md:grid-cols-skins gap-2 relative'}`}
        >
          {/* <div
            class={`w-full h-full ${
              props.disabled ? "" : "hidden"
            } z-20 bg-dark-16 bg-opacity-50 absolute bottom-0 left-0`}
          /> */}
          <For each={props.items()} fallback={<PageLoader size="small" isShown={true} />}>
            {(item, index) => (<div
                class={`rounded-4 ${
                  props.activeItems().findIndex((i) => item.id === i.id) >= 0
                    ? "border border-yellow-ffb"
                    : ""
                }`}
                onClick={() => {
                  if(Number(item.locked) != 1) {
                    props.toggle(item);
                  }
                }}
              >
                <PotentialDropItem skin={item} />
              </div>)}
          </For>
          
        </div>
        <PageLoader size="small" isShown={!isItemsLoaded()} />
      </div>
    </>
  );
};

export default Items;
