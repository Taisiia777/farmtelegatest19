// import { useAppDispatch, useAppSelector } from "../../store";
// import { closeDailyBonus } from "../../store/reducers/dailyBonus";

// import classNames from "classnames/bind";
// import styles from "./DailyBonus.module.scss";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// import Button from "../Button/Button";
// import { useState, useEffect } from "react";
// import { RootState } from "../../store";
// import { setUser } from "../../store/reducers/userSlice";
// const cn = classNames.bind(styles);

// const DailyBonus = () => {
//    const dispatch = useAppDispatch();
//    const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);
//    const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

//    // Состояние прелоудреа
//    const isLoading = useAppSelector((state) => state.preloader.isLodaing);
//    const user = useAppSelector((state: RootState) => state.user.user);

//    const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
//    const [bonusAmount, setBonusAmount] = useState(0);

//    // function recieveCoins() {
//    //    setMoneyAnimACtive(true);

//    //    setTimeout(() => {
//    //       setMoneyAnimACtive(false);
//    //       dispatch(closeDailyBonus());
//    //    }, 500);
//    // }

//    useEffect(() => {
//       // Находим бонус для текущего дня
//       const currentBonus = bonuses.find(bonus => bonus.currentDay);
//       if (currentBonus) {
//          setBonusAmount(currentBonus.bonusAmount);
//       }
//    }, []);

//    async function recieveCoins() {
//       if (user?.id && bonusAmount > 0) {
//          try {
//             const response = await fetch(`https://coinfarm.club/daily-reward/give/${user.id}/5`, {
//                method: 'POST',
//                headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//                }
//             });

//             if (!response.ok) {
//                throw new Error('Something went wrong');
//             } else {
//                const updatedUser = await response.json();
//                dispatch(setUser({
//                   ...updatedUser,
//                   coins: Number(updatedUser.coins),
//                   totalEarnings: Number(updatedUser.totalEarnings)
//                })); // Обновляем данные пользователя в Redux
//             }
//          } catch (error) {
//             console.error('Error:', error);
//          }

//          setMoneyAnimACtive(true);
//          setTimeout(() => {
//             setMoneyAnimACtive(false);
//             dispatch(closeDailyBonus());
//          }, 500);
//       } else {
//          console.error("User ID not found or bonus amount is zero");
//       }
//    }

//    // True, если прелоадер, приветсвенные попапы уже отключены
//    const canShow = !isLoading && isDailyBonusOpen && !isGreetingOpen;

//    return (
//       <div className={cn("dailyBonus", canShow && "_open")}>
//          <div className={cn("dailyBonus__body")}>
//             {/* Popup's Border */}
//             <img
//                src="img/dailyBonus/border.svg"
//                className={cn("dailyBonus__border")}
//             />

//             {/* Надпись на popup-border */}
//             <strong className={cn("dailyBonus__label")}>Daily bonus</strong>

//             {/* Иконка закрытия попапа */}
//             <img
//                src="img/global/closeIcon.svg"
//                className={cn("dailyBonus__close")}
//                onClick={() => dispatch(closeDailyBonus())}
//                alt="Закрыть"
//             />

//             <div className={cn("dailyBonus__content", "content")}>
//                <p className={cn("content__title")}>
//                   Collect coins for logging into <br /> the game every day
//                   without missing <br /> a day
//                </p>

//                <div className={cn("content__grid")}>
//                   {/* <BonusBlock dayNumber={1} bonusAmount={10} recieved /> */}
//                   <BonusBlock dayNumber={1} bonusAmount={10} currentDay />
//                   <BonusBlock dayNumber={2} bonusAmount={20}  />
//                   <BonusBlock dayNumber={3} bonusAmount={50} />
//                   <BonusBlock dayNumber={4} bonusAmount={100} />
//                   <BonusBlock dayNumber={5} bonusAmount={200} />
//                   <BonusBlock dayNumber={6} bonusAmount={300} />
//                   <BonusBlock dayNumber={7} bonusAmount={500} />
//                   <BonusBlock dayNumber={8} bonusAmount={800} />
//                   <BonusBlock dayNumber={9} bonusAmount={1000} />
//                   <BonusBlock dayNumber={10} bonusAmount={2000} />
//                </div>

