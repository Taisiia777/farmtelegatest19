import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ReactNode } from "react";
const cn = classNames.bind(styles);

interface IButtonProps {
   size?: "small" | "normal" | "huge";
   className?: string;
   children: ReactNode;
   disabled?: boolean;
}

const Button = ({
   className,
   size = "normal",
   children,
   disabled = false,
}: IButtonProps) => {
   return (
      <div className={cn("button", `_${size}`)}>
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
