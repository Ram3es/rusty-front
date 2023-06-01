import { NavLink } from "solid-app-router";

import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

import Coin from '../../utilities/Coin';

import Injector from "../../injector/injector"
import Countup from "../../utilities/Countup";
import {useI18n} from "../../i18n/context";
import { playButtonClickSound } from "../../utilities/Sounds/SoundButtonClick";

const HeaderOptions = (props) => {

    const { userObject } = Injector;

    const i18n = useI18n();

    return (
    <>
        <div class="hidden xll:flex justify-center items-center gap-2.5">
        <div class="relative cursor-pointer flex items-center h-10 bg-dark-20 rounded-2 w-32">

                <div class="absolute flex items-center gap-2 pl-4">
                    <Coin width="7" />
                    <p class="text-white text-14 font-medium font-Oswald"><Countup props={userObject?.user?.balance} /></p>
                </div>
            </div>
            <NavLink href={`${props.pathname()}?deposit=true`} class="relative cursor-pointer center hover rounded-2 bg-cover group scrolling-btn-wrapper h-10 w-22 overflow-hidden" style={{"background-image": `url(${YellowButtonBg})`}} onClick={() => playButtonClickSound()}>
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <div class="absolute center">
                  <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase">{i18n.t('header.deposit')}</p>
              </div>
            </NavLink>
            <NavLink href={`${props.pathname()}?withdraw=true`} class="relative cursor-pointer center hover h-10 w-24 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden" style={{"background-image": `url(${YellowButtonBg})`}} onClick={() => playButtonClickSound()}>
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
              <div class="absolute center">
                  <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">{i18n.t('header.withdraw')}</p>
              </div>
            </NavLink>
        </div>
    </>
    )
}


export default HeaderOptions;

