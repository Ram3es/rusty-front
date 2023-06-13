import { createSignal, onMount } from "solid-js";

import PageLoader from "../components/PageLoader";

const Fallback = ({ children, loaded, type, ignoreItems }) => {

    const [isItemsLoaded, setIsItemsLoaded] = createSignal(ignoreItems || false);
    const [isPageLoaded, setIsPageLoaded] = createSignal(ignoreItems || false);
    let pageWrapper;

    onMount(() => {
        if(!ignoreItems) checkImageLoaded();
    });

    const checkImageLoaded = () => {
        const updateStatus = (images) => {
            setIsItemsLoaded(() => {
                const isLoaded = images.map((image) => image.complete || image.src.includes('avatar')).every((item) => item === true);
                // if (!isLoaded) images.forEach(image => {
                //     if (!image.complete) console.log(image, image.complete)
                // })
                return isLoaded
            });
            if (isItemsLoaded()) {
                setIsPageLoaded(true)
            }
        };

        const imagesLoaded = Array.from(pageWrapper.querySelectorAll("img"));

        if (imagesLoaded.length === 0) {
            setIsItemsLoaded(true);
            setIsPageLoaded(true)
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
          <div class="w-full h-max center">
              <div class={`w-full h-full min-h-[calc(100vh-130px)] ${loaded() && isItemsLoaded() && isPageLoaded() ? "hidden" : "center"}`}>
                  {
                      type == "skull" ? (
                          <svg class="zoom-in" width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <ellipse cx="35.3839" cy="36" rx="35.3839" ry="36" fill="url(#paint0_linear_1804_2)"/>
                              <path d="M35.3841 7.63635C19.9872 7.63635 7.50586 20.3351 7.50586 36C7.50586 51.6649 19.9872 64.3636 35.3841 64.3636C50.7809 64.3636 63.2622 51.6649 63.2622 36C63.2622 20.3351 50.7809 7.63635 35.3841 7.63635ZM54.524 44.8324C54.524 47.6152 52.2987 49.8793 49.5635 49.8793H47.5786V51.6044C47.5786 53.5754 46.0025 55.1789 44.0653 55.1789C42.8659 55.1789 41.8059 54.563 41.1716 53.627C40.5372 54.563 39.4772 55.1789 38.2778 55.1789C37.0784 55.1789 36.0184 54.563 35.3841 53.627C34.7497 54.563 33.6897 55.1789 32.4897 55.1789C31.2903 55.1789 30.2303 54.563 29.5959 53.627C28.9615 54.563 27.9015 55.1789 26.7022 55.1789C25.3702 55.1789 24.2092 54.4206 23.6133 53.3068C23.5457 53.1802 23.485 53.0491 23.433 52.9135C23.2756 52.5076 23.1889 52.0664 23.1889 51.6044V49.8793H21.204C19.3237 49.8793 17.6839 48.809 16.8432 47.2358C16.7478 47.0568 16.6623 46.8721 16.5886 46.6811C16.3662 46.1082 16.2441 45.4848 16.2441 44.8324V36.2943C16.2441 25.5565 24.83 16.8211 35.3847 16.8211C40.4765 16.8211 45.2771 18.8526 48.9025 22.5411C49.6056 23.2565 50.2363 24.023 50.8143 24.8216C51.5404 25.825 52.176 26.882 52.6946 27.9939C53.8927 30.5605 54.524 33.3804 54.524 36.295V44.8324Z" fill="white"/>
                              <path d="M28.4066 33.4327C26.6961 33.4327 25.3047 34.8484 25.3047 36.5887C25.3047 38.3289 26.6961 39.7446 28.4066 39.7446C30.1171 39.7446 31.5085 38.3289 31.5085 36.5887C31.5085 34.8484 30.1171 33.4327 28.4066 33.4327Z" fill="white"/>
                              <path d="M42.3611 33.4327C40.6512 33.4327 39.2598 34.8484 39.2598 36.5887C39.2598 38.3289 40.6512 39.7446 42.3611 39.7446C44.0715 39.7446 45.463 38.3289 45.463 36.5887C45.463 34.8484 44.0715 33.4327 42.3611 33.4327Z" fill="white"/>
                              <defs>
                              <linearGradient id="paint0_linear_1804_2" x1="35.3839" y1="0" x2="35.3839" y2="85.7727" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#7667FF"/>
                              <stop offset="1" stop-color="#292450"/>
                              </linearGradient>
                              </defs>
                          </svg>
                      ) : (
                        <PageLoader isShown={true} clipId="clip2" />
                      )
                  }
              </div>
              <div ref={pageWrapper} class={`${loaded() && isItemsLoaded() && isPageLoaded() ? "fade-in" : "hidden"} w-full h-full`}>
                  {children}
              </div>
          </div>
      </>
    )
  }
  
  export default Fallback;