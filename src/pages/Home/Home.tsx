import { RefObject, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setUser } from "../../store/reducers/userSlice";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import { closeBoostBuyPopup } from "../../store/reducers/boost";
import { closeCoinBuyPopup } from "../../store/reducers/coin";
import { closeFertilizersBuyPopup, loading, noLoading } from "../../store/reducers/fertilizers";
import { Routes } from "../../routes/routes";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useClosePopupByTgButton from "../../hooks/useClosePopupByTgButton";
import { retrieveLaunchParams } from '@tma.js/sdk';
import {  growAllToMax, } from "../../store/reducers/growthStages";
import axios from "axios";
import classNames from "classnames/bind";
import useWindowSize from "../../hooks/useWindowSize";
import { setUserCoins1 } from '../../store/reducers/userCoinsSlice';
import RainAnimation from './modules/RainAnimation';
// import QRCodeComponent from './QRCodeComponent';
import { openGuide } from "../../store/reducers/guide";
import { useOutletContext } from 'react-router-dom';
// import useWheatTrunctaion from "./hooks/useWheatTrunctation";
// import {useHarvestAllWheat} from "./hooks/useHarvestAllWheat";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
// import Clouds from "./modules/Clouds";
const cn = classNames.bind(styles);
import fertilizersData from '../../fertilizers_data.json'; // Adjust the path accordingly
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
import FertilizersBlock from "../../components/FertilizersBlock/FertilizersBlock";

import Boosts from "./modules/Boosts/Boosts";
import Account from "./modules/Account";
import LigaBlock from "../../components/LigaBlock/LigaBlock";
import FreindOrSpecialBlock from "../../components/FreindOrSpecialBlock/FreindOrSpecialBlock";
import GamesBlock from "../../components/GamesBlock/GamesBlock";
import GamesBlock1 from "../../components/GamesBlock/GamesBlock1";

import Greeting from "../../components/Greeting/Greeting";
import Guide from "../../components/Guide/Guide";
import Guide1 from "../../components/Guide1/Guide1";
import Wheel from "../../components/Wheel/Wheel";
import Combo from "../../components/Combo/Combo";

import Wallet from "../../components/Wallet/Wallet";

import DailyBonus from "../../components/DailyBonus/DailyBonus";
// import { set } from "lodash";

type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond" ; // Определение типа TLiga
type TBoostName = 'mill' | 'drone' | 'minicar' | 'car-2' | 'car-3';
type TGrowthStage = "first" | "second" | "third" | "fourth";
type TFertilizers =
  | "Humus Elixir"
  | "Greenboost"
  | "Megabloom"
  | "Rootstrength"
  | "Harvestmax"
  | "Ecogro"
  | "Bio-Compost"
  | "Nitrogen Blend"
  | "Potassium Essence"
  | "Organic Booster"
  | "Microelement Mix"
  | "Sea Cocktail"
  | "Peat Activator"
  | "Growth Granules"
  | "Energy Gel"
  | "Flower Feed"
  | "Fertility Extract"
  | "Nectar of Life"
  | "Moon Infusion"
  | "Enzyme Boost";
type TCoin =
   | "Bitcoin"
   | "Ethereum"
   | "BNB"
   | "Cardano"
   | "Solana"
   | "Ripple"
   | "Polkadot"
   | "Ton";

interface Task {
    id: number;
    description: string;
    type: string;
    rewardAmount: number;
    imgSrc: string;
    link: string;
  }

  
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
   level: number
 }
 interface Fertilizers {
  id: number;
  name: TFertilizers;
  cost: number;
  hourlyIncome: number;
  level: number
}

 type Reward = {
   id: number;
   description: string;
   type: string;
   amount: number;
   level: number | null;
   coins: number | null;
 };
 
 interface User {
  id: number;
  username: string;
  coins: number;
  totalEarnings: number;
  incomeMultiplier: number;
  coinsPerHour: number;
  xp: number;
  level: number;
  grassEarnings: number
}
interface OutletContext {
  friends: Friend[];
}


interface Friend extends User {
  coinsEarned?: number;
}



 const leagues = [
  { name: "Wooden", referralsRequired: 3, referralsTo: 0, harvest: 1 },
  { name: "Silver", referralsRequired: 10, referralsTo: 3, harvest: 1.5 },
  { name: "Gold", referralsRequired: 50, referralsTo: 10, harvest: 2 },
  { name: "Fire", referralsRequired: 200, referralsTo: 50, harvest: 3 },
  { name: "Diamond", referralsRequired: 1000, referralsTo: 200, harvest: 4 },
  { name: "Ruby", referralsRequired: 1001, referralsTo: 1000, harvest: 5 },
];


const Home = () => {
  const navigate = useNavigate();

   const dispatch = useDispatch();
   const { width } = useWindowSize();
    const user = useAppSelector((state: RootState) => state.user.user);
    const fertilizersLoading = useAppSelector((state: RootState) => state.fertilizers.isLoading);
   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
   const [nickname, setNickname] = useState(''); // Состояние для никнейма
   // const [imgSrc, setImgSrc] = useState("img/pages/people/person.png");
   const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);
   const [level, setLevel] = useState(user ? user.level : 0);
   const [progressPercent, setProgressPercent] = useState(0);
   const [isProgressUpdating, setIsProgressUpdating] = useState(false);
   const [boosters, setBoosters] = useState<Booster[]>([]);
   const [userBoosters, setUserBoosters] = useState<Booster[]>([]);
   const [fertilizers, setFertilizers] = useState<Fertilizers[]>([]);
   const [userFertilizers, setUserFertilizers] = useState<Fertilizers[]>([]);
    const [coins, setCoins] = useState<Coin[]>([]);
   const [userCoins, setUserCoins] = useState<Coin[]>([]);
   const [hasFirstReward, setHasFirstReward] = useState(true); // Состояние для проверки наличия награды "first"
   const [grassTotal, setGrassTotal] = useState(0);
   const [rewards, setRewards] = useState<Reward[]>([]);
   const [isRain, setIsRain] = useState(true); // Состояние для проверки наличия награды "first"
   const [multiplier, setMultiplier] = useState(0); // Состояние для проверки наличия награды "first"
   const [mostExpensiveCoinName, setMostExpensiveCoinName] = useState<string | null>(null);
  //  let initialGrassEarnings = calculateGrassEarnings(blocks, user?.coinsPerHour, user?.incomeMultiplier, user?.level);
  //  const [currentGrassEarnings, setCurrentGrassEarnings] = useState(initialGrassEarnings);
   const [displayEarnings, setDisplayEarnings] = useState(0);
   const [isXpFetched, setIsXpFetched] = useState(false);
   const [isRainAnim, setIsRainAnim] = useState(false);
   const [currentRainProgress, setCurrentRainProgress] = useState(0);
   const [isFetchedRewards, setIsFetchedRewards] = useState(false);
   const [tasks, setTasks] = useState<Task[]>([]);
   const [rainInterval, setRainInterval] = useState(0);
   const lastUpdateRef = useRef(Date.now());
  //  const [showQRCode, setShowQRCode] = useState(false);
   const [showGuide, setShowGuide] = useState(false);
   const { friends } = useOutletContext<OutletContext>();
   const [isBoosterPurchased, setIsBoosterPurchased] = useState(false);
   const [isCoinPurchased, setIsCoinPurchased] = useState(false);
  //  const [isProcessing, setIsProcessing] = useState(false); // Состояние для блокировки кнопки

  // useWheatTrunctaion();
  // useHarvestAllWheat()
  console.log(mostExpensiveCoinName)
   console.log(rewards)
   console.log(grassTotal)
   console.log(multiplier)
   // Состояние прелоудера
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);

   // Состояние попапов приветсвия
  //  const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

  //  // Состояние попапа бонуса
  //  const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);

  //  const isFingerActve = useAppSelector(
  //     (state) => state.growthStages.isFingerActive
  //  );

   // Energy popup
   const [energyPopupOpen, setEnergyPopupOpen] = useState(false);
   const energyRef = useOutsideClick(
      () => setEnergyPopupOpen(false),
      ["#energy"]
   );
   const energyMoneyAnimRef = useRef<HTMLImageElement>(null);
   console.log(energyMoneyAnimRef)
   // Buy Boost popup
   const boostState = useAppSelector((state) => state.boost);
   const boostBuyRef = useOutsideClick(
      () => dispatch(closeBoostBuyPopup()),
      ["#buyBoost"]
   );

   const fertilizersState = useAppSelector((state) => state.fertilizers);
  //  const fertilizersBuyRef = useOutsideClick(
  //     () => dispatch(closeFertilizersBuyPopup()),
  //     ["#buyFertilizers"]
  //  );
   const fertilizersBuyRef = useOutsideClick(
    () => console.log("jjj"),
    ["#buyFertilizers"]
 );
   const { t } = useTranslation();

   // Boost popup
   const [boostPopupOpen, setBoostPopupOpen] = useState(false);
   
   const boostRef = useOutsideClick(
      () => setBoostPopupOpen(false),
      ["#menu", "#tabs", "#popup", "#energy"]
   );
   
   useClosePopupByTgButton({
      isOpen: boostPopupOpen,
      closePopup: () => setBoostPopupOpen(false),
   });
   const boostMoneyAnimRef = useRef<HTMLImageElement>(null);
   // Активный таб в boost popup
   const [boostActiveTab, setBoostActiveTab] = useState("BOOST");

  //  const openCoinPopup =  () => {
  //   setBoostActiveTab("COINS")
  // };
  const openFertilizersPopup =  () => {
    setBoostActiveTab("FERTILIZERS")
  };
  
  const openBoostPopup =  () => {
    setBoostActiveTab("BOOST")
  };
  // const openLeaguePopup =  () => {
  //   setLeaguesActiveTab("LEAGUES")
  // };
  const openSpecialPopup =  () => {
    setEarnActiveTab("TASKS")
  };
  const openGamesPopup =  () => {
    setGamesActiveTab("GAMES")
  };
   // Earn popup
   
   const [earnPopupOpen, setEarnPopupOpen] = useState(false);
   const [leaguesPopupOpen, setLeaguesopupOpen] = useState(false);
//    const leaguesRef = useOutsideClick(
//     () => setLeaguesopupOpen(false),
//     ["#menu", "#tabs", "#popup", "#energy", "#league"]
//  );
 useClosePopupByTgButton({
    isOpen: leaguesPopupOpen,
    closePopup: () => setLeaguesopupOpen(false),
 });
   const [gamesPopupOpen, setGamesPopupOpen] = useState(false);

   const earnRef = useOutsideClick(
      () => setEarnPopupOpen(false),
      ["#menu", "#tabs", "#popup"]
   );
   useClosePopupByTgButton({
      isOpen: earnPopupOpen,
      closePopup: () => setEarnPopupOpen(false),
   });

   const gamesRef = useOutsideClick(
    () => setGamesPopupOpen(false),
    ["#menu", "#tabs", "#popup", "#fortune", "#fortune1"]
 );
 useClosePopupByTgButton({
    isOpen: gamesPopupOpen,
    closePopup: () => setGamesPopupOpen(false),
 });

   // Активный таб в boost popup
   const [earnActiveTab, setEarnActiveTab] = useState("LEAGUES");
   const [leaguesActiveTab, setLeaguesActiveTab] = useState("LEAGUES");
   const [gamesActiveTab, setGamesActiveTab] = useState("GAMES");
    console.log(gamesActiveTab)
   // buyCoin popup
   const coinState = useAppSelector((state) => state.coin);
   const coinMoneyAnimRef = useRef<HTMLImageElement>(null);
   const fertilizersMoneyAnimRef = useRef<HTMLImageElement>(null);

   const coinBuyRef = useOutsideClick(
      () => dispatch(closeCoinBuyPopup()),
      ["#buyCoin", "#buyCoin1", "#buyCoin2"]
   );

   // True если хотя бы один попап открыт
   // но кроме попапа Energy!
   const isPopupOpen = boostPopupOpen || earnPopupOpen || gamesPopupOpen || leaguesPopupOpen;

   // Показываем палец подсказку только когда попапы приветсвия и бонуса прошли.
   // А также только когда первый раз собирает
  //  const canShowFinger = !isGreetingOpen && !isDailyBonusOpen && isFingerActve;
  const [canShowFinger, setCanShowFinger] = useState(true);

   // Осуществляет покупку в попапе и делает анимацию монет
   function buy(ref: RefObject<HTMLImageElement>, callback: () => void) {
    const audio = new Audio('sounds/coins.mp3');

    // Воспроизводим звук
    audio.play();

    ref.current?.classList.add("moneyAnim");

    setTimeout(() => {
        ref.current?.classList.remove("moneyAnim");
        callback();

        // Останавливаем звук через 1 секунду
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0; // Возвращаем воспроизведение на начало
        }, 1000); // 1 секунда
    }, 500);
      // ref.current?.classList.add("moneyAnim");

      // setTimeout(() => {
      //    ref.current?.classList.remove("moneyAnim");
      //    callback();
      // }, 500);
   }

  //  useEffect(() => {
  //   const checkIfDesktop = () => {
  //     const userAgent = navigator.userAgent;
  //     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  //     setShowQRCode(!isMobile);
  //   };
  
  //   checkIfDesktop();
  // }, []);
  


  useEffect(() => {
    
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
    }
    // if (userLanguage !== 'en') {
    //   document.body.style.fontSize = '0.6em';
    // } else {
    //   document.body.style.fontSize = '1em';
    // }
     if (userLanguage !== 'en') {
   
    document.querySelectorAll('.textMenu').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '14px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textMenu1').forEach(element => {
       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
         element.style.fontSize = '10px';
         element.style.fontWeight = '700';
       }
     });
     document.querySelectorAll('.textRain').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '13px';
        element.style.fontWeight = '700';
      }
    });
    }
  }, []);

  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    document.body.style.minHeight = "100vh";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "auto";

    window.scrollTo(0, overflow);
    
  }, []);

   useEffect(() => {
    let hasFetchedReferralCode = false;
    let hasSavedUserId = false;
      const fetchData = async () => {
       
        const { initData } = retrieveLaunchParams(); // Предполагается, что у вас есть эта функция
        if (initData && initData.user) {
          const user = initData.user;
          // const username = user.username;
          let username = user.username || `guest_${user.id}`; // Используем guest_{user.id} если нет username
          let referralCode;
          let clickId;

         const userId = user.id;
         if (!hasFetchedReferralCode) {
          const response = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
          const data = response.data;
          referralCode = data.referral_code;
          clickId = data.click_id;
          // Если есть clickId, отправляем POST запрос на указанный URL
          if (clickId) {
              const postUrl = `https://binomtracky.pro/click.php?event8=1&cnv_status=bot&cnv_id=${clickId}`;
              try {
                  await axios.post(postUrl);
              } catch (error) {
                  console.error("Error sending click ID:", error);
              }
          }
          hasFetchedReferralCode = true;
         }
          if (username) {
            setNickname(username);
            if (!hasSavedUserId) {

            await axios.post('https://coinfarm.club/api1/saveUserId', {
              username: username,
              user_id: userId
            });
          }
            try {
              const response = await axios.post(
                "https://coinfarm.club/api/user",
                {
                  username: username,
                  coins: 1000,
                  totalEarnings: 0,
                  incomeMultiplier: 1,
                  coinsPerHour: 0,
                  xp: 1000,
                  level: 0,
                  referralCode: referralCode,
                }
              );
                const userData =  response.data;
                const userLeagueIndex = userData ? userData.level : 0;
                const userHarvestMultiplier = leagues[userLeagueIndex]?.harvest || 1;
                const calculatedInHour = userData?.coinsPerHour * userHarvestMultiplier;
                setGrassTotal(calculatedInHour);
                setLevel(userData.level);
                setMultiplier(userData.incomeMultiplier)
                setIsBoosterPurchased(!isBoosterPurchased)
             
            } catch (error) {
              console.error("Error:", error);
            }
          }
  
          if (user.photoUrl) {
            // setImgSrc(user.photoUrl);
          } else {
          }
        }
      };
  
      fetchData(); // Initial fetch on component mount
  
    }, []); // Add other dependencies if needed



    



    useEffect(() => {
      const updateOnlineStatus = async () => {
         let userId = user?.id
        try {
          await axios.post('https://coinfarm.club/api/user/online', { userId });
        } catch (error) {
          console.error('Error updating online status:', error);
        }
      };
  
     
  
      updateOnlineStatus();
      const intervalId = setInterval(() => {
        updateOnlineStatus();
      }, 60000); // Обновление каждые 60 секунд
  
      return () => clearInterval(intervalId);
    }, []);



  
   const updateLeagueProgress = async () => { 
      if (isProgressUpdating) return;
      setIsProgressUpdating(true);
      // const userReferrals = await fetchUserReferralsCount(user.id);
      const userReferrals = friends.length;

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
          percent = (userReferrals / nextLeague.referralsRequired) * 100;
        }
        setProgressPercent(Math.min(percent, 100));
    
        if (userReferrals >= nextLeague.referralsRequired && currentLevel != 5 ) {
          const newLevel = currentLevel + 1;
          const success = await updateUserLevel(user.id, newLevel, user?.incomeMultiplier * leagues[newLevel].harvest ); // Обновляем уровень на сервере
          if (success) {
            dispatch(setUser({ ...user, level: newLevel, incomeMultiplier: user?.incomeMultiplier}));
            currentLevel = newLevel; // Обновляем текущий уровень после успешного обновления
            setLevel(newLevel)
          } else {
            break; // Прерываем цикл если обновление не удалось
          }
        } else {
          break;
        }
      }
    
      setIsProgressUpdating(false);
    };
    
    const updateUserLevel = async (userId: number, newLevel: number, harvest: number) => {
      console.log(harvest)
      try {
        const response = await fetch(`https://coinfarm.club/api/user/${userId}`, {
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
        let percent;
        if (index <= level) {
          percent = 100; // Прошедшие лиги имеют 100%
        } else if (index === level+1 && friends) {
          percent = (friends.length / league.referralsTo) * 100; // Текущая лига рассчитывается
        } else {
          percent = 0; // Будущие лиги имеют 0%
        }
    
        const isActive = index <= level;
        console.log(progressPercent)
        return (
          <LigaBlock
            key={league.name}
            ligaName={league.name as TLiga} // Приведение типа к TLiga
            percent={percent}
            price={league.referralsTo.toString()}
            active={isActive}
            harvest={league.harvest}
          />
        );
      });
    };
 
    useEffect(() => {
      
      const fetchBoosters = async () => {
        try {
          const response = await fetch("https://coinfarm.club/api/booster");
          const data = await response.json();
          setBoosters(data);
        } catch (error) {
          console.error("Error fetching boosters:", error);
        }
      };
    
      const fetchUserBoosters = async () => {
        if (user) {
          try {
            const response = await fetch(`https://coinfarm.club/api/user/${user.id}/boosters`);
            const data = await response.json();
            setUserBoosters(data);
                  // Определяем количество бустеров
      const boosterCount = data.length; // Предполагается, что data — это массив с бустерами

      // Определяем множитель в зависимости от количества бустеров
      let newIncomeMultiplier = 1;
      if (boosterCount === 1) {
        newIncomeMultiplier = 2;
      } else if (boosterCount === 2) {
        newIncomeMultiplier = 3;
      } else if (boosterCount === 3) {
        newIncomeMultiplier = 5;
      } else if (boosterCount === 4) {
        newIncomeMultiplier = 8;
      } else if (boosterCount >= 5) {
        newIncomeMultiplier = 12;
      }

      // Отправляем запрос на сервер для обновления множителя
      const response1 = await axios.put(`https://coinfarm.club/api/user/${user.id}`, {
        incomeMultiplier: newIncomeMultiplier
      });
      console.log(response1)
          } catch (error) {
            console.error("Error fetching user boosters:", error);
          }
        }
      };
      const fetchCoins = async () => {
         try {
           const response = await fetch("https://coinfarm.club/api/coin");
           const data = await response.json();
           setCoins(data);
         } catch (error) {
           console.error("Error fetching boosters:", error);
         }
       };
     
       const fetchUserCoins = async () => {
         if (user) {
           try {
             const response = await fetch(`https://coinfarm.club/api/user/${user.id}/coins`);
             const data = await response.json();
             setUserCoins(data);
             dispatch(setUserCoins1(data)); 
             const mostExpensiveCoin = data.reduce((max:any, coin:Coin) => coin.cost > max.cost ? coin : max, coins[0]);
     
             // Обновить состояние с именем самой дорогой монеты
             setMostExpensiveCoinName(mostExpensiveCoin.name);          

           } catch (error) {
             console.error("Error fetching user boosters:", error);
           }
         }
       };
       const fetchFertilizers = async () => {
        try {
          const response = await fetch("https://coinfarm.club/api/fertilizers");
          const data = await response.json();
          setFertilizers(data);
          const fertilizers: Fertilizers[] = (fertilizersData as Fertilizers[]).map((item: Fertilizers) => ({
            ...item,
            name: item.name as TFertilizers
          }));
          
          setFertilizers(fertilizers);


        } catch (error) {
          console.error("Error fetching boosters:", error);
        }
      };
    
      const fetchUserFertilizers = async () => {
        if (user) {
          try {
            const response = await fetch(`https://coinfarm.club/api/user/${user.id}/fertilizers`);
            const data = await response.json();
            setUserFertilizers(data);
          } catch (error) {
            console.error("Error fetching user boosters:", error);
          }
        }
      };
       if (user?.id) {

      fetchCoins();
      fetchUserCoins();
      fetchBoosters();
      fetchUserBoosters();
      fetchFertilizers();
      fetchUserFertilizers();
      dispatch(noLoading());
    }
    }, [isCoinPurchased, isBoosterPurchased]);

    useEffect(() => {
      const fetchRewards = () => {
        if (user?.id && !isFetchedRewards) {
          axios
            .get(`https://coinfarm.club/api/reward/${user?.id}`)
            .then((response) => {
              const hasFirstReward = response.data.some((reward: any) => reward.type === 'first');
              setIsFetchedRewards(true);
              setHasFirstReward(hasFirstReward);
              setRewards(response.data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      };
   fetchRewards()
      
   }, [user]);
    const getActiveBoosterIds = (): number[] => {
      return boosters
        .filter(booster => {
          const isBought = userBoosters.some(userBooster => userBooster.id === booster.id);
          // const currentLeagueIndex = leagues.findIndex(league => league.name === leagues[level].name);
          // const boosterLeagueIndex = leagues.findIndex(league => league.name === booster.league);
          // const isBlocked = boosterLeagueIndex > currentLeagueIndex;
          const isBlocked = false;
          return isBought && !isBlocked;
        })
        .map(booster => booster.id);
    };


   async function applyBooster() {
      try {
        
          if (user) {
               const response = await axios.post(`https://coinfarm.club/api/booster/apply/${user.id}/${boostState.info.boosterId}`);
              //  dispatch(setUser({ ...user, coins: user.coins - boostState.info.price, incomeMultiplier: user.incomeMultiplier + boostState.info.earning}));
              dispatch(setUser({ 
                ...user, 
                coins: Number(user.coins) - Number(boostState.info.price), 
                incomeMultiplier: Number(user.incomeMultiplier) + Number(boostState.info.earning)
            }));
            const response1 = await axios.put(`https://coinfarm.club/api/user/${user.id}`, {
              coins: Number(user.coins) - Number(boostState.info.price), 
              incomeMultiplier: Number(user.incomeMultiplier) + Number(boostState.info.earning)
            });
            console.log(response1)
               setMultiplier(user.incomeMultiplier + boostState.info.earning);
               console.log('Booster applied:', response.data);
              setIsBoosterPurchased(!isBoosterPurchased)
          }
      } catch (error) {
        console.error('Error applying booster:', error);
      }
      
    }
    const boosterNames = [
      'Energy Mill',
      'Crop Master',
      'Robo Rover',
      'Harvester Pro',
      'Super Drone'
    ];
   const renderBoosters = () => {
    const getLastBoughtBooster = (userBoosters: Booster[]) => {
      if (userBoosters.length === 0) return null;
      
      return userBoosters.reduce((maxBooster, currentBooster) => {
        return currentBooster.id > maxBooster.id ? currentBooster : maxBooster;
      });
    };
  
    const lastBoughtBooster = getLastBoughtBooster(userBoosters);
    const sortedBoosters = [...boosters].sort((a, b) => a.id - b.id);
  
    return sortedBoosters.map((booster, index) => {
      const isBought = userBoosters.some((userBooster) => userBooster.id === booster.id);
      const canBuy = lastBoughtBooster ? booster.id === lastBoughtBooster.id + 1 : index === 0;
      const isBlocked = !canBuy && !isBought; // Блокируем бустер, если он не куплен и не является следующим доступным
        if(user){
         return (
            <BoostBlock
              key={booster.id}
              boostName={booster.name}
              boostNameNew={boosterNames[index]}
              earning={booster.yieldIncrease.toString()}
              price={booster.cost.toString()}
              ligaName={booster.league as TLiga}
              isBought={isBought}
              isBlocked={isBlocked}
              userCoins={user.coins} // Передача количества монет пользователя
              boosterId={booster.id} // Передача boosterId
            />
          );
        }else{
         return (
            <BoostBlock
              key={booster.id}
              boostName={booster.name}
              boostNameNew={boosterNames[index]}
              earning={booster.yieldIncrease.toString()}
              price={booster.cost.toString()}
              ligaName={booster.league as TLiga}
              isBought={isBought}
              isBlocked={isBlocked}
              userCoins={0} // Передача количества монет пользователя
              boosterId={booster.id} // Передача boosterId
            />
          );
        }
        
      });
    };
    



  const renderFertilizers = () => {
     // Отфильтровать удобрения, оставив только одно с каждым уникальным именем
  const uniqueFertilizers = fertilizers.reduce((acc, fertilizer) => {
    const existingFertilizer = acc.find((item) => item.name === fertilizer.name);
    if (!existingFertilizer) {
      acc.push(fertilizer);
    }
    return acc;
  }, [] as Fertilizers[]);
  
  return uniqueFertilizers.map((fertilizer) => {
     // Найти соответствующий userFertilizer
     const userFertilizer = userFertilizers.find((uf) => uf.name === fertilizer.name);

     let displayedFertilizer = fertilizer;
 
     if (userFertilizer) {
       // Найти удобрение в fertilizers, соответствующее уровню пользователя
       const userLevelFertilizer = fertilizers.find(
         (f) => f.name === userFertilizer.name && f.level === userFertilizer.level + 1
       );
 
       // Если найдено удобрение с уровнем пользователя, использовать его данные
       if (userLevelFertilizer) {
         displayedFertilizer = userLevelFertilizer;
       }
     }
    
    // Проверка, куплен ли fertilizer пользователем
    const isBought = Boolean(userFertilizer);
    const isActive = false;
    const isBlocked = false; // Здесь можно добавить логику блокировки, если требуется
    const hourlyIncome = 0;
    // Определение уровня, если fertilizer куплен, иначе установить level как 1
    const level = userFertilizer ? userFertilizer.level : 0;

    if (user) {
      return (
        <FertilizersBlock
        key={displayedFertilizer.id}
        fertilizersName={displayedFertilizer.name}
        earning={displayedFertilizer.hourlyIncome.toString()}
        price={displayedFertilizer.cost.toString()}
        isBought={isBought}
        isBlocked={isBlocked}
        level={level}
        userId={user ? user.id : 0} // Передача userId, если user существует
        userCoins={user ? user.coins : 0} // Передача количества монет пользователя
        fertilizersId={displayedFertilizer.id} // Передача fertilizersId
        isActive={isActive}
        />
      );
    } else {
      return (
        <FertilizersBlock
          key={fertilizer.id}
          fertilizersName={fertilizer.name}
          earning={hourlyIncome.toString()}
          price={fertilizer.cost.toString()}
          isBought={isBought}
          isBlocked={isBlocked}
          level={level} // Передача уровня
          userId={user ? user.id : 0} // Передача userId, если user существует
          userCoins={0} // Передача количества монет пользователя
          fertilizersId={fertilizer.id} // Передача fertilizersId
        />
      );
    }
  });
};


      async function giveFertilizers() {
        dispatch(loading());
        if (fertilizersLoading) return; // Если уже идет запрос, просто выходим
        const coinsPerHour = parseInt(user.coinsPerHour, 10) || 0;
        const earning = parseInt(fertilizersState.info.earning, 10) || 0;
        const price = parseInt(fertilizersState.info.price, 10) || 0;
        if (user.coins < price) {
          return;
        }
        try {
          const response = await axios.post(`https://coinfarm.club/api/fertilizers/give/${user.id}/${fertilizersState.info.fertilizersId}`);

          //           const coinsPerHour = parseInt(user.coinsPerHour, 10) || 0;
// const earning = parseInt(fertilizersState.info.earning, 10) || 0;
// const price = parseInt(fertilizersState.info.price, 10) || 0;

dispatch(setUser({ 
  ...user, 
  coins: user.coins - price, 
  coinsPerHour: coinsPerHour + earning
}));
const response1 = await axios.put(`https://coinfarm.club/api/user/${user.id}`, {
  coins: user.coins - price,
  coinsPerHour: coinsPerHour + earning
}).then(() => {
  setIsCoinPurchased(!isCoinPurchased); // Обновляем состояние
  dispatch(closeFertilizersBuyPopup()); // Закрываем попап только после завершения запроса
});

console.log(response1)

          // setIsCoinPurchased(!isCoinPurchased)
  
          console.log('Coin given:', response.data);
        } catch (error) {
          console.error('Error giving coin:', error);
        }
      }

    
   async function giveCoin() {
      try {
         // Получаем индекс текущей монеты
         const currentCoinIndex = coinState.info.coinId
         let coinsToGive = 0;

         // Логика начисления монет в зависимости от coinId
         if (currentCoinIndex === 2) {
           coinsToGive = 1000;
         } else if (currentCoinIndex >= 3) {
           const earningsArray = [1000, 3000, 5000, 10000, 30000, 50000, 400000];
           // Если currentCoinIndex выходит за пределы массива, берем последнее значение
           coinsToGive = earningsArray[currentCoinIndex - 3] || 400000;
         }
        const response = await axios.post(`https://coinfarm.club/api/coin/give/${user.id}/${coinState.info.coinId}`);
        // dispatch(setUser({ ...user, coins: user.coins - coinState.info.price, coinsPerHour: coinState.info.earning}));
        dispatch(setUser({ 
          ...user, 
          coins: Number(user.coins) - Number(coinState.info.price), 
          coinsPerHour: Number(user.coinsPerHour) + coinsToGive
      }));
      const response1 = await axios.put(`https://coinfarm.club/api/user/${user.id}`, {
        coins: Number(user.coins) - Number(coinState.info.price), 
        coinsPerHour: Number(user.coinsPerHour) + coinsToGive
      }).then(() => {
        setIsCoinPurchased(!isCoinPurchased); // Выполняем действие после задержки
      });;
      console.log(response1)

        // setIsCoinPurchased(!isCoinPurchased)

        console.log('Coin given:', response.data);
      } catch (error) {
        console.error('Error giving coin:', error);
      }
    }


    const renderCoins = () => {
      const getMostExpensiveCoin = (userCoins: Coin[]) => {
         if (userCoins.length === 0) return null;
       
         return userCoins.reduce((maxCoin, currentCoin) => {
           return currentCoin.cost > maxCoin.cost ? currentCoin : maxCoin;
         });
       };
       const mostExpensiveCoin = getMostExpensiveCoin(userCoins);
       const sortedCoins = [...coins].sort((a, b) => a.id - b.id);
      return sortedCoins.map((coin, index) => {
        // Проверка, куплена ли монета пользователем
        // const isBought = userCoins.some((userCoin) => userCoin.id === coin.id);
        // const isActive =  mostExpensiveCoin ? mostExpensiveCoin.id === coin.id : false;
        const isBought = userCoins.length === 0 ? index === 0 : userCoins.some((userCoin) => userCoin.id === coin.id);
        const isActive = userCoins.length === 0 ? index === 0 : (mostExpensiveCoin ? mostExpensiveCoin.id === coin.id : false);
        const isBlocked = false; // Здесь можно добавить логику блокировки, если требуется
        const hourlyIncome = 1000 + index * 100;
       
        if(user){
        return (
          <CoinBlock
            key={coin.id}
            coinName={coin.name}
            earning={coin.hourlyIncome.toString()}
            price={coin.cost.toString()}
            isBought={isBought}
            isBlocked={isBlocked}
            userId={user.id} // Передача userId
            userCoins={user.coins} // Передача количества монет пользователя
            coinId={coin.id} // Передача coinId
            isActive={isActive}
            mostExpensiveCoinId = {mostExpensiveCoin?.id ? mostExpensiveCoin?.id : 2}
          />
        );
      }else{
         <CoinBlock
            key={coin.id}
            coinName={coin.name}
            earning={hourlyIncome.toString()}
            price={coin.cost.toString()}
            isBought={isBought}
            isBlocked={isBlocked}
            userId={user.id} // Передача userId
            userCoins={0} // Передача количества монет пользователя
            coinId={coin.id} // Передача coinId
            mostExpensiveCoinId = {mostExpensiveCoin?.id ? mostExpensiveCoin?.id : 2}
          />
      }
      });
    };
    useEffect(() => {
      // Здесь вызывается функция для ререндеринга монет
      renderCoins();
    }, [user, coins, coinState]);
    

    
    
    
    useEffect(() => {
      const handleHarvest = () => {
        // Когда происходит событие "harvest", очищаем таймер
        clearTimeout(timer);
      };
  
      // Запускаем таймер на 10 секунд при первой загрузке компонента
      const timer = setTimeout(() => {
        if(user?.totalEarnings <= 3000 && !showGuide){
          dispatch(openGuide());
          setShowGuide(true);
          
        }
    
      }, 10000); // 10 секунд бездействия
  
      // Добавляем обработчик события "harvest"
      document.addEventListener("harvest", handleHarvest);
  
      // Очищаем таймер и обработчик события при размонтировании компонента
      return () => {
        clearTimeout(timer);
        document.removeEventListener("harvest", handleHarvest);
      };
    }, []);
    

  
    // const updateCoins = (amount: number) => {
    //   if (user) {
    //     // Создаем копию текущего состояния пользователя до обновления
    
    //     // Обновляем локально XP
    //     const newXp = user.xp - amount;
    //     const xpToSend = newXp > 0 ? newXp : 0;
    
    //     // Рассчитываем новое количество монет
    //     const updatedCoins = user.coins + amount;
    //     const updatedTotalEarnings = user.totalEarnings + amount;
    
    //     // Отправляем обновленные данные на сервер
    //     axios
    //       .put(`https://coinfarm.club/api/user/${user.id}`, {
    //         coins: updatedCoins,
    //         totalEarnings: updatedTotalEarnings,
    //         xp: xpToSend,
    //       })
    //       .then((response) => {
    //         console.log(response);
    
    //         // После успешного запроса обновляем локально Redux store
    //         dispatch(
    //           setUser({
    //             ...user,
    //             coins: updatedCoins,
    //             totalEarnings: updatedTotalEarnings,
    //           })
    //         );
    //       })
    //       .catch((error) => {
    //         console.error('Ошибка при обновлении пользователя:', error);
    //         // Обработка ошибки
    //       });
    //   }
    // };
    
    const updateCoins = (amount: number) => {
      if (user) {
        // Создаем копию текущего состояния пользователя до обновления
    
        // Обновляем локально XP
        const newXp = user.xp - amount;
        const xpToSend = newXp > 0 ? newXp : 0;
    
        // Рассчитываем новое количество монет
        const updatedCoins = user.coins + amount;
        const updatedTotalEarnings = user.totalEarnings + amount;
    
        // Отправляем обновленные данные на сервер
        axios
          .put(`https://coinfarm.club/api/user/${user.id}`, {
            xp: xpToSend,
          })
          .then((response) => {
            console.log('Данные успешно обновлены:', response);
    
            // После успешного запроса обновляем локально Redux store
            dispatch(
              setUser({
                ...user,
                coins: updatedCoins,
                totalEarnings: updatedTotalEarnings,
              })
            );
    
            // После обновления данных выполняем второй запрос на увеличение дохода
            return axios.patch(
              `https://coinfarm.club/api/user/${user.id}/earn/${amount}`
            );
          })
          .then((patchResponse) => {
            console.log('Успешный запрос на увеличение дохода:', patchResponse);
            // Здесь можно добавить дополнительные действия после успешного патча, если нужно
          })
          .catch((error) => {
            console.error('Ошибка при обновлении пользователя или увеличении дохода:', error);
            // Обработка ошибки
          });
      }
    };
    
    const getNonFirstStageCount = (blocks: { id: number; stage: TGrowthStage }[]) => {
      return blocks.filter(block => block.stage !== "first").length;
    };
    
    useEffect(() => {
      const handleHarvest = (event: Event) => {
                
        const customEvent = event as CustomEvent<number>;
        const harvestedCount = customEvent.detail;
    
        // Получить количество блоков с несрезанными стадиями
        const nonFirstStageCount = getNonFirstStageCount(blocks);
    
        setCanShowFinger(false);
    
        if (user?.totalEarnings <= 3000 && !showGuide) {
          dispatch(openGuide());
          setShowGuide(true);
        }
    
        if (nonFirstStageCount > 0 && harvestedCount > 0) {
          // Если есть блоки для сбора
          const decrementPerBlock = displayEarnings / nonFirstStageCount;
    
          // Общая сумма, которую нужно вычесть за собранные блоки
          const totalDecrementAmount = Math.min(decrementPerBlock * harvestedCount, displayEarnings);
    
          // Обновляем заработок пользователя и начисляем монеты локально
          setDisplayEarnings(prev => {
            const newEarnings = Math.max(prev - totalDecrementAmount, 0);
            updateCoins(totalDecrementAmount); // Сразу обновляем баланс монет пользователя
            return newEarnings;
          });
    
          console.log("Total decrement amount:", totalDecrementAmount);
        } else if (nonFirstStageCount === 0 && harvestedCount > 0) {
          // Если все стадии срезаны, но harvestCount > 0
          setDisplayEarnings(0);
          updateCoins(displayEarnings); // Начисляем текущее значение пользователю
        }
      };
    
      document.addEventListener("harvest", handleHarvest);
    
      return () => {
        document.removeEventListener("harvest", handleHarvest);
      };
    }, [blocks, displayEarnings, user]);
   



    
  
        const syncDisplayEarningsWithServer = async (newDisplayEarnings: number) => {
      try {
        const response = await axios.put(`https://coinfarm.club/api/user/${user.id}`, { xp: newDisplayEarnings });
        const updatedUserData = response.data;
    
        // Сохраняем актуальные данные в Redux после синхронизации с сервером
        dispatch(setUser(updatedUserData));
    
        console.log("Синхронизация заработка с сервером прошла успешно:", updatedUserData);
      } catch (error) {
        console.error("Ошибка при синхронизации displayEarnings:", error);
      }
    };
    const updateDisplayEarnings = (newDisplayEarnings: number) => {
      setDisplayEarnings(newDisplayEarnings);
      // dispatch(setUser({ ...user, xp: newDisplayEarnings }));  // сохраняем в Redux
      syncDisplayEarningsWithServer(newDisplayEarnings);  // отправляем на сервер
    };
    

    
    
    useEffect(() => {
      if (user?.xp && !isXpFetched) {
        // Инициализируем displayEarnings значением xp
        setDisplayEarnings(user.xp);
        setIsXpFetched(true);
      }
    }, [user]);
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          lastUpdateRef.current = Date.now();
        }
      };
    
      document.addEventListener('visibilitychange', handleVisibilityChange);
    
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - lastUpdateRef.current) / 1000; // Время в секундах
        lastUpdateRef.current = now;
        const calculatedInHour = user?.coinsPerHour * leagues[user.level].harvest;
    
        const earningsIncrement = (calculatedInHour / 3600 || 0) * elapsed;
        const maxEarnings = calculatedInHour * user?.incomeMultiplier;
    
        // Обновляем значение и сохраняем его
        setDisplayEarnings(prevDisplayEarnings => {
          const newDisplayEarnings = prevDisplayEarnings + earningsIncrement;
    
          if (newDisplayEarnings <= maxEarnings) {
            updateDisplayEarnings(newDisplayEarnings);
            return newDisplayEarnings;
          } else {
            updateDisplayEarnings(maxEarnings);
            return maxEarnings;
          }
        });
      }, 10000);
    
      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [user?.coinsPerHour, user?.incomeMultiplier]);
        
  

  
    useEffect(() => {
        const fetchRewards = async () => {
    try {
      checkRainReward(rewards);
      console.log("check rain");
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

      fetchRewards();
    }, [user]); // Depend on location and user ID

    useEffect(() => {
      // if (energyPopupOpen) {
        // Step 1: Fetch rewards data
        if (user?.id && energyPopupOpen) {

        axios.get(`https://coinfarm.club/api/reward/${user?.id}`)
          .then(response => {
            setRewards(response.data);
            checkRainReward(response.data);
            console.log("check rain")
          })
          .catch(error => {
            console.error('Error fetching rewards:', error);
          });
        }
      // }
    }, [user]);

    
    const checkRainReward = (rewards: Reward[]) => {
      const rainRewards = rewards.filter(reward => reward.type === 'rain');
      const car2Boost = userBoosters.find(boost => boost.name === 'mill');
      setRainInterval(car2Boost ? 12 : 6); // Установите интервал на 12 часов, если бустер car-2 активен
    
      if (rainRewards.length > 0) {
        const latestRainReward = rainRewards[rainRewards.length - 1];
        const rewardTime = new Date(latestRainReward.description);
        const currentTime = new Date();
        const timeDifference = (currentTime.getTime() - rewardTime.getTime()) / (1000 * 60 * 60); // in hours

        // Устанавливаем прогресс до следующего дождя
        setCurrentRainProgress(timeDifference);
    
        // Шаг 3: Проверка разницы во времени
        if (timeDifference > rainInterval) {
          setIsRain(true);
        } else {
          setIsRain(false);
        }
      } else {
        setIsRain(true);
        setCurrentRainProgress(rainInterval); // Если нет наград за дождь, то дождь доступен
      }
    };
    

    const handleRainReward = async () => {
      try {
        // Отправляем запрос на получение награды за дождь
        const response = await axios.post(`https://coinfarm.club/api/reward/rain/${user?.id}`);
        console.log('Rain reward response:', response);
    
        // Получаем награды пользователя после успешного дождя
        const rewardsResponse = await axios.get(`https://coinfarm.club/api/reward/${user?.id}`);
        setRewards(rewardsResponse.data);
        
        // Проверяем награды и выполняем расчет
        checkRainReward(rewardsResponse.data);
        console.log("Rewards checked");
    
        const userLeagueIndex = user ? user.level : 0;
        const userHarvestMultiplier = leagues[userLeagueIndex]?.harvest || 1;
        const calculatedInHour = user?.coinsPerHour * userHarvestMultiplier;
        setDisplayEarnings(calculatedInHour * user?.incomeMultiplier);
        // Создаем аудио объект для звука дождя
        const rainSound = new Audio('sounds/rain.mp3'); // Укажи правильный путь к звуку дождя

        // Включаем звук дождя и зацикливаем его во время анимации
        rainSound.play();
        rainSound.loop = false;
        // Обновляем статус анимации и прогресса
        dispatch(growAllToMax());
        setEnergyPopupOpen(false);
        setIsRainAnim(true);
        setCurrentRainProgress(0);
    
        // Останавливаем анимацию через 5 секунд
        setTimeout(() => {
          setIsRainAnim(false);
          rainSound.pause(); // Останавливаем звук дождя
          rainSound.currentTime = 0; // Возвращаем аудио к началу для повторного использования
        }, 5000);    
      } catch (error) {
        console.error('Error handling rain reward:', error);
      }
    };
    
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('https://coinfarm.club/api/reward/');
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
    
      fetchTasks();
    }, []);




const formatLargeNumber = (num: number, divisor: number, suffix: string): string => {
  const result = num / divisor;
  // Если дробная часть равна 0, отображаем целое число, иначе 3 знака после запятой
  return result % 1 === 0
    ? result.toFixed(0) + suffix // Целое число без десятичных
    : result.toFixed(3) + suffix; // Три знака после запятой
};

// // Пример использования с форматированием цен для бустеров, монет и удобрений
// const boostFormattedPrice = parseFloat(boostState.info.price) >= 1000000000
//   ? formatLargeNumber(parseFloat(boostState.info.price), 1000000000, 'B')
//   : parseFloat(boostState.info.price) >= 1000000
//   ? formatLargeNumber(parseFloat(boostState.info.price), 1000000, 'M')
//   : parseFloat(boostState.info.price).toString();

// const coinFormattedPrice = parseFloat(coinState.info.price) >= 1000000000
//   ? formatLargeNumber(parseFloat(coinState.info.price), 1000000000, 'B')
//   : parseFloat(coinState.info.price) >= 1000000
//   ? formatLargeNumber(parseFloat(coinState.info.price), 1000000, 'M')
//   : parseFloat(coinState.info.price).toString();

// const fertFormattedPrice = parseFloat(fertilizersState.info.price) >= 1000000000
//   ? formatLargeNumber(parseFloat(fertilizersState.info.price), 1000000000, 'B')
//   : parseFloat(fertilizersState.info.price) >= 1000000
//   ? formatLargeNumber(parseFloat(fertilizersState.info.price), 1000000, 'M')
//   : parseFloat(fertilizersState.info.price).toString();

const boostFormattedPrice = parseFloat(boostState.info.price) >= 1000000000000
? formatLargeNumber(parseFloat(boostState.info.price), 1000000000000, 'T')
: parseFloat(boostState.info.price) >= 1000000000
? formatLargeNumber(parseFloat(boostState.info.price), 1000000000, 'B')
: parseFloat(boostState.info.price) >= 1000000
? formatLargeNumber(parseFloat(boostState.info.price), 1000000, 'M')
: parseFloat(boostState.info.price).toString();

const coinFormattedPrice = parseFloat(coinState.info.price) >= 1000000000000
? formatLargeNumber(parseFloat(coinState.info.price), 1000000000000, 'T')
: parseFloat(coinState.info.price) >= 1000000000
? formatLargeNumber(parseFloat(coinState.info.price), 1000000000, 'B')
: parseFloat(coinState.info.price) >= 1000000
? formatLargeNumber(parseFloat(coinState.info.price), 1000000, 'M')
: parseFloat(coinState.info.price).toString();

const fertFormattedPrice = parseFloat(fertilizersState.info.price) >= 1000000000000
? formatLargeNumber(parseFloat(fertilizersState.info.price), 1000000000000, 'T')
: parseFloat(fertilizersState.info.price) >= 1000000000
? formatLargeNumber(parseFloat(fertilizersState.info.price), 1000000000, 'B')
: parseFloat(fertilizersState.info.price) >= 1000000
? formatLargeNumber(parseFloat(fertilizersState.info.price), 1000000, 'M')
: parseFloat(fertilizersState.info.price).toString();

   return (
      <>
      {/* <QRCodeComponent /> */}
       {!false && (
 <>

 {/* { isRain && <Clouds
 onClick={() => setEnergyPopupOpen(true)}
 />}

  { isRainAnim && <Clouds 
  onClick={() => setEnergyPopupOpen(true)}
  />} */}
          {isRainAnim && <RainAnimation />}
          {!energyPopupOpen && !isPopupOpen && !isLoading && <Energy 
            hours={user?.incomeMultiplier}
           total={rainInterval}
           current={currentRainProgress}
           onClick={() => {
           // Play sound on progress bar harvest click
           const sound = new Audio('sounds/popup.mp3');
           sound.play();

           // Stop the sound after 1 second
           setTimeout(() => {
           sound.pause();
           sound.currentTime = 0;  // Reset sound to the beginning
           }, 1000);
            setEnergyPopupOpen(true)}}
           onClickProgresbar={() => console.log('kkk')}
           version={1}
           inHour={user?.coinsPerHour}
           isRain={!isRain}
           onClickProgresbarHarvest={
            () => {
              console.log('jjj')
            }
           }
          /> }
          
         {/* Основной контент */}
         <div className={cn("wrap", isLoading && "_hidden")}>
            <div className={cn("top")} style={{zIndex:'2'}}>
               <Account
                  // nickname="dimamrkv"
                  nickname={nickname.toUpperCase()}
                  // imgSrc={imgSrc}
                  />
               <Coins quantity={Math.round(user?.coins).toString()} />
            </div>

            {!isPopupOpen && (
               <div className={cn("bottom")}>
                  {/* Лига */}
                  {/* <Liga
                     liga="Diamond"
                     onLigaOpen={() => setEarnPopupOpen(true)}
                  /> */}
                  <Liga onClickLeagues={() => {
                    // setLeaguesopupOpen(true)
                    navigate(Routes.INVITE)
                  }} liga={leagues[level].name as TLiga} />
                  <Energy
                     total={user?.coinsPerHour*user?.incomeMultiplier*leagues[level].harvest}
                     hours={user?.incomeMultiplier}
                    //  current={Math.round(displayEarnings)}
                     current={Math.min(Math.round(displayEarnings), user?.coinsPerHour * user?.incomeMultiplier * leagues[level].harvest)}
                     onClickProgresbarHarvest={
                      () => {
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                        setBoostPopupOpen(true);
                        openFertilizersPopup()
                      }
                     }
                     onClick={() => {
                      () => {
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                        setBoostPopupOpen(true);
                        openBoostPopup()
                      }
                    }}
                    onClickProgresbar={
                      () => {
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                        setBoostPopupOpen(true);
                        openBoostPopup()

                      }
                    }
                    inHour={user?.coinsPerHour * leagues[level].harvest}
                     version={0}
                     isRain={!isRain}

                  />
                  <Menu
                     onBoostOpen={() => {
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                      setBoostPopupOpen(true)
                      openFertilizersPopup()
                     }}
                     onEarnOpen={() => {
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                      setEarnPopupOpen(true)
                      openSpecialPopup()
                     }}
                     onGamesOpen={()=>{
                        // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                      setGamesPopupOpen(true)
                      openGamesPopup()
                     }}
                     onCoinsOpen={() => {
                       // Play sound on progress bar harvest click
                        const sound = new Audio('sounds/popup.mp3');
                        sound.play();

                        // Stop the sound after 1 second
                        setTimeout(() => {
                          sound.pause();
                          sound.currentTime = 0;  // Reset sound to the beginning
                        }, 1000);
                      setBoostPopupOpen(true)
                      openBoostPopup()}}
                      
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
      borderlabel={t('rain')}
      isBlueBg
      isOpen={energyPopupOpen}
      onClose={() => setEnergyPopupOpen(false)}
      ref={energyRef}
    >
      <div className={cn("popup__body")}>
        <div className={cn("popup__bg-drops")}>
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
          <img src="img/pages/home/energy/drop.svg" alt="drop" />
        </div>
          
        <img
          src="img/pages/home/energy/dark-clouds.svg"
          className={cn("popup__icon")}
          alt="energy"
        />

        <p className={cn("popup__desc") + " textShadow textRain"}>
          {/* Activate rain to instantly grow your crops to their maximum
          yield without waiting! Collect your fully grown harvest
          immediately! */}
          {t('rain_descr')}
        </p>

        <div className={cn("popup__bottom")}>
        {!isRain ? (
            <Button
            className={cn("popup__btn")}
            size={width > 380 ? "big" : "normal"}
            isBlueBg
            disabled
          >
           
            <span className="textShadow">{t('rain')}</span>
          </Button>
          ) : (
            <Button
            className={cn("popup__btn1")}
            size={width > 380 ? "big" : "normal"}
            onClick={handleRainReward}
          >
          
            <span className="textShadow">{t('rain')}</span>
          </Button>
          )}
         
        </div>
      </div>
    </Popup>

           {/* Fertilizers popup */}
          <Popup
               borderlabel={fertilizersState.info.name}
               isOpen={fertilizersState.isOpen}
               onClose={() => dispatch(closeFertilizersBuyPopup())}
               ref={fertilizersBuyRef}>
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
  src={`img/fertilizers/${fertilizersState.info.name}.svg`}
  onError={(e) => {
    e.currentTarget.onerror = null; // предотвращаем бесконечный цикл в случае отсутствия обоих форматов
    e.currentTarget.src = `img/fertilizers/${fertilizersState.info.name}.png`;
  }}
  className={cn("popup__icon", "_boost")}
/>


                  <div className={cn("popup__bottom")}>
                     <div className={cn("popup__earning")}>
                        <span>+{fertilizersState.info.earning} / 1{t('h')}</span>
                     </div>

                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        disabled={fertilizersLoading} // Блокируем кнопку, если идет запрос
                        onClick={() =>{
                          // dispatch(loading());
                          giveFertilizers()
                           buy(fertilizersMoneyAnimRef, () =>
                              dispatch(closeFertilizersBuyPopup())
                           )
                        }

                        }>

                        {/* <CoinWhiteBg
                           iconName="Bitcoin"
                           size={width > 380 ? "normall" : "small"}
                        />
                        <span>{isProcessing ? 'Loading...' : fertFormattedPrice}</span> */}
 {!fertilizersLoading && (
    <CoinWhiteBg
      iconName="Bitcoin"
      size={width > 380 ? "normall" : "small"}
    />
  )}
  <span>{fertilizersLoading ? 'Loading...' : fertFormattedPrice}</span>
                     </Button>
                     <img
                        // src={`img/pages/home/${mostExpensiveCoinName}/money.svg`}
                        src={`img/pages/home/money1.svg`}
                        className={cn("popup__money-anim")}
                        ref={fertilizersMoneyAnimRef}
                     />
                  </div>
               </div>
            </Popup>



            {/* Boost popup */}
            <Popup
               borderlabel={t(`${boostState.info.boostNameNew.toLocaleLowerCase()}`)} // Используем новое имя бустера
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
                        <span>+{boostState.info.earning} {t('hour')} ⏰</span>
                       
                     </div>

                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        onClick={() =>{
                           applyBooster()
                           buy(boostMoneyAnimRef, () =>
                              dispatch(closeBoostBuyPopup())
                           )
                        }
                           
                        }>
                        <CoinWhiteBg
                           iconName="Bitcoin"
                           size={width > 380 ? "normall" : "small"}
                        />
                        {/* <span>{boostState.info.price}</span> */}
                        <span>{boostFormattedPrice}</span>

                     </Button>
                     <img
                        // src={`img/pages/home/${mostExpensiveCoinName}/money.svg`}
                        src={`img/pages/home/money1.svg`}
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
                        <span>+{coinState.info.earning} / 1{t('h')}</span>
                     </div>

                     <Button
                        className={cn("popup__btn")}
                        size={width > 380 ? "big" : "normal"}
                        onClick={() =>{
                           giveCoin()
                           buy(coinMoneyAnimRef, () =>
                              dispatch(closeCoinBuyPopup())
                           )
                        }
                        }>
                        <CoinWhiteBg
                           iconName="Bitcoin"
                           size={width > 380 ? "normall" : "small"}
                        />
                        {/* <span>{coinState.info.price}</span> */}
                        <span>{coinFormattedPrice}</span>

                     </Button>
                     <img
                        // src={`img/pages/home/${mostExpensiveCoinName}/money.svg`}
                        src={`img/pages/home/money1.svg`}
                        className={cn("popup__money-anim")}
                        ref={coinMoneyAnimRef}
                     />
                  </div>
               </div>
            </Popup>

            {/* BOOST popup */}
            <PopupListWrap isOpen={boostPopupOpen}>
               <PopupListTabs
                  labels={["FERTILIZERS", "BOOST", "COINS"]}
                  activeTab={boostActiveTab}
                  onTabChange={(label) => setBoostActiveTab(label)}
               />

               {boostActiveTab === "BOOST" && (
               <PopupList ref={boostRef} nodes={renderBoosters()} />
            )}
              {boostActiveTab === "COINS" && (
               <PopupList ref={boostRef} nodes={renderCoins()} />
            )}
                   {boostActiveTab === "FERTILIZERS" && (
               <PopupList
                  ref={earnRef}
                  nodes={renderFertilizers()}
               />
            )}
              
            </PopupListWrap>







            {/* LEAGUES popup */}

            <PopupListWrap isOpen={leaguesPopupOpen}>
               <PopupListTabs
                  labelClassName={cn("earn__label")}
                  labels={["LEAGUES"]}
                  activeTab={leaguesActiveTab}
                  onTabChange={(label) => setLeaguesActiveTab(label)}
               />

              
{leaguesActiveTab === "LEAGUES" && (
               <PopupList
                  ref={earnRef}
                  nodes={renderLeagues()}
               />
            )}


            </PopupListWrap>









            {/* EARN popup */}
            <PopupListWrap isOpen={earnPopupOpen}>
               <PopupListTabs
                  labelClassName={cn("earn__label")}
                  labels={["TASKS"]}
                  activeTab={earnActiveTab}
                  onTabChange={(label) => setEarnActiveTab(label)}
               />


{earnActiveTab === "TASKS" && ( 
  <PopupList
    ref={earnRef}
    nodes={tasks
      .reduce((acc: Task[], task: Task) => {
        if (task.description === "Win 10USDT") {
          // Вставляем это задание на 4-е место (индекс 3)
          acc.splice(4, 0, task);
        } else if (task.description === "Join CRYPTO DAILY") {
          // Вставляем это задание на 4-е место (индекс 3)
          acc.splice(3, 0, task);
        } else if (task.description === "Join Political Warfare") {
          // Вставляем это задание на 4-е место (индекс 3)
          acc.splice(5, 0, task);
        } else if (task.description === "Join Cats") {
          // Вставляем это задание на 3-е место (индекс 2)
          acc.splice(6, 0, task);
        } else if (task.description === "Sign up and get 50’000$") {
          // Вставляем это задание на 5-е место (индекс 4)
          acc.splice(7, 0, task);
        } else if (task.description === "Play Starsfi") {
          // Вставляем это задание на 6-е место (индекс 5)
          acc.splice(8, 0, task);
        } else if (task.description === "LiveMine") {
          // Вставляем это задание на 7-е место (индекс 6)
          acc.splice(9, 0, task);
        } else if (task.description === "Join Hrum") {
          // Вставляем это задание на 8-е место (индекс 7)
          acc.splice(10, 0, task);
        } else {
          // Добавляем задание в конец массива, если оно не равно целевым
          acc.push(task);
        }
        return acc;
      }, [])
      .map((task: Task) => (
        <FreindOrSpecialBlock
          key={task.id}
          imgSrc={task.imgSrc}
          title={task.description}
          earning={task.rewardAmount.toString()}
          link={task.link}
          defaultButtonText={t('join')}
        />
      ))} 
  />
)}
            </PopupListWrap>

                        {/* GAMES popup */}
                        <PopupListWrap isOpen={gamesPopupOpen}>
               <PopupListTabs
                  labelClassName={cn("earn__label")}
                  labels={[t("games")]}
                  activeTab={t("games")}
                  onTabChange={(label) => setGamesActiveTab(label)}
               />

              

  <PopupList 
    ref={gamesRef} 
    nodes={[
      <div style={{height: "1000px !important"}}>
            <GamesBlock
        imgSrc='img/pages/home/menu/Wheel1.png'
        title={t('wheel_of_fortune')}
        buttonText={t('play')}
      />
                  <GamesBlock1
        imgSrc='img/pages/home/menu/combo_box.png'
        title={t('daily_combo')}
        buttonText={t('play')}
      />
      <img style={{position: "absolute", top: "200%", left: "0", width: "100%"}} src="img/pages/home/menu/coming.png" />
      <img style={{position: "absolute", top: "300%", left: "0", width: "100%"}} src="img/pages/home/menu/coming1.png" />
      <img style={{position: "absolute", top: "400%", left: "0", width: "100%"}} src="img/pages/home/menu/coming2.png" />

      </div>

    ]} 
  />

 


            </PopupListWrap>

            {/* Иконка close, которая закрывает попапы с вариантом списка (<PopupListWrap />) */}
            {(boostPopupOpen || earnPopupOpen || gamesPopupOpen || leaguesPopupOpen) && (
               <img
                  src="img/global/closeIcon.svg"
                  onClick={() => {
                     setBoostPopupOpen(false);
                     setEarnPopupOpen(false);
                     setGamesPopupOpen(false);
                     setLeaguesopupOpen(false)
                     window.scrollTo(0, 100);

                  }}
                  className={cn("close")}
                  alt="Close"
               />
            )}
         </div>

         {/* Приветствие */}
         {!hasFirstReward && <Greeting />}
         {showGuide && false && <Guide />}
         <Guide1 />
        <Wheel />
        <Combo />
        <Wallet />
         {/* Ежедневный бонус */}
         <DailyBonus />
      </>
          )}
      </>

   );
};

export default Home;