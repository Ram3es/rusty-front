import { createRoot, onMount, onCleanup, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import io from "socket.io-client";
import { API } from "../libraries/url";
import errorSound from "../assets/sounds/error.wav"

const socket = io(API, {
  transports: ["websocket", "polling"],
  upgrade: true,
});

const [rewardCases, setRewardCases] = createStore({
  cases: [],
  isUserOnServer: false,
  lastDailyCaseOpening: null,
  lastFreeCaseOpening: null
})

const SNOWMODE = false;

onMount(() => {
  socket.emit("rewards:cases", {}, (data) => {
    console.log("rewards:cases",data);
    if (!data.error) {
      setRewardCases(data.data)
    }
    });  
})

const soundError = new Audio(errorSound);
const createUserObject = () => {
  const [userObject, setUserObject] = createStore({
    trades: [],
  });

  const [toggles, setToggles] = createStore({
    paymentPopup: false,
    tradeModal: false,
    affiliatesModal: false,
    provablyFairModal: false,
    winningsModal: false,
    tosModal: false,
    chatRulesModal: false,
  });
  const [leaderboards, setLeaderboards] = createStore({});

  const [toastrs, setToastrs] = createSignal([]);

  onMount(() => {

    socket.on("leaderboards:reset", (data) => {
      setLeaderboards(data.name, (prev) => {
        return { ...prev, players: [], ending: data.ending };
      });
    });

    socket.on("system:online", (data) => {
      setUserObject("online", data?.players);
    });

    // eslint-disable-next-line solid/reactivity
    socket.on("system:message", (data) => {
      setToastrs((prev) =>
        [{ ...data, id: `${Date.now()}:${Math.random()}` }, ...prev].slice(-2)
      );

      if (data.type == "error") {
        soundError.currentTime = 0;
        soundError.volume = userObject.user.sounds;
        let playedPromise = soundError.play();
        if (playedPromise) {
            playedPromise.catch((e) => {
                console.error(e)
            });
        }
    }
    });

    socket.on("steam:trade", (data) => {
      setToggles("tradeModal", true);
      setUserObject("trades", (prev) => [
        {
          link: data?.link,
          type: data?.type,
          expires: Date.now() + 1000 * 60 * 5,
        },
        ...prev,
      ]);
    });

    socket.on("system:balance", (balance) => {
      setUserObject("user", (prev) => ({ ...prev.user, balance: balance }));
    });

    socket.on("winnings:modal", (data) => {
      setToggles("winningsModal", data);
    });
  });
  onCleanup(() => {
    socket.off("system:connect");
    socket.off("system:balance");
    socket.off("system:online");
    socket.off("steam:market");
    socket.off("steam:trade ");
  });

  return {
    userObject,
    setUserObject,
    socket,
    toggles,
    setToggles,
    leaderboards,
    setLeaderboards,
    toastrs,
    setToastrs,
    SNOWMODE,
    rewardCases,
    setRewardCases,
    toastr: (data) => {
      if (data.error) {
        soundError.currentTime = 0;
        soundError.volume = userObject.user.sounds;
        soundError.play();
      }
      setToastrs((prev) =>
        [
          ...prev,
          {
            msg: data.msg,
            type: data.error ? "error" : "success",
            id: `${Date.now()}:${Math.random()}`,
          },
        ].slice(-2)
      );
    },
  };
};

export default createRoot(createUserObject);
