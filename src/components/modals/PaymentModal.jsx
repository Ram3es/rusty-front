import {createEffect, createSignal, onCleanup, onMount, For} from "solid-js";
import injector from "../../injector/injector";
import {URL} from "../../libraries/url";
import Coin from "../../utilities/Coin";
import Modal from "./Modal";
import Brilliants from "../../assets/img/jackpot/brilliants.png";

import RedCoin from "../../assets/img/coinflip/redcoin.svg";

import {NavLink, useNavigate} from "solid-app-router";
import Items from "./Items";

import Giftcard5 from "../../assets/img/giftcards/giftcard5.png";
import Giftcard10 from "../../assets/img/giftcards/giftcard10.png";
import Giftcard25 from "../../assets/img/giftcards/giftcard25.png";
import Giftcard50 from "../../assets/img/giftcards/giftcard50.png";
import Giftcard100 from "../../assets/img/giftcards/giftcard100.png";
import {useI18n} from "../../i18n/context";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import UsdcCryptocurrency from "../../assets/img/modals/usdc_cryptocurrency.png";
import TronLogo from "../../assets/img/modals/tron-logo.png";
import MoneroLogo from "../../assets/img/modals/Monero_logo.png";
import HeaderBg from "../../assets/img/modals/ModalHeaderBg.png";

import clickDepositSound from "../../assets/sounds/deposit.wav";
import Countup from "../../utilities/Countup";
import {
  playDeselectItemSound,
  playSelectItemSound,
} from "../../utilities/Sounds/ItemsSound";
import ImageLoad from "../../utilities/ImageLoad";
import Img from "../../utilities/Img";
import CloseButton from "../elements/CloseButton";
import ArrowBack from "../icons/ArrowBack";
import TransparentButton from "../elements/TransparentButton";
import CaseSearchInput from "../../views/case/CaseSearchInput";
import Dropdown from "../elements/Dropdown";
import PotentialDropItem from "../../views/case/PotentialDropItem";
import RoundedButton from "../elements/RoundedButton";
import YellowGradientButton from "../../components/elements/CaseGradientButton";
const soundClickDeposit = new Audio(clickDepositSound);
const sortOptions = ["ASC", "DESC"];

