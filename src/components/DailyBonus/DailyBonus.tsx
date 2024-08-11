




import { useAppDispatch, useAppSelector } from "../../store";
import { closeDailyBonus } from "../../store/reducers/dailyBonus";

import classNames from "classnames/bind";
import styles from "./DailyBonus.module.scss";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import { setUser } from "../../store/reducers/userSlice";
// import axios from "axios";
const cn = classNames.bind(styles);
interface Coin {
  name: string;
  value: number;
  cost: number
  // добавьте любые другие необходимые свойства
}
const DailyBonus = () => {
  const dispatch = useAppDispatch();
  const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);
  // const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);
  const [hasFirstReward, setHasFirstReward] = useState(true); // Состояние для проверки наличия награды "first"
  const [isDaily, setIsDaily] = useState(false); // Состояние для проверки наличия награды "first"

  const isLoading = useAppSelector((state) => state.preloader.isLodaing);
  const user = useAppSelector((state: RootState) => state.user.user);

  const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [currentDay, setCurrentDay] = useState(1); // Инициализируем currentDay как 1
  const [lastCoin, setLastCoin] = useState<Coin | null>(null);
  const coins = useAppSelector((state: RootState) => state.userCoins.coins);
  const [isFetchedRewards, setIsFetchedRewards] = useState(false);
  const [isFetchedRewards1, setIsFetchedRewards1] = useState(false);
