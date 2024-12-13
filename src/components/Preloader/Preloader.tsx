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
import { RootState, useAppDispatch, useAppSelector } from "../../store";
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

const cn = classNames.bind(styles);

const Preloader = () => {
  const dispatch = useAppDispatch();
  const backgrounds = [background1, background2, background3];
  const [backgroundImage, setBackgroundImage] = useState("");
  const user = useAppSelector((state: RootState) => state.user.user);

  // Use this state to control the visibility of the message overlay
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(randomBackground);
    dispatch(loadingToggle(true)); // Always show preloader
  }, [dispatch]);

  const handleLearnMore = async () => {
    if (user?.username) {
      try {
        const message = "🎉 **АИРДРОП ОТ FARM!**\n\n" +
                       "🚀 Прими участие в эксклюзивном аирдропе!\n" +
                       "🎯 Активность в игре и участие в премаркете увеличивают твой бонус!\n" +
                       "👉 Узнай, как получить свои токены!";

        await axios.post('https://coinfarm.club/api1/notifyUserHarvestReady', {
          userName: user.username,
          message: message
        });

        setShowMessage(false); // Hide the message after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
            backgroundColor: 'white',
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
              
              🚀 Прими участие в эксклюзивном аирдропе!
              
              🎯 Активность в игре и участие в премаркете увеличивают твой бонус!
              
              👉 Узнай, как получить свои токены!
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