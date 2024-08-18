// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";

// import { TCoin } from "../../types/globalTypes";

// import classNames from "classnames/bind";
// import styles from "./CoinBlock.module.scss";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCoinIfno } from "../../store/reducers/coin";
// const cn = classNames.bind(styles);

// interface ICoinBlockProps {
//    coinName: TCoin;
//    earning: string;
//    price: string;
//    isBought?: boolean;
//    isBlocked?: boolean;
//    isActive?: boolean;
// }

// const CoinBlock = ({
//    coinName,
//    earning,
//    isBought = false,
//    isBlocked = false,
//    price,
//    isActive = false,
// }: ICoinBlockProps) => {
//    const dispatch = useDispatch();
//    const navigate = useNavigate();

//    function openCoinBuyPopup() {
//       dispatch(
//          setCoinIfno({
//             earning,
//             price,
//             name: coinName,
//          })
//       );
//    }

//    let content;

//    // Определяем тип контента монеты
//    // в зависимости от того купленна ли она уже
//    // или может заблокирована
//    if (isBought) {
//       content = (
//          <div className={cn("coinBlock")}>
//             <div className={cn("coinBlock__left")}>
//                <img
//                   className={cn("coinBlock__coin")}
//                   src={`video/${coinName}.gif`}
//                   alt=""
//                />
//                <div className={cn("coinBlock__info")}>
//                   <h3 className="textShadow">{coinName}</h3>
//                   <div className={cn("coinBlock__earning")}>
//                      <span>+{earning}</span>
//                      <img src="img/pages/home/energy/energy.svg" alt="Energy" />
//                   </div>
//                </div>
//             </div>
//             <div
//                className={cn("coinBlock__right")}
//                style={{
//                   height: "45px",
//                   paddingRight: "23.5px",
//                }}>
//                {isActive ? (
//                   <img
//                      src="img/global/checkbox/green.svg"
//                      className={cn("boost__checkbox")}
//                      alt="Bought"
//                   />
//                ) : (
//                   <img
//                      src="img/global/checkbox/grey.svg"
//                      className={cn("boost__checkbox")}
//                      alt="Bought"
//                   />
//                )}
//             </div>
//          </div>
//       );
//    } else if (isBlocked) {
//       content = (
//          <div className={cn("coinBlock")}>
//             <div className={cn("coinBlock__left")}>
//                <img
//                   className={cn("coinBlock__coin")}
//                   src={`video/${coinName}.gif`}
//                   alt=""
//                />
//                <div className={cn("coinBlock__info")}>
//                   <h3 className="textShadow">{coinName}</h3>
//                   <div className={cn("coinBlock__earning")}>
//                      <span>+{earning}</span>
//                      <img src="img/pages/home/energy/energy.svg" alt="Energy" />
//                   </div>
//                </div>
//             </div>
//             <div className={cn("coinBlock__right")}>
//                <div
//                   className={cn("coinBlock__invate")}
//                   style={{
//                      paddingRight: "10px",
//                   }}>
//                   <span>x10</span>
//                   <img
//                      onClick={() => navigate("/invite")}
//                      src="img/global/person-btn.svg"
//                      alt="Invite"
//                   />
//                </div>
//             </div>
//          </div>
//       );
//    } else {
//       content = (
//          <div className={cn("coinBlock")}>
//             <div className={cn("coinBlock__left")}>
//                <img
//                   className={cn("coinBlock__coin")}
//                   src={`video/${coinName}.gif`}
//                   alt=""
//                />
//                <div className={cn("coinBlock__info")}>
//                   <h3 className="textShadow">{coinName}</h3>
//                   <div className={cn("coinBlock__earning")}>
//                      <span>+{earning}</span>
//                      <img src="img/pages/home/energy/energy.svg" alt="Energy" />
//                   </div>
//                </div>
//             </div>
//             <div className={cn("coinBlock__right")} id="buyCoin">
//                <Button
//                   className={cn("coinBlock__price")}
//                   onClick={openCoinBuyPopup}>
//                   <CoinWhiteBg size="small" iconName={"BTC"} />
//                   <span>{price}</span>
//                </Button>
//             </div>
//          </div>
//       );
//    }

//    return content;
// };

// export default CoinBlock;
import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import { TCoin } from "../../types/globalTypes";
import classNames from "classnames/bind";
import styles from "./CoinBlock.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCoinIfno } from "../../store/reducers/coin";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'
const cn = classNames.bind(styles);

interface ICoinBlockProps {
  coinName: TCoin;
  earning: string;
  price: string;
  isBought?: boolean;
  isBlocked?: boolean;
  isActive?: boolean;
  userId: number;
  coinId: number;
  userCoins: number;
  mostExpensiveCoinId: number
}

