import { createEffect, createSignal, For } from 'solid-js'
import PageLoadState from '../../libraries/PageLoadState'
import Fallback from '../Fallback'
// import Bg from "../../assets/img/unbox/unboxBg.jpg";
// import PageTitleWithShapes from "../../components/elements/PageTitleWithShapes";
// import InputSearchIcon from "../../components/icons/InputSearchIcon";
import HoveredButton from '../../components/elements/HoveredButton'
// import Dropdown from "../../components/elements/Dropdown";
// import PopularCasesIcon from "../../components/icons/cases/PopularCasesIcon";
// import VipCasesIcon from "../../components/icons/cases/VipCasesIcon";
// import HighRiskIcon from "../../components/icons/cases/HighRiskIcon";
// import FiftyPercentIcon from "../../components/icons/cases/FiftyPercentIcon";
// import TenPercentIcon from "../../components/icons/cases/TenPercentIcon";
// import OnePercentIcon from "../../components/icons/cases/OnePercentIcon";
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

// let typingTimer;
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
// const priceRanges = ['All Prices', '0-5,000', '5,000-15,000', '15,000-50,000', '50,000-100,000', '100,000-250,000', '250,000+'];
// const sortOptions = ['Price (High to Low)', 'Price (Low to High)']

// function filterByRange(arrayOfCases, range) {
//   const [min, max] = range.split('-').map(val => parseInt(val.replace(',', '')));
//   switch (range) {
//     case 'All Prices':
//       return arrayOfCases
//     case '250,000+':
//       return arrayOfCases.filter(item => item.price >= 250000);
//     default:
//       return arrayOfCases.filter(item => item.price >= min && item.price <= max);
//   }
// }

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

// const getTitleByTagName = (tagName) => {
//   return (
//     <>
//       <Show when={tagName === 'popular'}>
//         <div class="flex gap-4 items-center casesTagWrapper text-blue-9b text-16 font-Lato font-extrabold">
//           <PopularCasesIcon />
//           Popular Cases
//         </div>
//       </Show>
//       <Show when={tagName === 'VIP'}>
//         <div class="flex gap-4 items-center text-blue-9b text-16 font-Lato font-extrabold">
//           <VipCasesIcon />
//           Vip Cases
//         </div>
//       </Show>
//       <Show when={tagName === 'High Risk'}>
//         <div class="flex gap-4 items-center text-blue-9b text-16 font-Lato font-extrabold">
//           <HighRiskIcon />
//           High Risk
//         </div>
//       </Show>
//       <Show when={tagName === '50/50'}>
//         <div class="flex gap-4 items-center text-blue-9b text-16 font-Lato font-extrabold">
//           <FiftyPercentIcon />
//           50-50 Chance
//         </div>
//       </Show>
//       <Show when={tagName === '10%'}>
//         <div class="flex gap-4 items-center text-blue-9b text-16 font-Lato font-extrabold">
//           <TenPercentIcon />
//           10 Percents
//         </div>
//       </Show>
//       <Show when={tagName === '1%'}>
//         <div class="flex gap-4 items-center text-blue-9b text-16 font-Lato font-extrabold">
//           <OnePercentIcon />
//           1% Chance
//         </div>
//       </Show>
//     </>
//   )
// }



const Unbox = (props) => {
  const { unboxPageLoaded, onUnboxPageLoaded } = PageLoadState
  const [search, setSearch] = createSignal('')
  const [tagsToFilter, setTagsToFilter] = createSignal(filterByTagList[0].tags)
  // const [ priceRange, setPriceRange ] = createSignal(priceRanges[0]);
  // const [ sortBy, setSortBy ] = createSignal(sortOptions[0]);
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
      <div class='w-full h-full flex flex-col gap-11 relative min-h-screen py-4 xl:py-8 xxl:py-14'>
        <div class='flex flex-wrap items-center gap-3 px-4 py-3 rounded-8 border border-opacity-5 border-black drop-shadow-dark bg-control-panel'>
          <div class='flex flex-wrap justify-center xl:justify-start grow gap-2'>
            <For each={filterByTagList}>
              {(item) => (
                <TransparentButton
                  callbackFn={() => setTagsToFilter(item.tags)}
                  isActive={compareArrays(item.tags, tagsToFilter())}
                >
                  {item.name}
                </TransparentButton>
              )}
            </For>
          </div>
          <div class=' w-full ssm:w-80 flex justify-end mx-auto xl:mx-0 gap-4 '>
            {/* <div class="flex items-center gap-1">
              <span class="font-Lato font-normal text-14 text-gray-8c">Price Range</span>
              <Dropdown
                activeName={priceRange()}
                itemsList={priceRanges}
                submitItem={(price) => setPriceRange(price)}
              />
            </div>
            <div class="flex items-center gap-1">
              <span class="font-Lato font-normal text-14 text-gray-8c">Sort</span>
              <Dropdown
                activeName={sortBy()}
                itemsList={sortOptions}
                submitItem={(sort) => setSortBy(sort)}
              />
            </div> */}
            <CaseSearchInput
              search={search()}
              onReset={() => setSearch('')}
              onInput={(text) => setSearch(text)}
              isFullWidth
            />
          </div>
        </div>
        <div class='grid mt-6 grid-cols-box-open gap-2'>
          <For each={cases()
            .filter((c) => c.name.toLowerCase().includes(search().toLowerCase()))
            .filter((c) => tagsToFilter().length === 0 || tagsToFilter().some(item => c.tags.includes(item)))}>
            {(item) => (
              // <div>{item.name}</div>
              <NavLink
                href={`${URL.CASE_UNBOXING}?id=${item.id}`}
                class='case-card-background border border-white border-opacity-5 group h-[285px] flex flex-col hover:border-yellow-ffb hover:border-2 hover:border-opacity-100 relative rounded-6 overflow-hidden'
              >
                <div
                  class=' absolute left-0 top-0 w-full h-full z-0'
                  style={{
                    'background-image': `url('${headerLogoBgVector}')`
                  }}
                />
                <div class='relative grow z-10 px-4 pb-5 pt-9 flex flex-col justify-between items-center'>
                  <img
                    class='w-auto h-[127px] scale-150 absolute group-hover:rotate-6 top-6'
                    src={item.image ? item.image.replace('{url}', window.origin) : ''}
                    alt={item.name}
                    style={{
                            filter: `drop-shadow(0px 0px 17.9649px rgba(255, 255, 255, 0.12))`,
                          }}
                  />
                  <div class='w-auto h-[127px]'/>
                  <div class='w-full block group-hover:hidden'>
                    <TransparentButton
                      callbackFn={() => setTagsToFilter(item.tags)}
                      isActive={false}
                      isFullWidth={true}
                    >
                      {item.name}
                    </TransparentButton>
                  </div>
                  <div class='w-full hidden group-hover:block'>
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
