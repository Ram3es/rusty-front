import { For } from "solid-js";
import footerIconM from '../../assets/img/footer/sub-footer-icon-M.svg'
import iconTowers from '../../assets/img/footer/sub-footer-icon-towers.svg'
import iconSoldair from '../../assets/img/footer/sub-footer-icon-soldeir.svg'
import iconBitcoin from '../../assets/img/footer/sub-footer-bitcoin.svg'
import iconEtherium from '../../assets/img/footer/sub-footer-etherium.svg'
import iconLitecoin from '../../assets/img/footer/sub-footer-litecoin.svg'
import iconTcoin from '../../assets/img/footer/sub-footer-tcoin.svg'
import iconVisa from '../../assets/img/footer/sub-footer-visa.svg'
import iconXgame from '../../assets/img/footer/sub-footer-xgame.svg'
import iconUsdt from '../../assets/img/footer/sub-footer-usdt.svg'
import iconMasterCard from '../../assets/img/footer/sub-footer-master-card.svg'


const icons = [
    {
        name:'mark',
        img: footerIconM
    },
    {
        name:'towers',
        img: iconTowers
    },
    {   name:'soldair',
        img: iconSoldair
    },
    {   name:'bitcoin',
        img: iconBitcoin
    },
    {
        name:'etherium',
        img: iconEtherium
    },
    {
        name:'litecoin',
        img: iconLitecoin
    },
    {
        name:'Tcoin',
        img: iconTcoin
    },
    {
        name:'visa',
        img: iconVisa
    },
    {
        name:'xgame',
        img: iconXgame
    },
    {
        name:'usdt',
        img: iconUsdt
    },
    {
        name:'mastercard',
        img: iconMasterCard
    },
    
    

]


const SubFooter = () => {
    return (
          <div  class='w-full  justify-center items-center hidden sm:flex  sm:gap-4 md:gap-7 p-4 rounded-br-8 ' style={{background:' radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, rgba(26, 27, 48, 0.36) 0%, rgba(25, 28, 53, 0.36) 100%)'}}>
            <For each={icons} >
                {(icon) =>{
                    return <img src={icon.img} alt={icon.name} class="opacity-30 "/>

                }}
            </For>
          </div>

    )

}

export default SubFooter;