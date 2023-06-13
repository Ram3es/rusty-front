import UnderOverBtn from "./UnderOverBtn";

import {underOver, setUnderOver} from "../../MainUpgraderContainer";

const UnderOverToggle = () => {
  const toggleUnderOver = (type) => {
    if (underOver() === type) return;
    setUnderOver(type);
  };
  return (
    <div class="w-full flex gap-2 items-center justify-center">
      <UnderOverBtn
        type="Over"
        selected={underOver() === "Over"}
        onClick={() => toggleUnderOver("Over")}
      />
      <UnderOverBtn
        type="Under"
        selected={underOver() === "Under"}
        onClick={() => toggleUnderOver("Under")}
      />
    </div>
  );
};

export default UnderOverToggle;
