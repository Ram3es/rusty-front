import { createEffect, createSignal } from "solid-js";
import LoadingLogo from "../mines_new/LoadingLogo/LoadingLogo"
import ExplodedMine from "../mines_new/PlayArea/MineField/ExplodedMine"
import Safe from "../mines_new/PlayArea/MineField/Safe"

const PvpMinesSquare = (props) => {

  const [isFlipped, setIsFlipped] = createSignal(false);
  const [isMine, setIsMine] = createSignal(false);
  const [startAnimation, setStartAnimation] = createSignal(false);
  const [isClicked, setIsClicked] = createSignal(false);

  const handleClick = () => {
    if (isClicked()) return;
    setIsClicked(true);
    setStartAnimation(true)
    const isResponsed = props.onClick();
    if (!isResponsed) setStartAnimation(false)
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  createEffect(() => {
    if (props.isFlipped) {
      setStartAnimation(true)
      setStartAnimation(true)
      if (typeof props.isMine == "boolean") {
        setStartAnimation(false)
        setIsFlipped(true)
        setIsMine(props.isMine)
      }
    }
  })

  return (
    
    <div class={`w-[96px] h-[96px]`} style="perspective: 1000px">
      <div
        class={`relative w-full h-full transition-all duration-[0.2s] rounded-lg border-[#FFFFFF08] border-[1px] ${
          startAnimation() ? "pointer-events-none" : "cursor-pointer"
        }
          ${isClicked() && "scale-75"}

          
        `}
        style={`background: linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.02) 41.3%, rgba(0, 0, 0, 0.02) 68.93%, rgba(255, 255, 255, 0.02) 100%), radial-gradient(100% 100% at 50% 0%, rgba(255, 180, 54, 0.08) 0%, rgba(255, 180, 54, 0) 100%), radial-gradient(100% 100% at 50% 0%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 187.54% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%), #212547;
        transform-style: preserve-3d;
                ${isFlipped() && "transform: rotateY(180deg);"}
                
                `}
        onClick={handleClick}
      >
        <div
          class={`w-full h-full absolute 
          
          `}
          style="-webkit-backface-visibility: hidden; 
                    backface-visibility: hidden;"
        >
          <LoadingLogo animateStart={startAnimation} xy={props.id} />
        </div>

        {isMine() ? <ExplodedMine /> : <Safe isMine={isMine} hasLost={() => false} />}
      </div>
    </div>
  )
}

export default PvpMinesSquare