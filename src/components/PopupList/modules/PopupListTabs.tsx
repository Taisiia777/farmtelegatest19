import classNames from "classnames/bind";
import styles from "../PopupList.module.scss";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
const cn = classNames.bind(styles);

interface ITabsProps {
   labels: string[];
   activeTab: string;
   onTabChange: (label: string) => void;
   labelClassName?: string;
}

const PopupListTabs = ({
   labels,
   activeTab,
   onTabChange,
   labelClassName,
}: ITabsProps) => {
   const { t } = useTranslation();
   useEffect(() => {
     const initData = window.Telegram.WebApp.initDataUnsafe;
     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
     
     if (['en', 'ru', 'ukr'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
       i18n.changeLanguage(userLanguage);
     } else {
       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
     }
   }, []);
   console.log(labelClassName)
   return (
      <div className={cn("tabs")} id="tabs">
         <ul className={cn("tabs__list")}>
            {labels.map((label) => (
               <li
                  className={cn("tabs__item", activeTab === label && "_active")}
                  onClick={() => onTabChange(label)}
                  key={label}>
<span style={{ height: labels.length === 3 ? '20%' : '73%', top: labels.length === 3 ? '40%' : '0', fontSize: labels.length === 3 ? '15px' : '20px' }}>{t(`${label.toLocaleLowerCase()}`)}</span>
<img src="img/global/border-block/label.svg" alt={label} />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PopupListTabs;
