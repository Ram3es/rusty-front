import Coin from '../../../../utilities/Coin'

const MinesStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')

  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split('T')?.[1]?.split('.')?.[0]
  }`

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
        #{props?.val?.pf_id}{' '}
      </p>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.bet_value).toLocaleString()}{' '}
        </p>
      </div>
      <div class={`flex items-center gap-2`}>
        <Coin width='4' />
        <p class='text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.winnings).toLocaleString()}
        </p>
      </div>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
        {(props?.val?.winnings / props?.val?.bet_value || 0).toFixed(2)}x{' '}
      </p>
      <div class='flex items-center gap-[5px]'>
        <svg
          width='22'
          height='20'
          viewBox='0 0 22 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M21.9178 10L17.7549 11.5289L18.3247 12.784L16.9492 13.3039L18.134 16.5473L14.5796 15.4661L14.0099 16.7212L12.6344 16.2014L10.9589 20L9.28336 16.2014L7.90791 16.7213L7.3382 15.4662L3.78381 16.5473L4.96861 13.3039L3.59316 12.784L4.16286 11.5289L0 10L4.1629 8.4711L3.59316 7.216L4.96861 6.69611L3.78381 3.45273L7.33816 4.53382L7.90791 3.27872L9.28336 3.79861L10.9589 0L12.6344 3.79861L14.0099 3.27872L14.5796 4.53382L18.134 3.45269L16.9492 6.69607L18.3247 7.21596L17.7549 8.47106L21.9178 10Z'
            fill='#9A9EC8'
          />
          <path
            d='M1.63324 6.66667L2.5192 6.37282L2.8412 5.56433L1.6443 5.20031C1.53598 5.16733 1.40546 5.18706 1.31251 5.27165C1.22589 5.35093 1.19541 5.46811 1.23433 5.57443L1.63324 6.66667Z'
            fill='#9A9EC8'
          />
          <path
            d='M1.63324 13.3333L2.5192 13.6272L2.8412 14.4357L1.6443 14.7997C1.53598 14.8327 1.40546 14.8129 1.31251 14.7284C1.22589 14.6491 1.19541 14.5319 1.23433 14.4256L1.63324 13.3333Z'
            fill='#9A9EC8'
          />
          <path
            d='M19.3986 13.6272L20.2846 13.3333L20.6835 14.4256C20.7224 14.5319 20.6919 14.6491 20.6053 14.7284C20.5123 14.8129 20.3818 14.8327 20.2735 14.7997L19.0766 14.4357L19.3986 13.6272Z'
            fill='#9A9EC8'
          />
          <path
            d='M20.2846 6.66667L19.3986 6.37282L19.0766 5.56433L20.2735 5.20031C20.3818 5.16733 20.5123 5.18706 20.6053 5.27165C20.6919 5.35093 20.7224 5.46811 20.6835 5.57443L20.2846 6.66667Z'
            fill='#9A9EC8'
          />
          <path
            d='M13.4874 7.38996L10.7561 8.55304L8.02475 7.38996C7.92956 7.34943 7.81681 7.36756 7.74255 7.43532C7.66829 7.50309 7.64842 7.60597 7.69284 7.69283L8.96745 10.1852L7.69284 12.6775C7.64842 12.7644 7.66829 12.8673 7.74255 12.935C7.81681 13.0028 7.92956 13.0209 8.02475 12.9804L10.7561 11.8173L13.4875 12.9804C13.5826 13.0209 13.6954 13.0028 13.7696 12.935C13.8439 12.8673 13.8638 12.7644 13.8193 12.6775L12.5447 10.1852L13.8194 7.69278C13.8638 7.60597 13.8439 7.50309 13.7696 7.43532C13.6954 7.36756 13.5826 7.34943 13.4874 7.38996Z'
            fill='black'
            fill-opacity='0.56'
          />
        </svg>

        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
          {props?.val?.info}
        </p>
      </div>
      <div class='flex items-center gap-2'>
        <p
          class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto ${
            props?.val?.winnings <= 0 ? 'text-gradient-red' : 'text-gradient-green-secondary'
          }`}
        >
          {props?.val?.winnings <= 0 ? 'lose' : 'win'}
        </p>
        {props?.val?.winnings > 0 && (
          <>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.5353 6.79786L18.9603 9.13427C19.1842 9.21569 19.3332 9.42838 19.3332 9.6666C19.3332 9.90481 19.1842 10.1175 18.9605 10.1989L12.5353 12.5353L10.1989 18.9603C10.1175 19.1842 9.90481 19.3332 9.6666 19.3332C9.42838 19.3332 9.21569 19.1842 9.13427 18.9605L6.79786 12.5353L0.372881 10.1989C0.148976 10.1175 0 9.90481 0 9.6666C0 9.42838 0.148976 9.21569 0.372881 9.13427L6.79786 6.79786L9.13427 0.372881C9.21569 0.148976 9.42838 0 9.6666 0C9.90481 0 10.1175 0.148976 10.1989 0.372881L12.5353 6.79786Z'
                fill='#3D8AFF'
              />
              <path
                d='M12.5353 6.79786L18.9603 9.13427C19.1842 9.21569 19.3332 9.42838 19.3332 9.6666C19.3332 9.90481 19.1842 10.1175 18.9605 10.1989L12.5353 12.5353L10.1989 18.9603C10.1175 19.1842 9.90481 19.3332 9.6666 19.3332C9.42838 19.3332 9.21569 19.1842 9.13427 18.9605L6.79786 12.5353L0.372881 10.1989C0.148976 10.1175 0 9.90481 0 9.6666C0 9.42838 0.148976 9.21569 0.372881 9.13427L6.79786 6.79786L9.13427 0.372881C9.21569 0.148976 9.42838 0 9.6666 0C9.90481 0 10.1175 0.148976 10.1989 0.372881L12.5353 6.79786Z'
                fill='url(#paint0_radial_2561_153188)'
                fill-opacity='0.36'
              />
              <path
                d='M14.967 6.4766L15.664 4.38549C15.732 4.18194 15.6787 3.95759 15.5274 3.80581C15.365 3.64385 15.137 3.60609 14.9477 3.66922L12.8566 4.36616L13.4192 5.91403L14.967 6.4766Z'
                fill='#3D8AFF'
              />
              <path
                d='M14.967 6.4766L15.664 4.38549C15.732 4.18194 15.6787 3.95759 15.5274 3.80581C15.365 3.64385 15.137 3.60609 14.9477 3.66922L12.8566 4.36616L13.4192 5.91403L14.967 6.4766Z'
                fill='url(#paint1_radial_2561_153188)'
                fill-opacity='0.36'
              />
              <path
                d='M5.91404 5.91403L4.36617 6.4766L3.66923 4.38549C3.60123 4.18193 3.65448 3.95759 3.80581 3.80581C3.96703 3.64503 4.19522 3.60565 4.38549 3.66922L6.47661 4.36616L5.91404 5.91403Z'
                fill='#3D8AFF'
              />
              <path
                d='M5.91404 5.91403L4.36617 6.4766L3.66923 4.38549C3.60123 4.18193 3.65448 3.95759 3.80581 3.80581C3.96703 3.64503 4.19522 3.60565 4.38549 3.66922L6.47661 4.36616L5.91404 5.91403Z'
                fill='url(#paint2_radial_2561_153188)'
                fill-opacity='0.36'
              />
              <path
                d='M4.36617 12.8566L3.66923 14.9477C3.60123 15.1513 3.65448 15.3756 3.80581 15.5274C3.96703 15.6882 4.19522 15.7275 4.38549 15.664L6.47661 14.967L5.91404 13.4192L4.36617 12.8566Z'
                fill='#3D8AFF'
              />
              <path
                d='M4.36617 12.8566L3.66923 14.9477C3.60123 15.1513 3.65448 15.3756 3.80581 15.5274C3.96703 15.6882 4.19522 15.7275 4.38549 15.664L6.47661 14.967L5.91404 13.4192L4.36617 12.8566Z'
                fill='url(#paint3_radial_2561_153188)'
                fill-opacity='0.36'
              />
              <path
                d='M14.967 12.8566L13.4192 13.4192L12.8566 14.967L14.9477 15.664C15.137 15.7271 15.365 15.6893 15.5274 15.5274C15.6787 15.3756 15.732 15.1513 15.664 14.9477L14.967 12.8566Z'
                fill='#3D8AFF'
              />
              <path
                d='M14.967 12.8566L13.4192 13.4192L12.8566 14.967L14.9477 15.664C15.137 15.7271 15.365 15.6893 15.5274 15.5274C15.6787 15.3756 15.732 15.1513 15.664 14.9477L14.967 12.8566Z'
                fill='url(#paint4_radial_2561_153188)'
                fill-opacity='0.36'
              />
              <path
                d='M12.3322 9.51549L10.8716 8.58389L9.94001 6.02203C9.90755 5.93275 9.82274 5.87335 9.72775 5.87335C9.63277 5.87335 9.54796 5.93275 9.5155 6.02203L8.58389 8.58389L7.12329 9.51549C7.03401 9.54796 6.97461 9.63277 6.97461 9.72775C6.97461 9.82274 7.03401 9.90755 7.12329 9.94001L8.58389 10.8716L9.5155 13.4335C9.54796 13.5228 9.63277 13.5822 9.72775 13.5822C9.82274 13.5822 9.90755 13.5228 9.94001 13.4335L10.8716 10.8716L12.3323 9.94001C12.4215 9.90755 12.4809 9.82274 12.4809 9.72775C12.4809 9.63277 12.4215 9.54796 12.3322 9.51549Z'
                fill='black'
                fill-opacity='0.56'
              />
              <defs>
                <radialGradient
                  id='paint0_radial_2561_153188'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(9.6666) rotate(90) scale(19.3332)'
                >
                  <stop stop-color='#EFF6FF' stop-opacity='0.881019' />
                  <stop offset='1' stop-color='#79B7FF' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint1_radial_2561_153188'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(9.6666) rotate(90) scale(19.3332)'
                >
                  <stop stop-color='#EFF6FF' stop-opacity='0.881019' />
                  <stop offset='1' stop-color='#79B7FF' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint2_radial_2561_153188'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(9.6666) rotate(90) scale(19.3332)'
                >
                  <stop stop-color='#EFF6FF' stop-opacity='0.881019' />
                  <stop offset='1' stop-color='#79B7FF' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint3_radial_2561_153188'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(9.6666) rotate(90) scale(19.3332)'
                >
                  <stop stop-color='#EFF6FF' stop-opacity='0.881019' />
                  <stop offset='1' stop-color='#79B7FF' stop-opacity='0' />
                </radialGradient>
                <radialGradient
                  id='paint4_radial_2561_153188'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(9.6666) rotate(90) scale(19.3332)'
                >
                  <stop stop-color='#EFF6FF' stop-opacity='0.881019' />
                  <stop offset='1' stop-color='#79B7FF' stop-opacity='0' />
                </radialGradient>
              </defs>
            </svg>
            <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
              {props?.val?.extra_data}
            </p>
          </>
        )}
      </div>
      <div class='w-full flex items-center justify-end overflow-hidden'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
          {date}
        </p>
      </div>
    </>
  )
}

export default MinesStructure
