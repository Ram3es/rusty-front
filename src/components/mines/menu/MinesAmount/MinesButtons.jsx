import Button from "./Button";

const MinesButtons = (props) => {
  const adjustMinesAmount = (num) => {
    props.setMinesAmount(num);
  };
  return (
    <div class="flex justify-between items-center w-full gap-3 mt-2 cursor-pointer">
      <Button
        num="1"
        onClick={() => adjustMinesAmount(1)}
        minesAmount={props.minesAmount}
      />
      <Button
        num="5"
        onClick={() => adjustMinesAmount(5)}
        minesAmount={props.minesAmount}
      />
      <Button
        num="10"
        onClick={() => adjustMinesAmount(10)}
        minesAmount={props.minesAmount}
      />
      <Button
        num="24"
        onClick={() => adjustMinesAmount(24)}
        minesAmount={props.minesAmount}
      />
    </div>
  );
};

export default MinesButtons;
