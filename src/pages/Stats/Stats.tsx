import GreenBg from "../../components/GreenBg/GreenBg";
import BorderBlock from "./modules/BorderBlock";
// import Coins from "./modules/Coins";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
import classNames from "classnames/bind";
import styles from "./Stats.module.scss";
import { useEffect, useState } from "react";
import { tg } from "../../constants/app";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/routes";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
const cn = classNames.bind(styles);

const Stats = () => {
   const navigate = useNavigate();
   // const user = useSelector((state: RootState) => state.user.user);
   const [totalPlayers, setTotalPlayers] = useState(0);
   const [onlineUsersCount, setOnlineUsersCount] = useState(0);
   const [recentlyOnlineUsersCount, setRecentlyOnlineUsersCount] = useState<number>(0);
   console.log(totalPlayers, onlineUsersCount, recentlyOnlineUsersCount)
   // const [totalEarnings, setTotalEarnings] = useState(0);
   // alert(JSON.stringify(user))
   useEffect(() => {
      tg.BackButton.hide();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);
   useEffect(() => {
      const overflow = 0;
      document.body.style.overflowY = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      document.body.style.minHeight = "100vh";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "auto";
  
      window.scrollTo(0, overflow);
       // Play sound on progress bar harvest click
       const sound = new Audio('sounds/popup.mp3');
       sound.play();

       // Stop the sound after 1 second
       setTimeout(() => {
       sound.pause();
       sound.currentTime = 0;  // Reset sound to the beginning
       }, 1000);
    }, []);
   const { t } = useTranslation();
   useEffect(() => {
     const initData = window.Telegram.WebApp.initDataUnsafe;
     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
     
     if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
       i18n.changeLanguage(userLanguage);
     } else {
       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
     }
   }, []);
   // useEffect(() => {
   
   //    const fetchOnlineUsersCount = async (): Promise<void> => {
   //     try {
   //       const response = await axios.get('https://coinfarm.club/api/user/online-count');
   //       setOnlineUsersCount(response.data);
   //     } catch (error) {
   //       console.error('Error fetching online users count:', error);
   //     }
   //   };
   //   fetchOnlineUsersCount();
   //   const intervalId = setInterval(() => {
   //     fetchOnlineUsersCount();
   //   }, 60000); // Обновление каждые 60 секунд
 
   //   return () => clearInterval(intervalId);
   // }, []);
   useEffect(() => {
      const fetchTotalPlayers = async () => {
        try {
          const response = await fetch('https://coinfarm.club/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'User-Agent': 'PostmanRuntime/7.39.0',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
          });

          console.log("Response status:", response.status);
          console.log("Response headers:", response.headers);

          const responseBody = await response.text(); // Чтение тела ответа как текст
          console.log("Response body:", responseBody);

          if (response.ok) {
            const data = JSON.parse(responseBody); // Преобразование текста в JSON
            console.log("Fetched data:", data);
            setTotalPlayers(data.length); // Предполагается, что API возвращает массив пользователей
            const onlineCount = data.filter((user: { isOnline: boolean }) => user.isOnline).length;
            setOnlineUsersCount(onlineCount);
            // Подсчет пользователей, которые были онлайн последние 24 часа
          const now = new Date();
          const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          const recentlyOnlineCount = data.filter((user: { lastOnline: string }) => {
            const lastOnlineDate = new Date(user.lastOnline);
            return lastOnlineDate > twentyFourHoursAgo;
          }).length;
          setRecentlyOnlineUsersCount(recentlyOnlineCount);
          } else {
            console.error('Failed to fetch total players:', responseBody);
            alert('Failed to fetch total players: ' + responseBody);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchTotalPlayers();
    }, []);


   // useEffect(() => {
   //    const fetchTotalPlayers = async () => {
   //      try {
   //        const response = await fetch('https://coinfarm.club/api/user', {
   //          method: 'GET',
   //          headers: {
   //              'Content-Type': 'application/json',
   //              'Accept': 'application/json'
   //          }
   //      }); // Используйте HTTPS
   //        alert(JSON.stringify(response))
   //        if (response.ok) {
   //          const data = await response.json();
   //          setTotalPlayers(data.length); // Предполагается, что API возвращает массив пользователей
   //        } else {
   //          console.error('Failed to fetch total players');
   //        }
   //      } catch (error) {
   //        console.error('Error:', error);
   //      }
   //    };
  
   //    fetchTotalPlayers();
   //  }, []);

  
   return (
      <>
         <div className={cn("stats")}>
            {/* <small className={cn("stats__top-label")}>
               {t('total_money')}
            </small>
            <Coins quantity={Math.round(user?.totalEarnings || 0)} /> */}
            <div className={cn("stats__invite-btn")} onClick={() => navigate(Routes.PEOPLE)}>
          <span className={cn("stats__invite-btn-text")}> {t('stats')}</span>
          <img src="img/pages/invite/btn.svg" alt="Invite friends" />
        </div>
            <div className={cn("stats__body")}>
               <BorderBlock
                  label={t('online')}
                  imgSrc="img/pages/stats/star.svg"
                  // number={onlineUsersCount.toString()} 
                  number={288+onlineUsersCount+''} 
                  onClick={() => console.log('kkk')}
               />
               <BorderBlock
                  label={t('daily_users')}
                  imgSrc="img/pages/stats/rubin.svg"
                  // number={recentlyOnlineUsersCount.toLocaleString()} 
                  number={12703+recentlyOnlineUsersCount+''} 
                  onClick={() => console.log('kkk')}
               />
               <BorderBlock
                  label={t('total_players')}
                  imgSrc="img/pages/stats/medal.svg"
                  // number={totalPlayers.toLocaleString()} 
                  number={198956 + totalPlayers + ''} 
                  onClick={() => navigate(Routes.PEOPLE)}
               />
            </div>

            {/* Задний зеленный фон */}
            <GreenBg />

            {/* Элементы заднего фона */}
            <div className={cn("stats__bg-elements")}>
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_1")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_2")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_3")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_4")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_5")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_6")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_7")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_8")}
                  alt="stats bg"
               />
               <img
                  src="img/pages/stats/stats.svg"
                  className={cn("stats-img-bg", "_9")}
                  alt="stats bg"
               />
            </div>
         </div>

         {/* Кнопка закрытия страницы */}
         <img
            src="img/global/closeIcon.svg"
            onClick={() => navigate(Routes.HOME)}
            className={cn("close")}
            alt="Close"
         />
      </>
   );
};

export default Stats;
