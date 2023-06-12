import pathData8End0 from "./pathdata/8/rows_8_end_0.json";
import pathData8End1 from "./pathdata/8/rows_8_end_1.json";
import pathData8End2 from "./pathdata/8/rows_8_end_2.json";
import pathData8End3 from "./pathdata/8/rows_8_end_3.json";
import pathData8End4 from "./pathdata/8/rows_8_end_4.json";
import pathData8End5 from "./pathdata/8/rows_8_end_5.json";
import pathData8End6 from "./pathdata/8/rows_8_end_6.json";
import pathData8End7 from "./pathdata/8/rows_8_end_7.json";
import pathData8End8 from "./pathdata/8/rows_8_end_8.json";

import pathData10End0 from "./pathdata/10/rows_10_end_0.json";
import pathData10End1 from "./pathdata/10/rows_10_end_1.json";
import pathData10End2 from "./pathdata/10/rows_10_end_2.json";
import pathData10End3 from "./pathdata/10/rows_10_end_3.json";
import pathData10End4 from "./pathdata/10/rows_10_end_4.json";
import pathData10End5 from "./pathdata/10/rows_10_end_5.json";
import pathData10End6 from "./pathdata/10/rows_10_end_6.json";
import pathData10End7 from "./pathdata/10/rows_10_end_7.json";
import pathData10End8 from "./pathdata/10/rows_10_end_8.json";
import pathData10End9 from "./pathdata/10/rows_10_end_9.json";
import pathData10End10 from "./pathdata/10/rows_10_end_10.json";

import pathData12End0 from "./pathdata/12/rows_12_end_0.json";
import pathData12End1 from "./pathdata/12/rows_12_end_1.json";
import pathData12End2 from "./pathdata/12/rows_12_end_2.json";
import pathData12End3 from "./pathdata/12/rows_12_end_3.json";
import pathData12End4 from "./pathdata/12/rows_12_end_4.json";
import pathData12End5 from "./pathdata/12/rows_12_end_5.json";
import pathData12End6 from "./pathdata/12/rows_12_end_6.json";
import pathData12End7 from "./pathdata/12/rows_12_end_7.json";
import pathData12End8 from "./pathdata/12/rows_12_end_8.json";
import pathData12End9 from "./pathdata/12/rows_12_end_9.json";
import pathData12End10 from "./pathdata/12/rows_12_end_10.json";
import pathData12End11 from "./pathdata/12/rows_12_end_11.json";
import pathData12End12 from "./pathdata/12/rows_12_end_12.json";

import pathData14End0 from "./pathdata/14/rows_14_end_0.json";
import pathData14End1 from "./pathdata/14/rows_14_end_1.json";
import pathData14End2 from "./pathdata/14/rows_14_end_2.json";
import pathData14End3 from "./pathdata/14/rows_14_end_3.json";
import pathData14End4 from "./pathdata/14/rows_14_end_4.json";
import pathData14End5 from "./pathdata/14/rows_14_end_5.json";
import pathData14End6 from "./pathdata/14/rows_14_end_6.json";
import pathData14End7 from "./pathdata/14/rows_14_end_7.json";
import pathData14End8 from "./pathdata/14/rows_14_end_8.json";
import pathData14End9 from "./pathdata/14/rows_14_end_9.json";
import pathData14End10 from "./pathdata/14/rows_14_end_10.json";
import pathData14End11 from "./pathdata/14/rows_14_end_11.json";
import pathData14End12 from "./pathdata/14/rows_14_end_12.json";
import pathData14End13 from "./pathdata/14/rows_14_end_13.json";
import pathData14End14 from "./pathdata/14/rows_14_end_14.json";

import pathData16End0 from "./pathdata/16/rows_16_end_0.json";
import pathData16End1 from "./pathdata/16/rows_16_end_1.json";
import pathData16End2 from "./pathdata/16/rows_16_end_2.json";
import pathData16End3 from "./pathdata/16/rows_16_end_3.json";
import pathData16End4 from "./pathdata/16/rows_16_end_4.json";
import pathData16End5 from "./pathdata/16/rows_16_end_5.json";
import pathData16End6 from "./pathdata/16/rows_16_end_6.json";
import pathData16End7 from "./pathdata/16/rows_16_end_7.json";
import pathData16End8 from "./pathdata/16/rows_16_end_8.json";
import pathData16End9 from "./pathdata/16/rows_16_end_9.json";
import pathData16End10 from "./pathdata/16/rows_16_end_10.json";
import pathData16End11 from "./pathdata/16/rows_16_end_11.json";
import pathData16End12 from "./pathdata/16/rows_16_end_12.json";
import pathData16End13 from "./pathdata/16/rows_16_end_13.json";
import pathData16End14 from "./pathdata/16/rows_16_end_14.json";
import pathData16End15 from "./pathdata/16/rows_16_end_15.json";
import pathData16End16 from "./pathdata/16/rows_16_end_16.json";

export const getCurrencyString = (amount) => {
  return parseFloat(amount).toFixed(2);
};

export const getBallPosition = (
  rowsAmount,
  scaleFactor = 12 / rowsAmount,
  spacing = scaleFactor * 45
) => {
  // Calculate the left and right x positions for the topmost row
  let leftX = (800 - 2 * spacing) / 2;
  let rightX = leftX + 2 * spacing;

  // Return a random number between leftX and rightX
  return Math.random() * (rightX - leftX) + leftX;
};

export const getLeftAndRightPegs = (rowsAmount) => {
  const scaleFactor = 12 / rowsAmount;
  const spacing = scaleFactor * 45;

  // Calculate the left and right x positions for the topmost row
  let leftX = (800 - 2 * spacing) / 2;
  let rightX = leftX + 2 * spacing;

  return [leftX, rightX];
};

