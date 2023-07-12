/* eslint-disable solid/prefer-for */
import { createSignal, createEffect, Switch, Match } from 'solid-js'
import { spinReelsTrigger, setSpinReelsTrigger } from '../store'
import { otherOptions } from '../../../libraries/caseSpinConfig'
import { isFastAnimation } from '../../../views/unbox/CaseUnboxing'
import SpinnerReelVerticalMobile from './SpinnerReelVerticalMobile'

export const [containerRef, setContainerRef] = createSignal()

const [activeSpinners, setActiveSpinners] = createSignal(0)
export const [reelsSpinning, setReelsSpinning] = createSignal(false)
export const [spinIndexes, setSpinIndexes] = createSignal([])
export const [spinLists, setSpinLists] = createSignal([])
export const [spinOffsets, setSpinOffsets] = createSignal([])

const SpinnersContainerVerticalMobile = (props) => {
  const generateSpinData = () => {
    const newSpinIndexes = []
    const newSpinLists = []

    for (let i = 0; i < props.numSpinners(); i++) {
      const spinIndex = getRandomIndex()
      let spinList = generateSpinList()
      spinList[spinIndex] = props.spinnerOptions()[i].winningItem

      newSpinLists.push(spinList)
      newSpinIndexes.push(spinIndex)
    }
    setSpinIndexes(newSpinIndexes)
    setSpinLists(newSpinLists)
  }

  const resetValues = () => {
    setSpinLists([])
    setSpinIndexes(null)
    setSpinOffsets([])
    setActiveSpinners(0)
  }

  const generateSpinList = () => {
    setSpinOffsets([])
    const newSpinList = []
    for (let i = 0; i < 35; i++) {
      newSpinList.push(
        props.caseItemList()[Math.floor(Math.random() * props.caseItemList().length)]
      )
    }
    return newSpinList
  }

  const getRandomIndex = () => {
    return (
      Math.floor(
        Math.random() * (otherOptions.verticalEndBound - otherOptions.verticalStartBound + 1)
      ) + otherOptions.verticalStartBound
    )
  }

  const spinReels = () => {
    if (reelsSpinning()) {
      setActiveSpinners(0)
    }
    resetValues()
    setActiveSpinners(props.numSpinners())
    generateSpinData()
    setReelsSpinning(true)
  }

  createEffect(() => {
    if (spinReelsTrigger.triggered) {
      spinReels()
      setSpinReelsTrigger({ triggered: false })
    }
  })

  return (
    <div class="relative w-full">
      <Switch>
        <Match when={props.numSpinners()}>
          <div class={`relative flex rounded w-full min-w-max`} g ref={setContainerRef}>
            <div class="grid grid-cols-2 gap-y-4 w-full">
              {Array.from({ length: activeSpinners() }).map((_, index) => {
                return (
                  props.spinnerOptions()[index] && (
                    <SpinnerReelVerticalMobile
                      spinnerIndex={index}
                      isConfettiWin={props.spinnerOptions()[index].isConfettiWin}
                      isBigWin={props.spinnerOptions()[index].isBigWin}
                      isFastSpin={isFastAnimation()}
                      setBeginClickSound={props.setBeginClickSound}
                      setBeginPullBackSound={props.setBeginPullBackSound}
                      setBeginWinSound={props.setBeginWinSound}
                    />
                  )
                )
              })}
            </div>
          </div>
        </Match>
      </Switch>
    </div>
  )
}

export default SpinnersContainerVerticalMobile
