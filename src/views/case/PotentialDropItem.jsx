import {createMemo, createSignal, createEffect} from "solid-js";

import Coin from "../../utilities/Coin";

import ItemMainBg from "../../assets/img/case/potentialDropItemVectorBg.png";

const skinStylesConfig = [
  {
    condition: 1000 * 100,
    shadowLogoColor: "rgba(235, 172, 50, 0.16)",
    itemBg: "potential-drop--item__yellow",
    winPercentColor: "text-yellow-eb",
    textShadow: "#fe4a4a3d",
    chanceColor: "rgba(235, 172, 50, 1)",
  },
  {
    condition: 1000 * 30,
    shadowLogoColor: "rgba(255, 27, 27, 0.16)",
    itemBg: "potential-drop--item__red",
    winPercentColor: "text-red-fe",
    textShadow: "#fe4a4a3d",
    chanceColor: "rgba(255, 27, 27, 1)",
  },
  {
    condition: 1000 * 10,
    shadowLogoColor: "rgba(214, 48, 255, 0.16)",
    itemBg: "potential-drop--item__purple",
    winPercentColor: "text-purple-d6",
    textShadow: "#fe4a4a3d",
    chanceColor: "rgba(214, 48, 255, 1)",
  },
  {
    condition: 1000 * 2,
    shadowLogoColor: "rgba(40, 152, 255, 0.16)",
    itemBg: "potential-drop--item__blue",
    winPercentColor: "text-2898FF",
    textShadow: "#fe4a4a3d",
    chanceColor: "rgba(40, 152, 255, 1)",
  },
  {
    condition: 0,
    shadowLogoColor: "rgba(198, 198, 198, 0.16)",
    itemBg: "potential-drop--item__gray",
    winPercentColor: "text-gray-c6c",
    textShadow: "#fe4a4a3d",
    chanceColor: "rgba(198, 198, 198, 1)",
  },
];

