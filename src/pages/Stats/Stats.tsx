import GreenBg from "../../components/GreenBg/GreenBg";
import BorderBlock from "./modules/BorderBlock";
import Coins from "./modules/Coins";

import classNames from "classnames/bind";
import styles from "./Stats.module.scss";
import { useEffect } from "react";
import { tg } from "../../constants/app";
const cn = classNames.bind(styles);

const Stats = () => {
   useEffect(() => {
      tg.BackButton.show();

      return () => tg.BackButton.hide();
   }, []);

   return (
      <div className={cn("stats")}>
         <small className={cn("stats__top-label")}>Total money in game</small>
         <Coins quantity={1000} />

         <div className={cn("stats__body")}>
            <BorderBlock
               label="Online"
               imgSrc="img/pages/stats/star.svg"
               number="4 392"
            />
            <BorderBlock
               label="Daily users"
               imgSrc="img/pages/stats/rubin.svg"
               number="789"
            />
            <BorderBlock
               label="Total players"
               imgSrc="img/pages/stats/medal.svg"
               number="152 423"
            />
         </div>

         {/* Задний зеленный фон */}
         <GreenBg />
      </div>
   );
};

export default Stats;
