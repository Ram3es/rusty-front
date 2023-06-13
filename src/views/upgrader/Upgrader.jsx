import {onMount, onCleanup, createSignal, For, createEffect} from "solid-js";

import MainUpgraderContainer from "../../components/upgrader/MainUpgraderContainer";

import injector from "../../injector/injector";

import {
  playDeselectItemSound,
  playSelectItemSound,
} from "../../utilities/Sounds/ItemsSound";

import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";

export const [betAmount, setBetAmount] = createSignal(100);

const Upgrader = ({loaded}) => {
  const {socket, toastr, userObject} = injector;
  let upgraderAnimation;

  let spinner;

  const [betValue, setBetValue] = createSignal("");

  const [items, setItems] = createSignal([]);
  const [globalHistory, setGlobalHistory] = createSignal([]);
  const [isGameStarted, setIsGameStarted] = createSignal(false);

  const [activeItem, setActiveItem] = createSignal({});

  const [over, setOver] = createSignal(true);
  const [fastSpinner, setFastSpinner] = createSignal(false);
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false);

  const [search, setSearch] = createSignal("");
  const [descending, setDescending] = createSignal(false);
  const [currentGameId, setCurrentGameId] = createSignal("");
  const [currentGameRoll, setCurrentGameRoll] = createSignal("");
  const [itemsLimit, setItemsLimit] = createSignal(48);
  const {upgraderPageLoaded, onUpgraderPageLoad} = PageLoadState;

  let pageWrapper;

  const checkImageLoaded = () => {
    const updateStatus = (images) => {
      setIsItemsLoaded(
        images.map((image) => image.complete).every((item) => item === true)
      );
    };

    const imagesLoaded = Array.from(pageWrapper.querySelectorAll("img"));

    if (imagesLoaded.length === 0) {
      setIsItemsLoaded(true);
      return;
    }
    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true,
      });
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true,
      });
    });
  };

  const sendSearchReq = (value) => {
    setSearch(value);
    updateItems(false);
  };

  let observer;

  // const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  const bet = () => {
    if (betValue() >= -1) {
      setIsGameStarted(true);
      socket.emit(
        "upgrader:bet",
        {
          bet: betValue(),
          item: activeItem(),
          type: over() ? "over" : "under",
          fastSpinner:
            window.innerWidth < 551
              ? true
              : window.innerWidth > 1299 && window.innerWidth < 1537
              ? true
              : fastSpinner(),
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
        }
      );
    } else {
      setCurrentGameId("");
      setCurrentGameRoll("");
      toastr({
        msg: "Minimum bet is 50 coins",
        error: true,
      });
    }
  };

  const [spinning, setSpinning] = createSignal(false);

  const spin = (ticket, time) => {
    if (spinning()) return;

    setSpinning(true);
    const isSpinFast =
      window.innerWidth < 551
        ? true
        : window.innerWidth > 1299 && window.innerWidth < 1537
        ? true
        : fastSpinner();
    setTimeout(
      () => {
        setTimeout(() => {
          if (spinner && spinner.style) {
            spinner.style.transform = `rotate(${+360 * 4 + 360 * ticket}deg)`;
            spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
            spinner.style.transitionDuration = `${time / 1000}s`;

            setTimeout(() => {
              setSpinning(false);

              spinner.style.transform = `rotate(${0}deg)`;
              spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
              spinner.style.transitionDuration = `${isSpinFast ? 0 : 2}s`;

              setIsGameStarted(false);
            }, time + 200);
          }
        }, 10);
      },
      isSpinFast ? 10 : 1000 * 3
    );
  };

  const updateItems = (shouldLimitUpdate = true, observerReload = false) => {
    let offset = 0;
    if (shouldLimitUpdate) {
      offset = itemsLimit();
      setItemsLimit((prev) => prev + 48);
    }
    socket.emit(
      "steam:market",
      {search: search(), asc: descending(), offset, limit: itemsLimit()},
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
            observer = new IntersectionObserver(
              function (entries) {
                if (entries[0].isIntersecting === true) {
                  updateItems();
                }
              },
              {threshold: [0]}
            );
            observer.observe(pageWrapper.childNodes.item(items().length - 9));
          } else if (iv[0]?.id !== items()[0]?.id) {
            setItems(iv);
          } else {
            if (observer) {
              observer.disconnect();
            }
          }

          if (!isItemsLoaded()) {
            checkImageLoaded();
          }
        }
      }
    );
  };

  createEffect(() => {
    if (loaded()) {
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
        spin(data.data.ticket, 4000);
      }
    });

    setInterval(() => {
      if (upgraderAnimation) {
        upgraderAnimation.classList.add("animate");
        setTimeout(() => {
          upgraderAnimation.classList.remove("animate");
        }, 4900);
      }
    }, 15000);
  });

  onCleanup(() => {
    socket.off("steam:market:update");
  });

  const setActive = (item) => {
    if (activeItem() == item) {
      playDeselectItemSound();
      return setActive({});
    }

    setActiveItem(item);
    playSelectItemSound();
    setBetValue(0);
  };

  const getBetPercent = (item) => {
    const maxBet =
      activeItem()?.price < userObject.user.balance
        ? 0.9
        : userObject.user.balance / activeItem()?.price;
    if (item === "max") {
      return maxBet;
    } else if (item === "x2") {
      if (activeItem()?.price) {
        const percent = Number(Number(betValue() / activeItem()?.price)) * 2;
        return percent <= maxBet ? percent : maxBet;
      } else {
        return 0;
      }
    } else {
      const tempNumber = activeItem()?.price * (item / 100);
      const finalBet = tempNumber / ((tempNumber * 0.9) / tempNumber);
      const finalPercent = finalBet / activeItem()?.price;
      return finalPercent <= maxBet ? finalPercent : maxBet;
    }
  };

  const inputValueUpdate = (e) => {
    const maxPrice = Math.round(activeItem()?.price * 0.9);
    const maxBet = userObject.user.balance;
    if (activeItem().price) {
      if (maxBet > maxPrice) {
        if (e.currentTarget.value > maxPrice) {
          e.currentTarget.value = maxPrice;
          setBetValue(maxPrice);
        } else {
          setBetValue(e.currentTarget.value);
        }
      } else {
        if (e.currentTarget.value > maxBet) {
          e.currentTarget.value = maxBet;
          setBetValue(maxBet);
        } else {
          setBetValue(e.currentTarget.value);
        }
      }
    } else {
      e.currentTarget.value = 0;
    }
  };

  const changeDescending = () => {
    setDescending((prev) => !prev);
    setItemsLimit(48);
    updateItems(false, true);
  };

  const sorting = {
    descending: {
      en: "Descending",
      es: "Descendiendo",
      ru: "по убыванию",
    },
    ascending: {
      en: "Ascending",
      es: "Ascendente",
      ru: "по возрастанию",
    },
  };

  return (
    <Fallback loaded={upgraderPageLoaded}>
      <div class="py-12 px-6 h-full">
        <MainUpgraderContainer />
      </div>
    </Fallback>
  );
};

export default Upgrader;
