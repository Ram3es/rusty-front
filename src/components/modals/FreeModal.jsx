import { createEffect, createSignal } from "solid-js";
import injector from "../../injector/injector";
import { API, URL } from "../../libraries/url";
import Modal from "./Modal";
import { NavLink } from "solid-app-router";
import { useI18n } from "../../i18n/context";
import BgMainVector from "../../assets/img/coinflip/bgItemsRL.png";
import freeCoinceCasesBg from "../../assets/img/modals/freeCoinceCasesBg.png";
import TooltipIcon from "../icons/TooltipIcon";
import CloseButton from "../elements/CloseButton";
import FreeCasesSwiper from "../new-home/FreeCasesSwiper";

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
              <div class="flex flex-col bg-black/20 border border-black/10 rounded-4 px-4 py-3 font-SpaceGrotesk gap-2 relative z-10">
              <p class="text-yellow-ffb text-12">Creator Code Requirements</p>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-white/10 rounded-4" />
                <p class="text-gray-9a text-12">
                  You <span class="text-yellow-ffb">must</span> be at least <span className="text-white">level 5</span> on Steam
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-white/10 rounded-4" />
                <p class="text-gray-9a text-12">
                  You <span class="text-yellow-ffb">must</span> join our 
                  <a
                    class="text-white underline"
                    href="https://discord.com/invite/rustyloot"
                    target="_blank"
                  >
                    <svg class="inline-block mr-1" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.8593 0.837498C10.9531 0.44625 9.98409 0.161907 8.97102 0C8.84661 0.207559 8.70125 0.486731 8.60104 0.708811C7.52412 0.559371 6.45712 0.559371 5.40001 0.708811C5.29981 0.486731 5.15116 0.207559 5.02563 0C4.01147 0.161907 3.04136 0.447295 2.13511 0.83957C0.307208 3.38835 -0.188306 5.87382 0.0594514 8.324C1.27181 9.1594 2.44674 9.66689 3.60184 9.99897C3.88704 9.63678 4.1414 9.25177 4.36052 8.846C3.94319 8.69968 3.54347 8.51911 3.16579 8.30947C3.26599 8.24098 3.364 8.16937 3.45869 8.09568C5.76228 9.08988 8.26519 9.08988 10.5413 8.09568C10.6371 8.16937 10.7351 8.24098 10.8342 8.30947C10.4554 8.52013 10.0546 8.7007 9.63723 8.84705C9.85635 9.25177 10.1096 9.63783 10.3959 10C11.5521 9.66792 12.7281 9.16045 13.9405 8.324C14.2312 5.48361 13.4439 3.02097 11.8593 0.837498ZM4.67435 6.81716C3.98284 6.81716 3.41574 6.22147 3.41574 5.49606C3.41574 4.77066 3.97073 4.17394 4.67435 4.17394C5.378 4.17394 5.94508 4.76962 5.93297 5.49606C5.93406 6.22147 5.378 6.81716 4.67435 6.81716ZM9.3256 6.81716C8.63408 6.81716 8.06699 6.22147 8.06699 5.49606C8.06699 4.77066 8.62195 4.17394 9.3256 4.17394C10.0292 4.17394 10.5963 4.76962 10.5842 5.49606C10.5842 6.22147 10.0292 6.81716 9.3256 6.81716Z" fill="white"/>
                    </svg>
                    Discord
                  </a>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-white/10 rounded-4" />
                <p class="text-gray-9a text-12">
                  You <span class="text-yellow-ffb">must</span> verify you joined our Discord{" "}
                  <a
                    class="text-white underline"
                    href={API + "/discord"}
                    target="_blank"
                  >
                    here
                  </a>{" "}
                </p>
              </div>
            </div>
              <div class="w-full flex flex-col gap-2">
                <p class="text-14 text-gray-9a font-normal font-SpaceGrotesk sentence">
                  {i18n.t("free_coins.Flash code")}
                </p>
                <div
                  class="w-full max-w-md p-[2px] rounded-[4px] h-11"
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
                        class={`text-white grow text-14 font-SpaceGrotesk sm:w-44`}
                        placeholder="Enter flash code..."
                        onInput={(e) => setFlashCode(e.currentTarget.value)}
                        value={flashCode()}
                      />
                      <div
                        class="px-3 cursor-pointer center h-8 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk"
                        onClick={claimFlash}
                      >
                        {buttonName.claim[i18n.language]}
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-gray-9a text-12 font-SpaceGrotesk relative z-10">Flash Codes are always posted on our <a
                    class="text-white underline"
                    href="https://twitter.com/RustyLootgg"
                    target="_blank"
                  >
                    <svg class="inline-block mr-1" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6608 1.89661C12.18 1.58161 12.5708 1.09161 12.7575 0.508278C12.2616 0.794111 11.725 1.00411 11.165 1.11494C10.3833 0.292445 9.15248 0.088278 8.15498 0.624945C7.15165 1.15578 6.63832 2.29328 6.88915 3.39578C4.87082 3.29078 2.99832 2.33994 1.72665 0.780111C1.06165 1.92344 1.39998 3.38178 2.49665 4.12261C2.09415 4.10511 1.70915 4.00011 1.35915 3.80761C1.35915 3.81344 1.35915 3.82511 1.35915 3.83678C1.35915 5.02678 2.19915 6.05344 3.36582 6.28678C2.99248 6.38594 2.60748 6.39761 2.23415 6.32761C2.56082 7.34261 3.49998 8.04261 4.57273 8.06594C3.68023 8.76011 2.5894 9.13928 1.46357 9.13344C1.2594 9.13344 1.06107 9.12178 0.862732 9.09844C2.00607 9.83344 3.33607 10.2243 4.69523 10.2184C6.58523 10.2301 8.40523 9.48344 9.74107 8.14178C11.0769 6.80011 11.8236 4.98011 11.8119 3.09011C11.8119 2.97928 11.8061 2.86844 11.8002 2.76344C12.2902 2.40761 12.7102 1.97011 13.0486 1.46261C12.5877 1.66094 12.1036 1.79511 11.6077 1.85344L11.6608 1.89661Z" fill="white"/>
                    </svg>
                    Twitter
                  </a> & 
                <a
                    class="text-white underline"
                    href="https://discord.com/invite/rustyloot"
                    target="_blank"
                  >
                    <svg class="inline-block mr-1" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.8593 0.837498C10.9531 0.44625 9.98409 0.161907 8.97102 0C8.84661 0.207559 8.70125 0.486731 8.60104 0.708811C7.52412 0.559371 6.45712 0.559371 5.40001 0.708811C5.29981 0.486731 5.15116 0.207559 5.02563 0C4.01147 0.161907 3.04136 0.447295 2.13511 0.83957C0.307208 3.38835 -0.188306 5.87382 0.0594514 8.324C1.27181 9.1594 2.44674 9.66689 3.60184 9.99897C3.88704 9.63678 4.1414 9.25177 4.36052 8.846C3.94319 8.69968 3.54347 8.51911 3.16579 8.30947C3.26599 8.24098 3.364 8.16937 3.45869 8.09568C5.76228 9.08988 8.26519 9.08988 10.5413 8.09568C10.6371 8.16937 10.7351 8.24098 10.8342 8.30947C10.4554 8.52013 10.0546 8.7007 9.63723 8.84705C9.85635 9.25177 10.1096 9.63783 10.3959 10C11.5521 9.66792 12.7281 9.16045 13.9405 8.324C14.2312 5.48361 13.4439 3.02097 11.8593 0.837498ZM4.67435 6.81716C3.98284 6.81716 3.41574 6.22147 3.41574 5.49606C3.41574 4.77066 3.97073 4.17394 4.67435 4.17394C5.378 4.17394 5.94508 4.76962 5.93297 5.49606C5.93406 6.22147 5.378 6.81716 4.67435 6.81716ZM9.3256 6.81716C8.63408 6.81716 8.06699 6.22147 8.06699 5.49606C8.06699 4.77066 8.62195 4.17394 9.3256 4.17394C10.0292 4.17394 10.5963 4.76962 10.5842 5.49606C10.5842 6.22147 10.0292 6.81716 9.3256 6.81716Z" fill="white"/>
                    </svg>
                    Discord
                  </a></p>
              </div>
              <div
                class="relative z-10 center p-4 rounded-4 overflow-hidden"
                style={{
                  background: "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)"
                }}
              >
                <div
                  class="absolute inset-0 z-0 min-w-full min-h-full"
                  style={{
                    "background-image": `url('${freeCoinceCasesBg}')`
                  }}
                />
                <div class="min-h-[200px] relative grid min-w-[60%]">
                  <FreeCasesSwiper />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FreeModal;
