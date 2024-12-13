// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { RootState, useAppDispatch, useAppSelector } from "../../store";
// import { loadingToggle } from "../../store/reducers/preloader";
// import { useQuery } from '@tanstack/react-query';
// import styles from "./Preloader.module.scss";
// import classNames from "classnames/bind";
// // import logo from "../../../public/img/pages/home/pig.png"; // Путь к вашему логотипу
// import background1 from "../../../public/img/backgrounds/bg1.avif"; // Путь к первому фону
// import background2 from "../../../public/img/backgrounds/bg2.avif"; // Путь ко второму фону
// import background3 from "../../../public/img/backgrounds/bg3.avif"; // Путь к третьему фону
// import { setUser } from "../../store/reducers/userSlice";
// import { retrieveLaunchParams } from '@tma.js/sdk';
// import axios from "axios";
// import EnergyPreloader from "./EnergyPreloader";
// const cn = classNames.bind(styles);

// interface User {
//    id: number;
//    username: string;
//    coins: number;
//    totalEarnings: number;
//    incomeMultiplier: number;
//    coinsPerHour: number;
//    xp: number;
//    level: number;
// }

// interface Earning {
//    username: string;
//    coinsEarned: number;
// }

// interface Friend extends User {
//    coinsEarned?: number;
//    secondTierEarnings?: number;
//    thirdTierEarnings?: number;
// }

// // Функция для выполнения запроса на получение рефералов
// const fetchReferralsAndEarnings = async (userId: number) => {
//    console.log(userId)
//   const referralsResponse = await fetch(`https://coinfarm.club/api/user/${userId}/referrals`);
//   if (!referralsResponse.ok) {
//     throw new Error('Failed to fetch referrals');
//   }
//   const referralsData = await referralsResponse.json();

//   const earningsResponse = await fetch(`https://coinfarm.club/api/user/${userId}/referrals/earnings`);
//   if (!earningsResponse.ok) {
//     throw new Error('Failed to fetch earnings');
//   }
//   const earningsData = await earningsResponse.json();

//   const friendsWithEarnings = await Promise.all(referralsData.map(async (friend: Friend) => {
//     const earning = earningsData.find((e: Earning) => e.username === friend.username);
    

//     return { ...friend, coinsEarned: earning ? earning.coinsEarned : 0};
//   }));

//   return friendsWithEarnings;
// };

// const Preloader = () => {
//    const dispatch = useAppDispatch();
//    const isLoading = useAppSelector((state) => state.preloader.isLodaing);
//    const user = useAppSelector((state: RootState) => state.user.user);
//    const [energy, setEnergy] = useState(0); // состояние энергии
//    const [daysLeft, setDaysLeft] = useState(0); // состояние для количества дней
//    const backgrounds = [background1, background2, background3];
//    const [backgroundImage, setBackgroundImage] = useState("");
//    useEffect(() => {
//       const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
//       setBackgroundImage(randomBackground);
//       // Другой код
//   }, [dispatch]);
  
//    const calculateDaysLeft = () => {
//       const targetDate = new Date('2024-12-13'); // 13 декабря 2024
//       const currentDate = new Date();
      
//       // Use the getTime() method to get the time in milliseconds since January 1, 1970
//       const difference = targetDate.getTime() - currentDate.getTime(); // разница в миллисекундах
      
//       // Convert the difference from milliseconds to days
//       const days = Math.ceil(difference / (1000 * 60 * 60 * 24)); // переводим в дни
      
//       setDaysLeft(days);
//     };
    
//    useEffect(() => {
//       // Установить состояние загрузки в true при первом рендере
//       dispatch(loadingToggle(true));
//       calculateDaysLeft();

//       // Запустить таймер на 5 секунд, после чего скрыть заставку
//       const timer = setTimeout(() => {
//          dispatch(loadingToggle(false));
//       }, 5000);
//       // Очистить таймер при размонтировании компонента
//       return () => clearTimeout(timer);
//    }, [dispatch]);
//    useEffect(() => {
//       // Обновление энергии каждые 1 секунду
//       const energyInterval = setInterval(() => {
//          setEnergy((prev) => Math.min(prev + 20, 100)); // увеличение на 20, но не более 100
//       }, 1000);

