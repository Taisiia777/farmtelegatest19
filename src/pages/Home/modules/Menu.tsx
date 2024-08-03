import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/routes";
// import { useHarvestAllWheat } from "../hooks/useHarvestAllWheat";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useOutletContext } from 'react-router-dom';

const cn = classNames.bind(styles);

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
 
 // interface ReferralEarnings {
 //   id: number;
 //   coinsEarned: number;
 // }
 interface Friend extends User {
   coinsEarned?: number;
   secondTierEarnings?: number; // Заработки с рефералов второго уровня
   thirdTierEarnings?: number; // Заработки с рефералов третьего уровня
 }
interface IMenuProps {
   onBoostOpen: () => void;
   onEarnOpen: () => void;
   onCoinsOpen: () => void;
}

const Menu = ({ onBoostOpen, onEarnOpen, onCoinsOpen}: IMenuProps) => {
   const { friends } = useOutletContext<OutletContext>();

   // const harvestAllWheat = useHarvestAllWheat();
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
      // Применяем стили ко всем элементам
      document.querySelectorAll('.textMenu').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '10px';
          element.style.fontWeight = '700';
        }
      });
    }
     
   }, []);
   const navigate = useNavigate();
   const isFrensDisabled = !friends || friends.length === 0;
   return (
      <>
         <div className={cn("menu")} id="menu">
            {/* Border */}
            <img
               src="img/pages/home/menu/border.svg"
               className={cn("menu__border")}
               alt="border"
            />

            {/* Menu elements */}
            <div className={cn("menu__body")}>
               <ul className={cn("menu__list")}>
             
                  <li  onClick={() => onCoinsOpen()}>
                  <img src="img/pages/home/menu/Earn.svg" alt="Earn" />
                     <span className="textShadow textMenu">{t('coins')}</span>
                  </li>
                  <li onClick={() => onBoostOpen()}>
                     <img src="img/pages/home/menu/Boost.svg" alt="Boost" />
                     <span className="textShadow textMenu">{t('boost')}</span>
                  </li>
                  {/* <li onClick={harvestAllWheat}> */}
                  <li >

                     <img src="img/pages/home/menu/Farm.svg" alt="Farm" />
                     <img src="img/pages/home/menu/wheat.svg" alt="" />
                  </li>
                  {/* <li
                
                     // onClick={() =>
                     //    navigate(Routes.PEOPLE, {
                     //       state: {
                     //          label: "LEADERBOARD",
                     //       },
                     //    })
                     // }
                     onClick={() => navigate(Routes.INVITE)}
                     >
                     <img src="img/pages/home/menu/Top.svg" alt="Top" />
                     <span className="textShadow">{t('frens')}</span>
                  </li> */}
                   <li
                     onClick={() => !isFrensDisabled && navigate(Routes.INVITE)}
                     className={cn({ 'disabled': isFrensDisabled })} // Добавляем класс для отключенной кнопки
                     style={isFrensDisabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                     <img src="img/pages/home/menu/Top.svg" alt="Top" />
                     <span className="textShadow textMenu">{t('frens')}</span>
                  </li>
                  <li onClick={() => onEarnOpen()}>
                     <img src="img/pages/home/menu/Stats.svg" alt="Stats" />
                     <span className="textShadow textMenu">{t('earn')}</span>
                  </li>
                  <li onClick={() => navigate(Routes.STATS)} style={{position:"absolute", top: "-85vh", right: "20px", zIndex:"1"}}>
                     <img src="img/pages/home/menu/Stats1.svg" alt="Stats" />
                     <span className="textShadow">{t('stats')}</span>
                  </li>
                  <li onClick={() => window.Telegram.WebApp.openLink('https://t.me/+JznU1FxTemM5NjY8')} style={{position:"absolute", top: "-85vh", left: "20px", zIndex:"1"}}>
                     <img src="img/pages/home/menu/Chat.svg" alt="Stats" />
                     <span className="textShadow">{t('chat')}</span>
                  </li>
               </ul>
            </div>
         </div>
         
      </>
   );
};

export default Menu;
