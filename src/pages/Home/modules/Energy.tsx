import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface EnergyProps {
   total: number;
   current: number;
   onClick: () => void;
}

const Energy = ({ total, current, onClick }: EnergyProps) => {
   return (
      <div className={cn("energy")} id="energy" onClick={onClick}>
         {/* Главная доска */}
         <img
            src="img/pages/home/energy/board.svg"
            className={cn("energy__board")}
            alt="Energy board"
         />

         {/* Иконка энергии */}
         <img
            src="img/pages/home/energy/cloud.svg"
            className={cn("energy__icon")}
            alt="Energy"
         />

         {/* Прогресс бар */}
         <div className={cn("energy__progressBarWrap")}>
            <div className={cn("energy__progressBar")}></div>
            <span>
               {current} / {total}
            </span>
         </div>
      </div>
   );
};

export default Energy;
