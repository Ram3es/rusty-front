import AdjustBtn from "./AdjustBtn";

const BetButtons = (props) => {
  const adjustBet = (amount) => {
    props.setBetValue(props.betValue() + amount);
  };
  return (
    <div class="flex items-center justify-between w-full mt-2">
      <AdjustBtn small={true} text={"+0.5"} onClick={() => adjustBet(0.5)} />
      <AdjustBtn small={true} text={"+1"} onClick={() => adjustBet(1)} />
      <AdjustBtn small={true} text={"+5"} onClick={() => adjustBet(5)} />
      <AdjustBtn small={true} text={"+10"} onClick={() => adjustBet(10)} />
      <AdjustBtn small={true} text={"+50"} onClick={() => adjustBet(50)} />
      <AdjustBtn small={true} text={"+100"} onClick={() => adjustBet(100)} />
    </div>
  );
};

export default BetButtons;
