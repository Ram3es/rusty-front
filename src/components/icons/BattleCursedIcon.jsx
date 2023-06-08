const BattleCursedIcon = (props) => {
  return (
    <svg class={props.additionClasses} 
    viewBox="0 0 36 31" 
    fill="none"
     xmlns="http://www.w3.org/2000/svg"
     style={{
        filter: `${props.glowColor && `drop-shadow(0px 0px 8px rgba(${props.glowColor}, 0.8))`}`
      }}
     >
      <path d="M6.20203 27.9956L8.96356 25.2341L11.1299 27.4004L8.36833 30.1619L6.20203 27.9956Z" fill="currentColor"/>
      <path d="M25.6419 20.3606L24.5586 21.4439L22.7016 19.5869L19.3251 22.7102L21.3087 24.6939L20.2254 25.7772L22.392 27.9438L27.8085 22.5272L25.6419 20.3606Z" fill="currentColor"/>
      <path d="M25.0959 27.4019L27.2623 25.2356L30.0238 27.9971L27.8575 30.1634L25.0959 27.4019Z" fill="currentColor"/>
      <path d="M17.0332 13.9185L9.27872 6.16406L8.59497 12.9334L13.6942 17.2576L17.0332 13.9185Z" fill="currentColor"/>
      <path d="M27.6357 12.9359L26.952 6.1665L11.6745 21.444L10.5912 20.3607L8.42456 22.5273L13.8411 27.9439L16.0077 25.7773L14.9244 24.694L27.6357 12.9359Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9998 11.9495C11.2167 12.0246 11.4537 11.9179 11.5425 11.7089C11.7266 11.2783 13.3124 7.45376 12.3594 5.80316C11.9813 5.14822 11.5016 4.74022 10.9335 4.59114C9.88978 4.31705 8.78123 4.94174 7.81177 5.51024L7.7935 5.52099C7.12282 5.91565 6.43123 6.3226 6.04948 6.22212C5.97491 6.2028 5.86221 6.15242 5.74328 5.94642C5.64067 5.72943 5.76143 4.70457 6.00169 3.75301C6.04944 3.56426 5.96625 3.3666 5.79749 3.26904C5.62897 3.17122 5.41479 3.19607 5.27662 3.33285C5.1607 3.44459 2.47953 6.12082 3.91061 8.59953C5.08775 10.6384 7.07233 9.65884 8.52225 8.94319L8.52362 8.94251C9.94609 8.24011 10.6072 7.99705 10.9668 8.61985C11.1797 8.98869 11.0049 10.3634 10.721 11.425C10.6618 11.6459 10.7837 11.8747 10.9998 11.9495ZM10.9706 12.7151C10.3952 12.7535 10.124 12.7365 9.94064 12.4189C9.79655 12.1693 9.87385 11.3392 9.92321 10.8092C9.93504 10.6822 9.94527 10.5724 9.95046 10.4919C9.96395 10.2847 9.82887 10.0968 9.62837 10.043C9.42681 9.98942 9.21542 10.0845 9.12497 10.2707C7.67559 13.2023 7.28747 14.7045 7.78621 15.4553C8.18689 16.0582 8.95269 16.0117 9.69297 15.9662C10.5622 15.9134 11.1676 15.9399 11.4483 16.426C11.5363 16.5786 11.7077 16.6634 11.8824 16.6402C12.055 16.6178 12.2004 16.4927 12.2465 16.3208C12.7237 14.5398 12.7365 13.5839 12.3257 13.0835C11.9691 12.6496 11.4154 12.6857 10.9706 12.7151ZM8.14424 3.27561C8.35259 3.15531 8.42399 2.88883 8.30365 2.68038C8.1833 2.47193 7.91681 2.40053 7.70846 2.52082C7.50001 2.64117 7.42861 2.90765 7.54896 3.1161C7.66931 3.32455 7.93579 3.39596 8.14424 3.27561ZM14.7405 6.44107C14.8608 6.64942 14.7895 6.916 14.581 7.03635C14.3726 7.1567 14.106 7.0852 13.9857 6.87684C13.8654 6.66839 13.9368 6.40191 14.1452 6.28156C14.3537 6.16121 14.6202 6.23262 14.7405 6.44107ZM5.09119 14.3099C5.29964 14.1896 5.37104 13.9231 5.2507 13.7146C5.1304 13.5063 4.86392 13.4349 4.65547 13.5552C4.44702 13.6756 4.37561 13.9421 4.49591 14.1504C4.61626 14.3589 4.88274 14.4303 5.09119 14.3099Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7673 12.2164C15.859 12.2482 15.9593 12.2031 15.9968 12.1147C16.0747 11.9326 16.7451 10.3156 16.3422 9.61766C16.1823 9.34074 15.9795 9.16824 15.7393 9.1052C15.298 8.98931 14.8293 9.25344 14.4194 9.49381L14.4117 9.49835C14.1281 9.66522 13.8357 9.83729 13.6743 9.7948C13.6427 9.78663 13.5951 9.76533 13.5448 9.67823C13.5014 9.58649 13.5525 9.15316 13.6541 8.75083C13.6743 8.67102 13.6391 8.58745 13.5677 8.5462C13.4965 8.50484 13.4059 8.51535 13.3475 8.57318C13.2985 8.62042 12.1648 9.75197 12.7699 10.8C13.2676 11.6621 14.1067 11.2479 14.7198 10.9453L14.7204 10.945C15.3218 10.648 15.6013 10.5453 15.7534 10.8086C15.8434 10.9646 15.7695 11.5458 15.6494 11.9947C15.6244 12.0881 15.676 12.1848 15.7673 12.2164ZM15.755 12.5401C15.5117 12.5564 15.3971 12.5492 15.3195 12.4149C15.2586 12.3094 15.2913 11.9584 15.3121 11.7343L15.3121 11.7343L15.3121 11.7343C15.3171 11.6806 15.3215 11.6342 15.3237 11.6002C15.3294 11.5125 15.2723 11.4331 15.1875 11.4103C15.1023 11.3877 15.0129 11.4279 14.9746 11.5066C14.3618 12.7462 14.1977 13.3813 14.4086 13.6987C14.578 13.9537 14.9018 13.934 15.2148 13.9147C15.5823 13.8924 15.8383 13.9036 15.957 14.1092C15.9942 14.1737 16.0666 14.2095 16.1405 14.1997C16.2135 14.1903 16.275 14.1374 16.2945 14.0647C16.4962 13.3116 16.5016 12.9075 16.328 12.6959C16.1772 12.5125 15.9431 12.5277 15.755 12.5401ZM14.5599 8.54897C14.648 8.49811 14.6782 8.38544 14.6273 8.2973C14.5765 8.20917 14.4638 8.17898 14.3757 8.22984C14.2876 8.28072 14.2574 8.39339 14.3083 8.48153C14.3591 8.56967 14.4718 8.59986 14.5599 8.54897ZM17.3489 9.88737C17.3998 9.97547 17.3696 10.0882 17.2815 10.1391C17.1934 10.19 17.0807 10.1597 17.0298 10.0716C16.9789 9.98349 17.0091 9.87082 17.0973 9.81993C17.1854 9.76905 17.2981 9.79924 17.3489 9.88737ZM13.2691 13.2144C13.3572 13.1636 13.3874 13.0509 13.3365 12.9628C13.2857 12.8747 13.173 12.8445 13.0849 12.8954C12.9967 12.9462 12.9665 13.0589 13.0174 13.147C13.0683 13.2351 13.1809 13.2653 13.2691 13.2144Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2996 11.0695C26.1198 11.1318 25.9233 11.0433 25.8498 10.8701C25.6971 10.5131 24.3826 7.34288 25.1726 5.97466C25.486 5.43177 25.8836 5.09357 26.3546 4.96999C27.2197 4.74279 28.1386 5.26061 28.9422 5.73185L28.9574 5.74076C29.5133 6.0679 30.0866 6.40523 30.403 6.32194C30.4649 6.30593 30.5583 6.26417 30.6569 6.09341C30.7419 5.91354 30.6418 5.06401 30.4426 4.27524C30.4031 4.11879 30.472 3.95494 30.6119 3.87407C30.7516 3.79298 30.9291 3.81359 31.0437 3.92696C31.1398 4.01959 33.3623 6.23797 32.176 8.29263C31.2002 9.98269 29.5552 9.17072 28.3533 8.5775L28.3522 8.57694C27.1731 7.9947 26.625 7.79323 26.327 8.30948C26.1505 8.61522 26.2954 9.7547 26.5307 10.6347C26.5798 10.8178 26.4788 11.0075 26.2996 11.0695ZM26.3238 11.7041C26.8007 11.7359 27.0255 11.7219 27.1776 11.4586C27.297 11.2517 27.2329 10.5637 27.192 10.1243C27.1822 10.019 27.1737 9.92799 27.1694 9.86131C27.1582 9.68953 27.2702 9.53378 27.4364 9.48918C27.6035 9.44476 27.7787 9.52355 27.8537 9.67796C29.0551 12.108 29.3768 13.3532 28.9634 13.9755C28.6313 14.4754 27.9965 14.4368 27.3829 14.399C26.6623 14.3553 26.1605 14.3773 25.9279 14.7802C25.8549 14.9067 25.7128 14.9769 25.568 14.9577C25.4249 14.9392 25.3044 14.8355 25.2662 14.693C24.8706 13.2167 24.86 12.4243 25.2005 12.0095C25.4961 11.6499 25.9551 11.6798 26.3238 11.7041ZM28.6667 3.87951C28.494 3.7798 28.4348 3.5589 28.5345 3.38611C28.6343 3.21332 28.8552 3.15413 29.0279 3.25385C29.2007 3.35361 29.2599 3.5745 29.1601 3.74729C29.0604 3.92008 28.8395 3.97927 28.6667 3.87951ZM23.1989 6.50343C23.0992 6.67614 23.1583 6.89711 23.3311 6.99687C23.5039 7.09663 23.7248 7.03736 23.8245 6.86466C23.9243 6.69187 23.8651 6.47097 23.6923 6.37121C23.5195 6.27145 23.2986 6.33064 23.1989 6.50343ZM31.1974 13.0261C31.0246 12.9264 30.9654 12.7055 31.0652 12.5327C31.1649 12.36 31.3858 12.3008 31.5586 12.4005C31.7314 12.5003 31.7906 12.7212 31.6908 12.8939C31.5911 13.0667 31.3702 13.1259 31.1974 13.0261Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8278 13.8145C20.7172 13.8688 20.607 13.823 20.5755 13.7117C20.5099 13.4826 19.9517 11.4447 20.5138 10.4712C20.7368 10.0849 20.9954 9.83029 21.2826 9.7147C21.8101 9.50224 22.3179 9.78635 22.7607 10.0472L22.769 10.0521C23.0753 10.2333 23.3911 10.4201 23.584 10.3423C23.6217 10.3273 23.6799 10.2928 23.75 10.1713C23.8128 10.0446 23.8124 9.48104 23.7492 8.96515C23.7366 8.86283 23.7887 8.74802 23.8771 8.68404C23.9653 8.61991 24.0689 8.62146 24.1288 8.68966C24.1793 8.74521 25.3405 10.0811 24.4965 11.5429C23.8022 12.7454 22.8852 12.314 22.2153 11.9989L22.2147 11.9986C21.5574 11.6892 21.2472 11.5919 21.0351 11.9592C20.9095 12.1767 20.9164 12.9319 20.9947 13.5065C21.011 13.6261 20.9381 13.7605 20.8278 13.8145ZM20.7982 14.2389C21.0781 14.2273 21.2121 14.2023 21.3202 14.015C21.4052 13.8678 21.415 13.4102 21.4212 13.118L21.4212 13.1179C21.4226 13.0479 21.4239 12.9874 21.426 12.9429C21.4313 12.8283 21.5083 12.716 21.6097 12.6745C21.7116 12.6331 21.8098 12.6739 21.8435 12.7724C22.386 14.3211 22.4902 15.135 22.2025 15.5815C21.9714 15.9402 21.5985 15.9582 21.2381 15.9753C20.8149 15.9958 20.5165 16.0454 20.351 16.332C20.299 16.422 20.2102 16.479 20.1258 16.4761C20.0424 16.4736 19.9783 16.4123 19.9656 16.3193C19.8338 15.3553 19.8823 14.8239 20.1125 14.5218C20.3123 14.2598 20.5817 14.2481 20.7982 14.2389ZM22.7259 8.82237C22.6306 8.76737 22.6109 8.62313 22.6819 8.50019C22.7529 8.37725 22.8876 8.32222 22.9829 8.37722C23.0782 8.43225 23.0979 8.57649 23.027 8.69943C22.956 8.82237 22.8212 8.8774 22.7259 8.82237ZM19.3095 10.9629C19.2386 11.0858 19.2583 11.2301 19.3536 11.2851C19.4489 11.3401 19.5837 11.285 19.6547 11.1622C19.7256 11.0392 19.7059 10.895 19.6106 10.84C19.5153 10.7849 19.3805 10.84 19.3095 10.9629ZM23.5899 14.7893C23.4945 14.7343 23.4748 14.59 23.5458 14.4671C23.6167 14.3442 23.7515 14.2892 23.8468 14.3442C23.9421 14.3992 23.9619 14.5435 23.8909 14.6664C23.8199 14.7893 23.6852 14.8443 23.5899 14.7893Z" fill="currentColor"/>
    </svg>
    
  )
}

export default BattleCursedIcon
