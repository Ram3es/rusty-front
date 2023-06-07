import { For, onMount, onCleanup } from 'solid-js'
import { useDebounce } from '../../utilities/hooks/debounce'

const RangePercentScale = (props) => {
  let inputRef

  const updateRangeByValue = (value) => {
    inputRef.style.background = `linear-gradient(to right, ${props.hexColor} 0%, ${props.hexColor} ${value}%, rgba(255, 255, 255, 0.08) ${value}%, rgba(255, 255, 255, 0.08) 100%)`
  }

  const handleChange = (event) => {
    updateRangeByValue(event.target.value)
    props.setter(event.target.value)
  }

  // const debouncedSetter = useDebounce(handleChange, 100)

  onMount(() => {
    if (inputRef) {
      updateRangeByValue(props.value)
    }
    inputRef.addEventListener('input', (event) => {
      handleChange(event)
    })

    onCleanup(() => {
      inputRef.removeEventListener('input', (event) => {
        handleChange(event)
      })
    })
  })

  const getSizesByScalePosition = (indexPosition, match, mismatch) => {
    return indexPosition === 99 || indexPosition % Math.floor(100 * 0.25) === 0 ? match : mismatch
  }

  const rangePercent = (value) => {
    const values = []
    for (let i = 0; i <= value; i += value / 4) {
      values.push(Math.round(i))
    }
    return values
  }

  const percents = rangePercent(props.maxPercent)
  let percentIndex = 0

  return (
    <div class='mb-4 px-4 flex flex-col items-center justify-center w-[330px] xll:w-[350px] fourk:w-[375px]'>
      <div class='flex justify-center w-full'>
        <input
          ref={inputRef}
          type='range'
          class='borrow-slider h-1.5 rounded-1 appearance-none w-[330px] xll:min-w-[350px] fourk:min-w-[375px] z-10'
          min='0'
          max='100'
          step='1'
          value={props.value}
          onChange={handleChange}
        />
      </div>
      <ul class='flex justify-between xll:justify-center xll:items-center xll:gap-[2.43px] fourk:gap-[2.7px] w-full z-0'>
        <For each={Array.from({ length: 100 }, (_, i) => i)}>
          {(_, i) => (
            <li class='relative'>
              <svg
                width={getSizesByScalePosition(i(), '3', '1')}
                height={getSizesByScalePosition(i(), '8', '6')}
                viewBox={`0 0 ${getSizesByScalePosition(i(), '3', '1')} ${getSizesByScalePosition(i(), '8', '6')}`}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  width={getSizesByScalePosition(i(), '3', '1')}
                  height={getSizesByScalePosition(i(), '8', '6')}
                  fill='#1D1E2E'
                />
              </svg>
              {(i() === 99 || i() % Math.floor(100 * 0.25) === 0) && (
                <span class='absolute text-center left-[-12px] border border-gray-1d p-1 rounded text-gray-9a text-10 font-bold font-SpaceGrotesk'>
                  {percents[percentIndex++]}%
                </span>
              )}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export default RangePercentScale
