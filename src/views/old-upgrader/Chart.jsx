import { onMount, createEffect, createSignal } from "solid-js";

import Chart from "chart.js/auto";

const ChartJS = (props) => {
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
          hover: { mode: null },
          animation: {
            duration: 200,
          },
          cutout: "98%",
          plugins: {
            legend: { display: false },
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
      doughnut().data.datasets[0].data = !props.over()
        ? [1 - chance, chance]
        : [chance, 1 - chance];
      doughnut().data.datasets[0].backgroundColor = !props.over()
        ? ["#22273E", "#FFC701"]
        : ["#FFC701", "#22273E"];

      doughnut().update();
    }
  });

  return (
    <>
      <canvas ref={chart} class="max-w-full max-h-full w-full h-full" />
    </>
  );
};

export default ChartJS;
