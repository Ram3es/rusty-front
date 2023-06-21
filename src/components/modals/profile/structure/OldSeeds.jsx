import injector from '../../../../injector/injector'
import { copyToClipboard } from '../../../../utilities/tools'
import GrayGradientButton from '../../../elements/GrayGradientButton'

const OldSeedsStructure = (props) => {
  const { socket, toastr, setUserObject } = injector

  const changeClientSeed = () => {
    socket.emit(
      'system:client_seed:new',
      {
        client_seed: props.val.client_seed
      },
      (data) => {
        if (data.msg) {
          toastr(data)
        }
        if (!data.error) {
          setUserObject('user', (prev) => ({
            ...prev,
            client_seed: props.val.client_seed
          }))
        }
      }
    )
  }

  return (
    <>
      <p class='text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate'>
        {props.val.server_seed}
      </p>
      <div class='w-full flex items-center justify-end overflow-hidden h-10'>
        <GrayGradientButton
          additionalClass='w-[134px] h-full text-gray-9a font-SpaceGrotesk text-14 font-bold cursor-pointer my-auto'
          callbackFn={() => copyToClipboard(props.val.server_seed)}
        >
          <span>Copy</span>
        </GrayGradientButton>
      </div>
    </>
  )
}

export default OldSeedsStructure
