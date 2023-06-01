import { For } from 'solid-js'
import RecentDropsItem from './RecentDropsItem'

const RecentDrops = (props) => {
    return (
        <div class='flex flex-col gap-2 flex-1 overflow-hidden'>
            <p class='text-yellow-ffb font-medium text-base capitalize font-SpaceGrotesk'>
                {' '}
                recent drops{' '}
            </p>
            <div class='w-full h-full'>
                <div class='w-full h-full flex gap-2 overflow-x-scroll overflow-y-hidden'>
                    <For each={props.data()?.recentDrops || []}>
                        {(drop) => <RecentDropsItem drop={drop} _case={props._case} />}
                    </For>
                </div>
            </div>
        </div>
    )
}

export default RecentDrops
