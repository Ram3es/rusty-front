import { createSignal, createEffect, For } from "solid-js";
import injector from "../../../injector/injector";
import Coin from "../../../utilities/Coin";
import Countup from "../../../utilities/Countup";
import { NavLink } from "solid-app-router";
import Ranks from "../../../utilities/Ranks";

import Bg from "../../../assets/img/modals/accountBg.png";
import Splash from "../../../assets/img/modals/accountSplash.svg";
import YellowButtonBg from "../../../assets/img/animatedButtonBg.jpg";

import Logo from "../../../assets/smallLogo.svg";
import { useI18n } from "../../../i18n/context";

const ProfileAccount = (props) => {
  const i18n = useI18n();

  const { userObject } = injector;
  const [bajeRanks, setBajeRanks] = createSignal({
    current: "",
    next: "",
  });

  createEffect(() => {
    if (props.account?.level) {
      setBajeRanks(() => {
        return {
          current: props.account?.level?.league,
          next: props.account?.level?.next,
        };
      });
    }
  });

  createEffect(() => {
    console.log(bajeRanks());
    console.log(props?.account?.level);
  })

  const stats = [
    { name: "deposited", type: "deposit" },
    { name: "total won", type: "withdraw" },
    { name: "profit", type: "both" },
  ];

  const ranks = {
    default: {
      name: "default",
      color: "radial-gradient(50% 50% at 50% 50%, #F28447 0%, #984719 100%)",
      text: "#7D3811",
    },
    bronze: {
      name: "bronze",
      color: "radial-gradient(50% 50% at 50% 50%, #F28447 0%, #984719 100%)",
      text: "#7D3811",
    },
    silver: {
      name: "silver",
      color: "radial-gradient(50% 50% at 50% 50%, #9FBACA 0%, #5A7C9C 100%)",
      text: "#496782",
    },
    gold1: {
      name: "gold I",
      color: "radial-gradient(50% 50% at 50% 50%, #FFC818 0%, #FF9C22 100%)",
      text: "#C35A0E",
    },
    gold2: {
      name: "gold II",
      color: "radial-gradient(50% 50% at 50% 50%, #FFC818 0%, #FF9C22 100%)",
      text: "#C35A0E",
    },
    gold3: {
      name: "gold III",
      color: "radial-gradient(50% 50% at 50% 50%, #FFC818 0%, #FF9C22 100%)",
      text: "#C35A0E",
    },
    platinum1: {
      name: "plat I",
      color:
        "radial-gradient(60.94% 60.94% at 50% 50%, #9FBACA 0%, #8596F3 0.01%, #1E3486 100%)",
      text: "#192C73",
    },
    platinum2: {
      name: "plat II",
      color:
        "radial-gradient(60.94% 60.94% at 50% 50%, #9FBACA 0%, #8596F3 0.01%, #1E3486 100%)",
      text: "#192C73",
    },
    platinum3: {
      name: "plat II",
      color:
        "radial-gradient(60.94% 60.94% at 50% 50%, #9FBACA 0%, #8596F3 0.01%, #1E3486 100%)",
      text: "#192C73",
    },
    diamond: {
      name: "diamond",
      color:
        "radial-gradient(60.94% 60.94% at 50% 50%, #9FBACA 0%, #8596F3 0.01%, #BF82EF 3.65%, #3F1E86 100%)",
      text: "#802fc2",
    },
  };

  const userStatus = {
    status: {
      en: "Unknown",
      es: "Desconocida",
      ru: "Неизвестный",
    },
  };

  return (
    <>
      <div class="w-full flex flex-col gap-6">
        <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
          <For each={stats}>
            {(val) => (
              <div class="w-full h-20 xll:h-24 fourk:h-24 flex items-center pl-4 xll:pl-8 relative rounded-4">
                <div
                  class="w-full h-full absolute left-0 top-0 rounded-4 backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(218.47deg, rgba(40, 47, 72, 0.5) -4.89%, rgba(28, 28, 28, 0) 109.48%)",
                    border: "2px solid #303448",
                  }}
                />
                <div class="flex gap-3 xll:gap-4 relative">
                  <Coin />
                  <div class="flex flex-col gap-2">
                    <p class="leading-none text-20 text-white font-bold font-Oswald">
                      {Number(
                        val.type == "both"
                          ? (props.account?.transactions?.withdraw || 0) -
                              (props.account?.transactions?.deposit || 0)
                          : props.account?.transactions?.[val.type] || 0
                      ).toLocaleString()}
                    </p>
                    <p class="text-16 text-gray-8c font-normal sentence leading-none">
                      {val?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="center bg-black bg-opacity-20 py-8 px-4 relative overflow-hidden rounded-4" style={{
          border: "2px solid #303448",
        }}>
          <div class="absolute left-0 top-0 w-full h-full">
            <img alt="background" src={Bg} class="min-w-full min-h-full" />
            <img alt="splash" src={Splash} class="w-full absolute bottom-0 left-0" />
          </div>
          <div class="w-full h-full center flex-col gap-4 z-10">
            <div class="center gap-3">
              <div class="w-10 h-10 bg-dark-16 rounded-full border border-yellow-ff p-0.5">
                <img
                  alt="avatar" 
                  class="w-full h-full rounded-full"
                  src={userObject?.user?.avatar || Logo}
                />
              </div>
              <div class="flex flex-col">
                <div class="flex items-end gap-2">
                  <p class="text-16 text-white font-bold">
                    {userObject?.user?.username ||
                      userStatus.status[i18n.language]}
                  </p>
                </div>
                <p class="text-gray-8c text-14 font-normal">
                  {(
                    (props.account?.user?.wagered -
                      props.account?.level?.from * 1000) /
                      (props.account?.level?.to * 10) || 0
                  ).toFixed(2)}
                  % {i18n.t("profile_true.account.Progress to next level")}
                </p>
              </div>
            </div>
            <div class="w-120 max-w-full flex flex-col gap-6 mt-4">
              <div class="w-full flex justify-between items-center relative">
                <div class="center gap-2">
                  <div class="absolute group cursor-pointer left-0 mr-2">
                    <Ranks width={10} rank={() => bajeRanks().current} />
                    <p
                      class="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 bottom-full text-14 font-medium font-Oswald uppercase truncate"
                      style={{
                        color: ranks[bajeRanks().current]?.text,
                      }}
                    >
                      {ranks[bajeRanks().current]?.name}
                    </p>
                  </div>
                </div>
                <div class="center gap-2">
                  <div class="absolute group cursor-pointer right-0 ml-2">
                    <Ranks rank={() => bajeRanks().next} width="10" />
                    <p
                      class="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 bottom-full text-14 font-medium font-Oswald uppercase truncate"
                      style={{
                        color: ranks[bajeRanks().next]?.text,
                      }}
                    >
                      {ranks[bajeRanks().next]?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full h-4 rounded-full overflow-hidden bg-dark-22">
                <div
                  class="h-full rounded-full duration-200"
                  style={{
                    background:
                      "linear-gradient(270deg, #FEB442 0%, #DF6C37 68.8%)",
                    width: `${
                      (props.account?.user?.wagered -
                        props.account?.level?.from * 1000) /
                      (props.account?.level?.to * 10)
                    }%`,
                  }}
                />
              </div>
            </div>
            <div class="center flex-col gap-2 py-4">
              <div class="center gap-3">
                <Coin />
                <p class="text-20 text-white font-bold font-Oswald leading-none -mt-0.5">
                  <Countup props={Number(props.account?.user?.rakeback || 0)} />{" "}
                </p>
              </div>
              <p class="text-16 text-gray-8c font-normal capitalize">
                {i18n.t("profile_true.account.Available rakeback")}
              </p>
            </div>
            <div class="center gap-4 flex-wrap sm:flex-nowrap">
              <div
                class="relative center hover w-20 sm:w-48 h-10 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => props.rakebackClaim()}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <p class="absolute text-dark-16 text-12 sm:text-14 font-medium font-Oswald uppercase">
                  {i18n.t("profile_true.account.Claim rakeback")} (
                  {props.account?.level?.rakeback || 0}%)
                </p>
              </div>
              <NavLink
                href={`${props.pathname()}?profile=true&benefits=true`}
                class="relative center cursor-pointer hover rounded-2 bg-cover group scrolling-btn-wrapper h-10 min-w-48 overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
                <div class="absolute center">
                  <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                    {i18n.t("profile_true.account.Level benefits")}
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAccount;
