import { For, createEffect, createSignal } from 'solid-js'
import BattleIcon from '../../icons/BattleIcon'
import CoinflipIcon from '../../icons/CoinflipIcon'
import UpgraderIcon from '../../icons/UpgraderIcon'
import WheelIcon from '../../icons/WheelIcon'
import MinesIcon from '../../icons/MinesIcon'
import PlinkoIcon from '../../icons/PlinkoIcon'
import CaseOpeningIcon from '../../icons/CaseOpeningIcon'
import PVPMinesIcon from '../../icons/PVPMinesIcon'
import { useI18n } from '../../../i18n/context'
import Bulk from './Feed/Bulk'

import CoinflipStructure from './structure/Coinflip'
import MinesStructure from './structure/Mines'
import PlinkoStructure from './structure/Plinko'
import WheelStructure from './structure/Wheel'
import PvpminesStructure from './structure/Pvpmines'
import UpgraderStructure from './structure/Upgrader'
import SkinsStructure from './structure/Skins'
import FiatStructure from './structure/Fiat'
import CryptoStructure from './structure/Crypto'
import RoundedButton from '../../elements/RoundedButton'
import TransparentButton from '../../elements/TransparentButton'
import CaseBattlesStructure from './structure/CaseBattles'
import CasesStructure from './structure/Cases'

const navigationGameModes = [
  {
    name: { en: 'Case Battles', es: 'case battles', ru: 'Битва кейсов' },
    value: 'case-battles',
    svg: <BattleIcon />
  },
  {
    name: { en: 'Coinflip', es: 'coinflip', ru: 'Коинфлип' },
    value: 'coinflip',
    svg: <CoinflipIcon />
  },
  {
    name: { en: 'Upgrader', es: 'upgrader', ru: 'Апгрейдер' },
    value: 'upgrader',
    svg: <UpgraderIcon />
  },
  {
    name: { en: 'Wheel', es: 'rueda', ru: 'колесо' },
    value: 'wheel',
    svg: <WheelIcon />
  },
  {
    name: { en: 'Mines', es: 'Minas', ru: 'Бомбы' },
    value: 'mines',
    svg: <MinesIcon />
  },
  {
    name: { en: 'Plinko', es: 'Plinko', ru: 'Плинко' },
    value: 'plinko',
    svg: <PlinkoIcon />
  },
  {
    name: { en: 'Cases', es: 'cases', ru: 'cases' },
    value: 'cases',
    svg: <CaseOpeningIcon />
  },
  {
    name: { en: 'PVP Mines', es: 'Minas PVP', ru: 'PVP Бомбы' },
    value: 'pvp-mines',
    svg: <PVPMinesIcon />
  }
]

