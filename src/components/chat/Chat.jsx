import { onMount, createSignal, For, onCleanup } from 'solid-js'
import injector from '../../injector/injector'

import Ranks from '../../utilities/Ranks'
import { Picker } from 'emoji-mart'

import { useI18n } from '../../i18n/context'
import lang from './RoomStore'
import Trivia from './Trivia'
import ChatEmojisButton from './ChatEmojisButton'
import ChatSendButton from './ChatSendButton'
import { EMOJIS } from './constants/emojis'
import SoundIcon from '../icons/SoundIcon'
import TooltipIcon from '../icons/TooltipIcon'
import RankLabel from './RankLabel'
import LoginButton from '../elements/LoginButton'

const Chat = (p) => {
  const { userObject, setUserObject, socket, toastr, setToggles } = injector

  const i18n = useI18n()

  const [msg, setMsg] = createSignal('')
  const [active, setActive] = createSignal(false)
  const [isEmojiesOpen, setEmojiesOpen] = createSignal(false)
  const [messageIdToDelete, setMessageIdToDelete] = createSignal()
  const [room, setRoom] = lang

  let emojiWrapper
  let sliderRef

  const updateSoundInputStyle = (value) => {
    sliderRef.style.background = `linear-gradient(to right, rgba(255, 180, 54, 1) 0%, rgba(255, 180, 54, 1) ${value}%, rgba(255, 255, 255, 0.08) ${value}%, rgba(255, 255, 255, 0.08) 100%)`
  }

  onMount(() => {
    const pickerOptions = {
      onEmojiSelect: (emoji) => {
        if (emoji?.native) {
          setMsg(msg() + emoji.native)
        } else {
          setMsg(msg() + '|' + emoji.shortcodes + '|')
        }
      },
      emojiSize: 24,
      dynamicWidth: true,
      perLine: 8,
      previewPosition: 'none',
      searchPosition: 'none',
      navPosition: 'none',
      categories: ['gifs'],
      custom: EMOJIS
    }
    emojiWrapper.appendChild(new Picker(pickerOptions))

    socket.on('chat:message:new', (message) => {
      setUserObject('chat', (prev) => {
        return [message, ...prev]
      })
      // scrollToBottom();
    })

    socket.on('chat:message:clear', () => {
      setUserObject('chat', [])
    })

    socket.on('chat:message:delete', (chat) => {
      setUserObject('chat', chat.reverse())

      // TA BORT MEDDELANDE
    })

    document.getElementById('chatHodler')?.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    if (sliderRef) {
      updateSoundInputStyle(userObject?.user?.sounds * 100 || 0)
    }
    sliderRef.addEventListener('input', (e) => {
      updateSoundInputStyle(e.target.value)
    })

    onCleanup(() => {
      sliderRef.removeEventListener('input', (e) => {
        updateSoundInputStyle(e.target.value)
      })
    })
  })

  const handleEnter = (e) => {
    const code = e.keyCode || e.which
    if (e.key === 'Enter' || code === 13) {
      e.preventDefault()
      sendMsg()
    }
  }

  const sendMsg = () => {
    if (!msg() || msg().trim == '') return

    socket.emit(
      'chat:message',
      {
        msg: msg(),
        room: room()
      },
      (data) => {
        if (data.msg) toastr(data)
      }
    )
    setMsg('')
    setEmojiesOpen(false)
  }

  const deleteChatMsg = () => {
    socket.emit(
      'chat:message:delete',
      {
        messageId: messageIdToDelete()
      },
      (data) => {
        if (data.msg) toastr(data)
        setMessageIdToDelete(undefined)
      }
    )
  }

  const toggleSounds = (volume) => {
    updateSoundInputStyle(volume * 100)
    socket.emit('system:sounds:toggle', { volume: volume * 100 }, (data) => {
      if (!data.error) {
        setUserObject('user', (prev) => ({ ...prev, sounds: data.data.sounds / 100 }))
      }
    })
  }

  return (
    <div
      id='chatHodler'
      class={`flex items-center flex-col w-full sm:w-[324px] h-full duration-200 z-30 ${
        active() ? 'right-0' : '-right-full sm:-right-[324px]'
      } llg:right-0 top-0 absolute llg:relative font-SpaceGrotesk`}
      style={{
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),linear-gradient(0deg, #1A1B30 100%, #21243B 100%)'
      }}
    >
      <div
        class={`absolute -left-16 bottom-28 sm:bottom-34 lg:bottom-4 w-12 h-12 rounded-4 bg-dark-28 hover flex llg:hidden justify-center items-center`}
        onClick={() => setActive((prev) => !prev)}
      >
        <p class='text-20 text-yellow-ffb font-bold'>{active() ? '>' : '<'}</p>
      </div>
      <div class='flex items-center flex-col w-full h-full relative overflow-hidden pt-32 sm:pt-0 llg:pt-0'>
        <div
          class='w-full h-[48px] flex justify-between gap-4 items-center py-2 pl-3 pr-6 border-b border-dark-1617'
          style={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), linear-gradient(90.04deg, #1A1B30 0%, #21243B 100%)'
          }}
        >
          <div
            class='flex sm:hidden justify-center items-center'
            onClick={() => setActive((prev) => !prev)}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z'
                fill='#8C98A9'
              />
            </svg>
          </div>
          <div
            class='h-8 w-[63px] px-3 py-[7px] flex items-center justify-between gap-2 border-2 rounded'
            style={{
              background:
                'radial-gradient(83.33% 153.41% at -50% 140.91%, rgba(255, 180, 54, 0.24) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))',
              'border-color': 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <span class='flex h-2 w-2 relative text-yellow-ffb'>
              <span
                class='animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform'
                style={{
                  'box-shadow': '0px 0px 5px 1px rgba(255, 180, 54, 0.72)'
                }}
              />
              <span class='relative inline-flex rounded-full h-2 w-2 bg-current' />
            </span>
            <p class='text-white text-sm font-bold'>{userObject.online}</p>
          </div>
          <div class='flex items-center justify-between gap-2'>
            <button
              class='w-5 h-5 p-1 flex items-center justify-center text-gray-9a border rounded'
              style={{
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
                'border-color': 'rgba(0, 0, 0, 0.05)'
              }}
            >
              <SoundIcon />
            </button>
            <input
              ref={sliderRef}
              type='range'
              class='sound-slider w-[181px] h-0.5 rounded-1 appearance-none'
              min='0'
              max='100'
              step='5'
              value={userObject?.user?.sounds * 100 || 0}
              onChange={(e) => toggleSounds(e.target.value ? e.target.value / 100 : 0)}
            />
          </div>
        </div>
        <div class='w-full flex-1 overflow-hidden relative pb-3'>
          <div
            class='absolute left-0 top-0 w-full h-34 z-40'
            style={{
              background: 'linear-gradient(180deg, #181A28 6.9%, rgba(24, 26, 40, 0) 79.65%)'
            }}
          />
          <div class='w-full max-h-full flex flex-col-reverse items-start h-full overflow-y-scroll relative'>
            <For each={userObject?.chat?.filter((mes) => mes.room === room())}>
              {(message) => (
                <div class='border-t-[1px] border-black/20 w-full relative'>
                  {messageIdToDelete() === message.id && (
                    <div class='w-8/12 center flex-col absolute bottom-full right-10 z-10'>
                      <div
                        class='bg-dark-22 flex flex-col p-3 w-full'
                        style={{
                          border: '1.5px solid rgba(140, 152, 169, 0.2)',
                          'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div class='text-white text-12 text-center mb-2'>
                          Do you want to delete this message? <br /> ID: {message.user.id} <br />{' '}
                          Name: {message.user.username}
                        </div>
                        <div class='flex justify-around items-center'>
                          <div
                            class='text-dark-18 hover:text-yellow-ff w-1/4 cursor-pointer'
                            onClick={() => deleteChatMsg()}
                          >
                            <svg
                              class='w-full h-fit'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlns:xlink='http://www.w3.org/1999/xlink'
                              version='1.1'
                              id='Capa_1'
                              x='0px'
                              y='0px'
                              viewBox='0 0 17.837 17.837'
                              style={{
                                'enable-background': 'new 0 0 17.837 17.837'
                              }}
                            >
                              <g>
                                <path
                                  d='M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27   c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0   L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z'
                                  fill='currentColor'
                                />
                              </g>
                            </svg>
                          </div>
                          <div
                            class='text-dark-18 hover:text-yellow-ff w-1/4 cursor-pointer'
                            onClick={() => setMessageIdToDelete(undefined)}
                          >
                            <svg
                              class='w-full h-fit iconify iconify--emojione-monotone'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlns:xlink='http://www.w3.org/1999/xlink'
                              width='64px'
                              height='64px'
                              viewBox='0 0 64 64'
                              aria-hidden='true'
                              role='img'
                              preserveAspectRatio='xMidYMid meet'
                            >
                              <path
                                d='M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z'
                                fill='currentColor'
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <svg
                        width='8'
                        height='8'
                        viewBox='0 0 8 8'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M7.48611 0H0.126953L3.80653 8L7.48611 0Z' fill='#373D54' />
                      </svg>
                    </div>
                  )}
                  <div class='py-3 pl-2 pr-6 flex gap-2'>
                    <div
                      class='rounded-full w-[42.4px] h-9 grow overflow-hidden cursor-pointer'
                      onClick={() => {
                        console.log(userObject?.user?.rank)
                        if (userObject?.user?.rank >= 3) {
                          setMessageIdToDelete(message.id)
                        }
                      }}
                    >
                      <img src={message?.user?.avatar} class='w-full h-full rounded-full' />
                    </div>

                    <div class='space-y-2 mt-1 w-full'>
                      <div
                        class='flex items-center gap-2 text-sm font-bold h-[26px] max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded'
                        style={{
                          background:
                            'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
                          'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        <Ranks
                          width={5}
                          staff={message?.user?.rank}
                          rank={message?.user?.level?.league}
                        />
                        <RankLabel
                          staff={message?.user?.rank}
                          rank={message?.user?.level?.league}
                        />
                        <span
                          class='text-gray-9aa truncate max-w-[100px]'
                          onClick={() => {
                            if (message.user.rank < 3)
                              window.open(
                                `http://steamcommunity.com/profiles/${message?.user?.steamid}`
                              )
                          }}
                        >
                          {message?.user?.username}
                        </span>
                      </div>
                      <p class='text-sm font-bold text-gray-92 break-words'>
                        {message?.msg
                          .split('|')
                          .map((item) =>
                            /:\w+:/.test(item) ? (
                              <em-emoji
                                class='align-text-bottom'
                                id={item.slice(1, item.length - 1)}
                                size='2em'
                              />
                            ) : (
                              item
                            )
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
        <Trivia />
        <div class='relative w-full mb-[11px]'>
          <div
            ref={emojiWrapper}
            class={`${!isEmojiesOpen() ? 'hidden' : ''} w-full absolute bottom-full`}
          />
        </div>
        <div class='w-full px-3 pt-3 pb-6 relative bg-dark-1d2 border-t border-dark-212 h-[92px]'>
          {userObject.authenticated ? (
            <div class='w-full relative center mb-3 z-30'>
              <div
                class='w-full chat-background-gradient rounded relative center z-30 py-[10px]'
                style={{
                  background:
                    'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%',
                  border: '2px solid rgba(255, 255, 255, 0.03)',
                  'box-shadow':
                    '0px 2px 2px rgba(0, 0, 0, 0.12), inset 0px 0px 8px rgba(56, 173, 99, 0.04)',
                  'backdrop-filter': 'blur(1.5px)'
                }}
              >
                <div class='w-full h-9' />
                <textarea
                  class='w-[220px] h-full absolute left-0 top-0 pl-4 py-4 pr-8 text-sm font-medium text-gray-92 placeholder:text-gray-92 resize-none'
                  placeholder={i18n.t('chat.enter message')}
                  onKeyDown={handleEnter.bind(this)}
                  value={msg()}
                  onInput={(e) => {
                    setMsg(e.currentTarget.value)
                  }}
                />
                <div class='absolute right-[10px] flex justify-center items-center gap-2'>
                  <ChatEmojisButton
                    isActive={isEmojiesOpen()}
                    onClick={() => setEmojiesOpen((prev) => !prev)}
                  />
                  <ChatSendButton onClick={sendMsg} />
                </div>
              </div>
            </div>
          ) : (
            <div class='py-3'>
              <LoginButton
                fullWidth
                onClick={() => {
                  setToggles('tosModal', true)
                }}
              />
            </div>
          )}
          {/* <div class='flex'>
            <div
              class='flex items-center cursor-pointer text-gray-9b hover:text-yellow-ff opacity-50 hover:opacity-100'
              onClick={() => {
                setToggles('chatRulesModal', true)
              }}
            >
              <span class='mr-2 text-12 font-semibold'>{i18n.t('chat.Chat rules')}</span>
              <TooltipIcon />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Chat
