import SoundButton from "../../assets/sounds/button_click.mp3"
import OptionButton from "../../assets/sounds/option_select.mp3"
import MenuDropdown from "../../assets/sounds/drop_down_menu.mp3"
import creditedSound from '../../assets/sounds/credited.wav';
import PlaceBet from "../../assets/sounds/place-bet.wav"
import countdown from "../../assets/sounds/countdown.mp3"
import cashCount from "../../assets/sounds/cashCount.mp3"
import pullBack from "../../assets/sounds/pullBack.mp3"
import clickSeq from "../../assets/sounds/clickSeq.mp3"
import win from "../../assets/sounds/win.mp3"
import winMax from "../../assets/sounds/winMax.mp3"

import injector from '../../injector/injector';

const soundButtonClick = new Audio(SoundButton);
const soundOptionClick = new Audio(OptionButton);
const soundMenuToggle = new Audio(MenuDropdown);
const cashoutSound = new Audio(creditedSound);
const placeBetSound = new Audio(PlaceBet);
const countDownSound = new Audio(countdown);
const cashCountSound = new Audio(cashCount);
const pullBackSound = new Audio(pullBack);
const clickingSound = new Audio(clickSeq);
const winSound = new Audio(win);
const winMaxSound = new Audio(winMax);

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

export const playCountDownSound = () => {
  if (userObject?.user?.sounds) {
    countDownSound.currentTime = 0;
    countDownSound.volume = userObject.user.sounds;
    countDownSound.play()
  }
}

export const playCashCountSound = () => {
  if (userObject?.user?.sounds) {
    cashCountSound.currentTime = 0;
    cashCountSound.volume = userObject.user.sounds;
    cashCountSound.play()
  }
}

export const playPullBackSound = () => {
  if (userObject?.user?.sounds) {
    // Check if the sound is currently playing
    if (!pullBackSound.paused) {
      return;  // If the sound is playing, exit the function
    }
    pullBackSound.currentTime = 0;
    pullBackSound.volume = userObject.user.sounds;
    pullBackSound.play();
  }
}

export const playClickingSound = () => {
  if (userObject?.user?.sounds) {
    clickingSound.currentTime = 0;
    clickingSound.volume = userObject.user.sounds;
    clickingSound.play()
  }
}

export const playWinSound = () => {
  if (userObject?.user?.sounds) {
    winSound.currentTime = 0;
    winSound.volume = userObject.user.sounds;
    winSound.play()
  }
}

export const playWinMaxSound = () => {
  if (userObject?.user?.sounds) {
    winMaxSound.currentTime = 0;
    winMaxSound.volume = userObject.user.sounds;
    winMaxSound.play()
  }
}

// pause all sounds if user leaves the page
export const pauseAllSounds = () => {
  soundButtonClick.pause();
  soundOptionClick.pause();
  soundMenuToggle.pause();
  cashoutSound.pause();
  placeBetSound.pause();
  countDownSound.pause();
  cashCountSound.pause();
  pullBackSound.pause();
  winSound.pause();
  winMaxSound.pause();
}