import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const CaseGradientButton = (props) => {
  return (
    <div class={` rounded-4 h-10 z-10 flex items-center justify-center ${props.classList ?? 'p-[1px]' }`}
     style={{
      background: `${!props.selected && props.toggle ? `linear-gradient(32.81deg, rgba(${props.rgb}, 0.32) 0%, rgba(0, 0, 0, 0) 35.12%),linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))` : ""}`
      }}>
      <div class={`${!props.selected && props.toggle && "bg-[#19171f]"} h-full rounded-4 w-full`}>
        <div
          class={`h-full rounded-4 px-4 ${
            !props.color || props.color === 'yellow' ? `yellow-button-gradient${!props.selected  && props.toggle ? "-not-selected w-full" : ""}` 
            : props.color  === 'green' ? `green-button-gradient${!props.selected && props.toggle ? "-not-selected" : ""}` 
            : props.color  === 'blue' ? `blue-button-gradient${!props.selected && props.toggle ? "-not-selected" : ""}`
            : 'mint-button-gradient' } rounded-4 flex center cursor-pointer ${props.isFullWidth ? 'w-full' : 'w-max'}`}
          onClick={() => {
            playOptionClickSound();
            if (props.callbackFn) props.callbackFn();
          } }
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default CaseGradientButton