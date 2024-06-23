import { ForwardedRef, ReactNode, forwardRef } from "react";

import classNames from "classnames/bind";
import styles from "./PopupList.module.scss";
const cn = classNames.bind(styles);

// Import Swiper styles
import "swiper/css";

interface IPopupListProps {
   nodes: ReactNode[];
}

const PopupList = forwardRef(
   ({ nodes }: IPopupListProps, ref: ForwardedRef<HTMLUListElement>) => {
      return (
         <ul className={cn("popupList")} ref={ref}>
            {nodes.map((node, index) => (
               <li className={cn("popupList__item")} key={index}>
                  <img src="img/global/border-block/item.svg" alt="border" />
                  <div className={cn("popupList__item-body")}>{node}</div>
               </li>
            ))}
         </ul>
      );
   }
);

export default PopupList;