//       // Очистить интервал при размонтировании
//       return () => clearInterval(energyInterval);
//    }, []);
//    useEffect(() => {
//       const fetchUserData = async () => {
//          const { initData } = retrieveLaunchParams();
//          if (initData && initData.user) {
//             const user = initData.user;
//             const username = user.username;
//             const userId = user.id;

//             try {
//                const response = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
//                const data = response.data;
//                let referralCode = data.referral_code;

//                const userResponse = await axios.post(
//                   "https://coinfarm.club/api/user",
//                   {
//                      username: username,
//                      coins: 0,
//                      totalEarnings: 0,
//                      incomeMultiplier: 1,
//                      coinsPerHour: 1000,
//                      xp: 1000,
//                      level: 0,
//                      referralCode: referralCode,
//                   }
//                );

//                   const userData = userResponse.data;
//                   dispatch(setUser(userData)); // Устанавливаем уже существующего пользователя

//             } catch (error) {
//                console.error("Error:", error);
//             }
//          }
//       };

//       fetchUserData();
//    }, [dispatch]);

//    const { data: friends, isLoading: isQueryLoading, isError } = useQuery({
//       queryKey: ['referrals', user?.id],
//       queryFn: () => fetchReferralsAndEarnings(user.id),
//       enabled: !!user?.id, // Запрос выполняется только если есть user.id
//   });
  
//   useEffect(() => {
//       if (isQueryLoading) {
//          //  dispatch(loadingToggle(true));
//       } else {
//          //  dispatch(loadingToggle(false));
//       }
  
//       if (isError) {
//           console.error('Error fetching referrals and earnings');
//       }
//   }, [isQueryLoading, isError, dispatch]);

//    useEffect(() => {
//       if (isQueryLoading) {
//          // dispatch(loadingToggle(true));
//       }
//    }, [isQueryLoading, dispatch]);

//    return (
//       <>
//          {isLoading && (
//             <div className={cn("wrap")} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: "center" }}>
//                <div className={cn("preloader")}>
//                   {/* <img src={logo} alt="Logo" className={cn("logo")} /> */}
//                </div>
//                <span style={{ position: "absolute", bottom: "13vh", left: "50%", width: "240px", fontSize: "24px", textAlign: "center", transform: "translateX(-50%)" }}>
//   Token mining ends in  
//   <span style={{ 
//     background: "linear-gradient(90deg, #82AD00 0%, #1F7201 100%)", 
//     WebkitBackgroundClip: "text", 
//     backgroundClip: "text", 
//     color: "transparent",
//     marginLeft:"5px"
//   }}>
//     {daysLeft} days
//   </span>
// </span>

//                <EnergyPreloader
//                      total={100}
//                      current={energy} // текущее значение энергии
//                      version={0}
//                   />
//             </div>
//          )}
//          <Outlet context={{ friends }} /> {/* Передаем загруженные данные через Outlet */}
//       </>
//    );
// };

// export default Preloader;
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {  useAppDispatch } from "../../store";
import { loadingToggle } from "../../store/reducers/preloader";
// import { useQuery } from '@tanstack/react-query';
import styles from "./Preloader.module.scss";
import classNames from "classnames/bind";
import background1 from "../../../public/img/backgrounds/bg1.avif";
import background2 from "../../../public/img/backgrounds/bg2.avif";
import background3 from "../../../public/img/backgrounds/bg3.avif";
// import { setUser } from "../../store/reducers/userSlice";
// import { retrieveLaunchParams } from '@tma.js/sdk';
import axios from "axios";
import { retrieveLaunchParams } from '@tma.js/sdk';

const cn = classNames.bind(styles);

const Preloader = () => {
  const dispatch = useAppDispatch();
  const backgrounds = [background1, background2, background3];
  const [backgroundImage, setBackgroundImage] = useState("");
//   const user = useAppSelector((state: RootState) => state.user.user);

  // Use this state to control the visibility of the message overlay
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(randomBackground);
    dispatch(loadingToggle(true)); // Always show preloader
  }, [dispatch]);

