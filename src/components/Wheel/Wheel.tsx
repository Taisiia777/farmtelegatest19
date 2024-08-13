import { useRef, useState, useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./Wheel.module.scss";

import { useAppDispatch, useAppSelector } from "../../store";
import { finishWheel } from "../../store/reducers/wheel";

import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
const cn = classNames.bind(styles);

const Wheel = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.wheel.isOpen);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   // const user = useSelector((state: RootState) => state.user.user);
   const [isSpinning, setIsSpinning] = useState(false);
   const [isStopping, setIsStopping] = useState(false);
   const [step, setStep] = useState(1);

   // const coinMoneyAnimRef = useRef<HTMLImageElement>(null);
   // const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);
   const spin = () => {
      setIsSpinning(true);
      setIsStopping(false);
  
      // Вращение на несколько секунд
      setTimeout(() => {
        setIsSpinning(false);
        setIsStopping(true);
  
        // Завершение после окончания анимации
        setTimeout(() => {
          setIsStopping(false);
          dispatch(finishWheel());
        }, 3000); // Время замедления вращения
      }, 3000); // Время активного вращения
    };
   function goNext() {
      setStep((prev) => prev + 1);
   }
//    async function addCoins(userId: number, amount: number) {   
//       console.log(`пользователь ${JSON.stringify(user)} количество ${amount}`)
//       try {
//          const response = await axios.post(
//             `https://coinfarm.club/api/reward/first/${userId}`
//           ); 
//           console.log(response)
//           const response1 = await axios.patch(
//             `https://coinfarm.club/api/user/${userId}/earn/${amount}`
//           );
//           const updatedUser = response1.data;
//           // Обновление состояния пользователя и локальных монет
//           dispatch(
//             setUser({
//               ...updatedUser,
//               coins: updatedUser.coins,
//               totalEarnings: updatedUser.totalEarnings,
//             })
//           );
//           setLocalCoins(2000)
//           dispatch(updateGrassEarnings(0));

//           console.log(localCoins)
//             //   const updatedUser = await response.json();
//             //   // Преобразование значений coins и totalEarnings в числа
//             //   console.log(`updated user ${JSON.stringify(updatedUser)}`)
//             //   dispatch(setUser({
//             //       ...updatedUser,
//             //       coins: Number(updatedUser.coins),
//             //       totalEarnings: Number(updatedUser.totalEarnings)
//             //   })); // Обновляем данные пользователя в Redux
              
          
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   }
  
   // function handleAddCoins() {
   //    if (user?.id) {
   //       addCoins(user.id, 0);
   //       fihish();
   //    } else {
   //       console.error("User ID not found");
   //    }
   // }

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
                     className={cn("content__person-img", "_first")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wheel')}
                  </p>
               </div>
            </div>
         )}
{step === 2 && (
            <div style={{display: 'flex', flexDirection:'column', width: '100%', height:'100%', position:'relative'}} ref={wheelRef}>
               <div className={cn("greeting__body", "_first")} >
        <img src="img/global/popup-border.svg" className={cn("greeting__border")} />
        <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
          {t('wheel_title')}
        </strong>

        <div className={cn("content__person-img", "_first")}>
          <div
            className={cn("wheel", {
              spinning: isSpinning,
              stopping: isStopping
            })}
            
          >
            <img src="img/pages/home/menu/Wheel.png" alt="Wheel" />
          </div>
        </div>

        <img src="img/global/spin.png" className={cn("greeting__next")} alt="Spin" onClick={spin} />
        <img src="img/global/next-btn.svg" className={cn("greeting__next")} alt="Finish" onClick={fihish} />
      </div>
               {/* <img
                     src="img/pages/home/menu/Wheel.png"
                     className={cn("content__person-img", "_first")}
                  />
                                 <img
                  src="img/global/spin.png"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={spin}
               />
                                                <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={fihish}
               /> */}
               
            </div>
         )}
        
      </div>
   );
}

export default Wheel;
