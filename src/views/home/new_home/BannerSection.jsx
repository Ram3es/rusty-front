import ribbed from './img/ribbed.png'
import welcomeBg from './img/welcome-bg-image.png'
import coinsStack from './img/green-coins-stack.png'
import intersect from './img/welcome-intersect.png'
import CaseGradientButton from '../../../components/elements/CaseGradientButton'
 
 const BannerSection = () => {
    return  (
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div 
                class='col-span-2 rounded-8 overflow-hidden'
                style={{ background: 'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)' }}
            >
                <div class='grid  grid-cols-[1fr_1fr]  sm:grid-cols-[1.5fr_1fr_1fr] '>
                    <div class={`h-[200px] col-span-2 sm:col-span-1 relative home-welcome--bg `} >
                        <img src={welcomeBg} alt='bg' class='absolute left-0 top-0 w-full h-full mix-blend-luminosity' />
                        <img src={intersect} alt='intersect' class='absolute left-0 bottom-0 object-cover w-full ' />
                    </div>
                    <div  class='relative home-daily--bg'>
                       <img src={ribbed} class='absolute inset-0 h-full w-full' />
                    </div>
                    <div class=' flex flex-col items-center justify-between p-3 relative home-rakeback--bg'>
                        <div>asdas</div>
                        {/* <div class=" h-10 p-3 ">asdwfdewf</div> */}
                        <CaseGradientButton
                          gradient='mint-button-gradient'
                         >
                            <div class='flex font-bold text-sm font-SpaceGrotesk text-green-27 text-shadow-base '>
                             <span>Claim</span>
                            </div>
                        </CaseGradientButton>

                        <img src={ribbed} class=' absolute inset-0 min-h-full min-w-full' />
                        <img src={coinsStack} alt='coins-stack' class='  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                    
                   </div>
                </div>
            </div>
            <div class='col-span-2 sm:col-span-1'>ecwe</div>
        </div>
    )
}

export default BannerSection