import ToggleButton from "../../../components/ToggleButton"
import { For, createSignal } from "solid-js";
import stripped from "../../../assets/img/home/leaderboard/stripped-mask.png"
import BattleIcon from '../../../components/icons/BattleIcon'
import Ranks from "../../../utilities/Ranks"
import RankLabel from '../../../components/chat/RankLabel'
import Coin from '../../../utilities/Coin'

const filterOption = [
    {name: "All Wins"},
    {name: "High Rollers"},
    {name: "Lucky Wins"}
]

export const GameModeLabel = (props) => (
    <div class="h-9 px-3 rewards-gamemode-label w-fit center shadow-button">
        {props.children}
    </div>
)
export const ResultTiles = (props) => {
    return (
        <div class='flex items-center' >
            <div class={`${props.rate <= 1 && 'mix-blend-luminosity'} px-3 py-0.5 rounded font-SpaceGrotesk font-bold text-sm `}
              style={{ background: 'linear-gradient(78.67deg, rgba(92, 222, 144, 0.12) 0%, rgba(92, 222, 144, 0) 98.84%)'} 
            }>
                <span class=' text-green-secondary'>{props.rate || 1.75 }x</span>
            </div>  
            </div>
            
    )

} 

export const RewardsTable = () => {
    const [filterBy, setFilter] = createSignal(filterOption[0].name)
    return (
        <div class='max-w-[1152px] w-full  mx-auto flex flex-col gap-6 '>
            <div class="flex gap-3 font-bold font-SpaceGrotesk text-sm h-10">
                <For each={filterOption}>
                    {(option) =>(
                        <ToggleButton
                            handleFunction={() => setFilter(option.name)}
                            isActive={filterBy() === option.name}
                            activeClass='border-yellow-ffb text-white'
                            additionalClass='shadow-button'   
                        >
                            {option.name}
                        </ToggleButton> )
                    }
                </For>
            </div>
            <div class=" grid grid-cols-rewards-table mx-3 text-13 font-SpaceGrotesk font-bold text-gray-a2">
                <p>Gamemode</p>
                <p>Player</p>
                <p>Bet Amount</p>
                <p>Result</p>
                <p class='w-max ml-auto'>Profit</p>
            </div>
            <div class="w-full flex flex-col gap-1">
                <For each={Array.from({length: 10 }, (_,idx) => idx  )}>
                    {(row) => (
                        <div 
                         class='h-14 shadow-button relative rewards-row-table py-2.5 px-3'
                        >
                            <img 
                               src={stripped} 
                               alt="stripped" 
                               class='absolute top-0 left-0 w-full h-full' 
                            />
                             <div class=' grid grid-cols-rewards-table'>
                               <GameModeLabel>
                                    <div class='flex items-center gap-2 text-sm text-gray-9a font-SpaceGrotesk font-bold'>
                                        <BattleIcon  additionClasses='w-5 h-5 text-gray-55' />
                                        <span>Case Battles</span>
                                    </div>
                               </GameModeLabel>
                               <div class='flex items-center gap-2'>
                                <img 
                                    src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1102.jpg' 
                                    alt='avatar' 
                                    class='rounded-full w-8 h-8' 
                                />
                                   <div
                                        class="flex flex-wrap center gap-2 text-sm font-bold h-fit max-w-[214px] whitespace-nowrap px-2.5 py-1 rounded"
                                        style={{ 
                                            background: "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                                            "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)"
                                            }}
                                    >
                                        <Ranks
                                            width={5}
                                            staff={7}
                                            rank={'bronze'}
                                        />
                                        <RankLabel
                                            staff={7}
                                            rank={"gold1"}
                                        />
                                        <span class="text-gray-9aa truncate max-w-[100px]">
                                            {"Terry"}
                                        </span>
                                    </div>
                               </div>
                               <div class='flex items-center'>
                                    <Coin width='6' />
                                    {2230.00}
                               </div>
                               <ResultTiles rate={0.43} />
                               <div class='flex items-center justify-end gap-2'>
                               <Coin width='6' />
                                {row}
                                </div>
                            </div>
                            
                        </div>
                    ) }
                </For>
            </div>

            

        </div>

    )
}

export default RewardsTable