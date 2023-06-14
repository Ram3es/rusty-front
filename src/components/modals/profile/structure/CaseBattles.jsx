import { For } from 'solid-js'
import Coin from '../../../../utilities/Coin'
import BattleRoyaleIcon from '../../../icons/BattleRoyaleIcon'
import BattleCursedIcon from '../../../icons/BattleCursedIcon'
import BattleGroupIcon from '../../../icons/BattleGroupIcon'

const CaseBattlesStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')

  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split('T')?.[1]?.split('.')?.[0]
  }`

  const getModeColor = () => {
    return (props?.val?.extra_data.split('_')[0] === 'royal' ||
      props?.val?.extra_data.split('_')[0] === 'team') &&
      props?.val?.cursed !== 1
      ? 'yellow'
      : props?.val?.cursed === 1
      ? 'green'
      : 'blue'
  }

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto'>
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
      <div class={`flex gap-[5px] items-center text-gray-9a`}>
        <For each={Array.from(Array(Number(props?.val?.info)).keys())}>
          {(_, index) => (
            <>
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
                  d='M9.29834 6.57822C8.54919 7.32749 7.63232 7.70724 6.57349 7.70724C5.51489 7.70724 4.59814 7.32736 3.84888 6.57834C3.09961 5.8292 2.71973 4.91246 2.71973 3.8535C2.71973 2.79479 3.09961 1.87804 3.84875 1.1289C4.5979 0.379759 5.51453 0 6.57349 0C7.6322 0 8.54895 0.379759 9.29822 1.12878C10.0475 1.87817 10.4272 2.79491 10.4272 3.8535C10.4272 4.91246 10.0475 5.82908 9.29834 6.57822ZM13.1869 11.2922C13.2512 11.6513 13.2949 11.9914 13.3165 12.3032C13.3379 12.6079 13.3488 12.9259 13.3489 13.2482C13.3489 14.0838 13.0834 14.7601 12.5597 15.2584C12.0425 15.7505 11.3585 16.0001 10.5265 16.0001H2.82239C1.99036 16.0001 1.30615 15.7504 0.789062 15.2584C0.265503 14.7597 0 14.0836 0 13.2484C0 12.9274 0.0107422 12.6097 0.0319824 12.3035C0.0535889 11.991 0.09729 11.6508 0.161621 11.2922C0.226562 10.9304 0.310181 10.5885 0.410156 10.2758C0.513672 9.95248 0.654297 9.63351 0.828003 9.32772C1.00818 9.01046 1.22021 8.73422 1.45789 8.50668C1.70679 8.26852 2.01135 8.07724 2.36316 7.93796C2.71387 7.79904 3.10254 7.72861 3.51855 7.72861C3.68188 7.72861 3.83997 7.79562 4.14465 7.99423C4.33521 8.11838 4.55493 8.25998 4.79773 8.41513C5.00708 8.54867 5.29102 8.67379 5.64136 8.78695C5.98389 8.89767 6.33118 8.95382 6.67407 8.95382C7.01697 8.95382 7.36438 8.89767 7.70654 8.78695C8.05725 8.67367 8.34119 8.54855 8.55078 8.41501C8.7959 8.25839 9.0155 8.11679 9.20325 7.99435C9.5083 7.79575 9.66626 7.72873 9.82959 7.72873C10.2455 7.72873 10.6343 7.79904 10.9851 7.93783C11.3372 8.07736 11.6416 8.26864 11.8903 8.50656C12.1281 8.73397 12.34 9.01034 12.5204 9.32772C12.6942 9.63351 12.8348 9.9526 12.9382 10.2757C13.0383 10.5883 13.1219 10.9304 13.1869 11.2922Z'
                  fill='#9A9EC8'
                />
              </svg>
              {index() + 1 !== Number(props?.val?.info) &&
                (props?.val?.extra_data.split('_')[0] === 'royal' ||
                  props?.val?.extra_data.split('_')[0] === 'group' ||
                  (props?.val?.extra_data.split('_')[0] === 'team' &&
                    index() !== 0 &&
                    index() !== 2)) &&
                (getModeColor() === 'yellow' ? (
                  <BattleRoyaleIcon additionClasses='w-[14px]' />
                ) : getModeColor() === 'green' ? (
                  <BattleCursedIcon additionClasses='w-[14px]' />
                ) : (
                  <BattleGroupIcon additionClasses='w-[14px]' />
                ))}
            </>
          )}
        </For>
      </div>
      <div
        class='flex items-center gap-1.5 font-bold text-14'
        classList={{
          'text-yellow-ffb': getModeColor() === 'yellow',
          'text-[#DAFD09]': getModeColor() === 'green',
          'text-[#5AC3FF]': getModeColor() === 'blue'
        }}
      >
        <span>
          {Number(props?.val?.info) &&
            (props?.val?.extra_data.split('_')[0] === 'royal' ||
              props?.val?.extra_data.split('_')[0] === 'group' ||
              props?.val?.extra_data.split('_')[0] === 'team') &&
            (getModeColor() === 'yellow' ? (
              <BattleRoyaleIcon additionClasses='w-[14px]' />
            ) : getModeColor() === 'green' ? (
              <BattleCursedIcon additionClasses='w-[14px]' />
            ) : (
              <BattleGroupIcon additionClasses='w-[14px]' />
            ))}
        </span>
        <span>
          {(props?.val?.extra_data.split('_')[0] === 'royal' ||
            props?.val?.extra_data.split('_')[0] === 'team') &&
          props?.val?.cursed !== 1
            ? 'Battle Royale'
            : props?.val?.cursed === 1
            ? 'Cursed'
            : 'Group'}
        </span>
      </div>
      <div
        class={`flex items-center gap-2 ${
          props?.val?.winnings >= props?.val?.bet_value
            ? 'text-gradient-green-secondary'
            : 'text-gray-9aa'
        }`}
      >
        <p class='text-current text-14 font-bold font-SpaceGrotesk uppercase'>
          {props?.val?.winnings >= props?.val?.bet_value ? 'win' : 'loss'}
        </p>
      </div>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto'>
        {Number(props?.val?.extra_data.split('_')[1]) ? 'yes' : 'no'}
      </p>
      <div class='w-full flex items-center justify-end overflow-hidden'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto truncate'>
          {date}
        </p>
      </div>
    </>
  )
}

export default CaseBattlesStructure
