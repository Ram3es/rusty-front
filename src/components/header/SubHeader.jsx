import { createSignal, For, onMount } from 'solid-js'
import { NavLink } from 'solid-app-router'
import { SOCIAL, URL } from '../../libraries/url'
import Logo from '../../assets/logo.svg'
import smallLogo from '../../assets/smallLogo.svg'
import Coin from '../../utilities/Coin'
import buttonBgYellowWithGradient from '../../assets/img/header/buttonBgYellowWithGradient.jpg'
import balanceMaskBg from '../../assets/img/header/balanceMaskBg.png'
import headerLogoBgVector from '../../assets/img/header/headerLogoBgVector.png'
import RewardsIcon from '../icons/RewardsIcon'
import injector from '../../injector/injector'
import { ranksBorderColor } from '../../libraries/constants'
import Ranks from '../../utilities/Ranks'
import MailIcon from '../icons/MailIcon'
import SoundOffIcon from '../icons/SoundOffIcon'
import { useI18n } from '../../i18n/context'
import SoundOnIcon from '../icons/SoundOnIcon'
import MobileBurgerMenuIcon from '../icons/MobileBurgerMenuIcon'
import isMenuActive from './IsMenuActive.jsx'
import MobileNav from './MobileNav'
import { navigationGameModes } from '../../libraries/navigation'
import { playMenuToggle } from '../../utilities/Sounds/SoundButtonClick'
import roomStore from '../chat/RoomStore'
import EnFlag from '../../assets/img/header/enFlag.svg'
import EsFlag from '../../assets/img/header/esFlag.svg'
import RuFlag from '../../assets/img/header/ruFlag.svg'
import BattleIcon from '../../components/icons/BattleIcon'
import CoinflipIcon from '../../components/icons/CoinflipIcon'
import UpgraderIcon from '../../components/icons/UpgraderIcon'
import WheelIcon from '../../components/icons/WheelIcon'
import CaseOpeningIcon from '../../components/icons/CaseOpeningIcon'
import MinesIcon from '../../components/icons/MinesIcon'
import PlinkoIcon from '../../components/icons/PlinkoIcon'
import ModeMark from './ModeMark'
import DarkButton from '../elements/DarkButton'
import ArrowDown from '../icons/ArrowDown'
import LoginButton from '../elements/LoginButton'
import PVPMinesIcon from '../icons/PVPMinesIcon'
import PlusIcon from '../icons/PlusIcon'

