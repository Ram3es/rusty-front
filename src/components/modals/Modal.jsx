import { Show } from "solid-js";

export default function Modal (props) {

  return (
    <>
      <Show when={props.open()} fallback={<div />}>
        <div class={`z-40 fixed top-0 left-0 w-full h-full opacity-100 items-center justify-center`}>
            <div class={`relative w-full h-full max-h-full ${props?.style ? props.style : "center"} overflow-y-scroll`}>
              <div
                class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" style={{
                    "backdrop-filter": "blur(2px)"
                }}
               />
                {props.children}
            </div>
        </div>
      </Show>
    </>
  )
}
