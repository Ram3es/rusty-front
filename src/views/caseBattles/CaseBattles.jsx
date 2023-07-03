import { createEffect, createSignal, For, Show } from 'solid-js'
import Fallback from '../Fallback'
import PageLoadState from '../../libraries/PageLoadState'
import injector from '../../injector/injector'
import { createStore } from 'solid-js/store'
import Coin from '../../utilities/Coin'
import { NavLink } from 'solid-app-router'
import { URL } from '../../libraries/url'
import GrayGradientButton from '../../components/elements/GrayGradientButton'
import YellowGradientButton from '../../components/elements/CaseGradientButton'
import BattleRoyaleIcon from '../../components/icons/BattleRoyaleIcon'
import BattleCursedIcon from '../../components/icons/BattleCursedIcon'
import BattleGroupIcon from '../../components/icons/BattleGroupIcon'
import CasesCounter from '../../components/battle/CasesCounter'
import DarkWrapperdWithBorders from '../../components/battle/DarkWrapperdWithBorders'
import ArrowDownWithGradient from '../../components/icons/ArrowDownWithGradient'
import UserGameAvatar from '../../components/battle/UserGameAvatar'
import CaseViewModal from '../../components/modals/CaseViewModal'
import Dropdown from '../../components/elements/Dropdown'
import CaseBattleJoinModal from '../../components/modals/CaseBattleJoinModal'
import { tippy, useTippy } from 'solid-tippy';
import CaseToolTip from "../../components/battle/CaseToolTip"

const sortByOptions = ['ASC', 'DESC']