//   const handleLearnMore = async () => {
//    const { initData } = retrieveLaunchParams(); // Предполагается, что у вас есть эта функция
//    if (initData && initData.user) {

//    const user = initData.user;
//    let username = user.id;
//       try {
//         const message = "🎉 **АИРДРОП ОТ FARM!**\n\n" +
//                        "🚀 Прими участие в эксклюзивном аирдропе!\n" +
//                        "🎯 Активность в игре и участие в премаркете увеличивают твой бонус!\n" +
//                        "👉 Узнай, как получить свои токены!";

//         await axios.post('https://coinfarm.club/api1/notifyUserHarvestReady', {
//           userName: username,
//           message: message
//         });

//         setShowMessage(false); // Hide the message after sending
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//    }
//   };
const handleLearnMore = async () => {
   const { initData } = retrieveLaunchParams(); // Предполагается, что у вас есть эта функция
   if (initData && initData.user) {
 
     const user = initData.user;
     let username = user.id;
 
     // Сообщения
     const messages = [
       {
         text: "🚨 Внимание, комьюнити! 🚨\n\n" +
                 "Мы запускаем премаркет токенов Farm на платформе Coin Farm! Это твой шанс стать одним из первых владельцев токенов, которые могут принести отличные дивиденды в будущем! 📈\n\n" +
                 "✅ Преимущества премаркетинга:\n\n" +
                 "🚀 Быстрая покупка токенов по специальной цене\n" +
                 "💰 Возможность заработать на росте стоимости токенов\n" +
                 "🛠️ Поддержка новых технологий и устойчивых решений\n\n" +
                 "💥 Закрытый аирдроп для нашего комьюнити! Он будет выдан только тем, кто:\n\n" +
                 "Купил токены на премаркете на любую сумму\n" +
                 "Играл в нашу игру и проявил активность!\n\n" +
                 "🚫 Этот аирдроп предназначен только для тех, кто является частью нашего активного комьюнити и поддерживает проект. Мы отсекаем участников, которые не проявляют интерес или не участвуют в жизни нашего сообщества.\n\n" +
                 "🎯 Дата аирдропа: 20 декабря в 00:00 по МСК.\n\n" +
                 "💸 Каждая покупка токенов на премаркете не только увеличивает цену токенов, которые выйдут на бирже ByBit, но и повышает сумму аирдропа, который ты получишь! Чем больше ты купишь токенов, тем выше будет твой бонус в аирдропе и тем больше возможностей для будущего роста твоих активов!\n\n" +
                 "🔥 Не упусти шанс стать частью Farm и сделать шаг к новым высотам! Жми на кнопку и покупай токены прямо сейчас!\n\n" +
                 "To the moon! 🚀\n\n" +
                 "---------------------------------\n" +
                 "🚨 Attention, community! 🚨\n\n" +
                 "We are launching the presale of Farm tokens on the Coin Farm platform! This is your chance to become one of the first token holders, who could earn excellent dividends in the future! 📈\n\n" +
                 "✅ Benefits of the presale:\n\n" +
                 "🚀 Quick purchase of tokens at a special price\n" +
                 "💰 Opportunity to profit from the token's price increase\n" +
                 "🛠️ Support for new technologies and sustainable solutions\n\n" +
                 "💥 Closed airdrop for our community! It will be given only to those who:\n\n" +
                 "Bought tokens in the presale for any amount\n" +
                 "Played our game and showed activity!\n\n" +
                 "🚫 This airdrop is only for those who are part of our active community and support the project. We are excluding participants who do not show interest or do not engage with our community.\n\n" +
                 "🎯 Airdrop date: December 20th at 00:00 MSK.\n\n" +
                 "💸 Every purchase of tokens in the presale not only increases the price of tokens that will be listed on ByBit but also increases the airdrop amount you will receive! The more tokens you buy, the higher your airdrop bonus and the greater the potential for future growth of your assets!\n\n" +
                 "🔥 Don't miss the chance to be a part of Farm and take a step towards new heights! Click the button and buy tokens now!\n\n" +
                 "To the moon! 🚀"
       },
       {
         text: "🎉 Друзья, готовы к конкурсу? 🎉\n\n" +
                 "Мы запускаем невероятный конкурс с призовым фондом $35,000! А самое главное, что победители будут определяться по количеству купленных токенов Farm! Чем больше токенов ты купишь — тем выше твои шансы на победу! 🏆\n\n" +
                 "🏅 Призовой фонд:\n" +
                 "1️⃣ Место — $10,000\n" +
                 "2️⃣ Место — $7,000\n" +
                 "3️⃣ Место — $5,000\n" +
                 "4️⃣ Место — $2,500\n" +
                 "5️⃣ Место — $1,000\n" +
                 "📉 Места с 6 по 100 — по $100 каждому\n\n" +
                 "💥 Участвуй, покупай токены и увеличивай свои шансы на победу! Чем больше токенов Farm ты приобретешь, тем ближе ты к огромным призам!\n\n" +
                 "To the moon! 🚀\n\n" +
                 "---------------------------------\n" +
                 "🎉 Friends, ready for the contest? 🎉\n\n" +
                 "We are launching an incredible contest with a prize pool of $35,000! And the best part is, winners will be determined by the number of Farm tokens purchased! The more tokens you buy — the higher your chances of winning! 🏆\n\n" +
                 "🏅 Prize pool:\n" +
                 "1️⃣ First place — $10,000\n" +
                 "2️⃣ Second place — $7,000\n" +
                 "3️⃣ Third place — $5,000\n" +
                 "4️⃣ Fourth place — $2,500\n" +
                 "5️⃣ Fifth place — $1,000\n" +
                 "📉 6th to 100th places — $100 each\n\n" +
                 "💥 Participate, buy tokens, and increase your chances of winning! The more Farm tokens you buy, the closer you are to huge prizes!\n\n" +
                 "To the moon! 🚀"
       },
       {
         text: "🌟 Мы на шаг ближе к большим достижениям! 🌟\n\n" +
                 "Рады сообщить, что ведем переговоры с одной из крупнейших криптобирж — ByBit! 🔥 20 декабря ожидается официальное листингование токенов Farm на платформе ByBit! Это отличная новость для всех наших пользователей!\n\n" +
                 "💎 Листинг на ByBit — это огромный шаг в развитие токенов Farm и расширение возможностей для их торговли! Не упустите шанс и следите за новостями!\n\n" +
                 "To the moon! 🚀\n\n" +
                 "---------------------------------\n" +
                 "🌟 We are one step closer to big achievements! 🌟\n\n" +
                 "We are excited to announce that we are in talks with one of the largest crypto exchanges — ByBit! 🔥 On December 20th, the official listing of Farm tokens on ByBit will take place! This is great news for all our users!\n\n" +
                 "💎 Listing on ByBit is a huge step for the development of Farm tokens and expanding trading opportunities! Don't miss the chance and stay tuned for updates!\n\n" +
                 "To the moon! 🚀"
       }
     ];
 
     // Отправка сообщений по очереди
     for (const message of messages) {
       try {
         await axios.post('https://coinfarm.club/api1/notifyUserHarvestReady', {
           userName: username,
           message: message.text
         });
       } catch (error) {
         console.error('Error sending message:', error);
       }
     }
 
     setShowMessage(false); // Скрыть сообщение после отправки
   }
 };
 
  return (
    <>
      <div className={cn("wrap")} style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: "center",
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
      }}>
        <div className={cn("preloader")} />
        
        {showMessage && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#000',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '90%',
            width: '320px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px',
              whiteSpace: 'pre-line'
            }}>
              🎉 <strong>АИРДРОП ОТ FARM!</strong> 
              
              <br/>🚀 Прими участие в эксклюзивном аирдропе!
              
              <br/>🎯 Активность в игре и участие в премаркете увеличивают твой бонус!
              
              <br/>👉 Узнай, как получить свои токены!
            </div>
            
            <button
              onClick={handleLearnMore}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3390EC',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Подробнее
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Preloader;