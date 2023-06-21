import {createSignal, createEffect, onMount} from "solid-js";
import TilesMenu from "./TilesMenu/TilesMenu";
import PlayArea from "./PlayArea/PlayArea";
import injector from "../../injector/injector";
import {
  playBombFound,
  playSafeMineFound,
} from "../../utilities/Sounds/MinesSound";
import {
  playCashoutSound,
  playOptionClickSound,
  playPlaceBetSound,
} from "../../utilities/Sounds/SoundButtonClick";

import {
  generateGrid,
  storeGridInLocalStorage,
  getKnownMinesInit,
  calculateAddition,
  calculateMultiplier,
} from "./utils/tools";
import History from "../../views/history";
import Fallback from "../../views/Fallback";
import PageLoadState from "../../libraries/PageLoadState";
import NewHistory from "../elements/NewHistory";
import LogoBg from "../../assets/img/footer/footerLogoBgVector.png";

export const [isPlaying, setIsPlaying] = createSignal(false);
export const [hasLost, setHasLost] = createSignal(false);
export const [betAmount, setBetAmount] = createSignal(500.0);
export const [minesAmount, setMinesAmount] = createSignal(1);
export const [squaresLeft, setSquaresLeft] = createSignal(0);
export const [inputLocked, setInputLocked] = createSignal(false);
export const [isRumbling, setIsRumbling] = createSignal(false);
export const [flipTile, setFlipTile] = createSignal();

export const [betAdditions, setBetAdditions] = createSignal([]);
export const [knownMines, setKnownMines] = createSignal(getKnownMinesInit());

const {socket, toastr, userObject} = injector;
const [history, setHistory] = createSignal([]);
const {minesPageLoaded, onMinesPageLoad} = PageLoadState;

// manage bet and mines values
createEffect(() => {
  if (minesAmount() < 1) {
    setMinesAmount(1);
  }
  if (minesAmount() > 24) {
    setMinesAmount(24);
  }

  if (betAmount() > userObject.user.balance) {
    setBetAmount(userObject.user.balance);
  }
});

export const startGame = () => {
  // reset game state
  socket.emit(
    "mines:bet",
    {
      bet: betAmount(),
      mines: minesAmount(),
    },
    (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        playPlaceBetSound();
      }

      if (!data.error) {
        setKnownMines(getKnownMinesInit());
        setHasLost(false);
        setIsPlaying(true);
        setBetAdditions([]);
        setIsRumbling(false);
        // generate mine grid data/where are the mines
        // currently storing in local storage
        const grid = generateGrid(0);
        setSquaresLeft(25 - data?.data?.mines);
        storeGridInLocalStorage(grid);
      }
    }
  );
};

export const cashOut = () => {
  // handle cash out

  socket.emit("mines:cashout", {}, (data) => {
    if (data.msg) {
      toastr(data);
    }

    if (!data.error) {
      setIsPlaying(false);
      playCashoutSound();
    }
  });
};

createEffect(() => {
  socket.emit("mines:connect", {}, (data) => {
    if (data?.user?.data) {
      setBetAmount(data?.user?.data?.activeInfo?.bet || 0);
      setMinesAmount(data?.user?.data?.activeInfo?.mines);
      setKnownMines(getKnownMinesInit(data?.user?.data?.cleared || []));
      // setHasLost(false);
      setIsPlaying(true);
      setSquaresLeft(() => 25 - (data?.user?.data?.cleared?.length || 0));
      setBetAdditions((prev) => {
        const newAdditions = [...prev];
        newAdditions.push(
          calculateAddition(
            betAmount(),
            minesAmount(),
            25 - squaresLeft() - minesAmount()
          )
        );
        return newAdditions;
      });
      setIsRumbling(false);
      storeGridInLocalStorage(knownMines());
    }
    onMinesPageLoad(true);
  });
});

createEffect(() => {
  // clear bet additions if game is lost
  if (hasLost()) {
    setBetAdditions([]);
  }
});

createEffect(() => {
  // stop rumbling after 1500 second
  if (isRumbling()) {
    setTimeout(() => {
      setIsRumbling(false);
    }, 1500);
  }
});

const TilesContainer = () => {
  onMount(() => {
    socket.on("mines:history", (data) => {
      setHistory((prev) => [data, ...prev].slice(0, 10));
    });
  });

  return (
    <Fallback loaded={minesPageLoaded}>
      <div
        class="xl:h-[641px] llg:min-w-[800px] lg:mt-20 border border-[#FFFFFF0A] rounded-sm flex relative mb-4 fourk:mr-80"
        style={{
          background: "linear-gradient(to right, #16182E 60%, #131521)",
        }}
      >
        <div
          class="absolute top-0 left-0 z-10 w-full h-full "
          style={{
            "background-image": `url('${LogoBg}')`,
            "background-size": "cover",
          }}
        />

        <div class="flex flex-col-reverse justify-center xl:flex-row xl:gap-24 h-full w-full relative z-20">
          <TilesMenu />
          <PlayArea />
        </div>
      </div>
      <NewHistory history={history()} />
    </Fallback>
  );
};

export default TilesContainer;
