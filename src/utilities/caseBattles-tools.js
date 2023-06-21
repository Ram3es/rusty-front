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