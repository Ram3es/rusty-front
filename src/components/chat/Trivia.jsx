import Coin from "../../utilities/Coin";
import TriviaBg from "../../assets/img/chat/TriviaBg.jpg"
import { createSignal, onMount, For } from "solid-js";
import injector from "../../injector/injector";
import chousenAnsverBtnBg from "../../assets/img/chat/chousenAnsverBtnBg.jpg"
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

const Trivia = () => {
  const { socket, toastr } = injector;
  const [timeLimit, setTimeLimit] = createSignal(0);
  const [chousenAnsverId, setChousenAnsverId] = createSignal();
  const [triviaObj, setTriviaObj] = createSignal({})

  // let timePassed;
  let timeLeft = 0;
  let timerInterval = null;

  function calculateTimeFraction() {
    const passed = timeLeft / timeLimit();
    return passed >= 0 ? passed : 1;
  }
      
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    const timer = document.getElementById("base-timer-path-remaining");
    if (timer) {
      timer.setAttribute("stroke-dasharray", circleDasharray);
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one 
      // timePassed += 1;
      timeLeft = (triviaObj().endDate - Date.now()) / 1000;
      if (timeLeft <= 0 || !triviaObj().endDate) {
        clearInterval(timerInterval);
      }
      setCircleDasharray();
    }, 50);
  }

  const gameStart = (game) => {
    if (Object.keys(game).length > 0) {
      const ansvers = game.answers.map((ansver, index) => {
        return {text: ansver, id: index + 1}
      })
      setTriviaObj({
        question: game.question,
        ansvers,
        price: game.prize_amount,
        startDate: new Date(game.started_at),
        endDate: game.started_at + game.time_limit * 1000,
        playesrsAnsvered: game.correct_answer_counter,
        totalPlayers: game.total_prizes
      })
      timeLeft = (Date.now() - triviaObj().startDate.getTime()) / 1000;
      setTimeLimit((triviaObj().endDate - triviaObj().startDate.getTime()) / 1000);
      startTimer();
    }
  }

  const triviaAnsver = (ansverId) => {
    socket.emit(
      "trivia:answer",
      { answer: ansverId },
      (data) => {
        if (data.msg) {
          toastr(data);
          setTriviaObj({})
        }
      }
    );
  }

  onMount(() => {
  
    socket.on("trivia:update", (data) => {
      setTriviaObj(prev => {
        const newObj = {...prev};
        newObj.playesrsAnsvered = data.correct_answer_counter;
        return newObj;
      })
    });

    // socket.emit("trivia:game:get", {}, (data) => {
    //   gameStart(data);
    // });

    socket.on("trivia:start", (data) => {
      gameStart(data);
    });

    socket.on("trivia:stop", () => {
      clearInterval(timerInterval)
      setTriviaObj({})
    });
  })

  return (
    <> {triviaObj().question ? <div
      class="absolute bottom-44 w-11/12 flex flex-col p-4 border border-yellow-ff border-opacity-80 rounded-8 bg-cover"
      style={{
        "background-image": `url(${TriviaBg})`,
      }}
    >
      <div class="flex justify-between mb-2">
        <div class="text-white">{triviaObj().question}</div>
        <div class="base-timer">
          <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g class="base-timer__circle">
              <circle
                class="base-timer__path-elapsed"
                cx="50"
                cy="50"
                r="45"
               />
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                class="base-timer__path-remaining"
                d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                       "
               />
            </g>
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-3">
        <For each={triviaObj().ansvers}>
            {(ansver) => {
                return (
                  <div
                    class="bg-dark-171 hover:bg-yellow-ff cursor-pointer rounded-2 p-2 center text-gray-47 hover:text-gray-1b bg-cover"
                    style={{
                      "background-image": ansver.id === chousenAnsverId() ? `url(${chousenAnsverBtnBg})` : ""
                    }}
                    onClick={() => setChousenAnsverId(ansver.id)}
                  >
                    {ansver.text}
                  </div>
                )
            }}
        </For>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <div
          class="relative col-span-2 cursor-pointer rounded-2 bg-cover group scrolling-btn-wrapper w-full h-10 overflow-hidden"
          style={{"background-image": `url(${YellowButtonBg})`}}
          onClick={() => triviaAnsver(chousenAnsverId())}
        >
          <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
          <span class="absolute text-dark-16 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-Oswald text-14 uppercase">
            ANSWER
          </span>
        </div>
        <div class="center">
          <span
            class="font-Oswald text-12 text-yellow-ff mr-1"
            style={{ "text-shadow": "0px 0px 20px #FFC701" }}
          >
            {triviaObj().price}
          </span>
          <Coin width="6" />
        </div>
        <div class="center">
          <svg
            class="mr-2"
            width="15"
            height="17"
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0627 2.58551H12.2562V2.05193H12.4015C12.7293 2.05193 12.9943 1.78633 12.9943 1.45907C12.9943 1.13181 12.7293 0.866211 12.4015 0.866211H2.59733C2.26948 0.866211 2.00447 1.13181 2.00447 1.45907C2.00447 1.78633 2.26948 2.05193 2.59733 2.05193H2.74258V2.58551H0.936722C0.420339 2.58551 0 3.00585 0 3.52223V3.87202C0 5.6927 1.21892 7.22228 2.94237 7.67345C3.34256 9.02577 4.32611 10.1433 5.65946 10.6994V14.4262H9.27355V10.7237C10.6205 10.1807 11.6367 9.04 12.0511 7.67464C13.7781 7.22584 15 5.69507 15 3.87143V3.52223C14.9994 3.00585 14.5791 2.58551 14.0627 2.58551ZM1.18572 3.77123H2.74317V6.31165C2.74317 6.32469 2.74614 6.33714 2.74614 6.35078C1.81119 5.90198 1.18572 4.9617 1.18572 3.87202V3.77123ZM12.2562 6.31165V3.77123H13.8137V3.87202C13.8137 4.96229 13.1876 5.90198 12.2533 6.35018C12.2539 6.33714 12.2562 6.32469 12.2562 6.31165Z"
              fill="#FFC701"
            />
            <path
              d="M5.79924 13.909H5.63106C5.0268 13.909 4.5354 14.2561 4.5354 14.6829V15.0947H10.464V14.6829C10.464 14.2561 9.97262 13.909 9.36836 13.909H9.13827H5.79924Z"
              fill="#FFC701"
            />
            <path
              d="M4.07777 15.0955H4.02149C3.32396 15.0955 2.75671 15.4105 2.75671 15.7979V16.5229C2.75671 16.7167 3.03939 16.8741 3.3891 16.8741H11.6101C11.9598 16.8741 12.2425 16.7167 12.2425 16.5229V15.7979C12.2425 15.4105 11.6753 15.0955 10.9777 15.0955H10.9215H4.07777Z"
              fill="#FFC701"
            />
          </svg>
          <span class="font-Oswald text-14 text-white mr-1">{triviaObj().playesrsAnsvered}/{triviaObj().totalPlayers}</span>
        </div>
      </div>
    </div> : ""} </>
  );
};

export default Trivia;
