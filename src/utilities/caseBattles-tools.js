export const getColorByModeAndCursed = (mode, cursed) => {
  switch (true) {
    case (mode === 'royal' || mode === 'team') && cursed !== 1:
      return 'yellow'
    case cursed === 1:
      return 'green'
    default:
      return 'blue'
  }
}

export const isWinner = (winnersArray, playerIndex) => {
  if (winnersArray) {
    return winnersArray.some((winner) => winner.player_index === playerIndex + 1)
  }
  return false
}

export const getGradientForWinners = (playerQty, winnersArray, playerIndex) => {
  return (
    isWinner(winnersArray, playerIndex) &&
    (playerQty === 2
      ? `radial-gradient(100% 126.02% at ${
          playerIndex + 1 === 1 ? '0%' : '100%'
        } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
      : playerQty === 4
      ? `radial-gradient(100% 126.02% at ${
          playerIndex + 1 === 1 || playerIndex + 1 === 2 ? '0%' : '100%'
        } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
      : playerQty === 3
      ? `radial-gradient(${playerIndex + 1 === 2 ? '40%' : '100%'} 126.02% at ${
          playerIndex + 1 === 1 ? '0%' : playerIndex + 1 === 2 ? '50%' : '100%'
        } 50%, rgba(27, 220, 128, 0.16) 0%, rgba(27, 220, 128, 0) 100%), linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)`
      : '')
  )
}

export const getModeColorByName = (mode) => {
  return (mode === 'royal' || mode === 'team') && mode !== 1
    ? 'yellow'
    : mode === 1
    ? 'green'
    : 'blue'
}


export const getModeRgbByTextColor = (textColor) => {
  if (textColor === "yellow") return "255, 180, 54";
  if (textColor === "green") return "218, 253, 9";
  if (textColor === "blue") return "90, 195, 255";
};

export const getModeHexByTextColor = (textColor) => {
  if (textColor === "yellow") return "#ffb436";
  if (textColor === "green") return "#DAFD09";
  if (textColor === "blue") return "#5ac3ff";
};

export const getColorByPrice = (item_price) => {
  const color =
    item_price > 1000 * 100
      ? "gold"
      : item_price > 1000 * 30
      ? "red"
      : item_price > 1000 * 10
      ? "purple"
      : item_price > 1000 * 2
      ? "blue"
      : "gray";
  return color;
};

export  const getCountDuration = (numCases) => {
  return numCases <= 5
    ? 3.5
    : numCases <= 10
    ? 4.5
    : numCases <= 20
    ? 5.5
    : numCases <= 30
    ? 6
    : 6.5;
};