//                <Button
//                   size="big"
//                   className={cn("content__recieve-btn")}
//                   onClick={recieveCoins}>
//                   <CoinWhiteBg
//                      className={cn("content__recieve-btn-coin")}
//                      size="small"
//                   />
//                   <span className="textShadow">Collect 20</span>
//                </Button>

//                <img
//                   className={cn(
//                      "content__money-anim",
//                      moneyAnimActive && "_acitve"
//                   )}
//                   src="img/pages/home/money.svg"
//                   alt=""
//                />
//             </div>
//          </div>
//       </div>
//    );
// };

// export default DailyBonus;

// interface IBonusBlock {
//    dayNumber: number;
//    bonusAmount: number;
//    recieved?: boolean;
//    currentDay?: boolean;
// }
// const bonuses = [
//    { dayNumber: 1, bonusAmount: 10, currentDay: true },
//    { dayNumber: 2, bonusAmount: 20 },
//    { dayNumber: 3, bonusAmount: 50 },
//    { dayNumber: 4, bonusAmount: 100 },
//    { dayNumber: 5, bonusAmount: 200 },
//    { dayNumber: 6, bonusAmount: 300 },
//    { dayNumber: 7, bonusAmount: 500 },
//    { dayNumber: 8, bonusAmount: 800 },
//    { dayNumber: 9, bonusAmount: 1000 },
//    { dayNumber: 10, bonusAmount: 2000 }
// ];
// const BonusBlock = ({
//    dayNumber,
//    bonusAmount,
//    recieved,
//    currentDay,
// }: IBonusBlock) => {
//    return (
//       <div
//          className={cn("bonusBlock", (recieved || currentDay) && "_available")}>
//          <img
//             src="img/dailyBonus/day-border.svg"
//             className={cn("bonusBlock__border")}
//          />

//          <div className={cn("bonusBlock__content")}>
//             <div className={cn("bonusBlock__dayNumber")}>
//                <span className="textShadow"> Day {dayNumber}</span>
//                {recieved && <img src="img/global/checkbox/green.svg" />}
//             </div>
//             <CoinWhiteBg className={cn("bonusBlock__dayCoin")} />
//             <span className={cn("bonusBlock__bonusAmount") + " textShadow"}>
//                {bonusAmount}
//             </span>
//          </div>
//       </div>
//    );
// };









// import { useAppDispatch, useAppSelector } from "../../store";
// import { closeDailyBonus } from "../../store/reducers/dailyBonus";

// import classNames from "classnames/bind";
// import styles from "./DailyBonus.module.scss";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// import Button from "../Button/Button";
// import { useState, useEffect } from "react";
// import { RootState } from "../../store";
// import { setUser } from "../../store/reducers/userSlice";
// const cn = classNames.bind(styles);

// const DailyBonus = () => {
//   const dispatch = useAppDispatch();
//   const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);
//   const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

//   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
//   const user = useAppSelector((state: RootState) => state.user.user);

//   const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
//   const [bonusAmount, setBonusAmount] = useState(0);
//   const [currentDay, setCurrentDay] = useState(1); // Состояние для текущего дня

//   useEffect(() => {
//     // Находим бонус для текущего дня
//     const currentBonus = bonuses.find(bonus => bonus.currentDay);
//     if (currentBonus) {
//       setBonusAmount(currentBonus.bonusAmount);
//       setCurrentDay(currentBonus.dayNumber); // Устанавливаем текущий день
//     }
//   }, []);

//   async function recieveCoins() {
//     if (user?.id && bonusAmount > 0) {
//       try {
//         const response = await fetch(`https://coinfarm.club/daily-reward/give/${user.id}/${currentDay}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Something went wrong');
//         } else {
//           const updatedUser = await response.json();
//           dispatch(setUser({
//             ...updatedUser,
//             coins: Number(updatedUser.coins),
//             totalEarnings: Number(updatedUser.totalEarnings)
//           })); // Обновляем данные пользователя в Redux
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }

