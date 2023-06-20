import Coin from '../../../../utilities/Coin'
import { copyToClipboard } from '../../../../utilities/tools'

const CasesStructure = (props) => {
  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')

  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split('T')?.[1]?.split('.')?.[0]
  }`

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'
      onClick={() => {
        copyToClipboard(props?.val?.pf_id)
      }}
      >
        #{props?.val?.pf_id}
      </p>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.bet_value).toLocaleString() ?? 1000}
        </p>
      </div>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto'>
          {Number(props?.val?.winnings).toLocaleString() ?? 1000}
        </p>
      </div>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa capitalize my-auto truncate'>
        {props?.val?.info.split('_')[0]}
      </p>
      <p class='text-16 font-bold font-SpaceGrotesk text-gray-9aa capitalize my-auto truncate'>
        {props?.val?.extra_data}
      </p>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
        {props?.val?.info.split('_')[1]}
      </p>
      <div class='w-full flex items-center justify-end overflow-hidden'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
          {date}
        </p>
      </div>
    </>
  )
}

export default CasesStructure
