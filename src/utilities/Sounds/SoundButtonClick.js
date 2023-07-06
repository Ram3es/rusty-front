import SoundButton from "../../assets/sounds/button_click.mp3";
import OptionButton from "../../assets/sounds/option_select.mp3";
import MenuDropdown from "../../assets/sounds/drop_down_menu.mp3";
import creditedSound from "../../assets/sounds/credited.wav";
import PlaceBet from "../../assets/sounds/place-bet.wav";
import countdown from "../../assets/sounds/countdown.mp3";
import cashCount from "../../assets/sounds/cashCount.mp3";
import pullBack from "../../assets/sounds/pullBack.mp3";
import clickSeq from "../../assets/sounds/clickSeq.mp3";
import win from "../../assets/sounds/win.mp3";
import winMax from "../../assets/sounds/winMax.mp3";
import caseBattles from "../../assets/sounds/caseBattles.mp3";
import caseBattlesConfetti from "../../assets/sounds/caseBattlesConfetti.mp3";
import counter35 from "../../assets/sounds/counter35.mp3";
import counter45 from "../../assets/sounds/counter45.mp3";
import counter55 from "../../assets/sounds/counter55.mp3";
import counter60 from "../../assets/sounds/counter60.mp3";
import counter65 from "../../assets/sounds/counter65.mp3";

import injector from "../../injector/injector";

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
const caseBattlesSound = new Audio(caseBattles);
const caseBattlesConfettiSound = new Audio(caseBattlesConfetti);

const counter35Sound = new Audio(counter35);
const counter45Sound = new Audio(counter45);
const counter55Sound = new Audio(counter55);
const counter60Sound = new Audio(counter60);
const counter65Sound = new Audio(counter65);

const {userObject} = injector;

export const playButtonClickSound = () => {
  if (userObject?.user?.sounds) {
    soundButtonClick.currentTime = 0;
    soundButtonClick.volume = userObject.user.sounds;
    soundButtonClick.play();
  }
};

export const playOptionClickSound = () => {
  if (userObject?.user?.sounds) {
    soundOptionClick.currentTime = 0;
    soundOptionClick.volume = userObject.user.sounds;
    soundOptionClick.play();
  }
};

export const playMenuToggle = () => {
  if (userObject?.user?.sounds) {
    soundMenuToggle.currentTime = 0;
    soundMenuToggle.volume = userObject.user.sounds;
    soundMenuToggle.play();
  }
};

export const playCashoutSound = () => {
  if (userObject?.user?.sounds) {
    cashoutSound.currentTime = 0;
    cashoutSound.volume = userObject.user.sounds;
    cashoutSound.play();
  }
};

export const playPlaceBetSound = () => {
  if (userObject?.user?.sounds) {
    placeBetSound.currentTime = 0;
    placeBetSound.volume = userObject.user.sounds;
    placeBetSound.play();
  }
};

export const playCountDownSound = () => {
  if (userObject?.user?.sounds) {
    countDownSound.currentTime = 0;
    countDownSound.volume = userObject.user.sounds;
    countDownSound.play();
  }
};

export const playCashCountSound = () => {
  if (userObject?.user?.sounds) {
    cashCountSound.currentTime = 0;
    cashCountSound.volume = userObject.user.sounds;
    cashCountSound.play();
  }
};

let lastPlayTime = Date.now();

export const playPullBackSound = () => {
  if (
    userObject?.user?.sounds &&
    Date.now() - lastPlayTime >= 1000 &&
    (pullBackSound.paused || pullBackSound.ended)
  ) {
    pullBackSound.currentTime = 0;
    pullBackSound.volume = userObject.user.sounds;
    pullBackSound.play();
    lastPlayTime = Date.now(); // Update last play time
  }
};

export const playClickingSound = () => {
  if (userObject?.user?.sounds) {
    clickingSound.currentTime = 0;
    clickingSound.volume = userObject.user.sounds;
    clickingSound.play();
  }
};

export const playWinSound = () => {
  if (userObject?.user?.sounds) {
    winSound.currentTime = 0;
    winSound.volume = userObject.user.sounds;
    winSound.play();
  }
};

export const playWinMaxSound = () => {
  if (userObject?.user?.sounds) {
    winMaxSound.currentTime = 0;
    winMaxSound.volume = userObject.user.sounds;
    winMaxSound.play();
  }
};

let playingSounds = [];

export const playCaseBattlesSound = () => {
  if (userObject?.user?.sounds) {
    const sound = new Audio(caseBattles);
    sound.currentTime = 0;
    sound.volume = userObject.user.sounds;
    sound.play();
    playingSounds.push(sound);
  }
};

export const playCaseBattlesConfettiSound = () => {
  if (userObject?.user?.sounds) {
    const sound = new Audio(caseBattlesConfetti);
    sound.currentTime = 0;
    sound.volume = userObject.user.sounds;
    sound.play();
    playingSounds.push(sound);
  }
};

export const playCounter35Sound = () => {
  if (userObject?.user?.sounds) {
    counter35Sound.currentTime = 0;
    counter35Sound.volume = userObject.user.sounds;
    counter35Sound.play();
  }
};

export const playCounter45Sound = () => {
  if (userObject?.user?.sounds) {
    counter45Sound.currentTime = 0;
    counter45Sound.volume = userObject.user.sounds;
    counter45Sound.play();
  }
};

export const playCounter55Sound = () => {
  if (userObject?.user?.sounds) {
    counter55Sound.currentTime = 0;
    counter55Sound.volume = userObject.user.sounds;
    counter55Sound.play();
  }
};

export const playCounter60Sound = () => {
  if (userObject?.user?.sounds) {
    counter60Sound.currentTime = 0;
    counter60Sound.volume = userObject.user.sounds;
    counter60Sound.play();
  }
};

export const playCounter65Sound = () => {
  if (userObject?.user?.sounds) {
    counter65Sound.currentTime = 0;
    counter65Sound.volume = userObject.user.sounds;
    counter65Sound.play();
  }
};

export const stopCaseBattlesSound = () => {
  caseBattlesSound.pause();
  caseBattlesSound.currentTime = 0;
  caseBattlesConfettiSound.pause();
  caseBattlesConfettiSound.currentTime = 0;

  counter35Sound.pause();
  counter35Sound.currentTime = 0;

  counter45Sound.pause();
  counter45Sound.currentTime = 0;

  counter55Sound.pause();
  counter55Sound.currentTime = 0;

  counter60Sound.pause();
  counter60Sound.currentTime = 0;

  counter65Sound.pause();
  counter65Sound.currentTime = 0;

  playingSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
};
