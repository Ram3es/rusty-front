import { createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { NavLink } from 'solid-app-router'

import { URL } from '../../libraries/url'
import { BASE_RANKS } from '../../libraries/constants'

import { convertRomanToNormal } from '../../utilities/Numbers'

import rlBackgroundCardVector from '../../assets/img/rewards/rlBackgroundCardVector.png'
import {
  calculateRemainingTime,
  getAvailableCases,
  getConfigByCaseName,
  getIndexRank,
  getNotAvailableCases
} from '../../utilities/rewards-tools'
import DiscordIcon from '../../components/icons/DiscordIcon'

const STYLES_CONFIG = {
  'daily free case': {
    borderColor: 'border-gray-9a/25',
    textColor: 'text-gray-9a'
  },
  bronze: {
    borderColor: 'border-bronze-ffa/25',
    textColor: 'text-bronze-ffa'
  },
  silver: {
    borderColor: 'border-silver-ce/25',
    textColor: 'text-silver-ce'
  },
  gold1: {
    borderColor: 'border-gold-e6/25',
    textColor: 'text-gold-e6'
  },
  gold2: {
    borderColor: 'border-gold-e6/25',
    textColor: 'text-gold-e6'
  },
  gold3: {
    borderColor: 'border-gold-e6/25',
    textColor: 'text-gold-e6'
  },
  platinum1: {
    borderColor: 'border-platinum-80/25',
    textColor: 'text-platinum-80'
  },
  platinum2: {
    borderColor: 'border-platinum-80/25',
    textColor: 'text-platinum-80'
  },
  platinum3: {
    borderColor: 'border-platinum-80/25',
    textColor: 'text-platinum-80'
  },
  diamond: {
    borderColor: 'border-diamond-c1/25',
    textColor: 'text-diamond-c1'
  }
}

const RewardCaseItem = (props) => {
  const [remainingTime, setRemainingTime] = createSignal('')

  const timerId = setInterval(() => {
    setRemainingTime(calculateRemainingTime(props.openTime))
  }, 1000)

  onMount(() => {
    setRemainingTime(calculateRemainingTime(props.openTime))
  })

  onCleanup(() => {
    clearInterval(timerId)
  })

  const userRankIndex = createMemo(() => getIndexRank(props.user?.user?.level?.league, BASE_RANKS))

  const notAvailableCases = createMemo(() =>
    getNotAvailableCases(userRankIndex(), BASE_RANKS).map((caseName) =>
      convertRomanToNormal(caseName)
    )
  )
  const availableCases = createMemo(() =>
    getAvailableCases(userRankIndex(), BASE_RANKS).map((caseName) => convertRomanToNormal(caseName))
  )

  return (
    <NavLink
      href={`${URL.CASE_UNBOXING}?id=${props?.item?.id}&daily=true`}
      class={`relative flex flex-col h-[285px] w-[212px]`}
    >
      <div
        class={`w-full h-[237px] relative group case-card-background border-t border-x border-white border-opacity-10  flex flex-col rounded-t-6 overflow-hidden ${
          notAvailableCases().includes(convertRomanToNormal(props?.item?.name)) ||
          (!props?.isJoinedToDiscord && props?.item?.name === 'Daily Free Case')
            ? 'mix-blend-luminosity'
            : 'mix-blend-normal'
        }`}
      >
        <div
          class='absolute inset-0 w-full h-full z-0 bg-repeat'
          style={{
            'background-image': `url('${rlBackgroundCardVector}')`,
            opacity: '0.01'
          }}
        />
        <div class='relative grow z-10 px-4 pb-5 flex flex-col justify-between items-center'>
          <img
            class='w-auto h-[127px] scale-[150%] absolute top-6'
            src={props.item.image ? props.item.image.replace('{url}', window.origin) : ''}
            alt={props.item.name}
          />
          {(notAvailableCases().includes(convertRomanToNormal(props?.item?.name)) ||
            !props?.isJoinedToDiscord && props?.item?.name === 'Daily Free Case') && (
              <div class='w-9 h-9 flex items-center justify-center absolute top-20 gradient-background-green rounded-4 shadow-button'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.40698 7.51985C4.08708 7.36784 4.90439 7.21417 5.82271 7.09668V5.59294C5.82271 3.841 7.24801 2.41569 8.99995 2.41569C10.7519 2.41569 12.1772 3.841 12.1772 5.59294V7.09668C13.0955 7.21417 13.9128 7.36784 14.5929 7.51985V5.59294C14.5929 2.509 12.0839 0 8.99995 0C5.91598 0 3.40698 2.509 3.40698 5.59297V7.51985Z'
                    fill='#3EFF8B'
                  />
                  <path
                    d='M9.00017 11.2264C8.63701 11.2264 8.34155 11.5219 8.34155 11.8851C8.34155 12.2483 8.63701 12.5437 9.00017 12.5437C9.36333 12.5437 9.65879 12.2483 9.65879 11.8851C9.65882 11.5219 9.36333 11.2264 9.00017 11.2264Z'
                    fill='#3EFF8B'
                  />
                  <path
                    d='M9.00006 7.94482C5.68546 7.94482 2.92429 8.69611 1.97827 8.98749V16.9571C2.92573 17.2483 5.69288 18 9.00006 18C12.3147 18 15.0758 17.2487 16.0218 16.9574V8.98777C15.0744 8.69661 12.3073 7.94482 9.00006 7.94482ZM9.52741 13.5151V15.2457H8.47272V13.5151C7.78531 13.2921 7.28676 12.6459 7.28676 11.8851C7.28676 10.9404 8.05535 10.1718 9.00006 10.1718C9.94478 10.1718 10.7134 10.9404 10.7134 11.8851C10.7134 12.6459 10.2149 13.2921 9.52741 13.5151Z'
                    fill='#3EFF8B'
                  />
                </svg>
              </div>
            )}
          <div class='w-auto h-[127px]' />
          <div
            class={`${
              getConfigByCaseName(props?.item?.name, STYLES_CONFIG)?.borderColor
            } cursor-pointer h-10 w-[164px] flex items-center justify-center border  rounded-4 p-2 shadow-button reward-card-label--background__secondary`}
          >
            <span
              class={`${
                getConfigByCaseName(props?.item?.name, STYLES_CONFIG)?.textColor
              } font-bold font-SpaceGrotesk text-14 capitalize`}
            >
              {props.item.name} case
            </span>
          </div>
        </div>
      </div>
      <div
        class={`w-full h-12 rounded-b-6 reward-card-label--background flex items-center justify-center gap-2.5 ${
          notAvailableCases().includes(convertRomanToNormal(props?.item?.name))
            ? 'mix-blend-luminosity'
            : 'mix-blend-normal'
        }`}
      >
        {props?.item?.name === 'Daily Free Case' && !props.openTime && (
          <DiscordIcon />
        )}
        <span class={`reward-card--available capitalize font-bold font-SpaceGrotesk text-16`}>
          {(availableCases().includes(convertRomanToNormal(props?.item?.name)) ||
            props?.item?.name === 'Daily Free Case') &&
            !props.openTime &&
            'open for free'}
          {(props?.user?.authenticated
            ? notAvailableCases().slice(1).includes(convertRomanToNormal(props?.item?.name))
            : notAvailableCases().includes(convertRomanToNormal(props?.item?.name))) && 'locked'}
        </span>
        {(props?.item?.name === 'Daily Free Case' && props.openTime) ||
          (props.openTime && availableCases().includes(convertRomanToNormal(props?.item?.name)) && (
            <span class='text-14 font-bold font-SpaceGrotesk text-gray-9a text-shadow-gold-secondary'>
              Open in {remainingTime()}
            </span>
          ))}
      </div>
      {props?.user?.authenticated &&
        notAvailableCases()[0] === convertRomanToNormal(props?.item?.name) && (
          <span class='absolute bottom-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lowercase reward-card--available font-bold font-SpaceGrotesk text-12'>
            {(
              (props.user?.user?.wagered - props.user?.user?.level?.from * 1000) /
                (props.user?.user?.level?.to * 10) || 99
            ).toFixed(2)}
            % till unlock
          </span>
        )}
    </NavLink>
  )
}

export default RewardCaseItem
