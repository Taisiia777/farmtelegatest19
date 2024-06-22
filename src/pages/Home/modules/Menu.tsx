import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

const Menu = () => {
   return (
      <div className={cn("menu")}>
         {/* Border */}
         <img
            src="img/pages/home/menu/border.svg"
            className={cn("menu__border")}
            alt=""
         />

         {/* Menu elements */}
         <div className={cn("menu__body")}>
            <ul className={cn("menu__list")}>
               <li>
                  <img src="img/pages/home/menu/Earn.svg" alt="Earn" />
                  EARN
               </li>
               <li>
                  <img src="img/pages/home/menu/Boost.svg" alt="Earn" />
                  BOOST
               </li>
               <li>
                  <img src="img/pages/home/menu/Farm.svg" alt="Earn" />
               </li>
               <li>
                  <img src="img/pages/home/menu/Top.svg" alt="Earn" />
                  TOP
               </li>
               <li>
                  <img src="img/pages/home/menu/Stats.svg" alt="Earn" />
                  STATS
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Menu;
