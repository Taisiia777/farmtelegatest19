import { useRef, useState, useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./Wheel.module.scss";

import { useAppDispatch, useAppSelector } from "../../store";
import { finishWheel } from "../../store/reducers/wheel";

import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук
import Confetti from "./Confetti"; 

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { RootState } from "../../store";

const cn = classNames.bind(styles);

const Wheel = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.wheel.isOpen);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   // const user = useSelector((state: RootState) => state.user.user);
   const [rotation, setRotation] = useState(0);
   const [isSpinning, setIsSpinning] = useState(false);
   const [step, setStep] = useState(1);
   const user = useAppSelector((state: RootState) => state.user.user);
   const [showConfetti, setShowConfetti] = useState(false);
   const [spins, setSpins] = useState(user.level + 1);


//    const sectors = [
//     { name: "Sector 1", weight: 25, reward: 1000 }, // Самая высокая вероятность
//     { name: "Sector 2", weight: 20, reward: 5000 },
//     { name: "Sector 3", weight: 10, reward: 10000 },
//     { name: "Sector 4", weight: 5, reward: 25000 },
//     { name: "Sector 5", weight: 4.9, reward: 100000 },
//     { name: "Sector 6", weight: 0.1, reward: 500000 }, 
//     { name: "Sector 7", weight: 20, reward: 0 }, // Высокая вероятность
//     { name: "Sector 8", weight: 15, reward: 0 }, // Высокая вероятность
// ];
  
//    const getRandomSector = () => {
//     const totalWeight = sectors.reduce((total, sector) => total + sector.weight, 0);
//     const random = Math.random() * totalWeight;

//     let currentWeight = 0;
//     for (let i = 0; i < sectors.length; i++) {
//         currentWeight += sectors[i].weight;
//         if (random <= currentWeight) {
//             return i;
//         }
//     }
//     return 0; // если что-то пойдет не так
// };

// const giveUserReward = async (reward: number) => {
//     try {
//         if (reward > 0) {
//             const response = await axios.patch(`https://coinfarm.club/api/user/${user.id}/earn/${reward}`);
//             console.log(`Reward given: ${reward} coins`, response.data);
//         } else if (reward === 0) {
//             console.log("Special sector, no coins given.");
//         }
//     } catch (error) {
//         console.error('Error awarding coins:', error);
//     }
// };

// const spin = () => {
//     if (isSpinning) return; // Предотвращает повторный запуск спина во время текущего

//     const sectorIndex = getRandomSector();
//     const sectorAngle = 360 / sectors.length;
//     // const targetAngle = sectorIndex * sectorAngle + sectorAngle / 2;

//     // const spins = Math.floor(Math.random() * 3) + 5; // случайное количество оборотов от 5 до 7
//     // const finalAngle = rotation + spins * 360 + targetAngle;
// // Добавляем случайное смещение внутри угла сектора
// const randomOffset = Math.random() * sectorAngle;
// const targetAngle = sectorIndex * sectorAngle + randomOffset;

// const spins = Math.floor(Math.random() * 3) + 5; // случайное количество оборотов от 5 до 7
// const finalAngle = rotation + spins * 360 + targetAngle;
//     setIsSpinning(true);
//     setRotation(finalAngle);

//     setTimeout(() => {
//         setIsSpinning(false);
//         setStep(3);
//         setRotation(0);

//         const selectedSector = sectors[sectorIndex];
//         console.log(`Selected sector: ${selectedSector.name}, Reward: ${selectedSector.reward}`);

//         // Если сектор не является "Еще одно вращение" или "100$", выдать награду
//         if (selectedSector.name !== "Sector 8" && selectedSector.name !== "Sector 9") {
//             giveUserReward(selectedSector.reward);
//         } else if (selectedSector.name === "Sector 8") {
//             spin(); // Повторное вращение
//         } else if (selectedSector.name === "Sector 9") {
//             console.log("User wins $100");
//             // Здесь может быть логика для выдачи $100, если необходимо
//         }

//         // dispatch(finishWheel());
//     }, 5000); // Время завершения анимации
// };
const sectors = [
  { name: "Sector 1", weight: 25, reward: 1000 },
  { name: "Sector 2", weight: 20, reward: 5000 },
  { name: "Sector 3", weight: 10, reward: 10000 },
  { name: "Sector 4", weight: 5, reward: 25000 },
  { name: "Sector 5", weight: 4.9, reward: 100000 },
  { name: "Sector 6", weight: 0.1, reward: 500000 },
  { name: "Sector 7", weight: 20, reward: 0 },
  { name: "Sector 8", weight: 15, reward: 0 }, // "Еще одно вращение"
];

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

