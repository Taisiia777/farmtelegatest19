import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";

import { TCoin } from "../../types/globalTypes";

import classNames from "classnames/bind";
import styles from "./CoinBlock.module.scss";
const cn = classNames.bind(styles);

interface ICoinBlockProps {
   coinName: TCoin;
   earning: string;
   price: string;
   isBought?: boolean;
   isBlocked?: boolean;
}

const CoinBlock = ({
   coinName,
   earning,
   isBought = false,
   isBlocked = false,
   price,
}: ICoinBlockProps) => {
   let content;

   // Определяем тип контента монеты
   // в зависимости от того купленна ли она уже
   // или может заблокирована
   if (isBought) {
      return;
   } else if (isBlocked) {
      return;
   } else {
      content = (
         <div className={cn("coinBlock")}>
            <div className={cn("coinBlock__left")}>
               <CoinWhiteBg size="huge" iconName={coinName} />
               <div className={cn("coinBlock__info")}>
                  <h3 className="textShadow">{coinName}</h3>
                  <div className={cn("coinBlock__earning")}>
                     <span>+{earning}</span>
                     <img src="img/pages/home/energy/energy.svg" alt="Energy" />
                  </div>
               </div>
            </div>
            <div className={cn("coinBlock__right")}>
               <Button className={cn("coinBlock__price")}>
                  <CoinWhiteBg size="small" iconName={"BTC"} />
                  <span>{price}</span>
               </Button>
            </div>
         </div>
      );
   }

   return content;
};

export default CoinBlock;
