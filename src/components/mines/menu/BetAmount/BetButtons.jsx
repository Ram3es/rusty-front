import AdjustBtn from "./AdjustBtn";

const BetButtons = (props) => {
  const adjustBet = (amount) => {
    props.setBetValue(props.betValue() + amount);
  };
  return (
    <div class="flex items-center justify-between w-full mt-2">
      <AdjustBtn text={"+0.5"} onClick={() => adjustBet(0.5)} />
      <AdjustBtn text={"+1"} onClick={() => adjustBet(1)} />
      <AdjustBtn text={"+5"} onClick={() => adjustBet(5)} />
      <AdjustBtn text={"+10"} onClick={() => adjustBet(10)} />
      <AdjustBtn text={"+50"} onClick={() => adjustBet(50)} />
      <AdjustBtn text={"+100"} onClick={() => adjustBet(100)} />
    </div>
  );
};

export default BetButtons;
