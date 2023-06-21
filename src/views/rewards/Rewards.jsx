import { onMount, createSignal, For, createEffect, Show } from 'solid-js'
import Coin from '../../utilities/Coin'

import RewardsBanerCases from "../../assets/img/rewards/RewardsBanerCases.png";
import bannerCenterImage from "../../assets/img/rewards/bannerCenterImage.png";
import rewardRLbackground from '../../assets/img/rewards/rewardRLbackground.png'
import footerLogoBgVector from "../../assets/img/footer/footerLogoBgVector.png"
import coin1 from "../../assets/img/rewards/coin1.png";
import coin2 from "../../assets/img/rewards/coin2.png";
import coin3 from "../../assets/img/rewards/coin3.png";
import Bg from "../../assets/img/rewards/rewardsBg.png";
import DiscordBanerBg from "../../assets/img/rewards/DiscordBanerBg.jpg";
import MainBanerBg from "../../assets/img/rewards/MainBanerBg.jpg";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import { URL } from "../../libraries/url";
import { NavLink } from "solid-app-router";
import injector from "../../injector/injector";
import ribbed from '../../components/new-home/img/ribbed.png';
import coinsStack from '../../assets/img/rewards/rewards-coin-stack-md.png'
import PageLoadState from "../../libraries/PageLoadState";
import Fallback from "../Fallback";
import AmountWithCoin from "../../components/AmountWithCoin";
import CaseGradientButton from "../../components/elements/CaseGradientButton";
import GrayGradientButton from "../../components/elements/GrayGradientButton";
import Ranks from "../../utilities/Ranks";
import RibbedMask from "../../assets/img/rewards/rewards-ribbed-mask.png"
import Crankle from "../../components/icons/Crankle";
import { playCashoutSound } from "../../utilities/Sounds/SoundButtonClick";
import Modal from "../../components/modals/Modal";
import RankBenefitsModal from "../../components/modals/RankBenefitsModal";
import RewardCaseItem from './RewardCaseItem'
let tomorrow;

