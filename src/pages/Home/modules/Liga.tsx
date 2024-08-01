import { TLiga } from "../../../types/globalTypes";

import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { RootState } from "../../../store";
import { useAppSelector } from "../../../store";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
const cn = classNames.bind(styles);

interface LigaProps {
   liga: TLiga;
   onLigaOpen: () => void;
   onClick: () => void;
}

const Liga = ({ liga, onLigaOpen, onClick }: LigaProps) => {
   const leagues = [
      { name: "Wooden", referralsRequired: 3, referralsTo: 0, harvest: 1 },
      { name: "Silver", referralsRequired: 10, referralsTo: 3, harvest: 1.5 },
      { name: "Gold", referralsRequired: 50, referralsTo: 10, harvest: 2 },
      { name: "Fire", referralsRequired: 200, referralsTo: 50, harvest: 3 },
      { name: "Diamond", referralsRequired: 1000, referralsTo: 200, harvest: 4 },
      { name: "Ruby", referralsRequired: 1001, referralsTo: 1000, harvest: 5 },
    ];
   const user = useAppSelector((state: RootState) => state.user.user);
   const userLeagueIndex = user ? user.level : 0;
   const userHarvestMultiplier = leagues[userLeagueIndex]?.harvest || 1;
   const { t } = useTranslation();
   useEffect(() => {
     const initData = window.Telegram.WebApp.initDataUnsafe;
     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
     
     if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
       i18n.changeLanguage(userLanguage);
     } else {
       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
     }
   }, []);
   return (
      <div style={{position:"absolute", top: "-66vh", left: "50%", transform: "translateX(-50%)", zIndex:"1"}} className={cn("liga")} onClick={onLigaOpen} id="league">
         <img src={`img/leagueIcons/${liga}.png`} alt="Wooden" />
         <span className="textShadow"> {t(`${liga.toLocaleLowerCase()}`)}  {t(`leagues`)} (x{userHarvestMultiplier})</span>
         <img onClick={onClick} style={{display: 'flex',  width:'22px', height:'22px'}} src={`img/leagueIcons/Plus.svg`} alt="plus" />
      </div>
   );
};

export default Liga;
