import GoldText from "../shared/GoldText";
import {getCurrencyString} from "../mines_new/utils/tools";
import CoinStack from "../../assets/img/case-battles/CoinStack.png";

import PullsRLGold from "../../assets/img/case-battles/PullsRLGold.png";
import PullsRLPurple from "../../assets/img/case-battles/PullsRLPurple.png";
import PullsRLBlue from "../../assets/img/case-battles/PullsRLBlue.png";
import PullsRLRed from "../../assets/img/case-battles/PullsRLRed.png";
import PullsRLGray from "../../assets/img/case-battles/PullsRLGray.png";

import SmallBgGold from "../../assets/img/case-battles/SmallBgGold.png";
import SmallBgPurple from "../../assets/img/case-battles/SmallBgPurple.png";
import SmallBgBlue from "../../assets/img/case-battles/SmallBgBlue.png";
import SmallBgRed from "../../assets/img/case-battles/SmallBgRed.png";
import SmallBgGray from "../../assets/img/case-battles/SmallBgGray.png";

const pullsRL = {
  gold: PullsRLGold,
  purple: PullsRLPurple,
  blue: PullsRLBlue,
  red: PullsRLRed,
  gray: PullsRLGray,
};

const smallBg = {
  gold: SmallBgGold,
  purple: SmallBgPurple,
  blue: SmallBgBlue,
  red: SmallBgRed,
  gray: SmallBgGray,
};

const rgb = {
  gold: "235, 172, 50",
  purple: "214, 48, 255",
  blue: "40, 152, 255",
  red: "255, 27, 27",
  gray: "198, 198, 198",
};

const SmallItemCardNew = (props) => {
  return (
    // <div
    //   class="flex items-center justify-center w-full h-full rounded-md p-[1px]"
    //   style={{
    //     background: `linear-gradient(143.59deg, rgba(${
    //       rgb[props.color]
    //     }, 0.32) -0.86%, rgba(${rgb[props.color]}, 0) 20.95%),
    //                       linear-gradient(321.42deg, rgba(${
    //                         rgb[props.color]
    //                       }, 0.32) 0%, rgba(${rgb[props.color]}, 0) 15.48%),
    //                       linear-gradient(180deg, rgba(255, 255, 255, 0.08) 38.3%, rgba(255, 255, 255, 0.01) 100%)`,
    //   }}
    // >
    //   <div class="w-full h-full bg-dark-secondary rounded-md">
    //     <div
    //       class="w-full h-full rounded-md flex items-center justify-center flex-col gap-2"
    //       style={{
    //         background: `radial-gradient(64.83% 52.59% at 0% 0%, rgba(${
    //           rgb[props.color]
    //         }, 0.16) 0%, rgba(${rgb[props.color]}, 0) 100%),
    //                       radial-gradient(80.69% 44.35% at 50% 24.46%, #1F2344 0%, rgba(35, 37, 61, 0) 100%),
    //                       radial-gradient(69.91% 41.51% at 100% 100%, rgba(${
    //                         rgb[props.color]
    //                       }, 0.12) 0%, rgba(${rgb[props.color]}, 0) 100%)`,
    //       }}
    //     >
    //       <div class="relative flex items-center justify-center h-[55%]">
    //         <img src={props.item.image} alt="" class="h-[100%]" />
    //         <img
    //           src={pullsRL[props.color]}
    //           alt=""
    //           class="absolute h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    //         />
    //       </div>
    //       <div class="flex items-center justify-center gap-1 translate-y-1">
    //         <img src={CoinStack} alt="" />
    //         <GoldText
    //           text={getCurrencyString(props.item.item_price)}
    //           size={"15"}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="relative">
      <img src={smallBg[props.color]} alt="" class="" />
      <div
        class="absolute flex items-center justify-center h-[55%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex-col"
      >
        <img src={props.item.image} alt="" class="h-[100%]" />
        <div class="flex items-center justify-center gap-1 translate-y-1">
          <img src={CoinStack} alt="" />
          <GoldText
            text={getCurrencyString(props.item.item_price)}
            size={"15"}
          />
        </div>
      </div>
    </div>
  );
};

export default SmallItemCardNew;
