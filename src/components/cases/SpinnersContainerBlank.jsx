const SpinnersContainerBlank = ({ pendingNum }) => {
  return (
      <div
        class="relative flex rounded h-[178px] md:h-[326px] w-full items-center justify-center"
      >
        {pendingNum() === 1 ? (
          <>
            <div class="arrow-down absolute left-1/2 top-0.5 -translate-x-1/2" />
            <img
              src="assets/caseline.svg"
              alt="caseline"
              class={`absolute h-[280px] w-32 transition-all duration-500 
            `}
            />
            <div class="arrow-down absolute left-1/2 bottom-0.5 -translate-x-1/2 rotate-180" />
          </>
          
        ) : (
          <div class="lg:flex justify-between w-full items-center">
            <div class="arrow-down absolute top-1/2 -left-[8px] -translate-y-1/2 -rotate-90" />
            {Array.from({ length: pendingNum() }).map((_, index) => {
              return (
                <div class="w-full flex items-center justify-center">
                  <img
                    src="assets/caseLineHorizontal.svg"
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