console.log(lastCoin)
  useEffect(() => {
    console.log(user)
    if (coins.length > 0) {
      const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
        prev.cost > current.cost ? prev : current
      );
      setLastCoin(mostExpensiveCoin);
    }
  }, [coins]);
  // useEffect(() => {
  //   const fetchUserCoins = async () => {
  //     try {
  //       const response = await axios.get(`https://coinfarm.club/api/user/${user.id}/coins`);
  //       const coins = response.data;
  //       if (coins.length > 0) {
  //         const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) => (prev.cost > current.cost ? prev : current));
  //         setLastCoin(mostExpensiveCoin);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch user coins:', error);
  //     }
  //   };
  
  //   fetchUserCoins();
  // }, []);

  useEffect(() => {
    const fetchRewards = async () => {
       if (user?.id && !isFetchedRewards) {
          try {
             const response = await fetch(`https://coinfarm.club/api/reward/${user.id}`, {
                method: 'GET',
                headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                }
             });

             if (!response.ok) {
                throw new Error('Something went wrong');
             } else {
                const rewards = await response.json();
                const hasFirstReward = rewards.some((reward: any) => reward.type === 'first');
                setHasFirstReward(hasFirstReward);
                setIsFetchedRewards(true)
             }
          } catch (error) {
             console.error('Error:', error);
          }
       }
    };

    fetchRewards();
 }, [user]);
 useEffect(() => {
  const fetchRewards = async () => {
    if (user?.id && !isFetchedRewards1) {
      try {
        const response = await fetch(`https://coinfarm.club/api/reward/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        } else {
          const rewards = await response.json();
          const hasFirstReward = rewards.some((reward: any) => reward.type === 'first');
          setHasFirstReward(hasFirstReward);

          const dailyRewards = rewards.filter((reward: any) => reward.type === 'daily-reward');
          if (dailyRewards.length > 0) {
            const lastDailyReward = dailyRewards[dailyRewards.length - 1];
            const lastRewardDate = new Date(lastDailyReward.description);
            const now = new Date();
            // const diffInMinutes = (now.getTime() - lastRewardDate.getTime()) / (1000 * 60 * 60 * 24);
            const diffInMinutes = (now.getTime() - lastRewardDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diffInMinutes >= 1 && diffInMinutes < 2) {

              setIsDaily(true);
              let nextDay = lastDailyReward.level + 1;
              if (nextDay > bonuses.length) {
                nextDay = 1; // Начинаем заново с первого дня
              }
              setCurrentDay(nextDay);
              const nextBonus = bonuses.find(bonus => bonus.dayNumber === nextDay);
              if (nextBonus) {
                setBonusAmount(nextBonus.bonusAmount);
              } else {
                setBonusAmount(0); // Если бонус для следующего дня не найден, устанавливаем бонус в 0
              }
            }
            if(diffInMinutes >= 2){
              setCurrentDay(1);
              setBonusAmount(bonuses.find(bonus => bonus.dayNumber === 1)?.bonusAmount || 0);
            }
            // Если прошло больше 24 часов, сбрасываем день на первый
            


           
          } else {
            setIsDaily(true);
            setCurrentDay(1); // Если нет записей с типом daily-reward, установить currentDay как 1
            const firstBonus = bonuses.find(bonus => bonus.dayNumber === 1);
            if (firstBonus) {
              setBonusAmount(firstBonus.bonusAmount);
            }
          }
        }
        setIsFetchedRewards1(true)
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  fetchRewards();
}, [user, dispatch]);

//  useEffect(() => {
//   const fetchRewards = async () => {
//     if (user?.id) {
//       try {
//         const response = await fetch(`https://coinfarm.club/api/reward/${user.id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Something went wrong');
//         } else {
//           const rewards = await response.json();
//           const hasFirstReward = rewards.some((reward: any) => reward.type === 'first');
//           setHasFirstReward(hasFirstReward);

//           const dailyRewards = rewards.filter((reward: any) => reward.type === 'daily-reward');
//           if (dailyRewards.length > 0) {
//             const lastDailyReward = dailyRewards[dailyRewards.length - 1];
//             const lastRewardDate = new Date(lastDailyReward.description);
//             const now = new Date();
//             const diffInMinutes = (now.getTime() - lastRewardDate.getTime()) / (1000 * 60);

//             if (diffInMinutes >= 1) {
//               setIsDaily(true)
//             }

//             const nextDay = lastDailyReward.level + 1;
//             setCurrentDay(nextDay);
//             const nextBonus = bonuses.find(bonus => bonus.dayNumber === nextDay);
//             if (nextBonus) {
//               setBonusAmount(nextBonus.bonusAmount);
//             } else {
//               setBonusAmount(0); // Если бонус для следующего дня не найден, устанавливаем бонус в 0
//             }
//           } else {
//             setIsDaily(true)
//             setCurrentDay(1); // Если нет записей с типом daily-reward, установить currentDay как 1
//             const firstBonus = bonuses.find(bonus => bonus.dayNumber === 1);
//             if (firstBonus) {
//               setBonusAmount(firstBonus.bonusAmount);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   fetchRewards();
// }, [user, dispatch]);
  // async function recieveCoins() {
  //   if (user?.id && bonusAmount > 0) {
  //     try {
  //       const response = await fetch(`https://coinfarm.club/api/daily-reward/give/${user.id}/${currentDay}`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Something went wrong');
  //       } else {
  //         const updatedUser = await response.json();
  //         dispatch(setUser({
  //           ...updatedUser,
  //           coins: Number(updatedUser.coins),
  //           totalEarnings: Number(updatedUser.totalEarnings)
  //         })); // Обновляем данные пользователя в Redux
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }

  //     setMoneyAnimACtive(true);
  //     setTimeout(() => {
  //       setMoneyAnimACtive(false);
  //       dispatch(closeDailyBonus());
  //     }, 500);
  //   } else {
  //     console.error("User ID not found or bonus amount is zero");
  //   }
  // }
  async function recieveCoins() {
    if (user?.id && bonusAmount > 0) {
      try {
        const response = await fetch(`https://coinfarm.club/api/daily-reward/give/${user.id}/${currentDay}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong');
        } else {
          const updatedUser = await response.json();
          dispatch(setUser({
            ...updatedUser,
            coins: Number(updatedUser.coins),
            totalEarnings: Number(updatedUser.totalEarnings)
          })); // Обновляем данные пользователя в Redux
        }
  
        // Обновляем currentDay для следующего бонуса
        let nextDay = currentDay + 1;
        if (nextDay > bonuses.length) {
          nextDay = 1; // Начинаем заново с первого дня
        }
        setCurrentDay(nextDay);
        const nextBonus = bonuses.find(bonus => bonus.dayNumber === nextDay);
        if (nextBonus) {
          setBonusAmount(nextBonus.bonusAmount);
        } else {
          setBonusAmount(0); // Если бонус для следующего дня не найден, устанавливаем бонус в 0
  
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      setMoneyAnimACtive(true);
      setTimeout(() => {
        setMoneyAnimACtive(false);
        dispatch(closeDailyBonus());
      }, 500);
    } else {
      console.error("User ID not found or bonus amount is zero");
    }
  }
  const canShow = !isLoading && isDailyBonusOpen && hasFirstReward && isDaily;

  return (
    <div className={cn("dailyBonus", canShow && "_open")}>
      <div className={cn("dailyBonus__body")}>
        <img
          src="img/dailyBonus/border.svg"
          className={cn("dailyBonus__border")}
        />
        <strong className={cn("dailyBonus__label")}>Daily bonus</strong>
        <img
          src="img/global/closeIcon.svg"
          className={cn("dailyBonus__close")}
          onClick={() => dispatch(closeDailyBonus())}
          alt="Закрыть"
        />
        <div className={cn("dailyBonus__content", "content")}>
          <p className={cn("content__title")}>
            Collect coins for logging into <br /> the game every day
            without missing <br /> a day
          </p>
          <div className={cn("content__grid")}>
            <BonusBlock dayNumber={1} bonusAmount={1000} currentDay={currentDay === 1} />
            <BonusBlock dayNumber={2} bonusAmount={1500} currentDay={currentDay === 2} />
            <BonusBlock dayNumber={3} bonusAmount={2000} currentDay={currentDay === 3} />
            <BonusBlock dayNumber={4} bonusAmount={3000} currentDay={currentDay === 4} />
            <BonusBlock dayNumber={5} bonusAmount={5000} currentDay={currentDay === 5} />
            <BonusBlock dayNumber={6} bonusAmount={7000} currentDay={currentDay === 6} />
            <BonusBlock dayNumber={7} bonusAmount={10000} currentDay={currentDay === 7} />
            <BonusBlock dayNumber={8} bonusAmount={12000} currentDay={currentDay === 8} />
            <BonusBlock dayNumber={9} bonusAmount={15000} currentDay={currentDay === 9} />
            <BonusBlock dayNumber={10} bonusAmount={20000} currentDay={currentDay === 10} />
          </div>
          <Button
            size="big"
            className={cn("content__recieve-btn")}
            onClick={recieveCoins}
          >
            <CoinWhiteBg
              className={cn("content__recieve-btn-coin")}
              size="small"
            />
            <span className="textShadow">Get {bonusAmount}</span>
          </Button>
          <img
            className={cn(
              "content__money-anim",
              moneyAnimActive && "_acitve"
            )}
            // src={lastCoin ? `img/pages/home/${lastCoin.name}/money.svg` : `img/pages/home/money.svg`}
            src={`img/pages/home/money1.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default DailyBonus;

interface IBonusBlock {
  dayNumber: number;
  bonusAmount: number;
  recieved?: boolean;
  currentDay?: boolean;
}

const bonuses = [
  { dayNumber: 1, bonusAmount: 1000 },
  { dayNumber: 2, bonusAmount: 1500 },
  { dayNumber: 3, bonusAmount: 2000 },
  { dayNumber: 4, bonusAmount: 3000 },
  { dayNumber: 5, bonusAmount: 5000 },
  { dayNumber: 6, bonusAmount: 7000 },
  { dayNumber: 7, bonusAmount: 10000 },
  { dayNumber: 8, bonusAmount: 12000 },
  { dayNumber: 9, bonusAmount: 15000 },
  { dayNumber: 10, bonusAmount: 20000 }
];

const BonusBlock = ({
  dayNumber,
  bonusAmount,
  recieved,
  currentDay,
}: IBonusBlock) => {
  return (
    <div
      className={cn("bonusBlock", (recieved || currentDay) && "_available")}
    >
      <img
        src="img/dailyBonus/day-border.svg"
        className={cn("bonusBlock__border")}
      />
      <div className={cn("bonusBlock__content")}>
        <div className={cn("bonusBlock__dayNumber")}>
          <span className="textShadow"> Day {dayNumber}</span>
          {recieved && <img src="img/global/checkbox/green.svg" />}
        </div>
        <CoinWhiteBg className={cn("bonusBlock__dayCoin")} />
        <span className={cn("bonusBlock__bonusAmount") + " textShadow"}>
          {bonusAmount}
        </span>
      </div>
    </div>
  );
};
