import {NavLink} from "solid-app-router";
import {
  createSignal,
  For,
  createEffect,
  onCleanup,
  createMemo,
  Switch,
  Match,
} from "solid-js";
import {URL} from "../../libraries/url";
import injector from "../../injector/injector";

import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png";
import Coin from "../../utilities/Coin";
import {setSpinReelsTrigger} from "../../components/cases/store";
import {spinnerTimings} from "../../libraries/caseSpinConfig";
import SpinnerImage from "../../assets/img/unbox/spinner.png";

import {useDebounce} from "../../utilities/hooks/debounce";

import SpinnersContainerHorizontal from "../../components/cases/horizontal/SpinnersContainerHorizontal";
import SpinnersContainerVertical from "../../components/cases/vertical/SpinnersContainerVertical";
import SpinnersContainerBlank from "../../components/cases/SpinnersContainerBlank";
import PotentialDropItem from "../case/PotentialDropItem";
import ArrowBack from "../../components/icons/ArrowBack";
import TransparentButton from "../../components/elements/TransparentButton";
import CaseGradientButton from "../../components/elements/CaseGradientButton";
import LightningIcon from "../../components/icons/LightningIcon";
import GrayGradientButton from "../../components/elements/GrayGradientButton";
import FairnessShieldIcon from "../../components/icons/cases/FairnessShield";
import HistoryDrops from "../case/HistoryDrops";
import {
  calculateRemainingTime,
  getAvailableCases,
  getIndexRank,
  getNotAvailableCases,
} from "../../utilities/rewards-tools";
import {convertRomanToNormal} from "../../utilities/Numbers";
import {BASE_RANKS} from "../../libraries/constants";
import DiscordIcon from "../../components/icons/DiscordIcon";
import {
  playPullBackSound,
  playWinSound,
} from "../../utilities/Sounds/SoundButtonClick";
import clickSeq from "../../assets/sounds/clickSeq.mp3";
import {onMount} from "solid-js";
import SpinnersContainerVerticalMobile from "../../components/cases/verticalMobile/SpinnersContainerVerticalMobile";
import {FaSolidCropSimple} from "solid-icons/fa";

import bglogo_gold from "../../assets/img/case-battles/bglogo_gold.png";
import bglogo_blue from "../../assets/img/case-battles/bglogo_blue.png";
import bglogo_red from "../../assets/img/case-battles/bglogo_red.png";
import bglogo_purple from "../../assets/img/case-battles/bglogo_purple.png";
import bglogo_gray from "../../assets/img/case-battles/bglogo_gray.png";

import CaseLineYellow from "../../assets/img/case-battles/caseLineHorizontal.svg";
import CaseLineMobile from "../../assets/img/case/caselinemobile.svg";
import CaseLineMobileRight from "../../assets/img/case/caselinemobileright.svg";

export const [isFastAnimation, setIsFastAnimation] = createSignal(false);
export const [isRolling, setIsRolling] = createSignal(false);

export const clickingSound = new Audio(clickSeq);

