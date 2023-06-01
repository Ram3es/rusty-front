
import { onMount, createSignal, onCleanup, For, createEffect} from "solid-js";

import Question from '../../assets/img/mines/question.svg';

import injector from "../../injector/injector";
import History from "../history";
import {useI18n} from "../../i18n/context";
import { playBombFound, playSafeMineFound } from "../../utilities/Sounds/MinesSound";
import { playCashoutSound, playOptionClickSound, playPlaceBetSound } from "../../utilities/Sounds/SoundButtonClick";
import TilesContainer from "../../components/mines_new/TilesContainer";

const Mines = ({ loaded }) => {

    const i18n = useI18n();

    const { socket } = injector;

    onCleanup( () => {
        // socket.off("mines:check");
        
    } )


    return (
        <TilesContainer />
    )
}


export default Mines