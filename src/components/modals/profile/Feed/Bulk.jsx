import { For } from 'solid-js'
import Header from './Header'
import stripped from '../../../../assets/img/home/leaderboard/stripped-mask.png'

const Bulk = (props) => {
  return (
    <div class='w-full h-full flex flex-col gap-2'>
      <Header
        descending={props?.descending}
        setDescending={props?.setDescending}
        headings={props?.data?.headings}
        grid={props?.data?.grid}
        type={props?.type}
      />
      <div class='w-full flex-1 overflow-hidden flex flex-col gap-2'>
        <For each={props?.loaded()}>
          {(val) => (
            <div
              class={`w-full px-4 py-4 lg:h-14 grid ${props?.data?.grid} overflow-hidden rounded-6 relative place-content-center`}
              style={{
                background:
                  'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, #1A1C33 50.01%, rgba(25, 28, 51, 0.85417) 57.05%, rgba(25, 28, 53, 0.35) 98.24%), rgba(0, 0, 0, 0.24)'
              }}
            >
              <img
                src={stripped}
                alt='stripped'
                class='absolute top-0 left-0 w-auto min-w-full h-full'
              />

              <props.data.structure val={val} resendTrades={props?.resendTrades} />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default Bulk
