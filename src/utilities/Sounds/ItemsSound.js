import SoundButton from "../../assets/sounds/deselecting.mp3"
import SelectSkinSound from "../../assets/sounds/selecting_item.mp3";
import HoverSkinSound from "../../assets/sounds/hovering_over_item.mp3";
import injector from '../../injector/injector';

const soundButtonClick = new Audio(SoundButton);
const soundSelectSkin = new Audio(SelectSkinSound);
const soundHoverSkin = new Audio(HoverSkinSound);
const { userObject } = injector;

export const playDeselectItemSound = () => {
  if (userObject?.user?.sounds) {
    soundButtonClick.currentTime = 0;
    soundButtonClick.volume = userObject.user.sounds;
    soundButtonClick.play()
  }
}

export const playSelectItemSound = () => {
  if (userObject?.user?.sounds) {
    soundSelectSkin.currentTime = 0;
    soundSelectSkin.volume = userObject.user.sounds;
    soundSelectSkin.play()
  }
}

export const playHoverItemSound = () => {
  if (userObject?.user?.sounds) {
    soundHoverSkin.currentTime = 0;
    soundHoverSkin.volume = userObject.user.sounds;
    soundHoverSkin.play()
  }
}