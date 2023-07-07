import { createSignal, For, Match, Switch } from "solid-js";
import GrayGradientButton from '../../components/elements/GrayGradientButton'
import ArrowDown from "../../components/icons/ArrowDown";
import Coin from "../../utilities/Coin";
import RankLabel from "../../components/chat/RankLabel"
import Ranks from '../../utilities/Ranks'
import GoldText from "../mines_new/MISC/GoldText";

const RangeVariantButton = (props) => {
  return (
    <GrayGradientButton
      callbackFn={props.callbackFn}
      additionalClass='w-4 h-4 shadow-button text-gray-9a' 
      noShadow
    > 
      <ArrowDown isOpen={props.isOpen} />
    </GrayGradientButton>
  )
}
const RangeVariantItems = (props) => {
  return(
    <div class='flex gap-2 items-center text-yellow-ffb'>
      <Coin width='5' />
      {props.activeName.includes('-') ? (() => {
          const [min, max] = props.activeName.split('-');
          return<><GoldText text={min}  size="14"/><GoldText text=" - " /><GoldText text={max}  size="14"/></>
        } 
          ) : (
            <GoldText text={props.activeName} />
      )}
    </div>
  )
}
const RankVariantItems = (props) => {
  return (
    <div class='flex gap-2 items-center'>
      <Ranks rank={props.activeName} />
      <RankLabel rank={props.activeName} />
    </div>
  )
}



const Dropdown = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  let dropdownWrapper;

  const handleClick = (event) => {
    if (
      dropdownWrapper &&
      !dropdownWrapper.contains(event.target)
    ) {
      setIsOpen(false); 
    }
  };

  document.addEventListener("mousedown", handleClick);

  return (
    <div class="relative" classList={{'w-full': props.isFullWidth}} ref={dropdownWrapper}>
      <GrayGradientButton
        callbackFn={() => {
        setIsOpen((prev) => !prev)
      }}
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
       >
        <div class="flex gap-1.5 text-13 font-bold w-full font-SpaceGrotesk px-2 items-center">
          <span class={`text-gray-9a w-max whitespace-nowrap` }>
            {props.label}
          </span>
          <span class="flex center gap-1.5 text-yellow-ffb w-full">
            <Switch>
              <Match when={!props.variant}>
                <span class="capitalize w-full">{props.activeName}</span>
                <ArrowDown isOpen={!isOpen()} />
              </Match>
              <Match when={props.variant === 'range'}>
                <RangeVariantItems activeName={props.activeName}/>
                <RangeVariantButton 
                  isOpen={!isOpen()} 
                  callbackFn={() => {setIsOpen((prev) => !prev)}} />
              </Match>
              <Match when={props.variant === 'level'}>
                <RankVariantItems activeName={props.activeName}  />
                <RangeVariantButton 
                  isOpen={!isOpen()} 
                  callbackFn={() => {setIsOpen((prev) => !prev)}} />
              </Match>
            </Switch>
          </span>
        </div>
      </GrayGradientButton>
      <ul
        class={`${
          isOpen() ? "" : "hidden"
        } absolute w-full right-0 z-40 mt-2 p-2 font-Oswald text-14 text-white rounded-4 border border-white border-opacity-5 overflow-auto`}
        style={{ background: 'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 1) 0%, rgba(29, 31, 48, 1) 100%)' }}
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3" 
      >
        <For each={props.itemsList}>
          {(item) => (
              <li
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  props.submitItem(item);
                }}
                class="text-gray-900 relative select-none py-2 pl-3 pr-9 cursor-pointer"
                id="listbox-option-0"
                role="option"
              >
                <Switch>
                  <Match when={!props.variant}>
                    <span class="flex gap-1 items-center text-14 text-yellow-ffb capitalize">
                      {item}
                    </span>
                  </Match>
                  <Match when={props.variant === 'level'}>
                    <RankVariantItems activeName={item} />
                  </Match>
                  <Match when={props.variant === 'range'}>
                    {/* <RangeVariantItems activeName={item}/> */}
                    {item.includes('-') ? (() => {
                      const [min, max] = item.split('-');
                      return<><GoldText text={min}  size="14"/><GoldText text=" - " /><GoldText text={max}  size="14"/></>
                    } 
                     ) : (
                       <GoldText text={item} />
                  )}

                  </Match>
                </Switch>
              </li>
            )
          }
        </For>
      </ul>
    </div>
  )
}

export default Dropdown
