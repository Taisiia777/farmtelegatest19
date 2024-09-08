


import { useRef, useState, useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./Wheel.module.scss";

import { useAppDispatch, useAppSelector } from "../../store";
import { finishWheel, ready, unready } from "../../store/reducers/wheel";

import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук
import Confetti from "./Confetti"; 

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { setUser } from "../../store/reducers/userSlice";
import { retrieveLaunchParams } from '@tma.js/sdk';
import { RootState } from "../../store";

const cn = classNames.bind(styles);

const Wheel = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.wheel.isOpen);
   const user = useAppSelector((state: RootState) => state.user.user);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   const [rotation, setRotation] = useState(0);
   const [isSpinning, setIsSpinning] = useState(false);
   const [step, setStep] = useState(1);
   const [showConfetti, setShowConfetti] = useState(false);
   const [spins, setSpins] = useState(0);
   const [reward, setReward] = useState(0);
   const [userIdNumber, setUserIdNumber] = useState(0);

  

const sectors = [
  { name: "Sector 1", weight: 15, reward: 0 },      // Награда 0, вес 0
  { name: "Sector 18", weight: 5, reward: 8000 }, // Большая награда - меньший вес
  { name: "Sector 17", weight: 0, reward: 0 },     // Награда 0, вес 0
  { name: "Sector 16", weight: 12, reward: 500 },  // Малая награда - больший вес
  { name: "Sector 15", weight: 11, reward: 1000 }, // Малая награда - больший вес
  { name: "Sector 14", weight: 3, reward: 12000 }, // Очень большая награда - очень маленький вес
  { name: "Sector 13", weight: 4, reward: 7000 }, // Большая награда - меньший вес
  { name: "Sector 12", weight: 1, reward: 20000 }, // Самая большая награда - самый маленький вес
  { name: "Sector 11", weight: 0, reward: 0 },     // Награда 0, вес 0
  { name: "Sector 10", weight: 6, reward: 2000 }, // Малая награда - больший вес
  { name: "Sector 9", weight: 2, reward: 15000 },  // Очень большая награда - очень маленький вес
  { name: "Sector 8", weight: 4, reward: 9000 },   // Большая награда - меньший вес
  { name: "Sector 7", weight: 4, reward: 10000 },
  { name: "Sector 6", weight: 15, reward: 100 },   // Очень малая награда - самый большой вес
  { name: "Sector 5", weight: 0, reward: 0 },      // Награда 0, вес 0
  { name: "Sector 4", weight: 6, reward: 0 },  // Малая награда - больший вес
  { name: "Sector 3", weight: 7, reward: 6000 }, 
  { name: "Sector 2", weight: 5, reward: 5000 },   // Средняя награда - средний вес
];

// useEffect(() => {
//   const fetchUserData = async () => {
//     const { initData } = retrieveLaunchParams();
//     if (initData && initData.user) {
//       const user = initData.user;
//       const username = user.username;
//       const userId = user.id;

//       try {
//         const response = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
//         const data = response.data;
//         const referralCode = data.referral_code;

//         // Получаем информацию о пользователе
//         const userResponse = await axios.post("https://coinfarm.club/api/user", {
//           username: username,
//           coins: 0,
//           totalEarnings: 0,
//           incomeMultiplier: 1,
//           coinsPerHour: 1000,
//           xp: 1000,
//           level: 0,
//           referralCode: referralCode,
//         });

//         let userData;
//         userData = userResponse.data;

//         // Получаем награды пользователя
//         setUserIdNumber(userData.id);
//         const rewardsResponse = await axios.get(`https://coinfarm.club/api/reward/${userData.id}`);
//         const wheelRewards = rewardsResponse.data.filter((reward: any) => reward.type === "wheel");
//         if (wheelRewards.length > 0) {
//           const lastReward = wheelRewards[wheelRewards.length - 1];
//           const lastRewardDate = new Date(lastReward.description);
//           const now = new Date();
//           const hoursSinceLastReward = (now.getTime() - lastRewardDate.getTime()) / (1000 * 60 * 60);
//           if (hoursSinceLastReward > 12) {
//             setSpins(userData.level + 1); // Обновляем количество спинов
//             dispatch(ready());
//           } else {
//             setSpins(lastReward.amount); // Устанавливаем количество спинов по последней награде
//             if(!lastReward.amount)
//             {
//               dispatch(unready());
//             } else {
//               dispatch(ready());
//             }
//           }
//         } else {
//           setSpins(userData.level + 1); // Устанавливаем спины, если нет наград
//           dispatch(ready());
//         }

