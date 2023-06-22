import { API } from '../../libraries/url'
import Modal from './Modal'
import BgMainVector from '../../assets/img/coinflip/bgItemsRL.png'
import GrayGradientButton from '../elements/GrayGradientButton'

const DiscordJoinModal = (props) => {
  return (
    <Modal
      noContainer={true}
      open={() => {
        return true
      }}
      handler={() => {}}
    >
      <div class='w-full h-full absolute left-0 cursor-default top-0' onClick={props.handleClose} />
      <div
        class='w-[80%] md:w-[439px] relative flex flex-col rounded-12 overflow-hidden transition-all transform -translate-y-1/2 duration-100 ease-out'
        style={{
          background:
            'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
          'backdrop-filter': 'blur(8px)'
        }}
      >
        <div
          class='h-[88px] flex justify-between items-center rounded-t-xl relative px-9 py-6'
          style={{
            background:
              'linear-gradient(90deg, rgba(26, 27, 48, 0.00) 0%, rgba(0, 0, 0, 0.08) 50.00%, rgba(0, 0, 0, 0.00) 100%)',
            border: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <div class='flex flex-col'>
            <h2 class='text-20 text-white font-bold font-SpaceGrotesk uppercase truncate'>
              OPEN FREE CASE
            </h2>
            <div class='font-SpaceGrotesk text-12 text-[#646683]'>
              Complete the steps to unlock your daily free case.
            </div>
          </div>
          <div
            class='text-gray-9a w-10 h-10 flex items-center justify-center border rounded border-[#FFFFFF0A] cursor-pointer'
            onClick={props.handleClose}
          >
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>
        <div class='px-9 py-6 relative'>
          <div
            class='absolute inset-0 z-0 top-2 bg-repeat mix-blend-luminosity'
            style={{
              'background-image': `url('${BgMainVector}')`,
              opacity: 0.008
            }}
          />
          <div class='w-full flex flex-col gap-3'>
            <h2 class='font-bold text-white font-SpaceGrotesk text-20'>
              WIN UP TO <span class='text-yellow-ffb'>$2,000</span> DAILY
            </h2>
            <div class='px-4 pt-3 pb-[17px] flex flex-col gap-3 bg-black/20 border border-black/10 rounded-4 font-SpaceGrotesk relative z-10 md:w-[368px]'>
              <p class='text-yellow-ffb text-12 font-bold'>Free Case Requirements</p>
              <div class='flex items-center gap-2'>
                <div class='w-4 h-4 border border-white/10 rounded-4' />
                <p class='text-gray-9a text-12 font-medium'>
                  You <span class='text-yellow-ffb'>must</span> join our{' '}
                  <a
                    class='text-white underline'
                    href='https://discord.com/invite/rustyloot'
                    target='_blank'
                  >
                    <svg
                      class='inline-block mr-1'
                      width='14'
                      height='10'
                      viewBox='0 0 14 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11.8593 0.837498C10.9531 0.44625 9.98409 0.161907 8.97102 0C8.84661 0.207559 8.70125 0.486731 8.60104 0.708811C7.52412 0.559371 6.45712 0.559371 5.40001 0.708811C5.29981 0.486731 5.15116 0.207559 5.02563 0C4.01147 0.161907 3.04136 0.447295 2.13511 0.83957C0.307208 3.38835 -0.188306 5.87382 0.0594514 8.324C1.27181 9.1594 2.44674 9.66689 3.60184 9.99897C3.88704 9.63678 4.1414 9.25177 4.36052 8.846C3.94319 8.69968 3.54347 8.51911 3.16579 8.30947C3.26599 8.24098 3.364 8.16937 3.45869 8.09568C5.76228 9.08988 8.26519 9.08988 10.5413 8.09568C10.6371 8.16937 10.7351 8.24098 10.8342 8.30947C10.4554 8.52013 10.0546 8.7007 9.63723 8.84705C9.85635 9.25177 10.1096 9.63783 10.3959 10C11.5521 9.66792 12.7281 9.16045 13.9405 8.324C14.2312 5.48361 13.4439 3.02097 11.8593 0.837498ZM4.67435 6.81716C3.98284 6.81716 3.41574 6.22147 3.41574 5.49606C3.41574 4.77066 3.97073 4.17394 4.67435 4.17394C5.378 4.17394 5.94508 4.76962 5.93297 5.49606C5.93406 6.22147 5.378 6.81716 4.67435 6.81716ZM9.3256 6.81716C8.63408 6.81716 8.06699 6.22147 8.06699 5.49606C8.06699 4.77066 8.62195 4.17394 9.3256 4.17394C10.0292 4.17394 10.5963 4.76962 10.5842 5.49606C10.5842 6.22147 10.0292 6.81716 9.3256 6.81716Z'
                        fill='white'
                      />
                    </svg>
                    Discord
                  </a>
                </p>
              </div>
              <div class='flex items-center gap-2'>
                <div class='w-4 h-4 border border-white/10 rounded-4' />
                <p class='text-gray-9a text-12 font-medium'>
                  You <span class='text-yellow-ffb'>must</span>{' '}verify you joined our Discord{' '}
                  <a class='text-white underline' href={API + '/discord'} target='_blank'>
                    here.
                  </a>{' '}
                </p>
              </div>
            </div>
            <div class='mt-[4px] flex items-center justify-center gap-[7px]'>
              <a href='https://discord.com/invite/rustyloot' target='_blank'>
                <GrayGradientButton
                  noShadow
                  additionalClass='text-gray-a2 flex items-center justify-center gap-[10px] w-[180px] h-10 rounded-4 shadow-button gradient-gray-background border border-white/5'
                >
                  <svg
                    width='18'
                    height='12'
                    viewBox='0 0 18 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15.2477 1.005C14.0825 0.5355 12.8367 0.194289 11.5342 0C11.3742 0.249071 11.1873 0.584077 11.0585 0.850574C9.67387 0.671245 8.30201 0.671245 6.94287 0.850574C6.81404 0.584077 6.62292 0.249071 6.46152 0C5.15761 0.194289 3.91032 0.536754 2.74514 1.00748C0.394982 4.06602 -0.242108 7.04858 0.0764375 9.98879C1.63519 10.9913 3.14581 11.6003 4.63093 11.9988C4.99762 11.5641 5.32465 11.1021 5.60638 10.6152C5.06981 10.4396 4.5559 10.2229 4.07031 9.97137C4.19913 9.88918 4.32514 9.80324 4.44689 9.71482C7.40865 10.9079 10.6267 10.9079 13.5531 9.71482C13.6762 9.80324 13.8022 9.88918 13.9296 9.97137C13.4426 10.2242 12.9273 10.4408 12.3907 10.6165C12.6724 11.1021 12.9981 11.5654 13.3662 12C14.8527 11.6015 16.3647 10.9925 17.9235 9.98879C18.2973 6.58034 17.285 3.62516 15.2477 1.005ZM6.00988 8.18059C5.12079 8.18059 4.39166 7.46576 4.39166 6.59528C4.39166 5.72479 5.10522 5.00873 6.00988 5.00873C6.91457 5.00873 7.64367 5.72354 7.6281 6.59528C7.62951 7.46576 6.91457 8.18059 6.00988 8.18059ZM11.9901 8.18059C11.101 8.18059 10.3718 7.46576 10.3718 6.59528C10.3718 5.72479 11.0854 5.00873 11.9901 5.00873C12.8947 5.00873 13.6238 5.72354 13.6083 6.59528C13.6083 7.46576 12.8947 8.18059 11.9901 8.18059Z'
                      fill='currentColor'
                    />
                  </svg>
                  <span class='text-14 text-shadow-base font-bold font-SpaceGrotesk'>
                    Join Discord
                  </span>
                </GrayGradientButton>
              </a>

              <a href={`https://rustyloot.gg/discord/`} target='_blank'>
                <GrayGradientButton
                  noShadow
                  additionalClass='text-gray-a2 flex items-center justify-center gap-[10px] w-[180px] h-10 rounded-4 shadow-button gradient-gray-background border border-white/5'
                >
                  <svg
                    width='18'
                    height='12'
                    viewBox='0 0 18 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15.2477 1.005C14.0825 0.5355 12.8367 0.194289 11.5342 0C11.3742 0.249071 11.1873 0.584077 11.0585 0.850574C9.67387 0.671245 8.30201 0.671245 6.94287 0.850574C6.81404 0.584077 6.62292 0.249071 6.46152 0C5.15761 0.194289 3.91032 0.536754 2.74514 1.00748C0.394982 4.06602 -0.242108 7.04858 0.0764375 9.98879C1.63519 10.9913 3.14581 11.6003 4.63093 11.9988C4.99762 11.5641 5.32465 11.1021 5.60638 10.6152C5.06981 10.4396 4.5559 10.2229 4.07031 9.97137C4.19913 9.88918 4.32514 9.80324 4.44689 9.71482C7.40865 10.9079 10.6267 10.9079 13.5531 9.71482C13.6762 9.80324 13.8022 9.88918 13.9296 9.97137C13.4426 10.2242 12.9273 10.4408 12.3907 10.6165C12.6724 11.1021 12.9981 11.5654 13.3662 12C14.8527 11.6015 16.3647 10.9925 17.9235 9.98879C18.2973 6.58034 17.285 3.62516 15.2477 1.005ZM6.00988 8.18059C5.12079 8.18059 4.39166 7.46576 4.39166 6.59528C4.39166 5.72479 5.10522 5.00873 6.00988 5.00873C6.91457 5.00873 7.64367 5.72354 7.6281 6.59528C7.62951 7.46576 6.91457 8.18059 6.00988 8.18059ZM11.9901 8.18059C11.101 8.18059 10.3718 7.46576 10.3718 6.59528C10.3718 5.72479 11.0854 5.00873 11.9901 5.00873C12.8947 5.00873 13.6238 5.72354 13.6083 6.59528C13.6083 7.46576 12.8947 8.18059 11.9901 8.18059Z'
                      fill='currentColor'
                    />
                  </svg>
                  <span class='text-14 text-shadow-base font-bold font-SpaceGrotesk'>
                    Authorize
                  </span>
                </GrayGradientButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DiscordJoinModal
