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
      class={`flex items-center justify-center h-full relative w-full  `}
      style={{
        "-webkit-backface-visibility": "hidden",
        "backface-visibility": "hidden",
      }}
      onClick={() => setAnimateStart(true)}
    >
      <img
        class="absolute -z-10 w-full h-full"
        src={MinesSquare}
        alt="mines square background"
      />
      <Logo xy={props.xy} start={animateStart} />
    </div>
  );
};

export default LoadingLogo;
