import { TLiga } from "../../../types/globalTypes";

import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);


interface LigaProps {
   liga: TLiga;
}

const Liga = ({ liga }: LigaProps) => {
   return (
      <div className={cn("liga")}>
         <img src={`img/leagueIcons/${liga}.png`} alt="Wooden" />
         <span className="textShadow">{liga} league</span>
      </div>
   );
};

export default Liga;
