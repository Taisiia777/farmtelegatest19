import CoinWhiteBg from "../../../components/CoinWhiteBg/CoinWhiteBg";

import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: string;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={cn("coins")}>
         <CoinWhiteBg iconName="BTC" />
         <span className="textShadow">{quantity} B</span>
      </div>
   );
};

export default Coins;
