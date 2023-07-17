import {createSignal, createEffect} from "solid-js";
import Logo from "./Logo.jsx";
import {Power1, TimelineMax} from "gsap";
import MinesSquare from "../../assets/img/mines/MinesSquare.svg";
import Injector from "../../injector/injector.jsx";

const LoadingLogo = (props) => {
  const {userObject, setUserObject} = Injector;
  let tl;
  let pathLength;

  const [animateStart, setAnimateStart] = createSignal(false);
  const startAnimation = () => {
    const pathElement = document.querySelector(`.draw${props.xy}`);
    pathLength = pathElement.getTotalLength();
    pathElement.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathElement.style.strokeDashoffset = pathLength;

    tl = new TimelineMax({repeat: -1, repeatDelay: 0.1});
    tl.to(`.draw${props.xy}`, 0.8, {
      strokeDashoffset: 0,
      ease: Power1.easeIn,
    }).to(`.draw${props.xy}`, 0.8, {
      strokeDashoffset: -pathLength,
      ease: Power1.easeIn,
    });
  };

  const stopAnimation = () => {
    tl.kill();
  };

  createEffect(() => {
    if (props.mines.status !== "playing" || userObject?.user?.isSpamming) {
      setAnimateStart(false);
    }
    if (animateStart()) {
      startAnimation();
    } else {
      if (tl) {
        stopAnimation();
      }
    }
  });

  return (
    <div
      class={`flex items-center justify-center h-full relative w-full rounded-md `}
      style={{
        "-webkit-backface-visibility": "hidden",
        "backface-visibility": "hidden",
        background: `linear-gradient(45deg, rgba(255, 255, 255, 0.00) 20.07%, rgba(255, 255, 255, 0.02) 41.30%, rgba(0, 0, 0, 0.02) 68.93%, rgba(255, 255, 255, 0.02) 100%), radial-gradient(100.00% 100% at 50% 0.00%, rgba(255, 180, 54, 0.08) 0%, rgba(255, 180, 54, 0.00) 100%), radial-gradient(100% 100% at 50% -0.00%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0.00) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.02) 100%), radial-gradient(206.96% 100.00% at 100.00% 50.00%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%), #212547`,
      }}
      onClick={() => setAnimateStart(true)}
    >
      {/* <img
        class="absolute -z-10 w-full h-full"
        src={MinesSquare}
        alt="mines square background"
      /> */}
      <Logo xy={props.xy} start={animateStart} />
    </div>
  );
};

export default LoadingLogo;
