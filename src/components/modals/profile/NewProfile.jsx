import { createSignal, For } from 'solid-js'
import { createStore } from 'solid-js/store'

import injector from '../../../injector/injector'
import Modal from '../Modal'

import { NavLink } from 'solid-app-router'

import TransparentButton from '../../elements/TransparentButton'

import BgMainVector from '../../../assets/img/coinflip/bgItemsRL.png'

import { useI18n } from '../../../i18n/context'
import { createEffect } from 'solid-js'
import NewProfileAccount from './NewProfileAccount'
import NewProfileHistory from './NewProfileHistory'

const tabVariants = [
  {
    name: 'profile'
  },
  {
    name: 'game history'
  },
  {
    name: 'transactions'
  },
  {
    name: 'settings'
  },
  {
    name: 'old seeds'
  },
  {
    name: 'current trades'
  }
]

const NewProfile = (props) => {
  const i18n = useI18n()

  const { socket, setToggles, toastr, userObject } = injector

  const [account, setAccount] = createStore({})
  const [currentTab, setCurrentTab] = createSignal(tabVariants[0].name)

  createEffect(() => {
    if (props.searchParams?.profile && userObject?.authenticated) {
      console.log('FETCHING SYSTEM DATa!')
      socket.emit('system:account', {}, (data) => {
        console.log(data, 'system data fetched! ')
        const pfIds = {}
        for (const val of data.data.history) {
          if (!pfIds?.[val.pf_id] || Number(pfIds?.[val.pf_id].t_id) < Number(val.t_id))
            pfIds[val.pf_id] = val
        }
        data.data.history = Object.values(pfIds).sort((a, b) => b.id - a.id)

        // console.log("new data", data.data.history);

        setAccount(data.data)

        if (data.msg) {
          toastr(data)
        }
      })
    }
  })

  createEffect(() => {
    console.log(currentTab(), 'CurrentTAB')
  })

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true
      }}
    >
      <NavLink href={props.pathname()} class='w-full h-full absolute left-0 top-0' />

      <div
        class={`rounded-xl flex flex-col absolute lg:top-32 overflow-x-scroll`}
        classList={{
          'xl:w-[1208px] xl:h-[935px] h-[80%] w-[80%]': currentTab() === 'game history',
          'md:w-[650px] lg:w-[830px] w-[85%] h-[870px]': currentTab() === 'transactions',
          'md:w-[650px] lg:w-[830px] w-[85%] max-h-[600px]':
            currentTab() !== 'game history' && currentTab() !== 'transactions'
        }}
        style={{
          background:
            'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
          'backdrop-filter': 'blur(8px)'
        }}
      >
        <div class='border border-black/20 w-full px-8 py-6 relative transition-all duration-100 ease-out flex gap-3 lg:gap-0 justify-between items-center h-[88px]'>
          <div class='text-white font-SpaceGrotesk text-20 flex flex-col'>
            <span class='uppercase'>profile</span>
            <span class='text-gray-64 text-12'>Overview of your RustyLoot stats.</span>
          </div>
          <NavLink
            href={props.pathname()}
            class='text-gray-9a w-10 h-10 flex items-center justify-center border rounded border-[#FFFFFF0A] cursor-pointer'
          >
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z'
                fill='currentColor'
              />
            </svg>
          </NavLink>
        </div>
        <div class={`relative px-[33px] pt-[23px] ${currentTab() !== 'profile' ? 'pb-6' : 'pb-9'}`}>
          <div
            class='absolute inset-0 -z-10 h-[326px] bg-repeat-x mix-blend-luminosity'
            style={{ 'background-image': `url('${BgMainVector}')`, opacity: 0.002 }}
          />
          <div class='flex gap-2 items-center capitalize flex-wrap'>
            <For each={tabVariants}>
              {(tab) => (
                <TransparentButton
                  callbackFn={() => setCurrentTab(tab.name)}
                  isActive={currentTab() === tab.name}
                >
                  {tab.name}
                </TransparentButton>
              )}
            </For>
          </div>
          {currentTab() === 'profile' && <NewProfileAccount account={account} />}
          {currentTab() === 'game history' && (
            <NewProfileHistory account={account} type='history' />
          )}
          {currentTab() === 'transactions' && (
            <NewProfileHistory account={account} type='transaction' />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default NewProfile
