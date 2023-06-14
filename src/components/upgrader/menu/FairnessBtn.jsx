import FairnessShieldIcon from "../../icons/cases/FairnessShield";

const FairnessBtn = () => {
  return (
    <div class="text-gray-9a h-11 rounded-4 flex items-center px-3 border border-gray-9a border-opacity-20 text-blue-9b gap-2 cursor-pointer group hover:border-white/20 drop-shadow-sm ">
      <FairnessShieldIcon />
      <span>Fairness</span>
    </div>
  );
};

export default FairnessBtn;
