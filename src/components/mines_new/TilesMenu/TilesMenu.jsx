import BetAmount from "./BetAmount/BetAmount";
import MinesAmount from "./MinesAmount/MinesAmount";
import StartButton from "./StartButton";
import RandomButton from "./RandomButton";

import {
  startGame,
  cashOut,
  isPlaying,
  inputLocked,
  knownMines,
  setFlipTile,
} from "../TilesContainer";

const TilesMenu = () => {
  const routeClick = () => {
    if (inputLocked()) return;
    if (isPlaying()) {
      cashOut();
    } else {
      startGame();
    }
  };

  const randomClick = () => {
    if (inputLocked()) return;
    // select random mine from knownMines that isnt revealed
    // knownmines is a two dimensional array

    const randomMine = knownMines()
      .flat()
      .filter((mine) => !mine.revealed)
      .sort(() => Math.random() - 0.5)[0];

    if (randomMine) {
      const {x, y} = randomMine;
      // click on random mine
      setFlipTile({x, y});
    }
  };
  return (
    <div
      class="relative llg:min-w-[320px] xll:min-w-[384px] h-full border-r-[#FFFFFF0A] border-r flex flex-col p-7 lg:pt-14 items-center gap-4"
      style={{
        background: "linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)",
      }}
    >
      <BetAmount />
      <div class="h-[1px] w-[115%] bg-[#14162d]" />
      <MinesAmount />
      <div class="flex w-full flex-col gap-3 mt-2">
        <StartButton onClick={routeClick} />
        <RandomButton onClick={randomClick} />
      </div>
    </div>
  );
};

export default TilesMenu;
