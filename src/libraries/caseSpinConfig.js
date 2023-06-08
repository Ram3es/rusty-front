// Config file for case battle spinners

// Audio config
// Enter only the file name, not the path
export const audio = {
  click: "click3.mp3",
  snapBack: "pullback.wav",
  onBigWin: "onBigWin.wav",
  confetti: "confetti.mp3",
  // volume levels
  // 0 = mute | 1 = max
  // defaults all 1
  clickVolume: 1,
  snapBackVolume: 1,
  onBigWinVolume: 1,
  confettiVolume: 1,
};

// Timings config
// Adjust these carefully, you might break something :/
// Times are in seconds
export const spinnerTimings = {
  verticalInitialSpin: 4, // default 4
  verticalSnapBack: 0.5, // default 0.5
  horizontalInitialSpin: 6, // default 6
  horizontalSnapBack: 0.5, // default 0.5
  // 0.5 = 50% faster | lower = faster
  // do not set to 0 or less
  fastSpinMultiplier: 0.3, // default 0.3
  battleInitialSpin: 4, // default 4
  battlelSnapBack: 0.5, // default 0.5
};

export const otherOptions = {
  // Chance that the spinner lands in between two items
  // Make spinner more baity!!
  // 0 = never | 1 = always
  landInMiddleChanceHorizontal: 0.3, // default 0.3
  landInMiddleChanceVertical: 0.3, // default 0.3
  // The number of items that the spins
  // It spins within the range of the start and end bounds
  // there are parameters both types of spinners
  // ensure start bound is less than the end bound
  horizontalStartBound: 50,
  horizontalEndBound: 55,
  verticalStartBound: 20,
  verticalEndBound: 28,
};
