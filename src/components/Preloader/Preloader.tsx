



// import  { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../store";
// import { loadingToggle } from "../../store/reducers/preloader";
// import styles from "./Preloader.module.scss";
// import classNames from "classnames/bind";
// import logo from "../../../public/img/pages/home/pig.png"; // Путь к вашему логотипу

// const cn = classNames.bind(styles);

// const Preloader = () => {
//    const dispatch = useAppDispatch();
//    const isLodaing = useAppSelector((state) => state.preloader.isLodaing);

//    useEffect(() => {
//       setTimeout(() => {
//          dispatch(loadingToggle(false));
//       }, 5000);
//    });

//    return (
//       <>
//          {isLodaing && (
//             <div className={cn("wrap")}>
//                <div className={cn("preloader")}>
//                   <img src={logo} alt="Logo" className={cn("logo")} />
//                </div>
//             </div>
//          )}
//          <Outlet />
//       </>
//    );
// };

// export default Preloader;

// import { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../store";
// import { loadingToggle } from "../../store/reducers/preloader";
// import { useQuery} from '@tanstack/react-query';
// import styles from "./Preloader.module.scss";
// import classNames from "classnames/bind";
// import logo from "../../../public/img/pages/home/pig.png"; // Путь к вашему логотипу

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
//  }
//  interface Earning {
//    username: string;
//    coinsEarned: number;
//  }
//  // interface ReferralEarnings {
//  //   id: number;
//  //   coinsEarned: number;
//  // }
//  interface Friend extends User {
//    coinsEarned?: number;
//    secondTierEarnings?: number; // Заработки с рефералов второго уровня
//    thirdTierEarnings?: number; // Заработки с рефералов третьего уровня
//  }
// // Функция для выполнения запроса на получение рефералов
// const fetchReferralsAndEarnings = async (userId: number) => {
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
    
//     // Fetch 2-tier and 3-tier referrals for the current friend
//     const secondTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${friend.id}/referrals`);
//     const secondTierReferrals = await secondTierReferralsResponse.json();

//     let secondTierEarnings = 0;
//     let thirdTierEarnings = 0;

//     for (const secondTierReferral of secondTierReferrals) {
//       const secondTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals/earnings`);
//       const secondTierEarningsData = await secondTierEarningResponse.json();
//       secondTierEarnings += secondTierEarningsData.reduce((sum: number, e: Earning) => sum + e.coinsEarned, 0);

//       // Fetch 3-tier referrals for each 2-tier referral
//       const thirdTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals`);
//       const thirdTierReferrals = await thirdTierReferralsResponse.json();

//       for (const thirdTierReferral of thirdTierReferrals) {
//         const thirdTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${thirdTierReferral.id}/referrals/earnings`);
//         const thirdTierEarningsData = await thirdTierEarningResponse.json();
//         thirdTierEarnings += thirdTierEarningsData.reduce((sum: number, e: Earning) => sum + e.coinsEarned, 0);
//       }
//     }

//     return { ...friend, coinsEarned: earning ? earning.coinsEarned : 0, secondTierEarnings, thirdTierEarnings };
//   }));

//   return friendsWithEarnings;
// };

// const Preloader = () => {
//    const dispatch = useAppDispatch();
//    const isLodaing = useAppSelector((state) => state.preloader.isLodaing);
//    const user = useAppSelector((state) => state.user.user);

//    const { data: friends, isLoading } = useQuery({
//       queryKey: ['referrals', user.id],
//       queryFn: () =>
//         fetchReferralsAndEarnings(user.id)
//           .then((data) => {
//             dispatch(loadingToggle(false)); // Отключаем прелоудер после загрузки данных
//             return data;
//           })
//           .catch((error) => {
//             console.error('Error fetching referrals and earnings:', error);
//             dispatch(loadingToggle(false)); // Отключаем прелоудер, даже если произошла ошибка
//             throw error; // Re-throw the error so it gets handled by React Query's error handling
//           })
//     });

//    useEffect(() => {
//       if (isLoading) {
//          dispatch(loadingToggle(true));
//       }
//    }, [isLoading, dispatch]);

//    return (
//       <>
//          {isLodaing && (
//             <div className={cn("wrap")}>
//                <div className={cn("preloader")}>
//                   <img src={logo} alt="Logo" className={cn("logo")} />
//                </div>
//             </div>
//          )}
//          <Outlet context={{ friends }} /> {/* Передаем загруженные данные через Outlet */}
//       </>
//    );
// };

// export default Preloader;



import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadingToggle } from "../../store/reducers/preloader";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import styles from "./Preloader.module.scss";
import classNames from "classnames/bind";
import logo from "../../../public/img/pages/home/pig.png"; // Путь к вашему логотипу
import { setUser } from "../../store/reducers/userSlice";
import { retrieveLaunchParams } from '@tma.js/sdk';
import { RootState } from "../../store";

