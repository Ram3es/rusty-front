import { createSignal, createEffect } from "solid-js";
import Logo from "./Logo.jsx";
import { Power1, TimelineMax } from "gsap";

const LoadingLogo = (props) => {
  let tl;
  let pathLength;

  const startAnimation = () => {
    const pathElement = document.querySelector(`.draw${props.xy}`);
    pathLength = pathElement.getTotalLength();
    pathElement.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathElement.style.strokeDashoffset = pathLength;

    tl = new TimelineMax({ repeat: -1, repeatDelay: 0.1 });
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
    if (props.animateStart()) {
      startAnimation();
    } else {
      if (tl) {
        stopAnimation();
      }
    }
  });

  return (
    <div
      class={`flex items-center justify-center h-full 

      `}
      style="-webkit-backface-visibility: hidden; 
                    backface-visibility: hidden;"
    >
      <Logo xy={props.xy} start={props.animateStart} />
    </div>
  );
};

export default LoadingLogo;
