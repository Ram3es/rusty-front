import { For } from 'solid-js'
import BetHistoryItem from './BetHistoryItem'

const NewHistory = (props) => {
  return (
    <div class='relative'>
      <div class='w-full flex-col llg:flex-row flex gap-2'>
        <div class='flex flex-col gap-3'>
          <div class='z-10 w-[100px] flex items-center justify-center gap-1 py-[3px] px-1.5 label_background--gradient__gold rounded border border-transparent'>
            <svg
              width='13'
              height='12'
              viewBox='0 0 13 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.9544 3.70649C11.1671 0.131781 11.222 0.240664 11.2106 0.220471C11.1317 0.0808787 10.9846 0.000191418 10.8335 0.000191418C10.7707 0.000191418 2.16139 -0.000906345 2.12756 0.0021559C1.9813 0.0150404 1.85101 0.102228 1.78254 0.23324C1.78141 0.235435 1.78011 0.237515 1.77901 0.239711L0.0456391 3.70646C0.0442525 3.70921 0.0430969 3.71204 0.0417969 3.71481C0.0407569 3.71695 0.0396013 3.71903 0.0386191 3.72119C0.0378969 3.72275 0.0373768 3.72437 0.0366835 3.72593C0.0366546 3.72599 0.0366257 3.72605 0.0366257 3.72611C-0.0288659 3.87517 -0.00641907 4.05169 0.1031 4.18068C0.104457 4.18232 0.1057 4.18403 0.107115 4.18562L6.17391 11.1191C6.17464 11.1199 6.17545 11.1206 6.17617 11.1214C6.34641 11.313 6.64946 11.3177 6.82389 11.1214C6.82461 11.1206 6.82542 11.1199 6.82614 11.1191L12.8929 4.18562C12.8933 4.18527 12.8935 4.18489 12.8938 4.18452C13.0045 4.0572 13.0353 3.86818 12.9544 3.70649ZM10.1323 0.866865L9.02608 3.07934L7.36672 0.866865H10.1323ZM8.23342 3.46694H4.76667L6.50004 1.15578L8.23342 3.46694ZM5.63337 0.866865L3.97401 3.07931L2.86779 0.866865H5.63337ZM2.16662 1.40253L3.19886 3.46694H1.13441L2.16662 1.40253ZM1.38823 4.33361H3.59966L5.25824 8.75651L1.38823 4.33361ZM6.50004 9.59961L4.5253 4.33361H8.47479L6.50004 9.59961ZM7.74184 8.75654L9.40042 4.33364H11.6119L7.74184 8.75654ZM9.80129 3.46694L10.8335 1.40253L11.8657 3.46694H9.80129Z'
                fill='url(#paint0_linear_849_34586)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_849_34586'
                  x1='-0.309524'
                  y1='2.04853'
                  x2='13.4543'
                  y2='4.62333'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#FFDF36' />
                  <stop offset='0.698927' stop-color='white' />
                  <stop offset='1' stop-color='#FFF1A5' />
                  <stop offset='1' stop-color='#FFDF36' />
                </linearGradient>
              </defs>
            </svg>
            <p class='uppercase text-gradient-gold text-12 font-Quicksand font-bold'>huge wins</p>
          </div>
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
          <div class='relative z-10 w-[100px] flex items-center justify-center gap-1.5 py-[3px] px-1.5 label_background-gradient__red rounded border border-transparent'>
            <span class='flex h-1 w-1 relative text-red-ff5'>
              <span
                class='animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform'
                style={{
                  'box-shadow': '0px 0px 5px 1px rgba(255, 88, 88, 0.72)'
                }}
              />
              <span class='relative inline-flex rounded-full h-1 w-1 bg-current' />
            </span>
            <p class='uppercase text-red-ff6 text-12 font-Quicksand font-bold'>live bets</p>
          </div>
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
