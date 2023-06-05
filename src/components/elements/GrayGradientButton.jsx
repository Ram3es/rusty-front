import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const GrayGradientButton = (props) => {
  return (
    <div
      class={`${props.additionalClass ?? 'h-10 w-max px-4 gap-3' } relative bg-gray-button-gradient border-[#FFFFFF0A]  border center rounded-4 cursor-pointer flex items-center 
      drop-shadow-lg shadow-black transition duration-300  hover:shadow-2xl hover:border-[#FFFFFF1A] text-shadow-lg`}
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

export default GrayGradientButton;