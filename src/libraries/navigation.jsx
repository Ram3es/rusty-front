import BattleIcon from "../components/icons/BattleIcon"
import BattleActiveIcon from "../components/icons/BattleActiveIcon";
import CoinflipIcon from "../components/icons/CoinflipIcon";
import CoinflipActiveIcon from "../components/icons/CoinflipActiveIcon";
import UpgraderIcon from "../components/icons/UpgraderIcon";
import UpgraderActiveIcon from "../components/icons/UpgraderActiveIcon";
import WheelIcon from "../components/icons/WheelIcon";
import WheelActiveIcon from "../components/icons/WheelActiveIcon";
import MinesIcon from "../components/icons/MinesIcon";
import MinesActiveIcon from "../components/icons/MinesActiveIcon";
import PlinkoIcon from "../components/icons/PlinkoIcon";
import PlinkoActiveIcon from "../components/icons/PlinkoActiveIcon";
import { URL } from "./url";

export const navigationGameModes = [
  {
    name: { en: "case battles", es: "case battles", ru: "case battles" },
    svg: <BattleIcon />,
    svgActive: <BattleActiveIcon />,
    url: URL.GAMEMODES.CASE_BATTLES,
    isNew: true,
  },
  {
    name: { en: "coinflip", es: "coinflip", ru: "Коинфлип" },
    svg: <CoinflipIcon />,
    svgActive: <CoinflipActiveIcon />,
    url: URL.GAMEMODES.COINFLIP,
    isHot: true
  },
  {
    name: { en: "upgrader", es: "upgrader", ru: "Апгрейдер" },
    svg: <UpgraderIcon />,
    svgActive: <UpgraderActiveIcon />,
    url: URL.GAMEMODES.UPGRADER,
    isHot: true
  },
  {
    name: { en: "wheel", es: "rueda", ru: "колесо" },
    svg: <WheelIcon />,
    svgActive: <WheelActiveIcon/>,
    url: URL.GAMEMODES.WHEEL,
  },
  {
    name: { en: "mines", es: "Minas", ru: "Бомбы" },
    svg: <MinesIcon />,
    svgActive: <MinesActiveIcon />,
    url: URL.GAMEMODES.MINES,
  },
  {
    name: { en: "plinko", es: "Plinko", ru: "Плинко" },
    svg: <PlinkoIcon />,
    svgActive: <PlinkoActiveIcon />,
    url: URL.GAMEMODES.PLINKO,
  },
  {
    name: { en: "cases", es: "cases", ru: "cases" },
    svg: <BattleIcon />,
    svgActive: <BattleActiveIcon />,
    url: URL.UNBOXING,
  },
  {
    name: { en: "pvp mines", es: "Minas PVP", ru: "PVP Бомбы" },
    svg: <MinesIcon />,
    svgActive: <MinesActiveIcon />,
    url: URL.GAMEMODES.PVP_MINES
  },
]