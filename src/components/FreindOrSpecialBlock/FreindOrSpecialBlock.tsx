// import classNames from "classnames/bind";
// import styles from "./FriendOrSpecialBlock.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// const cn = classNames.bind(styles);

// interface IFreindOrSpecialBlockProps {
//    imgSrc: string;
//    earning: string;
//    link: string;
//    title: string;
// }

// const FreindOrSpecialBlock = ({
//    imgSrc,
//    earning,
//    link,
//    title,
// }: IFreindOrSpecialBlockProps) => {
//    return (
//       <div className={cn("block")}>
//          <div className={cn("block__inner")}>
//             <div className={cn("block__left")}>
//                <img
//                   src={imgSrc}
//                   className={cn("block__icon")}
//                   alt="Telegramm"
//                />
//                <div className={cn("block__info")}>
//                   <strong
//                      className={`${cn("block__title")}` + " textShadow_center"}>
//                      {title}
//                   </strong>
//                   <div className={cn("block__earning")}>
//                      <span className="textShadow_center">+{earning}</span>
//                      <CoinWhiteBg size="small" />
//                      {/* <img src="img/coins/BTC.svg" /> */}
//                   </div>
//                </div>
//             </div>
//             <div className={cn("block__link")}>
//                <Button
//                   className="textShadow_center"
//                   onClick={() => window.open(link)}>
//                   GO TO
//                </Button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default FreindOrSpecialBlock;




// import classNames from "classnames/bind";
// import styles from "./FriendOrSpecialBlock.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// import axios from "axios";
// const cn = classNames.bind(styles);

// interface IFreindOrSpecialBlockProps {
//    imgSrc: string;
//    earning: string;
//    link: string;
//    title: string;
// }

// const FreindOrSpecialBlock = ({
//    imgSrc,
//    earning,
//    link,
//    title,
// }: IFreindOrSpecialBlockProps) => {
//    const handleButtonClick = async () => {
//       const userId = 114; // замените на актуальный ID пользователя
//       let url = "https://coinfarm.club/api/reward/";

//       switch (title) {
//          case "JOIN GROUP":
//             url = `https://coinfarm.club/api/reward/group/${userId}`;
//             break;
//          case "JOIN CHAT":
//             url = `https://coinfarm.club/api/reward/chat/${userId}`;
//             break;
//          case "JOIN X":
//             url = `https://coinfarm.club/api/reward/x/${userId}`;
//             break;
//          default:
//             console.error("Unknown title:", title);
//             return;
//       }

//       try {
//          const response = await axios.post(url);
//          console.log("Response:", response.data);
//          window.open(link);
//       } catch (error) {
//          console.error("Error:", error);
//       }
//    };

//    return (
//       <div className={cn("block")}>
//          <div className={cn("block__inner")}>
//             <div className={cn("block__left")}>
//                <img
//                   src={imgSrc}
//                   className={cn("block__icon")}
//                   alt={title}
//                />
//                <div className={cn("block__info")}>
//                   <strong
//                      className={`${cn("block__title")}` + " textShadow_center"}>
//                      {title}
//                   </strong>
//                   <div className={cn("block__earning")}>
//                      <span className="textShadow_center">+{earning}</span>
//                      <CoinWhiteBg size="small" />
//                   </div>
//                </div>
//             </div>
//             <div className={cn("block__link")}>
//                <Button
//                   className="textShadow_center"
//                   onClick={handleButtonClick}>
//                   GO TO
//                </Button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default FreindOrSpecialBlock;



// import classNames from 'classnames/bind';
// import styles from './FriendOrSpecialBlock.module.scss';
// import Button from '../Button/Button';
// import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
// import axios from 'axios';
// import { useAppSelector } from '../../store'; // Adjust the path as necessary
// import { RootState } from '../../store'; // Adjust the path as necessary

// const cn = classNames.bind(styles);

// interface IFreindOrSpecialBlockProps {
//   imgSrc: string;
//   earning: string;
//   link: string;
//   title: string;
// }

// const FreindOrSpecialBlock = ({
//   imgSrc,
//   earning,
//   link,
//   title,
// }: IFreindOrSpecialBlockProps) => {
//   const userId = useAppSelector((state: RootState) => state.user.user?.id);

//   const handleButtonClick = async () => {
//     if (!userId) {
//       console.error("User ID is not available");
//       return;
//     }

//     let url = "https://coinfarm.club/api/reward/";

