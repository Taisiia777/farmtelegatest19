import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/routes";
const cn = classNames.bind(styles);

interface IMenuProps {
   onBoostOpen: () => void;
}

const Menu = ({ onBoostOpen }: IMenuProps) => {
   const navigate = useNavigate();
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
                  <li
                     onClick={() =>
                        navigate(Routes.PEOPLE, {
                           state: {
                              label: "FARM FRENDS",
                           },
                        })
                     }>
                     <img src="img/pages/home/menu/earn.svg" alt="Earn" />
                     <span className="textShadow">EARN</span>
                  </li>
                  <li onClick={() => onBoostOpen()}>
                     <img src="img/pages/home/menu/boost.svg" alt="Boost" />
                     <span className="textShadow">BOOST</span>
                  </li>
                  <li>
                     <img src="img/pages/home/menu/farm.svg" alt="Farm" />
                     <img src="img/pages/home/menu/wheat.svg" alt="" />
                  </li>
                  <li
                     onClick={() =>
                        navigate(Routes.PEOPLE, {
                           state: {
                              label: "LEADERBOARD",
                           },
                        })
                     }>
                     <img src="img/pages/home/menu/top.svg" alt="Top" />
                     <span className="textShadow">TOP</span>
                  </li>
                  <li onClick={() => navigate(Routes.STATS)}>
                     <img src="img/pages/home/menu/stats.svg" alt="Stats" />
                     <span className="textShadow">STATS</span>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
};

export default Menu;
