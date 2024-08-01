import classNames from "classnames/bind";
import styles from "../People.module.scss";
import CoinWhiteBg from "../../../components/CoinWhiteBg/CoinWhiteBg";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: string;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={`${cn("coins")}` + " textShadow"}>
         <CoinWhiteBg iconName="Bitcoin" size="small" />
         <span>{quantity}</span>
      </div>
   );
};

export default Coins;
