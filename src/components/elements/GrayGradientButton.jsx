import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const GrayGradientButton = (props) => {
  return (
    <div
      class={`${props.additionalClass ?? 'h-10 w-max px-4 gap-3' } relative bg-gray-button-gradient border-[#FFFFFF0A]  border center rounded-4 cursor-pointer flex items-center 
        transition duration-300  ${!props.noShadow && "drop-shadow-lg hover:shadow-2xl text-shadow-lg shadow-black"} hover:border-[#FFFFFF1A] `}
      onClick={(e) => {
        e.stopPropagation()
        playOptionClickSound();
        if (props.callbackFn) props.callbackFn();
      } }
    >
      {props.children}
    </div>
  )
}

export default GrayGradientButton;