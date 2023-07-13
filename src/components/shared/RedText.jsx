import { onMount, onCleanup, createSignal } from "solid-js";
import { useDebounce } from "../../utilities/hooks/debounce";

const RedText = (props) => {
  const [innerWidth, setInnerWidth] = createSignal(window.innerWidth);
  
  const handleChangeInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  };

  onMount(() => {
    window.addEventListener('resize', useDebounce(handleChangeInnerWidth, 1000));
  });

  onCleanup(() => {
    window.removeEventListener('resize', useDebounce(handleChangeInnerWidth, 1000));
  })

  return (
    <div
      class={`font-bold`}
      style={{
        background: `linear-gradient(0deg, #D63333, #D63333),
        radial-gradient(100% 100% at 50% 0%, rgba(239, 246, 255, 0.317167) 0%, rgba(121, 183, 255, 0) 100%)`,
        "-webkit-background-clip": "text",
        "-moz-background-clip": "text",
        "background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
        color: "transparent",
        "font-size": `${props.size ? (innerWidth() > 1023 ? props.size : props.size * 0.7) : "20"}px`,
      }}
    >
      {props.processed ? (
        <>
          {props.text.slice(0, -2)}
          <span
            style={{
              "font-size": `${(props.size / (innerWidth() > 1023 ? 1.2 : 1.6)).toString()}px`,
            }}
          >
            {props.text.slice(-2)}
          </span>
        </>
      ) : (
        <>{props.text}</>
      )}
    </div>
  );
};

export default RedText;
