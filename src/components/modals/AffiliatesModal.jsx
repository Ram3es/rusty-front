import { createEffect, createSignal, For } from "solid-js";

import injector from "../../injector/injector";
import { API, URL } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import Modal from "./Modal";

import Bg from "../../assets/img/modals/accountBg.png";
import Splash from "../../assets/img/modals/accountSplash.svg";

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
            border: "2px solid rgba(102, 110, 151, 0.2)",
          }}
        >
          <div class={`flex justify-between items-center gap-2 px-8 py-6 relative border-b-2 bg-dark-16 border-gray-30`}>
              <div class={`absolute rounded-t-6 left-0 top-0 w-full h-full bg-auto lg:bg-cover`}
                  style={{'background-image': `url(${HeaderBg}`}} />
              
                <h2 class="text-white uppercase text-24 font-Oswald">
                  {i18n.t("coinflip.affiliates_true.Affiliates")}
                </h2>
                <NavLink
                  class="text-gray-47 text-12 font-medium relative z-10"
                  href={props.pathname()}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                      fill="#8C98A9"
                    />
                  </svg>
                </NavLink>
            </div>
          <div class="px-8 py-8 overflow-y-scroll flex-1">
            <div class="flex gap-2 mb-6">
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
            </div>
            <div
              class={`${
                tab() == "overview" ? "flex" : "hidden"
              } flex-col gap-4 w-full overflow-y-scroll`}
            >
              <div class="w-full flex">
                <div class="w-2/5 flex flex-col gap-0.5 pr-8">
                  <p class="text-18 text-gray-8c font-normal sentence">
                    {i18n.t("coinflip.affiliates_true.Your affiliate code")}
                  </p>
                  <div class="flex items-center relative w-full h-9">
                    <div class="w-full h-full bg-dark-20 center rounded-2" />
                    <div class="flex items-center gap-4 absolute pl-4">
                      <input
                        class={`text-white text-14 font-bold uppercase w-44 ${
                          toggleCode() ? "" : "hidden"
                        }`}
                        placeholder={i18n.t(
                          "coinflip.affiliates_true.Enter code"
                        )}
                        onInput={(e) => setCode(e.currentTarget.value)}
                        value={code()}
                      />
                      <p
                        class={`text-white ${
                          toggleCode() ? "hidden" : ""
                        } text-14 font-bold uppercase`}
                      >
                        {affiliate?.code}
                      </p>
                      <div class={`center gap-2`}>
                        <svg
                          class={`${
                            affiliate?.code ? "center" : "hidden"
                          } cursor-pointer`}
                          onClick={() => setToggle((prev) => !prev)}
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4148 0C11.2163 0 11.0063 0.0816667 10.8545 0.233333L9.4306 1.645L12.3485 4.56167L13.7724 3.15C14.0759 2.84667 14.0759 2.33333 13.7724 2.04167L11.9633 0.233333C11.8116 0.0816667 11.6132 0 11.4148 0ZM8.60192 2.47333L0 11.0833V14H2.91788L11.5198 5.39L8.60192 2.47333Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-1 flex flex-col gap-0.5 pr-8">
                  <p class="text-18 text-gray-8c font-normal sentence">
                    {i18n.t("coinflip.affiliates_true.Your affiliate link")}
                  </p>
                  <div class="flex items-center relative w-full h-9">
                    <div class="w-full h-full bg-dark-20 center rounded-2" />
                    <div class="flex items-center justify-between gap-4 absolute pl-4 pr-4 overflow-hidden max-w-full w-full">
                      <p class="text-white text-16 font-bold truncate flex-1">{`${API}/r/${affiliate?.code}`}</p>
                      <div class="flex">
                        <svg
                          class="cursor-pointer"
                          onClick={copy}
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H15C16.1046 17 17 16.1046 17 15V7C17 5.89543 16.1046 5 15 5Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13 5V3C13 2.46957 12.7893 1.96086 12.4142 1.58579C12.0391 1.21071 11.5304 1 11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V11C1 11.5304 1.21071 12.0391 1.58579 12.4142C1.96086 12.7893 2.46957 13 3 13H5"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div
                  class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
                  style={{ "background-image": `url(${YellowButtonBg})` }}
                  onClick={() => {
                    if (affiliate?.code) {
                      changeAffiliateCode();
                    } else {
                      createAffiliateCode();
                    }
                  }}
                >
                  <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                  <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                    {affiliate?.code
                      ? affiliateCode.changeCode[i18n.language]
                      : affiliateCode.createCode[i18n.language]}
                  </p>
                </div>
              </div>

              <div class="w-full grid grid-cols-3 gap-4">
                <For each={stats}>
                  {(item) => (
                    <div class="w-full h-24 xll:h-24 fourk:h-32 flex justify-center items-center pl-4 xll:pl-6 relative rounded-4 bg-dark-22">
                      <div
                        class="w-full h-full absolute left-0 top-0 rounded-4 backdrop-blur-sm"
                        style={{
                          background:
                            "linear-gradient(218.47deg, rgba(19, 22, 32, 0.5) -4.89%, rgba(19, 22, 32, 0) 109.48%)",
                          border: "2px solid rgba(102, 110, 151, 0.2)",
                        }}
                      />
                      <div class="flex gap-1 relative">
                        { item.type !== 'depositors' ? 
                          <Coin /> : 
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.5" cy="12.5" r="12.5" fill="url(#paint0_radial_8_231425)"/>
                            <g filter="url(#filter0_d_8_231425)">
                            <path d="M12.4878 12.127C9.99755 12.1316 7.93748 14.0913 7.81307 16.5679C7.80976 16.6382 7.82087 16.7084 7.84573 16.7742C7.87059 16.8401 7.90867 16.9003 7.95766 16.9511C8.00666 17.0018 8.06554 17.0422 8.13071 17.0696C8.19589 17.0971 8.26601 17.1111 8.33679 17.1107H16.6592C16.7297 17.1105 16.7994 17.0961 16.8641 17.0684C16.9288 17.0407 16.9871 17.0003 17.0357 16.9496C17.0843 16.8989 17.122 16.8389 17.1466 16.7733C17.1712 16.7077 17.1822 16.6378 17.1789 16.5679C17.0543 14.0882 14.9894 12.1272 12.496 12.127H12.4878Z" fill="#C35A0E"/>
                            <path d="M12.4978 7.42188C11.1778 7.42188 10.1016 8.49661 10.1016 9.81016C10.1016 11.1237 11.1778 12.2022 12.4978 12.2022C13.8179 12.2022 14.8979 11.1237 14.8978 9.81016C14.8978 8.49661 13.8179 7.42188 12.4978 7.42188Z" fill="#C35A0E"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_8_231425" x="7.8125" y="7.42188" width="9.36719" height="11.1887" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="1.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.865584 0 0 0 0 0.425 0 0 0 1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_231425"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_231425" result="shape"/>
                            </filter>
                            <radialGradient id="paint0_radial_8_231425" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.5 12.4995) scale(12.5 12.4999)">
                            <stop stop-color="#FFCC17"/>
                            <stop offset="1" stop-color="#FF9A23"/>
                            </radialGradient>
                            </defs>
                          </svg>
                        }
                        
                        <div class="flex flex-col gap-2">
                          <div class="flex gap-2">
                            <p class="leading-none text-20 text-white font-bold font-Oswald relative">
                              {Number(item.value() || 0).toLocaleString()}
                            </p>
                            {item.note && <div class="relative group cursor-pointer">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.64711 12C5.4153 11.9677 5.18349 11.9501 4.95462 11.9061C3.05614 11.5423 1.63595 10.5065 0.705786 8.81338C0.183485 7.86267 -0.0541914 6.82981 0.0103627 5.74706C0.151208 3.4906 1.22222 1.80046 3.19699 0.703039C4.14182 0.177804 5.17175 -0.0540043 6.25157 0.0105498C8.50216 0.148461 10.1894 1.21947 11.2927 3.18544C11.7035 3.91607 11.9206 4.71126 11.9793 5.54753C11.9822 5.58274 11.991 5.61502 11.9998 5.65023C11.9998 5.88497 11.9998 6.11971 11.9998 6.35445C11.9939 6.38673 11.9822 6.42194 11.9793 6.45422C11.9206 7.29049 11.7005 8.08274 11.2956 8.81631C10.3625 10.5065 8.94523 11.5393 7.04676 11.9061C6.81788 11.9501 6.58314 11.9707 6.35427 12C6.11659 12 5.88185 12 5.64711 12ZM6.00215 0.544588C3.00039 0.53872 0.55027 2.98297 0.544401 5.99647C0.538533 8.99824 2.98278 11.4484 5.99335 11.4572C8.99512 11.463 11.4452 9.01878 11.4511 6.00527C11.4599 3.00351 9.01566 0.553391 6.00215 0.544588Z" fill="#8C98A9"/>
                                  <path d="M4.64648 5.65621C4.64648 5.64741 4.64648 5.64448 4.64648 5.64154C4.66116 5.39506 4.7932 5.27182 5.03381 5.2014C5.36245 5.1075 5.67935 4.99894 6.02853 5.01654C6.41585 5.03415 6.7709 5.27476 6.82665 5.61513C6.86186 5.82347 6.84719 6.05527 6.79731 6.26361C6.677 6.77124 6.52442 7.27006 6.38944 7.77476C6.3601 7.88333 6.35423 7.99777 6.3513 8.10927C6.34543 8.29706 6.43053 8.41443 6.61538 8.43497C6.78264 8.45258 6.95576 8.4291 7.12301 8.41443C7.17583 8.4115 7.22571 8.38509 7.29907 8.36161C7.26973 8.47899 7.24625 8.57875 7.21398 8.67852C7.20811 8.69906 7.17583 8.71373 7.15236 8.72253C6.90881 8.80469 6.67113 8.91032 6.42172 8.96314C6.05787 9.04237 5.69109 9.04237 5.36538 8.81349C5.13651 8.65211 5.03968 8.4291 5.05142 8.15035C5.06902 7.75422 5.20693 7.38744 5.30963 7.01185C5.38886 6.71549 5.46515 6.41619 5.54144 6.11983C5.55318 6.07875 5.55318 6.03473 5.55611 5.99072C5.56785 5.66502 5.427 5.53004 5.09836 5.56819C4.94578 5.58579 4.79907 5.62394 4.64648 5.65621Z" fill="#8C98A9"/>
                                  <path d="M6.58575 3.00049C7.03176 3.00049 7.36626 3.31446 7.3604 3.71645C7.35746 4.01575 7.13739 4.2769 6.81169 4.36493C6.45371 4.46469 6.05171 4.30331 5.89913 3.99521C5.67906 3.56093 5.98716 3.05624 6.50359 3.00342C6.53293 3.00342 6.56521 3.00342 6.58575 3.00049Z" fill="#8C98A9"/>
                                </svg>
                                {/* <svg class="group-hover:block hidden absolute left-1/2 bottom-full transform -translate-x-1/2 rotate-180" width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 0H0L9.5 8L19 0Z" fill="#373D54"></path></svg> */}
                                <span
                                  class="group-hover:flex hidden bottom-full left-1/2 absolute z-20 transform -translate-x-1/4 -translate-y-2 py-1 px-2 bg-dark-17 border border-gray-30 text-gray-8c text-14 shadow-md flex-row-reverse gap-3 w-40 text-left"
                                >
                                    {item.note}
                                </span>
                            </div>}
                              
                          </div>
                          
                          <p class="text-16 text-gray-8c font-normal sentence leading-none">
                            {item?.name[i18n.language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
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
