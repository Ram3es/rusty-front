import {NavLink} from "solid-app-router";
import { onMount, createSignal, For  } from "solid-js";

import {useI18n} from "../../i18n/context";

import { URL } from "../../libraries/url";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";

import RedCoin from '../../assets/img/coinflip/redcoin.svg';
import BlackCoin from '../../assets/img/coinflip/blackcoin.svg';

import Logo from '../../assets/smallLogo.svg';

import injector from "../../injector/injector";
import ItemSpinnerBg from "../../components/ItemSpinnerBg";
import ItemInfo from "../jackpot/ItemInfo";
import LazyImage from "../../components/LazyImage";

const CoinflipGame = (props) => {

    const { userObject, socket, toastr } = injector;

    const [counter, setCounter] = createSignal(0);

    const i18n = useI18n();

    onMount(() => {
        setInterval(() => {
            if(props.game?.status != "open") {
                setCounter(Math.floor((props.game?.timestamp - Date.now()) / 1000) || 0);
            }
        }, 1000);
    })

    const cancel = () => {
        socket.emit("coinflip:cancel", {
            gameId: props.id,
        }, (data) => {
            if (data.msg) {
                toastr(data)
            }
        })
    }

    return (
    <>
        <div class={`w-full relative sm:h-24 ${props.i() % 2 == 0 ? "bg-dark-22" : ""} z-20 p-2 sm:p-0 bg-opacity-30 center transition transform hover:scale-x-sm`}>
            <div class="w-11/12 flex flex-col flex-wrap justify-center sm:justify-around items-center sm:grid sm:grid-cols-coinflip-md xxl:grid-cols-coinflip gap-2 xxl:gap-20">
                <div class="flex justify-around items-center w-1/3 sm:w-auto order-2 sm:order-none">
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full relative flex justify-end items-start">
                        <img alt="coin"  class="w-4 absolute" src={props.game?.creator?.side == 2 ? BlackCoin : RedCoin} />
                        <img alt="avatar" class="w-full h-full rounded-full" src={props.game?.creator?.avatar} />
                    </div>
                    <p class="text-16 text-gray-8c font-normal font-Oswald uppercase">vs</p>
                    <div class={`w-10 h-10 md:w-12 md:h-12 rounded-full relative flex justify-end items-start ${props.game?.opponent?.avatar || props.game?.opponent?.bot ? "" : "sm:opacity-0"}`}>
                        <img alt="coin" class="w-4 absolute" src={props.game?.creator?.side == 1 ? BlackCoin : RedCoin} />
                        {props.game?.opponent?.avatar || props.game?.opponent?.bot ? <img alt="opponent" class="w-full h-full rounded-full" src={props.game?.opponent?.bot ? Logo : props.game?.opponent?.avatar} /> : <div class="w-full h-full rounded-full bg-dark-18 center border-2 border-dashed border-dark-28">
                            <svg class="w-1/2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75" style={{"enable-background":"new 0 0 258.75 258.75"}} fill="#282E49">
                                <g>
                                    <circle cx="129.375" cy="60" r="60"/>
                                    <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                                </g>
                            </svg>
                        </div>}
                    </div>
                </div>
                <div class="items-center gap-2 hidden w-full xxl:flex order-5 sm:order-none">
                    <For each={[...(props.game?.creator?.items || []), ...(props.game?.opponent?.items || [])].sort( (a, b) => (Number(b.price) - Number(a.price)))?.slice(0,4)}>
                        {(item) => (
                            <div class="w-14 relative group small">
                                <ItemInfo positionY="100%" positionX="50%" name={item.name} price={item.price} wrapperCalsses="group-hover:flex hidden" />
                                {/* <img src={`${item.image}`} class="w-full cursor-pointer relative z-10" /> */}
                                <LazyImage src={item.image} imageCalsses="w-full cursor-pointer relative z-10" />
                                <div class="absolute z-0 left-0 top-0 w-full h-full spinnerWrapper hidden">
                                    <ItemSpinnerBg color={
                                        item.price > 1000 * 100 ? (
                                            "gold"
                                        ) : item.price > 1000 * 30 ? (
                                            "red"
                                        ) : item.price > 1000 * 10 ? (
                                            "purple"
                                        ) : item.price > 1000 * 2 ? (
                                            "blue"
                                        ) : "gray"
                                    } />
                                </div>
                            </div>
                        )}
                    </For>
                    <div class={`w-12 h-12 rounded-full bg-dark-22 flex justify-center items-center ${[...(props.game?.creator?.items || []), ...(props.game?.opponent?.items || [])].length > 4 ? "flex justify-center items-center" : "hidden"}`}>
                        <p class="text-16 text-gray-8c font-bold font-Oswald">+{[...(props.game?.creator?.items || []), ...(props.game?.opponent?.items || [])].length - 4}</p>
                    </div>
                </div>
                <div class="w-1/3 sm:w-full center flex-col gap-1 order-1 sm:order-none absolute sm:relative left-0 top-4 sm:top-0">
                    <div class="sm:flex justify-center items-center gap-2 hidden">
                        {/* <Coin width="10" /> */}
                        <p class="text-20 text-white font-bold leading-none">$ {Number((props.game?.creator?.value / 1000 || 0) + (props.game?.opponent?.value / 1000 || 0)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,})}</p>
                    </div>
                    <div class="flex justify-center items-center gap-2 sm:hidden">
                        {/* <Coin width="10" /> */}
                        <p class="text-20 text-white font-bold leading-none">$ {Number(props.game?.creator?.value / 1000 || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,})}</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        
                        {/* <p class="text-14 text-gray-8c font-normal">Join with value {Math.round((game?.creator?.value || 0) * 0.98).toLocaleString()} - {Math.round((game?.creator?.value || 0) * 1.02).toLocaleString()}</p> */}
                    </div>
                </div>
                <div class="order-2 sm:order-none text-14 text-yellow-ff font-medium font-Oswald uppercase">
                    {props.game?.isDoubleDown ? "double down": ""}
                </div>
                <div class="w-1/3 sm:hidden flex justify-center items-center flex-col gap-1 order-1 sm:order-none absolute sm:relative right-0 top-4 sm:top-0">
                    <div class="flex justify-center items-center gap-2">
                        {/* <Coin width="10" /> */}
                        <p class="text-20 text-white font-bold leading-none">$ {Number(props.game?.opponent?.value / 1000 || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,})}</p>
                    </div>
                </div>
                <div class="w-full hidden sm:block order-4 sm:order-none">
                    <img alt="coin" class={`${props.game?.status == "ended" ? "" : "hidden"}`} src={props.game?.side == 1 ? RedCoin : BlackCoin} />
                </div>
                <div class={`w-full ${props.game?.status == "open" ? "center" : "hidden"} gap-3 order-7 sm:order-none`}>
                    <NavLink href={`${URL.GAMEMODES.COINFLIP_JOIN}?id=${props.id}&value=${props.game?.creator?.value}`} class={`relative ${userObject.user.id == props.game?.creator?.id ? "hidden" : "center"} hover w-24 h-10 group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden`} style={{"background-image": `url(${YellowButtonBg})`}}>
                        <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                        <p class="text-dark-1c text-14 font-medium font-Oswald uppercase min-w-24 text-center z-10 px-4">{i18n.t('coinflip.Join')}</p>
                    </NavLink>
                    <div onClick={cancel} class={`relative ${userObject.user.id != props.game?.creator?.id || Date.now() < props.game?.startTime + 1000 * 60 * 15 ? "hidden" : "center"} hover hover w-24 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden`} style={{"background-image": `url(${GrayButtonBg})`}}>
                        <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                        <p class="text-dark-1c text-14 font-medium font-Oswald uppercase absolute">{i18n.t('coinflip.Cancel')}</p>
                    </div>
                    <NavLink href={`${URL.GAMEMODES.COINFLIP_GAME}?id=${props.id}`} class="relative center hover w-24 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden" style={{"background-image": `url(${GrayButtonBg})`}}>
                        <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                        <div class={`absolute left-0.5 top-0.5 h-9 w-23 ${props.i() % 2 == 0 ? "bg-dark-1c1" : "bg-dark-18"}`} />
                        <p class="text-gray-72 text-14 font-medium font-Oswald uppercase absolute">{i18n.t('coinflip.View')}</p>
                    </NavLink>
                </div>
                <div class={`w-full ${props.game?.status == "pending" || props.game?.status == "counting" ? "center" : "hidden"} order-6 sm:order-none gap-4`}>
                    <div class={`relative center w-24 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden`} style={{"background-image": `url(${GrayButtonBg})`}}>
                        <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                        <p class="text-dark-1c text-14 font-medium font-Oswald uppercase absolute">{props.game?.status} - {counter()}</p>
                    </div>
                    <NavLink href={`${URL.GAMEMODES.COINFLIP_GAME}?id=${props.id}`} class="relative center hover w-10 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden" style={{"background-image": `url(${GrayButtonBg})`}}>
                        <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                        <div class={`absolute left-0.5 top-0.5 h-9 w-9 ${props.i() % 2 == 0 ? "bg-dark-1c1" : "bg-dark-18"}`} />
                        <svg class="absolute" width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_811_116391)">
                            <path d="M20.2188 6.23774V6.707C20.1156 7.097 19.8697 7.39837 19.6011 7.68618C19.3289 7.97816 19.063 8.2764 18.7824 8.56004C17.4245 9.93131 15.9265 11.1191 14.1721 11.9637C12.8531 12.5988 11.4683 12.9611 9.99143 12.9403C8.32602 12.9168 6.80224 12.4105 5.36639 11.6112C3.61621 10.6373 2.12613 9.34787 0.789268 7.87545C0.470191 7.52403 0.123208 7.18929 0 6.70752V6.23826C0.0942489 5.9442 0.233253 5.67724 0.452816 5.45252C1.06517 4.82528 1.64646 4.16415 2.29093 3.57132C3.73942 2.23864 5.35744 1.15883 7.23926 0.504996C8.40289 0.100393 9.59864 -0.0779245 10.8297 0.0336543C12.2471 0.161918 13.5571 0.631174 14.7955 1.30899C16.602 2.29703 18.1337 3.61825 19.4953 5.14229C19.7902 5.47233 20.1055 5.79038 20.2188 6.23826V6.23774ZM10.1088 10.7869C12.5151 10.7874 14.4622 8.85984 14.4633 6.47446C14.4643 4.09011 12.5188 2.16303 10.1099 2.16303C7.70103 2.16303 5.75497 4.08959 5.7555 6.47393C5.75603 8.8588 7.70155 10.7869 10.1083 10.7874L10.1088 10.7869Z" fill="#727999"/>
                            <path d="M13.2216 6.46915C13.2231 8.16681 11.8236 9.55633 10.1108 9.55789C8.3975 9.55998 6.99377 8.17359 6.99219 6.47697C6.99008 4.7793 8.3896 3.3903 10.1029 3.3877C11.8163 3.38561 13.2205 4.77252 13.2221 6.46862L13.2216 6.46915Z" fill="#727999"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_811_116391">
                            <rect width="20.2188" height="12.94" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </NavLink>
                </div>
                <div class={`w-full ${props.game?.status == "spinning" || props.game?.status == "ended" ? "center" : "hidden"} gap-4 my-4 order-3 sm:order-none`}>
                    <div class="relative">
                        <img alt="coin"  class={`${props.game?.status == "ended" ? "" : "hidden"} block sm:hidden absolute ${props.game?.creator?.side == props.game?.winner?.side ? "-left-3.5" : "-right-3.5"} -top-5 z-20`} src={props.game?.side == 1 ? RedCoin : BlackCoin} /> 
                        <NavLink href={`${URL.GAMEMODES.COINFLIP_GAME}?id=${props.id}`} class={`relative center hover w-30 h-10 group rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden`} style={{"background-image": `url(${GrayButtonBg})`}}>           
                            <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                            <div class={`absolute left-0.5 top-0.5 h-9 w-29 ${props.i() % 2 == 0 ? "bg-dark-1c1" : "bg-dark-18"}`} />
                            <p class="text-gray-72 text-14 font-medium font-Oswald uppercase text-center z-10 px-4">{i18n.t('coinflip.View outcome')}</p>
                        </NavLink>
                    </div>
                </div>
                {props.game?.status == "ended" && <div class="flex sm:hidden w-full justify-between order-5 h-14">
                    <div class="flex">
                        <div class="flex items-center gap-1 w-full order-5 sm:order-none">
                            <For each={[...(props.game?.creator?.items || [])].sort( (a, b) => (Number(b.price) - Number(a.price)))?.slice(0,2)}>
                                {(item) => (
                                    <div class="w-8 relative group small">
                                        <LazyImage src={item.image} imageCalsses="w-full cursor-pointer relative z-10" />
                                        <div class="absolute z-0 left-0 top-0 w-full h-full spinnerWrapper hidden">
                                            <ItemSpinnerBg color={
                                                item.price > 1000 * 100 ? (
                                                    "gold"
                                                ) : item.price > 1000 * 30 ? (
                                                    "red"
                                                ) : item.price > 1000 * 10 ? (
                                                    "purple"
                                                ) : item.price > 1000 * 2 ? (
                                                    "blue"
                                                ) : "gray"
                                            } />
                                        </div>
                                    </div>
                                )}
                            </For>
                            <div class={`w-8 h-8 rounded-full bg-dark-22 flex justify-center items-center ${[...(props.game?.creator?.items || [])].length > 4 ? "flex justify-center items-center" : "hidden"}`}>
                                <p class="text-16 text-gray-8c font-bold font-Oswald">+{[...(props.game?.creator?.items || [])].length - 2}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center text-gray-72 absolute left-1/2 transform -translate-x-1/2">
                        <span>Ticket</span>
                        <span>{props.game?.ticket}</span>
                    </div>
                    <div class="flex">
                        <div class="flex items-center gap-1 w-full order-5 sm:order-none">
                            <For each={[...(props.game?.opponent?.items || [])].sort( (a, b) => (Number(b.price) - Number(a.price)))?.slice(0,2)}>
                                {(item) => (
                                    <div class="w-8 relative group small">
                                        <LazyImage src={item.image} imageCalsses="w-full cursor-pointer relative z-10" />
                                        <div class="absolute z-0 left-0 top-0 w-full h-full spinnerWrapper hidden">
                                            <ItemSpinnerBg color={
                                                item.price > 1000 * 100 ? (
                                                    "gold"
                                                ) : item.price > 1000 * 30 ? (
                                                    "red"
                                                ) : item.price > 1000 * 10 ? (
                                                    "purple"
                                                ) : item.price > 1000 * 2 ? (
                                                    "blue"
                                                ) : "gray"
                                            } />
                                        </div>
                                    </div>
                                )}
                            </For>
                            <div class={`w-8 h-8 rounded-full bg-dark-22 flex justify-center items-center ${[...(props.game?.opponent?.items || [])].length > 4 ? "flex justify-center items-center" : "hidden"}`}>
                                <p class="text-16 text-gray-8c font-bold font-Oswald">+{[...(props.game?.opponent?.items || [])].length - 2}</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </>
    )
}


export default CoinflipGame