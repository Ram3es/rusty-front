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
import affiliateCoin1 from "../../assets/img/affilates/affiliateCoin1.png"
import affiliateCoin2 from "../../assets/img/affilates/affiliateCoin2.png"
import affiliateCoin3 from "../../assets/img/affilates/affiliateCoin3.png"
import CloseButton from "../elements/CloseButton";
import Ranks from "../../utilities/Ranks";
import GrayGradientButton from "../elements/GrayGradientButton";
import ArrowBack from "../icons/ArrowBack";
import GoldRay from "../icons/GoldRay";

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

  const [tiers] = createSignal([
    {
      name: "bronze",
      image: "bronze",
      deposit: 1,
      tax: 5,
      referrals: 5,
    },
    {
      name: "silver",
      image: "silver",
      deposit: 1.5,
      tax: 6,
      referrals: 10,
    },
    {
      name: "gold",
      image: "gold3",
      deposit: 1.75,
      tax: 7,
      referrals: 20,
    },
    {
      name: "platinum",
      image: "platinum3",
      deposit: 1.85,
      tax: 8,
      referrals: 35,
    },
    {
      name: "diamond",
      image: "diamond",
      deposit: 2,
      tax: 15,
      referrals: 75,
    },
  ]);

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
        class="flex flex-col absolute top-40 w-full"
        style={{
          "max-width": "830px",
        }}
      >
        <div
          class={`bg-dark-16 w-full flex flex-col relative transition-all rounded-8 rounded-t-12 overflow-hidden transform -translate-y-1/4 h-[44rem] ${
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
            <div class="flex flex-col sm:flex-row gap-6">
              {tab() !== "overview" && <div
                class="flex gap-2 items-center p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max"
                onClick={() => setTab("overview")}
              >
                <ArrowBack />
                <span class="font-SpaceGrotesk text-14 text-gray-9a">
                  Return to Dashboard
                </span>
              </div>}
              <div class="flex flex-col">
                <h2 class="text-20 text-white font-bold font-SpaceGrotesk uppercase truncate">
                  {i18n.t("coinflip.affiliates_true.Affiliates")}
                </h2>
                <div class="font-SpaceGrotesk font-bold text-xs text-gray-64">
                  Invite people to RustyLoot and earn commission
                </div>
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
            <div
              class={`${
                tab() == "overview" ? "flex" : "hidden"
              } flex-col gap-8 w-full overflow-y-scroll`}
            >
              <div class="w-full flex flex-col sm:flex-row">
                <div class="w-full sm:w-2/5 flex flex-col gap-0.5 pr-8">
                  <p class="text-14 text-gray-9a font-medium sentence font-SpaceGrotesk">
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
                      <div class="flex items-center gap-4 pl-2 pr-1 w-full">
                        <input
                          class={`text-white  text-14 font-bold font-SpaceGrotesk w-full sm:w-44 placeholder:text-gray-92 placeholder:font-medium ${
                            toggleCode() ? "" : "hidden"
                          }`}
                          placeholder={i18n.t(
                            "coinflip.affiliates_true.Enter code"
                          )}
                          onInput={(e) => setCode(e.currentTarget.value)}
                          value={code()}
                        />
                        <p
                          class={`text-gray-9a w-full sm:w-44 ${
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
                  <p class="text-14 text-gray-9a font-medium sentence font-SpaceGrotesk">
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
                  <div class="font-SpaceGrotesk font-bold text-12 text-gray-64">
                    Overview of your Affiliate Stats
                  </div>
                </div>
                <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                            <p class={`${item.type === 'earned' ? "text-green-27" : "text-yellow-ffb"} text-14 font-SpaceGrotesk font-bold sentence leading-none`}>
                              {item?.name[i18n.language]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
             
              <div class="center py-8 px-4 relative overflow-hidden">
                <div
                  class="absolute left-0 top-0 w-full h-full rounded-4 overflow-hidden"
                >
                  <img alt="affiliateCoin1" style={{filter: 'drop-shadow(0px 48px 12px rgba(0, 0, 0, 0.12))'}} src={affiliateCoin1} class=" absolute right-5 top-5" />
                  <img alt="affiliateCoin2" style={{filter: 'drop-shadow(0px 48px 12px rgba(0, 0, 0, 0.12))'}} src={affiliateCoin2} class=" absolute right-10 bottom-0" />
                  <img alt="affiliateCoin3" style={{filter: 'drop-shadow(0px 48px 12px rgba(0, 0, 0, 0.12))'}} src={affiliateCoin3} class=" absolute left-5 top-1/2 -translate-y-1/2" />
                </div>
                <div class="w-full h-full center flex-col gap-4 z-10">
                  <div class="flex items-center justify-center -translate-y-2">
                      <GoldRay additionalClasses="rotate-180" />  
                      <div class="rounded-full border border-gold-ffc w-max p-1">
                          <img class="w-12 rounded-full" src={userObject.user?.avatar || ""} alt='blue-box' />
                      </div>
                      <GoldRay additionalClasses="" />
                  </div>
                  <div class="w-120 max-w-full flex flex-col items-center gap-3">
                    <div class="flex items-center justify-center gap-2">
                      <Ranks
                        width={5}
                        staff={2}
                        rank={tiers()[affiliate?.level?.current]?.image}
                      />
                      <span class="uppercase text-gradient font-SpaceGrotesk text-14 font-bold">{tiers()[affiliate?.level?.current]?.name} TIER AFFILIATE</span>
                    </div>
                  
                    <div
                      class="w-[196px] h-0.5 rounded-full overflow-hidden bg-dark-22"
                      style={{
                        background: 'radial-gradient(100% 2400% at 0% 100%, rgba(255, 180, 54, 0.2) 0%, rgba(255, 180, 54, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <div
                        class="h-full rounded-full"
                        style={{
                          background:
                            `linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)`,
                          width: `${
                            (affiliate?.wager -
                              affiliate?.level?.current * 1000) /
                              (affiliate?.level?.next * 10) || 0
                          }%`,
                        }}
                      />
                    </div>
                    <div>
                      <p class="text-gray-8c text-12 font-normal font-SpaceGrotesk capitalize">
                        <span class="text-white">
                          {(
                            (affiliate?.wager - affiliate?.level?.current * 1000) /
                              (affiliate?.level?.next * 10) || 0
                          ).toFixed(2)}
                          %{" "}
                        </span>
                        {i18n.t("coinflip.affiliates_true.Progress to next tier")}
                      </p>
                    </div>
                    <div
                      class="px-4 cursor-pointer gap-2 center h-10 green-success-button-gradient font-bold text-[#27F278] text-14 font-SpaceGrotesk"
                      onClick={claimReward}
                    >
                      Claim
                      <Coin width="5" />
                      <span class="text-gradient-green-secondary">
                        <Countup props={Number(affiliate?.balance || 0)} />
                      </span>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              <div class="center gap-4">
                <GrayGradientButton
                  additionalClass="w-40 h-10 text-gray-a2 font-SpaceGrotesk text-14 font-bold cursor-pointer"
                  callbackFn={() => setTab("users")}
                >
                  View Depositors
                </GrayGradientButton>
                <GrayGradientButton
                  additionalClass="w-40 h-10 text-gray-a2 font-SpaceGrotesk text-14 font-bold cursor-pointer"
                  callbackFn={() => setTab("tiers")}
                >
                  Tier Benefits
                </GrayGradientButton>
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
