import classNames from "classnames/bind";
import styles from "./FarmBlocks.module.scss";
const cn = classNames.bind(styles);

const FarmBloks = () => {
   return (
      <div className={cn("farmBlockWrap")}>
         <FarmBlock zIndex={9} />
         <FarmBlock zIndex={9} />
         <FarmBlock zIndex={9} />
         <FarmBlock zIndex={8} />
         <FarmBlock zIndex={7} />
         <FarmBlock zIndex={6} />
         <FarmBlock zIndex={6} />
         <FarmBlock zIndex={5} />
         <FarmBlock zIndex={4} />
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
         <img
            src="img/leagueStages/Fire.png"
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
