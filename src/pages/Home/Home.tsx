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
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";
import PopupList from "../../components/PopupList/PopupList";
import BoostBlock from "../../components/BoostBlock/BoostBlock";
import CoinBlock from "../../components/CoinBlock/CoinBlock";
const cn = classNames.bind(styles);

const Home = () => {
   const [energyPopupOpen, setEnergyPopupOpen] = useState(false);
   const [boostPopupOpen, setBoostPopupOpen] = useState(false);

   const [activeTab, setActiveTab] = useState("COINS");

   return (
      <div className={cn("wrap")}>
         <div className={cn("top")}>
            <Coins quantity={1000} />
            <Liga liga="Diamond" />
         </div>
         {!boostPopupOpen && (
            <div className={cn("bottom")}>
               <Energy
                  total={1000}
                  current={300}
                  onClick={() => setEnergyPopupOpen(true)}
               />
               <Menu
                  onBoostOpen={() => setBoostPopupOpen(true)}
                  onEarnOpen={() => {}}
                  onTopOpen={() => {}}
                  onStatsOpen={() => {}}
               />
            </div>
         )}

         {/* Элементы заднего фона */}
         <img
            src="img/pages/home/home-bg.svg"
            className={cn("bg-elements")}
            alt="road"
         />

         {/* Блоки земли */}
         <FarmBloks />

         {/* Energy popup */}
         <Popup
            isOpen={energyPopupOpen}
            onClose={() => setEnergyPopupOpen(false)}>
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

               <Button className={cn("popup__btn")}>
                  <CoinWhiteBg iconName="BTC" />
                  <span>10 000</span>
               </Button>
            </div>
         </Popup>

         {/* BOOST popup */}
         <PopupListWrap isOpen={boostPopupOpen}>
            <PopupListTabs
               labels={["BOOST", "COINS"]}
               activeTab={activeTab}
               onTabChange={(label) => setActiveTab(label)}
            />
            {activeTab === "BOOST" ? (
               <PopupList
                  nodes={[
                     <BoostBlock
                        boostName="mill"
                        earning={500}
                        price="10 000"
                        ligaName="Wooden"
                        isBought
                     />,
                     <BoostBlock
                        boostName="drone"
                        earning={500}
                        price="15 000"
                        ligaName="Silver"
                     />,
                     <BoostBlock
                        boostName="minicar"
                        earning={500}
                        price="30 000"
                        ligaName="Gold"
                        isBlocked
                     />,
                     <BoostBlock
                        boostName="car-2"
                        earning={500}
                        price="40 000"
                        ligaName="Fire"
                        isBlocked
                     />,
                     <BoostBlock
                        boostName="car-3"
                        earning={500}
                        price="70 000"
                        ligaName="Diamond"
                        isBlocked
                     />,
                  ]}
               />
            ) : (
               <PopupList
                  nodes={[
                     <CoinBlock
                        coinName="BTC"
                        earning="200"
                        price="10 000"
                        isBought
                        isActive
                     />,
                     <CoinBlock
                        coinName="Polkadot"
                        earning="500"
                        price="15 000"
                        isBought
                     />,
                     <CoinBlock coinName="TON" earning="700" price="20 000" isBlocked />,
                     <CoinBlock
                        coinName="Binance"
                        earning="1 000"
                        price="30 000"
                     />,
                     <CoinBlock
                        coinName="Polkadot"
                        earning="2 000"
                        price="35 000"
                     />,
                     <CoinBlock
                        coinName="Solana"
                        earning="5 000"
                        price="50 000"
                     />,
                     <CoinBlock
                        coinName="ETHerium"
                        earning="10 000"
                        price="40 000"
                     />,
                     <CoinBlock
                        coinName="XRP"
                        earning="20 000"
                        price="80 000"
                     />,
                  ]}
               />
            )}
         </PopupListWrap>
      </div>
   );
};

export default Home;
