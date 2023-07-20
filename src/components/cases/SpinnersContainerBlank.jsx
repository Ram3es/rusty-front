/* eslint-disable solid/prefer-for */
import CaseLineYellow from "../../assets/img/case-battles/caseLineHorizontal.svg";

const SpinnersContainerBlank = (props) => {
  return (
    <div class="relative flex rounded h-[175px] md:h-[326px] w-full items-center justify-center">
      {props.pendingNum() === 1 ? (
        <>
          <div class="scale-50 md:scale-100 arrow-down absolute left-1/2 -top-2 md:top-0.5 -translate-x-1/2" />
          <img
            src="assets/caseline.svg"
            alt="caseline"
            class={`absolute h-[280px] w-32 transition-all duration-500 
            `}
          />
          <div class="scale-50 md:scale-100 arrow-down absolute left-1/2 -bottom-2 md:bottom-0.5 -translate-x-1/2 rotate-180" />
        </>
      ) : (
        <div class="flex justify-between w-full items-center">
          <div class="arrow-down absolute top-1/2 -left-[8px] -translate-y-1/2 -rotate-90" />
          {Array.from({length: props.pendingNum()}).map((_, index) => {
            return (
              <div class="w-full flex items-center justify-center">
                <img
                  src={CaseLineYellow}
                  alt="caseline"
                  class={`h-32 w-full transition-all duration-500`}
                />
              </div>
            );
          })}
          <div class="arrow-down absolute top-1/2 -right-[8px] -translate-y-1/2 rotate-90" />
        </div>
      )}
    </div>
  );
};

export default SpinnersContainerBlank;
