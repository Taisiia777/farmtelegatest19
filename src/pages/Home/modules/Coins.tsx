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
               className={cn("coins__video")}
               muted
               autoPlay
               loop
               playsInline>
               {/* <source src="video/BTC.mov"></source> */}
               <source src="video/BTC.webm"></source>
            </video>
         </div>
         <span className="textShadow">{quantity} B</span>
      </div>
   );
};

export default Coins;
