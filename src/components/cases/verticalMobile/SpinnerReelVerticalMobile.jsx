import { For, Match, Switch, createEffect, createSignal } from 'solid-js'

import {
  containerRef,
  reelsSpinning,
  spinIndexes,
  spinLists,
  spinOffsets
} from './SpinnersContainerVerticalMobile'
import { setIsRolling } from '../../../views/unbox/CaseUnboxing'
import { spinnerTimings, otherOptions } from '../../../libraries/caseSpinConfig'

import bglogo_gold from '../../../assets/img/case-battles/bglogo_gold.png'
import bglogo_blue from '../../../assets/img/case-battles/bglogo_blue.png'
import bglogo_red from '../../../assets/img/case-battles/bglogo_red.png'
import bglogo_purple from '../../../assets/img/case-battles/bglogo_purple.png'
import bglogo_gray from '../../../assets/img/case-battles/bglogo_gray.png'

import confetti from 'canvas-confetti'
import Coin from '../../../utilities/Coin'

const LAND_IN_MIDDLE_CHANCE = otherOptions.landInMiddleChanceVertical

const bglogos = {
  gold: bglogo_gold,
  blue: bglogo_blue,
  red: bglogo_red,
  purple: bglogo_purple,
  gray: bglogo_gray
}

const [timeMultiplier, setTimeMultiplier] = createSignal(1)

