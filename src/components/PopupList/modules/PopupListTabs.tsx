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
            element.style.fontSize = '13px';
            element.style.fontWeight = '700';
          }
        });
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
<span className="textMenu" style={{ height: labels.length === 3 ? '20%' : '73% !important', top: labels.length === 3 ? '40%' : '0 !important', fontSize: labels.length === 3 ? '15px' : '20px !important' }}>{t(`${label.toLowerCase()}`).toUpperCase()}</span>
<img src="img/global/border-block/label.svg" alt={label} />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PopupListTabs;
