


import { useRef, useState, useEffect} from "react";

import classNames from "classnames/bind";
import styles from "./Combo.module.scss";

import { useAppDispatch, useAppSelector } from "../../store";
import { finishCombo} from "../../store/reducers/combo";

import useOutsideClick from '../../pages/Home/hooks/useOutsideClick'; // Импортируйте ваш хук
import axios from "axios";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import comboConfig from './comboConfig.json'; // Импортируем JSON с конфигурацией
import { RootState } from "../../store";
import { setUser } from "../../store/reducers/userSlice";
import { retrieveLaunchParams } from '@tma.js/sdk';

// Описываем интерфейс для элемента Combo
interface ComboItem {
  id: number;
  type: 'leaf' | 'skull' | 'box'; // Допустимые типы
}

// Описываем интерфейс для данных из JSON
interface ComboConfig {
  date: string;
  items: ComboItem[];
}
const cn = classNames.bind(styles);

const Combo = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.combo.isOpen);
  const [items, setItems] = useState<ComboItem[]>([]); // Указываем, что items — это массив объектов ComboItem
  const [leafCount, setLeafCount] = useState(0);
  const [skullCount, setSkullCount] = useState(0);
  const [step, setStep] = useState(1); // Текущий шаг
  const user = useAppSelector((state: RootState) => state.user.user);
  const isLoading = useAppSelector((state) => state.preloader.isLodaing);
  const [reward, setReward] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  


  const leagues = [
    { name: "Wooden", referralsRequired: 3, referralsTo: 0, harvest: 1 },
    { name: "Silver", referralsRequired: 10, referralsTo: 3, harvest: 1.5 },
    { name: "Gold", referralsRequired: 50, referralsTo: 10, harvest: 2 },
    { name: "Fire", referralsRequired: 200, referralsTo: 50, harvest: 3 },
    { name: "Diamond", referralsRequired: 1000, referralsTo: 200, harvest: 4 },
    { name: "Ruby", referralsRequired: 1001, referralsTo: 1000, harvest: 5 },
  ];
  
  // Функция для проверки допустимых значений type
  const isValidType = (type: string): type is ComboItem['type'] => {
    return ['leaf', 'skull', 'box'].includes(type);
  };

  // Функция для получения конфигурации на текущую дату
  const getCurrentComboConfig = () => {
    const now = new Date();
    const nowMsk = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    const todayDateStr = nowMsk.toLocaleDateString('ru-RU'); // Формат ДД.ММ.ГГГГ
    
    const todayCombo = (comboConfig as ComboConfig[]).find((combo) => combo.date === todayDateStr);
    if (todayCombo) {
      // Инициализируем все элементы как "box" независимо от их типа в JSON
      const initializedItems: ComboItem[] = todayCombo.items.map(item => ({ id: item.id, type: 'box' }));
      setItems(initializedItems); // Устанавливаем все элементы как "box"
    }
  };

  useEffect(() => {
    getCurrentComboConfig(); // Загружаем данные для актуальной даты при монтировании компонента
  }, []);

  // Функция обработки клика по ячейке
  const handleItemClick = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      // Меняем на "leaf" или "skull" в зависимости от данных JSON
      const itemConfig = comboConfig.find(combo => combo.date === new Date().toLocaleDateString('ru-RU'))?.items[index];
      if (itemConfig && isValidType(itemConfig.type)) {
        newItems[index] = { ...newItems[index], type: itemConfig.type }; // Меняем на лист или череп
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
  useEffect(() => {
    const fetchUserData = async () => {
      const { initData } = retrieveLaunchParams();
      if (initData && initData.user) {
        const user = initData.user;
        const username = user.username;
        const userId = user.id;
  
        try {
          // Fetch referral code
          const referralResponse = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
          const referralCode = referralResponse.data.referral_code;
  
          // Fetch user data
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
  
          let userData = userResponse.data;
  
               // Fetch rewards
               const rewardsResponse = await axios.get(`https://coinfarm.club/api/reward/${userData.id}`);
               const comboRewards = rewardsResponse.data.filter((reward: any) => reward.type === "combo");
       
               if (comboRewards.length > 0) {
                 const lastReward = comboRewards[comboRewards.length - 1];
                 const lastRewardDate = new Date(lastReward.description);
       
                 // Преобразование времени награды в московское время (UTC+3)
                 const lastRewardMsk = new Date(lastRewardDate.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
       
                 // Получаем текущее время по московскому времени
                 const nowMsk = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
       
                 // Устанавливаем 14:00 сегодняшнего дня по московскому времени
                 const today14Msk = new Date(nowMsk);
                 today14Msk.setHours(14, 0, 0, 0);
       
                 // Устанавливаем 14:00 вчерашнего дня по московскому времени
                 const yesterday14Msk = new Date(today14Msk);
                 yesterday14Msk.setDate(today14Msk.getDate() - 1);
       
   
                 // Проверяем, была ли награда получена между 14:00 вчерашнего дня и 14:00 сегодняшнего дня по московскому времени
                 if (lastRewardMsk >= yesterday14Msk && lastRewardMsk < today14Msk) {
                   setIsCompleted(true); // Награда получена в этом промежутке
                 } else {
                   setIsCompleted(false); // Награда не получена в этом промежутке
                 }
               } else {
                 setIsCompleted(false); // Наград нет, значит комбо не выполнено
               }
          dispatch(setUser(userData));
        } catch (error) {
          console.error("Error fetching user/rewards:", error);
        }
      }
    };
  
    fetchUserData();
  }, [dispatch]);
  
  // Функция для выдачи награды
  const giveUserReward = (reward: number) => {
    // Уведомляем, что запрос еще не завершен
    if (reward > 0) {
      axios
        .patch(`https://coinfarm.club/api/user/${user.id}/earn/${reward}`)
        .then((response) => {
          // Выводим сообщение об успешной выдаче награды
          dispatch(setUser({
            ...user,
            coins: user.coins + reward,
            totalEarnings: user.totalEarnings + reward
          }));
          console.log(`Reward given: ${reward} coins`, response.data);
        })
        .catch((error) => {
          console.error('Error awarding coins:', error);
        });
      axios.post(`https://coinfarm.club/api/reward/combo/${user.id}`)
      
    }
  };


  // Проверка на выигрыш или проигрыш
  useEffect(() => {
    if (leafCount === 3) {
      const userLeagueIndex =  user.level;
      const userHarvestMultiplier = leagues[userLeagueIndex]?.harvest || 1;
      const calculatedInHour = user.coinsPerHour * userHarvestMultiplier;
      setReward(calculatedInHour / 3)
      giveUserReward(calculatedInHour / 3); // Выдаем 1000 монет
      setStep(2); // Переключаем на step 2
      setIsCompleted(true)
    } else if (skullCount === 1) {
      setStep(3); // Переключаем на step 3
      setIsCompleted(true)
    }
  }, [leafCount, skullCount]); // Выполняем проверку при изменении листиков или черепов



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
  
    // Перезапуск применения стилей при изменении количества элементовs
    const observer = new MutationObserver(applyStyles);
    observer.observe(document.body, { childList: true, subtree: true });
  
    return () => {
      observer.disconnect();
    };
   }, []);
   const wheelRef = useRef<HTMLDivElement>(null);

   useOutsideClick(() => dispatch(finishCombo()), [wheelRef]);

   return (
      <div className={cn("greeting", !isLoading && isOpen && "_active")} style={{zIndex: '100'}} id="fortune">
            {isOpen && (
               <img
                  src="img/global/closeIcon.svg"
                  onClick={() => {
                    setStep(1)
                    dispatch(finishCombo());
                  }}
                  className={cn("close")}
                  alt="Close"
               />
            )}

{step === 1 && (
            <div style={{display: 'flex', flexDirection:'column', width: '100%', height:'100%', position:'relative'}} ref={wheelRef}>



        {/* <div className={cn("grid-container")} >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("grid-item")}
            
            onClick={() => handleItemClick(index)}
          >
            {item === 'box' && <img src="img/pages/home/menu/combo_box.png" alt="Box" />}
            {item === 'leaf' && <img src="img/pages/home/menu/combo_leaf.png" alt="Leaf" />}
            {item === 'skull' && <img src="img/pages/home/menu/combo_scull.png" alt="Skull" />}
          </div>
        ))}
      </div> */}

<div className={cn("grid-container", { "_inactive": isCompleted })}>
  <div>
    <img src="img/pages/home/menu/combo_light.png" alt="Box" />
  </div>
  {items.map((item, index) => (
    <div
      key={index}
      className={cn("grid-item")}
      onClick={() => !isCompleted && handleItemClick(index)} // Отключаем клик, если isCompleted true
    >
      {item.type === 'box' && <img src="img/pages/home/menu/combo_box.png" alt="Box" />}
      {item.type === 'leaf' && <img src="img/pages/home/menu/combo_leaf.png" alt="Leaf" />}
      {item.type === 'skull' && <img src="img/pages/home/menu/combo_scull.png" alt="Skull" />}
    </div>
  ))}
</div>

             
            </div>
         )}
          {step === 2 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
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
                  {t('wheel_reward')} {Math.round(reward)} FarmCoins
                  </p>
               </div>
            </div>
         )}
                  {step === 3 && (
            <div className={cn("greeting__body", "_first")} ref={wheelRef} id="fortune1">
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
                  {t('wheel_reward')} 0 FarmCoins
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}

export default Combo;
