import classNames from "classnames/bind";
import styles from "../Stats.module.scss";
import CoinWhiteBg from "../../../components/CoinWhiteBg/CoinWhiteBg";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: number;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={`${cn("coins")}` + " textShadow"}>
         <CoinWhiteBg size="huge" />
         <span>{quantity} B</span>
      </div>
   );
};

export default Coins;
