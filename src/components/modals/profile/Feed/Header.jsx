import { For } from 'solid-js'

const Header = (props) => {
  return (
    <div class={`w-full px-4 grid ${props?.grid} overflow-hidden relative`}>
      <For each={props?.headings}>
        {(val) => (
          <div class='flex items-center text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize'>
            {val}
          </div>
        )}
      </For>
      <div
        class='flex items-center justify-end text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize text-right'
        onClick={() => props?.setDescending((prev) => !prev)}
      >
        Date
      </div>
    </div>
  )
}

export default Header
