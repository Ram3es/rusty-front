import { For } from 'solid-js'
import { useI18n } from '../../../i18n/context'
import injector from '../../../injector/injector'
import Ranks from '../../../utilities/Ranks'
import RankLabel from '../../chat/RankLabel'

import affiliatesTotalDepositored from '../../../assets/img/affilates/affiliatesTotalDepositored.png'
import affiliatesTotalEarned from '../../../assets/img/affilates/affiliatesTotalEarned.png'
import Coin from '../../../utilities/Coin'

const stats = [
  {
    type: 'deposit',
    name: { en: 'total deposited', es: 'total depositado', ru: 'суммарный депозит' }
  },
  {
    type: 'withdraw',
    name: {
      en: 'total won',
      es: 'total ganado',
      ru: 'всего выиграно'
    }
  },
  {
    type: 'profit',
    name: { en: 'profit', es: 'beneficio', ru: 'заработано' }
  }
]

const ProfileAccount = (props) => {
  const i18n = useI18n()

  const { userObject } = injector

  return (
    <>
      <div class='flex flex-col items-center lg:pt-9 gap-2 lg:gap-6'>
        <div class='scale-[70%] lg:scale-100 flex items-center justify-center'>
          <svg
            width='135'
            height='5'
            viewBox='0 0 135 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M134.842 0.157898L0 2.56579L134.842 4.97369V0.157898Z'
              fill='url(#paint0_linear_2302_110488)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_2302_110488'
                x1='134.842'
                y1='2.56579'
                x2='-8.16264e-07'
                y2='2.56584'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#FFC467' />
                <stop offset='1' stop-color='#FFC467' stop-opacity='0' />
              </linearGradient>
            </defs>
          </svg>

          <div class='rounded-full border border-gold-ffc w-max p-[7.22px]'>
            <img
              class='w-[86.68px] rounded-full'
              src={userObject.user?.avatar || ''}
              alt='blue-box'
            />
          </div>
          <svg
            width='135'
            height='5'
            viewBox='0 0 135 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.157883 0.157898L135 2.56579L0.157883 4.97369V0.157898Z'
              fill='url(#paint0_linear_2302_110487)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_2302_110487'
                x1='0.157884'
                y1='2.56579'
                x2='135'
                y2='2.56584'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#FFC467' />
                <stop offset='1' stop-color='#FFC467' stop-opacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          class='flex items-center h-[26px] w-[214px] gap-2 text-14 font-bold rounded pl-2 pr-2.5 py-1 shadow-button'
          style={{
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
            'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
          }}
        >
          <Ranks width={7} staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
          <RankLabel staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
          <span class='text-gray-9aa truncate max-w-[116x]'>{userObject?.user?.username}</span>
        </div>
        <div class='flex flex-col items-center justify-center gap-[4px] lg:gap-3'>
          <div class='flex justify-center items-center relative h-8 w-[220px] md:w-[497px]'>
            <div class='w-[220px] md:w-[484px] h-2 rounded-[1px] overflow-hidden home-progress-bg'>
              <div
                class='h-full rounded-[1px] duration-200'
                style={{
                  background: 'linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)',
                  width: `${
                    (userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /
                    (userObject?.user?.level?.to * 10)
                  }%`
                }}
              />
            </div>
            <div class='absolute -left-2'>
              <Ranks width='8' rank={userObject?.user?.level?.league} />
            </div>
            <div class='absolute -right-2'>
              <Ranks width='8' rank={userObject?.user?.level?.next} />
            </div>
          </div>
          <div class='text-12 font-bold'>
            <span class='text-white'>
              {(
                (props.account?.user?.wagered - props.account?.level?.from * 1000) /
                  (props.account?.level?.to * 10) || 0
              ).toFixed(2)}
              %
            </span>{' '}
            <span class='text-gray-64'>Progress to</span>{' '}
            <RankLabel
              withOutShadow
              staff={userObject?.user?.rank}
              rank={userObject?.user?.level?.league}
            />
          </div>
        </div>
      </div>
      <div class='pt-[28px] lg:pt-[32px] w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]'>
        <For each={stats}>
          {(item) => (
            <div class='w-[244px] h-24 xll:h-24 flex justify-center items-center relative rounded-4 bg-dark-22'>
              <div
                class={`w-full h-full absolute left-0 top-0 rounded-4 backdrop-blur-sm ${
                  item.type === 'profit' ? 'green-borders' : ''
                }`}
                style={{
                  background:
                    item.type !== 'profit'
                      ? `url(${affiliatesTotalDepositored})`
                      : `url(${affiliatesTotalEarned})`
                }}
              />
              <div class='flex gap-1 relative'>
                <div class='flex flex-col gap-[10px]'>
                  <div class='center gap-[11.6px]'>
                    <Coin />
                    <p
                      class={`leading-none
                              ${
                                item.type === 'profit'
                                  ? 'text-20 text-gradient-green-secondary'
                                  : 'text-20 text-gradient'
                              }
                               font-SpaceGrotesk font-bold relative`}
                    >
                      {Number(
                        item.type === 'profit'
                          ? (props.account?.transactions?.withdraw || 0) -
                              (props.account?.transactions?.deposit || 0)
                          : props.account?.transactions?.[item.type] || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                  <p
                    class={`${
                      item.type === 'profit' ? 'text-gradient-green-secondary' : 'text-yellow-ffb'
                    } text-14 font-SpaceGrotesk sentence font-bold leading-none`}
                  >
                    {item?.name[i18n.language]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export default ProfileAccount
