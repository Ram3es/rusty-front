import {onMount, onCleanup, createSignal, createEffect} from "solid-js";

import MainUpgraderContainer from "../../components/upgrader/MainUpgraderContainer";

import injector from "../../injector/injector";

import {spin} from "../../components/upgrader/dome/Spinner";

import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";
import { sortBy } from "../../components/upgrader/itemsList/ItemsListContainer";

export const [currentGameId, setCurrentGameId] = createSignal("");
export const [currentGameRoll, setCurrentGameRoll] = createSignal("");
export const [items, setItems] = createSignal([]);
export const [activeItem, setActiveItem] = createSignal();
export const [betValue, setBetValue] = createSignal();
export const [underOver, setUnderOver] = createSignal("Over");
export const [fastSpinner, setFastSpinner] = createSignal(false);
export const [spinning, setSpinning] = createSignal(false);
export const [isGameStarted, setIsGameStarted] = createSignal(false);
export const [isAnimationShown, setIsAnimationShown] = createSignal(false);

export const {socket, toastr, userObject} = injector;

export const bet = () => {
  // spin(0.5, 4000);
  if (betValue() > 0) {
    setIsGameStarted(true);
    socket.emit(
      "upgrader:bet",
      {
        bet: betValue(),
        item: activeItem(),
        type: underOver().toLowerCase(),
        fastSpinner: fastSpinner(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
        if (data.hash) {
          setCurrentGameId(data.hash);
        }
        if (data.roll) {
          setCurrentGameRoll(data.roll);
        }
        if (data.error) {
          setIsGameStarted(false);
        }
      }
    );
  } else {
    setCurrentGameId("");
    setCurrentGameRoll("");
    toastr({
      msg: "Minimum bet is 1 coin",
      error: true,
    });
  }
};

const Upgrader = (props) => {
  const [globalHistory, setGlobalHistory] = createSignal([]);

  // const [isItemsLoaded, setIsItemsLoaded] = createSignal(false);

  const [search, setSearch] = createSignal("");
  const [itemsLimit, setItemsLimit] = createSignal(48);
  const {upgraderPageLoaded, onUpgraderPageLoad} = PageLoadState;

  let observer;

  // const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  const updateItems = (shouldLimitUpdate = true, observerReload = false) => {
    let offset = 0;
    if (shouldLimitUpdate) {
      offset = itemsLimit();
      setItemsLimit((prev) => prev + 48);
    }
    socket.emit(
      "steam:market",
      { search: search(), asc: sortBy() === "ASC", offset, limit: itemsLimit() },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
        if (!data.error) {
          let iv = [];
          for (const item of data.data.inventory) {
            for (let i = 0; i < item.amount; i++) {
              iv.push({
                ...item,
                id: `${item.assetid}_${i}`,
              });
            }
          }
          if (shouldLimitUpdate) {
            iv = [...items(), ...iv];
          }
          if (observerReload || items().length !== data.data.total) {
            if (observer) {
              observer.disconnect();
            }
            setItems([...iv]);
            if (data.data.total > items().length) {
              observer = new IntersectionObserver(
                function (entries) {
                  if (entries[0].isIntersecting === true) {
                    updateItems();
                  }
                },
                { threshold: [0] }
              );
              observer.observe(
                document.querySelector(
                  "[data-upgrader-items-wrapper]"
                ).childNodes.item(items().length - 9)
              );
            }
          } else if (iv[0]?.id !== items()[0]?.id) {
            setItems(iv);
          } else {
            if (observer) {
              observer.disconnect();
            }
          }
        }
      }
    );
  };

  createEffect(() => {
    if (props.loaded()) {
      socket.emit("upgrader:connect", {}, (data) => {
        setGlobalHistory(
          data.globalHistory.filter((val) => val.winnings > 0).slice(0, 4)
        );
        onUpgraderPageLoad(true);
      });
    }
  });

  onMount(() => {
    socket.on("upgrader:history:global", (data) => {
      setGlobalHistory((prev) =>
        [data, ...prev].filter((val) => val.winnings > 0).slice(0, 4)
      );
    });

    updateItems(false);
    socket.on("steam:market:update", () => {
      updateItems(false);
    });

    socket.on("upgrader:spin", (data) => {
      if (!data.error) {
        if (fastSpinner()) {
          spin(data.data.ticket, 5500);
        } else {
          setIsAnimationShown(true);
          setTimeout(() => {
            setIsAnimationShown(false);
            spin(data.data.ticket, 5500);
          }, 3000);
        }
      }
    });
  });

  onCleanup(() => {
    socket.off("steam:market:update");
  });

  return (
    <Fallback loaded={upgraderPageLoaded}>
      <div class="py-12 px-6 h-full flex w-full justify-center item-center">
        <MainUpgraderContainer />
      </div>
    </Fallback>
  );
};

export default Upgrader;
