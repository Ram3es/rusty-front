import { createSignal, For } from "solid-js";
import Logo from "../../assets/logo.svg";
import { NavLink } from "solid-app-router";

import HeaderSettings from "./HeaderSettings";
import HeaderOptions from "./HeaderOptions";
import HeaderNotAuth from "./HeaderNotAuth";

import injector from "../../injector/injector";
import { SOCIAL, URL } from "../../libraries/url.jsx";
import HeaderToggle from "./HeaderToggle";
import { useI18n } from "../../i18n/context";
import isMenuActive from "./IsMenuActive.jsx";
import { navigationGameModes } from "../../libraries/navigation";


const Header = () => {
  const [setActive] = isMenuActive;
  const i18n = useI18n();
  
  return (
    <div
      class="w-full hidden lg:flex justify-center px-4 xl:px-8 bg-dark-13 relative z-40"
    >
      <div class="w-full py-2 flex justify-between items-center">
        <div class="hidden lg:flex justify-center items-center gap-6">
          <For each={navigationGameModes}>
            {(mode) =>
              mode.url ? (
                <NavLink
                  href={`${mode.url}`}
                  class={`w-full h-auto relative transition-all duration-200 text-gray-9b pb-0 flex justify-around lg:justify-center items-center gap-2 cursor-pointer group`}
                  onClick={() => {
                    document.getElementById("scrollWrapper").scrollTop = 0;
                    setActive(false);
                  }}
                >
                  <div
                    class={`text-gray-9b group-hover:text-yellow-ff`}
                  >
                    {/* <img src={props.pathname() == mode.url ? (
                      mode.svgActive || mode.svg
                    ) : mode.svg} /> */}
                    <div class="hidden group-hover:block">
                      {mode.svgActive}
                    </div>
                    <div class="block group-hover:hidden">{mode.svg}</div>
                  </div>
                  <p class="text-14 text-current font-medium uppercase font-Oswald truncate group-hover:text-yellow-ff">
                    {mode.name[i18n.language]}
                  </p>
                  {/* {mode.pot >= 0 ? (
                    <p
                      class={`${
                        props.pathname() == mode.url
                          ? "bg-yellow-ff text-black"
                          : "bg-gray-1c text-gray-8c"
                      } group-hover:text-black group-hover:bg-yellow-ff hidden sm:block text-10 py-1 text-center w-full`}
                    >
                      $ {Math.round(mode.pot)}
                    </p>
                  ) : (
                    ""
                  )} */}
                  {mode.isNew ? (
                    <span class="absolute left-3 -top-1 text-8 text-white font-Oswald px-sm bg-red-ff rounded-1">
                      {i18n.t("home.new")}
                    </span>
                  ) : mode.isHot ? (
                    <span class="absolute left-3 -top-1 text-8 text-white font-Oswald px-1 bg-red-ff rounded-1">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
