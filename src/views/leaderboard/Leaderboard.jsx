import { createEffect, createSignal, For } from "solid-js";
import { useI18n } from "../../i18n/context";

import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import SilverTrophy from "../../assets/img/home/silverTrophy.png";
import GoldTrophy from "../../assets/img/home/goldTrophy.png";
import BronzeTrophy from "../../assets/img/home/bronzeTrophy.png";
import GoldBg from "../../assets/img/home/leaderboard/gold.png";
import SilverBg from "../../assets/img/home/leaderboard/silver.png";
import BronzeBg from "../../assets/img/home/leaderboard/bronze.png";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import BronzeButtonBg from "../../assets/img/animatedBronzeButtonBg.jpg";
import Logo from "../../assets/smallLogo.svg";
import Stripes from "../../assets/img/home/stripes.png";

import injector from "../../injector/injector";
import Fallback from "../Fallback";
import Ranks from "../../utilities/Ranks";
import Coin from "../../utilities/Coin";
import TableLeaderboard from "./TableLeaderboard";

const Leaderboard = () => {
  const { leaderboards } = injector;
  const [type, setType] = createSignal("daily");
  const [timeLeft, setTimeLeft] = createSignal("00:00:00:00");
  const [timeLimit, setTimeLimit] = createSignal(0);
  const i18n = useI18n();

  let clocksTimeLeft = 0;
  let timerInterval = null;

  const ranksBorderColor = {
    default: "from-bronze-a1 to-bronze-5e",
    bronze: "from-bronze-e1 to-bronze-a1",
    silver: "from-silver-d9 to-silver-8a",
    gold1: "from-gold-ff to-gold-e3",
    gold2: "from-gold-ff to-gold-e3",
    gold3: "from-gold-ff to-gold-e3",
    platinum1: "from-platinum-c8 to-platinum-34",
    platinum2: "from-platinum-c8 to-platinum-34",
    platinum3: "from-platinum-c8 to-platinum-34",
    diamond: "from-diamond-ca to-diamond-64",
  };

  const countdown = () => {
    const left = Math.floor(
      (leaderboards?.[type()]?.ending - Date.now() || 0) / 1000
    );

    const days = Math.floor(left / (24 * 3600));
    const hours = Math.floor((left % (24 * 3600)) / 3600);
    const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60);
    const seconds = (left % (24 * 3600)) % 60;

    setTimeLeft(
      `${`0${days}`.slice(-2)}:${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(
        -2
      )}:${`0${seconds}`.slice(-2)}`
    );
  };

  function calculateTimeFraction() {
    const passed = clocksTimeLeft / timeLimit();
    return passed >= 0 ? passed : 1;
  }

  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    // const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    const timer = document.getElementById("main-timer-path-remaining");
    if (timer) {
      timer.setAttribute("stroke-dasharray", circleDasharray);
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      // timePassed += 1;
      clocksTimeLeft = (leaderboards?.[type()]?.ending - Date.now()) / 1000;
      if (clocksTimeLeft <= 0 || !leaderboards?.[type()]?.ending) {
        clearInterval(timerInterval);
      }
      setCircleDasharray();
    }, 50);
  }

  createEffect(() => {
    countdown();
    clocksTimeLeft = (leaderboards?.[type()]?.ending - Date.now() || 0) / 1000;
    setTimeLimit(() => (type() === "daily" ? 86400 : 86400 * 7));
    startTimer();
  });

  setInterval(countdown, 1000);

  return (
    <Fallback loaded={() => true}>
      <div class="w-full h-full pt-8 flex flex-col gap-4 relative min-h-screen">
        <div
          id="leaderboardWrapper"
          class="center flex-col w-full gap-2 mt-20 relative"
        >
          <div class="w-full center gap-5 sm:gap-10">
            <div
              class="flex-1 h-0.5"
              style={{
                background:
                  "linear-gradient(270deg, #434B71 0%, rgba(39, 47, 72, 0) 98.2%)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
            <p class="text-yellow-ff text-24 sm:text-40 font-semibold font-Oswald uppercase tracking-wide">
              {i18n.t("home.leaderboard")}
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
          {/* <p class="text-16 text-white font-normal text-center">Complete with top players and earn free money. Top players will be displayed on this board below.</p> */}

          <div class="center gap-3 mb-2 mt-5">
            <div
              class={`relative min-w-20 center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden group hover`}
              style={{
                "background-image": `url(${
                  type() == "daily" ? YellowButtonBg : ""
                })`,
              }}
              onClick={() => setType("daily")}
            >
              <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
              <p
                class={`text-14 ${
                  type() == "daily" ? "text-dark-1b" : "text-gray-8c"
                } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
              >
                {i18n.t("home.daily")}
              </p>
            </div>
            <div
              class={`relative min-w-20 center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden group hover`}
              style={{
                "background-image": `url(${
                  type() == "weekly" ? YellowButtonBg : ""
                })`,
              }}
              onClick={() => setType("weekly")}
            >
              <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
              <p
                class={`text-14 ${
                  type() == "weekly" ? "text-dark-1b" : "text-gray-8c"
                } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
              >
                {i18n.t("home.weekly")}
              </p>
            </div>
          </div>
          <div class="flex justify-center items-center sm:items-end flex-col gap-1 sm:absolute right-0 bottom-2 relative">
            <p class="text-14 text-gray-8c font-normal sentence whitespace-nowrap">
              {i18n.t("home.ends in")}
            </p>
            <p class="text-16 text-gray-8c w-20 font-bold font-Oswald sentence flex gap-2 items-center justify-end">
              <span class="absolute right-full bottom-1 transform -translate-x-1/2">
                <svg
                  class="base-timer__svg w-4 h-4 rounded-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g class="base-timer__circle">
                    <circle cx="50" cy="50" r="45" />
                    <path
                      id="main-timer-path-remaining"
                      stroke-dasharray="283"
                      class="base-timer__path-remaining-circle"
                      d="
                          M 50, 50
                          m -45, 0
                          a 45,45 0 1,0 90,0
                          a 45,45 0 1,0 -90,0
                      "
                    />
                  </g>
                </svg>
                <svg
                  class="absolute -left-[15%] -top-[32%] w-[130%]"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3766 6.99383C14.9742 6.04169 14.395 5.18279 13.6637 4.45151C12.9275 3.71532 12.0736 3.14109 11.1214 2.73864C10.3999 2.43434 9.64412 2.23803 8.86376 2.15459V1.62453H9.45271C9.68829 1.62453 9.88461 1.43312 9.88461 1.19263V0.4319C9.88461 0.196318 9.6932 0 9.45271 0H6.55211C6.31653 0 6.12021 0.19141 6.12021 0.4319V1.19754C6.12021 1.43312 6.31162 1.62944 6.55211 1.62944H7.14107V2.15459C6.36561 2.23803 5.60979 2.43434 4.88341 2.73864C3.93127 3.14109 3.07238 3.72023 2.34109 4.45151C1.60981 5.18279 1.03067 6.04169 0.628218 6.99383C0.211042 7.98033 0 9.02572 0 10.1055C0 11.1852 0.211042 12.2355 0.628218 13.222C1.03067 14.1742 1.60981 15.0331 2.34109 15.7643C3.07728 16.5005 3.93127 17.0748 4.88341 17.4772C5.87482 17.8993 6.92021 18.1103 7.99996 18.1103C9.07971 18.1103 10.13 17.8993 11.1165 17.4821C12.0686 17.0797 12.9275 16.5005 13.6588 15.7692C14.395 15.033 14.9692 14.1791 15.3717 13.2269C15.7889 12.2404 15.9999 11.1901 15.9999 10.1104C16.0048 9.02572 15.7938 7.98033 15.3766 6.99383ZM7.99996 16.6821C4.37298 16.6821 1.42331 13.7324 1.42331 10.1055C1.42331 6.47849 4.37298 3.52882 7.99996 3.52882C11.6269 3.52882 14.5766 6.47849 14.5766 10.1055C14.5815 13.7324 11.6269 16.6821 7.99996 16.6821Z"
                    fill="#8C98A8"
                  />
                </svg>
              </span>
              {timeLeft()}
            </p>
          </div>
        </div>

        <div class="w-full flex flex-col gap-8 mt-20">
          <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4">
            <For
              each={
                leaderboards?.[type()]
                  ? [
                      ...([...(leaderboards?.[type()]?.players || []), 1, 2]
                        ?.slice(0, 2)
                        ?.reverse() || []),
                      ...(leaderboards?.[type()]?.players?.slice(2) || []),
                      1,
                      2,
                      3,
                    ]?.slice(0, 3)
                  : []
              }
            >
              {(val, i) => (
                <div
                  class={`w-full group relative flex flex-col items-center gap-4 mt-12 sm:mt-0 rounded-8 border ${
                    i() == 0 ? "order-2 lg:order-none border-silver-8c" : ""
                  } ${
                    i() == 1
                      ? "order-1 lg:order-none -top-6 border-yellow-ff"
                      : ""
                  } ${
                    i() == 2 ? "order-3 lg:order-none border-bronze-ff" : ""
                  }`}
                >
                  <div class="w-full h-full absolute left-0 top-0 overflow-hidden">
                    <img
                      alt="coin"
                      src={i() == 0 ? SilverBg : i() == 1 ? GoldBg : BronzeBg}
                      class={`w-full h-auto min-h-full absolute left-0 top-0 rounded-8`}
                    />
                  </div>
                  <div
                    class="absolute right-0 top-0 z-10 w-10 h-10 rounded-8 round flex justify-center items-center overflow-hidden"
                    style={{
                      "background-image": `url(${
                        i() == 0
                          ? GrayButtonBg
                          : i() == 1
                          ? YellowButtonBg
                          : BronzeButtonBg
                      })`,
                    }}
                  >
                    <div
                      class={`${
                        i() == 0
                          ? "scrolling-btn-image-gray"
                          : i() == 1
                          ? "scrolling-btn-image"
                          : "scrolling-btn-image-bronze"
                      } hidden group-hover:block absolute left-0 top-0`}
                    />
                    <span class="z-10">{i() == 0 ? 2 : i() == 1 ? 1 : 3}</span>
                  </div>
                  <div class="w-full h-full flex flex-col items-center relative z-10">
                    <div class="center relative -top-6">
                      <img
                        alt="trophy"
                        class={`${i() == 1 ? "w-24" : "w-20"} ${
                          i() == 0
                            ? "silver-shadow"
                            : i() == 1
                            ? "gold-shadow"
                            : "bronze-shadow"
                        } `}
                        src={
                          i() == 0
                            ? SilverTrophy
                            : i() == 1
                            ? GoldTrophy
                            : BronzeTrophy
                        }
                      />
                    </div>
                    <div class="center gap-2 mb-4">
                      <div
                        class={`w-11 h-11 rounded-full relative overflow-hidden p-sm bg-gradient-to-b ${
                          ranksBorderColor[val.level?.league] ?? ""
                        }`}
                      >
                        <img
                          class="w-full h-full rounded-full"
                          alt="leaderboard image"
                          src={val.avatar || Logo}
                        />
                      </div>
                      <Ranks staff={val?.rank} rank={val?.level?.league} />
                      <p class="text-18 text-white font-semibold">
                        {val.username || "?"}
                      </p>
                    </div>
                    <div class="flex gap-4 mb-4">
                      <div
                        class={`flex gap-1 sm:gap-3 py-2 px-3 rounded-6 ${
                          i() == 0
                            ? "silver-price-box-wrapper"
                            : i() == 1
                            ? "gold-price-box-wrapper"
                            : "bronze-price-box-wrapper"
                        }`}
                      >
                        <div class="mt-2">
                          <Coin />
                        </div>
                        <div class="flex flex-col gap-1 subwrapper py-2 px-3">
                          <p class="text-16 price font-bold font-Oswald leading-none">
                            {Number(val.reward || 0).toLocaleString()}
                          </p>
                          <p class="text-12 text-gray-8c font-normal capitalize">
                            {i18n.t("home.reward")}
                          </p>
                        </div>
                      </div>
                      <div
                        class={`flex gap-1 sm:gap-3 py-2 px-3 rounded-6 ${
                          i() == 0
                            ? "silver-price-box-wrapper"
                            : i() == 1
                            ? "gold-price-box-wrapper"
                            : "bronze-price-box-wrapper"
                        }`}
                      >
                        <div class="mt-2">
                          <Coin />
                        </div>
                        <div class="flex flex-col gap-1 subwrapper py-2 px-3">
                          <p class="text-16 price font-bold font-Oswald leading-none">
                            {Number(val.wager || 0).toLocaleString()}
                          </p>
                          <p class="text-12 text-gray-8c font-normal capitalize">
                            {i18n.t("home.wagered")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="block sm:hidden w-full h-11"
                    style={{
                      "background-image": `url(${
                        i() == 0
                          ? GrayButtonBg
                          : i() == 1
                          ? YellowButtonBg
                          : BronzeButtonBg
                      })`,
                    }}
                  />
                </div>
              )}
            </For>
          </div>
          <TableLeaderboard players={leaderboards[type()]?.players} />
          <div class="w-full flex flex-col items-center bet-info-bg p-5">
            <div class="w-11/12 h-12 hidden sm:grid gap-2 sm:gap-0 sm:grid-cols-leaderboard">
              <div class="flex items-center gap-2">
                <p class="text-14 text-gray-8c font-normal capitalize">
                  {i18n.t("home.place")}
                </p>
              </div>
              <p class="text-14 text-gray-8c font-normal capitalize my-auto">
                {i18n.t("home.user")}
              </p>
              <p class="text-14 text-gray-8c font-normal capitalize my-auto">
                {i18n.t("home.reward")}
              </p>
              <div class="flex items-center gap-2">
                <p class="text-14 text-gray-8c font-normal capitalize">
                  {i18n.t("home.wagered")}
                </p>
              </div>
            </div>
            <div class="w-full">
              <For each={leaderboards?.[type()]?.players}>
                {(val, i) => (
                  <div class="w-full sm:h-12 relative cursor-pointer center group mb-2">
                    <div class="w-full h-full flex items-center justify-center bg-dark-26/30 group-hover:bg-none transition transform hover:scale-x-sm duration-200">
                      <svg
                        class="absolute left-0 top-0"
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 9.5V0H11L0 9.5Z" fill="#181A27" />
                      </svg>
                      <svg
                        class="absolute block group-hover:hidden right-0 bottom-0"
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 9.5V0L0 9.5H11Z" fill="#181A27" />
                      </svg>
                      <img
                        class="absolute hidden group-hover:block left-0 top-0 w-full h-full"
                        src={Stripes}
                        alt="stripes"
                      />
                      <div class="w-11/12 flex flex-wrap px-2 py-3 sm:p-0 sm:grid sm:gap-3 md:gap-0 md:grid-cols-leaderboard relative z-10">
                        <p class="text-14 order-2 text-center sm:text-left sm:order-1 w-1/6 sm:w-auto text-gray-8c font-medium font-Oswald">
                          # {i() + 4}
                        </p>
                        <div class="flex order-1 mb-3 sm:mb-0 sm:order-2 w-5/6 sm:w-auto items-center gap-2">
                          <div
                            class={`w-7 h-7 rounded-full relative overflow-hidden p-sm bg-gradient-to-b ${
                              ranksBorderColor[val.level?.league] ?? ""
                            }`}
                          >
                            <img
                              class="w-full h-full rounded-full"
                              alt="leaderboard image"
                              src={val.avatar || Logo}
                            />
                          </div>
                          <Ranks staff={val?.rank} rank={val?.level?.league} />
                          <p class="text-14 text-gray-8c font-normal truncate w-40 sm:w-24 lg:w-56">
                            {val?.username || "not found"}
                          </p>
                        </div>
                        <div class="flex order-3 w-1/2 sm:w-auto items-center gap-2">
                          <div class="w-5 sm:w-8">
                            <Coin width="full" />
                          </div>
                          <p class="text-14 text-white font-medium font-Oswald">
                            {Number(val.reward).toLocaleString()}
                          </p>
                        </div>
                        <div class="flex order-4 w-1/2 sm:w-auto items-center gap-2">
                          <div class="w-5 sm:w-8">
                            <Coin width="full" />
                          </div>
                          <p class="text-14 text-white font-medium font-Oswald">
                            {Number(val.wager || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Fallback>
  );
};

export default Leaderboard;
