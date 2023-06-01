import { onMount, onCleanup, createSignal, For, createEffect  } from "solid-js";

import { URL } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import Bg from '../../assets/img/plinko/plinko_bg.png';
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import PlinkoView from "./game/PlinkoView";
import injector from "../../injector/injector";

import History from "../history";
import {useI18n} from "../../i18n/context";
import PinkoBetSnow from "../../components/elements/PinkoBetSnow";
import PinkoGameSnow from "../../components/elements/PinkoGameSnow";
import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";
import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";


const BALL_FALL_TIME = {
    8: 5000,
    10: 5500,
    12: 7500,
    14: 6000,
    16: 7000,
}

const AUTO_BET_DELAY = 250;

const [isBusy, setIsBusy] = createSignal(false);

const Plinko = (props) => {

    const i18n = useI18n();

    const { socket, toastr, userObject, SNOWMODE } = injector;
    
    const [rows, setRows] = createSignal(10);
    const [betValue, setBetValue] = createSignal("");

    const [history, setHistory] = createSignal([]);

    const [isPageLoaded, setIsPageLoaded] = createSignal(false)

    const [globalHistory, setGlobalHistory] = createSignal([]);

    const [changeSettings, setChangeSettings] = createSignal(true);
    const [activeBalls, setActiveBalls] = createSignal(0);
    const [betPeack, setBetPeack] = createSignal();
    const { plinkoPageLoaded, onPlinkoPageLoad } = PageLoadState;

    const bet = (clicked = true) => {

        
        if(!document.hasFocus() || props.pathname() != URL.GAMEMODES.PLINKO) {
            return;
        }

        if(betStyle() === "auto") {
            if(autoBetAmount() === 0) return toastr({
                error: true,
                msg:"Autobet amount is 0!"
            });

            //already betting and more than 0 so cancel
            if(!changeSettings() && clicked) {
                setAutoBetAmount(0);
                return toastr({
                    error : true,
                    msg:"Autobet canceled!"
                });
            }

            // setAutoBetAmount(autoBetAmount() - 1);
            setAutoBetAmount((prev) => (prev - 1));

            setTimeout(() => {
                bet(false);
            }, AUTO_BET_DELAY);
        }

        if (!isBusy()) {
            setIsBusy(true);
            socket.emit("plinko:bet", {
                rows: rows(), 
                bet: betValue(),
                mode: mode(),
            }, (data) => {
                if(data.msg) {
                    toastr(data)
                }

                if(data.error) {
                    setAutoBetAmount(0);
                    toastr({
                        error: true,
                        msg:"Autobet canceled!"
                    });
                }
                setTimeout(() => {
                    setIsBusy(false);
                }, 100);
            })
        }
    }

    const betProcessed = (data) => {
        if(data?.data?.path) {
            setActiveBalls(activeBalls() + 1);
            setChangeSettings(false);

            setTimeout(() => {
                setActiveBalls(activeBalls() - 1);

                if(activeBalls() === 0)
                    setChangeSettings(true);
            }, BALL_FALL_TIME[data?.data?.path ? data.data.path.length : 0]);
        }
    }

    createEffect(() => {
        if (props.loaded()) {
            socket.emit("plinko:connect", {}, (data) => {
                setGlobalHistory(data.globalHistory);
                onPlinkoPageLoad(true);
            })
        }
    })

    onMount(() => {
        socket.on("plinko:history", (data) => {
            setHistory((prev) => [data, ...prev]);
        });

        socket.on("plinko:history:global", (data) => {
            setGlobalHistory((prev) => [data, ...prev].slice(0, 10));
        })
    })

    onCleanup( () => {
        setAutoBetAmount(0); // Potentially need to rewrite the whole plinko
    })

    const [mode, setMode] = createSignal("normal");

    const [betStyle, setBetStyle] = createSignal("manual");
    const [autoBetAmount, setAutoBetAmount] = createSignal(0);

    const buttonName = {
      placeBet: {
        en: "place bet",
        es: "hacer apuesta",
        ru: "сделать ставку",
      },
      stopAutobet: {
        en: "stop autobet",
        es: "dejar de apostar automáticamente",
        ru: "остановить автоматическую ставку",
      },
      startAutobet: {
        en: "start autobet",
        es: "iniciar apuesta automática",
        ru: "начать автоматическую ставку",
      }
    }

    return (
    <Fallback loaded={plinkoPageLoaded}>
        <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
        <div class="w-full h-full flex flex-col gap-20 overflow-y-scroll relative pt-10 min-h-screen">
            <div class="w-full flex items-start">
                <div class="flex-1 flex flex-col-reverse xl:flex-row justify-evenly items-center xxl:items-start gap-4 xl:gap-0 xxl:gap-4  max-w-full">
                    <div class="w-115 max-w-full sm:max-w-none">
                    <div class="flex flex-col gap-6 w-full p-2 sm:p-7 bet-info-bg relative">
                        { SNOWMODE && <PinkoBetSnow />}
                        <div class="flex flex-col gap-2 items-center">
                            <p class="text-14 text-gray-8c font-normal capitalize">{i18n.t('plinko.Mode')}</p>
                            <div class="relative flex gap-2">
                                <div
                                    class={`center relative hover w-full h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group ${betStyle() == "manual" ? "text-dark-43" : "text-dark-27"}`}
                                    style={{"background-image": `url(${betStyle() == "manual" ? GrayButtonBg : ""})`}}
                                    onClick={() => {
                                        playOptionClickSound()
                                        changeSettings() ? setBetStyle("manual") : ""
                                    }}
                                > {/*TODO: CHANGE THE TURNARY CONDITION TO EMIT AN ERROR MESSAGE ON FALSE */}
                                    <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                    <p class={`text-14 duration-200 ${betStyle() == "manual" ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4`}>{i18n.t('plinko.Manual')}</p>
                                </div>
                                <div
                                    class={`center relative hover w-full h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group ${betStyle() == "auto" ? "text-dark-43" : "text-dark-27"}`}
                                    style={{"background-image": `url(${betStyle() == "auto" ? GrayButtonBg : ""})`}}
                                    onClick={() => {
                                        playOptionClickSound()
                                        changeSettings() ? setBetStyle("auto") : ""
                                    }}
                                >
                                    <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                    <p class={`text-14 duration-200 ${betStyle() == "auto" ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4`}>{i18n.t('plinko.Auto')}</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 items-center">
                            <p class="text-14 text-gray-8c font-normal capitalize">{i18n.t('plinko.Difficulty')}</p>
                            <div class="relative flex gap-2">
                                <div
                                    class={`center relative hover w-full h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group ${mode() == "easy" ? "text-dark-43" : "text-dark-27"}`}
                                    style={{"background-image": `url(${mode() == "easy" ? GrayButtonBg : ""})`}}
                                    onClick={() => {
                                        playOptionClickSound();
                                        changeSettings() ? setMode("easy") : ""
                                    }}
                                > {/*TODO: CHANGE THE TURNARY CONDITION TO EMIT AN ERROR MESSAGE ON FALSE */}
                                    <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                    <p class={`text-14 duration-200 ${mode() == "easy" ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4`}>{i18n.t('plinko.Easy')}</p>
                                </div>
                                <div
                                    class={`center relative hover w-full h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group ${mode() == "normal" ? "text-dark-43" : "text-dark-27"}`}
                                    style={{"background-image": `url(${mode() == "normal" ? GrayButtonBg : ""})`}}
                                    onClick={() => {
                                        playOptionClickSound()
                                        changeSettings() ? setMode("normal") : ""
                                    }}
                                >
                                    <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                    <p class={`text-14 duration-200 ${mode() == "normal" ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4`}>{i18n.t('plinko.Normal')}</p>
                                </div>
                                <div
                                    class={`center relative hover w-full h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group ${mode() == "hard" ? "text-dark-43" : "text-dark-27"}`}
                                    style={{"background-image": `url(${mode() == "hard" ? GrayButtonBg : ""})`}}
                                    onClick={() => {
                                        playOptionClickSound()
                                        changeSettings() ? setMode("hard") : ""
                                    }}
                                >
                                    <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                    <p class={`text-14 duration-200 ${mode() == "hard" ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4`}>{i18n.t('plinko.Hard')}</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <p class="text-14 text-gray-8c font-normal">{i18n.t('plinko.Bet amount')}</p>
                            <div class="relative center bg-dark-27 w-full h-10 rounded-2">
                                <div class="absolute left-4">
                                    <Coin />
                                </div>
                                <div class="absolute right-2 cursor-pointer z-10" onClick={() => {
                                    playOptionClickSound()
                                    setBetValue(0)
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11" cy="11" r="11" fill="#666E97"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7.2H16H6ZM14.8889 7.2V14.9C14.8889 15.1917 14.7718 15.4715 14.5635 15.6778C14.3551 15.8841 14.0725 16 13.7778 16H8.22222C7.92754 16 7.64492 15.8841 7.43655 15.6778C7.22817 15.4715 7.11111 15.1917 7.11111 14.9V7.2M8.77778 7.2V6.1C8.77778 5.80826 8.89484 5.52847 9.10321 5.32218C9.31159 5.11589 9.5942 5 9.88889 5H12.1111C12.4058 5 12.6884 5.11589 12.8968 5.32218C13.1052 5.52847 13.2222 5.80826 13.2222 6.1V7.2" fill="#666E97"/>
                                        <path d="M6 7.2H16M14.8889 7.2V14.9C14.8889 15.1917 14.7718 15.4715 14.5635 15.6778C14.3551 15.8841 14.0725 16 13.7778 16H8.22222C7.92754 16 7.64492 15.8841 7.43655 15.6778C7.22817 15.4715 7.11111 15.1917 7.11111 14.9V7.2M8.77778 7.2V6.1C8.77778 5.80826 8.89484 5.52847 9.10321 5.32218C9.31159 5.11589 9.5942 5 9.88889 5H12.1111C12.4058 5 12.6884 5.11589 12.8968 5.32218C13.1052 5.52847 13.2222 5.80826 13.2222 6.1V7.2" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <input class="absolute w-full h-full text-14 text-white font-medium pl-14 placeholder-white" type="number" onInput={ (e) => setBetValue(e.currentTarget.value)} value={betValue()} placeholder="0" />
                            </div>
                            <div class="grid grid-cols-5 sm:grid-cols-7 gap-2 flex-wrap sm:flex-nowrap">
                                <For each={[100, 500, 1000, 5000, "1/2", "x2", "max"]}>
                                    {(val) => (
                                        <div
                                            class="relative center cursor-pointer duration-200 text-dark-27 hover:text-dark-43 h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group no-select"
                                            style={{"background-image": `url(${betPeack() === val ? GrayButtonBg : ""})`}}
                                            onClick={() => {
                                                playOptionClickSound();
                                                setBetPeack(val);
                                                val == "max" ? setBetValue(userObject?.user?.balance) : val == "1/2" ? setBetValue((prev) => Math.round(prev / 2)) : val == "x2" ? setBetValue((prev) => Math.round(prev * 2)) : setBetValue((prev) => Number(prev) + Number(val))
                                            }}>
                                            <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                            <p class={`absolute ${betPeack() === val ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b duration-200 text-14 font-medium font-Oswald uppercase`}>{val == "max" ? "max" : `${val == "1/2" || val == "x2" ? "" : "+"}${val}`}</p>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-14 text-gray-8c font-normal text-center">{i18n.t('plinko.Amount of rows')}</p>
                            {/* <div class="relative center">
                                <svg width="332" height="40" viewBox="0 0 332 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="332" height="40" fill="#272F48"/>
                                    <path d="M73.619 2L66 0H82L73.619 2Z" fill="#1A1F2E"/>
                                    <path d="M57.8947 4L50 0H65L57.8947 4Z" fill="#1A1F2E"/>
                                    <path d="M4 19.5789L0 28L0 12L4 19.5789Z" fill="#191E2C"/>
                                </svg>
                                <div className="absolute left-5">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="12" height="2" fill="white"/>
                                        <rect y="5" width="12" height="2" fill="white"/>
                                        <rect y="10" width="12" height="2" fill="white"/>
                                    </svg>
                                </div>
                                <input class="absolute w-full h-full text-14 text-white font-medium pl-10" value={"0.00"} />
                            </div> */}
                            <div class="flex gap-2 justify-center">
                                <For each={[8, 10, 12, 14, 16]}>
                                    {(val) => (
                                        <div
                                            class={`relative center cursor-pointer ${rows() == val ? "text-white" : "text-gray-8c"} w-8 h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group`}
                                            style={{"background-image": `url(${rows() == val ? GrayButtonBg : ""})`}}
                                            onClick={() => {
                                                playOptionClickSound()
                                                changeSettings() ? setRows(val) : "";
                                            }}
                                        >
                                            <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                                            <p class={`absolute ${rows() === val ? "text-dark-1b" : "text-gray-8c"} group-hover:text-dark-1b text-current text-14 font-medium font-Oswald`}>{val}</p>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>

                        <div class={betStyle() == "auto" ? "relative flex-col gap-2" : "hidden"}>
                            <p class="text-14 text-gray-8c font-normal">{i18n.t('plinko.Number of bets')}</p>
                            <div class="relative center bg-dark-27 w-full h-10 rounded-2">
                                <div class="absolute left-5">
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                        <circle cx="10" cy="10" r="6" stroke="silver" stroke-width="3" fill="none" />
                                    </svg> 
                                </div>
                                <input class="absolute w-full h-full text-14 text-white font-medium pl-14 placeholder-white" type="number" onInput={ (e) => setAutoBetAmount(e.currentTarget.value)} value={autoBetAmount()} placeholder="0" />
                            </div>
                        </div>
                        
                        <div class="relative center cursor-pointer hover h-10 w-full overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                            style={{"background-image": `url(${YellowButtonBg})`}}
                            onClick={bet}>
                            <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                            <p class="absolute text-dark-16 text-14 font-medium font-Oswald uppercase">{betStyle() === "manual" ? buttonName.placeBet[i18n.language] : (!changeSettings() && autoBetAmount() > 0 ? buttonName.stopAutobet[i18n.language] : buttonName.startAutobet[i18n.language])}</p>
                        </div>
                        <p class="text-gray-8c uppercase text-10 font-medium"> {i18n.t('plinko.Max coins')}</p>
                    </div>
                    </div>
                    <div class="center flex-col gap-6 transform scale-50 sm:scale-60 2xl:scale-57 -my-32 xl:-ml-16 2xl:ml-auto  xxl:scale-100 sm:mx-auto sm:my-10">
                        { SNOWMODE && <PinkoGameSnow />}
                        <PlinkoView rows={rows} mode={mode} betProcessed={betProcessed}/>
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-12">
                    <For each={history()?.slice(0, 10)}>
                        {(val) => (
                            <div class="flex-1 relative center duration-75" style={{
                                color: `${val.multiplier < 1 ? "#1B2685" : val.multiplier  < 5 ? "#5517A0" : val.multiplier < 25 ? "#B53114" : "#9F0F34"}`
                            }}>
                                {
                                    val.multiplier < 1 ? (
                                        <svg class="w-full" viewBox="0 0 43 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M31.5 0L26.5 3L23 0H0V28H10L13.5 25L18.5 28H43V0H31.5Z" fill="url(#paint0_radial_314_124849)"/>
                                            <defs>
                                            <radialGradient id="paint0_radial_314_124849" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5003 13.9994) rotate(90) scale(14 21.5)">
                                            <stop stop-color="#7B7DFF"/>
                                            <stop offset="1" stop-color="#2C40EE"/>
                                            </radialGradient>
                                            </defs>
                                        </svg>
                                    ) : val.multiplier < 5 ? (
                                        <svg class="w-full" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M31.5 0L26.5 3L23 0H0V28H5L8.5 25L13.5 28H38V0H31.5Z" fill="url(#paint0_radial_314_124846)"/>
                                            <defs>
                                            <radialGradient id="paint0_radial_314_124846" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.9993 13.9994) rotate(90) scale(14 19)">
                                            <stop stop-color="#CF67FF"/>
                                            <stop offset="1" stop-color="#981EEE"/>
                                            </radialGradient>
                                            </defs>
                                        </svg>
                                    ) : val.multiplier < 25 ? (
                                        <svg class="w-full" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 0L23.5 3L20 0H0V28H5L8.5 25L13.5 28H35V0H28.5Z" fill="url(#paint0_radial_314_124840)"/>
                                            <defs>
                                            <radialGradient id="paint0_radial_314_124840" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5 13.9994) rotate(90) scale(14 17.5)">
                                            <stop stop-color="#F79143"/>
                                            <stop offset="1" stop-color="#EA520D"/>
                                            </radialGradient>
                                            </defs>
                                        </svg>
    
                                    ) : (
                                        <svg class="w-full" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M26.5 0L21.5 3L18 0H0V28H5L8.3 25L13 28H38V0H26.5Z" fill="url(#paint0_radial_314_124837)"/>
                                            <defs>
                                            <radialGradient id="paint0_radial_314_124837" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.9993 13.9994) rotate(90) scale(14 19)">
                                            <stop stop-color="#F25B5A"/>
                                            <stop offset="1" stop-color="#D6293A"/>
                                            </radialGradient>
                                            </defs>
                                        </svg>
                                    )
                                }
                                <p class={`text-current text-14 font-bold font-Oswald absolute`}>{val.multiplier}</p>
                            </div>
                        )}
                    </For>
                </div>
            </div>
            <History history={globalHistory} /> 
        </div>
    </Fallback>
    )
}


export default Plinko