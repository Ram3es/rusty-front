import injector from "../../injector/injector";
import {
  createEffect,
  createSignal,
  For,
  Match,
  onCleanup,
  Switch,
} from "solid-js";
import HoveredButton from "../../components/elements/HoveredButton";
import BattleSpinnerReel from "../../components/battle/BattleSpinnerReel";
import { otherOptions } from "../../libraries/caseSpinConfig";
import { isNumber } from "chart.js/helpers";
import Coin from "../../utilities/Coin";
import Logo from "../../assets/smallLogo.svg";
import Ranks from "../../utilities/Ranks";
import RankLabel from "../../components/chat/RankLabel";
import ItemPlaceholder from "../../assets/img/case/ItemPlaceholder.png";
import { NavLink } from "solid-app-router";
import ArrowBack from "../../components/icons/ArrowBack";
import { URL } from "../../libraries/url";
import BattleRoyaleIcon from "../../components/icons/BattleRoyaleIcon";
import BattleCursedIcon from "../../components/icons/BattleCursedIcon";
import BattleGroupIcon from "../../components/icons/BattleGroupIcon";
import FairnessShieldIcon from "../../components/icons/cases/FairnessShield";
import GrayWrapperdWithBorders from "../../components/battle/GrayWrapperdWithBorders";
import ArrowDownWithGradient from "../../components/icons/ArrowDownWithGradient";
import footerLogoBgVector from '../../assets/img/footer/footerLogoBgVector.png';
import RecentDropsItem from "../case/RecentDropsItem";
import ItemCardSmall from "../../components/battle/ItemCardSmall";
import UserGameAvatar from "../../components/battle/UserGameAvatar";
import Spiner from "../../components/battle/Spiner";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
import GrayGradientButton from "../../components/elements/GrayGradientButton";
import EmojiIcon from "../../components/icons/EmojiIcon";

export const [containerRef, setContainerRef] = createSignal();
export const [reelsSpinning, setReelsSpinning] = createSignal(false);
export const [spinIndexes, setSpinIndexes] = createSignal([]);
export const [spinOffsets, setSpinOffsets] = createSignal([]);
export const [spinLists, setSpinLists] = createSignal([]);
export const [isRolling, setIsRolling] = createSignal(false);

export const playClickAudio = () => {
  console.log("playClickAudio");
};

export const playEndAudio = () => {
  console.log("playEndAudio' ");
};

