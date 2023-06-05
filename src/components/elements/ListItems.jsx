import { createEffect, createSignal, mergeProps, For } from 'solid-js'

import Coin from '../../utilities/Coin'
import PageLoader from '../PageLoader'

const skinStylesConfig = [
  {
    condition: 2000,
    shadowLogoColor: 'rgba(235, 172, 50, 0.16)',
    itemBg: 'bet-history--item__yellow'
  },
  {
    condition: 1500,
    shadowLogoColor: 'rgba(255, 27, 27, 0.16)',
    itemBg: 'bet-history--item__red'
  },
  {
    condition: 1000,
    shadowLogoColor: 'rgba(214, 48, 255, 0.16)',
    itemBg: 'bet-history--item__purple'
  },
  {
    condition: 500,
    shadowLogoColor: 'rgba(40, 152, 255, 0.16)',
    itemBg: 'bet-history--item__blue'
  },
  {
    condition: 100,
    shadowLogoColor: 'rgba(198, 198, 198, 0.16)',
    itemBg: 'bet-history--item__gray'
  },
  {
    condition: 0,
    shadowLogoColor: 'rgba(255, 27, 27, 0.16)',
    itemBg: 'bet-history--item__lose'
  }
]

const ListItems = (_props) => {
  const props = mergeProps({ activeItems: () => [] }, _props)
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false)
  let paymentModalWrapper

  const checkImageLoaded = () => {
    const updateStatus = (images) => {
      setIsItemsLoaded(images.map((image) => image.complete).every((item) => item === true))
    }

    const imagesLoaded = Array.from(paymentModalWrapper.querySelectorAll('img'))
    if (imagesLoaded.length === 0) {
      return
    }
    imagesLoaded.forEach((image) => {
      image.addEventListener('load', () => updateStatus(imagesLoaded), {
        once: true
      })
      image.addEventListener('error', () => updateStatus(imagesLoaded), {
        once: true
      })
    })
  }

  createEffect(() => {
    if (props.items()?.length > 0) return

    setIsItemsLoaded(false)
  })

  createEffect(() => {
    if (!isItemsLoaded() && props?.items()?.length) {
      checkImageLoaded()
    }
  })

  const getCurrentStylesByPrice = (skinPrice) => {
    for (const config of skinStylesConfig) {
      if (skinPrice >= config.condition) {
        return {
          shadowLogoColor: config.shadowLogoColor,
          itemBg: config.itemBg
        }
      }
    }
  }

  return (
    <div class='w-full justify-center items-center h-[305px] overflow-y-scroll'>
      <div
        ref={paymentModalWrapper}
        class='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 relative'
      >
        <For each={props.items()} fallback={<PageLoader size='small' isShown={true} />}>
          {(item) => (
            <div
              class={`group w-[120px] h-[120px] z-10 rounded-4 cursor-pointer bet-history--item ${
                getCurrentStylesByPrice(item.price).itemBg
              } font-SpaceGrotesk`}
            >
              <div class='rounded-4 absolute inset-0 z-10 flex flex-col justify-items-center justify-between gap-[9px] pt-4 pb-2'>
                <div class='flex items-center justify-center'>
                  <div
                    class='h-[60px] w-[60px] flex items-center justify-center'
                    style={{
                      filter: `drop-shadow(0px 0px 16px ${
                        getCurrentStylesByPrice(item.price).shadowLogoColor
                      })`
                    }}
                  >
                    <img
                      style={{
                        filter: 'drop-shadow(0px 0px 24px 0px #5096FF8F)'
                      }}
                      alt='item-image'
                      src={item?.image}
                      class='w-full h-full  z-10'
                    />
                  </div>
                </div>

                <div class='flex items-center justify-center'>
                  <div class='flex gap-1.5'>
                    <Coin width='5' />
                    <span class='font-bold text-sm potential-drop--price'>
                      {Number(item.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
      <div class='m-auto absolute inset-0 flex items-center justify-center'>
        <PageLoader size='small' isShown={!isItemsLoaded()} />
      </div>
    </div>
  )
}

export default ListItems
