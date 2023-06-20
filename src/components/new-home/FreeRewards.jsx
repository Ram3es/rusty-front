import { For } from "solid-js";
import Bajoonga from "../../assets/img/home/rewards/Bajoonga.png"
import FreeCases from "../../assets/img/home/rewards/FreeCases.png"
import FlashCodes from "../../assets/img/home/rewards/FlashCodes.png"
import CreatorCode from "../../assets/img/home/rewards/CreatorCode.png"
import DiscordGiveaways from "../../assets/img/home/rewards/DiscordGiveaways.png"
import TriviaEvents from "../../assets/img/home/rewards/TriviaEvents.png"
import ClaimRakeback from "../../assets/img/home/rewards/ClaimRakeback.png"
import TwitterGiveaways from "../../assets/img/home/rewards/TwitterGiveaways.png"

const rewards = [
    {
        name: "Climb the Bajoonga",
        image: Bajoonga
    },
    {
        name: "Unbox Daily Free Cases",
        image: FreeCases
    },
    {
        name: "Redeem \nFlash Codes",
        image: FlashCodes
    },
    {
        name: "Redeem Creator Code",
        image: CreatorCode
    },
    {
        name: "Discord Giveaways",
        image: DiscordGiveaways
    },
    {
        name: "Trivia \nEvents",
        image: TriviaEvents
    },
    {
        name: "Instantly Claim Rakeback",
        image: ClaimRakeback
    },
    {
        name: "Twitter Giveaways",
        image: TwitterGiveaways
    }
]

const FreeRewards  = () => {
    return (
        <div class='max-w-[1152px] w-full mx-auto'>
            <div class=" flex flex-col gap-1 center text-sm font-SpaceGrotesk text-white font-medium mb-6"> 
                <h2 class='font-bold text-2xl gold-text-originals'>Free Rewards</h2>
                <span class=''>Explore all the rewards we offer to our players!</span>
            </div>
            <div class='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 w-full gap-4'>
                <For each={rewards} >
                    {(r) => <div class='home-rewards flex items-center flex-col py-1 px-4 overflow-hidden justify-between'>
                        {r.image ? <><img
                        src={r.image}
                        alt="rotating dome"
                        class="h-16"
                        />
                        <img
                        src={r.image}
                        alt="rotating dome"
                        class="absolute h-28 right-1/2 top-1/4 -rotate-12 opacity-5"
                        />
                        </> : ""}
                        <div class="text-center text-13 font-SpaceGrotesk font-bold text-gray-9a whitespace-pre-line">
                            {r.name}
                        </div>
                    </div> }
                </For>
            </div>
        </div>
    )
}

export default FreeRewards