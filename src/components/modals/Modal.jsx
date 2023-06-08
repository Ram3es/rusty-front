import { Show } from "solid-js";

export default function Modal (props) {

  return (
    <>
      <Show when={props.open()} fallback={<div />}>
        <div class={`z-40 fixed top-0 left-0 w-full h-full opacity-100 items-center justify-center`}>
            <div class={`relative w-full h-full max-h-full ${props?.style ? props.style : "center"} overflow-y-scroll`}>
              <div
                class="fixed top-0 left-0 w-full h-full bg-opacity-50" style={{
                    "backdrop-filter": "blur(5px)",
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(100% 316.05% at 0% 0%, rgba(29, 31, 62, .5) 0%, rgba(27, 29, 52, .5) 100%)"
                }}
               />
                {props.children}
            </div>
        </div>
      </Show>
    </>
  )
}
