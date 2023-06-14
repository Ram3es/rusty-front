const GoldGlowText = (props) => {
  return (
    <div
      class=" font-bold font-SpaceGrotesk"
      style={{
        background: `radial-gradient(70% 70% at 50% 80%, #FFB436 0%, #FFD58F 100%),
        linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.16) 41.3%, rgba(0, 0, 0, 0.16) 68.93%, rgba(255, 255, 255, 0.16) 100%)`,
        "-webkit-background-clip": "text",
        "-moz-background-clip": "text",
        "background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
        color: "transparent",
        "font-size": `${props.size}px`,
        "text-shadow": `0 0 60px rgba(235, 172, 50, 0.9)`,
      }}
    >
      {props.text.toFixed(2)}%
    </div>
  );
};

export default GoldGlowText;
