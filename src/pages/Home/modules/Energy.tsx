import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { RootState } from "../../../store";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
const cn = classNames.bind(styles);

type TCoin =
   | "Bitcoin"
   | "Ethereum"
   | "BNB"
   | "Cardano"
   | "Solana"
   | "Ripple"
   | "Polkadot"
   | "Ton";
interface EnergyProps {
  iconName?: TCoin | string;
   total: number;
   current: number;
   onClick: () => void;
   onClickProgresbar: () => void;
   onClickProgresbarHarvest: () => void;
   version: number;
   inHour: number;
   hours: number;

   isRain: boolean;

}
interface Coin {
   id: number
   name: string;
   value: number;
   cost: number
 }
//  const leagues = [
//   { name: "Wooden", referralsRequired: 3, referralsTo: 0, harvest: 1 },
//   { name: "Silver", referralsRequired: 10, referralsTo: 3, harvest: 1.5 },
//   { name: "Gold", referralsRequired: 50, referralsTo: 10, harvest: 2 },
//   { name: "Fire", referralsRequired: 200, referralsTo: 50, harvest: 3 },
//   { name: "Diamond", referralsRequired: 1000, referralsTo: 200, harvest: 4 },
//   { name: "Ruby", referralsRequired: 1001, referralsTo: 1000, harvest: 5 },
// ];
const Energy = ({ total, current, onClick, onClickProgresbar, onClickProgresbarHarvest, version, inHour, isRain, hours, iconName  }: EnergyProps) => {
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
   const progressPercentage = (current / total) * 100;
   const containerStyle: React.CSSProperties = version === 1 
   ? {  position: 'absolute', top: '400px', right: '-80px', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left top', zIndex: '1', width: '130px', height: '26px',  
    }
   : {};
   const [lastCoin, setLastCoin] = useState<Coin | null>(null);
  //  const user = useAppSelector((state: RootState) => state.user.user);
   const coins = useAppSelector((state: RootState) => state.userCoins.coins);
   useEffect(() => {
      if (coins.length > 0) {
        const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
          prev.cost > current.cost ? prev : current
        );
        setLastCoin(mostExpensiveCoin);
      }
    }, [coins]);
 
    const resolvedIconName = lastCoin ? lastCoin.name : iconName || 'Bitcoin';
  //   const userLeagueIndex = user ? user.level : 0;
  // const userHarvestMultiplier = leagues[userLeagueIndex]?.harvest || 1;
  // const calculatedInHour = inHour * userHarvestMultiplier;

  // const energyTotalFormattedPrice = total >= 1000000000 
  // ? (total / 1000000000).toFixed(3) + 'b'
  // : total >= 1000000 
  // ? (total / 1000000).toFixed(3) + 'm'
  // : total.toString();
  // const energyCurrentFormattedPrice = current >= 1000000000 
  // ? (current / 1000000000).toFixed(3) + 'b'
  // : current >= 1000000 
  // ? (current / 1000000).toFixed(3) + 'm'
  // : current.toString();

  // const energyInHourFormattedPrice = typeof inHour === 'number' && inHour >= 1000000000 
  // ? (inHour / 1000000000).toFixed(3) + 'b'
  // : typeof inHour === 'number' && inHour >= 1000000 
  // ? (inHour / 1000000).toFixed(3) + 'm'
  // : typeof inHour === 'number'
  // ? inHour.toString()
  // : '0'; // Добавляем fallback на случай, если inHour не число
  const formatLargeNumber = (num: number, divisor: number, suffix: string): string => {
    return num % divisor === 0 
    ? (num / divisor).toFixed(0) + suffix // Без точки, если делится без остатка
    : (num / divisor).toFixed(3) + suffix; // С дробной частью, если остаток есть
};

// Форматирование total
const energyTotalFormattedPrice = total >= 1000000000 
  ? formatLargeNumber(total, 1000000000, 'B')
  : total >= 1000000 
  ? formatLargeNumber(total, 1000000, 'M')
  : total.toString();

// Форматирование current
const energyCurrentFormattedPrice = current >= 1000000000 
  ? formatLargeNumber(current, 1000000000, 'B')
  : current >= 1000000 
  ? formatLargeNumber(current, 1000000, 'M')
  : current.toString();

// Форматирование inHour
const energyInHourFormattedPrice = typeof inHour === 'number' && inHour >= 1000000000 
  ? formatLargeNumber(inHour, 1000000000, 'B')
  : typeof inHour === 'number' && inHour >= 1000000 
  ? formatLargeNumber(inHour, 1000000, 'M')
  : typeof inHour === 'number'
  ? inHour.toString()
  : '0'; // Добавляем fallback на случай, если inHour не число
   return (
      <div className={cn("energy")} id="energy" style={containerStyle} >
          {version === 0 && (
        <>
        <div onClick={onClickProgresbar} style={{
            display: 'flex',
            position: 'absolute',
            top: '-30px',
            left: "50%",
            width: 'max-content',
            height: '22px',
            transform: "translateX(-50%)",
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1'
          }}>
    
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFF',
              marginRight: '10px',
            }}>⏰ {t('harvest_every')} {hours}{t('h')}</span>
            <img
              src="img/leagueIcons/Plus.svg" // Replace with the path to your plus icon
              alt="Plus"
              style={{ width: '22px', height: '22px' }}
            />
          </div>
         <div onClick={onClickProgresbarHarvest} style={{
            display: 'flex',
            position: 'absolute',
            top: '-60px',
            left: "50%",
            width: '180px',
            height: '22px',
            transform: "translateX(-50%)",
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1'
          }}>
            <img
              // src="img/coins/FarmCoin.svg" 
              src={`img/coins/${resolvedIconName}.svg`}
              alt="Farmcoin"
              style={{ width: '22px', height: '22px', marginRight: '10px' }}
              
            />
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFF',
              marginRight: '10px',
            }}>{energyInHourFormattedPrice} / 1{t('h')}</span>
            <img
              src="img/leagueIcons/Plus.svg" // Replace with the path to your plus icon
              alt="Plus"
              style={{ width: '22px', height: '22px' }}
            />
          </div>
          
        
        </>
        

          

        )}
         {/* Главная доска */}
         
      {version === 1 ? (
          <img
          src="img/pages/home/energy/board1.svg"
          className={cn("energy__board1")}
          alt="Energy board"
       />
        ):
        (<img
         src="img/pages/home/energy/board.svg"
         style={{top:'-7%'}}
         className={cn("energy__board")}
         alt="Energy board"
      />)
        }
         {/* Иконка энергии */}
         {version === 1 && (
          <img
          src="img/pages/home/energy/progresbarCloud.png"
          className={cn("energy__icon", { shake: !isRain })}
          alt="Energy"
       />
        )}
        

         {/* Прогресс бар */}
         <div className={cn("energy__progressBarWrap")} onClick={onClick} >
            <div
               className={cn({ "energy__progressBar": version !== 1, "energy__progressBar1": version === 1 })}
               style={{ width: `${progressPercentage}%` }}
               
            ></div>
            {version !== 1 && (
          <span>
            {energyCurrentFormattedPrice} / {energyTotalFormattedPrice}
          </span>
        )}
         </div>
      </div>
   );
};

export default Energy;

