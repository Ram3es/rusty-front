import ItemSplash from "../views/old-upgrader/itemSplash.svg";
import LazyImage from "./LazyImage";
import Coin from "../utilities/Coin";
import { Show, mergeProps } from "solid-js";
import { playHoverItemSound } from "../utilities/Sounds/ItemsSound";

const CardItem = (_props) => {
  const props = mergeProps({ isLazyImageShown: true }, _props);
  return (
    <div
      class={`w-full h-48 rounded-4 p-0.5 relative cursor-pointer ${
        props.activeItem()?.id == props.item.id ? "border border-yellow-ff" : ""
      }`}
      style={{
        background:
          props.activeItem()?.id !== props.item.id
            ? props.item.price > 1000 * 100
              ? "linear-gradient(0deg, #FFC701 -15%, #6C4224 40.04%, #202337 85.79%, #202337 95.09%)"
              : props.item.price > 1000 * 30
              ? "linear-gradient(0deg, #AA3737 0%, #202337 100%)"
              : props.item.price > 1000 * 10
              ? "linear-gradient(11.68deg, #6645AF 0%, #202337 50%, #202337 100%)"
              : props.item.price > 1000 * 2
              ? "linear-gradient(11.68deg, #439EF2 -44.03%, #22345E 33.77%, #202337 65.17%, #202337 123.09%)"
              : "linear-gradient(11.68deg, #BBCBF0 -20%, #232B3E 40%, #202337 70.5%, #202337 123.09%)"
            : "",
      }}
      onMouseEnter={() => playHoverItemSound()}
    >
      <div
        class={`w-full h-full rounded-4 relative cursor-pointer`}
        onClick={() => {
          props.setActive(props.item);
        }}
        style={{
          background:
            props.item.price > 1000 * 100
              ? "linear-gradient(191.68deg, #FFC701 -31.81%, #6C4224 18.04%, #202337 61.79%, #202337 123.09%)"
              : props.item.price > 1000 * 30
              ? "linear-gradient(191.68deg, #C22121 -23.06%, #753737 39.25%, #202337 85.66%, #202337 123.09%)"
              : props.item.price > 1000 * 10
              ? "linear-gradient(191.68deg, #823CC0 -44.03%, #322342 37.66%, #202337 76.36%, #202337 120.86%)"
              : props.item.price > 1000 * 2
              ? "linear-gradient(191.68deg, #439EF2 -44.03%, #22345E 33.77%, #202337 65.17%, #202337 123.09%)"
              : "linear-gradient(191.68deg, #BBCBF0 -44.03%, #232B3E 28.22%, #202337 70.5%, #202337 123.09%)",
        }}
      >
        <div
          class={`absolute right-0 top-0 w-5 h-5 bg-yellow-ff ${
            props.activeItem()?.id == props.item.id ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <svg
            width="9"
            height="7"
            viewBox="0 0 9 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.7545 0.19505C9.06099 0.47368 9.08358 0.948016 8.80495 1.25451L3.80495 6.7545C3.66699 6.90627 3.47289 6.99491 3.26784 6.99979C3.0628 7.00467 2.8647 6.92536 2.71967 6.78033L0.21967 4.28033C-0.0732233 3.98744 -0.0732233 3.51257 0.21967 3.21967C0.512563 2.92678 0.987436 2.92678 1.28033 3.21967L3.22414 5.16349L7.69504 0.2455C7.97367 -0.0609924 8.44801 -0.0835799 8.7545 0.19505Z"
              fill="#161B2A"
            />
          </svg>
        </div>
        <img alt="item-splash" src={ItemSplash} class={`w-full absolute`} />
        <div class="w-full h-full flex flex-col justify-between items-center py-4 px-4">
          <Show when={props.isLazyImageShown}>
            <LazyImage
              src={props.item.image}
              imageCalsses="h-20 relative z-10"
            />
          </Show>
          <Show when={!props.isLazyImageShown}>
            <img alt="item-image" src={props.item.image} class="h-20 relative z-10" />
          </Show>

          <div
            class={`absolute z-0 left-0 top-0 w-full h-full spinnerWrapper hidden`}
          >
            {/* <ItemSpinnerBg color={
                            item.price > 1000 * 100 ? (
                                "gold"
                            ) : item.price > 1000 * 30 ? (
                                "red"
                            ) : item.price > 1000 * 10 ? (
                                "purple"
                            ) : item.price > 1000 * 2 ? (
                                "blue"
                            ) : "gray"
                        } /> */}
          </div>
          <div class="flex flex-col items-center max-w-full overflow-hidden gap-1">
            <p class="text-16 text-gray-8c font-semibold truncate max-w-full">
              {props.item.name}
            </p>
            <div class="center gap-2">
              <Coin />
              <p class="text-14 text-white font-medium font-Oswald">
                {Number(props.item.price).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
