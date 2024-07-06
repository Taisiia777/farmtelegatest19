// import classNames from "classnames/bind";
// import styles from "./BoostBlock.module.scss";
// const cn = classNames.bind(styles);

// import { TBoostName, TLiga } from "../../types/globalTypes";

// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// import Button from "../Button/Button";

// import { useDispatch } from "react-redux";
// import { setBoostInfo } from "../../store/reducers/boost";

// interface IBoostBlockProps {
//    boostName: TBoostName;
//    price: string;
//    earning: string;
//    ligaName: TLiga;
//    isBlocked?: boolean;
//    isBought?: boolean;

// }

// const BoostBlock = ({
//    boostName,
//    price,
//    earning,
//    ligaName,
//    isBlocked = false,
//    isBought = false,

// }: IBoostBlockProps) => {
//    const dispatch = useDispatch();
//    console.log(userId)
//    console.log(boosterId)

//    function openBoostBuyPopup() {
//       dispatch(
//          setBoostInfo({
//             earning,
//             price,
//             name: boostName,
//             imgSrc: `img/boosts/${boostName}.svg`,
//          })
//       );
//    }

//    let content;

//    // Определяем тип контента
//    // в зависимости от того купленна ли она уже
//    // или может заблокирована
//    if (isBlocked) {
//       content = (
//          <>
//             <div className={cn("boost", '_blur')}>
//                <div className={cn("boost__left")}>
//                   <img
//                      src={`img/boosts/${boostName}.svg`}
//                      className={cn("boost__img")}
//                      alt={boostName}
//                   />
//                   <div className={cn("boost__info", "boostInfo")}>
//                      <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                         {boostName}
//                      </h3>
//                      <div className={cn("boostInfo__index")}>
//                         <img
//                            src={`img/leagueIcons/${ligaName}.png`}
//                            alt={ligaName}
//                         />
//                         <span className="textShadow">+ {earning}/h</span>
//                         <CoinWhiteBg size="small" iconName="BTC" />
//                      </div>
//                   </div>
//                </div>

//                <div className={cn("boost__right")} id="buyBoost">
//                   <Button
//                      className={cn("boost__price")}
//                      onClick={openBoostBuyPopup}>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                      <span className="textShadow">{price}</span>
//                   </Button>
//                </div>
//             </div>
//             <div className={cn("blocked")}>
//                <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
//                <strong className="textShadow">{ligaName} league</strong>
//             </div>
//          </>
//       );
//    } else if (isBought) {
//       content = (
//          <div className={cn("boost")}>
//             <div className={cn("boost__left")}>
//                <img
//                   src={`img/boosts/${boostName}.svg`}
//                   className={cn("boost__img")}
//                   alt={boostName}
//                />
//                <div className={cn("boost__info", "boostInfo")}>
//                   <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                      {boostName}
//                   </h3>
//                   <div className={cn("boostInfo__index")}>
//                      <img
//                         src={`img/leagueIcons/${ligaName}.png`}
//                         alt={ligaName}
//                      />
//                      <span className="textShadow">+ {earning}/h</span>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                   </div>
//                </div>
//             </div>
//             <div
//                className={cn("boost__right")}
//                style={{
//                   height: "45px",
//                }}>
//                <img
//                   src="img/global/checkbox/green.svg"
//                   className={cn("boost__checkbox")}
//                   alt="Bought"
//                />
//             </div>
//          </div>
//       );
//    } else {
//       content = (
//          <div className={cn("boost")}>
//             <div className={cn("boost__left")}>
//                <img
//                   src={`img/boosts/${boostName}.svg`}
//                   className={cn("boost__img")}
//                   alt={boostName}
//                />
//                <div className={cn("boost__info", "boostInfo")}>
//                   <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                      {boostName}
//                   </h3>
//                   <div className={cn("boostInfo__index")}>
//                      <img
//                         src={`img/leagueIcons/${ligaName}.png`}
//                         alt={ligaName}
//                      />
//                      <span className="textShadow">+ {earning}/h</span>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                   </div>
//                </div>
//             </div>

//             <div className={cn("boost__right")} id="buyBoost">
//                <Button
//                   className={cn("boost__price")}
//                   onClick={openBoostBuyPopup}>
//                   <CoinWhiteBg size="small" iconName="BTC" />
//                   <span className="textShadow">{price}</span>
//                </Button>
//             </div>
//          </div>
//       );
//    }
//    return content;
// };

