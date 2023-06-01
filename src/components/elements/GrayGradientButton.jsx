import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const GrayGradientButton = (props) => {
  return (
    <div
      class={`${props.additionalClass ?? 'h-10 w-max px-4 gap-3' } relative bg-gray-button-gradient border-black border-opacity-5 border center rounded-4 cursor-pointer flex items-center `}
      onClick={(e) => {
        e.stopPropagation()
        playOptionClickSound();
        props.callbackFn();
      } }
    >
      {props.children}
    </div>
  )
}

export default GrayGradientButton