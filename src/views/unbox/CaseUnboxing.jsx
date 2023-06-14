import { NavLink } from "solid-app-router";
import { createSignal, For, createEffect, onCleanup } from "solid-js";
import { URL } from "../../libraries/url";
import injector from "../../injector/injector";

import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png";
import Coin from "../../utilities/Coin";
import { setSpinReelsTrigger } from "../../components/cases/store";
import { spinnerTimings } from "../../libraries/caseSpinConfig";
import SpinnerImage from "../../assets/img/unbox/spinner.png";

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

export const [isFastAnimation, setIsFastAnimation] = createSignal(false);
export const [isRolling, setIsRolling] = createSignal(false);

const CaseUnboxing = (props) => {
  const { socket, toastr, userObject } = injector;

  const [rollCase, setRollCase] = createSignal();
  const [rollItems, setRollItems] = createSignal([]);
  const [isCaseCanBeOpen, setIsCaseCanBeOpen] = createSignal(true);
  const [isCaseAlreadyOpened, setIsCaseAlreadyOpened] = createSignal(false);
  const [caseStatistic, setCaseStatistic] = createSignal();
  const [countOfCases, setCountOfCases] = createSignal(1);
  const [pendingNum, setPendingNum] = createSignal(1);
  const [spinnerOptions, setSpinnerOptions] = createSignal([]);
  const [fairnessHash, setFairnessHash] = createSignal([]);

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
  const itemsUpdate = () => {
    socket.emit(
      "case:get",
      { caseId: Number(props.searchParams.id) },
      (data) => {
        console.log(data.data);
        if (data.data?.case) {
          const myCase = {
            ...data.data.case,
            image: data.data.case.image?.replace("{url}", window.origin) || "",
          };
          myCase.items = myCase.items.map((item) => ({
            ...item,
            price: item.item_price,
            image: item.image?.replace("{url}", window.origin) || "",
          }));
          console.log(myCase, "myCase");
          setRollCase(() => myCase);
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
            }))
          );
        }
      }
    );
  };

  createEffect(() => {
    if (props?.loaded()) {
      itemsUpdate();
    }
  });

  createEffect(() => {
    if (rollCase()) {
      socket.on(`cases:recentdrop:${Number(rollCase().id)}`, (data) => {
        console.log(data);
        setCaseStatistic((prev) => {
          const arr = { ...prev };
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
  });

  const handleNumSpinnersClick = (num) => {
    setIsCaseAlreadyOpened(false);
    setCountOfCases(0);
    setPendingNum(num);
    setSpinReelsTrigger({ triggered: false });
    setIsRolling(false);
  };

  const startGame = (isDemo) => {
    if (isCaseCanBeOpen() && !isRolling()) {
      let durationInSeconds = spinnerTimings.verticalInitialSpin + 3; // For example, a 2-second duration
      if (isFastAnimation()) {
        durationInSeconds =
          durationInSeconds * spinnerTimings.fastSpinMultiplier;
      }
      console.log("durationInSeconds", durationInSeconds);
      socket.emit(
        "case:open",
        {
          caseId: Number(props.searchParams.id),
          demo: isDemo,
          qty: pendingNum(),
          spinTime: durationInSeconds * 1000,
        },
        (data) => {
          console.log(data);
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
              },
              isConfettiWin: true,
              isBigWin: true,
            }))
          );
          setFairnessHash(() => data.cases.map((caseItem) => caseItem.hash));
          console.log(spinnerOptions());
          setIsCaseAlreadyOpened(() => true);
          setCountOfCases(pendingNum());
          setSpinReelsTrigger({ triggered: true });
          setIsRolling(true);
        }
      );
    }
  };

  return (
    <>
      {rollCase() && (
        <div class="w-full h-full flex flex-col gap-8 overflow-y-scroll relative min-h-screen pt-8">
          <div class="px-4 xl:px-8 xxl:px-14 flex flex-col gap-8">
            <div class="flex justify-between flex-col md:flex-row">
              <NavLink href={URL.UNBOXING}>
                <div class="flex gap-2 items-center p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max">
                  <ArrowBack />
                  <span class="font-SpaceGrotesk text-14 text-gray-9a">
                    Return to Cases
                  </span>
                </div>
              </NavLink>
              <div class="flex flex-col items-end font-SpaceGrotesk text-11 text-gray-9a">
                <For each={fairnessHash()}>
                  {(hash) => <p>Server Seed Hash: {hash}</p>}
                </For>
                <p>Client Seed: {userObject.user.client_seed}</p>
              </div>
            </div>
            <div
              class={`rounded-4 relative ${
                pendingNum() === 1
                  ? "case-opening-wrapper"
                  : "case-opening-wrapper-horizontal-yellow horisontal-borders"
              } overflow-hidden`}
            >
              <div
                class="w-full relative"
                style={{ "background-image": `url('${footerLogoBgVector}')` }}
              >
                {!isCaseAlreadyOpened() && (
                  <div
                    class="absolute left-0 top-0 w-full h-full center rounded-4 z-50"
                    style={{
                      background:
                        "radial-gradient(35.44% 82.64% at 2.04% -32.64%, rgba(255, 180, 54, 0.16) 14.79%, rgba(255, 180, 54, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(0, 0, 0, 0.24)",
                      "backdrop-filter": "blur(6px)",
                    }}
                  >
                    <For each={Array.from({ length: pendingNum() })}>
                      {(_) => (
                        <div class="w-full center">
                          <img
                            alt="case-image"
                            class="w-10/12 max-w-[427px] no-select relative z-10"
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
                  />
                ) : countOfCases() > 0 && countOfCases() < 5 ? (
                  <SpinnersContainerVertical
                    numSpinners={countOfCases}
                    caseItemList={rollItems}
                    spinnerOptions={spinnerOptions}
                  />
                ) : (
                  <SpinnersContainerBlank pendingNum={pendingNum} />
                )}
              </div>
            </div>

            <div
              class="relative min-h-[80px] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 px-2 sm:px-6 xl:px-8 rounded-8 border border-black border-opacity-5 "
              style={{
                background:
                  "radial-gradient(33.44% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              }}
            >
              <div class="flex flex-col items-center md:items-start md:justify-start gap-1 mr-2">
                <div class="text-white font-SpaceGrotesk font-bold text-19">
                  {rollCase().name}
                </div>
                <div class="flex gap-1.5 items-center">
                  <Coin width="5" />
                  <span class="font-bold text-md potential-drop--price">
                    {(Number(rollCase().price) * pendingNum()).toLocaleString()}
                  </span>
                </div>
              </div>
              <div
                class={`${
                  isRolling() ? "opacity-[.03]" : "opacity-100"
                } h-full w-full md:w-fit center flex flex-col xxl:flex-row gap-2 xxl:gap-1 py-2 xxl:py-0 bg-white bg-opacity-[0.01]  border border-white border-opacity-5`}
              >
                <div class=" gap-4 px-8 center h-full border-r border-black border-opacity-[0.16] scale-[0.8] ssm:scale-100">
                  <div class=" font-SpaceGrotesk text-14 text-gray-9a ">
                    Case Amount:
                  </div>
                  <div class="gap-1 center">
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
                <div class="flex justify-center gap-2 w-full px-6 scale-[0.8] ssm:scale-100">
                  <CaseGradientButton callbackFn={() => startGame(false)}>
                    <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                      <span class="w-max">Open for</span>
                      <Coin width="5" />
                      <span class="text-gradient">
                        {(
                          Number(rollCase().price) * pendingNum()
                        ).toLocaleString()}
                      </span>
                    </div>
                  </CaseGradientButton>
                  <GrayGradientButton callbackFn={() => startGame(true)}>
                    <span
                      class={`text-14 font-bold font-SpaceGrotesk text-gray-9a w-max`}
                    >
                      Demo Spin
                    </span>
                  </GrayGradientButton>
                </div>
              </div>
              <div class="flex ssm:flex-wrap justify-end gap-3 py-2 pl-2 scale-[0.8] ssm:scale-100 text-14 font-SpaceGrotesk text-gray-9a">
                <div
                  class={`h-11 center drop-shadow-sm rounded-4 group border-opacity-20 hover:border-opacity-20 border cursor-pointer px-2 flex items-center gap-3 shrink-0
                        ${
                          !isFastAnimation()
                            ? "border-gray-9a hover:border-white text-blue-9b hover:text-white"
                            : "border-yellow-ffb text-yellow-ffb"
                        }
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
                      isFastAnimation() ? "opacity-75" : "opacity-50"
                    }`}
                  >
                    Fast Open
                  </span>
                </div>
                <div class="h-11 rounded-4 flex items-center px-3 border border-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
                  <FairnessShieldIcon />
                  <span>Fairness</span>
                </div>
              </div>
              {isRolling() && (
                <div class="absolute md:left-1/2 md:-translate-x-1/2 top-24 md:top-auto">
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
          <div class="flex flex-col gap-4 grow px-4 xl:px-8 xxl:px-14 pt-5">
            <div class="w-full flex flex-col gap-4">
              <div class="w-full">
                <p class="text-yellow-ffb font-medium text-base capitalize font-SpaceGrotesk">
                  potential drops
                </p>
              </div>
              <div class="w-full grid grid-cols-potential-drop--item gap-3">
                <For
                  each={
                    rollCase()?.items.sort((a, b) => b.price - a.price) || []
                  }
                >
                  {(item) => <PotentialDropItem skin={item} />}
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