//       setMoneyAnimACtive(true);
//       setTimeout(() => {
//         setMoneyAnimACtive(false);
//         dispatch(closeDailyBonus());
//       }, 500);
//     } else {
//       console.error("User ID not found or bonus amount is zero");
//     }
//   }

//   const canShow = !isLoading && isDailyBonusOpen && !isGreetingOpen;

//   return (
//     <div className={cn("dailyBonus", canShow && "_open")}>
//       <div className={cn("dailyBonus__body")}>
//         <img
//           src="img/dailyBonus/border.svg"
//           className={cn("dailyBonus__border")}
//         />
//         <strong className={cn("dailyBonus__label")}>Daily bonus</strong>
//         <img
//           src="img/global/closeIcon.svg"
//           className={cn("dailyBonus__close")}
//           onClick={() => dispatch(closeDailyBonus())}
//           alt="Закрыть"
//         />
//         <div className={cn("dailyBonus__content", "content")}>
//           <p className={cn("content__title")}>
//             Collect coins for logging into <br /> the game every day
//             without missing <br /> a day
//           </p>
//           <div className={cn("content__grid")}>
//             <BonusBlock dayNumber={1} bonusAmount={10} currentDay />
//             <BonusBlock dayNumber={2} bonusAmount={20} />
//             <BonusBlock dayNumber={3} bonusAmount={50} />
//             <BonusBlock dayNumber={4} bonusAmount={100} />
//             <BonusBlock dayNumber={5} bonusAmount={200} />
//             <BonusBlock dayNumber={6} bonusAmount={300} />
//             <BonusBlock dayNumber={7} bonusAmount={500} />
//             <BonusBlock dayNumber={8} bonusAmount={800} />
//             <BonusBlock dayNumber={9} bonusAmount={1000} />
//             <BonusBlock dayNumber={10} bonusAmount={2000} />
//           </div>
//           <Button
//             size="big"
//             className={cn("content__recieve-btn")}
//             onClick={recieveCoins}
//           >
//             <CoinWhiteBg
//               className={cn("content__recieve-btn-coin")}
//               size="small"
//             />
//             <span className="textShadow">Collect {bonusAmount}</span>
//           </Button>
//           <img
//             className={cn(
//               "content__money-anim",
//               moneyAnimActive && "_acitve"
//             )}
//             src="img/pages/home/money.svg"
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DailyBonus;

// interface IBonusBlock {
//   dayNumber: number;
//   bonusAmount: number;
//   recieved?: boolean;
//   currentDay?: boolean;
// }

// const bonuses = [
//   { dayNumber: 1, bonusAmount: 10, currentDay: true },
//   { dayNumber: 2, bonusAmount: 20 },
//   { dayNumber: 3, bonusAmount: 50 },
//   { dayNumber: 4, bonusAmount: 100 },
//   { dayNumber: 5, bonusAmount: 200 },
//   { dayNumber: 6, bonusAmount: 300 },
//   { dayNumber: 7, bonusAmount: 500 },
//   { dayNumber: 8, bonusAmount: 800 },
//   { dayNumber: 9, bonusAmount: 1000 },
//   { dayNumber: 10, bonusAmount: 2000 }
// ];

// const BonusBlock = ({
//   dayNumber,
//   bonusAmount,
//   recieved,
//   currentDay,
// }: IBonusBlock) => {
//   return (
//     <div
//       className={cn("bonusBlock", (recieved || currentDay) && "_available")}
//     >
//       <img
//         src="img/dailyBonus/day-border.svg"
//         className={cn("bonusBlock__border")}
//       />
//       <div className={cn("bonusBlock__content")}>
//         <div className={cn("bonusBlock__dayNumber")}>
//           <span className="textShadow"> Day {dayNumber}</span>
//           {recieved && <img src="img/global/checkbox/green.svg" />}
//         </div>
//         <CoinWhiteBg className={cn("bonusBlock__dayCoin")} />
//         <span className={cn("bonusBlock__bonusAmount") + " textShadow"}>
//           {bonusAmount}
//         </span>
//       </div>
//     </div>
//   );
// };



