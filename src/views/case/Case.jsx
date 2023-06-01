import { NavLink } from "solid-app-router";
import { onMount, createSignal, For, createEffect } from "solid-js";
import { API, URL } from "../../libraries/url";
import injector from "../../injector/injector";

import Bg from "../../assets/img/case/bg.png";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import ItemSpinnerBg from "../../components/ItemSpinnerBg";
import ItemSplash from "../upgrader/itemSplash.svg";
import Coin from "../../utilities/Coin";

import PotentialDropItem from './PotentialDropItem' 

import HeaderBg from "../../assets/img/modals/ModalHeaderBg.png";
import BestDrops from "./BestDrops";
import RecentDrops from "./RecentDrops";
import dayjs from "dayjs";

const Case = (props) => {
  let spinner;
  let wonItem;
  let wonPrice;

  const { socket, toastr } = injector;

  const [rollCase, setRollCase] = createSignal();
  const [rollItems, setRollItems] = createSignal([]);
  const [recentDrops, setRecentDrops] = createSignal([])
  const [clientSeed, setClientSeed] = createSignal("");
  const [serverSeed, setServerSeed] = createSignal("");
  const [rollTicket, setRollTicket] = createSignal("");
  const [isRollTicketShown, setIsRollTicketShown] = createSignal(false);
  const [isCaseAlreadyOpened, setIsCaseAlreadyOpened] = createSignal(false);
  const [isCaseCanBeOpen, setIsCaseCanBeOpen] = createSignal(false);
  const [discordUserConnected, setDiscordUserConnected] = createSignal();
  const [caseStatistic, setCaseStatistic] = createSignal();

  const [timeLeft, setTimeLeft] = createSignal("00:00:00:00");

  const [isPageLoaded, setIsPageLoaded] = createSignal(false)

  const ranksBorderColor = {
    default: "from-bronze-a1 to-bronze-5e",
    bronze: "from-bronze-e1 to-bronze-a1",
    silver: "from-silver-d9 to-silver-8a",
    gold1: "from-gold-ff to-gold-e3",
    gold2: "from-gold-ff to-gold-e3",
    gold3: "from-gold-ff to-gold-e3",
    platinum1: "from-platinum-c8 to-platinum-34",
    platinum2: "from-platinum-c8 to-platinum-34",
    platinum3: "from-platinum-c8 to-platinum-34",
    diamond: "from-diamond-ca to-diamond-64",
  };

  const spin = (time) => {

    if (spinner && spinner.style) {
      spinner.style.transform = `translateX(0rem)`;
      spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
      spinner.style.transitionDuration = `0s`;
    }

    setTimeout(() => {
      if (spinner && spinner.style) {
        spinner.style.transform = `translateX(${-7 * 78}rem)`;
        spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
        spinner.style.transitionDuration = `${time / 1000}s`;
        // wonPrice.classList.remove('block');
        // wonPrice.classList.add('hidden');
        setTimeout(() => {
          wonItem.style.opacity = 1;
          // wonPrice.classList.remove('hidden');
          // wonPrice.classList.add('block');
          setIsRollTicketShown(true);
        }, 8000);
      }
    }, 10);
  };

  const countdown = () => {
    if (isCaseAlreadyOpened()) {
      const left = Math.floor((isCaseAlreadyOpened() - Date.now() || 0) / 1000);

      const days = Math.floor(left / (24 * 3600));
      const hours = Math.floor((left % (24 * 3600)) / 3600);
      const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60);
      const seconds = (left % (24 * 3600)) % 60;

      setTimeLeft(
        `${`0${days}`.slice(-2)}:${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(
          -2
        )}:${`0${seconds}`.slice(-2)}`
      );
    }
  };

  setInterval(countdown, 1000);

  const itemsUpdate = () => {
    socket.emit("rewards:case", { caseId: Number(props.searchParams.id) }, (data) => {
      setClientSeed(data.client_seed);
      setServerSeed(data.server_seed);
      setRollCase(data.cs);
      setIsCaseCanBeOpen(data.canBeOpen);
      
      setDiscordUserConnected(data.isUserOnServer);
      
      setIsCaseAlreadyOpened(Number(Date.parse(data.isCaseOpenedToday)) + 1000 * 60 * 60 * 24);
      
      countdown();

      if (data.cs) {
        let rundomItems = [];
        for (let i = 0; i <= 100; i++) {
          const randomItem =
            data.cs.items[Math.floor(Math.random() * data.cs.items.length)];
          rundomItems.push({
            image: randomItem?.image || "",
            price: randomItem?.price || 0,
          });
        }
        setRollItems(rundomItems);
      }

      setRecentDrops(data.recentDrops)

    });
    if (Number(props.searchParams.id) === 1) {
      socket.emit("rewards:statistic", {}, (data) => {
        setCaseStatistic(data.statistic);
      });
    } else {
      setCaseStatistic({});
    }
  };

  createEffect(() => {
    if(props?.loaded()) {
      itemsUpdate();
    }
  });

  const startGame = () => {
    socket.emit(
      "rewards:case:open",
      { caseId: Number(props.searchParams.id) },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
        if (data.error) return;
        if (data.item) {
          setIsRollTicketShown(false);
          setRollTicket(data.roll);
          setRollItems((prev) => {
            let newItems = [...prev];
            newItems[87] = { image: data.item.image, price: data.item.price };
            return newItems;
          });
          spin(8000);
          setIsCaseAlreadyOpened(Date.now() + 1000 * 60 * 60 * 24);
          setIsCaseCanBeOpen(false);
        }
      }
    );
  };

  const getItemLiderCard = (rall) => {
    const wonItem = rollCase()?.items[
      rollCase()?.items?.findIndex(
        (item) =>
          item.name === rall.item
      )
    ]
    return (
      <div
        class="w-62 h-[74px] rounded-4 p-0.5 relative cursor-pointer"
        style={{
          background:
            wonItem.price > 1000 * 100
              ? "#FFC701"
              : wonItem.price > 1000 * 30
              ? "#AA3737"
              : wonItem.price > 1000 * 10
              ? "#6645AF"
              : wonItem.price > 1000 * 2
              ? "#439EF2"
              : "#BBCBF0",
        }}
      >
        <div
          class={`w-full h-full cursor-pointer flex items-center group px-2 rounded-4 overflow-hidden relative`}
          style={{
            background:
            wonItem.price > 1000 * 100
                ? "linear-gradient(70deg, #FFC701 -31.81%, #6C4224 30.04%, #202337 61.79%, #202337 123.09%)"
                : wonItem.price > 1000 * 30
                ? "linear-gradient(70deg, #C22121 -23.06%, #753737 39.25%, #202337 85.66%, #202337 123.09%)"
                : wonItem.price > 1000 * 10
                ? "linear-gradient(70deg, #823CC0 -44.03%, #322342 37.66%, #202337 76.36%, #202337 120.86%)"
                : wonItem.price > 1000 * 2
                ? "linear-gradient(70deg, #439EF2 -44.03%, #22345E 33.77%, #202337 65.17%, #202337 123.09%)"
                : "linear-gradient(70deg, #BBCBF0 -44.03%, #232B3E 28.22%, #202337 70.5%, #202337 123.09%)",
          }}
        >
          <img alt="item-splash" src={ItemSplash} class={`w-full absolute`} />
          <div class="w-full h-full group-hover:hidden flex justify-start items-center gap-4">
            <div class="relative">
              <img alt="item-image" src={wonItem.image} class="h-14 relative z-10" />

              <div
                class={`absolute z-0 left-0 top-0 w-[200%] h-[200%] transform -translate-x-1/4 -translate-y-[10%]`}
              >
                <ItemSpinnerBg
                  color={
                    wonItem.price > 1000 * 100
                      ? "gold"
                      : wonItem.price > 1000 * 30
                      ? "red"
                      : wonItem.price > 1000 * 10
                      ? "purple"
                      : wonItem.price > 1000 * 2
                      ? "blue"
                      : "gray"
                  }
                />
              </div>
            </div>
            <div class="flex flex-col items-start max-w-full overflow-hidden gap-1">
              <p class="text-16 text-gray-8c font-semibold truncate max-w-full">
                {wonItem.name}
              </p>
              <div class="flex justify-start gap-2">
                <Coin />

                <p class="text-14 text-white font-medium font-Oswald">
                  {Number(wonItem.price).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full h-full hidden lex group-hover:flex justify-start items-center gap-4">
            <div class="relative">
              <div class="w-14 h-14 flex items-center justify-center">
                <div
                  class={`w-11 h-11 rounded-full relative overflow-hidden p-sm bg-gradient-to-b ${
                    ranksBorderColor[
                      rall.level
                        ?.league
                    ] ?? ""
                  }`}
                >
                  <img
                    class="w-full h-full rounded-full"
                    alt="leaderboard image"
                    src={
                      rall?.avatar
                    }
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col items-start max-w-full overflow-hidden gap-1">
              <p class="text-16 text-gray-8c font-semibold truncate max-w-full">
                {rall?.username || "?"}
              </p>
              <div class="flex">
                <p class="text-14 text-white font-medium font-Oswald">
                  {dayjs(
                    rall.timestamp
                  ).format("MM/DD/YYYY") || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toastr({ msg: "Copied" });
  }

  return (
    <>
      <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
      {rollCase() && (
        <div class="w-full h-full flex flex-col gap-2.5 overflow-y-scroll relative min-h-screen pt-2">
          
          <div class="w-full flex gap-6">
            <BestDrops data={caseStatistic} _case={rollCase} />
            <RecentDrops data={caseStatistic} _case={rollCase} />
          </div>
          <div class="flex flex-col w-full">
            <div class="w-full flex flex-col bet-info-bg">
              <div
                class="flex relative w-full items-center gap-4 px-10 py-3.5 bg-cover border-b-2 border-gray-30"
                style={{ "background-image": `url(${HeaderBg})` }}
              >
                <NavLink href={URL.REWARDS}>
                  <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.99984C0 9.64512 0.13201 9.2903 0.395431 9.01976L8.69308 0.506187C9.2209 -0.0353875 10.0767 -0.0353875 10.6043 0.506187C11.1319 1.04754 11.1319 1.92544 10.6043 2.46705L3.26219 9.99984L10.6038 17.5329C11.1314 18.0743 11.1314 18.9523 10.6038 19.4936C10.0762 20.0355 9.22065 20.0355 8.69282 19.4936L0.395132 10.9802C0.131753 10.7095 0 10.3547 0 9.99984Z" fill="white"/>
                  </svg>
                </NavLink>
                <p class="text-24 text-white font-medium font-Oswald uppercase">
                  {rollCase()?.name}
                </p>
              </div>
              <div class="w-full sm:w-auto py-5 px-10 min-w-max lg:h-full lg:col-span-1 lg:row-span-2 xxl:col-span-2">
                
                

                <div class="flex flex-col sm:flex-row h-full items-center gap-2 sm:gap-10">
                  <img
                    alt="case-image" 
                    class="h-32 no-select relative z-10"
                    src={rollCase().image}
                  />
                  <div class="w-full max-w-md flex flex-col items-center sm:items-start gap-2">
                    <div>
                      <p class="text-gray-47 text-14 flex" onClick={() => copy(serverSeed())}>
                        Server Seed Hash:
                        <span class="max-w-[5rem] truncate mr-0.5">
                          {serverSeed()}
                        </span>
                        <svg class="w-4 ml-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"version="1.1"id="Layer_1" x="0px"y="0px" viewBox="0 0 460 460" style={{"enable-background":"new 0 0 460 460"}} fill="#8C98A9"><g><g><g><path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272     c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729     c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z" /><path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272     c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068     c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001     C291.206,428.715,289.92,430,288.341,430z" /></g></g></g></svg>
                      </p>
                      <p class="text-gray-47 text-14">
                        Client Seed: {clientSeed()}
                      </p>
                      <p class="text-gray-47 text-14">
                        Ticket: {isRollTicketShown() ? rollTicket() : "No ticket..."}
                      </p>
                    </div>
                    <div class="inline-block">
                      {isCaseAlreadyOpened() ? (
                        <div
                          class={`relative cursor-pointer w-56 h-10 group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden`}
                          style={{
                            "background-image": `url(${YellowButtonBg})`,
                          }}
                          onClick={() => startGame()}
                        >
                          <div
                            class="absolute left-0.5 top-0.5 h-9 bg-dark-1c1"
                            style={{ width: "calc(100% - 4px)" }}
                          />
                          <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                          <span class="text-yellow-ff flex items-center justify-center text-14 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            OPEN IN {timeLeft()}
                          </span>
                        </div>
                      ) : !discordUserConnected() && Number(props?.searchParams?.id) == 1 ? (
                          <div class="flex items-center gap-2">
                            <a
                                class="relative block cursor-pointer h-10 w-36 center hover overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                                style={{ "background-image": `url(${YellowButtonBg})` }}
                                href="https://discord.com/invite/rustyloot"
                                target="_blank"
                              >
                                <div class="scrolling-btn-image hidden group-hover:block" />
                                <span class="text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald">
                                  <svg
                                    width="20"
                                    height="15"
                                    viewBox="0 0 20 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z"
                                      fill="#161B2A"
                                    />
                                  </svg>
                                  JOIN DISCORD
                                </span>
                              </a>
                              <a
                                class="relative block cursor-pointer h-10 w-44 center hover overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                                style={{ "background-image": `url(${YellowButtonBg})` }}
                                href={`https://rustyloot.gg/discord/`}
                                target="_blank"
                              >
                                <div class="scrolling-btn-image hidden group-hover:block" />
                                <span class="text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald">
                                  <svg
                                    width="20"
                                    height="15"
                                    viewBox="0 0 20 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z"
                                      fill="#161B2A"
                                    />
                                  </svg>
                                  Authorize account
                                </span>
                              </a>
                        </div>
                      ) : !isCaseCanBeOpen() ? (
                        <div
                          class={`relative cursor-pointer w-52 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden`}
                          style={{ "background-image": `url(${GrayButtonBg})` }}
                        >
                          <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                          <span class="text-dark-1c text-12 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            LOCKED
                          </span>
                        </div>
                      ) : (
                        <div
                          class={`relative cursor-pointer w-52 h-10 group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden`}
                          style={{
                            "background-image": `url(${YellowButtonBg})`,
                          }}
                          onClick={() => startGame()}
                        >
                          <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                          <span class="text-black flex items-center justify-center text-14 uppercase font-Oswald absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            OPEN
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-80 w-full relative bet-info-bg">
            <div class={`center flex-col gap-1 duration-200 h-full overflow-hidden`}>

              <svg class="absolute top-0" width="143" height="19" viewBox="0 0 143 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_156_9093)">
                <path d="M70.9999 1.50125H59.9999L70.9999 10.7457L81.9999 1.50138L70.9999 1.50125Z" fill="url(#paint0_linear_156_9093)"/>
                </g>
                <path d="M-0.00012207 1.00038H143" stroke="url(#paint1_linear_156_9093)"/>
                <defs>
                <filter id="filter0_d_156_9093" x="55.9999" y="1.50125" width="30" height="17.2445" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_156_9093"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_156_9093" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_156_9093" x1="70.9999" y1="-11.2942" x2="70.9999" y2="10.7456" gradientUnits="userSpaceOnUse">
                <stop offset="0.0104167" stop-color="#F9B400"/>
                <stop offset="1" stop-color="#FFC701"/>
                </linearGradient>
                <linearGradient id="paint1_linear_156_9093" x1="139.779" y1="1.00038" x2="-0.00012207" y2="1.00038" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC701" stop-opacity="0"/>
                <stop offset="0.515625" stop-color="#FFC701"/>
                <stop offset="1" stop-color="#FFC701" stop-opacity="0"/>
                </linearGradient>
                </defs>
              </svg>
              <svg class="absolute -bottom-2" width="143" height="18" viewBox="0 0 143 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_257_526)">
                <path d="M72 9.24445L83 9.24445L72 -6.71591e-06L61 9.24432L72 9.24445Z" fill="url(#paint0_linear_257_526)"/>
                </g>
                <path d="M143 9.74533L1.66893e-06 9.74533" stroke="url(#paint1_linear_257_526)"/>
                <defs>
                <filter id="filter0_d_257_526" x="57" y="0" width="30" height="17.2444" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_257_526"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_257_526" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_257_526" x1="72" y1="22.0399" x2="72" y2="0.000122064" gradientUnits="userSpaceOnUse">
                <stop offset="0.0104167" stop-color="#F9B400"/>
                <stop offset="1" stop-color="#FFC701"/>
                </linearGradient>
                <linearGradient id="paint1_linear_257_526" x1="3.22072" y1="9.74533" x2="143" y2="9.74533" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC701" stop-opacity="0"/>
                <stop offset="0.515625" stop-color="#FFC701"/>
                <stop offset="1" stop-color="#FFC701" stop-opacity="0"/>
                </linearGradient>
                </defs>
              </svg>
              <svg class="absolute" width="1" height="211" viewBox="0 0 1 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.499084 211L0.499084 -2.98023e-05" stroke="url(#paint0_linear_156_9073)"/>
                <defs>
                <linearGradient id="paint0_linear_156_9073" x1="0.499084" y1="4.75222" x2="0.499084" y2="211" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC701" stop-opacity="0"/>
                <stop offset="0.515625" stop-color="#FFC701"/>
                <stop offset="1" stop-color="#FFC701" stop-opacity="0"/>
                </linearGradient>
                </defs>
              </svg>

              <div class="h-full duration-200 w-full center gap-4 overflow-hidden relative">
                <div class="h-full" style={{ "min-width": "133rem", "max-width": "133rem", }}>
                  <div class="flex h-full" ref={spinner}>
                    <For each={ rollItems()?.length > 0 ? rollItems() : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] }>
                      {(val, index) => (
                        <div class="w-48 h-full center relative" style={{ "min-width": "7rem" }} >
                          {index() === 87 ? (
                            <img ref={wonItem} class="w-24 h-auto relative z-10 opacity-70 scale-75 transition" alt="jackpot spinner" src={ val?.image || "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" }
                              style={{
                                filter:
                                  val.price > 1000 * 100
                                    ? "drop-shadow(0px 0px 31px rgba(253, 193, 0, 0.6)) drop-shadow(0px 0px 26px #FDC100)"
                                    : val.price > 1000 * 30
                                    ? "drop-shadow(0px 0px 31px rgba(255, 72, 32, 0.3)) drop-shadow(0px 0px 26px rgba(255, 72, 32, 0.8))"
                                    : val.price > 1000 * 10
                                    ? "drop-shadow(0px 0px 31px #3B00E8) drop-shadow(0px 0px 26px #7124F4)"
                                    : val.price > 1000 * 2
                                    ? "drop-shadow(0px 0px 31px #2584E2) drop-shadow(0px 0px 26px #117EE8)"
                                    : "drop-shadow(0px 0px 31px #7E8AA1) drop-shadow(0px 0px 26px #7D89A0)",
                              }}
                            />
                          ) : (
                            <img class="w-24 h-auto relative z-10 opacity-70 scale-75" alt="jackpot spinner"
                              src={
                                val?.image ||
                                "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg"
                              }
                              style={{
                                filter:
                                  val.price > 1000 * 100
                                    ? "drop-shadow(0px 0px 31px rgba(253, 193, 0, 0.6)) drop-shadow(0px 0px 26px #FDC100)"
                                    : val.price > 1000 * 30
                                    ? "drop-shadow(0px 0px 31px rgba(255, 72, 32, 0.3)) drop-shadow(0px 0px 26px rgba(255, 72, 32, 0.8))"
                                    : val.price > 1000 * 10
                                    ? "drop-shadow(0px 0px 31px #3B00E8) drop-shadow(0px 0px 26px #7124F4)"
                                    : val.price > 1000 * 2
                                    ? "drop-shadow(0px 0px 31px #2584E2) drop-shadow(0px 0px 26px #117EE8)"
                                    : "drop-shadow(0px 0px 31px #7E8AA1) drop-shadow(0px 0px 26px #7D89A0)",
                              }}
                            />
                          )}
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col gap-3">
            <div class="w-full">
              <p class="text-yellow-ffb font-medium text-base capitalize font-SpaceGrotesk">
                potential drops
              </p>
            </div>
            <div class="w-full grid grid-cols-potential-drop--item gap-2">
              <For each={rollCase()?.items || []}>
                {(item) => (
                  <PotentialDropItem skin={item} caseName={rollCase()?.name} />
                )}
              </For>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Case;
