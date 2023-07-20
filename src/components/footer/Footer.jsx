import {For} from "solid-js";
import {SOCIAL, URL} from "../../libraries/url.jsx";
import {NavLink} from "solid-app-router";
import {useI18n} from "../../i18n/context";

import injector from "../../injector/injector";
import SubFooter from "./SubFooter.jsx";

import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png";
import footerLogo from "../../assets/img/footer/logo-footer.svg";

const Footer = (props) => {
  const i18n = useI18n();

  const {setToggles} = injector;

  const menus = [
    {
      name: {
        en: "games",
        es: "Juegos",
        ru: "Игры",
      },
      items: [
        {
          label: {
            en: "Upgrader",
            es: "Upgrader",
            ru: "Апгрейдер",
          },
          url: URL.GAMEMODES.UPGRADER,
        },
        {
          label: {
            en: "Mines",
            es: "Minas",
            ru: "Бомбы",
          },
          url: URL.GAMEMODES.MINES,
        },
        {
          label: {
            en: "PVP Mines",
            es: "PVP minas",
            ru: "PVP бомбы",
          },
          url: URL.GAMEMODES.PVP_MINES,
        },
        {
          label: {
            en: "Plinko",
            es: "Plinko",
            ru: "Плинко",
          },
          url: URL.GAMEMODES.PLINKO,
        },
        {
          label: {
            en: "Cases",
            es: "Cases",
            ru: "Keйсы",
          },
          url: URL.GAMEMODES.UNBOX,
        },
      ],
    },
    {
      name: {
        en: "featured",
        es: "presentado",
        ru: "представлены",
      },
      items: [
        {
          label: {
            en: "Case Battles",
            es: "Batallas de casos",
            ru: "Битвы Kейсов",
          },
          url: URL.GAMEMODES.CASE_BATTLES,
          icon: (
            <span class=" px-1 center inline  w-fit header-mark-new">
              <span class="font-Quicksand font-bold text-10">NEW</span>
            </span>
          ),
        },
        {
          label: {
            en: "Coin Flip",
            es: "Lanzamiento de moneda",
            ru: "Подбрасывание монеты",
          },
          url: URL.GAMEMODES.COINFLIP,
          icon: (
            <span class=" px-1 center  w-fit header-mark-hot">
              <span class="font-Quicksand font-bold text-10">HOT</span>
            </span>
          ),
        },
        {
          label: {
            en: "Wheel",
            es: "Rueda",
            ru: "Колесо",
          },
          url: URL.GAMEMODES.WHEEL,
          icon: (
            <span class=" px-1 center w-fit header-mark-hot m-0">
              <span class="font-Quicksand font-bold text-10">HOT</span>
            </span>
          ),
        },
      ],
    },
    {
      name: {
        en: "rewards",
        es: "recompensas",
        ru: "награды",
      },
      items: [
        {
          label: {
            en: "Daily Cases",
            es: "Casos diarios",
            ru: "Ежедневные награды",
          },
          url: URL.REWARDS,
        },
        {
          label: {
            en: "Rakeback",
            es: "Rakeback",
            ru: "Рейкбєк",
          },
          url: URL.REWARDS,
        },
      ],
    },
    {
      name: {
        en: "other",
        es: "otra",
        ru: "другие",
      },
      items: [
        {
          label: {
            en: "Leaderboard",
            es: "Tabla de clasificación",
            ru: "Таблица лидеров",
          },
          url: URL.HOME,
        },
        {
          label: {
            en: "Rewards",
            es: "Recompensas",
            ru: "Награды",
          },
          url: "?profile=true",
        },
        {
          label: {
            en: "Contact Us",
            es: "Contacta con nosotras",
            ru: "Свяжитесь с нами",
          },
          url: SOCIAL.DISCORD,
        },
      ],
    },
    {
      name: {
        en: "Socials",
        es: "Sociales",
        ru: "Социальные сети",
      },
      items: [
        {
          label: "Twitter",
          url: SOCIAL.TWITTER,
          svg: (
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.0003 2.36755C23.1185 2.76918 22.169 3.04068 21.173 3.16199C22.19 2.53799 22.9705 1.54837 23.3382 0.369749C22.3859 0.947621 21.3337 1.36799 20.2094 1.59337C19.3135 0.61256 18.0329 0 16.6158 0C13.8984 0 11.6938 2.26068 11.6938 5.04879C11.6938 5.4446 11.736 5.82879 11.8205 6.19873C7.72853 5.9876 4.10117 3.97967 1.67099 0.921559C1.24706 1.66987 1.00462 2.53799 1.00462 3.46255C1.00462 5.21342 1.87387 6.75897 3.19518 7.66478C2.38949 7.64022 1.62862 7.41053 0.963746 7.03497V7.09703C0.963746 9.54409 2.66118 11.5852 4.91511 12.0476C4.50242 12.1661 4.06705 12.2253 3.61761 12.2253C3.30074 12.2253 2.9908 12.195 2.69061 12.1357C3.31742 14.1408 5.13467 15.6013 7.28997 15.6403C5.6051 16.9953 3.48092 17.8027 1.17487 17.8027C0.777559 17.8027 0.384561 17.7796 0 17.7333C2.1793 19.1634 4.76848 19.9998 7.54778 19.9998C16.6057 19.9998 21.5572 12.3075 21.5572 5.6351C21.5572 5.41554 21.5529 5.19598 21.5444 4.98073C22.507 4.26861 23.3423 3.38024 24.0003 2.36755Z"
                class="fill-current"
              />
            </svg>
          ),
        },
        {
          label: "Discord",
          url: SOCIAL.DISCORD,
          svg: (
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z"
                class="fill-current"
              />
            </svg>
          ),
        },
        {
          label: {
            en: "Profile",
            es: "Perfil",
            ru: "Профиль",
          },
          url: "?profile=true",
        },
      ],
    },
  ];

  return (
    <div>
      <div class="relative rounded-br-8 overflow-hidden">
        <div
          class="flex relative z-10 "
          style={{"background-image": `url('${footerLogoBgVector}')`}}
        >
          <div class="p-6 pb-2 lg:pb-0 lg:p-12 xl:pl-28 w-full flex relative z-20 flex-wrap font-SpaceGrotesk">
            <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
              <img src={footerLogo} alt="logo" />
              <p class="text-blue-60 max-w-sm text-12 mt-[24px] lg:mt-5 mr-14 pb-4">
                {i18n.t("footer.Rustyloot is the finest")}
                <br />
                <br />
                {i18n.t("footer.Description")}
                <br />
                <br />
                {i18n.t("footer.Copyright")}
              </p>
            </div>
            <div class="grid grid-cols-6 gap-x-14 lg:gap-x-0 w-full lg:w-2/3 lg:flex flex-wrap">
              <For each={menus}>
                {(menu) => {
                  return (
                    <div class="col-span-2 lg:col-auto flex flex-col lg:mr-12 mb-5 lg:mb-0">
                      <div class="text-12 lg:text-16 font-bold capitalize text-white mb-3">
                        {menu.name[i18n.language]}
                      </div>
                      <div class="flex flex-col gap-[13px] lg:gap-2">
                        <For each={menu.items}>
                          {(item) => (
                            <NavLink
                              noScroll={false}
                              onClick={(e) => {
                                if (
                                  item.label == "Discord" ||
                                  item.label.en == "Contact Us"
                                ) {
                                  e.preventDefault();
                                  window.open(SOCIAL.DISCORD, "_blank").focus();
                                } else if (item.label == "Twitter") {
                                  e.preventDefault();
                                  window.open(SOCIAL.TWITTER, "_blank").focus();
                                } else if (item.label.en == "Provably Fair") {
                                  e.preventDefault();
                                  setToggles("provablyFairModal", true);
                                } else {
                                  document.getElementById(
                                    "scrollWrapper"
                                  ).scrollTop = 0;
                                }
                              }}
                              href={`${
                                item.label == "affiliates"
                                  ? `${props.pathname()}?affiliates=true`
                                  : item.url
                                  ? item.url
                                  : props.pathname()
                              }`}
                              class={`${
                                props.pathname() == item.url
                                  ? "text-white"
                                  : "text-gray-66"
                              } ${
                                item.svg || item.icon
                                  ? "flex flex-row items-center"
                                  : ""
                              } gap-3 cursor-pointer group block`}
                            >
                              <p class="shrink-0 text-12 lg:text-14 text-gray-9a font-bold group-hover:text-white transition duration-200 ease-in-out">
                                {item.label == "Twitter" ||
                                item.label == "Discord"
                                  ? item.label
                                  : item.label[i18n.language]}
                              </p>
                              {item.icon}
                            </NavLink>
                          )}
                        </For>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </div>
        <div
          class="absolute left-0 top-0 w-full h-full p-[2px] z-0"
          style={{
            background:
              "linear-gradient(35deg, rgba(255, 178, 54, 0.2) 0%, rgba(0, 0, 0, 0) 20%), linear-gradient(rgba(55, 57, 81, 0) 0%, rgba(55, 57, 81, 0.12) 100%), linear-gradient(173.38deg, rgba(28, 29, 51, 0.25) 0%, rgba(27, 29, 52, 0.25) 100%)",
          }}
        >
          <div
            class="w-full h-full opacity-50"
            style={{
              background:
                "linear-gradient(90.04deg, #1A1B30 0%, #21243B 100%), rgba(255, 255, 255, 0.02)",
            }}
          />
        </div>
      </div>
      <SubFooter />
    </div>
  );
};

export default Footer;
