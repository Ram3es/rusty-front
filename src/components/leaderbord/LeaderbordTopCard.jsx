import backdrop from "./img/mask-card.png"
import UserInfo from "./UserInfo"
import SkinRewarded from "./SkinRewarded"
import SkullPlate from "./SkullPlate"

const LeaderbordTopCard = (props) => {

    return (
        <div 
            class={`${props.variant === 1 && ' col-start-auto row-start-auto sm:row-start-1 '} relative`}
            classList={{
                "top-0 sm:col-start-2 sm:-top-12" : props.variant === 0 ,
                "sm:col-start-1 " : props.variant === 1,
                "sm:col-start-3 " : props.variant === 2
                
            }}
        >
            <div class=" absolute -top-4 left-6 z-40">
                <SkullPlate variant={props.variant} />
            </div>
            
            <div 
                class=" h-[336px] sm:h-[384px] md:h-[356px] xl:h-[336px] w-full relative leader-card overflow-hidden "
                classList={{
                    "gold" : props.variant === 0,
                    "silver": props.variant === 1,
                    "bronze": props.variant === 2
                }}
            >
                <img src={backdrop} alt='backdrop' class=" absolute left-0 top-0 w-full h-full" />
                <svg 
                    width="268" 
                    height="136" 
                    viewBox="0 0 268 136" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class=" absolute top-[60%] w-full h-auto"
                >
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M268 46.7737V136H7.05883C3.16035 136 0 132.84 0 128.941V46.7737C36.7718 17.4955 83.3428 0 134 0C184.657 0 231.228 17.4955 268 46.7737Z" fill={`url(#${props.id})`} fill-opacity="0.08"/>
                    <defs>
                        <linearGradient id={props.id} x1="134" y1="3.05176e-05" x2="134" y2="135.882" gradientUnits="userSpaceOnUse">
                            <stop stop-color={props.color}/>
                            <stop offset="1" stop-color={props.color} stop-opacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div class='absolute w-full h-full flex flex-col gap-3 items-center pt-8 pb-4 px-4'>
                    <UserInfo player={props.player} color={props.color}  id={props.id}  />
                    <SkinRewarded reward={props.player.reward} variant={props.variant} />
                </div>
            </div>
        </div>
    )

}
export default LeaderbordTopCard