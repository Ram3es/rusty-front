import { createSignal, For, createEffect, Show } from 'solid-js'

import RewardsBanerCases from '../../assets/img/rewards/RewardsBanerCases.png'
import bannerCenterImage from '../../assets/img/rewards/bannerCenterImage.png'
import rewardRLbackground from '../../assets/img/rewards/rewardRLbackground.png'
import coin1 from '../../assets/img/rewards/coin1.png'
import coin2 from '../../assets/img/rewards/coin2.png'
import coin3 from '../../assets/img/rewards/coin3.png'
import Bg from '../../assets/img/rewards/rewardsBg.png'

import injector from '../../injector/injector'
import ribbed from '../../components/new-home/img/ribbed.png'
import coinsStack from '../../assets/img/rewards/rewards-coin-stack-md.png'
import PageLoadState from '../../libraries/PageLoadState'
import Fallback from '../Fallback'
import AmountWithCoin from '../../components/AmountWithCoin'
import CaseGradientButton from '../../components/elements/CaseGradientButton'
import GrayGradientButton from '../../components/elements/GrayGradientButton'
import Ranks from '../../utilities/Ranks'
import RibbedMask from '../../assets/img/rewards/rewards-ribbed-mask.png'
import Crankle from '../../components/icons/Crankle'
import { playCashoutSound } from '../../utilities/Sounds/SoundButtonClick'
import RankBenefitsModal from '../../components/modals/RankBenefitsModal'
import RewardCaseItem from './RewardCaseItem'
import DiscordJoinModal from '../../components/modals/DiscordJoinModal'

