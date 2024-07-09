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
  const [mostExpensiveCoinName, setMostExpensiveCoinName] = useState<string>("BTC");

  useEffect(() => {
    const fetchCoins = async (userId: number) => {
      try {
        const response = await axios.get<Coin[]>(`https://coinfarm.club/user/${userId}/coins`);
        const coins = response.data;

        // Найти самый дорогой элемент
        const mostExpensiveCoin = coins.reduce((max: Coin, coin: Coin) => coin.cost > max.cost ? coin : max, coins[0]);
        console.log("Most expensive coin name:", mostExpensiveCoin.name);

        // Обновить состояние с именем самой дорогой монеты
        setMostExpensiveCoinName(mostExpensiveCoin.name);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    if (user) {
      console.log("User ID:", user.id);
      fetchCoins(user.id);
    }
  }, [user]);

  return (
    <div className={cn("coins")}>
      <div className={cn("coins__video-wrap")}>
        <img src={`video/${mostExpensiveCoinName}.gif`} alt="I'm a gif" />
      </div>
      <span className="textShadow">{quantity}</span>
    </div>
  );
};

export default Coins;

