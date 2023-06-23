import { createEffect, createSignal } from 'solid-js'
import injector from '../../../../injector/injector'
import Coin from '../../../../utilities/Coin'
import { copyToClipboard } from '../../../../utilities/tools'

const CoinflipStructure = (props) => {
  const { socket, toastr } = injector

  const [isResending, setIsResending] = createSignal(false)
  const [resentTrade, setResentTrade] = createSignal({})

  const splitted = props?.val?.timestamp?.split('T')?.[0].split('-')
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split('T')?.[1]?.split('.')?.[0]
  }`

  createEffect(() => {
    const vals = (props?.resendTrades || []).find((x) => x.pf_id === props.val.pf_id)
    if (vals?.process_id) {
      setResentTrade(vals)
    }
  })

  const sendTrade = () => {
    const RESEND_TIMEOUT = 20000
    if (isResending()) return
    setIsResending(true)

    if (resentTrade()?.process_id) {
      socket.emit('steam:resend', { processId: resentTrade()?.process_id }, (data) => {
        if (data.msg) toastr(data)

        if (data.error) {
          console.error(data)
        }
      })
    }

    setTimeout(() => {
      setIsResending(false)
    }, RESEND_TIMEOUT)
  }

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'
      onClick={() => {
        copyToClipboard(props?.val?.pf_id)
      }}>
        #{props?.val?.pf_id}{' '}
      </p>
      <div class='flex items-center gap-2'>
        <Coin width='4' />
        <p class='text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto'>
          {Math.round(
            props?.val?.bet_value / (props?.val?.extra_data / 10000)
          ).toLocaleString()}
        </p>
      </div>
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
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10'>
        {((props?.val?.extra_data || 0) / 100).toFixed(2)}%
      </p>
      <p
        class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto ${
          props?.val?.winnings <= 0 ? 'text-gradient-red' : 'text-gradient-green-secondary'
        }`}
      >
        {props?.val?.winnings <= 0 ? 'lose' : 'win'}
      </p>
      <p
        class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto relative z-20 ${
          resentTrade()?.process_id ? 'cursor-pointer underline text-white' : 'text-gray-9aa'
        }`}
        onClick={sendTrade}
      >
        {resentTrade()?.process_id
          ? 'resend'
          : props?.val?.info === 'double'
          ? 'double down'
          : props?.val?.status
          ? props?.val?.status
          : '-'}
      </p>
      <div class='w-full flex items-center justify-end overflow-hidden relative cursor-pointer'>
        <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate max-w-full'>          
          {date}
        </p>
      </div>
    </>
  )
}

export default CoinflipStructure
