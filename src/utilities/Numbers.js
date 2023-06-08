export const getProportionalPartByAmount = (num, percent) => {
  return Math.floor((num * percent) / 100)
}
