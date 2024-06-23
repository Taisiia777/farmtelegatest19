import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface IMenuProps {
   onEarnOpen: () => void;
   onBoostOpen: () => void;
   onTopOpen: () => void;
   onStatsOpen: () => void;
}

const Menu = ({
   onBoostOpen,
   onEarnOpen,
   onStatsOpen,
   onTopOpen,
}: IMenuProps) => {
   return (
      <>
         <div className={cn("menu")} id="menu">
            {/* Border */}
            <img
               src="img/pages/home/menu/border.svg"
               className={cn("menu__border")}
               alt="border"
            />

            {/* Menu elements */}
            <div className={cn("menu__body")}>
               <ul className={cn("menu__list")}>
                  <li onClick={() => onEarnOpen()}>
                     <img src="img/pages/home/menu/Earn.svg" alt="Earn" />
                     EARN
                  </li>
                  <li onClick={() => onBoostOpen()}>
                     <img src="img/pages/home/menu/Boost.svg" alt="Earn" />
                     BOOST
                  </li>
                  <li>
                     <img src="img/pages/home/menu/Farm.svg" alt="Earn" />
                  </li>
                  <li onClick={() => onTopOpen()}>
                     <img src="img/pages/home/menu/Top.svg" alt="Earn" />
                     TOP
                  </li>
                  <li onClick={() => onStatsOpen()}>
                     <img src="img/pages/home/menu/Stats.svg" alt="Earn" />
                     STATS
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
};

export default Menu;