const Rewards = ({ loaded }) => {
  const { socket, toastr, userObject, rewardCases, setUserObject } = injector;
  const [benefits, setBenefits] = createSignal([])
  const [isShownRankBenefitModal, setIsShownBenefitModal] = createSignal(false)

  const [timeLeft, setTimeLeft] = createSignal('00:00:00:00')
  const [items, setItems] = createSignal([])
  const [userDailyDeposit, setUserDailyDeposit] = createSignal(0)
  const [discordUserId, setDiscordUserId] = createSignal()

  const [isPageLoaded, setIsPageLoaded] = createSignal(false)

  const { rewardsPageLoaded, onRewardsPageLoaded } = PageLoadState

  const countdown = () => {
    if (tomorrow) {
      const left = Math.floor((tomorrow.getTime() - Date.now() || 0) / 1000)

      const days = Math.floor(left / (24 * 3600))
      const hours = Math.floor((left % (24 * 3600)) / 3600)
      const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60)
      const seconds = (left % (24 * 3600)) % 60

      setTimeLeft(
        `${`0${days}`.slice(-2)}:${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(
          -2
        )}:${`0${seconds}`.slice(-2)}`
      )
    }
  }

  const rakebackClaim = () => {
    socket.emit("system:rakeback:claim", {}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        playCashoutSound()
      }

      if (!data.error) {
        setUserObject("user", (prev) => ({ ...prev.user, rakeback: 0 }));
      }
    });
  };

  createEffect(() => {
    setBenefits([
        {id: "default",name: "preferred player",text:['No Rakeback','No Badge'] },
        {id: "bronze",name: "bronze", text:['Bronze Badge','2% Rakeback', 'Bronze Case','Bronze Rank Giveaways & Rewards']},
        {id: "silver",name: "silver",text:['Silver Badge','3% Rakeback','Silver Case', 'Silver Rank Giveaways & Rewards']},
        {id: "gold1",name: "gold I",text:['Gold I Badge','4% Rakeback','Gold I Case', 'Gold Rank Giveaways & Rewards']},
        {id: "gold2",name: "gold II", text:['Gold Badge','4.25% Rakeback','Gold II Case', 'Gold Rank Giveaways & Rewards']},
        {id: "gold3",name: "gold III", text:['Gold Badge','4.75% Rakeback','Gold III Case', 'Gold Rank Giveaways & Rewards']},
        {id: "platinum1",name: "platinum I", text:['Platinum Badge','5.5% Rakeback','Platinum I Case', 'Platinum Rank Giveaways & Rewards','Weekly Gift Card']},
        {id: "platinum2",name: "platinum II", text:['Platinum Badge','7% Rakeback','Platinum II Case', 'Platinum Rank Giveaways & Rewards','Personalized birthday bonus']},
        {id: "platinum3",name: "platinum III",  text:['Platinum Badge','10% Rakeback','Platinum III Case', 'Platinum Rank Giveaways & Rewards','Personalized birthday bonus']},
        {id: "diamond",name: "diamond",  text:['Platinum Badge','20% Rakeback','Diamond Case', 'Platinum Rank Giveaways & Rewards' ,'Dedicated Account Manager','Weekly Gift Card Giveaway','Personalized birthday bonus'] }
    ])

  })


  createEffect(() => {
    if (loaded()) {
      countdown()
      onRewardsPageLoaded(true)
      // socket.emit("rewards:cases", {}, (data) => {
      //   setItems(data.cases);
      //   setUserDailyDeposit(data.userDailyDeposit || 0);
      //   tomorrow = new Date(Number(data.counterEnding));
      //   setDiscordUserId(data.userDiscordId);

      //   onRewardsPageLoaded(true)
      // });
    }
  })

  setInterval(countdown, 1000)

  return (
    <>
      <Fallback loaded={rewardsPageLoaded}>
        <img alt='background' src={Bg} class='absolute left-0 top-0 min-w-full md:min-h-full' />
        <div class='w-full h-full flex flex-col gap-10 overflow-visible relative'>
          <div class='flex flex-col md:flex-row justify-center mt-8 bg-no-repeat bg-cover lg:bg-full rewards-banner-bg rounded-8'>
            <div class='grow px-16 relative overflow-hidden'>
              <div
                class='absolute inset-0 -left-5 top-[11px] h-[120px] '
                style={{
                  'background-image': `url('${rewardRLbackground}')`,
                  opacity: 0.013
                }}
              />
              <div class='flex flex-col absolute inset-0 left-[72px] top-[36px]'>
                <div class='mb-4 flex flex-row items-end'>
                  <h1 class='rewards-title text-72 font-SpaceGrotesk font-bold leading-none'>
                    Rewards
                  </h1>
                </div>
                <p class='text-gray-9a text-16 font-SpaceGrotesk'>
                  Rank up to be unlock <span class='text-yellow-ffb'>higher level cases</span> that
                  can be opened daily!
                  <br />
                  The <span class='text-yellow-ffb'>free case</span> is available to everyone.
                </p>
              </div>
            </div>
            <div class='relative w-[495px] bg-black/30 rounded-8'>
              <img
                src={bannerCenterImage}
                class='absolute h-[110%] -translate-x-1/2 left-0 bottom-0'
              />
              <img src={coin1} class=' absolute right-6 -top-10' />
              <img src={coin2} class=' absolute -right-10 top-6' />
              <img src={coin3} class=' absolute left-20 -bottom-10' />

              <div class='w-full h-full overflow-hidden relative'>
                <img src={ribbed} class=' absolute inset-0 min-h-full min-w-full' />
                <img class='w-full' src={RewardsBanerCases} alt='RewardsBanerCases' />
              </div>
            </div>
          </div>
          <div class='center flex-col w-full gap-2 relative py-8'>
            <div class='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-auto mb-9 relative'>
              <For
                each={rewardCases.cases}
                fallback={
                  <div class='absolute w-full center left-0 top-0'>
                    <p class='text-yellow-ffb text-20 font-semibold font-SpaceGrotesk uppercase'>
                      Loading
                    </p>
                  </div>
                }
              >
                {(item) => (
                  <RewardCaseItem
                    item={item}
                    isJoinedToDiscord={discordUserId()}
                    user={userObject}
                    openTime={
                      item.name === 'Daily Free Case'
                        ? rewardCases.lastDailyCaseOpening
                        : rewardCases.lastFreeCaseOpening
                    }
                  />
                )}
              </For>
            </div>
            <div class='relative max-w-[1200px] w-full flex flex-col items-center gap-6 text-gray-9a font-medium text-base font-SpaceGrotesk '>
            <h3 class='text-gradient-green-secondary font-bold  text-32 mb-2'>Rakeback</h3>
            <img 
              src={coinsStack}
              alt='coins-stack' 
              style={{ filter: "drop-shadow(0px 0px 112px rgba(23, 192, 90, 0.36))"
            }}/>
            <div class='text-center [&_p>span]:text-green-27'>
              <p>Earn <span>Rakeback</span> for every bet you place on our Gamemodes</p>
              <p>The higher your rank is, the <span>more coins</span> you earn in rakeback.</p>
            </div>
            <div class=' flex gap-2'>
              <CaseGradientButton
                classList='p-0'
                color='mint'
                callbackFn={() => rakebackClaim()}
              >
                <div class='flex items-center gap-2 font-bold text-sm  text-green-27 text-shadow-base '>
                  <span>Claim</span>
                  <AmountWithCoin
                    widthCoin='5'
                    fontSize='14'
                    gradient='text-gradient-green-secondary' 
                    amount={userObject?.user?.rakeback || 0} 
                  />
                </div>
              </CaseGradientButton>
              <GrayGradientButton
                  additionalClass="w-40 h-10 text-gray-a2 font-SpaceGrotesk text-14 font-bold cursor-pointer"
                  callbackFn={() => setIsShownBenefitModal(true)}
                >
                  View Rank Benefits
              </GrayGradientButton>
            </div>
            <div class='mt-2 flex flex-col items-center gap-4'>
              <div class='flex items-center gap-2 text-white text-base font-medium'>
                <Ranks
                 staff={userObject?.user?.rank}
                 rank={userObject?.user?.level?.league}
                />
                Your Rank Earns:
                <span class='font-bold text-gradient'>{benefits()?.find(item => item.id === userObject?.user?.level?.league && item.id !== 'default')?.text[1]?.split('%')[0] || 0 }% Rakeback</span>
              </div>
              <div 
                class='h-11 rounded-4 relative flex gap-2 center text-base font-medium text-purple-c1 px-8'
                style={{background: 
                         `radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), 
                          linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), 
                          radial-gradient(100% 275.07% at 0% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)`
                        }}
                >
                  <img src={RibbedMask} alt='ribbed-mask'class='absolute w-full h-full' />
                  <Ranks rank='diamond' />
                  Highest Rank Earns:
                  <span class='text-gradient-green-secondary font-bold'>20% Rakeback</span>

                </div>
            </div>
            <Crankle additionalClasses="absolute top-0 left-48" />
            <Crankle additionalClasses="absolute top-0 left-24 scale-75 opacity-[0.15]" />
            <Crankle additionalClasses="absolute top-0 left-0 scale-50 opacity-[0.08]" />
            <Crankle additionalClasses="absolute top-0 right-48 -scale-[1]" />
            <Crankle additionalClasses="absolute top-0 right-24 -scale-75 opacity-[0.15]" />
            <Crankle additionalClasses="absolute top-0 right-0 -scale-50 opacity-[0.08]" />
          </div>
          <Show when={isShownRankBenefitModal()}>
            <RankBenefitsModal
              onClose={() => setIsShownBenefitModal(false)}
              benefits={benefits()}
             />
          </Show>
            {/* {!discordUserId() ? (
              <div
                class='flex justify-center md:justify-start md:pl-40 items-center py-5 mt-4 bg-cover lg:bg-full w-full'
                style={{
                  'background-image': `url(${DiscordBanerBg})`
                }}
              >
                <div class='w-11/12 md:w-full max-w-md block'>
                  <div class='mb-4 flex flex-row items-end'>
                    <h2 class='text-yellow-ff uppercase text-40 font-Oswald'>LINK DISCORD</h2>
                  </div>
                  <p class='text-white text-18 mb-4'>
                    In order to open up the daily free cases please{' '}
                    <a
                      class='underline text-yellow-ff'
                      href='https://discord.com/invite/rustyloot'
                      target='_blank'
                    >
                      first
                    </a>{' '}
                    join our Discord server and{' '}
                    <a
                      class='underline text-yellow-ff'
                      href={`https://rustyloot.gg/discord`}
                      target='_blank'
                    >
                      second
                    </a>{' '}
                  </p>
                  <div class='flex gap-2 flex-wrap'>
                    <a
                      class='relative block cursor-pointer h-11 w-72 center hover flex-1 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper'
                      style={{ 'background-image': `url(${YellowButtonBg})` }}
                      href='https://discord.com/invite/rustyloot'
                      target='_blank'
                    >
                      <div class='scrolling-btn-image hidden group-hover:block' />
                      <span class='text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald'>
                        <svg
                          width='20'
                          height='15'
                          viewBox='0 0 20 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z'
                            fill='#161B2A'
                          />
                        </svg>
                        JOIN DISCORD
                      </span>
                    </a>
                    <a
                      class='relative block cursor-pointer h-11 w-72 center hover flex-1 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper'
                      style={{ 'background-image': `url(${YellowButtonBg})` }}
                      href={`https://rustyloot.gg/discord/`}
                      target='_blank'
                    >
                      <div class='scrolling-btn-image hidden group-hover:block' />
                      <span class='text-black gap-2 w-full relative z-20 flex items-center justify-center text-14 uppercase font-Oswald'>
                        <svg
                          width='20'
                          height='15'
                          viewBox='0 0 20 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M8.10357 1.14868C7.94786 0.70949 7.79071 0.266671 7.78786 0.260873C7.71286 0.0905579 7.53929 -0.0167045 7.35643 0.00213881C7.24071 0.0115605 4.50286 0.250726 2.74857 1.6821C1.83143 2.54164 0 7.56702 0 11.9119C0 11.9887 0.0192857 12.0633 0.0571429 12.13C1.32214 14.384 4.77071 14.9739 5.55643 14.9993C5.56143 15 5.56571 15 5.57 15C5.70857 15 5.83857 14.9326 5.92143 14.8188L6.77143 13.6505C5.36714 13.4338 5.11357 13.1512 5.05429 13.107C4.73714 12.87 4.50286 12.538 4.78714 12.1191C5.00571 11.7937 5.46429 11.6865 5.81571 11.8698C6.17571 12.0401 7.13929 12.5881 10 12.5736C12.8407 12.5649 14.0879 11.9611 14.1057 11.9481C14.5829 11.73 14.955 11.8198 15.1871 12.1431C15.4636 12.583 15.2664 12.8808 14.9507 13.1171C14.8914 13.1613 14.7479 13.2853 13.2393 13.6476L14.0786 14.8181C14.1607 14.9326 14.2914 14.9993 14.43 14.9993C14.435 14.9993 14.4393 14.9993 14.4436 14.9986C15.23 14.9732 18.6786 14.3832 19.9429 12.1293C19.9807 12.0626 20 11.988 20 11.9111C20 7.56702 18.1686 2.54164 17.2286 1.66325C15.4971 0.251451 12.7593 0.0122852 12.6436 0.00213881C12.4607 -0.0138056 12.2871 0.0912826 12.2121 0.260873C12.2093 0.266671 12.0564 0.716737 11.9086 1.15086C11.9086 1.15086 10.7436 0.977645 10 0.977645C9.25643 0.977645 8.10357 1.14868 8.10357 1.14868ZM7.14286 10.3993C6.35357 10.3993 5.71429 9.43324 5.71429 8.24031C5.71429 7.04738 6.35357 6.0813 7.14286 6.0813C7.935 5.96171 8.55429 7.04738 8.57143 8.24031C8.57143 9.43324 7.93214 10.3993 7.14286 10.3993ZM12.8571 10.3993C12.0679 10.3993 11.4286 9.42672 11.4286 8.22726C11.4286 7.02781 12.0679 6.0552 12.8571 6.0552C13.6464 6.0552 14.2857 7.02781 14.2857 8.22726C14.2857 9.42672 13.6464 10.3993 12.8571 10.3993Z'
                            fill='#161B2A'
                          />
                        </svg>
                        Authorize account
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )} */}
          </div>
        </div>
      </Fallback>
    </>
  )
}

export default Rewards
