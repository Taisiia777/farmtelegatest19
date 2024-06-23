import classNames from "classnames/bind";
import styles from "./BoostBlock.module.scss";
import { TBoostName, TLiga } from "../../types/globalTypes";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
const cn = classNames.bind(styles);

interface IBoostBlockProps {
   boostName: TBoostName;
   price: string;
   earning: number;
   ligaName: TLiga;
   isBlocked?: boolean;
   isBought?: boolean;
}

const BoostBlock = ({
   boostName,
   price,
   earning,
   ligaName,
   isBlocked = false,
   isBought = false,
}: IBoostBlockProps) => {
   let content;

   // Определяем тип контента
   // в зависимости от того купленна ли она уже
   // или может заблокирована
   if (isBlocked) {
      content = (
         <div className={cn("blocked")}>
            <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
            <strong className="textShadow">{ligaName} league</strong>
         </div>
      );
   } else if (isBought) {
      content = (
         <div className={cn("boost")}>
            <div className={cn("boost__left")}>
               <img
                  src={`img/boosts/${boostName}.svg`}
                  className={cn("boost__img")}
                  alt={boostName}
               />
               <div className={cn("boost__info", "boostInfo")}>
                  <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
                     {boostName}
                  </h3>
                  <div className={cn("boostInfo__index")}>
                     <img
                        src={`img/leagueIcons/${ligaName}.png`}
                        alt={ligaName}
                     />
                     <span className="textShadow">+ {earning}/h</span>
                     <CoinWhiteBg size="small" iconName="BTC" />
                  </div>
               </div>
            </div>
            <div
               className={cn("boost__right")}
               style={{
                  height: "45px",
               }}>
               <img
                  src="img/global/checkbox/green.svg"
                  className={cn("boost__checkbox")}
                  alt="Bought"
               />
            </div>
         </div>
      );
   } else {
      content = (
         <div className={cn("boost")}>
            <div className={cn("boost__left")}>
               <img
                  src={`img/boosts/${boostName}.svg`}
                  className={cn("boost__img")}
                  alt={boostName}
               />
               <div className={cn("boost__info", "boostInfo")}>
                  <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
                     {boostName}
                  </h3>
                  <div className={cn("boostInfo__index")}>
                     <img
                        src={`img/leagueIcons/${ligaName}.png`}
                        alt={ligaName}
                     />
                     <span className="textShadow">+ {earning}/h</span>
                     <CoinWhiteBg size="small" iconName="BTC" />
                  </div>
               </div>
            </div>

            <div className={cn("boost__right")}>
               {/* FIXME: Если здесь передать например "100 000" то влезать не будет */}
               <Button className={cn("boost__price")}>
                  <CoinWhiteBg size="small" iconName="BTC" />
                  <span className="textShadow">{price}</span>
               </Button>
            </div>
         </div>
      );
   }
   return content;
};

export default BoostBlock;
