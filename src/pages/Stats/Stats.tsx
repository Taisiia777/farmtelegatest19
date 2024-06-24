import GreenBg from "../../components/GreenBg/GreenBg";
import BorderBlock from "./modules/BorderBlock";
import Coins from "./modules/Coins";

import classNames from "classnames/bind";
import styles from "./Stats.module.scss";
import { useEffect } from "react";
import { tg } from "../../constants/app";
import { useNavigate } from "react-router-dom";
const cn = classNames.bind(styles);

const Stats = () => {
   const navigate = useNavigate();

   useEffect(() => {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);

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

         {/* Элементы заднего фона */}
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_1")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_2")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_3")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_4")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_5")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_6")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_7")}
            alt="stats bg"
         />
         <img
            src="img/pages/stats/stats.svg"
            className={cn("stats-img-bg", "_8")}
            alt="stats bg"
         />
      </div>
   );
};

export default Stats;
