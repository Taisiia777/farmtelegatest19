import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface CoinsProps {
   quantity: string;
}

const Coins = ({ quantity }: CoinsProps) => {
   return (
      <div className={cn("coins")}>
         <div className={cn("coins__video-wrap")}>
            <img src="video/BTC.gif" alt="I'm a gif" />
         </div>
         <span className="textShadow">{quantity}</span>
      </div>
   );
};

export default Coins;
