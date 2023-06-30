import { createEffect, createSignal, mergeProps, For } from 'solid-js'

import PageLoader from '../PageLoader'
import PotentialDropItem from '../../views/case/PotentialDropItem'


const ListItems = (_props) => {
  const props = mergeProps({ activeItems: () => [] }, _props)
  
  const [isItemsLoaded, setIsItemsLoaded] = createSignal(false)

  let paymentModalWrapper

  createEffect(() => {
    if (props.items()?.length > 0) setIsItemsLoaded(true)
    
  })

  return (
    <div class='w-full justify-center items-center h-[460px] overflow-y-scroll'>
      <div
        ref={paymentModalWrapper}
        class='grid w-full grid-cols-1 xl:grid-cols-3 gap-2 relative'
      >
        <For each={props.items()}>
          {(item) => (
            <PotentialDropItem skin={item} />
          )}
        </For>
      </div>
      <div class='m-auto absolute inset-0 -z-10 flex items-center justify-center'>
        <PageLoader size='small' isShown={!isItemsLoaded()} />
      </div>
    </div>
  )
}

export default ListItems
