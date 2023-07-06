import CaseBattlesStructure from "../components/modals/profile/structure/CaseBattles";
import CasesStructure from "../components/modals/profile/structure/Cases";
import CoinflipStructure from "../components/modals/profile/structure/Coinflip";
import CryptoStructure from "../components/modals/profile/structure/Crypto";
import FiatStructure from "../components/modals/profile/structure/Fiat";
import MinesStructure from "../components/modals/profile/structure/Mines";
import OldSeedsStructure from "../components/modals/profile/structure/OldSeeds";
import PlinkoStructure from "../components/modals/profile/structure/Plinko";
import PvpminesStructure from "../components/modals/profile/structure/Pvpmines";
import SkinsStructure from "../components/modals/profile/structure/Skins";
import UpgraderStructure from "../components/modals/profile/structure/Upgrader";
import WheelStructure from "../components/modals/profile/structure/Wheel";

export const ranksBorderColor = {
  default: "from-bronze-a1 to-bronze-5e",
  bronze: "from-bronze-e1 to-bronze-a1",
  silver: "from-silver-d9 to-silver-8a",
  gold1: "from-gold-ff to-gold-e3",
  gold2: "from-gold-ff to-gold-e3",
  gold3: "from-gold-ff to-gold-e3",
  platinum1: "from-platinum-c8 to-platinum-34",
  platinum2: "from-platinum-c8 to-platinum-34",
  platinum3: "from-platinum-c8 to-platinum-34",
  diamond: "from-diamond-ca to-diamond-64",
};

export const PROFILE_GAMES_STRUCTURE = {
  coinflip: {
    headings: ['Game ID', 'total', 'wager', 'winnings', 'chance', 'results', 'results'],
    structure: CoinflipStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_1fr_4.5rem_4.5rem_8rem_1fr]'
  },
  mines: {
    headings: ['Game ID', 'wager', 'winnings', 'multiplier', 'mines', 'result'],
    structure: MinesStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_8rem_8rem_8rem_1fr]'
  },
  plinko: {
    headings: ['Game ID', 'wager', 'winnings', 'difficulty', 'rows', 'multiplier'],
    structure: PlinkoStructure,
    grid: 'grid-cols-[8rem_1.7fr_1.7fr_1fr_1fr_1fr_2fr]'
  },
  wheel: {
    headings: ['Game ID', 'wager', 'winnings', 'multiplier', 'result'],
    structure: WheelStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_1fr_1fr_1.5fr]'
  },
  'pvp-mines': {
    headings: ['Game ID', 'wager', 'winnings', 'players', 'mode', 'result'],
    structure: PvpminesStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_1fr_1fr_1fr_1.5fr]'
  },
  upgrader: {
    headings: ['Game ID', 'wager', 'winnings', 'multiplier', 'chance', 'result', 'status'],
    structure: UpgraderStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_8rem_8rem_8rem_8rem_1fr]'
  },
  'case-battles': {
    headings: ['Game ID', 'cost', 'winnings', 'setup', 'mode', 'result', 'borrowed money'],
    structure: CaseBattlesStructure,
    grid: 'grid-cols-2 grid-rows-4 gap-y-4 lg:gap-0 lg:grid-rows-none lg:grid-cols-[8rem_1fr_1fr_1fr_1fr_5rem_8rem_1fr]'
  },
  cases: {
    headings: ['Game ID', 'cost', 'winnings', 'case', 'result', 'drop'],
    structure: CasesStructure,
    grid: 'grid-cols-[8rem_1fr_1fr_1.5fr_2fr_1.5fr_1.5fr]'
  }
}

export const PROFILE_TRANSACTION_STRUCTURE = {
  skins: {
    headings: ['type', 'Transaction ID', 'amount', 'status'],
    structure: SkinsStructure,
    grid: 'grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr]'
  },
  crypto: {
    headings: ['type', 'amount', 'Transaction ID'],
    structure: CryptoStructure,
    grid: 'grid-cols-[2fr_1fr_2fr_1fr]'
  },
  fiat: {
    headings: ['type', 'Transaction ID', 'amount', 'status'],
    structure: FiatStructure,
    grid: 'grid-cols-[2fr_1fr_1fr_1fr_1.5fr]'
  }
}

export const PROFILE_SEEDS_STRUCTURE = {
  oldSeeds: {
    headings: ['old seeds'],
    structure: OldSeedsStructure,
    grid: 'grid-cols-[4fr_1fr]'
  }
}

export const CB_GROUP_VARIANTS = [
  {
    qty: 2,
    mode: "group",
    team: 0
  },
  {
    qty: 3,
    mode: "group",
    team: 0
  },
  {
    qty: 4,
    mode: "group",
    team: 0
  },
]

export const CB_CURSED_VARIANTS = [
  {
    qty: 2,
    mode: "cursed",
    team: 0
  },
  {
    qty: 4,
    mode: "cursed",
    team: 1
  },
  {
    qty: 3,
    mode: "cursed",
    team: 0
  },
  {
    qty: 4,
    mode: "cursed",
    team: 0
  },
]

export const CB_ROYAL_VARIANTS = [
  {
    qty: 2,
    mode: "royal",
    team: 0
  },
  {
    qty: 4,
    mode: "royal",
    team: 1
  },
  {
    qty: 3,
    mode: "royal",
    team: 0
  },
  {
    qty: 4,
    mode: "royal",
    team: 0
  },
]

export const CB_BATTLE_VARIANTS = ['royal','cursed', 'group']

export const BASE_RANKS = [
  'default',
  'bronze',
  'silver',
  'gold1',
  'gold2',
  'gold3',
  'platinum1',
  'platinum2',
  'platinum3',
  'diamond',
  'staff'
]