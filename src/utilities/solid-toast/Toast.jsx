import { createSignal, onCleanup, onMount } from "solid-js";
import CloseButton from "../../components/elements/CloseButton";
import ribbed from '../../assets/img/ribbedSmall.png';

const Toast = (props) => {
  let countdown;
  let lifetime = 3 * 1000; // SECONDS
  const removeFromCountdown = 500;

  const [hover, setHover] = createSignal(false);
  const [removed, setRemoved] = createSignal(false);

  const _timer = () => {
    setTimeout(() => {
      if (removed()) return;
      if (!hover()) {
        lifetime -= removeFromCountdown;

        if (lifetime <= 0) return props.remove();
      }
      _timer();
    }, removeFromCountdown);
  };

  onMount(() => {
    _timer();
  });

  onCleanup(() => {
    setHover(false);
    setRemoved(true);
  });

  const stringToHtml = (text) => {
    let parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.body.innerHTML;
  };

  const types = {
    success: {
      icon: (
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1C14.6718 1.36923 9.75214 7.15385 6.33333 11L1 6" stroke="#27F278" stroke-width="2"/>
        </svg>
      ),
      color: "#27F278",
      name: "Success",
      bg: "linear-gradient(90deg, rgba(39, 242, 120, 0.08) 0%, rgba(39, 242, 120, 0) 100%), radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)"
    },
    error: {
      icon: (
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.6713 7L12.4141 12.3356L10.9193 13.6644L6.33334 8.5052L1.74742 13.6644L0.252603 12.3356L4.99539 7L0.252594 1.66436L1.74741 0.335632L6.33334 5.4948L10.9193 0.335632L12.4141 1.66436L7.6713 7Z" fill="#9A9EC8"/>
        </svg>
      ),
      color: "#9A9EC8",
      name: "Error Encountered",
      bg: "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)"
    },
  };

  return (
    <>
      <div
        class={`w-full relative sm:w-120 rounded-6 p-4 flex gap-4 items-center overflow-hidden toastr-animation ${types?.[props.type] == "success" ? "success" : ""}`}
        // onMouseOver={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        style={{
          background: types?.[props.type]?.bg,
        }}
      >
        <img src={ribbed} class=' absolute inset-0 min-h-full min-w-full' />
        <div class="toast-countdown center relative z-10">
          {types?.[props.type]?.icon}
          <svg class="toast-countdown-svg">
            <circle r="16" cx="18" cy="18" stroke={types?.[props.type].color} />
          </svg>
        </div>
        <div class="flex gap-4 grow relative z-10">
          <div class="flex flex-col gap-1.5">
            <p
              class="text-16  font-bold font-SpaceGrotesk leading-none"
              style={{
                color: types?.[props.type].color
              }}
            >
              {types?.[props.type]?.name}
            </p>
            <p class="text-14 text-white font-bold font-SpaceGrotesk">
              {stringToHtml(props.msg)}
            </p>
          </div>
        </div>
        <div
          class="relative z-10"
          onClick={() => props.remove()}
        >
          <CloseButton isRelative={true} />
        </div>
      </div>
    </>
  );
};

export default Toast;