//         dispatch(setUser(userData));
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   fetchUserData();
// }, [dispatch]);
useEffect(() => {
  const fetchUserData = async () => {
    const { initData } = retrieveLaunchParams();
    if (initData && initData.user) {
      const user = initData.user;
      const username = user.username;
      const userId = user.id;

      try {
        const response = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
        const data = response.data;
        const referralCode = data.referral_code;

        // Получаем информацию о пользователе
        const userResponse = await axios.post("https://coinfarm.club/api/user", {
          username: username,
          coins: 0,
          totalEarnings: 0,
          incomeMultiplier: 1,
          coinsPerHour: 1000,
          xp: 1000,
          level: 0,
          referralCode: referralCode,
        });

        let userData;
        userData = userResponse.data;

        // Получаем награды пользователя
        setUserIdNumber(userData.id);
        const rewardsResponse = await axios.get(`https://coinfarm.club/api/reward/${userData.id}`);
        const wheelRewards = rewardsResponse.data.filter((reward: any) => reward.type === "wheel");
        if (wheelRewards.length > 0) {
          const lastReward = wheelRewards[wheelRewards.length - 1];
          const lastRewardDate = new Date(lastReward.description);
          const now = new Date();
          const hoursSinceLastReward = (now.getTime() - lastRewardDate.getTime()) / (1000 * 60 * 60);

          if (hoursSinceLastReward > 12) {
            setSpins(1); // Обновляем количество спинов
            dispatch(ready());
          } else {
            setSpins(lastReward.amount); // Устанавливаем количество спинов по последней награде
            if(!lastReward.amount)
            {
              dispatch(unready());
            } else {
              dispatch(ready());
            }
          }
        } else {
          setSpins(1); // Устанавливаем спины, если нет наград
          dispatch(ready());
        }

        dispatch(setUser(userData));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  fetchUserData();
}, [dispatch]);

useEffect(() => {
  // const user = useAppSelector((state: RootState) => state.user.user);
  if(isSpinning){
    sendSpinUpdateRequest(spins)
  }
}, [isSpinning]);

const getRandomSector = () => {
  const totalWeight = sectors.reduce((total, sector) => total + sector.weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  for (let i = 0; i < sectors.length; i++) {
    currentWeight += sectors[i].weight;
    if (random <= currentWeight) {
      return i;
    }
  }
  return 0; // если что-то пойдет не так
};
// const giveUserReward = async (reward: number) => {

//   try {
//       if (reward > 0) {
//           const response = await axios.patch(`https://coinfarm.club/api/user/${userIdNumber}/earn/${reward}`);
//           dispatch(setUser({ ...user, coins: user.coins+reward, totalEarnings: user.totalEarnings+reward}));
//           console.log(`Reward given: ${reward} coins`, response.data);
//       } else if (reward === 0) {
//           console.log("Special sector, no coins given.");
//       }
//   } catch (error) {
//       console.error('Error awarding coins:', error);
//   }
// };
const giveUserReward = (reward) => {
  // Уведомляем, что запрос еще не завершен
  dispatch(unready());

  if (reward > 0) {
    axios
      .patch(`https://coinfarm.club/api/user/${userIdNumber}/earn/${reward}`)
      .then((response) => {
        // Обновляем пользователя после успешного ответа
        dispatch(setUser({
          ...user,
          coins: user.coins + reward,
          totalEarnings: user.totalEarnings + reward
        }));
        
        console.log(`Reward given: ${reward} coins`, response.data);
        // Уведомляем, что запрос успешно завершен
        dispatch(ready());
      })
      .catch((error) => {
        console.error('Error awarding coins:', error);
        // В случае ошибки также вызываем ready, чтобы уведомить, что процесс завершен
        dispatch(ready());
      });
  } else if (reward === 0) {
    console.log("Special sector, no coins given.");
    // Уведомляем, что запрос завершен, хотя награда не была выдана
    dispatch(ready());
  }
};


const sendSpinUpdateRequest = async (spins: number) => {
  try {
    if(spins === 0){
      dispatch(unready());
    }
    const response = await axios.post(`https://coinfarm.club/api/reward/wheel/${userIdNumber}/${spins}`);
    console.log("Spin update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating spin:", error);
    throw error;
  }
};





const spin = () => {
  if (spins <= 0 || isSpinning) return; // Блокируем кнопку, если нет спинов или колесо уже крутится

  const sectorIndex = getRandomSector();
  const sectorAngle = 360 / sectors.length; // 45 градусов на сектор
  const baseAngle = 0; // Начальный угол первого сектора

  // Вычисляем конечный угол для выбранного сектора
  const targetAngle = (baseAngle + ((sectorIndex) * sectorAngle)) % 360;

  // Случайное количество оборотов (от 5 до 7)
  const spinsCount = 5;

  // Конечный угол вращения (множим на количество оборотов и добавляем целевой угол)
  const finalAngle = (spinsCount * 360) + targetAngle;

  // Устанавливаем состояние для анимации вращения
  setSpins(prev => prev - 1);
  setIsSpinning(true);
  setRotation(finalAngle);

  // Завершаем вращение и определяем выигрышный сектор
  setTimeout(() => {
    setIsSpinning(false);

    // const finalRotation = finalAngle % 360; // Нормализуем угол в пределах 0-360
    const winningIndex = sectorIndex; // Поскольку сектор был выбран заранее, просто используем его индекс
    const selectedSector = sectors[winningIndex];

    // Устанавливаем награду и выдаем её пользователю
    setReward(selectedSector.reward);
    giveUserReward(selectedSector.reward);

    // Обрабатываем результат вращения
    if (selectedSector.name !== "Sector 1" && selectedSector.name !== "Sector 4") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setStep(2);
        setRotation(0);
      }, 2000);
    } else if (selectedSector.name === "Sector 1"){
      setReward(0);
      setRotation(0);
    } else if (selectedSector.name === "Sector 4"){
      setReward(0);
      setRotation(0);
      setSpins(prev => prev + 1);
    }
  }, 5000);
};



   function goNext() {
      setStep((prev) => prev + 1);
   }


   function fihish() {
      // coinMoneyAnimRef.current?.classList.add("moneyAnim");

      // setTimeout(() => {
      //    coinMoneyAnimRef.current?.classList.remove("moneyAnim");
         setStep(1)
         dispatch(finishWheel());
      // }, 500);
   }
   const getCorrectSpinsText = (spins: number) => {
    const remainder10 = spins % 10;
    const remainder100 = spins % 100;
  
    if (remainder100 >= 11 && remainder100 <= 19) {
      return 'попыток'; // для чисел от 11 до 19
    }
  
    if (remainder10 === 1) {
      return 'попытка'; // для чисел оканчивающихся на 1 (кроме 11)
    }
  
    if (remainder10 >= 2 && remainder10 <= 4) {
      return 'попытки'; // для чисел оканчивающихся на 2, 3, 4 (кроме 12, 13, 14)
    }
  
    return 'попыток'; // для всех остальных случаев
  };
   const { t } = useTranslation();
   useEffect(() => {
     const initData = window.Telegram.WebApp.initDataUnsafe;
     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
     if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
       i18n.changeLanguage(userLanguage);
     } else {
       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
     }
    
   const applyStyles = () => {
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
        document.querySelectorAll('.textInvite').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
           element.style.fontSize = '20px';
           element.style.fontWeight = '700';
         }
       });
       document.querySelectorAll('.textInvite1').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
           element.style.fontSize = '15px';
           element.style.fontWeight = '400';
         }
       });
       document.querySelectorAll('.textInvite2').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
           element.style.fontSize = '12px';
           element.style.fontWeight = '700';
         }
       });
       document.querySelectorAll('.textInvite3').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '18px';
          element.style.fontWeight = '700';
        }
      });
      document.querySelectorAll('.textWheel').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '12px';
          element.style.fontWeight = '700';
        }
      });
      document.querySelectorAll('.textWheel1').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '10px';
          element.style.fontWeight = '700';
        }
      });
      document.querySelectorAll('.textInvite4').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '10px';
          element.style.fontWeight = '700';
        }
      });
      document.querySelectorAll('.textInvite5').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '14px';
          element.style.fontWeight = '700';
        }
      });
         document.querySelectorAll('.textInvite6').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
            element.style.fontSize = '10px';
            element.style.fontWeight = '700';
         }
         });
      // Добавьте остальные стили аналогичным образом
    };
    if (userLanguage !== 'en') {
 
      applyStyles();

    }
  
    // Перезапуск применения стилей при изменении количества элементов
    const observer = new MutationObserver(applyStyles);
    observer.observe(document.body, { childList: true, subtree: true });
  
    return () => {
      observer.disconnect();
    };
   }, []);
   const wheelRef = useRef<HTMLDivElement>(null);

   useOutsideClick(() => dispatch(finishWheel()), [wheelRef]);

   return (
      <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} id="fortune">
            {isOpen && !isSpinning && (
               <img
                  src="img/global/closeIcon.svg"
                  onClick={() => {
                    setStep(1)
                    dispatch(finishWheel());
                  }}
                  className={cn("close")}
                  alt="Close"
               />
            )}
         {/* Introduction */}
         {step === 4 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
               {t('wheel_title')}
               </strong>

               {/* Иконка next */}
               <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={goNext}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/pages/home/menu/Wheel.png"
                     className={cn("content__person-img", "_first2")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wheel')}
                  </p>
               </div>
            </div>
         )}
{step === 1 && (
            <div style={{display: 'flex', flexDirection:'column', width: '100%', height:'100%', position:'relative'}}>
                    {showConfetti && <Confetti />}

               <div className={cn("greeting__body", "_first")} >


        <div className={cn("content__person-img", "_first")} ref={wheelRef}>
          <div
           className={cn("wheel", { spinning: isSpinning })}
          >

<p className={`${cn("content__text", "_first")}` + ' textWheel'} style={{width: '106px', height: '20px', position: 'absolute', top: '-3.25vh', left: '50%', transform: 'translate(-50%)', zIndex:'11'}}>
  {spins} {getCorrectSpinsText(spins)}
</p>
<p className={`${cn("content__text", "_first")}` + ' textWheel'} style={{width: '200px', height: '20px', position: 'absolute', top: '2vh', left: '50%', transform: 'translate(-50%)', zIndex:'11'}}>
  +1 вращение каждые 12 часов
</p>

            <img src="img/pages/home/menu/YourSpins.png" className={cn("greeting__next")} style={{width: '106px', height: '47px', position: 'absolute', top: '20px', left: '50%', transform: 'translate(-50%)', zIndex:'10'}} alt="Spin"  />
            <img src="img/pages/home/menu/WheelCenter4.png" style={{width: '95vw', display:'flex', zIndex:'11', position:'absolute', top: '92.5px', transform: `rotate(${rotation}deg)`,transition: isSpinning ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",transformOrigin: "center" }} alt="Wheel" />
            <img src="img/pages/home/menu/WheelBorder4.png" style={{width: '100vw', display:'flex',  zIndex:'10',  position:'absolute', top: '100px', left:"1vw"}} alt="Wheel" />
            <img src="img/pages/home/menu/triangle.png" style={{width: '58px', display:'flex',  zIndex:'12',  position:'absolute', top: '115px'}} alt="Wheel" />

            
            <img
  src="img/global/spin.png"
  className={cn("greeting__next", { disabled: spins <= 0 || isSpinning || showConfetti })} // Добавляем условный класс
  style={{
    width: '122px',
    height: '46px',
    position: 'absolute',
    top: '77vh',
    left: '49%',
    transform: 'translateX(-50%)',
    cursor: spins <= 0 || isSpinning || showConfetti ? 'not-allowed' : 'pointer', // Смена курсора
    opacity: spins <= 0 || isSpinning || showConfetti ? 0.5 : 1, // Смена прозрачности для визуального эффекта
  }}
  alt="Spin"
  onClick={() => {
    if (spins > 0 && !isSpinning && !showConfetti) {
      spin();
    }
  }}
/>

            <p className={`${cn("content__text", "_first")}` + ' textInvite3'} style={{width: '122px', height: '20px', position: 'absolute', top: '70.5vh', zIndex:'11', }} onClick={spin}>
          {t('spin')}
          </p>
          </div>
        </div>

        {/* <img src="img/global/spin.png" className={cn("greeting__next")} style={{width: '100px', marginTop: '600px'}} alt="Spin" onClick={spin} /> */}
        <img src="img/global/next-btn.svg" className={cn("greeting__next")} alt="Finish" onClick={fihish} />
      </div>
             
            </div>
         )}
          {step === 2 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
               {t('wheel_rew_title')}
               </strong>

               {/* Иконка next */}
               <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={()=>{setStep(1)}}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/pages/home/menu/Reward.png"
                     className={cn("content__person-img", "_first1")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wheel_reward')} {reward} FarmCoins
                  </p>
               </div>
            </div>
         )}
        
      </div>
   );
}

export default Wheel;
