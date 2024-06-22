import classNames from "classnames/bind";

import Coins from "./modules/Coins";
import Liga from "./modules/Liga";

import styles from "./Home.module.scss";
import Energy from "./modules/Energy";
import Menu from "./modules/Menu";
const cn = classNames.bind(styles);

const Home = () => {
   return (
      <div className={cn("wrap")}>
         <div className={cn("top")}>
            <Coins quantity={1000} />
            <Liga liga="Diamond" />
         </div>
         <div className={cn("bottom")}>
            <Energy total={1000} current={300} />
            <Menu />
         </div>

         {/* Элементы заднего фона */}
         <img
            src="img/pages/home/home-bg.svg"
            className={cn("bg-elements")}
            alt="road"
         />
      </div>
   );
};

export default Home;
