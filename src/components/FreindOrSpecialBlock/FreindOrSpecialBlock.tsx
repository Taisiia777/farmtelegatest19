



// import classNames from 'classnames/bind';
// import styles from './FriendOrSpecialBlock.module.scss';
// import Button from '../Button/Button';
// import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
// import axios from 'axios';
// import { useAppSelector } from '../../store'; // Adjust the path as necessary
// import { RootState } from '../../store'; // Adjust the path as necessary
// import { useState, useEffect } from 'react';
// import i18n from '../../i18n';
// import { useTranslation } from 'react-i18next';
// import { useOutletContext } from 'react-router-dom';
// import { useDispatch} from "react-redux";
// import { setUser } from "../../store/reducers/userSlice";
// ;
// const cn = classNames.bind(styles);

// interface IFreindOrSpecialBlockProps {
//   imgSrc: string;
//   earning: string;
//   link: string;
//   title: string;
//   defaultButtonText: string;
//   refs?: string;
// }

// const FreindOrSpecialBlock = ({
//   imgSrc,
//   earning,
//   link,
//   title,
//   defaultButtonText,
//   refs
// }: IFreindOrSpecialBlockProps) => {
//   const dispatch = useDispatch();
//   const userId = useAppSelector((state: RootState) => state.user.user?.id);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [buttonText, setButtonText] = useState(defaultButtonText);
//   // const [referralCount, setReferralCount] = useState<number>(0);
//   const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const [lastCoin, setLastCoin] = useState<Coin | null>(null);
//   const [isFetchedRewards, setIsFetchedRewards] = useState(false);
//   const [isReciebed, setIsReciebed] = useState<boolean | null>(null); // Добавлено новое состояние
//   const [rewardId, setRewardId] = useState<number | null>(null); // Добавлено состояние для хранения ID награды
//   const { friends } = useOutletContext<OutletContext>();

//   console.log(lastCoin, isReciebed)
//   interface Coin {
//     name: string;
//     value: number;
//     cost: number;
//   }
//   interface User {
//     id: number;
//     username: string;
//     coins: number;
//     totalEarnings: number;
//     incomeMultiplier: number;
//     coinsPerHour: number;
//     xp: number;
//     level: number;
//   }
//   interface OutletContext {
//     friends: Friend[];
//   }
  
  
//   interface Friend extends User {
//     coinsEarned?: number;
//   }
//   const { t } = useTranslation();
//   useEffect(() => {
//     const initData = window.Telegram.WebApp.initDataUnsafe;
//     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
//     if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
//       i18n.changeLanguage(userLanguage);
//     } else {
//       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
//     }
//     if (userLanguage !== 'en') {

//     document.querySelectorAll('.textMenu').forEach(element => {
//       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//         element.style.fontSize = '14px';
//         element.style.fontWeight = '700';
//       }
//     });
//     document.querySelectorAll('.textMenu2').forEach(element => {
//       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//         element.style.fontSize = '18px';
//         element.style.fontWeight = '700';
//       }
//     });
//     document.querySelectorAll('.textMenu1').forEach(element => {
//        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//          element.style.fontSize = '12px';
//          element.style.fontWeight = '700';
//        }
//      });
//     }
//   }, []);
//   const coins = useAppSelector((state: RootState) => state.userCoins.coins);
  
//   useEffect(() => {
//     if (coins.length > 0) {
//       const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
//         prev.cost > current.cost ? prev : current
//       );
//       setLastCoin(mostExpensiveCoin);
//     }
//   }, [coins]);
//   const fetchCompletedTasks = async () => {
//     if (user?.id && !isFetchedRewards) {
//       try {
//         const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
//         const completedTasks = response.data;

