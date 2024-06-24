import { ForwardedRef, ReactNode, forwardRef } from "react";

import classNames from "classnames/bind";
import styles from "./PopupList.module.scss";
const cn = classNames.bind(styles);

// Import Swiper styles
import "swiper/css";

interface IPopupListProps {
   nodes: ReactNode[];
   // Если true, то первый блок в списке будет больше, чем все последующие
   peopleMode?: boolean;
}
const PopupList = forwardRef(
   (
      { nodes, peopleMode = false }: IPopupListProps,
      ref: ForwardedRef<HTMLUListElement>
   ) => {
      return (
         <ul className={cn("popupList")} ref={ref}>
            {/* Вариант списка на странице EARN, где список людей */}
            {!peopleMode && (
               <>
                  {nodes.map((node, index) => (
                     <li className={cn("popupList__item")} key={index}>
                        <img
                           src="img/global/border-block/item.svg"
                           alt="border"
                        />
                        <div className={cn("popupList__item-body")}>{node}</div>
                     </li>
                  ))}
               </>
            )}

            {/* Вариант списка для всех остальных страниц*/}
            {peopleMode && (
               <>
                  {nodes.map((node, index) => {
                     if (index === 0) {
                        return (
                           <li className={cn("popupList__item")} key={index}>
                              <img
                                 src="img/global/border-block/item.svg"
                                 alt="border"
                              />
                              <div className={cn("popupList__item-body")}>
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
         </ul>
      );
   }
);

export default PopupList;
