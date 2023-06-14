import {onMount, createEffect, createSignal} from "solid-js";

import Chart from "chart.js/auto";

const Spinner = (props) => {
  let chart = null;

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
        class="max-w-[81%] max-h-[81%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default Spinner;
