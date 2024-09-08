import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";

import classNames from "classnames/bind";
import styles from "./PersonBlock.module.scss";
const cn = classNames.bind(styles);

interface IPersonBlockProps {
   inviteMode?: boolean;
   imgSrc: string;
   name: string;
   coinAmount: string;
   earning: string;
   rating?: number;
}

const PersonBlock = ({
   inviteMode = false,
   imgSrc,
   name,
   coinAmount,
   earning,
   rating,
}: IPersonBlockProps) => {
   console.log(imgSrc)
   console.log(coinAmount)
   const formatLargeNumber = (num: number, divisor: number, suffix: string): string => {
      const result = num / divisor;
      // Если дробная часть равна 0, отображаем целое число, иначе 3 знака после запятой
      return result % 1 === 0
        ? result.toFixed(0) + suffix // Целое число без десятичных
        : result.toFixed(3) + suffix; // Три знака после запятой
    };
   const fertFormattedPrice = parseFloat(coinAmount) >= 1000000000
  ? formatLargeNumber(parseFloat(coinAmount), 1000000000, 'B')
  : parseFloat(coinAmount) >= 1000000
  ? formatLargeNumber(parseFloat(coinAmount), 1000000, 'M')
  : parseFloat(coinAmount).toString();

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
    <span className="textShadow">{fertFormattedPrice}</span>
  </div>
) : null}
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

export default PersonBlock;
