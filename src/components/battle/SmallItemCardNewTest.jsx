import GoldText from "../shared/GoldText";
import {getCurrencyString} from "../mines_new/utils/tools";
import CoinLogo from "../shared/CoinLogo";
import ItemPlaceholder from "../../assets/img/case/ItemPlaceholder.png";

import PullsRLGold from "../../assets/img/case-battles/PullsRLGold.png";
import PullsRLPurple from "../../assets/img/case-battles/PullsRLPurple.png";
import PullsRLBlue from "../../assets/img/case-battles/PullsRLBlue.png";
import PullsRLRed from "../../assets/img/case-battles/PullsRLRed.png";
import PullsRLGray from "../../assets/img/case-battles/PullsRLGray.png";

const pullsRL = {
  gold: PullsRLGold,
  purple: PullsRLPurple,
  blue: PullsRLBlue,
  red: PullsRLRed,
  gray: PullsRLGray,
};

const rgb = {
  gold: "235, 172, 50",
  purple: "214, 48, 255",
  blue: "40, 152, 255",
  red: "255, 27, 27",
  gray: "198, 198, 198",
};

const getColor = (item_price) => {
  const color =
    item_price > 1000 * 100
      ? "gold"
      : item_price > 1000 * 30
      ? "red"
      : item_price > 1000 * 10
      ? "purple"
      : item_price > 1000 * 2
      ? "blue"
      : "gray";
  return color;
};

const SmallItemCardNew = (props) => {
  return (
    <div class="w-full h-full">
      {props.playerRoundData()[props.playerIndex()][props.round] ? (
        <div
          class="flex items-center justify-center w-full h-full rounded-md p-[1px]"
          style={{
            background: `linear-gradient(143.59deg, rgba(${
              rgb[
                getColor(
                  props.playerRoundData()[props.playerIndex()][props.round]
                    .item_price
                )
              ]
            }, 0.32) -0.86%, rgba(${
              rgb[
                getColor(
                  props.playerRoundData()[props.playerIndex()][props.round]
                    .item_price
                )
              ]
            }, 0) 20.95%),
                      linear-gradient(321.42deg, rgba(${
                        rgb[
                          getColor(
                            props.playerRoundData()[props.playerIndex()][
                              props.round
                            ].item_price
                          )
                        ]
                      }, 0.32) 0%, rgba(${
              rgb[
                getColor(
                  props.playerRoundData()[props.playerIndex()][props.round]
                    .item_price
                )
              ]
            }, 0) 15.48%),
                      linear-gradient(180deg, rgba(255, 255, 255, 0.08) 38.3%, rgba(255, 255, 255, 0.01) 100%)`,
          }}
        >
          <div class="w-full h-full bg-dark-secondary rounded-md">
            <div
              class="w-full h-full rounded-md flex items-center justify-center flex-col gap-2"
              style={{
                background: `radial-gradient(64.83% 52.59% at 0% 0%, rgba(${
                  rgb[
                    getColor(
                      props.playerRoundData()[props.playerIndex()][props.round]
                        .item_price
                    )
                  ]
                }, 0.16) 0%, rgba(${
                  rgb[
                    getColor(
                      props.playerRoundData()[props.playerIndex()][props.round]
                        .item_price
                    )
                  ]
                }, 0) 100%),
                      radial-gradient(80.69% 44.35% at 50% 24.46%, #1F2344 0%, rgba(35, 37, 61, 0) 100%), 
                      radial-gradient(69.91% 41.51% at 100% 100%, rgba(${
                        rgb[
                          getColor(
                            props.playerRoundData()[props.playerIndex()][
                              props.round
                            ].item_price
                          )
                        ]
                      }, 0.12) 0%, rgba(${
                  rgb[
                    getColor(
                      props.playerRoundData()[props.playerIndex()][props.round]
                        .item_price
                    )
                  ]
                }, 0) 100%)`,
              }}
            >
              <div class="relative flex items-center justify-center h-[55%]">
                <img
                  src={
                    props.playerRoundData()[props.playerIndex()][props.round]
                      .image
                  }
                  alt=""
                  class="h-[100%]"
                />
                <img
                  src={
                    pullsRL[
                      getColor(
                        props.playerRoundData()[props.playerIndex()][
                          props.round
                        ].item_price
                      )
                    ]
                  }
                  alt=""
                  class="absolute h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div class="flex items-center justify-center gap-1 translate-y-1">
                <CoinLogo h="18" />
                <GoldText
                  text={getCurrencyString(
                    props.playerRoundData()[props.playerIndex()][props.round]
                      .item_price
                  )}
                  size={"15"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <img src={ItemPlaceholder} class="w-30" />
      )}
    </div>
  );
};

export default SmallItemCardNew;
