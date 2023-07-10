import { For } from 'solid-js'

const Header = (props) => {
  return (
    <div class={`hidden w-full px-4 lg:grid ${props?.grid} overflow-hidden relative`}>
      <For each={props?.headings}>
        {(val) => (
          <div class='flex items-center text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize'>
            {val}
          </div>
        )}
      </For>
      {props?.type !== 'oldSeeds' && (
        <div
          class='flex items-center justify-end text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize text-right'
          onClick={() => props?.setDescending((prev) => !prev)}
        >
          Date
        </div>
      )}
    </div>
  )
}

export default Header
