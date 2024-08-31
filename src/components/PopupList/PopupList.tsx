import { ForwardedRef, ReactNode, forwardRef } from "react";
import  { useEffect } from "react";
import i18n from '../../i18n';
import classNames from "classnames/bind";
import styles from "./PopupList.module.scss";
const cn = classNames.bind(styles);

// Import Swiper styles
import "swiper/css";

interface IPopupListProps {
   nodes: ReactNode[];
   // Если true, то первый блок в списке будет больше, чем все последующие
   type?: "first" | "second" | "third";
   className?: string;
}
const PopupList = forwardRef(
   (
      { nodes, type = "first", className }: IPopupListProps,
      ref: ForwardedRef<HTMLUListElement>
   ) => {
      useEffect(() => {
         const initData = window.Telegram.WebApp.initDataUnsafe;
         const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
         
         if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
           i18n.changeLanguage(userLanguage);
         } else {
           i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
         }
         if (userLanguage !== 'en') {
     
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
       }
       // Сохраняем начальную позицию прокрутки
       const initialScrollPosition = window.scrollY;
     
       // Возвращаем позицию прокрутки в начальную точку при размонтировании компонента
       return () => {
         window.scrollTo(0, initialScrollPosition);
       };
       }, []);
     
      return (
         <ul className={cn("popupList", className)} ref={ref}>
            {/* Вариант где все большие блоки */}
            {type === "first" && (
               <>
                  {nodes.map((node, index) => (
                     <li className={cn("popupList__item")} key={index}>
                        <img
                           src="img/global/border-block/item.svg"
                           alt="border"
                        />
                        <div className={cn("popupList__item-body", "_big")}>
                           {node}
                        </div>
                     </li>
                  ))}
               </>
            )}

            {/* Вариант где певрый блок больше, остальныые меньше*/}
            {type === "second" && (
               <>
                  {nodes.map((node, index) => {
                     if (index === 0) {
                        return (
                           <li className={cn("popupList__item")} key={index}>
                              <img
                                 src="img/global/border-block/item.svg"
                                 alt="border"
                              />
                              <div
                                 className={cn("popupList__item-body", "_big")}>
                                 {node}
                              </div>
                           </li>
                        );
                     } else {
                        return (
                           <li className={cn("popupList__item")} key={index}>
                              <img
                                 src="img/global/border-block/item-small.svg"
                                 alt="border"
                              />
                              <div className={cn("popupList__item-body")}>
                                 {node}
                              </div>
                           </li>
                        );
                     }
                  })}
               </>
            )}

            {/* Вариант где все маленькие блоки */}
            {type === "third" && (
               <>
                  {nodes.map((node, index) => (
                     <li className={cn("popupList__item")} key={index}>
                        <img
                           src="img/global/border-block/item-small.svg"
                           alt="border"
                        />
                        <div className={cn("popupList__item-body")}>{node}</div>
                     </li>
                  ))}
               </>
            )}
         </ul>
      );
   }
);

export default PopupList;
