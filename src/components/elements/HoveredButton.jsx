import buttonBgYellowWithGradient from "../../assets/img/header/buttonBgYellowWithGradient.jpg"
import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";

const HoveredButton = (props) => {
  return (
    <div
      class={`px-6 py-2 rounded-2 text-14 hover:brightness-110 active:brightness-75 ${props.isActive ? "text-dark-1b1" : "text-gray-8c"} ${props.isFullWidth ? 'w-full' : 'w-max'} ${props.hasBorder ? 'border-b-[2px] border-yellow-8f' : ''} bg-cover bg-dark-20 justify-center cursor-pointer flex gap-2 h-full items-center font-Lato font-extrabold`}
      style={{
        'background-image': props.isActive ? `url(${ buttonBgYellowWithGradient})` : '',
        'background-size': '100% 104%'
      }}
      onClick={() => {
        playOptionClickSound();
        props.callbackFn();
      } }
    >
      {props.children}
  </div>
  )
}

export default HoveredButton
