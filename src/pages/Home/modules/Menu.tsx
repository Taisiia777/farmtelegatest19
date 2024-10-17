import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/routes";
import { useAppSelector } from "../../../store";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { openGuide1 } from "../../../store/reducers/guide1";
import { openWallet } from "../../../store/reducers/wallet";


const cn = classNames.bind(styles);


interface IMenuProps {
   onBoostOpen: () => void;
   onEarnOpen: () => void;
   onCoinsOpen: () => void;
   onGamesOpen: () => void;

}

const Menu = ({ onBoostOpen, onEarnOpen, onCoinsOpen, onGamesOpen}: IMenuProps) => {
   const dispatch = useAppDispatch();
   const isReady = useAppSelector((state) => state.wheel.isReady);

   const handleGuideClick = () => {
      dispatch(openGuide1());
  };
  const handleWalletClick = () => {
   dispatch(openWallet());
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
     if (userLanguage !== 'en') {
      // Применяем стили ко всем элементам
      document.querySelectorAll('.textMenu').forEach(element => {
        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
          element.style.fontSize = '14px';
          element.style.fontWeight = '700';
        }
      });
      document.querySelectorAll('.textMenu1').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
           element.style.fontSize = '10px';
           element.style.fontWeight = '700';
         }
       });
       document.querySelectorAll('.textMenu2').forEach(element => {
         if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
           element.style.fontSize = '16px';
           element.style.fontWeight = '700';
         }
       });
    }

   }, []);
   const navigate = useNavigate();
   return (
      <>
         
         <div className={cn("menu")} id="menu">
            {/* Border */}

            <img
               src="img/pages/home/menu/menu_bottom_border.svg"
               className={cn("menu__border")}
               alt="border"
               style={{position:"absolute", top:"0"}}
            />

            {/* Menu elements */}
            <div className={cn("menu__body")}>
               <ul className={cn("menu__list")}>
               <li onClick={() => onBoostOpen()}>
                     <img src="img/pages/home/menu/Boost.svg" style={{width:"55px", height: "55px", marginTop: "-6px"}} alt="Boost"/>
                     <span className="textShadow textMenu1" style={{marginTop: "-4px"}}>{t('fertilizers')}</span>
                  </li>
                  <li  onClick={() => onCoinsOpen()}>
                  <img src="img/pages/home/menu/lopata.svg" style={{width:"46px", height: "46px"}} alt="Earn" />
                     <span className="textShadow textMenu1" style={{marginTop: "4px"}}>{t('boost')}</span>
                  </li>
                  
                  {/* <li onClick={harvestAllWheat}> */}
                  <li onClick={() => onGamesOpen()} style={{}}>

                     <img src="img/pages/home/menu/Farm228.png" className={cn("menu__farm")}  alt="Farm" />
                     {isReady && (
    <img 
      src="img/pages/home/menu/ready.svg" 
      alt="Ready" 
      style={{ display: 'flex', position: 'absolute', top: '3px', right:'3px', width: "20px", height:"20px", zIndex:'12' }} 
    />
  )}
                     {/* <span className="textShadow textMenu1" style={{zIndex:'3', display: 'flex', position: 'absolute', bottom:'3px'
                     }}>{t('apps')}</span> */}

                  </li>
                  
                   <li
                     onClick={() => navigate(Routes.INVITE)}
                     
                   
                  >
                     <img src="img/pages/home/menu/Top.svg" style={{width:"46px", height: "45px"}} alt="Top" />
                     <span className="textShadow textMenu1" style={{marginTop: "4px"}}>{t('frens')}</span>
                  </li>
                  <li onClick={() => onEarnOpen()}>
                     <img src="img/pages/home/menu/Stats.svg" style={{width:"55px", height: "46px"}} alt="Stats" />
                     <span className="textShadow textMenu1">{t('earn')}</span>
                  </li>
                  <li onClick={() => navigate(Routes.STATS)} style={{position:"absolute", top: "-85vh", right: "20px", zIndex:"1"}}>
                     <img src="img/pages/home/menu/stats.png" alt="Stats" style={{height:"45px", width: "50px"}}/>
                     <span className="textShadow" style={{display:"flex",marginTop:"-5px"}}>{t('stats')}</span>
                  </li>
                  <li onClick={() => window.Telegram.WebApp.openLink('https://t.me/+JznU1FxTemM5NjY8')} style={{position:"absolute", top: "-85vh", left: "20px", zIndex:"1"}}>
                     <img src="img/pages/home/menu/chat.png" alt="Stats" style={{height:"45px", width: "50px"}}/>
                     <span className="textShadow" style={{display:"flex",marginTop:"-5px"}}>{t('chat')}</span>
                  </li>
               
                  <li onClick={handleGuideClick} style={{position:"absolute", top: "-10vh", left: "5px", zIndex:"1"}}>
                     <img src="img/pages/home/menu/guide.png" alt="Stats" style={{width:"45px", height: "48px"}}/>
                  </li>
                  <li onClick={handleWalletClick} style={{position:"absolute", top: "-10vh", right: "5px", zIndex:"1",}}>
                     <img src="img/pages/home/menu/wallet.png" alt="Stats" style={{width:"45px", height: "48px"}}/>
                  </li>
               </ul>
            </div>
         </div>
         
      </>
   );
};

export default Menu;
