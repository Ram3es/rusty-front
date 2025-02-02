import {createMemo, createEffect, createSignal} from "solid-js";

import ItemMainBg from "../../assets/img/case/potentialDropItemVectorBg.png";

import Coin from "../../utilities/Coin";
import {getCurrencyString} from "../mines_new/utils/tools";

const skinStylesConfig = [
  {
    condition: 1000 * 100,
    shadowLogoColor: "rgba(235, 172, 50, 0.4)",
    itemBg: "card-drops--item__yellow",
    chanceColor: "rgba(235, 172, 50, 1)",
  },
  {
    condition: 1000 * 30,
    shadowLogoColor: "rgba(255, 27, 27, 0.4)",
    itemBg: "card-drops--item__red",
    chanceColor: "rgba(255, 27, 27, 1)",
  },
  {
    condition: 1000 * 10,
    shadowLogoColor: "rgba(214, 48, 255, 0.4)",
    itemBg: "card-drops--item__purple",
    chanceColor: "rgba(214, 48, 255, 1)",
  },
  {
    condition: 1000 * 2,
    shadowLogoColor: "rgba(40, 152, 255, 0.4)",
    itemBg: "card-drops--item__blue",
    chanceColor: "rgba(40, 152, 255, 1)",
  },
  {
    condition: 0,
    shadowLogoColor: "rgba(198, 198, 198, 0.4)",
    itemBg: "card-drops--item__gray",
    chanceColor: "rgba(198, 198, 198, 1)",
  },
];

