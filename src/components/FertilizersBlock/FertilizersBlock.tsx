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
  const newPrice = parseInt(price.replace(/\D/g, ''), 10)
  const newEarning = parseInt(earning.replace(/\D/g, ''), 10)

  // const fertilizersPrice = parseInt(price.replace(/\D/g, ''), 10); // Преобразуем цену в число
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

  ;

    
    dispatch(
      setFertilizersIfno({
        earning: newEarning.toString(),  // Передаем рассчитанный доход в виде строки
        price: newPrice.toString(),  // Передаем рассчитанную цену в виде строки
        name: fertilizersName,
        fertilizersId: fertilizersId,
        level: level
      })
    );
    // giveCoin();
  }
  const canAfford = userCoins >= newPrice; // Проверяем, хватает ли монет
  const formattedPrice = newPrice >= 1000000 
? (newPrice / 1000000).toFixed(3) + 'M' 
: newPrice.toString();


const formattedIncome = newEarning >= 1000000 
  ? (newEarning / 1000000).toFixed(2) + 'M' 
  : newEarning >= 100000 
  ? (newEarning / 1000).toFixed(0) + 'K' 
  : newEarning.toString();

  let content;
  const getImageSrc = (fertilizersName: string) => {
    if (fertilizersName === "Humus Elixir" || fertilizersName === "Greenboost" || fertilizersName === "Megabloom" || fertilizersName === "Rootstrength" || fertilizersName === "Harvestmax" || fertilizersName === "Ecogro") {
      return `img/fertilizers/${fertilizersName}.svg`;
    }
    return `img/fertilizers/${fertilizersName}.png`;
  };
  content = (
    <div className={cn("coinBlock")}>
      <div className={cn("coinBlock__left")}>
        <img
          className={cn("coinBlock__coin")}
          src={getImageSrc(fertilizersName)}
          alt=""
        />
        <div className={cn("coinBlock__info")}>
          <h3 className="textShadow">{fertilizersName}</h3>
          <div className={cn("coinBlock__earning")}>
            <span>Level {level}</span>
            <span>+{formattedIncome} / {t(`h`)}</span>
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
          <span>{formattedPrice}</span>
        </Button>
        ) : (
          <Button
          className={cn("coinBlock__price")}
          disabled={!canAfford} // Делаем кнопку неактивной, если монет недостаточно
        >
          <CoinWhiteBg size="small" iconName={"Bitcoin"} />
          <span>{formattedPrice}</span>
        </Button>
        )}
      </div>
    </div>
  );

  return content;
};

export default FertilizersBlock;
