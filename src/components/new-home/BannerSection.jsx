import { Show } from "solid-js";
import ribbed from "./img/ribbed.png";
import welcomeBg from "./img/welcome-bg-image.png";
import coinsStack from "./img/green-coins-stack.png";
import intersect from "./img/welcome-intersect.png";
import CaseGradientButton from "../elements/CaseGradientButton";
import Coin from "../../utilities/Coin";
import GreenText from "../mines_new/MISC/GreenText";
import { formatNumber } from "../../utilities/Numbers";
import GoldRay from "../icons/GoldRay";
import Ranks from "../../utilities/Ranks";
import RankLabel from "../chat/RankLabel";
import injector from "../../injector/injector";
import { playCashoutSound } from "../../utilities/Sounds/SoundButtonClick";
import FreeCasesSwiper from "./FreeCasesSwiper";

export const RoundedBtn = (props) => {
  return (
    <div
      onClick={() => props.handleClick()}
      class={`${props.additionalClasses} cursor-pointer`}
    >
      <div
        class={`${
          props.background ?? "home-slider-btn"
        }  w-8 h-8 rounded-full shadow-button center`}
      >
        {props.children}
      </div>
    </div>
  );
};

const BannerSection = () => {
  const { userObject, socket, toastr, setUserObject } = injector;

  console.log(userObject, "userObject");

  let rakebackClaim = () => {
    socket.emit("system:rakeback:claim", {}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        playCashoutSound();
      }

      if (!data.error) {
        setUserObject("user", (prev) => ({ ...prev.user, rakeback: 0 }));
      }
    });
  };

  return (
    <div class="center gap-5 w-full h-full">
      <div
        class="col-span-3 md:col-span-2 rounded-8 overflow-hidden w-full max-w-[1152px]"
        style={{
          background:
            "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)",
        }}
      >
        <div class="grid grid-cols-[1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] ">
          <div
            class={`h-[200px] min-w-[340px] col-span-2 md:col-span-1 relative home-welcome--bg p-[22px]`}
          >
            <img
              src={welcomeBg}
              alt="bg"
              class="absolute left-0 top-0 w-full h-full mix-blend-luminosity"
            />
            <img
              src={intersect}
              alt="intersect"
              class="absolute left-0 bottom-0 object-cover w-full"
            />
            <h2 class="text-2xl font-bold font-SpaceGrotesk mx-auto text-center home-welcome--text">
              Welcome
            </h2>
            <Show when={userObject.authenticated}>
              <>
                <div class="flex items-center justify-center -translate-y-2">
                  <GoldRay additionalClasses="rotate-180" />
                  <div class="rounded-full border border-gold-ffc w-max p-1">
                    <img
                      class="w-12 rounded-full"
                      src={userObject.user?.avatar || ""}
                      alt="blue-box"
                    />
                  </div>
                  <GoldRay additionalClasses="" />
                </div>
                <div
                  class="flex flex-wrap center h-[26px] mx-auto gap-x-2 text-sm font-bold w-max whitespace-nowrap px-2.5 rounded"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                    "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Ranks
                    width={7}
                    staff={userObject?.user?.rank}
                    rank={userObject?.user?.level?.league}
                  />
                  <RankLabel
                    staff={userObject?.user?.rank}
                    rank={userObject?.user?.level?.league}
                  />
                  <span class="text-gray-9aa truncate max-w-[100px]">
                    {userObject?.user?.username}
                  </span>
                </div>
                <div class="mt-4 flex justify-center items-center relative h-8 max-w-[232px]  mx-auto">
                  <div class="w-full max-w-[200px] h-2 rounded-[2px] overflow-hidden home-progress-bg ">
                    <div
                      class="h-full rounded-[2px] duration-200"
                      style={{
                        background:
                          "linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)",
                        width: `${
                          (userObject?.user?.wagered -
                            userObject?.user?.level?.from * 1000) /
                          (userObject?.user?.level?.to * 10)
                        }%`,
                      }}
                    />
                  </div>
                  <div class="absolute  left-0">
                    <Ranks width="8" rank={userObject?.user?.level?.league} />
                  </div>
                  <div class="absolute  right-0">
                    <Ranks width="8" rank={userObject?.user?.level?.next} />
                  </div>
                </div>
              </>
            </Show>
          </div>
          <div class="relative grid home-daily--bg min-h-[200px]">
            <img src={ribbed} alt="bg" class="absolute inset-0 h-full w-full" />
            <FreeCasesSwiper />
          </div>
          <div class=" flex flex-col items-center justify-between p-3 relative home-rakeback--bg">
            <span class="text-gradient-green-secondary  font-SpaceGrotesk font-bold text-base ">
              Rakeback
            </span>
            <CaseGradientButton color="mint" callbackFn={() => rakebackClaim()}>
              <div class="flex items-center gap-2 font-bold text-sm font-SpaceGrotesk text-green-27 text-shadow-base ">
                <span>Claim</span>
                <Coin width="5" />
                <GreenText
                  size="14"
                  text={formatNumber(userObject?.user?.rakeback || 0)}
                />
              </div>
            </CaseGradientButton>

            <img src={ribbed} class="absolute inset-0 min-h-full min-w-full" />
            <img
              src={coinsStack}
              alt="coins-stack"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