const Rewards = ({ loaded }) => {
  const { socket, toastr, userObject, rewardCases, setUserObject } = injector

  const [benefits, setBenefits] = createSignal([])
  const [isShownRankBenefitModal, setIsShownBenefitModal] = createSignal(false)
  const [discordJoinModal, setDiscordJoinModal] = createSignal(false)

  const { rewardsPageLoaded, onRewardsPageLoaded } = PageLoadState

  const rakebackClaim = () => {
    socket.emit('system:rakeback:claim', {}, (data) => {
      if (data.msg) {
        toastr(data)
      }

      if (!data.error) {
        playCashoutSound()
      }

      if (!data.error) {
        setUserObject('user', (prev) => ({ ...prev.user, rakeback: 0 }))
      }
    })
  }

  createEffect(() => {
    setBenefits([
      { id: 'default', name: 'preferred player', text: ['No Rakeback', 'No Badge'] },
      {
        id: 'bronze',
        name: 'bronze',
        text: ['Bronze Badge', '2% Rakeback', 'Bronze Case', 'Bronze Rank Giveaways & Rewards']
      },
      {
        id: 'silver',
        name: 'silver',
        text: ['Silver Badge', '3% Rakeback', 'Silver Case', 'Silver Rank Giveaways & Rewards']
      },
      {
        id: 'gold1',
        name: 'gold I',
        text: ['Gold I Badge', '4% Rakeback', 'Gold I Case', 'Gold Rank Giveaways & Rewards']
      },
      {
        id: 'gold2',
        name: 'gold II',
        text: ['Gold Badge', '4.25% Rakeback', 'Gold II Case', 'Gold Rank Giveaways & Rewards']
      },
      {
        id: 'gold3',
        name: 'gold III',
        text: ['Gold Badge', '4.75% Rakeback', 'Gold III Case', 'Gold Rank Giveaways & Rewards']
      },
      {
        id: 'platinum1',
        name: 'platinum I',
        text: [
          'Platinum Badge',
          '5.5% Rakeback',
          'Platinum I Case',
          'Platinum Rank Giveaways & Rewards',
          'Weekly Gift Card'
        ]
      },
      {
        id: 'platinum2',
        name: 'platinum II',
        text: [
          'Platinum Badge',
          '7% Rakeback',
          'Platinum II Case',
          'Platinum Rank Giveaways & Rewards',
          'Personalized birthday bonus'
        ]
      },
      {
        id: 'platinum3',
        name: 'platinum III',
        text: [
          'Platinum Badge',
          '10% Rakeback',
          'Platinum III Case',
          'Platinum Rank Giveaways & Rewards',
          'Personalized birthday bonus'
        ]
      },
      {
        id: 'diamond',
        name: 'diamond',
        text: [
          'Platinum Badge',
          '20% Rakeback',
          'Diamond Case',
          'Platinum Rank Giveaways & Rewards',
          'Dedicated Account Manager',
          'Weekly Gift Card Giveaway',
          'Personalized birthday bonus'
        ]
      }
    ])
  })

  createEffect(() => {
    if (loaded()) {
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

  const toggleDiscordJoinModal = () => {
    setDiscordJoinModal(prev => !prev)
  }

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
                each={rewardCases.cases
                  .filter((item) => item.name === 'Daily Free Case')
                  .concat(rewardCases.cases.filter((item) => item.name !== 'Daily Free Case'))}
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
                    isUserOnServer={rewardCases.isUserOnServer}
                    user={userObject}
                    openTime={
                      item.name === 'Daily Free Case'
                        ? rewardCases.lastFreeCaseOpening
                        : rewardCases.lastDailyCaseOpening
                    }
                    onClick={item.name === 'Daily Free Case' ? toggleDiscordJoinModal : null}
                  />
                )}
              </For>
            </div>
            <div class='relative max-w-[1200px] w-full flex flex-col items-center gap-6 text-gray-9a font-medium text-base font-SpaceGrotesk '>
              <h3 class='text-gradient-green-secondary font-bold  text-32 mb-2'>Rakeback</h3>
              <img
                src={coinsStack}
                alt='coins-stack'
                style={{ filter: 'drop-shadow(0px 0px 112px rgba(23, 192, 90, 0.36))' }}
              />
              <div class='text-center [&_p>span]:text-green-27'>
                <p>
                  Earn <span>Rakeback</span> for every bet you place on our Gamemodes
                </p>
                <p>
                  The higher your rank is, the <span>more coins</span> you earn in rakeback.
                </p>
              </div>
              <div class=' flex gap-2'>
                <CaseGradientButton classList='p-0' color='mint' callbackFn={() => rakebackClaim()}>
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
                  additionalClass='w-40 h-10 text-gray-a2 font-SpaceGrotesk text-14 font-bold cursor-pointer'
                  callbackFn={() => setIsShownBenefitModal(true)}
                >
                  View Rank Benefits
                </GrayGradientButton>
              </div>
              <div class='mt-2 flex flex-col items-center gap-4'>
                <div class='flex items-center gap-2 text-white text-base font-medium'>
                  <Ranks staff={userObject?.user?.rank} rank={userObject?.user?.level?.league} />
                  Your Rank Earns:
                  <span class='font-bold text-gradient'>
                    {benefits()
                      ?.find(
                        (item) =>
                          item.id === userObject?.user?.level?.league && item.id !== 'default'
                      )
                      ?.text[1]?.split('%')[0] || 0}
                    % Rakeback
                  </span>
                </div>
                <div
                  class='h-11 rounded-4 relative flex gap-2 center text-base font-medium text-purple-c1 px-8'
                  style={{
                    background: `radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), 
                          linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), 
                          radial-gradient(100% 275.07% at 0% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)`
                  }}
                >
                  <img src={RibbedMask} alt='ribbed-mask' class='absolute w-full h-full' />
                  <Ranks rank='diamond' />
                  Highest Rank Earns:
                  <span class='text-gradient-green-secondary font-bold'>20% Rakeback</span>
                </div>
              </div>
              <Crankle additionalClasses='absolute top-0 left-48' />
              <Crankle additionalClasses='absolute top-0 left-24 scale-75 opacity-[0.15]' />
              <Crankle additionalClasses='absolute top-0 left-0 scale-50 opacity-[0.08]' />
              <Crankle additionalClasses='absolute top-0 right-48 -scale-[1]' />
              <Crankle additionalClasses='absolute top-0 right-24 -scale-75 opacity-[0.15]' />
              <Crankle additionalClasses='absolute top-0 right-0 -scale-50 opacity-[0.08]' />
            </div>
            <Show when={isShownRankBenefitModal()}>
              <RankBenefitsModal
                onClose={() => setIsShownBenefitModal(false)}
                benefits={benefits()}
              />
            </Show>
            <Show when={discordJoinModal()}>
              <DiscordJoinModal
                handleClose={toggleDiscordJoinModal}
                isUserOnServer={rewardCases.isUserOnServer}
              />
            </Show>
          </div>
        </div>
      </Fallback>
    </>
  )
}

export default Rewards
