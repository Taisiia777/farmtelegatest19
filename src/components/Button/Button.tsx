import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactNode } from "react";
const cn = classNames.bind(styles);

interface IButtonProps {
   size?: "small" | "normal" | "huge" | "big";
   className?: string;
   children: ReactNode;
   disabled?: boolean;
   onClick?: () => void;
}

const Button = ({
   className,
   size = "normal",
   children,
   disabled = false,
   onClick,
}: IButtonProps) => {
   return (
      <div className={cn("button", `_${size}`)} onClick={onClick}>
         <div className={className}>{children}</div>
         {!disabled ? (
            <img src="img/global/button-green/huge.svg" alt="Кнопка" />
         ) : (
            <img src="img/global/button-grey/btn.svg" alt="Кнопка" />
         )}
      </div>
   );
};

export default Button;
