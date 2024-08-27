


import  { useEffect, useState } from 'react';
// import axios from 'axios';
import { useAppSelector } from '../../../store';
import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { RootState } from "../../../store";

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

  const [mostExpensiveCoinName, setMostExpensiveCoinName] = useState<string | null>(null);
  // const giveCoin = async (userId: number) => {
  //   const coinId = 2; // ID монеты
  //   try {
  //     const response = await axios.post(`https://coinfarm.club/api/coin/give/${userId}/${coinId}`);
  //     console.log('Coin given:', response.data);
  //   } catch (error) {
  //     console.error('Error giving coin:', error);
  //   }
  // };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        
         if (coins.length === 0) {
        // Если у пользователя нет монет, выдаем монету с ID 1
        // await giveCoin(userId);
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
      fetchCoins();
    }
  }, [coins]);

  // return (
  //   <div className={cn("coins")}>
  //     <div className={cn("coins__video-wrap")}>
  //     {mostExpensiveCoinName && <img src={`video/${mostExpensiveCoinName}.gif`} alt="I'm a gif" />}
  //     </div>
  //     <span className="textShadow">{quantity}</span>
  //   </div>
  // );
  return (
    <div className={cn("coins")}>
      <div className={cn("coins__video-wrap")}>
      {mostExpensiveCoinName && <img src={`video/FarmCoin.gif`} alt="I'm a gif" />}
      </div>
      <span className="textShadow">{quantity}</span>
    </div>
  );
};

export default Coins;