const PaymentModal = (props) => {
  const i18n = useI18n();

  const {socket, setToggles, userObject, setUserObject, toastr} = injector;
  const navigate = useNavigate();

  const [items, setItems] = createSignal([]);
  const [itemCache, setItemCache] = createSignal([]);
  const [activeItems, setActiveItems] = createSignal([]);
  const [itemsTotal, setItemsTotal] = createSignal(0);
  const [code, setCode] = createSignal("");

  const [crypto, setCrypto] = createSignal({});

  const [settings, setSettings] = createSignal({
    value: 0,
    amount: 0,
  });
  const [search, setSearch] = createSignal("");

  const [descending, setDescending] = createSignal(false);

  const [wager, setWager] = createSignal(0);
  const [itemsLimit, setItemsLimit] = createSignal(48);

  const [isItemsRefresh, setIsItemsResresh] = createSignal(false);

  let observer;
  let typingTimer;
  let spinArrow;
  let id = null;

  onCleanup(() => {
    socket.off("steam:market:update");
    socket.off("inventory:refresh:force");
  });

  createEffect(() => {
    let temp = {
      value: 0,
      amount: 0,
    };

    for (const item of activeItems()) {
      temp.amount++;
      temp.value += item.price;
    }
    setSettings(temp);
    if (props.searchParams?.deposit && props.searchParams?.crypto && props.searchParams.method) {
      socket.emit(
        "crypto:address:get",
        {
          ticker: props.searchParams.method,
        },
        (data) => {
          if (!data.error) {
            setCrypto(data.data);
          }
        }
      );
    }
  });

  const refresh = () => {
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (pos == 360) {
        clearInterval(id);
      } else {
        pos += 10;
        spinArrow.style.transform = `rotate(-${pos}deg)`;
      }
    }

    // setIsItemsResresh(true);
    // setItems([]);

    socket.emit("steam:inventory:refresh", {asc: descending()}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (data.error) {
        setItems(itemCache());
      }

      if (
        (!data.error &&
          props.searchParams?.deposit &&
          props.searchParams?.items) ||
        props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
      ) {
        setItems(data.data.items);
        setItemCache(data.data.items);
        setActiveItems([]);
      }
      setIsItemsResresh(false);
    });
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
        setItemsTotal(0);
        setWager(data.data?.wager || 0);
        if (data.msg) {
          toastr(data);
        }

        if (!data.error && data.data?.inventory?.length > 0) {
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
            if (props.searchParams?.withdraw) {
              setItems(iv);
              setItemsTotal(20);
            }
            observer = new IntersectionObserver(
              function (entries) {
                if (entries[0].isIntersecting === true) {
                  updateItems();
                }
              },
              {threshold: [0]}
            );
            const items = document.querySelectorAll("[data-withdrow-item]");
            if (items[items.length - 1] && items.length > 9) {
              observer.observe(items[items.length - 9]);
            }
          } else if (iv[0]?.id && items()[0] && iv[0].id !== items()[0].id) {
            if (props.searchParams?.withdraw) setItems(iv);
          } else {
            if (observer) {
              observer.disconnect();
            }
          }
        } else {
          if (observer) {
            observer.disconnect();
          }
        }
      }
    );
  };

  const updateInventory = () => {
    if (!isItemsRefresh()) {
      socket.emit("steam:inventory", {asc: descending()}, (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (
          (!data.error &&
            data.data &&
            props.searchParams?.deposit &&
            props.searchParams?.items) ||
          props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
        ) {
          if (data.data?.items?.length > 0) {
            setItems(data.data.items);
            setItemCache(data.data.items);
            setActiveItems([]);
          }
        }
      });
    }
  };

  onMount(() => {
    if (
      ((props.searchParams?.deposit && props.searchParams?.items) ||
        props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT) &&
      items().length === 0
    ) {
      updateInventory();
    } else if (props.searchParams?.withdraw && items().length === 0) {
      updateItems(false);
    } else if (!props.searchParams?.withdraw) {
      setItemsLimit(45);
    }

    socket.on("steam:market:update", () => {
      updateItems(false);
    });

    if (
      (props.searchParams?.deposit && props.searchParams?.items) ||
      props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
    ) {
      socket.on("inventory:refresh:force", (data) => {
        if (data.msg) toastr(data);

        if (!data.error) {
          setItems(data.data.items);
          setItemCache(data.data.items);
          setActiveItems([]);
        }
      });
    }
  });

  const toggle = (item) => {
    //setItems((prev) => prev.map((item) => (item.id == itemId ? {...item, active: !item.active} : item)))
    setActiveItems((prev) => {
      const index = prev.findIndex((i) => {
        return item.id === i.id;
      });


      if (
        !props.searchParams?.withdraw ||
        (props.searchParams?.withdraw && activeItems().length < 20)
      ) {
        playSelectItemSound();
        if (index === -1) return [...prev, item];
      }
      const copy = [...prev];
      if (index > -1) copy.splice(index, 1);
      playDeselectItemSound();
      return copy;
    });
  };

  const deposit = (jackpot) => {
    const selectedItems = activeItems();
    if (selectedItems.length > 0 && selectedItems.length < 30) {
      if (userObject?.user?.sounds) {
        soundClickDeposit.currentTime = 0;
        soundClickDeposit.volume = userObject.user.sounds;
        soundClickDeposit.play();
      }

      socket.emit(
        jackpot ? "jackpot:deposit" : "steam:deposit",
        {
          items: selectedItems.map((item) => item.id),
        },
        (data) => {
          if (data.msg) {
            toastr(data);
          }

          if (!data.error && data?.data?.link) {
            if (jackpot) {
              navigate(URL.GAMEMODES.JACKPOT, {replace: true});
            }

            setToggles("tradeModal", true);
            setUserObject("trades", (prev) => [
              ...prev,
              {
                link: data.data.link,
                type: "deposit",
                expires: Date.now() + 1000 * 60 * 5,
              },
            ]);
          }
        }
      );
    }
  };

  const withdraw = () => {
    const selectedItems = activeItems();
    if (selectedItems.length > 0 && selectedItems.length < 30) {
      const toSend = {};
      for (const item of selectedItems) {
        if (!toSend[item.assetid]) toSend[item.assetid] = 0;
        toSend[item.assetid] += 1;
      }

      socket.emit(
        "steam:withdraw",
        {
          items: toSend,
        },
        (data) => {
          if (data.msg) {
            toastr(data);
          }
        }
      );
    }
  };

  const giftcardDeposit = () => {
    socket.emit(
      "giftcard:deposit",
      {
        code: code(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  const cryptomethods = {
    btc: {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#F7931A" />
          <path
            d="M16.5396 13.2809C17.461 13.0634 18.1598 12.4514 18.3291 11.196C18.5681 9.47984 17.3036 8.58212 15.4891 7.98123L16.0403 5.65782L14.6 5.31234L14.0641 7.57121C13.69 7.48148 13.3044 7.39872 12.9188 7.31596L13.459 5.03866L12.0188 4.69318L11.4676 7.0166C10.9343 6.90535 10.3194 6.74972 8.57773 6.32341L8.21904 7.83545C9.36087 8.08837 9.97459 8.15945 9.94077 8.91105L8.43161 15.2728C8.20951 15.8222 7.76603 15.6291 6.73951 15.3639L6.04938 16.9816C8.67541 17.6115 8.93704 17.684 8.93704 17.684L8.46502 19.6737L9.90528 20.0192L10.3707 18.0571C10.7613 18.1605 11.1448 18.2525 11.5095 18.34L11.0463 20.2929L12.4865 20.6383L12.9585 18.6486C15.402 19.0983 17.1572 18.8859 17.9038 16.6971C18.4986 14.9396 17.8285 13.9311 16.5396 13.2809ZM12.5532 8.98225C13.3668 9.17742 15.9697 9.5387 15.5738 11.2075C15.1954 12.8025 12.6954 12.0079 11.8817 11.8128L12.5532 8.98225ZM10.8056 16.3489L11.5449 13.2326C12.5175 13.4659 15.5594 13.913 15.1263 15.7385C14.7085 17.4995 11.7782 16.5822 10.8056 16.3489Z"
            fill="white"
          />
        </svg>
      ),
      name: "bitcoin",
      color: "#F7931A",
      link: "?deposit=true&crypto=true&method=btc",
    },
    bch: {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#4ABE4F" />
          <path
            d="M15.9644 13.2809C16.8858 13.0634 17.5846 12.4514 17.7539 11.196C17.9929 9.47984 16.7284 8.58212 14.9139 7.98123L15.4651 5.65782L14.0248 5.31234L13.4889 7.57121C13.1148 7.48148 12.7292 7.39872 12.3436 7.31596L12.8838 5.03866L11.4436 4.69318L10.8924 7.0166C10.3591 6.90535 9.74421 6.74972 8.00254 6.32341L7.64384 7.83545C8.78567 8.08837 9.3994 8.15945 9.36558 8.91105L7.85642 15.2728C7.63431 15.8222 7.19083 15.6291 6.16431 15.3639L5.47418 16.9816C8.10021 17.6115 8.36184 17.684 8.36184 17.684L7.88982 19.6737L9.33008 20.0192L9.79554 18.0571C10.1861 18.1605 10.5696 18.2525 10.9343 18.34L10.4711 20.2929L11.9113 20.6383L12.3833 18.6486C14.8268 19.0983 16.582 18.8859 17.3286 16.6971C17.9234 14.9396 17.2533 13.9311 15.9644 13.2809ZM11.978 8.98225C12.7916 9.17742 15.3945 9.5387 14.9986 11.2075C14.6202 12.8025 12.1202 12.0079 11.3065 11.8128L11.978 8.98225ZM10.2304 16.3489L10.9697 13.2326C11.9423 13.4659 14.9842 13.913 14.5511 15.7385C14.1333 17.4995 11.203 16.5822 10.2304 16.3489Z"
            fill="white"
          />
        </svg>
      ),
      name: "bitcoin cash",
      color: "#4ABE4F",
      link: "?deposit=true&crypto=true&method=bch",
    },
    eth: {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#6481E7" />
          <path
            d="M7 12.6908L12.5 4L17.9999 12.6908L12.5 15.8511L7 12.6908Z"
            fill="white"
          />
          <path d="M12.5 4L18 12.6908L12.5 15.8511V4Z" fill="#CCCCCC" />
          <path
            d="M7 13.876L12.5 17.0363L17.9999 13.876L12.5 21.3817L7 13.876Z"
            fill="white"
          />
          <path
            d="M12.5 17.0364L17.9999 13.8761L12.5 21.3818V17.0364ZM7 12.691L12.5 10.3208L17.9999 12.691L12.5 15.8513L7 12.691Z"
            fill="#CCCCCC"
          />
          <path
            d="M12.5 10.3208L18 12.691L12.5 15.8513V10.3208Z"
            fill="#A9A9A9"
          />
        </svg>
      ),
      name: "ethereum",
      color: "#6481E7",
      link: "?deposit=true&crypto=true&method=eth",
    },
    ltc: {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#BFBBBB" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.22314 14.8123L7 15.297L7.58971 12.8829L8.82743 12.3754L10.6111 5H15.0074L13.7054 10.4215L14.914 9.92188L14.3311 12.3281L13.108 12.8277L12.3811 15.8754H19L18.2517 19H7.216L8.22314 14.8123Z"
            fill="white"
          />
        </svg>
      ),
      name: "litecoin",
      color: "#BFBBBB",
      link: "?deposit=true&crypto=true&method=ltc",
    },
    "erc20/usdt": {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#26A17B" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.0252 13.5261V13.5245C13.9397 13.5308 13.4994 13.5575 12.5171 13.5575C11.7328 13.5575 11.1806 13.5339 10.9865 13.5245V13.5268C7.96723 13.3923 5.71366 12.8595 5.71366 12.2221C5.71366 11.5855 7.96723 11.0528 10.9865 10.9159V12.9965C11.1837 13.0106 11.7491 13.0445 12.5303 13.0445C13.4676 13.0445 13.9374 13.0051 14.0252 12.9972V10.9174C17.0382 11.0536 19.2863 11.5863 19.2863 12.2221C19.2863 12.8595 17.0382 13.3907 14.0252 13.5261ZM14.0252 10.701V8.83919H18.2294V6H6.7822V8.83919H10.9865V10.7002C7.56963 10.8592 5 11.5454 5 12.3669C5 13.1885 7.56963 13.8739 10.9865 14.0336V20H14.0252V14.032C17.4366 13.8731 20 13.1877 20 12.3669C20 11.5462 17.4366 10.8608 14.0252 10.701Z"
            fill="white"
          />
        </svg>
      ),
      name: "tether-ERC20",
      color: "#26A17B",
      link: "?deposit=true&crypto=true&method=erc20/usdt",
    },
    "trc20/usdt": {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill="#EC0927" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.0252 13.5261V13.5245C13.9397 13.5308 13.4994 13.5575 12.5171 13.5575C11.7328 13.5575 11.1806 13.5339 10.9865 13.5245V13.5268C7.96723 13.3923 5.71366 12.8595 5.71366 12.2221C5.71366 11.5855 7.96723 11.0528 10.9865 10.9159V12.9965C11.1837 13.0106 11.7491 13.0445 12.5303 13.0445C13.4676 13.0445 13.9374 13.0051 14.0252 12.9972V10.9174C17.0382 11.0536 19.2863 11.5863 19.2863 12.2221C19.2863 12.8595 17.0382 13.3907 14.0252 13.5261ZM14.0252 10.701V8.83919H18.2294V6H6.7822V8.83919H10.9865V10.7002C7.56963 10.8592 5 11.5454 5 12.3669C5 13.1885 7.56963 13.8739 10.9865 14.0336V20H14.0252V14.032C17.4366 13.8731 20 13.1877 20 12.3669C20 11.5462 17.4366 10.8608 14.0252 10.701Z"
            fill="white"
          />
        </svg>
      ),
      name: "tether-TRX",
      color: "#EC0927",
      link: "?deposit=true&crypto=true&method=trc20/usdt",
    },
    "erc20/usdc": {
      icon: (
        <img
          class="w-[20px] h-[20px]"
          src={UsdcCryptocurrency}
          alt="UsdcCryptocurrency"
        />
      ),
      name: "USDC-ERC",
      color: "#2775CA",
      link: "?deposit=true&crypto=true&method=erc20/usdc",
    },
    trx: {
      icon: <img class="w-[20px] h-[20px]" src={TronLogo} alt="TronLogo" />,
      name: "tron",
      color: "#EC0927",
      link: "?deposit=true&crypto=true&method=trx",
    },
    xmr: {
      icon: <img class="w-[20px] h-[20px]" src={MoneroLogo} alt="MoneroLogo" />,
      name: "monero",
      color: "#BFBBBB",
      link: "?deposit=true&crypto=true&method=xmr",
    },
  };

  const changeDescending = () => {
    setDescending((prev) => !prev);
    if (
      props.searchParams?.deposit ||
      props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
    ) {
      updateInventory();
    } else if (props.searchParams?.withdraw) {
      updateItems(false, true);
    }
  };

  const updateSearch = (searchStr) => {
    setSearch(searchStr);
    if (
      props.searchParams?.deposit ||
      props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
    ) {
      updateInventory();
    } else if (props.searchParams?.withdraw) {
      updateItems(false, true);
    }
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

  const buttonName = {
    deposit: {
      en: "deposit",
      es: "deposita",
      ru: "Пополнить",
    },
    withdraw: {
      en: "withdraw",
      es: "sacar",
      ru: "вывести",
    },
  };

  onCleanup(() => {
    socket.off("steam:market:update");
  });

  return (
    <Modal
      open={() => {
        return true;
      }}
      style={"flex justify-center pt-12"}
      handler={props.handler}
      noContainer={true}
    >
      <NavLink
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={() => setItems([])}
        href={`${
          props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
            ? URL.GAMEMODES.JACKPOT
            : props.pathname()
        }`}
      />
      <div
        class={`flex flex-col z-10 relative w-11/12 transition-all overflow-hidden`}
        style={{
          "max-width": !props.searchParams?.crypto ? "1496px" : "830px",
          "max-height": "90vh",
        }}
      >
        <div
          class={`flex flex-col z-10 relative w-full rounded-12 transition-all overflow-hidden ${
            !props.searchParams?.withdraw &&
            !props.searchParams?.deposit &&
            props.pathname() !== URL.GAMEMODES.JACKPOT_DEPOSIT
              ? ""
              : "-translate-y-0"
          } duration-100 ease-out`}
          style={
            {
              // 'backdrop-filter': 'blur(20px)'
            }
          }
        >
          <div
            class={`w-full flex-1 overflow-hidden overflow-y-scroll relative flex flex-col`}
            style={{
              background:
                "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
              // 'backdrop-filter': 'blur(8px)'
            }}
          >
            <div
              class="flex relative w-full items-start lg:items-center justify-between pl-4 pr-8 lg:pr-0 lg:px-8  py-4 lg:py-6 bg-cover border border-black border-opacity-10 rounded-t-12 "
              style={{
                background:
                  "linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)",
              }}
            >
              <div class="center gap-3 flex-col lg:flex-row">
                <NavLink href={`${props.pathname()}?deposit=true`}>
                  <div class="flex gap-2 items-center p-[7.5px] lg:p-3 border-2 border-white border-opacity-5 rounded-4 drop-shadow w-max">
                    <ArrowBack />
                    <span class="font-SpaceGrotesk text-14 text-gray-9a">
                      Back to Methods
                    </span>
                  </div>
                </NavLink>
                <div class="flex flex-col">
                  <div
                    class={`${
                      props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                        ? "opacity-0"
                        : ""
                    } flex items-center gap-1 font-SpaceGrotesk`}
                  >
                    <div class="text-gray-9a text-12 font-medium capitalize">
                      {props.searchParams?.deposit ? "deposit" : "withdraw"}
                    </div>
                    <p class="text-gray-9a text-12 font-medium capitalize">{`>`}</p>
                    <p class="text-gray-9a text-12 font-medium capitalize">
                      {props.searchParams?.giftcard
                        ? "giftcards"
                        : props.searchParams?.crypto
                        ? cryptomethods[props.searchParams?.method]?.name || ""
                        : "Rust"}
                    </p>
                  </div>
                  <div class="w-full flex justify-between items-center gap-2">
                    <p
                      class={`text-20 text-white font-bold font-SpaceGrotesk uppercase truncate ${
                        props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {props.searchParams?.deposit ? "deposit" : "withdraw"}{" "}
                      {props.searchParams?.crypto
                        ? cryptomethods[props.searchParams?.method]?.name || ""
                        : props.searchParams?.giftcard
                        ? "with gift cards"
                        : "items"}
                    </p>
                    <p
                      class={`text-24 text-white font-medium font-Oswald uppercase truncate ${
                        props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                          ? ""
                          : "hidden"
                      }`}
                    >
                      {i18n.t("jackpot.Jackpot deposit")}
                    </p>
                    {props.searchParams?.crypto ? (
                      <div
                        class={`text-[#3EFF8B] text-12 px-1 py-0.5 rounded-l-4`}
                        style={{
                          background:
                            "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                        }}
                      >
                        +40%
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <NavLink
                href={`${
                  props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                    ? URL.GAMEMODES.JACKPOT
                    : props.pathname()
                }`}
                onClick={() => setItems([])}
                class="center"
              >
                <CloseButton />
              </NavLink>
            </div>
            <div class="flex flex-col xl:flex-row">
              <div
                class={`w-full ${
                  props.searchParams?.items ||
                  props.searchParams?.withdraw ||
                  props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                    ? "flex"
                    : "hidden"
                } flex-col gap-4 lg:gap-8 px-4 lg:px-8 pb-2 relative py-2`}
              >
                <div class="w-full h-20 lg:h-10 flex flex-col items-end lg:flex-row justify-between gap-2 relative z-10">
                  <div class="w-full lg:w-max flex gap-2 h-full">
                    <div class="w-full flex-1 h-full bg-dark-1c">
                      <div class="w-full lg:w-80">
                        <CaseSearchInput
                          search={search()}
                          onReset={() => setSearch("")}
                          onInput={(text) => updateSearch(text)}
                          isFullWidth
                        />
                      </div>
                    </div>
                    <Dropdown
                      activeName={
                        descending() ? sortOptions[0] : sortOptions[1]
                      }
                      itemsList={sortOptions}
                      submitItem={() => changeDescending()}
                      label=" Sort by Price:"
                    />
                  </div>
                  {props.searchParams?.withdraw && (
                    <div class="w-full  lg:w-max balance-bg rounded-4 flex items-center drop-shadow-dark">
                      <div class="w-full lg:w-max  bg-black bg-opacity-10 rounded-4 h-[calc(100%-4px)] flex m-0.5 ">
                        <div class="w-full justify-center lg:justify-start h-full px-3 bg-cover py-1 text-16 text-gray-e0 rounded-4 flex gap-2 items-center font-Lato font-bold">
                          <Coin width="6" />
                          <p class="text-gradient text-16 font-medium font-Oswald">
                            <Countup props={userObject?.user?.balance || 0} />
                          </p>
                          <p class="text-gradient text-14">Balance</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {(props.searchParams?.deposit ||
                    props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT) && (
                    <div class="balance-bg rounded-4 flex items-center drop-shadow-dark">
                      <div class="bg-black bg-opacity-10 rounded-4 h-[calc(100%-4px)] flex m-0.5 ">
                        <div class=" w-full h-full px-3 bg-cover py-1 text-16 text-gray-e0 rounded-4 flex gap-2 items-center font-Lato font-bold">
                          <Coin width="6" />
                          <p class="text-gradient text-16 font-medium font-Oswald">
                            {items()
                              .reduce((prev, cur) => (prev += cur.price), 0)
                              .toLocaleString()}
                          </p>
                          <p class="text-gradient text-14 uppercase">
                            Inventory Value
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Items
                  withdraw={props.searchParams?.withdraw}
                  disabled={props.searchParams?.withdraw && wager() > 0}
                  items={() => {
                    return search()
                      ? items().filter((item) =>
                          String(item.name)
                            .toLowerCase()
                            .includes(String(search()).toLowerCase())
                        )
                      : items();
                  }}
                  toggle={toggle}
                  activeItems={activeItems}
                />
              </div>
              <div
                class={`min-w-[288px] ${
                  props.searchParams?.crypto ? "hidden" : "flex"
                } flex-col justify-center sm:justify-end items-center gap-3  border border-white/[0.04]`}
                style={{
                  background:
                    "linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)",
                }}
              >
                <div
                  class={`h-10 w-52 bg-dark-22 px-4 ${
                    props.searchParams?.giftcard ? "flex" : "hidden"
                  } justify-between items-center`}
                >
                  <p class="text-14 text-white font-medium font-Oswald">
                    $1.00
                  </p>
                  <svg
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.799995 7.31256L13.2687 7.31256L9.03434 11.6132C8.72194 11.9304 8.72194 12.4448 9.03434 12.762C9.34674 13.0793 9.85334 13.0793 10.1657 12.762L15.7657 7.07449C16.0781 6.75721 16.0781 6.24269 15.7657 5.92561L10.1657 0.238063C10.0095 0.0794216 9.80474 5.25096e-07 9.59994 5.34048e-07C9.39534 5.42991e-07 9.19054 0.0794216 9.03434 0.238063C8.72194 0.555348 8.72194 1.06987 9.03434 1.38695L13.2687 5.68754L0.799995 5.68754C0.358397 5.68754 -3.03735e-07 6.05134 -2.84122e-07 6.50005C-2.64508e-07 6.94876 0.358198 7.31256 0.799995 7.31256Z"
                      fill="#8C98A9"
                    />
                  </svg>
                  <div class="center gap-2">
                    <img alt="red-coin" src={RedCoin} class="h-5" />
                    <p class="text-14 text-white font-medium font-Oswald">
                      1 300
                    </p>
                    <p class="text-14 text-yellow-ff font-medium font-Oswald">
                      (+30%)
                    </p>
                  </div>
                </div>
                <div
                  class={`${
                    props.searchParams?.crypto || props.searchParams?.giftcard
                      ? "hidden"
                      : "flex"
                  } w-full flex-col min-h-full py-8 justify-between items-center gap-2 sm:gap-4 md:gap-8`}
                >
                  <div class="hidden lg:flex flex-col gap-2 max-h-[45vh] overflow-y-scroll border-b border-black/10 h-full px-8">
                    <For each={activeItems()}>
                      {(item, index) => (
                        <div class="relative">
                          <div class="absolute right-0.5 top-0.5 z-20">
                            <RoundedButton onClick={() => toggle(item)}>
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
                          <PotentialDropItem
                            skin={item}
                            isHorizontal={true}
                            optimiseOff
                          />
                        </div>
                      )}
                    </For>
                  </div>
                  <div class="center flex-col w-full px-8 gap-3">
                    <div class="center gap-2 p-3 w-full border rounded-4 border-white/10">
                      <div class="flex gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                        <span class="text-white">
                          {settings().amount}
                          {itemsTotal() > 0 && ` / ${itemsTotal()}`} items
                        </span>
                        <span>worth</span>
                        <Coin width="5" />
                        <span class="text-gradient">
                          {Number(settings().value).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div class="flex item-center justify-end sm:justify-center w-full">
                      <div
                        class={`w-40 sm:w-32 md:w-52 h-9 bg-dark-20 relative ${
                          props.searchParams?.giftcard ? "center" : "hidden"
                        }`}
                      >
                        <input
                          class="w-full h-full pr-2 pl-4 text-11 text-white font-medium placeholder-gray-72"
                          placeholder="Enter gift-card code..."
                          value={code()}
                          onInput={(e) => {
                            setCode(e.currentTarget.value);
                          }}
                        />
                      </div>
                      <div class='w-full'>
                      <YellowGradientButton
                        isFullWidth={true}
                        callbackFn={() => {
                          props.searchParams?.deposit &&
                          props.searchParams?.giftcard
                            ? giftcardDeposit()
                            : props.searchParams?.deposit
                            ? deposit()
                            : props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                            ? deposit(true)
                            : withdraw();
                        }}
                      >
                        <div class="justify-center flex capitalize gap-2 text-14 font-SpaceGrotesk font-bold text-yellow-ffb items-center">
                          {props.searchParams?.giftcard
                            ? "redeem"
                            : props.searchParams?.deposit ||
                              props.pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                            ? buttonName.deposit[i18n.language]
                            : buttonName.withdraw[i18n.language]}
                        </div>
                      </YellowGradientButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class={`w-full ${
                props.searchParams?.crypto ? "flex" : "hidden"
              } flex-col gap-8 pb-12`}
            >
              <div class="flex relative w-full items-center py-4 px-8 border-b border-black/10 gap-1 flex-wrap">
                <For each={Object.keys(cryptomethods)}>
                  {(m) => (
                    <NavLink href={cryptomethods[m].link}>
                      <TransparentButton
                        isActive={m === props.searchParams?.method}
                        style={{
                          padding: "8px 12px",
                        }}
                        callbackFn={() => {}}
                      >
                        <div
                          class={`w-8 h-6 rounded-3 center`}
                          style={{
                            background: cryptomethods[m].color,
                          }}
                        >
                          {cryptomethods[m]?.icon}
                        </div>
                      </TransparentButton>
                    </NavLink>
                  )}
                </For>
              </div>
              <div class="w-full center flex-col gap-6">
                <div
                  class="p-3 rounded-8 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                  }}
                >
                  <div class="w-44 h-44 bg-white">
                    <Img
                      style="w-full h-full min-w-full"
                      src={`data:image/png;base64,${crypto()?.QRcode || ""}`}
                    />
                  </div>
                </div>
                <div class="center flex-col gap-2 flex-1 bg-white/[0.02] px-8 py-4">
                  <div class="center flex-col w-full">
                    <p class="text-14 text-gray-9a font-bold font-SpaceGrotesk capitalize">
                      {cryptomethods[props.searchParams?.method]?.name} deposit
                      address
                    </p>
                    <p class="text-[#646683]">
                      You can send any amount of{" "}
                      {cryptomethods[props.searchParams?.method]?.name} to this
                      address and receive equivalent in RustyLoot balance.
                    </p>
                    <div
                      class="w-full max-w-md p-[2px] rounded-[4px] h-full mt-1"
                      style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                 radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                 linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                 radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                 linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                 
                 "
                    >
                      <div
                        class="flex w-full p-2 rounded-[4px] justify-between items-center h-full"
                        style="background: radial-gradient(100% 930% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%),
                   radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%),
                   linear-gradient(84.53deg, rgba(255, 138, 54, 0.16) 0%, rgba(0, 0, 0, 0) 15.36%),
                   radial-gradient(50% 465% at 0% 50%, rgba(255, 178, 54, 0.08) 0%, rgba(0, 0, 0, 0) 100%),
                   linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)),
                   linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02));
                   
                             "
                        onClick={() => {
                          if (crypto()?.address) {
                            navigator.clipboard.writeText(crypto()?.address);
                            toastr({msg: "Copied"});
                          }
                        }}
                      >
                        <p class="text-14 text-white font-normal">
                          {crypto()?.address}
                        </p>
                        {crypto()?.address && (
                          <div class="bg-gray-button-gradient p-2 rounded-4 border border-white/10">
                            <svg
                              class="w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              id="Layer_1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 460 460"
                              style={{"enable-background": "new 0 0 460 460"}}
                              fill="#8C98A9"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272     c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729     c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z" />
                                    <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272     c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068     c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001     C291.206,428.715,289.92,430,288.341,430z" />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p class="text-14 text-white font-semibold">
                    Send any amount of{" "}
                    {cryptomethods[props.searchParams?.method]?.name} to the
                    address above, and it'll be converted to site balance. 3
                    confirmation(s) required.
                  </p>
                </div>
              </div>
              {/* <div class="w-full bg-dark-1c h-16 center">
                              <div class="w-10/12 h-9 center gap-4">
                                  <div class="">

                                  </div>
                              </div>
                          </div> */}
            </div>
            <div
              class={`w-full ${
                props.searchParams?.giftcard ? "flex" : "hidden"
              } flex-col gap-2 pb-12`}
            >
              <p class="text-12 text-gray-72 font-medium">
                Click on a giftcard to be redirected to our provider{" "}
              </p>
              <div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <For
                  each={[
                    {img: Giftcard5, link: "9"},
                    {img: Giftcard10, link: "11"},
                    {img: Giftcard25, link: "10"},
                    {img: Giftcard50, link: "13"},
                    {img: Giftcard100, link: "12"},
                  ]}
                >
                  {(val) => (
                    <div class="relative hover rounded-4 overflow-hidden border border-white hover:border-yellow-ff duration-200 border-opacity-10">
                      <div
                        class="w-24 h-5 absolute -right-7 top-3 transform rotate-45 center"
                        style={{
                          background:
                            "radial-gradient(50% 50% at 50% 50%, #FFC701 47.4%, #FFA401 94.79%)",
                          "box-shadow": "0px 2px 6px rgba(0, 0, 0, 0.19)",
                        }}
                      >
                        <p class="text-12 text-white font-medium font-Oswald">
                          +30%
                        </p>
                      </div>
                      <img
                        alt="zebras"
                        class=""
                        src={val.img}
                        onClick={() =>
                          window.open(
                            `https://zebrasmarket.com/product?id=${val.link}`
                          )
                        }
                      />
                    </div>
                  )}
                </For>
              </div>

              {/* <div class="w-full h-9 flex gap-2">
                              
                              <div class="relative center cursor-pointer hover" onClick={() => {giftcardDeposit()}}>
                                  <svg class="h-full" viewBox="0 0 146 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H0V12L4 19.5789L0 28V40H36.5L39.5 38.5L42 40L44.5 38.5L47 39L54 40H65L69.5 36L70.3125 39L72 37.5L73.5 40H146V36L145 34.5L146 32L143.5 27L146 24V19.5L143 18L144 17L145.5 15.5L142 14L146 11V0H74L68.5 1.5L63 0H29.5L27 3.5L21.5 0H17.5L16.5 1L14 2.5L12 1L10.5 3.5L8 0Z" fill="#FFC701"/>
                                  </svg>
                                  <p class="absolute text-14 text-dark-16 font-medium font-Oswald uppercase">Redeem</p>
                              </div>
                          </div> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
