import { onMount, createSignal, createEffect } from "solid-js";
import Chart from "chart.js/auto";

const CasesCounter = (props) => {
  let counter = null;

  const [doughnut, setDoughnut] = createSignal(null);

  onMount(() => {
    setDoughnut(
      new Chart(counter.getContext("2d"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: [],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          cutout: 15, // Adjust the cutoutPercentage to change the sector width
          animation: {
            animateRotate: false // Disable rotation animation for smoother rounding effect
          },
          spacing: 4,
          plugins: {
            legend: {
              display: false // Hide the legend
            },
            tooltip: {
              enabled: false // Disable tooltips
            }
          }
        },
      })
    );
  })

  createEffect(() => {
    if (doughnut()) {
      let newData = {
          data: [],
          backgroundColor: [],
          borderWidth: 0,
        };
      for (let i = 0; i < props.roundsCount; i++) {
        newData.data.push(1);
        if (props.currentRound > i) {
          newData.backgroundColor.push("#7e6232")
        } else {
          newData.backgroundColor.push("#FFB436")
        }
      }
      doughnut().data.datasets[0] = newData;
      doughnut().update();
    }
  });

  return (
    <div
      class="w-10 h-10 rounded-full relative"
      style={{
        background: 'linear-gradient(270deg, rgba(255, 180, 54, 0) 0%, rgba(255, 180, 54, 0.12) 50%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(80.66% 584.01% at 39.62% 51.7%, rgba(31, 35, 68, 0.56) 0%, rgba(35, 37, 61, 0.56) 100%)'
      }}
    >
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-16 font-SpaceGrotesk font-bold text-yellow-ffb">
        {props.roundsCount}
      </div>
      <canvas ref={counter} class="max-w-full max-h-full w-full h-full" />
    </div>
  )
}

export default CasesCounter