import Coin from '../../../../utilities/Coin'

const FiatStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]}`

  return (
    <>
      <div class='flex items-center gap-[9px]'>
        <div class='bg-green-67/10 w-6 h-6 rounded-full flex items-center justify-center'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M5.99805 0C5.58383 0 5.24805 0.335786 5.24805 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335787 6.75 0.75 6.75H5.24805V11.25C5.24805 11.6642 5.58383 12 5.99805 12C6.41226 12 6.74805 11.6642 6.74805 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.74805V0.75C6.74805 0.335786 6.41226 0 5.99805 0Z'
              fill='url(#paint0_radial_2561_195607)'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M5.99805 0C5.58383 0 5.24805 0.335786 5.24805 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335787 6.75 0.75 6.75H5.24805V11.25C5.24805 11.6642 5.58383 12 5.99805 12C6.41226 12 6.74805 11.6642 6.74805 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.74805V0.75C6.74805 0.335786 6.41226 0 5.99805 0Z'
              fill='url(#paint1_linear_2561_195607)'
              fill-opacity='0.16'
            />
            <defs>
              <radialGradient
                id='paint0_radial_2561_195607'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(6 9.6) rotate(90) scale(8.4)'
              >
                <stop stop-color='#27F278' />
                <stop offset='1' stop-color='#86FFB6' />
              </radialGradient>
              <linearGradient
                id='paint1_linear_2561_195607'
                x1='-1.78814e-07'
                y1='12'
                x2='14.1176'
                y2='8.47059'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.200692' stop-color='white' stop-opacity='0' />
                <stop offset='0.413004' stop-color='white' />
                <stop offset='0.689282' />
                <stop offset='1' stop-color='white' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p
          class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto text-gradient-green-secondary`}
        >
          gift card deposit
        </p>
      </div>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
        {props?.val?.order_id || '-'}
      </p>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.value).toLocaleString()}
        </p>
      </div>
      <div
        class={`flex items-center gap-2 ${
          props?.val?.status !== 'accepted' ? 'text-gray-9aa' : 'text-gradient-green-secondary'
        }`}
      >
        <p class='text-current text-14 font-bold font-SpaceGrotesk uppercase'>
          {props?.val?.status}
        </p>
      </div>
      <div class='w-full flex items-center justify-end overflow-hidden relative cursor-pointer'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
          {date}
        </p>
      </div>
    </>
  )
}

export default FiatStructure
