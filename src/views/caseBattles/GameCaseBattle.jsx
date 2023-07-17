import injector from "../../injector/injector";
import {
  createEffect,
  createSignal,
  For,
  Match,
  onCleanup,
  Switch,
  Show,
  onMount,
} from "solid-js";
import {useLocation} from "solid-app-router";
import HoveredButton from "../../components/elements/HoveredButton";
import BattleSpinnerReel from "../../components/battle/BattleSpinnerReelTest";
import {otherOptions} from "../../libraries/caseSpinConfig";
import {isNumber} from "chart.js/helpers";
import Coin from "../../utilities/Coin";
import Ranks from "../../utilities/Ranks";
import RankLabel from "../../components/chat/RankLabel";
import ItemPlaceholder from "../../assets/img/case/ItemPlaceholder.png";
import {NavLink} from "solid-app-router";
import ArrowBack from "../../components/icons/ArrowBack";
import {URL} from "../../libraries/url";
import BattleRoyaleIcon from "../../components/icons/BattleRoyaleIcon";
import BattleCursedIcon from "../../components/icons/BattleCursedIcon";
import BattleGroupIcon from "../../components/icons/BattleGroupIcon";
import GrayWrapperdWithBorders from "../../components/battle/GrayWrapperdWithBorders";
import bgVectorCaseBattle from "../../assets/img/case-battles/bgVectorCaseBattle.png";
import {tippy} from "solid-tippy";
import CaseToolTip from "../../components/battle/CaseToolTip";
import SmallItemCardNew from "../../components/battle/SmallItemCardNew";
import UserBadge from "../../components/battle/UserBadge";
import {useDebounce} from '../../utilities/hooks/debounce'

import ItemCardSmall from "../../components/battle/ItemCardSmall";
import UserGameAvatar from "../../components/battle/UserGameAvatar";
import Spiner from "../../components/battle/Spiner";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
import GrayGradientButton from "../../components/elements/GrayGradientButton";
import EmojiIcon from "../../components/icons/EmojiIcon";
import {getRandomFunction} from "../../utilities/Random/randomGen";
import WinningsDisplay from "../../components/battle/WinningsDisplay";
import LosingDisplay from "../../components/battle/LosingDisplay";
import {getCurrencyString} from "../../components/mines_new/utils/tools";
import StackedCasesBar from "../../components/battle/StackedCasesBar";
import CaseViewModal from "../../components/modals/CaseViewModal";
import CountDownText from "../../components/battle/CountDownText";
import {
  playCountDownSound,
  playPullBackSound,
  playWinSound,
  playCaseBattlesSound,
  playCaseBattlesConfettiSound,
} from "../../utilities/Sounds/SoundButtonClick";
import clickSeq from "../../assets/sounds/clickSeq.mp3";
import {useSpinnerStatus} from "../../utilities/hooks/spinnerStatus";
import CoinStack from "../../assets/img/case-battles/CoinStack.png";
import GoldText from "../../components/shared/GoldText";
import ResultsAnimation from "../../components/battle/ResultsAnimation";

import CaseLineYellow from "../../assets/img/case-battles/caseLineHorizontal.svg";
import CaseLineBlue from "../../assets/img/case-battles/caseLineHorizontalBlue.svg";
import CaseLineGreen from "../../assets/img/case-battles/caseLineHorizontalGreen.svg";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png";
import BattlePullsColumn from "../../components/battle/BattlePullsColumn";
import { getColorByPrice, getGradientForWinners, getModeColorByName, getModeHexByTextColor, getModeRgbByTextColor, isWinner } from "../../utilities/caseBattles-tools";
import CaseBattleSpinersContainer from "./CaseBattleSpinersContainer";

export const [containerRef, setContainerRef] = createSignal(null);
export const [reelsSpinning, setReelsSpinning] = createSignal(false);
export const [spinIndexes, setSpinIndexes] = createSignal([]);
export const [spinOffsets, setSpinOffsets] = createSignal([]);
export const [spinLists, setSpinLists] = createSignal([]);

export const clickingSound = new Audio(clickSeq);

export const getJoinTeam = (mode, playerIndex) => {
  if (mode === "group") {
    return 1;
  } else if (mode === "royal") {
    return playerIndex;
  } else if (playerIndex <= 2) {
    return 1;
  } else {
    return 2;
  }
};

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray,
};

