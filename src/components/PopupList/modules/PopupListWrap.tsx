import { ReactNode } from "react";

import classNames from "classnames/bind";
import styles from "../PopupList.module.scss";
const cn = classNames.bind(styles);

interface IPopupListWrapProps {
   children: ReactNode;
   isOpen: boolean;
   className?: string;
}

const PopupListWrap = ({
   children,
   isOpen,
   className,
}: IPopupListWrapProps) => {
   return (
      <div className={cn("popupListWrap", isOpen && "_open", className)}>
         {children}
      </div>
   );
};

export default PopupListWrap;
