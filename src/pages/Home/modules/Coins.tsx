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
            <video
               src="video/BTC.webm"
               className={cn("coins__video")}
               muted
               autoPlay
               loop
            />
            f
         </div>
         <span className="textShadow">{quantity} B</span>
      </div>
   );
};

export default Coins;
