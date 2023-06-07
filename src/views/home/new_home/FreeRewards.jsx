import { For } from "solid-js";

const FreeRewards  = () => {
    return (
        <div class='max-w-[1152px] w-full mx-auto'>
            <div class=" flex flex-col gap-1 center text-sm font-SpaceGrotesk text-white font-medium mb-6"> 
                <h2 class='font-bold text-2xl gold-text-originals'>Free Rewards</h2>
                <span class=''>Explore all the rewards we offer to our players!</span>
            </div>
            <div class='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 w-full gap-4'>
                <For each={Array.from({ length: 8 }, (_,idx) => idx)} >
                    {(index) => <div class=' h-[68px] home-rewards'></div> }
                </For>
            </div>
        </div>
    )
}

export default FreeRewards