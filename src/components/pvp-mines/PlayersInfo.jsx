import {For} from 'solid-js'
import UserGameAvatar from '../battle/UserGameAvatar'

const PlayersInfo = (props) => {
    return (
        <div class="w-full h-12 flex gap-2 center users-wrapper-gradient py-1.5 px-1 ">
            <For each={Array.from(Array(props.playersQty).keys())}>
                {(userIndex) => (
                    <UserGameAvatar
                      isBot={props?.players?.[userIndex]?.bot}
                      widthClasses="w-8 h-8"
                      color={(props?.status == "started" && userIndex && props.game?.turn %  props.game?.playersAmount == props.players?.index)
                        ? "#FFB436"
                        : (props?.status == "ended" &&  props.game?.winner?.player?.index == userIndex)
                           ? "#86FFB6"
                           : props?.status == "pending" || props?.status == "counting"  || ( props.game?.status !== "ended" && props.players[userIndex] && props.game?.turn % props.game?.playersAmount !== props.players[userIndex] && !props.players?.[userIndex]?.eliminated)
                             ? "#FFB436"
                             : "#D63333"}
                      avatar={props.players[userIndex]?.avatar || ''}
                      isTransparentImage=
                      { (props.game?.status !== "pending") && (props.game?.status !== "counting") && (!(props.game?.status === "started" && (props.game?.status == "started" && props.players[userIndex]  && props.game?.turn % props.game?.playersAmount == userIndex) || 
                         (props.game?.status === "ended" && props.game?.winner?.player?.index == userIndex)))}
                      eliminated={props?.players?.[userIndex]?.eliminated}
                  />    
                )}
            </For>
        </div>

    )
}
export default PlayersInfo