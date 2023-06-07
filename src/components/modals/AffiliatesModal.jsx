import { createEffect, createSignal, For } from "solid-js";

import injector from "../../injector/injector";
import { API, URL } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import Modal from "./Modal";

import Bg from "../../assets/img/modals/accountBg.png";
import Splash from "../../assets/img/modals/accountSplash.svg";
import BgMainVector from '../../assets/img/coinflip/bgItemsRL.png'

import Countup from "../../utilities/Countup";

import AffiliatesUsers from "./affiliates/Users";
import AffiliatesStatistics from "./affiliates/Statistics";
import AffiliatesTiers from "./affiliates/Tiers";

import { NavLink } from "solid-app-router";
import { createStore } from "solid-js/store";
import { useI18n } from "../../i18n/context";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import HeaderBg from "../../assets/img/modals/ModalHeaderBg.png";
import AffilatesBar from "../../assets/img/affilates/affilates-bar.png"
import affiliatesDepositorsBg from "../../assets/img/affilates/affiliatesDepositorsBg.png"
import affiliatesTotalDepositored from "../../assets/img/affilates/affiliatesTotalDepositored.png"
import affiliatesTotalEarned from "../../assets/img/affilates/affiliatesTotalEarned.png"
import CloseButton from "../elements/CloseButton";

