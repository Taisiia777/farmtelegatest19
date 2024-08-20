
import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import { TCoin } from "../../types/globalTypes";
import classNames from "classnames/bind";
import styles from "./CoinBlock.module.scss";
// import { useNavigate } from "react-router-dom";
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
  mostExpensiveCoinId: number;
  perсent: string;
  level: string
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
  mostExpensiveCoinId,
  perсent,
  level
}: ICoinBlockProps) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
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
 


  // function openCoinBuyPopup() {
  //   // Если монета куплена, рассчитываем цену с учетом уровня
  //   const calculatedPrice = isBought 
  //     ? Math.round(coinPrice * Math.pow(1.1, levelNumber)) 
  //     : coinPrice;
  
  //   dispatch(
  //     setCoinIfno({
  //       earning,
  //       price: calculatedPrice.toString(),  // Передаем рассчитанную цену в виде строки
  //       name: coinName,
  //       coinId: coinId,
  //       level: levelNumber
  //     })
  //   );
  // }
  function openCoinBuyPopup() {
    // Рассчитываем уровень дохода на основе уровня монеты
    const baseEarning = parseInt(earning.replace(/\D/g, ''), 10); // Преобразуем доход в число
  
    // Если монета куплена, рассчитываем цену и доход с учетом уровня
    const calculatedPrice = isBought 
      ? Math.round(coinPrice * Math.pow(1.1, levelNumber)) 
      : coinPrice;
  
    const calculatedEarning = isBought
      ? Math.round(baseEarning * Math.pow(1.1, levelNumber)) 
      : baseEarning;
  
    dispatch(
      setCoinIfno({
        earning: calculatedEarning.toString(),  // Передаем рассчитанный доход в виде строки
        price: calculatedPrice.toString(),  // Передаем рассчитанную цену в виде строки
        name: coinName,
        coinId: coinId,
        level: levelNumber
      })
    );
  }
  
  const canAfford = userCoins >= coinPrice && coinId <= mostExpensiveCoinId + 1; // Проверяем, хватает ли монет
  const levelNumber = parseInt(level, 10); // Парсинг строки в число с основанием 10 (десятичная система)
  const percentNumber = parseInt(perсent, 10); // Парсинг строки в число с основанием 10 (десятичная система)

  const canUpdate = userCoins >= coinPrice * Math.pow(1.1, levelNumber);  
  let content;

  // const persentNumber = parseFloat(perсent); // Convert the percentage string to a number

  // if (isBought && persentNumber >= 100) {
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
              <span style={{display: 'flex', position:'absolute', top:'50%', width:'100px'}}>level {level}</span>
              
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
  
          { isActive && percentNumber < 100 ? (

            <div id="buyCoin1">
                                {canUpdate && percentNumber <= 100 ? (
            <Button
            className={cn("coinBlock__price")}
            onClick={() => {
            
                openCoinBuyPopup();
             
            }}
          

          >
            <CoinWhiteBg size="small" iconName={"Bitcoin"} />
            <span>{Math.round(coinPrice * Math.pow(1.1, levelNumber))}</span>

          </Button>
          ) : (
            <Button
            className={cn("coinBlock__price")}
            disabled={!canUpdate} // Делаем кнопку неактивной, если монет недостаточно
          >
            <CoinWhiteBg size="small" iconName={"Bitcoin"} />
            <span>{Math.round(coinPrice * Math.pow(1.1, levelNumber))}</span>
          </Button>
          )}
            
            </div>

          ): (
            <>
            {percentNumber >= 100 ? (
            <img
              src="img/global/checkbox/green.svg"
              className={cn("boost__checkbox")}
              alt="Bought"
            />
          ) : (
            <div id="buyCoin2">
            {canUpdate && percentNumber <= 100 ? (
<Button
className={cn("coinBlock__price")}
// onClick={openCoinBuyPopup}
onClick={() => {
  if (coinId <= mostExpensiveCoinId) {
    openCoinBuyPopup();
  }
}}
disabled={coinId > mostExpensiveCoinId} 
>
<CoinWhiteBg size="small" iconName={"Bitcoin"} />
<span>{Math.round(coinPrice * Math.pow(1.1, levelNumber))}</span>
</Button>
) : (
<Button
className={cn("coinBlock__price")}
disabled={!canUpdate} // Делаем кнопку неактивной, если монет недостаточно
>
<CoinWhiteBg size="small" iconName={"Bitcoin"} />
<span>{Math.round(coinPrice * Math.pow(1.1, levelNumber))}</span>
</Button>
)}

</div>
          )}
            </>
          )
            
          }


        </div>
        <div className={cn("ligaBlockInfo__bottom")} style={{display: 'flex', position:'absolute', top:'65%', width: '70%',  left: '24%'}}>
          <img src="img/ligaBlock/percent.svg" alt="" style={{}}/>
          <div className={cn("ligaBlockInfo__percentWrap")}>
         
            <div
              className={cn("ligaBlockInfo__percent")}
              style={{ left:'2%',  width: `${perсent}%` }}
            ></div>
          
          </div>
        </div>
      </div>
    );
  }  else {
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
            disabled={!canAfford || isBlocked} // Делаем кнопку неактивной, если монет недостаточно
          >
            <CoinWhiteBg size="small" iconName={"Bitcoin"} />
            <span>{price}</span>
            <span>{isBlocked}</span>

          </Button>
          )}
        </div>

      </div>
    );
  }

  return content;
};

export default CoinBlock;
