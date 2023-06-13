const GrayWrapperdWithBorders = (props) => {
  return (
    <div
      class={`p-[1px] ${props.classes}`}
      style={{
        background:
          !props.gradientColor || props.gradientColor === "yellow"
            ? "linear-gradient(180deg, rgba(255, 180, 54, 0.2) -37.12%, rgba(255, 180, 54, 0.36) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))"
            : props.gradientColor === "blue"
            ? "linear-gradient(180deg, rgba(90, 195, 255, 0) -37.12%, rgba(90, 195, 255, 0.36) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))"
            : "linear-gradient(180deg, rgba(218, 253, 9, 0) -37.12%, rgba(218, 253, 9, 0.36) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))",
      }}
    >
      <div
        class={`${props.classes} h-full center`}
        style={{
          background:
            "radial-gradient(162.5% 100% at 50% 0%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(272.05% 172.05% at 50% 0%, #1D2352 0%, #1D1F30 100%)",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default GrayWrapperdWithBorders;
