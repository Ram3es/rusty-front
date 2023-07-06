import CoinLogo from "../shared/CoinLogo";

const TotalUnboxedCount = (props) => {
  return (
    <div class="flex flex-col items-center justify-center font-SpaceGrotesk font-semibold ">
      <span class="text-green-gradient text-22">TOTAL UNBOXED</span>
      <div class="flex items-center justify-center gap-2">
        <CoinLogo h="40" />
        <span class="text-green-gradient text-36">
          {parseFloat(props.total).toLocaleString("en-US")}
          <span class="text-30">.00</span>
        </span>
      </div>
    </div>
  );
};

export default TotalUnboxedCount;