//         const taskCompleted = completedTasks.some((task: any) => task.description === title && task.type === "socials" && task.isReciebed);
//         setIsCompleted(taskCompleted);
//         if (taskCompleted) {
//           setButtonText(t('done'));
//         } else {
//           const taskPending = completedTasks.some((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
//           if (taskPending) {
//             const pendingTask = completedTasks.find((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
//             setRewardId(pendingTask.id); // Сохраняем ID награды
//             setButtonText(t('check'));
//             setIsReciebed(false);
//           }
//         }
//         setIsFetchedRewards(true);
//       } catch (error) {
//         console.error('Error fetching completed tasks:', error);
//       }
//     }
//   };
//   useEffect(() => {
//     const fetchCompletedTasks = async () => {
//       if (user?.id && !isFetchedRewards) {
//         try {
//           const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
//           const completedTasks = response.data;

//           const taskCompleted = completedTasks.some((task: any) => task.description === title && task.type === "socials" && task.isReciebed);
//           setIsCompleted(taskCompleted);
//           if (taskCompleted) {
//             setButtonText(t('done'));
//           } else {
//             const taskPending = completedTasks.some((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
//             if (taskPending) {
//               const pendingTask = completedTasks.find((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
//               setRewardId(pendingTask.id); // Сохраняем ID награды
//               setButtonText(t('check'));
//               setIsReciebed(false);
//             }
//           }
//           setIsFetchedRewards(true);
//         } catch (error) {
//           console.error('Error fetching completed tasks:', error);
//         }
//       }
//     };


//     fetchCompletedTasks();
//   }, [userId, title, refs]);
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         // Перепроверка статуса задачи при возвращении в приложение
//         fetchCompletedTasks();
//       }
//     };
  
//     document.addEventListener('visibilitychange', handleVisibilityChange);
    
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);
  
//   const handleButtonClick = async () => {
//     if (!userId || isCompleted) {
//       console.error("User ID is not available or task is already completed");
//       return;
//     }

//     setButtonText(t('check'));

//     try {
//       // Если награда уже существует, обновляем её статус
//       if (rewardId) {
//         await axios.patch(`https://coinfarm.club/api/reward/${rewardId}/${userId}`, { isReciebed: true });
//         setIsReciebed(true);
//         setButtonText(t('done'));
//         setMoneyAnimACtive(true);
//         dispatch(setUser({ ...user, coins: user.coins + 20000}));
//         setTimeout(() => {
//           setMoneyAnimACtive(false);
//         }, 500);
//         setIsCompleted(true)
//       } else {
//         // Иначе создаем новую награду
//         let url = `https://coinfarm.club/api/reward/task/${userId}/${earning}/${title}`;
//         const response = await axios.post(url);
//         console.log("Response:", response.data);
//         setIsCompleted(true);
//         setButtonText(t('check'));
        
//         if (link) {
//           window.Telegram.WebApp.openLink(link);
//         }

//         // Обновление isReciebed на сервере
//         await axios.patch(`https://coinfarm.club/api/reward/${response.data.id}`, { isReciebed: true });
//         setIsReciebed(true);
//         // setButtonText("DONE");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setButtonText(defaultButtonText);
//     }
//   };

//   const requiredRefs = refs ? parseInt(refs, 10) : 0;
//   const isButtonDisabled = isCompleted || (refs ? requiredRefs > friends.length : false);

//   return (
//     <div className={cn("block")}>
//       <div className={cn("block__inner")}>
//         <div className={cn("block__left")}>
//           <img
//             src={imgSrc}
//             className={cn("block__icon")}
//             alt={title}
//           />
//           <div className={cn("block__info")}>
//             <strong
//               className={`${cn("block__title")}` + " textShadow_center"}>
//               {title}
//             </strong>
//             <div className={cn("block__earning")}>
//               <span className="textShadow_center">{earning}</span>
//               {!refs && <CoinWhiteBg size="small" />}
//             </div>
//           </div>
//         </div>
//         <div className={cn("block__link")}>
//           {isButtonDisabled || isCompleted ? (
//             <Button
//               className="textShadow_center"
//               disabled={isButtonDisabled}>
//               {`${isCompleted ? t('done') : buttonText}`}
//             </Button>
//           ) : (
//             <Button
//               className="textShadow_center"
//               onClick={handleButtonClick}>
//               {buttonText}
//             </Button>
//           )}

