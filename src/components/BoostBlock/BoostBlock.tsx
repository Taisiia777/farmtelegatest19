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
}

const BoostBlock = ({
   boostName,
   price,
   earning,
   ligaName,
   isBlocked = false,
}: IBoostBlockProps) => {
   return (
      <>
         {!isBlocked ? (
            <div className={cn("boost")}>
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

               {/* FIXME: Если здесь передать например "100 000" то влезать не будет */}
               <Button className={cn("boost__price")}>
                  <CoinWhiteBg size="small" iconName="BTC" />
                  {price}
               </Button>
            </div>
         ) : (
            <div className={cn("blocked")}>
               <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
               <strong className="textShadow">{ligaName} league</strong>
            </div>
         )}
      </>
   );
};

export default BoostBlock;
