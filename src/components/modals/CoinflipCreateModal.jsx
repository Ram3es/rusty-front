import { createEffect, createSignal, For } from 'solid-js'
import injector from '../../injector/injector'
import { URL } from '../../libraries/url'
import Coin from '../../utilities/Coin'
import Modal from './Modal'

import { NavLink, useNavigate } from 'solid-app-router'
import Items from './Items'
import { useI18n } from '../../i18n/context'

import RedCoin from '../../assets/img/coinflip/redcoin.svg'
import BlackCoin from '../../assets/img/coinflip/blackcoin.svg'

import clickDepositSound from '../../assets/sounds/deposit.wav'
const soundClickDeposit = new Audio(clickDepositSound)

import { playSelectItemSound } from '../../utilities/Sounds/ItemsSound'
import CloseButton from '../elements/CloseButton'
import CaseSearchInput from '../../views/case/CaseSearchInput'
import Dropdown from '../elements/Dropdown'
import RoundedButton from '../elements/RoundedButton'
import PotentialDropItem from '../../views/case/PotentialDropItem'

const sortOptions = ['ASC', 'DESC']

const CoinflipCreateModal = (props) => {
  const { socket, setUserObject, setToggles, toastr, userObject } = injector

  const i18n = useI18n()

  const navigate = useNavigate()

  const [search, setSearch] = createSignal('')

  const [items, setItems] = createSignal([])
  const [itemCache, setItemCache] = createSignal([])
  const [activeItems, setActiveItems] = createSignal([])
  const [descending, setDescending] = createSignal(true)
  const [settings, setSettings] = createSignal({
    value: 0,
    amount: 0
  })

  createEffect(() => {
    let temp = {
      value: 0,
      amount: 0
    }

    for (const item of activeItems()) {
      temp.amount++
      temp.value += item.price
    }
    setSettings(temp)
  })

  const [side, setSide] = createSignal(1)

  createEffect(() => {
    if (
      props.pathname() == URL.GAMEMODES.COINFLIP_CREATE ||
      props.pathname() == URL.GAMEMODES.COINFLIP_JOIN
    ) {
      socket.emit('steam:inventory', {}, (data) => {
        if (data.msg) {
          toastr(data)
        }

        if (!data.error) {
          setItems(data.data.items)
          setActiveItems([])
        }
      })
    }
  })

  const deposit = () => {
    const selectedItems = activeItems()
    if (selectedItems.length > 0 && selectedItems.length < 30) {
      if (userObject?.user?.sounds) {
        soundClickDeposit.currentTime = 0
        soundClickDeposit.volume = userObject.user.sounds
        soundClickDeposit.play()
      }

      // toastr({
      //     error: false,
      //     msg: "Generating tradeoffer..."
      // })

      socket.emit(
        'coinflip:deposit',
        {
          items: selectedItems.map((item) => item.id),
          side: side()
        },
        (data) => {
          if (data.msg) {
            toastr(data)
          }

          if (!data.error && data?.data?.link) {
            navigate(URL.GAMEMODES.COINFLIP_GAME, { replace: true })

            setToggles('tradeModal', true)
            setUserObject('trades', (prev) => [
              ...prev,
              {
                link: data.data.link,
                type: 'deposit',
                expires: Date.now() + 1000 * 60 * 5
              }
            ])
          }
        }
      )
    }
  }

  const join = () => {
    const id = props.searchParams?.id
    const selectedItems = activeItems()
    if (id && selectedItems.length > 0 && selectedItems.length < 30) {
      socket.emit(
        'coinflip:deposit',
        {
          items: selectedItems.map((item) => item.id),
          gameId: id,
          join: true
        },
        (data) => {
          if (data.msg) {
            toastr(data)
          }

          if (!data.error) {
            navigate(`${URL.GAMEMODES.COINFLIP_GAME}?id=${id}`, {
              replace: true
            })
          }

          if (!data.error && data?.data?.link) {
            setToggles('tradeModal', true)
            setUserObject('trades', (prev) => [
              ...prev,
              {
                link: data.data.link,
                type: 'deposit',
                expires: Date.now() + 1000 * 60 * 5
              }
            ])
          }
        }
      )
    }
  }

  let spinArrow
  let id = null

  const refresh = () => {
    let pos = 0
    clearInterval(id)
    id = setInterval(frame, 10)
    function frame() {
      if (pos == 360) {
        clearInterval(id)
      } else {
        pos += 10
        spinArrow.style.transform = `rotate(-${pos}deg)`
      }
    }

    setItems([])

    socket.emit('steam:inventory:refresh', {}, (data) => {
      if (data.msg) {
        toastr(data)
      }

      if (data.error) {
        setItems(itemCache())
      }

      if (
        (!data.error && props.searchParams?.deposit && props.searchParams?.items) ||
        props.pathname() == URL.GAMEMODES.COINFLIP_CREATE
      ) {
        setItems(data.data.items)
        setItemCache(data.data.items)
        setActiveItems([])
      }
    })
  }

  const toggle = (item) => {
    // setItems((prev) => prev.map((item) => (item.id == itemId ? {...item, active: !item.active} : item)));
    setActiveItems((prev) => {
      const index = prev.findIndex((i) => {
        return item.id === i.id
      })
      if (index === -1) return [...prev, item]
      const copy = [...prev]
      copy.splice(index, 1)
      return copy
    })
    playSelectItemSound()
  }

  const autoSelect = () => {
    const limits = {
      upper: Math.round(props.searchParams.value * 1.02),
      lower: Math.round(props.searchParams.value * 0.98)
    }
    const temp = {
      items: items()
        .filter((item) => item.price <= limits.upper)
        .sort((a, b) => b.price - a.price),
      value: 0,
      selectedIds: []
    }

    for (const item of temp.items) {
      if (item.price <= limits.upper - temp.value) {
        temp.value += item.price
        temp.selectedIds.push(item.id)
        if (temp.value >= limits.lower) {
          return setActiveItems(() => items().filter((item) => temp.selectedIds.includes(item.id)))
        }
      }
    }
  }

  const changeDescending = () => {
    setDescending((prev) => !prev)
    setItems((prev) => [...prev].sort((a, b) => (b.price - a.price) * (descending() ? 1 : -1)))
  }

  // const sorting = {
  //   descending: {
  //     en: 'Descending',
  //     es: 'Descendiendo',
  //     ru: 'по убыванию'
  //   },
  //   ascending: {
  //     en: 'Ascending',
  //     es: 'Ascendente',
  //     ru: 'по возрастанию'
  //   }
  // }

  // const game = {
  //   createGame: {
  //     en: 'CREATING COINFLIP',
  //     es: 'Unete al',
  //     ru: 'Создать'
  //   },
  //   joinGame: {
  //     en: 'JOIN COINFLIP',
  //     es: 'Unirse',
  //     ru: 'Присоединиться'
  //   }
  // }

  return (
    <Modal
      open={() => {
        return true
      }}
      handler={() => {}}
      noContainer={true}
    >
      <NavLink
        class='w-full h-full absolute left-0 cursor-default top-0'
        onClick={() => setItems([])}
        href={URL.GAMEMODES.COINFLIP}
      />
      <div
        class={`flex flex-col z-10 relative w-11/12 rounded transition-all transform -translate-y-1/4 ${
          props.open ||
          props.pathname() == URL.GAMEMODES.COINFLIP_CREATE ||
          props.pathname() == URL.GAMEMODES.COINFLIP_JOIN
            ? '-translate-y-0'
            : ''
        } duration-100 ease-out`}
        style={{
          'max-width': '1496px',
          'max-height': '90vh'
        }}
      >
        <div
          class='w-full flex-1 overflow-hidden overflow-y-scroll relative flex flex-col rounded-12'
          style={{
            background:
              'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
            'backdrop-filter': 'blur(8px)'
          }}
        >
          <div
            class='flex relative w-full items-center justify-between pl-4 pr-8 lg:pr-0 lg:px-8 py-4 lg:py-6 bg-cover border border-black border-opacity-10 rounded-t-12'
            style={{
              background:
                'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)'
            }}
          >
            <div class='w-full flex justify-between items-center'>
              <p class='text-20 text-white font-bold font-SpaceGrotesk uppercase truncate'>
                {props.pathname() == URL.GAMEMODES.COINFLIP_JOIN
                  ? i18n.t('coinflip.Join coinflip')
                  : i18n.t('coinflip.Create')}
              </p>
            </div>
            <NavLink href={URL.GAMEMODES.COINFLIP} onClick={() => setItems([])} class='flex items-center justify-between'>
              <CloseButton />
            </NavLink>
          </div>
          <div class='flex w-full flex-col xl:flex-row min-h-full justify-between'>
            <div class={`w-full px-4 lg:px-8 flex flex-col grow gap-[18px] lg:gap-8 py-4`}>
              <div class='w-full h-20 lg:h-10 flex flex-col items-center lg:items-end lg:flex-row justify-between gap-2 relative z-10'>
                <div class='flex items-center gap-2 h-full w-full'>
                  <div class='w-full lg:w-80'>
                    <CaseSearchInput
                      search={search()}
                      onReset={() => setSearch('')}
                      onInput={(text) => setSearch(text)}
                      isFullWidth
                      placeholderOverride='Search for items...'
                    />
                  </div>
                  <Dropdown
                    activeName={descending() ? sortOptions[0] : sortOptions[1]}
                    itemsList={sortOptions}
                    submitItem={() => changeDescending()}
                    label='Sort by Price:'
                  />
                </div>
                <div class='center gap-2 w-full'>
                  <div class='w-full balance-bg rounded-4 flex items-center drop-shadow-dark'>
                    <div class='bg-black w-full bg-opacity-10 rounded-4 h-9 flex m-0.5'>
                      <div class='w-full h-full px-[11px] lg:px-4 bg-cover py-1 text-16 text-gray-e0 rounded-4 flex gap-[9px] lg:gap-[10.3px] items-center font-SpaceGrotesk font-bold'>
                        <div class='flex items-center gap-[9.2px]'>
                          <Coin width='6' />
                          <p class='text-gradient text-16 font-bold font-SpaceGrotesk'>
                            {items()
                              .reduce((prev, cur) => (prev += cur.price), 0)
                              .toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                          </p>
                        </div>
                        <span class='text-gradient text-14 uppercase truncate w-[80px] ssm:w-full'>Inventory Value</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class={`bg-gray-button-gradient h-10 w-12 p-2 rounded-4 border border-white/10 ${
                      props.searchParams?.deposit ||
                      props.pathname() == URL.GAMEMODES.COINFLIP_CREATE ||
                      props.pathname() == URL.GAMEMODES.COINFLIP_JOIN
                        ? 'center'
                        : 'hidden'
                    }`}
                    onClick={refresh}
                  >
                    <svg
                      ref={spinArrow}
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13.9597 5.18935C13.8128 4.95467 13.4993 4.90051 13.2808 5.06301L11.7596 6.20423C11.5692 6.34751 11.5161 6.6112 11.6369 6.81673C12.0228 7.47363 12.2188 8.17676 12.2188 8.90688C12.2188 11.2333 10.3263 13.1875 8 13.1875C5.67366 13.1875 3.78125 11.2333 3.78125 8.90688C3.78125 6.73892 5.42462 4.94813 7.53125 4.71423V6.09438C7.53125 6.48295 7.97706 6.69929 8.28106 6.46929L12.0311 3.65679C12.2812 3.46963 12.2809 3.09385 12.0311 2.90698L8.28106 0.0944781C7.97597 -0.136553 7.53125 0.0820719 7.53125 0.469384V1.8912C3.87188 2.13335 0.96875 5.18754 0.96875 8.90688C0.96875 12.7842 4.12275 16 8 16C11.8772 16 15.0312 12.7842 15.0312 8.90688C15.0312 7.59495 14.6605 6.30954 13.9597 5.18935Z'
                        fill='#9A9EC8'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <Items
                isCoinflipPage={true}
                items={() => {
                  return items().filter(
                    (item) =>
                      !search() ||
                      String(item.name).toLowerCase().includes(String(search()).toLowerCase())
                  )
                }}
                descending={descending}
                toggle={toggle}
                activeItems={activeItems}
              />
            </div>
            <div
              class={`min-w-[288px] flex flex-col justify-center sm:justify-end items-center border border-white/[0.04]`}
              style={{
                background: 'linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)'
              }}
            >
              <div
                class={`hidden lg:flex w-full flex-row flex-wrap xl:flex-col items-stretch gap-2 sm:gap-4 md:gap-8 h-full`}
              >
                <div class='flex flex-col gap-2 pt-4 max-h-full overflow-y-scroll border-b border-black/10 h-full px-8 '>
                  <For each={activeItems()}>
                    {(item, index) => (
                      <div class='relative'>
                        <div class='absolute right-0.5 top-0.5 z-10'>
                          <RoundedButton onClick={() => toggle(item)}>
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
                                fill='#9A9EC8'
                              />
                            </svg>
                          </RoundedButton>
                        </div>
                        <PotentialDropItem skin={item} isHorizontal={true} />
                      </div>
                    )}
                  </For>
                </div>
              </div>
              <div class='w-full px-4 lg:px-8 py-4 grid grid-cols-6 lg:flex lg:flex-col justify-center lg:justify-between items-center gap-3'>
                <div
                  class={`${
                    props.pathname() == URL.GAMEMODES.COINFLIP_JOIN ? 'flex' : 'hidden'
                  } col-span-2 lg:col-auto text-gray-a2 flex items-center justify-center text-12 px-3 h-6 bg-gray-a2/10 border border-gray-a2/20 border-dashed font-bold rounded-4 font-SpaceGrotesk`}
                >
                  {Math.round(props.searchParams.value * 0.98)} -{' '}
                  {Math.round(props.searchParams.value * 1.02)}
                </div>
                <div
                  class={`${
                    props.pathname() == URL.GAMEMODES.COINFLIP_JOIN ? 'hidden' : 'center'
                  } gap-3 col-span-2 lg:col-auto`}
                >
                  <div
                    class={`p-1 rounded-full ${
                      side() == 1 ? 'border border-0.5 border-yellow-ffb' : ''
                    }`}
                    onClick={() => {
                      setSide(1)
                    }}
                  >
                    <img alt='red-coin' src={RedCoin} class={`h-7 lg:h-9 cursor-pointer`} />
                  </div>
                  <div
                    class={`p-1 rounded-full ${
                      side() == 2 ? 'border border-0.5 border-yellow-ffb' : ''
                    }`}
                    onClick={() => {
                      setSide(2)
                    }}
                  >
                    <img alt='black-coin' src={BlackCoin} class={`h-7 lg:h-9 cursor-pointer`} />
                  </div>
                </div>
                <div class='col-span-4 lg:col-auto center w-full gap-2 px-1 py-3 lg:px-3 border rounded-4 border-white/10 lg:w-[260px]'>
                  <div class='w-full flex gap-2 text-14 font-SpaceGrotesk font-bold items-center flex-nowrap'>
                    <p class='text-white truncate'>
                      {settings().amount} / 20 items{' '}
                      <span class='text-yellow-ffb'>worth</span>
                    </p>
                    <div class='flex items-center gap-[7.93px]'>
                      <Coin width='5' />
                      <span class='text-gradient truncate'>
                        {Number(settings().value).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  class='col-span-6 lg:col-auto group bg--gold border--gold hover:bg--gold__secondary w-full lg:w-[260px] h-10 rounded-4 flex items-center justify-center active:scale-95 transition-colors'
                  onClick={() => {
                    if (props.pathname() == URL.GAMEMODES.COINFLIP_JOIN) {
                      join()
                    } else {
                      deposit()
                    }
                  }}
                >
                  <span class='capitalize text-14 font-SpaceGrotesk font-bold group-hover:gold-text-third text-yellow-ffb text-shadow-gold-secondary'>
                    {props.pathname() == URL.GAMEMODES.COINFLIP_JOIN
                      ? 'Join Coinflip'
                      : 'Create Coinflip'}
                  </span>
                </button>
                <div
                  class={`col-span-6 lg:col-auto w-full lg:w-[260px] bg-gray-button-gradient font-SpaceGrotesk font-bold h-10 p-2 rounded-4 border text-gray-9a border-white/10 ${
                    props.pathname() == URL.GAMEMODES.COINFLIP_JOIN ? 'center' : 'hidden'
                  }`}
                  onClick={autoSelect}
                >
                  Auto-Select
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CoinflipCreateModal