export const getBallPositionFromServer = (rowsAmount, betAmount, path) => {
  const finalEndPointIndex = getFinalEndPointIndex(rowsAmount, path);
  console.log('finalEndPointIndex', finalEndPointIndex);
  // const finalEndPointIndex = 2;
  let pathData = [];

  switch (rowsAmount) {
    case 8:
      switch (finalEndPointIndex) {
        case 0:
          pathData = pathData8End0;
          break;
        case 1:
          pathData = pathData8End1;
          break;
        case 2:
          pathData = pathData8End2;
          break;
        case 3:
          pathData = pathData8End3;
          break;
        case 4:
          pathData = pathData8End4;
          break;
        case 5:
          pathData = pathData8End5;
          break;
        case 6:
          pathData = pathData8End6;
          break;
        case 7:
          pathData = pathData8End7;
          break;
        case 8:
          pathData = pathData8End8;
          break;
        default:
          pathData = [];
          break;
      }
      break;
    case 10:
      switch (finalEndPointIndex) {
        case 0:
          pathData = pathData10End0;
          break;
        case 1:
          pathData = pathData10End1;
          break;
        case 2:
          pathData = pathData10End2;
          break;
        case 3:
          pathData = pathData10End3;
          break;
        case 4:
          pathData = pathData10End4;
          break;
        case 5:
          pathData = pathData10End5;
          break;
        case 6:
          pathData = pathData10End6;
          break;
        case 7:
          pathData = pathData10End7;
          break;
        case 8:
          pathData = pathData10End8;
          break;
        case 9:
          pathData = pathData10End9;
          break;
        case 10:
          pathData = pathData10End10;
          break;
        default:
          pathData = [];
          break;
      }
      break;
    case 12:
      switch (finalEndPointIndex) {
        case 0:
          pathData = pathData12End0;
          break;
        case 1:
          pathData = pathData12End1;
          break;
        case 2:
          pathData = pathData12End2;
          break;
        case 3:
          pathData = pathData12End3;
          break;
        case 4:
          pathData = pathData12End4;
          break;
        case 5:
          pathData = pathData12End5;
          break;
        case 6:
          pathData = pathData12End6;
          break;
        case 7:
          pathData = pathData12End7;
          break;
        case 8:
          pathData = pathData12End8;
          break;
        case 9:
          pathData = pathData12End9;
          break;
        case 10:
          pathData = pathData12End10;
          break;
        case 11:
          pathData = pathData12End11;
          break;
        case 12:
          pathData = pathData12End12;
          break;
        default:
          pathData = [];
          break;
      }
      break;
    case 14:
      switch (finalEndPointIndex) {
        case 0:
          pathData = pathData14End0;
          break;
        case 1:
          pathData = pathData14End1;
          break;
        case 2:
          pathData = pathData14End2;
          break;
        case 3:
          pathData = pathData14End3;
          break;
        case 4:
          pathData = pathData14End4;
          break;
        case 5:
          pathData = pathData14End5;
          break;
        case 6:
          pathData = pathData14End6;
          break;
        case 7:
          pathData = pathData14End7;
          break;
        case 8:
          pathData = pathData14End8;
          break;
        case 9:
          pathData = pathData14End9;
          break;
        case 10:
          pathData = pathData14End10;
          break;
        case 11:
          pathData = pathData14End11;
          break;
        case 12:
          pathData = pathData14End12;
          break;
        case 13:
          pathData = pathData14End13;
          break;
        case 14:
          pathData = pathData14End14;
          break;
        default:
          pathData = [];
          break;
      }
      break;
    case 16:
      switch (finalEndPointIndex) {
        case 0:
          pathData = pathData16End0;
          break;
        case 1:
          pathData = pathData16End1;
          break;
        case 2:
          pathData = pathData16End2;
          break;
        case 3:
          pathData = pathData16End3;
          break;
        case 4:
          pathData = pathData16End4;
          break;
        case 5:
          pathData = pathData16End5;
          break;
        case 6:
          pathData = pathData16End6;
          break;
        case 7:
          pathData = pathData16End7;
          break;
        case 8:
          pathData = pathData16End8;
          break;
        case 9:
          pathData = pathData16End9;
          break;
        case 10:
          pathData = pathData16End10;
          break;
        case 11:
          pathData = pathData16End11;
          break;
        case 12:
          pathData = pathData16End12;
          break;
        case 13:
          pathData = pathData16End13;
          break;
        case 14:
          pathData = pathData16End14;
          break;
        case 15:
          pathData = pathData16End15;
          break;
        case 16:
          pathData = pathData16End16;
          break;
        default:
          pathData = [];
          break;
      }
      break;
    default:
      pathData = [];
      break;
  }

  // pick random path in pathData
  const randomIndex = Math.floor(Math.random() * pathData.length);
  const randomPath = pathData[randomIndex];
  console.log(
    `Dropping at ${randomPath.x} | Index: ${finalEndPointIndex} | Bet Amount ${betAmount}`, pathData[0]
  );
  return randomPath.x;
};

const createRandomPath = (rowsAmount) => {
  const path = [];
  const directions = ["L", "R"];

  for (let i = 0; i < rowsAmount; i++) {
    const randomIndex = Math.floor(Math.random() * directions.length);
    const randomDirection = directions[randomIndex];
    path.push(randomDirection);
  }

  return path;
};

const getFinalEndPointIndex = (rowsAmount, path) => {
  let finalEndPointIndex = 0;
  console.log('rowsAmount', rowsAmount, finalEndPointIndex);
  for (let i = 0; i < path.length; i++) {
    finalEndPointIndex += path[i];
  }

  return finalEndPointIndex;
};
