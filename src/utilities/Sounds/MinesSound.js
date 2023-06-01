import mineFineSound from '../../assets/sounds/mines-tile.mp3';
import mineMissSound from '../../assets/sounds/mines-mine.wav';
import injector from '../../injector/injector';

const safeSound = new Audio(mineFineSound);
const bombSound = new Audio(mineMissSound);
const { userObject } = injector;

if (userObject?.user?.sounds) {
  safeSound.currentTime = 0;
  safeSound.volume = userObject.user.sounds;
  safeSound.play()
}

export const playSafeMineFound = () => {
  if (userObject?.user?.sounds) {
    safeSound.currentTime = 0;
    safeSound.volume = userObject.user.sounds * 0.7;
    safeSound.play()
  }
}

export const playBombFound = () => {
  if (userObject?.user?.sounds) {
    bombSound.currentTime = 0;
    bombSound.volume = userObject.user.sounds * 0.7;
    bombSound.play()
  }
}