const SubHeader = (props) => {
  let soundButtonMain
  let soundWrapperMain
  let notificationButtonMain
  let langWrapperMain
  let langButtonMain
  const { setToggles, userObject, socket, setUserObject } = injector
  const [, setActive] = isMenuActive
  const i18n = useI18n()
  const [isSoundModalOpen, setSoundModalOpen] = createSignal(false)
  const [isNotificationModalOpen, setNotificationModalOpen] = createSignal(false)
  const [currPath, setCurrPath] = createSignal(window.location.pathname)
  const [notifications, setNotifications] = createSignal([
    {
      title: 'YOUR TRADE IS STUCK',
      message: 'You won a coinflip trade but a Steam Error occurred. Resend your winnings here!'
    }
  ])
  const [isLangModalOpen, setLangModalOpen] = createSignal(false)
  const [availableLocales, setAvailableLocales] = createSignal([])
  const [setRoom] = roomStore
  const navigationGameModes = [
    {
      name: { en: 'Case Battles', es: 'case battles', ru: 'case battles' },
      svg: <BattleIcon />,
      url: URL.GAMEMODES.CASE_BATTLES,
      mark: 'new'
    },
    {
      name: { en: 'Coinflip', es: 'coinflip', ru: 'Коинфлип' },
      svg: <CoinflipIcon />,
      url: URL.GAMEMODES.COINFLIP,
      mark: 'hot'
    },
    {
      name: { en: 'Upgrader', es: 'upgrader', ru: 'Апгрейдер' },
      svg: <UpgraderIcon />,
      url: URL.GAMEMODES.UPGRADER,
      mark: 'hot'
    },
    {
      name: { en: 'Wheel', es: 'rueda', ru: 'колесо' },
      svg: <WheelIcon />,
      url: URL.GAMEMODES.WHEEL
    },
    {
      name: { en: 'Mines', es: 'Minas', ru: 'Бомбы' },
      svg: <MinesIcon />,
      url: URL.GAMEMODES.MINES
    },
    {
      name: { en: 'Plinko', es: 'Plinko', ru: 'Плинко' },
      svg: <PlinkoIcon />,
      url: URL.GAMEMODES.PLINKO
    },
    {
      name: { en: 'Cases', es: 'cases', ru: 'cases' },
      svg: <CaseOpeningIcon />,
      url: URL.UNBOXING
    },
    {
      name: { en: 'PVP Mines', es: 'Minas PVP', ru: 'PVP Бомбы' },
      svg: <PVPMinesIcon />,
      url: URL.GAMEMODES.PVP_MINES
    }
  ]

  const toggles = [
    { name: 'Affiliates', url: `${props.pathname()}?affiliates=true` },
    { name: 'Leaderboard', url: '/' },
    { name: 'Rewards', url: URL.REWARDS },
    { name: 'Free Cases', url: '/case?id=1' },
    { name: 'Fairness', url: URL.FAIRNESS }
  ]

  const supports = [
    { name: 'Terms of Service', url: URL.TOS },
    { name: 'Frequent Questions', url: '/questions' },
    { name: 'Support', url: URL.SUPPORT },
    { name: 'Discord', url: SOCIAL.DISCORD },
    { name: 'Twitter', url: SOCIAL.TWITTER }
  ]

  const toggleSounds = (volume) => {
    if (volume === 0) {
      setSoundModalOpen(false)
    }
    socket.emit('system:sounds:toggle', { volume: volume * 100 }, (data) => {
      if (!data.error) {
        setUserObject('user', (prev) => ({ ...prev, sounds: data.data.sounds / 100 }))
      }
    })
  }

  const toggleActiveLang = (lang) => {
    props.changeLang(lang)
    setAvailableLocales((prev) =>
      prev.map((l) => {
        return { ...l, active: l.code === lang }
      })
    )
  }

  const removeNotification = (index) => {
    setNotifications((prev) => {
      const arr = [...prev]
      arr.splice(index, 1)
      return arr
    })
  }

  const handleClick = (event) => {
    if (
      soundWrapperMain &&
      soundButtonMain &&
      !soundWrapperMain.contains(event.target) &&
      !soundButtonMain.contains(event.target)
    ) {
      setSoundModalOpen(false)
    }

    if (notificationButtonMain && !notificationButtonMain.contains(event.target)) {
      setNotificationModalOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClick)

  onMount(() => {
    console.log(userObject)
    setAvailableLocales([
      { title: 'En', code: 'en', active: setRoom() == 'en', flag: EnFlag },
      { title: 'Es', code: 'es', active: setRoom() == 'es', flag: EsFlag },
      { title: 'Ru', code: 'ru', active: setRoom() == 'ru', flag: RuFlag }
    ])
  })

  return (
    <>
      <div class='relative z-40'>
        <div
          class='flex relative z-10'
          style={{
            'background-image': `url('${headerLogoBgVector}')`
          }}
        >
          <NavLink class='relative px-4 lg:px-16 xll:px-22 xxl:px-24 py-6' href={URL.HOME}>
            <img
              alt='logo'
              class={`max-w-[62px] fourk:w-auto block`}
              src={smallLogo}
              style={{ filter: 'drop-shadow(0px 0px 24px rgba(255, 194, 57, 0.16))' }}
            />
          </NavLink>
          <div class='flex grow lg:flex-col justify-end lg:justify-start'>
            <div class='hidden lg:flex justify-between px-5 py-2 subheader-nav'>
              <div class='flex gap-6'>
                <For each={toggles}>
                  {(toggle) => (
                    <NavLink
                      href={`${toggle.url}`}
                      class={`center gap-3 cursor-pointer group relative`}
                      onClick={() => {
                        setTimeout(() => {
                          const leaderboardWrapper = document.getElementById('leaderboardWrapper')
                          if (toggle.name === 'Leaderboard' && leaderboardWrapper) {
                            document.getElementById('scrollWrapper').scrollTop =
                              leaderboardWrapper.offsetTop
                          }
                          setCurrPath(() => window.location.pathname)
                        }, 100)
                      }}
                    >
                      <p
                        class={`text-10 sm:text-14 text-current font-medium font-SpaceGrotesk ${
                          toggle.url === URL.REWARDS
                            ? 'reward-label'
                            : 'text-gray-6a group-hover:text-gray-9aa'
                        } transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                      >
                        {toggle.name}
                        {toggle.url === URL.REWARDS && (
                          <span class='flex h-[3px] w-[3px] relative text-yellow-ffb'>
                            <span
                              class='animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform'
                              style={{
                                'box-shadow': '0px 0px 5px 1px rgba(255, 180, 54, 0.72)'
                              }}
                            />
                            <span class='relative inline-flex rounded-full h-[3px] w-[3px] bg-current' />
                          </span>
                        )}
                      </p>
                    </NavLink>
                  )}
                </For>
              </div>
              <div class='flex gap-6'>
                <For each={supports}>
                  {(toggle) => (
                    <NavLink
                      href={`${toggle.url}`}
                      class={`center gap-3 cursor-pointer group relative`}
                      onClick={() => {
                        setTimeout(() => {
                          setCurrPath(() => window.location.pathname)
                        }, 100)
                      }}
                    >
                      <p
                        class={`text-10 sm:text-14 text-current font-SpaceGrotesk text-gray-6a group-hover:text-gray-9aa transition duration-200 ease-in-out font-bold flex gap-2 items-center`}
                      >
                        {toggle.name}
                      </p>
                    </NavLink>
                  )}
                </For>
                <div class='relative'>
                  <button
                    type='button'
                    onClick={() => {
                      playMenuToggle()
                      setLangModalOpen((prev) => !prev)
                    }}
                    ref={langButtonMain}
                    class='relative w-24 h-6 flex justify-between items-center py-2 pl-3 text-left'
                    aria-haspopup='listbox'
                    aria-expanded='true'
                    aria-labelledby='listbox-label'
                  >
                    <span class='block truncate'>
                      <For each={availableLocales()}>
                        {(item) =>
                          item.active ? (
                            <span class='flex gap-2 items-center font-SpaceGrotesk font-bold text-13 text-gray-9a uppercase'>
                              {' '}
                              <img class='h-3' src={item.flag} alt='flag' />
                              {item.title}
                            </span>
                          ) : (
                            ''
                          )
                        }
                      </For>
                    </span>
                    <span
                      class={`pointer-events-none absolute inset-y-0 w-4 h-4 text-gray-9a center right-4 top-1/2 transform -translate-y-[9px] header-hang-toggle-wrapper`}
                    >
                      <ArrowDown isOpen={isLangModalOpen()} />
                    </span>
                  </button>

                  <ul
                    ref={langWrapperMain}
                    class={`${
                      isLangModalOpen() ? '' : 'hidden'
                    } absolute z-40 mt-1 w-full overflow-auto py-1 font-SpaceGrotesk text-13 text-gray-9a uppercase nav-lang-popup p-2 flex flex-col gap-1`}
                    tabindex='-1'
                    role='listbox'
                    aria-labelledby='listbox-label'
                    aria-activedescendant='listbox-option-3'
                  >
                    <For each={availableLocales()}>
                      {(item) =>
                        !item.active ? (
                          <li
                            onClick={() => toggleActiveLang(item.code)}
                            class='text-gray-900 relative select-none py-1 pl-3 pr-9 cursor-pointer border-2 border-white rounded-6 border-opacity-5'
                            id='listbox-option-0'
                            role='option'
                          >
                            <span class='flex gap-1 items-center font-SpaceGrotesk font-bold text-13 text-gray-9a uppercase'>
                              <img src={item.flag} alt='flag' />
                              {item.title}
                            </span>
                          </li>
                        ) : (
                          ''
                        )
                      }
                    </For>
                  </ul>
                </div>
              </div>
            </div>
            <div class='flex items-center flex-grow justify-end lg:justify-between pr-4 lg:pr-10 gap-6 lg:gap-0'>
              <div class='hidden lg:flex gap-2 items-center h-full py-2'>
                <For each={navigationGameModes}>
                  {(mode) => (
                    <NavLink
                      href={`${mode.url}`}
                      class='relative'
                      onClick={() => {
                        document.getElementById('scrollWrapper').scrollTop = 0
                        setActive(false)
                        setCurrPath(() => mode.url)
                      }}
                    >
                      <div
                        class={`h-[66px] ${
                          mode.url === URL.GAMEMODES.CASE_BATTLES
                            ? 'xxl:w-[136px]'
                            : 'xxl:w-[108px]'
                        } px-2 llg:px-4 xll:px-7 py-2 relative ${
                          currPath().indexOf(mode.url) >= 0
                            ? 'header-nav-link-active'
                            : 'header-nav-link'
                        } transition-all duration-200 pb-0 cursor-pointer group`}
                      >
                        <div class='flex flex-col justify-around py-1 items-center relative h-full z-10'>
                          <div
                            class={`${
                              currPath().indexOf(mode.url) >= 0 ? 'text-yellow-ffb' : 'text-gray-55'
                            } group-hover:text-yellow-ffb`}
                          >
                            {mode.svg}
                          </div>
                          <p
                            class={`text-14 font-bold font-SpaceGrotesk truncate ${
                              currPath().indexOf(mode.url) >= 0 ? 'text-yellow-ffb' : 'text-gray-9b'
                            } group-hover:text-yellow-ffb`}
                          >
                            {mode.name[i18n.language]}
                          </p>
                        </div>
                      </div>
                      <ModeMark mark={mode.mark} />
                    </NavLink>
                  )}
                </For>
              </div>
              {!userObject.authenticated ? (
                <div class='flex items-center gap-6'>
                  <div class='flex h-10'>
                    <div class='balance-bg rounded-l-6 flex items-center'>
                      <div class='bg-black bg-opacity-10 rounded-l-4 h-[calc(100%-4px)] flex m-0.5 w-[146px]'>
                        <div
                          class='w-full h-full px-3 bg-cover py-1 text-16 text-gray-e0 rounded-l-6 flex gap-2 items-center font-Lato font-bold'
                          style={{
                            background: `url(${balanceMaskBg})`,
                            'border-radius': '4px 4px 4px 4px'
                          }}
                        >
                          <Coin />
                          <div class='text-gradient'>
                            {userObject?.user?.balance?.toLocaleString('en') || 0}.
                            <span class='text-14 text-gradient'>00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      href={`${props.pathname()}?deposit=true`}
                      class='w-[108px] group py-3 px-4 lg:px-6 lg:py-2 text-14 green-btn-gradient border-2 border-green-1b/75 rounded-r-4 text-white flex gap-2 items-center justify-center font-SpaceGrotesk font-bold'
                    >
                      <span class=''>
                        <PlusIcon />
                      </span>
                      <span
                        class='group-hover:hidden'
                        style={{
                          'text-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        Deposit
                      </span>
                    </NavLink>
                  </div>
                  <div class='hidden md:flex gap-3'>
                    <NavLink href={`${props.pathname()}?withdraw=true`}>
                      <DarkButton>Withdraw</DarkButton>
                    </NavLink>
                    <DarkButton width='10' paddingRight='0' ref={notificationButtonMain}>
                      <div class='relative'>
                        <span class='absolute z-10 right-1 top-1 bg-yellow-ff w-3 h-3 flex justify-center items-center rounded-full text-dark-1b1 font-Lato font-extrabold text-10'>
                          {notifications().length}
                        </span>
                        <span
                          class='z-30 w-10 h-10 flex justify-center items-center cursor-pointer'
                          onClick={() => {
                            setNotificationModalOpen((prev) => !prev)
                          }}
                        >
                          <MailIcon />
                        </span>
                        <div
                          class={`absolute top-14 -right-4 bg-dark-1b1 border border-gray-26 p-4 rounded-6 w-80 flex-col gap-6 ${
                            isNotificationModalOpen() ? 'flex' : 'hidden'
                          }`}
                          style={{
                            'box-shadow': '0px 0px 16px rgba(0, 0, 0, 0.25)'
                          }}
                        >
                          <svg
                            class='absolute bottom-full right-7'
                            width='16'
                            height='13'
                            viewBox='0 0 16 13'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8.43412 0.767495L14.7109 11.7519C14.9014 12.0853 14.6607 12.5 14.2768 12.5H1.72318C1.33927 12.5 1.09858 12.0853 1.28906 11.7519L7.56588 0.767494C7.75783 0.431587 8.24217 0.431587 8.43412 0.767495Z'
                              fill='#1B1E2D'
                              stroke='#262D4D'
                            />
                          </svg>
                          <div class='flex gap-2 items-center'>
                            <MailIcon />
                            <div class='text-gray-c6 text-14 font-Oswald uppercase font-medium'>
                              Notifications{' '}
                              <span class='opacity-50'>({notifications().length})</span>
                            </div>
                          </div>
                          <div class='flex flex-col w-full gap-4'>
                            <For
                              each={notifications()}
                              fallback={
                                <div class='font-Lato text-14 text-gray-c6 flex justify-center items-center h-28'>
                                  You have no messages :(
                                </div>
                              }
                            >
                              {(item, index) => {
                                return (
                                  <div
                                    class='p-4 w-full flex flex-col rounded-8 gap-2 text-gray-c6'
                                    style={{ background: 'rgba(83, 100, 174, 0.1)' }}
                                  >
                                    <div class='flex justify-between'>
                                      <span class='text-14 font-Oswald uppercase font-medium'>
                                        {item.title}
                                      </span>
                                      <svg
                                        class='cursor-pointer'
                                        onClick={() => removeNotification(index())}
                                        width='12'
                                        height='12'
                                        viewBox='0 0 12 12'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <g clip-path='url(#clip0_195_48881)'>
                                          <path
                                            d='M10.864 1.13607C10.4163 0.688369 9.69032 0.688369 9.24262 1.13607L6.35335 4.02525C6.15809 4.22051 5.84152 4.22051 5.64626 4.02525L2.75699 1.13607C2.30928 0.688369 1.58329 0.688369 1.13559 1.13607C0.687878 1.58376 0.687878 2.30973 1.13559 2.75743L4.02483 5.6466C4.2201 5.84186 4.2201 6.15845 4.02483 6.35372L1.13559 9.24289C0.687878 9.69058 0.687878 10.4166 1.13559 10.8643C1.42099 11.1497 1.81922 11.2534 2.18657 11.175C2.39558 11.1299 2.59469 11.0265 2.75699 10.8643L5.64626 7.97506C5.84152 7.77981 6.15809 7.77981 6.35335 7.97506L9.24262 10.8643C9.69032 11.3119 10.4163 11.3119 10.864 10.8643C11.3117 10.4166 11.3117 9.69058 10.864 9.24289L7.97478 6.35372C7.77951 6.15845 7.77951 5.84186 7.97478 5.6466L10.864 2.75743C11.0758 2.54565 11.187 2.27213 11.1985 1.99464C11.2116 1.68549 11.1 1.37199 10.864 1.13607Z'
                                            fill='#9BA4D6'
                                            fill-opacity='0.5'
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id='clip0_195_48881'>
                                            <rect width='12' height='12' fill='white' />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div class='font-Lato text-14'>{item.message}</div>
                                  </div>
                                )
                              }}
                            </For>
                          </div>
                        </div>
                      </div>
                    </DarkButton>
                  </div>
                  <div class='hidden md:flex flex-col items-center gap-2'>
                    <NavLink
                      href={`${props.pathname()}?profile=true`}
                      class='w-10 h-10 rounded-full border border-yellow-ff center relative'
                    >
                      {userObject?.user?.avatar ? (
                        <>
                          <div
                            class={`w-10 h-10 rounded-full relative flex justify-center items-center overflow-hidden cursor-pointer p-sm bg-gradient-to-b ${
                              ranksBorderColor[userObject?.user?.level?.league]
                            }`}
                          >
                            <div class='rounded-full w-9 h-9 relative overflow-hidden p-sm bg-dark-13'>
                              <img
                                src={userObject?.user?.avatar}
                                class='min-h-full min-w-full rounded-full absolute left-0 top-0'
                              />
                            </div>
                          </div>
                          <div class='absolute -right-1 -bottom-1'>
                            <Ranks
                              staff={userObject?.user?.rank}
                              rank={userObject?.user?.level?.league}
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          alt='logo'
                          class='w-full h-full rounded-full'
                          src={userObject?.user?.avatar || smallLogo}
                        />
                      )}
                    </NavLink>
                    {userObject?.user?.level && (
                      <div class='w-full h-1 rounded-full overflow-hidden bg-dark-22'>
                        <div
                          class='h-full rounded-full duration-200'
                          style={{
                            background: 'linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)',
                            width: `${
                              (userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /
                              (userObject?.user?.level?.to * 10)
                            }%`
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div class='w-[156px] h-[40px]'>
                  <LoginButton
                    onClick={() => {
                      setToggles('tosModal', true)
                    }}
                  />
                </div>
              )}
              <div
                class='flex items-center justify-center cursor-pointer lg:hidden'
                onClick={() => setActive((prev) => !prev)}
              >
                <MobileBurgerMenuIcon />
              </div>
            </div>
          </div>
        </div>
        <div
          class='absolute left-0 top-0 w-full h-full p-[2px] z-0'
          style={{
            background:
              'linear-gradient(45deg, rgba(255, 178, 54, 0.2) 0%, rgba(0, 0, 0, 0) 8%), linear-gradient(rgba(55, 57, 81, 0) 0%, rgba(55, 57, 81, 0.12) 100%), linear-gradient(173.38deg, rgba(28, 29, 51, 0.25) 0%, rgba(27, 29, 52, 0.25) 100%)'
          }}
        >
          <div
            class='w-full h-full opacity-50'
            style={{
              background:
                'linear-gradient(90.04deg, #1A1B30 0%, #21243B 100%), rgba(255, 255, 255, 0.02)'
            }}
          />
        </div>
        <MobileNav
          {...props}
          notifications={notifications()}
          removeNotification={removeNotification}
        />
      </div>

      {/* <div class='relative z-50 w-full flex bg-dark-1b1'>
        <div class='flex justify-between items-center grow'>
          <div class='flex gap-2 xl:gap-6'>
            <NavLink class='relative px-24 py-6' href={URL.HOME}>
              <img
                alt='logo'
                class={`w-[62px] fourk:w-auto block`}
                src={smallLogo}
                style={{ filter: 'drop-shadow(0px 0px 24px rgba(255, 194, 57, 0.16))' }}
              />
            </NavLink>
            <div class='hidden lg:flex gap-2 xl:gap-6'>
              <For each={toggles}>
                {(toggle) => (
                  <NavLink
                    href={`${toggle.url}`}
                    class={`${
                      toggle.name === 'FREE CASE' ? 'text-yellow-ff' : 'text-gray-66'
                    } center gap-3 cursor-pointer group relative`}
                    onClick={() => {
                      setTimeout(() => {
                        const leaderboardWrapper = document.getElementById('leaderboardWrapper')
                        if (toggle.name === 'LEADERBOARD' && leaderboardWrapper) {
                          document.getElementById('scrollWrapper').scrollTop =
                            leaderboardWrapper.offsetTop
                        }
                      }, 100)
                    }}
                  >
                    <p
                      class={`text-10 sm:text-14 text-current font-medium uppercase font-Oswald ${
                        toggle.name === 'FREE CASE' ? 'text-yellow-ff' : 'text-gray-66'
                      } group-hover:text-yellow-ff transition duration-200 ease-in-out`}
                    >
                      {toggle.name}
                    </p>
                  </NavLink>
                )}
              </For>
            </div>
          </div>
          {userObject?.user?.balance ? (
            <div class='flex h-10'>
              <div class='bg-yellow-to-transparent rounded-6 flex items-center'>
                <div class='h-[calc(100%-4px)] m-0.5 px-3 py-1 text-16 text-gray-e0 bg-dark-13 rounded-l-6 flex gap-2 items-center font-Lato font-bold'>
                  <Coin />
                  <div>
                    {userObject?.user?.balance?.toLocaleString('en') || 0}.
                    <span class='text-14 text-gray-c2'>53</span>
                  </div>
                </div>
              </div>
              <NavLink
                href={`${props.pathname()}?deposit=true`}
                class='p-3 lg:px-6 lg:py-2 text-14 border-b-[2px] border-yellow-8f transform hover:translate-y-[1.5px] duration-200 hover:border-dark-18 flex gap-2 items-center uppercase font-Lato font-extrabold'
                style={{
                  background: `url(${buttonBgYellowWithGradient})`,
                  'border-radius': '0px 4px 4px 0px'
                }}
              >
                <WalletIcon />
                <span class='hidden lg:flex'>wallet</span>
              </NavLink>
            </div>
          ) : (
            <div
              class='py-2 text-14 w-[100px] xl:w-[125px] border-b-[2px] justify-center cursor-pointer border-yellow-8f transform hover:translate-y-[1.5px] duration-200 hover:border-b-0 flex lg:hidden gap-2 items-center uppercase font-Lato font-extrabold'
              style={{
                background: `url(${buttonBgYellowWithGradient})`,
                'border-radius': '4px 4px 4px 4px'
              }}
              onClick={() => {
                setToggles('tosModal', true)
              }}
            >
              {i18n.t('header.login')}
            </div>
          )}
          <div
            class='flex lg:hidden justify-center items-center'
            onClick={() => setActive((prev) => !prev)}
          >
            <MobileBurgerMenuIcon />
          </div>
          <div class='hidden lg:block'>
            <NavLink
              href={URL.REWARDS}
              class='px-5 py-2 text-14 h-10 border-b-[2px] border-green-60 transform hover:translate-y-[1.5px] duration-200 hover:border-b-0 flex gap-2 items-center uppercase font-Lato font-extrabold bg-cover'
              style={{
                // 'background-image': `url(${buttonBgGreenWithGradient})`,
                'border-radius': '4px 4px 4px 4px'
              }}
            >
              <RewardsIcon />
              REWARDS
            </NavLink>
          </div>
          <MobileNav
            {...props}
            notifications={notifications()}
            removeNotification={removeNotification}
          />
        </div>

        <div class='hidden lg:flex py-2 items-center'>
          <div class='flex gap-3'>
            {userObject?.user?.avatar ? (
              <>
                <NavLink
                  href={`${props.pathname()}?profile=true`}
                  class='w-10 h-10 rounded-full border border-yellow-ff center'
                >
                  {userObject?.user?.avatar ? (
                    <div
                      class={`w-10 h-10 rounded-full relative flex justify-center items-center overflow-hidden cursor-pointer p-sm bg-gradient-to-b ${
                        ranksBorderColor[userObject?.user?.level?.league]
                      }`}
                    >
                      <div class='rounded-full w-9 h-9 relative overflow-hidden p-sm bg-dark-13'>
                        <img
                          src={userObject?.user?.avatar}
                          class='min-h-full min-w-full rounded-full absolute left-0 top-0'
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      alt='logo'
                      class='w-full h-full rounded-full'
                      src={userObject?.user?.avatar || smallLogo}
                    />
                  )}
                </NavLink>
                <div class='flex flex-col w-40'>
                  <div class='truncate w-full font-Oswald text-16 text-gray-c6'>
                    {userObject?.user?.username || ''}
                  </div>
                  <div class='flex items-center gap-2 font-Lato text-14 text-gray-transtapent'>
                    <Ranks staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
                    {userObject?.user?.level?.league.charAt(0).toUpperCase() +
                      userObject?.user?.level?.league.slice(1)}
                  </div>
                </div>
              </>
            ) : (
              <div
                class='px-6 py-2 text-14 w-32 border-b-[2px] justify-center cursor-pointer border-yellow-8f transform hover:translate-y-[1.5px] duration-200 hover:border-b-0 flex gap-2 items-center uppercase font-Lato font-extrabold'
                style={{
                  background: `url(${buttonBgYellowWithGradient})`,
                  'border-radius': '4px 4px 4px 4px'
                }}
                onClick={() => {
                  setToggles('tosModal', true)
                }}
              >
                {i18n.t('header.login')}
              </div>
            )}
            <div class='flex gap-3 pr-3'>
              {userObject?.user?.username ? (
                <div
                  ref={notificationButtonMain}
                  class='w-10 h-10 center rounded-8 bg-dark-21 relative'
                >
                  <span class='absolute z-10 right-1 top-1 bg-yellow-ff w-3 h-3 flex justify-center items-center rounded-full text-dark-1b1 font-Lato font-extrabold text-10'>
                    {notifications().length}
                  </span>
                  <span
                    class='z-30 w-10 h-10 flex justify-center items-center cursor-pointer'
                    onClick={() => {
                      setNotificationModalOpen((prev) => !prev)
                    }}
                  >
                    <MailIcon />
                  </span>
                  <div
                    class={`absolute top-14 -right-4 bg-dark-1b1 border border-gray-26 p-4 rounded-6 w-80 flex-col gap-6 ${
                      isNotificationModalOpen() ? 'flex' : 'hidden'
                    }`}
                    style={{
                      'box-shadow': '0px 0px 16px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <svg
                      class='absolute bottom-full right-7'
                      width='16'
                      height='13'
                      viewBox='0 0 16 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.43412 0.767495L14.7109 11.7519C14.9014 12.0853 14.6607 12.5 14.2768 12.5H1.72318C1.33927 12.5 1.09858 12.0853 1.28906 11.7519L7.56588 0.767494C7.75783 0.431587 8.24217 0.431587 8.43412 0.767495Z'
                        fill='#1B1E2D'
                        stroke='#262D4D'
                      />
                    </svg>
                    <div class='flex gap-2 items-center'>
                      <MailIcon />
                      <div class='text-gray-c6 text-14 font-Oswald uppercase font-medium'>
                        Notifications <span class='opacity-50'>({notifications().length})</span>
                      </div>
                    </div>
                    <div class='flex flex-col w-full gap-4'>
                      <For
                        each={notifications()}
                        fallback={
                          <div class='font-Lato text-14 text-gray-c6 flex justify-center items-center h-28'>
                            You have no messages :(
                          </div>
                        }
                      >
                        {(item, index) => {
                          return (
                            <div
                              class='p-4 w-full flex flex-col rounded-8 gap-2 text-gray-c6'
                              style={{ background: 'rgba(83, 100, 174, 0.1)' }}
                            >
                              <div class='flex justify-between'>
                                <span class='text-14 font-Oswald uppercase font-medium'>
                                  {item.title}
                                </span>
                                <svg
                                  class='cursor-pointer'
                                  onClick={() => removeNotification(index())}
                                  width='12'
                                  height='12'
                                  viewBox='0 0 12 12'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <g clip-path='url(#clip0_195_48881)'>
                                    <path
                                      d='M10.864 1.13607C10.4163 0.688369 9.69032 0.688369 9.24262 1.13607L6.35335 4.02525C6.15809 4.22051 5.84152 4.22051 5.64626 4.02525L2.75699 1.13607C2.30928 0.688369 1.58329 0.688369 1.13559 1.13607C0.687878 1.58376 0.687878 2.30973 1.13559 2.75743L4.02483 5.6466C4.2201 5.84186 4.2201 6.15845 4.02483 6.35372L1.13559 9.24289C0.687878 9.69058 0.687878 10.4166 1.13559 10.8643C1.42099 11.1497 1.81922 11.2534 2.18657 11.175C2.39558 11.1299 2.59469 11.0265 2.75699 10.8643L5.64626 7.97506C5.84152 7.77981 6.15809 7.77981 6.35335 7.97506L9.24262 10.8643C9.69032 11.3119 10.4163 11.3119 10.864 10.8643C11.3117 10.4166 11.3117 9.69058 10.864 9.24289L7.97478 6.35372C7.77951 6.15845 7.77951 5.84186 7.97478 5.6466L10.864 2.75743C11.0758 2.54565 11.187 2.27213 11.1985 1.99464C11.2116 1.68549 11.1 1.37199 10.864 1.13607Z'
                                      fill='#9BA4D6'
                                      fill-opacity='0.5'
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id='clip0_195_48881'>
                                      <rect width='12' height='12' fill='white' />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div class='font-Lato text-14'>{item.message}</div>
                            </div>
                          )
                        }}
                      </For>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div
                ref={soundButtonMain}
                class='w-10 h-10 center rounded-8 bg-dark-21 relative cursor-pointer'
              >
                <span
                  class='z-30 w-full h-full flex justify-center items-center'
                  onClick={() => {
                    setSoundModalOpen((prev) => !prev)
                  }}
                >
                  {userObject?.user?.sounds > 0 ? <SoundOnIcon /> : <SoundOffIcon />}
                </span>
                <div
                  ref={soundWrapperMain}
                  class={`absolute -left-[130%] transform rotate-90 top-[52px]  ${
                    isSoundModalOpen() ? 'flex' : 'hidden'
                  } justify-end`}
                >
                  <div class='w-36 h-10 flex justify-center items-center pr-2 pl-12 bg-cover bg-dark-21 rounded-8'>
                    <div class='relative w-full h-2 bg-gray-2e rounded-lg'>
                      <input
                        type='range'
                        value={userObject?.user?.sounds * 100 || 0}
                        class='absolute left-0 top-0 w-full h-full bg-transparent appearance-none cursor-pointer'
                        onChange={(e) => toggleSounds(e.target.value ? e.target.value / 100 : 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default SubHeader
