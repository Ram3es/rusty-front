const Logo = (props) => {
  return (
    <svg
      class="w-[26px] h-[26px] lg:w-[50px] lg:h-[50px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 1080 1080"
      xml:space="preserve"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="20" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        transform="matrix(1 0 0 1 540 540)"
        id="2370d7de-49d6-404a-8424-34111a8607ca"
      >
        <rect
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; visibility: hidden;"
          vector-effect="non-scaling-stroke"
          x="-540"
          y="-540"
          rx="0"
          ry="0"
          width="1080"
          height="1080"
        />
      </g>
      <g
        transform="matrix(1 0 0 1 540 540)"
        id="fd6d69db-bfe5-406b-81ac-f718e437a3f0"
      ></g>
      <g transform="matrix(3.61 0 0 3.28 539.94 539.91)">
        <g style="" vector-effect="non-scaling-stroke">
          <g transform="matrix(6.86 0 0 6.86 0.27 0.71)">
            <path
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(81,81,125); fill-rule: evenodd; opacity: 1;"
              vector-effect="non-scaling-stroke"
              transform=" translate(-23, -23)"
              d="M 36.369 0.324538 C 36.2528 0.168716 36.0806 0.0601052 35.8858 0.0198011 L 35.8858 0 L 26.3797 0 C 26.1687 0 25.9597 0.0401933 25.7648 0.118326 C 25.57 0.196459 25.3931 0.310944 25.2443 0.455166 C 25.0956 0.599426 24.978 0.77058 24.8983 0.958764 C 24.8186 1.14699 24.7783 1.34851 24.7798 1.5518 L 29.5043 1.5518 C 29.3957 1.83167 29.2033 2.0742 28.9514 2.24857 C 28.6995 2.42297 28.3995 2.52139 28.0894 2.53129 L 26.2746 2.5819 L 25.9755 3.52175 L 16.316 3.52175 C 15.6562 3.52138 15.0123 3.71655 14.4717 4.08083 C 13.9311 4.44509 13.52 4.96073 13.2943 5.55779 C 12.8691 6.54829 12.4425 7.53878 12.0143 8.52928 L 10.5972 8.52928 C 10.1136 8.5298 9.6366 8.63701 9.20277 8.84266 C 8.76894 9.04832 8.38978 9.34696 8.09437 9.71568 L 16.1491 9.71568 C 16.8554 9.71568 17.5548 9.73549 18.2519 9.74867 C 18.4931 9.75366 18.7304 9.80834 18.9478 9.909 C 19.1652 10.0097 19.3577 10.154 19.5122 10.3323 C 19.6669 10.5106 19.7801 10.7187 19.8441 10.9427 C 19.9082 11.1667 19.9218 11.4012 19.8839 11.6306 L 19.7856 11.886 L 19.7882 11.8834 L 17.9845 16.6492 L 17.0862 16.6492 L 18.3462 13.2788 L 18.3572 13.2682 L 18.9012 11.8154 L 18.8932 11.8154 L 18.8965 11.8067 L 18.3342 11.8067 L 18.3321 11.8154 L 16.5216 16.6492 L 15.3789 16.6492 L 15.6783 15.848 L 17.1937 11.8067 L 16.2851 11.7891 C 15.6992 11.7776 15.1319 11.7661 14.5736 11.7548 L 13.4103 11.7309 C 12.6914 11.7161 11.9765 11.7015 11.2446 11.6869 L 10.2434 11.6671 C 9.76885 11.6579 9.2836 11.6487 8.78236 11.6395 C 8.42891 11.6333 8.08057 11.7218 7.77627 11.8952 C 7.47198 12.0685 7.22362 12.3199 7.05895 12.6211 C 6.91691 12.8822 6.81233 13.1606 6.74817 13.4487 L 6.74478 13.4646 C 6.74312 13.4729 6.74161 13.4813 6.74025 13.4897 L 6.73754 13.5087 C 6.73384 13.5383 6.73211 13.5682 6.73234 13.598 C 6.73264 13.634 6.73596 13.6701 6.74229 13.7057 C 6.74395 13.715 6.74576 13.7243 6.74779 13.7335 L 6.75126 13.7484 L 6.75624 13.7672 C 6.78519 13.8712 6.8394 13.9671 6.91449 14.0469 C 6.98951 14.1267 7.08323 14.1881 7.18788 14.2262 C 7.29253 14.2641 7.40502 14.2776 7.51616 14.2654 L 7.53214 14.2654 C 7.69417 14.2378 7.84715 14.1738 7.97856 14.0786 C 8.11005 13.9834 8.21629 13.8596 8.28867 13.7173 L 13.5 13.7173 C 13.5018 13.8142 13.4836 13.9104 13.4465 14.0005 C 13.4093 14.0905 13.3539 14.1726 13.2835 14.2418 C 13.213 14.3111 13.129 14.3661 13.0364 14.4038 C 12.9436 14.4415 12.844 14.461 12.7435 14.4613 L 10.0189 14.4613 L 8.0333 20.1599 C 5.31639 27.9677 3.39703 33.4833 2.50592 35.4379 C 1.59166 37.4387 2.07397 38.4467 2.71627 38.9596 L 2.71839 38.9576 C 2.80464 39.0267 2.89398 39.0864 2.98348 39.1379 C 3.03701 39.1687 3.09062 39.1965 3.14362 39.2216 C 3.48946 39.3812 3.86871 39.4625 4.25217 39.4593 L 11.1275 39.4593 L 15.6988 26.5938 L 14.3434 26.5938 C 13.9918 26.5938 13.6546 26.4593 13.406 26.2199 C 13.1574 25.9805 13.0178 25.6557 13.0178 25.3172 L 19.0256 25.3172 C 18.2783 27.7257 17.5311 30.1851 16.7839 32.6445 L 16.7834 32.6462 L 16.7782 32.6636 L 16.7775 32.6654 C 15.7064 36.1908 14.6353 39.7159 13.5642 43.0912 C 13.155 44.3766 14.1447 45.9526 15.5413 45.9724 C 19.8391 46.0199 24.137 45.9965 28.4352 45.973 C 32.6997 45.9497 36.9645 45.9264 41.2299 45.9724 C 41.4674 45.9755 41.6993 45.9022 41.8888 45.7643 C 42.0783 45.6264 42.2148 45.4317 42.2767 45.2108 L 43.9567 39.2568 C 44.0373 38.9828 44.0045 38.6893 43.8651 38.4381 C 43.7258 38.1869 43.4907 37.9975 43.2093 37.9098 C 42.8207 37.7975 42.3681 37.8878 41.9659 38.5459 L 35.9324 38.5632 C 37.2307 38.5538 38.5282 38.5458 39.8241 38.5458 L 28.974 24.4939 L 32.5602 24.5886 C 35.1648 24.5986 37.6869 23.7103 39.67 22.0843 C 41.6531 20.4584 42.9662 18.2023 43.3714 15.7247 C 43.5031 14.8991 43.5399 14.062 43.4811 13.2286 L 43.4605 12.9975 C 43.219 10.397 41.9855 8.09946 40.142 6.41818 C 39.8239 6.12567 39.4875 5.85174 39.1339 5.59735 L 39.1302 5.6009 C 38.7857 5.35509 38.4257 5.12833 38.0521 4.92212 L 38.0619 4.91278 C 37.0416 4.35151 35.9385 3.95412 34.7961 3.73154 L 35.4356 1.5518 L 35.687 1.5518 C 35.8886 1.55453 36.0843 1.48586 36.2368 1.35889 C 36.3893 1.23188 36.4881 1.05537 36.5144 0.862825 C 36.537 0.67224 36.4852 0.480361 36.369 0.324538 Z M 25.8472 16.6734 L 25.8609 16.6601 C 25.7095 16.6601 25.5649 16.6601 25.4291 16.641 L 27.1614 12.0158 C 27.39 11.9762 29.2712 11.7033 30.4529 12.9139 C 30.5242 12.9845 30.7373 13.1991 30.9272 13.5005 L 30.9261 13.5015 L 30.9352 13.5148 L 30.9458 13.5305 C 31.0349 13.6758 31.1176 13.8401 31.1764 14.0174 C 31.1836 14.0412 31.1903 14.0652 31.1966 14.0893 C 31.2018 14.1096 31.2066 14.13 31.2111 14.1504 L 31.2177 14.1813 C 31.2667 14.4244 31.2647 14.6746 31.2117 14.9169 C 30.9831 15.7071 30.1489 16.0834 29.6963 16.286 C 29.118 16.5413 28.6084 16.5875 27.6644 16.6425 L 27.6612 16.6456 L 27.5181 16.6536 C 26.9616 16.6863 26.4041 16.693 25.8472 16.6734 Z M 25.2872 17.0146 L 25.1661 17.3402 L 25.1647 17.3416 L 24.7752 18.3815 C 26.0438 18.3506 27.2598 18.1944 28.558 17.5626 C 29.3221 17.1962 30.021 16.7156 30.6288 16.1385 C 30.4323 16.3 30.2185 16.4409 29.9911 16.5589 C 29.4494 16.8363 28.9054 16.9551 27.7054 17.0146 L 27.5724 17.021 C 27.512 17.0237 27.4515 17.0262 27.3909 17.0285 L 27.2598 17.0343 L 27.2611 17.033 C 26.6033 17.0542 25.9447 17.0481 25.2872 17.0146 Z M 16.2406 17.0145 L 16.245 17.0102 L 15.3354 17.0102 L 14.8212 18.3793 L 15.8726 18.3793 L 16.3829 17.0145 L 16.2406 17.0145 Z M 18.9331 16.6492 L 22.677 16.6492 L 24.4209 11.996 C 23.4884 11.9938 22.2267 11.985 20.7044 11.9652 L 18.9331 16.6492 Z M 35.8126 38.564 L 34.8623 38.571 L 33.6758 41.7397 C 33.9531 41.7394 34.2237 41.6568 34.4507 41.5032 C 34.6776 41.3496 34.85 41.1325 34.9443 40.8813 L 35.8126 38.564 Z M 33.0093 38.5836 L 31.8267 41.7375 C 32.1043 41.7373 32.3752 41.6548 32.6026 41.5012 C 32.83 41.3477 33.0027 41.1304 33.0975 40.8791 L 33.9593 38.5775 L 33.0093 38.5836 Z M 32.1071 38.5883 C 31.7944 38.5896 31.4817 38.5906 31.169 38.5913 L 29.9889 41.7397 C 30.2665 41.74 30.5374 41.6576 30.7645 41.504 C 30.9916 41.3503 31.1638 41.1328 31.2575 40.8813 L 32.1071 38.5883 Z M 24.5468 38.5921 L 30.4413 38.5765 C 29.0335 36.6681 27.6256 34.7495 26.2178 32.83 L 24.8302 37.5532 L 21.4017 37.5532 C 21.0818 37.5532 20.771 37.6551 20.5175 37.843 C 20.2641 38.0309 20.0823 38.2943 20.0006 38.5921 L 24.5468 38.5921 Z M 17.8441 17.019 L 17.3331 18.3704 L 16.541 18.3704 L 17.0474 17.019 L 17.8441 17.019 Z M 22.5365 17.0256 L 22.0302 18.3704 L 18.2849 18.3704 L 18.7936 17.0256 L 22.5365 17.0256 Z M 23.8267 18.3836 L 24.3387 17.0146 L 23.4861 17.0146 L 22.9781 18.3836 L 23.8267 18.3836 Z M 23.6249 16.6447 L 25.3672 11.9982 L 26.2273 11.9982 L 24.4758 16.6447 L 23.6249 16.6447 Z"
              stroke-linecap="round"
            />
          </g>
          <g transform="matrix(6.86 0 0 6.86 0.27 0.71)">
            <radialGradient
              id="SVGID_SVGID_14_3"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(0 46 -21 0 23 0)"
              cx="0"
              cy="0"
              r="1"
              fx="0"
              fy="0"
            >
              <stop
                offset="0%"
                style="stop-color:rgb(255,180,54);stop-opacity: 0.12"
              />
              <stop
                offset="100%"
                style="stop-color:rgb(255,180,54);stop-opacity: 0"
              />
            </radialGradient>
            <path
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_SVGID_14_3); fill-rule: evenodd; opacity: 1;"
              vector-effect="non-scaling-stroke"
              transform=" translate(-23, -23)"
              d="M 36.369 0.324538 C 36.2528 0.168716 36.0806 0.0601052 35.8858 0.0198011 L 35.8858 0 L 26.3797 0 C 26.1687 0 25.9597 0.0401933 25.7648 0.118326 C 25.57 0.196459 25.3931 0.310944 25.2443 0.455166 C 25.0956 0.599426 24.978 0.77058 24.8983 0.958764 C 24.8186 1.14699 24.7783 1.34851 24.7798 1.5518 L 29.5043 1.5518 C 29.3957 1.83167 29.2033 2.0742 28.9514 2.24857 C 28.6995 2.42297 28.3995 2.52139 28.0894 2.53129 L 26.2746 2.5819 L 25.9755 3.52175 L 16.316 3.52175 C 15.6562 3.52138 15.0123 3.71655 14.4717 4.08083 C 13.9311 4.44509 13.52 4.96073 13.2943 5.55779 C 12.8691 6.54829 12.4425 7.53878 12.0143 8.52928 L 10.5972 8.52928 C 10.1136 8.5298 9.6366 8.63701 9.20277 8.84266 C 8.76894 9.04832 8.38978 9.34696 8.09437 9.71568 L 16.1491 9.71568 C 16.8554 9.71568 17.5548 9.73549 18.2519 9.74867 C 18.4931 9.75366 18.7304 9.80834 18.9478 9.909 C 19.1652 10.0097 19.3577 10.154 19.5122 10.3323 C 19.6669 10.5106 19.7801 10.7187 19.8441 10.9427 C 19.9082 11.1667 19.9218 11.4012 19.8839 11.6306 L 19.7856 11.886 L 19.7882 11.8834 L 17.9845 16.6492 L 17.0862 16.6492 L 18.3462 13.2788 L 18.3572 13.2682 L 18.9012 11.8154 L 18.8932 11.8154 L 18.8965 11.8067 L 18.3342 11.8067 L 18.3321 11.8154 L 16.5216 16.6492 L 15.3789 16.6492 L 15.6783 15.848 L 17.1937 11.8067 L 16.2851 11.7891 C 15.6992 11.7776 15.1319 11.7661 14.5736 11.7548 L 13.4103 11.7309 C 12.6914 11.7161 11.9765 11.7015 11.2446 11.6869 L 10.2434 11.6671 C 9.76885 11.6579 9.2836 11.6487 8.78236 11.6395 C 8.42891 11.6333 8.08057 11.7218 7.77627 11.8952 C 7.47198 12.0685 7.22362 12.3199 7.05895 12.6211 C 6.91691 12.8822 6.81233 13.1606 6.74817 13.4487 L 6.74478 13.4646 C 6.74312 13.4729 6.74161 13.4813 6.74025 13.4897 L 6.73754 13.5087 C 6.73384 13.5383 6.73211 13.5682 6.73234 13.598 C 6.73264 13.634 6.73596 13.6701 6.74229 13.7057 C 6.74395 13.715 6.74576 13.7243 6.74779 13.7335 L 6.75126 13.7484 L 6.75624 13.7672 C 6.78519 13.8712 6.8394 13.9671 6.91449 14.0469 C 6.98951 14.1267 7.08323 14.1881 7.18788 14.2262 C 7.29253 14.2641 7.40502 14.2776 7.51616 14.2654 L 7.53214 14.2654 C 7.69417 14.2378 7.84715 14.1738 7.97856 14.0786 C 8.11005 13.9834 8.21629 13.8596 8.28867 13.7173 L 13.5 13.7173 C 13.5018 13.8142 13.4836 13.9104 13.4465 14.0005 C 13.4093 14.0905 13.3539 14.1726 13.2835 14.2418 C 13.213 14.3111 13.129 14.3661 13.0364 14.4038 C 12.9436 14.4415 12.844 14.461 12.7435 14.4613 L 10.0189 14.4613 L 8.0333 20.1599 C 5.31639 27.9677 3.39703 33.4833 2.50592 35.4379 C 1.59166 37.4387 2.07397 38.4467 2.71627 38.9596 L 2.71839 38.9576 C 2.80464 39.0267 2.89398 39.0864 2.98348 39.1379 C 3.03701 39.1687 3.09062 39.1965 3.14362 39.2216 C 3.48946 39.3812 3.86871 39.4625 4.25217 39.4593 L 11.1275 39.4593 L 15.6988 26.5938 L 14.3434 26.5938 C 13.9918 26.5938 13.6546 26.4593 13.406 26.2199 C 13.1574 25.9805 13.0178 25.6557 13.0178 25.3172 L 19.0256 25.3172 C 18.2783 27.7257 17.5311 30.1851 16.7839 32.6445 L 16.7834 32.6462 L 16.7782 32.6636 L 16.7775 32.6654 C 15.7064 36.1908 14.6353 39.7159 13.5642 43.0912 C 13.155 44.3766 14.1447 45.9526 15.5413 45.9724 C 19.8391 46.0199 24.137 45.9965 28.4352 45.973 C 32.6997 45.9497 36.9645 45.9264 41.2299 45.9724 C 41.4674 45.9755 41.6993 45.9022 41.8888 45.7643 C 42.0783 45.6264 42.2148 45.4317 42.2767 45.2108 L 43.9567 39.2568 C 44.0373 38.9828 44.0045 38.6893 43.8651 38.4381 C 43.7258 38.1869 43.4907 37.9975 43.2093 37.9098 C 42.8207 37.7975 42.3681 37.8878 41.9659 38.5459 L 35.9324 38.5632 C 37.2307 38.5538 38.5282 38.5458 39.8241 38.5458 L 28.974 24.4939 L 32.5602 24.5886 C 35.1648 24.5986 37.6869 23.7103 39.67 22.0843 C 41.6531 20.4584 42.9662 18.2023 43.3714 15.7247 C 43.5031 14.8991 43.5399 14.062 43.4811 13.2286 L 43.4605 12.9975 C 43.219 10.397 41.9855 8.09946 40.142 6.41818 C 39.8239 6.12567 39.4875 5.85174 39.1339 5.59735 L 39.1302 5.6009 C 38.7857 5.35509 38.4257 5.12833 38.0521 4.92212 L 38.0619 4.91278 C 37.0416 4.35151 35.9385 3.95412 34.7961 3.73154 L 35.4356 1.5518 L 35.687 1.5518 C 35.8886 1.55453 36.0843 1.48586 36.2368 1.35889 C 36.3893 1.23188 36.4881 1.05537 36.5144 0.862825 C 36.537 0.67224 36.4852 0.480361 36.369 0.324538 Z M 25.8472 16.6734 L 25.8609 16.6601 C 25.7095 16.6601 25.5649 16.6601 25.4291 16.641 L 27.1614 12.0158 C 27.39 11.9762 29.2712 11.7033 30.4529 12.9139 C 30.5242 12.9845 30.7373 13.1991 30.9272 13.5005 L 30.9261 13.5015 L 30.9352 13.5148 L 30.9458 13.5305 C 31.0349 13.6758 31.1176 13.8401 31.1764 14.0174 C 31.1836 14.0412 31.1903 14.0652 31.1966 14.0893 C 31.2018 14.1096 31.2066 14.13 31.2111 14.1504 L 31.2177 14.1813 C 31.2667 14.4244 31.2647 14.6746 31.2117 14.9169 C 30.9831 15.7071 30.1489 16.0834 29.6963 16.286 C 29.118 16.5413 28.6084 16.5875 27.6644 16.6425 L 27.6612 16.6456 L 27.5181 16.6536 C 26.9616 16.6863 26.4041 16.693 25.8472 16.6734 Z M 25.2872 17.0146 L 25.1661 17.3402 L 25.1647 17.3416 L 24.7752 18.3815 C 26.0438 18.3506 27.2598 18.1944 28.558 17.5626 C 29.3221 17.1962 30.021 16.7156 30.6288 16.1385 C 30.4323 16.3 30.2185 16.4409 29.9911 16.5589 C 29.4494 16.8363 28.9054 16.9551 27.7054 17.0146 L 27.5724 17.021 C 27.512 17.0237 27.4515 17.0262 27.3909 17.0285 L 27.2598 17.0343 L 27.2611 17.033 C 26.6033 17.0542 25.9447 17.0481 25.2872 17.0146 Z M 16.2406 17.0145 L 16.245 17.0102 L 15.3354 17.0102 L 14.8212 18.3793 L 15.8726 18.3793 L 16.3829 17.0145 L 16.2406 17.0145 Z M 18.9331 16.6492 L 22.677 16.6492 L 24.4209 11.996 C 23.4884 11.9938 22.2267 11.985 20.7044 11.9652 L 18.9331 16.6492 Z M 35.8126 38.564 L 34.8623 38.571 L 33.6758 41.7397 C 33.9531 41.7394 34.2237 41.6568 34.4507 41.5032 C 34.6776 41.3496 34.85 41.1325 34.9443 40.8813 L 35.8126 38.564 Z M 33.0093 38.5836 L 31.8267 41.7375 C 32.1043 41.7373 32.3752 41.6548 32.6026 41.5012 C 32.83 41.3477 33.0027 41.1304 33.0975 40.8791 L 33.9593 38.5775 L 33.0093 38.5836 Z M 32.1071 38.5883 C 31.7944 38.5896 31.4817 38.5906 31.169 38.5913 L 29.9889 41.7397 C 30.2665 41.74 30.5374 41.6576 30.7645 41.504 C 30.9916 41.3503 31.1638 41.1328 31.2575 40.8813 L 32.1071 38.5883 Z M 24.5468 38.5921 L 30.4413 38.5765 C 29.0335 36.6681 27.6256 34.7495 26.2178 32.83 L 24.8302 37.5532 L 21.4017 37.5532 C 21.0818 37.5532 20.771 37.6551 20.5175 37.843 C 20.2641 38.0309 20.0823 38.2943 20.0006 38.5921 L 24.5468 38.5921 Z M 17.8441 17.019 L 17.3331 18.3704 L 16.541 18.3704 L 17.0474 17.019 L 17.8441 17.019 Z M 22.5365 17.0256 L 22.0302 18.3704 L 18.2849 18.3704 L 18.7936 17.0256 L 22.5365 17.0256 Z M 23.8267 18.3836 L 24.3387 17.0146 L 23.4861 17.0146 L 22.9781 18.3836 L 23.8267 18.3836 Z M 23.6249 16.6447 L 25.3672 11.9982 L 26.2273 11.9982 L 24.4758 16.6447 L 23.6249 16.6447 Z"
              stroke-linecap="round"
            />
          </g>
          <g transform="matrix(1.7 0 0 1.65 0 0)">
            <path
              d="M 135.6 9.2 C 148.2 9.2 160.9 9.3 173.5 9.3 C 175 9.8 176.1 11.2 176 12.9 C 175.8 14.5 174.5 15.7 172.9 15.7 C 172.8 15.7 172.8 15.7 172.7 15.7 L 171.7 15.7 L 169.1 24.7 L 169.1 24.8 C 187.4 28.5 201.9 43.8 203.6 63.2 L 203.7 64.1 C 203.9 67.6 203.8 71 203.2 74.4 C 199.8 95.6 181.6 111.1 160.3 111.1 C 160.2 111.1 160.2 111.1 160.1 111.1 L 145.8 110.7 L 189 168.9 L 197.7 168.9 C 198.9 166.8 200.3 166 201.6 166 C 202 166 202.3 166.1 202.6 166.2 C 205 166.9 206.2 169.4 205.6 171.8 L 198.9 196.5 C 198.4 198.4 196.6 199.7 194.7 199.7 C 187.5 199.6 180.3 199.6 173 199.6 C 153.3 199.6 133.6 199.8 113.9 199.8 C 106.7 199.8 99.5 199.8 92.2 199.7 C 86.5 199.6 82.6 193 84.3 187.8 C 91.6 164 98.8 138.6 106.1 114.3 L 82.3 114.3 C 82.3 117.2 84.7 119.6 87.6 119.6 L 93 119.6 L 74.8 172.8 L 47.3 172.8 C 45.8 172.8 44.3 172.4 42.9 171.8 C 39.7 170.3 36 166.1 40.3 156.1 C 44.7 146.2 55.2 114 70.2 69.2 L 71.2 66.1 L 63.4 66.1 C 62.9 67.3 61.7 68.2 60.4 68.4 L 60.3 68.4 C 60.2 68.4 60 68.5 59.8 68.5 C 59.6 68.5 59.5 68.5 59.3 68.4 C 57.8 68 56.7 66.6 57.1 65 C 57.4 63.8 57.8 62.6 58.4 61.5 C 59.6 59 62.3 57.4 65 57.4 C 65.1 57.4 65.1 57.4 65.2 57.4 C 65.7 57.4 66.3 57.4 66.8 57.4 C 68.2 57.4 69.6 57.4 70.9 57.4 C 71.4 57.4 71.8 57.4 72.3 57.4 L 74 57.4 L 77.3 49.6 L 62.7 49.6 C 65.2 46.5 68.8 44.7 72.7 44.7 L 78.4 44.7 C 80.1 40.6 81.8 36.5 83.5 32.4 C 85.3 27.4 90.2 24 95.5 24 L 133.9 24 L 134.1 23.9 C 134.5 22.6 134.9 21.3 135.3 20 L 142.5 19.8 C 143.8 19.8 145 19.3 146 18.6 C 147 17.9 147.7 16.9 148.2 15.7 L 129.4 15.7 C 129.3 12 132.1 9.2 135.6 9.2 z"
              transform="translate(-122.32, -104.45)"
              ref={props.ref}
              class={`draw${props.xy}  ${!props.start() ? "hidden" : ""} `}
              style="fill:none;stroke:#FFC701;stroke-miterlimit:10;stroke-width:6px"
              filter="url(#glow)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;