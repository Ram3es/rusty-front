import LazyLoad from "vanilla-lazyload";
import { onMount } from "solid-js";
import imagePlaceholder from "../assets/img/imagePlaceholder.png";

const LazyImage = (props) => {
  if (!document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy",
      unobserve_completed: false,
      callback_enter: (el) => {
        el.parentElement
          .querySelector(".spinnerWrapper")
          .classList.toggle("hidden");
      },
      callback_exit: (el) => {
        el.parentElement
          .querySelector(".spinnerWrapper")
          .classList.toggle("hidden");
      },
    });
  }

  onMount(async () => {
    document.lazyLoadInstance.update();
  });

  return (
    <img
      class={`lazy ${props.imageCalsses}`}
      alt={props.alt}
      src={imagePlaceholder}
      data-src={props.src}
      data-srcset={props.srcset}
      data-sizes={props.sizes}
      width={props.width}
      height={props.height}
    />
  );
};

export default LazyImage;
