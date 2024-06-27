import { useRef, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Greeting.module.scss";
import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
const cn = classNames.bind(styles);

const Greeting = () => {
   const [step, setStep] = useState(1);

   const [isFinish, setIsFinish] = useState(false);

   const coinMoneyAnimRef = useRef<HTMLImageElement>(null);

   function goNext() {
      setStep((prev) => prev + 1);
   }

   function fihish() {
      coinMoneyAnimRef.current?.classList.add("moneyAnim");

      setTimeout(() => {
         coinMoneyAnimRef.current?.classList.remove("moneyAnim");
         setIsFinish(true);
      }, 500);
   }

   return (
      <div className={cn("greeting", !isFinish && "_active")}>
         {/* Introduction */}
         {step === 1 && (
            <div className={cn("greeting__body", "_first")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_first")}>
                  Introduction
               </strong>

               {/* Иконка next */}
               <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={goNext}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/greeting/first.png"
                     className={cn("content__person-img", "_first")}
                  />
                  <p className={cn("content__text", "_first")}>
                     Welcome to Happy Coin Farm – the unique game where you grow
                     digital coins and earn real money!
                  </p>
               </div>
            </div>
         )}

         {/* Game Advantages */}
         {step === 2 && (
            <div className={cn("greeting__body", "_second")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_second")}>
                  Game Advantages
               </strong>

               {/* Иконка next */}
               <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={goNext}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/greeting/second.png"
                     className={cn("content__person-img", "_second")}
                  />
                  <p className={cn("content__text", "_second")}>
                     Upgrade your farm, buy boosts, enhance your coins, and
                     harvest crops. Check in EVERY HOUR to collect your money
                     harvest!
                  </p>
               </div>
            </div>
         )}

         {/* Game Advantages */}
         {step === 3 && (
            <div className={cn("greeting__body", "_third")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_third")}>
                  Launch on Exchanges
               </strong>

               {/* Иконка next */}
               <img
                  src="img/global/next-btn.svg"
                  className={cn("greeting__next")}
                  alt="Далее"
                  onClick={goNext}
               />

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/greeting/third.png"
                     className={cn("content__person-img", "_third")}
                  />
                  <p className={cn("content__text", "_third")}>
                     Soon, we’re launching on Crypto.com, <br /> Bybit, OKX, and
                     WhiteBit. Start earning now!
                  </p>
               </div>
            </div>
         )}

         {/* Welcome bonus */}
         {step === 4 && (
            <div className={cn("greeting__body", "_fourth")}>
               {/* Popup border */}
               <img
                  src="img/global/popup-border.svg"
                  className={cn("greeting__border")}
               />

               {/* Надпись на popup-border */}
               <strong className={cn("greeting__label", "_fourth")}>
                  Welcome bonus
               </strong>

               {/* Контент */}
               <div className={cn("greeting__content", "content")}>
                  <img
                     src="img/greeting/fourth.png"
                     className={cn("content__person-img", "_fourth")}
                  />
                  <div className={cn("content__flex")}>
                     <p className={cn("content__text", "_fourth")}>
                        Here's our welcome bonus for you! Enjoy <br /> X coins
                        right now. Play and earn!
                     </p>
                     <div className={cn("content__end-btn-wrap")}>
                        <Button
                           className={cn("content__end-btn")}
                           onClick={fihish}>
                           <CoinWhiteBg size="small" />
                           <span className="textShadow">+1000</span>
                        </Button>
                     </div>
                     <img
                        src="img/pages/home/money.svg"
                        className={cn("content__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Greeting;
