import Coin from '../../../../utilities/Coin'
import { copyToClipboard } from '../../../../utilities/tools'

const PvpminesStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split('T')?.[1]?.split('.')?.[0]
  }`

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'
      onClick={() => {
        copyToClipboard(props?.val?.pf_id)
      }}>
        #{props?.val?.pf_id}
      </p>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.bet_value).toLocaleString()}
        </p>
      </div>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.winnings).toLocaleString()}
        </p>
      </div>

      <div class='flex items-center gap-[5px] text-gray-9aa'>
        <svg
          width='14'
          height='16'
          viewBox='0 0 14 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M9.29834 6.57822C8.54919 7.32749 7.63232 7.70724 6.57349 7.70724C5.51489 7.70724 4.59814 7.32736 3.84888 6.57834C3.09961 5.8292 2.71973 4.91246 2.71973 3.8535C2.71973 2.79479 3.09961 1.87804 3.84875 1.1289C4.5979 0.379759 5.51453 0 6.57349 0C7.6322 0 8.54895 0.379759 9.29822 1.12878C10.0475 1.87817 10.4272 2.79491 10.4272 3.8535C10.4272 4.91246 10.0475 5.82908 9.29834 6.57822ZM13.1869 11.2708C13.2512 11.63 13.2949 11.97 13.3165 12.2818C13.3379 12.5865 13.3488 12.9045 13.3489 13.2269C13.3489 14.0624 13.0834 14.7387 12.5597 15.237C12.0425 15.7292 11.3585 15.9787 10.5265 15.9787H2.82239C1.99036 15.9787 1.30615 15.7291 0.789062 15.237C0.265503 14.7383 0 14.0622 0 13.227C0 12.9061 0.0107422 12.5883 0.0319824 12.2822C0.0535889 11.9697 0.09729 11.6295 0.161621 11.2708C0.226562 10.909 0.310181 10.5671 0.410156 10.2545C0.513672 9.93111 0.654297 9.61214 0.828003 9.30636C1.00818 8.9891 1.22021 8.71286 1.45789 8.48532C1.70679 8.24716 2.01135 8.05588 2.36316 7.91659C2.71387 7.77768 3.10254 7.70724 3.51855 7.70724C3.68188 7.70724 3.83997 7.77426 4.14465 7.97287C4.33521 8.09701 4.55493 8.23862 4.79773 8.39377C5.00708 8.52731 5.29102 8.65243 5.64136 8.76559C5.98389 8.87631 6.33118 8.93246 6.67407 8.93246C7.01697 8.93246 7.36438 8.87631 7.70654 8.76559C8.05725 8.65231 8.34119 8.52719 8.55078 8.39364C8.7959 8.23703 9.0155 8.09543 9.20325 7.97299C9.5083 7.77438 9.66626 7.70737 9.82959 7.70737C10.2455 7.70737 10.6343 7.77768 10.9851 7.91647C11.3372 8.056 11.6416 8.24728 11.8903 8.4852C12.1281 8.71261 12.34 8.98898 12.5204 9.30636C12.6942 9.61214 12.8348 9.93124 12.9382 10.2544C13.0383 10.567 13.1219 10.909 13.1869 11.2708Z'
            fill='currentColor'
          />
        </svg>
        <p class='text-14 font-bold font-SpaceGrotesk text-current uppercase my-auto'>
          {props?.val?.info}
        </p>
      </div>

      <div class='flex items-center gap-[5px] text-gray-9aa'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M20 10L16.6975 11.6512L17.259 13.0067L15.9035 13.5682L17.0711 17.0711L13.5682 15.9034L13.0068 17.2589L11.6512 16.6975L10 20L8.34875 16.6975L6.99324 17.259L6.4318 15.9035L2.92895 17.0711L4.09656 13.5682L2.74105 13.0068L3.3025 11.6512L0 10L3.30254 8.34879L2.74105 6.99328L4.09656 6.4318L2.92895 2.92895L6.43176 4.09652L6.99324 2.74102L8.34875 3.3025L10 0L11.6512 3.3025L13.0068 2.74102L13.5682 4.09652L17.0711 2.92891L15.9035 6.43176L17.259 6.99324L16.6975 8.34875L20 10ZM9.54675 8.23112L6.29153 5L6.0045 7.82065L8.14508 9.62242L9.54675 8.23112ZM13.1605 10.9154L12.7058 11.3668L11.9262 10.593L10.5088 11.8944L11.3415 12.721L10.8867 13.1724L11.7963 14.0751L14.07 11.8182L13.1605 10.9154ZM5 14.0966L6.15925 12.946L7.06863 13.8486L5.90938 14.9993L5 14.0966ZM13.8408 12.9467L12.9314 13.8493L14.0906 15L15 14.0973L13.8408 12.9467ZM13.7105 5.00098L13.9975 7.82165L8.66151 12.721L9.11626 13.1724L8.20675 14.0751L5.93296 11.8182L6.84247 10.9154L7.29725 11.3668L13.7105 5.00098Z'
            fill='currentColor'
          />
        </svg>

        <p class='text-14 font-bold font-SpaceGrotesk text-current uppercase my-auto'>
          {props?.val?.info}
        </p>
      </div>
      <p
        class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto ${
          props?.val?.winnings <= 0 ? 'text-gradient-red' : 'text-gradient-green-secondary'
        }`}
      >
        {props?.val?.winnings <= 0 ? 'lose' : 'win'}
      </p>
      <div class='w-full flex items-center justify-end overflow-hidden relative cursor-pointer'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate max-w-full'>
          {date}
        </p>
      </div>
    </>
  )
}

export default PvpminesStructure
