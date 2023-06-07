import { For } from "solid-js";
import BattleIcon from '../../../components/icons/BattleIcon'

export const TilesLabel = (props) => {

    return (
      <div class='absolute top-0 left-0 w-[142px] h-10 center shadow-button home-tile-label '>
        {props.children}
      </div>
    )
  }

const RustyOriginals = () => {

    return (
    <div class='max-w-[1152px] w-full mx-auto'>
        <div class=" flex flex-col gap-1 center text-sm font-SpaceGrotesk text-white font-medium mb-6"> 
            <h2 class='font-bold text-2xl gold-text-originals'> RustyLoot Originals</h2>
            <span class=''>Try out our fun & immersive gamemodes!</span>
        </div>
        <div class="grid grid-cols-home-original gap-x-6 gap-y-8 w-full ">
            <For each={Array.from({length: 3}, (_,i) => i + 1)}>
                {(index) => 
                <div class="col-span-5 home-originals h-[200px]">
                  <TilesLabel >
                    <div class='flex items-center gap-2 text-gray-9a font-SpaceGrotesk font-bold'>
                      <BattleIcon  additionClasses='w-5 h-5 text-gray-55' />
                      <span>Case Battles</span>
                    </div>
                  </TilesLabel>
                </div>
              }
            </For>
            <For each={Array.from({length: 5}, (_,i) => i + 1)}>
              {(index) => 
                <div class=" col-span-5 lg:col-span-3 home-originals-secondary h-[272px] relative ">
                  <TilesLabel >
                    <div class='flex items-center gap-2 text-gray-9a font-SpaceGrotesk font-bold'>
                      <BattleIcon  additionClasses='w-5 h-5 text-gray-55' />
                      <span>Case Battles</span>
                    </div>
                  </TilesLabel>
                </div>
              }
            </For>
        </div>
    </div>
    )
    
}
export default RustyOriginals