import {onMount, createEffect, createSignal} from "solid-js";

import Chart from "chart.js/auto";

import {
  spinning,
  setSpinning,
  fastSpinner,
  setIsGameStarted,
} from "../../../views/upgrader/Upgrader";

let chart = null;



export const spin = (ticket, time) => {
  if (spinning()) return;

  setSpinning(true);
  const isSpinFast = fastSpinner();
  setTimeout(
    () => {
      setTimeout(() => {
        if (chart && chart.style) {
          chart.style.transform = `rotate(${+360 * 4 + 360 * ticket}deg)`;
          chart.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
          chart.style.transitionDuration = `${time / 1000}s`;

          setTimeout(() => {
            setSpinning(false);
            chart.style.transform = `rotate(${0}deg)`;
            chart.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
            chart.style.transitionDuration = `${3}s`;

            setTimeout(() => setIsGameStarted(false), 2500)
          }, time + 500);
        }
      }, 10);
    },
    isSpinFast ? 10 : 10
  );
};

const Spinner = (props) => {
  const [doughnut, setDoughnut] = createSignal(null);

  onMount(() => {
    setDoughnut(
      new Chart(chart.getContext("2d"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Players",
              data: [0, 0],
              backgroundColor: ["#22273E", "#FFC701"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          hover: {mode: null},
          animation: {
            duration: 200,
          },
          cutout: "98.5%",
          plugins: {
            legend: {display: false},
            tooltip: false,
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      })
    );
  });

  createEffect(() => {
    if (doughnut()) {
      const chance =
        (props.betValue() / (props.activeItem()?.price || 0)) * 0.9;
      doughnut().data.datasets[0].data = !props.over
        ? [1 - chance, chance]
        : [chance, 1 - chance];
      doughnut().data.datasets[0].backgroundColor = !props.over
        ? ["#131628", "#FFC701"]
        : ["#FFC701", "#131628"];

      doughnut().update();
    }
  });

  return (
    <>
      <canvas
        ref={chart}
        class={`max-w-[81%] max-h-[81%] absolute 
        `}
      />
    </>
  );
};

export default Spinner;
