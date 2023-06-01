import { createEffect, createSignal, onMount } from 'solid-js'
import { NavLink } from 'solid-app-router'

import { URL } from '../../libraries/url'
import injector from '../../injector/injector'

import Modal from './Modal'
import CoinflipGameSide from './CoinflipGameSide'

import RBCoin from '../../assets/img/coinflip/rbcoin.svg'
import CoinflipSound from '../../assets/sounds/coinflip.mp3'
import CoinflipIcon from '../icons/CoinflipIcon'

const CoinflipGameModal = (props) => {
  const coinflipSoundPlay = new Audio(CoinflipSound)

  const { socket, userObject, toastr } = injector

  const [data, setData] = createSignal({})
  const [counter, setCounter] = createSignal(0)
  const [isWinBgShown, setIsWinBgShown] = createSignal(false)

  const [spun, setSpun] = createSignal(false)

  let showCoinBgTimeout

  createEffect(() => {
    console.log(userObject, 'user')
    if (props.pathname() == URL.GAMEMODES.COINFLIP_GAME) {
      setSpun(false)
      socket.emit('coinflip:connect', {}, (data) => {
        const id = props.searchParams?.id
        if (!data.error && data.data.games[id]) {
          setData(data.data.games[id])
        }
      })
    }
  })

  createEffect(() => {
    setIsWinBgShown(false)
    if ((data()?.status == 'ended' || data()?.status == 'spinning') && !spun()) {
      coinflipSoundPlay.currentTime = 0
      coinflipSoundPlay.volume = userObject.user.sounds * 0.7
      coinflipSoundPlay.play()
      setSpun(true)
    } else if (data()?.status == 'ended') {
      showCoinBgTimeout = setTimeout(() => {
        setIsWinBgShown(true)
      }, 3000)
    } else {
      clearTimeout(showCoinBgTimeout)
    }
  })

  onMount(() => {
    socket.on('coinflip:update', (data) => {
      if (data.id && data.id == props.searchParams?.id) {
        setData(data.data)
      }
    })
    setInterval(() => {
      if (data()?.status != 'open') {
        const count = Math.floor((data()?.timestamp - Date.now()) / 1000)
        setCounter(count <= 0 ? 0 : count)
      }
    }, 200)
  })

  const cancel = () => {
    socket.emit(
      'coinflip:cancel',
      {
        gameId: props.searchParams?.id
      },
      (data) => {
        if (data.msg) {
          toastr(data)
        }
      }
    )
  }

  return (
    <Modal
      open={() => {
        return true
      }}
      handler={props.handler}
      noContainer={true}
    >
      <NavLink
        class='w-full h-full absolute left-0 cursor-default top-0'
        onClick={() => setData([])}
        href={URL.GAMEMODES.COINFLIP}
      />
      <div
        class='rounded-xl flex flex-col absolute w-[350px] md:w-[650px] lg:w-[922px]'
        style={{
          background:
            'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
          'backdrop-filter': 'blur(8px)'
        }}
      >
        <div class='rounded-t-12 w-full px-9 py-5 relative transition-all duration-100 ease-out flex justify-between items-center h-[88px]'>
          <div class='flex items-center gap-2.5 text-gray-9a'>
            {userObject?.user?.id === data()?.creator?.id ||
            (userObject?.authenticated && userObject?.user?.id === data()?.opponent?.id) ? (
              <CoinflipIcon />
            ) : (
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.622 5.51862C21.5776 5.46196 20.5117 4.11498 18.6842 2.76256C16.2421 0.955282 13.585 0 10.9999 0C8.415 0 5.75782 0.955282 3.31569 2.76256C1.48824 4.11493 0.422281 5.46196 0.377828 5.51862L0 5.99998L0.377876 6.48138C0.42233 6.53804 1.48829 7.88507 3.31574 9.23749C5.75787 11.0447 8.41504 12 11 12C13.585 12 16.2421 11.0447 18.6842 9.23749C20.5117 7.88507 21.5776 6.53804 21.622 6.48138L22 5.99998L21.622 5.51862ZM10.9999 10.2033C8.69905 10.2033 6.82711 8.31772 6.82711 5.99998C6.82711 5.63685 6.87305 5.28435 6.95941 4.94801L6.00672 4.7865C5.91338 5.17583 5.86387 5.58218 5.86387 5.99998C5.86387 7.49711 6.49874 8.84753 7.51119 9.79311C6.20789 9.30817 5.09964 8.62767 4.26322 8.01223C3.22697 7.24983 2.45037 6.47876 2.00762 5.99998C2.45056 5.52105 3.22707 4.75007 4.26322 3.98773C5.09964 3.37228 6.20794 2.69178 7.51119 2.20679L8.1503 2.93246C8.89671 2.22843 9.89915 1.79666 10.9999 1.79666C13.3008 1.79666 15.1727 3.68224 15.1727 5.99998C15.1727 8.31772 13.3008 10.2033 10.9999 10.2033ZM17.7366 8.01223C16.9001 8.62767 15.7919 9.30817 14.4887 9.79311C15.5011 8.84758 16.1359 7.49716 16.1359 5.99993C16.1359 4.5027 15.5011 3.15232 14.4887 2.20674C15.792 2.69173 16.9001 3.37223 17.7366 3.98768C18.7729 4.75007 19.5495 5.52115 19.9922 5.99988C19.5493 6.4789 18.7728 7.24993 17.7366 8.01223Z'
                  fill='#9A9EC8'
                />
                <path
                  d='M8.34437 5.1828C8.26606 5.44133 8.22363 5.71558 8.22363 5.99992C8.22363 7.5443 9.46654 8.79634 10.9998 8.79634C12.5329 8.79634 13.7759 7.54435 13.7759 5.99992C13.7759 4.45548 12.5329 3.20349 10.9998 3.20349C10.253 3.20349 9.57558 3.50107 9.07658 3.98427L10.4459 5.53904L8.34437 5.1828Z'
                  fill='#9A9EC8'
                />
              </svg>
            )}

            <span class='uppercase font-bold font-SpaceGrotesk text-20'>
              {userObject?.user?.id === data()?.creator?.id ||
              (userObject?.authenticated && userObject?.user?.id === data()?.opponent?.id)
                ? `coinflip game ${data()?.id}`
                : 'spectating'}
            </span>
          </div>
          <NavLink
            class='text-gray-9a w-10 h-10 flex items-center justify-center border rounded border-[#FFFFFF0A] cursor-pointer'
            onClick={() => setData([])}
            href={URL.GAMEMODES.COINFLIP}
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
        <div class='w-full relative grid grid-cols-2 rounded-6'>
          <CoinflipGameSide
            data={data}
            left={true}
            counter={counter}
            searchParams={props.searchParams}
            isEndShow={isWinBgShown}
          />

          <div
            class='absolute z-30 transform -translate-x-1/2 left-1/2 -top-4 md:-top-12 w-[142px] md:w-[186px] h-[142px] md:h-[186px] rounded-full center'
            style={{
              background:
                'linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.03) 41.3%, rgba(0, 0, 0, 0.03) 68.93%, rgba(255, 255, 255, 0.03) 100%), radial-gradient(136.7% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
              'box-shadow': `0px 0px ${isWinBgShown() && '36px'} ${
                data()?.side === 1 ? 'rgba(235, 172, 50, 0.48)' : 'rgba(255, 255, 255, 0.48)'
              }, 0px 2px 16px rgba(0, 0, 0, 0.24)`
            }}
          >
            {data()?.status === 'ended' || data()?.status === 'spinning' ? (
              <>
                <div
                  class={`coinflip-animation transform -translate-x-2 -translate-y-2 relative z-10 ${
                    data()?.side == 1 ? 'red' : 'black'
                  }`}
                />
              </>
            ) : (
              <img
                alt='rbcoin'
                src={RBCoin}
                class={`w-[136px] duration-200 ${data()?.status === 'counting' && 'opacity-40'}`}
              />
            )}
            {isWinBgShown() && (
              <div
                class={`opacity-100 transform scale-50 transition-opacity duration-500 blur-lg won-ping absolute z-0 left-0 top-0 w-full h-full rounded-full`}
              />
            )}
            <div
              class={`opacity-0 ${
                isWinBgShown() && 'opacity-100'
              } transform scale-60 transition-opacity duration-700 blur-sm absolute z-0 left-0 top-0 w-full h-full rounded-full`}
            />
            <p
              class={`text-28 text-white font-semibold absolute ${
                data()?.status === 'counting' ? '' : 'hidden'
              }`}
            >
              {counter()}s
            </p>
          </div>
          <div
            class='absolute transform -translate-x-1/2 left-1/2 -top-0 h-full w-0.5 center'
            style={{
              background:
                'linear-gradient(87.89deg, rgba(26, 27, 48, 1) 1.79%, rgba(0, 0, 0, 0.08) 100.01%, rgba(0, 0, 0, 0) 98.24%)'
            }}
          />

          <CoinflipGameSide
            data={data}
            left={false}
            counter={counter}
            searchParams={props.searchParams}
            isEndShow={isWinBgShown}
          />
        </div>
        <div
          class='text-center py-[23px] space-y-1 text-gray-9a text-11 font-SpaceGrotesk font-medium px-2'
          style={{
            background:
              'radial-gradient(102.36% 100% at 50% 0%, rgba(118, 124, 255, 0) 0%, rgba(118, 124, 255, 0.06) 100%), linear-gradient(89.63deg, #1A1B30 0.32%, #191C35 99.68%)'
          }}
        >
          <p class='truncate'>Server seed hash: {data()?.hash}</p>
          <div class='flex items-center justify-center gap-3'>
            <p>Game ID: {data()?.id}</p>
            {data()?.ticket && <p class='text-yellow-ffb'>Ticket: {data()?.ticket}</p>}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CoinflipGameModal
