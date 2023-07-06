import { createEffect, createSignal, For } from 'solid-js'
import PageLoadState from '../../libraries/PageLoadState'
import Fallback from '../Fallback'
import Coin from '../../utilities/Coin'
import { NavLink } from 'solid-app-router'
import { URL } from '../../libraries/url'
import Injector from '../../injector/injector'
import TransparentButton from '../../components/elements/TransparentButton'
import headerLogoBgVector from '../../assets/img/header/headerLogoBgVector.png'
import GradientButton from '../../components/elements/GradientButton'
import CaseSearchInput from '../case/CaseSearchInput'
import GoldText from "../../components/mines_new/MISC/GoldText"
import {getCurrencyString} from "../../components/mines_new/utils/tools"

const filterByTagList = [
  {
    tags: [],
    name: 'All Cases'
  },
  {
    tags: ['popular'],
    name: 'Popular'
  },
  {
    tags: ['VIP'],
    name: 'Trending'
  },
  {
    tags: ['High Risk'],
    name: 'High Risk'
  },
  {
    tags: ['50/50'],
    name: '50-50 Cases'
  },
  {
    tags: ['10%'],
    name: '10% Cases'
  }
]

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

const Unbox = (props) => {
  const { unboxPageLoaded, onUnboxPageLoaded } = PageLoadState
  const [search, setSearch] = createSignal('')
  const [tagsToFilter, setTagsToFilter] = createSignal(filterByTagList[0].tags)
  const [cases, setCases] = createSignal([])
  const { socket } = Injector
  createEffect(() => {
    console.log(cases());
  })
  createEffect(() => {
    if (props.loaded()) {
      onUnboxPageLoaded(true)
      // socket.emit("cases:get", {price: sortBy() === sortOptions[0] ? "desc" : "asc"}, (data) => {
      //   console.log(data.data.cases);
      //   setCases(() => data.data.cases)
      // });
      socket.emit('battles:cases', { price: 'desc' }, (data) => {
        console.log(data.data.cases)
        setCases(() => data.data.cases)
      })
    }
  })

  return (
    <Fallback loaded={unboxPageLoaded}>
      {/* <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" /> */}
      <div class='w-full h-full flex flex-col lg:gap-11 relative min-h-screen pb-1 lg:py-4 xl:py-8 xxl:py-14'>
        <div class='flex flex-wrap items-center gap-4 lg:gap-3 lg:px-4 py-6 lg:py-3 rounded-8 border border-opacity-5 border-black drop-shadow-dark bg-control-panel'>
          <div class='flex overflow-scroll lg:flex-wrap lg:justify-center xl:justify-start grow gap-2'>
            <For each={filterByTagList}>
              {(item) => (
                <TransparentButton
                  callbackFn={() => setTagsToFilter(item.tags)}
                  isActive={compareArrays(item.tags, tagsToFilter())}
                >
                  <span class='truncate'>
                    {item.name}
                  </span>
                </TransparentButton>
              )}
            </For>
          </div>
          <div class='w-full lg:w-80 flex justify-end mx-auto xl:mx-0'>
            <CaseSearchInput
              search={search()}
              onReset={() => setSearch('')}
              onInput={(text) => setSearch(text)}
              isFullWidth
            />
          </div>
        </div>
        <div class='grid mt-2 lg:mt-6 grid-cols-2 lg:grid-cols-box-open gap-4 lg:gap-2'>
          <For each={cases()
            .filter((c) => c.name.toLowerCase().includes(search().toLowerCase()))
            .filter((c) => tagsToFilter().length === 0 || tagsToFilter().some(item => c.tags.includes(item)))}>
            {(item) => (
              <NavLink
                href={`${URL.CASE_UNBOXING}?id=${item.id}`}
                class='case-card-background border border-white border-opacity-5 group h-[285px] flex flex-col hover:border-yellow-ffb hover:border-2 hover:border-opacity-100 relative rounded-6 overflow-hidden'
                style={{
                  transform: 'translate3d(0,0,0)' 
                }}
              >
                <div
                  class='absolute left-0 top-0 w-full h-full z-0'
                  style={{
                    'background-image': `url('${headerLogoBgVector}')`
                  }}
                />
                <div class='relative grow z-10 px-4 pb-5 pt-9 flex flex-col justify-between items-center'>
                  <img
                    class='w-auto h-[86px] lg:h-[127px] scale-150 absolute group-hover:rotate-6 top-6'
                    src={item.image ? item.image.replace('{url}', window.origin) : ''}
                    alt={item.name}
                    style={{
                      filter: `drop-shadow(0px 0px 17.9649px rgba(255, 255, 255, 0.12))`,
                      transition: `all 0.15s ease-in-out`,
                    }}
                  />
                  <div class='w-auto h-[86px] lg:h-[127px]'/>
                  <div class='w-full block truncate group-hover:scale-x-0'
                    style={{
                      transition: `all 0.15s ease-in-out`,
                  }}
                  >
                    <TransparentButton
                      callbackFn={() => setTagsToFilter(item.tags)}
                      isActive={false}
                      isFullWidth={true}
                    >
                      {item.name}
                    </TransparentButton>
                  </div>
                  <div class='absolute bottom-5 w-[181px] scale-x-0 group-hover:scale-x-100'
                    style={{
                      transition: `all 0.15s ease-in-out`,
                  }}
                  >
                    <GradientButton isFullWidth={true} isActive={true}>
                      View Case
                    </GradientButton>
                  </div>
                </div>
                <div class='w-full center gap-2 bg-dark-gradient group-hover:bg-dark-to-yellow h-12 relative z-10'>
                  <Coin />
                  <GoldText text={getCurrencyString((item.price).toString())} size="16"/>
                </div>
              </NavLink>
            )}
          </For>
        </div>
      </div>
    </Fallback>
  )
}

export default Unbox
