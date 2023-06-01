const RedText = (props) => {
  return (
    <div
      class={`font-bold`}
      style={`
        background: linear-gradient(0deg, #D63333, #D63333),
        radial-gradient(100% 100% at 50% 0%, rgba(239, 246, 255, 0.317167) 0%, rgba(121, 183, 255, 0) 100%);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        color: transparent;
        font-size: ${props.size || "20"}px;
      `}
    >
      {props.processed ? (
        <>
          {props.text.slice(0, -2)}
          <span style={`font-size: ${(props.size / 1.2).toString()}px`}>
            {props.text.slice(-2)}
          </span>
        </>
      ) : (
        <>{props.text}</>
      )}
    </div>
  );
};

export default RedText;
