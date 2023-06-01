import { createMemo } from 'solid-js'

import Coin from '../../utilities/Coin'

import RustyLootLogoIcon from '../icons/RustyLootLogoIcon'

import LoseImg from '../../assets/img/loseItem.svg'
import WinImg from '../../assets/img/winItem.svg'

import ItemMainBg from '../../assets/img/case/recentDropItemVectorBg.png'

const skinStylesConfig = [
  {
    condition: 2000,
    shadowLogoColor: 'rgba(235, 172, 50, 0.16)',
    itemBg: 'bet-history--item__yellow',
    circleClass: 'recent-drops-item__circle--yellow',
    circleColor: 'border-yellow-ffb',
    grayscale: 0,
    opacity: 1
  },
  {
    condition: 1500,
    shadowLogoColor: 'rgba(255, 27, 27, 0.16)',
    itemBg: 'bet-history--item__red',
    circleClass: 'recent-drops-item__circle--red',
    circleColor: 'border-red-ff1',
    grayscale: 0,
    opacity: 1
  },
  {
    condition: 1000,
    shadowLogoColor: 'rgba(214, 48, 255, 0.16)',
    itemBg: 'bet-history--item__purple',
    circleClass: 'recent-drops-item__circle--purple',
    circleColor: 'border-purple-d6',
    grayscale: 0,
    opacity: 1
  },
  {
    condition: 500,
    shadowLogoColor: 'rgba(40, 152, 255, 0.16)',
    itemBg: 'bet-history--item__blue',
    circleClass: 'recent-drops-item__circle--blue',
    circleColor: 'border-blue-28',
    grayscale: 0,
    opacity: 1
  },
  {
    condition: 100,
    shadowLogoColor: 'rgba(198, 198, 198, 0.16)',
    itemBg: 'bet-history--item__gray',
    circleClass: 'recent-drops-item__circle--gray',
    circleColor: 'border-gray-c6c',
    grayscale: 0,
    opacity: 1
  },
  {
    condition: 0,
    shadowLogoColor: 'rgba(255, 27, 27, 0.16)',
    itemBg: 'bet-history--item__lose',
    circleClass: 'recent-drops-item__circle--red',
    circleColor: 'border-red-ff1',
    grayscale: 1,
    opacity: 0.4
  }
]

const BetHistoryItem = (props) => {
  const getCurrentStylesByPrice = (skinPrice) => {
    for (const config of skinStylesConfig) {
      if (skinPrice >= config.condition) {
        return {
          shadowLogoColor: config.shadowLogoColor,
          itemBg: config.itemBg,
          circleClass: config.circleClass,
          circleColor: config.circleColor,
          grayscale: config.grayscale,
          opacity: config.opacity
        }
      }
    }
  }

  const styles = createMemo(() => getCurrentStylesByPrice(props.bet.winnings))

  const isWinner = () => props.bet.winnings > 0

  return (
    <div
      class={`group min-w-[120px] min-h-[120px] z-10 rounded-4 relative cursor-pointer bet-history--item ${
        styles().itemBg
      } font-SpaceGrotesk`}
    >
      <div
        class={`${
          styles().opacity < 1 && 'opacity-40 group-hover:opacity-100'
        } rounded-4 absolute inset-0 z-10 pt-4 pb-2`}
      >
        <div
          class='hidden group-hover:block absolute inset-0 z-0 bg-repeat m-1 p-1'
          style={{ 'background-image': `url('${ItemMainBg}')`, opacity: 0.02 }}
        />
        <div class='flex flex-col justify-items-center gap-2'>
          <div class='group-hover:hidden flex items-center justify-center'>
            <div
              class='h-[60px] w-[60px] flex items-center justify-center'
              style={{
                filter: `drop-shadow(0px 0px 16px ${styles().shadowLogoColor})`
              }}
            >
              <RustyLootLogoIcon />
              {props.bet.winnings > 0 ? (
                <img
                  style={{
                    filter: 'drop-shadow(0px 0px 24px 0px #5096FF8F)'
                  }}
                  alt='item-image'
                  src={WinImg}
                  class='w-full h-full z-10'
                />
              ) : (
                <img alt='item-image' src={LoseImg} class='w-full h-full z-10' />
              )}
            </div>
          </div>
          <div class='group-hover:block group-hover:-mt-2 hidden mx-auto'>
            <div class={`p-3 rounded-full recent-drops-item__circle ${styles().circleClass}`}>
              <div class={`p-1.5 rounded-full recent-drops-item__circle ${styles().circleClass}`}>
                <div
                  class={`border ${
                    styles().circleColor
                  } rounded-full p-1 flex items-center justify-center w-9 h-9 grow`}
                >
                  <img class='rounded-full' src={props.bet.avatar} alt='steam-avatar' />
                </div>
              </div>
            </div>
          </div>
          <div
            class={`group-hover:hidden flex items-center justify-center ${
              styles().grayscale === 1 && 'grayscale'
            }`}
          >
            <div class='flex gap-1.5'>
              <Coin width='5' />
              <span class='font-bold text-sm potential-drop--price'>
                {isWinner() ? props.bet.winnings : -Math.abs(props.bet.bet)}
              </span>
            </div>
          </div>
          <div class='group-hover:block group-hover:-mt-4 hidden text-center font-bold mx-1'>
            <p class='text-white text-10'>Bettor:</p>
            <p class='text-gray-9aa text-sm'>{props.bet.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BetHistoryItem
