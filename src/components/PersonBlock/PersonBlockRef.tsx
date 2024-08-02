import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";

import classNames from "classnames/bind";
import styles from "./PersonBlock.module.scss";
const cn = classNames.bind(styles);

interface IPersonBlockRefProps {
   inviteMode?: boolean;
   imgSrc: string;
   name: string;
   coinAmount: string;
   earning: string;
   earning2: string;
   earning3: string;
   rating?: number;
}

const PersonBlockRef = ({
   inviteMode = false,
   imgSrc,
   name,
   coinAmount,
   earning,
   earning2,
   earning3,
   rating,
}: IPersonBlockRefProps) => {
   console.log(imgSrc)
   console.log(coinAmount)
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
               {coinAmount !== '' ? (
  <div className={cn("person__coins-amount")}>
    <CoinWhiteBg iconName="Bitcoin" size="small" />
    <span className="textShadow">{coinAmount}</span>
  </div>
) : 
<><div className={cn("person__coins-amountref")}>
<span className="textShadow">2 level: {earning2}</span>
</div><div className={cn("person__coins-amountref")}>
<span className="textShadow">3 level: {earning3}</span>
</div></>
}
               {/* <div className={cn("person__coins-amount")}>
                  <CoinWhiteBg iconName="Bitcoin" size="small" />
                  <span className="textShadow">{coinAmount}</span>
               </div> */}
            </div>
         </div>

         {!inviteMode && (
            <div className={cn("person__right")}>
               <div className={cn("person__earning")}>
                  <CoinWhiteBg iconName="Bitcoin" size="small" />
                  <span className="textShadow" >+{earning}</span>
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

export default PersonBlockRef;
