import Coin from '../../utilities/Coin'
import GoldText from '../mines_new/MISC/GoldText'
import ToolTipInfoIcon from "../../assets/img/case/ToolTipInfoIcon.svg"
import { getCurrencyString } from '../mines_new/utils/tools'

const CaseToolTip = (props) => {
  return (
    <div
    class='relative font-SpaceGrotesk font-semibold min-w-[167px] flex gap-1 items-center justify-center py-[6px] rounded flex-col text-[12px]
    text-shadow-lg shadow-sm shadow-black ' 
    style={{
      color: 'rgba(162, 165, 198, 1)', 
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(50% 100% at 50% 0%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), radial-gradient(100% 242.42% at 100% 50%, #1D2352 0%, #1D1F30 100%)'
    }}
  >
 {props.name}
 <div class="flex gap-1 items-center justify-center w-full">
    <Coin width="4"/> 
    <GoldText text={getCurrencyString(props.price)}
      size={"12"} />
 </div>
 <div class="bg-[#1617275C] h-[1px] w-[100%]"/>
 <div class="flex gap-1  items-center justify-center">
    <img src={ToolTipInfoIcon} alt="tool tip info icon" />
   <span class="w-full text-center">
   Right Click for drops
   </span>
 </div>
 {/* <div class="absolute w-0 h-0 -bottom-2  border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#242945]"/> */}
 <div 
  class="absolute -bottom-[11px] text-10 text-[#242945] " 
  style={{
    display: 'inline-block',
    "-webkit-transform": 'scale(2,1)', /* Safari and Chrome */
    "-moz-transform": 'scale(2,1)', /* Firefox */
    "-ms-transform": 'scale(2,1)', /* IE 9 */
    "-o-transform": 'scale(2,1)', /* Opera */
    transform: 'scale(2,1)', /* W3C */
    'text-shadow': '20 20 50px black'
  }}
>
  ▼
</div>
</div>
  )

  // 232843
}

export default CaseToolTip;