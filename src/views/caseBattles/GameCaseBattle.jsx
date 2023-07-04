import injector from "../../injector/injector";
import {
  createEffect,
  createSignal,
  For,
  Match,
  onCleanup,
  Switch,
  Show,
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
  playCountDownSound, playPullBackSound, playWinSound
} from "../../utilities/Sounds/SoundButtonClick";
import clickSeq from "../../assets/sounds/clickSeq.mp3";
import {useSpinnerStatus} from "../../utilities/hooks/spinnerStatus";
import confetti, {create} from "canvas-confetti";

import CaseLineYellow from "../../assets/img/case-battles/caseLineHorizontal.svg";
import CaseLineBlue from "../../assets/img/case-battles/caseLineHorizontalBlue.svg";
import CaseLineGreen from "../../assets/img/case-battles/caseLineHorizontalGreen.svg";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png";

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
  const [winnings, setWinnings] = createSignal([]);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);
  const [battleCases, setBattleCases] = createSignal([]);
  const [caseViewModal, setCaseViewModal] = createSignal(false);
  const [caseViewModalItem, setCaseViewModalItem] = createSignal(null);
  const [currentCountdown, setCurrentCountdown] = createSignal(3);
  const [beginPullBackSound, setBeginPullBackSound] = createSignal(false);
  const [beginWinSound, setBeginWinSound] = createSignal(false);
  const [beginClickSound, setBeginClickSound] = createSignal(false);
  const [spinQueue, setSpinQueue] = createSignal([]);
  // const [spinnerStatus, setSpinnerStatus] = createSignal({status: "inactive"});
  const [confettiData, setConfettiData] = createSignal([]);

  const {changeStatus} = useSpinnerStatus();

  const toggleCaseViewModal = () => {
    setCaseViewModal(!caseViewModal());
  };

  let counter = 0;
  let intervalId = null;

  const getModeColor = () => {
    return (game().mode === "royal" || game().mode === "team") &&
      game().cursed !== 1
      ? "yellow"
      : game().cursed === 1
      ? "green"
      : "blue";
  };

  const getModeColorRgb = () => {
    const color = getModeColor();
    if (color === "yellow") return "255, 180, 54";
    if (color === "green") return "218, 253, 9";
    if (color === "blue") return "90, 195, 255";
  };

  const getModeColorHex = () => {
    const color = getModeColor();
    if (color === "yellow") return "#ffb436";
    if (color === "green") return "#DAFD09";
    if (color === "blue") return "#5ac3ff";
  };

  const getColor = (item_price) => {
    const color =
      item_price > 1000 * 100
        ? "gold"
        : item_price > 1000 * 30
        ? "red"
        : item_price > 1000 * 10
        ? "purple"
        : item_price > 1000 * 2
        ? "blue"
        : "gray";
    return color;
  };

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
    if (confettiIntervals().length > 0) {
      confettiIntervals().forEach((interval) => {
        clearInterval(interval);
      });
      setConfettiIntervals([]);
      setWinnings(game().players);
      setHasCleanedUpConfetti(true);

      console.log("FORCE CLEAN INTERVALS");
    }
    // setContainsConfettiWin(false);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    setRollItems([]);
    setSpinnerOptions([]);
    setGame(() => inputGame);
    if (inputGame.status === "playing") {
      // setTimeout(() => {
      //   setWinnings(inputGame.players);
      // }, 5500);
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
            rarity: getColor(
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
          setContainsConfettiWin(false);
        }

        newSpinLists.push(spinList);
        newSpinIndexes.push(spinIndex);
      }

      setSpinIndexes(() => newSpinIndexes);
      setSpinLists(() => newSpinLists);
      setConfettiFired(false);
      setHasCleanedUpConfetti(false);
      setConfettiIntervals([]);
      changeStatus("spinning");
      changeStatus("inactive");
    }
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

  onCleanup(() => {
    console.log("onCleanup!!!!!!!!!!!!!!");
    setSpinLists([]);
    setSpinIndexes(null);
    setSpinOffsets([]);
    setGame(undefined);
    socket.off(`battles:update`);
    counter = 0;
    clearInterval(intervalId);
  });

  const isWinner = (winnersArray, playerIndex) => {
    if (winnersArray) {
      return winnersArray.some(
        (winner) => winner.player_index === playerIndex + 1
      );
    }
    return false;
  };

  const getGradientForWinners = (playerQty, winnersArray, playerIndex) => {
    return (
      isWinner(winnersArray, playerIndex) &&
      (playerQty === 2
        ? `radial-gradient(100% 126.02% at ${
            playerIndex + 1 === 1 ? "0%" : "100%"
          } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
        : playerQty === 4
        ? `radial-gradient(100% 126.02% at ${
            playerIndex + 1 === 1 || playerIndex + 1 === 2 ? "0%" : "100%"
          } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
        : playerQty === 3
        ? `radial-gradient(${
            playerIndex + 1 === 2 ? "40%" : "100%"
          } 126.02% at ${
            playerIndex + 1 === 1
              ? "0%"
              : playerIndex + 1 === 2
              ? "50%"
              : "100%"
          } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
        : "")
    );
  };

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
        bgLogoColors.add(getColor(i.item_price));
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
  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal();
  const [confettiCannonRefB, setConfettiCannonRefB] = createSignal();
  const [confettiCannonRefC, setConfettiCannonRefC] = createSignal();
  const [confettiCannonRefD, setConfettiCannonRefD] = createSignal();

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

  const fireCannon = (ref, item) => {
    if (item) {
      console.log("fire confetti");
      const rectA = ref.getBoundingClientRect();

      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth;
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight;

      // Fire confetti every 100 milliseconds (you can adjust this value)
      const intervalDuration = 30;
      const particleCount = 5;
      const spread = 30;
      const startVelocity = 25;
      const colorCodes = {
        purple: "#9c27b0",
        gold: "#ffeb3b",
        red: "#f44336",
        blue: "#2196f3",
        gray: "#9e9e9e",
      };
      const color = getColor(item.item.price);
      const ticks = 70;

      // const confettiInterval = setInterval(() => {
      //   confetti({
      //     particleCount,
      //     spread,
      //     origin: {x: xA, y: yA},
      //     startVelocity,
      //     colors: ["#FFFFFF", colorCodes[color]],
      //     ticks,
      //   });
      // }, intervalDuration);

      asyncInterval(
        () => {
          confetti({
            particleCount,
            spread,
            origin: {x: xA, y: yA},
            startVelocity,
            colors: ["#FFFFFF", colorCodes[color]],
            ticks,
          });
        },
        70,
        4
      );

      // setConfettiIntervals([...confettiIntervals(), confettiInterval]);
    }
  };

  async function asyncInterval(func, delay, times) {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      func();
    }
  }

  const [confettiIntervals, setConfettiIntervals] = createSignal([]);

  const cleanUpConfetti = () => {
    // if (confettiFired()) {
    setHasCleanedUpConfetti(true);
    confettiIntervals().forEach((t) => {
      clearInterval(t);
    });
    setConfettiIntervals([]);
    setWinnings(game().players);
    // }
    // else {
    //   console.log("confetti not fired");
    // }
  };

  const createConfetti = () => {
    if (!confettiFired()) {
      setConfettiFired(true);
      for (let i = 0; i < game().playersQty; i++) {
        const ref = [
          confettiCannonRefA,
          confettiCannonRefB,
          confettiCannonRefC,
          confettiCannonRefD,
        ][i]();
        if (confettiData()[i].item) {
          fireCannon(ref, confettiData()[i]);
        }
      }
      setConfettiData([]);
    } else {
      console.log("confetti already fired");
    }
  };

  const [toIntersectA, setToIntersectA] = createSignal();
  const [toIntersectB, setToIntersectB] = createSignal();

  const [isIntersectingA, setIsIntersectingA] = createSignal(false);
  const [isIntersectingB, setIsIntersectingB] = createSignal(false);

  createEffect(() => {
    if (toIntersectA()) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIsIntersectingA(entry.isIntersecting);
        });
      });

      observer.observe(toIntersectA());

      onCleanup(() => {
        observer.unobserve(toIntersectA());
      });
    }
    if (toIntersectB()) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIsIntersectingB(entry.isIntersecting);
        });
      });

      observer.observe(toIntersectB());

      onCleanup(() => {
        observer.unobserve(toIntersectB());
      });
    }
  });
  const [lastAction, setLastAction] = createSignal({});
  const [confettiFired, setConfettiFired] = createSignal(false);
  const [hasCleanedUpConfetti, setHasCleanedUpConfetti] = createSignal(false);
  createEffect(() => {
    if (isIntersectingA()) {
      if (!confettiFired()) {
        console.log("activate", game().currentRound);
        setLastAction({type: "activate", round: game().currentRound});
        createConfetti();
      }
    }
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

  const activate = (round) => {};

  return (
    <div class="flex flex-col">
      {game() && (
        <div class="w-full h-full flex flex-col gap-8 relative py-8">
          <div class="px-4 xl:px-8 xxl:px-14 flex flex-col ">
            <div class="flex flex-col md:flex-row justify-between gap-2 mb-0 xl:-mb-8">
              <div class="flex items-center gap-6">
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
                    <Coin width="5" />
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
              <div class="flex flex-wrap gap-2 justify-center items-center mx-auto md:mx-0">
                <div
                  class={`w-max center h-10 px-5 border border-[#303448] rounded-4 flex gap-1 items-center text-gray-9a`}
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
                    <span class="w-max">{getCurrentRollItem().name}</span>
                    <Coin width="5" />
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
              <div class="w-fit md:w-full flex flex-col gap-8">
                <div class="relative">
                  <div
                    class="relative w-full flex items-center justify-center p-[1px] rounded-t-8"
                    style={{
                      background: `radial-gradient(circle at center, rgba(${
                        game().status !== "ended"
                          ? `${getModeColorRgb()}, 1`
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
                            "border-bottom-color": getModeColorHex(),
                          }}
                        />
                        <div
                          class={`absolute left-1/2 bottom-0 -translate-x-1/2
                                  border-x-[8px] border-b-[4px]
                                  border-x-transparent`}
                          style={{
                            "border-bottom-color": getModeColorHex(),
                          }}
                        />
                      </>
                    )}
                    <div class="w-full bg-[#15162C] rounded-t-8">
                      <div class="w-full rounded-t-8 bg-[rgba(255, 255, 255, 0.05)]">
                        <div class="w-full bg-[#15162C] rounded-t-8">
                          <div
                            class="flex justify-center w-full overflow-hidden rounded-t-8"
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
                                    getModeColor() === "yellow"
                                      ? "linear-gradient(270deg, rgba(255, 180, 54, 0) 0%, rgba(255, 180, 54, 0.12) 50%, rgba(255, 180, 54, 0) 100%)"
                                      : getModeColor() === "blue"
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
                  <div
                    class={`px-[2px] rounded-b-4 shadow-xl transition-colors duration-200`}
                    style={{
                      background: `linear-gradient(0deg, rgba(255, 255, 255, 0.02) 15%, rgba(255, 255, 255, 0.06) 30%, rgba(${
                        game().status === "ended"
                          ? "154, 158, 200"
                          : `${getModeColorRgb()}`
                      },0.6) 45.5%, transparent 45.5%, transparent 54.5%, rgba(${
                        game().status === "ended"
                          ? "154, 158, 200"
                          : `${getModeColorRgb()}`
                      },0.6) 54.5%, rgba(255, 255, 255, 0.035) 70%`,
                    }}
                  >
                    <div class="bg-[#13152A] rounded-b-4">
                      <div
                        class={`rounded-b-4 ${
                          game().status !== "ended" &&
                          `case-opening-wrapper-horizontal-${getModeColor()}`
                        }`}
                      >
                        <div
                          class="relative w-full h-[326px] flex"
                          ref={setContainerRef}
                        >
                          <div
                            class="absolute w-full inset-0 z-0 bg-repeat m-1 p-1 mix-blend-plus-lighter rounded-b-4"
                            style={{
                              "background-image": `url('${bgVectorCaseBattle}')`,
                              opacity: 0.002,
                            }}
                          />
                          <div
                            class={`arrow-down absolute top-1/2 -right-[10px] -translate-y-1/2 rotate-90 ${
                              game().status === "ended"
                                ? "gray"
                                : `${getModeColor()}`
                            }
                              transition-colors duration-200`}
                          />
                          <div
                            class={`arrow-down absolute top-1/2 -left-[10px] -translate-y-1/2 -rotate-90 ${
                              game().status === "ended"
                                ? "gray"
                                : `${getModeColor()}`
                            }
                              transition-colors duration-200`}
                          />
                          <div
                            class="absolute left-0 top-0 w-full h-[68px]"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(26, 28, 51, 1) 5.86%, rgba(26, 28, 51, 0) 100%)",
                              opacity: 0.5,
                            }}
                          />
                          <div
                            class="absolute left-0 bottom-0 w-full h-[68px]"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(26, 28, 51, 1) 5.86%, rgba(26, 28, 51, 0) 100%)",
                              transform: "matrix(-1, 0, 0, -1, 0, 0)",
                            }}
                          />
                          <For
                            each={Array.from(Array(game().playersQty).keys())}
                          >
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
                                        <GrayWrapperdWithBorders
                                          classes="rounded-6"
                                          gradientColor={getModeColor()}
                                        >
                                          <BattleRoyaleIcon
                                            additionClasses="w-6 m-2"
                                            glowColor={"255, 180, 54"}
                                          />
                                        </GrayWrapperdWithBorders>
                                      </div>
                                    </div>
                                  ) : getModeColor() === "green" ? (
                                    <div class="absolute z-40 text-[#DAFD09] center right-0 top-0 h-full border-r border-black border-opacity-10">
                                      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <GrayWrapperdWithBorders
                                          classes="rounded-6"
                                          gradientColor={getModeColor()}
                                        >
                                          <BattleCursedIcon
                                            additionClasses="w-7 m-2"
                                            glowColor={"218, 253, 9"}
                                          />
                                        </GrayWrapperdWithBorders>
                                      </div>
                                    </div>
                                  ) : (
                                    <div class="absolute z-40 text-[#5AC3FF] center right-0 top-0 h-full border-r border-black border-opacity-10">
                                      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        <GrayWrapperdWithBorders
                                          classes="rounded-6"
                                          gradientColor={getModeColor()}
                                        >
                                          <BattleGroupIcon
                                            additionClasses="w-7 mx-1 my-2"
                                            glowColor="90, 195, 255"
                                          />
                                        </GrayWrapperdWithBorders>
                                      </div>
                                    </div>
                                  ))}
                                <Switch>
                                  <Match
                                    when={
                                      game().status === "playing" &&
                                      spinLists().length > 0 &&
                                      game().players["1"].round_0.id !== null
                                    }
                                  >
                                    {() => {
                                      const randomFunction =
                                        createRandomFunction(
                                          game().id,
                                          game().currentRound,
                                          playerIndex
                                        );
                                      return (!!spinnerOptions()[playerIndex] &&
                                        !!spinLists()[playerIndex]) ? (
                                        <BattleSpinnerReel
                                          spinnerIndex={playerIndex}
                                          isConfettiWin={
                                            spinnerOptions()[playerIndex]
                                              .isConfettiWin || false
                                          }
                                          isBigWin={
                                            spinnerOptions()[playerIndex]
                                              .isBigWin
                                          }
                                          isFastSpin={false}
                                          lineColor={getModeColor()}
                                          randomFunction={randomFunction}
                                          user={userObject}
                                          containsConfettiWin={
                                            containsConfettiWin
                                          }
                                          gameType={game().mode}
                                          round={game().currentRound}
                                          spinQueue={spinQueue}
                                          setSpinQueue={setSpinQueue}
                                          // spinnerStatus={spinnerStatus}
                                          spinList={spinLists()[playerIndex]}
                                          spinIndex={spinIndexes()[playerIndex]}
                                          setToIntersectA={setToIntersectA}
                                          setToIntersectB={setToIntersectB}
                                        />
                                      ) : (
                                        <Spiner classes="w-9 text-yellow-ffb" />
                                      );
                                    }}
                                    {playerIndex === 0 && (
                                      <div
                                        class={`absolute self-center h-20 w-20  -bottom-2  left-1/2 -translate-x-1/2`}
                                        ref={setConfettiCannonRefA}
                                      />
                                    )}
                                    {playerIndex === 1 && (
                                      <div
                                        class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                                        ref={setConfettiCannonRefB}
                                      />
                                    )}
                                    {playerIndex === 2 && (
                                      <div
                                        class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                                        ref={setConfettiCannonRefC}
                                      />
                                    )}
                                    {playerIndex === 3 && (
                                      <div
                                        class={`absolute self-center h-20 w-20  -bottom-2 left-1/2 -translate-x-1/2`}
                                        ref={setConfettiCannonRefD}
                                      />
                                    )}
                                  </Match>
                                  <Match when={game().status === "open"}>
                                    {game().players[playerIndex + 1] ? (
                                      <div
                                        class="w-full h-full center text-gradient font-SpaceGrotesk text-28 font-bold"
                                        style={{
                                          "text-shadow": `0px 0px 20px rgba(255, 180, 54, 0.56), 0px 2px 2px rgba(0, 0, 0, 0.12)`,
                                        }}
                                      >
                                        Ready
                                      </div>
                                    ) : (
                                      <Spiner classes="w-9 text-yellow-ffb" />
                                    )}
                                  </Match>
                                  <Match when={game().status === "countdown"}>
                                    <div class="w-full h-full center">
                                      <CountDownText
                                        text={currentCountdown()}
                                        size={54}
                                      />
                                    </div>
                                  </Match>
                                </Switch>
                                <div
                                  class={`w-full center transition-all duration-200 ${
                                    game().status === "ended"
                                      ? "scale-100"
                                      : "absolute scale-0"
                                  }`}
                                >
                                  {game().status === "ended" ? (
                                    isWinner(game().winners, playerIndex) ? (
                                      <div class="w-full h-full center flex-col gap-2 relative z-10">
                                        <div
                                          class={`absolute w-[64px] h-[50px] z-0`}
                                          style={{
                                            background:
                                              "rgba(43, 246, 124, 0.56)",
                                            filter: "blur(50px)",
                                            "border-radius": "100px",
                                          }}
                                        />
                                        <div
                                          class="text-gradient-green font-SpaceGrotesk text-28 font-bold"
                                          style={{
                                            "text-shadow":
                                              "0px 0px 20px rgba(43, 246, 124, 0.56), 0px 2px 2px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          Winner
                                        </div>
                                        <div class="flex gap-2 items-center justify-center">
                                          <Coin width="11" />{" "}
                                          <span
                                            class={`text-gradient font-SpaceGrotesk text-28 font-bold transition-all duration-1000
                                               ${
                                                 game().status === "ended"
                                                   ? "scale-100"
                                                   : "scale-50"
                                               }`}
                                          >
                                            {
                                              <WinningsDisplay
                                                value={
                                                  game().winners.find(
                                                    (winner) =>
                                                      winner.player_index ===
                                                      playerIndex + 1
                                                  ).winnerValue
                                                }
                                              />
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div class="w-full h-full center flex-col z-10 relative">
                                        <div
                                          class="absolute w-[64px] h-[50px] z-0 "
                                          style={{
                                            background: "rgba(185, 0, 0, 0.6)",
                                            filter: "blur(50px)",
                                            "border-radius": "100px",
                                          }}
                                        />
                                        <div class="flex gap-2 opacity-20 grayscale">
                                          <Coin width="11" />{" "}
                                          <span class="text-gradient font-SpaceGrotesk text-28 font-bold">
                                            <LosingDisplay game={game} />
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </For>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class={`grid rounded-8 border border-black border-opacity-5 relative z-10 grid-cols-${
                    game().playersQty
                  }`}
                  style={{
                    background: `radial-gradient(25% 50% at 50% 0%, rgba(${getModeColorRgb()}, ${
                      game().status === "ended" ? 0 : "0.07"
                    }) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`,
                  }}
                >
                  <For each={Array.from(Array(game().playersQty).keys())}>
                    {(playerIndex, index) => (
                      <div
                        class={`center relative llg:h-20 ${
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
                        style={{
                          background: `${getGradientForWinners(
                            game().playersQty,
                            game().winners,
                            playerIndex
                          )}`,
                        }}
                      >
                        {game().players[playerIndex + 1] ? (
                          <div class="center p-2">
                            <div class="py-3 pl-2 pr-6 flex flex-wrap gap-2 center">
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
                              <div class="space-y-2 mt-1 w-fit">
                                <div
                                  class="flex flex-wrap center  gap-2 text-sm font-bold h-wit max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded"
                                  style={{
                                    background:
                                      "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                                    "box-shadow":
                                      "0px 2px 2px rgba(0, 0, 0, 0.12)",
                                  }}
                                >
                                  <Ranks
                                    width={5}
                                    staff={
                                      game().players[playerIndex + 1]?.avatar
                                        ? game().players[playerIndex + 1]
                                            .rank || 0
                                        : 7
                                    }
                                    rank={
                                      game().players[playerIndex + 1].level
                                        ?.league || "bronze"
                                    }
                                  />
                                  <RankLabel
                                    staff={
                                      game().players[playerIndex + 1]?.avatar
                                        ? game().players[playerIndex + 1]
                                            .rank || 0
                                        : 7
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
                <div class="border border-black border-opacity-5 rounded-8 -mt-12 flex bg-dark-secondary border-r-0 ">
                  <For each={Array.from(Array(game().playersQty).keys())}>
                    {(playerIndex) => (
                      <>
                        <div class="flex w-full px-5 py-10 ">
                          {game().players[playerIndex + 1] && (
                            <div class="flex gap-2 flex-wrap mx-auto">
                              <For
                                each={Array.from(
                                  Array(game().cases.length).keys()
                                )}
                              >
                                {(round) => (
                                  <>
                                    {winnings()[playerIndex + 1] &&
                                    winnings()[playerIndex + 1][
                                      `round_${round}`
                                    ] ? (
                                      <div class="w-30 h-30 center">
                                        <ItemCardSmall
                                          drop={
                                            winnings()[playerIndex + 1][
                                              `round_${round}`
                                            ]
                                          }
                                          _case={game().cases[round]}
                                          optimiseOff
                                        />
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
