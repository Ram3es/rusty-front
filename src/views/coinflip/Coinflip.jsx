import { NavLink } from 'solid-app-router'
import { onMount, createEffect, createSignal, For } from 'solid-js'
import { URL } from '../../libraries/url'
import Coin from '../../utilities/Coin'

import Bg from '../../assets/img/coinflip/coinflip-background.png'
import RedCoin from '../../assets/img/coinflip/redcoin.svg'
import BlackCoin from '../../assets/img/coinflip/blackcoin.svg'
import Brilliants from '../../assets/img/jackpot/brilliants.png'
import YellowButtonBg from '../../assets/img/animatedButtonBg.jpg'
import ItemMainBg from '../../assets/img/coinflip/smallRLBg.png'

import injector from '../../injector/injector'
import { createStore } from 'solid-js/store'
import CoinflipGame from './Game'
import { useI18n } from '../../i18n/context'
import gamesTotalVal from './CoinflipTotal'
import Fallback from '../Fallback'
import PageLoadState from '../../libraries/PageLoadState'
import Dropdown from '../../components/elements/Dropdown'
import BattleRoyaleIcon from '../../components/icons/BattleRoyaleIcon'
import CaseGradientButton from '../../components/elements/CaseGradientButton'
import CoinflipItem from './CoinflipItem'

const SORT_OPTIONS = ['ASC', 'DESC']

