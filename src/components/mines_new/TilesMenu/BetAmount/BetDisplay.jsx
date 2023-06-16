import { createEffect, createSignal} from "solid-js";
import CoinLogo from "../../MISC/CoinLogo";
import GoldText from "../../MISC/GoldText";
import AdjustBtn from "../../MISC/AdjustBtn";
import { getCurrencyString } from "../../utils/tools";
const BetDisplay = (props) => {
  const [isActive, setActive] = createSignal(false)
  let inputRef;

  const halveBet = (e) => {
    e.stopPropagation()
    props.callbackFn(props.betAmount() / 2);
  };

  const doubleBet = (e) => {
    e.stopPropagation()
    props.callbackFn(props.betAmount() * 2);
  };

  const clearBet = (e) => {
    e.stopPropagation()
    props.callbackFn(0);
  };
  const onBlur = () =>{
    if(props.betAmount() === ''){
      props.callbackFn(0)
    }
    setActive(prev => !prev)
  }

  createEffect(() => {
    props.variant === 'input' && isActive() && inputRef.focus()
  })

  return (
    <div
      class="w-full min-w-max p-[2px] rounded-[4px] h-full"
      style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

"
    >
      <div
        class="flex w-full px-2 py-1.5 rounded-[4px] justify-between items-center h-full"
        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));

          "
      >
        <div 
           onClick={() => {
            props.variant && setActive(prev => !prev)
          }}
          class={`flex gap-2 items-center ${ props.variant === 'input' && 'cursor-pointer' }  ${ isActive() && 'pointer-events-none'}` }>
          <CoinLogo h="16" />
          {props.variant === 'input' && isActive() 
           ?  
           <input
             ref={inputRef}
             class="max-w-[80px] h-full gold-text text-[14.3719px] font-SpaceGrotesk font-bold pb-0.5"
             type="number"
             onInput={(e) =>  props.callbackFn(e.target.value)}
             value={props.betAmount()}
             onBlur={onBlur}
         />
           : <GoldText text={getCurrencyString(props.betAmount())} />}
          
        </div>
        <div class={`flex gap-3 h-full items-center ${isActive() && 'pointer-events-none'}`}>
          <AdjustBtn text={"1/2"} onClick={halveBet} small={props.small} />
          <AdjustBtn text={"x2"} onClick={doubleBet} small={props.small} />
          <div class="h-[175%] w-[1px] bg-[#1C1F3D]" />
          <AdjustBtn text={"Clear"} onClick={clearBet} small={props.small} />
        </div>
      </div>
    </div>
  );
};

export default BetDisplay;
