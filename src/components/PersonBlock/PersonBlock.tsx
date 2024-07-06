import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";

import classNames from "classnames/bind";
import styles from "./PersonBlock.module.scss";
const cn = classNames.bind(styles);

interface IPersonBlockProps {
   inviteMode?: boolean;
   // imgSrc: string;
   name: string;
   coinAmount: string;
   earning: string;
   rating?: number;
}

const PersonBlock = ({
   inviteMode = false,
   // imgSrc,
   name,
   coinAmount,
   earning,
   rating,
}: IPersonBlockProps) => {
   return (
      <div className={cn("person")}>
         <div className={cn("person__left")}>
            {inviteMode && (
               <div className={`${cn("person__rating")}` + " textShadow"}>
                  #{rating}
               </div>
            )}
            {/* <img src={imgSrc} className={cn("person__img")} alt={name} /> */}
            <div className={cn("person__info")}>
               <strong className={`${cn("person__name")}` + " textShadow"}>
                  {name}
               </strong>
               <div className={cn("person__coins-amount")}>
                  <CoinWhiteBg iconName="BTC" size="small" />
                  <span className="textShadow">{coinAmount}</span>
               </div>
            </div>
         </div>

         {!inviteMode && (
            <div className={cn("person__right")}>
               <div className={cn("person__earning")}>
                  <CoinWhiteBg iconName="BTC" size="small" />
                  <span className="textShadow">+{earning}</span>
               </div>
            </div>
         )}

         {/* Значек того, что на первом месте */}
         {rating === 1 && (
            <img
               src="img/pages/people/medal.svg"
               className={cn("person__firstPlace")}
               alt="First place"></img>
         )}
      </div>
   );
};

export default PersonBlock;
