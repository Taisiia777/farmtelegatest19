import classNames from "classnames/bind";
import styles from "./FarmBlocks.module.scss";
const cn = classNames.bind(styles);

const FarmBloks = () => {
   return (
      <div className={cn("wrap")}>
         <FarmBlock zIndex={10} />
         <FarmBlock zIndex={10} />
         <FarmBlock zIndex={10} />
         <FarmBlock zIndex={9} />
         <FarmBlock zIndex={8} />
         <FarmBlock zIndex={7} />
         <FarmBlock zIndex={7} />
         <FarmBlock zIndex={6} />
         <FarmBlock zIndex={5} />
      </div>
   );
};

export default FarmBloks;

interface IFarmBlockProps {
   zIndex: number;
}

const FarmBlock = ({ zIndex }: IFarmBlockProps) => {
   return (
      <div
         className={cn("farmBlock")}
         style={{
            zIndex,
         }}>
         {/* FIXME: ХАРДКО! Нужно подставлять динамическую src и брать ее из store */}
         <img
            src="img/leagueStages/Wooden.png"
            className={cn("farmBlock__earth")}
            alt="Wooden"
         />
         <img
            src="img/growthStages/first.png"
            className={cn("farmBlock__growthStage", "_first")}
            alt="first"
         />
      </div>
   );
};
