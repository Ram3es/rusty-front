import {createEffect, createSignal, For, onCleanup, Show} from "solid-js";
import PageLoadState from "../../libraries/PageLoadState";
import injector from "../../injector/injector";
import Fallback from "../Fallback";
import Coin from "../../utilities/Coin";
import {URL} from "../../libraries/url";
import {NavLink, useNavigate} from "solid-app-router";
import ArrowBack from "../../components/icons/ArrowBack";
import GrayWrapperdWithBorders from "../../components/battle/GrayWrapperdWithBorders";
import AddCaseCard from "../../assets/img/case/AddCaseCard.png";
import CasePlaceholder from "../../assets/img/case/CasePlaceholder.png";
import CaseGradientButton from "../../components/elements/CaseGradientButton";
import BattleRoyaleIcon from "../../components/icons/BattleRoyaleIcon";
import BattleCursedIcon from "../../components/icons/BattleCursedIcon";
import BattleGroupIcon from "../../components/icons/BattleGroupIcon";
import Toggle from "../../components/elements/Toggle";
import CaseSearchInput from "../case/CaseSearchInput";
import Dropdown from "../../components/elements/Dropdown";
import CaseCardToAdd from "../../components/battle/CaseCardToAdd";
import CaseViewModal from "../../components/modals/CaseViewModal";
import RoundedButton from "../../components/elements/RoundedButton";
import GrayGradientButton from "../../components/elements/GrayGradientButton";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
import TrashBinIcon from "../../components/icons/TrashBinIcon";
import RangePercentScale from "../../components/elements/RangePercentScale";
import {getProportionalPartByAmount} from "../../utilities/Numbers";
import {tippy} from "solid-tippy";
import InfoToolTip from "../../components/battle/InfoToolTip";
import {getCurrencyString} from "../../components/mines_new/utils/tools";
import GoldText from "../../components/mines_new/MISC/GoldText";

import dragula from "dragula";

import {
  CB_BATTLE_VARIANTS,
  CB_CURSED_VARIANTS,
  CB_GROUP_VARIANTS,
  CB_ROYAL_VARIANTS,
} from "../../libraries/constants";

const minLevelOptions = ["bronze", "silver", "gold1", "platinum1", "diamond"];
const priceRanges = [
  "All Prices",
  "0-5,000.00",
  "5,000.00-15,000.00",
  "15,000.00-50,000.00",
  "50,000.00-100,000.00",
  "100,000.00-250,000.00",
  "250,000.00+",
];
const sortOptions = ["ASC", "DESC"];

const switchInfo = {
  borrow: `Drag the slider below to borrow money from the house to create bigger battles. If you end up 
  winning you will only receive a fraction of the winnings dependent on how much you borrowed.`,
  fund: `Drag the slider below to determine the battle join cost for other players. Discounting battles 
  at 100% will make the battle free for anyone to join but will make your creation cost a lot more expensive!`,
  private: `Want to high roll in peace? Private battles are only visible to players with whom you share the battle link with!`,
};

function filterByRange(arrayOfCases, range) {
  const [min, max] = range
    .split("-")
    .map((val) => parseInt(val.replace(",", "")));
  switch (range) {
    case "All Prices":
      return arrayOfCases;
    case "250,000+":
      return arrayOfCases.filter((item) => item.price >= 250000);
    default:
      return arrayOfCases.filter(
        (item) => item.price >= min && item.price <= max
      );
  }
}

