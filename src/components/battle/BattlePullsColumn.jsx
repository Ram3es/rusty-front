import { For, onCleanup, createEffect, Match } from 'solid-js'
import UserGameAvatar from './UserGameAvatar'
import GrayGradientButton from '../elements/GrayGradientButton'
import EmojiIcon from '../icons/EmojiIcon'
import Coin from '../../utilities/Coin'
import ItemPlaceholder from '../../assets/img/case/ItemPlaceholder.png'
import injector from '../../injector/injector'
import {
  getColorByPrice,
  getCountDuration,
  getGradientForWinners,
  getModeColorByName,
  getModeRgbByTextColor,
  isWinner
} from '../../utilities/caseBattles-tools'
import { spinLists } from '../../views/caseBattles/GameCaseBattle'
import CaseGradientButton from '../../components/elements/CaseGradientButton'
import RankLabel from '../chat/RankLabel'
import Ranks from '../../utilities/Ranks'
import SmallItemCardNew from './SmallItemCardNew'
import { createSignal } from 'solid-js'
import { onMount } from 'solid-js'
import { useDebounce } from '../../utilities/hooks/debounce'
import { getWinnerValueById, isWinnerFromIndex } from './ResultsAnimation'
import CoinLogo from '../shared/CoinLogo'

const BattlePullsColumn = (props) => {
  const { userObject } = injector
  const [innerWidth, setInnerWidth] = createSignal(window.innerWidth)
  const [timings, setTimings] = createSignal({})
  const [totalTime, setTotalTime] = createSignal(0)

  const isEven = (number) => number % 2 === 0

  const handleChangeInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  }

  let winnerRef

  createEffect(() => {
    if (props.game().status === 'ended' && isWinner(props.game().winners, props.columnIndex())) {
      setTimeout(() => {
        winnerRef.style.background = `${getGradientForWinners(
          props.game().playersQty,
          props.game().winners,
          props.columnIndex()
        )}`
      }, totalTime() * 1000)
    }
  })

  onMount(() => {
    const countDuration = getCountDuration(props.game().cases.length)
    setTimings({
      countDuration: countDuration,
      countRisePause: 0.3,
      winnerRise: 0.3,
      riseExitPause: 0.5,
      countsExit: 0.5,
      exitTotalPause: 0,
      totalUnboxed: 1,
      individualWinnings: 0.5,
      exitIndividualPause: 0.4 + 0
    })

    if (props.noAnimation) {
      setTotalTime(0)
    } else {
      setTotalTime(
        timings().countDuration +
          timings().countRisePause +
          timings().winnerRise +
          timings().riseExitPause +
          timings().countsExit +
          timings().exitIndividualPause +
          timings().individualWinnings
      )
    }

    window.addEventListener('resize', useDebounce(handleChangeInnerWidth, 1000))
  })

  onCleanup(() => {
    window.removeEventListener('resize', useDebounce(handleChangeInnerWidth, 1000))
  })

  return (
    <div
      class="flex flex-col"
      classList={{
        'border-r border-black/10 lg:border-r-0':
          innerWidth() < 600 &&
          isEven(props.columnIndex()) &&
          !(props.columnIndex() + 1 === 3 && props.game().playersQty === 3),
        'border-r-0 lg:border-r border-black/10':
          innerWidth() >= 600 &&
          props.columnIndex() !== Array.from(Array(props.game().playersQty).keys()).at(-1)
      }}
    >
      <div
        class={`h-[80px] flex items-center justify-center relative z-[100]`}
        classList={{
          'rounded-tl-8 rounded-bl-8':
            (isEven(props.columnIndex()) && innerWidth() < 600) || props.columnIndex() === 0,
          'rounded-tr-8 rounded-br-8':
            (!isEven(props.columnIndex()) && innerWidth() < 600) ||
            props.columnIndex() === Array.from(Array(props.game().playersQty).keys()).at(-1),
          'rounded-8 lg:rounded-tl-0':
            props.columnIndex() + 1 === 3 && props.game().playersQty === 3 && innerWidth() < 600,
          'border border-black border-opacity-5': props.game().status !== 'ended'
        }}
        ref={winnerRef}
        style={{
          background: `${`radial-gradient(25% 50% at 50% 0%, rgba(${getModeRgbByTextColor(
            getModeColorByName(props.game().mode)
          )}, ${
            props.game().status === 'ended' ? '0' : '0.07'
          }) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`}`
        }}
      >
        {props.game().players[props.columnIndex() + 1] ? (
          <div
            class="flex h-full w-full flex-wrap items-center justify-center gap-[5px]"
            style={{
              animation: `${
                !isWinnerFromIndex(props.game().winners, props.columnIndex()) && 'loserOpacity'
              } ${totalTime()}s ease-in-out forwards`
            }}
          >
            <div class="w-max">
              <UserGameAvatar
                mode={
                  props.game()?.cursed === 1
                    ? 'cursed'
                    : props.game()?.mode === 'group' && props.game()?.cursed !== 1
                    ? 'group'
                    : 'royal'
                }
                isBot={
                  props.game().players[props.columnIndex() + 1] &&
                  !props.game().players[props.columnIndex() + 1]?.avatar
                }
                avatar={props.game().players[props.columnIndex() + 1]?.avatar}
                name={props.game().players[props.columnIndex() + 1]?.name}
              />
            </div>
            <div
              class="grid grid-cols-[1.5rem_1fr] lg:flex py-1 px-2 gap-x-1.5 text-sm font-bold max-w-[214px] whitespace-nowrap rounded-4"
              style={{
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
                'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
              }}
            >
              <Ranks
                width={5}
                staff={
                  props.game().players[props.columnIndex() + 1]?.avatar
                    ? props.game().players[props.columnIndex() + 1].rank || 0
                    : 7
                }
                rank={props.game().players[props.columnIndex() + 1].level?.league || 'bronze'}
              />
              <RankLabel
                staff={
                  props.game().players[props.columnIndex() + 1]?.avatar
                    ? props.game().players[props.columnIndex() + 1].rank || 0
                    : 7
                }
                rank={props.game().players[props.columnIndex() + 1].level?.league || 'bronze'}
              />
              <span class="col-start-2 lg:col-auto text-gray-9aa truncate max-w-[68px]">
                {props.game().players[props.columnIndex() + 1].username || 'Terry'}
              </span>
            </div>
            {isWinnerFromIndex(props.game().winners, props.columnIndex()) && (
              <div
                class="flex gap-1 items-center justify-center"
                style={{
                  animation: `${
                    isWinnerFromIndex(props.game().winners, props.columnIndex()) &&
                    'individualWinningsAmount'
                  } ${totalTime()}s ease-in-out forwards`
                }}
              >
                <CoinLogo h="15" />
                <span class="text-green-gradient text-18 font-SpaceGrotesk font-semibold">
                  {parseFloat(
                    getWinnerValueById(
                      props.game().winners,
                      props.game().players[props.columnIndex() + 1].id
                    )
                  ).toLocaleString('en-US')}
                  <span class="text-14">.00</span>
                </span>
              </div>
            )}
          </div>
        ) : props.game().owner === userObject.user.id && !spinLists()[props.columnIndex()] ? (
          <div class="w-full center">
            <div class="h-10">
              <GrayGradientButton callbackFn={props.handleCallBot}>
                <div class="text-gray-9a center gap-2 text-14 font-bold font-SpaceGrotesk">
                  <EmojiIcon />
                  <span>Call Bot</span>
                </div>
              </GrayGradientButton>
            </div>
          </div>
        ) : (
          <div class="w-full flex items-center justify-center">
            <CaseGradientButton callbackFn={props.handleJoinGame}>
              <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                <span class="w-max">Join</span>
                <Coin width="5" />
                <span class="text-gradient">
                  {props.game().fundBattle
                    ? props.game().totalValue -
                      (props.game().totalValue * (props.game().fundPercent / 100)).toFixed()
                    : props.game().totalValue}
                </span>
                {props.game().fundBattle ? (
                  <div
                    class={
                      'rounded-2 border border-[#0BBD52]/10 px-1 w-[29px] center text-green-3e font-Quicksand font-bold text-10'
                    }
                    style={{
                      background:
                        'linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)'
                    }}
                  >
                    -{props.game().fundPercent}%
                  </div>
                ) : (
                  ''
                )}
              </div>
            </CaseGradientButton>
          </div>
        )}
      </div>
      <div
        class="border border-black border-opacity-5 -mt-8 flex bg-dark-secondary border-r-0 z-[10]"
        classList={{
          'rounded-bl-8':
            (isEven(props.columnIndex()) && innerWidth() < 600) || props.columnIndex() === 0,
          'rounded-br-8':
            (!isEven(props.columnIndex()) && innerWidth() < 600) ||
            props.columnIndex() === Array.from(Array(props.game().playersQty).keys()).at(-1),
          'rounded-8':
            props.columnIndex() + 1 === 3 && props.game().playersQty === 3 && innerWidth() < 600
        }}
      >
        <div class="flex w-full px-3 py-3 pt-12">
          <div class="flex gap-3 flex-wrap justify-center w-full">
            <For each={Array.from(Array(props.game().cases.length).keys())}>
              {(round) => {
                console.log('round', round)
                return (
                  <div>
                    {props.playerRoundData()[props.columnIndex()][round] ? (
                      <SmallItemCardNew
                        item={props.playerRoundData()[props.columnIndex()][round]}
                        color={getColorByPrice(
                          props.playerRoundData()[props.columnIndex()][round].item_price
                        )}
                      />
                    ) : (
                      <img src={ItemPlaceholder} class="w-30 h-[7.5rem] center" />
                    )}
                  </div>
                )
              }}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattlePullsColumn
