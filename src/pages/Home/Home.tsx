import { RefObject, useRef, useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { setUser } from "../../store/reducers/userSlice";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import { closeBoostBuyPopup } from "../../store/reducers/boost";
import { closeCoinBuyPopup } from "../../store/reducers/coin";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useClosePopupByTgButton from "../../hooks/useClosePopupByTgButton";
import { retrieveLaunchParams } from '@tma.js/sdk';
import { calculateGrassEarnings, growAllToMax } from "../../store/reducers/growthStages";

import classNames from "classnames/bind";
import useWindowSize from "../../hooks/useWindowSize";
const cn = classNames.bind(styles);

import Coins from "./modules/Coins";
import Liga from "./modules/Liga";
import styles from "./Home.module.scss";
import Energy from "./modules/Energy";
import Menu from "./modules/Menu";
import FarmBloks from "./modules/FarmBlocks/FarmBloks";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import CoinWhiteBg from "../../components/CoinWhiteBg/CoinWhiteBg";
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";
import PopupList from "../../components/PopupList/PopupList";
import BoostBlock from "../../components/BoostBlock/BoostBlock";
import CoinBlock from "../../components/CoinBlock/CoinBlock";
import Boosts from "./modules/Boosts/Boosts";
import Account from "./modules/Account";
import LigaBlock from "../../components/LigaBlock/LigaBlock";
import FreindOrSpecialBlock from "../../components/FreindOrSpecialBlock/FreindOrSpecialBlock";
import Greeting from "../../components/Greeting/Greeting";
import DailyBonus from "../../components/DailyBonus/DailyBonus";

type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga
type TBoostName = 'mill' | 'drone' | 'minicar' | 'car-2' | 'car-3';
type TCoin =
   | "BTC"
   | "ETHerium"
   | "Binance"
   | "Cardano"
   | "Solana"
   | "XRP"
   | "Polkadot"
   | "TON";
interface Booster {
   id: number;
   name: TBoostName;
   cost: number;
   yieldIncrease: number;
   league: string;
 }

 interface Coin {
   id: number;
   name: TCoin;
   cost: number;
   hourlyIncome: number;
 }

 
 
//  interface User {
//    id: number;
//    username: string;
//    coins: number;
//    totalEarnings: number;
//    incomeMultiplier: number;
//    coinsPerHour: number;
//    xp: number;
//    level: number;
//    activeBoosters: Booster[];
//  }

const leagues = [
   { name: "Wooden", coinsRequired: 5000 },
   { name: "Silver", coinsRequired: 25000 },
   { name: "Gold", coinsRequired: 100000 },
   { name: "Fire", coinsRequired: 1000000 },
   { name: "Diamond", coinsRequired: 2500000 },
 ];



const Home = () => {
   const dispatch = useDispatch();
   const { width } = useWindowSize();
   const user = useAppSelector((state: RootState) => state.user.user);
   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
   const [nickname, setNickname] = useState('Savelii777'); // Состояние для никнейма
   // const [imgSrc, setImgSrc] = useState("img/pages/people/person.png");
   const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);
   const [level, setLevel] = useState(user ? user.level : 0);
   const [progressPercent, setProgressPercent] = useState(0);
   const [isProgressUpdating, setIsProgressUpdating] = useState(false);
   const [boosters, setBoosters] = useState<Booster[]>([]);
   const [userBoosters, setUserBoosters] = useState<Booster[]>([]);
   const [coins, setCoins] = useState<Coin[]>([]);
   const [userCoins, setUserCoins] = useState<Coin[]>([]);
   const [hasFirstReward, setHasFirstReward] = useState(false); // Состояние для проверки наличия награды "first"
   const [grassTotal, setGrassTotal] = useState(0);

   // Состояние прелоудера
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);

   // Состояние попапов приветсвия
   const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

   // Состояние попапа бонуса
   const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);

   const isFingerActve = useAppSelector(
      (state) => state.growthStages.isFingerActive
   );

   // Energy popup
   const [energyPopupOpen, setEnergyPopupOpen] = useState(false);
   const energyRef = useOutsideClick(
      () => setEnergyPopupOpen(false),
      ["#energy"]
   );
   const energyMoneyAnimRef = useRef<HTMLImageElement>(null);

   // Buy Boost popup
   const boostState = useAppSelector((state) => state.boost);
   const boostBuyRef = useOutsideClick(
      () => dispatch(closeBoostBuyPopup()),
      ["#buyBoost"]
   );

   // Boost popup
   const [boostPopupOpen, setBoostPopupOpen] = useState(false);
   const boostRef = useOutsideClick(
      () => setBoostPopupOpen(false),
      ["#menu", "#tabs", "#popup"]
   );
   useClosePopupByTgButton({
      isOpen: boostPopupOpen,
      closePopup: () => setBoostPopupOpen(false),
   });
   const boostMoneyAnimRef = useRef<HTMLImageElement>(null);
   // Активный таб в boost popup
   const [boostActiveTab, setBoostActiveTab] = useState("BOOST");

   // Earn popup
   const [earnPopupOpen, setEarnPopupOpen] = useState(false);
   const earnRef = useOutsideClick(
      () => setEarnPopupOpen(false),
      ["#menu", "#tabs", "#popup"]
   );
   useClosePopupByTgButton({
      isOpen: earnPopupOpen,
      closePopup: () => setEarnPopupOpen(false),
   });

   // Активный таб в boost popup
   const [earnActiveTab, setEarnActiveTab] = useState("LEAGUES");

   // buyCoin popup
   const coinState = useAppSelector((state) => state.coin);
   const coinMoneyAnimRef = useRef<HTMLImageElement>(null);
   const coinBuyRef = useOutsideClick(
      () => dispatch(closeCoinBuyPopup()),
      ["#buyCoin"]
   );

   // True если хотя бы один попап открыт
   // но кроме попапа Energy!
   const isPopupOpen = boostPopupOpen || earnPopupOpen;

   // Показываем палец подсказку только когда попапы приветсвия и бонуса прошли.
   // А также только когда первый раз собирает
   const canShowFinger = !isGreetingOpen && !isDailyBonusOpen && isFingerActve;

   // Осуществляет покупку в попапе и делает анимацию монет
   function buy(ref: RefObject<HTMLImageElement>, callback: () => void) {
      ref.current?.classList.add("moneyAnim");

      setTimeout(() => {
         ref.current?.classList.remove("moneyAnim");
         callback();
      }, 500);
   }
   

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);

      let referralCode = urlParams.get('start');
      
      if (!referralCode && window.Telegram?.WebApp?.initData) {
        const initData = new URLSearchParams(window.Telegram.WebApp.initData);
        referralCode = initData.get('start');
      }
  
  
      const { initData } = retrieveLaunchParams(); // Предполагается, что у вас есть эта функция
      if (initData && initData.user) {
        const user = initData.user;
        const username = user.username;
        if (username) {
          setNickname(username);
  
          const createUser = async () => {
            try {
              const response = await fetch(
                "https://coinfarm.club/user",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    username: username, // Используем username вместо nickname
                    coins: 0,
                    totalEarnings: 0,
                    incomeMultiplier: 1,
                    coinsPerHour: 10,
                    xp: 0,
                    level: 0,
                    referralCode: "98ddda07-d632-4ecb-b8a6-1b36fed2dac7", // Передаем реферальный код
                  }),
                }
              );
  
              if (response.status === 409) {
                const userData = await response.json();
                alert(`User already exists: ${JSON.stringify(userData)}`);
                setGrassTotal(userData.coinsPerHour);
                setLevel(userData.level)
                console.log('Existing user ID:', userData.id);
              } else if (!response.ok) {
                throw new Error("Something went wrong");
              } else {
                const newUser = await response.json();
                setGrassTotal(newUser.coinsPerHour);
                setLevel(newUser.level)
                dispatch(setUser(newUser));
                console.log('New user ID:', newUser.id);
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };
  
          createUser();
        }
  
        if (user.photoUrl) {
          // setImgSrc(user.photoUrl);
        } else {
          console.log("Photo URL not available");
        }
      }
    }, [dispatch]);





   const updateLeagueProgress = async () => {
      if (isProgressUpdating) return;
      setIsProgressUpdating(true);
    
      // Фиксируем текущий уровень лиги, чтобы не понижать
      let currentLevel = level;
    
      while (currentLevel < leagues.length) {
        const nextLeague = leagues[currentLevel];
        if (!nextLeague) break;
    
        // Обновляем прогресс для текущего уровня
        let percent;
        if (currentLevel < level) {
          // Если лига уже пройдена, устанавливаем прогресс на 100%
          percent = 100;
        } else {
          // Рассчитываем прогресс для текущей лиги
          percent = (localCoins / nextLeague.coinsRequired) * 100;
        }
        setProgressPercent(Math.min(percent, 100));
    
        if (localCoins >= nextLeague.coinsRequired &&  localCoins < 2500000) {
          const newLevel = currentLevel + 1;
          const success = await updateUserLevel(user.id, newLevel); // Обновляем уровень на сервере
          if (success) {
            dispatch(setUser({ ...user, level: newLevel }));
            currentLevel = newLevel; // Обновляем текущий уровень после успешного обновления
          } else {
            break; // Прерываем цикл если обновление не удалось
          }
        } else {
          break;
        }
      }
    
      setIsProgressUpdating(false);
    };
    
    const updateUserLevel = async (userId: number, newLevel: number) => {
      try {
        const response = await fetch(`https://coinfarm.club/user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ level: newLevel }),
        });
        if (!response.ok) {
          throw new Error("Failed to update user level");
        }
        const updatedUser = await response.json();
        dispatch(setUser(updatedUser));
        return true;
      } catch (error) {
        console.error("Error updating user level:", error);
        return false;
      }
    };
    
    useEffect(() => {
      updateLeagueProgress();
    }, [localCoins]);
    
  



  
    useEffect(() => {
      if (user) {
        setLocalCoins(parseFloat(user.coins));
      }
    }, [user]);
  
    const renderLeagues = () => {
      return leagues.map((league, index) => {
        const isActive = index === level;
        const percent = isActive
          ? progressPercent
          : (localCoins / league.coinsRequired) * 100;
        return (
          <LigaBlock
            key={league.name}
            ligaName={league.name as TLiga} // Приведение типа к TLiga
            percent={percent}
            price={league.coinsRequired.toString()}
            acitve={isActive}
          />
        );
      });
    };

    useEffect(() => {
      const fetchBoosters = async () => {
        try {
          const response = await fetch("https://coinfarm.club/booster");
          const data = await response.json();
          setBoosters(data);
        } catch (error) {
          console.error("Error fetching boosters:", error);
        }
      };
    
      const fetchUserBoosters = async () => {
        if (user) {
          try {
            const response = await fetch(`https://coinfarm.club/user/${user.id}/boosters`);
            const data = await response.json();
            setUserBoosters(data);
          } catch (error) {
            console.error("Error fetching user boosters:", error);
          }
        }
      };
      const fetchCoins = async () => {
         try {
           const response = await fetch("https://coinfarm.club/coin");
           const data = await response.json();
           setCoins(data);
         } catch (error) {
           console.error("Error fetching boosters:", error);
         }
       };
     
       const fetchUserCoins = async () => {
         if (user) {
           try {
             const response = await fetch(`https://coinfarm.club/user/${user.id}/coins`);
             const data = await response.json();
             setUserCoins(data);
           } catch (error) {
             console.error("Error fetching user boosters:", error);
           }
         }
       };
     
       fetchCoins();
       fetchUserCoins();
      fetchBoosters();
      fetchUserBoosters();
    }, [user]);

    useEffect(() => {
      const fetchRewards = async () => {
         if (user?.id) {
            try {
               const response = await fetch(`https://coinfarm.club/reward/${user.id}`, {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                  }
               });

               if (!response.ok) {
                  throw new Error('Something went wrong');
               } else {
                  const rewards = await response.json();
                  const hasFirstReward = rewards.some((reward: any) => reward.type === 'first');
                  setHasFirstReward(hasFirstReward);
               }
            } catch (error) {
               console.error('Error:', error);
            }
         }
      };

      fetchRewards();
   }, [user]);
    const getActiveBoosterIds = (): number[] => {
      return boosters
        .filter(booster => {
          const isBought = userBoosters.some(userBooster => userBooster.id === booster.id);
          const currentLeagueIndex = leagues.findIndex(league => league.name === leagues[level].name);
          const boosterLeagueIndex = leagues.findIndex(league => league.name === booster.league);
          const isBlocked = boosterLeagueIndex > currentLeagueIndex;
    
          return isBought && !isBlocked;
        })
        .map(booster => booster.id);
    };

   // const renderBoosters = () => {
   //    return boosters.map((booster) => {
   //      // Проверка, куплен ли бустер пользователем
   //      const isBought = userBoosters.some((userBooster) => userBooster.id === booster.id);
   //      // Проверка, доступен ли бустер для текущей или предыдущих лиг
   //      const currentLeagueIndex = leagues.findIndex((league) => league.name === leagues[level].name);
   //      const boosterLeagueIndex = leagues.findIndex((league) => league.name === booster.league);
   //      const isBlocked = boosterLeagueIndex > currentLeagueIndex;
    
   //      return (
   //        <BoostBlock
   //          key={booster.id}
   //          boostName={booster.name}
   //          earning={booster.yieldIncrease.toString()}
   //          price={booster.cost.toString()}
   //          ligaName={booster.league as TLiga}
   //          isBought={isBought}
   //          isBlocked={isBlocked}
   //        />
   //      );
   //    });
   //  };
    



   const renderBoosters = () => {
      
      return boosters.map((booster) => {
         
        // Проверка, куплен ли бустер пользователем
        const isBought = userBoosters.some((userBooster) => userBooster.id === booster.id);
        // Проверка, доступен ли бустер для текущей или предыдущих лиг
        const currentLeagueIndex = leagues.findIndex((league) => league.name === leagues[level].name);
        const boosterLeagueIndex = leagues.findIndex((league) => league.name === booster.league);
        const isBlocked = boosterLeagueIndex > currentLeagueIndex;
        return (
          <BoostBlock
            key={booster.id}
            boostName={booster.name}
            earning={booster.yieldIncrease.toString()}
            price={booster.cost.toString()}
            ligaName={booster.league as TLiga}
            isBought={isBought}
            isBlocked={isBlocked}
            // userId={user.id} // Передача userId
            boosterId={booster.id} // Передача boosterId
          />
        );
      });
    };
    






    
   //  const renderCoins = () => {
   //    return coins.map((coin) => {
   //      // Проверка, куплена ли монета пользователем
   //      const isBought = userCoins.some((userCoin) => userCoin.id === coin.id);
   //      const isBlocked = false; // Здесь можно добавить логику блокировки, если требуется
    
   //      return (
   //        <CoinBlock
   //          key={coin.id}
   //          coinName={coin.name}
   //          earning={coin.hourlyIncome.toString()}
   //          price={coin.cost.toString()}
   //          isBought={isBought}
   //          isBlocked={isBlocked}
   //        />
   //      );
   //    });
   //  };

   const renderCoins = () => {
      return coins.map((coin) => {
        // Проверка, куплена ли монета пользователем
        const isBought = userCoins.some((userCoin) => userCoin.id === coin.id);
        const isBlocked = false; // Здесь можно добавить логику блокировки, если требуется
    
        return (
          <CoinBlock
            key={coin.id}
            coinName={coin.name}
            earning={coin.hourlyIncome.toString()}
            price={coin.cost.toString()}
            isBought={isBought}
            isBlocked={isBlocked}
            userId={user.id} // Передача userId
            coinId={coin.id} // Передача coinId
          />
        );
      });
    };
    
    const currentGrassEarnings = calculateGrassEarnings(blocks, user ? user.coinsPerHour : 0);

   return (
      <>
         {/* Основной контент */}
         <div className={cn("wrap", isLoading && "_hidden")}>
            <div className={cn("top")}>
               <Account
                  // nickname="dimamrkv"
                  nickname={nickname}
                  // imgSrc={imgSrc}
                  />
               <Coins quantity={user?.coins} />
            </div>

            {!isPopupOpen && (
               <div className={cn("bottom")}>
                  {/* Лига */}
                  {/* <Liga
                     liga="Diamond"
                     onLigaOpen={() => setEarnPopupOpen(true)}
                  /> */}
                  <Liga liga={leagues[level].name as TLiga} onLigaOpen={() => setEarnPopupOpen(true)} />
                  <Energy
                     total={grassTotal*3*9}
                     current={currentGrassEarnings}
                     onClick={() => setEnergyPopupOpen(true)}
                  />
                  <Menu
                     onBoostOpen={() => setBoostPopupOpen(true)}
                     onEarnOpen={() => setEarnPopupOpen(true)}
                  />
               </div>
            )}

            {/* Элементы фона */}
            <div className={cn("bg-elements")}>
               <img src="img/pages/home/bg-elements.svg" alt="road" />

               {/* Блоки земли */}
               {/* <FarmBloks /> */}
               <FarmBloks league={leagues[level].name as TLiga} />
               {/* Активные boosts */}
               <Boosts activeBoosterIds={getActiveBoosterIds()} />

               {/* Палец подсказка */}
               {canShowFinger && (
                  <div className={cn("finger")}>
                     <img src="img/pages/home/finger.svg" />
                  </div>
               )}
            </div>

            {/* Rain popup */}
            <Popup
               borderlabel="Rain"
               isBlueBg
               isOpen={energyPopupOpen}
               onClose={() => setEnergyPopupOpen(false)}
               ref={energyRef}>
               <div className={cn("popup__body")}>
                  {/* Молнии на заднем фоне */}
                  <div className={cn("popup__bg-drops")}>
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                     <img src="img/pages/home/energy/drop.svg" />
                  </div>

                  {/* Иконка туч */}
                  <img
                     src="img/pages/home/energy/clouds.svg"
                     className={cn("popup__icon")}
                     alt="energy"
                  />

                  <p className={cn("popup__desc") + " textShadow"}>
                     Activate rain to instantly grow your crops to their maximum
                     yield without waiting! Collect your fully grown harvest
                     immediately!
                  </p>

                  <div className={cn("popup__bottom")}>
                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        isBlueBg
                        onClick={() =>
                           buy(energyMoneyAnimRef, () =>{

                              dispatch(growAllToMax());
                              setEnergyPopupOpen(false)

                           }
                             
                           )
                        }>
                        <CoinWhiteBg
                           iconName="BTC"
                           className={cn("popup__btn-coin")}
                           size={width > 380 ? "normall" : "small"}
                        />
                        <span className="textShadow">10 000</span>
                     </Button>
                     <img
                        src="img/pages/home/money.svg"
                        className={cn("popup__money-anim")}
                        ref={energyMoneyAnimRef}
                     />
                  </div>
               </div>
            </Popup>

            {/* Boost popup */}
            <Popup
               borderlabel={boostState.info.name}
               isOpen={boostState.isOpen}
               onClose={() => dispatch(closeBoostBuyPopup())}
               ref={boostBuyRef}>
               <div className={cn("popup__body")}>
                  <div className={cn("popup__bg-lightnings")}>
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                  </div>

                  <img
                     src={boostState.info.imgSrc}
                     className={cn("popup__icon", "_boost")}
                  />

                  <div className={cn("popup__bottom")}>
                     <div className={cn("popup__earning")}>
                        <span>+{boostState.info.earning}/h</span>
                        <img
                           src="img/pages/home/energy/energy.svg"
                           alt="energy"
                        />
                     </div>

                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        onClick={() =>
                           buy(boostMoneyAnimRef, () =>
                              dispatch(closeBoostBuyPopup())
                           )
                        }>
                        <CoinWhiteBg
                           iconName="BTC"
                           size={width > 380 ? "normall" : "small"}
                        />
                        <span>{boostState.info.price}</span>
                     </Button>
                     <img
                        src="img/pages/home/money.svg"
                        className={cn("popup__money-anim")}
                        ref={boostMoneyAnimRef}
                     />
                  </div>
               </div>
            </Popup>

            {/* Coin popup */}
            <Popup
               borderlabel={coinState.info.name}
               isOpen={coinState.isOpen}
               onClose={() => dispatch(closeCoinBuyPopup())}
               ref={coinBuyRef}>
               <div className={cn("popup__body")}>
                  <div className={cn("popup__bg-lightnings")}>
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                     <img src="img/global/lightning.svg" alt="energy" />
                  </div>

                  <CoinWhiteBg
                     className={cn("popup__icon", "_coin")}
                     iconName={coinState.info.name}
                  />

                  <div className={cn("popup__bottom")}>
                     <div className={cn("popup__earning")}>
                        <span>+{coinState.info.earning}/h</span>
                        <img
                           src="img/pages/home/energy/energy.svg"
                           alt="energy"
                        />
                     </div>

                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        onClick={() =>
                           buy(coinMoneyAnimRef, () =>
                              dispatch(closeCoinBuyPopup())
                           )
                        }>
                        <CoinWhiteBg
                           iconName="BTC"
                           size={width > 380 ? "normall" : "small"}
                        />
                        <span>{coinState.info.price}</span>
                     </Button>
                     <img
                        src="img/pages/home/money.svg"
                        className={cn("popup__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </Popup>

            {/* BOOST popup */}
            <PopupListWrap isOpen={boostPopupOpen}>
               <PopupListTabs
                  labels={["BOOST", "COINS"]}
                  activeTab={boostActiveTab}
                  onTabChange={(label) => setBoostActiveTab(label)}
               />
               {boostActiveTab === "BOOST"  ? (
                  // <PopupList
                  //    ref={boostRef}
                  //    nodes={[
                  //       <BoostBlock
                  //          boostName="mill"
                  //          earning={"500"}
                  //          price="10 000"
                  //          ligaName="Wooden"
                  //       />,
                  //       <BoostBlock
                  //          boostName="drone"
                  //          earning={"500"}
                  //          price="15 000"
                  //          ligaName="Silver"
                  //          isBought
                  //       />,
                  //       <BoostBlock
                  //          boostName="minicar"
                  //          earning={"500"}
                  //          price="30 000"
                  //          ligaName="Gold"
                  //          isBlocked
                  //       />,
                  //       <BoostBlock
                  //          boostName="car-2"
                  //          earning={"500"}
                  //          price="40 000"
                  //          ligaName="Fire"
                  //          isBlocked
                  //       />,
                  //       <BoostBlock
                  //          boostName="car-3"
                  //          earning={"500"}
                  //          price="70 000"
                  //          ligaName="Diamond"
                  //          isBlocked
                  //       />,
                  //    ]}
                  // />
                  <PopupList ref={boostRef} nodes={renderBoosters()} />

               ) : (
                  <PopupList ref={boostRef} nodes={renderCoins()} />

                  // <PopupList
                  //    ref={boostRef}
                  //    nodes={[
                  //       <CoinBlock
                  //          coinName="BTC"
                  //          earning="200"
                  //          price="10 000"
                  //          isBought
                  //          isActive
                  //       />,
                  //       <CoinBlock
                  //          coinName="Polkadot"
                  //          earning="500"
                  //          price="15 000"
                  //          isBought
                  //       />,
                  //       <CoinBlock
                  //          coinName="TON"
                  //          earning="700"
                  //          price="20 000"
                  //          isBlocked
                  //       />,
                  //       <CoinBlock
                  //          coinName="Binance"
                  //          earning="1 000"
                  //          price="30 000"
                  //       />,
                  //       <CoinBlock
                  //          coinName="Polkadot"
                  //          earning="2 000"
                  //          price="35 000"
                  //       />,
                  //       <CoinBlock
                  //          coinName="Solana"
                  //          earning="5 000"
                  //          price="50 000"
                  //       />,
                  //       <CoinBlock
                  //          coinName="ETHerium"
                  //          earning="10 000"
                  //          price="40 000"
                  //       />,
                  //       <CoinBlock
                  //          coinName="XRP"
                  //          earning="20 000"
                  //          price="80 000"
                  //       />,
                  //    ]}
                  // />
               )}
            </PopupListWrap>

            {/* EARN popup */}
            <PopupListWrap isOpen={earnPopupOpen}>
               <PopupListTabs
                  labelClassName={cn("earn__label")}
                  labels={["SPECIAL", "LEAGUES", "FRIENDS TASKS"]}
                  activeTab={earnActiveTab}
                  onTabChange={(label) => setEarnActiveTab(label)}
               />
            {earnActiveTab === "LEAGUES" && (
               <PopupList
                  ref={earnRef}
                  nodes={renderLeagues()}
               />
            )}
               {/* {earnActiveTab === "LEAGUES" && (
                  <PopupList
                     ref={earnRef}
                     nodes={[
                        <LigaBlock
                           ligaName="Wooden"
                           percent={100}
                           price="5 000"
                           acitve={true}
                        />,
                        <LigaBlock
                           ligaName="Silver"
                           percent={0}
                           price="25 000"
                           acitve={false}
                        />,
                        <LigaBlock
                           ligaName="Gold"
                           percent={20}
                           price="100 000"
                           acitve={false}
                        />,
                        <LigaBlock
                           ligaName="Fire"
                           percent={10}
                           price="1 000 000"
                           acitve={false}
                        />,
                        <LigaBlock
                           ligaName="Diamond"
                           percent={5}
                           price="2 500 000"
                           acitve={false}
                        />,
                     ]}
                  />
               )} */}

               {earnActiveTab === "SPECIAL" && (
                  <PopupList
                     ref={earnRef}
                     nodes={[
                        <FreindOrSpecialBlock
                           imgSrc="img/social/tg.svg"
                           title="JOIN GROUP"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/social/tg.svg"
                           title="JOIN CHAT"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/social/X.svg"
                           title="JOIN X"
                           earning="20 000"
                           link="/"
                        />,
                     ]}
                  />
               )}

               {earnActiveTab === "FRIENDS TASKS" && (
                  <PopupList
                     ref={earnRef}
                     nodes={[
                        <FreindOrSpecialBlock
                           imgSrc="img/global/person-btn.svg"
                           title="1 FREIND"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/global/person-btn.svg"
                           title="5 friends"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/global/person-btn.svg"
                           title="25 friends"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/global/person-btn.svg"
                           title="50 friends"
                           earning="20 000"
                           link="/"
                        />,
                        <FreindOrSpecialBlock
                           imgSrc="img/global/person-btn.svg"
                           title="100 friends"
                           earning="20 000"
                           link="/"
                        />,
                     ]}
                  />
               )}
            </PopupListWrap>

            {/* Иконка close, которая закрывает попапы с вариантом списка (<PopupListWrap />) */}
            {(boostPopupOpen || earnPopupOpen) && (
               <img
                  src="img/global/closeIcon.svg"
                  onClick={() => {
                     setBoostPopupOpen(false);
                     setEarnPopupOpen(false);
                  }}
                  className={cn("close")}
                  alt="Close"
               />
            )}
         </div>

         {/* Приветствие */}
         {!hasFirstReward && <Greeting />}

         {/* Ежедневный бонус */}
         <DailyBonus />
      </>
   );
};

export default Home;
