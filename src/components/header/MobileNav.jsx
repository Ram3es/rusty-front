import { NavLink } from "solid-app-router";
import { For, createMemo, createSignal } from "solid-js";
import { navigationGameModes } from "../../libraries/navigation";
import { SOCIAL, URL } from "../../libraries/url";
import isMenuActive from "./IsMenuActive.jsx";
import { useI18n } from "../../i18n/context";
import MailIcon from "../icons/MailIcon";

const MobileNav = (props) => {
  const i18n = useI18n();
  const [active, setActive] = isMenuActive;
  const [isNotificationModalOpen, setNotificationModalOpen] =
    createSignal(false);
  const togglesMobile = createMemo(() => [
    { name: "profile", url: `${props.pathname()}?profile=true`, isLight: true },
    { name: "FREE COINS", url: "/?free=true", isLight: true },
    { name: "REWARDS", url: URL.REWARDS, isLight: true },
    { name: "LEADERBOARD", url: URL.LEADERBOARD },
    { name: "SUPPORT", url: SOCIAL.DISCORD },
    { name: "inbox", isInboxLink: true },
    { name: "LOG OUT", url: URL.SIGNOUT },
  ]);

  return (
    <>
      <div
        class={`absolute ${
          active() && !isNotificationModalOpen() ? "flex" : "hidden"
        } lg:hidden flex-col left-0 top-full w-full h-[calc(100vh-55px)] bg-dark-13 overflow-y-scroll`}
      >
        <For each={navigationGameModes}>
          {(mode) =>
            mode.url ? (
              <NavLink
                href={`${mode.url}`}
                class={`w-full h-auto relative transition-all border-b border-dark-171 duration-200 text-gray-9b flex justify-start items-center gap-2 cursor-pointer group px-6 py-4`}
                onClick={() => {
                  document.getElementById("scrollWrapper").scrollTop = 0;
                  setActive(false);
                }}
              >
                <div class={`text-gray-9b group-hover:text-yellow-ff`}>
                  <div class="hidden group-hover:block">{mode.svgActive}</div>
                  <div class="block group-hover:hidden">{mode.svg}</div>
                </div>
                <p class="text-16 text-current font-medium uppercase font-Oswald truncate group-hover:text-yellow-ff">
                  {mode.name[i18n.language]}
                </p>
                {mode.isNew ? (
                  <span class="absolute left-9 top-3 text-8 text-white font-Oswald px-sm bg-red-ff rounded-1">
                    {i18n.t("home.new")}
                  </span>
                ) : mode.isHot ? (
                  <span class="absolute left-9 top-3 text-8 text-white font-Oswald px-1 bg-red-ff rounded-1">
                    HOT
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            ) : (
              <div class="w-full h-20 px-2 md:px-4 transition-all duration-200 text-gray-66 pb-2 lg:pb-0 flex justify-end lg:justify-center items-center flex-col gap-3 cursor-pointer">
                <div class="text-gray-4d">{mode.svg}</div>
                <p class="text-14 text-current font-medium uppercase font-Oswald truncate">
                  {mode?.name?.[i18n?.language || "en"]}
                </p>
              </div>
            )
          }
        </For>
        <For each={togglesMobile()}>
          {(link) =>
            link.url ? (
              <NavLink
                href={`${link.url}`}
                class={`w-full ${
                  link.isLight ? "bg-dark-1b1" : ""
                } h-auto relative transition-all border-b border-dark-171 duration-200 text-gray-9b flex justify-start items-center gap-2 cursor-pointer group px-6 py-4`}
                onClick={() => {
                  document.getElementById("scrollWrapper").scrollTop = 0;
                  setActive(false);
                }}
              >
                <p class="text-16 text-current font-medium uppercase font-Oswald truncate group-hover:text-yellow-ff">
                  {link.name}
                </p>
              </NavLink>
            ) : (
              // <div
              //   class={`w-full h-auto relative transition-all border-b border-dark-171 duration-200 text-gray-9b flex justify-between items-center gap-2 cursor-pointer group px-6 py-4`}
              //   onClick={() => setNotificationModalOpen(prev => !prev)}
              // >
              //   {(link.svgActive || link.svg) && <div class={`text-gray-9b group-hover:text-yellow-ff`}>
              //     <div class="hidden group-hover:block">{link.svgActive}</div>
              //     <div class="block group-hover:hidden">{link.svg}</div>
              //   </div>}
              //   <p class="text-16 text-current font-medium uppercase font-Oswald truncate group-hover:text-yellow-ff">
              //     {link.name}
              //   </p>
              //   <div class="relative w-10 h-10 center rounded-8 bg-dark-21">
              //     <span class="absolute z-10 right-1 top-1 bg-yellow-ff w-3 h-3 flex justify-center items-center rounded-full text-dark-1b1 font-Lato font-extrabold text-10">
              //       {props.notifications.length}
              //     </span>
              //     <span class="z-30 w-10 h-10 flex justify-center items-center cursor-pointer">
              //       <MailIcon />
              //     </span>
              //   </div>
              // </div>
              ""
              )
          }
        </For>
      </div>
      <div
        class={`absolute ${
          active() && isNotificationModalOpen() ? "flex" : "hidden"
        } lg:hidden flex-col left-0 top-full w-full h-[calc(100vh-55px)] px-9 py-4 bg-dark-1b1 overflow-y-scroll`}
      >
        <div
          class="bg-dark-202 w-12 h-6 flex justify-center items-center mb-4 text-gray-9b font-Lato font-normal text-14"
          onClick={() => setNotificationModalOpen(prev => !prev)}
        >
          Back
        </div>
        <div class="flex gap-2 items-center mb-2">
          <MailIcon />
          <div class="text-gray-c6 text-14 font-Oswald uppercase font-medium">
            Notifications
            <span class="opacity-50">({props.notifications.length})</span>
          </div>
        </div>
        <div class="flex flex-col w-full gap-4">
          <For
            each={props.notifications}
            fallback={
              <div class="font-Lato text-14 text-gray-c6 flex justify-center items-center h-28">
                You have no messages :(
              </div>
            }
          >
            {(item, index) => {
              return (
                <div
                  class="p-4 w-full flex flex-col rounded-8 gap-2 text-gray-c6"
                  style={{ background: "rgba(83, 100, 174, 0.1)" }}
                >
                  <div class="flex justify-between">
                    <span class="text-14 font-Oswald uppercase font-medium">
                      {item.title}
                    </span>
                    <svg
                      class="cursor-pointer"
                      onClick={() => props.removeNotification(index())}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_195_48881)">
                        <path
                          d="M10.864 1.13607C10.4163 0.688369 9.69032 0.688369 9.24262 1.13607L6.35335 4.02525C6.15809 4.22051 5.84152 4.22051 5.64626 4.02525L2.75699 1.13607C2.30928 0.688369 1.58329 0.688369 1.13559 1.13607C0.687878 1.58376 0.687878 2.30973 1.13559 2.75743L4.02483 5.6466C4.2201 5.84186 4.2201 6.15845 4.02483 6.35372L1.13559 9.24289C0.687878 9.69058 0.687878 10.4166 1.13559 10.8643C1.42099 11.1497 1.81922 11.2534 2.18657 11.175C2.39558 11.1299 2.59469 11.0265 2.75699 10.8643L5.64626 7.97506C5.84152 7.77981 6.15809 7.77981 6.35335 7.97506L9.24262 10.8643C9.69032 11.3119 10.4163 11.3119 10.864 10.8643C11.3117 10.4166 11.3117 9.69058 10.864 9.24289L7.97478 6.35372C7.77951 6.15845 7.77951 5.84186 7.97478 5.6466L10.864 2.75743C11.0758 2.54565 11.187 2.27213 11.1985 1.99464C11.2116 1.68549 11.1 1.37199 10.864 1.13607Z"
                          fill="#9BA4D6"
                          fill-opacity="0.5"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_195_48881">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div class="font-Lato text-14">{item.message}</div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