const CoinBlock = ({
  coinName,
  earning,
  isBought = false,
  isBlocked = false,
  price,
  isActive = false,
  userId,
  coinId,
  userCoins,
  mostExpensiveCoinId
}: ICoinBlockProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coinPrice = parseInt(price.replace(/\D/g, ''), 10); // Преобразуем цену в число
  const { t } = useTranslation();
  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
    }
  }, []);
console.log(userId)
 

  function openCoinBuyPopup() {
    dispatch(
      setCoinIfno({
        earning,
        price,
        name: coinName,
        coinId: coinId
      })
    );
    // giveCoin();
  }
  const canAfford = userCoins >= coinPrice && coinId <= mostExpensiveCoinId + 1; // Проверяем, хватает ли монет
  let content;

  if (isBought) {
    content = (
      <div className={cn("coinBlock")}>
        <div className={cn("coinBlock__left")}>
          <img
            className={cn("coinBlock__coin")}
            src={coinName? `video/${coinName}.gif` : `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow" style={{display: 'flex', position:'absolute', top:'20%',}}>{coinName}</h3>
            <div className={cn("coinBlock__earning")}>
              <span style={{display: 'flex', position:'absolute', top:'50%', border:'1px solid red', width:'100px'}}>level 1</span>
              
            </div>
            {/* <div className={cn("coinBlock__earning")}>
              <span>{coinName==="Bitcoin"? 1000 : earning} / {t(`h`)}</span>
              <img src="img/coins/FarmCoin.svg" alt="Energy" />
            </div> */}
    
          </div>
        </div>
        <div
          className={cn("coinBlock__right")}
          style={{
            height: "45px",
            paddingRight: "23.5px",
          }}
        >
          {isActive ? (
            <img
              src="img/global/checkbox/green.svg"
              className={cn("boost__checkbox")}
              alt="Bought"
            />
          ) : (
            <img
              src="img/global/checkbox/grey.svg"
              className={cn("boost__checkbox")}
              alt="Bought"
            />
          )}
        </div>
        <div className={cn("ligaBlockInfo__bottom")} style={{display: 'flex', position:'absolute', top:'65%', width: '65%',  left: '0'}}>
          <img src="img/ligaBlock/percent.svg" alt="" style={{}}/>
          <div className={cn("ligaBlockInfo__percentWrap")}>
         
            <div
              className={cn("ligaBlockInfo__percent")}
              style={{  width: `50%` }}
            ></div>
          
          </div>
        </div>
      </div>
    );
  } else if (isBlocked) {
    content = (
      <div className={cn("coinBlock")}>
        <div className={cn("coinBlock__left")}>
          <img
            className={cn("coinBlock__coin")}
            src={coinName? `video/${coinName}.gif`: `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow">{coinName}</h3>
            <div className={cn("coinBlock__earning")}>
            <span>{earning} / {t(`h`)}</span>
            {/* <img src="img/coins/FarmCoin.svg" alt="Energy" /> */}
            </div>
          </div>
        </div>
        <div className={cn("coinBlock__right")}>
          <div
            className={cn("coinBlock__invate")}
            style={{
              paddingRight: "10px",
            }}
          >
            <span>x10</span>
            <img
              onClick={() => navigate("/invite")}
              src="img/global/person-btn.svg"
              alt="Invite"
            />
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={cn("coinBlock")}>
        <div className={cn("coinBlock__left")}>
          <img
            className={cn("coinBlock__coin")}
            src={coinName ? `video/${coinName}.gif` :  `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow">{coinName}</h3>
            <div className={cn("coinBlock__earning")}>
              <span>{earning} / {t(`h`)}</span>
              {/* <img src="img/coins/FarmCoin.svg" alt="Energy" /> */}
            </div>
          </div>
        </div>
        <div className={cn("coinBlock__right")} id="buyCoin">
          {/* <Button
            className={cn("coinBlock__price")}
            onClick={openCoinBuyPopup}
          >
            <CoinWhiteBg size="small" iconName={"BTC"} />
            <span>{price}</span>
          </Button> */}
          {canAfford ? (
            <Button
            className={cn("coinBlock__price")}
            onClick={openCoinBuyPopup}
          >
            <CoinWhiteBg size="small" iconName={"Bitcoin"} />
            <span>{price}</span>
          </Button>
          ) : (
            <Button
            className={cn("coinBlock__price")}
            disabled={!canAfford} // Делаем кнопку неактивной, если монет недостаточно
          >
            <CoinWhiteBg size="small" iconName={"Bitcoin"} />
            <span>{price}</span>
          </Button>
          )}
        </div>
        
      </div>
    );
  }

  return content;
};

export default CoinBlock;