const CaseBattles = (props) => {
  const { battlesPageLoaded, onBattlesPageLoaded } = PageLoadState
  const { socket, userObject } = injector
  const [games, setGames] = createStore({})
  const [casesState, setCasesState] = createSignal([])
  const [sortBy, setSortBy] = createSignal(sortByOptions[0])
  const [caseViewModal, setCaseViewModal] = createSignal(false)
  const [caseViewModalItem, setCaseViewModalItem] = createSignal(null)
  const [joinModal, setJoinModal] = createSignal({ isOpen: false, game: null })

  createEffect(() => {
    if (props.loaded()) {
      socket.emit('battles:cases', {}, (data) => {
        setCasesState(data.data.cases)
      })
      onBattlesPageLoaded(true)
      socket.emit('battles:connect', {}, (data) => {
        console.log("battles:cases", data.data);
        setGames({...data.data.games, ...data.data.history})
      })
      socket.on(`battles:update`, (data) => {
        setGames(data.gameId, data.data)
      })
    }
  })

  // const getJoinTeam = (playerIndex, mode) => {
  //   if (mode === 'group') {
  //     return 1
  //   } else if (mode === 'royal') {
  //     return playerIndex
  //   } else if (playerIndex <= 2) {
  //     return 1
  //   } else {
  //     return 2
  //   }
  // }

  // const joinGame = (gameId) => {
  //   const gameToJoin = games[gameId]
  //   const freeIndexes = Array.from({ length: gameToJoin.playersQty }, (_, i) => i + 1).filter(
  //     (index) => !gameToJoin.players[index]
  //   )

  //   socket.emit(
  //     'battles:join',
  //     {
  //       gameId: gameId,
  //       team: getJoinTeam(freeIndexes[0], gameToJoin.mode),
  //       player_index: freeIndexes[0]
  //     },
  //     (data) => {
  //       console.log(data)
  //     }
  //   )
  // }

  // const replyGame = (gameId) => {
  //   const gameToReply = games[gameId]
  //   const data = {
  //     mode: gameToReply.mode,
  //     players: gameToReply.playersQty,
  //     cases:
  //       gameToReply.cases?.reduce((prev, cur) => {
  //         const ind = prev.findIndex((item) => item.caseId === cur.id)
  //         if (ind >= 0) {
  //           prev[ind].qty++
  //         } else {
  //           prev.push({
  //             caseId: cur.id,
  //             qty: 1
  //           })
  //         }
  //         return prev
  //       }, []) || [],
  //     cursed: gameToReply.cursed,
  //     private: gameToReply.private
  //   }
  //   socket.emit('battles:create', data, (data) => {
  //     console.log(data)
  //   })
  // }

  const toggleCaseViewModal = () => {
    setCaseViewModal(!caseViewModal())
  }

  const toggleJoinModal = () => {
    setJoinModal((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }))
  }

  const handleOpenJoinModal = (game) => {
    toggleJoinModal()
    setJoinModal((prevState) => ({
      ...prevState,
      game
    }))
  }

  return (
    <Fallback loaded={battlesPageLoaded}>
      <div class="flex flex-col py-6 gap-2 min-h-[100vh]">
          <div class= "w-full grid grid-cols-3 gap-3 items-center bg-control-panel">
          <div class=" col-span-3 sm:col-span-1 w-full flex justify-center md:justify-start">
            <Dropdown 
              label=' Sort by Price:'
              activeName={sortBy()}
              itemsList={sortByOptions}
              submitItem={(direction) => setSortBy(direction)}
            />
          </div>
          <div
            class=" col-span-3 md:col-span-1 row-start-1 md:row-start-auto h-full py-4 px-12 center flex-col gap-1"
            style={{
              background:
                'linear-gradient(270deg, rgba(82, 215, 135, 0) 0%, rgba(82, 215, 135, 0.12) 50%, rgba(82, 215, 135, 0) 100%)'
            }}
          >
            <div class='text-13 font-SpaceGrotesk text-gray-a2 font-bold w-max'>Case Battles</div>
            <div class='text-gradient-green-secondary w-max font-SpaceGrotesk font-bold text-14'>
              {Object.values(games).filter(g => g.status !== "ended" && (!g.private || g.owner == userObject.user?.id)).length} Active Battles
            </div>
          </div>
          <div class=" col-span-3 sm:col-span-2 md:col-span-1 w-full flex flex-wrap-reverse py-0 md:py-2 gap-3 justify-center md:justify-end">
            <NavLink href={URL.GAMEMODES.CASE_BATTLES_CREATE}>
              <YellowGradientButton callbackFn={() => {}}>
                <div class='center text-14 font-SpaceGrotesk gap-2 text-yellow-ffb font-bold'>
                  <BattleRoyaleIcon additionClasses='w-4' />
                  <span>Create Battle</span>
                </div>
              </YellowGradientButton>
            </NavLink>
          </div>
        </div>
        <div class="w-full flex font-SpaceGrotesk text-13 text-[#A2A5C6] font-semibold">
            <div class="ml-8">Mode</div>
            <div class="ml-11">Cases</div>
            <div class="w-full flex-1" />
            <div class="mr-32 hidden sm:block">Participants</div>
        </div>
        <div class='flex flex-col gap-3 px-0.5'>
          <For
            each={Object.keys(games)?.sort((a, b) => {
              const calculations =
              -(
                  (games[a].status == 'open'  ? 2 : games[a].status == 'playing' || games[a].status == 'pending' ? 1 : 0) +
                  (1 - 1 / games[a].totalValue * (sortBy() === sortByOptions[0] ? 1 : -1))
                ) +
                ((games[b].status == "open"  
                  ? 2 
                  : games[b].status == "playing" || games[b].status == "pending"
                  ? 1
                  : 0) +
                  (1 - 1 / games[b].totalValue) );
              return calculations
            }).filter(g => !games[g].private || games[g].owner === userObject.user.id)}>
            {(id) => (<div
                class="flex flex-col sm:flex-row w-full items-stretch min-h-[116px] bg-opacity-40 gap-2 case-battle-card"
                classList={{
                  'cursed-case-battle': games[id]?.cursed === 1,
                  'group-case-battle': games[id]?.mode === 'group' && games[id]?.cursed !== 1,
                  'royal-case-battle':
                    (games[id]?.mode === 'royal' || games[id]?.mode === 'team') &&
                    games[id]?.cursed !== 1
                }}
                style={{
                  transform: 'translate3d(0,0,0)' 
                }}
              >
                <div class='p-4 w-full flex gap-3 md:border-r border-dark-1617 relative z-10'>
                  <div class='battle-info min-w-[4rem] w-16 center gap-3 flex-col'>
                    {games[id]?.cursed === 1 && (
                      <BattleCursedIcon additionClasses='w-8 text-[#DAFD09]' />
                    )}
                    {games[id]?.mode === 'group' && games[id]?.cursed !== 1 && (
                      <BattleGroupIcon additionClasses='text-[#5AC3FF] w-7' />
                    )}
                    {(games[id]?.mode === 'royal' || games[id]?.mode === 'team') &&
                      games[id]?.cursed !== 1 && (
                        <BattleRoyaleIcon additionClasses='w-6 text-yellow-ffb' />
                      )}
                    <div
                      classList={{
                        'text-[#DAFD09]': games[id]?.cursed === 1,
                        'text-[#5AC3FF]': games[id]?.mode === 'group' && games[id]?.cursed !== 1,
                        'text-yellow-ffb':
                          (games[id]?.mode === 'royal' || games[id]?.mode === 'team') &&
                          games[id]?.cursed !== 1
                      }}
                    >
                      {games[id].status == 'open' ? (
                        <span>
                          {Object.values(games[id]?.players).length} / {games[id]?.playersQty}
                        </span>
                      ) : games[id].status == 'playing' ? (
                        <span class='text-13 font-SpaceGrotesk font-bold'>STARTED</span>
                      ) :  games[id].status == 'pending' ? (
                        <span class='text-13 font-SpaceGrotesk font-bold'>PENDING</span>
                      ) : (
                        <span class='text-13 font-SpaceGrotesk font-bold'>ENDED</span>
                      )}
                    </div>
                  </div>

                  <div class='grow rounded-6 grid grid-cols-[64px_1fr] bg-dark-primary-gradient'>
                    <DarkWrapperdWithBorders
                      isActive={games[id]?.status === 'open' || games[id]?.status === 'playing' || games[id]?.status === 'pending'}
                      classes='rounded-l-6'
                    >
                      <div
                        class={`w-16 center flex-col gap-2 ${
                          games[id]?.status !== 'open' &&
                          games[id]?.status !== 'playing' &&
                          games[id]?.status !== 'pending' &&
                          'brightness-50 grayscale'
                        }`}
                      >
                        <CasesCounter
                          roundsCount={games[id]?.cases?.length}
                          currentRound={
                            games[id]?.status === 'open' || games[id]?.status === 'playing' || games[id]?.status === 'pending'
                              ? games[id]?.currentRound
                              : games[id]?.currentRound + 1
                          }
                        />
                      </div>
                    </DarkWrapperdWithBorders>
                    <div class='w-full overflow-x-scroll'>
                      <Show when={games[id]?.status !== 'playing'}>
                        <div class='flex items-center w-max relative'>
                          <For
                            each={
                              games[id]?.cases?.reduce((prev, cur) => {
                                const ind = prev.findIndex((item) => item.name === cur.name)
                                if (ind >= 0) {
                                  prev[ind].count++
                                } else {
                                  prev.push({
                                    name: cur.name,
                                    image: cur.image,
                                    id: cur.id,
                                    count: 1
                                  })
                                }
                                return prev
                              }, []) || []
                            }
                          >
                            {(caseItem) => (
                              <div
                                class={`relative cursor-pointer pointer-events-auto`}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  const caseIndexToShow = casesState().findIndex(
                                    (c) => c.id === caseItem.id
                                  )
                                  setCaseViewModalItem(casesState()[caseIndexToShow])
                                  toggleCaseViewModal()
                                }}
                                use:tippy={{
                                            props: {
                                              content: (
                                                <CaseToolTip price={casesState()[casesState().findIndex((c) => c.id === caseItem.id)].price}
                                                  name={caseItem.name}
                                                />
                                              ),
                                              allowHTML: true,
                                              duration: 0,
                                            },
                                            hidden: true,
                                              }}
                              >
                                <img
                                  alt={caseItem.name}
                                  class={`h-[101px] w-[138px] ${
                                    games[id]?.status === 'open' || games[id]?.status === 'playing'
                                      ? ''
                                      : 'opacity-20'
                                  }`}
                                  src={caseItem?.image?.replace('{url}', window.origin).replace('.png', '_thumbnail.png') || ''}
                                />
                                <div class='absolute right-3 top-3'>
                                  <DarkWrapperdWithBorders isActive={true} classes='rounded-3'>
                                    <span class='px-[6px] py-0.5 center leading-[12px] text-12 font-SpaceGrotesk font-bold text-yellow-ffb'>
                                      {caseItem?.count}
                                    </span>
                                  </DarkWrapperdWithBorders>
                                </div>
                              </div>
                            )}
                          </For>
                        </div>
                      </Show>
                      <Show when={games[id]?.status === 'playing'}>
                        <div
                          class='flex items-center h-full w-max relative transition-transform duration-75'
                          style={{
                            transform: `translateX(-${
                              138 * (games[id].currentRound > 1 ? games[id].currentRound - 1 : 0)
                            }px)`,
                            transition: "all 0.4s ease-in-out",
                          }}
                        >
                          {games[id].currentRound >= 0 && (
                            <div
                              class='absolute left-0 top-0 h-full w-[138px] transition-transform duration-75'
                              style={{
                                background:
                                  'linear-gradient(270deg, rgba(255, 180, 54, 0) 0%, rgba(255, 180, 54, 0.12) 50%, rgba(255, 180, 54, 0) 100%)',
                                border: '1px solid',
                                'border-image':
                                  'linear-gradient(180deg, rgba(255, 180, 54, 0) -37.12%, rgba(255, 180, 54, 0.36) 100%) 1',
                                transform: `translateX(${138 * games[id]?.currentRound}px)`
                              }}
                            >
                              <span class='absolute left-1/2 -top-[1px] -translate-x-1/2'>
                                <ArrowDownWithGradient />
                              </span>
                              <span class='absolute left-1/2 -bottom-[1px] -translate-x-1/2 rotate-180'>
                                <ArrowDownWithGradient />
                              </span>
                            </div>
                          )}
                          <For each={games[id]?.cases || []}>
                            {(caseItem, index) => (
                              <div
                                class={`relative cursor-pointer ${
                                  index() < games[id].currentRound && 'opacity-20'
                                }`}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  setCaseViewModalItem(caseItem)
                                  toggleCaseViewModal()
                                }}
                                use:tippy={{
                                  props: {
                                    content: (
                                      <CaseToolTip price={casesState()[casesState().findIndex((c) => c.id === caseItem.id)].price}
                                        name={caseItem.name}
                                      />
                                    ),
                                    allowHTML: true,
                                    duration: 0,
                                  },
                                  hidden: true,
                                    }}
                              >
                                <img
                                  alt={caseItem.name}
                                  class='h-[101px] w-[138px]'
                                  src={caseItem?.image?.replace('{url}', window.origin).replace('.png', '_thumbnail.png') || ''}
                                />
                              </div>
                            )}
                          </For>
                        </div>
                      </Show>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 flex-col px-9 py-4 min-w-[327px] relative z-10">
                  <div class="center gap-2 users-wrapper-gradient w-full h-14 px-3">
                    <For each={Array.from(Array(games[id]?.playersQty).keys())}>
                      {(userIndex) => (
                        <>
                          <UserGameAvatar
                            mode={
                              games[id]?.cursed === 1
                                ? 'cursed'
                                : games[id]?.mode === 'group' && games[id]?.cursed !== 1
                                ? 'group'
                                : 'royal'
                            }
                            isBot={
                              games[id]?.players[userIndex + 1] &&
                              !games[id]?.players[userIndex + 1]?.avatar
                            }
                            avatar={games[id]?.players[userIndex + 1]?.avatar}
                            name={games[id]?.players[userIndex + 1]?.name}
                            widthClasses={games[id]?.status !== 'ended' || !!games[id]?.players[userIndex + 1]?.winner ? 'w-9 h-9' : 'w-6 h-6'}
                            opacityClasses={games[id]?.status !== 'ended' || !games[id]?.players[userIndex + 1]?.winner && 'opacity-20'}
                          />
                          {userIndex + 1 !== games[id]?.playersQty &&
                          (games[id]?.mode === "royal" ||
                            games[id]?.mode === "group" ||
                            (games[id]?.mode === "team" &&
                              userIndex !== 0 &&
                              userIndex !== 2)) &&
                          ((games[id]?.mode === 'royal' || games[id]?.mode === 'team') &&
                          games[id]?.cursed !== 1 ? (
                            <BattleRoyaleIcon additionClasses='w-3 text-yellow-ffb' />
                          ) : games[id]?.cursed === 1 ? (
                            <BattleCursedIcon additionClasses='text-[#DAFD09] w-4' />
                          ) : (
                            <BattleGroupIcon additionClasses='text-[#5AC3FF] w-3' />
                          ))}
                        </>
                      )}
                    </For>
                  </div>
                  <div class='flex items-center text-gray-9b gap-2'>
                    {games[id].status === 'open' ? (
                      <YellowGradientButton
                        isFullWidth={true}
                        callbackFn={() => {
                          handleOpenJoinModal(games[id])
                        }}
                        classList={"flex-1 w-full"}
                      >
                        <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center'>
                          <span class='w-max'>Join</span>
                          <Coin width='5' />
                          <span class='text-gradient'>{games[id]?.fundBattle ? (games[id]?.totalValue - (games[id]?.totalValue * (games[id]?.fundPercent / 100))).toFixed() : games[id]?.totalValue}</span>
                          {games[id].fundBattle ? <div
                            class={"rounded-2 border border-[#0BBD52]/10 px-1 w-[29px] center text-green-3e font-Quicksand font-bold text-10"}
                            style={{
                                background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                            }}
                            >
                              -{games[id].fundPercent}%
                          </div> : ""}
                        </div>
                      </YellowGradientButton>
                    ) : games[id].status === 'playing' || games[id]?.status === 'pending' ? (
                      <div
                        class={`h-10 px-4 rounded-4 flex center cursor-pointer w-full bg-white bg-opacity-5`}
                        style={{
                          'box-shadow':
                            '0px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center'>
                          <span class='w-max'>{games[id].status === 'playing' ? 'In Play' : 'Pending'}:</span>
                          <Coin width='5' />
                          <span class='text-gradient'>{games[id]?.totalValue}</span>
                        </div>
                      </div>
                    ) : (
                      <NavLink class='w-full' href={`${URL.GAMEMODES.CASE_BATTLES_GAME}?id=${id}${games[id].urlKey ? `&key=${games[id].urlKey}` : ""}&reply=true`}>
                        <div
                          class={`h-10 px-4 rounded-4 flex center cursor-pointer w-full border border-white border-opacity-5 `}
                          style={{
                            'box-shadow':
                              '0px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.12)'
                          }}
                        >
                          <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center'>
                            <svg
                              width='16'
                              height='17'
                              viewBox='0 0 16 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M7.53845 0.385498C9.69274 0.385498 11.7591 1.23993 13.2843 2.76139C14.0388 3.51594 14.6373 4.41172 15.0457 5.39759C15.4541 6.38345 15.6642 7.4401 15.6642 8.50719C15.6642 9.57429 15.4541 10.6309 15.0457 11.6168C14.6373 12.6027 14.0388 13.4984 13.2843 14.253C12.5297 15.0075 11.6339 15.6061 10.6481 16.0144C9.66219 16.4228 8.60554 16.633 7.53845 16.633C6.47136 16.633 5.41471 16.4228 4.42885 16.0144C3.44298 15.6061 2.5472 15.0075 1.79265 14.253C1.73295 14.1953 1.68533 14.1264 1.65258 14.0501C1.61982 13.9738 1.60258 13.8918 1.60185 13.8088C1.60113 13.7258 1.61695 13.6435 1.64838 13.5667C1.6798 13.4899 1.72622 13.4201 1.7849 13.3614C1.84359 13.3027 1.91338 13.2563 1.9902 13.2249C2.06701 13.1935 2.14932 13.1776 2.23232 13.1784C2.31531 13.1791 2.39733 13.1963 2.47359 13.2291C2.54985 13.2618 2.61882 13.3095 2.67648 13.3692C3.63807 14.3307 4.86318 14.9855 6.1969 15.2507C7.53061 15.516 8.91303 15.3798 10.1693 14.8593C11.4257 14.3389 12.4994 13.4577 13.2549 12.327C14.0104 11.1963 14.4136 9.86703 14.4136 8.50719C14.4136 7.14736 14.0104 5.81805 13.2549 4.68738C12.4994 3.55671 11.4257 2.67545 10.1693 2.15504C8.91303 1.63462 7.53061 1.49843 6.1969 1.76368C4.86318 2.02893 3.63807 2.68371 2.67648 3.64522L1.91579 4.40653H4.37537C4.54114 4.40653 4.70013 4.47239 4.81735 4.58961C4.93457 4.70683 5.00042 4.86581 5.00042 5.03159C5.00042 5.19736 4.93457 5.35634 4.81735 5.47356C4.70013 5.59078 4.54114 5.65664 4.37537 5.65664H0.625053C0.459279 5.65664 0.300294 5.59078 0.183074 5.47356C0.0658537 5.35634 0 5.19736 0 5.03159V1.28127C0 1.11549 0.0658537 0.956509 0.183074 0.839288C0.300294 0.722068 0.459279 0.656215 0.625053 0.656215C0.790827 0.656215 0.949812 0.722068 1.06703 0.839288C1.18425 0.956509 1.25011 1.11549 1.25011 1.28127V3.30456L1.79265 2.76139C3.31782 1.23993 5.38416 0.385498 7.53845 0.385498ZM6.57245 11.6553C6.47524 11.7137 6.36397 11.7446 6.25054 11.7446C6.08477 11.7446 5.92578 11.6788 5.80856 11.5616C5.69134 11.4443 5.62549 11.2854 5.62549 11.1196V6.44419C5.62518 6.3334 5.65432 6.22452 5.70993 6.1287C5.76554 6.03287 5.84562 5.95355 5.94197 5.89886C6.03832 5.84416 6.14748 5.81606 6.25827 5.81743C6.36905 5.8188 6.47748 5.84959 6.57245 5.90665L10.4678 8.24622C10.5602 8.30179 10.6367 8.38032 10.6897 8.47419C10.7428 8.56805 10.7707 8.67406 10.7707 8.78189C10.7707 8.88973 10.7428 8.99573 10.6897 9.08959C10.6367 9.18346 10.5602 9.26199 10.4678 9.31756L6.57245 11.6553Z'
                                fill='#9A9EC8'
                              />
                            </svg>
                            <span class='w-max'>Replay</span>
                          </div>
                        </div>
                      </NavLink>
                    )}
                    <NavLink href={`${URL.GAMEMODES.CASE_BATTLES_GAME}?id=${id}${games[id].urlKey ? `&key=${games[id].urlKey}` : ""}`}>
                      <GrayGradientButton callbackFn={() => {}}>
                        <svg
                          width='20'
                          height='11'
                          viewBox='0 0 20 11'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M18.875 4.78255C18.8363 4.73344 17.9057 3.56612 16.3104 2.39409C14.1786 0.827866 11.859 0 9.60243 0C7.3459 0 5.02631 0.827866 2.89444 2.39409C1.29917 3.56608 0.368632 4.73344 0.329827 4.78255L0 5.1997L0.329869 5.61689C0.368674 5.666 1.29921 6.83336 2.89449 8.00539C5.02635 9.57157 7.34595 10.3994 9.60247 10.3994C11.859 10.3994 14.1786 9.57157 16.3104 8.00539C17.9057 6.83336 18.8363 5.666 18.875 5.61689L19.205 5.1997L18.875 4.78255ZM9.60243 8.84238C7.59387 8.84238 5.95975 7.2083 5.95975 5.1997C5.95975 4.88501 5.99986 4.57952 6.07524 4.28804L5.24359 4.14808C5.16211 4.48547 5.11889 4.83762 5.11889 5.1997C5.11889 6.49714 5.6731 7.66745 6.55693 8.48691C5.4192 8.06665 4.45175 7.47691 3.7216 6.94355C2.817 6.28285 2.13906 5.61462 1.75256 5.1997C2.13923 4.78465 2.81708 4.1165 3.7216 3.45584C4.45175 2.92249 5.41925 2.33275 6.55693 1.91245L7.11484 2.54133C7.76642 1.9312 8.6415 1.55702 9.60243 1.55702C11.611 1.55702 13.2451 3.1911 13.2451 5.1997C13.2451 7.2083 11.611 8.84238 9.60243 8.84238ZM15.4833 6.94355C14.753 7.47691 13.7856 8.06665 12.6479 8.48691C13.5317 7.66749 14.0859 6.49718 14.0859 5.19966C14.0859 3.90213 13.5317 2.73186 12.6479 1.91241C13.7857 2.33271 14.753 2.92244 15.4833 3.4558C16.3879 4.1165 17.0658 4.78473 17.4523 5.19961C17.0656 5.61475 16.3878 6.28293 15.4833 6.94355Z'
                            fill='#9A9EC8'
                          />
                          <path
                            d='M7.28439 4.49155C7.21603 4.7156 7.17899 4.95327 7.17899 5.19968C7.17899 6.53808 8.26399 7.62312 9.60242 7.62312C10.9408 7.62312 12.0258 6.53812 12.0258 5.19968C12.0258 3.86125 10.9408 2.77625 9.60242 2.77625C8.95051 2.77625 8.35917 3.03414 7.92357 3.45288L9.11893 4.80027L7.28439 4.49155Z'
                            fill='#9A9EC8'
                          />
                        </svg>
                      </GrayGradientButton>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <Show when={caseViewModal()}>
        <CaseViewModal item={caseViewModalItem()} handleClose={toggleCaseViewModal} />
      </Show>
      <Show when={joinModal().isOpen}>
        <CaseBattleJoinModal game={joinModal().game} handleClose={toggleJoinModal} />
      </Show>
    </Fallback>
  )
}

export default CaseBattles