//     switch (title) {
//       case "JOIN GROUP":
//         url = `https://coinfarm.club/api/reward/group/${userId}`;
//         break;
//       case "JOIN CHAT":
//         url = `https://coinfarm.club/api/reward/chat/${userId}`;
//         break;
//       case "JOIN X":
//         url = `https://coinfarm.club/api/reward/x/${userId}`;
//         break;
//       default:
//         console.error("Unknown title:", title);
//         return;
//     }

//     try {
//       const response = await axios.post(url);
//       console.log("Response:", response.data);
//       window.Telegram.WebApp.openLink(link);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

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
//               <span className="textShadow_center">+{earning}</span>
//               <CoinWhiteBg size="small" />
//             </div>
//           </div>
//         </div>
//         <div className={cn("block__link")}>
//           <Button
//             className="textShadow_center"
//             onClick={handleButtonClick}>
//             GO TO
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreindOrSpecialBlock;





// import classNames from 'classnames/bind';
// import styles from './FriendOrSpecialBlock.module.scss';
// import Button from '../Button/Button';
// import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
// import axios from 'axios';
// import { useAppSelector } from '../../store'; // Adjust the path as necessary
// import { RootState } from '../../store'; // Adjust the path as necessary
// import { useState, useEffect } from 'react';

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
//   const userId = useAppSelector((state: RootState) => state.user.user?.id);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [buttonText, setButtonText] = useState(defaultButtonText);

//   useEffect(() => {
//     const fetchCompletedTasks = async () => {
//       if (!userId) return;
//       console.log(refs)
//       try {
//         const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
//         const completedTasks = response.data;

//         const taskCompleted = completedTasks.some((task: any) => task.description === title); // Замените 'specific-type' на реальный тип задания
//         setIsCompleted(taskCompleted);
//         if (taskCompleted) {
//           setButtonText("DONE");
//         }
//       } catch (error) {
//         console.error('Error fetching completed tasks:', error);
//       }
//     };

//     fetchCompletedTasks();

//   }, [userId, title]);

//   const handleButtonClick = async () => {
//     if (!userId || isCompleted) {
//       console.error("User ID is not available or task is already completed");
//       return;
//     }
//     setButtonText("CHECK");

//     let url = "https://coinfarm.club/api/reward/";

//     switch (title) {
//       case "JOIN GROUP":
//         url = `https://coinfarm.club/api/reward/group/${userId}`;
//         break;
//       case "JOIN CHAT":
//         url = `https://coinfarm.club/api/reward/chat/${userId}`;
//         break;
//       case "JOIN X":
//         url = `https://coinfarm.club/api/reward/x/${userId}`;
//         break;
//       default:
//         console.error("Unknown title:", title);
//         return;
//     }

//     try {
//       const response = await axios.post(url);
//       console.log("Response:", response.data);
//       setIsCompleted(true)
//       window.Telegram.WebApp.openLink(link);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

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
//               <span className="textShadow_center">+{earning}</span>
//               <CoinWhiteBg size="small" />
//             </div>
//           </div>
//         </div>
//         <div className={cn("block__link")}>
//           <Button
//             className="textShadow_center"
//             onClick={handleButtonClick}
//             disabled={isCompleted}>
//             {buttonText}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreindOrSpecialBlock;









// import classNames from 'classnames/bind';
// import styles from './FriendOrSpecialBlock.module.scss';
// import Button from '../Button/Button';
// import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
// import axios from 'axios';
// import { useAppSelector } from '../../store'; // Adjust the path as necessary
// import { RootState } from '../../store'; // Adjust the path as necessary
// import { useState, useEffect } from 'react';

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
//   const userId = useAppSelector((state: RootState) => state.user.user?.id);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [buttonText, setButtonText] = useState(defaultButtonText);
//   const [referralCount, setReferralCount] = useState<number>(0);
//   const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const [lastCoin, setLastCoin] = useState<Coin | null>(null);
//   const [isFetchedRewards, setIsFetchedRewards] = useState(false);
  
// console.log(lastCoin)
//   interface Coin {
//     name: string;
//     value: number;
//     cost: number
//     // добавьте любые другие необходимые свойства
//   }
//   const coins = useAppSelector((state: RootState) => state.userCoins.coins);
//   useEffect(() => {
//     console.log(user)
//     if (coins.length > 0) {
//       const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
//         prev.cost > current.cost ? prev : current
//       );
//       setLastCoin(mostExpensiveCoin);
//     }
//   }, [coins]);


