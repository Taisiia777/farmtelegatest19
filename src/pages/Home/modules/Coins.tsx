import CoinWhiteBg from "../../../components/CoinWhiteBg/CoinWhiteBg";

import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: number;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={cn("coins")}>
         <CoinWhiteBg iconName="BTC" />
         {/* FIXME: Хардок буквы */}
         <span>{quantity} B</span>
      </div>
   );
};

export default Coins;
