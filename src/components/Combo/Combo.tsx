


// import { useRef, useState, useEffect} from "react";

// import classNames from "classnames/bind";
// import styles from "./Combo.module.scss";

// import { useAppDispatch, useAppSelector } from "../../store";
// import { finishCombo} from "../../store/reducers/combo";

// import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук

// import i18n from '../../i18n';
// import { useTranslation } from 'react-i18next';
// import comboConfig from './comboConfig.json'; // Импортируем JSON с конфигурацией


// const cn = classNames.bind(styles);

// const Combo = () => {
//    const dispatch = useAppDispatch();
//    const isOpen = useAppSelector((state) => state.combo.isOpen);
//    const [items, setItems] = useState(Array(9).fill('box')); // Изначально все блоки с коробкой

//    // Состояние прелоудреа
//    const isLoading = useAppSelector((state) => state.preloader.isLodaing);
//    const [step, setStep] = useState(1);

  












//    const handleItemClick = (index: number) => {
//     setItems((prevItems) => {
//       const newItems = [...prevItems];
//       const itemConfig = comboConfig.items.find(item => item.id === index + 1);
//       if (itemConfig) {
//         newItems[index] = itemConfig.type; // Меняем на лист или череп
//       }
//       return newItems;
//     });
//   };
 


//   //  function fihish() {

//   //        setStep(1)
//   //        dispatch(finishCombo());
//   //  }

//    const { t } = useTranslation();
//    useEffect(() => {
//      const initData = window.Telegram.WebApp.initDataUnsafe;
//      const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
//      if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
//        i18n.changeLanguage(userLanguage);
//      } else {
//        i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
//      }
    
//    const applyStyles = () => {
//       document.querySelectorAll('.textMenu').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//            element.style.fontSize = '14px';
//            element.style.fontWeight = '700';
//          }
//        });
//        document.querySelectorAll('.textMenu2').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//            element.style.fontSize = '18px';
//            element.style.fontWeight = '700';
//          }
//        });
//        document.querySelectorAll('.textMenu1').forEach(element => {
//           if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//             element.style.fontSize = '12px';
//             element.style.fontWeight = '700';
//           }
//         });
//         document.querySelectorAll('.textInvite').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//            element.style.fontSize = '20px';
//            element.style.fontWeight = '700';
//          }
//        });
//        document.querySelectorAll('.textInvite1').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//            element.style.fontSize = '15px';
//            element.style.fontWeight = '400';
//          }
//        });
//        document.querySelectorAll('.textInvite2').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//            element.style.fontSize = '12px';
//            element.style.fontWeight = '700';
//          }
//        });
//        document.querySelectorAll('.textInvite3').forEach(element => {
//         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//           element.style.fontSize = '18px';
//           element.style.fontWeight = '700';
//         }
//       });
//       document.querySelectorAll('.textWheel').forEach(element => {
//         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//           element.style.fontSize = '12px';
//           element.style.fontWeight = '700';
//         }
//       });
//       document.querySelectorAll('.textWheel1').forEach(element => {
//         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//           element.style.fontSize = '10px';
//           element.style.fontWeight = '700';
//         }
//       });
//       document.querySelectorAll('.textInvite4').forEach(element => {
//         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//           element.style.fontSize = '10px';
//           element.style.fontWeight = '700';
//         }
//       });
//       document.querySelectorAll('.textInvite5').forEach(element => {
//         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//           element.style.fontSize = '14px';
//           element.style.fontWeight = '700';
//         }
//       });
//          document.querySelectorAll('.textInvite6').forEach(element => {
//          if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//             element.style.fontSize = '10px';
//             element.style.fontWeight = '700';
//          }
//          });
//       // Добавьте остальные стили аналогичным образом
//     };
//     if (userLanguage !== 'en') {
 
//       applyStyles();

//     }
  
//     // Перезапуск применения стилей при изменении количества элементовs
//     const observer = new MutationObserver(applyStyles);
//     observer.observe(document.body, { childList: true, subtree: true });
  
//     return () => {
//       observer.disconnect();
//     };
//    }, []);
//    const wheelRef = useRef<HTMLDivElement>(null);

//    useOutsideClick(() => dispatch(finishCombo()), [wheelRef]);

//    return (
//       <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} id="fortune">
//             {isOpen && (
//                <img
//                   src="img/global/closeIcon.svg"
//                   onClick={() => {
//                     setStep(1)
//                     dispatch(finishCombo());
//                   }}
//                   className={cn("close")}
//                   alt="Close"
//                />
//             )}

// {step === 1 && (
//             <div style={{display: 'flex', flexDirection:'column', width: '100%', height:'100%', position:'relative'}} ref={wheelRef}>



//         <div className={cn("grid-container")} >
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className={cn("grid-item")}
//             onClick={() => handleItemClick(index)}
//           >
//             {item === 'box' && <img src="img/pages/home/menu/combo_box.png" alt="Box" />}
//             {item === 'leaf' && <img src="img/pages/home/menu/combo_leaf.png" alt="Leaf" />}
//             {item === 'skull' && <img src="img/pages/home/menu/combo_scull.png" alt="Skull" />}
//           </div>
//         ))}
//       </div>

             
//             </div>
//          )}
//           {step === 2 && (
//             <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
//                <img
//                   src="img/global/popup-border.svg"
//                   className={cn("greeting__border")}
//                />

