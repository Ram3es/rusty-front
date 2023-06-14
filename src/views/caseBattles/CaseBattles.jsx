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
              {Object.values(games).filter(g => g.status === "open" && (!g.private || g.owner == userObject.user?.id)).length} Active Battles
            </div>
          </div>
          <div class=" col-span-3 sm:col-span-2 md:col-span-1 w-full flex flex-wrap-reverse py-0 md:py-2 gap-3 justify-center md:justify-end">
            <GrayGradientButton
              callbackFn={() => console.log('open history')}
            >
              <div class="text-gray-9a center gap-2 text-14 font-bold font-SpaceGrotesk">
                <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8767 3.96612C15.8751 1.96945 13.1634 0.848145 10.3362 0.848145C7.50907 0.848145 4.79733 1.96945 2.7958 3.96612L2.0838 4.67894V2.0237C2.0838 1.80614 1.99738 1.5975 1.84354 1.44367C1.68971 1.28984 1.48107 1.20342 1.26352 1.20342C1.04597 1.20342 0.837324 1.28984 0.683492 1.44367C0.52966 1.5975 0.443237 1.80614 0.443237 2.0237V6.94538C0.443237 7.16293 0.52966 7.37157 0.683492 7.5254C0.837324 7.67924 1.04597 7.76566 1.26352 7.76566H6.1852C6.40275 7.76566 6.61139 7.67924 6.76522 7.5254C6.91906 7.37157 7.00548 7.16293 7.00548 6.94538C7.00548 6.72783 6.91906 6.51919 6.76522 6.36535C6.61139 6.21152 6.40275 6.1251 6.1852 6.1251H2.9574L3.95568 5.126C5.21761 3.86417 6.82537 3.00488 8.57565 2.65678C10.3259 2.30869 12.1401 2.48742 13.7889 3.17038C15.4376 3.85333 16.8467 5.00985 17.8382 6.49367C18.8296 7.97749 19.3588 9.72198 19.3588 11.5065C19.3588 13.2911 18.8296 15.0356 17.8382 16.5194C16.8467 18.0032 15.4376 19.1598 13.7889 19.8427C12.1401 20.5257 10.3259 20.7044 8.57565 20.3563C6.82537 20.0082 5.21761 19.1489 3.95568 17.8871C3.88001 17.8088 3.78949 17.7463 3.68942 17.7033C3.58934 17.6603 3.4817 17.6376 3.37279 17.6367C3.26387 17.6358 3.15586 17.6565 3.05505 17.6978C2.95424 17.739 2.86265 17.7999 2.78563 17.8769C2.70862 17.9539 2.64771 18.0455 2.60646 18.1463C2.56522 18.2472 2.54446 18.3552 2.54541 18.4641C2.54636 18.573 2.56898 18.6806 2.61197 18.7807C2.65496 18.8808 2.71746 18.9713 2.7958 19.047C3.78602 20.0372 4.96159 20.8227 6.25538 21.3586C7.54917 21.8945 8.93584 22.1703 10.3362 22.1703C11.7366 22.1703 13.1233 21.8945 14.4171 21.3586C15.7109 20.8227 16.8864 20.0372 17.8767 19.047C18.8669 18.0567 19.6524 16.8812 20.1883 15.5874C20.7242 14.2936 21 12.9069 21 11.5065C21 10.1062 20.7242 8.71949 20.1883 7.4257C19.6524 6.13191 18.8669 4.95634 17.8767 3.96612Z" fill="#9A9EC8"/>
                  <path d="M8.64603 15.7552C8.79488 15.7551 8.94091 15.7146 9.06847 15.6379L14.1805 12.57C14.3017 12.4971 14.4021 12.3941 14.4718 12.2709C14.5414 12.1477 14.578 12.0086 14.578 11.8671C14.578 11.7255 14.5414 11.5864 14.4718 11.4632C14.4021 11.3401 14.3017 11.237 14.1805 11.1641L9.06847 8.09377C8.94384 8.01889 8.80155 7.97848 8.65616 7.97669C8.51078 7.97489 8.36753 8.01177 8.24108 8.08354C8.11464 8.15532 8.00954 8.25942 7.93656 8.38517C7.86358 8.51092 7.82534 8.65382 7.82575 8.79921V14.9349C7.82575 15.1525 7.91217 15.3611 8.066 15.5149C8.21983 15.6688 8.42848 15.7552 8.64603 15.7552Z" fill="#9A9EC8"/>
                </svg>
                <span>Battle History</span>
              </div>
            </GrayGradientButton>
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
                  (games[a].status == 'open' ? 2 : games[a].status == 'playing' ? 1 : 0) +
                  (1 - 1 / games[a].totalValue * (sortBy() === sortByOptions[0] ? 1 : -1))
                ) +
                ((games[b].status == "open"
                  ? 2 
                  : games[b].status == "playing"
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
                      ) : (
                        <span class='text-13 font-SpaceGrotesk font-bold'>ENDED</span>
                      )}
                    </div>
                  </div>

                  <div class='grow rounded-6 grid grid-cols-[64px_1fr] bg-dark-primary-gradient'>
                    <DarkWrapperdWithBorders
                      isActive={games[id]?.status === 'open' || games[id]?.status === 'playing'}
                      classes='rounded-l-6'
                    >
                      <div
                        class={`w-16 center flex-col gap-2 ${
                          games[id]?.status !== 'open' &&
                          games[id]?.status !== 'playing' &&
                          'brightness-50 grayscale'
                        }`}
                      >
                        <CasesCounter
                          roundsCount={games[id]?.cases?.length}
                          currentRound={
                            games[id]?.status === 'open' || games[id]?.status === 'playing'
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
                          class='flex items-center w-max relative transition-transform duration-75'
                          style={{
                            transform: `translateX(-${
                              138 * (games[id].currentRound > 1 ? games[id].currentRound - 1 : 0)
                            }px)`
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
                                onClick={() => {
                                  setCaseViewModalItem(caseItem)
                                  toggleCaseViewModal()
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
                          {userIndex + 1 !== games[id]?.playersQty ? (
                            <span class={`flex items-center justify-center ${games[id]?.status === 'ended' && 'opacity-20'}`}>
                              {games[id]?.cursed === 1 && (
                                <BattleCursedIcon additionClasses='text-[#DAFD09] w-4' />
                              )}
                              {games[id]?.mode === 'group' && games[id]?.cursed !== 1 && (
                                <BattleGroupIcon additionClasses='text-[#5AC3FF] w-3' />
                              )}
                              {(games[id]?.mode === 'royal' || games[id]?.mode === 'team') &&
                                games[id]?.cursed !== 1 && (
                                  <BattleRoyaleIcon additionClasses='w-3 text-yellow-ffb' />
                                )}
                            </span>
                          ) : (
                            ''
                          )}
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
                      >
                        <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center'>
                          <span class='w-max'>Join</span>
                          <Coin width='5' />
                          <span class='text-gradient'>{games[id]?.fundBattle ? games[id]?.totalValue - (games[id]?.totalValue * (games[id]?.fundPercent / 100)) : games[id]?.totalValue}</span>
                        </div>
                      </YellowGradientButton>
                    ) : games[id].status === 'playing' ? (
                      <div
                        class={`h-10 px-4 rounded-4 flex center cursor-pointer w-full bg-white bg-opacity-5`}
                        style={{
                          'box-shadow':
                            '0px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        <div class='flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center'>
                          <span class='w-max'>In Play:</span>
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
