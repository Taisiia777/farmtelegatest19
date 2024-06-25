import classNames from "classnames/bind";
import styles from "./Popup.module.scss";
import { ForwardedRef, ReactNode, forwardRef } from "react";
const cn = classNames.bind(styles);

interface IPopupProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
}

const Popup = forwardRef(
   (
      { isOpen, children, onClose }: IPopupProps,
      ref: ForwardedRef<HTMLDivElement>
   ) => {
      return (
         <div className={cn("popup", isOpen && "_open")}>
            <div className={cn("popup__body")} ref={ref}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("popup__border")}
                  alt="border"
               />

               {/* Надпись на popup-border */}
               <strong className={cn("popup__label")}>Energy</strong>

               {/* Иконка закрытия попапа */}
               <img
                  src="img/global/closeIcon.svg"
                  className={cn("popup__close")}
                  onClick={() => {
                     console.log("work!!");
                     onClose();
                  }}
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