const ItemCardSmall = (props) => {
  const getCurrentStylesByPrice = (skinPrice) => {
    for (const config of skinStylesConfig) {
      if (skinPrice > config.condition) {
        return {
          shadowLogoColor: config.shadowLogoColor,
          itemBg: config.itemBg,
          circleClass: config.circleClass,
          circleColor: config.circleColor,
          chanceColor: config.chanceColor,
        };
      }
    }
  };

  const [itemRef, setItemRef] = createSignal(null);
  const [isVisible, setIsVisible] = createSignal(true);

  createEffect(() => {
    if (itemRef() === null) return;
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    });
    observer.observe(itemRef());
  });

  const styles = createMemo(() =>
    getCurrentStylesByPrice(props?.drop?.item_price || props?.drop?.price)
  );

  return (
    <div ref={setItemRef}>
      {isVisible() || props.optimiseOff ? (
        <div
          class={`group min-w-[120px] min-h-[120px] z-10 rounded-4 relative cursor-pointer ${
            styles().itemBg
          } font-SpaceGrotesk`}
          style={{
           transform: 'translate3d(0,0,0)' 

          }}
        >
          <div
            class="hidden group-hover:block absolute inset-0 z-0 bg-repeat overflow-hidden m-0.5 p-2"
            style={{"background-image": `url('${ItemMainBg}')`, opacity: 0.02}}
          />
          <div class="rounded-4 absolute inset-0 z-10 pt-4 pb-2">
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
                  {props.skin.winChance.toFixed(2)}%
                </span>
              </div>
            )}
            <div class="flex flex-col justify-items-center gap-2">
              <div class="flex items-center justify-center">
                <div
                  class="h-[72px] w-[72px] flex items-center justify-center"
                  style={
                    {
                      // filter: `drop-shadow(0px 0px 16px ${styles().shadowLogoColor})`,
                    }
                  }
                >
                  <svg
                    class="opacity-60 group-hover:opacity-100 absolute"
                    width="50"
                    height="56"
                    viewBox="0 0 50 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.0587 46.151C48.5961 46.0144 48.0573 46.1242 47.5784 46.9254L40.2534 46.9469L39.2194 49.7685C39.1071 50.0743 38.9019 50.3387 38.6317 50.5256C38.3615 50.7126 38.0395 50.8131 37.7092 50.8135L39.1242 46.9495H38.0521L37.0208 49.7658C36.908 50.0718 36.7023 50.3363 36.4317 50.5232C36.161 50.7102 35.8385 50.8106 35.5079 50.8109L36.9228 46.9522H35.8508L34.8304 49.7685C34.7187 50.0747 34.5137 50.3395 34.2434 50.5266C33.973 50.7137 33.6506 50.8139 33.3202 50.8135L34.7324 46.9603L26.8414 46.9817H21.4293C21.5266 46.6192 21.7429 46.2985 22.0447 46.0697C22.3464 45.8409 22.7165 45.7169 23.0973 45.7169H27.1788L33.4372 23.9343H22.4034C19.5245 32.9753 16.6457 43.182 13.7668 52.4588C13.2798 54.0237 14.458 55.9423 16.1205 55.9665C26.3135 56.0817 36.5065 55.8539 46.7023 55.9665C46.985 55.9701 47.261 55.881 47.4867 55.7131C47.7123 55.5452 47.8748 55.3082 47.9485 55.0393L49.9485 47.7909C50.0445 47.4573 50.0054 47.1001 49.8394 46.7942C49.6735 46.4884 49.3936 46.2579 49.0587 46.151Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M40.3403 0.0241165V6.10408e-10H29.0235C28.7722 -6.31212e-06 28.5234 0.0489513 28.2915 0.144052C28.0595 0.239153 27.8489 0.378518 27.6718 0.554117C27.4948 0.729717 27.3548 0.93808 27.2599 1.1672C27.1649 1.39633 27.117 1.64168 27.1188 1.88913H32.7432C32.614 2.22986 32.3849 2.52511 32.085 2.73741C31.7851 2.94971 31.428 3.06949 31.0588 3.08156L28.8983 3.14319C27.9297 6.2569 26.9592 9.37062 25.9868 12.4843H36.7649L39.8043 1.88913H40.1036C40.3436 1.89246 40.5765 1.80889 40.7581 1.65428C40.9397 1.49967 41.0573 1.28478 41.0886 1.05041C41.1155 0.818388 41.0538 0.584805 40.9155 0.39511C40.7772 0.205414 40.5722 0.0731728 40.3403 0.0241165Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M49.3823 16.1044L49.3578 15.8231C48.7619 9.26339 43.0967 4.28734 36.4057 4.28734H17.0428C16.2573 4.28688 15.4908 4.52451 14.8472 4.96795C14.2037 5.41139 13.7143 6.03916 13.4456 6.76598C12.9395 7.97181 12.4315 9.17764 11.9218 10.3835H10.2348C9.65909 10.3841 9.09122 10.5146 8.57473 10.765C8.05824 11.0154 7.60686 11.3789 7.25523 11.8278H16.8442C17.685 11.8278 18.5176 11.8519 19.3475 11.868C19.6346 11.874 19.9171 11.9406 20.1759 12.0631C20.4347 12.1857 20.6639 12.3614 20.8479 12.5785C21.032 12.7955 21.1667 13.0489 21.243 13.3215C21.3194 13.5942 21.3355 13.8798 21.2903 14.159L19.0292 20.2686H17.9598L20.1148 14.3734H19.4455L17.2877 20.2686H15.9272L18.0877 14.3734C14.5231 14.3037 11.6388 14.2368 8.07426 14.1698C7.65343 14.1623 7.23876 14.2701 6.8765 14.4811C6.51423 14.6921 6.21861 14.9981 6.0226 15.3649C5.85347 15.6827 5.72898 16.0216 5.65254 16.3724C5.62445 16.5005 5.62776 16.6334 5.6622 16.7601C5.69663 16.8867 5.7612 17.0034 5.85056 17.1006C5.93992 17.1977 6.05149 17.2725 6.17605 17.3188C6.3006 17.365 6.43455 17.3814 6.5668 17.3665H6.58585C6.77873 17.333 6.96084 17.2551 7.11735 17.1392C7.27386 17.0232 7.40035 16.8725 7.48651 16.6993H13.6905C13.6926 16.8173 13.671 16.9345 13.6267 17.0441C13.5825 17.1537 13.5165 17.2536 13.4327 17.3379C13.3489 17.4221 13.2489 17.4892 13.1385 17.535C13.0281 17.5809 12.9096 17.6047 12.7898 17.605H9.54634C5.05663 30.7512 1.90567 40.2183 0.602293 43.1418C-0.701084 46.0652 0.409099 47.2871 1.36146 47.748C1.77319 47.9423 2.22461 48.0413 2.68116 48.0374H10.866L16.3081 32.3751H14.6945C14.276 32.3751 13.8746 32.2113 13.5786 31.9199C13.2826 31.6284 13.1163 31.2331 13.1163 30.8209H22.2563C26.1283 36.1801 30.0004 41.6144 33.8724 46.9817C37.5948 46.9817 41.3172 46.9254 45.0287 46.9254L32.1119 29.8187L36.3812 29.9339C39.4818 29.9462 42.4844 28.8646 44.8453 26.8852C47.2062 24.9058 48.7693 22.1594 49.2517 19.1431C49.4084 18.138 49.4522 17.119 49.3823 16.1044ZM16.5149 22.3747H15.2632L15.8755 20.708H17.1244L16.5149 22.3747ZM18.2537 22.3747H17.3067L17.9135 20.7187H18.8659L18.2537 22.3747ZM23.8454 22.3747C22.6264 22.3747 21.1389 22.3747 19.3829 22.3747L19.9924 20.7268H24.4522L23.8454 22.3747ZM20.1584 20.2686L22.2672 14.5663C24.0794 14.5905 25.5814 14.6012 26.6916 14.6039L24.6154 20.2686H20.1584ZM25.9841 22.3855H24.9719L25.5787 20.7134H26.5936L25.9841 22.3855ZM25.7419 20.2686L27.8181 14.6065H28.8439L26.7569 20.2686H25.7419ZM31.6167 21.3806C30.0711 22.1497 28.6235 22.3399 27.1134 22.3774L27.7229 20.7134C28.6818 20.7634 29.6428 20.7634 30.6017 20.7134C32.0303 20.641 32.6779 20.4963 33.3228 20.1587C33.5935 20.015 33.8479 19.8434 34.0819 19.6469C33.3583 20.3494 32.5262 20.9345 31.6167 21.3806ZM34.7758 18.1651C34.5037 19.1271 33.5105 19.5853 32.9717 19.8318C32.2479 20.1587 31.6112 20.2043 30.3786 20.2739C29.5485 20.3239 28.7162 20.3239 27.8861 20.2739L29.9541 14.628C30.2262 14.5797 32.4656 14.2475 33.8724 15.7213C34.0629 15.9142 35.1023 16.9887 34.7758 18.1597V18.1651Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M19.4728 16.1526L20.1204 14.384H19.4429L18.4143 17.195L19.4728 16.1526Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M20.629 12.3557C20.8851 12.5767 21.08 12.858 21.1957 13.1734C21.3113 13.4888 21.3439 13.8279 21.2903 14.159L21.1732 14.4699L31.5322 4.28734H28.8438L20.629 12.3557Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M16.2836 19.2932L17.8101 15.1318L6.65388 26.1182C6.1786 27.5187 5.7251 28.8523 5.29336 30.1188L16.2836 19.2932Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M44.207 6.81416L34.4357 16.4367C34.6064 16.6869 34.7245 16.9683 34.7829 17.2642C34.8413 17.5602 34.8389 17.8647 34.7758 18.1597C34.5037 19.1217 33.5106 19.5798 32.9718 19.8264C32.2834 20.1372 31.6766 20.1935 30.5528 20.2605L30.0712 20.7374L30.6017 20.7134C32.0303 20.641 32.6779 20.4963 33.3228 20.1587C33.5935 20.015 33.8479 19.8434 34.0819 19.6469C33.3632 20.348 32.5368 20.933 31.6331 21.3806C30.6568 21.8655 29.5994 22.1723 28.512 22.2863L19.8292 30.8155H22.2564C22.8151 31.5872 23.372 32.3607 23.9271 33.136L47.328 10.0913C46.4914 8.8267 45.4349 7.71731 44.207 6.81416Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M15.2904 35.2905L2.36276 48.0214C2.46853 48.0321 2.57484 48.0374 2.68116 48.0374L8.80073 48.0375L11.9381 44.9452L15.2904 35.2905Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                    <path
                      d="M36.4057 4.28734L33.6439 4.28725L23.1842 14.577C24.5883 14.5931 25.7746 14.6012 26.6916 14.6039L24.6154 20.2686H20.1584L21.7366 16.0025L19.9625 17.7496L19.0292 20.2686H17.9598L18.2755 19.4056L16.9531 20.7133H17.1245L16.5149 22.3747H15.2632L4.205 33.2673C2.52884 38.1415 1.3016 41.5822 0.602293 43.1418C-0.486122 45.5775 0.0880697 46.8047 0.852681 47.4291L16.1395 32.375L14.6945 32.3751C14.276 32.3751 13.8746 32.2113 13.5786 31.9199C13.2826 31.6284 13.1163 31.2331 13.1163 30.8209L17.7177 30.8208L27.5787 21.1099L27.7229 20.7134L27.9705 20.7133L28.4059 20.2819C28.2236 20.2819 28.0494 20.2819 27.8862 20.2578L29.9542 14.6118C30.2072 14.5689 32.0494 14.2956 33.4425 15.3246L42.9308 5.98077C40.944 4.86315 38.6938 4.27925 36.4057 4.28734ZM18.2537 22.3639H17.3068L17.9136 20.7079H18.8659L18.2537 22.3639ZM23.8454 22.3639C22.6264 22.3639 21.1389 22.3639 19.3829 22.3639L19.9925 20.716H24.4522L23.8454 22.3639ZM25.9842 22.38H24.9719L25.5787 20.7134H26.5936L25.9842 22.38ZM26.7569 20.2631H25.742L27.8182 14.6011H28.844L26.7569 20.2631Z"
                      fill="white"
                      fill-opacity="0.06"
                    />
                  </svg>

                  <img
                    alt="item-image"
                    src={
                      !props.upgraderModal
                        ? props._case?.items
                            ?.filter((val) => val.name == props.drop?.name)?.[0]
                            ?.image?.replace("{url}", window.origin) || ""
                        : props.drop?.image?.replace("{url}", window.origin) ||
                          ""
                    }
                    class="w-full h-full relative z-10"
                  />
                </div>
              </div>
              <div class="flex items-center justify-center overflow-hidden">
                <div class="group-hover:hidden flex gap-1.5">
                  <Coin width="5" />
                  <span class="font-bold text-sm potential-drop--price">
                    {getCurrencyString(
                      props?.drop?.item_price || props?.drop?.price
                    ).toLocaleString()}
                  </span>
                </div>
                <p class="px-4 hidden group-hover:block text-13 text-white font-bold truncate max-w-full">
                  {props?.drop?.name}
                </p>
              </div>
            </div>
          </div>
          {!props?.upgraderModal && (
            <div
              class="hidden group-hover:block absolute top-1 left-3 font-semibold z-50 text-11"
              style={{
                color: `${styles().chanceColor}`,
              }}
            >
              {props?.drop?.chance}%
            </div>
          )}
        </div>
      ) : (
        <div class="group w-full min-h-[212px] " />
      )}
    </div>
  );
};

export default ItemCardSmall;
