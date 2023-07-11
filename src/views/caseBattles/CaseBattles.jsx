import {createEffect, createSignal, For, Show} from "solid-js";
import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";
import injector from "../../injector/injector";
import {createStore} from "solid-js/store";
import {NavLink} from "solid-app-router";
import {URL} from "../../libraries/url";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
import BattleRoyaleIcon from "../../components/icons/BattleRoyaleIcon";
import CaseViewModal from "../../components/modals/CaseViewModal";
import Dropdown from "../../components/elements/Dropdown";
import CaseBattleJoinModal from "../../components/modals/CaseBattleJoinModal";
import BattleListCard from "../../components/battle/BattleListCard";

const sortByOptions = ["ASC", "DESC"];

const CaseBattles = (props) => {
  const {battlesPageLoaded, onBattlesPageLoaded} = PageLoadState;
  const {socket, userObject} = injector;
  const [games, setGames] = createStore({});
  const [casesState, setCasesState] = createSignal([]);
  const [sortBy, setSortBy] = createSignal(sortByOptions[0]);
  const [caseViewModal, setCaseViewModal] = createSignal(false);
  const [caseViewModalItem, setCaseViewModalItem] = createSignal(null);
  const [joinModal, setJoinModal] = createSignal({isOpen: false, game: null});

  createEffect(() => {
    if (props.loaded()) {
      socket.emit("battles:cases", {}, (data) => {
        setCasesState(data.data.cases);
      });
      onBattlesPageLoaded(true);
      socket.emit("battles:connect", {}, (data) => {
        console.log("battles:cases", data.data);
        setGames({...data.data.games, ...data.data.history});
      });
      socket.on(`battles:update`, (data) => {
        setGames(data.gameId, data.data);
      });
    }
  });

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
    setCaseViewModal(!caseViewModal());
  };

  const toggleJoinModal = () => {
    setJoinModal((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const handleOpenJoinModal = (game) => {
    toggleJoinModal();
    setJoinModal((prevState) => ({
      ...prevState,
      game,
    }));
  };

  return (
    <Fallback loaded={battlesPageLoaded}>
      <div class="flex flex-col py-4 lg:py-6 gap-8 lg:gap-2 min-h-[100vh]">
          <div class= "w-full grid grid-cols-3 gap-1 lg:gap-3 items-center bg-control-panel">
          <div class="col-span-3 lg:col-span-1 w-full flex lg:justify-start">
            <Dropdown
              isFullWidth
              label=' Sort by Price:'
              activeName={sortBy()}
              itemsList={sortByOptions}
              submitItem={(direction) => setSortBy(direction)}
            />
          </div>
          <div
            class=" col-span-3 lg:col-span-1 row-start-2 lg:row-start-auto h-full py-4 px-12 center flex-col gap-1 lg:case-battles--active-battles__background"
          >
            <div class="text-13 font-SpaceGrotesk text-gray-a2 font-bold w-max">
              Case Battles
            </div>
            <div class="text-gradient-green-secondary w-max font-SpaceGrotesk font-bold text-14">
              {
                Object.values(games).filter(
                  (g) =>
                    g.status !== "ended" &&
                    (!g.private || g.owner == userObject.user?.id)
                ).length
              }{" "}
              Active Battles
            </div>
          </div>
          <div class="col-span-3 lg:col-span-1 w-full flex flex-wrap-reverse py-0 lg:py-2 gap-3 justify-center lg:justify-end">
            <NavLink class='w-full lg:w-max' href={URL.GAMEMODES.CASE_BATTLES_CREATE}>
              <YellowGradientButton callbackFn={() => {}}>
                <div class="center text-14 font-SpaceGrotesk gap-2 text-yellow-ffb font-bold">
                  <BattleRoyaleIcon additionClasses="w-4" />
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
        <div class="flex flex-col gap-3 px-0.5">
          {games && Object.keys(games).length > 0 ? (
            <For
              each={Object.keys(games)
                ?.sort((a, b) => {
                  const calculations =
                    -(
                      (games[a].status == "open"
                        ? 2
                        : games[a].status == "playing" ||
                          games[a].status == "pending"
                        ? 1
                        : 0) +
                      (1 -
                        (1 / games[a].totalValue) *
                          (sortBy() === sortByOptions[0] ? 1 : -1))
                    ) +
                    ((games[b].status == "open"
                      ? 2
                      : games[b].status == "playing" ||
                        games[b].status == "pending"
                      ? 1
                      : 0) +
                      (1 - 1 / games[b].totalValue));
                  return calculations;
                })
                .filter(
                  (g) =>
                    !games[g].private || games[g].owner === userObject.user.id
                )}
            >
              {(id) => (
                <BattleListCard
                  game={games[id]}
                  handleOpenJoinModal={handleOpenJoinModal}
                  toggleCaseViewModal={toggleCaseViewModal}
                  setCaseViewModalItem={setCaseViewModalItem}
                  casesState={casesState}
                />
              )}
            </For>
          ) : (
            <For each={Array(10)}>
              {() => (
                <div class="h-[136px] w-full rounded-6 animate-pulse bg-[#23253d]" />
              )}
            </For>
          )}
        </div>
      </div>
      <Show when={caseViewModal()}>
        <CaseViewModal
          item={caseViewModalItem()}
          handleClose={toggleCaseViewModal}
        />
      </Show>
      <Show when={joinModal().isOpen}>
        <CaseBattleJoinModal
          game={joinModal().game}
          handleClose={toggleJoinModal}
        />
      </Show>
    </Fallback>
  );
};

export default CaseBattles;
