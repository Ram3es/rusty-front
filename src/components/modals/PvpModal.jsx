import { createEffect, createSignal, onMount, For } from "solid-js";
import injector from "../../injector/injector";
import Modal from "./Modal";
import { NavLink } from "solid-app-router";
import Coin from "../../utilities/Coin";

import Logo from "../../assets/smallLogo.svg";

import Question from "../../assets/img/mines/question.svg";
import Avatar from "../../assets/img/modals/avatar.png";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import BiggestWinnerBg from "../../assets/img/case/BiggestWinnerBg.png";
import LastWinnerBg from "../../assets/img/case/LastWinnerBg.png";
import PvpMinesModalBg from "../../assets/img/modals/PvpMinesModalBg.png";
import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png";
import LooseCounterBg from "../../assets/img/pvpmines/LooseCounterBg.png";
import WinCounterBg from "../../assets/img/pvpmines/WinCounterBg.png";
import Ranks from "../../utilities/Ranks";
import {
  playBombFound,
  playSafeMineFound,
} from "../../utilities/Sounds/MinesSound";
import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";
import PvpMinesSquare from "../pvp-mines/PvpMinesSquare";
import UserGameAvatar from "../battle/UserGameAvatar";
import RankLabel from "../chat/RankLabel";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
import BattleRoyaleIcon from "../icons/BattleRoyaleIcon";
import FairnessShieldIcon from "../icons/cases/FairnessShield";
import CloseButton from "../elements/CloseButton";

let clearedMines = 0;
let clearedTeils = 0;

