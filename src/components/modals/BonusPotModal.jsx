import { createEffect, createSignal } from 'solid-js';
import injector from '../../injector/injector';
import Coin from '../../utilities/Coin';
import Modal from './Modal';

import Splash from '../../assets/img/modals/bonusSplash.svg';
import Bonus from '../../assets/img/modals/bonus.png';

import { NavLink } from "solid-app-router";
import Countup from '../../utilities/Countup';

const BonusPotModal = (props) => {

    const { socket} = injector;

    const [bonus, setBonus] = createSignal({});

    createEffect(() => {
        if(props.searchParams?.bonusPot) {
            socket.emit("wheel:modal:connect", {}, (data) => {
                setBonus(data.bonus);
            })
        }
    })

    return (
        <Modal open={() => {
            return (true)
        }} handler={() => {}} noContainer={true}>
            <NavLink class="w-full h-full absolute left-0 cursor-default top-0" href={props.pathname()} />
            <div class="flex flex-col w-11/12" style={{
                "max-width": "60rem"
            }}>
                <div class="bg-dark-16 w-full px-8 pt-8 pb-16 relative flex flex-col gap-6">
                    <div class="w-full h-1/2 left-0 top-0 absolute" style={{
                        background: "linear-gradient(180deg, #205C53 -4.92%, #192942 30.6%, rgba(22, 27, 42, 0) 54.64%, rgba(25, 31, 49, 0) 100%)"
                    }}>
                        <img class="w-full" alt="splash" src={Splash} />
                    </div>
                    <div class="w-full flex flex-col gap-6 z-10 relative">
                        <NavLink href={`${props.pathname()}`} class="center absolute right-0 cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="#8C98A9"/>
                            </svg>
                        </NavLink>
                        <div class="center flex-col">
                            <p class="text-28 text-white font-medium font-Oswald uppercase">bonus pot</p>
                            <p class="text-18 text-white font-semibold sentence">we give away 10% of each pot!</p>
                        </div>
                        <div class="center">
                            <img alt="bonus" src={Bonus} />
                        </div>
                        <div class="center flex-col md:flex-row gap-4 md:gap-16">
                            <div class="center flex-col gap-2">
                                <div class="w-56 h-12 bg-dark-1e flex items-center pl-4 gap-10">
                                    <Coin />
                                    <p class="text-white text-24 font-medium font-Oswald"><Countup props={bonus()?.today || 0} /></p>
                                </div>
                                <p class="text-16 text-gray-8c font-normal sentence">this day's total Bonus</p>
                            </div>
                            <div class="center flex-col gap-2">
                                <div class="w-56 h-12 bg-dark-1e flex items-center pl-4 gap-10">
                                    <Coin />
                                    <p class="text-white text-24 font-medium font-Oswald"><Countup props={bonus()?.month || 0} /></p>
                                </div>
                                <p class="text-16 text-gray-8c font-normal sentence">this month's total Bonus</p>
                            </div>
                        </div>
                        <div class="center">
                            <p class="text-12 md:text-16 text-gray-8c font-normal text-center" style={{
                                "max-width": "40rem"
                            }}>
                                After each round 10% of the house edge will be added to a pot.
                                If the wheel lands on the green tile the pot will be evenly distributed between all the 
                                players in the current round and then the wheel will respin with the current bets
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BonusPotModal;