import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/routes";
// import { useHarvestAllWheat } from "../hooks/useHarvestAllWheat";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
const cn = classNames.bind(styles);

interface IMenuProps {
   onBoostOpen: () => void;
   onEarnOpen: () => void;
   onCoinsOpen: () => void;
}

const Menu = ({ onBoostOpen, onEarnOpen, onCoinsOpen}: IMenuProps) => {
   // const harvestAllWheat = useHarvestAllWheat();
   const { t } = useTranslation();
   useEffect(() => {
     i18n.changeLanguage('en'); 
     // const initData = window.Telegram.WebApp.initDataUnsafe;
     // const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
     
     // if (['en', 'ru', 'ukr'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
     //   i18n.changeLanguage(userLanguage);
     // } else {
     //   i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
     // }
   }, []);
   const navigate = useNavigate();
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
                     <span className="textShadow">{t('coins')}</span>
                  </li>
                  <li onClick={() => onBoostOpen()}>
                     <img src="img/pages/home/menu/Boost.svg" alt="Boost" />
                     <span className="textShadow">{t('boost')}</span>
                  </li>
                  {/* <li onClick={harvestAllWheat}> */}
                  <li >

                     <img src="img/pages/home/menu/Farm.svg" alt="Farm" />
                     <img src="img/pages/home/menu/wheat.svg" alt="" />
                  </li>
                  <li
                
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
                  </li>
                  <li onClick={() => onEarnOpen()}>
                     <img src="img/pages/home/menu/Stats.svg" alt="Stats" />
                     <span className="textShadow">{t('earn')}</span>
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