//           <img
//             className={cn(
//               "block__money-anim",
//               moneyAnimActive && "_acitve"
//             )}
//             src={`img/pages/home/money1.svg`}
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreindOrSpecialBlock;







import classNames from 'classnames/bind';
import styles from './FriendOrSpecialBlock.module.scss';
import Button from '../Button/Button';
import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
import axios from 'axios';
import { useAppSelector } from '../../store'; // Adjust the path as necessary
import { RootState } from '../../store'; // Adjust the path as necessary
import { useState, useEffect } from 'react';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { setUser } from "../../store/reducers/userSlice";
import { openWallet } from "../../store/reducers/wallet";

const cn = classNames.bind(styles);

interface IFreindOrSpecialBlockProps {
  imgSrc: string;
  earning: string;
  link: string;
  title: string;
  defaultButtonText: string;
  refs?: string;
}

const FreindOrSpecialBlock = ({
  imgSrc,
  earning,
  link,
  title,
  defaultButtonText,
  refs
}: IFreindOrSpecialBlockProps) => {
  const dispatch = useDispatch();
  const userId = useAppSelector((state: RootState) => state.user.user?.id);
  const [isCompleted, setIsCompleted] = useState(false);
  const [buttonText, setButtonText] = useState(defaultButtonText);
  // const [referralCount, setReferralCount] = useState<number>(0);
  const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
  const user = useAppSelector((state: RootState) => state.user.user);
  const [lastCoin, setLastCoin] = useState<Coin | null>(null);
  const [isFetchedRewards, setIsFetchedRewards] = useState(false);
  const [isReciebed, setIsReciebed] = useState<boolean | null>(null); // Добавлено новое состояние
  const [rewardId, setRewardId] = useState<number | null>(null); // Добавлено состояние для хранения ID награды
  const { friends } = useOutletContext<OutletContext>();

  console.log(lastCoin, isReciebed)
  interface Coin {
    name: string;
    value: number;
    cost: number;
  }
  interface User {
    id: number;
    username: string;
    coins: number;
    totalEarnings: number;
    incomeMultiplier: number;
    coinsPerHour: number;
    xp: number;
    level: number;
  }
  interface OutletContext {
    friends: Friend[];
  }
  
  
  interface Friend extends User {
    coinsEarned?: number;
  }
  const { t } = useTranslation();
  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
    }
    if (userLanguage !== 'en') {

    document.querySelectorAll('.textMenu').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '14px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textMenu2').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '18px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textMenu1').forEach(element => {
       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
         element.style.fontSize = '12px';
         element.style.fontWeight = '700';
       }
     });
    }
  }, []);
  const coins = useAppSelector((state: RootState) => state.userCoins.coins);
  
  useEffect(() => {
    if (coins.length > 0) {
      const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
        prev.cost > current.cost ? prev : current
      );
      setLastCoin(mostExpensiveCoin);
    }
  }, [coins]);
  const fetchCompletedTasks = async () => {
    if (user?.id && !isFetchedRewards) {
      try {
        const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
        const completedTasks = response.data;

        const taskCompleted = completedTasks.some((task: any) => task.description === title && task.type === "socials" && task.isReciebed);
        setIsCompleted(taskCompleted);
        if (taskCompleted) {
          setButtonText(t('done'));
        } else {
          const taskPending = completedTasks.some((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
          if (taskPending) {
            const pendingTask = completedTasks.find((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
            setRewardId(pendingTask.id); // Сохраняем ID награды
            setButtonText(t('check'));
            setIsReciebed(false);
          }
        }
        setIsFetchedRewards(true);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    }
  };
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (user?.id && !isFetchedRewards) {
        try {
          const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
          const completedTasks = response.data;

          const taskCompleted = completedTasks.some((task: any) => task.description === title && task.type === "socials" && task.isReciebed);
          setIsCompleted(taskCompleted);
          if (taskCompleted) {
            setButtonText(t('done'));
          } else {
            const taskPending = completedTasks.some((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
            if (taskPending) {
              const pendingTask = completedTasks.find((task: any) => task.description === title && task.type === "socials" && !task.isReciebed);
              setRewardId(pendingTask.id); // Сохраняем ID награды
              setButtonText(t('check'));
              setIsReciebed(false);
            }
          }
          setIsFetchedRewards(true);
        } catch (error) {
          console.error('Error fetching completed tasks:', error);
        }
      }
    };


    fetchCompletedTasks();
  }, [userId, title, refs]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Перепроверка статуса задачи при возвращении в приложение
        fetchCompletedTasks();
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  const handleButtonClick = async () => {
    if (!userId || isCompleted) {
      console.error("User ID is not available or task is already completed");
      return;
    }

    setButtonText(t('check'));

    try {
      // Если награда уже существует, обновляем её статус
      if (rewardId) {
        await axios.patch(`https://coinfarm.club/api/reward/${rewardId}/${userId}`, { isReciebed: true });
        setIsReciebed(true);
        setButtonText(t('done'));
        setMoneyAnimACtive(true);
        dispatch(setUser({ ...user, coins: user.coins + 20000}));
        setTimeout(() => {
          setMoneyAnimACtive(false);
        }, 500);
        setIsCompleted(true)
      } else {
        // Иначе создаем новую награду
        let url = `https://coinfarm.club/api/reward/task/${userId}/${earning}/${title}`;
        const response = await axios.post(url);
        console.log("Response:", response.data);
        setIsCompleted(true);
        setButtonText(t('check'));
        
              // Проверяем, если заголовок "Connect wallet", выполняем dispatch и завершаем функцию
  if (title === "Connect wallet") {
    dispatch(openWallet());
    await axios.patch(`https://coinfarm.club/api/reward/${response.data.id}`, { isReciebed: true });
    setIsReciebed(true);
    return; // предотвращаем выполнение оставшегося кода
  }
        if (link) {
          window.Telegram.WebApp.openLink(link);
        }

        // Обновление isReciebed на сервере
        await axios.patch(`https://coinfarm.club/api/reward/${response.data.id}`, { isReciebed: true });
        setIsReciebed(true);
        // setButtonText("DONE");
      }
    } catch (error) {
      console.error("Error:", error);
      setButtonText(defaultButtonText);
    }
  };

  const requiredRefs = refs ? parseInt(refs, 10) : 0;
  const isButtonDisabled = isCompleted || (refs ? requiredRefs > friends.length : false);

  return (
    <div className={cn("block")}>
      <div className={cn("block__inner")}>
        <div className={cn("block__left")}>
          <img
            src={imgSrc}
            className={cn("block__icon")}
            alt={title}
          />
          <div className={cn("block__info")}>
            <strong
              className={`${cn("block__title")}` + " textShadow_center"}>
              {title}
            </strong>
            <div className={cn("block__earning")}>
              <span className="textShadow_center">{earning}</span>
              {!refs && <CoinWhiteBg size="small" />}
            </div>
          </div>
        </div>
        <div className={cn("block__link")}>
          {isButtonDisabled || isCompleted ? (
            <Button
              className="textShadow_center"
              disabled={isButtonDisabled}>
              {`${isCompleted ? t('done') : buttonText}`}
            </Button>
          ) : (
            <Button
              className="textShadow_center"
              onClick={handleButtonClick}>
              {buttonText}
            </Button>
          )}

          <img
            className={cn(
              "block__money-anim",
              moneyAnimActive && "_acitve"
            )}
            src={`img/pages/home/money1.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FreindOrSpecialBlock;