const CreateCaseBattle = (props) => {
  let itemsWrapper;
  const navigate = useNavigate();
  const {createBattlesPageLoaded, onCreateBattlesPageLoaded} = PageLoadState;
  const {socket, toastr} = injector;
  const [casesState, setCasesState] = createSignal([]);
  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = createSignal(false);
  const [placeholdersToShow, setPlaceholdersToShow] = createSignal(2);
  const [search, setSearch] = createSignal("");
  const [priceRange, setPriceRange] = createSignal(priceRanges[0]);
  const [sortBy, setSortBy] = createSignal(sortOptions[1]);
  const [caseViewModal, setCaseViewModal] = createSignal(false);
  const [caseViewModalItem, setCaseViewModalItem] = createSignal(null);
  const [playersState, setPlayersState] = createSignal({
    royal: {
      players: 2,
      team: 0,
    },
    cursed: {
      players: 2,
      team: 0,
    },
    group: {
      players: 2,
      team: 0,
    },
  });

  const [currentBattle, setCurrentBattle] = createSignal(CB_BATTLE_VARIANTS[0]);

  const [modeToCreate, setModeToCreate] = createSignal({
    mode: "royal",
    players: 2,
    cases: [],
    cursed: 0,
    borrowMoney: 0,
    fundBattle: 0,
    borrowPercent: 0,
    fundPercent: 0,
    private: 0,
    minLevel: minLevelOptions[0],
  });

  const [casesPrice, setCasesPrice] = createSignal(0);

  let drake;

  const getSelectedCasesCost = () =>
    modeToCreate().cases.reduce(
      (total, c) =>
        (total +=
          c.qty * casesState().find((obj) => obj.id === c.caseId)?.price || 0),
      0
    );

  createEffect(() => {
    const cost = getSelectedCasesCost();
    setCasesPrice(cost);
  });

  const getPlaceholdernumber = () => {
    const columnsTotal = Math.floor(itemsWrapper.offsetWidth / 214); // Adjust the width as needed
    console.log("columnsTotal", columnsTotal);
    const row = Math.floor(modeToCreate().cases.length / columnsTotal);
    console.log("row", row);
    const colsToShow =
      row === 0
        ? columnsTotal - modeToCreate().cases.length - 1
        : columnsTotal * (row + 1) - modeToCreate().cases.length - 1;
    setPlaceholdersToShow(colsToShow);
    console.log("colsToShow", colsToShow);
  };

  const toggleCaseViewModal = () => {
    setCaseViewModal(!caseViewModal());
  };

  const getModeColor = () => {
    return (modeToCreate().mode === "royal" ||
      modeToCreate().mode === "team") &&
      modeToCreate().cursed !== 1
      ? "yellow"
      : modeToCreate().cursed === 1
      ? "green"
      : "blue";
  };

  const getModeForPlayersState = () => {
    if (modeToCreate().mode === "royal" && modeToCreate().cursed === 0) {
      return "royal";
    }

    if (modeToCreate().mode === "team" && modeToCreate().cursed === 0) {
      return "royal";
    }

    if (modeToCreate().mode === "royal" && modeToCreate().cursed === 1) {
      return "cursed";
    }

    if (modeToCreate().mode === "team" && modeToCreate().cursed === 1) {
      return "cursed";
    }

    if (modeToCreate().mode === "group" && modeToCreate().cursed === 0) {
      return "group";
    }

    return "group";
  };

  createEffect(() => {
    if (props.loaded()) {
      onCreateBattlesPageLoaded(true);
      socket.emit(
        "battles:cases",
        {price: sortBy() === sortOptions[1] ? "desc" : "asc"},
        (data) => {
          setCasesState(data.data.cases);
          getPlaceholdernumber();
        }
      );
    }
  });

  const createBattle = () => {
    socket.emit(
      "battles:create",
      {
        ...modeToCreate(),
        borrowPercent: Math.floor(modeToCreate().borrowPercent * 0.8),
      },
      (data) => {
        console.log("battles:create", data);
        if (data.msg) {
          toastr(data);
        }
        if (!data.error && data.data.gameId) {
          navigate(
            `${URL.GAMEMODES.CASE_BATTLES_GAME}?id=${data.data.gameId}` +
              (data.data.urlKey ? `&key=${data.data.urlKey}` : "")
          );
        }
      }
    );
  };

  createEffect(() => {
    if (drake) drake.destroy();
    if (modeToCreate().cases.length > 0) {
      const elements = itemsWrapper.querySelectorAll(".item-drop");
      drake = dragula(Array.from(elements), {
        revertOnSpill: true,
        moves: function (el, container, handle) {
          return handle.classList.contains("swapper");
        },
      });
      drake.on("drag", (el, source) => {
        el.style.display = "none";
      });

      drake.on("cancel", (el, container, source) => {
        el.style.display = "";
      });

      drake.on("drop", (el, target, source, sibling) => {
        if (
          target.classList.contains("exclude-card") ||
          target.closest(".exclude-card")
        ) {
          return; // Cancel the drop action
        }
        const newIndex = Array.from(elements).indexOf(target);
        const oldIndex = Array.from(elements).indexOf(source);
        setModeToCreate((prev) => {
          const newCasesObj = {...prev};
          newCasesObj.cases.splice(
            newIndex,
            0,
            newCasesObj.cases.splice(oldIndex, 1)[0]
          );
          return newCasesObj;
        });
      });
    }
  });

  const counter = (item) => {
    return (
      <div
        class="flex gap-1 mx-auto border border-white border-opacity-5 rounded-full backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(20, 21, 38, 0) 0%, rgba(20, 21, 38, 0.36) 100%)",
          filter:
            "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))",
        }}
      >
        <RoundedButton
          onClick={() => {
            setModeToCreate((prev) => {
              const ind = prev.cases.findIndex(
                (i) => i.caseId === item.id || i.caseId === item.caseId
              );
              const newCasesObj = {...prev};
              if (prev.cases[ind].qty - 1 === 0) {
                newCasesObj.cases.splice(ind, 1);
              } else {
                newCasesObj.cases[ind].qty -= 1;
              }
              return newCasesObj;
            });
            getPlaceholdernumber();
          }}
        >
          <svg
            width="14"
            height="2"
            viewBox="0 0 14 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5561 1.77772C1.12654 1.77772 0.77832 1.4295 0.77832 0.999946C0.77832 0.570391 1.12654 0.222168 1.5561 0.222168L12.445 0.222168C12.8745 0.222168 13.2228 0.570391 13.2228 0.999945C13.2228 1.4295 12.8745 1.77772 12.445 1.77772L1.5561 1.77772Z"
              fill="#9A9EC8"
            />
          </svg>
        </RoundedButton>
        <div
          class="h-9 w-[36px] ssm:w-[56px] md:w-[76px] counter-border center rounded-full text-yellow-ffb font-SpaceGrotesk font-bold text-16 text-shadow-gold-secondary"
          style={{
            background: "rgba(26, 28, 48, 1)",
            filter:
              "drop-shadow(0px 0px 3px rgba(255, 180, 54, 0.24)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))",
          }}
        >
          {
            modeToCreate().cases.find(
              (i) => i.caseId === item.id || i.caseId === item.caseId
            )?.qty
          }
        </div>
        <RoundedButton
          onClick={() => {
            setModeToCreate((prev) => ({
              ...prev,
              cases: prev.cases.map((c) => {
                if (c.caseId !== item.id && c.caseId !== item.caseId) {
                  return c;
                } else {
                  return {...c, qty: c.qty + 1};
                }
              }),
            }));
            getPlaceholdernumber();
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.00035 0.777771C6.5708 0.777771 6.22258 1.12599 6.22258 1.55555V6.22222H1.5561C1.12654 6.22222 0.77832 6.57044 0.77832 6.99999C0.77832 7.42955 1.12654 7.77777 1.5561 7.77777H6.22258V12.4444C6.22258 12.874 6.5708 13.2222 7.00035 13.2222C7.42991 13.2222 7.77813 12.874 7.77813 12.4444V7.77777H12.445C12.8745 7.77777 13.2228 7.42955 13.2228 6.99999C13.2228 6.57044 12.8745 6.22222 12.445 6.22222H7.77813V1.55555C7.77813 1.12599 7.42991 0.777771 7.00035 0.777771Z"
              fill="#9A9EC8"
            />
          </svg>
        </RoundedButton>
      </div>
    );
  };

  onCleanup(() => {
    if (drake) drake.destroy();
  });

  return (
    <Fallback loaded={createBattlesPageLoaded}>
      <div class="flex flex-col pb-4 lg:py-6 gap-6">
        <div class="px-4 xl:px-8 xxl:px-14 llg:max-w-[calc(100vw-324px)]">
          <div class="flex items-center justify-between mb-4">
            <NavLink href={URL.GAMEMODES.CASE_BATTLES}>
              <div class="flex gap-2 items-center px-3 py-2 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max">
                <ArrowBack />
                <span class="font-SpaceGrotesk text-14 text-gray-9a">
                  Exit Creation
                </span>
              </div>
            </NavLink>
          </div>
        </div>
        <div class="border border-black border-opacity-5 relative bg-dark-secondary">
          <div class="absolute left-1/2 bottom-full -translate-x-1/2">
            <GrayWrapperdWithBorders classes="rounded-t-4 w-max">
              <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center py-1 px-12">
                <span class="w-max">
                  {modeToCreate().cases.reduce(
                    (total, c) => (total += c.qty),
                    0
                  )}{" "}
                  Cases
                </span>
                <Coin width="5" />
                <span class="text-gradient">
                  {modeToCreate().borrowMoney
                    ? casesPrice() -
                      getProportionalPartByAmount(
                        casesPrice(),
                        Math.floor(modeToCreate().borrowPercent * 0.8)
                      )
                    : modeToCreate().fundBattle
                    ? casesPrice() +
                      getProportionalPartByAmount(
                        casesPrice(),
                        modeToCreate().fundPercent
                      ) *
                        (modeToCreate().players - 1)
                    : casesPrice()}
                </span>
              </div>
            </GrayWrapperdWithBorders>
          </div>
          <div class="flex flex-col gap-2 px-4 xl:px-8 xxl:px-32 my-4 lg:my-6 llg:max-w-[calc(100vw-324px)]">
            <div
              ref={itemsWrapper}
              class="grid lg:mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-battle-create gap-4 lg:gap-2"
            >
              <div
                class="mx-auto h-[256px] w-full lg:w-[214px] bg-full cursor-pointer exclude-card"
                style={{
                  "background-image": `url(${AddCaseCard})`,
                }}
                onClick={() => setIsAddCaseModalOpen(true)}
              />
              <For each={modeToCreate().cases}>
                {(item) => {
                  const caseToShow = casesState().find(
                    (c) => c.id === item.caseId
                  );
                  return (
                    <div class="item-drop">
                      <div
                        class="relative w-full lg:w-max mx-auto pointer-events-auto"
                        style={{
                          "touch-action": "none",
                        }}
                      >
                        <CaseCardToAdd
                          item={caseToShow}
                          isAdded={true}
                          onAddCase={() => {}}
                          isActiveBorderShown={false}
                        >
                          {counter(item)}
                        </CaseCardToAdd>
                        <div class="absolute right-3 top-3 w-7 h-7 z-10">
                          <RoundedButton>
                            <svg
                              width="19"
                              height="20"
                              viewBox="0 0 19 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="swapper"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.49107 3.29714L9.65112 1.1371C9.74903 1.03918 9.87964 0.989051 10.0146 0.989344C10.1521 0.988024 10.2857 1.03918 10.3836 1.1371L12.4991 3.25258C12.6973 3.45076 12.6973 3.77295 12.4991 3.97099L12.2263 4.24378C12.035 4.43507 11.7011 4.43507 11.5096 4.24378L10.6998 3.43215V6.41467C10.6998 6.42005 10.6979 6.42487 10.6961 6.42967C10.6948 6.43297 10.6935 6.43627 10.6929 6.43973C10.6709 6.69963 10.4529 6.90528 10.1872 6.90528H9.80166C9.52154 6.90528 9.29125 6.67779 9.29125 6.39767V6.06463V6.06096V3.47642L8.48109 4.28819C8.28291 4.48637 7.96145 4.48637 7.76342 4.28819L7.49107 4.01569C7.29289 3.81737 7.29289 3.49503 7.49107 3.29714ZM7.49118 15.9934L7.76382 15.7202C7.95512 15.5286 8.28918 15.5286 8.48076 15.7202L9.29093 16.532V13.9589V13.9552V13.6222C9.29093 13.3419 9.52135 13.1033 9.80118 13.1033H10.187C10.4524 13.1033 10.6704 13.3142 10.6925 13.5744C10.6931 13.5776 10.6942 13.5814 10.6954 13.5853C10.6973 13.5922 10.6994 13.5995 10.6994 13.6052V16.5766L11.5093 15.7649C11.7007 15.5735 12.0354 15.5735 12.2268 15.7649L12.4995 16.0377C12.6974 16.2357 12.6971 16.5581 12.4989 16.7563L10.3833 18.8716C10.2878 18.9673 10.1605 19.0194 10.029 19.0194H10.0099C9.87374 19.0194 9.74665 18.9675 9.65108 18.8716L7.49118 16.7117C7.293 16.5137 7.293 16.1915 7.49118 15.9934ZM13.6575 9.29983H13.6141C13.334 9.29983 13.0942 9.53612 13.0942 9.81595V10.202C13.0942 10.4677 13.3066 10.6827 13.5667 10.7047C13.5752 10.7063 13.5898 10.7085 13.5988 10.7085H16.5571L15.7456 11.5214C15.6497 11.6169 15.5971 11.7459 15.5971 11.8819C15.5971 12.0178 15.6499 12.1454 15.7456 12.241L16.0183 12.5137C16.1173 12.6127 16.2474 12.6623 16.3775 12.6623C16.5077 12.6623 16.6377 12.6127 16.7368 12.5137L18.8523 10.398C18.9502 10.3001 19.0027 10.1691 18.9999 10.0291C19.0025 9.89451 18.9502 9.76332 18.8523 9.66555L16.6922 7.50565C16.4944 7.30747 16.172 7.30718 15.9738 7.50536L15.701 7.77756C15.6053 7.87299 15.5527 7.99949 15.5527 8.13552C15.5527 8.2714 15.6053 8.39688 15.701 8.49245L16.5128 9.29983H13.952H13.9488H13.6575ZM1.1383 9.66574L3.29834 7.50599C3.49638 7.30781 3.81871 7.30781 4.01675 7.50599L4.28924 7.77878C4.38496 7.8742 4.43773 8.00188 4.43773 8.13776C4.43773 8.27379 4.38511 8.39692 4.28924 8.49249L3.47762 9.29987H6.05484H6.05835H6.39124C6.67136 9.29987 6.89622 9.53601 6.89622 9.81599V10.2021C6.89622 10.4677 6.69232 10.6824 6.43214 10.7046L6.42574 10.706L6.42573 10.706C6.42001 10.7073 6.41488 10.7085 6.40839 10.7085H3.4332L4.24512 11.5213C4.34069 11.6168 4.39347 11.7455 4.39347 11.881C4.39347 12.0172 4.34084 12.1452 4.24512 12.2408L3.97219 12.5136C3.87324 12.6126 3.74322 12.6623 3.61306 12.6623C3.48289 12.6623 3.35302 12.6128 3.25393 12.5137L1.13815 10.3981C1.04053 10.3004 0.988199 10.1693 0.990545 10.0345C0.988346 9.89456 1.04067 9.76336 1.1383 9.66574ZM11.4043 10.0042C11.4043 9.22698 10.7721 8.59477 9.99506 8.59477C9.21802 8.59477 8.58566 9.22698 8.58566 10.0042C8.58566 10.7812 9.21802 11.4136 9.99506 11.4136C10.7721 11.4136 11.4043 10.7812 11.4043 10.0042Z"
                                fill="#9A9EC8"
                              />
                            </svg>
                          </RoundedButton>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
              {placeholdersToShow() >= 0 && (
                <For each={Array.from(Array(placeholdersToShow()).keys())}>
                  {() => (
                    <div
                      class="mx-auto h-[256px] w-full lg:w-[214px] bg-full exclude-card"
                      style={{
                        "background-image": `url(${CasePlaceholder})`,
                      }}
                    />
                  )}
                </For>
              )}
            </div>
          </div>
        </div>

        <div class="center flex-col gap-2 px-4 xl:px-8 xxl:px-14 llg:w-[calc(100vw-324px)] bg-control-panel">
          <div class="grid grid-cols-2 lg:w-[616px] lg:flex lg:flex-col justify-between px-4 lg:px-14 py-4 border-white border border-opacity-5 gap-4">
            <div class="col-span-2 grid grid-cols-2 lg:flex flex-col justify-between lg:flex-row gap-2 lg:w-full">
              <div>
                <CaseGradientButton
                  isFullWidth={true}
                  callbackFn={() => {
                    setCurrentBattle("royal");
                    setPlayersState((prev) => {
                      return {
                        ...prev,
                        [getModeForPlayersState()]: {
                          players:
                            playersState()[getModeForPlayersState()].players,
                          team: playersState()[getModeForPlayersState()].team
                            ? 1
                            : 0,
                        },
                      };
                    });
                    setModeToCreate((prev) => {
                      return {
                        ...prev,
                        mode: playersState().royal.team ? "team" : "royal",
                        players: playersState().royal.players,
                        cursed: 0,
                      };
                    });
                  }}
                  selected={
                    (modeToCreate().mode === "royal" ||
                      modeToCreate().mode === "team") &&
                    modeToCreate().cursed !== 1
                  }
                  rgb={"255, 180, 54"}
                  toggle
                >
                  <div class="flex gap-2 ">
                    <BattleRoyaleIcon
                      additionClasses={`w-4 text-yellow-ffb ${
                        (modeToCreate().mode === "royal" ||
                          modeToCreate().mode === "team") &&
                        modeToCreate().cursed !== 1
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    />
                    <span
                      class={`${
                        (modeToCreate().mode === "royal" ||
                          modeToCreate().mode === "team") &&
                        modeToCreate().cursed !== 1
                          ? "text-yellow-ffb"
                          : "text-[#9A9EC8]"
                      } font-SpaceGrotesk truncate text-14 sm:text-16 font-bold`}
                    >
                      Battle Royale
                    </span>
                  </div>
                </CaseGradientButton>
              </div>
              <div>
                <CaseGradientButton
                  isFullWidth={true}
                  color="green"
                  callbackFn={() => {
                    setCurrentBattle("cursed");
                    setPlayersState((prev) => {
                      return {
                        ...prev,
                        [getModeForPlayersState()]: {
                          players:
                            playersState()[getModeForPlayersState()].players,
                          team: playersState()[getModeForPlayersState()].team
                            ? 1
                            : 0,
                        },
                      };
                    });
                    setModeToCreate((prev) => {
                      return {
                        ...prev,
                        mode: playersState().cursed.team ? "team" : "royal",
                        players: playersState().cursed.players,
                        cursed: 1,
                      };
                    });
                  }}
                  selected={modeToCreate().cursed === 1}
                  rgb="218, 253, 9"
                  toggle
                >
                  <div class={`flex gap-2 items-center text-[#DAFD09]`}>
                    <BattleCursedIcon
                      additionClasses={`w-5 ${
                        modeToCreate().cursed === 1
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    />
                    <span
                      class={`truncate font-SpaceGrotesk text-14 sm:text-16 font-bold ${
                        modeToCreate().cursed === 1
                          ? "text-[#DAFD09]"
                          : "text-[#9A9EC8]"
                      }`}
                    >
                      Cursed Battle
                    </span>
                  </div>
                </CaseGradientButton>
              </div>
              <div>
                <CaseGradientButton
                  isFullWidth={true}
                  color="blue"
                  callbackFn={() => {
                    setCurrentBattle("group");
                    setPlayersState((prev) => {
                      return {
                        ...prev,
                        [getModeForPlayersState()]: {
                          players:
                            playersState()[getModeForPlayersState()].players,
                          team: playersState()[getModeForPlayersState()].team
                            ? 1
                            : 0,
                        },
                      };
                    });
                    setModeToCreate((prev) => {
                      return {
                        ...prev,
                        mode: "group",
                        players: playersState().group.players,
                        cursed: 0,
                      };
                    });
                  }}
                  selected={
                    modeToCreate().mode === "group" &&
                    modeToCreate().cursed !== 1
                  }
                  rgb="90, 195, 255"
                  toggle
                >
                  <div class="flex gap-2 items-center">
                    <BattleGroupIcon
                      additionClasses={`text-[#5AC3FF] w-5 ${
                        modeToCreate().mode === "group" &&
                        modeToCreate().cursed !== 1
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    />
                    <span
                      class={`${
                        modeToCreate().mode === "group" &&
                        modeToCreate().cursed !== 1
                          ? "text-[#5AC3FF]"
                          : "text-[#9A9EC8]"
                      } truncate font-SpaceGrotesk text-14 sm:text-16 font-bold`}
                    >
                      Group Mode
                    </span>
                  </div>
                </CaseGradientButton>
              </div>
            </div>
            <div class="w-full border-t border-white border-opacity-5 col-span-2" />
            <div class="col-span-2 grid grid-cols-2 lg:flex lg:center gap-2">
              <For
                each={
                  currentBattle() === "royal"
                    ? CB_ROYAL_VARIANTS
                    : currentBattle() === "cursed"
                    ? CB_CURSED_VARIANTS
                    : CB_GROUP_VARIANTS
                }
              >
                {(option) => (
                  <div
                    class={`w-full lg:w-max center px-5 py-3 ${
                      option.qty ===
                        playersState()[getModeForPlayersState()].players &&
                      (option.team ===
                        playersState()[getModeForPlayersState()].team ||
                        option.mode === "group") &&
                      option.mode === getModeForPlayersState()
                        ? "border-yellow-ffb text-white"
                        : "border-white border-opacity-5 text-gray-9a"
                    } border rounded-4 flex gap-1 items-center cursor-pointer`}
                    onClick={() => {
                      setPlayersState((prev) => {
                        const updatedState = {...prev};

                        Object.keys(updatedState).forEach((key) => {
                          updatedState[key].players = option.qty;
                          updatedState[key].team =
                            updatedState[key].team === "group"
                              ? 0
                              : option.team;
                        });

                        return updatedState;
                      });

                      setModeToCreate((prev) => ({
                        ...prev,
                        mode:
                          option.team === 1
                            ? "team"
                            : option.mode === "cursed"
                            ? "royal"
                            : option.mode,
                        players: option.qty,
                      }));
                    }}
                  >
                    <For each={Array.from(Array(option.qty).keys())}>
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
                          {index() + 1 !== option.qty &&
                            option.mode !== "group" &&
                            ((option.mode === "royal" && !option.team) ||
                              (option.mode === "cursed" && !option.team) ||
                              (option.team &&
                                index() !== 0 &&
                                index() !== 2)) && (
                              <BattleRoyaleIcon additionClasses="w-3" />
                            )}
                        </>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 items-center justify-center xl:items-stretch xl:flex-row gap-4 text-gray-66 px-4 xl:px-8 xxl:px-14">
          <div class="flex flex-col min-w-full xll:min-w-[420px] fourk:min-w-[439px]">
            <div
              class={`grid grid-cols-[1.7fr_0.3fr] items-center justify-between rounded-6 min-h-[60px]`}
              style={{
                background:
                  "radial-gradient(50% 100% at 50% 0%, rgba(39, 242, 120, 0.12) 0%, rgba(39, 242, 120, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              }}
            >
              <div class="grow px-3 lg:px-4 py-2 lg:py-3 flex gap-3 border border-white border-opacity-5 rounded-l h-full">
                <div class="shrink-0 border border-green-27/30 rounded-4 w-9 h-9 flex items-center justify-center">
                  <div
                    class="w-full h-full rounded-4 flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(162.5% 100% at 50% 0%, rgba(159, 151, 249, 0.12) 0%, rgba(159, 151, 249, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(272.05% 172.05% at 50% 0%, #1D2352 0%, #1D1F30 100%)",
                      "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 8px rgba(39, 242, 120, 0.48))",
                      }}
                    >
                      <path
                        d="M12.9072 0.00222778V9.09496H22C21.9955 4.06896 17.9287 0.00222778 12.9072 0.00222778Z"
                        fill="#27F278"
                      />
                      <path
                        d="M10.061 21.9977C4.51259 21.9977 0 17.4851 0 11.9367C0 6.38831 4.51259 1.87122 10.061 1.87122H11.0338V10.9639H20.1265V11.9367C20.1265 17.4851 15.6139 21.9977 10.061 21.9977ZM9.08823 3.87531C5.07103 4.35719 1.94555 7.78892 1.94555 11.9367C1.94555 16.4088 5.58894 20.0522 10.061 20.0522C14.2088 20.0522 17.636 16.9267 18.1179 12.9095H9.08823V3.87531Z"
                        fill="#27F278"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex flex-col font-SpaceGrotesk font-bold text-13">
                  <p class="text-green-27 flex items-center gap-1.5">
                    Borrow Money{" "}
                    <span
                      class="cursor-pointer"
                      use:tippy={{
                        props: {
                          content: <InfoToolTip text={switchInfo.borrow} />,
                          allowHTML: true,
                          duration: 0,
                        },
                        hidden: true,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4801 2.08668C11.5267 1.00001 9.48008 0.333344 7.00008 0.333344C4.52008 0.333344 2.47341 1.00001 1.52008 2.08668C-0.0665886 3.92668 -0.0665886 10.0867 1.52008 11.9133C2.47341 13 4.52008 13.6667 7.00008 13.6667C9.48008 13.6667 11.5267 13 12.4801 11.9133C14.0667 10.0733 14.0667 3.92668 12.4801 2.08668ZM7.00008 3.50001C7.1649 3.50001 7.32601 3.54888 7.46305 3.64045C7.60009 3.73202 7.7069 3.86217 7.76998 4.01444C7.83305 4.16671 7.84955 4.33427 7.8174 4.49592C7.78525 4.65757 7.70588 4.80606 7.58933 4.9226C7.47279 5.03914 7.3243 5.11851 7.16265 5.15066C7.001 5.18282 6.83345 5.16632 6.68118 5.10324C6.5289 5.04017 6.39875 4.93336 6.30719 4.79632C6.21562 4.65928 6.16675 4.49816 6.16675 4.33334C6.16675 4.11233 6.25454 3.90037 6.41082 3.74409C6.5671 3.58781 6.77906 3.50001 7.00008 3.50001ZM7.66675 10.6667H6.33341C6.1566 10.6667 5.98703 10.5964 5.86201 10.4714C5.73698 10.3464 5.66675 10.1768 5.66675 10C5.66675 9.8232 5.73698 9.65363 5.86201 9.52861C5.98703 9.40358 6.1566 9.33334 6.33341 9.33334V7.33334C6.1566 7.33334 5.98703 7.26311 5.86201 7.13808C5.73698 7.01306 5.66675 6.84349 5.66675 6.66668C5.66675 6.48987 5.73698 6.3203 5.86201 6.19527C5.98703 6.07025 6.1566 6.00001 6.33341 6.00001H7.00008C7.17689 6.00001 7.34646 6.07025 7.47148 6.19527C7.59651 6.3203 7.66675 6.48987 7.66675 6.66668V9.33334C7.84356 9.33334 8.01313 9.40358 8.13815 9.52861C8.26317 9.65363 8.33341 9.8232 8.33341 10C8.33341 10.1768 8.26317 10.3464 8.13815 10.4714C8.01313 10.5964 7.84356 10.6667 7.66675 10.6667Z"
                          fill="#878CBD"
                        />
                      </svg>
                    </span>
                  </p>
                  <span class="text-gray-a2 text-13 xl:text-10 xll:text-13">
                    Create a battle for a fraction of the cost!
                  </span>
                </div>
              </div>
              <div class="relative center px-4 bg-white bg-opacity-[0.01] rounded-r-6 border h-full border-white border-opacity-5">
                <Toggle
                  checked={modeToCreate().borrowMoney === 1}
                  onChange={(isChecked) =>
                    setModeToCreate((prev) => ({
                      ...prev,
                      borrowMoney: isChecked ? 1 : 0,
                      fundBattle: 0,
                      fundPercent: 0,
                    }))
                  }
                  color="green-27"
                />
              </div>
            </div>
            {modeToCreate().borrowMoney === 1 && (
              <div
                class="flex flex-col items-center justify-center gap-3.5 pt-3.5"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                }}
              >
                <div
                  class="rounded px-4 py-2 w-max"
                  style={{
                    background:
                      "linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                  }}
                >
                  <p class="font-SpaceGrotesk text-gray-a2 text-13 font-bold flex items-center justify-center gap-1.5">
                    Borrow amount: <Coin />{" "}
                    <span
                      class="text-gradient-green-secondary text-sm"
                      style={{
                        "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {getProportionalPartByAmount(
                        casesPrice(),
                        Math.floor(modeToCreate().borrowPercent * 0.8)
                      )}
                    </span>
                  </p>
                </div>
                <RangePercentScale
                  value={modeToCreate().borrowPercent}
                  setter={(per) =>
                    setModeToCreate((prev) => ({...prev, borrowPercent: per}))
                  }
                  maxPercent={80}
                  hexColor="#27F278"
                />
                <div
                  class="rounded-b-6 py-1.5 w-full"
                  style={{
                    background:
                      "linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                  }}
                >
                  <p class="text-center font-SpaceGrotesk text-11 font-bold text-white">
                    On win you receive{" "}
                    <span class="text-green-27">
                      {100 - Math.floor(modeToCreate().borrowPercent * 0.8)}%
                    </span>{" "}
                    of total win amount!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div class="flex flex-col min-w-full xll:min-w-[420px] fourk:min-w-[439px]">
            <div
              class={`grid grid-cols-[1.7fr_0.3fr] items-center justify-between rounded-6 min-h-[60px]`}
              style={{
                background:
                  "radial-gradient(50% 100% at 50% 0%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              }}
            >
              <div class="grow px-3 lg:px-4 py-2 lg:py-3 flex gap-3 border border-white border-opacity-5 rounded-l h-full">
                <div class="shrink-0 border border-yellow-ffb/30 rounded-4 w-9 h-9 flex items-center justify-center">
                  <div
                    class="w-full h-full flex items-center justify-center rounded-4"
                    style={{
                      background:
                        "radial-gradient(162.5% 100% at 50% 0%, rgba(159, 151, 249, 0.12) 0%, rgba(159, 151, 249, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(272.05% 172.05% at 50% 0%, #1D2352 0%, #1D1F30 100%)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 8px rgba(255, 180, 54, 0.48))",
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.1589 0C18.6509 0 19.1133 0.191641 19.4609 0.539648C19.8084 0.886641 20 1.34906 20 1.84113V8.85238C20 9.34422 19.8084 9.80664 19.4606 10.1545L10.1545 19.4605C9.80664 19.8084 9.34426 20 8.8525 20C8.3607 20 7.89832 19.8084 7.55059 19.4604L0.539492 12.4493C0.191641 12.1016 0 11.6393 0 11.1475C0 10.6557 0.191563 10.1934 0.539492 9.84547L9.84555 0.539414C10.1934 0.191563 10.6558 0 11.1476 0H18.1589ZM11.8412 6.44961C11.8412 5.43441 11.0152 4.60848 10 4.60848C8.98484 4.60848 8.15891 5.43441 8.15891 6.44961C8.15891 7.4648 8.98484 8.29074 10 8.29074C11.0152 8.29074 11.8412 7.4648 11.8412 6.44961ZM8.15891 13.5503C8.15891 14.5655 8.98484 15.3914 10 15.3914C11.0152 15.3914 11.8412 14.5655 11.8412 13.5503C11.8412 12.5351 11.0152 11.7092 10 11.7092C8.98484 11.7092 8.15891 12.5351 8.15891 13.5503ZM6.23445 10.5859H13.7656C14.0893 10.5859 14.3516 10.3236 14.3516 9.99996C14.3516 9.67637 14.0892 9.41402 13.7656 9.41402H6.23445C5.91086 9.41402 5.64852 9.67637 5.64852 9.99996C5.64852 10.3236 5.91086 10.5859 6.23445 10.5859ZM15.6901 3.72395C15.6901 4.04738 15.9526 4.30988 16.2761 4.30988C16.5995 4.30988 16.862 4.04738 16.862 3.72395C16.862 3.40051 16.5995 3.13801 16.2761 3.13801C15.9526 3.13801 15.6901 3.40051 15.6901 3.72395ZM10.0001 7.11887C10.3697 7.11887 10.6694 6.81924 10.6694 6.44962C10.6694 6.07999 10.3697 5.78036 10.0001 5.78036C9.6305 5.78036 9.33087 6.07999 9.33087 6.44962C9.33087 6.81924 9.6305 7.11887 10.0001 7.11887ZM10.0001 14.2196C10.3697 14.2196 10.6694 13.9199 10.6694 13.5503C10.6694 13.1807 10.3697 12.881 10.0001 12.881C9.6305 12.881 9.33087 13.1807 9.33087 13.5503C9.33087 13.9199 9.6305 14.2196 10.0001 14.2196Z"
                        fill="#FFB436"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex flex-col font-SpaceGrotesk font-bold text-13">
                  <p class="text-yellow-ffb flex items-center gap-1.5">
                    Fund Money{" "}
                    <span
                      class="cursor-pointer"
                      use:tippy={{
                        props: {
                          content: <InfoToolTip text={switchInfo.fund} />,
                          allowHTML: true,
                          duration: 0,
                        },
                        hidden: true,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4801 2.08668C11.5267 1.00001 9.48008 0.333344 7.00008 0.333344C4.52008 0.333344 2.47341 1.00001 1.52008 2.08668C-0.0665886 3.92668 -0.0665886 10.0867 1.52008 11.9133C2.47341 13 4.52008 13.6667 7.00008 13.6667C9.48008 13.6667 11.5267 13 12.4801 11.9133C14.0667 10.0733 14.0667 3.92668 12.4801 2.08668ZM7.00008 3.50001C7.1649 3.50001 7.32601 3.54888 7.46305 3.64045C7.60009 3.73202 7.7069 3.86217 7.76998 4.01444C7.83305 4.16671 7.84955 4.33427 7.8174 4.49592C7.78525 4.65757 7.70588 4.80606 7.58933 4.9226C7.47279 5.03914 7.3243 5.11851 7.16265 5.15066C7.001 5.18282 6.83345 5.16632 6.68118 5.10324C6.5289 5.04017 6.39875 4.93336 6.30719 4.79632C6.21562 4.65928 6.16675 4.49816 6.16675 4.33334C6.16675 4.11233 6.25454 3.90037 6.41082 3.74409C6.5671 3.58781 6.77906 3.50001 7.00008 3.50001ZM7.66675 10.6667H6.33341C6.1566 10.6667 5.98703 10.5964 5.86201 10.4714C5.73698 10.3464 5.66675 10.1768 5.66675 10C5.66675 9.8232 5.73698 9.65363 5.86201 9.52861C5.98703 9.40358 6.1566 9.33334 6.33341 9.33334V7.33334C6.1566 7.33334 5.98703 7.26311 5.86201 7.13808C5.73698 7.01306 5.66675 6.84349 5.66675 6.66668C5.66675 6.48987 5.73698 6.3203 5.86201 6.19527C5.98703 6.07025 6.1566 6.00001 6.33341 6.00001H7.00008C7.17689 6.00001 7.34646 6.07025 7.47148 6.19527C7.59651 6.3203 7.66675 6.48987 7.66675 6.66668V9.33334C7.84356 9.33334 8.01313 9.40358 8.13815 9.52861C8.26317 9.65363 8.33341 9.8232 8.33341 10C8.33341 10.1768 8.26317 10.3464 8.13815 10.4714C8.01313 10.5964 7.84356 10.6667 7.66675 10.6667Z"
                          fill="#878CBD"
                        />
                      </svg>
                    </span>
                  </p>
                  <span class="text-gray-a2 text-13 xl:text-10 xll:text-13">
                    Cover the join cost of other players!
                  </span>
                </div>
              </div>
              <div class="center px-4 py-3 bg-white bg-opacity-[0.01] rounded-r-6 border h-full border-white border-opacity-5">
                <Toggle
                  checked={modeToCreate().fundBattle === 1}
                  onChange={(isChecked) =>
                    setModeToCreate((prev) => ({
                      ...prev,
                      fundBattle: isChecked ? 1 : 0,
                      borrowMoney: 0,
                      borrowPercent: 0,
                    }))
                  }
                  color="yellow"
                />
              </div>
            </div>
            {modeToCreate().fundBattle === 1 && (
              <div
                class="flex flex-col items-center justify-center gap-3.5 pt-3.5"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                }}
              >
                <div
                  class="rounded px-4 py-2 w-max"
                  style={{
                    background:
                      "linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                  }}
                >
                  <p class="font-SpaceGrotesk text-gray-a2 text-13 font-bold flex items-center justify-center gap-1.5">
                    Fund amount: <Coin />{" "}
                    <span
                      class="text-gradient text-sm"
                      style={{
                        "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {getProportionalPartByAmount(
                        casesPrice(),
                        modeToCreate().fundPercent
                      )}
                    </span>
                  </p>
                </div>
                <RangePercentScale
                  value={modeToCreate().fundPercent}
                  setter={(per) =>
                    setModeToCreate((prev) => ({...prev, fundPercent: per}))
                  }
                  maxPercent={100}
                  hexColor="#FFB436"
                />
                <div
                  class="rounded-b-6 py-1.5 w-full"
                  style={{
                    background:
                      "linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                  }}
                >
                  <p class="text-center font-SpaceGrotesk text-11 font-bold text-white">
                    Funding the battle costs you extra!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div class="flex flex-col min-w-full xll:min-w-[420px] fourk:min-w-[439px]">
            <div
              class={`grid grid-cols-[1.7fr_0.3fr] items-center justify-between rounded-6 min-h-[60px]`}
              style={{
                background:
                  "radial-gradient(50% 100% at 50% 0%, rgba(159, 151, 249, 0.12) 0%, rgba(159, 151, 249, 0) 100%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              }}
            >
              <div class="grow px-3 lg:px-4 py-2 lg:py-3 flex gap-3 border border-white border-opacity-5 rounded-l h-full">
                <div class="shrink-0 border border-purple-9f/30 rounded-4 w-9 h-9 flex items-center justify-center">
                  <div
                    class="w-full h-full flex items-center justify-center rounded-4"
                    style={{
                      background:
                        "radial-gradient(162.5% 100% at 50% 0%, rgba(159, 151, 249, 0.12) 0%, rgba(159, 151, 249, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(272.05% 172.05% at 50% 0%, #1D2352 0%, #1D1F30 100%)",
                    }}
                  >
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 8px rgba(159, 151, 249, 0.48))",
                      }}
                    >
                      <path
                        d="M17.1423 7.91524C17.0898 5.17692 16.7083 3.15727 16.7135 3.1554C16.5548 2.84581 16.2765 2.58688 15.9359 2.45462C13.7006 1.58767 11.5025 0.760211 9.35949 0.0542076C9.14042 -0.0180692 8.90944 -0.0180692 8.69074 0.0542076C6.54815 0.758348 4.35041 1.58432 2.11542 2.45015C1.81476 2.56676 1.56254 2.78247 1.39824 3.04475C1.4109 3.04624 0.938868 4.51972 0.858395 7.77404C0.810707 11.0287 1.21605 12.0037 1.20264 12.0048C1.42208 12.7202 1.83264 13.4478 2.42092 14.1877C3.07849 15.014 3.96704 15.8676 5.04039 16.7066C6.81713 18.1011 8.47987 18.9345 8.54954 18.9639C8.70043 19.0377 8.86026 19.0753 9.02493 19.0749C9.18997 19.0749 9.3498 19.0373 9.50032 18.9632C9.57036 18.9337 11.235 18.0977 13.011 16.7036C14.0847 15.8638 14.9732 15.0103 15.6312 14.1843C16.2616 13.3919 16.6878 12.6144 16.8938 11.8506C16.8856 11.8495 17.1836 10.6543 17.1423 7.91562V7.91524ZM9.90939 10.0511V11.7861C9.90939 12.275 9.51336 12.671 9.02456 12.6714C8.53576 12.6714 8.13935 12.2753 8.13935 11.7865V10.0757C7.50153 9.75867 7.06265 9.10073 7.06265 8.34033C7.06265 7.27034 7.92997 6.40265 8.99997 6.40265C10.07 6.40265 10.9373 7.26997 10.9377 8.33996C10.9377 9.08136 10.5211 9.72552 9.90939 10.0511Z"
                        fill="#9F97F9"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex flex-col font-SpaceGrotesk font-bold text-13">
                  <p class="text-purple-9f flex items-center gap-1.5">
                    Private Battle{" "}
                    <span
                      class="cursor-pointer"
                      use:tippy={{
                        props: {
                          content: <InfoToolTip text={switchInfo.private} />,
                          allowHTML: true,
                          duration: 0,
                        },
                        hidden: true,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4801 2.08668C11.5267 1.00001 9.48008 0.333344 7.00008 0.333344C4.52008 0.333344 2.47341 1.00001 1.52008 2.08668C-0.0665886 3.92668 -0.0665886 10.0867 1.52008 11.9133C2.47341 13 4.52008 13.6667 7.00008 13.6667C9.48008 13.6667 11.5267 13 12.4801 11.9133C14.0667 10.0733 14.0667 3.92668 12.4801 2.08668ZM7.00008 3.50001C7.1649 3.50001 7.32601 3.54888 7.46305 3.64045C7.60009 3.73202 7.7069 3.86217 7.76998 4.01444C7.83305 4.16671 7.84955 4.33427 7.8174 4.49592C7.78525 4.65757 7.70588 4.80606 7.58933 4.9226C7.47279 5.03914 7.3243 5.11851 7.16265 5.15066C7.001 5.18282 6.83345 5.16632 6.68118 5.10324C6.5289 5.04017 6.39875 4.93336 6.30719 4.79632C6.21562 4.65928 6.16675 4.49816 6.16675 4.33334C6.16675 4.11233 6.25454 3.90037 6.41082 3.74409C6.5671 3.58781 6.77906 3.50001 7.00008 3.50001ZM7.66675 10.6667H6.33341C6.1566 10.6667 5.98703 10.5964 5.86201 10.4714C5.73698 10.3464 5.66675 10.1768 5.66675 10C5.66675 9.8232 5.73698 9.65363 5.86201 9.52861C5.98703 9.40358 6.1566 9.33334 6.33341 9.33334V7.33334C6.1566 7.33334 5.98703 7.26311 5.86201 7.13808C5.73698 7.01306 5.66675 6.84349 5.66675 6.66668C5.66675 6.48987 5.73698 6.3203 5.86201 6.19527C5.98703 6.07025 6.1566 6.00001 6.33341 6.00001H7.00008C7.17689 6.00001 7.34646 6.07025 7.47148 6.19527C7.59651 6.3203 7.66675 6.48987 7.66675 6.66668V9.33334C7.84356 9.33334 8.01313 9.40358 8.13815 9.52861C8.26317 9.65363 8.33341 9.8232 8.33341 10C8.33341 10.1768 8.26317 10.3464 8.13815 10.4714C8.01313 10.5964 7.84356 10.6667 7.66675 10.6667Z"
                          fill="#878CBD"
                        />
                      </svg>
                    </span>
                  </p>
                  <span class="text-gray-a2 text-13 xl:text-10 xll:text-13">
                    Battle is listed as private!
                  </span>
                </div>
              </div>
              <div class="center px-4 py-3 bg-white bg-opacity-[0.01] rounded-r-6 border h-full border-white border-opacity-5">
                <Toggle
                  checked={modeToCreate().private === 1}
                  onChange={(isChecked) =>
                    setModeToCreate((prev) => ({
                      ...prev,
                      private: isChecked ? 1 : 0,
                    }))
                  }
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:center flex flex-col-reverse lg:flex-row gap-4 p-4 xl:px-8 xxl:px-14 llg:max-w-[calc(100vw-324px)] bg-control-panel">
          <CaseGradientButton
            isFullWidth={true}
            callbackFn={() => createBattle()}
            color={getModeColor()}
          >
            <div class="justify-center w-full flex gap-2 items-center">
              {getModeColor() === "yellow" ? (
                <BattleRoyaleIcon additionClasses="w-5 text-yellow-ffb" />
              ) : getModeColor() === "green" ? (
                <BattleCursedIcon additionClasses="text-[#DAFD09] w-5" />
              ) : (
                <BattleGroupIcon additionClasses="text-[#5AC3FF] w-5" />
              )}
              <span
                class={`truncate text-yellow-ffb font-SpaceGrotesk text-16 font-bold`}
                classList={{
                  "text-yellow-ffb": getModeColor() === "yellow",
                  "text-[#DAFD09]": getModeColor() === "green",
                  "text-[#5AC3FF]": getModeColor() === "blue",
                }}
              >
                Create Battle
              </span>
              <Coin width="5" />
              <GoldText
                text={getCurrencyString(
                  modeToCreate().borrowMoney
                    ? casesPrice() -
                        getProportionalPartByAmount(
                          casesPrice(),
                          Math.floor(modeToCreate().borrowPercent * 0.8)
                        )
                    : modeToCreate().fundBattle
                    ? casesPrice() +
                      getProportionalPartByAmount(
                        casesPrice(),
                        modeToCreate().fundPercent
                      ) *
                        (modeToCreate().players - 1)
                    : casesPrice()
                ).toString()}
                size="16"
              />
            </div>
          </CaseGradientButton>
          <Show when={modeToCreate().fundBattle}>
           <div class='w-max'>
           <Dropdown
              isFullWidth
              label="Min Level:"
              variant="level"
              activeName={modeToCreate().minLevel}
              itemsList={minLevelOptions}
              submitItem={(level) =>
                setModeToCreate((prev) => ({...prev, minLevel: level}))
              }
            />
           </div>
          </Show>
        </div>
      </div>
      {isAddCaseModalOpen() && (
        <div
          class="fixed left-0 top-0 w-full h-full center bg-black bg-opacity-50 z-50"
          onClick={() => {
            setIsAddCaseModalOpen(false);
            console.log("firing");
          }}
        >
          <div
            class="w-11/12 h-5/6 lg:w-auto lg:h-auto flex flex-col rounded-12 overflow-hidden"
            style={{
              background:
                "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="lg:flex lg:justify-between items-start px-4 lg:px-8 py-4 lg:py-6 border-black border-opacity-10 border rounded-t-12">
              <div class="grid grid-cols-2 lg:flex gap-4 items-center">
                <div class="col-span-2 w-full lg:w-80 gap-2 grid grid-cols-[1.7fr_0.3fr]">
                  <CaseSearchInput
                    search={search()}
                    onReset={() => setSearch("")}
                    onInput={(text) => setSearch(text)}
                    isFullWidth
                  />
                  <div
                class="lg:hidden p-3.5 center border border-white border-opacity-5 drop-shadow-md rounded-4 cursor-pointer"
                onClick={() => setIsAddCaseModalOpen(false)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z"
                    fill="#9A9EC8"
                  />
                </svg>
              </div>
                </div>
                <div class='col-span-2'>
                <Dropdown
                  activeName={sortBy()}
                  itemsList={sortOptions}
                  submitItem={(sort) => setSortBy(sort)}
                  label=" Sort by Price:"
                  isFullWidth
                />
                </div>
                <div class='col-span-2'>
                <Dropdown
                  activeName={priceRange()}
                  itemsList={priceRanges}
                  submitItem={(price) => setPriceRange(price)}
                  label="Price Range:"
                  variant="range"
                  isFullWidth
                />
                </div>
              </div>
              <div
                class="hidden lg:block p-3.5 ml-2 border border-white border-opacity-5 drop-shadow-md rounded-4 cursor-pointer"
                onClick={() => setIsAddCaseModalOpen(false)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z"
                    fill="#9A9EC8"
                  />
                </svg>
              </div>
            </div>
            <div class="grid px-4 py-4 lg:py-6 grid-cols-2 lg:grid-cols-battle-create lg:px-12 gap-4 lg:gap-2 max-w-[1184px] w-full bg-dark-secondary h-[60vh] overflow-y-scroll">
              <For
                each={filterByRange(
                  casesState().filter((c) =>
                    c.name.toLowerCase().includes(search().toLowerCase())
                  ),
                  priceRange()
                )}
              >
                {(item) => (
                  <div class="relative w-full lg:w-fit mx-auto">
                    <CaseCardToAdd
                      item={item}
                      isAdded={
                        !modeToCreate().cases.every(
                          (caseItem) => caseItem.caseId !== item.id
                        )
                      }
                      isActiveBorderShown={true}
                      onAddCase={() => {
                        setModeToCreate((prev) => ({
                          ...prev,
                          cases: [...prev.cases, {caseId: item.id, qty: 1}],
                        }));
                        getPlaceholdernumber();
                      }}
                      mobileSmallCard={true}
                    >
                      {!modeToCreate().cases.every(
                        (caseItem) => caseItem.caseId !== item.id
                      ) && (
                        <div class="px-3 w-full flex justify-center items-center">
                          {counter(item)}
                        </div>
                      )}
                    </CaseCardToAdd>
                    {!modeToCreate().cases.every(
                      (caseItem) => caseItem.caseId !== item.id
                    ) && (
                      <div class="absolute right-2 lg:right-3 top-2 lg:top-3 z-10">
                        <RoundedButton
                          onClick={() => {
                            setModeToCreate((prev) => {
                              const ind = prev.cases.findIndex(
                                (i) =>
                                  i.caseId === item.id ||
                                  i.caseId === item.caseId
                              );
                              const newCasesObj = {...prev};
                              newCasesObj.cases.splice(ind, 1);
                              return newCasesObj;
                            });
                            getPlaceholdernumber();
                          }}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z"
                              fill="#9A9EC8"
                            />
                          </svg>
                        </RoundedButton>
                      </div>
                    )}
                  </div>
                )}
              </For>
            </div>
            <div class="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between items-center px-4 lg:px-8 py-4 lg:py-6 border-black border-opacity-10 border">
              <GrayWrapperdWithBorders classes="rounded-[4px] w-full lg:w-max">
                <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center py-2.5 px-8 sm:px-12 ">
                  <span class="w-max">
                    {modeToCreate().cases.reduce(
                      (total, c) => (total += c.qty),
                      0
                    )}{" "}
                    Cases
                  </span>
                  <Coin width="5" />
                  <GoldText
                    text={getCurrencyString(
                      modeToCreate().cases.reduce(
                        (total, c) =>
                          (total +=
                            c.qty *
                              casesState().find((obj) => obj.id === c.caseId)
                                ?.price || 0),
                        0
                      )
                    )}
                    size="15"
                  />
                </div>
              </GrayWrapperdWithBorders>
              <div class="grid grid-cols-2 lg:flex justify-end lg:ml-2 gap-2 text-14 font-bold font-SpaceGrotesk leading-4">
                <GrayGradientButton
                  callbackFn={() =>
                    setModeToCreate((prev) => ({...prev, cases: []}))
                  }
                >
                  <div class="text-gray-9a center gap-2">
                    <TrashBinIcon />
                    <span class="truncate">Clear selection</span>
                  </div>
                </GrayGradientButton>
                <YellowGradientButton
                  callbackFn={() => setIsAddCaseModalOpen(false)}
                >
                  <div class="center gap-[5px] lg:gap-2 text-yellow-ffb">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 0C5.58579 0 5.25 0.335786 5.25 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335786 6.75 0.75 6.75H5.25V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.75V0.75C6.75 0.335786 6.41421 0 6 0Z"
                        fill="#FFB436"
                      />
                    </svg>
                    <span class="truncate">Confirm Selection</span>
                  </div>
                </YellowGradientButton>
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
    </Fallback>
  );
};

export default CreateCaseBattle;
