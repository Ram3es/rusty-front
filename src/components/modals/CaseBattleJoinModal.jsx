import { For, createEffect, createSignal } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import injector from '../../injector/injector'

import Modal from './Modal'

import CaseGradientButton from '../elements/CaseGradientButton'
import RangePercentScale from '../elements/RangePercentScale'
import Toggle from '../elements/Toggle'
import Coin from '../../utilities/Coin'

import BattleRoyaleIcon from '../icons/BattleRoyaleIcon'
import BattleCursedIcon from '../icons/BattleCursedIcon'
import BattleGroupIcon from '../icons/BattleGroupIcon'
import UserPlaceholderIcon from '../icons/UserPlaceholderIcon'

import BodyVectorBackground from '../../assets/img/modals/caseBattlesJoinModalBg.png'

import { getProportionalPartByAmount } from '../../utilities/Numbers'
import { getColorByModeAndCursed } from '../../utilities/games/caseBattles'
import { URL } from '../../libraries/url'
import { getJoinTeam } from '../../views/caseBattles/GameCaseBattle'

const CaseBattleJoinModal = (props) => {
  const { socket, userObject, toastr } = injector

  const [setup, setSetup] = createSignal({
    player_index: null,
    team: null,
    urlKey: null,
    borrowMoney: 0,
    borrowPercent: 0
  })

  const navigate = useNavigate()

  const joinGame = (gameId) => {
    if (setup().player_index) {
      socket.emit(
        'battles:join',
        {
          gameId,
          team: getJoinTeam(props.game?.mode, setup().player_index),
          player_index: setup().player_index,
          borrowMoney: setup().borrowMoney,
          borrowPercent: Math.floor(setup().borrowPercent * 0.8)
        },
        (data) => {
          if (!data.error) {
            navigate(`${URL.GAMEMODES.CASE_BATTLES_GAME}?id=${gameId}`)
            props?.handleClose()
          } else {
            toastr({error: data.error, msg: data.message})
          }
        }
      )
    }
  }

  const modeColor = () => getColorByModeAndCursed(props.game?.mode, props.game?.cursed)

  createEffect(() => {
    console.log(userObject, 'userObject')
  })

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true
      }}
      handler={() => {}}
    >
      <div onClick={props?.handleClose} class='w-full h-full absolute left-0 top-0' />
      
      <div
        class='rounded-xl flex flex-col absolute top-32 lg:w-[768px] max-h-[600px] overflow-x-scroll'
        style={{
          background:
            'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
          'backdrop-filter': 'blur(8px)'
        }}
      >
      <div
              class='absolute top-5 left-1/2 -translate-x-1/2 w-max center px-5 py-3 border-white border-opacity-5 text-gray-9a border rounded-4 flex gap-1 items-center'
              classList={{
                'hover:border-yellow-ffb': modeColor() === 'yellow',
                'hover:border-[#DAFD09]': modeColor() === 'green',
                'hover:border-[#5AC3FF]': modeColor() === 'blue'
              }}
            >
              <For each={Array.from(Array(props.game?.playersQty).keys())}>
                {(value, index) => (
                  <>
                    <UserPlaceholderIcon additionClasses='w-3.5' />
                    {index() + 1 !== props.game?.playersQty && (
                      <>
                        {props.game?.cursed === 1 && <BattleCursedIcon additionClasses='w-3' />}
                        {props.game?.mode === 'group' && props.game?.cursed !== 1 && (
                          <BattleGroupIcon additionClasses='w-3' />
                        )}
                        {(props.game?.mode === 'royal' || props.game?.mode === 'team') &&
                          props.game?.cursed !== 1 && <BattleRoyaleIcon additionClasses='w-3' />}
                      </>
                    )}
                  </>
                )}
              </For>
              <p
                class='ml-1.5 font-SpaceGrotesk text-14 font-bold text-yellow-ffb capitalize'
                classList={{
                  'text-yellow-ffb': modeColor() === 'yellow',
                  'text-[#DAFD09]': modeColor() === 'green',
                  'text-[#5AC3FF]': modeColor() === 'blue'
                }}
              >
                Battle {props.game?.mode}
              </p>
            </div>
        <div class='border border-black/20 w-full pl-[22px] pr-8 py-5 relative transition-all duration-100 ease-out flex gap-3 lg:gap-0 justify-between items-center h-[88px]'>
          <div class='uppercase text-white font-SpaceGrotesk text-20'>join battle</div>
          <div
            onClick={props.handleClose}
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
          </div>
        </div>
        <div class='relative flex flex-col items-center justify-center mb-8 '
        style={{
          background: 'linear-gradient(180deg,  rgba(217, 217, 217, 0) 70%, rgba(27,30,56,1 ) 100%)'
        }}>
          <div
            class=' absolute w-full h-full z-[-1]'
            style={{ 'background-image': `url('${BodyVectorBackground}')`, opacity: 0.004 }}
          />
          <div class='flex flex-col gap-4 my-8'>
            <div class='flex flex-col items-center gap-2'>
              <span class='font-SpaceGrotesk text-13 font-bold text-gray-a2'>Choose your spot</span>
              <div
                class='border border-gray-600/50 rounded-6 flex items-center gap-2.5 px-4 py-2.5'
                style={{
                  background:
                    'radial-gradient(100% 275.07% at 0% 100%, rgba(29, 35, 82, 0.56) 0%, rgba(29, 31, 48, 0.56) 100%), radial-gradient(220.05% 51.82% at 60.38% 107.3%, #1F2344 0%, #23253D 100%)',
                  'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                }}
              >
                <For
                  each={Array.from(
                    { length: props.game?.playersQty },
                    (_, i) => props.game?.players[i + 1] || null
                  )}
                >
                  {(player, index) => (
                    <>
                      <div
                        onClick={() => {
                          if (player !== null || player?.id === userObject.user?.id) return
                          setSetup((prevState) => ({
                            ...prevState,
                            player_index: setup().player_index === index() + 1 ? null : index() + 1
                          }))
                        }}
                        class={`cursor-pointer rounded-full flex items-center justify-center w-12 h-12 grow bg-blue-282 ${
                          !player && setup().player_index !== index() + 1 && 'text-gray-9a'
                        } ${
                          !player
                            ? modeColor() === 'yellow'
                              ? 'hover:border hover:border-yellow-ffb hover:text-yellow-ffb'
                              : modeColor() === 'green'
                              ? 'hover:border hover:border-[#DAFD09] hover:text-[#DAFD09]'
                              : 'hover:border hover:border-[#5AC3FF] hover:text-[#5AC3FF]'
                            : ''
                        }`}
                        classList={{
                          'border border-yellow-ffb text-yellow-ffb':
                            setup().player_index === index() + 1 && modeColor() === 'yellow',
                          'border border-[#DAFD09] text-[#DAFD09]':
                            setup().player_index === index() + 1 && modeColor() === 'green',
                          'border border-[#5AC3FF] text-[#5AC3FF]':
                            setup().player_index === index() + 1 && modeColor() === 'blue'
                        }}
                      >
                        {player ? (
                          <img class='rounded-full' src={player.avatar} alt='steam-avatar' />
                        ) : userObject.authenticated && setup().player_index === index() + 1 ? (
                          <img
                            class='rounded-full'
                            src={
                              userObject.user?.avatar ??
                              'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg'
                            }
                            alt='steam-avatar'
                          />
                        ) : (
                          <UserPlaceholderIcon />
                        )}
                      </div>
                      {index() + 1 !== props.game?.playersQty && (
                        <>
                          {props.game?.cursed === 1 && (
                            <BattleCursedIcon additionClasses='text-[#DAFD09] w-5' />
                          )}
                          {props.game?.mode === 'group' && props.game?.cursed !== 1 && (
                            <BattleGroupIcon additionClasses='text-[#5AC3FF] w-5' />
                          )}
                          {(props.game?.mode === 'royal' || props.game?.mode === 'team') &&
                            props.game?.cursed !== 1 && (
                              <BattleRoyaleIcon additionClasses='w-5 text-yellow-ffb' />
                            )}
                        </>
                      )}
                    </>
                  )}
                </For>
              </div>
            </div>
            <CaseGradientButton
              isFullWidth
              callbackFn={() => joinGame(props.game?.id)}
              color={modeColor()}
            >
              <div class='flex gap-2 items-center'>
                {modeColor() === 'yellow' ? (
                  <BattleRoyaleIcon additionClasses='w-4 text-yellow-ffb' />
                ) : modeColor() === 'green' ? (
                  <BattleCursedIcon additionClasses='text-[#DAFD09] w-5' />
                ) : (
                  <BattleGroupIcon additionClasses='text-[#5AC3FF] w-5' />
                )}
                <span
                  class={`text-yellow-ffb font-SpaceGrotesk text-16 font-bold`}
                  classList={{
                    'text-yellow-ffb': modeColor() === 'yellow',
                    'text-[#DAFD09]': modeColor() === 'green',
                    'text-[#5AC3FF]': modeColor() === 'blue'
                  }}
                >
                  Join
                </span>
                <Coin width='5' />
                <span class='text-gradient'>{props.game?.fundBattle ? props.game?.totalValue - (props.game?.totalValue * (props.game?.fundPercent / 100)) : props.game?.totalValue}</span>
              </div>
            </CaseGradientButton>
          </div>
          <div class='flex flex-col w-[330px] lg:w-fit lg:min-w-[360px] xll:min-w-[420px] fourk:min-w-[439px]'>
            <div
              class='flex items-center justify-between rounded-6 h-[80px] lg:h-[60px]'
              style={{
                background:
                  'radial-gradient(50% 100% at 50% 0%, rgba(39, 242, 120, 0.12) 0%, rgba(39, 242, 120, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)'
              }}
            >
              <div class='h-full grow px-2 lg:px-4 py-3 flex gap-3 border border-white border-opacity-5 rounded-l'>
                <div class='border border-green-27/30 rounded-4 w-9 h-9 flex items-center justify-center'>
                  <div
                    class='w-full h-full rounded-4 flex items-center justify-center'
                    style={{
                      background:
                        'radial-gradient(162.5% 100% at 50% 0%, rgba(159, 151, 249, 0.12) 0%, rgba(159, 151, 249, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(272.05% 172.05% at 50% 0%, #1D2352 0%, #1D1F30 100%)',
                      'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      style={{
                        filter: 'drop-shadow(0px 0px 8px rgba(39, 242, 120, 0.48))'
                      }}
                    >
                      <path
                        d='M12.9072 0.00222778V9.09496H22C21.9955 4.06896 17.9287 0.00222778 12.9072 0.00222778Z'
                        fill='#27F278'
                      />
                      <path
                        d='M10.061 21.9977C4.51259 21.9977 0 17.4851 0 11.9367C0 6.38831 4.51259 1.87122 10.061 1.87122H11.0338V10.9639H20.1265V11.9367C20.1265 17.4851 15.6139 21.9977 10.061 21.9977ZM9.08823 3.87531C5.07103 4.35719 1.94555 7.78892 1.94555 11.9367C1.94555 16.4088 5.58894 20.0522 10.061 20.0522C14.2088 20.0522 17.636 16.9267 18.1179 12.9095H9.08823V3.87531Z'
                        fill='#27F278'
                      />
                    </svg>
                  </div>
                </div>
                <div class='flex flex-col font-SpaceGrotesk font-bold text-13'>
                  <p class='text-green-27 flex items-center gap-1.5'>
                    Borrow Money{' '}
                    <span class='cursor-pointer'>
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.4801 2.08668C11.5267 1.00001 9.48008 0.333344 7.00008 0.333344C4.52008 0.333344 2.47341 1.00001 1.52008 2.08668C-0.0665886 3.92668 -0.0665886 10.0867 1.52008 11.9133C2.47341 13 4.52008 13.6667 7.00008 13.6667C9.48008 13.6667 11.5267 13 12.4801 11.9133C14.0667 10.0733 14.0667 3.92668 12.4801 2.08668ZM7.00008 3.50001C7.1649 3.50001 7.32601 3.54888 7.46305 3.64045C7.60009 3.73202 7.7069 3.86217 7.76998 4.01444C7.83305 4.16671 7.84955 4.33427 7.8174 4.49592C7.78525 4.65757 7.70588 4.80606 7.58933 4.9226C7.47279 5.03914 7.3243 5.11851 7.16265 5.15066C7.001 5.18282 6.83345 5.16632 6.68118 5.10324C6.5289 5.04017 6.39875 4.93336 6.30719 4.79632C6.21562 4.65928 6.16675 4.49816 6.16675 4.33334C6.16675 4.11233 6.25454 3.90037 6.41082 3.74409C6.5671 3.58781 6.77906 3.50001 7.00008 3.50001ZM7.66675 10.6667H6.33341C6.1566 10.6667 5.98703 10.5964 5.86201 10.4714C5.73698 10.3464 5.66675 10.1768 5.66675 10C5.66675 9.8232 5.73698 9.65363 5.86201 9.52861C5.98703 9.40358 6.1566 9.33334 6.33341 9.33334V7.33334C6.1566 7.33334 5.98703 7.26311 5.86201 7.13808C5.73698 7.01306 5.66675 6.84349 5.66675 6.66668C5.66675 6.48987 5.73698 6.3203 5.86201 6.19527C5.98703 6.07025 6.1566 6.00001 6.33341 6.00001H7.00008C7.17689 6.00001 7.34646 6.07025 7.47148 6.19527C7.59651 6.3203 7.66675 6.48987 7.66675 6.66668V9.33334C7.84356 9.33334 8.01313 9.40358 8.13815 9.52861C8.26317 9.65363 8.33341 9.8232 8.33341 10C8.33341 10.1768 8.26317 10.3464 8.13815 10.4714C8.01313 10.5964 7.84356 10.6667 7.66675 10.6667Z'
                          fill='#878CBD'
                        />
                      </svg>
                    </span>
                  </p>
                  <span class='text-gray-a2'>Create a battle for a fraction of the cost!</span>
                </div>
              </div>
              <div class='center px-4 py-3 bg-white bg-opacity-[0.01] rounded-r-6 border h-full border-white border-opacity-5'>
                <Toggle
                  checked={setup().borrowMoney === 1}
                  onChange={(isChecked) =>
                    setSetup((prev) => ({ ...prev, borrowMoney: isChecked ? 1 : 0 }))
                  }
                  color='green-27'
                />
              </div>
            </div>
            {setup().borrowMoney === 1 && (
              <div
                class='flex flex-col items-center justify-center gap-3.5 pt-3.5 rounded-b-6'
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)'
                }}
              >
                <div
                  class='rounded px-4 py-2 w-max'
                  style={{
                    background: 'linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)'
                  }}
                >
                  <p class='font-SpaceGrotesk text-gray-a2 text-13 font-bold flex items-center justify-center gap-1.5'>
                    Borrow amount: <Coin />{' '}
                    <span
                      class='text-gradient-green-secondary text-sm'
                      style={{
                        'text-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                      }}
                    >
                      {getProportionalPartByAmount(
                        props.game?.totalValue,
                        Math.floor(setup().borrowPercent * 0.8)
                      )}
                    </span>
                  </p>
                </div>
                <RangePercentScale
                  value={setup().borrowPercent}
                  setter={(per) => setSetup((prev) => ({ ...prev, borrowPercent: per }))}
                  maxPercent={80}
                  hexColor='#27F278'
                />
                <div
                  class='rounded-b-6 py-1.5 w-full'
                  style={{
                    background: 'linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)'
                  }}
                >
                  <p class='text-center font-SpaceGrotesk text-11 font-bold text-white'>
                    On win you receive{' '}
                    <span class='text-green-27'>{100 - Math.floor(setup().borrowPercent * 0.8)}%</span> of
                    total win amount!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CaseBattleJoinModal