const Coinflip = ({ loaded }) => {
  const i18n = useI18n()

  const { socket, userObject } = injector

  const [games, setGames] = createStore({})
  const [history, setHistory] = createSignal([])

  const [sortBy, setSortBy] = createSignal(SORT_OPTIONS[0])

  const [historyRatio, setHistoryRatio] = createSignal(1)

  const [stats, setStats] = createSignal({
    value: 0,
    items: 0
  })
  const [setCountTotal] = gamesTotalVal
  const { coinflipPageLoaded, onCoinflipPageLoad } = PageLoadState

  createEffect(() => {
    if (loaded()) {
      socket.emit('coinflip:connect', {}, (data) => {
        if (!data.error) {
          setGames(data.data.games)
          setHistory(data.data.history)
        }

        onCoinflipPageLoad(true)
      })
    }
  })

  onMount(() => {
    socket.on('coinflip:history', (data) => {
      setHistory(data.history)
    })

    socket.on('coinflip:update', (data) => {
      if (data.id) {
        setGames(data.id, data.data)
      }
    })

    socket.on('coinflip:remove', (data) => {
      const gameId = data.gameId
      setGames((prev) => prev.id != gameId)
    })
  })

  createEffect(() => {
    if (history()?.length > 0) {
      const reds = history().filter((val) => val == '1')
      setHistoryRatio(Math.floor((reds?.length / history()?.length) * 100))
    }
  })

  createEffect(() => {
    if (games) {
      const totals = {
        value: 0,
        items: 0
      }

      for (const id in games) {
        totals.value += games[id].creator.value || 0
        totals.value += games[id].opponent.value || 0

        totals.items += games[id].creator?.items?.length || 0
        totals.items += games[id].opponent?.items?.length || 0
      }

      setStats(totals)
      setCountTotal(totals.value)
    }
  })

  return (
    <Fallback loaded={coinflipPageLoaded}>
      <div class='w-full h-full flex flex-col gap-10 relative pt-10 min-h-screen'>
        <div
          class='rounded-6 flex gap-2 md:gap-0 items-center justify-between py-4'
          style={{
            background:
              'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, #1A1C33 50.01%, rgba(25, 28, 53, 0) 98.24%)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <Dropdown
            label='Sort by Price:'
            activeName={sortBy()}
            itemsList={SORT_OPTIONS}
            submitItem={(direction) => setSortBy(direction)}
          />
          <div class='flex items-center gap-2'>
            <div class='relative flex items-center justify-center gap-2 py-2 px-3 z-20 rounded coinflip-statistic__gray'>
              <div
                class='absolute inset-0 z-0 bg-repeat m-1 p-1'
                style={{ 'background-image': `url('${ItemMainBg}')`, opacity: 0.02 }}
              />
              <img alt='red-coin' class='w-4 md:w-6 fourk:w-10' src={BlackCoin} />
              <p class='font-SpaceGrotesk font-bold text-14 xxl:text-16 text-white'>
                {100 - historyRatio()}%
              </p>
            </div>
            <div class='relative flex items-center justify-center gap-2 py-2 px-3 z-20 rounded coinflip-statistic__yellow'>
              <div
                class='absolute inset-0 z-0 bg-repeat m-1 p-1'
                style={{ 'background-image': `url('${ItemMainBg}')`, opacity: 0.02 }}
              />
              <img alt='red-coin' class='w-4 md:w-6 fourk:w-10' src={RedCoin} />
              <p class='font-SpaceGrotesk font-bold text-14 xxl:text-16 text-yellow-ffa'>
                {historyRatio()}%
              </p>
            </div>
          </div>
          <NavLink href={URL.GAMEMODES.COINFLIP_CREATE}>
            <CaseGradientButton callbackFn={() => {}}>
              <div class='center gap-2 text-yellow-ffb font-bold w-[100px] md:w-[157px]'>
                <BattleRoyaleIcon additionClasses='w-4' />
                <p class='font-SpaceGrotesk text-10 md:text-14 capitalize truncate'>{i18n.t('coinflip.Create coinflip')}</p>
              </div>
            </CaseGradientButton>
          </NavLink>
        </div>
        <div class='flex flex-col sm:flex-row justify-between items-center'>
          <div class='flex items-center gap-4 overflow-hidden relative w-full'>
            <p class='text-13 text-gray-a2 font-bold font-SpaceGrotesk hidden md:block w-full max-w-fit capitalize'>
              {i18n.t('recent flips')}
            </p>
            <div class='flex gap-3 overflow-hidden md:mr-3'>
              <For each={history()}>
                {(val) => (
                  <img alt='coin' class='w-6 fourk:w-10' src={val == 1 ? RedCoin : BlackCoin} />
                )}
              </For>
            </div>
          </div>
        </div>
        <div class='w-full relative flex flex-col gap-2'>
          <div class='grid grid-cols-[1fr_1fr] items-center text-gray-a2 font-bold font-SpaceGrotesk text-13'>
            <span class='md:hidden block'>Games</span>
            <div class='hidden md:grid grid-cols-[12rem_1fr] items-center'>
              <span>Players</span>
              <span class='hidden lg:block'>Items</span>
            </div>
            <div class='hidden md:grid grid-cols-[1fr_1fr] fourk:grid-cols-[1.5fr_1fr] place-items-end items-center'>
              <span class='col-san-2'>Amount</span>
              <span>Actions</span>
            </div>
          </div>
          <For
            each={Object.keys(games)?.sort((a, b) => {
              const calculations =
                -(
                  (games[a].status == 'open' ||
                  games[a].status == 'pending' ||
                  games[a].status == 'counting' ||
                  games[a].status == 'spining'
                    ? games[a].creator.id == userObject?.user?.id
                      ? 2
                      : 1
                    : 0) +
                  (1 - 1 / games[a].creator.value)
                ) +
                ((games[b].status == 'open' ||
                games[b].status == 'pending' ||
                games[b].status == 'counting' ||
                games[b].status == 'spining'
                  ? games[b].creator.id == userObject?.user?.id
                    ? 2
                    : 1
                  : 0) +
                  (1 - 1 / games[b].creator.value))
              return calculations
            })}
            fallback={
              <div class='center'>
                {' '}
                <p class='text-white uppercase'>{i18n.t('coinflip.No active games')}</p>{' '}
              </div>
            }
          >
            {(id, i) => <CoinflipItem game={games[id]} id={id} />}
          </For>
          {/* <For
            each={Object.keys(games)?.sort((a, b) => {
              const calculations =
                -(
                  (games[a].status == 'open' ||
                  games[a].status == 'pending' ||
                  games[a].status == 'counting' ||
                  games[a].status == 'spining'
                    ? games[a].creator.id == userObject?.user?.id
                      ? 2
                      : 1
                    : 0) +
                  (1 - 1 / games[a].creator.value)
                ) +
                ((games[b].status == 'open' ||
                games[b].status == 'pending' ||
                games[b].status == 'counting' ||
                games[b].status == 'spining'
                  ? games[b].creator.id == userObject?.user?.id
                    ? 2
                    : 1
                  : 0) +
                  (1 - 1 / games[b].creator.value))
              return calculations * (sortBy() === SORT_OPTIONS[0] ? -1 : 1)
            })}
            fallback={
              <div class='center'>
                {' '}
                <p class='text-white uppercase'>{i18n.t('coinflip.No active games')}</p>{' '}
              </div>
            }
          >
            {(id, i) => <CoinflipGame game={games[id]} id={id} i={i} />}
          </For> */}
        </div>
      </div>
    </Fallback>
  )
}

export default Coinflip
