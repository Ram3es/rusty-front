import { createEffect, createSignal } from 'solid-js';
import injector from '../../injector/injector';
import { API, URL } from '../../libraries/url';
import Modal from './Modal';
import { NavLink } from "solid-app-router";
import {useI18n} from "../../i18n/context";
import FreecoinsBanner from "../../assets/img/modals/FreecoinsBanner.png"
import FreeCoinsModalSocialsBg from "../../assets/img/modals/FreeCoinsModalSocialsBg.png"
import HeaderBg from "../../assets/img/modals/ModalHeaderBg.png";

import FreeDailyCase from "../../assets/img/modals/FreeDailyCase.png";
import DiscordIcon from "../../assets/img/modals/discordIcon.png";
import TwiterIcon from "../../assets/img/modals/twiterIcon.png";
import TooltipIcon from '../icons/TooltipIcon';

const FreeModal = (props) => {

    const i18n = useI18n();

    const { socket, userObject, toastr} = injector;

    let input;


    const [code, setCode] = createSignal("");

    const [flashCode, setFlashCode] = createSignal("")

    const [codeSet, setCodeSet] = createSignal(false);

    createEffect(() => {
        if(props.searchParams?.free) {
            if(userObject?.user?.code) {
                setCodeSet(true);
                setCode(userObject?.user?.code);
                input.disabled = true;
            }
            if(props.searchParams?.code) {
                setCode(props.searchParams.code); 
            }
        }

        if(props.pathname().includes("/r/")) {
            const code = props.pathname().split("/r/")[1];
            if(code) {
                setCode(code);
            }
        }
    })    
    
    const claim = () => {

        if (codeSet()) return
        socket.emit("affiliate:claim", {
            code: code()
        }, (data) => {

            if(data.msg) {
                toastr(data);
            }

            if(!data.error) {
                input.disabled = true;
                setCodeSet(true);
            }
        })
    }

    const claimFlash = () => {
        
        if (!flashCode()) return

        socket.emit("system:flash:claim", {
            code: flashCode()
        }, (data) => {
            
            if (data.msg) toastr(data)

        })

        
    }

    const buttonName = {
      claimed: {
        en: "Claimed",
        es: "Reclamado",
        ru: "Получено",
      },
      claim: {
        en: "Claim",
        es: "Reclamar",
        ru: "Получить",
      }
    }

    return (
        <Modal open={() => {
            return (true)
        }} pathname={props.pathname} handler={props.handler} noContainer={true}>
            <NavLink class="w-full h-full absolute left-0 cursor-default top-0" href={props.pathname().includes("/r/") ? URL.HOME : props.pathname()} />
            <div class="flex flex-col w-11/12" style={{
                "max-width": "30rem"
            }}>
                <div class={`bg-dark-16 w-full relative flex flex-col gap-5 border-2 border-gray-30 rounded-4 overflow-hidden transition-all transform -translate-y-1/4 ${!props.searchParams?.free ? "" : "-translate-y-0"} duration-100 ease-out`}>
                    <div
                        class="flex justify-between items-center relative px-8 py-4 border-b-2 border-gray-30"
                        style={{ 'background-image': `url(${HeaderBg})` }}
                    >
                        <p class="text-24 text-white font-medium font-Oswald uppercase flex items-center gap-2">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.67581 0C4.72529 0 4.77477 0 4.82425 0C4.84701 0.00841151 4.86977 0.0222658 4.89303 0.0237502C5.52686 0.0638285 6.04936 0.339924 6.50457 0.769901C6.80986 1.05837 7.12505 1.33595 7.43677 1.61798C7.66437 1.82381 7.89297 2.02915 8.1275 2.24043C8.51394 1.84262 8.97014 1.6353 9.50897 1.63678C10.0468 1.63777 10.4986 1.85598 10.8761 2.23746C11.4441 1.72288 11.9993 1.22264 12.551 0.718442C12.8756 0.421565 13.2392 0.196434 13.6692 0.0925267C13.8359 0.0519535 14.0071 0.0301825 14.1764 0C14.2258 0 14.2753 0 14.3248 0C14.3911 0.0113803 14.4574 0.0277085 14.5242 0.0336461C15.8438 0.149428 16.8715 1.38839 16.7102 2.70356C16.6691 3.03854 16.54 3.36263 16.448 3.70453C16.4757 3.70453 16.5351 3.70453 16.5939 3.70453C16.9957 3.70453 17.3975 3.69958 17.7988 3.7075C18.3287 3.71789 18.7715 4.05435 18.9378 4.55904C18.9586 4.62287 18.9793 4.6867 19.0001 4.75053V6.93999C18.8611 7.29773 18.5984 7.4244 18.2179 7.4239C12.406 7.41747 6.59413 7.41747 0.782271 7.4239C0.402763 7.4239 0.138048 7.29921 0 6.9395V4.71292C0.0118751 4.69264 0.0282033 4.67334 0.0346356 4.65157C0.216225 4.04 0.65214 3.70849 1.28696 3.70453C1.6635 3.70206 2.04004 3.70453 2.41608 3.70354C2.47299 3.70354 2.53038 3.6976 2.60213 3.69315C2.57838 3.64268 2.5665 3.61497 2.55265 3.58825C1.90842 2.35127 2.39778 0.859459 3.66692 0.273622C3.97865 0.129636 4.33836 0.0885683 4.67581 0ZM7.6238 3.69364C7.67328 3.55065 7.62776 3.45812 7.52237 3.36411C6.84994 2.76343 6.19285 2.14494 5.51152 1.55415C4.82376 0.957428 3.75747 1.30972 3.54174 2.18749C3.34877 2.97322 3.93263 3.69562 4.77626 3.70255C5.67827 3.70948 6.57978 3.70453 7.48179 3.70354C7.52979 3.70354 7.57828 3.69661 7.62331 3.69364H7.6238ZM11.3204 3.68969C11.4124 3.6976 11.4486 3.70354 11.4847 3.70354C12.3867 3.70354 13.2887 3.70453 14.1907 3.70255C14.2827 3.70255 14.3758 3.68919 14.4668 3.67336C14.9611 3.58627 15.3723 3.19341 15.4668 2.72187C15.5658 2.23004 15.3599 1.73475 14.9448 1.46459C14.4495 1.14149 13.8795 1.19542 13.3971 1.62639C12.7429 2.21074 12.0933 2.80054 11.4496 3.39627C11.3828 3.45812 11.3684 3.57588 11.3204 3.69018V3.68969Z" fill="#FFC239"/>
                                <path d="M2.44859 19C2.26057 18.9436 2.0577 18.9164 1.88799 18.8258C1.4308 18.5814 1.23486 18.1737 1.23535 17.6626C1.23634 16.6176 1.23535 15.5726 1.23535 14.528C1.23535 12.6483 1.23535 10.7691 1.23535 8.88936V8.66324H8.25204C8.2555 8.72806 8.26243 8.79337 8.26243 8.85819C8.26292 12.1723 8.26293 15.486 8.26194 18.8001C8.26194 18.8669 8.2461 18.9332 8.23769 19H2.44859Z" fill="#FFC239"/>
                                <path d="M10.7625 18.9999C10.7541 18.9271 10.7383 18.8544 10.7383 18.7812C10.7373 15.4794 10.7373 12.1781 10.7373 8.87638V8.6651H17.7644C17.7644 8.74427 17.7644 8.81651 17.7644 8.88875C17.7644 11.7882 17.7644 14.6882 17.7644 17.5877C17.7644 18.4022 17.4002 18.8371 16.6031 18.9796C16.5853 18.9826 16.569 18.993 16.5516 18.9999H10.7625Z" fill="#FFC239"/>
                            </svg>
                            {i18n.t('free_coins.Free coins')}
                        </p>
                        <NavLink href={`${props.pathname().includes("/r/") ? URL.HOME : props.pathname()}`} class="center right-0 cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="#8C98A9"/>
                            </svg>
                        </NavLink>
                    </div>
                    <div class='px-8 pb-8'>
                        <div class="w-full flex flex-col gap-5 mb-8">
                            <div class="w-full flex flex-col gap-2">
                                <div class="text-14 text-gray-8c font-normal sentence flex items-center gap-2">
                                    <span>{i18n.t('free_coins.Creator code')}</span>
                                    <div class="relative group cursor-pointer">
                                        <TooltipIcon />
                                        <svg class="group-hover:block hidden absolute left-1/2 top-full transform -translate-x-1/2 rotate-180" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.95305 0.5H20.0469C21.2765 0.5 21.9838 1.89801 21.2554 2.88859L12.7085 14.5124C12.1091 15.3277 10.8909 15.3277 10.2915 14.5124L1.74458 2.88859C1.01622 1.89802 1.72352 0.5 2.95305 0.5Z" fill="#171B27" stroke="#272A3B"/>
                                        </svg>
                                        <span class="group-hover:flex hidden top-full left-1/2 absolute z-20 transform -translate-x-1/2 translate-y-2 py-3 px-5 bg-dark-17 border border-gray-30 text-gray-8c text-14 shadow-md rounded-2 flex-col w-48">
                                            <p class="text-16 text-white">Creator code</p>
                                            <p class="text-14">Don't have a creator code handy? Use code "LOOT"</p>
                                        </span>
                                    </div>
                                </div>
                                <div class="w-full h-10 bg-dark-20 relative center">
                                    <div class="absolute w-full h-full rounded-4 bg-dark-22" />
                                    <input class="w-full h-full px-4 text-white text-14 font-medium font-Oswald uppercase backdrop-blur-sm rounded-4 placeholder-gray-8c z-10" ref={input} placeholder={i18n.t('free_coins.Type here')} value={code()} onInput={(e) => {
                                        setCode(e.currentTarget.value);
                                    }} style={{
                                        background: "linear-gradient(218.47deg, rgba(19, 22, 32, 0.5) -4.89%, rgba(19, 22, 32, 0) 109.48%)",
                                        border: "0.5px solid rgba(102, 110, 151, 0.2)"
                                    }} />
                                    <div class={`absolute right-4 w-24 h-6 duration-200 gap-2 ${codeSet() ? "text-green bg-green bg-opacity-20 cursor-not-allowed" : "text-gray-47 bg-dark-2d hover:text-white hover"} center z-10`} onClick={claim}>
                                        <svg class={`${codeSet() ? "" : "hidden"}`} width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 3.75014L4.42857 6.75014L9.92857 1.25" stroke="#33EBB4" stroke-width="1.7"/>
                                        </svg>
                                        <p class="text-14 text-current font-bold sentence">{codeSet() ? buttonName.claimed[i18n.language] : buttonName.claim[i18n.language]}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex flex-col gap-2">
                                <p class="text-14 text-gray-8c font-normal sentence">{i18n.t('free_coins.Flash code')}</p>
                                <div class="w-full h-10 bg-dark-20 relative center">
                                    <div class="absolute w-full h-full rounded-4 bg-dark-22" />
                                    <input class="w-full h-full px-4 text-white text-14 font-medium font-Oswald uppercase backdrop-blur-sm rounded-4 placeholder-gray-8c z-10" placeholder={i18n.t('free_coins.Type here')} style={{
                                        background: "linear-gradient(218.47deg, rgba(19, 22, 32, 0.5) -4.89%, rgba(19, 22, 32, 0) 109.48%)",
                                        border: "0.5px solid rgba(102, 110, 151, 0.2)"
                                    }} value={flashCode()} onInput={(e) => {
                                        setFlashCode(e.currentTarget.value);
                                    }} />
                                    <div class="absolute right-4 w-24 h-6 bg-dark-2d duration-200 text-gray-47 hover:text-white center hover z-10" onClick={() => claimFlash()}>
                                        <p class="text-14 text-current font-bold sentence">{i18n.t('free_coins.Claim coins')}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col w-full gap-2">
                                <NavLink
                                    href="/case?id=1"
                                    class="center relative p-5 w-full flex justify-between bg-cover h-32" 
                                    style={{
                                        "background-image": `url(${FreecoinsBanner})`,
                                        height: "119px"
                                    }}>
                                    <div class="flex flex-col w-11/12">
                                        <div class="mb-2 flex flex-row items-end">
                                            <h3 class="text-white uppercase text-16 font-Oswald font-bold">DAILY CASES</h3>
                                        </div>
                                        <p class="text-gray-8c text-12">Click <span class="underline">here</span> to open your daily free case</p>
                                    </div>
                                    <img class="w-3/12" src={FreeDailyCase} alt="FreeDailyCase" />
                                </NavLink>
                                <div
                                    class="center relative p-5 w-full flex justify-between bg-cover" 
                                    style={{
                                        "background-image": `url(${FreeCoinsModalSocialsBg})`,
                                        height: "119px"
                                    }}>
                                    <div class="flex flex-col w-11/12">
                                        <div class="mb-2 flex flex-row items-end">
                                            <h3 class="text-white uppercase text-16 font-Oswald font-bold">FLASH CODES</h3>
                                        </div>
                                        <p class="text-gray-8c text-12">On our social media</p>
                                    </div>
                                    <div class="w-1/2 flex gap-1 px-1 transform -translate-x-4 -translate-y-3">
                                        <a class="w-1/2" href="https://discord.gg/rustyloot" target="_blank"><img class="w-full" src={DiscordIcon} alt="DiscordIcon" /></a>
                                        <a class="w-1/2" href="https://twitter.com/RustyLootgg" target="_blank"><img class="w-full" src={TwiterIcon} alt="TwiterIcon" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='flex flex-col'>
                            <p class='text-white text-14'>Creator Code Requirements</p>
                            <p class='text-white text-12'>
                                <svg class='inline mr-2' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z" fill="#4D5B97"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="#2D3660" stroke-width="1.5"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="black" stroke-opacity="0.2" stroke-width="1.5"/>
                                </svg>
                                You <span class='text-yellow-ff'>must</span> be at least level 5 on Steam
                            </p>
                            <p class='text-white text-12'>
                                <svg class='inline mr-2' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z" fill="#4D5B97"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="#2D3660" stroke-width="1.5"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="black" stroke-opacity="0.2" stroke-width="1.5"/>
                                </svg>
                                You <span class='text-yellow-ff'>must</span> join our <a class='text-blue-72 underline' href='https://discord.com/invite/rustyloot' target="_blank">Discord</a>
                            </p>
                            <p class='text-white text-12'>
                                <svg class='inline mr-2' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0526 10.7273L14.9602 15.9084H13.9766L13.8842 10.7273H15.0526ZM14.4702 18.0675C14.2737 18.0675 14.1056 17.9988 13.9659 17.8615C13.8262 17.7218 13.7576 17.5537 13.7599 17.3572C13.7576 17.1631 13.8262 16.9974 13.9659 16.8601C14.1056 16.7204 14.2737 16.6506 14.4702 16.6506C14.6619 16.6506 14.8277 16.7204 14.9673 16.8601C15.107 16.9974 15.178 17.1631 15.1804 17.3572C15.178 17.4875 15.1437 17.607 15.0774 17.7159C15.0135 17.8224 14.9283 17.9077 14.8217 17.9716C14.7152 18.0355 14.598 18.0675 14.4702 18.0675Z" fill="#4D5B97"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="#2D3660" stroke-width="1.5"/>
                                    <path d="M13.4175 3.375C13.8986 2.54167 15.1014 2.54167 15.5825 3.375L24.6758 19.125C25.1569 19.9583 24.5555 21 23.5933 21H5.40673C4.44448 21 3.84308 19.9583 4.3242 19.125L13.4175 3.375Z" stroke="black" stroke-opacity="0.2" stroke-width="1.5"/>
                                </svg>
                                You <span class='text-yellow-ff'>must</span> verify you joined our Discord via  <a class='text-yellow-ff underline' href={API + "/discord"} target="_blank">THIS</a> link
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FreeModal;