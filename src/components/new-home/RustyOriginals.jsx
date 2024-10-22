import { For } from "solid-js";
import BattleIcon from "../icons/BattleIcon";
import CaseBattles from "../../assets/video/CaseBattles.webm";
import Coinflip from "../../assets/video/Coinflip.webm";
import WheelPlh from "../../assets/img/home/wheelPlaceholder.png";
import Upgrader from "../../assets/video/Upgrader_1.webm";
import Mines from "../../assets/video/Mines_1.webm";
import CaseOpening from "../../assets/video/CaseOpening_1.webm";
import Plinko from "../../assets/video/Plinko_1_1.webm";
import PVPMines from "../../assets/video/VS_1.webm";
import PVPMinesIcon from "../icons/PVPMinesIcon";
import CoinflipIcon from "../icons/CoinflipIcon";
import UpgraderIcon from "../icons/UpgraderIcon";
import WheelIcon from "../icons/WheelIcon";
import CaseOpeningIcon from "../icons/CaseOpeningIcon";
import MinesIcon from "../icons/MinesIcon";
import PlinkoIcon from "../icons/PlinkoIcon";
import { URL } from "../../libraries/url";
import { NavLink } from "solid-app-router";
import { gsap } from "gsap";

const gameModes = [
  {
    name: "Case Battles",
    video: CaseBattles,
    icon: <BattleIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.CASE_BATTLES,
  },
  {
    name: "Coinflip",
    video: Coinflip,
    icon: <CoinflipIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.COINFLIP,
  },
  {
    name: "Wheel",
    image: WheelPlh,
    disabled: true,
    icon: <WheelIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.WHEEL,
  },
  {
    name: "Upgrader",
    video: Upgrader,
    icon: <UpgraderIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.UPGRADER,
  },
  {
    name: "Mines",
    video: Mines,
    icon: <MinesIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.MINES,
  },
  {
    name: "Cases",
    video: CaseOpening,
    icon: <CaseOpeningIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.UNBOXING,
  },
  {
    name: "Plinko",
    video: Plinko,
    disabled: true,
    icon: <PlinkoIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.PLINKO,
  },
  {
    name: "PVP Mines",
    video: PVPMines,
    icon: <PVPMinesIcon additionClasses="w-5 h-5 text-gray-55" />,
    url: URL.GAMEMODES.PVP_MINES,
  },
];

export const TilesLabel = (props) => {
  return (
    <div class="absolute top-0 left-0 px-4 h-10 center shadow-button home-tile-label">
      {props.children}
    </div>
  );
};

const RustyOriginals = () => {
  return (
    <div class="max-w-[1152px] w-full mx-auto">
      <div class=" flex flex-col gap-1 center text-sm font-SpaceGrotesk text-white font-medium mb-6">
        <h2 class="font-bold text-2xl gold-text-originals">
          {" "}
          RustyLoot Originals
        </h2>
        <span class="">Try out our fun & immersive gamemodes!</span>
      </div>
      <div class="grid grid-cols-12 lg:grid-cols-home-original gap-x-4 gap-y-4 lg:gap-x-6 lg:gap-y-8 w-full">
        <For each={[...gameModes].slice(0, 3)}>
          {(mode) => (
            <div
              class={`col-span-full lg:col-span-5 home-originals overflow-hidden ${
                mode.disabled ? "mix-blend-luminosity" : ""
              }`}
            >
              <NavLink class="relative" href={!mode.disabled ? mode.url : ""}>
                {mode.disabled ? (
                  <div class="absolute left-0 top-0 w-full h-full backdrop-blur-md center text-32 font-SpaceGrotesk font-bold">
                    <span class="comming-soon-text-gradient text-center leading-8">
                      COMING
                      <br />
                      SOON
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {mode.video ? (
                  <video
                    src={mode.video}
                    alt="rotating dome"
                    class="w-full"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      gsap.to(e.target, {
                        duration: e.target.currentTime,
                        currentTime: 0,
                      });
                    }}
                    playsinline
                    muted
                  />
                ) : (
                  ""
                )}
                {mode.image ? (
                  <img src={mode.image} alt="rotating dome" class="w-full" />
                ) : (
                  ""
                )}
                <TilesLabel>
                  <div class="flex items-center gap-2 text-gray-9a font-SpaceGrotesk font-bold text-16">
                    {mode.icon}
                    <span>{mode.name}</span>
                  </div>
                </TilesLabel>
              </NavLink>
            </div>
          )}
        </For>
        <For each={[...gameModes].slice(3)}>
          {(mode) => (
            <div
              class={`col-span-6 lg:col-span-3 home-originals-secondary lg:h-[272px] w-full overflow-hidden relative ${
                mode.disabled ? "mix-blend-luminosity" : ""
              }`}
            >
              <NavLink class="relative" href={!mode.disabled ? mode.url : ""}>
                {mode.disabled ? (
                  <div class="absolute left-0 top-0 w-full h-full backdrop-blur-md center text-32 font-SpaceGrotesk font-bold">
                    <span class="comming-soon-text-gradient text-center leading-8">
                      COMING
                      <br />
                      SOON
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <video
                  src={mode.video}
                  alt="rotating dome"
                  class="min-w-full min-h-full"
                  onMouseEnter={(e) => {
                    if (!mode.disabled) e.target.play();
                  }}
                  onMouseLeave={(e) => {
                    if (!mode.disabled) {
                      e.target.pause();
                      gsap.to(e.target, {
                        duration: e.target.currentTime,
                        currentTime: 0,
                      });
                    }
                  }}
                  playsinline
                  muted
                />
                <TilesLabel>
                  <div class="flex items-center gap-2 text-gray-9a font-SpaceGrotesk font-bold text-16">
                    {mode.icon}
                    <span>{mode.name}</span>
                  </div>
                </TilesLabel>
              </NavLink>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
export default RustyOriginals;
