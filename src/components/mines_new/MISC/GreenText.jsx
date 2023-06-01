const GreenText = (props) => {
  return (
    <div
      class={` font-bold`}
      style={`background: linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.16) 41.3%, rgba(0, 0, 0, 0.16) 68.93%, rgba(255, 255, 255, 0.16) 100%),
              radial-gradient(70% 70% at 50% 80%, #27F278 0%, #86FFB6 100%);

              -webkit-background-clip: text;
              -moz-background-clip: text;
              background-clip: text;

              -webkit-text-fill-color: transparent;
              -moz-text-fill-color: transparent;
              color: transparent;
              font-size: ${props.size || "14.3719"}px;

`}
    >
      {props.text.slice(0, -2)}
      <span style={`font-size: ${(props.size / 1.2).toString()}px`}>
        {props.text.slice(-2)}
      </span>
    </div>
  );
};

export default GreenText;
