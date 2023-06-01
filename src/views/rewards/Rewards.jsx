import { onMount, createSignal, For, createEffect } from "solid-js";
import Coin from "../../utilities/Coin";

import RewardsBanerCases from "../../assets/img/rewards/RewardsBanerCases.png";
import Bg from "../../assets/img/rewards/rewardsBg.png";
import DiscordBanerBg from "../../assets/img/rewards/DiscordBanerBg.jpg";
import MainBanerBg from "../../assets/img/rewards/MainBanerBg.jpg";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import { URL } from "../../libraries/url";
import { NavLink } from "solid-app-router";
import injector from "../../injector/injector";

import PageLoadState from "../../libraries/PageLoadState";
import Fallback from "../Fallback";
let tomorrow;

const Rewards = ({ loaded }) => {
  const { socket, toastr } = injector;

  const [timeLeft, setTimeLeft] = createSignal("00:00:00:00");
  const [items, setItems] = createSignal([]);
  const [userDailyDeposit, setUserDailyDeposit] = createSignal(0);
  const [discordUserId, setDiscordUserId] = createSignal();

  const [isPageLoaded, setIsPageLoaded] = createSignal(false)

  const { rewardsPageLoaded, onRewardsPageLoaded } = PageLoadState;

  const countdown = () => {
    if (tomorrow) {
      const left = Math.floor((tomorrow.getTime() - Date.now() || 0) / 1000);

      const days = Math.floor(left / (24 * 3600));
      const hours = Math.floor((left % (24 * 3600)) / 3600);
      const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60);
      const seconds = (left % (24 * 3600)) % 60;

      setTimeLeft(
        `${`0${days}`.slice(-2)}:${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(
          -2
        )}:${`0${seconds}`.slice(-2)}`
      );
    }
  };

  createEffect(() => {
    if(loaded()) {
      countdown();
      socket.emit("rewards:cases", {}, (data) => {
        setItems(data.cases);
        setUserDailyDeposit(data.userDailyDeposit || 0);
        tomorrow = new Date(Number(data.counterEnding));
        setDiscordUserId(data.userDiscordId);

        onRewardsPageLoaded(true)
      });
    }
  });

  setInterval(countdown, 1000);

  return (
    <>
    <Fallback loaded={rewardsPageLoaded}>
      <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
      <div class="w-full h-full flex flex-col gap-10 overflow-y-scroll relative ">
        <div
          class="flex flex-col md:flex-row justify-center items-center py-5 mt-4 bg-no-repeat bg-cover lg:bg-full"
          style={{
            "background-image": `url(${MainBanerBg})`,
          }}
        >
          <div class="flex flex-col w-11/12 md:w-5/12">
            <div class="mb-4 flex flex-row items-end">
              <h1 class="text-yellow-ff uppercase text-32 font-Oswald font-bold">
                DAILY CASES
              </h1>
              <span class="ml-3 mb-3 cursor-pointer relative group text-white hover:text-yellow-ff">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 0C5.61553 0 4.26215 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303304 5.6003 -0.13559 7.00776 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67878 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.9978 5.14416 13.2596 3.36495 11.9473 2.05267C10.635 0.74039 8.85584 0.00218939 7 0Z"
                    class="fill-current"
                  />
                  <path
                    d="M9.69137 5.54553C9.69209 5.94223 9.60323 6.33398 9.43144 6.69155C9.25964 7.04912 9.00933 7.36328 8.69918 7.61062L8.69809 7.61149L8.69808 7.61149C8.2357 7.9698 7.92303 8.48721 7.82084 9.06318L7.80619 9.14571H7.72237H6.42928H6.31716L6.32994 9.03432C6.38772 8.53044 6.54582 8.04323 6.7949 7.60143C7.04384 7.15986 7.37862 6.77259 7.77953 6.4624C7.92368 6.34687 8.0385 6.19891 8.11463 6.03058C8.19087 5.862 8.22615 5.67777 8.21757 5.49295C8.20899 5.30813 8.15681 5.12796 8.06528 4.96717C7.97378 4.80642 7.84555 4.6696 7.69108 4.56788C7.51846 4.45509 7.31986 4.38831 7.11416 4.37391C6.90854 4.35952 6.70265 4.39794 6.51605 4.48552C6.31808 4.58049 6.15194 4.73091 6.03781 4.9185C5.92361 5.1062 5.86641 5.32304 5.87315 5.54265L5.87324 5.54571H5.87319C5.87319 5.74101 5.79561 5.92831 5.65752 6.0664C5.51942 6.2045 5.33213 6.28208 5.13683 6.28208C4.94153 6.28208 4.75424 6.2045 4.61614 6.0664C4.47828 5.92854 4.40072 5.74163 4.40047 5.54668C4.39082 5.03827 4.53118 4.53827 4.80404 4.10916C5.07706 3.67979 5.47062 3.34044 5.93548 3.13356C6.34696 2.94969 6.79811 2.87238 7.24733 2.90876C7.69658 2.94515 8.12944 3.09408 8.50597 3.34181L8.50621 3.34197C8.87026 3.58296 9.169 3.91031 9.37579 4.29482C9.58257 4.6793 9.69099 5.10898 9.69137 5.54553ZM9.69137 5.54553C9.69137 5.54557 9.69137 5.5456 9.69137 5.54563L9.59137 5.54571L9.69137 5.54553ZM7.78228 10.0003V9.90026H7.68228H6.40956H6.30956V10.0003V11.273V11.373H6.40956H7.68228H7.78228V11.273V10.0003ZM8.63683 7.53244C8.15483 7.90595 7.8289 8.44531 7.72237 9.04571L8.63683 7.53244Z"
                    fill="#161B2A"
                    stroke="#161B2A"
                    stroke-width="0.2"
                  />
                </svg>
                <svg class="group-hover:block hidden absolute left-1/2 top-full transform -translate-x-1/2 rotate-180" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.95305 0.5H20.0469C21.2765 0.5 21.9838 1.89801 21.2554 2.88859L12.7085 14.5124C12.1091 15.3277 10.8909 15.3277 10.2915 14.5124L1.74458 2.88859C1.01622 1.89802 1.72352 0.5 2.95305 0.5Z" fill="#171B27" stroke="#272A3B"/>
                </svg>
                <span class="group-hover:flex hidden top-full left-1/2 absolute z-20 transform -translate-x-1/2 translate-y-2 py-3 px-5 bg-dark-17 border border-gray-30 text-gray-8c text-14 shadow-md rounded-2 flex-col w-80">
                    <p class="text-16 text-white">Rewards</p>
                    <p class="text-14">
                    Deposit within the timer to unlock the case rewards. When the
                    timer resets your cases will be available again! (Your
                    deposits also reset)
                    </p>
                </span>
              </span>
            </div>
            <p class="text-white text-18">
              The daily free case is available for everyone. Deposit throughout
              the day to open up each deposit-based case.{" "}
              <i>
                You can open <b>multiple</b> deposit-based cases daily as long
                as you're eligible for them.
              </i>
            </p>
          </div>
          <img
            class="w-11/12 md:w-5/12"
            src={RewardsBanerCases}
            alt="RewardsBanerCases"
          />
        </div>
        <div class="center flex-col w-full gap-2 relative">
          <div class="w-full center gap-5 sm:gap-10">
            <div
              class="flex-1 h-0.5"
              style={{
                background:
                  "linear-gradient(270deg, #434B71 0%, rgba(39, 47, 72, 0) 98.2%)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
            <p class="text-white text-24 sm:text-40 font-semibold font-Oswald uppercase tracking-wide">
              OPEN CASES
            </p>
            <div
              class="flex-1 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #434B71 0%, rgba(39, 47, 72, 0) 98.2%)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </div>
          <div class="flex gap-28 mb-5">
            {/* <div class="center flex-col gap-1">
              <p class="text-14 text-gray-8c font-normal sentence whitespace-nowrap">
                Resets in
              </p>
              <p class="text-16 text-gray-8c font-bold font-Oswald sentence">
                {timeLeft()}
              </p>
            </div> */}
            <div class="center flex-col gap-1">
              <p class="text-14 text-gray-8c font-normal sentence whitespace-nowrap">
                Deposited Into Shop Today
              </p>
              <div class="flex gap-2">
                <Coin />
                <p class="text-16 text-gray-8c font-bold font-Oswald sentence">
                  {userDailyDeposit()}
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-auto mb-9 relative">
            <For
              each={items()}
              fallback={
                <div class="absolute w-full center left-0 top-0">
                  <p class="text-yellow-ff text-20 font-semibold font-Oswald uppercase">
                    Loading
                  </p>
                </div>
              }
            >
              {(item) => (
                <NavLink
                  href={`${URL.CASE}?id=${item.id}`}
                  class={`w-full h-64 bg-dark-1c flex justify-between py-5 items-center transition-transform duration-100 transform hover:-translate-y-1 flex-col p-2 relative cursor-pointer overflow-hidden`}
                  style={{
                    background: `url(${item.background})`,
                    "background-size": "100% 100%",
                  }}
                >
                  <div class="center flex-col gap-1 relative max-w-full">
                    <p class="text-16 text-white font-bold max-w-full text-center">
                      {item.name}
                    </p>
                  </div>
                  <img
                    class="h-24 no-select relative z-10"
                    src={item.image}
                    alt={item.name}
                  />
                  {item.isCaseOpenedToday ? (
                    <div
                      class={`relative cursor-pointer w-40 h-10 group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden`}
                      style={{
                        "background-image": `url(${YellowButtonBg})`,
                      }}
                    >
                      <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                      <div
                        class="absolute left-0.5 top-0.5 h-9 bg-dark-1c1"
                        style={{ width: "calc(100% - 4px)" }}
                      />
                      <span class="text-yellow-ff text-12 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        ALREADY OPENED
                      </span>
                    </div>
                  ) : !discordUserId() && item.name === "Free Daily Case" ? (
                    <div class="flex justify-center gap-1 sm:gap-2 items-center text-14 text-gray-47 h-10">
                      <svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8333 7.00006V4.00003C10.8333 1.79498 8.88998 0 6.5 0C4.11069 0 2.16671 1.79498 2.16671 4.00003V7.00006C0.970061 7.00006 0 7.8956 0 8.99994V13.9999C0 15.1046 0.970061 16 2.16671 16H10.8333C12.0297 16 13 15.1046 13 13.9999V8.99994C13 7.89557 12.0297 7.00006 10.8333 7.00006ZM7.0417 11.8466V13.4999C7.0417 13.7763 6.79947 13.9999 6.50004 13.9999C6.2006 13.9999 5.95833 13.7763 5.95833 13.4999V11.8466C5.64039 11.6729 5.41673 11.3661 5.41673 11C5.41673 10.4472 5.90182 9.99998 6.5 9.99998C7.09818 9.99998 7.58334 10.4472 7.58334 11C7.58337 11.3661 7.35946 11.6729 7.0417 11.8466ZM8.66657 7.00006H4.33336V4.00003C4.33336 2.89652 5.30503 1.99998 6.5 1.99998C7.6944 1.99998 8.66654 2.89652 8.66654 4.00003V7.00006H8.66657Z"
                          fill="#2D3660"
                        />
                      </svg>
                      Read Banner Below
                    </div>
                  ) : !item.canBeOpen &&
                    item.mindeposit <= userDailyDeposit() ? (
                    <div
                      class={`relative cursor-pointer w-40 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden`}
                      style={{ "background-image": `url(${GrayButtonBg})` }}
                    >
                      <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                      <span class="text-dark-1c text-14 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        OPEN
                      </span>
                    </div>
                  ) : item.mindeposit <= userDailyDeposit() ? (
                    <div
                      class={`relative cursor-pointer w-40 h-10 group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden`}
                      style={{ "background-image": `url(${YellowButtonBg})` }}
                    >
                      <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                      <span class="text-dark-1c text-14 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        OPEN
                      </span>
                    </div>
                  ) : (
                    <div class="flex justify-center gap-1 sm:gap-2 items-center text-14 text-gray-47 h-10">
                      <svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8333 7.00006V4.00003C10.8333 1.79498 8.88998 0 6.5 0C4.11069 0 2.16671 1.79498 2.16671 4.00003V7.00006C0.970061 7.00006 0 7.8956 0 8.99994V13.9999C0 15.1046 0.970061 16 2.16671 16H10.8333C12.0297 16 13 15.1046 13 13.9999V8.99994C13 7.89557 12.0297 7.00006 10.8333 7.00006ZM7.0417 11.8466V13.4999C7.0417 13.7763 6.79947 13.9999 6.50004 13.9999C6.2006 13.9999 5.95833 13.7763 5.95833 13.4999V11.8466C5.64039 11.6729 5.41673 11.3661 5.41673 11C5.41673 10.4472 5.90182 9.99998 6.5 9.99998C7.09818 9.99998 7.58334 10.4472 7.58334 11C7.58337 11.3661 7.35946 11.6729 7.0417 11.8466ZM8.66657 7.00006H4.33336V4.00003C4.33336 2.89652 5.30503 1.99998 6.5 1.99998C7.6944 1.99998 8.66654 2.89652 8.66654 4.00003V7.00006H8.66657Z"
                          fill="#2D3660"
                        />
                      </svg>
                      Deposit
                      <Coin />
                      <span class="font-Oswald">
                        {item.mindeposit.toLocaleString()}
                      </span>
                    </div>
                  )}
                </NavLink>
              )}
            </For>
          </div>
          {!discordUserId() ? (
            <div
              class="flex justify-center md:justify-start md:pl-40 items-center py-5 mt-4 bg-cover lg:bg-full w-full"
              style={{
                "background-image": `url(${DiscordBanerBg})`,
              }}
            >
              <div class="w-11/12 md:w-full max-w-md block">
                <div class="mb-4 flex flex-row items-end">
                  <h2 class="text-yellow-ff uppercase text-40 font-Oswald">
                    LINK DISCORD
                  </h2>
                </div>
                <p class="text-white text-18 mb-4">
                  In order to open up the daily free cases please{" "}
                  <a
                    class="underline text-yellow-ff"
                    href="https://discord.com/invite/rustyloot"
                    target="_blank"
                  >
                    first
                  </a>{" "}
                  join our Discord server and{" "}
                  <a
                    class="underline text-yellow-ff"
                    href={`https://rustyloot.gg/discord`}
                    target="_blank"
                  >
                    second
                  </a>{" "}
                  
                </p>
                <div class="flex gap-2 flex-wrap">
                  <a
                    class="relative block cursor-pointer h-11 w-72 center hover flex-1 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                    style={{ "background-image": `url(${YellowButtonBg})` }}
                    href="https://discord.com/invite/rustyloot"
                    target="_blank"
                  >
                    <div class="scrolling-btn-image hidden group-hover:block" />
                    <span class="text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald">
                      <svg
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z"
                          fill="#161B2A"
                        />
                      </svg>
                      JOIN DISCORD
                    </span>
                  </a>
                  <a
                    class="relative block cursor-pointer h-11 w-72 center hover flex-1 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                    style={{ "background-image": `url(${YellowButtonBg})` }}
                    href={`https://rustyloot.gg/discord/`}
                    target="_blank"
                  >
                    <div class="scrolling-btn-image hidden group-hover:block" />
                    <span class="text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald">
                      <svg
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z"
                          fill="#161B2A"
                        />
                      </svg>
                      Authorize account
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      </Fallback>
    </>
  );
};

export default Rewards;
