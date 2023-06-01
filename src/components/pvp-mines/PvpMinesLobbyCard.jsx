
import { URL } from "../../libraries/url"
import PVPMinesIcon from "../../components/icons/PVPMinesIcon"
import PvpMinesQtyInfo from "./PvpMinesQtyInfo"
import PlayersInfo from "./PlayersInfo"
import PreviewButton from "../PreviewButton"
import PvpMinesGameInfo from "./PvpMinesGameInfo"



const PvpMinesLobbyCard = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-4 p-4 w-full pvp-game-card min-h-[132px] max-w-[436px] " classList={{
            'pvp-open-game': props.status === 'pending',
            'pvp-playing-game': props.status === 'started' || props.status === 'counting',
            'pvp-ended-game' : props.status === 'ended'
        }}>
           <div 
             class="flex flex-row sm:flex-col justify-center items-center  mx-auto sm:mx-0 py-2 sm:py-4 gap-2 h-full min-w-[4rem] w-1/2 sm:w-16 font-bold font-SpaceGrotesk"
             classList={{
                "game-active text-sm text-yellow-ffb [&>svg]:drop-shadow-gold": props.status === 'pending' || props.status === 'counting',
                "game-active text-10 text-yellow-ffb [&>svg]:drop-shadow-gold": props.status === 'started' ,
                "game-inactive text-sm text-gray-9a": props.status === 'ended',

             }}>
             <PVPMinesIcon additionClasses="w-[30px] h-[30px]  " />
             <span>{
             props.status === 'ended'
             ? 'ENDED'
             : props.status === 'started' 
               ? 'STARTED'
               : `${Object.keys(props.players).length}/${props.playersRequired}`
               }</span>
           </div>
           <div class="flex flex-col w-full gap-3  ">
              <div class="flex gap-2  items-center">
                <PlayersInfo
                  status={props.status}
                  players={props.players} 
                  playersQty={props.playersRequired}
                  game={props.game}
                   
                />
                <PvpMinesQtyInfo quantity={props.minesQty} />
              </div>
              <div class="flex gap-2 mx-auto w-fit sm:w-full">
                <PvpMinesGameInfo
                  onJoinGame={props.status === 'pending' && props.joinToGame } 
                  status={props.status}
                  playersQty={props.playersRequired}
                  totalValue={ props.game.winner?.value || props.status === 'started' && (props.game.value * props.playersRequired) ||  props.game.value} 
                  />
                <PreviewButton link={`${URL.GAMEMODES.PVP_MINES}?pvpid=${props.gameId}`} />
              </div>
           </div>
        </div>
        
    )
}

export default PvpMinesLobbyCard