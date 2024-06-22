import classNames from "classnames/bind";

import Coins from "./modules/Coins";
import Liga from "./modules/Liga";

import styles from "./Home.module.scss";
import Energy from "./modules/Energy";
import Menu from "./modules/Menu";
import FarmBloks from "./modules/FarmBlocks/FarmBloks";
import Popup from "../../components/Popup/Popup";
import { useState } from "react";
import Button from "../../components/Button/Button";
import CoinWhiteBg from "../../components/CoinWhiteBg/CoinWhiteBg";
const cn = classNames.bind(styles);

const Home = () => {
   const [popupOpen, setPopupOpen] = useState(false);

   return (
      <div className={cn("wrap")}>
         <div className={cn("top")}>
            <Coins quantity={1000} />
            <Liga liga="Diamond" />
         </div>
         <div className={cn("bottom")}>
            <Energy
               total={1000}
               current={300}
               onClick={() => setPopupOpen(true)}
            />
            <Menu />
         </div>

         {/* Элементы заднего фона */}
         <img
            src="img/pages/home/home-bg.svg"
            className={cn("bg-elements")}
            alt="road"
         />

         {/* Блоки земли */}
         <FarmBloks />

         <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
            <div className={cn("popup__body")}>
               {/* Молнии на заднем фоне */}
               <div className={cn("popup__bg-lightnings")}>
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
               </div>

               {/* Главная иконка молнии */}
               <img
                  src="img/pages/home/energy/energy.svg"
                  className={cn("popup__energyIcon")}
                  alt="energy"
               />

               <span className={cn("popup__level")}>Level 7</span>

               <div className={cn("popup__earning")}>
                  <span>+500/h</span>
                  <img src="img/pages/home/energy/energy.svg" alt="energy" />
               </div>

               <Button className={cn('popup__btn')}>
                  <CoinWhiteBg iconName="BTC" />
                  <span>10 000</span>
               </Button>
            </div>
         </Popup>
      </div>
   );
};

export default Home;