const AffiliatesModal = (props) => {
  const i18n = useI18n();

  const { userObject, socket, toastr } = injector;
  const [affiliate, setAffiliates] = createStore({});

  const size = 5;

  const [page, setCurrentPage] = createSignal(0);
  const [setPages] = createSignal([1]);

  const [setLoaded] = createSignal([]);
  const [code, setCode] = createSignal("");
  const [toggleCode, setToggle] = createSignal(true);

  const [tab, setTab] = createSignal("overview");

  const stats = [
    {
      type: 'depositors',
      name: { en: "depositors", es: "depositantes", ru: "вкладчики" },
      value: () => affiliate?.users?.length,
      note: 'Amount of individual people who have deposited under your code'
    },
    {
      type: 'deposited',
      name: {
        en: "total deposited",
        es: "total depositado",
        ru: "всего депонировано",
      },
      value: () => affiliate?.wager,
    },
    {
      type: 'earned',
      name: { en: "total earned", es: "total ganada", ru: "всего заработано" },
      value: () => affiliate?.earnings,
    },
  ];

  createEffect(() => {
    if (props.searchParams?.affiliates) {
      // setAffiliates({ balance: 100000,
      //   code: "TEST",
      //   earnings: 10,
      //   level: {current: 500000, next: 1000000},
      //   owner: 15,
      //   users: [],
      //   wager: 1000000000 });
      socket.emit("affiliate:connect", {}, (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (data.error) return;

        setToggle(false);

        const userArray = data?.data?.users || [];
        const users = {};
        for(const user of userArray) {
          if(!users[user]) {
            users[user.id] = user
          } else {
            users[user.id].earning += user.earning;
            users[user.id].wager += user.wager;
          }
        }

        console.log(users, "userse");

        setAffiliates({ ...data.data, users: Object.values(users).sort((a,b) => (b.wager - a.wager))});
      });
    }
  });

  createEffect(() => {
    setLoaded(
      affiliate?.users?.filter(
        (row, key) => page() * size - size <= key && key <= page() * size - 1
      )
    );
  });

  createEffect(() => {
    let indices = [];
    for (let i = 0; i < Math.ceil(affiliate?.users?.length / size); i++) {
      indices.push(i + 1);
    }
    setCurrentPage(1);
    setPages(indices);
  });

  const copy = () => {
    navigator.clipboard.writeText(`${URL}/r/${affiliate?.code}`);
    toastr({
      error: false,
      msg: "Successfully copied to clipboard!",
    });
  };

  const createAffiliateCode = () => {
    socket.emit(
      "affiliate:create",
      {
        code: code(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          setToggle(false);
          setAffiliates({
            code: data.data.code,
            balance: 0,
            wager: 0,
            earnings: 0,
            users: [],
          });
        }
      }
    );
  };

  const changeAffiliateCode = () => {
    socket.emit(
      "affiliate:change",
      {
        code: code(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          setToggle(false);
          setAffiliates("code", data?.data?.code);
        }
      }
    );
  };

  const claimReward = () => {
    socket.emit("affiliate:reward", {}, (data) => {
      toastr(data);

      if (!data.error) {
        setAffiliates("balance", 0);
      }
    });
  };

  const affiliateCode = {
    changeCode: {
      en: "Change Code",
      es: "Cambiar código",
      ru: "Изменить код",
    },
    createCode: {
      en: "Create Code",
      es: "Crear código",
      ru: "Создать код",
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
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
      handler={() => {}}
    >
      <NavLink
        class="w-full h-full absolute left-0 cursor-default top-0"
        href={props.pathname()}
      />
      <div
        class="flex flex-col absolute top-40"
        style={{
          width: "50rem",
        }}
      >
        <div
          class={`bg-dark-16 w-full flex flex-col relative transition-all rounded-6 overflow-hidden transform -translate-y-1/4 h-[44rem] ${
            !props.searchParams?.affiliates ? "" : "-translate-y-0"
          } duration-100 ease-out`}
          style={{
            background:
              'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
            'backdrop-filter': 'blur(8px)'
          }}
        >
          <div
            class={`flex relative w-full items-center justify-between px-8 py-6 bg-cover border border-black border-opacity-10 rounded-t-12`}
            style={{
              background: 'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)'
            }}
          >
              <div class="flex flex-col">
                <h2 class="text-20 text-white font-bold font-SpaceGrotesk uppercase truncate">
                  {i18n.t("coinflip.affiliates_true.Affiliates")}
                </h2>
                <div class="font-SpaceGrotesk text-12 text-[#646683]">
                  Invite people to RustyLoot and earn commission
                </div>
              </div>
               
                <NavLink
                  href={props.pathname()}
                >
                  <CloseButton />
                </NavLink>
            </div>
          <div class="px-8 py-8 overflow-y-scroll flex-1 relative">
            <div
              class='absolute inset-0 z-0 bg-repeat mix-blend-luminosity'
              style={{ 'background-image': `url('${BgMainVector}')`, opacity: 0.005 }}
            />
            {/* <div class="flex gap-2 mb-6">
              <div
                class={`relative center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group hover`}
                style={{
                  "background-image": `url(${
                    tab() == "overview" ? GrayButtonBg : ""
                  })`,
                }}
                onClick={() => {
                  setTab("overview");
                }}
              >
                <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                <p
                  class={`text-14 ${
                    tab() == "overview" ? "text-dark-1b" : "text-gray-8c"
                  } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
                >
                  {i18n.t("coinflip.affiliates_true.Overview")}
                </p>
              </div>
              <div
                class={`relative center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group hover`}
                style={{
                  "background-image": `url(${
                    tab() == "users" ? GrayButtonBg : ""
                  })`,
                }}
                onClick={() => {
                  setTab("users");
                }}
              >
                <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                <p
                  class={`text-14 ${
                    tab() == "users" ? "text-dark-1b" : "text-gray-8c"
                  } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
                >
                  {i18n.t("coinflip.affiliates_true.Users")}
                </p>
              </div>
              <div
                class={`relative center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group hover`}
                style={{
                  "background-image": `url(${
                    tab() == "tiers" ? GrayButtonBg : ""
                  })`,
                }}
                onClick={() => {
                  setTab("tiers");
                }}
              >
                <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                <p
                  class={`text-14 ${
                    tab() == "tiers" ? "text-dark-1b" : "text-gray-8c"
                  } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
                >
                  {i18n.t("coinflip.affiliates_true.Tiers")}
                </p>
              </div>
            </div> */}
            <div
              class={`${
                tab() == "overview" ? "flex" : "hidden"
              } flex-col gap-8 w-full overflow-y-scroll`}
            >
              <div class="w-full flex">
                <div class="w-2/5 flex flex-col gap-0.5 pr-8">
                  <p class="text-14 text-gray-8c font-normal sentence font-SpaceGrotesk">
                    {i18n.t("coinflip.affiliates_true.Your affiliate code")}
                  </p>
                  
                  <div class="flex items-center relative w-full h-10">
                  <div
                       class="w-full max-w-md p-[2px] rounded-[4px] h-full mt-1"
                       style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                 radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                 linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                 radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                 
                 "
                      >
                      <div
                            class="flex w-full p-2 rounded-[4px] justify-between items-center h-full"
                            style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                    radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                    linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                    radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                    linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                    linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                    
                              "
                        >
                      <div class="flex items-center gap-4 pl-2 pr-1">
                        <input
                          class={`text-white text-14 font-bold font-SpaceGrotesk w-44 ${
                            toggleCode() ? "" : "hidden"
                          }`}
                          placeholder={i18n.t(
                            "coinflip.affiliates_true.Enter code"
                          )}
                          onInput={(e) => setCode(e.currentTarget.value)}
                          value={code()}
                        />
                        <p
                          class={`text-gray-9a w-44 ${
                            toggleCode() ? "hidden" : ""
                          } text-14 font-bold uppercase`}
                          onClick={() => setToggle((prev) => !prev)}
                        >
                          {affiliate?.code}
                        </p>
                        <div
                          class="px-3 cursor-pointer center h-8 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk"
                          onClick={() => {
                            if (affiliate?.code) {
                              changeAffiliateCode();
                            } else {
                              createAffiliateCode();
                            }
                          }}
                        >
                          Save
                        </div>
                      </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="flex-1 flex flex-col gap-0.5 pr-8">
                  <p class="text-14 text-gray-8c font-normal sentence font-SpaceGrotesk">
                    {i18n.t("coinflip.affiliates_true.Your affiliate link")}
                  </p>
                  <div class="flex items-center relative w-full h-10">
                  <div
                       class="w-full max-w-md p-[2px] rounded-[4px] h-full mt-1"
                       style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                 radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                 linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                 radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                 
                 "
                      >
                      <div
                            class="flex w-full p-2 rounded-[4px] justify-between items-center h-full"
                            style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                    radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                    linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                    radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                    linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                    linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                    
                              "
                        >
                      <div class="flex items-center gap-4 pl-2 w-full">
                      <p class="text-white text-14 font-bold truncate font-SpaceGrotesk w-full flex-1">{`${API}/r/`}<span class="text-yellow-ffb">{affiliate?.code}</span></p>
                      <div class="flex">
                      <div
                          class="bg-gray-button-gradient p-1 rounded-4 border border-white/10"
                          onClick={copy}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2073_136815)">
                            <mask id="mask0_2073_136815" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                            <path d="M0 18H18V0H0V18Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_2073_136815)">
                            <path d="M11.25 17.25H3C2.175 17.25 1.5 16.575 1.5 15.75V6C1.5 5.5875 1.8375 5.25 2.25 5.25C2.6625 5.25 3 5.5875 3 6V15C3 15.4125 3.3375 15.75 3.75 15.75H11.25C11.6625 15.75 12 16.0875 12 16.5C12 16.9125 11.6625 17.25 11.25 17.25ZM14.25 14.25H6C5.175 14.25 4.5 13.575 4.5 12.75V2.25C4.5 1.425 5.175 0.75 6 0.75H14.25C15.075 0.75 15.75 1.425 15.75 2.25V12.75C15.75 13.575 15.075 14.25 14.25 14.25ZM13.5 2.25H6.75C6.3375 2.25 6 2.5875 6 3V12C6 12.4125 6.3375 12.75 6.75 12.75H13.5C13.9125 12.75 14.25 12.4125 14.25 12V3C14.25 2.5875 13.9125 2.25 13.5 2.25Z" fill="#8C90B9"/>
                            </g>
                            </g>
                            <defs>
                            <clipPath id="clip0_2073_136815">
                            <rect width="18" height="18" fill="white" transform="matrix(1 0 0 -1 0 18)"/>
                            </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <div class="flex flex-col">
                  <h2 class="text-20 text-white font-bold font-SpaceGrotesk uppercase truncate">
                    DASHBOARD
                  </h2>
                  <div class="font-SpaceGrotesk text-12 text-[#646683]">
                    Overview of your Affiliate Stats
                  </div>
                </div>
                <div class="w-full grid grid-cols-3 gap-4">
                  <For each={stats}>
                    {(item) => (
                      <div class="w-full h-24 xll:h-24 fourk:h-32 flex justify-center items-center relative rounded-4 bg-dark-22">
                        <div
                          class={`w-full h-full absolute left-0 top-0 rounded-4 backdrop-blur-sm ${item.type === 'earned' ? "green-borders" : ""}`}
                          style={{
                            background:
                            item.type !== 'depositors' ? item.type === 'earned' ? `url(${affiliatesTotalEarned})` : `url(${affiliatesTotalDepositored})` : `url(${affiliatesDepositorsBg})`,

                          }}
                        />
                        <div class="flex gap-1 relative">
                          
                          <div class={`flex flex-col ${item.type === 'depositors' ? "gap-1" : "gap-2"}`}>
                            <div class="center gap-2">
                              { item.type !== 'depositors' ? <Coin /> : ""}
                              <p class={`leading-none
                              ${item.type !== 'depositors' ? item.type === 'earned' ? "text-20 text-gradient-green-secondary" : "text-20 text-gradient" : "text-32 text-white"}
                               font-SpaceGrotesk font-bold relative`}
                              >
                              
                                {Number(item.value() || 0).toLocaleString()}
                              </p>
                            </div>
                            <p class={`${item.type === 'earned' ? "text-gradient-green-secondary" : "text-yellow-ffb"} text-14 font-SpaceGrotesk font-normal sentence leading-none`}>
                              {item?.name[i18n.language]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
             
              <div class="center bg-black bg-opacity-20 py-8 px-4 relative overflow-hidden">
                <div
                  class="absolute left-0 top-0 w-full h-full rounded-4 overflow-hidden"
                  style={{
                    border: "2px solid #303448",
                  }}
                >
                  <img alt="background" src={Bg} class="min-w-full min-h-full" />
                  <img alt="splash" src={Splash} class="w-full absolute bottom-0 left-0" />
                </div>
                <div class="w-full h-full center flex-col gap-4 z-10">
                  <div class="center gap-3">
                    <div class="w-10 h-10 bg-dark-16 rounded-full border border-yellow-ff p-0.5">
                      <img
                        alt="avatar" 
                        class="w-full h-full rounded-full"
                        src={userObject?.user?.avatar || ""}
                      />
                    </div>
                    <div class="flex flex-col">
                      <div class="flex items-end gap-2">
                        <p class="text-16 text-white font-bold">
                          {userObject?.user?.username ||
                            userStatus.status[i18n.language]}
                        </p>
                        {/* <div class="px-1.5 h-4 bg-yellow-ff center">
                                                  <p class="text-12 text-dark-16 font-medium font-Oswald">20</p>
                                              </div> */}
                      </div>
                      <p class="text-gray-8c text-14 font-normal capitalize">
                        {(
                          (affiliate?.wager - affiliate?.level?.current * 1000) /
                            (affiliate?.level?.next * 10) || 0
                        ).toFixed(2)}
                        %{" "}
                        {i18n.t("coinflip.affiliates_true.Progress to next tier")}
                      </p>
                    </div>
                  </div>
                  <div class="w-120 max-w-full flex flex-col gap-5">
                    <div class="w-full flex justify-between items-center relative">
                      <div class="center gap-2">
                        <div
                          class="relative center h-7 px-7"
                          style={
                            {
                              // background: ranks[account?.level?.next]?.color
                            }
                          }
                        >
                          <svg
                            class="absolute left-0"
                            width="3"
                            height="12"
                            viewBox="0 0 3 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 5.68421L0 12L0 0L3 5.68421Z"
                              fill="#1B2030"
                            />
                          </svg>
                          <svg
                            class="absolute top-0"
                            width="16"
                            height="2"
                            viewBox="0 0 16 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.61905 2L0 0H16L7.61905 2Z"
                              fill="#1A2130"
                            />
                          </svg>
                          <svg
                            class="absolute bottom-0"
                            width="16"
                            height="2"
                            viewBox="0 0 16 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.42105 0L0 2H16L8.42105 0Z"
                              fill="#161B2B"
                            />
                          </svg>
                          <svg
                            class="absolute right-0"
                            width="3"
                            height="12"
                            viewBox="0 0 3 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-2.76072e-07 6.31579L3 0L3 12L-2.76072e-07 6.31579Z"
                              fill="#1B2030"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="w-full h-4 rounded-full overflow-hidden bg-dark-22">
                      <div
                        class="h-full rounded-full"
                        style={{
                          background:
                            `url("${AffilatesBar}")`,
                          width: `${
                            (affiliate?.wager -
                              affiliate?.level?.current * 1000) /
                              (affiliate?.level?.next * 10) || 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div class="center flex-col gap-2 py-4">
                    <div class="center gap-3">
                      <Coin />
                      <p class="text-20 text-white font-bold font-Oswald leading-none -mt-0.5">
                        <Countup props={Number(affiliate?.balance || 0)} />{" "}
                      </p>
                    </div>
                    <p class="text-16 text-gray-8c font-normal capitalize">
                      {i18n.t("coinflip.affiliates_true.Available earnings")}
                    </p>
                  </div>
                  <div class="center gap-4">
                    <div
                      class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
                      style={{ "background-image": `url(${YellowButtonBg})` }}
                      onClick={claimReward}
                    >
                      <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                      <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                        {i18n.t("coinflip.affiliates_true.Claim earnings")}
                      </p>
                    </div>
                    <div
                      onClick={() => setTab("tiers")}
                      class="relative cursor-pointer center hover h-10 w-52 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
                      style={{ "background-image": `url(${YellowButtonBg})` }}
                    >
                      <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                      <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
                      <div class="absolute center">
                        <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                          {i18n.t("coinflip.affiliates_true.Tier benefits")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {tab() == "users" ? (
              <AffiliatesUsers affiliate={affiliate} />
            ) : tab() == "statistics" ? (
              <AffiliatesStatistics />
            ) : tab() == "tiers" ? (
              <AffiliatesTiers />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AffiliatesModal;
