import { ReactNode } from "react";

import classNames from "classnames/bind";
import styles from "./PopupList.module.scss";
const cn = classNames.bind(styles);

// Import Swiper styles
import "swiper/css";

interface IPopupListProps {
   nodes: ReactNode[];
}

const PopupList = ({ nodes }: IPopupListProps) => {
   return (
      <ul className={cn("popupList")}>
         {nodes.map((node) => (
            <li className={cn("popupList__item")}>
               <img src="img/global/border-block/item.svg" alt="border" />
               <div className={cn("popupList__item-body")}>{node}</div>
            </li>
         ))}
      </ul>
   );
};

export default PopupList;
