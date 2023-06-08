import ManualAutoSwitch from "./ManualAutoSwitch";
import BetAmount from "./BetAmount/BetAmount";
import RowsAmount from "./RowsAmount/RowsAmount";
import Difficulty from "./Difficulty/Difficulty";
import StartBtn from "./StartBtn";

import {
  rowsAmount,
  betAmount,
  isAutoMode,
  setIsAutoDropping,
  isAutoDropping,
} from "../PlinkoContainer";

import { dropBall } from "../PlayArea/Plinko/Plinko";
import {
  getBallPosition,
  getLeftAndRightPegs,
  getBallPositionFromServer,
} from "../utils/tools";

import { downloadLogFile } from "../PlayArea/Plinko/Plinko";

const TilesMenu = () => {
  const handleClick = () => {
    // const pegs = getLeftAndRightPegs(rowsAmount());

    // const leftPeg = pegs[0];
    // const rightPeg = pegs[1];

    // const simulationsToRun = 1000;

    // const increment = (rightPeg - leftPeg) / simulationsToRun;

    // let currentX = leftPeg;

    // for (let i = 0; i < simulationsToRun; i++) {
    //   dropBall(currentX);
    //   currentX += increment;
    // }
    // dropBall(getBallPosition(rowsAmount()));
    // dropBall(441.58525895481233);
    if (!isAutoMode()) {
      dropBall(getBallPositionFromServer(rowsAmount(), betAmount()));
    } else {
      setIsAutoDropping(true);
      dropBall(getBallPositionFromServer(rowsAmount(), betAmount()));
      const interval = setInterval(() => {
        if (isAutoDropping()) {
          dropBall(getBallPositionFromServer(rowsAmount(), betAmount()));
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
  };
  return (
    <div
      class="relative min-w-[384px] h-full border-r-[#1a16160a] border-r flex flex-col p-7 pt-12 items-center gap-6"
      style="background: linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%);"
    >
      <ManualAutoSwitch />
      <BetAmount />
      <div class="h-[1px] w-[115%] bg-[#14162d]"></div>
      <RowsAmount />
      <div class="h-[1px] w-[115%] bg-[#14162d]"></div>
      <Difficulty />
      <StartBtn onClick={handleClick} />
      {/* <button
        onClick={() => {
          downloadLogFile();
        }}
      >
        Button
      </button> */}
    </div>
  );
};

export default TilesMenu;
