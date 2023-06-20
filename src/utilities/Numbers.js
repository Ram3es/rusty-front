export const getProportionalPartByAmount = (num, percent) => {
  return Math.floor((num * percent) / 100)
}

export const formatNumber = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const convertRomanToNormal = (input) => {
  if (!input) input = 'default'

  const romanMapping = {
    I: '1',
    II: '2',
    III: '3'
  }

  const parts = input.split(' ')
  const lastPart = parts.pop()
  const normalEquivalent = romanMapping[lastPart.toUpperCase()]

  if (normalEquivalent) {
    return parts.join(' ').toLowerCase() + normalEquivalent.toLowerCase()
  } else {
    return input.toLowerCase()
  }
}