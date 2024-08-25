import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import classNames from "classnames/bind";
import styles from "./FertilizersBlock.module.scss";
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
  level: number;

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
  level
}: IFertilizersBlockProps) => {
  console.log(isBlocked, isBought, isActive)
  const dispatch = useDispatch();
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
    dispatch(
      setFertilizersIfno({
        earning,
        price,
        name: fertilizersName,
        fertilizersId: fertilizersId,
        level: level
      })
    );
    // giveCoin();
  }
  const canAfford = userCoins >= fertilizersPrice; // Проверяем, хватает ли монет
  let content;

  content = (
    <div className={cn("coinBlock")}>
      <div className={cn("coinBlock__left")}>
        <img
          className={cn("coinBlock__coin")}
          src={fertilizersName ? `img/fertilizers/${fertilizersName}.png` :  ``}
          alt=""
        />
        <div className={cn("coinBlock__info")}>
          <h3 className="textShadow">{fertilizersName}</h3>
          <div className={cn("coinBlock__earning")}>
            <span>{earning} / {t(`h`)}</span>
            <span>Level {level}</span>
            {/* <img src="img/coins/FarmCoin.svg" alt="Energy" /> */}
          </div>
        </div>
      </div>
      <div className={cn("coinBlock__right")} id="buyFertilizers">
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

  return content;
};

export default FertilizersBlock;
