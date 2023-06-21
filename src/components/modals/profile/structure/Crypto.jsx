import injector from '../../../../injector/injector'
import Coin from '../../../../utilities/Coin'

const CryptoStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]}`

  const { toastr } = injector

  const copy = () => {
    navigator.clipboard.writeText(`${props?.val?.txid}`)
    toastr({
      error: false,
      msg: 'Successfully copied to clipboard!'
    })
  }

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
          class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto text-gradient-green-secondary `}
        >
          {props?.val?.ticker} deposit
        </p>
      </div>
      <div class='flex items-center gap-[7.3px]'>
        <Coin />
        <p
          class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto text-gradient-green-secondary`}
        >
          {Number(props?.val?.value).toLocaleString()}
        </p>
      </div>
      <div class='flex items-center gap-2'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate max-w-full'>
          {props?.val?.txid}
        </p>
        <div class='bg-gray-button-gradient p-1 rounded-4 border border-white/10' onClick={copy}>
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_2073_136815)'>
              <mask
                id='mask0_2073_136815'
                style='mask-type:luminance'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='18'
                height='18'
              >
                <path d='M0 18H18V0H0V18Z' fill='white' />
              </mask>
              <g mask='url(#mask0_2073_136815)'>
                <path
                  d='M11.25 17.25H3C2.175 17.25 1.5 16.575 1.5 15.75V6C1.5 5.5875 1.8375 5.25 2.25 5.25C2.6625 5.25 3 5.5875 3 6V15C3 15.4125 3.3375 15.75 3.75 15.75H11.25C11.6625 15.75 12 16.0875 12 16.5C12 16.9125 11.6625 17.25 11.25 17.25ZM14.25 14.25H6C5.175 14.25 4.5 13.575 4.5 12.75V2.25C4.5 1.425 5.175 0.75 6 0.75H14.25C15.075 0.75 15.75 1.425 15.75 2.25V12.75C15.75 13.575 15.075 14.25 14.25 14.25ZM13.5 2.25H6.75C6.3375 2.25 6 2.5875 6 3V12C6 12.4125 6.3375 12.75 6.75 12.75H13.5C13.9125 12.75 14.25 12.4125 14.25 12V3C14.25 2.5875 13.9125 2.25 13.5 2.25Z'
                  fill='#8C90B9'
                />
              </g>
            </g>
            <defs>
              <clipPath id='clip0_2073_136815'>
                <rect width='18' height='18' fill='white' transform='matrix(1 0 0 -1 0 18)' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class='w-full flex items-center justify-end overflow-hidden relative cursor-pointer'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
          {date}
        </p>
      </div>
    </>
  )
}

export default CryptoStructure