// export default BoostBlock;




import classNames from "classnames/bind";
import styles from "./BoostBlock.module.scss";
import { TBoostName, TLiga } from "../../types/globalTypes";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setBoostInfo } from "../../store/reducers/boost";
import axios from 'axios';
const cn = classNames.bind(styles);

interface IBoostBlockProps {
  boostName: TBoostName;
  price: string;
  earning: string;
  ligaName: TLiga;
  isBlocked?: boolean;
  isBought?: boolean;
  boosterId: number;
}

const BoostBlock = ({
  boostName,
  price,
  earning,
  ligaName,
  isBlocked = false,
  isBought = false,
  boosterId
}: IBoostBlockProps) => {
  const dispatch = useDispatch();

  async function applyBooster() {
    try {
      const response = await axios.post(`https://coinfarm.club/booster/apply/101/${boosterId}`);
      console.log('Booster applied:', response.data);
    } catch (error) {
      console.error('Error applying booster:', error);
    }
  }

  function openBoostBuyPopup() {
    dispatch(
      setBoostInfo({
        earning,
        price,
        name: boostName,
        imgSrc: `img/boosts/${boostName}.svg`,
      })
    );
    applyBooster();
  }

  let content;

  if (isBlocked) {
    content = (
      <>
        <div className={cn("boost", '_blur')}>
          <div className={cn("boost__left")}>
            <img
              src={`img/boosts/${boostName}.svg`}
              className={cn("boost__img")}
              alt={boostName}
            />
            <div className={cn("boost__info", "boostInfo")}>
              <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
                {boostName}
              </h3>
              <div className={cn("boostInfo__index")}>
                <img
                  src={`img/leagueIcons/${ligaName}.png`}
                  alt={ligaName}
                />
                <span className="textShadow">+ {earning}/h</span>
                <CoinWhiteBg size="small" iconName="BTC" />
              </div>
            </div>
          </div>

          <div className={cn("boost__right")} id="buyBoost">
            <Button
              className={cn("boost__price")}
              onClick={openBoostBuyPopup}
              disabled
            >
              <CoinWhiteBg size="small" iconName="BTC" />
              <span className="textShadow">{price}</span>
            </Button>
          </div>
        </div>
        <div className={cn("blocked")}>
          <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
          <strong className="textShadow">{ligaName} league</strong>
        </div>
      </>
    );
  } else if (isBought) {
    content = (
      <div className={cn("boost")}>
        <div className={cn("boost__left")}>
          <img
            src={`img/boosts/${boostName}.svg`}
            className={cn("boost__img")}
            alt={boostName}
          />
          <div className={cn("boost__info", "boostInfo")}>
            <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
              {boostName}
            </h3>
            <div className={cn("boostInfo__index")}>
              <img
                src={`img/leagueIcons/${ligaName}.png`}
                alt={ligaName}
              />
              <span className="textShadow">+ {earning}/h</span>
              <CoinWhiteBg size="small" iconName="BTC" />
            </div>
          </div>
        </div>
        <div
          className={cn("boost__right")}
          style={{
            height: "45px",
          }}
        >
          <img
            src="img/global/checkbox/green.svg"
            className={cn("boost__checkbox")}
            alt="Bought"
          />
        </div>
      </div>
    );
  } else {
    content = (
      <div className={cn("boost")}>
        <div className={cn("boost__left")}>
          <img
            src={`img/boosts/${boostName}.svg`}
            className={cn("boost__img")}
            alt={boostName}
          />
          <div className={cn("boost__info", "boostInfo")}>
            <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
              {boostName}
            </h3>
            <div className={cn("boostInfo__index")}>
              <img
                src={`img/leagueIcons/${ligaName}.png`}
                alt={ligaName}
              />
              <span className="textShadow">+ {earning}/h</span>
              <CoinWhiteBg size="small" iconName="BTC" />
            </div>
          </div>
        </div>

        <div className={cn("boost__right")} id="buyBoost">
          <Button
            className={cn("boost__price")}
            onClick={openBoostBuyPopup}
          >
            <CoinWhiteBg size="small" iconName="BTC" />
            <span className="textShadow">{price}</span>
          </Button>
        </div>
      </div>
    );
  }
  return content;
};

export default BoostBlock;
