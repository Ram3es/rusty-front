
import BannerImg from './img/banner-img.png'
import Mask from './img/banner-mask.png'
import Trapeyoid from './img/banner-trapezoid.png'
import Bajoonga from './img/bajoonga.png'
import Flags from './img/flags.png'
import Guard from './img/banner-guard.png'


const LeaderbordBanner = (props) => {
    return (
        <div class='relative'>
            <div class="w-full overflow-hidden rounded-8 relative leaderbord-banner  ">
                <img src={BannerImg} alt='banner' class=" w-full h-full" />
                <img src={Mask} alt='banner' class="absolute top-0 left-0 w-full h-full" />
                <img src={Trapeyoid} alt='trapezoid' class=" absolute h-full top-0 left-1/2 -translate-x-1/2" />
                <img src={Flags} alt='flags' class=" absolute  -top-[35%] -left-[4%] -rotate-[35deg] h-full " />
                <img src={Flags} alt='flags' class=" absolute  -top-[35%] -right-[4%] rotate-[35deg] h-full -scale-x-[1] " />
                <img src={Guard} alt='guard' class=" absolute  -bottom-6 right-6 h-full" />
                <img src={Guard} alt='guard' class=" absolute  -bottom-6 left-6 h-full -scale-x-[1] " />
                  
                <div class=" absolute flex flex-col items-center  w-full top-0 font-bold font-SpaceGrotesk text-gray-9a py-6" >
                    <span class=' text-xs'>BAJOONGA ENDS IN</span>
                    <div class='flex  items-end text-yellow-ffb text-sm [&>span]:text-base [&>span]:text-white [&>span]:ml-1 '>
                        <span>{props.timer.days}</span>D
                        <span>{props.timer.hours}</span>H
                        <span>{props.timer.minutes}</span>M
                        <span>{props.timer.seconds}</span>S   
                    </div>
                    <span class=' text-80 bajoonga-prize'>${(2000).toLocaleString('en-US')}</span>
                </div>
                
            </div>
            <img src={Bajoonga} alt='banner' class=" absolute w-1/4 h-auto -bottom-[10%] left-1/2 -translate-x-1/2" />
        </div>
    )
}

export default LeaderbordBanner