const GameCaseBattle = (props) => {
  const {socket, userObject, toastr} = injector;

  const [game, setGame] = createSignal(null);
  const [rollItems, setRollItems] = createSignal([]);
  const [spinnerOptions, setSpinnerOptions] = createSignal([]);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);
  const [battleCases, setBattleCases] = createSignal([]);
  const [caseViewModal, setCaseViewModal] = createSignal(false);
  const [caseViewModalItem, setCaseViewModalItem] = createSignal(null);
  const [currentCountdown, setCurrentCountdown] = createSignal(3);
  const [beginPullBackSound, setBeginPullBackSound] = createSignal(false);
  const [beginWinSound, setBeginWinSound] = createSignal(false);
  const [beginClickSound, setBeginClickSound] = createSignal(false);
  const [spinQueue, setSpinQueue] = createSignal([]);
  const [confettiFired, setConfettiFired] = createSignal(false);
  // const [spinnerStatus, setSpinnerStatus] = createSignal({status: "inactive"});
  const [confettiData, setConfettiData] = createSignal([]);
  const [playerRoundData, setPlayerRoundData] = createSignal([[]]);
  const [playerBarRef, setPlayerBarRef] = createSignal(null);

  const [showResults, setShowResults] = createSignal(false);
  const [innerWidth, setInnerWidth] = createSignal(window.innerWidth)

  const {changeStatus} = useSpinnerStatus();

  const toggleCaseViewModal = () => {
    setCaseViewModal(!caseViewModal());
  };

  let counter = 0;
  let intervalId = null;

  const generateSpinList = (playerIndex) => {
    setSpinOffsets([]);

    const newSpinList = [];

    for (let i = 0; i < 35; i++) {
      const r = Math.floor(
        createRandomFunction(game().id, game().currentRound, playerIndex, i)() *
          rollItems().length
      );
      newSpinList.push(rollItems()[r]);
    }
    return newSpinList;
  };

  const getRandomIndex = (playerIndex) => {
    return (
      Math.floor(
        createRandomFunction(game().id, game().currentRound, playerIndex)() *
          (otherOptions.verticalEndBound - otherOptions.verticalStartBound + 1)
      ) + otherOptions.verticalStartBound
    );
  };

  let timeout1 = null;
  let timeout2 = null;
  const updateGame = (inputGame) => {
    // setWinnings(game()?.players || []);
    if (inputGame?.status === "results") {
      setShowResults(true);
    }
    if (
      playerRoundData()[0]?.length < inputGame.currentRound - 1 &&
      inputGame?.status === "playing"
    ) {
      setPlayerRoundData(
        setAllRoundData(inputGame.players, inputGame.currentRound)
      );
      console.log("SYNCING");
      inputGame.status = "syncing";
    } else if (
      (game()?.players && game()?.status === "playing") ||
      game()?.status === "syncing"
    ) {
      setPlayerRoundData(
        updateRoundData(game().players, game().currentRound, playerRoundData())
      );
    } else {
      setPlayerRoundData(new Array(inputGame.playersQty).fill([]));
    }

    if (inputGame.status === "ended") {
      setPlayerRoundData(
        setAllRoundData(inputGame.players, inputGame.currentRound)
      );
    }

    if (confettiIntervals().length > 0) {
      confettiIntervals().forEach((interval) => {
        clearInterval(interval);
      });
      setConfettiIntervals([]);
      setHasCleanedUpConfetti(true);

      console.log("FORCE CLEAN INTERVALS");
    }
    // setContainsConfettiWin(false);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    setRollItems([]);
    setSpinnerOptions([]);
    setGame(() => inputGame);

    if (
      inputGame.status === "playing" ||
      (inputGame.status === "syncing" && isNumber(inputGame.currentRound))
    ) {
      setRollItems(() =>
        inputGame.cases[inputGame.currentRound].items.map((item) => ({
          img: item.image?.replace("{url}", window.origin) || "",
          price: item.item_price,
          name: item.name,
          rarity: getColorByPrice(item.item_price),
          isConfetti: item.isConfetti,
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
            rarity: getColorByPrice(
              inputGame.players[playerIndex + 1][
                `round_${inputGame.currentRound}`
              ].item_price
            ),
            isConfetti:
              inputGame.players[playerIndex + 1][
                `round_${inputGame.currentRound}`
              ].isConfetti,
          },
          isConfettiWin:
            inputGame.players[playerIndex + 1][
              `round_${inputGame.currentRound}`
            ].isConfetti,
          isBigWin: true,
        }))
      );
      const newSpinIndexes = [];
      const newSpinLists = [];

      setContainsConfettiWin(false);
      for (let i = 0; i < game().playersQty; i++) {
        const spinIndex = getRandomIndex(i);
        let spinList = generateSpinList(i);
        spinList[spinIndex] = spinnerOptions()[i].winningItem;

        // if (spinnerOptions()[i].isBigWin) {
        //   setContainsBigWin(true);
        // }

        if (spinnerOptions()[i].winningItem.isConfetti) {
          setContainsConfettiWin(true);
          console.log("contains confetti win");
          setConfettiData((prev) => {
            const newConfettiData = [...prev];
            newConfettiData.push({
              item: spinnerOptions()[i].winningItem,
            });
            return newConfettiData;
          });
        } else {
          setConfettiData((prev) => {
            const newConfettiData = [...prev];
            newConfettiData.push({
              item: null,
            });
            return newConfettiData;
          });
        }

        newSpinLists.push(spinList);
        newSpinIndexes.push(spinIndex);
      }

      setSpinIndexes(() => newSpinIndexes);
      setSpinLists(() => newSpinLists);
      setConfettiFired(false);
      setHasCleanedUpConfetti(false);
      setConfettiIntervals([]);
      if (game().status != "syncing") {
        if (containsConfettiWin()) {
          playCaseBattlesConfettiSound();
        } else {
          playCaseBattlesSound();
        }
        changeStatus("spinning");
        changeStatus("inactive");
      }
    }
  };

  const getSingleRoundData = (players, roundNumber) => {
    const result = [];

    // Iterate through each player in the object
    for (let playerId in players) {
      const player = players[playerId];
      const roundKey = `round_${roundNumber}`;

      // Add the round data to the result array if it exists
      if (player[roundKey]) {
        result.push(player[roundKey]);
      } else {
        result.push(null); // or some other default value
      }
    }
    return result;
  };

  const updateRoundData = (players, roundNumber, playerRoundData) => {
    // Get the single round data for all players
    const singleRoundData = getSingleRoundData(players, roundNumber);

    // Make a deep copy of playerRoundData to avoid reference issue
    const updatedPlayerRoundData = JSON.parse(JSON.stringify(playerRoundData));

    // Iterate through each player's round data
    for (let i = 0; i < singleRoundData.length; i++) {
      // If the player's round data array does not exist, initialize it
      if (!updatedPlayerRoundData[i]) {
        updatedPlayerRoundData[i] = [];
      }

      // Add the player's round data to their round data array
      updatedPlayerRoundData[i].push(singleRoundData[i]);
    }

    return updatedPlayerRoundData;
  };

  const setAllRoundData = (players, totalRounds) => {
    let allRoundData = [];

    // Iterate through all rounds
    for (let roundNumber = 0; roundNumber <= totalRounds; roundNumber++) {
      // Get the round data for this round and add it to allRoundData
      allRoundData = updateRoundData(players, roundNumber, allRoundData);
    }

    return allRoundData;
  };

  const callBot = (player_index) => {
    socket.emit(
      "battles:callbot",
      {
        gameId: Number(game().id),
        team: getJoinTeam(game().mode, player_index),
        player_index,
      },
      (data) => {
        if (data.error) toastr(data);
      }
    );
  };

  const joinGame = (player_index) => {
    socket.emit(
      "battles:join",
      {
        gameId: Number(game().id),
        team: getJoinTeam(game().mode, player_index),
        player_index,
        urlKey: props.searchParams.key,
      },
      (data) => {
        if (data.error) toastr(data);
      }
    );
  };

  const getCurrentRollItem = () => {
    return (
      game().cases[game().currentRound > 0 ? game().currentRound : 0] ??
      game().cases[0]
    );
  };

  function mapAndRemoveRound(obj) {
    const newObj = Object.fromEntries(
      Object.entries(obj).reduce((acc, [key, value]) => {
        const val = Object.fromEntries(
          Object.entries(value).reduce((g, [key, value]) => {
            if (!key.includes("round")) {
              g.push([key, value]);
            } else {
              const roundIndex = parseInt(key.split("_")[1]);
              if (isNaN(roundIndex) || roundIndex <= counter) {
                g.push([key, value]);
              }
            }
            return g;
          }, [])
        );

        acc.push([key, val]);
        return acc;
      }, [])
    );

    return newObj;
  }

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
            if (data.data?.game) {
              setBattleCases(data.data.game.cases);
              if (!props.searchParams.reply) {
                updateGame(data.data.game);
              } else {
                updateGame({
                  ...data.data.game,
                  status: "playing",
                  currentRound: counter,
                  players: mapAndRemoveRound(data.data.game.players),
                  winners: undefined,
                });
                counter++;
                intervalId = setInterval(() => {
                  if (counter < data.data.game.cases.length) {
                    const t = {
                      ...data.data.game,
                      status: "playing",
                      currentRound: counter,
                      players: mapAndRemoveRound(data.data.game.players),
                      winners: undefined,
                    };
                    updateGame(t);
                    counter++;
                  } else {
                    updateGame({...data.data.game, status: "results"});
                    updateGame({...data.data.game, status: "ended"});
                    clearInterval(intervalId);
                  }
                }, 5500);
              }
              preLoadImages();
            }
          }
        );
      }
    }
  });

  createEffect(() => {
    socket.on(`battles:update`, (data) => {
      if (data.gameId === Number(game()?.id) && data.data) {
        updateGame(data.data);
      }
    });

    socket.on(`battles:countdown`, (data) => {
      if (data.gameId === Number(game()?.id) && data.data) {
        updateGame(data.data);
        setCurrentCountdown(data.data.currentCountdown);
        playCountDownSound();
      }
    });
  });

  const handleChangeInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  };

  onMount(() => {
    window.addEventListener('resize', useDebounce(handleChangeInnerWidth, 1000));
  });

  onCleanup(() => {
    console.log("onCleanup!!!!!!!!!!!!!!");
    setSpinLists([]);
    setSpinIndexes(null);
    setSpinOffsets([]);
    setGame(undefined);
    socket.off(`battles:update`);
    counter = 0;
    clearInterval(intervalId);
    window.removeEventListener('resize', useDebounce(handleChangeInnerWidth, 1000));
  });

  const createRandomFunction = (
    gameId,
    currentRound,
    playerIndex = 2,
    i = 0
  ) => {
    const rng = getRandomFunction(
      `${gameId.toString()}${currentRound.toString()}${playerIndex.toString()}${i.toString()}}`
    );
    return rng;
  };

  const preLoadImages = () => {
    // remove duplicates in battleCases
    const cases = game().cases.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    const bgLogoColors = new Set();

    // loop through each case, and each case items and pre load the images
    cases.forEach((c) => {
      c.items.forEach((i) => {
        const img = new Image();
        img.src = i.image;
        bgLogoColors.add(getColorByPrice(i.item_price));
      });
    });

    // pre load image backgrounds
    bgLogoColors.forEach((rarity) => {
      const img = new Image();
      img.src = bglogos[rarity];
    });

    // pre load case line images
    if (game().cursed) {
      const img = new Image();
      img.src = CaseLineGreen;
    } else if (game().mode === "royal") {
      const img = new Image();
      img.src = CaseLineYellow;
    } else if (game().mode === "group") {
      const img = new Image();
      img.src = CaseLineBlue;
    }
  };

  createEffect(() => {
    if (beginClickSound()) {
      setBeginClickSound(false);
      if (userObject?.user?.sounds) {
        clickingSound.currentTime = 0;
        clickingSound.volume = userObject.user.sounds;
        clickingSound.play();
      }
    }
    if (beginPullBackSound()) {
      setBeginPullBackSound(false);
      playPullBackSound();
    }

    if (beginWinSound()) {
      setBeginWinSound(false);
      if (containsConfettiWin()) {
        playWinSound();
      }
    }
  });

  // const [confettiActive, setConfettiActive] = createSignal(false);


  // let confettiInterval;
  // const createConfetti = () => {
  //   if (!confettiActive()) {
  //     setConfettiActive(true);

  //     const rectA = confettiCannonRefA().getBoundingClientRect();

  //     const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
  //     const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

  //     // Fire confetti every 100 milliseconds (you can adjust this value)
  //     const intervalDuration = 30;
  //     const particleCount = 5;
  //     const spread = 30;
  //     const startVelocity = 25;
  //     const colorCodes = {
  //       purple: "#9c27b0",
  //       gold: "#ffeb3b",
  //       red: "#f44336",
  //       blue: "#2196f3",
  //       gray: "#9e9e9e",
  //     };
  //     const spinList = props.spinList;
  //     const color = spinList[props.spinIndex].rarity;
  //     const ticks = 70;

  //     confettiInterval = setInterval(() => {
  //       confetti({
  //         particleCount,
  //         spread,
  //         origin: {x: xA, y: yA},
  //         startVelocity,
  //         colors: ["#FFFFFF", colorCodes[color]],
  //         ticks,
  //       });
  //     }, intervalDuration);

  //     // Clear the interval after 3 seconds
  //     setTimeout(() => {
  //       clearInterval(confettiInterval);
  //       setConfettiActive(false);
  //     }, 200);
  //   }
  // };


  async function asyncInterval(func, delay, times) {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      func();
    }
  }

  const [confettiIntervals, setConfettiIntervals] = createSignal([]);


  const [hasCleanedUpConfetti, setHasCleanedUpConfetti] = createSignal(false);
  createEffect(() => {
    
    // if (isIntersectingB()) {
    //   if (!hasCleanedUpConfetti()) {
    //     if (
    //       lastAction().type !== "activate" &&
    //       lastAction().round === game().currentRound
    //     ) {
    //       console.log("catch activate", game().currentRound);
    //       setLastAction({type: "activate", round: game().currentRound});
    //       createConfetti();
    //     } else if (
    //       lastAction().type === "activate" &&
    //       lastAction().round === game().currentRound
    //     ) {
    //       console.log("clean up", game().currentRound);
    //       setLastAction({type: "clean up", round: game().currentRound});
    //       cleanUpConfetti();
    //     } else {
    //       console.log("clean up next round for some reason");
    //     }
    //   }
    // }
  });

  // const activate = (round) => {};

  return (
    <div class="flex flex-col">
      {game() && (
        <div class="w-full h-full flex flex-col gap-8 relative py-4 lg:py-8">
          <div class="lg:px-4 xl:px-8 xxl:px-14 flex flex-col">
            <div class="flex flex-col lg:flex-row  gap-3 lg:gap-2 mb-0 xl:-mb-8">
              <div class="flex lg:items-center flex-col gap-3 lg:flex-row lg:gap-6">
                <NavLink href={URL.GAMEMODES.CASE_BATTLES}>
                  <div class="flex gap-2 items-center p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max h-[40px]">
                    <ArrowBack />
                    <span class="font-SpaceGrotesk text-14 text-gray-9a">
                      Return to Battles
                    </span>
                  </div>
                </NavLink>
                <div class="flex flex-col text-14 font-SpaceGrotesk font-bold text-gray-a2">
                  <span class="w-max">Battle Cost</span>
                  <div class="flex items-center gap-2">
                    <img src={CoinStack} alt="" />
                    <span class="text-gradient">
                      {getCurrencyString(game().totalValue)}
                    </span>
                    {game().fundBattle ? (
                      <div
                        class={
                          "rounded-2 border border-[#0BBD52]/10 px-1 w-[29px] center text-green-3e font-Quicksand font-bold text-10"
                        }
                        style={{
                          background:
                            "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                        }}
                      >
                        -{game().fundPercent}%
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 lg:justify-center lg:items-center">
                <div
                  class={`w-max lg:center h-10 px-5 border border-[#303448] rounded-4 flex gap-1 items-center text-gray-9a`}
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
                          (getModeColorByName(game().mode) === "yellow" ? (
                            <BattleRoyaleIcon additionClasses="w-3" />
                          ) : getModeColorByName(game().mode) === "green" ? (
                            <BattleCursedIcon additionClasses="w-4" />
                          ) : (
                            <BattleGroupIcon additionClasses="w-4" />
                          ))}
                      </>
                    )}
                  </For>
                  <div
                    classList={{
                      "text-yellow-ffb": getModeColorByName(game().mode) === "yellow",
                      "text-[#DAFD09]": getModeColorByName(game().mode) === "green",
                      "text-[#5AC3FF]": getModeColorByName(game().mode) === "blue",
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
                {/* <div class="h-10 rounded-4 flex items-center px-3 border border-gray-9a text-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
                    <FairnessShieldIcon />
                    <span>Fairness</span>
                  </div> */}
              </div>
            </div>
            <div class="mx-auto flex flex-col">
              <div
                class={`flex items-center justify-center gap-[${
                  battleCases().length <= 25
                    ? "4"
                    : battleCases().length <= 40
                    ? "2"
                    : battleCases().length <= 70
                    ? "1"
                    : "0"
                }px] py-3 max-w-[300px]`}
              >
                <For each={Array.from(Array(battleCases().length).keys())}>
                  {(i) => (
                    <div
                      class={`w-2 h-1 ${
                        game().currentRound + 1 > i || game().status === "ended"
                          ? "bg-yellow-ffb"
                          : "bg-[#3B3D4D]"
                      }`}
                      style={{
                        transition: "all 0.3s ease-in-out",
                        "box-sizing": "border-box",
                      }}
                    />
                  )}
                </For>
              </div>
              <GrayWrapperdWithBorders classes="rounded-t-4 min-w-[300px]">
                {game().status !== "ended" ? (
                  <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-gray-9a items-center py-1 px-12">
                    <span class="w-max truncate">{getCurrentRollItem().name}</span>
                    <img src={CoinStack} alt="" />
                    <span class="text-gradient text-shadow-gold-secondary">
                      {getCurrencyString(getCurrentRollItem().price)}
                    </span>
                  </div>
                ) : (
                  <div class="w-full flex justify-center text-14 font-SpaceGrotesk font-bold text-gray-9a py-1">
                    Battle Over
                  </div>
                )}
              </GrayWrapperdWithBorders>
            </div>
            <div class="overflow-auto">
              <div class="w-full flex flex-col gap-3">
                <div class="relative">
                  <div
                    class="relative w-full flex items-center justify-center p-[1px] rounded-t-8"
                    style={{
                      background: `radial-gradient(circle at center, rgba(${
                        game().status !== "ended"
                          ? `${getModeRgbByTextColor(getModeColorByName(game().mode))}, 1`
                          : `255, 255, 255, 0.05`
                      }) 6%, rgba(255, 255, 255, 0.05) 8%)`,
                    }}
                  >
                    {game().status !== "ended" && (
                      <>
                        <div
                          class={`absolute left-1/2 top-0 -translate-x-1/2 rotate-180
                                  border-x-[8px] border-b-[4px]
                                  border-x-transparent`}
                          style={{
                            "border-bottom-color": getModeHexByTextColor(getModeColorByName(game().mode)),
                          }}
                        />
                        <div
                          class={`absolute left-1/2 bottom-0 -translate-x-1/2
                                  border-x-[8px] border-b-[4px]
                                  border-x-transparent`}
                          style={{
                            "border-bottom-color": getModeHexByTextColor(getModeColorByName(game().mode)),
                          }}
                        />
                      </>
                    )}
                    <div class="w-full bg-[#15162C] rounded-t-8">
                      <div class="w-full rounded-t-8 bg-[rgba(255, 255, 255, 0.05)]">
                        <div class="w-full bg-[#15162C] rounded-t-8 h-[56px]">
                          <div
                            class="flex justify-center w-full overflow-hidden rounded-t-8 h-full"
                            style={{
                              background: `radial-gradient(33.44% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.05) 0%, rgba(255, 180, 54, 0) 100%),
                                linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.14) 100%),
                                linear-gradient(180deg, rgba(118, 124, 255, 0) -15.97%, rgba(118, 124, 255, 0.08) 59.38%, rgba(118, 124, 255, 0) 134.72%),
                                linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
                                radial-gradient(220.05% 24.97% at 39.62% 51.7%, rgba(31, 35, 68, 0.36) 0%, rgba(35, 37, 61, 0.36) 100%)`,
                            }}
                          >
                            {(game().status === "playing" ||
                              game().status === "open" ||
                              game().status === "pending" ||
                              game().status === "countdown") && (
                              <div
                                class="absolute left-1/2 top-1/2 h-full w-[64px] -translate-x-1/2 -translate-y-1/2"
                                style={{
                                  background:
                                    getModeColorByName(game().mode) === "yellow"
                                      ? "linear-gradient(270deg, rgba(255, 180, 54, 0) 0%, rgba(255, 180, 54, 0.12) 50%, rgba(255, 180, 54, 0) 100%)"
                                      : getModeColorByName(game().mode) === "blue"
                                      ? "linear-gradient(270deg, rgba(90, 195, 255, 0) 0%, rgba(90, 195, 255, 0.12) 50%, rgba(90, 195, 255, 0) 100%)"
                                      : "linear-gradient(270deg, rgba(218, 253, 9, 0) 0%, rgba(218, 253, 9, 0.12) 50%, rgba(218, 253, 9, 0) 100%)",
                                }}
                              />
                            )}
                            <div
                              class="flex items-center w-max relative transition-all duration-500 ease-in-out "
                              style={{
                                transform: `translateX(${
                                  game().status === "playing" ||
                                  game().status === "open" ||
                                  game().status === "pending" ||
                                  game().status === "countdown"
                                    ? 32 * (game().cases.length - 1) -
                                      64 * (game().currentRound ?? 0)
                                    : 0
                                }px)`,
                                transition: "all 0.4s ease-in-out",
                              }}
                            >
                              {game().status !== "ended" ? (
                                <For each={battleCases() || []}>
                                  {(caseItem, index) => (
                                    <div
                                      class={`relative py-1
                                      ${
                                        (game().status === "open" ||
                                          game().status === "pending" ||
                                          game().status === "countdown") &&
                                        (index() === 0
                                          ? "scale-[120%]"
                                          : "scale-[90%]") +
                                          (index() > 4 ? " opacity-0" : "")
                                      }
                                      ${
                                        game().status === "playing" &&
                                        (index() < game().currentRound
                                          ? index() < game().currentRound - 4
                                            ? "opacity-0"
                                            : "opacity-50 scale-[90%]"
                                          : index() === game().currentRound
                                          ? "scale-[120%]"
                                          : index() > game().currentRound
                                          ? index() > game().currentRound + 4
                                            ? "opacity-0"
                                            : "opacity-100 scale-[90%]"
                                          : "")
                                      }
                                      `}
                                      style={{
                                        transition: "transform 0.4s ease-in",
                                      }}
                                    >
                                      <img
                                        alt={caseItem.name}
                                        class="h-[48px] min-w-[64px]"
                                        src={
                                          caseItem?.image
                                            ?.replace("{url}", window.origin)
                                            .replace(
                                              ".png",
                                              "_thumbnail.png"
                                            ) || ""
                                        }
                                        onContextMenu={(e) => {
                                          e.preventDefault();
                                          setCaseViewModalItem(caseItem);
                                          toggleCaseViewModal();
                                        }}
                                        use:tippy={{
                                          props: {
                                            content: (
                                              <CaseToolTip
                                                price={caseItem.price}
                                                name={caseItem.name}
                                              />
                                            ),
                                            allowHTML: true,
                                            duration: 0,
                                          },
                                          hidden: true,
                                        }}
                                      />
                                    </div>
                                  )}
                                </For>
                              ) : (
                                <StackedCasesBar
                                  cases={battleCases()}
                                  setCaseViewModalItem={setCaseViewModalItem}
                                  toggleCaseViewModal={toggleCaseViewModal}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4">
                  <CaseBattleSpinersContainer
                    game={game}
                    confettiFired={confettiFired}
                    setConfettiFired={setConfettiFired}
                    spinnerOptions={spinnerOptions}
                    containsConfettiWin={containsConfettiWin}
                    spinQueue={spinQueue}
                    setSpinQueue={setSpinQueue}
                    spinIndexes={spinIndexes}
                    currentCountdown={currentCountdown}
                    showResults={showResults}
                    playerBarRef={playerBarRef}
                    confettiData={confettiData}
                    setConfettiData={setConfettiData}
                    innerWidth={innerWidth}
                    players={innerWidth() > 600
                      ? Array.from(Array(game().playersQty).keys())
                      : Array.from(Array(game().playersQty).keys()).slice(
                          0,
                          2
                        )}
                  />
                  <Show when={innerWidth() < 600 && game().playersQty > 2}>
                    <CaseBattleSpinersContainer
                      game={game}
                      confettiFired={confettiFired}
                      setConfettiFired={setConfettiFired}
                      spinnerOptions={spinnerOptions}
                      containsConfettiWin={containsConfettiWin}
                      spinQueue={spinQueue}
                      setSpinQueue={setSpinQueue}
                      spinIndexes={spinIndexes}
                      currentCountdown={currentCountdown}
                      showResults={showResults}
                      playerBarRef={playerBarRef}
                      confettiData={confettiData}
                      setConfettiData={setConfettiData}
                      innerWidth={innerWidth}
                      players={Array.from(Array(game().playersQty).keys()).slice(2)}
                    />
                  </Show>
                  </div>
                </div>
                <div class={`grid lg:hidden grid-cols-2 gap-y-4 lg:grid-cols-${
                    game().playersQty
                  }`}>
                  <For each={Array.from({length: game().playersQty})}>
                      {(_, index) => {
                        return (
                          <BattlePullsColumn
                            columnIndex={index}
                            game={game}
                            playerRoundData={playerRoundData}
                            handleCallBot={() => callBot(index() + 1)}
                            handleJoinGame={() => joinGame(index() + 1)}
                          />
                        )
                      }}                 
                  </For>
                </div>
                <div
                  class={`hidden lg:grid rounded-8 border border-black border-opacity-5 relative z-10 grid-cols-${
                    game().playersQty
                  }
                  
                  `}
                  style={{
                    background: `radial-gradient(25% 50% at 50% 0%, rgba(${getModeRgbByTextColor(getModeColorByName(game().mode))}, ${
                      game().status === "ended" ? 0 : "0.07"
                    }) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`,
                  }}
                  ref={setPlayerBarRef}
                >
                  <For each={Array.from(Array(game().playersQty).keys())}>
                    {(playerIndex, index) => (
                      <div
                        class={`center relative pb-2 ${
                          game().status !== "ended" ||
                          isWinner(game().winners, playerIndex)
                            ? `opacity-100 ${
                                playerIndex === 0
                                  ? "rounded-l-8"
                                  : playerIndex ===
                                    Array.from(
                                      Array(game().playersQty).keys()
                                    ).at(-1)
                                  ? "rounded-r-8"
                                  : ""
                              }`
                            : "opacity-30"
                        }`}
                        // style={{
                        //   background: `${getGradientForWinners(
                        //     game().playersQty,
                        //     game().winners,
                        //     playerIndex
                        //   )}`,
                        // }}
                      >
                        {game().players[playerIndex + 1] ? (
                          <div class="center p-2">
                            <div
                              class={`pl-2 pr-6 flex flex-row gap-2 center
                            ${
                              game().status !== "ended" &&
                              game().status !== "results"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            >
                              <div class="w-max">
                                <UserGameAvatar
                                  mode={
                                    game()?.cursed === 1
                                      ? "cursed"
                                      : game()?.mode === "group" &&
                                        game()?.cursed !== 1
                                      ? "group"
                                      : "royal"
                                  }
                                  isBot={
                                    game().players[playerIndex + 1] &&
                                    !game().players[playerIndex + 1]?.avatar
                                  }
                                  avatar={
                                    game().players[playerIndex + 1]?.avatar
                                  }
                                  name={game().players[playerIndex + 1]?.name}
                                />
                              </div>
                              <UserBadge
                                game={game}
                                playerIndex={playerIndex}
                              />
                            </div>
                          </div>
                        ) : game().owner === userObject.user.id &&
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
                                  <span class="text-gradient">
                                    {game().fundBattle
                                      ? game().totalValue -
                                        (
                                          game().totalValue *
                                          (game().fundPercent / 100)
                                        ).toFixed()
                                      : game().totalValue}
                                  </span>
                                  {game().fundBattle ? (
                                    <div
                                      class={
                                        "rounded-2 border border-[#0BBD52]/10 px-1 w-[29px] center text-green-3e font-Quicksand font-bold text-10"
                                      }
                                      style={{
                                        background:
                                          "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                                      }}
                                    >
                                      -{game().fundPercent}%
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </YellowGradientButton>
                            </div>
                          </div>
                        )}
                        {Array.from(Array(game().playersQty).keys()).at(-1) !==
                          index() && (
                          <div class="border-r border-black border-opacity-20 absolute right-0 top-0 h-full" />
                        )}
                      </div>
                    )}
                  </For>
                </div>
                <div class="hidden border border-black border-opacity-5 rounded-8 -mt-12 lg:flex bg-dark-secondary border-r-0 ">
                  <For each={Array.from(Array(game().playersQty).keys())}>
                    {(playerIndex) => (
                      <>
                        <div class="flex w-full px-5 py-10 pt-12">
                          {game().players[playerIndex + 1] && (
                            <div class="flex gap-2 flex-wrap justify-center w-full">
                              <For
                                each={Array.from(
                                  Array(game().cases.length).keys()
                                )}
                              >
                                {(round) => (
                                  <div>
                                    {playerRoundData()[playerIndex][round] ? (
                                      <div class="w-30 h-[7.5rem] center">
                                        <SmallItemCardNew
                                          item={
                                            playerRoundData()[playerIndex][
                                              round
                                            ]
                                          }
                                          color={getColorByPrice(
                                            playerRoundData()[playerIndex][
                                              round
                                            ].item_price
                                          )}
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <img
                                          src={ItemPlaceholder}
                                          class="w-30 h-[7.5rem] center"
                                        />
                                        {/* <div
                                          class="w-30 h-[7.5rem] flex items-center justify-center font-bold text-72
                                        font-SpaceGrotesk rounded-md text-[#FFFFFF03]"
                                          style={{
                                            background: `linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%),
                                                        radial-gradient(136.7% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%),
                                                        linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.03) 41.3%, rgba(0, 0, 0, 0.03) 68.93%, 
                                                        rgba(255, 255, 255, 0.03) 100%)`,
                                          }}
                                        >
                                          {round}
                                        </div> */}
                                      </>
                                    )}
                                  </div>
                                )}
                              </For>
                            </div>
                          )}
                        </div>
                        <div class="border-r border-black border-opacity-5" />
                      </>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Show when={caseViewModal()}>
        <CaseViewModal
          item={caseViewModalItem()}
          handleClose={toggleCaseViewModal}
        />
      </Show>
    </div>
  );
};

export default GameCaseBattle;
