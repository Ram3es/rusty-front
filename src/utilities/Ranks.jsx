import Default from '../assets/img/ranks/default.svg';
import Bronze from '../assets/img/ranks/bronze.svg';
import Silver from '../assets/img/ranks/silver.svg';
import Gold1 from '../assets/img/ranks/gold1.svg';
import Gold2 from '../assets/img/ranks/gold2.svg';
import Gold3 from '../assets/img/ranks/gold3.svg';
import Platinum1 from '../assets/img/ranks/platinum1.svg';
import Platinum2 from '../assets/img/ranks/platinum2.svg';
import Platinum3 from '../assets/img/ranks/platinum3.svg';
import Diamond from '../assets/img/ranks/diamond.svg';

import Badge from "../assets/badge.svg"
import Img from './Img';
import { createEffect } from 'solid-js';

const Ranks = (props) => {
    const ranks = {
        default: Default,
        bronze: Bronze,
        silver: Silver,
        gold1: Gold1,
        gold2: Gold2,
        gold3: Gold3,
        platinum1: Platinum1,
        platinum2: Platinum2,
        platinum3: Platinum3,
        diamond: Diamond,
    };

    // createEffect(() => {
    //     console.log(typeof props?.rank === "function" ? props?.rank() : props?.rank)
    // })

    return (
    <>
        <div class={`${props.width ? `w-${props.width}` : "w-6"}`}>
            <img alt="badge" class="w-full" src={!props.staff || props.staff < 3 ? ranks[typeof props?.rank === "function" ? props?.rank() : props?.rank] : Badge} />
            {/* <img alt="badge"  class="w-full" src={!props.staff || props.staff < 3 ? ranks[typeof props?.rank === "function" ? props?.rank() : props?.rank] : Badge} /> */}
        </div>
    </>
    )
}


export default Ranks