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
  difficulty,
} from "../PlinkoContainer";

import {dropBall} from "../PlayArea/Plinko/Plinko";

// import { downloadLogFile } from "../PlayArea/Plinko/Plinko";
import injector from "../../../injector/injector";
import {onCleanup, onMount} from "solid-js";

const TilesMenu = () => {
  const {socket, toastr} = injector;

  const bet = () => {
    socket.emit(
      "plinko:bet",
      {
        rows: rowsAmount(),
        bet: betAmount(),
        mode: difficulty(),
      },
      (data) => {
        if (data?.msg) {
          if(data.data?.path){
            dropBall(data?.data?.ballPosition);
          }
          toastr(data);
        }
        if (data?.error) {
          setIsAutoDropping(false);
          toastr({
            error: true,
            msg: "Autobet canceled!",
          });
        }
      }
    );
  };

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
      bet();
    } else {
      setIsAutoDropping(true);
      bet();
      const interval = setInterval(() => {
        if (isAutoDropping()) {
          bet();
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  // onMount(() => {
  //   socket.on("plinko:create", (data) => {
  //     if (data?.data?.ballPosition) {
  //       dropBall(data?.data?.ballPosition);
  //     }
  //   });
  // });

  onCleanup(() => {
    socket.off("plinko:create");
  });
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
