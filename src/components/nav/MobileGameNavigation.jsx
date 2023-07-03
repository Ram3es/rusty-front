import { For } from "solid-js";
import { navigationGameModes } from "../../libraries/navigation";
import { NavLink } from "solid-app-router";
import { createSignal } from "solid-js";
import { useI18n } from "../../i18n/context";
import ModeMark from "../header/ModeMark";
import { URL } from "../../libraries/url";

const MobileGameNavigation = () => {
  const [currPath, setCurrPath] = createSignal(window.location.pathname);
  const i18n = useI18n();

  return (
    <div class="absolute left-0 top-full w-full h-[calc(100vh-69px-56px)] overflow-y-scroll subheader-nav">
      <div class="grid grid-cols-2 p-4 gap-4">
        <For each={navigationGameModes}>
          {(mode) => (
            <NavLink
              href={mode.disabled ? "" : mode.url}
              class="relative"
              onClick={() => {
                if (!mode.disabled) {
                  document.getElementById("scrollWrapper").scrollTop = 0;
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
    </div>
  );
};

export default MobileGameNavigation;
