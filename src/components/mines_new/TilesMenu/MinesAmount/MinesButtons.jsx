import Button from "./Button";

import { setMinesAmount } from "../../TilesContainer";

const MinesButtons = () => {
  const adjustMinesAmount = (num) => {
    setMinesAmount(num);
  };
  return (
    <div class="flex justify-between items-center w-full gap-3 mt-2 cursor-pointer">
      <Button num="1" onClick={() => adjustMinesAmount(1)} />
      <Button num="5" onClick={() => adjustMinesAmount(5)} />
      <Button num="10" onClick={() => adjustMinesAmount(10)} />
      <Button num="24" onClick={() => adjustMinesAmount(24)} />
    </div>
  );
};

export default MinesButtons;