const PvpModal = (props) => {
  const { socket, toastr, userObject } = injector;

  const [game, setGame] = createSignal({});

  const [counter, setCounter] = createSignal(0);

  onMount(() => {
    setInterval(() => {
      if (game()?.status != "pending") {
        if (
          game()?.turn &&
          !game()?.players[game()?.turn % game()?.playersAmount]?.bot
        ) {
          const count = Math.floor((game()?.timestamp - Date.now()) / 1000);
          setCounter(count >= 0 ? count : 0);
        } else {
          setCounter(0);
        }
      }
    }, 1000);
  });

  createEffect(() => {
    if (props.searchParams?.pvpid) {
      socket.emit(
        "pvpmines:connect:game",
        {
          gameId: props.searchParams?.pvpid,
        },
        (data) => {
          clearedMines = 0;
          clearedTeils = 0;
          if (!data.error) {
            setGame(data.data.game);
            console.log(game());
          }
        }
      );
    }
  });

  onMount(() => {
    socket.on("pvpmines:update", (data) => {
      if (props.searchParams?.pvpid == data.gameId) {
        setGame(data.data);
        console.log(game());
        if (clearedMines < data.data.minesCleared.length) {
          clearedMines = data.data.minesCleared.length;
          playBombFound();
        } else if (
          clearedTeils <
          data.data.cleared.length - data.data.minesCleared.length
        ) {
          clearedTeils =
            data.data.cleared.length - data.data.minesCleared.length;
          playSafeMineFound();
        }
      }
    });
  });

  const join = () => {
    socket.emit(
      "pvpmines:join",
      {
        gameId: props.searchParams?.pvpid,
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  const check = (id) => {
    let isSuccess;
    socket.emit(
      "pvpmines:check",
      {
        gameId: props.searchParams?.pvpid,
        tile: id,
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
        isSuccess = data.error;
      }
    );
    return isSuccess;
  };

  const callbot = () => {
    playOptionClickSound();
    socket.emit(
      "pvpmines:callbot",
      {
        gameId: props.searchParams?.pvpid,
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  return (
    <Modal
      open={() => {
        return true;
      }}
      pathname={props.pathname}
      handler={props.handler}
      noContainer={true}
    >
      <NavLink
        class="w-full h-full absolute left-0 cursor-default top-0"
        href={props.pathname()}
      />
      <div
        class="flex flex-col relative w-full"
        style={{
          "max-width": "1184px",
        }}
      >
        <div
          class={`w-full relative overflow-hidden flex flex-col gap-2 backdrop-blur sm:gap-0 rounded-12 transition-all transform -translate-y-1/4 ${
            !props.searchParams?.pvpid ? "" : "-translate-y-0"
          } duration-100 ease-out`}
          style={{
            background:
              "linear-gradient(180deg, rgba(118, 124, 255, 0) 25%, rgba(118, 124, 255, 0.12) 50%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 75%)",
          }}
        >
          <div
            class="absolute left-0 top-0 w-full h-full rounded-12 opacity-50"
            style={{ "background-image": `url('${footerLogoBgVector}')` }}
          />
          <div class="flex relative">
            <NavLink href={`${props.pathname()}`}>
              <CloseButton />
            </NavLink>
          </div>

          <div class="w-full flex flex-col gap-2">
            <div class="w-full flex flex-col-reverse llg:flex-row gap-10 xl:gap-20 overflow-y-scroll h-max max-h-[70vh]">
              <div class="flex flex-col flex-1 gap-6 grow-1 justify-center">
                <div class="w-full flex flex-col gap-3">
                  <For
                    each={[
                      ...Object.values(game().players || {}),
                      ...Array.from({
                        length: game()?.playersAmount || 0,
                      }).fill(0),
                    ].slice(0, game()?.playersAmount || 0)}
                  >
                    {(val) => (
                      <div
                        class={`w-full h-22 min-w-[368px] bg-dark-22 flex justify-between items-center px-6 py-3 relative bg-cover rounded-4 border-l-2 ${
                          game()?.status == "started" &&
                          val &&
                          game()?.turn % game()?.playersAmount == val?.index
                            ? "border-yellow-ff"
                            : game()?.status == "ended" &&
                              game()?.winner?.player?.index == val.index
                            ? "border-[#86FFB6]"
                            : game()?.status == "pending" ||
                              (game()?.status !== "ended" &&
                                val &&
                                game()?.turn % game()?.playersAmount !==
                                  val?.index &&
                                !val?.eliminated)
                            ? "border-gray-9a border-opacity-30"
                            : "border-[#D63333] border-opacity-30"
                        } overflow-hidden ${val?.eliminated ? "" : ""}`}
                        style={
                          game()?.status == "started" &&
                          val &&
                          game()?.turn % game()?.playersAmount == val?.index
                            ? {
                                background:
                                  "linear-gradient(90deg, rgba(255, 180, 54, 0.08) 0%, rgba(255, 180, 54, 0) 93.23%)",
                              }
                            : game()?.status == "ended" &&
                              game()?.winner?.player?.index == val.index
                            ? {
                                background:
                                  "linear-gradient(90deg, rgba(134, 255, 182, 0.08) 0%, rgba(255, 180, 54, 0) 93.23%)",
                              }
                            : game()?.status == "pending" ||
                              (game()?.status !== "ended" &&
                                val &&
                                game()?.turn % game()?.playersAmount !==
                                  val?.index &&
                                !val?.eliminated)
                            ? {
                                background:
                                  "linear-gradient(90deg, rgba(154, 161, 223, 0.08) 0%, rgba(154, 161, 223, 0) 100%)",
                              }
                            : {
                                background:
                                  "linear-gradient(90deg, rgba(214, 51, 51, 0.08) 0%, rgba(154, 161, 223, 0) 100%)",
                              }
                        }
                      >
                        <div class="w-full flex items-center gap-3">
                          <UserGameAvatar
                            isBot={val?.bot}
                            widthClasses="w-14 h-14"
                            color={
                              game()?.status == "started" &&
                              val &&
                              game()?.turn % game()?.playersAmount == val?.index
                                ? "#FFB436"
                                : game()?.status == "ended" &&
                                  game()?.winner?.player?.index == val.index
                                ? "#86FFB6"
                                : game()?.status == "pending" ||
                                  (game()?.status !== "ended" &&
                                    val &&
                                    game()?.turn % game()?.playersAmount !==
                                      val?.index &&
                                    !val?.eliminated)
                                ? "#9AA1DF5C"
                                : "#D63333"
                            }
                            avatar={val?.avatar || ""}
                            name={val?.username || ""}
                            eliminated={val?.eliminated}
                            isTransparentImage={
                              !(
                                (game()?.status === "started" &&
                                  game()?.status == "started" &&
                                  val &&
                                  game()?.turn % game()?.playersAmount ==
                                    val?.index) ||
                                (game()?.status == "ended" &&
                                  game()?.winner?.player?.index == val.index)
                              )
                            }
                          />
                          {val?.username ? (
                            <div class="flex flex-col gap-2">
                              <div
                                class="flex center  gap-2 text-sm font-bold h-wit max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded"
                                style={{
                                  background:
                                    "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                                  "box-shadow":
                                    "0px 2px 2px rgba(0, 0, 0, 0.12)",
                                }}
                              >
                                <Ranks
                                  width={5}
                                  staff={val.rank || 7}
                                  rank={val.level?.league || "bronze"}
                                />
                                <RankLabel
                                  staff={val.rank || 7}
                                  rank={val.level?.league || "bronze"}
                                />
                                <div
                                  class={`center gap-2 ${
                                    game()?.status == "started" &&
                                    val &&
                                    game()?.turn % game()?.playersAmount ==
                                      val?.index
                                      ? "text-gray-9a"
                                      : game()?.status == "ended" &&
                                        game()?.winner?.player?.index ==
                                          val.index
                                      ? "text-[#86FFB6]"
                                      : game()?.status == "pending" ||
                                        (game()?.status !== "ended" &&
                                          val &&
                                          game()?.turn %
                                            game()?.playersAmount !==
                                            val?.index &&
                                          !val?.eliminated)
                                      ? "text-gray-9a"
                                      : "text-[#D63333]"
                                  }`}
                                >
                                  <p
                                    class="text-14 text-current font-bold font-SpaceGrotesk leading-none truncate"
                                    style={{
                                      "max-width": "10rem",
                                    }}
                                  >
                                    {val?.username || ""}
                                  </p>
                                </div>
                              </div>
                              <div
                                class={`flex gap-2 items-center font-SpaceGrotesk font-bold ${
                                  game()?.status == "started" &&
                                  val &&
                                  game()?.turn % game()?.playersAmount ==
                                    val?.index
                                    ? "text-gradient"
                                    : game()?.status == "ended" &&
                                      game()?.winner?.player?.index == val.index
                                    ? "text-[#86FFB6]"
                                    : game()?.status == "pending" ||
                                      (game()?.status !== "ended" &&
                                        val &&
                                        game()?.turn % game()?.playersAmount !==
                                          val?.index &&
                                        !val?.eliminated)
                                    ? "text-gradient "
                                    : "text-gradient opacity-30"
                                }`}
                              >
                                <Coin width="5" />
                                <span>{game()?.value}</span>
                              </div>
                            </div>
                          ) : !val?.username &&
                            game()?.owner == userObject?.user?.id ? (
                            <div class="mx-auto">
                              <YellowGradientButton
                                isFullWidth={false}
                                callbackFn={callbot}
                              >
                                <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                                  <span class="text-gradient">Call Bot</span>
                                </div>
                              </YellowGradientButton>
                            </div>
                          ) : (
                            <div class="mx-auto">
                              <YellowGradientButton
                                isFullWidth={false}
                                callbackFn={join}
                              >
                                <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                                  <span class="w-max">Join</span>
                                  <Coin width="5" />
                                  <span class="text-gradient">
                                    {game()?.value}
                                  </span>
                                </div>
                              </YellowGradientButton>
                            </div>
                          )}

                          {/* <div class={`${val?.username ? "hidden" : "center"} absolute right-2 top-5 hover`} onClick={callbot}>
                                                      <div class="relative cursor-pointer center hover h-10 w-28 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden" style={{"background-image": `url(${YellowButtonBg})`}}>
                                                          <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0"></div>
                                                          <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13"></div>
                                                          <div class="absolute center">
                                                              <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">call bot</p>
                                                          </div>
                                                      </div>
                                                    </div> */}
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              <div class="center gap-6 flex-col md:flex-row grow">
                <div class="relative flex flex-col gap-2 justify-center">
                  <div
                    class={`flex-col z-10 relative w-max left-1/2 px-16 py-1 bottom-full transform -translate-x-1/2 ${
                      game()?.status == "ended" ? "center" : "hidden"
                    }`}
                    style={{
                      background:
                        "radial-gradient(50% 100% at 50% 0%, rgba(154, 158, 200, 0.24) 0%, rgba(154, 158, 200, 0) 100%)",
                      border: "1px solid",
                      "border-image-source":
                        "radial-gradient(36.46% 36.46% at 50% 100%, rgba(154, 158, 200, 0.36) 0%, rgba(154, 158, 200, 0) 100%)",
                    }}
                  >
                    <p class="text-20 text-gray-9a font-bold font-SpaceGrotesk">
                      Round Over
                    </p>
                  </div>
                  <div
                    class={`flex-col z-10 relative w-max left-1/2 px-16 py-1 bottom-full transform -translate-x-1/2 ${
                      game()?.status != "ended" ? "center" : "hidden"
                    }`}
                    style={{
                      background:
                        "radial-gradient(50% 100% at 50% 0%, rgba(255, 180, 54, 0.24) 0%, rgba(255, 180, 54, 0) 100%)",
                      border: "1px solid",
                      "border-image-source":
                        "radial-gradient(36.46% 36.46% at 50% 100%, rgba(255, 180, 54, 0.36) 0%, rgba(255, 180, 54, 0) 100%)",
                    }}
                  >
                    <p class="text-20 text-yellow-ffb font-bold font-SpaceGrotesk">
                      {game()?.status == "pending" ? (
                        "Waiting for Players..."
                      ) : game()?.status == "started" ? (
                        <>
                          <span class="text-gray-9a">Autopick in: </span>
                          {`0${counter()}`.slice(-2)}
                        </>
                      ) : (
                        "Game starting"
                      )}
                    </p>
                  </div>
                  <div class="relative mb-4">
                    <div
                      class={`grid grid-cols-5 gap-4 w-max ${
                        game()?.status == "ended" ? "opacity-10" : ""
                      }`}
                    >
                      <For
                        each={[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                          17, 18, 19, 20, 21, 22, 23, 24, 25,
                        ]}
                      >
                        {(i) => (
                          <PvpMinesSquare
                            id={i}
                            isMine={game()?.minesCleared?.includes(i)}
                            isFlipped={game()?.cleared?.includes(i)}
                            onClick={() => {
                              check(i);
                            }}
                          />
                        )}
                      </For>
                    </div>
                    {game()?.status == "ended" ? (
                      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 center flex-col">
                        <UserGameAvatar
                          isBot={game()?.winner?.player?.bot}
                          widthClasses="w-14 h-14"
                          mode="winner"
                          avatar={game()?.winner?.player?.avatar || ""}
                          name={game()?.winner?.player?.username || ""}
                        />
                        <div class="text-gradient-green-secondary font-SpaceGrotesk text-28 font-bold">
                          Winner
                        </div>
                        <div class="flex gap-2 items-center">
                          <Coin />
                          <div class="text-gradient font-SpaceGrotesk text-30 font-bold">
                            {game()?.winner?.value || 0}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div
                    class={`flex-col relative z-10 mt-24 ${
                      game()?.status != "started" && game()?.status != "ended"
                        ? "center"
                        : "hidden"
                    }`}
                  >
                    <p class="text-24 md:text-32 text-white font-medium font-Oswald uppercase">
                      {game()?.status == "pending"
                        ? "waiting for players"
                        : game()?.status == "counting"
                        ? "game starting"
                        : "game finished"}
                    </p>
                    <p
                      class={`text-20 md:text-24 text-white font-medium font-Oswald ${
                        game()?.status == "pending" ? "hidden" : ""
                      }`}
                    >
                      {game()?.status == "ended"
                        ? `The winner won ${game()?.winner?.value}`
                        : `The game will start in ${counter()} seconds`}
                    </p>
                    <div class="w-72 md:w-100 h-3 rounded-full bg-white my-4 overflow-hidden">
                      <div
                        class="w-full h-full rounded-full bg-yellow-ff duration-1000"
                        style={{
                          width: `${(counter() - 1) / 0.05}%`,
                        }}
                      />
                    </div>
                    {game()?.owner !== userObject?.user?.id ? (
                      <div
                        class={`${
                          game()?.status == "pending" ? "center" : "hidden"
                        } relative hover w-38 h-10 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden`}
                        style={{ "background-image": `url(${YellowButtonBg})` }}
                        onClick={join}
                      >
                        <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                        <div class="center gap-2 absolute">
                          <p class="text-14 text-dark-16 font-medium font-Oswald uppercase">
                            join for
                          </p>
                          <div class="center gap-0.5">
                            <Coin />
                            <p class="text-14 text-dark-16 font-medium font-Oswald uppercase">
                              {game()?.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-8 py-7 bg-[#191C35] relative z-10 flex justify-between">
            <div class="flex flex-col gap-1 font-SpaceGrotesk font-bold">
              <div class=" text-13 text-gray-a2">Total Pot</div>
              <div class="flex gap-2 text-gradient-green-secondary text-14">
                <Coin width="6" />
                {game().value * game().playersAmount}
              </div>
            </div>
            <div class="flex gap-2">
              <div
                class={`h-10 w-max center px-5 py-[9px] border border-[#303448] rounded-4 flex gap-1 items-center text-gray-9a`}
              >
                <For each={Array.from(Array(game().playersAmount).keys())}>
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
                      {index() + 1 !== game().playersAmount ? (
                        <BattleRoyaleIcon additionClasses="w-3" />
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </For>
                <div
                  classList={{
                    "text-yellow-ffb": game().mode === "royale",
                    "text-[#DAFD09]": game().mode === "cursed",
                  }}
                >
                  {game().mode === "royale" ? "Royale" : "Cursed"}
                </div>
              </div>
              <div class="h-10 rounded-4 flex items-center px-3 border border-gray-9a text-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
                <FairnessShieldIcon />
                <span>Fairness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PvpModal;
