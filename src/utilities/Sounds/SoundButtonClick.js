import SoundButton from "../../assets/sounds/button_click.mp3"
import OptionButton from "../../assets/sounds/option_select.mp3"
import MenuDropdown from "../../assets/sounds/drop_down_menu.mp3"
import creditedSound from '../../assets/sounds/credited.wav';
import PlaceBet from "../../assets/sounds/place-bet.wav"
import injector from '../../injector/injector';

const soundButtonClick = new Audio(SoundButton);
const soundOptionClick = new Audio(OptionButton);
const soundMenuToggle = new Audio(MenuDropdown);
const cashoutSound = new Audio(creditedSound);
const placeBetSound = new Audio(PlaceBet);
const { userObject } = injector;

export const playButtonClickSound = () => {
  if (userObject?.user?.sounds) {
    soundButtonClick.currentTime = 0;
    soundButtonClick.volume = userObject.user.sounds;
    soundButtonClick.play()
  }
}

export const playOptionClickSound = () => {
  if (userObject?.user?.sounds) {
    soundOptionClick.currentTime = 0;
    soundOptionClick.volume = userObject.user.sounds;
    soundOptionClick.play()
  }
}

export const playMenuToggle = () => {
  if (userObject?.user?.sounds) {
    soundMenuToggle.currentTime = 0;
    soundMenuToggle.volume = userObject.user.sounds;
    soundMenuToggle.play()
  }
}

export const playCashoutSound = () => {
  if (userObject?.user?.sounds) {
    cashoutSound.currentTime = 0;
    cashoutSound.volume = userObject.user.sounds;
    cashoutSound.play()
  }
}

export const playPlaceBetSound = () => {
  if (userObject?.user?.sounds) {
    placeBetSound.currentTime = 0;
    placeBetSound.volume = userObject.user.sounds;
    placeBetSound.play()
  }
}
