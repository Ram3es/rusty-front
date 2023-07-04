import { createSignal, onMount } from "solid-js";

import { NavLink } from "solid-app-router";

import injector from "../../injector/injector";

import { useI18n } from "../../i18n/context";
import { URL } from "../../libraries/url";

import CaseGradientButton from "../../components/elements/CaseGradientButton";

import Logo from "../../assets/smallLogo.svg";

import RedCoin from "../../assets/img/coinflip/redcoin.svg";
import BlackCoin from "../../assets/img/coinflip/blackcoin.svg";

import Coin from "../../utilities/Coin";
import EyeIcon from "../../components/icons/EyeIcon";
import CoinflipUsersRow from "./CoinflipUserRow";
import CoinFlipItemsRow from "./CoinFlipItemsRow";
import DoubleDownIcon from "../../components/icons/DoubleDownIcon";
import DoubleDownIconSmall from "../../components/icons/DoubleDownIconSmall";

const CoinflipItem = (props) => {
  const [counter, setCounter] = createSignal(0);

  const { userObject } = injector;

  const i18n = useI18n();

  onMount(() => {
    setInterval(() => {
      if (props.game?.status !== "open") {
        setCounter(
          Math.floor((props.game?.timestamp - Date.now()) / 1000) || 0
        );
      }
    }, 1000);
  });

  const skinList = props.game?.opponent?.items
    ? props.game?.creator?.items.concat(props.game?.opponent?.items)
    : props.game?.creator?.items;

  return (
    <div
      class="border border-white/5 rounded-6 lg:flex items-center justify-between gap-4 lg:gap-0 h-full py-3 lg:py-0 lg:h-[86px]"
      style={{
        background: `radial-gradient(100% 991.18% at 0% 50%, rgba(29, 35, 82, 0.56) 0%, rgba(29, 31, 48, 0.56) 100%), 
           radial-gradient(100% 991.18% at 100% 50%, #1F2344 0%, #23253D 100%)`,
        transform: "translate3d(0,0,0)",
      }}
    >
      <div class="hidden lg:flex items-center h-full">
        <CoinflipUsersRow game={props?.game} />

        <CoinFlipItemsRow skinList={skinList} />
      </div>
      <div class="grid grid-cols-8 grid-rows-3 lg:grid-rows-none lg:grid-cols-[1fr_1fr_2fr] lg:justify-items-end items-center px-4 gap-1 ssm:gap-4 xl:gap-1 xll:gap-6 fourk:gap-16">
        <CoinflipUsersRow game={props?.game} mobile />
        <div class="col-span-2 lg:col-auto row-start-1 lg:w-[100px]">
          {props.game?.isDoubleDown && (
            <div
              class="flex items-center"
              style={{
                filter: "drop-shadow(0px 0px 36px rgba(235, 172, 50, 0.48))",
              }}
            >
              <DoubleDownIcon classes="hidden lg:block" />
              <DoubleDownIconSmall classes="lg:hidden" />
            </div>
          )}
        </div>
        <div class="col-span-3 lg:col-auto row-start-1 lg:w-36 flex items-center">
          <div class="flex items-center gap-1 ssm:gap-[9px]">
            <Coin width="6" />
            <span class="font-bold text-14 ssm:text-16 llg:text-16 xll:text-19 font-SpaceGrotesk coinflip-game--price truncate">
              {Number(
                (props.game?.creator?.value || 0) +
                  (props.game?.opponent?.value || 0)
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <CoinFlipItemsRow skinList={skinList} mobile />
        <div class="col-span-8 lg:col-auto row-start-3 lg:row-auto flex items-center place-items-end gap-2 w-full lg:w-[180px] xxl:w-[197px] lg:justify-end">
          {(props.game?.status === "spinning" ||
            props.game?.status === "ended" ||
            userObject.user.id === props.game?.creator?.id) && (
            <NavLink
              class={`px-4 w-full text-gray-9a h-10 flex items-center justify-center gap-2 relative rounded-4 border border-white/10`}
              href={`${URL.GAMEMODES.COINFLIP_GAME}?id=${props.id}${
                props.game?.status === "ended" ? "&vuew=true" : ""
              }`}
              style={{
                background:
                  "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
              }}
            >
              {((userObject.user.id === props.game?.creator?.id &&
                props.game?.status === "ended") ||
                props.game?.status === "ended") && (
                <div class="w-[15.65px] h-[16.25px]">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.53845 0.385498C9.69274 0.385498 11.7591 1.23993 13.2843 2.76139C14.0388 3.51594 14.6373 4.41172 15.0457 5.39759C15.4541 6.38345 15.6642 7.4401 15.6642 8.50719C15.6642 9.57429 15.4541 10.6309 15.0457 11.6168C14.6373 12.6027 14.0388 13.4984 13.2843 14.253C12.5297 15.0075 11.6339 15.6061 10.6481 16.0144C9.66219 16.4228 8.60554 16.633 7.53845 16.633C6.47136 16.633 5.41471 16.4228 4.42885 16.0144C3.44298 15.6061 2.5472 15.0075 1.79265 14.253C1.73295 14.1953 1.68533 14.1264 1.65258 14.0501C1.61982 13.9738 1.60258 13.8918 1.60185 13.8088C1.60113 13.7258 1.61695 13.6435 1.64838 13.5667C1.6798 13.4899 1.72622 13.4201 1.7849 13.3614C1.84359 13.3027 1.91338 13.2563 1.9902 13.2249C2.06701 13.1935 2.14932 13.1776 2.23232 13.1784C2.31531 13.1791 2.39733 13.1963 2.47359 13.2291C2.54985 13.2618 2.61882 13.3095 2.67648 13.3692C3.63807 14.3307 4.86318 14.9855 6.1969 15.2507C7.53061 15.516 8.91303 15.3798 10.1693 14.8593C11.4257 14.3389 12.4994 13.4577 13.2549 12.327C14.0104 11.1963 14.4136 9.86703 14.4136 8.50719C14.4136 7.14736 14.0104 5.81805 13.2549 4.68738C12.4994 3.55671 11.4257 2.67545 10.1693 2.15504C8.91303 1.63462 7.53061 1.49843 6.1969 1.76368C4.86318 2.02893 3.63807 2.68371 2.67648 3.64522L1.91579 4.40653H4.37537C4.54114 4.40653 4.70013 4.47239 4.81735 4.58961C4.93457 4.70683 5.00042 4.86581 5.00042 5.03159C5.00042 5.19736 4.93457 5.35634 4.81735 5.47356C4.70013 5.59078 4.54114 5.65664 4.37537 5.65664H0.625053C0.459279 5.65664 0.300294 5.59078 0.183074 5.47356C0.0658537 5.35634 0 5.19736 0 5.03159V1.28127C0 1.11549 0.0658537 0.956509 0.183074 0.839288C0.300294 0.722068 0.459279 0.656215 0.625053 0.656215C0.790827 0.656215 0.949812 0.722068 1.06703 0.839288C1.18425 0.956509 1.25011 1.11549 1.25011 1.28127V3.30456L1.79265 2.76139C3.31782 1.23993 5.38416 0.385498 7.53845 0.385498ZM6.57245 11.6553C6.47524 11.7137 6.36397 11.7446 6.25054 11.7446C6.08477 11.7446 5.92578 11.6788 5.80856 11.5616C5.69134 11.4443 5.62549 11.2854 5.62549 11.1196V6.44419C5.62518 6.3334 5.65432 6.22452 5.70993 6.1287C5.76554 6.03287 5.84562 5.95355 5.94197 5.89886C6.03832 5.84416 6.14748 5.81606 6.25827 5.81743C6.36905 5.8188 6.47748 5.84959 6.57245 5.90665L10.4678 8.24622C10.5602 8.30179 10.6367 8.38032 10.6897 8.47419C10.7428 8.56805 10.7707 8.67406 10.7707 8.78189C10.7707 8.88973 10.7428 8.99573 10.6897 9.08959C10.6367 9.18346 10.5602 9.26199 10.4678 9.31756L6.57245 11.6553Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
              {((userObject.user.id === props.game?.creator?.id &&
                props.game?.status === "open") ||
                props.game?.status === "spinning") && <EyeIcon />}
              <span class="text-gray-9a font-bold text-14 font-SpaceGrotesk capitalize">
                {((userObject.user.id === props.game?.creator?.id &&
                  props.game?.status === "ended") ||
                  props.game?.status === "ended") &&
                  i18n.t("coinflip.View outcome")}
                {((userObject.user.id === props.game?.creator?.id &&
                  props.game?.status === "open") ||
                  props.game?.status === "spinning") &&
                  "View Coinflip"}
              </span>
              {((userObject.user.id === props.game?.creator?.id &&
                props.game?.status === "ended") ||
                props.game?.status === "ended") && (
                <img
                  alt="coin"
                  class="w-6 h-6 absolute -right-2.5 bottom-6"
                  src={props.game?.side === 1 ? RedCoin : BlackCoin}
                />
              )}
            </NavLink>
          )}
          {(props.game?.status === "pending" ||
            props.game?.status === "counting") && (
            <div
              class={`px-3 flex justify-center items-center w-full lg:w-[140px] xxl:w-full h-10 rounded-4 gap-[18px]`}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                "box-shadow":
                  "0px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.12)",
              }}
            >
              {props.game?.status === "pending" && (
                <div class="w-5 h-5 rounded-full">
                  <img
                    alt="avatar"
                    class="w-full h-full rounded-full"
                    src={props.game?.opponent?.avatar ?? Logo}
                  />
                </div>
              )}
              <div
                class={`${props.game?.status === "pending" && "text-gray-9a"} ${
                  props.game?.status === "counting" && "text-yellow-ffb"
                } capitalize font-bold font-SpaceGrotesk text-12 `}
                style={{
                  "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                }}
              >
                {props.game?.status === "pending"
                  ? "Joining"
                  : props.game?.status === "counting"
                  ? "Starting"
                  : ""}{" "}
                <span
                  class={`${props.game?.status === "pending" && "text-white"}`}
                >
                  {counter()}
                </span>
              </div>
            </div>
          )}
          {props.game?.status === "open" &&
            userObject.user.id !== props.game?.creator?.id && (
              <NavLink
                href={`${URL.GAMEMODES.COINFLIP_JOIN}?id=${props.id}&value=${props.game?.creator?.value}`}
                class="w-full"
              >
                <CaseGradientButton isFullWidth>
                  <span
                    class="w-full text-center text-yellow-ffb font-SpaceGrotesk text-16 font-bold"
                    style={{
                      "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {i18n.t("coinflip.Join")}
                  </span>
                </CaseGradientButton>
              </NavLink>
            )}
          {userObject.user.id !== props.game?.creator?.id &&
            props.game?.status !== "spinning" &&
            props.game?.status !== "ended" && (
              <NavLink
                href={`${URL.GAMEMODES.COINFLIP_GAME}?id=${props.id}`}
                class="flex items-center justify-center w-[51px] h-10 rounded-4 border border-white/10 text-gray-9a"
                style={{
                  background:
                    "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                  "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                }}
              >
                <EyeIcon />
              </NavLink>
            )}
        </div>
      </div>
    </div>
  );
};

export default CoinflipItem;
