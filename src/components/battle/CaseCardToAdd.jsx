import headerLogoBgVector from "../../assets/img/header/headerLogoBgVector.png"
import Coin from "../../utilities/Coin"
import GradientButton from "../elements/GradientButton"
import TransparentButton from "../elements/TransparentButton"

const CaseCardToAdd = (props) => {
  return (
    <div class={`case-card-background border border-opacity-5 group h-[256px] w-[216px] flex flex-col ${
      props.isAdded && props.isActiveBorderShown ? 'border-yellow-ffb border-1 border-opacity-100' : 'border-transparent'
     } relative rounded-6 overflow-hidden`}
     onClick={() => {
        if (!props.isAdded){
          props.onAddCase();
        }

     }}>
    <div
      class=" absolute left-0 top-0 w-full h-full z-0 opacity-60 group-hover:opacity-100"
      style={{
        'background-image': `url('${headerLogoBgVector}')`
      }}
    />
    <div class={`relative grow z-10 px-4 ${!props.isAdded && "pb-5"} pb-2 pt-0 flex flex-col justify-end items-center`}>
      <img class={`absolute h-[110px] group-hover:rotate-6 top-4 ${props.isAdded ? "scale-[1.4]" :  "scale-150" }`} src={props.item.image ? props.item.image.replace('{url}', window.origin) : ''} alt={props.item.name} />
      <div class="h-[110px]" />
      {!props.isAdded ? <><div class="w-full block group-hover:hidden mt-5">

        <TransparentButton 
          callbackFn={() => {}}
          isActive={false}
          isFullWidth={true}
        >
          <span class="truncate">{props.item.name}</span>
        </TransparentButton>
      </div>
      <div class="w-full hidden group-hover:block mt-5">
        <GradientButton
          isFullWidth={true}
          isActive={true}
          callbackFn={() => props.onAddCase()}
        >
          <div class="center gap-2">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22203 0.777771C5.79248 0.777771 5.44425 1.12599 5.44425 1.55555V6.22222H0.777777C0.348223 6.22222 -1.87756e-08 6.57044 0 6.99999C1.87756e-08 7.42955 0.348223 7.77777 0.777777 7.77777H5.44425V12.4444C5.44425 12.874 5.79248 13.2222 6.22203 13.2222C6.65159 13.2222 6.99981 12.874 6.99981 12.4444V7.77777H11.6667C12.0962 7.77777 12.4444 7.42955 12.4444 6.99999C12.4444 6.57044 12.0962 6.22222 11.6667 6.22222H6.99981V1.55555C6.99981 1.12599 6.65159 0.777771 6.22203 0.777771Z" fill="#FFB436"/>
            </svg>
            <span>Add Case</span>
          </div>
        </GradientButton>
      </div>
      </> : <span class="text-12 text-gray-9a font-SpaceGrotesk font-bold mt-2">{props.item.name}</span>}
    </div>
    <div class="w-full center h-max flex-col gap-2 center py-3 bg-dark-radial-gradient group-hover:bg-dark-to-yellow min-h-[48px] relative z-10"
    >
      <div class="flex gap-1">
        <Coin />
        <span class="text-gradient text-16 font-SpaceGrotesk font-bold">{props.item.price}</span>
      </div>
      {props.isAdded && props.children && <div class="w-full flex justify-between items-center">
        {props.children}
      </div>}
    </div>
  </div>
  )
}

export default CaseCardToAdd