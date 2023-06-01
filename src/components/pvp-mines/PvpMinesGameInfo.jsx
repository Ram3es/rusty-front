import YellowGradientButton  from "../elements/CaseGradientButton"
import Coin from "../../utilities/Coin"

const TileGameInfo = (props) => {
  return (
    <div
      class={`h-10 px-4 rounded-4 flex center cursor-pointer w-full bg-white bg-opacity-5`}
      style={{
        'box-shadow':
          '0px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.12)',
        "text-shadow": 
          "0px 2px 2px rgba(0, 0, 0, 0.12)"
    }}
    >
      <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center'>
        {props.isEnded 
        ? <span class='w-max text-green-27'>Won:</span>
        : <span class='w-max'>In Play:</span>
        }
        <Coin width='5' />
        <span class={props.isEnded ? 'text-gradient-green-secondary' : 'text-gradient'}>{props.totalValue}</span>
      </div>
    </div>

  )
}

export const PvpMinesGameInfo = (props) => {
    return (
        <div class='flex items-center text-gray-9b gap-2 w-full'>
          {props.status === 'pending' ? (
            <YellowGradientButton
              isFullWidth={true}
              callbackFn={props.onJoinGame}
            >
            <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center'>
              <span class='w-max'>Join</span>
              <Coin width='5' />
              <span class='text-gradient'>{props.totalValue}</span>
            </div>
          </YellowGradientButton>
        ) :
            <TileGameInfo
              totalValue={props.totalValue }
              isEnded={props.status === 'ended'}
            />
      }
        </div>
    )
}

export default PvpMinesGameInfo