const CaseUnboxing = (props) => {
  const {socket, toastr, userObject, rewardCases, setRewardCases} = injector;

  const [rollCase, setRollCase] = createSignal();
  const [rollItems, setRollItems] = createSignal([]);
  const [isCaseCanBeOpen, setIsCaseCanBeOpen] = createSignal(true);
  const [isCaseAlreadyOpened, setIsCaseAlreadyOpened] = createSignal(false);
  const [caseStatistic, setCaseStatistic] = createSignal();
  const [countOfCases, setCountOfCases] = createSignal(1);
  const [pendingNum, setPendingNum] = createSignal(1);
  const [spinnerOptions, setSpinnerOptions] = createSignal([]);
  const [fairnessHash, setFairnessHash] = createSignal([]);
  const [remainingTimeToOpenCase, setRemainingTimeToOpenCase] =
    createSignal("");
  const [beginPullBackSound, setBeginPullBackSound] = createSignal(false);
  const [beginWinSound, setBeginWinSound] = createSignal(false);
  const [beginClickSound, setBeginClickSound] = createSignal(false);
  const [containsConfettiWin, setContainsConfettiWin] = createSignal(false);

  const [innerWidth, setInnerWidth] = createSignal(window.innerWidth);

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

  const bglogos = {
    gold: bglogo_gold,
    blue: bglogo_blue,
    red: bglogo_red,
    purple: bglogo_purple,
    gray: bglogo_gray,
  };

  const itemsUpdate = (data) => {
    if (data.data?.case) {
      const myCase = {
        ...data.data.case,
        image: data.data.case.image?.replace("{url}", window.origin) || "",
      };
      myCase.items = myCase.items.map((item) => ({
        ...item,
        price: item.item_price,
        chance: myCase.name === "Daily Free Case" ? 1 : item.chance,
        image: item.image?.replace("{url}", window.origin) || "",
        isConfetti: item.isConfetti,
      }));
      setRollCase(() => myCase);
      preLoadImages();
      setCaseStatistic(() => ({
        recentDrops:
          data?.data?.case?.recentDrops.map((item) => ({
            ...item,
            price: item.item_price,
            item: item.name,
          })) || [],
        bestValue:
          data?.data?.case && Object.keys(data?.data?.case?.bestDrop) > 0
            ? {
                ...data?.data?.case?.bestDrop,
                price: data?.data?.case?.bestDrop.item_price,
                item: data?.data?.case?.bestDrop.name,
              }
            : undefined,
      }));

      setRollItems(() =>
        myCase.items.map((item) => ({
          img: item.image,
          price: item.item_price,
          name: item.name,
          rarity: getColor(item.item_price),
          isConfetti: item.isConfetti,
          chance: item.chance,
        }))
      );
    }
  };

  const timerId = setInterval(() => {
    if (
      (rewardCases.lastDailyCaseOpening || rewardCases.lastFreeCaseOpening) &&
      rollCase()
    ) {
      setRemainingTimeToOpenCase(
        calculateRemainingTime(
          rollCase().name === "Daily Free Case"
            ? rewardCases.lastFreeCaseOpening
            : rewardCases.lastDailyCaseOpening
        )
      );
    }
  }, 1000);

  createEffect(() => {
    if (
      (rewardCases.lastDailyCaseOpening || rewardCases.lastFreeCaseOpening) &&
      rollCase()
    ) {
      setRemainingTimeToOpenCase(
        calculateRemainingTime(
          rollCase().name === "Daily Free Case"
            ? rewardCases.lastFreeCaseOpening
            : rewardCases.lastDailyCaseOpening
        )
      );
    }
  });

  createEffect(() => {
    if (props?.loaded()) {
      if (!props.searchParams.daily) {
        socket.emit(
          "case:get",
          {caseId: Number(props.searchParams.id)},
          (data) => {
            itemsUpdate(data);
          }
        );
      } else {
        socket.emit(
          "rewards:case",
          {caseId: Number(props.searchParams.id)},
          (data) => {
            itemsUpdate(data);
          }
        );
      }
    }
  });

  createEffect(() => {
    if (rollCase()) {
      socket.on(`cases:recentdrop:${Number(rollCase().id)}`, (data) => {
        setCaseStatistic((prev) => {
          const arr = {...prev};
          arr.recentDrops.unshift({
            ...data,
            price: data.item_price,
            item: data.name,
          });
          if (arr.length > 10) {
            arr.recentDrops.pop();
          }
          if (
            !arr.bestValue ||
            Object.keys(arr.bestValue).length === 0 ||
            (arr.bestValue.price ?? 0) < data.item_price
          ) {
            arr.bestValue = {
              ...data,
              price: data.item_price,
              item: data.name,
            };
          }
          return arr;
        });
      });
    }
  });

  onCleanup(() => {
    if (rollCase()) {
      socket.off(`cases:recentdrop:${Number(rollCase().id)}`);
    }
    clearInterval(timerId);
  });

  const handleNumSpinnersClick = (num) => {
    setIsCaseAlreadyOpened(false);
    setCountOfCases(0);
    setPendingNum(num);
    setSpinReelsTrigger({triggered: false});
    setIsRolling(false);
  };

  const rollCases = (data) => {
    if (data.msg) {
      toastr(data);
    }
    if (data.error) return;
    setSpinnerOptions(() =>
      data.cases.map((caseItem) => ({
        winningItem: {
          img: caseItem.item.image?.replace("{url}", window.origin) || "",
          price: caseItem.item.item_price,
          name: caseItem.item.name,
          rarity: getColor(caseItem.item.item_price),
          isConfetti: caseItem.item.isConfetti,
        },
        isConfettiWin: caseItem.item.isConfetti,
        isBigWin: true,
      }))
    );

    setContainsConfettiWin(false);
    // check if any spinner has a confetti item
    setContainsConfettiWin(
      spinnerOptions().some((spinner) => spinner.isConfettiWin)
    );

    setFairnessHash(() => data.cases.map((caseItem) => caseItem.hash));
    setIsCaseAlreadyOpened(() => true);
    setCountOfCases(pendingNum());
    setSpinReelsTrigger({triggered: true});
    setIsRolling(true);
  };
  const [buttonDisabled, setButtonDisabled] = createSignal(false);
  const startGame = (isDemo) => {
    if (buttonDisabled()) return;
    setButtonDisabled(true);
    if (isCaseCanBeOpen() && !isRolling()) {
      let durationInSeconds = spinnerTimings.verticalInitialSpin + 3; // For example, a 2-second duration
      if (isFastAnimation()) {
        durationInSeconds =
          durationInSeconds * spinnerTimings.fastSpinMultiplier;
      }

      if (!props.searchParams.daily) {
        socket.emit(
          "case:open",
          {
            caseId: Number(rollCase().id),
            demo: isDemo,
            qty: pendingNum(),
            spinTime: durationInSeconds * 1000,
          },
          (data) => {
            if (!data.error) {
              rollCases(data);
              setButtonDisabled(false);
            } else {
              toastr(data);
            }
          }
        );
      } else {
        socket.emit(
          "rewards:case:open",
          {
            caseId: Number(rollCase().id),
            demo: isDemo,
            spinTime: durationInSeconds * 1000,
          },
          (data) => {
            if (!data.error) {
              rollCases({cases: [data]});
              if (!isDemo) {
                setTimeout(() => {
                  if (rollCase().name === "Daily Free Case") {
                    setRewardCases(
                      "lastFreeCaseOpening",
                      new Date().toISOString()
                    );
                  } else {
                    setRewardCases(
                      "lastDailyCaseOpening",
                      new Date().toISOString()
                    );
                  }
                }, durationInSeconds * 1000);
              }
            } else {
              toastr(data);
            }
          }
        );
      }
    }
  };

  const userRankIndex = createMemo(() =>
    getIndexRank(userObject?.user?.level?.league, BASE_RANKS)
  );

  const notAvailableCases = createMemo(() =>
    getNotAvailableCases(userRankIndex(), BASE_RANKS).map((caseName) =>
      convertRomanToNormal(caseName)
    )
  );
  const availableCases = createMemo(() =>
    getAvailableCases(userRankIndex(), BASE_RANKS).map((caseName) =>
      convertRomanToNormal(caseName)
    )
  );

  createEffect(() => {
    if (beginClickSound()) {
      setBeginClickSound(false);
      if (userObject?.user?.sounds) {
        clickingSound.currentTime = 0;
        clickingSound.volume = userObject.user.sounds;

        // Calculate playbackRate
        let originalDuration = clickingSound.duration;
        if (countOfCases() === 1) {
          if (isFastAnimation()) {
            clickingSound.playbackRate = originalDuration / 4;
          } else {
            clickingSound.playbackRate = originalDuration / 10;
          }
        } else {
          if (isFastAnimation()) {
            clickingSound.playbackRate = originalDuration / 4;
          } else {
            clickingSound.playbackRate = originalDuration / 5;
          }
        }

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

  const handleChangeInnerWidth = () => {
    setInnerWidth(window.innerWidth);
  };

  onMount(() => {
    window.addEventListener(
      "resize",
      useDebounce(handleChangeInnerWidth, 1000)
    );
  });

  onCleanup(() => {
    window.removeEventListener(
      "resize",
      useDebounce(handleChangeInnerWidth, 1000)
    );
  });

  const preLoadImages = () => {
    const items = rollCase().items;

    const bgLogoColors = new Set();

    // loop through each case, and each case items and pre load the images
    items.forEach((i) => {
      bgLogoColors.add(getColor(i.item_price));
    });

    // pre load image backgrounds
    bgLogoColors.forEach((rarity) => {
      const img = new Image();
      img.src = bglogos[rarity];
    });

    const img = new Image();
    img.src = CaseLineYellow;
    const img2 = new Image();
    img2.src = CaseLineMobile;
    const img3 = new Image();
    img3.src = CaseLineMobileRight;
  };

  return (
    <>
      {rollCase() && (
        <div class="w-full h-full flex flex-col gap-8 relative min-h-screen pt-4 lg:pt-8">
          <div class="lg:px-4 xl:px-8 xxl:px-14 flex flex-col gap-6 lg:gap-8">
            <div class="flex justify-between flex-col lg:flex-row">
              <NavLink
                href={!props.searchParams.daily ? URL.UNBOXING : URL.REWARDS}
              >
                <div class="flex gap-2 items-center p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max">
                  <ArrowBack />
                  <span class="font-SpaceGrotesk text-14 text-gray-9a">
                    Return to Cases
                  </span>
                </div>
              </NavLink>
              <div class="mt-[14px] lg:mt-0 flex flex-col lg:items-end font-SpaceGrotesk text-11 text-gray-9a">
                <For each={fairnessHash()}>
                  {(hash) => <p class="break-all">Server Seed Hash: {hash}</p>}
                </For>
                <p>Client Seed: {userObject.user.client_seed}</p>
              </div>
            </div>
            <div
              class={`lg:rounded-4 relative -left-4 lg:left-0 w-[calc(100%+32px)] lg:w-full overflow-hidden ${
                !userObject.authenticated ||
                (fairnessHash().length <= 0 &&
                  props.searchParams.daily &&
                  (notAvailableCases().includes(
                    convertRomanToNormal(rollCase().name)
                  ) ||
                    (rollCase().name !== "Daily Free Case" &&
                      rewardCases.lastDailyCaseOpening) ||
                    (rollCase().name === "Daily Free Case" &&
                      (rewardCases.lastFreeCaseOpening ||
                        !rewardCases.isUserOnServer)) ||
                    notAvailableCases()[0] ===
                      convertRomanToNormal(rollCase().name)))
                  ? "mix-blend-luminosity"
                  : "mix-blend-normal"
              }`}
              classList={{
                "case-opening-wrapper": pendingNum() === 1,
                "case-opening-wrapper-horizontal-yellow horisontal-borders":
                  pendingNum() !== 1 && innerWidth() >= 600,
              }}
            >
              <div
                class="w-full relative"
                style={{
                  "background-image": `url('${
                    innerWidth() >= 600 && footerLogoBgVector
                  }')`,
                }}
              >
                {!isCaseAlreadyOpened() && (
                  <div
                    class="md:absolute left-0 top-0 w-full h-full md:center lg:rounded-4"
                    classList={{
                      "case-opening-placeholder--background center absolute":
                        pendingNum() === 1 || innerWidth() >= 600,
                      "grid grid-cols-2 gap-y-4":
                        pendingNum() > 1 && innerWidth() < 600,
                    }}
                  >
                    <For each={Array.from({length: pendingNum()})}>
                      {(_, index) => (
                        <div
                          class="relative w-full md:center"
                          classList={{
                            center: pendingNum() === 1 || innerWidth() >= 600,
                            "relative h-[264px] center":
                              pendingNum() > 1 && innerWidth() < 600,
                            "horisontal-borders rounded-8 case-opening-placeholder--background__odd":
                              pendingNum() > 1 &&
                              innerWidth() < 600 &&
                              pendingNum() === 3 &&
                              index() === 2,
                            "horisontal-borders-left-odd case-opening-placeholder--background__odd rounded-tl-8 rounded-bl-8":
                              pendingNum() > 1 &&
                              innerWidth() < 600 &&
                              !(index() % 2) &&
                              !(pendingNum() === 3 && index() === 2),
                            "horisontal-borders-right-even case-opening-placeholder--background__even rounded-tr-8 rounded-br-8":
                              pendingNum() > 1 &&
                              innerWidth() < 600 &&
                              (index() % 2 ||
                                (!(pendingNum() % 2 === 0) && index() !== 0)) &&
                              !(pendingNum() === 3 && index() === 2),
                          }}
                        >
                          {innerWidth() < 600 && (
                            <>
                              <Switch>
                                <Match
                                  when={
                                    (pendingNum() % 2 === 0 &&
                                      !(index() % 2)) ||
                                    (pendingNum() === 3 && index() === 0)
                                  }
                                >
                                  <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
                                </Match>
                                <Match
                                  when={
                                    (pendingNum() % 2 === 0 && index() % 2) ||
                                    (pendingNum() === 3 && index() % 2)
                                  }
                                >
                                  <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
                                </Match>
                                <Match
                                  when={pendingNum() === 3 && index() === 2}
                                >
                                  <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
                                  <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
                                </Match>
                              </Switch>
                              <Switch>
                                <Match
                                  when={
                                    (pendingNum() % 2 === 0 &&
                                      !(index() % 2)) ||
                                    (pendingNum() === 3 &&
                                      (index() === 0 || index() === 2))
                                  }
                                >
                                  <img
                                    src="assets/caselinemobile.svg"
                                    alt="caseline"
                                    class={`absolute w-full left-3 transition-all duration-500 
                             
                            `}
                                  />
                                </Match>
                                <Match
                                  when={
                                    (pendingNum() % 2 === 0 && index() % 2) ||
                                    (pendingNum() === 3 && index() % 2)
                                  }
                                >
                                  <img
                                    src="assets/caselinemobileright.svg"
                                    alt="caseline"
                                    class={`right-3 absolute w-full  transition-all duration-500 
                            `}
                                  />
                                </Match>
                              </Switch>
                            </>
                          )}
                          <img
                            alt="case-image"
                            class="md:w-10/12 w-[181px] md:max-w-[427px] max-w-[181px] no-select relative z-10"
                            src={rollCase().image || ""}
                          />
                        </div>
                      )}
                    </For>
                  </div>
                )}
                {countOfCases() === 1 ? (
                  <SpinnersContainerHorizontal
                    numSpinners={countOfCases}
                    caseItemList={rollItems}
                    spinnerOptions={spinnerOptions}
                    setBeginClickSound={setBeginClickSound}
                    setBeginPullBackSound={setBeginPullBackSound}
                    setBeginWinSound={setBeginWinSound}
                  />
                ) : countOfCases() > 0 && countOfCases() < 5 ? (
                  <Switch>
                    <Match when={innerWidth() >= 600}>
                      <SpinnersContainerVertical
                        numSpinners={countOfCases}
                        caseItemList={rollItems}
                        spinnerOptions={spinnerOptions}
                        setBeginClickSound={setBeginClickSound}
                        setBeginPullBackSound={setBeginPullBackSound}
                        setBeginWinSound={setBeginWinSound}
                      />
                    </Match>
                    <Match when={innerWidth() < 600}>
                      <SpinnersContainerVerticalMobile
                        numSpinners={countOfCases}
                        caseItemList={rollItems}
                        spinnerOptions={spinnerOptions}
                        setBeginClickSound={setBeginClickSound}
                        setBeginPullBackSound={setBeginPullBackSound}
                        setBeginWinSound={setBeginWinSound}
                      />
                    </Match>
                  </Switch>
                ) : (
                  <Switch>
                    <Match when={innerWidth() >= 600 || pendingNum() === 1}>
                      <SpinnersContainerBlank pendingNum={pendingNum} />
                    </Match>
                  </Switch>
                )}
              </div>
            </div>

            <div
              class="relative min-h-[80px] flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-0 py-4 lg:py-0 px-4 lg:px-6 xl:px-8 rounded-8 border border-black border-opacity-5 "
              style={{
                background:
                  "radial-gradient(33.44% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              }}
            >
              <div class="flex flex-col gap-0.5 lg:gap-1 lg:mr-2">
                <div class="text-white font-SpaceGrotesk font-bold text-20 lg:text-19">
                  {rollCase().name}
                </div>
                <div class="flex gap-[9px] lg:gap-1.5 items-center">
                  <Coin width="5" />
                  <span class="font-bold text-md potential-drop--price">
                    {!props.searchParams.daily
                      ? (
                          Number(rollCase().price) * pendingNum()
                        ).toLocaleString()
                      : "FREE"}
                  </span>
                </div>
              </div>
              <div
                class={`${
                  isRolling() ? "opacity-[.03]" : "opacity-100"
                } h-full w-full lg:w-fit lg:center flex flex-col xxl:flex-row gap-[20px] lg:gap-2 xxl:gap-1 lg:py-2 xxl:py-0 lg:bg-white lg:bg-opacity-[0.01] lg:border border-white border-opacity-5`}
              >
                {!props.searchParams.daily ? (
                  <div class="gap-4 lg:px-8 flex items-center lg:justify-center h-full">
                    <div class=" font-SpaceGrotesk text-14 text-gray-9a break-words">
                      Case Amount:
                    </div>
                    <div
                      class={`gap-2 lg:gap-1 center ${
                        isRolling() && "pointer-events-none"
                      }`}
                    >
                      <For each={[1, 2, 3, 4]}>
                        {(row) => (
                          <TransparentButton
                            isActive={pendingNum() === row}
                            callbackFn={() => handleNumSpinnersClick(row)}
                            style={{
                              padding: "0px",
                              width: "40px",
                              height: "40px",
                            }}
                          >
                            {row}
                          </TransparentButton>
                        )}
                      </For>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div class="relative">
                  <div
                    class={`flex lg:justify-center gap-2 w-full lg:px-6 ${
                      !userObject.authenticated ||
                      (props.searchParams.daily &&
                        (notAvailableCases().includes(
                          convertRomanToNormal(rollCase().name)
                        ) ||
                          (rollCase().name !== "Daily Free Case" &&
                            rewardCases.lastDailyCaseOpening) ||
                          (rollCase().name === "Daily Free Case" &&
                            (rewardCases.lastFreeCaseOpening ||
                              !rewardCases.isUserOnServer)) ||
                          notAvailableCases()[0] ===
                            convertRomanToNormal(rollCase().name)))
                        ? "mix-blend-luminosity"
                        : "mix-blend-normal"
                    }`}
                  >
                    {props.searchParams.daily && (
                      <button
                        class={`group bg--gold border--gold w-[194px] h-10 rounded-4 flex items-center justify-center gap-[10px] transition-colors ${
                          isRolling() && "pointer-events-none"
                        }`}
                        onClick={() => startGame(false)}
                      >
                        {rollCase().name === "Daily Free Case" && (
                          <DiscordIcon />
                        )}
                        <span
                          class={`text-14 font-SpaceGrotesk font-bold text-yellow-ffb text-shadow-gold-secondary `}
                        >
                          {(availableCases().includes(
                            convertRomanToNormal(rollCase().name)
                          ) ||
                            rollCase().name === "Daily Free Case") &&
                            !(rollCase().name === "Daily Free Case"
                              ? rewardCases.lastFreeCaseOpening
                              : rewardCases.lastDailyCaseOpening) && (
                              <span class="flex items-center gap-[7.34px]">
                                Open for <Coin width="5" />
                                <span class="text-gradient">FREE</span>
                              </span>
                            )}
                          {(userObject.authenticated
                            ? notAvailableCases()
                                .slice(1)
                                .includes(convertRomanToNormal(rollCase().name))
                            : notAvailableCases().includes(
                                convertRomanToNormal(rollCase().name)
                              )) && "Locked"}
                          {((rollCase().name === "Daily Free Case" &&
                            rewardCases.lastFreeCaseOpening) ||
                            (rewardCases.lastDailyCaseOpening &&
                              availableCases().includes(
                                convertRomanToNormal(rollCase().name)
                              ))) && (
                            <span class="normal-case text-14 font-bold font-SpaceGrotesk text-gray-9a text-shadow-gold-secondary">
                              Open in {remainingTimeToOpenCase()}
                            </span>
                          )}
                        </span>
                      </button>
                    )}
                    {!props.searchParams.daily && (
                      <div
                        class={`w-full ${isRolling() && "pointer-events-none"}`}
                      >
                        <CaseGradientButton
                          isFullWidth
                          callbackFn={() => startGame(false)}
                        >
                          <div
                            class={`flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center `}
                          >
                            <span class="w-max">Open for</span>
                            <Coin width="5" />
                            <span class="text-gradient">
                              {(
                                Number(rollCase().price) * pendingNum()
                              ).toLocaleString()}
                            </span>
                          </div>
                        </CaseGradientButton>
                      </div>
                    )}
                    <div
                      class={`w-full ${isRolling() && "pointer-events-none"}`}
                    >
                      <GrayGradientButton
                        isFullWidth
                        callbackFn={() => startGame(true)}
                      >
                        <span
                          class={`text-14 font-bold font-SpaceGrotesk text-gray-9a w-max`}
                        >
                          Demo Spin
                        </span>
                      </GrayGradientButton>
                    </div>
                  </div>
                  {props.searchParams.daily &&
                    userObject.authenticated &&
                    notAvailableCases()[0] ===
                      convertRomanToNormal(rollCase().name) && (
                      <span class="absolute bottom-0.5 left-[130px] transform -translate-x-1/2 -translate-y-1/2 lowercase reward-card--available font-bold font-SpaceGrotesk text-12">
                        {(
                          (userObject.user?.wagered -
                            userObject.user?.level?.from * 1000) /
                            (userObject.user?.level?.to * 10) || 99
                        ).toFixed(2)}
                        % till unlock
                      </span>
                    )}
                </div>
              </div>
              <div class="my-2 w-full h-[1px] bg-black bg-opacity-[.16] lg:hidden" />
              <div
                class={`flex ssm:flex-wrap lg:justify-end gap-3 lg:py-2 pl-2 text-14 font-SpaceGrotesk text-gray-9a`}
              >
                <div
                  class={`h-11 center drop-shadow-sm rounded-4 group border-opacity-20 hover:border-opacity-20 border cursor-pointer px-2 flex items-center gap-3 shrink-0
                        ${
                          !isFastAnimation()
                            ? "border-gray-9a hover:border-white text-blue-9b hover:text-white"
                            : "border-yellow-ffb text-yellow-ffb"
                        }
                        ${isRolling() && "pointer-events-none"}
                      `}
                  onClick={() => setIsFastAnimation((prev) => !prev)}
                >
                  <div
                    class={`w-6 h-6 border-opacity-20 hover:border-opacity-20 border rounded-4 center 
                         ${
                           !isFastAnimation()
                             ? "border-gray-9a hover:border-white"
                             : "border-yellow-ffb"
                         }
                      `}
                  >
                    {isFastAnimation() && <LightningIcon />}
                  </div>
                  <span
                    class={`shrink-0 ${
                      isFastAnimation() ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    Fast Open
                  </span>
                </div>
                {/* <div class="h-11 rounded-4 flex items-center px-3 border border-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
                  <FairnessShieldIcon />
                  <span>Fairness</span>
                </div> */}
              </div>
              {isRolling() && (
                <div
                  class={`absolute left-1/2 -translate-x-1/2 top-28 lg:top-auto ${
                    isRolling() && "pointer-events-none"
                  }`}
                >
                  <div class="relative flex items-center justify-center gap-2">
                    <img class="animate-reverse-spin" src={SpinnerImage} />
                    <div
                      class=" font-SpaceGrotesk text-14 font-medium text-yellow-ffb capitalize"
                      style={{
                        "text-shadow": "0px 0px 16px rgba(255, 180, 54, 0.36)",
                      }}
                    >
                      Opening...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="flex flex-col gap-8 lg:gap-4 grow lg:px-4 xl:px-8 xxl:px-14 lg:pt-5">
            <div class="w-full flex flex-col gap-4">
              <div class="w-full">
                <p class="text-yellow-ffb font-medium text-base capitalize font-SpaceGrotesk">
                  You can unbox:
                </p>
              </div>
              <div class="w-full grid grid-cols-2 lg:grid-cols-potential-drop--item gap-4 lg:gap-3">
                <For
                  each={
                    rollCase()?.items.sort((a, b) => b.price - a.price) || []
                  }
                >
                  {(item) => <PotentialDropItem mobileTellCard skin={item} isDropChanceShown={rollCase().name !== "Daily Free Case"} />}
                </For>
              </div>
            </div>
            <HistoryDrops data={caseStatistic ?? []} _case={rollCase} />
          </div>
        </div>
      )}
    </>
  );
};

export default CaseUnboxing;
