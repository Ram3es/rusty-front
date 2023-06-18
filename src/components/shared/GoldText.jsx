const GoldText = (props) => {
  return (
    <div
      class="font-semibold "
      style={{
        background: `radial-gradient(70% 70% at 50% 80%, #FFB436 0%, #FFD58F 100%)`,
        "-webkit-background-clip": "text",
        "-moz-background-clip": "text",
        "background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
        color: "transparent",
        "font-size": `${props.size || "14.3719"}px`,
        "line-height": `${props.size || "14.3719"}px`,
      }}
    >
      {props.noSmallDecimal ? (
        props.text
      ) : (
        <>
          {" "}
          {props.text.slice(0, -2)}
          <span style={`font-size: ${(props.size / 1.2).toString()}px`}>
            {props.text.slice(-2)}
          </span>
        </>
      )}
    </div>
  );
};

export default GoldText;
