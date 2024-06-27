import classNames from "classnames/bind";
import styles from "./CoinWhiteBg.module.scss";
import { TCoin } from "../../types/globalTypes";
const cn = classNames.bind(styles);

interface CoinWhiteBgProps {
   iconName?: TCoin;
   size?: "small" | "normall" | "huge";
   rotate?: boolean;
   className?: string;
}

const CoinWhiteBg = ({
   iconName = "BTC",
   size = "normall",
   rotate = false,
   className,
}: CoinWhiteBgProps) => {
   return (
      <div className={cn(rotate && "rotate")}>
         <div className={cn("wrap", `_${size}`, className)}>
            <img src={`img/coins/${iconName}.svg`} alt={iconName} />
         </div>
      </div>
   );
};

export default CoinWhiteBg;
