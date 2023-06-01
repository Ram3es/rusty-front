import { onMount, createSignal, createSelector, For  } from "solid-js";
import { NavLink } from "solid-app-router";

import injector from "../../injector/injector";

import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

import Logo from '../../assets/smallLogo.svg';
import EnFlag from "../../assets/img/header/enFlag.svg";
import EsFlag from "../../assets/img/header/esFlag.svg";
import RuFlag from "../../assets/img/header/ruFlag.svg";
import {useI18n} from "../../i18n/context";
import roomStore from "../chat/RoomStore"
import { playButtonClickSound, playMenuToggle } from "../../utilities/Sounds/SoundButtonClick";

const HeaderSettings = (props) => {

    const { userObject, setUserObject, socket, SNOWMODE } = injector;

    const i18n = useI18n();
    const [isSoundModalOpen, setSoundModalOpen] = createSignal(false);
    const [isLangModalOpen, setLangModalOpen] = createSignal(false);
    const [availableLocales, setAvailableLocales] = createSignal([]);
    const [setRoom] = roomStore;

    let soundWrapperMain;
    let soundButtonMain;
    let langButtonMain;
    let langWrapperMain;

    const isSelected = createSelector(() => {
        setRoom(i18n.language)
        return i18n.language;
    });

    onMount(() => {
        setAvailableLocales([
            {title: 'En', code: 'en', active: setRoom() == "en", flag: EnFlag},
            {title: 'Es', code: 'es', active: setRoom() == "es", flag: EsFlag},
            {title: 'Ru', code: 'ru', active: setRoom() == "ru", flag: RuFlag}
        ])
    });

    const handleClick = (event) => {
        if (soundWrapperMain && soundButtonMain && !soundWrapperMain.contains(event.target) && !soundButtonMain.contains(event.target)) {
            setSoundModalOpen(false)
        }
        if (langWrapperMain && langButtonMain && !langWrapperMain.contains(event.target) && !langButtonMain.contains(event.target)) {
            setLangModalOpen(false)
        }
    };
    
    document.addEventListener('mousedown', handleClick);


    const toggleSounds = (volume) => {
        if (volume === 0) {
            setSoundModalOpen(false)
        }
        socket.emit("system:sounds:toggle", {volume: volume * 100}, (data) => {
            if(!data.error) {
                setUserObject("user", (prev) => ({...prev, sounds: data.data.sounds / 100}));
            }
        })
    }

    const toggleActiveLang = (lang) => {
        props.changeLang(lang);
        setAvailableLocales(prev => prev.map(l => {
            return {...l, active: l.code === lang}
        }))
    }

    return (
    <>
        <NavLink href={`${props.pathname()}?free=true`} class="relative" onClick={() => playButtonClickSound()} style={{
            filter: "drop-shadow(0px 0px 40px rgba(255, 194, 57, 0.2)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25)) drop-shadow(0px 0px 40px rgba(255, 199, 0, 0.3))"
        }}>
            { SNOWMODE && <svg class="absolute -right-2 -top-3 z-30 hidden xll:flex" width="82" height="38" viewBox="0 0 82 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80.8977 18.2795C79.7314 23.0653 78.2347 19.783 77.3679 23.7034C77.1945 24.2846 77.0763 25.0267 76.9974 26.0288C76.9107 26.573 76.887 27.2287 76.8476 27.9834C76.816 28.6886 76.7136 29.3318 76.6978 29.9381C75.7203 38.1023 72.7187 37.1675 70.19 34.2789C67.5353 31.1672 69.5917 27.8929 69.907 25.9139C70.2144 23.9843 65.9051 21.1164 59.2953 21.0273C52.6854 20.9382 57.129 17.892 50.2987 15.6371C43.4683 13.3821 42.8457 17.2907 35.8497 18.104C28.8538 18.9173 24.7809 16.087 20.0933 15.5939C15.4058 15.1008 17.643 17.7909 17.6034 22.0967C17.5637 26.4025 11.3712 28.7643 8.81891 24.5021C6.35331 20.203 3.69841 19.1206 2.19391 15.3805C1.91035 14.6251 1.76858 13.9937 1.85528 13.4495C1.98931 12.1011 2.93476 11.2371 4.1402 10.2623C4.96747 9.63311 5.88139 8.96701 6.6614 8.12737C10.1202 4.67062 13.4289 7.22696 21.1497 5.41305C28.8627 3.64863 36.662 5.90572 36.662 5.90572C45.4067 8.82073 53.0409 6.53645 64.1806 10.1374C75.2414 13.7257 82.3004 12.5166 80.8977 18.2795Z" fill="white"/>
                <path d="M36.2278 9.16758C36.368 9.75161 34.1549 10.2546 31.329 10.2442C28.5032 10.2337 26.1003 9.72798 25.9601 9.14396C25.8199 8.55994 28.033 8.0569 30.8588 8.06738C33.6847 8.07786 36.0875 8.58356 36.2278 9.16758Z" fill="#D9F1FF"/>
                <path d="M70.1971 34.2302C67.5423 31.1185 69.5988 27.8442 69.9141 25.8652C70.2215 23.9356 65.9122 21.0677 59.3024 20.9786C52.6925 20.8895 57.1361 17.8433 50.3058 15.5884C43.4754 13.3335 42.8528 17.242 35.8568 18.0553C28.8609 18.8686 24.788 16.0384 20.1004 15.5453C15.4129 15.0522 17.6501 17.7422 17.6105 22.048C17.5708 26.3539 11.3783 28.7156 8.82601 24.4535C6.35253 20.2039 3.69762 19.1214 2.19313 15.3813C1.1455 12.83 2.39035 11.6079 4.13942 10.2631C4.04487 10.3495 1.88599 13.7597 4.91897 16.0185C8.03073 18.2898 8.96014 21.5832 11.7413 20.3521C14.5224 19.121 10.8987 14.9925 14.9797 13.2076C18.982 11.4101 24.7646 13.1429 28.4121 14.5864C32.0596 16.0299 38.4884 14.2131 40.2611 13.2273C41.9708 12.1299 45.8864 10.3693 51.9525 12.3503C58.0187 14.3313 57.4512 17.8935 61.4218 17.8158C65.3925 17.7381 71.0647 19.6564 71.7736 22.3058C72.4825 24.9553 72.443 25.71 71.9543 28.7775C71.5209 31.4987 75.6018 31.2356 77.0045 25.9801C76.9178 26.5243 76.8941 27.1801 76.8547 27.9348C76.0346 38.1533 72.8519 37.3419 70.1971 34.2302Z" fill="#D9F1FF"/>
                </svg>
            }
            <div class="hidden xll:flex justify-center items-center relative overflow-hidden h-10 rounded-2 bg-cover group scrolling-btn-wrapper" style={{"background-image": `url(${YellowButtonBg})`}}>
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="center gap-2 text-dark-16 z-10 px-4">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_558_116359)">
                        <path d="M3.69141 0C3.73047 0 3.76953 0 3.80859 0C3.82656 0.00664063 3.84453 0.0175781 3.86289 0.01875C4.36328 0.0503906 4.77578 0.268359 5.13516 0.607813C5.37617 0.835547 5.625 1.05469 5.87109 1.27734C6.05078 1.43984 6.23125 1.60195 6.41641 1.76875C6.72148 1.45469 7.08164 1.29102 7.50703 1.29219C7.93164 1.29297 8.28828 1.46523 8.58633 1.76641C9.03477 1.36016 9.47305 0.965234 9.90859 0.567188C10.1648 0.332813 10.452 0.155078 10.7914 0.0730469C10.923 0.0410156 11.0582 0.0238281 11.1918 0C11.2309 0 11.2699 0 11.309 0C11.3613 0.00898438 11.4137 0.021875 11.4664 0.0265625C12.5082 0.117969 13.3195 1.09609 13.1922 2.13437C13.1598 2.39883 13.0578 2.65469 12.9852 2.92461C13.007 2.92461 13.0539 2.92461 13.1004 2.92461C13.4176 2.92461 13.7348 2.9207 14.0516 2.92695C14.4699 2.93516 14.8195 3.20078 14.9508 3.59922C14.9672 3.64961 14.9836 3.7 15 3.75039V5.47891C14.8902 5.76133 14.6828 5.86133 14.3824 5.86094C9.79414 5.85586 5.20586 5.85586 0.617578 5.86094C0.317969 5.86094 0.108984 5.7625 0 5.47852V3.7207C0.009375 3.70469 0.0222656 3.68945 0.0273437 3.67227C0.170703 3.18945 0.514844 2.92773 1.01602 2.92461C1.31328 2.92266 1.61055 2.92461 1.90742 2.92383C1.95234 2.92383 1.99766 2.91914 2.0543 2.91562C2.03555 2.87578 2.02617 2.85391 2.01523 2.83281C1.50664 1.85625 1.89297 0.678516 2.89492 0.216016C3.14102 0.102344 3.425 0.0699219 3.69141 0ZM6.01875 2.91602C6.05781 2.80313 6.02187 2.73008 5.93867 2.65586C5.40781 2.18164 4.88906 1.69336 4.35117 1.22695C3.8082 0.755859 2.96641 1.03398 2.79609 1.72695C2.64375 2.34727 3.10469 2.91758 3.7707 2.92305C4.48281 2.92852 5.19453 2.92461 5.90664 2.92383C5.94453 2.92383 5.98281 2.91836 6.01836 2.91602H6.01875ZM8.93711 2.91289C9.00977 2.91914 9.03828 2.92383 9.0668 2.92383C9.77891 2.92383 10.491 2.92461 11.2031 2.92305C11.2758 2.92305 11.3492 2.9125 11.4211 2.9C11.8113 2.83125 12.1359 2.52109 12.2105 2.14883C12.2887 1.76055 12.1262 1.36953 11.7984 1.15625C11.4074 0.901172 10.9574 0.94375 10.5766 1.28398C10.0602 1.74531 9.54727 2.21094 9.03906 2.68125C8.98633 2.73008 8.975 2.82305 8.93711 2.91328V2.91289Z" class="fill-current"/>
                        <path d="M1.93438 14.9999C1.78594 14.9554 1.62578 14.9339 1.4918 14.8624C1.13086 14.6694 0.976173 14.3476 0.976563 13.944C0.977344 13.119 0.976563 12.294 0.976563 11.4694C0.976563 9.98545 0.976563 8.50186 0.976563 7.01787V6.83936H6.51602C6.51875 6.89053 6.52422 6.94209 6.52422 6.99326C6.52461 9.60967 6.52461 12.2257 6.52383 14.8421C6.52383 14.8948 6.51133 14.9472 6.50469 14.9999H1.93438V14.9999Z" class="fill-current"/>
                        <path d="M8.49648 14.9998C8.48984 14.9424 8.47734 14.885 8.47734 14.8271C8.47656 12.2205 8.47656 9.61426 8.47656 7.00762V6.84082H14.0242C14.0242 6.90332 14.0242 6.96035 14.0242 7.01738C14.0242 9.30644 14.0242 11.5959 14.0242 13.885C14.0242 14.5279 13.7367 14.8713 13.1074 14.9838C13.0934 14.9861 13.0805 14.9943 13.0668 14.9998H8.49648V14.9998Z" class="fill-current"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_558_116359">
                        <rect width="15" height="15" class="fill-current" />
                        </clipPath>
                        </defs>
                    </svg>
                    <p class="text-14 text-dark-16 font-medium font-Oswald uppercase whitespace-nowrap">{i18n.t('header.free coins')}</p>
                </div>
            </div>
        </NavLink>
        <div class="center gap-2.5">
            <div class="relative cursor-pointer flex lg:hidden justify-center items-center">
                <NavLink href={`${props.pathname()}?profile=true`} class="w-10 h-10 bg-dark-16 rounded-full border border-yellow-ff p-0.5">
                    <img alt="avatar"  class="w-full h-full rounded-full bg-white" src={userObject?.user?.avatar || Logo} />
                </NavLink>
            </div>
            <div class="relative">
                <div ref={soundButtonMain} class={`relative w-10 h-10 bg-dark-20 rounded-2 cursor-pointer hidden xll:flex justify-center items-center ${userObject?.user?.sounds == 1 ? "" : "opacity-75"}`}
                onClick={() => {
                        setSoundModalOpen((prev) => !prev)}
                    }>
                    <div class="center">

                        {
                            userObject?.user?.sounds > 0 ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5.77V11.77H4L9 16.77V0.77L4 5.77H0ZM13.5 8.77C13.5 7 12.48 5.48 11 4.74V12.79C12.48 12.06 13.5 10.54 13.5 8.77ZM11 0V2.06C13.89 2.92 16 5.6 16 8.77C16 11.94 13.89 14.62 11 15.48V17.54C15.01 16.63 18 13.05 18 8.77C18 4.49 15.01 0.91 11 0Z" fill="#4D5B97"/>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_733_115759)">
                                    <path d="M16.735 17.54H16.6998C16.6594 17.4932 16.6225 17.4424 16.5779 17.3995C16.023 16.86 15.4664 16.3227 14.9127 15.782C14.8389 15.7101 14.7803 15.6227 14.7135 15.5416C13.592 16.4181 12.3814 17.0096 11.0256 17.311C11.0145 17.2882 11.0051 17.2785 11.0051 17.2682C11.0033 16.6482 10.9998 16.0275 11.0068 15.4075C11.0068 15.3623 11.0748 15.2984 11.1258 15.2767C11.4521 15.1374 11.7943 15.03 12.1084 14.8685C12.5016 14.6663 12.8725 14.4225 13.2369 14.2067C11.8078 12.8181 10.4062 11.4564 8.99414 10.0849V16.5294L8.9502 16.5482C8.90977 16.4997 8.87344 16.4466 8.82773 16.4026C7.25859 14.877 5.68828 13.3526 4.12031 11.8252C4.03535 11.7424 3.95156 11.7059 3.82969 11.7065C2.6584 11.7105 1.48652 11.7093 0.315234 11.7087C0.210352 11.7087 0.104883 11.703 0 11.7002C0 9.76462 0 7.82962 0 5.89406C0.0697266 5.8912 0.140039 5.88549 0.209766 5.88549C1.63887 5.88549 3.06738 5.88549 4.49648 5.88549H4.71445C4.65 5.81698 4.6166 5.77872 4.58027 5.74332C3.09434 4.29821 1.60781 2.85425 0.120703 1.41085C0.084375 1.37602 0.0410156 1.34804 0.000585937 1.31721V1.28296C0.413086 0.86501 0.826172 0.447064 1.26738 0C1.34766 0.0993477 1.38574 0.158157 1.43496 0.205547C6.9 5.51608 12.365 10.8255 17.8313 16.1343C17.884 16.1857 17.9443 16.2291 18.0006 16.2765V16.3107L16.735 17.54Z" fill="#4D5B97"/>
                                    <path d="M17.9981 9.34342C17.9512 9.66887 17.9043 9.99432 17.8574 10.3198C17.7561 11.0215 17.3096 12.277 16.9545 12.8366C16.8684 12.7458 16.7904 12.6584 16.7061 12.5762C16.334 12.2131 15.9654 11.8465 15.5852 11.492C15.4774 11.3915 15.4721 11.3104 15.5225 11.1836C15.9145 10.1907 16.0885 9.16471 15.9561 8.10443C15.6643 5.76291 14.4567 4.00262 12.3449 2.84129C11.9664 2.63288 11.544 2.49871 11.1402 2.33313C11.0641 2.30172 10.9949 2.28859 10.9961 2.17668C11.0031 1.56747 10.9996 0.958818 11.0008 0.3496C11.0008 0.333042 11.0078 0.316484 11.016 0.282227C11.2651 0.349029 11.5152 0.404413 11.7572 0.482635C13.7008 1.10898 15.2647 2.23721 16.426 3.87416C17.2604 5.05034 17.7637 6.35557 17.9277 7.77955C17.9524 7.99309 17.974 8.2072 17.9969 8.42074V9.34285L17.9981 9.34342Z" fill="#4D5B97"/>
                                    <path d="M11.001 4.9043C12.6738 5.66653 13.7472 7.55243 13.4449 9.39435C13.4004 9.35667 13.3605 9.32755 13.3254 9.29329C12.5842 8.57388 11.843 7.85504 11.1047 7.13277C11.056 7.08538 11.0056 7.01172 11.0051 6.95006C10.998 6.27404 11.0004 5.59745 11.0004 4.9043H11.001Z" fill="#4D5B97"/>
                                    <path d="M6.95703 3.04135C7.62031 2.39845 8.30176 1.73727 8.98672 1.07324V5.02031C8.31641 4.36656 7.6373 3.70481 6.95703 3.04135Z" fill="#4D5B97"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_733_115759">
                                    <rect width="18" height="17.54" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            )
                        }

                        
                    </div>
                </div>

                <div ref={soundWrapperMain} class={`absolute left-0 -bottom-11 ${isSoundModalOpen() ? "flex" : "hidden"} justify-end`}>
                    <div class="w-36 h-10 flex justify-center items-center px-2 bg-cover bg-dark-20 rounded-2">
                        <div class="relative w-full h-2 bg-gray-2e rounded-lg">
                            <input type="range" value={userObject?.user?.sounds * 100 || 0} class="absolute left-0 top-0 w-full h-full bg-transparent appearance-none cursor-pointer" onChange={(e) => toggleSounds(e.target.value ? e.target.value / 100 : 0)} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="relative">
                    <button
                        type="button"
                        onClick={() => {
                            playMenuToggle()
                            setLangModalOpen((prev) => !prev)}
                        }
                        ref={langButtonMain}
                        class="relative w-24 h-10 flex justify-between items-center py-2 pl-3 text-left bg-dark-20 rounded-2"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                    >
                        <span class="block truncate">
                            <For each={availableLocales()}>
                                {(item) => item.active ? <span class="flex gap-2 items-center font-Oswald text-14 text-white uppercase"> <img src={item.flag} alt="flag"/>{item.title}</span> : ""}
                            </For>
                        </span>
                        <span class={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2`}>
                            <svg class={isLangModalOpen() ? "" : "transform -rotate-90" }  width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.12452 -7.90072e-07C5.90864 -7.61763e-07 5.69271 0.0803387 5.52806 0.240654L0.346806 5.29049C0.0172113 5.61172 0.0172114 6.13254 0.346807 6.45364C0.676269 6.77473 1.21054 6.77473 1.54017 6.45364L6.12452 1.98533L10.7091 6.45332C11.0385 6.77442 11.5729 6.77442 11.9023 6.45332C12.2321 6.13222 12.2321 5.61157 11.9023 5.29034L6.72115 0.240471C6.55642 0.0801826 6.34048 -8.18392e-07 6.12452 -7.90072e-07Z" fill="#48488B"/>
                            </svg>
                        </span>
                    </button>

                    <ul ref={langWrapperMain} class={`${isLangModalOpen() ? "" : "hidden" } absolute z-40 mt-1 w-full overflow-auto py-1 font-Oswald text-14 text-white uppercase bg-dark-20 rounded-2`} tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        <For each={availableLocales()}>
                            {(item) => !item.active ? <li onClick={() => toggleActiveLang(item.code)} class="text-gray-900 relative select-none py-2 pl-3 pr-9 cursor-pointer" id="listbox-option-0" role="option">

                                <span class="flex gap-1 items-center font-Oswald text-14 text-white uppercase">
                                    <img src={item.flag} alt="flag"/>{item.title}
                                </span>

                            </li> : ""}
                        </For>
                    

                    </ul>
                </div>
            </div>


            <div class="relative cursor-pointer flex xll:hidden justify-center items-center w-10 h-10 rounded-2 group bg-cover scrolling-btn-wrapper overflow-hidden" style={{"background-image": `url(${YellowButtonBg})`}} onClick={() => {
                playMenuToggle()
                props.setActive((prev) => !prev)
            }}>
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="absolute center flex-col gap-1">
                    <div class={`w-5 h-0.5 bg-dark-16 duration-200 ${props.active() ? "absolute tranform rotate-45" : ""}`} />
                    <div class={`w-5 h-0.5 bg-dark-16 duration-200 ${props.active() ? "opacity-0" : ""}`} />
                    <div class={`w-5 h-0.5 bg-dark-16 duration-200 ${props.active() ? "absolute transform -rotate-45" : ""}`} />
                </div>
            </div>

            {/* <div class="relative cursor-pointer hidden xll:flex justify-center items-center">
                <svg width="112" height="40" viewBox="0 0 112 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="112" height="40" fill="#20273D"/>
                    <path d="M73.619 2L66 0H82L73.619 2Z" fill="#161B2A"/>
                    <path d="M57.8947 4L50 0H65L57.8947 4Z" fill="#161B2A"/>
                    <path d="M4 19.5789L0 28L0 12L4 19.5789Z" fill="#161B2A"/>
                    <path d="M56.4211 38L48 40H64L56.4211 38Z" fill="#161B2A"/>
                    <path d="M108 18.5789L112 27V11L108 18.5789Z" fill="#161B2A"/>
                </svg>

                <div class="absolute flex justify-between items-center w-full px-4">
                    <div class="flex items-center gap-2">
                        <img src={English} />
                        <p class="text-white text-14 font-medium uppercase leading-none">en</p>
                    </div>
                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.02491 6.69434C5.80903 6.69434 5.5931 6.614 5.42845 6.45368L0.247197 1.40384C-0.0823981 1.08261 -0.082398 0.561798 0.247197 0.2407C0.576659 -0.0803975 1.11093 -0.0803975 1.44056 0.2407L6.02491 4.70901L10.6095 0.241013C10.9389 -0.0800843 11.4733 -0.0800842 11.8027 0.241013C12.1325 0.562111 12.1325 1.08277 11.8027 1.404L6.62154 6.45386C6.45681 6.61415 6.24087 6.69434 6.02491 6.69434Z" fill="#48488B"/>
                    </svg>
                </div>
            </div> */}
        </div>
    </>
    )
}


export default HeaderSettings;

