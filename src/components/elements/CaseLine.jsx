const CaseLine = () => {
  return (
    <svg
      width="143"
      height="19"
      viewBox="0 0 143 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_156_9093)">
        <path
          d="M70.9999 1.50125H59.9999L70.9999 10.7457L81.9999 1.50138L70.9999 1.50125Z"
          fill="url(#paint0_linear_156_9093)"
        />
      </g>
      <path
        d="M-0.00012207 1.00038H143"
        stroke="url(#paint1_linear_156_9093)"
      />
      <defs>
        <filter
          id="filter0_d_156_9093"
          x="55.9999"
          y="1.50125"
          width="30"
          height="17.2445"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_156_9093"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_156_9093"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_156_9093"
          x1="70.9999"
          y1="-11.2942"
          x2="70.9999"
          y2="10.7456"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0104167" stop-color="#F9B400" />
          <stop offset="1" stop-color="#FFC701" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_156_9093"
          x1="139.779"
          y1="1.00038"
          x2="-0.00012207"
          y2="1.00038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC701" stop-opacity="0" />
          <stop offset="0.515625" stop-color="#FFC701" />
          <stop offset="1" stop-color="#FFC701" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CaseLine;
