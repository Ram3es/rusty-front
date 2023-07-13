import { For } from 'solid-js'
import UserGameAvatar from './UserGameAvatar'
import GrayGradientButton from '../elements/GrayGradientButton'
import EmojiIcon from '../icons/EmojiIcon'
import Coin from '../../utilities/Coin'
import ItemPlaceholder from '../../assets/img/case/ItemPlaceholder.png'
import injector from '../../injector/injector'
import {
  getColorByPrice,
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

const BattlePullsColumn = (props) => {
  const { userObject } = injector

  const isEven = (number) => number % 2 === 0

  return (
    <div
      class="flex flex-col"
      classList={{
        'border-r-2 border-black/20':
          isEven(props.columnIndex()) && !(props.columnIndex() + 1 === props.game().playersQty)
      }}
    >
      <div
        class={`border h-[69px] border-black flex items-center justify-center border-opacity-5 relative z-10`}
        classList={{
          'rounded-tl-8 rounded-bl-8': isEven(props.columnIndex()),
          'rounded-tr-8 rounded-br-8': !isEven(props.columnIndex()),
          'rounded-8': props.columnIndex() + 1 === 3 && props.game().playersQty === 3
        }}
        style={{
          background: `radial-gradient(25% 50% at 50% 0%, rgba(${getModeRgbByTextColor(
            getModeColorByName(props.game().mode)
          )}, ${
            props.game().status === 'ended' ? 0 : '0.07'
          }) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
        }}
      >
        <div
          class={`absolute top-0 left-0  ${
            props.game().status !== 'ended' || isWinner(props.game().winners, props.columnIndex())
              ? `opacity-100 ${
                  props.columnIndex() === 0
                    ? 'rounded-l-8'
                    : props.columnIndex() ===
                      Array.from(Array(props.game().playersQty).keys()).at(-1)
                    ? 'rounded-r-8'
                    : ''
                }`
              : 'opacity-30'
          }`}
          style={{
            background: `${getGradientForWinners(
              props.game().playersQty,
              props.game().winners,
              props.columnIndex()
            )}`
          }}
        />
        {props.game().players[props.columnIndex() + 1] ? (
          <div class="flex h-full w-full items-center justify-center  gap-[5px]">
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
              class="grid grid-cols-[1.5rem_1fr] py-1 px-2 gap-x-1.5  text-sm font-bold max-w-[214px] whitespace-nowrap rounded-4"
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
              <span class="col-start-2 text-gray-9aa truncate max-w-[68px]">
                {props.game().players[props.columnIndex() + 1].username || 'Terry'}
              </span>
            </div>
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
        class="border border-black border-opacity-5 -mt-8 flex bg-dark-secondary border-r-0"
        classList={{
          'rounded-bl-8': isEven(props.columnIndex()),
          'rounded-br-8': !isEven(props.columnIndex()),
          'rounded-8': props.columnIndex() + 1 === 3 && props.game().playersQty === 3
        }}
      >
        <div class="flex w-full px-3 py-3 pt-12">
          <div class="flex gap-3 flex-wrap justify-center w-full">
            <For each={Array.from(Array(props.game().cases.length).keys())}>
              {(round) => (
                <div>
                  {props.playerRoundData()[props.columnIndex()][round] ? (
                    <SmallItemCardNew
                      item={props.playerRoundData()[props.columnIndex()][round]}
                      color={getColorByPrice(
                        props.playerRoundData()[props.columnIndex()][round].item_price
                      )}
                    />
                  ) : (
                    <>
                      <img src={ItemPlaceholder} class="w-30 h-[7.5rem] center" />
                    </>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattlePullsColumn
