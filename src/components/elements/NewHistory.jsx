import { For } from 'solid-js'
import BetHistoryItem from './BetHistoryItem'
import LiveHistoryLabel from './LiveHistoryLabel'
import TopHistoryLabel from './TopHistoryLabel'

const NewHistory = (props) => {
  return (
    <div class='relative'>
      <div class='w-full flex-col llg:flex-row flex gap-2'>
        <div class='flex flex-col gap-3'>
          <TopHistoryLabel>huge wins</TopHistoryLabel>
          <div class='flex gap-2 overflow-x-scroll'>
            <For each={props.history.sort((a, b) => b.winnings - a.winnings).slice(0, 3)}>
              {(bet) => <BetHistoryItem bet={bet} />}
            </For>
          </div>
        </div>
        <div class='relative w-full flex flex-col gap-3'>
          <div
            class='llg:block hidden w-full absolute top-3 left-0 h-full z-0'
            style={{
              background:
                'radial-gradient(61.56% 60.14% at 49.36% 35.25%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(59.25% 204.81% at 53.32% -14.26%, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)'
            }}
          />
          <LiveHistoryLabel>live bets</LiveHistoryLabel>
          <div class='flex gap-2 xl:max-w-[635px] xll:max-w-[830px] xxl:max-w-[855px] overflow-x-scroll right-semitransparent'>
            <For each={props.history.slice(0, 10)}>
              {(bet) => (
                <div class='shrink-0'>
                  <BetHistoryItem bet={bet} />
                </div>
              )}
            </For>
          </div>
          {/* <div
            class='absolute right-16 top-[58px] z-20 h-[80px] w-[0px]'
            style={{
              'box-shadow': '0px 0px 5px 16px rgba(118, 124, 255, 0.04)'
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default NewHistory
