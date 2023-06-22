import { For, createSignal, onMount } from 'solid-js'
import Ranks from "../../utilities/Ranks"
import CloseButton from "../elements/CloseButton"
import Modal from "./Modal"
import Mask from "../../assets/img/affilates/affilatesMaskBg.png"
import RibbedMask from "../../assets/img/rewards/rewards-ribbed-mask-lg.png"
import RibbedBennefitsMask from "../../assets/img/rewards/ribbed-mask-benefits.png"
import RankLabel from "../chat/RankLabel"
import injector from '../../injector/injector'
import { RoundedBtn } from '../new-home/BannerSection'
import ArrowSliderStyle from '../icons/ArrowSliderStyle'
import ScaleLine from '../ScaleLine'

const BenefitCard = (props) => {
    return (
        <div 
            class='relative text-10 font-bold font-SpaceGrotesk'
            onClick={() => props?.onSelect()}
        >
            <div 
                class=' relative min-w-[123px] h-[172px] flex flex-col  items-center py-5 px-3 rounded-t-8 cursor-pointer z-10'
                classList={{
                    "benefit-card-unlocked": !props.locked ,
                    "benefit-card-current" : props.current,
                    "benefit-card-locked opacity-30 " : props.locked && !props.current
                }}
            >
                <div class='h-9'>
                    <Ranks
                        width='9'
                        staff={''}
                        rank={props.card.id}
                    />
                </div>
                <h3 class='uppercase text-white mt-2.5 mb-1'>{props.card.name || 'Prefered'}</h3>
                <For each={props.card?.text?.slice(0,3)}>
                    {(str) => <p class={`w-fit ${props.card.id === 'default'  ? 'text-gray-a2': 'text-green-27'} `}>{str}</p>}
                </For>
                <p class={`${props.card?.text?.slice(3).length ? 'block' : 'hidden'} text-gray-a2`}>+{props.card?.text?.slice(3).length} more</p>
            </div>
            <div class='absolute right-0 bottom-1 shadow-button' >
                {!props.locked && !props.current 
                 ? (
                    <div
                        class={props.labelStyles ?? "w-[74px] h-5 rounded-tl-4 rounded-bl-4 center font-Quicksand uppercase text-green-3e "}
                        style={{
                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                        }}
                    >
                        unlocked
                    </div>
                ): props.current 
                    ?(
                        <div
                        class={props.labelStyles ?? "w-[74px] h-5 rounded-tl-4 rounded-bl-4 center font-Quicksand uppercase  "}
                        style={{
                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(255, 178, 54, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(255, 178, 54, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(255, 225, 66, 0) 0%, rgba(255, 225, 66, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                        }}
                    >
                        <span class='text-gradient-gold'>current</span>
                    </div>

                    ):(<div
                        class={props.labelStyles ?? "w-[74px] h-5 rounded-tl-4 rounded-bl-4 center font-Quicksand uppercase text-green-3e  grayscale "}
                        style={{
                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                        }}
                    >
                        locked
                    </div>

                    )
                }
                
            </div>
        </div>
    )
} 

const RankBenefitsModal = (props) => {
    const { userObject } = injector

    const  [selectedCard, setSelectedCard] =createSignal(props?.benefits.find(card => card.id === userObject?.user?.level?.league))  

    let scrollableElem;
    let btnRight;
    let btnLeft;
    const offset = 342

    const listLeagues = props?.benefits.map(item => item.id)

    onMount(() => {
        if(btnRight && btnLeft){
            btnRight.style.display = 'block'
            btnLeft.style.display = 'none'
        }
    })

    const forward = () => {
        scrollableElem.style.scrollBehavior= 'smooth';
        scrollableElem.scrollLeft = Math.ceil(scrollableElem.scrollLeft) + offset;
        btnLeft.style.display = 'block'

        if((scrollableElem.scrollWidth - scrollableElem.clientWidth) <= Math.ceil(scrollableElem.scrollLeft + offset)){
            btnRight.style.display = 'none'
        }
    }
    const backward = () => {
        scrollableElem.style.scrollBehavior= 'smooth';
        scrollableElem.scrollLeft =  Math.ceil(scrollableElem.scrollLeft) - offset; 
        
        if((scrollableElem.scrollLeft - offset) < 1){
            btnLeft.style.display = 'none'
        }
        if((scrollableElem.scrollWidth - scrollableElem.clientWidth) >= scrollableElem.scrollLeft){
            btnRight.style.display = 'block'
        }

    }
    return (
        <Modal
            open={() => true}
        >
            <div 
              onClick={() => props?.onClose()} class='w-full h-full absolute left-0 top-0'
              style={{ 
                background: "linear-gradient(270.04deg, rgba(26, 27, 48, 0.36) 0%, rgba(25, 28, 53, 0.36) 100%)",
                "backdrop-filter": "blur(8px)"
                }} 
            />
            <div
                class="flex  flex-col absolute top-[5%] w-full max-w-[830px] xll:w-1/2 xll:max-w-full"
            >
                <div
                    class={` w-full flex flex-col relative transition-all rounded-8 rounded-t-12 overflow-hidden  h-[673px]`}
                    style={{
                        background:
                        `radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), 
                         linear-gradient(270.04deg, #1A1B30 0%, #191C35 100%)`
                    }}
                >
                    <div
                        class='flex relative w-full h-max sm:h-22 items-center justify-between px-8 py-6  border border-black border-opacity-10 rounded-t-12'
                        style={{
                        background: 'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)'
                        }}
                    >
                        <div class='w-full flex flex-col sm:flex-row items-center justify-between gap-y-2 font-bold font-SpaceGrotesk mr-0 sm:mr-20'>
                            <div class="flex flex-col items-center sm:items-start">
                                <h2 class="text-20 text-white  uppercase truncate">
                                    RANK BENEFITS 
                                </h2>
                                <div class="font-SpaceGrotesk font-bold text-xs text-gray-64">
                                    Explore our Rank Rewards & Benefits
                                </div>
                            </div>
                            <div class=' w-max flex flex-wrap gap-2 items-center justify-center text-white font-medium text-base '>
                                Current Rank:
                                <div class='flex items-center'>
                                    <div class='z-[1]'>
                                        <Ranks
                                            width='7'
                                            staff={userObject?.user?.rank}
                                            rank={userObject?.user?.level?.league}
                                        
                                        />
                                    </div>
                                    <div class=" -translate-x-4 w-[80px] h-2 rounded-[2px] overflow-hidden home-progress-bg z-0 ">
                                        <div
                                        class="h-full rounded-[2px] duration-200"
                                        style={{
                                            background:
                                            "linear-gradient(269.6deg, #FFB436 0%, #7B633A 100%)",
                                            width: `${
                                                (userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /
                                                (userObject?.user?.level?.to * 10)
                                            }%`,
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div onClick={() => props.onClose()}>
                            <CloseButton />
                        </div>
                    </div>
                    <div class=" flex flex-col gap-3 flex-1 px-8 py-6  relative">
                        <div
                            class='absolute inset-0 z-0'
                            style={{ 'background-image': `url('${Mask}')`}}
                        />
                        <div 
                            class='relative rounded-8  min-h-[212px] mt-5'
                            style={{
                                background: "rgba(0, 0, 0, 0.24)",
                                "box-shadow": "inset 0px 4px 12px rgba(0, 0, 0, 0.24)",
                                "backdrop-filter": "blur(26px)"
                            }}
                        >
                            <div ref={scrollableElem} class=' absolute -top-7 left-0 w-full pt-7 flex gap-12 overflow-scroll'>
                                <For each={props.benefits}>
                                    {(card, idx) => {
                                       const isLocked = listLeagues.indexOf(userObject?.user?.level?.league) < idx()  
                                       return ( 
                                        <BenefitCard 
                                            card={card}
                                            onSelect={() => setSelectedCard({...card, isLocked })}
                                            current={card.id === userObject?.user?.level?.league}
                                            locked={isLocked}
                            
                                        />)}
                                    }
                                </For>
                            </div>
                            <div class='w-full absolute left-0 bottom-3'>
                                <ScaleLine
                                    currentProgres={(userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /(userObject?.user?.level?.to * 10) || 100}
                                    currentLeague={listLeagues.indexOf(userObject?.user?.level?.league)}
                                />
                            </div>
                            <img src={RibbedBennefitsMask} alt='mask' class='absolute inset-0 rounded-8' />
                            <div ref={btnRight} >
                                <RoundedBtn
                                    handleClick={forward}
                                    additionalClasses='absolute -right-4 top-1/3 z-20'
                                >
                                    <ArrowSliderStyle additionalClasses='text-gray-92' />
                                </RoundedBtn>
                            </div>
                            <div ref={btnLeft} >
                                <RoundedBtn
                                    ref={btnLeft} 
                                    handleClick={backward}
                                    additionalClasses='absolute -left-4 top-1/3 z-20'
                                >
                                    <ArrowSliderStyle additionalClasses='text-gray-92 rotate-180' />
                                </RoundedBtn>
                            </div>
                        </div>
                        <div 
                            class='h-8 rounded-4 relative flex gap-2 mb-3 center text-12 font-SpaceGrotesk font-bold text-gray-a2 text-shadow-base overflow-hidden'
                            style={{background: 
                                    `radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), 
                                     linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), 
                                     radial-gradient(100% 275.07% at 0% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)`
                                    }}
                            >
                                <img src={RibbedMask} alt='ribbed-mask'class='absolute  w-full h-full' />
                                <span class='text-gradient font-bold '>{(userObject?.user?.wagered - userObject?.user?.level?.from * 1000) /(userObject?.user?.level?.to * 10) || 100}%</span>
                                until you achive
                                <Ranks
                                    width='5' 
                                    rank={userObject?.user?.level?.next} 
                                />
                                <RankLabel
                                    rank={userObject?.user?.level?.next}
                                />

                        </div>
                        <div 
                            class='flex flex-col gap-6 items-center font-SpaceGrotesk font-bold rounded-6 p-8 h-[240px] z-[1] '
                            style={{background: 
                                        `linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.03) 41.3%, rgba(0, 0, 0, 0.03) 68.93%, rgba(255, 255, 255, 0.03) 100%), 
                                         radial-gradient(136.7% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), 
                                         linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), 
                                         linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)`
                                   }}
                        >
                            <div class='flex h-10 items-center gap-4 text-10 font-SpaceGrotesk font-bold'>
                                <Ranks
                                    width='9' 
                                    rank={selectedCard()?.id} 
                                />
                                <h2 class='uppercase text-white text-base'>{selectedCard()?.name} BENEFITS</h2>
                                {selectedCard()?.isLocked 
                                ? (
                                    <div
                                        class={props.labelStyles ?? "w-[74px] h-5 rounded-4 center font-Quicksand uppercase text-green-3e  grayscale "}
                                        style={{
                                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                                        }}
                                    >
                                        locked
                                    </div>
                                )
                                : (
                                    <div
                                        class={props.labelStyles ?? "w-[74px] h-5 rounded-4 center font-Quicksand uppercase text-green-3e "}
                                        style={{
                                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
                                        }}
                                    >
                                        unlocked
                                    </div>
                                )
                                } 
                            </div>
                            <div class="flex flex-col gap-1 items-center text-xs text-gray-a2 font-bold font-SpaceGrotesk [&_p>span]:text-green-27 ">
                                {listLeagues.indexOf(selectedCard()?.id) <= 0 
                                    ? (<>
                                            <p>{selectedCard()?.text[0]}</p>
                                            <p>{selectedCard()?.text[1]}</p>
                                        </>)
                                    : (<>
                                            <p>Unlock <span>{selectedCard()?.text[0]}</span></p>
                                            <p>Earn up to <span>{selectedCard()?.text[1]}</span> from your bets</p>
                                            <p>Unlock the <span>{selectedCard()?.text[2]}</span></p>
                                            <p>Get access to <span>{selectedCard()?.text[3]}</span></p>

                                            {listLeagues.indexOf(selectedCard()?.id) > 5 &&
                                              <p>Get <span>{selectedCard()?.text[4]}</span></p> }

                                            {listLeagues.indexOf(selectedCard()?.id) > 8 &&
                                                <p>Get additional <span>{selectedCard()?.text[5]}</span></p>}
                                        </>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}
export default RankBenefitsModal