const NewProfileGameHistory = (props) => {
  const size = 9

  const i18n = useI18n()

  const [currentTab, setCurrentTab] = createSignal(navigationGameModes[0].value)

  const [page, setCurrentPage] = createSignal(0)
  const [pages, setPages] = createSignal([1])

  const [currentTransaction, setCurrentTransaction] = createSignal('skins')

  const [descending, setDescending] = createSignal(true)

  const [loaded, setLoaded] = createSignal([])

  createEffect(() => {
    setLoaded(
      (
        (props.type == 'transaction'
          ? [...(props.account?.transactionHistory?.[currentTransaction()] || [])].sort(
              (a, b) => (new Date(b.timestamp) - new Date(a.timestamp)) * (descending() ? 1 : -1)
            )
          : props.type == 'oldSeeds'
          ? props.account?.oldSeeds
          : props.account?.history
              ?.filter((item) => item.mode === currentTab())
              .sort(
                (a, b) => (new Date(b.timestamp) - new Date(a.timestamp)) * (descending() ? 1 : -1)
              )) || []
      ).filter((row, key) => page() * size - size <= key && key <= page() * size - 1)
    )
  })

  createEffect(() => {
    let indices = []
    for (
      let i = 0;
      i <
      Math.ceil(
        (
          (props.type == 'transaction'
            ? props.account?.transactions?.transactions
            : props.type == 'oldSeeds'
            ? props.account?.oldSeeds
            : props.account?.history?.filter((item) => item.mode === currentTab())) || []
        ).length / size
      );
      i++
    ) {
      indices.push(i + 1)
    }
    setCurrentPage(1)
    setPages(indices)
  })

  const data = {
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
      grid: 'grid-cols-[8rem_1fr_1fr_1fr_1fr_5rem_8rem_1fr]'
    },
    'cases': {
      headings: ['Game ID', 'cost', 'winnings', 'case', 'result', 'drop'],
      structure: CasesStructure,
      grid: 'grid-cols-[8rem_1.3fr_1.3fr_1.3fr_1.3fr_1.7fr_2fr]'
    },
  }

  const transactionData = {
    skins: {
      headings: ['type', 'id', 'amount', 'status'],
      structure: SkinsStructure,
      grid: 'grid-cols-[2fr_1fr_1fr_1fr_1.5fr]'
    },
    fiat: {
      headings: ['type', 'order id', 'amount', 'status'],
      structure: FiatStructure,
      grid: 'grid-cols-[2fr_1fr_1fr_1fr_1.5fr]'
    },
    crypto: {
      headings: ['type', 'amount', 'txid'],
      structure: CryptoStructure,
      grid: 'grid-cols-[2fr_1fr_2fr_1.25fr]'
    }
  }

  return (
    <div class='flex flex-col gap-9'>
      <div class='flex gap-2 items-center capitalize flex-wrap pt-6'>
        <For each={navigationGameModes}>
          {(mode) => (
            <div
              class={`h-[42px] relative transition-colors rounded-4 transition-shadows duration-200 cursor-pointer group ${
                currentTab() === mode.value ? 'profile-game--item__yellow' : 'profile-game--item'
              }`}
              onClick={() => {
                setCurrentTab(mode.value)
              }}
            >
              <div class='px-3 py-2.5 flex gap-2 items-center relative h-full z-10'>
                <div
                  class={`${
                    currentTab() === mode.value ? 'text-yellow-ffb' : 'text-gray-55'
                  } group-hover:text-yellow-ffb`}
                >
                  {mode.svg}
                </div>
                <p
                  class={`text-14 font-bold font-SpaceGrotesk  ${
                    currentTab() === mode.value ? 'text-yellow-ffb' : 'text-gray-9b'
                  } group-hover:text-yellow-ffb`}
                >
                  {mode.name[i18n.language]}
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
      <Bulk
        descending={descending}
        setDescending={setDescending}
        loaded={loaded}
        data={
          props?.type === 'history' ? data[currentTab()] : transactionData[currentTransaction()]
        }
        resendTrades={props.account?.resendTrades}
      />
      <div class='flex gap-2 items-center justify-center w-full'>
        <RoundedButton
          onClick={() => {
            if (page() - 1 >= 1) setCurrentPage(page() - 1)
          }}
        >
          <svg
            width='9'
            height='15'
            viewBox='0 0 9 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M1.41421 5.65683L0 7.07104L1.41421 8.48526L7.07107 14.1421L8.48528 12.7279L2.82843 7.07104L8.48528 1.41419L7.07107 -2.2769e-05L1.41421 5.65683Z'
              fill='#9A9EC8'
            />
          </svg>
        </RoundedButton>
        <For each={pages()}>
          {(nr) => (
            <TransparentButton
              callbackFn={() => setCurrentPage(nr)}
              isActive={page() == nr}
              style={{
                padding: '0px',
                width: '40px',
                height: '40px'
              }}
            >
              {nr}
            </TransparentButton>
          )}
        </For>
        <RoundedButton
          onClick={() => {
            if (pages().length >= page() + 1) {
              setCurrentPage(page() + 1)
            }
          }}
        >
          <svg
            class='rotate-180 translate-x-0.5'
            width='9'
            height='15'
            viewBox='0 0 9 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M1.41421 5.65683L0 7.07104L1.41421 8.48526L7.07107 14.1421L8.48528 12.7279L2.82843 7.07104L8.48528 1.41419L7.07107 -2.2769e-05L1.41421 5.65683Z'
              fill='#9A9EC8'
            />
          </svg>
        </RoundedButton>
        {/* <div
          class={`bg-dark-20 text-gray-47 w-7 h-7 ${
            pages().length > 5 && page() < pages().length - 3 ? 'center' : 'hidden'
          } cursor-pointer`}
        >
          <p class='text-current text-14 font-bold font-SpaceGrotesk'>...</p>
        </div> */}
      </div>
    </div>
  )
}

export default NewProfileGameHistory
