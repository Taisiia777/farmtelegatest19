import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import classNames from "classnames/bind";
import styles from "./FertilizersBlock.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFertilizersIfno } from "../../store/reducers/fertilizers";
import { TFertilizers } from "../../types/globalTypes";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'
const cn = classNames.bind(styles);

interface IFertilizersBlockProps {
  fertilizersName: TFertilizers;
  earning: string;
  price: string;
  isBought?: boolean;
  isBlocked?: boolean;
  isActive?: boolean;
  userId: number;
  fertilizersId: number;
  userCoins: number;
}

const FertilizersBlock = ({
  fertilizersName,
  earning,
  isBought = false,
  isBlocked = false,
  price,
  isActive = false,
  userId,
  fertilizersId,
  userCoins,
}: IFertilizersBlockProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fertilizersPrice = parseInt(price.replace(/\D/g, ''), 10); // Преобразуем цену в число
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
 

  function openFertilizersBuyPopup() {
    alert("kkk")
    dispatch(
      setFertilizersIfno({
        earning,
        price,
        name: fertilizersName,
        fertilizersId: fertilizersId
      })
    );
    // giveCoin();
  }
  const canAfford = userCoins >= fertilizersPrice; // Проверяем, хватает ли монет
  let content;

  if (isBought) {
    content = (
      <div className={cn("coinBlock")}>
        <div className={cn("coinBlock__left")}>
          <img
            className={cn("coinBlock__coin")}
            src={fertilizersName? `video/${fertilizersName}.gif` : `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow">{fertilizersName}</h3>
            <div className={cn("coinBlock__earning")}>
              <span>{earning} / {t(`h`)}</span>
              {/* <img src="img/coins/FarmCoin.svg" alt="Energy" /> */}
            </div>
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
      </div>
    );
  } else if (isBlocked) {
    content = (
      <div className={cn("coinBlock")}>
        <div className={cn("coinBlock__left")}>
          <img
            className={cn("coinBlock__coin")}
            src={fertilizersName? `video/${fertilizersName}.gif`: `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow">{fertilizersName}</h3>
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
            src={fertilizersName ? `video/${fertilizersName}.gif` :  `video/Bitcoin.gif`}
            alt=""
          />
          <div className={cn("coinBlock__info")}>
            <h3 className="textShadow">{fertilizersName}</h3>
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
            onClick={openFertilizersBuyPopup}
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

export default FertilizersBlock;
