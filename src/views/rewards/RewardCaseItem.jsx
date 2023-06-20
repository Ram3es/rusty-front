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
          {notAvailableCases().includes(convertRomanToNormal(props?.item?.name)) ||
            (!props?.isJoinedToDiscord && props?.item?.name === 'Daily Free Case' && (
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
            ))}
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
          <svg
            width='20'
            height='14'
            viewBox='0 0 20 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.9419 1.1725C15.6473 0.62475 14.263 0.22667 12.8157 0C12.638 0.290583 12.4304 0.681424 12.2872 0.992336C10.7488 0.783119 9.22445 0.783119 7.7143 0.992336C7.57116 0.681424 7.3588 0.290583 7.17947 0C5.73067 0.22667 4.3448 0.626212 3.05016 1.1754C0.438869 4.74369 -0.269009 8.22334 0.0849306 11.6536C1.81688 12.8232 3.49534 13.5336 5.14548 13.9986C5.55291 13.4915 5.91628 12.9525 6.22931 12.3844C5.63313 12.1795 5.06211 11.9267 4.52256 11.6333C4.6657 11.5374 4.80571 11.4371 4.94098 11.334C8.23183 12.7258 11.8074 12.7258 15.0589 11.334C15.1958 11.4371 15.3358 11.5374 15.4774 11.6333C14.9362 11.9282 14.3637 12.181 13.7675 12.3859C14.0805 12.9525 14.4423 13.493 14.8513 14C16.503 13.5351 18.1831 12.8246 19.915 11.6536C20.3303 7.67706 19.2056 4.22936 16.9419 1.1725ZM6.67765 9.54402C5.68977 9.54402 4.87963 8.71005 4.87963 7.69449C4.87963 6.67892 5.67247 5.84352 6.67765 5.84352C7.68285 5.84352 8.49297 6.67746 8.47567 7.69449C8.47723 8.71005 7.68285 9.54402 6.67765 9.54402ZM13.3223 9.54402C12.3344 9.54402 11.5243 8.71005 11.5243 7.69449C11.5243 6.67892 12.3171 5.84352 13.3223 5.84352C14.3275 5.84352 15.1376 6.67746 15.1203 7.69449C15.1203 8.71005 14.3275 9.54402 13.3223 9.54402Z'
              fill='white'
            />
            <path
              d='M16.9419 1.1725C15.6473 0.62475 14.263 0.22667 12.8157 0C12.638 0.290583 12.4304 0.681424 12.2872 0.992336C10.7488 0.783119 9.22445 0.783119 7.7143 0.992336C7.57116 0.681424 7.3588 0.290583 7.17947 0C5.73067 0.22667 4.3448 0.626212 3.05016 1.1754C0.438869 4.74369 -0.269009 8.22334 0.0849306 11.6536C1.81688 12.8232 3.49534 13.5336 5.14548 13.9986C5.55291 13.4915 5.91628 12.9525 6.22931 12.3844C5.63313 12.1795 5.06211 11.9267 4.52256 11.6333C4.6657 11.5374 4.80571 11.4371 4.94098 11.334C8.23183 12.7258 11.8074 12.7258 15.0589 11.334C15.1958 11.4371 15.3358 11.5374 15.4774 11.6333C14.9362 11.9282 14.3637 12.181 13.7675 12.3859C14.0805 12.9525 14.4423 13.493 14.8513 14C16.503 13.5351 18.1831 12.8246 19.915 11.6536C20.3303 7.67706 19.2056 4.22936 16.9419 1.1725ZM6.67765 9.54402C5.68977 9.54402 4.87963 8.71005 4.87963 7.69449C4.87963 6.67892 5.67247 5.84352 6.67765 5.84352C7.68285 5.84352 8.49297 6.67746 8.47567 7.69449C8.47723 8.71005 7.68285 9.54402 6.67765 9.54402ZM13.3223 9.54402C12.3344 9.54402 11.5243 8.71005 11.5243 7.69449C11.5243 6.67892 12.3171 5.84352 13.3223 5.84352C14.3275 5.84352 15.1376 6.67746 15.1203 7.69449C15.1203 8.71005 14.3275 9.54402 13.3223 9.54402Z'
              fill='url(#paint0_radial_3155_152131)'
            />
            <path
              d='M16.9419 1.1725C15.6473 0.62475 14.263 0.22667 12.8157 0C12.638 0.290583 12.4304 0.681424 12.2872 0.992336C10.7488 0.783119 9.22445 0.783119 7.7143 0.992336C7.57116 0.681424 7.3588 0.290583 7.17947 0C5.73067 0.22667 4.3448 0.626212 3.05016 1.1754C0.438869 4.74369 -0.269009 8.22334 0.0849306 11.6536C1.81688 12.8232 3.49534 13.5336 5.14548 13.9986C5.55291 13.4915 5.91628 12.9525 6.22931 12.3844C5.63313 12.1795 5.06211 11.9267 4.52256 11.6333C4.6657 11.5374 4.80571 11.4371 4.94098 11.334C8.23183 12.7258 11.8074 12.7258 15.0589 11.334C15.1958 11.4371 15.3358 11.5374 15.4774 11.6333C14.9362 11.9282 14.3637 12.181 13.7675 12.3859C14.0805 12.9525 14.4423 13.493 14.8513 14C16.503 13.5351 18.1831 12.8246 19.915 11.6536C20.3303 7.67706 19.2056 4.22936 16.9419 1.1725ZM6.67765 9.54402C5.68977 9.54402 4.87963 8.71005 4.87963 7.69449C4.87963 6.67892 5.67247 5.84352 6.67765 5.84352C7.68285 5.84352 8.49297 6.67746 8.47567 7.69449C8.47723 8.71005 7.68285 9.54402 6.67765 9.54402ZM13.3223 9.54402C12.3344 9.54402 11.5243 8.71005 11.5243 7.69449C11.5243 6.67892 12.3171 5.84352 13.3223 5.84352C14.3275 5.84352 15.1376 6.67746 15.1203 7.69449C15.1203 8.71005 14.3275 9.54402 13.3223 9.54402Z'
              fill='url(#paint1_linear_3155_152131)'
              fill-opacity='0.16'
            />
            <defs>
              <radialGradient
                id='paint0_radial_3155_152131'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(10 11.2) rotate(90) scale(9.8 14)'
              >
                <stop stop-color='#FFB436' />
                <stop offset='1' stop-color='#FFD58F' />
              </radialGradient>
              <linearGradient
                id='paint1_linear_3155_152131'
                x1='-2.98023e-07'
                y1='14'
                x2='22.1719'
                y2='6.08145'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.200692' stop-color='white' stop-opacity='0' />
                <stop offset='0.413004' stop-color='white' />
                <stop offset='0.689282' />
                <stop offset='1' stop-color='white' />
              </linearGradient>
            </defs>
          </svg>
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
