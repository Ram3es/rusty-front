import { createEffect, createSignal } from "solid-js";
import injector from "../../injector/injector";
import { API, URL } from "../../libraries/url";
import Modal from "./Modal";
import { NavLink } from "solid-app-router";
import { useI18n } from "../../i18n/context";
import FreecoinsBanner from "../../assets/img/modals/FreecoinsBanner.png";
import FreeCoinsModalSocialsBg from "../../assets/img/modals/FreeCoinsModalSocialsBg.png";
import HeaderBg from "../../assets/img/modals/ModalHeaderBg.png";
import BgMainVector from "../../assets/img/coinflip/bgItemsRL.png";

import FreeDailyCase from "../../assets/img/modals/FreeDailyCase.png";
import DiscordIcon from "../../assets/img/modals/discordIcon.png";
import TwiterIcon from "../../assets/img/modals/twiterIcon.png";
import TooltipIcon from "../icons/TooltipIcon";
import CloseButton from "../elements/CloseButton";

const FreeModal = (props) => {
  const i18n = useI18n();

  const { socket, userObject, toastr } = injector;

  let input;

  const [code, setCode] = createSignal("");

  const [flashCode, setFlashCode] = createSignal("");

  const [codeSet, setCodeSet] = createSignal(false);

  createEffect(() => {
    if (props.searchParams?.free) {
      if (userObject?.user?.code) {
        setCodeSet(true);
        setCode(userObject?.user?.code);
        input.disabled = true;
      }
      if (props.searchParams?.code) {
        setCode(props.searchParams.code);
      }
    }

    if (props.pathname().includes("/r/")) {
      const code = props.pathname().split("/r/")[1];
      if (code) {
        setCode(code);
      }
    }
  });

  const claim = () => {
    if (codeSet()) return;
    socket.emit(
      "affiliate:claim",
      {
        code: code(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          input.disabled = true;
          setCodeSet(true);
        }
      }
    );
  };

  const claimFlash = () => {
    if (!flashCode()) return;

    socket.emit(
      "system:flash:claim",
      {
        code: flashCode(),
      },
      (data) => {
        if (data.msg) toastr(data);
      }
    );
  };

  const buttonName = {
    claimed: {
      en: "Claimed",
      es: "Reclamado",
      ru: "Получено",
    },
    claim: {
      en: "Claim",
      es: "Reclamar",
      ru: "Получить",
    },
  };

  return (
    <Modal
      open={() => {
        return true;
      }}
      pathname={props.pathname}
      handler={props.handler}
      noContainer={true}
    >
      <NavLink
        class="w-full h-full absolute left-0 cursor-default top-0"
        href={props.pathname().includes("/r/") ? URL.HOME : props.pathname()}
      />
      <div
        class="flex flex-col w-11/12"
        style={{
          "max-width": "30rem",
        }}
      >
        <div
          class={` w-full relative flex flex-col rounded-12 overflow-hidden transition-all transform -translate-y-1/4 ${
            !props.searchParams?.free ? "" : "-translate-y-0"
          } duration-100 ease-out`}
          style={{
            background:
              "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
            "backdrop-filter": "blur(8px)",
          }}
        >
          <div
            class="flex justify-between items-center relative px-8 py-4"
            style={{
              background:
                "linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)",
            }}
          >
            <div class="flex flex-col">
              <h2 class="text-20 text-white font-bold font-SpaceGrotesk uppercase truncate">
                {i18n.t("free_coins.Free coins")}
              </h2>
              <div class="font-SpaceGrotesk text-12 text-[#646683]">
                Earn free RustyLoot Balance.
              </div>
            </div>
            <NavLink
              href={`${
                props.pathname().includes("/r/") ? URL.HOME : props.pathname()
              }`}
            >
              <CloseButton />
            </NavLink>
          </div>
          <div class="relative pt-5">
            <div
              class="absolute inset-0 z-0 bg-repeat mix-blend-luminosity"
              style={{
                "background-image": `url('${BgMainVector}')`,
                opacity: 0.005,
              }}
            />
            <div class="w-full flex flex-col gap-5 mb-8 px-8">
              <div class="w-full flex flex-col gap-2">
                <div class="text-14 text-gray-8c font-normal font-SpaceGrotesk sentence flex items-center gap-2">
                  <span>{i18n.t("free_coins.Creator code")}</span>
                  <div class="relative group cursor-pointer">
                    <TooltipIcon />
                    <svg
                      class="group-hover:block hidden absolute left-1/2 top-full transform -translate-x-1/2 rotate-180"
                      width="23"
                      height="16"
                      viewBox="0 0 23 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.95305 0.5H20.0469C21.2765 0.5 21.9838 1.89801 21.2554 2.88859L12.7085 14.5124C12.1091 15.3277 10.8909 15.3277 10.2915 14.5124L1.74458 2.88859C1.01622 1.89802 1.72352 0.5 2.95305 0.5Z"
                        fill="#171B27"
                        stroke="#272A3B"
                      />
                    </svg>
                    <span class="group-hover:flex hidden top-full left-1/2 absolute z-20 transform -translate-x-1/2 translate-y-2 py-3 px-5 bg-dark-17 border border-gray-30 text-gray-8c text-14 shadow-md rounded-2 flex-col w-48">
                      <p class="text-16 text-white">Creator code</p>
                      <p class="text-14">
                        Don't have a creator code handy? Use code "LOOT"
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  class="w-full max-w-md p-[2px] rounded-[4px] h-11 mt-1"
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
                    <div class="flex items-center gap-4 pl-2 pr-1 w-full relative z-10">
                      <input
                        ref={input}
                        class={`text-white grow text-14 font-SpaceGrotesk sm:w-44`}
                        placeholder="Enter code..."
                        onInput={(e) => setCode(e.currentTarget.value)}
                        value={code()}
                      />
                      <div
                        class="px-3 cursor-pointer center h-8 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk"
                        onClick={claim}
                      >
                        {buttonName.claim[i18n.language]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col gap-2">
                <p class="text-14 text-gray-8c font-normal font-SpaceGrotesk sentence">
                  {i18n.t("free_coins.Flash code")}
                </p>
                <div
                  class="w-full max-w-md p-[2px] rounded-[4px] h-11 mt-1"
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
                    <div class="flex items-center gap-4 pl-2 pr-1 w-full relative z-10">
                      <input
                        ref={input}
                        class={`text-white grow text-14 font-SpaceGrotesk sm:w-44`}
                        placeholder={i18n.t("free_coins.Type here")}
                        onInput={(e) => setCode(e.currentTarget.value)}
                        value={code()}
                      />
                      <div
                        class="px-3 cursor-pointer center h-8 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk"
                        onClick={claim}
                      >
                        {buttonName.claim[i18n.language]}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full h-10 bg-dark-20 relative center">
                  <div class="absolute w-full h-full rounded-4 bg-dark-22" />
                  <input
                    class="w-full h-full px-4 text-white text-14 font-medium font-Oswald uppercase backdrop-blur-sm rounded-4 placeholder-gray-8c z-10"
                    placeholder={i18n.t("free_coins.Type here")}
                    style={{
                      background:
                        "linear-gradient(218.47deg, rgba(19, 22, 32, 0.5) -4.89%, rgba(19, 22, 32, 0) 109.48%)",
                      border: "0.5px solid rgba(102, 110, 151, 0.2)",
                    }}
                    value={flashCode()}
                    onInput={(e) => {
                      setFlashCode(e.currentTarget.value);
                    }}
                  />
                  <div
                    class="absolute right-4 w-24 h-6 bg-dark-2d duration-200 text-gray-47 hover:text-white center hover z-10"
                    onClick={() => claimFlash()}
                  >
                    <p class="text-14 text-current font-bold sentence">
                      {i18n.t("free_coins.Claim coins")}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col w-full gap-2">
                <NavLink
                  href="/case?id=1"
                  class="center relative p-5 w-full flex justify-between bg-cover h-32"
                  style={{
                    "background-image": `url(${FreecoinsBanner})`,
                    height: "119px",
                  }}
                >
                  <div class="flex flex-col w-11/12">
                    <div class="mb-2 flex flex-row items-end">
                      <h3 class="text-white uppercase text-16 font-Oswald font-bold">
                        DAILY CASES
                      </h3>
                    </div>
                    <p class="text-gray-8c text-12">
                      Click <span class="underline">here</span> to open your
                      daily free case
                    </p>
                  </div>
                  <img class="w-3/12" src={FreeDailyCase} alt="FreeDailyCase" />
                </NavLink>
                <div
                  class="center relative p-5 w-full flex justify-between bg-cover"
                  style={{
                    "background-image": `url(${FreeCoinsModalSocialsBg})`,
                    height: "119px",
                  }}
                >
                  <div class="flex flex-col w-11/12">
                    <div class="mb-2 flex flex-row items-end">
                      <h3 class="text-white uppercase text-16 font-Oswald font-bold">
                        FLASH CODES
                      </h3>
                    </div>
                    <p class="text-gray-8c text-12">On our social media</p>
                  </div>
                  <div class="w-1/2 flex gap-1 px-1 transform -translate-x-4 -translate-y-3">
                    <a
                      class="w-1/2"
                      href="https://discord.gg/rustyloot"
                      target="_blank"
                    >
                      <img class="w-full" src={DiscordIcon} alt="DiscordIcon" />
                    </a>
                    <a
                      class="w-1/2"
                      href="https://twitter.com/RustyLootgg"
                      target="_blank"
                    >
                      <img class="w-full" src={TwiterIcon} alt="TwiterIcon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col px-8 pb-8">
              <p class="text-white text-14">Creator Code Requirements</p>
              <p class="text-white text-12">
                <svg
                  class="inline mr-2"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z"
                    fill="#4D5B97"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="#2D3660"
                    stroke-width="1.5"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="black"
                    stroke-opacity="0.2"
                    stroke-width="1.5"
                  />
                </svg>
                You <span class="text-yellow-ff">must</span> be at least level 5
                on Steam
              </p>
              <p class="text-white text-12">
                <svg
                  class="inline mr-2"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z"
                    fill="#4D5B97"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="#2D3660"
                    stroke-width="1.5"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="black"
                    stroke-opacity="0.2"
                    stroke-width="1.5"
                  />
                </svg>
                You <span class="text-yellow-ff">must</span> join our{" "}
                <a
                  class="text-blue-72 underline"
                  href="https://discord.com/invite/rustyloot"
                  target="_blank"
                >
                  Discord
                </a>
              </p>
              <p class="text-white text-12">
                <svg
                  class="inline mr-2"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z"
                    fill="#4D5B97"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="#2D3660"
                    stroke-width="1.5"
                  />
                  <path
                    d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z"
                    stroke="black"
                    stroke-opacity="0.2"
                    stroke-width="1.5"
                  />
                </svg>
                You <span class="text-yellow-ff">must</span> verify you joined
                our Discord via{" "}
                <a
                  class="text-yellow-ff underline"
                  href={API + "/discord"}
                  target="_blank"
                >
                  THIS
                </a>{" "}
                link
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FreeModal;
