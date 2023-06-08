import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const CaseGradientButton = (props) => {
  return (
    <div class={`${props.isFullWidth ? 'w-full' : 'w-max'} p-[1px] rounded-4 h-10 z-10 flex items-center justify-center`}
     style={{
      background: `${!props.selected && props.toggle ? `linear-gradient(32.81deg, rgba(${props.rgb}, 0.32) 0%, rgba(0, 0, 0, 0) 35.12%),linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))` : ""}`
      }}>
      <div class={`${!props.selected && props.toggle ? "bg-[#19171f]" : ''} ${props.isFullWidth ? 'w-full' : 'w-max'} h-full rounded-4`}>
        <div
          class={`h-full rounded-4 px-4 ${!props.color || props.color === 'yellow' ? `yellow-button-gradient${!props.selected  && props.toggle ? "-not-selected" : ""}` : props.color  === 'green' ? `green-button-gradient${!props.selected && props.toggle ? "-not-selected" : ""}` : `blue-button-gradient${!props.selected && props.toggle ? "-not-selected" : ""}`} rounded-4 flex center cursor-pointer ${props.isFullWidth ? 'w-full' : 'w-max'}`}
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