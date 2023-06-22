import { For } from 'solid-js'

export default function ScaleLine (props) {
    
    const league = (props.currentLeague * 4 ) + 2
    const progressPercent = Math.floor(props.currentProgres / 25)
    return (
        <div class='w-full h-6 flex items-end justify-between px-6'>
            <For each={Array.from({length: 39}, (_,idx) => idx )}>
                {(idx) => {
                    return <div class={`
                                ${idx <= league + progressPercent || idx <= 2  ? 'bg-yellow-ffb' : `${idx % 4 === 0 ? 'bg-white/20' : 'bg-white/10' }` }
                                ${idx % 4 === 0  ? 'w-[2px]' : 'w-[1px]'}
                                ${(idx + 2)  % 4 === 0 ? 'h-full ' : 'h-2'}`}/>
                }}
            </For>

        </div>
    )

}