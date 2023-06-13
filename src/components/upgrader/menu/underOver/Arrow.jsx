const Arrow = (props) => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.65683 7.72794L7.07104 9.14215L8.48526 7.72794L14.1421 2.07108L12.7279 0.656869L7.07104 6.31372L1.41419 0.65687L-2.3365e-05 2.07108L5.65683 7.72794Z"
        fill={props.color}
      />
    </svg>
  );
};

export default Arrow;
