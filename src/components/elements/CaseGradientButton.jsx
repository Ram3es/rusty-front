import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const CaseGradientButton = (props) => {
  return (
    <div
      class={`h-10 z-10 px-4 ${!props.color || props.color === 'yellow' ? 'yellow-button-gradient' : props.color === 'green' ? 'green-button-gradient' : 'blue-button-gradient'} rounded-4 flex center cursor-pointer ${props.isFullWidth ? 'w-full' : 'w-max'}`}
      onClick={() => {
        playOptionClickSound();
        if (props.callbackFn) props.callbackFn();
      } }
    >
      {props.children}
    </div>
  )
}

export default CaseGradientButton