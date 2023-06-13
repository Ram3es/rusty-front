import { createSelector, createSignal, onMount, For } from 'solid-js'
import injector from '../../../injector/injector'
import { URL } from '../../../libraries/url'
import { useI18n } from '../../../i18n/context'
import roomStore from '../../chat/RoomStore'
import YellowButtonBg from '../../../assets/img/animatedButtonBg.jpg'
import EnFlag from '../../../assets/img/header/enFlag.svg'
import EsFlag from '../../../assets/img/header/esFlag.svg'
import RuFlag from '../../../assets/img/header/ruFlag.svg'
import { playButtonClickSound, playMenuToggle } from '../../../utilities/Sounds/SoundButtonClick'
import GrayGradientButton from '../../elements/GrayGradientButton'
import ArrowDown from '../../icons/ArrowDown'

const ProfileSettings = (props) => {
  const i18n = useI18n()

  const { socket, userObject, toastr, setUserObject } = injector
  const [tradeurl, setTradeurl] = createSignal(
    userObject?.user?.tradeurl ? userObject.user.tradeurl : ''
  )
  const [toggleUrl, setToggleUrl] = createSignal(true)

  const [clientSeed, setClientSeed] = createSignal(
    userObject?.user?.client_seed ? userObject.user.client_seed : ''
  )
  const [toggleSeed, setToggleSeed] = createSignal(true)

  const [isLangModalOpen, setLangModalOpen] = createSignal(false)
  const [availableLocales, setAvailableLocales] = createSignal([])
  const [setRoom] = roomStore

  let langButtonMain
  let langWrapperMain

  const handleClick = (event) => {
    if (
      langWrapperMain &&
      langButtonMain &&
      !langWrapperMain.contains(event.target) &&
      !langButtonMain.contains(event.target)
    ) {
      setLangModalOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClick)

  let save = () => {
    playButtonClickSound()
    socket.emit(
      'system:settings:update',
      {
        tradeurl: tradeurl()
      },
      (data) => {
        if (data.msg) {
          toastr(data)
        }
      }
    )
  }

  const changeClientSeed = () => {
    socket.emit(
      'system:client_seed:new',
      {
        client_seed: clientSeed()
      },
      (data) => {
        if (data.msg) {
          toastr(data)
        }
      }
    )
  }

  const regenServerSeed = () => {
    socket.emit('system:server_seed:new', {}, (data) => {
      if (data.msg) {
        toastr(data)
      }

      if (!data.error) {
        setUserObject('user', (prev) => ({
          ...prev,
          server_seed: data.data.server_seed
        }))
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

  const isSelected = createSelector(() => {
    setRoom(i18n.language)
    return i18n.language
  })

  onMount(() => {
    setAvailableLocales([
      { title: 'English', code: 'en', active: isSelected('en'), flag: EnFlag },
      { title: 'Spain', code: 'es', active: isSelected('es'), flag: EsFlag },
      { title: 'Russian', code: 'ru', active: isSelected('ru'), flag: RuFlag }
    ])
  })

  return (
    <div class='w-full flex flex-col gap-6 pt-9 pb-14'>
      <div class='flex flex-col w-full gap-2'>
        <p class='text-14 text-gray-9a font-medium font-SpaceGrotesk capitalize'>
          {i18n.t('profile_true.settings.Steam trade URL')}
        </p>

        <div class='center w-full gap-4'>
          <div
            class='w-[624px] p-[2px] rounded-[4px] h-10'
            style={{
              background:
                'radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));'
            }}
          >
            <div
              class='flex w-full rounded-[4px] justify-between items-center h-full'
              style={{
                background:
                  'radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))'
              }}
            >
              <div class='flex items-center gap-2 justify-between pl-4 pr-1 py-1 w-full'>
                <input
                  class={`text-gray-92 text-14 font-medium font-SpaceGrotesk w-full sm:w-[552px] ${
                    toggleUrl() ? '' : 'hidden'
                  }`}
                  placeholder={i18n.t('coinflip.affiliates_true.Enter code')}
                  onInput={(e) => setTradeurl(e.currentTarget.value)}
                  value={tradeurl()}
                />
                <p
                  class={`text-gray-92 w-full sm:w-44 ${
                    toggleUrl() ? 'hidden' : ''
                  } text-14 font-medium uppercase`}
                  onClick={() => setToggleUrl((prev) => !prev)}
                >
                  {tradeurl()}
                </p>
                <div
                  class='flex items-center justify-center cursor-pointer center w-13 h-8 px-3 py-2 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk'
                  onClick={save}
                >
                  Save
                </div>
              </div>
            </div>
          </div>

          <GrayGradientButton
            additionalClass='w-[124px] h-10 text-gray-9a font-SpaceGrotesk text-14 font-bold cursor-pointer gap-[6.7px]'
            callbackFn={() =>
              window.open('http://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url')
            }
          >
            <svg
              width='16'
              height='14'
              viewBox='0 0 16 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M7.52834 3.84203C7.54494 1.72062 9.28853 0 11.4259 0C13.5728 0 15.3164 1.73721 15.3164 3.87267L15.3171 3.87331C15.3171 6.01897 13.5735 7.74916 11.4297 7.74916L7.693 10.4673C7.55578 11.9326 6.30872 13.0833 4.80382 13.0833C3.41954 13.0833 2.2497 12.1024 1.96569 10.8011L0 10.0142V6.35914L3.32381 7.69747C3.84012 7.38411 4.42408 7.24434 5.10122 7.30561L7.52834 3.84203ZM3.53389 11.4258C3.32755 11.343 3.12111 11.2602 2.91599 11.1821C3.95563 13.1248 6.94055 11.3659 6.94119 10.1839C6.94055 8.80476 5.66604 7.81298 4.34239 8.10656L5.23142 8.46396C6.10258 8.81178 6.53018 9.79208 6.17789 10.6607C5.82942 11.5293 4.83828 11.955 3.96585 11.5976C3.82224 11.5414 3.67809 11.4836 3.53389 11.4258ZM8.81434 3.87331C8.81434 5.31056 9.98673 6.46891 11.4297 6.46891C12.8619 6.47274 14.0349 5.31439 14.0349 3.87331C14.0349 2.44244 12.8625 1.2777 11.4297 1.2777C9.98354 1.2777 8.81434 2.44244 8.81434 3.87331ZM9.9565 3.82929C9.9565 2.9832 10.642 2.29758 11.4882 2.29758C12.3293 2.29758 13.0199 2.98085 13.0199 3.82929C13.0199 4.67773 12.3293 5.361 11.4882 5.361C10.6396 5.361 9.9565 4.67537 9.9565 3.82929Z'
                fill='currentColor'
              />
            </svg>

            <span>{i18n.t('profile_true.settings.Find here')}</span>
          </GrayGradientButton>
        </div>
      </div>
      <div class='flex flex-col w-full gap-2'>
        <p class='text-14 text-gray-9a font-medium font-SpaceGrotesk capitalize'>
          {i18n.t('profile_true.settings.Language')}
        </p>
        <div class='relative'>
          <GrayGradientButton
            additionalClass='w-[154px] h-10 justify-between text-gray-9a pl-4 px-3 pr-3 gap-[35px]'
            callbackFn={() => {
              playMenuToggle()
              setLangModalOpen((prev) => !prev)
            }}
            aria-haspopup='listbox'
            aria-expanded='true'
            aria-labelledby='listbox-label'
          >
            <For each={availableLocales()}>
              {(item) =>
                item.active && (
                  <span class='flex gap-[8.5px] items-center font-SpaceGrotesk text-14 text-gray-9a capitalize'>
                    <img class='w-[16.5px] h-[11.55px]' src={item.flag} alt='flag' />
                    {item.title}
                  </span>
                )
              }
            </For>
            <GrayGradientButton additionalClass='w-4 h-4 shadow-button text-gray-9a' noShadow>
              <ArrowDown isOpen={isLangModalOpen()} />
            </GrayGradientButton>
          </GrayGradientButton>
          <ul
            ref={langWrapperMain}
            class={`${
              isLangModalOpen() ? '' : 'hidden'
            } absolute w-[154px] flex flex-col gap-2 z-40 mt-1 bg-gray-button-gradient border-[#FFFFFF0A] border transition duration-300 overflow-auto p-2 font-SpaceGrotesk text-14 text-gray-9a capitalize bg-dark-20 rounded-4`}
            tabindex='-1'
            role='listbox'
            aria-labelledby='listbox-label'
            aria-activedescendant='listbox-option-3'
          >
            <For each={availableLocales()}>
              {(item) =>
                !item.active && (
                  <li
                    onClick={() => toggleActiveLang(item.code)}
                    id='listbox-option-0'
                    role='option'
                  >
                    <span class='flex gap-[8.5px] items-center rounded-4 border-[#FFFFFF0A] border p-1'>
                      <img class='w-[16.5px] h-[11.55px]' src={item.flag} alt='flag' />
                      {item.title}
                    </span>
                  </li>
                )
              }
            </For>
          </ul>
        </div>
      </div>

      <div class='flex flex-col w-full gap-2'>
        <p class='text-14 text-gray-9a font-medium font-SpaceGrotesk capitalize'>
          {i18n.t('profile_true.settings.Client seed')}
        </p>
        <div
          class='w-[436px] p-[2px] rounded-[4px] h-10'
          style={{
            background:
              'radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));'
          }}
        >
          <div
            class='flex w-full rounded-[4px] justify-between items-center h-full'
            style={{
              background:
                'radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))'
            }}
          >
            <div class='flex items-center gap-2 justify-between pl-4 pr-1 py-1 w-full'>
              <input
                class={`text-gray-92 text-14 font-medium font-SpaceGrotesk w-full sm:w-[340px] ${
                  toggleSeed() ? '' : 'hidden'
                }`}
                placeholder={i18n.t('coinflip.affiliates_true.Enter code')}
                onInput={(e) => setClientSeed(e.currentTarget.value)}
                value={clientSeed()}
              />
              <p
                class={`text-gray-92 w-full sm:w-44 ${
                  toggleSeed() ? 'hidden' : ''
                } text-14 font-medium uppercase`}
                onClick={() => setToggleSeed((prev) => !prev)}
              >
                {clientSeed()}
              </p>
              <div
                class='flex items-center justify-center cursor-pointer center w-13 h-8 px-3 py-2 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk'
                onClick={changeClientSeed}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='flex flex-col w-full'>
        <p class='text-18 text-white font-bold font-Oswald uppercase mb-2'>
          {i18n.t('profile_true.settings.Hash server seed')}
        </p>
        <div class='center w-full gap-12'>
          <div
            class='flex-1 h-10 text-14 rounded-4 text-gray-8c placeholder-gray-8c border border-dark-20 px-4 font-normal overflow-hidden flex items-center'
            placeholder='No tradeurl'
            onInput={(e) => setClientSeed(e.currentTarget.value)}
            value={clientSeed()}
          >
            <p class='text-14 text-gray-6a font-medium truncate'>{userObject?.user?.server_seed}</p>
          </div>
          <div
            class='w-24 h-10 rounded-2 bg-dark-20 center hover'
            style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))' }}
            onClick={regenServerSeed}
          >
            <p class='text-14 text-gray-8c font-black capitalize'>
              {i18n.t('profile_true.settings.Regen')}
            </p>
          </div>
        </div>
      </div>

      <div class='flex items-center gap-6 mt-4'>
        <div class='flex hover' onClick={save}>
          <div
            class='cursor-pointer relative center hover w-20 sm:w-40 h-10 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper'
            style={{ 'background-image': `url(${YellowButtonBg})` }}
          >
            <div class='scrolling-btn-image hidden group-hover:block absolute left-0 top-0' />
            <p class='absolute text-dark-16 text-12 sm:text-14 font-medium font-Oswald uppercase'>
              {i18n.t('profile_true.settings.Save changes')}
            </p>
          </div>
        </div>
        <div
          class='relative center cursor-pointer hover rounded-2 bg-cover group scrolling-btn-wrapper h-10 min-w-40 overflow-hidden'
          style={{ 'background-image': `url(${YellowButtonBg})` }}
          onClick={() => {
            window.location = URL.SIGNOUT
          }}
        >
          <div class='scrolling-btn-image hidden group-hover:block absolute left-0 top-0' />
          <div class='absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13' />
          <div class='absolute center'>
            <p class='text-yellow-ff text-14 font-semibold font-Oswald uppercase'>
              {i18n.t('profile_true.settings.Logout')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
