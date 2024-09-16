import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cn = classNames.bind(styles);


interface EnergyProps {
   total: number;
   current: number;
   version: number;
}


const EnergyPreloader = ({ total, current, version }: EnergyProps) => {
  const progressPercentage = ((current / total) * 100) + 23;

   return (
      <div className={cn("energy")} id="energy">
         
         <img
         src="img/pages/home/energy/board.svg"
         style={{bottom:'5vh'}}
         className={cn("energy__board")}
         alt="Energy board"
      />
         <div className={cn("energy__progressBarWrap")} >
         <span style={{zIndex:"100", marginTop:"2px"}}>
            Loading...
          </span>
            <div
               className={cn({ "energy__progressBar": version !== 1, "energy__progressBar1": version === 1 })}
               style={{ width: `${progressPercentage}%` }}
               
            >

            </div>
         </div>
      </div>
   );
};

export default EnergyPreloader;