const SpinnerReelVerticalMobile = (props) => {
  createEffect(() => {
    if (props.isFastSpin) {
      setTimeMultiplier(spinnerTimings.fastSpinMultiplier)
    } else {
      setTimeMultiplier(1)
    }
  })

  createEffect(() => {
    if (spinLists()) {
      setReelItem(() => document.querySelector('[data-reel-item]'))
    }
    console.log(spinLists(), 'spinLISTS')
  })

  const [reelItem, setReelItem] = createSignal()
  const [imgItem, setImgItem] = createSignal()
  const [reel, setReel] = createSignal()

  const [topIndex, setTopIndex] = createSignal(0)
  const [translateY, setTranslateY] = createSignal(0)

  const calculateTopIndexOffset = () => {
    const getCurrentRatio = spinLists().length > 2 ? 4 : 2

    const referencePoint = containerRef().offsetHeight / getCurrentRatio
    const itemHeight = reelItem().offsetHeight
    const imgHeight = imgItem().offsetHeight
    return referencePoint - itemHeight - imgHeight / 2
  }

  const [spinTime, setSpinTime] = createSignal(spinnerTimings.verticalInitialSpin)
  const [timingFunction, setTimingFunction] = createSignal(
    // "cubic-bezier(.48,.84,.49,1)"
    'cubic-bezier(.2,1,.53,1)'
    // "cubic-bezier(.2,.96,.24,.99)"
  )
  const [spinComplete, setSpinComplete] = createSignal(false)

  let hasSpun = false
  createEffect(() => {
    if (reelsSpinning() && !hasSpun) {
      hasSpun = true
      setTranslateY(calculateTopIndexOffset())
      moveToIndex(spinIndexes()[props.spinnerIndex])
    }
  })

  const moveToIndex = (index) => {
    const itemHeight = reelItem().offsetHeight
    let moveAmount = (index - 1) * itemHeight
    const spinOffSet = getSpinOffSet()
    const positiveOffSet = Math.floor(Math.random() * 2)
    if (positiveOffSet) {
      moveAmount += spinOffSet
    } else {
      moveAmount -= spinOffSet
    }
    setTopIndex(moveAmount)
    props.setBeginClickSound(true)
    setTimeout(() => {
      setTimeout(() => {
        correctForOffset(index)
      }, 200)
    }, spinnerTimings.verticalInitialSpin * 1000 * timeMultiplier())
  }

  const correctForOffset = (index) => {
    const itemHeight = reelItem().offsetHeight
    let moveAmount = (index - 1) * itemHeight

    setSpinTime(spinnerTimings.verticalSnapBack)
    setTimeMultiplier(1)
    setTimingFunction('cubic-bezier(0.25, 1, 0.5, 1)')

    setTopIndex(moveAmount)

    props.setBeginPullBackSound(true)

    setTimeout(() => {
      setSpinComplete(true)

      if (props.isConfettiWin) {
        createConfetti()
        props.setBeginWinSound(true)
      }

      setTimeout(() => {
        hasSpun = false
        setIsRolling(false)
      }, 500)
    }, 500)
  }

  const withinOtherReelBounds = (newOffset) => {
    for (let i = 0; i < spinOffsets().length; i++) {
      const currOffset = spinOffsets()[i]

      const lowerBound = currOffset * 0.9
      const upperBound = currOffset * 1.1

      if (newOffset >= lowerBound && newOffset <= upperBound) {
        return true
      }
    }

    return false
  }

  const getSpinOffSet = () => {
    const itemHeight = reelItem().offsetHeight
    const landInMiddle = Math.random() <= LAND_IN_MIDDLE_CHANCE
    if (landInMiddle) {
      let newOffset = itemHeight / 2 - Math.random() * 0.1 * itemHeight

      if (withinOtherReelBounds(newOffset)) {
        newOffset = itemHeight / 2 - Math.random() * 0.1 * itemHeight
      }
      spinOffsets().push(newOffset)

      return newOffset
    }

    const newOffset = Math.floor((Math.random() * 0.95 + 0.05) * itemHeight) / 2
    spinOffsets().push(newOffset)

    return newOffset
  }

  const [confettiActive, setConfettiActive] = createSignal(false)
  const [confettiCannonRefA, setConfettiCannonRefA] = createSignal()

  const createConfetti = () => {
    if (!confettiActive()) {
      setConfettiActive(true)

      const rectA = confettiCannonRefA().getBoundingClientRect()

      const xA = (rectA.left + rectA.right) / 2 / window.innerWidth
      const yA = (rectA.top + rectA.bottom) / 2 / window.innerHeight

      // Fire confetti every 100 milliseconds (you can adjust this value)
      const intervalDuration = 30
      const particleCount = 5
      const spread = 30
      const startVelocity = 25
      const colorCodes = {
        purple: '#9c27b0',
        gold: '#ffeb3b',
        red: '#f44336',
        blue: '#2196f3',
        gray: '#9e9e9e'
      }
      const spinList = spinLists()[props.spinnerIndex]
      const color = spinList[spinIndexes()[props.spinnerIndex]].rarity
      const ticks = 70

      const confettiInterval = setInterval(() => {
        confetti({
          particleCount,
          spread,
          origin: { x: xA, y: yA },
          startVelocity,
          colors: ['#FFFFFF', colorCodes[color]],
          ticks
        })
      }, intervalDuration)

      // Clear the interval after 3 seconds
      setTimeout(() => {
        clearInterval(confettiInterval)
        setConfettiActive(false)
      }, 200)
    }
  }

  createEffect(() => {
    console.log(spinLists().length, 'spinLists().length')

    console.log(props.spinnerIndex, 'spn index')
  })

  return (
    <div
      id="slot-screen"
      class="relative gap-2 w-full h-[264px] flex flex-col items-center justify-center overflow-hidden"
      classList={{
        'border-r-[2px] border-black/20': !(props.spinnerIndex % 2),
        'horisontal-borders-right rounded-tr-8 rounded-br-8':
          (spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
          (spinLists().length === 3 && props.spinnerIndex % 2),
        'horisontal-borders-left rounded-tl-8 rounded-bl-8':
          (spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
          (spinLists().length === 3 &&
            !(props.spinnerIndex % 2) &&
            !(spinLists().length === 3 && props.spinnerIndex === 2)),
        'horisontal-borders rounded-8': spinLists().length === 3 && props.spinnerIndex === 2
      }}
      style={{
        background:
          'linear-gradient(90deg, rgba(118, 124, 255, 0.00) 0%, rgba(118, 124, 255, 0.12) 50.00%, rgba(118, 124, 255, 0.00) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), radial-gradient(226.07% 93.40% at 60.38% 107.30%, #1F2344 0%, #23253D 100%)'
      }}
    >
      <Switch>
        <Match
          when={
            (spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
            (spinLists().length === 3 && props.spinnerIndex === 0)
          }
        >
          <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
        </Match>
        <Match
          when={
            (spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
            (spinLists().length === 3 && props.spinnerIndex % 2)
          }
        >
          <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
        </Match>
        <Match when={spinLists().length === 3 && props.spinnerIndex === 2}>
          <div class="arrow-down absolute top-2/4 -left-[14px] -translate-y-1/2 -rotate-90 scale-[0.5]" />
          <div class="arrow-down absolute top-2/4 -right-[14px] -translate-y-1/2 rotate-90 scale-[0.5]" />
        </Match>
      </Switch>
      <div class={`overflow-y-hidden w-full overflow-x-hidden`}>
        <div
          id="reels"
          ref={setReel}
          class={`relative flex flex-col transition-all w-full`}
          // eslint-disable-next-line solid/style-prop
          style={`
            transform: translateY(${translateY() - topIndex()}px);
            transition-timing-function: ${timingFunction()};
            transition-duration: ${spinTime() * timeMultiplier()}s;
          `}
        >
          <For each={spinLists()[props.spinnerIndex]}>
            {(item, index) => (
              <div
                ref={setReelItem}
                class={`h-[49px] flex flex-col gap-1 text-3xl transition-all duration-500 items-center
                 ${
                   spinComplete()
                     ? index() === spinIndexes()[props.spinnerIndex]
                       ? 'scale-[1.9] -translate-y-8'
                       : 'opacity-40 grayscale'
                     : null
                 }`}
                data-reel-item
              >
                <div class="relative z-10 flex">
                  <img
                    src={item.img}
                    ref={setImgItem}
                    alt={item.name}
                    class={`${
                      spinComplete()
                        ? index() === spinIndexes()[props.spinnerIndex]
                          ? 'animate-bounce'
                          : ''
                        : null
                    } h-[49px] z-20`}
                  />
                  <img
                    src={bglogos[item.rarity]}
                    alt={item.rarity + ' glow'}
                    class="absolute z-10 scale-1"
                  />
                </div>
                {/* <div
                  class={`font-SpaceGrotesk flex flex-col flex-wrap items-center transition-all duration-500 overflow-visible gap-[4px]
                  ${
                    spinComplete() && index() === spinIndexes()[props.spinnerIndex]
                      ? 'scale-1'
                      : 'scale-0'
                  }`}
                >
                  <div class="text-gray-a2 font-SpaceGrotesk font-bold max-w-[120px] truncate text-13 leading-[13px]">
                    {item.name}
                  </div>
                  <div class="flex shrink whitespace-nowrap">
                    <Coin width="2" />
                    <span class="font-bold text-14 potential-drop--price max-w-[120px] truncate">
                      {Number(item.price).toLocaleString()}
                    </span>
                  </div>
                </div> */}
              </div>
            )}
          </For>
        </div>
      </div>
      <Switch>
        <Match
          when={
            (spinLists().length % 2 === 0 && !(props.spinnerIndex % 2)) ||
            (spinLists().length === 3 && (props.spinnerIndex === 0 || props.spinnerIndex === 2))
          }
        >
          <img
            src="assets/caselinemobile.svg"
            alt="caseline"
            class={`absolute w-full left-3 transition-all duration-500 
          ${spinComplete() ? 'opacity-30' : 'opacity-100'}
        `}
          />
        </Match>
        <Match
          when={
            (spinLists().length % 2 === 0 && props.spinnerIndex % 2) ||
            (spinLists().length === 3 && props.spinnerIndex % 2)
          }
        >
          <img
            src="assets/caselinemobileright.svg"
            alt="caseline"
            class={`right-3 absolute w-full  transition-all duration-500 
          ${spinComplete() ? 'opacity-30' : 'opacity-100'}
        `}
          />
        </Match>
      </Switch>
      {/* сделать инвисибл пока крутиться */}
      <div
        class="absolute left-0 top-0 w-full h-[47px]"
        style={{
          background: 'linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)'
        }}
      />
      <div
        class="absolute left-0 bottom-0 w-full h-[47px]"
        style={{
          background: 'linear-gradient(180deg, #1A1C33 5.86%, rgba(26, 28, 51, 0) 100%)',
          transform: 'matrix(-1, 0, 0, -1, 0, 0)'
        }}
      />
      <div
        class={`absolute self-center h-20 w-20
         -bottom-2`}
        ref={setConfettiCannonRefA}
      />
    </div>
  )
}

export default SpinnerReelVerticalMobile
