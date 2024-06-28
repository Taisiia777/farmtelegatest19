import { TLiga } from "../../types/globalTypes";

import classNames from "classnames/bind";
import styles from "./LigaBlock.module.scss";
import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
const cn = classNames.bind(styles);

interface ILigaBlockProps {
   ligaName: TLiga;
   percent: number;
   price: string;
   acitve: boolean;
}

const LigaBlock = ({ ligaName, percent, price, acitve }: ILigaBlockProps) => {
   let priceFontSize;

   if (price.length < 7) {
      priceFontSize = 16;
   } else {
      priceFontSize = 12;
   }
   return (
      <div className={cn("ligaBlock")}>
         <img
            src={`img/leagueIcons/${ligaName}.png`}
            className={cn("ligaBlock__ligaImg")}
            alt={ligaName}
         />
         <div className={cn("ligaBlock__info", "ligaBlockInfo")}>
            <div className={cn("ligaBlockInfo__top")}>
               <h3
                  className={
                     `${cn("ligaBlockInfo__ligaName")}` + " textShadow"
                  }>
                  {ligaName}
               </h3>
               <Button
                  className={cn("ligaBlockInfo__btn")}
                  size="small"
                  disabled={!acitve}>
                  <CoinWhiteBg iconName="BTC" size="small" />
                  <span
                     className={cn("ligaBlockInfo__price") + " textShadow"}
                     style={{
                        fontSize: priceFontSize + "px",
                     }}>
                     +{price}
                  </span>
               </Button>
            </div>
            <div className={cn("ligaBlockInfo__bottom")}>
               <img src="img/ligaBlock/percent.svg" alt="" />

               {/* Заполнитель плашки */}
               <div className={cn("ligaBlockInfo__percentWrap")}>
                  <div
                     className={cn("ligaBlockInfo__percent")}
                     style={{
                        width: percent + "%",
                     }}></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LigaBlock;