const giveUserReward = async (reward: number) => {
  try {
      if (reward > 0) {
          const response = await axios.patch(`https://coinfarm.club/api/user/${user.id}/earn/${reward}`);
          console.log(`Reward given: ${reward} coins`, response.data);
      } else if (reward === 0) {
          console.log("Special sector, no coins given.");
      }
  } catch (error) {
      console.error('Error awarding coins:', error);
  }
};

const spin = () => {
  setSpins((prev: number) => prev - 1)
  if (isSpinning) return; // Предотвращает повторный запуск спина во время текущего

  const sectorIndex = getRandomSector();
  const sectorAngle = 360 / sectors.length;

  // Добавляем случайное смещение внутри угла сектора, но внутри его границ
  const randomOffset = Math.random() * sectorAngle;
  const targetAngle = sectorIndex * sectorAngle + randomOffset;

  const spins = Math.floor(Math.random() * 3) + 5; // случайное количество оборотов от 5 до 7
  const finalAngle = spins * 360 + targetAngle;

  setIsSpinning(true);
  setRotation(finalAngle);

  setTimeout(() => {
      setIsSpinning(false);

      // Вычисляем сектор на основе угла, на который указывает указатель
      const finalRotation = finalAngle % 360;
      const winningIndex = Math.floor(finalRotation / sectorAngle);
      const selectedSector = sectors[winningIndex];

      alert(`Selected sector: ${selectedSector.name}, Reward: ${selectedSector.reward}`);

      // Если сектор не является "Еще одно вращение" или "100$", выдать награду
      if (selectedSector.name !== "Sector 8" && selectedSector.name !== "Sector 7") {
          giveUserReward(selectedSector.reward);
      } else if (selectedSector.name === "Sector 8") {
          spin(); // Повторное вращение
      } else if (selectedSector.name === "Sector 7") {
          console.log("User wins $100");
          // Здесь может быть логика для выдачи $100, если необходимо
      }

      // Сброс вращения для следующего спина
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false); // Скрыть конфетти через 2 секунды
        setStep(3);
        setRotation(0);
      }, 3000);

  }, 5000); // Время завершения анимации
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
            element.style.fontSize = '13px';
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
      <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} >
         {/* Introduction */}
         {step === 1 && (
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
{step === 2 && (
            <div style={{display: 'flex', flexDirection:'column', width: '100%', height:'100%', position:'relative'}}>
                    {showConfetti && <Confetti />}

               <div className={cn("greeting__body", "_first")} >


        <div className={cn("content__person-img", "_first")} ref={wheelRef}>
          <div
           className={cn("wheel", { spinning: isSpinning })}
         //   style={{
         //     transform: `rotate(${rotation}deg)`,
         //     transition: isSpinning ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
         //     transformOrigin: "center", // Центр вращения
         //   }}
            
          > <p className={`${cn("content__text", "_first")}` + ' textInvite3'} style={{width: '106px', height: '20px', position: 'absolute', top: '-25px', left: '14px', zIndex:'11'}}>
            {spins} SPINS
          </p>
          <p className={`${cn("content__text", "_first")}` + ' textInvite3'} style={{width: '180px', height: '20px', position: 'absolute', top: '-25px', left: '130px', zIndex:'11'}}>
            MORE SPINS
          </p>
            <img src="img/pages/home/menu/YourSpins.png" className={cn("greeting__next")} style={{width: '106px', height: '47px', position: 'absolute', top: '20px', left: '14px', zIndex:'10'}} alt="Spin"  />
            <img src="img/pages/home/menu/MoreSpins.png" className={cn("greeting__next")} style={{width: '180px', height: '47px', position: 'absolute', top: '20px', left: '130px', zIndex:'10'}} alt="Spin"  />
            <img src="img/pages/home/menu/WheelCenter.png" style={{width: '280px', display:'flex', zIndex:'11', position:'absolute', top: '155px', transform: `rotate(${rotation}deg)`,transition: isSpinning ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",transformOrigin: "center", border: '1px solid red' }} alt="Wheel" />
            <img src="img/pages/home/menu/WheelBorder.png" style={{width: '389px', display:'flex',  zIndex:'10',  position:'absolute', top: '100px'}} alt="Wheel" />

            <img src="img/global/spin.png" className={cn("greeting__next")} style={{width: '122px', height: '46px', position: 'absolute', top: '70vh', left: '40vw'}} alt="Spin" onClick={spin} />

          </div>
        </div>

        {/* <img src="img/global/spin.png" className={cn("greeting__next")} style={{width: '100px', marginTop: '600px'}} alt="Spin" onClick={spin} /> */}
        <img src="img/global/next-btn.svg" className={cn("greeting__next")} alt="Finish" onClick={fihish} />
      </div>
             
            </div>
         )}
          {step === 3 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef}>
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
                  onClick={()=>{setStep(2)}}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/pages/home/menu/Reward.png"
                     className={cn("content__person-img", "_first1")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wheel_reward')}
                  </p>
               </div>
            </div>
         )}
        
      </div>
   );
}

export default Wheel;
