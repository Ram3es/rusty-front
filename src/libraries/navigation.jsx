import BattleIcon from "../components/icons/BattleIcon";
import CaseOpeningIcon from "../components/icons/CaseOpeningIcon";
import CoinflipIcon from "../components/icons/CoinflipIcon";
import MinesIcon from "../components/icons/MinesIcon";
import PVPMinesIcon from "../components/icons/PVPMinesIcon";
import PlinkoIcon from "../components/icons/PlinkoIcon";
import UpgraderIcon from "../components/icons/UpgraderIcon";
import WheelIcon from "../components/icons/WheelIcon";
import {URL} from "./url";

export const navigationGameModes = [
  {
    name: {en: "Case Battles", es: "case battles", ru: "case battles"},
    svg: <BattleIcon />,
    url: URL.GAMEMODES.CASE_BATTLES,
    mark: "new",
  },
  {
    name: {en: "Coinflip", es: "coinflip", ru: "Коинфлип"},
    svg: <CoinflipIcon />,
    url: URL.GAMEMODES.COINFLIP,
    mark: "hot",
  },
  {
    name: {en: "Upgrader", es: "upgrader", ru: "Апгрейдер"},
    svg: <UpgraderIcon />,
    url: URL.GAMEMODES.UPGRADER,
    mark: "hot",
  },
  {
    name: {en: "Wheel", es: "rueda", ru: "колесо"},
    svg: <WheelIcon />,
    url: URL.GAMEMODES.WHEEL,
    mark: "soon",
    disabled: true,
  },
  {
    name: {en: "Mines", es: "Minas", ru: "Бомбы"},
    svg: <MinesIcon />,
    url: URL.GAMEMODES.MINES,
  },
  {
    name: {en: "Plinko", es: "Plinko", ru: "Плинко"},
    svg: <PlinkoIcon />,
    url: URL.GAMEMODES.PLINKO,
    mark: "soon",
    disabled: true,
  },
  {
    name: {en: "Cases", es: "cases", ru: "cases"},
    svg: <CaseOpeningIcon />,
    url: URL.UNBOXING,
  },
  {
    name: {en: "PVP Mines", es: "Minas PVP", ru: "PVP Бомбы"},
    svg: <PVPMinesIcon />,
    url: URL.GAMEMODES.PVP_MINES,
  },
];
