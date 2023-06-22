import {createSignal, createEffect} from "solid-js";
import LoadingLogo from "../../LoadingLogo/LoadingLogo";
import Safe from "./Safe";
import ExplodedMine from "./ExplodedMine";

import {
  checkIfMine,
  getAllGridData,
  calculateMultiplier,
  calculateAddition,
  calculateWinningsAmount,
} from "../../utils/tools";
import {
  squaresLeft,
  setSquaresLeft,
  hasLost,
  setHasLost,
  setIsPlaying,
  setKnownMines,
  knownMines,
  setInputLocked,
  setBetAdditions,
  betAmount,
  minesAmount,
  setIsRumbling,
  flipTile,
  setFlipTile,
  isPlaying,
} from "../../TilesContainer";

import {playCashoutSound} from "../../../../utilities/Sounds/SoundButtonClick";

const Square = ({x, y}) => {
  const [isFlipped, setIsFlipped] = createSignal(false);
  const [isMine, setIsMine] = createSignal(false);
  const [startAnimation, setStartAnimation] = createSignal(false);
  const [isClicked, setIsClicked] = createSignal(false);

  createEffect(() => {
    // if is clicked for more than 1 second set isClicked to false
    if (isClicked()) {
      setTimeout(() => {
        setIsClicked(false);
    }, 500);
  }

  });



  createEffect(() => {
    if (!flipTile()) return;
    if (flipTile().x == x && flipTile().y == y) {
      handleClick();
    }
  });

  createEffect(() => {
    if (hasLost()) {
      setStartAnimation(false);
      setIsClicked(false);
    }
  });

  createEffect(() => {
    if (knownMines()[x][y].revealed == true) {
      // flip tile
      setIsFlipped(true);
      // set mine

      if (knownMines()[x][y].isMine == true) {
        setIsMine(true);
      }
    }
  });

  const checkMineHit = async () => {
    if (hasLost()) return;
    setInputLocked(true);
    setStartAnimation(true);
    const isMine = await checkIfMine(
      x,
      y,
      setIsPlaying,
      playCashoutSound,
      setKnownMines,
      setHasLost,
    );
    setKnownMines((prev) => {
      const newMines = [...prev];
      newMines[x][y].revealed = true;
      newMines[x][y].isMine = isMine;
      return newMines;
    });
  };

  const handleClick = async () => {
    if (isClicked() || hasLost()) return;
    setIsClicked(true);
    await checkMineHit();
    handleResult();
    setIsClicked(false);
  };

  const handleResult = () => {
    if (startAnimation() == false) return;

    if (hasLost()) return;
    if (!isMine()) {
      setSquaresLeft(squaresLeft() - 1);
      setBetAdditions((prev) => {
        const newAdditions = [...prev];
        const newAddition = calculateAddition(
          betAmount(),
          minesAmount(),
          25 - squaresLeft() - minesAmount()
        );
        if (newAddition !== 0) {
          newAdditions.push(
            calculateWinningsAmount(
              betAmount(),
              calculateMultiplier(
                minesAmount(),
                25 - squaresLeft() - minesAmount()
              )
            )
          );
        }
        return newAdditions;
      });
    } else {
      setHasLost(true);
      setIsPlaying(false);
      const allGridData = getAllGridData();
      allGridData.forEach((row, x) => {
        row.forEach((square, y) => {
          if (square) {
            setIsRumbling(true);
            setKnownMines((prev) => {
              const newMines = [...prev];
              newMines[x][y].revealed = true;
              newMines[x][y].isMine = square;
              return newMines;
            });
          }
        });
      });
    }
    setFlipTile();
    setInputLocked(false);
  };

  createEffect(() => {
    if (knownMines()[x][y].revealed == true) {
      setIsMine(knownMines()[x][y].isMine);
      if (isMine()) setIsRumbling(true);
      setIsFlipped(true);
    } else if (knownMines()[x][y].revealed == false) {
      setIsFlipped(false);
      setStartAnimation(false);
    }
  });

  return (
    <div class={`w-[96px] h-[96px] `}>
      <div
        class={`relative w-full h-full transition-all duration-[0.2s] rounded-lg border-[#FFFFFF08] border-[1px] ${
          isPlaying() && startAnimation()
            ? "pointer-events-none"
            : "cursor-pointer"
        }
          ${isPlaying() && isClicked() && "scale-75"}

          
        `}
        style={`background: linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.02) 41.3%, rgba(0, 0, 0, 0.02) 68.93%, rgba(255, 255, 255, 0.02) 100%), radial-gradient(100% 100% at 50% 0%, rgba(255, 180, 54, 0.08) 0%, rgba(255, 180, 54, 0) 100%), radial-gradient(100% 100% at 50% 0%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 187.54% at 100% 50%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%), #212547;
        transform-style: preserve-3d;
                ${isFlipped() && "transform: rotateY(180deg);"}
                
                `}
        onClick={handleClick}
      >
        <div
          class={`w-full h-full absolute 
          
          `}
          style="-webkit-backface-visibility: hidden; 
                    backface-visibility: hidden;"
        >
          <LoadingLogo animateStart={startAnimation} xy={x + y} />
        </div>

        {isMine() ? (
          <ExplodedMine />
        ) : (
          <Safe isMine={isMine} hasLost={hasLost} />
        )}
      </div>
    </div>
  );
};

export default Square;
