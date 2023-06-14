import { For } from 'solid-js'

import Ranks from "../../utilities/Ranks"
import RankLabel from '../chat/RankLabel'
import AmountWithCoin from '../AmountWithCoin'


const tableHeaders = [
    "spot",
    "player",
    "wagered",
    "reward"
]

const TableLeaderboard = (props) => {
    return (
        <div class='flex flex-col gap-2 font-SpaceGrotesk font-bold text-sm'>
            <div class="hidden  sm:grid grid-cols-leaderboard-table  ml-2 mr-6">
                <For each={tableHeaders}>
                    {(title, idx) => 
                        <p 
                            class="flex capitalize text-13 text-gray-a2"
                            classList={{
                                "center": idx() === 2 ||  0,
                                "w-max ml-auto": idx() === tableHeaders.length -1
                            }}
                         >
                            {title}
                        </p>
                    }
                </For>
            </div>
            <div class=" flex flex-col gap-3">
                <For each={props.players}>
                    {(player, idx) => {
                        return (
                            <div class=' grid grid-cols-leaderboard-sm sm:grid-cols-leaderboard-table gap-y-4  leaderbord-table--row  h-fit sm:h-16 items-center   py-2 sm:py-0 pr-3 sm:pr-6 '>
                                <div class=" col-span-2 sm:col-span-1 relative flex items-center">
                                    <div class="absolute left-0 leaderboard-tile spot center min-w-[48px] h-8">
                                        <span class=" text-xl font-SpaceGrotesk font-bold text-gradient--leaderboard-gold">#{idx() + 4}</span>
                                    </div>
                                </div>
                                <div class=' col-span-2 row-start-1 sm:col-span-1 sm:row-start-auto flex items-center gap-2 ml-3 sm:ml-0 '>
                                    <img 
                                        src={player.avatar} 
                                        alt='avatar' 
                                        class='rounded-full w-8 h-8' 
                                    />
                                   <div
                                        class="flex flex-wrap center gap-x-2 text-sm font-bold h-fit max-w-[214px] whitespace-nowrap px-2.5 py-1 rounded"
                                        style={{ 
                                            background: "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                                            "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)"
                                            }}
                                    >
                                        <Ranks
                                            width={5}
                                            staff={player.rank}
                                            rank={player?.level?.league}
                                        />
                                        <RankLabel
                                            staff={player.rank}
                                            rank={player?.level?.league}
                                        />
                                        <span class="text-gray-9aa truncate max-w-[100px]">
                                            {player.username}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-span-2 sm:col-span-1 row-start-1 col-start-3 sm:row-start-auto sm:col-start-auto relative flex items-center min-h-[40px] h-full w-full">
                                    <div class=" absolute inset-0 leaderboard-tile flex flex-wrap items-center justify-center gap-x-2 text-yellow-ffb text-shadow-base ">
                                        <span>Wagered</span>
                                        <AmountWithCoin
                                             widthCoin='5'
                                             fontSize='14'
                                             gradient='text-gradient--leaderboard-amount' 
                                             amount={player.wager} 
                                        />
                                    </div>
                                </div>
                                <div class=" col-span-2 sm:col-span-1 flex justify-center sm:justify-end">
                                    <AmountWithCoin
                                        widthCoin='5'
                                        fontSize='14'
                                        gradient='text-gradient--leaderboard-amount' 
                                        amount={player.reward} 
                                    />
                                </div>
                            </div>
                            
                        )
                    } }
                </For>
            </div>
        </div>
    )


}
export default TableLeaderboard