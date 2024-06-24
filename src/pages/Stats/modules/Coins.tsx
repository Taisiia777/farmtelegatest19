import classNames from "classnames/bind";
import styles from "../Stats.module.scss";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: number;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={`${cn("coins")}` + " textShadow"}>
         <img src="img/coins/BTC.svg" alt="BTC" />
         <span>{quantity} B</span>
      </div>
   );
};

export default Coins;
