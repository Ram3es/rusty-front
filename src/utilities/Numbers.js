export const getProportionalPartByAmount = (num, percent) => {
  return Math.floor((num * percent) / 100)
}

export const formatNumber = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
