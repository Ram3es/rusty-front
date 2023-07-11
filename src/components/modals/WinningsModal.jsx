import { createSignal, For, Show } from "solid-js";
import injector from "../../injector/injector";
import Coin from "../../utilities/Coin";
import Modal from "./Modal";
import Loading from "../Loading";

import RedCoin from "../../assets/img/coinflip/redcoin.svg";
import BlackCoin from "../../assets/img/coinflip/blackcoin.svg";
import ModalBgFade from "../../assets/img/new-upgrader/ModalBgFade.png";
import CloseIcon from "../../assets/img/new-upgrader/CloseIcon.svg";

import GoldText from "../shared/GoldText";
import ItemCardSmall from "../battle/ItemCardSmall";
import GrayGradientButton from "../elements/GrayGradientButton";

const WinningsModal = () => {
  const { socket, toggles, setToggles, toastr } = injector;

  const [side, setSide] = createSignal(1);

  const decision = (choice) => {
    if (choice != "double" && choice != "cashout" && choice != "sell") return;

    if (toggles.winningsModal?.type == "upgrader") {
      socket.emit(
        "upgrader:decision",
        {
          type: choice == "sell" ? "coins" : "skins",
        },
        (data) => {
          if (!data.error) {
            setToggles("winningsModal", false);
          }

          if (data.msg) {
            toastr(data);
          }
        }
      );
    } else {
      socket.emit(
        "coinflip:decision",
        {
          id: toggles.winningsModal?.id,
          type: choice,
          side: side(),
        },
        (data) => {
          if (!data.error) {
            setToggles("winningsModal", false);
          }

          if (data.msg) {
            toastr(data);
          }
        }
      );
    }
  };

  return (
    <Modal
      open={() => {
        return true;
      }}
      handler={() => {}}
      noContainer={true}
    >
      <div
        class="absolute max-w-[calc(100vw-32px)] w-[472px] rounded-xl flex top-1/2 -translate-y-2/3 items-center justify-center p-[1px]"
        style={{
          background: `radial-gradient(26.38% 25.85% at 50% 0%, #FFB436 0%, rgba(255, 180, 54, 0) 100%)`,
        }}
      >
        <div
          class=" rounded-xl lex flex-col w-full h-full font-SpaceGrotesk"
          style={{
            background:
              "radial-gradient(32.68% 20.51% at 49.26% -0.68%, rgba(255, 180, 54, 0.24) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(75.96deg, rgba(255, 255, 255, 0) 19.61%, rgba(255, 255, 255, 0.04) 40.84%, rgba(0, 0, 0, 0.04) 68.47%, rgba(255, 255, 255, 0.04) 99.54%), radial-gradient(121.17% 118.38% at 45.3% 63.29%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 -0.74%, #191C35 99.26%)",
          }}
        >
          <img
            class="absolute h-full w-full"
            src={ModalBgFade}
            alt="modal background"
          />
          <div
            class="absolute top-3 right-3 p-2 border border-[#FFFFFF0A] rounded-md
          hover:bg-[#FFFFFF0A] transition-all cursor-pointer"
            onClick={() => setToggles("winningsModal", false)}
          >
            <img src={CloseIcon} alt="close icon" />
          </div>
          <div class="flex flex-col h-full items-center">
            <div class="py-8 flex-col w-full flex items-center justify-end ">
              <GoldText text={`CONGRATULATIONS`} size={24} noSmallDecimal />
            </div>
            <div
              class="w-full flex items-center justify-center gap-2 p-4"
              style={{
                background: `linear-gradient(270deg, rgba(0, 0, 0, 0) 9%, rgba(0, 0, 0, 0.24) 59%, rgba(0, 0, 0, 0) 109%)`,
              }}
            >
              <For
                each={toggles.winningsModal?.items?.slice(0, 2)}
                fallback={<Loading />}
              >
                {(item) => <ItemCardSmall drop={item} upgraderModal />}
              </For>
              <Show when={toggles.winningsModal?.items?.length > 2}>
                <div class="relative">
                  <div class="opacity-10">
                    <ItemCardSmall
                      drop={toggles.winningsModal?.items[2]}
                      upgraderModal
                    />
                  </div>
                  <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 text-white">
                    <span
                      class="rounded-4 px-2 py-1 text-gray-9a text-14 font-SpaceGrotesk font-bold"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.04)",
                        background: "#1E213B",
                        "box-shadow": "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      + {toggles.winningsModal?.items?.length - 2}
                    </span>
                  </div>
                </div>
              </Show>
            </div>
            <div class="flex flex-col items-center w-full justify-center gap-3 py-4">
              <div class="text-white font-semibold text-13 flex gap-2 uppercase items-center">
                you won
                <p class="text-16 font-semibold sentence center gap-2 potential-drop--price">
                  <Coin width="7" /> {toggles.winningsModal?.value}
                </p>
              </div>
              <div
                class="center gap-4 py-2 rounded-8 w-80 relative z-10"
                style={{
                  border: "1px dashed rgba(162, 165, 198, 0.16)",
                  "box-shadow": "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div class="relative">
                  {side() == 1 ? (
                    <div class="absolute -top-0.5 -left-0.5 rounden-full border border-yellow-ff rounded-full h-12 w-12" />
                  ) : (
                    ""
                  )}
                  <img
                    alt="red-coin"
                    src={RedCoin}
                    class={`cursor-pointer p-1 h-11`}
                    onClick={() => {
                      setSide(1);
                    }}
                  />
                </div>
                <div class="relative">
                  {side() == 2 ? (
                    <div class="absolute -top-0.5 left-0 rounden-full border border-yellow-ff rounded-full h-12 w-12" />
                  ) : (
                    ""
                  )}
                  <img
                    alt="red-coin"
                    src={BlackCoin}
                    class={`cursor-pointer p-1 h-11`}
                    onClick={() => {
                      setSide(2);
                    }}
                  />
                </div>
              </div>
              <div class="flex items-center justify-center w-[80%] gap-5">
                <div
                  class="w-full p-[1px] rounded-md cursor-pointer "
                  style={{
                    background: `linear-gradient(180deg, rgba(255, 180, 54, 0) -197.12%, 
                  rgba(255, 180, 54, 0.36) 100%)`,
                    "box-shadow":
                      "0px 2px 2px 0px #0000001F, 0px 2px 2px 0px #0000001F, 0px 0px 6px 0px #FFB4363D",
                  }}
                  onClick={() => decision("cashout")}
                >
                  <div class="bg-[#1A1C31] rounded-md">
                    <div
                      class="w-full flex items-center justify-center p-2 rounded-md gap-2 "
                      style={{
                        background: `radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.24)0%, rgba(255, 180, 54, 0) 100%)`,
                        filter: `drop-shadow(0px 0px 6px rgba(255, 180, 54, 0.24)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))`,
                      }}
                    >
                      <div class={`font-semibold`} style={{ color: "#FFB436" }}>
                        Claim Winnings
                      </div>
                    </div>
                  </div>
                </div>
                <GrayGradientButton
                  callbackFn={() => {
                    decision("double");
                  }}
                  additionalClass="w-full h-[40px] p-0"
                >
                  <div class="flex h-full items-center gap-1">
                    <svg
                      width="21"
                      height="22"
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_1933_115203)">
                        <path
                          d="M8.43623 13.4108C8.88527 13.4108 9.10979 13.8017 9.10979 14.5836C9.10979 14.9575 8.96011 15.2974 8.66075 15.6034C7.41342 16.9632 5.85841 17.6431 3.99573 17.6431C3.64648 17.6431 3.38869 17.5156 3.22238 17.2606C2.77334 16.5127 2.54882 15.6119 2.54882 14.5581C2.54882 13.4873 2.62367 12.8074 2.77335 12.5184C2.93966 12.2125 3.09765 11.983 3.24733 11.83C4.52793 10.5722 5.59232 9.34844 6.4405 8.15864C7.30532 6.95184 7.99551 5.63456 8.51107 4.2068C8.5776 4.05383 8.61086 3.89235 8.61086 3.72238C8.61086 3.53541 8.59423 3.38244 8.56097 3.26346C8.52771 3.14448 8.46118 3.05099 8.36139 2.983C8.27824 2.89802 8.2034 2.83003 8.13688 2.77904C8.07035 2.72805 7.96225 2.68555 7.81257 2.65156C7.67952 2.61756 7.57973 2.59207 7.51321 2.57507C6.98101 2.52408 6.52366 2.49858 6.14114 2.49858C5.75863 2.49858 5.51748 2.70255 5.41769 3.11048C5.18485 4.14731 4.6194 5.01416 3.72132 5.71105C3.47185 5.89802 3.24733 5.9915 3.04776 5.9915C2.71514 5.9915 2.45735 5.68555 2.27441 5.07365C2.09147 4.44476 2 3.90085 2 3.44193C2 2.49008 2.60703 1.63173 3.8211 0.866855C3.78784 0.594901 3.871 0.458924 4.07057 0.458924C4.13709 0.458924 4.22025 0.492918 4.32004 0.560907C5.15159 0.186969 5.89167 0 6.54029 0C7.1889 0 7.80425 0.246459 8.38634 0.739376C8.50276 0.841359 8.67738 0.994334 8.91022 1.1983C9.15969 1.38527 9.40084 1.58923 9.63368 1.8102C9.86651 2.01416 10.0827 2.3881 10.2823 2.93201C10.4819 3.47592 10.5816 4.07932 10.5816 4.74221C10.5816 5.4051 10.3322 6.29745 9.83325 7.41926C8.91854 9.47592 7.7211 11.3541 6.24093 13.0538C6.12451 13.2408 6.0663 13.3428 6.0663 13.3598C6.0663 13.4788 6.36566 13.5382 6.96438 13.5382L8.43623 13.4108Z"
                          fill="#A2A5C6"
                        />
                        <path
                          d="M19 6.62889C18.9834 6.86686 18.8836 7.1728 18.7006 7.54674C17.7859 9.21246 16.6633 11.0227 15.3328 12.9773C16.3141 15.4079 16.8047 16.8442 16.8047 17.2861C16.8047 17.4731 16.7548 17.6431 16.655 17.796C16.5552 17.932 16.4222 18 16.2559 18C16.1062 18 15.9731 17.9405 15.8567 17.8215C15.2414 17.2096 14.5844 16.3003 13.8859 15.0935C13.8527 15.1445 13.7612 15.272 13.6115 15.4759C13.4618 15.6799 13.3704 15.8159 13.3371 15.8839C13.3038 15.9518 13.2456 16.0708 13.1625 16.2408C13.0461 16.4448 12.9629 16.7677 12.913 17.2096C12.8798 17.6346 12.7717 17.847 12.5887 17.847C12.4058 17.847 12.0731 17.6091 11.5908 17.1331C11.1252 16.6402 10.8923 16.1388 10.8923 15.6289C10.8923 14.864 11.4162 13.7252 12.464 12.2125C11.4162 9.5949 10.8923 8.18414 10.8923 7.98017C10.8923 7.75921 10.9672 7.49575 11.1169 7.1898C11.2665 6.88385 11.4328 6.73088 11.6158 6.73088C11.7987 6.73088 12.1896 7.1983 12.7883 8.13314C13.387 9.06799 13.8028 9.77337 14.0356 10.2493C14.5013 9.73938 15.3495 8.88952 16.5802 7.69972C17.8275 6.49292 18.551 5.88952 18.7505 5.88952C18.9168 5.88952 19 6.06799 19 6.42493V6.62889Z"
                          fill="#A2A5C6"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_1933_115203"
                          x="0"
                          y="0"
                          width="21"
                          height="22"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2" />
                          <feGaussianBlur stdDeviation="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1933_115203"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1933_115203"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                    <div class="text-[#A2A5C6] font-semibold">Double Down</div>
                  </div>
                </GrayGradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WinningsModal;