const cn = classNames.bind(styles);

interface User {
   id: number;
   username: string;
   coins: number;
   totalEarnings: number;
   incomeMultiplier: number;
   coinsPerHour: number;
   xp: number;
   level: number;
}
interface Earning {
   username: string;
   coinsEarned: number;
}
interface Friend extends User {
   coinsEarned?: number;
   secondTierEarnings?: number; // Заработки с рефералов второго уровня
   thirdTierEarnings?: number; // Заработки с рефералов третьего уровня
}

// Функция для выполнения запроса на получение рефералов и заработка
const fetchReferralsAndEarnings = async (userId: number) => {
  const referralsResponse = await fetch(`https://coinfarm.club/api/user/${userId}/referrals`);
  if (!referralsResponse.ok) {
    throw new Error('Failed to fetch referrals');
  }
  const referralsData = await referralsResponse.json();

  const earningsResponse = await fetch(`https://coinfarm.club/api/user/${userId}/referrals/earnings`);
  if (!earningsResponse.ok) {
    throw new Error('Failed to fetch earnings');
  }
  const earningsData = await earningsResponse.json();

  const friendsWithEarnings = await Promise.all(referralsData.map(async (friend: Friend) => {
    const earning = earningsData.find((e: Earning) => e.username === friend.username);
    
    // Fetch 2-tier and 3-tier referrals for the current friend
    const secondTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${friend.id}/referrals`);
    const secondTierReferrals = await secondTierReferralsResponse.json();

    let secondTierEarnings = 0;
    let thirdTierEarnings = 0;

    for (const secondTierReferral of secondTierReferrals) {
      const secondTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals/earnings`);
      const secondTierEarningsData = await secondTierEarningResponse.json();
      secondTierEarnings += secondTierEarningsData.reduce((sum: number, e: Earning) => sum + e.coinsEarned, 0);

      // Fetch 3-tier referrals for each 2-tier referral
      const thirdTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals`);
      const thirdTierReferrals = await thirdTierReferralsResponse.json();

      for (const thirdTierReferral of thirdTierReferrals) {
        const thirdTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${thirdTierReferral.id}/referrals/earnings`);
        const thirdTierEarningsData = await thirdTierEarningResponse.json();
        thirdTierEarnings += thirdTierEarningsData.reduce((sum: number, e: Earning) => sum + e.coinsEarned, 0);
      }
    }

    return { ...friend, coinsEarned: earning ? earning.coinsEarned : 0, secondTierEarnings, thirdTierEarnings };
  }));

  return friendsWithEarnings;
};

// Функция для загрузки данных пользователя
const fetchData = async (dispatch: any) => {
  const { initData } = retrieveLaunchParams(); // Предполагается, что у вас есть эта функция
  if (initData && initData.user) {
    const user = initData.user;
    const username = user.username;
    const userId = user.id;

    const response = await axios.get(`https://coinfarm.club/api1/getReferralCode?user_id=${userId}`);
    const data = response.data;
    let referralCode = data.referral_code;

    if (username) {
      try {
        const response = await axios.post(
          "https://coinfarm.club/api/user",
          {
            username: username,
            coins: 0,
            totalEarnings: 0,
            incomeMultiplier: 1,
            coinsPerHour: 1000,
            xp: 1000,
            level: 0,
            referralCode: referralCode,
          }
        );

        if (response.status === 409) {
          const userData = response.data;
          alert(`User already exists: ${JSON.stringify(userData)}`);
          dispatch(setUser(userData));
        } else {
          const newUser = response.data;
          dispatch(setUser(newUser));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
};

const Preloader = () => {
   const dispatch = useAppDispatch();
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);
   const user = useAppSelector((state: RootState) => state.user.user);

   // Вызов fetchData перед загрузкой данных
   useEffect(() => {
      const initialize = async () => {
         try {
            await fetchData(dispatch);
         } catch (error) {
            console.error('Error initializing user data:', error);
            dispatch(loadingToggle(false));
         }
      };

      initialize();
   }, [dispatch]);

   const { data: friends, isLoading: isFetchingFriends } = useQuery({
      queryKey: ['referrals', user?.id],
      queryFn: () => fetchReferralsAndEarnings(user?.id),
      enabled: !!user // Запрос данных происходит только если пользователь загружен
    });

   useEffect(() => {
      if (isLoading || isFetchingFriends) {
         dispatch(loadingToggle(true));
      } else {
         dispatch(loadingToggle(false));
      }
   }, [isLoading, isFetchingFriends, dispatch]);

   return (
      <>
         {isLoading && (
            <div className={cn("wrap")}>
               <div className={cn("preloader")}>
                  <img src={logo} alt="Logo" className={cn("logo")} />
               </div>
            </div>
         )}
         <Outlet context={{ friends }} /> {/* Передаем загруженные данные через Outlet */}
      </>
   );
};

export default Preloader;
