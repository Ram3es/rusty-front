import { createSignal, createEffect } from "solid-js";
import LoadingLogo from "../../LoadingLogo/LoadingLogo";
import Safe from "./Safe";
import ExplodedMine from "./ExplodedMine";

import {
  checkIfMine,
  getAllGridData,
  calculateMultiplier,
  calculateAddition,
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
  betAdditions,
} from "../../TilesContainer";

const Square = ({ x, y }) => {
  const [isFlipped, setIsFlipped] = createSignal(false);
  const [isMine, setIsMine] = createSignal(false);
  const [startAnimation, setStartAnimation] = createSignal(false);
  const [isClicked, setIsClicked] = createSignal(false);

  const checkMineHit = async () => {
    if (hasLost()) return;
    setInputLocked(true);
    setStartAnimation(true);
    const isMine = await checkIfMine(x, y);
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
    await handleResult()
    setIsClicked(false);
  };

  const handleResult = async () => {
    if (startAnimation() == false) return;

    if (hasLost()) return;
    if (!isMine()) {
      setSquaresLeft(squaresLeft() - 1);
      setBetAdditions((prev) => {
        const newAdditions = [...prev];
        newAdditions.push(
          calculateAddition(betAmount(), calculateMultiplier(minesAmount(), 25 - squaresLeft() - minesAmount()))
        );
        return newAdditions;
      });
    } else {
      setHasLost(true);
      setIsPlaying(false);
      const allGridData = await getAllGridData();
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
    <div class={`w-[96px] h-[96px]`} style="perspective: 1000px">
      <div
        class={`relative w-full h-full transition-all duration-[0.2s] rounded-lg border-[#FFFFFF08] border-[1px] ${
          startAnimation() ? "pointer-events-none" : "cursor-pointer"
        }
          ${isClicked() && "scale-75"}

          
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

        {isMine() ? <ExplodedMine /> : <Safe isMine={isMine} hasLost={hasLost} />}
      </div>
    </div>
  );
};

export default Square;
