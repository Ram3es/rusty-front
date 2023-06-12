import { createEffect, createSignal, For } from 'solid-js'
import injector from '../../../injector/injector'
import Modal from '../Modal'

import { NavLink } from 'solid-app-router'

import TransparentButton from '../../elements/TransparentButton'
import GoldRay from '../../icons/GoldRay'
import Ranks from '../../../utilities/Ranks'
import RankLabel from '../../chat/RankLabel'

const tabVariants = [
  {
    name: 'Profile'
  },
  {
    name: 'Game History'
  },
  {
    name: 'Transactions'
  },
  {
    name: 'Settings'
  },
  {
    name: 'Old Seeds'
  },
  {
    name: 'Current Trades'
  }
]

const NewProfile = (props) => {
  const { socket, setToggles, toastr, userObject } = injector

  const [currentTab, setCurrentTab] = createSignal(tabVariants[0].name)

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true
      }}
    >
      <NavLink href={props.pathname()} class='w-full h-full absolute left-0 top-0' />

      <div
        class='rounded-xl flex flex-col absolute top-32 lg:w-[830px] max-h-[600px] overflow-x-scroll'
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
        <div class='px-[33px] pt-[23px] flex gap-2 items-center capitalize'>
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
        <div class='flex flex-col items-center pt-9 gap-6'>
          <div class='flex items-center justify-center'>
            <svg
              width='135'
              height='5'
              viewBox='0 0 135 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M134.842 0.157898L0 2.56579L134.842 4.97369V0.157898Z'
                fill='url(#paint0_linear_2302_110488)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_2302_110488'
                  x1='134.842'
                  y1='2.56579'
                  x2='-8.16264e-07'
                  y2='2.56584'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#FFC467' />
                  <stop offset='1' stop-color='#FFC467' stop-opacity='0' />
                </linearGradient>
              </defs>
            </svg>

            <div class='rounded-full border border-gold-ffc w-max p-[7.22px]'>
              <img
                class='w-[86.68px] rounded-full'
                src={userObject.user?.avatar || ''}
                alt='blue-box'
              />
            </div>
            <svg
              width='135'
              height='5'
              viewBox='0 0 135 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.157883 0.157898L135 2.56579L0.157883 4.97369V0.157898Z'
                fill='url(#paint0_linear_2302_110487)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_2302_110487'
                  x1='0.157884'
                  y1='2.56579'
                  x2='135'
                  y2='2.56584'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#FFC467' />
                  <stop offset='1' stop-color='#FFC467' stop-opacity='0' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            class='flex items-center h-[26px] w-[214px] gap-2 text-14 font-bold rounded pl-2 pr-2.5 py-1 shadow-button'
            style={{
              background:
                'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
              'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
            }}
          >
            <Ranks
              width={7}
              staff={userObject?.user?.rank}
              rank={userObject?.user?.level?.league}
            />
            <RankLabel staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
            <span class='text-gray-9aa truncate max-w-[116x]'>{userObject?.user?.username}</span>
          </div>
          <div class='flex justify-center items-center relative h-8 w-[497px]'>
            <div class='w-[484px] h-2 rounded-[1px] overflow-hidden home-progress-bg'>
              <div
                class='h-full rounded-[1px] duration-200'
                style={{
                  background: 'linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)',
                  width: `${
                    (userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /
                    (userObject?.user?.level?.to * 10)
                  }%`
                }}
              />
            </div>
            <div class='absolute left-0'>
              <Ranks width='8' rank={userObject?.user?.level?.league} />
            </div>
            <div class='absolute right-0'>
              <Ranks width='8' rank={userObject?.user?.level?.next} />
            </div>
            <div class='text-12 font-bold'>
              <span class='text-white'>
                {(
                  (props.account?.user?.wagered - props.account?.level?.from * 1000) /
                    (props.account?.level?.to * 10) || 0
                ).toFixed(2)}
                %
              </span>
              <span class='text-gray-64'>Progress to</span>
              <RankLabel staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewProfile
