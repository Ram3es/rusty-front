import { createSignal, For, onMount } from "solid-js";
import { NavLink, useLocation } from "solid-app-router";
import { SOCIAL, URL } from "../../libraries/url";
import smallLogo from "../../assets/smallLogo.svg";
import Coin from "../../utilities/Coin";
import balanceMaskBg from "../../assets/img/header/balanceMaskBg.png";
import headerLogoBgVector from "../../assets/img/header/headerLogoBgVector.png";
import injector from "../../injector/injector";
import { ranksBorderColor } from "../../libraries/constants";
import Ranks from "../../utilities/Ranks";
import { useI18n } from "../../i18n/context";
import MobileBurgerMenuIcon from "../icons/MobileBurgerMenuIcon";
import isMenuActive from "./IsMenuActive.jsx";
import MobileNav from "./MobileNav";
import { playMenuToggle } from "../../utilities/Sounds/SoundButtonClick";
import roomStore from "../chat/RoomStore";
import EnFlag from "../../assets/img/header/enFlag.svg";
import EsFlag from "../../assets/img/header/esFlag.svg";
import RuFlag from "../../assets/img/header/ruFlag.svg";
import BattleIcon from "../../components/icons/BattleIcon";
import CoinflipIcon from "../../components/icons/CoinflipIcon";
import UpgraderIcon from "../../components/icons/UpgraderIcon";
import WheelIcon from "../../components/icons/WheelIcon";
import CaseOpeningIcon from "../../components/icons/CaseOpeningIcon";
import MinesIcon from "../../components/icons/MinesIcon";
import PlinkoIcon from "../../components/icons/PlinkoIcon";
import ModeMark from "./ModeMark";
import DarkButton from "../elements/DarkButton";
import ArrowDown from "../icons/ArrowDown";
import LoginButton from "../elements/LoginButton";
import PVPMinesIcon from "../icons/PVPMinesIcon";
import PlusIcon from "../icons/PlusIcon";
import CloseIcon from "../icons/CloseIcon";

