import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: number;
}

const Coins = ({ quantity }: CoinsProps) => {
   return <div className={cn("conis")}>Coins: {quantity}</div>;
};

export default Coins;