//                {/* Надпись на popup-border */}
//                <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
//                {t('wheel_rew_title')}
//                </strong>

//                {/* Иконка next */}
//                <img
//                   src="img/global/next-btn.svg"
//                   className={cn("greeting__next")}
//                   alt="Далее"
//                   onClick={()=>{setStep(1)}}
//                />

//                {/* Контент */}
//                <div className={cn("greeting__content", "content")}>
//                   <img
//                      src="img/pages/home/menu/Reward.png"
//                      className={cn("content__person-img", "_first1")}
//                   />
//                   <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
//                   {t('wheel_reward')} 1000 FarmCoins
//                   </p>
//                </div>
//             </div>
//          )}
//                   {step === 3 && (
//             <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
//                <img
//                   src="img/global/popup-border.svg"
//                   className={cn("greeting__border")}
//                />

//                {/* Надпись на popup-border */}
//                <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
//                {t('wheel_rew_title')}
//                </strong>

//                {/* Иконка next */}
//                <img
//                   src="img/global/next-btn.svg"
//                   className={cn("greeting__next")}
//                   alt="Далее"
//                   onClick={()=>{setStep(1)}}
//                />

//                {/* Контент */}
//                <div className={cn("greeting__content", "content")}>
//                   <img
//                      src="img/pages/home/menu/Reward.png"
//                      className={cn("content__person-img", "_first1")}
//                   />
//                   <p className={`${cn("content__text", "_first")}` + ' textInvite3'}>
//                   {t('wheel_reward')} 1000 FarmCoins
//                   </p>
//                </div>
//             </div>
//          )}
//       </div>
//    );
// }

// export default Combo;
import { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Combo.module.scss";
import axios from "axios"; // Импортируем axios для работы с API
import { useAppDispatch, useAppSelector } from "../../store";
import { finishCombo } from "../../store/reducers/combo";
import useOutsideClick from '../../pages/Home/hooks/useOutsideClick';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import comboConfig from './comboConfig.json'; // Импортируем JSON с конфигурацией

const cn = classNames.bind(styles);

const Combo = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.combo.isOpen);
  const [items, setItems] = useState(Array(9).fill('box')); // Изначально все блоки с коробкой
  const [leafCount, setLeafCount] = useState(0); // Состояние для отслеживания количества листиков
  const [skullCount, setSkullCount] = useState(0); // Состояние для отслеживания количества черепов
  const [step, setStep] = useState(1); // Текущий шаг
  const userIdNumber = 123; // Пример: идентификатор пользователя
  const isLoading = useAppSelector((state) => state.preloader.isLodaing);
  
  const { t } = useTranslation();

  // Функция для выдачи награды
  const giveUserReward = (reward: number) => {
    // Уведомляем, что запрос еще не завершен
    if (reward > 0) {
      axios
        .patch(`https://coinfarm.club/api/user/${userIdNumber}/earn/${reward}`)
        .then((response) => {
          // Выводим сообщение об успешной выдаче награды
          console.log(`Reward given: ${reward} coins`, response.data);
        })
        .catch((error) => {
          console.error('Error awarding coins:', error);
        });
    }
  };

  // Функция обработки клика по ячейке
  const handleItemClick = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const itemConfig = comboConfig.items.find(item => item.id === index + 1);
      if (itemConfig) {
        newItems[index] = itemConfig.type; // Меняем на лист или череп
        // Обновляем счетчики
        if (itemConfig.type === 'leaf') {
          setLeafCount((prev) => prev + 1);
        } else if (itemConfig.type === 'skull') {
          setSkullCount((prev) => prev + 1);
        }
      }
      return newItems;
    });
  };

  // Проверка на выигрыш или проигрыш
  useEffect(() => {
    if (leafCount === 3) {
      setStep(2); // Переключаем на step 2
      giveUserReward(1000); // Выдаем 1000 монет
    } else if (skullCount === 3) {
      setStep(3); // Переключаем на step 3
    }
  }, [leafCount, skullCount]); // Выполняем проверку при изменении листиков или черепов

  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en';
    if (['en', 'ru', 'uk'].includes(userLanguage)) {
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en');
    }
  }, []);

  const wheelRef = useRef(null);
  useOutsideClick(() => dispatch(finishCombo()), [wheelRef]);

  return (
    <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} id="fortune">
      {isOpen && (
        <img
          src="img/global/closeIcon.svg"
          onClick={() => {
            setStep(1);
            dispatch(finishCombo());
          }}
          className={cn("close")}
          alt="Close"
        />
      )}

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', position: 'relative' }} ref={wheelRef}>
          <div className="grid-container">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => handleItemClick(index)}
              >
                {item === 'box' && <img src="img/pages/home/menu/combo_box.png" alt="Box" />}
                {item === 'leaf' && <img src="img/pages/home/menu/combo_leaf.png" alt="Leaf" />}
                {item === 'skull' && <img src="img/pages/home/menu/combo_scull.png" alt="Skull" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
          <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
            {t('wheel_rew_title')}
          </strong>
          <p>{t('wheel_reward')} 1000 FarmCoins</p>
        </div>
      )}

      {step === 3 && (
        <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
          <strong className={`${cn("greeting__label", "_first")}` + ' textInvite3'}>
            {t('wheel_lost_title')}
          </strong>
          <p>{t('wheel_lose_message')}</p>
        </div>
      )}
    </div>
  );
};

export default Combo;