const SubHeader = (props) => {
  let soundButtonMain;
  let soundWrapperMain;
  let notificationButtonMain;
  let langButtonMain;
  const { setToggles, userObject, socket, setUserObject } = injector;
  const location = useLocation();
  const [activeMobileMenu, setActiveMobileMenu] = createSignal(false);
  const i18n = useI18n();
  const [isSoundModalOpen, setSoundModalOpen] = createSignal(false);
  const [isNotificationModalOpen, setNotificationModalOpen] =
    createSignal(false);
  const [currPath, setCurrPath] = createSignal(window.location.pathname);
  const [notifications, setNotifications] = createSignal([
    {
      title: "YOUR TRADE IS STUCK",
      message:
        "You won a coinflip trade but a Steam Error occurred. Resend your winnings here!",
    },
  ]);
  const [isLangModalOpen, setLangModalOpen] = createSignal(false);
  const [availableLocales, setAvailableLocales] = createSignal([]);
  const [setRoom] = roomStore;
  const navigationGameModes = [
    {
      name: { en: "Case Battles", es: "case battles", ru: "case battles" },
      svg: <BattleIcon />,
      url: URL.GAMEMODES.CASE_BATTLES,
      mark: "new",
    },
    {
      name: { en: "Coinflip", es: "coinflip", ru: "Коинфлип" },
      svg: <CoinflipIcon />,
      url: URL.GAMEMODES.COINFLIP,
      mark: "hot",
    },
    {
      name: { en: "Upgrader", es: "upgrader", ru: "Апгрейдер" },
      svg: <UpgraderIcon />,
      url: URL.GAMEMODES.UPGRADER,
      mark: "hot",
    },
    {
      name: { en: "Wheel", es: "rueda", ru: "колесо" },
      svg: <WheelIcon />,
      url: URL.GAMEMODES.WHEEL,
      mark: "soon",
      disabled: true,
    },
    {
      name: { en: "Mines", es: "Minas", ru: "Бомбы" },
      svg: <MinesIcon />,
      url: URL.GAMEMODES.MINES,
      mark: "soon",
      disabled: true,
    },
    {
      name: { en: "Plinko", es: "Plinko", ru: "Плинко" },
      svg: <PlinkoIcon />,
      url: URL.GAMEMODES.PLINKO,
      mark: "soon",
      disabled: true,
    },
    {
      name: { en: "Cases", es: "cases", ru: "cases" },
      svg: <CaseOpeningIcon />,
      url: URL.UNBOXING,
    },
    {
      name: { en: "PVP Mines", es: "Minas PVP", ru: "PVP Бомбы" },
      svg: <PVPMinesIcon />,
      url: URL.GAMEMODES.PVP_MINES,
    },
  ];

  const toggles = [
    { name: "Affiliates", url: `?affiliates=true` },
    { name: "Leaderboard", url: URL.LEADERBOARD },
    { name: "Rewards", url: URL.REWARDS },
    { name: "Free Coins", url: `?free=true` },
    { name: "Fairness", url: URL.FAIRNESS },
  ];

  const supports = [
    { name: "Terms of Service", url: URL.TOS },
    { name: "Frequent Questions", url: "/questions" },
    { name: "Support", url: URL.SUPPORT },
    { name: "Discord", url: SOCIAL.DISCORD },
    { name: "Twitter", url: SOCIAL.TWITTER },
  ];

  const toggleSounds = (volume) => {
    if (volume === 0) {
      setSoundModalOpen(false);
    }
    socket.emit("system:sounds:toggle", { volume: volume * 100 }, (data) => {
      if (!data.error) {
        setUserObject("user", (prev) => ({
          ...prev,
          sounds: data.data.sounds / 100,
        }));
      }
    });
  };

  const toggleActiveLang = (lang) => {
    props.changeLang(lang);
    setAvailableLocales((prev) =>
      prev.map((l) => {
        return { ...l, active: l.code === lang };
      })
    );
  };

  const removeNotification = (index) => {
    setNotifications((prev) => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
  };

  const handleClick = (event) => {
    if (
      soundWrapperMain &&
      soundButtonMain &&
      !soundWrapperMain.contains(event.target) &&
      !soundButtonMain.contains(event.target)
    ) {
      setSoundModalOpen(false);
    }

    if (
      notificationButtonMain &&
      !notificationButtonMain.contains(event.target)
    ) {
      setNotificationModalOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClick);

  onMount(() => {
    console.log(userObject);
    setAvailableLocales([
      { title: "En", code: "en", active: setRoom() == "en", flag: EnFlag },
      { title: "Es", code: "es", active: setRoom() == "es", flag: EsFlag },
      { title: "Ru", code: "ru", active: setRoom() == "ru", flag: RuFlag },
    ]);
  });

  return (
    <>
      <div class="relative z-40 h-14 md:h-full">
        <div
          class="flex relative z-10 h-14 items-center px-4 py-2 sm:p-0 md:h-auto"
          style={{
            "background-image": `url('${headerLogoBgVector}')`,
          }}
        >
          <NavLink
            class="relative px-4 lg:px-16 xll:px-22 xxl:px-24 py-6"
            href={URL.HOME}
          >
            <img
              alt="logo"
              class={`max-w-[28px] sm:max-w-[62px] fourk:w-auto block`}
              src={smallLogo}
              style={{
                filter: "drop-shadow(0px 0px 24px rgba(255, 194, 57, 0.16))",
              }}
            />
          </NavLink>
          <div class="flex grow lg:flex-col justify-end lg:justify-start">
            <div class="hidden lg:flex justify-between px-5 py-2 subheader-nav">
              <div class="flex gap-6">
                <For each={toggles}>
                  {(toggle) => (
                    <NavLink
                      href={`${
                        toggle.name === "Affiliates" ||
                        toggle.name === "Free Coins"
                          ? `${location.pathname}${toggle.url}`
                          : toggle.url
                      }`}
                      class={`center gap-3 cursor-pointer group relative`}
                      onClick={(e) => {
                        if (toggle.url == URL.FAIRNESS) {
                          e.preventDefault();
                          setToggles("provablyFairModal", true);
                        }
                        setTimeout(() => {
                          setCurrPath(() => window.location.pathname);
                        }, 100);
                      }}
                    >
                      <p
                        class={`text-10 sm:text-14 text-current font-medium font-SpaceGrotesk ${
                          toggle.url === URL.REWARDS
                            ? "reward-label"
                            : "text-gray-6a group-hover:text-gray-9aa"
                        } transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                      >
                        {toggle.name}
                        {toggle.url === URL.REWARDS && (
                          <span class="flex h-[3px] w-[3px] relative text-yellow-ffb">
                            <span
                              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform"
                              style={{
                                "box-shadow":
                                  "0px 0px 5px 1px rgba(255, 180, 54, 0.72)",
                              }}
                            />
                            <span class="relative inline-flex rounded-full h-[3px] w-[3px] bg-current" />
                          </span>
                        )}
                      </p>
                    </NavLink>
                  )}
                </For>
              </div>
              <div class="flex gap-6">
                <For each={supports}>
                  {(toggle) => (
                    <NavLink
                      href={`${toggle.url}`}
                      class={`center gap-3 cursor-pointer group relative`}
                      onClick={() => {
                        setTimeout(() => {
                          setCurrPath(() => window.location.pathname);
                        }, 100);
                      }}
                    >
                      <p
                        class={`text-10 sm:text-14 text-current font-SpaceGrotesk text-gray-6a group-hover:text-gray-9aa transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                      >
                        {toggle.name}
                      </p>
                    </NavLink>
                  )}
                </For>
                <div class="relative">
                  <button
                    type="button"
                    onClick={() => {
                      playMenuToggle();
                      setLangModalOpen((prev) => !prev);
                    }}
                    ref={langButtonMain}
                    class="relative w-24 h-6 flex justify-between items-center py-2 pl-3 text-left"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                  >
                    <span class="block truncate">
                      <For each={availableLocales()}>
                        {(item) =>
                          item.active ? (
                            <span class="flex gap-2 items-center font-SpaceGrotesk font-bold text-13 text-gray-9a uppercase">
                              {" "}
                              <img class="h-3" src={item.flag} alt="flag" />
                              {item.title}
                            </span>
                          ) : (
                            ""
                          )
                        }
                      </For>
                    </span>
                    <span
                      class={`pointer-events-none absolute inset-y-0 w-4 h-4 text-gray-9a center right-4 top-1/2 transform -translate-y-[9px] header-hang-toggle-wrapper`}
                    >
                      <ArrowDown isOpen={isLangModalOpen()} />
                    </span>
                  </button>

                  <ul
                    class={`${
                      isLangModalOpen() ? "" : "hidden"
                    } absolute z-40 mt-1 w-full overflow-auto py-1 font-SpaceGrotesk text-13 text-gray-9a uppercase nav-lang-popup p-2 flex flex-col gap-1`}
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                  >
                    <For each={availableLocales()}>
                      {(item) =>
                        !item.active ? (
                          <li
                            onClick={() => toggleActiveLang(item.code)}
                            class="text-gray-900 relative select-none py-1 pl-3 pr-9 cursor-pointer border-2 border-white rounded-6 border-opacity-5"
                            id="listbox-option-0"
                            role="option"
                          >
                            <span class="flex gap-1 items-center font-SpaceGrotesk font-bold text-13 text-gray-9a uppercase">
                              <img src={item.flag} alt="flag" />
                              {item.title}
                            </span>
                          </li>
                        ) : (
                          ""
                        )
                      }
                    </For>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex items-center sm:flex-grow  lg:justify-between lg:pr-10 gap-[10px] sm:gap-6 lg:gap-0">
              <div class="hidden lg:flex gap-2 items-center h-full py-2">
                <For each={navigationGameModes}>
                  {(mode) => (
                    <NavLink
                      href={mode.disabled ? "" : mode.url}
                      class="relative"
                      onClick={() => {
                        if (!mode.disabled) {
                          document.getElementById(
                            "scrollWrapper"
                          ).scrollTop = 0;
                          setActiveMobileMenu(false);
                          setCurrPath(() => mode.url);
                        }
                      }}
                    >
                      <div
                        class={`h-[66px] ${
                          mode.url === URL.GAMEMODES.CASE_BATTLES
                            ? "xxl:w-[136px]"
                            : "xxl:w-[108px]"
                        } px-2 llg:px-4 xll:px-7 py-2 relative rounded-4 shadow-button ${
                          currPath().indexOf(mode.url) >= 0
                            ? "header-nav-link-active"
                            : mode.mark === "new"
                            ? "header-nav-link--mark header-nav-link--border__yellow"
                            : mode.mark === "hot"
                            ? "header-nav-link--mark header-nav-link--border__yellow"
                            : "header-nav-link--default"
                        } transition-colors transition-shadows duration-200 pb-0 cursor-pointer group`}
                      >
                        <div class="flex flex-col justify-around py-1 items-center relative h-full z-10">
                          <div
                            class={`${
                              currPath().indexOf(mode.url) >= 0
                                ? "text-yellow-ffb"
                                : "text-gray-55"
                            } group-hover:text-yellow-ffb`}
                          >
                            {mode.svg}
                          </div>
                          <p
                            class={`text-14 font-bold font-SpaceGrotesk truncate ${
                              currPath().indexOf(mode.url) >= 0
                                ? "text-yellow-ffb"
                                : "text-gray-9b"
                            } group-hover:text-yellow-ffb`}
                          >
                            {mode.name[i18n.language]}
                          </p>
                        </div>
                      </div>
                      <ModeMark mark={mode.mark} />
                    </NavLink>
                  )}
                </For>
              </div>
              {userObject.authenticated ? (
                <div class="flex flex-row-reverse sm:flex-row items-center gap-[10px] sm:gap-6">
                  <div class="flex h-10">
                    <div class="balance-bg rounded-l-6 flex items-center">
                      <div class="bg-black bg-opacity-10 rounded-l-4 h-[calc(100%-4px)] flex m-0.5 w-[113px] sm:w-[146px]">
                        <div
                          class="overflow-x-scroll w-full h-full px-2 sm:px-3 bg-cover py-1 text-16 text-gray-e0 rounded-l-6 flex gap-2 items-center font-Lato font-bold"
                          style={{
                            background: `url(${balanceMaskBg})`,
                            "border-radius": "4px 4px 4px 4px",
                          }}
                        >
                          <Coin />
                          <div class="text-gradient ">
                            {userObject?.user?.balance?.toLocaleString("en") ||
                              0}
                            .<span class="text-14 text-gradient">00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      href={`${props.pathname()}?deposit=true`}
                      class="w-10 sm:w-[108px] group py-3 px-4 lg:px-6 lg:py-2 text-14 green-btn-gradient border-2 border-green-1b/75 rounded-r-4 text-white flex gap-2 items-center justify-center font-SpaceGrotesk font-bold"
                    >
                      <span class="">
                        <PlusIcon />
                      </span>
                      <span
                        class="hidden md:block group-hover:hidden"
                        style={{
                          "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        Deposit
                      </span>
                    </NavLink>
                  </div>
                  <div class="hidden md:flex gap-3">
                    <NavLink href={`${props.pathname()}?withdraw=true`}>
                      <DarkButton>Withdraw</DarkButton>
                    </NavLink>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <NavLink
                      href={`${props.pathname()}?profile=true`}
                      class="w-10 h-10 rounded-full border border-yellow-ff center relative"
                    >
                      {userObject?.user?.avatar ? (
                        <>
                          <div
                            class={`w-10 h-10 rounded-full relative flex justify-center items-center overflow-hidden cursor-pointer p-sm bg-gradient-to-b ${
                              ranksBorderColor[userObject?.user?.level?.league]
                            }`}
                          >
                            <div class="rounded-full w-9 h-9 relative overflow-hidden p-sm bg-dark-13">
                              <img
                                src={userObject?.user?.avatar}
                                class="min-h-full min-w-full rounded-full absolute left-0 top-0"
                              />
                            </div>
                          </div>
                          <div class="hidden sm:block absolute -right-1 -bottom-1">
                            <Ranks
                              staff={userObject?.user?.rank}
                              rank={userObject?.user?.level?.league}
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          alt="logo"
                          class="w-full h-full rounded-full"
                          src={userObject?.user?.avatar || smallLogo}
                        />
                      )}
                    </NavLink>
                    {userObject?.user?.level && (
                      <div class="hidden sm:block w-full h-1 rounded-full overflow-hidden bg-dark-22">
                        <div
                          class="h-full rounded-full duration-200"
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
                    )}
                  </div>
                </div>
              ) : (
                <div class="w-[156px] h-10">
                  <LoginButton
                    onClick={() => {
                      setToggles("tosModal", true);
                    }}
                  />
                </div>
              )}
              <div
                class="rounded-4 shadow-button flex border border-[#FFFFFF08] items-center justify-center cursor-pointer text-gray-9a h-10 w-10 lg:hidden"
                onClick={() => setActiveMobileMenu((prev) => !prev)}
              >
                {activeMobileMenu() ? <CloseIcon /> : <MobileBurgerMenuIcon />}
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute left-0 top-0 w-full h-full p-[2px] z-0"
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 178, 54, 0.2) 0%, rgba(0, 0, 0, 0) 8%), linear-gradient(rgba(55, 57, 81, 0) 0%, rgba(55, 57, 81, 0.12) 100%), linear-gradient(173.38deg, rgba(28, 29, 51, 0.25) 0%, rgba(27, 29, 52, 0.25) 100%)",
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
        {/* <MobileNav
          {...props}
          notifications={notifications()}
          removeNotification={removeNotification}
        /> */}
        {activeMobileMenu() && !isNotificationModalOpen() && (
          <div
            class={`absolute flex flex-col left-0 top-full w-full h-[calc(100vh-55px)] overflow-y-scroll p-6 gap-6 subheader-nav`}
          >
            <div class="flex flex-col gap-[18px]">
              <For each={toggles}>
                {(toggle) => (
                  <NavLink
                    href={`${
                      toggle.name === "Affiliates" ||
                      toggle.name === "Free Coins"
                        ? `${location.pathname}${toggle.url}`
                        : toggle.url
                    }`}
                    class={`gap-3 cursor-pointer group relative`}
                    onClick={(e) => {
                      if (toggle.url == URL.FAIRNESS) {
                        e.preventDefault();
                        setToggles("provablyFairModal", true);
                      }
                      setTimeout(() => {
                        setCurrPath(() => window.location.pathname);
                      }, 100);
                    }}
                  >
                    <p
                      class={`text-16 sm:text-14 text-current font-medium font-SpaceGrotesk ${
                        toggle.url === URL.REWARDS
                          ? "reward-label"
                          : "text-gray-6a group-hover:text-gray-9aa"
                      } transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                    >
                      {toggle.name}
                      {toggle.url === URL.REWARDS && (
                        <span class="flex h-[3px] w-[3px] relative text-yellow-ffb">
                          <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform"
                            style={{
                              "box-shadow":
                                "0px 0px 5px 1px rgba(255, 180, 54, 0.72)",
                            }}
                          />
                          <span class="relative inline-flex rounded-full h-[3px] w-[3px] bg-current" />
                        </span>
                      )}
                    </p>
                  </NavLink>
                )}
              </For>
            </div>
            <div class="w-full bg-[#27293D] h-[1px]" />
            <div class="flex flex-col gap-[18px]">
              <For each={supports}>
                {(toggle) => (
                  <NavLink
                    href={`${toggle.url}`}
                    class={`gap-3 cursor-pointer group relative`}
                    onClick={() => {
                      setTimeout(() => {
                        setCurrPath(() => window.location.pathname);
                      }, 100);
                    }}
                  >
                    <p
                      class={`text-16 sm:text-14 text-current font-SpaceGrotesk text-gray-6a group-hover:text-gray-9aa transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                    >
                      {toggle.name}
                    </p>
                  </NavLink>
                )}
              </For>
            </div>
            <div class="w-full bg-[#27293D] h-[1px]" />
            <div class="relative">
              <button
                type="button"
                onClick={() => {
                  playMenuToggle();
                  setLangModalOpen((prev) => !prev);
                }}
                ref={langButtonMain}
                class="relative w-24 flex gap-4 items-center py-1"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
              >
                <span class="block truncate">
                  <For each={availableLocales()}>
                    {(item) =>
                      item.active ? (
                        <span class="flex gap-[6.5px] items-center font-SpaceGrotesk font-bold text-16 lg:text-13 text-gray-9a uppercase">
                          {" "}
                          <img
                            class="h-3 rounded-2"
                            src={item.flag}
                            alt="flag"
                          />
                          {item.title}
                        </span>
                      ) : (
                        ""
                      )
                    }
                  </For>
                </span>
                <span
                  class={`pointer-events-none absolute inset-y-0 w-4 h-4 text-gray-9a center right-4 top-1/2 transform -translate-y-[9px] header-hang-toggle-wrapper`}
                >
                  <ArrowDown isOpen={isLangModalOpen()} />
                </span>
              </button>

              <ul
                class={`${
                  isLangModalOpen() ? "" : "hidden"
                } absolute z-40 w-full overflow-auto font-SpaceGrotesk text-13 text-gray-9a uppercase nav-lang-popup p-2 flex flex-col gap-2`}
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <For each={availableLocales()}>
                  {(item) =>
                    !item.active ? (
                      <li
                        onClick={() => toggleActiveLang(item.code)}
                        class="text-gray-900 relative select-none p-1 cursor-pointer border-2 border-white rounded-6 border-opacity-5"
                        id="listbox-option-0"
                        role="option"
                      >
                        <span class="flex gap-1 items-center font-SpaceGrotesk font-bold text-16 text-gray-9a uppercase">
                          <img src={item.flag} alt="flag" />
                          {item.title}
                        </span>
                      </li>
                    ) : (
                      ""
                    )
                  }
                </For>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubHeader;
