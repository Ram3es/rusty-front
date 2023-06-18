const GoldTextWrapper = (props) => {
  return (
    <div
      class="font-semibold"
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
      {props.children}
    </div>
  );
};

export default GoldTextWrapper;
