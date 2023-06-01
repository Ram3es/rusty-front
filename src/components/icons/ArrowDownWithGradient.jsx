import { Switch, Match } from "solid-js";
const ArrowDownWithGradient = (props) => {
  return (
    <Switch
      fallback={
        <svg
          width="73"
          height="4"
          viewBox="0 0 73 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M73 0H0V1H31.2317L36.5 4L41.7683 1H73V0Z"
            fill="url(#paint0_linear_765_30530)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_765_30530"
              x1="12.1667"
              y1="0.500015"
              x2="60.8333"
              y2="0.500015"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DAFD09" stop-opacity="0" />
              <stop offset="0.500076" stop-color="#DAFD09" />
              <stop offset="1" stop-color="#DAFD09" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      }
    >
      <Match when={!props.color || props.color === "yellow"}>
        <svg
          width="72"
          height="4"
          viewBox="0 0 72 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M72.0001 0H6.10352e-05V1H30.8039L36.0001 4L41.1962 1H72.0001V0Z"
            fill="url(#paint0_linear_1241_3226)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1241_3226"
              x1="12.0001"
              y1="0.500015"
              x2="60.0001"
              y2="0.500015"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFB436" stop-opacity="0" />
              <stop offset="0.500076" stop-color="#FFB436" />
              <stop offset="1" stop-color="#FFB436" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Match>
      <Match when={props.color === "blue"}>
        <svg
          width="73"
          height="4"
          viewBox="0 0 73 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M73 0H0V1H31.2317L36.5 4L41.7683 1H73V0Z"
            fill="url(#paint0_linear_771_33498)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_771_33498"
              x1="12.1667"
              y1="0.500015"
              x2="60.8333"
              y2="0.500015"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#5AC3FF" stop-opacity="0" />
              <stop offset="0.500076" stop-color="#5AC3FF" />
              <stop offset="1" stop-color="#5AC3FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Match>
    </Switch>
  );
};

export default ArrowDownWithGradient;
