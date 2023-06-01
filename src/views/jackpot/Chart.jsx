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
              data: [],
              backgroundColor: ["#E1AD01"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          hover: { mode: null },
          animation: {
            duration: 0,
          },
          cutout: "71%",
          plugins: {
            legend: { display: false },
            tooltip: false,
            labels: {
              render: "image",
              images: [],
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      })
    );
  });

  createEffect(() => {
    if (doughnut() && props.game?.players) {
      const newData = props.game.players.map((player) => player.bet);
      doughnut().data.datasets[0].data =
        newData.length == 0 ? [1] : [...newData];
      if (newData.length > 0) {
        doughnut().data.datasets[0].backgroundColor = props.backgroundColors;
      } else {
        doughnut().data.datasets[0].backgroundColor = ["#E1AD01"];
      }

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