const PotentialDropItem = (props) => {
  const [itemRef, setItemRef] = createSignal(null);
  const [isVisible, setIsVisible] = createSignal(true);

  createEffect(() => {
    if (itemRef() === null) return;
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    });
    observer.observe(itemRef());
  });

  const getCurrentStylesByPrice = (skinPrice) => {
    for (const config of skinStylesConfig) {
      if (skinPrice > config.condition) {
        return {
          shadowLogoColor: config.shadowLogoColor,
          itemBg: config.itemBg,
          winPercentColor: config.winPercentColor,
          textShadow: config.textShadow,
          chanceColor: config.chanceColor,
        };
      }
    }
  };

  const styles = createMemo(() => getCurrentStylesByPrice(props.skin?.price));

  return (
    <div ref={setItemRef}
    style={{
      transform: 'translate3d(0,0,0)' 
    }}>
      {isVisible() || props.optimiseOff ? (
        <div
          class={`group ssm:min-w-[135px] lg:w-full ${props.customClasses ? props.customClasses : ''} ${
            props.isHorizontal
              ? "lg:min-h-[84px] lg:w-[250px]"
              : `${props.wideCard ? "min-h-[180px]" : `${props.mobileTellCard ? 'h-[212px]' : 'h-[120px] lg:min-h-[212px]'}`}`
          } rounded-4 relative cursor-pointer potential-drop--card ${
            styles()?.itemBg || ""
          } font-SpaceGrotesk
          `}
        >
          {((props.upgraderItem && props.skin === props.activeItem()) ||
            (props.withdrawModalItem &&
              props.activeItems().findIndex((i) => props.skin.id === i.id) >=
                0)) && (
            <div class="absolute h-full w-full rounded-4 border-[#FFB436] border" />
          )}

          <div
            class="block group-hover:hidden absolute inset-0 z-0 bg-repeat overflow-hidden m-0.5 p-2"
            style={{"background-image": `url('${ItemMainBg}')`, opacity: 0.02}}
          />
          <div
            class="hidden group-hover:block absolute inset-0 z-0 bg-repeat overflow-hidden m-0.5 p-2"
            style={{"background-image": `url('${ItemMainBg}')`, opacity: 0.04}}
          />
          <div class={`w-full rounded-4 relative z-10`}>
            {props.caseName && props.caseName !== "Free Daily Case" && (
              <div
                class={`absolute left-3 bottom-full z-20 text-11 font-bold ${
                  styles().winPercentColor
                }`}
              >
                <span
                  class="box-content"
                  style={{
                    "text-shadow": `0px 0px 6px ${styles().textShadow}`,
                  }}
                >
                  {props.skin?.winChance.toFixed(2)}%
                </span>
              </div>
            )}
            <div
              class={`w-full flex ${
                props.isHorizontal
                  ? "flex-row pt-2"
                  : `flex-col ${props.wideCard ? "pt-[6px]" : props.mobileTellCard ? "pt-6 lg:pt-[14px]" : "pt-[14px]"} pb-4`
              } justify-items-center`}
            >
              <div class="flex items-center justify-center">
                <div
                  class={`${
                    props.isHorizontal
                      ? "h-[72px] w-[72px]"
                      : `${props.mobileTellCard ? 'h-[124px]' : 'h-[72px]'} lg:h-[142px] ${
                          props.wideCard ? "w-[181px]" : "w-[142px]"
                        }`
                  } flex items-center justify-center relative`}
                  style={{
                    filter: `drop-shadow(0px 0px 16px ${
                      styles()?.shadowLogoColor || 0
                    })`,
                  }}
                >
                  <svg
                    class={`${props.isHorizontal ? 'lg:w-[42px] lg:h-[46px]' : 'lg:w-[74px] lg:h-[82px]'} ${props.mobileTellCard ? 'w-[74px] h-[82px]' : 'w-[50px] h-[56px]'}  absolute opacity-20 group-hover:opacity-100`}
                    width={props.isHorizontal ? "42" : "74"}
                    height={props.isHorizontal ? "46" : "82"}
                    viewBox="0 0 74 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M72.6068 67.5784C71.9222 67.3783 71.1248 67.5392 70.4161 68.7123L59.575 68.7437L58.0447 72.8754C57.8785 73.3232 57.5748 73.7103 57.1749 73.9841C56.7751 74.2579 56.2984 74.4051 55.8097 74.4057L57.9038 68.7477H56.3171L54.7908 72.8715C54.6238 73.3196 54.3194 73.7068 53.9189 73.9806C53.5183 74.2543 53.041 74.4014 52.5517 74.4017L54.6458 68.7516H53.0591L51.5489 72.8754C51.3837 73.3239 51.0803 73.7116 50.6802 73.9855C50.2801 74.2594 49.8029 74.4062 49.3139 74.4057L51.404 68.7634L39.7253 68.7948H31.7153C31.8593 68.2639 32.1796 67.7943 32.6261 67.4593C33.0726 67.1243 33.6204 66.9427 34.1839 66.9428H40.2246L49.4871 35.0468H33.157C28.8963 48.2855 24.6356 63.2309 20.3749 76.8148C19.654 79.1063 21.3978 81.9157 23.8584 81.951C38.944 82.1197 54.0297 81.7862 69.1193 81.951C69.5378 81.9564 69.9463 81.8259 70.2802 81.58C70.6142 81.3342 70.8547 80.9871 70.9638 80.5934L73.9237 69.9797C74.0658 69.4912 74.008 68.9681 73.7624 68.5203C73.5168 68.0725 73.1026 67.7348 72.6068 67.5784Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M59.7037 0.0354356V0.000122071H42.9548C42.5829 0.000112828 42.2147 0.0718008 41.8714 0.211056C41.528 0.350311 41.2164 0.55438 40.9543 0.811508C40.6923 1.06864 40.4851 1.37374 40.3446 1.70924C40.2041 2.04474 40.1332 2.40401 40.1358 2.76635H48.4599C48.2687 3.26527 47.9297 3.6976 47.4858 4.00847C47.042 4.31934 46.5134 4.49474 45.9671 4.5124L42.7696 4.60265C41.3359 9.16201 39.8995 13.7214 38.4605 18.2807H54.412L58.9103 2.76635H59.3533C59.7085 2.77123 60.0532 2.64885 60.322 2.42246C60.5907 2.19606 60.7648 1.88141 60.8111 1.53822C60.8509 1.19848 60.7596 0.856444 60.5549 0.578676C60.3502 0.300907 60.0468 0.107268 59.7037 0.0354356Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M73.0858 23.5816L73.0496 23.1696C72.1676 13.5644 63.7831 6.27801 53.8804 6.27801H25.2233C24.0609 6.27734 22.9264 6.62529 21.9739 7.27462C21.0214 7.92395 20.2972 8.84317 19.8995 9.90745C19.1504 11.6731 18.3987 13.4388 17.6443 15.2045H15.1474C14.2955 15.2054 13.455 15.3965 12.6906 15.7632C11.9262 16.1298 11.2582 16.6621 10.7377 17.3194H24.9294C26.1737 17.3194 27.406 17.3547 28.6343 17.3782C29.0592 17.3871 29.4773 17.4845 29.8603 17.664C30.2434 17.8434 30.5825 18.1007 30.8549 18.4186C31.1274 18.7364 31.3268 19.1075 31.4397 19.5067C31.5526 19.9059 31.5765 20.324 31.5097 20.733L28.1631 29.6791H26.5805L29.77 21.0469H28.7793L25.5858 29.6791H23.5722L26.7698 21.0469C21.4942 20.9449 17.2254 20.8468 11.9499 20.7487C11.3271 20.7377 10.7134 20.8956 10.1772 21.2046C9.64106 21.5136 9.20354 21.9616 8.91344 22.4987C8.66313 22.964 8.47889 23.4603 8.36575 23.974C8.32419 24.1616 8.32909 24.3562 8.38005 24.5416C8.43102 24.727 8.52658 24.898 8.65883 25.0402C8.79108 25.1825 8.95621 25.2921 9.14055 25.3598C9.32489 25.4275 9.52313 25.4515 9.71887 25.4297H9.74706C10.0325 25.3806 10.302 25.2666 10.5337 25.0968C10.7653 24.927 10.9525 24.7063 11.08 24.4527H20.2619C20.2651 24.6254 20.233 24.797 20.1675 24.9575C20.102 25.118 20.0044 25.2643 19.8804 25.3877C19.7563 25.5111 19.6083 25.6092 19.445 25.6764C19.2816 25.7436 19.1062 25.7784 18.9289 25.7789H14.1286C7.48381 45.0287 2.82039 58.8912 0.891393 63.172C-1.0376 67.4528 0.605466 69.242 2.01496 69.9169C2.62432 70.2014 3.29242 70.3464 3.96812 70.3406H16.0817L24.136 47.4065H21.7479C21.1284 47.4065 20.5343 47.1667 20.0963 46.7399C19.6583 46.3131 19.4122 45.7343 19.4122 45.1307H32.9393C38.6699 52.9782 44.4006 60.9355 50.1312 68.7947C55.6403 68.7947 61.1494 68.7123 66.6424 68.7123L47.5256 43.6632L53.8442 43.832C58.4331 43.8498 62.8769 42.2662 66.371 39.3678C69.8651 36.4694 72.1786 32.4478 72.8925 28.0311C73.1244 26.5594 73.1892 25.0672 73.0858 23.5816ZM24.4421 32.7631H22.5896L23.4957 30.3226H25.3442L24.4421 32.7631ZM27.0154 32.7631H25.614L26.512 30.3383H27.9215L27.0154 32.7631ZM35.2912 32.7631C33.487 32.7631 31.2855 32.7631 28.6867 32.7631L29.5888 30.3501H36.1892L35.2912 32.7631ZM29.8344 29.6791L32.9554 21.3294C35.6375 21.3647 37.8605 21.3804 39.5036 21.3843L36.4309 29.6791H29.8344ZM38.4565 32.7788H36.9584L37.8565 30.3304H39.3586L38.4565 32.7788ZM38.0981 29.6791L41.1708 21.3883H42.689L39.6002 29.6791H38.0981ZM46.7927 31.3074C44.5053 32.4335 42.3628 32.7121 40.1278 32.7671L41.0298 30.3304C42.4491 30.4037 43.8713 30.4037 45.2905 30.3304C47.4048 30.2245 48.3633 30.0126 49.3177 29.5182C49.7183 29.3078 50.0949 29.0566 50.4412 28.7688C49.3703 29.7974 48.1388 30.6542 46.7927 31.3074ZM51.4682 26.599C51.0655 28.0076 49.5955 28.6785 48.7982 29.0395C47.727 29.5182 46.7846 29.5849 44.9603 29.6869C43.7319 29.7602 42.4999 29.7602 41.2715 29.6869L44.3321 21.4197C44.7348 21.349 48.0491 20.8625 50.1312 23.0205C50.4131 23.303 51.9514 24.8765 51.4682 26.5911V26.599Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M28.8198 23.6521L29.7782 21.0625H28.7755L27.2532 25.1785L28.8198 23.6521Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M30.531 18.0923C30.9099 18.416 31.1985 18.828 31.3696 19.2898C31.5407 19.7516 31.589 20.2481 31.5097 20.733L31.3364 21.1882L46.6677 6.27801H42.6889L30.531 18.0923Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M24.0998 28.2509L26.359 22.1573L9.84774 38.2446C9.14433 40.2954 8.47315 42.2481 7.83417 44.1027L24.0998 28.2509Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M65.4263 9.978L50.9649 24.0681C51.2175 24.4345 51.3922 24.8466 51.4787 25.2799C51.5652 25.7132 51.5615 26.1591 51.4682 26.5911C51.0655 27.9997 49.5957 28.6706 48.7983 29.0316C47.7794 29.4867 46.8814 29.5691 45.2182 29.6672L44.5054 30.3657L45.2905 30.3304C47.4048 30.2245 48.3633 30.0126 49.3177 29.5182C49.7183 29.3078 50.0949 29.0566 50.4412 28.7688C49.3776 29.7954 48.1545 30.652 46.8169 31.3074C45.372 32.0174 43.807 32.4668 42.1978 32.6336L29.3472 45.1228H32.9394C33.7663 46.2528 34.5905 47.3855 35.4121 48.5207L70.0454 14.7767C68.8073 12.9249 67.2437 11.3005 65.4263 9.978Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M22.6298 51.6755L3.49688 70.3171C3.65342 70.3328 3.81076 70.3406 3.96812 70.3406L13.0251 70.3407L17.6684 65.8127L22.6298 51.6755Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                    <path
                      d="M53.8804 6.27801L49.793 6.27788L34.3127 21.345C36.3907 21.3685 38.1464 21.3804 39.5036 21.3843L36.4309 29.6791H29.8344L32.1702 23.4324L29.5445 25.9907L28.1631 29.6791H26.5805L27.0477 28.4155L25.0905 30.3303H25.3442L24.4421 32.7631H22.5896L6.2234 48.7129C3.74268 55.8502 1.92637 60.8884 0.891393 63.172C-0.719461 66.7386 0.130343 68.5356 1.26197 69.4498L23.8864 47.4063L21.7479 47.4065C21.1284 47.4065 20.5343 47.1667 20.0963 46.7399C19.6583 46.3131 19.4122 45.7343 19.4122 45.1307L26.2221 45.1306L40.8165 30.911L41.0298 30.3304L41.3964 30.3303L42.0407 29.6986C41.7709 29.6986 41.5132 29.6986 41.2715 29.6633L44.3322 21.396C44.7067 21.3332 47.4331 20.933 49.495 22.4397L63.5376 8.75767C60.5971 7.12117 57.2668 6.26616 53.8804 6.27801ZM27.0155 32.7473H25.614L26.5121 30.3225H27.9216L27.0155 32.7473ZM35.2912 32.7473C33.4871 32.7473 31.2856 32.7473 28.6868 32.7473L29.5888 30.3342H36.1893L35.2912 32.7473ZM38.4566 32.7709H36.9585L37.8565 30.3304H39.3586L38.4566 32.7709ZM39.6003 29.6711H38.0982L41.1709 21.3803H42.6891L39.6003 29.6711Z"
                      fill="white"
                      fill-opacity="0.16"
                    />
                  </svg>
                  <img
                    alt="item-image"
                    src={props.skin?.image}
                    class={`relative z-10`}
                    loading="lazy"
                    style={{
                      height: `${props.smallImg ? "70%" : "100%"}`,
                    }}
                  />
                </div>
              </div>
              <div
                class={`w-full ${props.mobileTellCard ? 'pt-2 lg:pt-0 inline-block' : 'flex items-center justify-center'} lg:inline-block overflow-hidden space-y-1.5 ${
                  props.isHorizontal
                    ? "flex flex-col justify-center pr-9"
                    : `${props.wideCard ? "px-3" : "px-4"}`
                }`}
              >
                <p class={`${props.mobileTellCard ? '' : 'hidden lg:block'} text-13 text-gray-a2 group-hover:text-white font-bold truncate max-w-full`}>
                  {props.skin?.name}
                </p>
                <div class="flex gap-1.5">
                  <Coin width="5" />
                  <span class="font-bold text-sm potential-drop--price">
                    {Number(props.skin?.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {props.skin?.chance && props.isDropChanceShown && (
            <div
              class="absolute top-3 left-3 font-semibold z-50 text-11"
              style={{
                color: `${styles().chanceColor}`,
              }}
            >
              {props.skin?.chance}%
            </div>
          )}
        </div>
      ) : (
        <div class="group w-full min-h-[212px] " />
      )}
    </div>
  );
};

export default PotentialDropItem;
