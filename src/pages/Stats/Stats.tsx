import GreenBg from "../../components/GreenBg/GreenBg";
import BorderBlock from "./modules/BorderBlock";
import Coins from "./modules/Coins";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import classNames from "classnames/bind";
import styles from "./Stats.module.scss";
import { useEffect, useState } from "react";
import { tg } from "../../constants/app";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/routes";
const cn = classNames.bind(styles);

const Stats = () => {
   const navigate = useNavigate();
   const user = useSelector((state: RootState) => state.user.user);
   const [totalPlayers, setTotalPlayers] = useState(0);
   // const [totalEarnings, setTotalEarnings] = useState(0);
   // alert(JSON.stringify(user))
   useEffect(() => {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);

   useEffect(() => {
      const fetchTotalPlayers = async () => {
        try {
          const response = await fetch('https://86c5-188-116-20-43.ngrok-free.app/user', {
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
            console.log("Fetched data:", data); // Логируем данные для проверки
            alert(JSON.stringify(data)); // Показываем данные в алерте для проверки
            setTotalPlayers(data.length); // Предполагается, что API возвращает массив пользователей
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
   //        const response = await fetch('https://86c5-188-116-20-43.ngrok-free.app/user', {
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
            <small className={cn("stats__top-label")}>
               Total money in game
            </small>
            <Coins quantity={user?.totalEarnings ?? 0}/>

            <div className={cn("stats__body")}>
               <BorderBlock
                  label="Online"
                  imgSrc="img/pages/stats/star.svg"
                  number={totalPlayers.toLocaleString()} 
               />
               <BorderBlock
                  label="Daily users"
                  imgSrc="img/pages/stats/rubin.svg"
                  number={totalPlayers.toLocaleString()} 
               />
               <BorderBlock
                  label="Total players"
                  imgSrc="img/pages/stats/medal.svg"
                  number={totalPlayers.toLocaleString()} 
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
