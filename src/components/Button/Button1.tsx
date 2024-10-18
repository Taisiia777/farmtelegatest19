import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactNode } from "react";
const cn = classNames.bind(styles);

interface IButton1Props {
   size?: "small" | "normal" | "huge" | "big";
   className?: string;
   children: ReactNode;
   onClick?: () => void;
}

const Button1 = ({
   className,
   size = "normal",
   children,
   onClick,
}: IButton1Props) => {
   return (
      <div className={cn("button", `_${size}`)} onClick={onClick}>
         <div className={className}>{children}</div>
 
      </div>
   );
};

export default Button1;
