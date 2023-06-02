import { For } from 'solid-js'
import LiveHistoryLabel from '../../components/elements/LiveHistoryLabel'
import TopHistoryLabel from '../../components/elements/TopHistoryLabel'
import RecentDropsItem from './RecentDropsItem'

const HistoryDrops = (props) => {
  return (
    <div class='relative h-[176px]'>
      <div class='w-full flex-col llg:flex-row flex gap-2'>
        <div class='flex flex-col gap-3'>
          <TopHistoryLabel>top drops</TopHistoryLabel>
          <div class='flex gap-2 overflow-x-scroll'>
            <For
              each={props
                .data()
                ?.recentDrops.sort((a, b) => b.item_price - a.item_price)
                .slice(0, 3)}
            >
              {(drop) => <RecentDropsItem drop={drop} _case={props._case} />}
            </For>
          </div>
        </div>
        <div class='w-full flex flex-col gap-3'>
          <LiveHistoryLabel>live drops</LiveHistoryLabel>
          <div class='flex gap-2 xl:max-w-[635px] xll:max-w-[830px] xxl:max-w-[855px] overflow-x-scroll right-semitransparent'>
            <For each={props.data()?.recentDrops || []}>
              {(drop) => (
                <div class='shrink-0'>
                  <RecentDropsItem drop={drop} _case={props._case} />
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
      <div
        class='llg:block hidden w-full absolute top-3 left-0 h-full z-0'
        style={{
          background:
            'radial-gradient(61.56% 60.14% at 49.36% 35.25%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(59.25% 204.81% at 53.32% -14.26%, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)'
        }}
      />
    </div>
  )
}

export default HistoryDrops
