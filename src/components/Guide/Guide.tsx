import { useRef, useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import { useAppDispatch, useAppSelector } from "../../store";
import { finishGreeting } from "../../store/reducers/greeting";
// import { setUser } from "../../store/reducers/userSlice";
// import { RootState } from "../../store";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { updateGrassEarnings } from "../../store/reducers/userSlice";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
const cn = classNames.bind(styles);

const Guide = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.greeting.isOpen);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   // const user = useSelector((state: RootState) => state.user.user);

   const [step, setStep] = useState(1);

   const coinMoneyAnimRef = useRef<HTMLImageElement>(null);
   // const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);

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
         dispatch(finishGreeting());
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
   return (
      <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}}>
         {/* Introduction */}
         {step === 1 && (
            <div className={cn("greeting__body", "_first")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
               {t('instruction')}
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
                     src="img/guide/first.png"
                     className={cn("content__person-img", "_first")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('guide1')}
                  </p>
               </div>
            </div>
         )}

         {/* Game Advantages */}
         {step === 2 && (
            <div className={cn("greeting__body", "_second")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
                  {t('instruction')}
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
                     src="img/guide/second.png"
                     className={cn("content__person-img", "_second")}
                  />
                  <p className={`${cn("content__text", "_second")}` + ' textInvite3'}>
                  {t('guide2')}
                  </p>
               </div>
            </div>
         )}

         {/* Game Advantages */}
         {step === 3 && (
            <div className={cn("greeting__body", "_third")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
                  {t('instruction')}
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
                     src="img/guide/third.png"
                     className={cn("content__person-img", "_third")}
                  />
                  <p className={`${cn("content__text", "_third")}` + ' textInvite3'}>
                  {t('guide3')}
                  </p>
               </div>
            </div>
         )}

         {/* Welcome bonus */}
         {step === 4 && (
            <div className={cn("greeting__body", "_fourth")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
               {t('instruction')}
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
                     src="img/guide/fourth.png"
                     className={cn("content__person-img", "_fourth")}
                  />
                  <div className={cn("content__flex")}>
                  <p className={`${cn("content__text", "_fourth")}` + ' textInvite3'}>
                  {t('guide4')}
                     </p>
                     {/* <div className={cn("content__end-btn-wrap")}>
                        <Button
                           className={cn("content__end-btn")}
                           onClick={handleAddCoins}>
                           <CoinWhiteBg size="small" />
                           <span className="textShadow">+2000</span>
                        </Button>
                     </div> */}
                     <img
                        src="img/pages/home/money1.svg"
                        className={cn("content__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </div>
         )}
                  {step === 5 && (
            <div className={cn("greeting__body", "_fourth")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
               {t('instruction')}
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
                     src="img/guide/fifth.png"
                     className={cn("content__person-img", "_fourth")}
                  />
                  <div className={cn("content__flex")}>
                  <p className={`${cn("content__text", "_fourth")}` + ' textInvite3'}>
                  {t('guide5')}
                     </p>
                     {/* <div className={cn("content__end-btn-wrap")}>
                        <Button
                           className={cn("content__end-btn")}
                           onClick={handleAddCoins}>
                           <CoinWhiteBg size="small" />
                           <span className="textShadow">+2000</span>
                        </Button>
                     </div> */}
                     <img
                        src="img/pages/home/money1.svg"
                        className={cn("content__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </div>
         )}
                           {step === 6 && (
            <div className={cn("greeting__body", "_fourth")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
               {t('instruction')}
               </strong>
{/* Иконка next */}
<img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={fihish}
               />
               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/guide/six.png"
                     className={cn("content__person-img", "_fifth")}
                  />
                  <div className={cn("content__flex")}>
                  <p className={`${cn("content__text", "_fourth")}` + ' textInvite3'}>
                  {t('guide6')}
                     </p>
                     {/* <div className={cn("content__end-btn-wrap")}>
                        <Button
                           className={cn("content__end-btn")}
                           onClick={handleAddCoins}>
                           <CoinWhiteBg size="small" />
                           <span className="textShadow">+2000</span>
                        </Button>
                     </div> */}
                     <img
                        src="img/pages/home/money1.svg"
                        className={cn("content__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Guide;
