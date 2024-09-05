// import classNames from "classnames/bind";
// import styles from "../Home.module.scss";
// const cn = classNames.bind(styles);

// interface CoinsProps {
//    quantity: string;
// }

// const Coins = ({ quantity }: CoinsProps) => {
//    return (
//       <div className={cn("coins")}>
//          <div className={cn("coins__video-wrap")}>
//             <img src="video/BTC.gif" alt="I'm a gif" />
//          </div>
//          <span className="textShadow">{quantity}</span>
//       </div>
//    );
// };

// export default Coins;


import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../store';
import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { RootState } from "../../../store";
import { setUserCoins1 } from '../../../store/reducers/userCoinsSlice';
import { useDispatch} from "react-redux";

const cn = classNames.bind(styles);

interface Coin {
  name: string;
  cost: number;
}

interface CoinsProps {
  quantity: string;
}

const Coins = ({ quantity }: CoinsProps) => {
  const user = useAppSelector((state) => state.user.user);
  const coins = useAppSelector((state: RootState) => state.userCoins.coins);
  const dispatch = useDispatch();

  const [mostExpensiveCoinName, setMostExpensiveCoinName] = useState<string | null>(null);
  const giveCoin = async (userId: number) => {
    const coinId = 2; // ID монеты
    try {
      const response = await axios.post(`https://coinfarm.club/api/coin/give/${userId}/${coinId}`);
      const response1 = await fetch(`https://coinfarm.club/api/user/${user.id}/coins`);
      const data = await response1.json();
      dispatch(setUserCoins1(data)); 
      console.log('Coin given:', response.data);
    } catch (error) {
      console.error('Error giving coin:', error);
    }
  };

  useEffect(() => {
    const fetchCoins = async (userId: number) => {
      try {
        
         if (coins.length === 0) {
        // Если у пользователя нет монет, выдаем монету с ID 1
        await giveCoin(userId);
      } else {
        // Найти самую дорогую монету
        const mostExpensiveCoin = coins.reduce((max:any, coin:Coin) => coin.cost > max.cost ? coin : max, coins[0]);
        console.log("Most expensive coin name:", mostExpensiveCoin.name);

        // Обновить состояние с именем самой дорогой монеты
        setMostExpensiveCoinName(mostExpensiveCoin.name);
      }
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    if (user) {
      console.log("User ID:", user.id);
      fetchCoins(user.id);
    }
  }, [coins]);


  const formatLargeNumber = (num: number, divisor: number, suffix: string): string => {
    const result = num / divisor;
    // Если дробная часть равна 0, отображаем целое число, иначе 3 знака после запятой
    return result % 1 === 0
      ? result.toFixed(0) + suffix // Целое число без десятичных
      : result.toFixed(3) + suffix; // Три знака после запятой
  };
  
  // Преобразование quantity к числу
  const numericQuantity = parseFloat(quantity);
  
  // Форматирование total
  const profileFormattedPrice = numericQuantity >= 1000000000
    ? formatLargeNumber(numericQuantity, 1000000000, 'B')
    : numericQuantity >= 1000000
    ? formatLargeNumber(numericQuantity, 1000000, 'M')
    : numericQuantity.toString();
  
  
  
  return (
    <div className={cn("coins")}>
      <div className={cn("coins__video-wrap")}>
      {mostExpensiveCoinName && <img src={`video/FarmCoin.gif`} alt="I'm a gif" />}
      </div>
      <span className="textShadow">{profileFormattedPrice}</span>
    </div>
  );
};

export default Coins;

