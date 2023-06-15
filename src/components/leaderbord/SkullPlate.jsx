import silverSkull from './img/skull-silver.png'
import goldSkull from './img/skull-gold.png'
import bronzeSkull from './img/skull-bronze.png'


const skullVariants = [
    goldSkull,
    silverSkull,
    bronzeSkull
]

const SkullPlate = (props) => {
    return (
        <div 
            class="w-12 h-12 skull-backdrop rounded-4 center"
            classList={{
                 "gold" : props.variant === 0,
                 "silver": props.variant === 1,
                 "bronze": props.variant === 2,
            }}
        >
            <img src={skullVariants[props.variant]} alt="skull" style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}  />
        </div>
    )
}

export default SkullPlate