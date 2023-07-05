const CaseSearchInput = (props) => {
  return (
    <div
      class={`relative search-input rounded-4 h-10 pl-7 pr-4 lg:pl-11 lg:pr-10 ${
        props.isFullWidth ? "w-full" : "w-80"
      } flex group ${
        props.search.length === 0 ? "text-gray-92" : "text-white"
      } items-center focus-within:border-2 focus-within:border-yellow-ff focus-within:text-yellow-ff`}
    >
      <svg
        class="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-10"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.6723 10.6044C12.6264 10.6111 12.5824 10.6271 12.5428 10.6513C12.5033 10.6756 12.469 10.7076 12.4422 10.7454C12.2092 11.0733 11.9502 11.382 11.6679 11.6685C11.3815 11.9506 11.0731 12.2094 10.7454 12.4422C10.7076 12.4691 10.6756 12.5033 10.6513 12.5429C10.6271 12.5824 10.6111 12.6265 10.6044 12.6724C10.5976 12.7183 10.6002 12.7651 10.612 12.8099C10.6238 12.8548 10.6446 12.8968 10.673 12.9334L12.4663 15.2402C12.4663 15.2402 12.4664 15.2402 12.4664 15.2402C13.1927 16.174 14.5876 16.2608 15.4241 15.4243C16.2608 14.5879 16.1741 13.1926 15.2401 12.4664C15.2401 12.4664 15.2401 12.4664 15.2401 12.4664L12.9334 10.673C12.8967 10.6446 12.8547 10.6238 12.8099 10.612C12.765 10.6002 12.7182 10.5976 12.6723 10.6044Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.35298 0.00012207C4.72583 0.000121914 3.09868 0.619841 1.85921 1.85931C-0.619737 4.33826 -0.619736 8.36792 1.85921 10.8469C4.33815 13.3258 8.36775 13.3258 10.8467 10.8469C13.3256 8.36792 13.3257 4.33826 10.8468 1.85931C9.60729 0.619842 7.98013 0.00012222 6.35298 0.00012207ZM6.35292 1.84973C7.50671 1.84973 8.66052 2.28886 9.53883 3.16718C11.2955 4.9238 11.2955 7.78238 9.53883 9.539C7.78221 11.2956 4.9237 11.2956 3.16707 9.539C1.41045 7.78238 1.41044 4.9238 3.16707 3.16718C4.04538 2.28886 5.19913 1.84973 6.35292 1.84973Z"
          fill="currentColor"
        />
      </svg>
      {props.search.length > 0 && (
        <div
          class="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 z-10 w-6 h-6 center header-hang-toggle-wrapper"
          onClick={() => props.onReset()}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.24264 0.757477C8.85212 0.366852 8.21895 0.366852 7.82843 0.757477L5.00004 3.58585L2.17157 0.757355C1.78105 0.366852 1.14788 0.366852 0.757361 0.757355C0.366835 1.14798 0.366835 1.78104 0.757361 2.17166L3.5858 5.00003L0.757359 7.82852C0.366835 8.21902 0.366835 8.8522 0.757359 9.24271C1.14788 9.63321 1.78105 9.63321 2.17157 9.24271L5 6.41434L7.82843 9.24271C8.21895 9.63321 8.85212 9.63321 9.24264 9.24271C9.63317 8.8522 9.63317 8.21902 9.24264 7.82852L6.41423 5.00003L9.24264 2.17166C9.63317 1.78116 9.63317 1.14798 9.24264 0.757477Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      <input
        class="relative w-[60px] ssm:w-[100px] sm:min-w-32 z-10 text-14 truncate text-gray-92 font-medium font-SpaceGrotesk"
        type="text"
        value={props.search}
        onInput={(e) => props.onInput(e.target.value)}
        placeholder={`${
          props.placeholderOverride
            ? props.placeholderOverride
            : "Search for cases..."
        }`}
      />
    </div>
  );
};

export default CaseSearchInput;
