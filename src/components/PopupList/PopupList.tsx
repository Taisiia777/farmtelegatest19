import { ForwardedRef, ReactNode, forwardRef } from "react";

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
                        <div className={cn("popupList__item-body")}>{node}</div>
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
