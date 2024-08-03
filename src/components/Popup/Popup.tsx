import classNames from "classnames/bind";
import styles from "./Popup.module.scss";
import { ForwardedRef, ReactNode, forwardRef } from "react";
import i18n from '../../i18n';
import { useEffect, useState } from "react";
const cn = classNames.bind(styles);

interface IPopupProps {
   isOpen: boolean;
   borderlabel: string;
   onClose: () => void;
   children: ReactNode;
   isBlueBg?: boolean;
}

const Popup = forwardRef(
   (
      { isOpen, children, onClose, borderlabel, isBlueBg = false }: IPopupProps,
      ref: ForwardedRef<HTMLDivElement>
   ) => {
      const [labelStyle, setLabelStyle] = useState<React.CSSProperties>({});

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
          setLabelStyle({ fontSize: '14px', top: '20px' });
       }
        
      }, []);
      return (
         <div className={cn("popup", isOpen && "_open")} id="popup">
            <div className={cn("popup__body")} ref={ref}>
               {/* Popup border */}
               <img
                  src={
                     isBlueBg
                        ? "img/global/popup-border-blue.svg"
                        : "img/global/popup-border.svg"
                  }
                  className={cn("popup__border")}
                  alt="border"
               />

               {/* Надпись на popup-border */}
               <strong className={cn("popup__label")} style={labelStyle}>{borderlabel}</strong>

               {/* Иконка закрытия попапа */}
               <img
                  src="img/global/closeIcon.svg"
                  className={cn("popup__close")}
                  onClick={onClose}
                  alt="Закрыть"
               />

               {/* Контент попапа */}
               {children}
            </div>
         </div>
      );
   }
);

export default Popup;
