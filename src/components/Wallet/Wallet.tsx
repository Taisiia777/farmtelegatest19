
import { useRef, useState, useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./Wallet.module.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store";
import { finishWallet } from "../../store/reducers/wallet";

import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { RootState } from "../../store";

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);

const Wallet = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.wallet.isOpen);
   const user = useAppSelector((state: RootState) => state.user.user);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   const [step, setStep] = useState(1);

  //  const address = useTonAddress();
   
  //  useEffect(() => {
  //     const fetchData = async () => {
  //        if (address) {
  //           try {
  //              const { data } = await axios.get(`https://coinfarm.club/api/wallet/${user.id}`);
  //              if (data.address !== address) {
  //                 await axios.post('https://coinfarm.club/api/wallet', { userId: user.id, walletAddress: address });
  //              }
  //           } catch (error) {
  //              console.error('Error fetching wallet data', error);
  //           }
  //        }
  //     };
      
  //     fetchData();
  //  }, [address]);

  const address = useTonAddress();

  useEffect(() => {
     const fetchData = async () => {
        if (address) {
           try {
              const { data } = await axios.get(`https://coinfarm.club/api/wallet/${user.id}`);
              // Если кошелек уже существует, проверяем адрес и обновляем его при необходимости
              if (data.address !== address) {
                 await axios.post('https://coinfarm.club/api/wallet', { userId: user.id, walletAddress: address });
              }
           } catch (error: unknown) {
              if (axios.isAxiosError(error)) {
                 if (error.response && error.response.status === 404) {
                    // Если кошелек не найден (404), создаем новый
                    try {
                       await axios.post('https://coinfarm.club/api/wallet', { userId: user.id, walletAddress: address });
                    } catch (createError: unknown) {
                       if (axios.isAxiosError(createError)) {
                          console.error('Error creating wallet', createError.message);
                       } else {
                          console.error('Unexpected error creating wallet', createError);
                       }
                    }
                 } else {
                    console.error('Error fetching wallet data', error.message);
                 }
              } else {
                 console.error('Unexpected error fetching wallet data', error);
              }
           }
        }
     };
     
     fetchData();
  }, [address]);
  

  //  function goNext() {
  //     setStep((prev) => prev + 1);
  //  }


  //  function fihish() {

  //        setStep(1)
  //        dispatch(finishWallet());
  //  }
   
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

   useOutsideClick(() => dispatch(finishWallet()), [wheelRef]);

   return (
      <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} id="fortune">
            {isOpen && (
               <img
                  src="img/global/closeIcon.svg"
                  onClick={() => {
                    setStep(1)
                    dispatch(finishWallet());
                  }}
                  className={cn("close")}
                  alt="Close"
               />
            )}
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
               {t('wallet_title')}
               </strong>

              

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/pages/home/menu/Wallet1.svg"
                     className={cn("content__person-img", "_first2")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wallet')}
                  </p>
                  <div style={{ 
   position: 'absolute', 
   top:"27vh",
   left: '50%', 
   transform: 'translateX(-50%)' 
}}>
   <TonConnectButton />
</div>
               </div>
            </div>
         )}
         {step === 2 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
               {t('wallet_title1')}
               </strong>

               


               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/pages/home/menu/Wallet1.svg"
                     className={cn("content__person-img", "_first2")}
                  />
                  <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
                  {t('wallet1')}
                  </p>
                  {/* Иконка next */}
                  <div style={{ 
   position: 'absolute', 
   top:"30vh",
   left: '50%', 
   transform: 'translateX(-50%)' 
}}>
   <TonConnectButton />
</div>

               </div>
            </div>
         )}
        
      </div>
   );
}

export default Wallet;
