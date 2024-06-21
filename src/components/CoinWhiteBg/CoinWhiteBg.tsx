import classNames from "classnames/bind";
import styles from "./CoinWhiteBg.module.scss";
import { TCoin } from "../../types/globalTypes";
const cn = classNames.bind(styles);

interface CoinWhiteBgProps {
   iconName: TCoin;
   size?: "small" | "normall" | "huge";
}

const CoinWhiteBg = ({ iconName, size = "normall" }: CoinWhiteBgProps) => {
   return (
      <div className={cn("wrap", `_${size}`)}>
         <img src={`img/coins/${iconName}.svg`} alt={iconName} />
      </div>
   );
};

export default CoinWhiteBg;
