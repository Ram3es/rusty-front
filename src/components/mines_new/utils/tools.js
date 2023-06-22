import injector from "../../../injector/injector";

const {socket, toastr} = injector;

export const getCurrencyString = (amount) => {
  // add commas to number
  return parseFloat(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// used for development
export const generateGrid = (mineCount) => {
  // create 5x5 grid with mineCount mines, mine represented as true, safe represented as false
  const grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      grid[i].push(false);
    }
  }
  for (let i = 0; i < mineCount; i++) {
    let x = Math.floor(Math.random() * 5);
    let y = Math.floor(Math.random() * 5);
    if (grid[x][y] === true) {
      i--;
    } else {
      grid[x][y] = true;
    }
  }
  return grid;
};

// used for development
export const storeGridInLocalStorage = (grid) => {
  localStorage.setItem("grid", JSON.stringify(grid));
};

// used for development
export const getGridFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("grid"));
};

// this function checks if a tile is a mine or not
// it will need to be replaced with a call to the backend
export const checkIfMine = (
  x,
  y,
  setIsPlaying,
  playCashoutSound,
  setKnownMines
) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "mines:check",
      {
        position: y * 5 + Number(x) + 1,
      },
      (data) => {
        if (!data.data.error) {
          if (data.msg) toastr(data);
          if (!data.end) {
            // clear
            resolve(false);
          } else {
            if (
              data.data.cleared?.some((item) => data.data.mines?.includes(item))
            ) {
              // mine hit
              resolve(true);
              revealMines(setKnownMines, data.data.mines);
            } else {
              // game over cleared the board
              setIsPlaying(false);
              playCashoutSound();
              resolve(false);
            }
          }
        }
      }
    );
  });
};

// used for debugging
export const getKnownMinesInit = (clearedMines = []) => {
  const positions = clearedMines.map((pos) => ({
    x: (pos - 1) % 5,
    y: Math.floor((pos - 1) / 5),
  }));
  const initPositions = [
    [
      {x: 0, y: 0, revealed: false, isMine: false},
      {x: 0, y: 1, revealed: false, isMine: false},
      {x: 0, y: 2, revealed: false, isMine: false},
      {x: 0, y: 3, revealed: false, isMine: false},
      {x: 0, y: 4, revealed: false, isMine: false},
    ],
    [
      {x: 1, y: 0, revealed: false, isMine: false},
      {x: 1, y: 1, revealed: false, isMine: false},
      {x: 1, y: 2, revealed: false, isMine: false},
      {x: 1, y: 3, revealed: false, isMine: false},
      {x: 1, y: 4, revealed: false, isMine: false},
    ],
    [
      {x: 2, y: 0, revealed: false, isMine: false},
      {x: 2, y: 1, revealed: false, isMine: false},
      {x: 2, y: 2, revealed: false, isMine: false},
      {x: 2, y: 3, revealed: false, isMine: false},
      {x: 2, y: 4, revealed: false, isMine: false},
    ],
    [
      {x: 3, y: 0, revealed: false, isMine: false},
      {x: 3, y: 1, revealed: false, isMine: false},
      {x: 3, y: 2, revealed: false, isMine: false},
      {x: 3, y: 3, revealed: false, isMine: false},
      {x: 3, y: 4, revealed: false, isMine: false},
    ],
    [
      {x: 4, y: 0, revealed: false, isMine: false},
      {x: 4, y: 1, revealed: false, isMine: false},
      {x: 4, y: 2, revealed: false, isMine: false},
      {x: 4, y: 3, revealed: false, isMine: false},
      {x: 4, y: 4, revealed: false, isMine: false},
    ],
  ];

  positions.forEach((pos) => {
    initPositions[pos.x][pos.y].revealed = true;
  });
  return initPositions;
};

// gets data of the grid from the backend
// this function will need to be replaced with a call to the backend
// please note that this function is only called when the player loses
export const getAllGridData = () => {
  // !!!!! IMPORTANT !!!!!!
  // This function is only called when the player loses.
  // If this function is called, then no payout is to be made.
  // It is absolutely critical that the backend manages this.
    return getGridFromLocalStorage();
};

const factorial = (n, to) => {
  if (n <= to + 1) return n;
  if (n < 0) return;
  if (n < 2) return 1;
  return n * factorial(n - 1, to);
};

// this will need to be adjusted to reflect the actual odds
export const calculateMultiplier = (mines, cleared) => {
  if (cleared === 0) return 1;
  const multiplier = Number(
    (
      (1 /
        (factorial(25 - mines, 25 - mines - cleared) /
          factorial(25, 25 - cleared))) *
      0.9
    ).toFixed(2)
  );

  return multiplier < 1 ? 1.01 : multiplier;
};

export const calculateWinningsAmount = (betAmount, multiplier) => {
  return Math.floor(betAmount * multiplier);
};

// calculates the amount to be added to the player's winnings
export const calculateAddition = (betAmount, mines, cleared) => {
  const newProfit =
    calculateWinningsAmount(betAmount, calculateMultiplier(mines, cleared)) -
    betAmount;
  const prevProfit =
    calculateWinningsAmount(
      betAmount,
      calculateMultiplier(mines, cleared - 1)
    ) - betAmount;
  return newProfit - prevProfit;
};

// calculate the current winnings by summing the bet additions
export const calculateCurrentWinnings = (
  betAdditions,
  betAmount,
  squaresLeft
) => {
  if (squaresLeft === 25 || betAdditions.length === 0) return betAmount;
  return betAdditions[25 - squaresLeft];
};

// find future bet addition
export const calculateNextAddition = (
  minesAmount,
  squaresRemaining,
  betAmount
) => {
  const addition = calculateAddition(
    betAmount,
    minesAmount,
    25 - squaresRemaining - minesAmount
  );
  return addition;
};

const revealMines = (setKnownMines, mines) => {
  setKnownMines((prev) => {
    const knownMines = [...prev];
    mines.forEach((mine) => {
      const x = (mine - 1) % 5;
      const y = Math.floor((mine - 1) / 5);
      knownMines[x][y].revealed = true;
      knownMines[x][y].isMine = true;
    });
    return knownMines;
  });
};
