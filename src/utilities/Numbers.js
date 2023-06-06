export const getProportionalPartByAmount = (num, percent) => {
  console.log('getProportionalPartByAmount', num, percent);
  return Math.floor((num * percent) / 100)
}
