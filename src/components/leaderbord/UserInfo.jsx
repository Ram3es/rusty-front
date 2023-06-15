import Ranks from "../../utilities/Ranks"
import RankLabel from '../chat/RankLabel'
import AvatarRay from "../icons/GoldRay"
import AmountWithCoin from "../AmountWithCoin"


const  UserInfo = (props) => {
    return (
        <>
            <div class="flex items-center justify-center">
                <AvatarRay id={props.id} color={props.color} additionalClasses="rotate-180" />  
                <div 
                    class={`rounded-full border-2 w-max p-1`}
                    style={{ "border-color" : `${props.color}` }}
                >
                    <img class="w-12 rounded-full" src={props.player.avatar || ""} alt='blue-box' />
                </div>
                <AvatarRay id={props.id} color={props.color} />
            </div>
            <div
                class="flex flex-row sm:flex-col xl:flex-row center  mx-auto gap-x-2 text-sm font-bold w-max sm:w-full xl:w-max whitespace-nowrap px-2.5 rounded"
                style={{ 
                    background: "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                    "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)"
                    }}
            >
                <div class='flex items-center gap-2'> 
                <Ranks
                    width={7}
                    staff={props?.player?.rank}
                    rank={props?.player?.level?.league}
                />
                <RankLabel
                    staff={props?.player?.rank}
                    rank={props?.player?.level?.league}
                />
                </div>
                <span class="text-gray-9aa truncate max-w-[100px]">
                    {props?.player?.username}
                </span>
            </div>
            <div class="flex flex-row sm:flex-col md:flex-row items-center gap-2 text-sm font-bold font-SpaceGrotesk text-shadow-base text-yellow-ffb">
            <span>Wagered</span>
                <AmountWithCoin
                    widthCoin='5'
                    fontSize='14'
                    gradient='text-gradient--leaderboard-amount' 
                    amount={props?.player?.wager} 
                />
            </div>
        </>
    )
}

export default UserInfo