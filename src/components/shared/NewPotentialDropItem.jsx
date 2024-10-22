import {createSignal} from "solid-js";

import PotentialGold from "../../assets/img/new-upgrader/PotentialGold.png";
import PotentialRed from "../../assets/img/new-upgrader/PotentialRed.png";
import PotentialPurple from "../../assets/img/new-upgrader/PotentialPurple.png";
import PotentialBlue from "../../assets/img/new-upgrader/PotentialBlue.png";
import PotentialGray from "../../assets/img/new-upgrader/PotentialGray.png";
import CoinLogo from "./CoinLogo";

const getColor = (item_price) => {
  const color =
    item_price > 1000 * 100
      ? "gold"
      : item_price > 1000 * 30
      ? "red"
      : item_price > 1000 * 10
      ? "purple"
      : item_price > 1000 * 2
      ? "blue"
      : "gray";
  return color;
};

const bgImg = {
  gold: PotentialGold,
  red: PotentialRed,
  purple: PotentialPurple,
  blue: PotentialBlue,
  gray: PotentialGray,
};

const NewPotentialDropItem = (props) => {
  const [isLoaded, setIsLoaded] = createSignal(false);

  return (
    <div
      class={`relative z-10${props.lessGap ? " w-[97%]" : " w-[95%]"} ${
        props.lessGap ? "h-[97%]" : "h-[95%]"
      } rounded-md hover click-small ${props.clickable && "cursor-pointer"}
      ${!isLoaded() && "animate-pulse bg-[#262739]"}
      ${
        (props.clickable && props.item === props.activeItem()) || props.isActive
          ? "border border-[#FFB436] "
          : "border border-[#a2a5c600] "
      }}`}
    >
      <img
        src={bgImg[getColor(props.item.price)]}
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          "object-fit": "cover",
          "z-index": -1,
        }}
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded() && (
        <div
          class={`h-full flex flex-col justify-end items-center pb-3 gap-3 font-SpaceGrotesk font-semibold
          bg-[url(/assets/img/new-upgrader/PotentialGray.png)]`}
        >
          <img src={props.item.image} alt="" class="h-[60%]" loading="lazy" />
          <div class="w-full flex flex-col justify-center self-start px-4 ">
            <span class="text-[#A2A5C6] text-[14px] truncate max-w-full">
              {props.item.name}
            </span>
            <div class=" flex items-center gap-2">
              <CoinLogo h="15" />
              <span class="text-gradient text-16">
                {parseFloat(props.item.price).toLocaleString("en-US")}
                <span class="text-12">.00</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPotentialDropItem;