import { useAppDispatch, useAppSelector } from "../../store";
import { closeDailyBonus } from "../../store/reducers/dailyBonus";

import classNames from "classnames/bind";
import styles from "./DailyBonus.module.scss";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import { setUser } from "../../store/reducers/userSlice";
const cn = classNames.bind(styles);

const DailyBonus = () => {
  const dispatch = useAppDispatch();
  const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);
  const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

  const isLoading = useAppSelector((state) => state.preloader.isLodaing);
  const user = useAppSelector((state: RootState) => state.user.user);

  const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [currentDay, setCurrentDay] = useState(0); // Инициализируем currentDay как 0

  useEffect(() => {
    const fetchRewards = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`https://coinfarm.club/reward/${user.id}`, {
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
            const dailyRewards = rewards.filter((reward: any) => reward.type === 'daily-reward');
            if (dailyRewards.length > 0) {
              const lastDailyReward = dailyRewards[dailyRewards.length - 1];
              setCurrentDay(lastDailyReward.level);
              const currentBonus = bonuses.find(bonus => bonus.dayNumber === lastDailyReward.level);
              if (currentBonus) {
                setBonusAmount(currentBonus.bonusAmount);
              }
            } else {
              setCurrentDay(0); // Если нет записей с типом daily-reward, установить currentDay как 0
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchRewards();
  }, [user]);

  async function recieveCoins() {
    if (user?.id && bonusAmount > 0 && currentDay > 0) {
      try {
        const response = await fetch(`https://coinfarm.club/daily-reward/give/${user.id}/${currentDay}`, {
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
      } catch (error) {
        console.error('Error:', error);
      }

      setMoneyAnimACtive(true);
      setTimeout(() => {
        setMoneyAnimACtive(false);
        dispatch(closeDailyBonus());
      }, 500);
    } else {
      console.error("User ID not found, bonus amount is zero, or current day is invalid");
    }
  }

  const canShow = !isLoading && isDailyBonusOpen && !isGreetingOpen;

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
            <BonusBlock dayNumber={1} bonusAmount={10} currentDay={currentDay === 1} />
            <BonusBlock dayNumber={2} bonusAmount={20} currentDay={currentDay === 2} />
            <BonusBlock dayNumber={3} bonusAmount={50} currentDay={currentDay === 3} />
            <BonusBlock dayNumber={4} bonusAmount={100} currentDay={currentDay === 4} />
            <BonusBlock dayNumber={5} bonusAmount={200} currentDay={currentDay === 5} />
            <BonusBlock dayNumber={6} bonusAmount={300} currentDay={currentDay === 6} />
            <BonusBlock dayNumber={7} bonusAmount={500} currentDay={currentDay === 7} />
            <BonusBlock dayNumber={8} bonusAmount={800} currentDay={currentDay === 8} />
            <BonusBlock dayNumber={9} bonusAmount={1000} currentDay={currentDay === 9} />
            <BonusBlock dayNumber={10} bonusAmount={2000} currentDay={currentDay === 10} />
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
            <span className="textShadow">Collect {bonusAmount}</span>
          </Button>
          <img
            className={cn(
              "content__money-anim",
              moneyAnimActive && "_acitve"
            )}
            src="img/pages/home/money.svg"
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
  { dayNumber: 1, bonusAmount: 10 },
  { dayNumber: 2, bonusAmount: 20 },
  { dayNumber: 3, bonusAmount: 50 },
  { dayNumber: 4, bonusAmount: 100 },
  { dayNumber: 5, bonusAmount: 200 },
  { dayNumber: 6, bonusAmount: 300 },
  { dayNumber: 7, bonusAmount: 500 },
  { dayNumber: 8, bonusAmount: 800 },
  { dayNumber: 9, bonusAmount: 1000 },
  { dayNumber: 10, bonusAmount: 2000 }
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
