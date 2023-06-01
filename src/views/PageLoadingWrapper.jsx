import { createSignal, onMount } from "solid-js";
import PageLoader from "../components/PageLoader";

const PageLoadingWrapper = (props) => {
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false)
  let pageWrapper;

  onMount(() => {
      checkImageLoaded()
  });

  const checkImageLoaded = () => {
    const updateStatus = (images) => {
        setIsItemsLoaded(
          images.map((image) => image.complete).every((item) => item === true)
        );
        if (isItemsLoaded()) {
          props.setIsPageLoaded(true)
        }
      };

      const imagesLoaded = Array.from(pageWrapper.querySelectorAll("img"));

      if (imagesLoaded.length === 0) {
        setIsItemsLoaded(true);
        return;
      }
      imagesLoaded.forEach((image) => {
        image.addEventListener("load", () => updateStatus(imagesLoaded), {
          once: true
        });
        image.addEventListener("error", () => updateStatus(imagesLoaded), {
          once: true
        });
      });
  }

  return (
    <>
      <div ref={pageWrapper} class={`${isItemsLoaded() || props.isPageLoaded() ? 'block' : 'hidden'}`}>
        {props.children}
      </div>
      { !isItemsLoaded() && !props.isPageLoaded() ? <div class="flex w-full h-full justify-center items-center">
        <PageLoader isShown={true} clipId="clip2" />
      </div> : '' }
    </>
  )
  
}

export default PageLoadingWrapper