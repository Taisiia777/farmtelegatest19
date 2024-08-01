import classNames from "classnames/bind";
import styles from "./CoinWhiteBg.module.scss";
import { TCoin } from "../../types/globalTypes";
// import { RootState } from "../../store";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useAppSelector } from "../../store";

const cn = classNames.bind(styles);
// interface Coin {
//    name: string;
//    value: number;
//    cost: number
//    // добавьте любые другие необходимые свойства
//  }
interface CoinWhiteBgProps {
   iconName?: TCoin | string;
   size?: "small" | "normall" | "huge";
   rotate?: boolean;
   className?: string;
}

const CoinWhiteBg = ({
   // iconName,
   size = "normall",
   rotate = false,
   className,
}: CoinWhiteBgProps) => {
   // const [lastCoin, setLastCoin] = useState<Coin | null>(null);
   // const user = useAppSelector((state: RootState) => state.user.user);
   // const coins = useAppSelector((state: RootState) => state.userCoins.coins);
   // useEffect(() => {
   //    console.log(user)
   //    if (coins.length > 0) {
   //      const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) =>
   //        prev.cost > current.cost ? prev : current
   //      );
   //      setLastCoin(mostExpensiveCoin);
   //    }
   //  }, [coins]);
  
   //  const resolvedIconName = lastCoin ? lastCoin.name : iconName || 'BTC';

   // return (
   //    <div className={cn(rotate && "rotate")}>
   //       <div className={cn("wrap", `_${size}`, className)}>
   //          <img src={`img/coins/${resolvedIconName}.svg`} alt={resolvedIconName} />
   //       </div>
   //    </div>
   // );
      return (
      <div className={cn(rotate && "rotate")}>
         <div className={cn("wrap", `_${size}`, className)}>
            <img src={`img/coins/FarmCoin.svg`} alt="coin" />
         </div>
      </div>
   );
};

export default CoinWhiteBg;
