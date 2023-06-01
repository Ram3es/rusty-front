import { createEffect, createSignal, For } from 'solid-js';
import injector from '../../injector/injector';
import Modal from './Modal';
import Default from '../../assets/img/ranks/default.svg';
import Bronze from '../../assets/img/ranks/bronze.svg';
import Silver from '../../assets/img/ranks/silver.svg';
import Gold1 from '../../assets/img/ranks/gold1.svg';
import Gold2 from '../../assets/img/ranks/gold2.svg';
import Gold3 from '../../assets/img/ranks/gold3.svg';
import Platinum1 from '../../assets/img/ranks/platinum1.svg';
import Platinum2 from '../../assets/img/ranks/platinum2.svg';
import Platinum3 from '../../assets/img/ranks/platinum3.svg';
import Diamond from '../../assets/img/ranks/diamond.svg';

import { NavLink } from "solid-app-router";
import Benefit from './Benefit';


const LevelBenefitsModal = (props) => {

    const { socket, toastr } = injector;
    
    const [levelIndex, setLevelIndex] = createSignal(0)
    const [benefits, setBenefits] = createSignal([])


    createEffect(() => {
        if(props.searchParams?.profile && props.searchParams?.benefits) {
            socket.emit("system:account", {}, (data) => {
                const rancs = ["default", "bronze", "silver", "gold1", "gold2", "gold3", "platinum1", "platinum2", "platinum3", "diamond"]
                const soundedLevelIndex = rancs.findIndex(item => item === data.data?.level?.league);
                const currentIndex = soundedLevelIndex < 0 ? 0 : soundedLevelIndex
                setLevelIndex(currentIndex)
                setBenefits(() => [
                    {id: "default",name: "preferred player", text: "Rakeback not active", image: Default},
                    {id: "bronze",name: "bronze", text: "Bronze Badge in chat\\Rakeback is Enabled (2%)", image: Bronze},
                    {id: "silver",name: "silver", text: "Silver Badge in chat\\Rakeback is (3%)\\Access to Silver-grade weekly giveaways (Discord)", image: Silver},
                    {id: "gold1",name: "gold I", text: "Gold badge in chat\\Rakeback is (4%)\\Access to Gold-grade weekly giveaways (Discord)", image: Gold1},
                    {id: "gold2",name: "gold II", text: "Gold badge in chat\\Rakeback is (4.25%)\\Access to Gold-grade weekly giveaways (Discord)", image: Gold2},
                    {id: "gold3",name: "gold III", text: "Gold badge in chat\\Rakeback is (4.75%)\\Access to Gold-grade weekly giveaways (Discord)", image: Gold3},
                    {id: "platinum1",name: "platinum I", text: "Platinum badge in chat\\Rakeback is (5.5%)\\Access to Platinum-grade weekly giveaways (Discord)\\Weekly Gift Card Giveaways", image: Platinum1},
                    {id: "platinum2",name: "platinum II", text: "Platinum badge in chat\\Rakeback is (7%)\\Access to Platinum-grade weekly giveaways (Discord)\\Weekly Gift Card Giveaways\\Personalized birthday bonus/gift", image: Platinum2},
                    {id: "platinum3",name: "platinum III", text: "Platinum badge in chat\\Rakeback is (10%)\\Access to Platinum-grade weekly giveaways (Discord)\\Weekly Gift Card Giveaways\\Personalized birthday bonus/gift", image: Platinum3},
                    {id: "diamond",name: "diamond", text: "Diamond badge in chat\\Rakeback is (20%)\\Dedicated Account Manager\\Access to Diamond-grade Giveaways (Discord)\\Early access to new game modes\\Weekly Gift Card Giveaways\\Personalized birthday bonus/gift", image: Diamond}
                ])
                if(data.msg) {
                    toastr(data);
                }
            })
        }
    })

    return (
        <Modal noContainer={true} open={() => {
            return (props.searchParams?.profile && props.searchParams?.benefits)
        }} handler={props.handler}>
            <NavLink class="w-full h-full absolute left-0 cursor-default top-0" href={`${props.pathname()}?profile=true`} />
            <div class="flex flex-col absolute top-40 w-11/12" style={{
                "max-width": "60rem"
            }}>
                <div class={`bg-dark-16 w-full px-8 py-8 relative flex flex-col gap-6 transition-all transform -translate-y-1/4 ${!props.searchParams?.benefits ? "" : "-translate-y-0"} duration-100 ease-out`}>
                    <div class="flex flex-col gap-2 relative">
                        <div class={`flex items-center gap-2`}>
                            <NavLink href={`${props.pathname()}?profile=true`} class="text-gray-47 text-12 font-medium capitalize">profile</NavLink>
                            <p class="text-gray-47 text-12 font-medium capitalize">{`>`}</p>
                            <p class="text-white text-12 font-medium capitalize">benefits</p>
                        </div>
                        <p class={`text-24 text-white font-medium font-Oswald uppercase`}>level benefits</p>
                        <NavLink href={`${props.pathname()}?profile=true`} class="center absolute right-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="#8C98A9"/>
                            </svg>
                        </NavLink>
                    </div>
                    <div class="w-full overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" style={{
                        height: "28rem"
                    }}>
                        <For each={benefits()}>
                            {(val, i) => (
                                <Benefit val={val} isActive={i() <= levelIndex()} />
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LevelBenefitsModal;