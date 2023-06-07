import { createSignal, onMount } from "solid-js";
import Bin from "./Bin.jsx";

import {
  rowsAmount,
  difficulty,
  setBinMultipliers,
  binMultipliers,
} from "../../PlinkoContainer.jsx";

const settings = {
  8: {
    gap: 4,
    width: 595,
    height: 40,
    fontSize: 20,
  },
  10: {
    gap: 2,
    width: 587,
    height: 30,
    fontSize: 19,
  },
  12: {
    gap: 2,
    width: 580,
    height: 25,
    fontSize: 15,
  },
  14: {
    gap: 1,
    width: 577,
    height: 20,
    fontSize: 12,
  },
  16: {
    gap: 1,
    width: 577,
    height: 18,
    fontSize: 11,
  },
};

const multipliers = {
  easy: {
    8: [0.48, 0.96, 1.06, 2.01, 5.37],
    10: [0.48, 0.96, 1.06, 1.34, 2.88, 8.54],
    12: [0.48, 0.96, 1.06, 1.34, 1.54, 2.88, 9.6],
    14: [0.48, 0.96, 1.06, 1.25, 1.34, 1.82, 3.84, 6.81],
    16: [0.48, 0.96, 1.06, 1.15, 1.34, 1.34, 1.92, 8.64, 15.3],
  },
  normal: {
    8: [0.38, 0.67, 1.25, 2.88, 12.5],
    10: [0.38, 0.58, 1.34, 1.92, 4.8, 21.1],
    12: [0.29, 0.58, 1.06, 1.92, 3.84, 10.6, 31.7],
    14: [0.19, 0.48, 0.96, 1.82, 3.84, 6.72, 14.4, 55.6],
    16: [0.29, 0.48, 0.96, 1.44, 2.88, 4.8, 9.6, 39.3, 105.5],
  },
  hard: {
    8: [0.19, 0.29, 1.44, 3.84, 27.8],
    10: [0.19, 0.29, 0.86, 2.88, 9.6, 72.9],
    12: [0.19, 0.19, 0.67, 1.92, 7.77, 23.0, 163.1],
    14: [0.19, 0.19, 0.29, 1.82, 4.8, 17.3, 53.7, 403.0],
    16: [0.19, 0.19, 0.19, 1.92, 3.84, 8.64, 24.9, 124.7, 959.5],
  },
};

export const updateMultipliers = () => {
  setBinMultipliers([]);
  setBins([]);
  for (let i = 0; i <= rowsAmount(); i++) {
    const multiplier = getMultiplier(i);
    setBinMultipliers((prev) => [...prev, multiplier]);
    setBins((prev) => [
      ...prev,
      <Bin
        row={i}
        key={i}
        multiplier={multiplier}
        fontSize={settings[rowsAmount()].fontSize}
      />,
    ]);
  }
};

const [bins, setBins] = createSignal([]);
const getMultiplier = (i) => {
  const multiplierData = multipliers[difficulty()][rowsAmount()]; // Get the corresponding multiplier data
  if (i - 1 < rowsAmount() / 2) {
    return multiplierData[multiplierData.length - i - 1];
  } else {
    return multiplierData[i - rowsAmount() / 2];
  }
};
const PlinkoBins = () => {
  onMount(() => {
    updateMultipliers();
  });
  return (
    <div
      class={`absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-${
        settings[rowsAmount()].gap
      } `}
      style={`height: ${settings[rowsAmount()].height}px;
      width: ${settings[rowsAmount()].width}px;`}
    >
      {bins()}
    </div>
  );
};

export default PlinkoBins;
