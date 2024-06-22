import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactNode } from "react";
const cn = classNames.bind(styles);

interface IButtonProps {
   size?: "small" | "normal" | "huge";
   className?: string;
   children: ReactNode;
}

const Button = ({ className, size = "normal", children }: IButtonProps) => {
   return (
      <div className={cn("button", `_${size}`)}>
         <div className={className}>{children}</div>
         <img src="img/global/button-green/huge.svg" alt="Кнопка" />
      </div>
   );
};

export default Button;