//     useEffect(() => {
//     const fetchCompletedTasks = async () => {
//       if (user?.id && !isFetchedRewards) {
//       console.log(refs)
//       try {
//         const response = await axios.get(`https://coinfarm.club/api/reward/${userId}`);
//         const completedTasks = response.data;

//         const taskCompleted = completedTasks.some((task: any) => task.description === title); // Замените 'specific-type' на реальный тип задания
//         setIsCompleted(taskCompleted);
//         if (taskCompleted) {
//           setButtonText("DONE");
//         }
//         setIsFetchedRewards(true)
//       } catch (error) {
//         console.error('Error fetching completed tasks:', error);
//       }
//     }
//     };
//        const fetchReferralCount = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`https://coinfarm.club/api/user/${userId}/referrals/`);
//         setReferralCount(response.data.length);
//       } catch (error) {
//         console.error('Error fetching referral count:', error);
//       }
//     };
//     fetchReferralCount()
//     fetchCompletedTasks();

//   }, [userId, title, refs]);

//   const handleButtonClick = async () => {
//     if (!userId || isCompleted) {
//       console.error("User ID is not available or task is already completed");
//       return;
//     }

//     setButtonText("CHECK");

//     let url = `https://coinfarm.club/api/reward/task/${userId}/${earning}/${title}`;

//     try {
//       const response = await axios.post(url);
//       console.log("Response:", response.data);
//       setIsCompleted(true);
//       setButtonText("DONE"); // Обновляем текст кнопки только для текущего элемента
//       setMoneyAnimACtive(true);
//       setTimeout(() => {
//         setMoneyAnimACtive(false);
//       }, 500);
//       if(link){
//         window.Telegram.WebApp.openLink(link);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setButtonText(defaultButtonText); // Возвращаем текст кнопки в случае ошибки
//     }
//   };

//   const requiredRefs = refs ? parseInt(refs, 10) : 0;
//   const isButtonDisabled = isCompleted || (refs ? requiredRefs > referralCount : false);

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
//               </div>
//           </div>
//         </div>
//         <div className={cn("block__link")}>
//         {isButtonDisabled || isCompleted ? (
//           <Button
//             className="textShadow_center"
//             disabled={isButtonDisabled}>
//             {`${isCompleted? "DONE": buttonText}`}
//           </Button>):( 
//             <Button
//             className="textShadow_center"
//             onClick={handleButtonClick}>
//             {buttonText}
//           </Button>
//           )}

//           <img
//             className={cn(
//               "block__money-anim",
//               moneyAnimActive && "_acitve"
//             )}
//             // src={lastCoin ? `img/pages/home/${lastCoin.name}/money.svg` : `img/pages/home/money.svg`}
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
  const userId = useAppSelector((state: RootState) => state.user.user?.id);
  const [isCompleted, setIsCompleted] = useState(false);
  const [buttonText, setButtonText] = useState(defaultButtonText);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [moneyAnimActive, setMoneyAnimACtive] = useState(false);
  const user = useAppSelector((state: RootState) => state.user.user);
  const [lastCoin, setLastCoin] = useState<Coin | null>(null);
  const [isFetchedRewards, setIsFetchedRewards] = useState(false);
  const [isReciebed, setIsReciebed] = useState<boolean | null>(null); // Добавлено новое состояние
  const [rewardId, setRewardId] = useState<number | null>(null); // Добавлено состояние для хранения ID награды

  console.log(lastCoin, isReciebed)
  interface Coin {
    name: string;
    value: number;
    cost: number;
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
         element.style.fontSize = '13px';
         element.style.fontWeight = '700';
       }
     });
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

    const fetchReferralCount = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`https://coinfarm.club/api/user/${userId}/referrals/`);
        setReferralCount(response.data.length);
      } catch (error) {
        console.error('Error fetching referral count:', error);
      }
    };

    fetchReferralCount();
    fetchCompletedTasks();
  }, [userId, title, refs]);

  const handleButtonClick = async () => {
    if (!userId || isCompleted) {
      console.error("User ID is not available or task is already completed");
      return;
    }

    setButtonText("CHECK");

    try {
      // Если награда уже существует, обновляем её статус
      if (rewardId) {
        await axios.patch(`https://coinfarm.club/api/reward/${rewardId}/${userId}`, { isReciebed: true });
        setIsReciebed(true);
        setButtonText("DONE");
        setMoneyAnimACtive(true);
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
        setButtonText("CHECK");
        
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
  const isButtonDisabled = isCompleted || (refs ? requiredRefs > referralCount : false);

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
              {`${isCompleted ? "DONE" : buttonText}`}
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
