import { createEffect, createSignal, For } from "solid-js";
import injector from "../../injector/injector";
import Fallback from "../Fallback";
import TableLeaderboard from "../../components/leaderbord/TableLeaderboard";
import LeaderbordTopCard from "../../components/leaderbord/LeaderbordTopCard"
import LeaderbordBanner from "../../components/leaderbord/LeaderbordBanner"


const intersectColors = {
  0 : "#FFC467",
  1 : "white",
  2 : "#C73200"
 }

const Leaderboard = () => {
  const { leaderboards } = injector;

  const [timeLeft, setTimeLeft] = createSignal({
    days:"00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  let clocksTimeLeft = 0;
  let timerInterval = null;

  const countdown = () => {
    const left = Math.floor(
      (leaderboards?.weekly?.ending - Date.now() || 0) / 1000
    );

    const days = Math.floor(left / (24 * 3600));
    const hours = Math.floor((left % (24 * 3600)) / 3600);
    const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60);
    const seconds = (left % (24 * 3600)) % 60;

    setTimeLeft(prev => ({ 
      ...prev,
       days: `${`0${days}`.slice(-2)}`,
       hours:`${`0${hours}`.slice(-2)}`, 
       minutes: `${`0${minutes}`.slice(-2)}`,
       seconds: `${`0${seconds}`.slice(-2)}`}))
  };

  function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      // timePassed += 1;
      clocksTimeLeft = (leaderboards?.weekly?.ending - Date.now()) / 1000;
      if (clocksTimeLeft <= 0 || !leaderboards?.weekly?.ending) {
        clearInterval(timerInterval);
      }
    }, 50);
  }

  createEffect(() => {
    countdown();
    clocksTimeLeft = (leaderboards?.weekly?.ending - Date.now() || 0) / 1000;
    startTimer();
  });

  setInterval(countdown, 1000);

  return (
    <Fallback loaded={() => true}>
      <div class="w-full h-full pt-8 flex flex-col gap-4 relative min-h-screen">
        <div class="w-full flex flex-col gap-16 ">
          <LeaderbordBanner timer={timeLeft()} />
          <div class=" flex items-center gap-4 mb-10 center scale-80 sm:scale-100">
            <svg width="135" height="3" viewBox="0 0 135 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M135 0L0 1.5V1.5L135 3V0Z" fill="url(#paint0_linear_2668_143059)"/>
              <defs>
                <linearGradient id="paint0_linear_2668_143059" x1="135" y1="1.5" x2="-8.17195e-07" y2="1.50007" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFC467"/>
                  <stop offset="1" stop-color="#FFC467" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            <h1 class='text-gradient--leaderboard-gold text-2xl font-SpaceGrotesk font-bold text-center '>TOP 20 PLACES</h1>
            <svg class='rotate-180' width="135" height="3" viewBox="0 0 135 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M135 0L0 1.5V1.5L135 3V0Z" fill="url(#paint0_linear_2668_143059)"/>
              <defs>
                <linearGradient id="paint0_linear_2668_143059" x1="135" y1="1.5" x2="-8.17195e-07" y2="1.50007" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFC467"/>
                  <stop offset="1" stop-color="#FFC467" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 md:gap-8">
            <For each={leaderboards?.weekly?.players.slice(0, 3)} >
              {(player, idx) => 
                <LeaderbordTopCard 
                  id={String(player.userId)} 
                  variant={idx()}
                  color={intersectColors[idx()]}
                  player={player}
                />
              }
            </For>
          </div>
          <TableLeaderboard players={leaderboards?.weekly?.players.slice(3, 20)} />
        </div>
      </div>
    </Fallback>
  );
};

export default Leaderboard;
