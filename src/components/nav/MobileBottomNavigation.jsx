import { For } from "solid-js";
import headerLogoBgVector from "../../assets/img/header/headerLogoBgVector.png";
import CoinflipIcon from "../icons/CoinflipIcon";
import NotificationIcon from "../icons/NotificationIcon";
import ChatIcon from "../icons/ChatIcon";
import tabStore from "./MobileNavStore";

const navOptions = [
  {
    name: "games",
    SVG: <CoinflipIcon additionClasses="w-4 h-4" />,
  },
  {
    name: "notifications",
    SVG: <NotificationIcon />,
  },
  {
    name: "chat",
    SVG: <ChatIcon />,
  },
];

const MobileBottomNavigation = () => {
  const [currentNavTab, setCurrentNavTab] = tabStore;

  const handleTabNavigation = (tag) => {
    setCurrentNavTab((prev) => {
      if (prev === tag || tag === "notifications") {
        return "";
      }
      return tag;
    });
  };

  return (
      <div
        class="z-10 relative h-[69px] w-full lg:hidden"
        style={{
          background:
            "radial-gradient(120.67% 100.29% at 12.70% 107.20%, rgba(255, 178, 54, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(180deg, rgba(55, 57, 81, 0.00) 0%, rgba(55, 57, 81, 0.12) 100%), linear-gradient(135deg, rgba(28, 29, 51, 0.25) 0%, rgba(27, 29, 52, 0.25) 100%)",
        }}
      >
        <div
          class="flex absolute z-40 h-full inset-0"
          style={{
            "background-image": `url('${headerLogoBgVector}')`,
          }}
        />
        <div class="w-full h-full absolute z-40 bottom-0 grid grid-cols-3 items-center">
          <For each={navOptions}>
            {(option) => (
              <div
                class="flex items-center justify-center flex-col gap-[3px]"
                classList={{
                  "text-white": currentNavTab() === option.name,
                  "text-gray-6a": currentNavTab() !== option.name,
                }}
                onClick={() => handleTabNavigation(option.name)}
              >
                {option.SVG}
                <span class="text-13 font-bold font-SpaceGrotesk capitalize">
                  {option.name}
                </span>
              </div>
            )}
          </For>
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
      </div>
  );
};

export default MobileBottomNavigation;