const GameCaseBattle = (props) => {
  const { socket, userObject } = injector;

  const [game, setGame] = createSignal();
  const [rollItems, setRollItems] = createSignal([]);
  const [spinnerOptions, setSpinnerOptions] = createSignal([]);
  const [winnings, setWinnings] = createSignal([]);
  const [containsBigWin, setContainsBigWin] = createSignal(false);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);

  const getModeColor = () => {
    return (game().mode === "royal" || game().mode === "team") &&
      game().cursed !== 1
      ? "yellow"
      : game().cursed === 1
      ? "green"
      : "blue";
  };

  const getColor = (item_price) => {
    return item_price > 1000 * 100
      ? "gold"
      : item_price > 1000 * 30
      ? "red"
      : item_price > 1000 * 10
      ? "purple"
      : item_price > 1000 * 2
      ? "blue"
      : "gray";
  };

  const generateSpinList = () => {
    setSpinOffsets([]);
    const newSpinList = [];
    for (let i = 0; i < 35; i++) {
      newSpinList.push(
        rollItems()[Math.floor(Math.random() * rollItems().length)]
      );
    }
    return newSpinList;
  };

  const getRandomIndex = () => {
    return (
      Math.floor(
        Math.random() *
          (otherOptions.verticalEndBound - otherOptions.verticalStartBound + 1)
      ) + otherOptions.verticalStartBound
    );
  };

  const updateGame = (inputGame) => {
    console.log("inputGame", inputGame);
    setRollItems([])
    setSpinnerOptions([])
    setGame(() => inputGame);
    // inputGame.winners[0][`round_${inputGame.currentRound}`] need to add
    if (inputGame.status === "playing") {
      setTimeout(() => setWinnings(inputGame.players), 3000);
    } else {
      setWinnings(inputGame.players);
    }
    if (inputGame.status === "playing" && isNumber(inputGame.currentRound)) {
      setRollItems(() =>
        inputGame.cases[inputGame.currentRound].items.map((item) => ({
          img: item.image?.replace("{url}", window.origin) || "",
          price: item.item_price,
          name: item.name,
          rarity: getColor(item.item_price),
        }))
      );
      setSpinnerOptions(() =>
        Array.from(Array(inputGame.playersQty).keys()).map((playerIndex) => ({
          winningItem: {
            img:
              inputGame.players[playerIndex + 1][
                `round_${inputGame.currentRound}`
              ].image?.replace("{url}", window.origin) || "",
            price:
              inputGame.players[playerIndex + 1][
                `round_${inputGame.currentRound}`
              ].item_price,
            name: inputGame.players[playerIndex + 1][
              `round_${inputGame.currentRound}`
            ].name,
            rarity: getColor(
              inputGame.players[playerIndex + 1][
                `round_${inputGame.currentRound}`
              ].item_price
            ),
          },
          isConfettiWin:
            inputGame.players[playerIndex + 1][
              `round_${inputGame.currentRound}`
            ].isWinner,
          isBigWin: true,
        }))
      );
      console.log(spinnerOptions());
      const newSpinIndexes = [];
      const newSpinLists = [];

      for (let i = 0; i < game().playersQty; i++) {
        const spinIndex = getRandomIndex();
        let spinList = generateSpinList();
        spinList[spinIndex] = spinnerOptions()[i].winningItem;
        if (spinnerOptions()[i].isBigWin) {
          setContainsBigWin(true);
        }
        if (spinnerOptions()[i].isConfettiWin) {
          setContainsConfettiWin(true);
        }
        newSpinLists.push(spinList);
        newSpinIndexes.push(spinIndex);
      }
      setSpinIndexes(() => newSpinIndexes);
      setSpinLists(() => newSpinLists);
      setReelsSpinning(() => true);
      console.log("srinList!!!!!!", spinLists);
    }
    console.log(document.querySelectorAll("[data-spiner-row]"));
    console.log(document.querySelectorAll("[data-won-item]"));
  };

  const getJoinTeam = (playerIndex) => {
    if (game().mode === "group") {
      return 1;
    } else if (game().mode === "royal") {
      return playerIndex;
    } else if (playerIndex <= 2) {
      return 1;
    } else {
      return 2;
    }
  };

  const callBot = (player_index) => {
    socket.emit(
      "battles:callbot",
      {
        gameId: Number(props.searchParams.id),
        team: getJoinTeam(player_index),
        player_index,
      },
      (data) => {
        console.log(data);
      }
    );
  };

  const joinGame = (player_index) => {
    socket.emit(
      "battles:join",
      {
        gameId: Number(props.searchParams.id),
        team: getJoinTeam(player_index),
        player_index,
      },
      (data) => {
        console.log(data);
      }
    );
  };

  const getCurrentRollItem = () => {
    return game().cases[game().currentRound > 0 ? game().currentRound - 1 : 0];
  };

  createEffect(() => {
    if (props.loaded()) {
      if (props.searchParams.id) {
        socket.emit(
          "battle:get",
          {
            gameId: Number(props.searchParams.id),
            urlKey: props.searchParams.key,
          },
          (data) => {
            console.log(data);
            if (data.data?.game) {
              updateGame(data.data.game);
            }
          }
        );
      }
    }
  });

  createEffect(() => {
    socket.on(`battles:update`, (data) => {
      console.log(data);
      if (data.gameId === Number(props.searchParams.id) && data.data) {
        updateGame(data.data);
      }
    });
  });

  onCleanup(() => {
    setSpinLists([]);
    setSpinIndexes(null);
    setSpinOffsets([]);
    setGame(undefined)
    socket.off(`battles:update`);
  });

  return (
    <div class="flex flex-col">
      {game() && (
        <div class="w-full h-full flex flex-col gap-8 relative pt-8">
          <div class="px-4 xl:px-8 xxl:px-14 flex flex-col ">
            <div class="flex flex-col md:flex-row justify-between gap-2 mb-0 xl:-mb-8">
              <div class="flex items-center gap-6">
                <NavLink href={URL.GAMEMODES.CASE_BATTLES}>
                  <div class="flex gap-2 items-center p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max">
                    <ArrowBack />
                    <span class="font-SpaceGrotesk text-14 text-gray-9a">
                      Return to Battles
                    </span>
                  </div>
                </NavLink>
                <div class="flex flex-col text-14 font-SpaceGrotesk font-bold text-gray-a2">
                  <span class="w-max">Battle Cost</span>
                  <div class="flex items-center gap-2">
                    <Coin width="5" />
                    <span class="text-gradient">{game().totalValue}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 justify-center items-center mx-auto md:mx-0">
                <div
                  class={`w-max center px-5 py-[9px] border border-[#303448] rounded-4 flex gap-1 items-center text-gray-9a`}
                >
                  <For each={Array.from(Array(game().playersQty).keys())}>
                    {(_, index) => (
                      <>
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.29834 6.57822C8.54919 7.32749 7.63232 7.70724 6.57349 7.70724C5.51489 7.70724 4.59814 7.32736 3.84888 6.57834C3.09961 5.8292 2.71973 4.91246 2.71973 3.8535C2.71973 2.79479 3.09961 1.87804 3.84875 1.1289C4.5979 0.379759 5.51453 0 6.57349 0C7.6322 0 8.54895 0.379759 9.29822 1.12878C10.0475 1.87817 10.4272 2.79491 10.4272 3.8535C10.4272 4.91246 10.0475 5.82908 9.29834 6.57822ZM13.1869 11.2922C13.2512 11.6513 13.2949 11.9914 13.3165 12.3032C13.3379 12.6079 13.3488 12.9259 13.3489 13.2482C13.3489 14.0838 13.0834 14.7601 12.5597 15.2584C12.0425 15.7505 11.3585 16.0001 10.5265 16.0001H2.82239C1.99036 16.0001 1.30615 15.7504 0.789062 15.2584C0.265503 14.7597 0 14.0836 0 13.2484C0 12.9274 0.0107422 12.6097 0.0319824 12.3035C0.0535889 11.991 0.09729 11.6508 0.161621 11.2922C0.226562 10.9304 0.310181 10.5885 0.410156 10.2758C0.513672 9.95248 0.654297 9.63351 0.828003 9.32772C1.00818 9.01046 1.22021 8.73422 1.45789 8.50668C1.70679 8.26852 2.01135 8.07724 2.36316 7.93796C2.71387 7.79904 3.10254 7.72861 3.51855 7.72861C3.68188 7.72861 3.83997 7.79562 4.14465 7.99423C4.33521 8.11838 4.55493 8.25998 4.79773 8.41513C5.00708 8.54867 5.29102 8.67379 5.64136 8.78695C5.98389 8.89767 6.33118 8.95382 6.67407 8.95382C7.01697 8.95382 7.36438 8.89767 7.70654 8.78695C8.05725 8.67367 8.34119 8.54855 8.55078 8.41501C8.7959 8.25839 9.0155 8.11679 9.20325 7.99435C9.5083 7.79575 9.66626 7.72873 9.82959 7.72873C10.2455 7.72873 10.6343 7.79904 10.9851 7.93783C11.3372 8.07736 11.6416 8.26864 11.8903 8.50656C12.1281 8.73397 12.34 9.01034 12.5204 9.32772C12.6942 9.63351 12.8348 9.9526 12.9382 10.2757C13.0383 10.5883 13.1219 10.9304 13.1869 11.2922Z"
                            fill="currentColor"
                          />
                        </svg>
                        {index() + 1 !== game().playersQty &&
                          (game().mode === "royal" ||
                            game().mode === "group" ||
                            (game().mode === "team" &&
                              index() !== 0 &&
                              index() !== 2)) &&
                          (getModeColor() === "yellow" ? (
                            <BattleRoyaleIcon additionClasses="w-3" />
                          ) : getModeColor() === "green" ? (
                            <BattleCursedIcon additionClasses="w-4" />
                          ) : (
                            <BattleGroupIcon additionClasses="w-4" />
                          ))}
                      </>
                    )}
                  </For>
                  <div
                    classList={{
                      "text-yellow-ffb": getModeColor() === "yellow",
                      "text-[#DAFD09]": getModeColor() === "green",
                      "text-[#5AC3FF]": getModeColor() === "blue",
                    }}
                  >
                    {(game().mode === "royal" || game().mode === "team") &&
                    game().cursed !== 1
                      ? "Battle Royale"
                      : game().cursed === 1
                      ? "Cursed"
                      : "Group"}
                  </div>
                </div>
                <div class="h-11 rounded-4 flex items-center px-3 border border-gray-9a text-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
                  <FairnessShieldIcon />
                  <span>Fairness</span>
                </div>
              </div>
            </div>
            <div class=" mx-auto flex flex-col">
                <div class="center gap-1 py-3">
                  <For each={Array.from(Array(game().cases.length).keys())}>
                    {(i) => (
                      <div
                        class={`w-2 h-1 ${
                          game().currentRound > i || game().status === "ended" ? "bg-yellow-ffb" : "bg-[#3B3D4D]"
                        }`}
                      />
                    )}
                  </For>
                </div>
                <GrayWrapperdWithBorders classes="rounded-t-2 w-max">
                  <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center py-1 px-12">
                    <span class="w-max">{getCurrentRollItem().name}</span>
                    <Coin width="5" />
                    <span class="text-gradient">
                      {getCurrentRollItem().price}
                    </span>
                  </div>
                </GrayWrapperdWithBorders>
              </div>
            <div class='overflow-auto'>
              <div class='w-fit md:w-full flex flex-col gap-8'>
            <div class="relative ">
              
              <div
                class="flex justify-center w-full overflow-hidden border-2 rounded-t-8 border-b-0 border-white border-opacity-5"
                style={{
                  background: "linear-gradient(90deg, rgba(118, 124, 255, 0) 0%, rgba(118, 124, 255, 0.12) 50%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(220.05% 51.82% at 60.38% 107.3%, #1F2344 0%, #23253D 100%)",
                  "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)"
                }}
              >
                <div
                  class="flex items-center w-max relative transition-transform duration-75"
                  style={{
                    transform: `translateX(${
                      (game().status === "playing" || game().status === "open") ? (40 * (game().cases.length - 1)) - (80 * (game().currentRound ?? 0)) : 0
                    }px)`,
                  }}
                >
                  {(game().status === "playing" || game().status === "open") && (
                    <div
                      class="absolute left-0 top-0 h-full w-[80px] transition-transform duration-75"
                      style={{
                        background:
                        getModeColor() === "yellow" ? "linear-gradient(270deg, rgba(255, 180, 54, 0) 0%, rgba(255, 180, 54, 0.12) 50%, rgba(255, 180, 54, 0) 100%)" : getModeColor() === "blue" ? "linear-gradient(270deg, rgba(90, 195, 255, 0) 0%, rgba(90, 195, 255, 0.12) 50%, rgba(90, 195, 255, 0) 100%)" :"linear-gradient(270deg, rgba(218, 253, 9, 0) 0%, rgba(218, 253, 9, 0.12) 50%, rgba(218, 253, 9, 0) 100%)",
                        transform: `translateX(${
                          80 * (game()?.currentRound ?? 0)
                        }px)`,
                      }}
                    >
                      <span class="absolute left-1/2 top-0 -translate-x-1/2">
                        <ArrowDownWithGradient color={getModeColor()} />
                      </span>
                      <span class="absolute left-1/2 bottom-0 -translate-x-1/2 rotate-180">
                        <ArrowDownWithGradient color={getModeColor()} />
                      </span>
                    </div>
                  )}
                  <For each={game()?.cases || []}>
                    {(caseItem, index) => (
                      <div
                        class={`relative px-2 py-1 cursor-pointer ${
                          (index() < game().currentRound || game().status === "ended") && "opacity-20"
                        }`}
                      >
                        <img
                          alt={caseItem.name}
                          class="h-[48px] w-[64px]"
                          src={
                            caseItem?.image?.replace("{url}", window.origin) ||
                            ""
                          }
                        />
                      </div>
                    )}
                  </For>
                </div>
              </div>
              <div class="rounded-b-4 case-opening-wrapper-horizontal">
              <div
                class="relative w-full h-[326px] overflow-hidden flex"
                style={{ 'background-image': `url('${footerLogoBgVector}')` }}
                ref={setContainerRef}
              >
                <div class={`arrow-down absolute top-1/2 -right-[8px] -translate-y-1/2 rotate-90 ${getModeColor()}`} />
                <div class={`arrow-down absolute top-1/2 -left-[8px] -translate-y-1/2 -rotate-90 ${getModeColor()}`} />
                <div
                    class="absolute left-0 top-0 w-full h-[68px]"
                    style={{
                      background: 'linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)'
                    }}
                  />
                  <div
                    class="absolute left-0 bottom-0 w-full h-[68px]"
                    style={{
                      background: 'linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)',
                      transform: 'matrix(-1, 0, 0, -1, 0, 0)'
                    }}
                  />
                <For each={Array.from(Array(game().playersQty).keys())}>
                  {(playerIndex) => (
                    <div class="relative w-full center">
                      {playerIndex + 1 !== game().playersQty &&
                          (game().mode === "royal" ||
                            game().mode === "group" ||
                            (game().mode === "team" &&
                            playerIndex !== 0 &&
                            playerIndex !== 2)) &&
                          (getModeColor() === "yellow" ? (
                            <div class="absolute z-40 text-yellow-ffb center right-0 top-0 h-full border-r border-black border-opacity-10">
                              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <GrayWrapperdWithBorders classes="rounded-6" gradientColor={getModeColor()}>
                                  <BattleRoyaleIcon additionClasses="w-6 m-2" />
                                </GrayWrapperdWithBorders>
                              </div>
                            </div>
                          ) : getModeColor() === "green" ? (
                            <div class="absolute z-40 text-[#DAFD09] center right-0 top-0 h-full border-r border-black border-opacity-10">
                              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <GrayWrapperdWithBorders classes="rounded-6" gradientColor={getModeColor()}>
                                  <BattleCursedIcon additionClasses="w-7 m-2" />
                                </GrayWrapperdWithBorders>
                              </div>
                            </div>
                          ) : (
                            <div class="absolute z-40 text-[#5AC3FF] center right-0 top-0 h-full border-r border-black border-opacity-10">
                              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <GrayWrapperdWithBorders classes="rounded-6" gradientColor={getModeColor()}>
                                  <BattleGroupIcon additionClasses="w-7 mx-1 my-2" />
                                </GrayWrapperdWithBorders>
                              </div>
                            </div>
                          ))}
                      <Switch>
                        <Match when={game().status === "playing"}>
                          {!!spinnerOptions()[playerIndex] &&
                          !!spinLists()[playerIndex] ? (
                            <BattleSpinnerReel
                              spinnerIndex={playerIndex}
                              isConfettiWin={
                                spinnerOptions()[playerIndex].isConfettiWin
                              }
                              isBigWin={spinnerOptions()[playerIndex].isBigWin}
                              isFastSpin={false}
                              lineColor={getModeColor()}
                            />
                          ) : (
                            <Spiner classes="w-9 text-yellow-ffb" />
                          )}
                        </Match>
                        <Match when={game().status === "open"}>
                          {game().players[playerIndex + 1] ? (
                            <div class="w-full h-full center text-gradient font-SpaceGrotesk text-28 font-bold" style={{
                              'text-shadow': '0px 0px 20px rgba(255, 180, 54, 0.56), 0px 2px 2px rgba(0, 0, 0, 0.12)'
                            }}>
                              Ready
                            </div>
                          ) : <Spiner classes="w-9 text-yellow-ffb" /> }
                        </Match>
                        <Match when={game().status === "ended"}>
                          <div class="w-full center">
                            {game().winners.findIndex(
                              (winner) => winner.player_index === playerIndex + 1
                            ) >= 0 ? (
                              <div class="w-full h-full center flex-col gap-2">
                                <div class="text-gradient-green font-SpaceGrotesk text-28 font-bold">
                                  Winner
                                </div>
                                <div class="flex gap-2">
                                  <Coin width="11" />{" "}
                                  <span class="text-gradient font-SpaceGrotesk text-28 font-bold">
                                    {
                                      game().winners.find(
                                        (winner) =>
                                          winner.player_index === playerIndex + 1
                                      ).winnerValue
                                    }
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div class="w-full h-full center flex-col opacity-20 grayscale">
                                <div class="flex gap-2">
                                  <Coin width="11" />{" "}
                                  <span class="text-gradient font-SpaceGrotesk text-28 font-bold">
                                    0.00
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </Match>
                      </Switch>
                    </div>
                  )}
                </For>
              </div>
              </div>
              
            </div>
            <div
              class={`grid rounded-8 border border-black border-opacity-5 relative z-10 grid-cols-${game().playersQty}`}
              style={{
                background:
                  "radial-gradient(25% 50% at 50% 0%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)"
              }}
            >
              <For each={Array.from(Array(game().playersQty).keys())}>
                {(playerIndex) => (
                  <div class="center relative">
                    {game().players[playerIndex + 1] ? (
                      <div class="py-6 center px-2">
                        <div class="py-3 pl-2 pr-6 flex flex-wrap gap-2 center">
                          <div class="w-max">
                            <UserGameAvatar
                              mode={game()?.cursed === 1 ? "cursed" : game()?.mode === 'group' && game()?.cursed !== 1 ? 'group' : 'royal'}
                              isBot={game().players[playerIndex + 1] && !game().players[playerIndex + 1]?.avatar}
                              avatar={game().players[playerIndex + 1]?.avatar}
                              name={game().players[playerIndex + 1]?.name}
                            />
                          </div>
                          <div class="space-y-2 mt-1 w-fit">
                            <div
                              class="flex flex-wrap center  gap-2 text-sm font-bold h-wit max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded"
                              style={{
                                background:
                                  "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                                "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                              }}
                            >
                              <Ranks
                                width={5}
                                staff={
                                  game().players[playerIndex + 1].rank || 7
                                }
                                rank={
                                  game().players[playerIndex + 1].level
                                    ?.league || "bronze"
                                }
                              />
                              <RankLabel
                                staff={
                                  game().players[playerIndex + 1].rank || 7
                                }
                                rank={
                                  game().players[playerIndex + 1].level
                                    ?.league || "bronze"
                                }
                              />
                              <span class="text-gray-9aa truncate max-w-[100px]">
                                {game().players[playerIndex + 1].username ||
                                  "Terry"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) :  game().owner === userObject.user.id &&
                    !spinLists()[playerIndex] ? (
                      <div class="w-full center">
                        <div class="h-10">
                          <GrayGradientButton
                            callbackFn={() => callBot(playerIndex + 1)}
                          >
                            <div class="text-gray-9a center gap-2 text-14 font-bold font-SpaceGrotesk">
                              <EmojiIcon />
                              <span>Call Bot</span>
                            </div>
                          </GrayGradientButton>
                        </div>
                      </div>
                    ) : (
                      <div class="w-full center">
                        <div class="h-10">
                          <YellowGradientButton
                            callbackFn={() => joinGame(playerIndex + 1)}
                          >
                            <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                            <span class="w-max">Join</span>
                            <Coin width="5" />
                            <span class="text-gradient">{game().totalValue}</span>
                          </div>
                          </YellowGradientButton>
                        </div>
                      </div>
                    )}
                    <div class="border-r border-black border-opacity-20 absolute right-0 top-0 h-full" />
                  </div>
                )}
              </For>
            </div>
            <div class="border border-black border-opacity-5 rounded-8 -mt-12 flex bg-dark-secondary">
              <For each={Array.from(Array(game().playersQty).keys())}>
                {(playerIndex) => (
                  <>
                    <div class="flex w-full px-5 py-10">
                      {game().players[playerIndex + 1] && (
                        <div class="flex gap-2 flex-wrap justify-center">
                          <For
                            each={Array.from(Array(game().cases.length).keys())}
                          >
                            {(round) => (
                              <>
                                {winnings()[playerIndex + 1] &&
                                winnings()[playerIndex + 1][
                                  `round_${round}`
                                ] ? (
                                  <div class="w-30 h-30 center">
                                    <ItemCardSmall drop={winnings()[playerIndex + 1][
                                          `round_${round}`
                                        ]} _case={game().cases[round]} />
                                  </div>
                                ) : (
                                  <img src={ItemPlaceholder} class="w-30" />
                                )}
                              </>
                            )}
                          </For>
                        </div>
                      )}
                    </div>
                    <div class="border-r border-black border-opacity-20" />
                  </>
                )}
              </For>
            </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCaseBattle;
