import { convertRomanToNormal } from "./Numbers"

export const getConfigByCaseName = (caseName, config) => {
  if (typeof caseName !== 'string') caseName = 'free daily case'

  for (const settings in config) {
    if (settings.toLowerCase().includes(caseName.toLowerCase().split(' ')[0])) {
      return config[settings]
    }
  }
}

export const getIndexRank = (currentRank, ranks) => {
  return ranks.indexOf(convertRomanToNormal(currentRank))
}

export const getAvailableCases = (currentRankIndex, ranks) => {
  return ranks.slice(0, currentRankIndex + 1)
}

export const getNotAvailableCases = (currentRankIndex, ranks) => {
  return ranks.slice(currentRankIndex + 1)
}

export const padNumber = (number) => {
  return number.toString().padStart(2, '0')
}

export const calculateRemainingTime = (unixTimeStamp) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const targetTime = unixTimeStamp + 24 * 60 * 60
  const timeDiff = targetTime - currentTime

  if (timeDiff <= 0) {
    return '00:00:00'
  }

  const hours = Math.floor(timeDiff / 3600)
  const minutes = Math.floor((timeDiff % 3600) / 60)
  const seconds = timeDiff % 60

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`
}

