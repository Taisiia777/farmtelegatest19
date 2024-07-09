import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import { tg } from "../../constants/app";

import GreenBg from "../../components/GreenBg/GreenBg";
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupList from "../../components/PopupList/PopupList";
import PersonBlock from "../../components/PersonBlock/PersonBlock";
import Button from "../../components/Button/Button";

import classNames from "classnames/bind";
import styles from "./Invite.module.scss";
import { Routes } from "../../routes/routes";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import axios from "axios";
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
 interface ReferralEarnings {
   id: number;
   coinsEarned: number;
 }
 
 
const Invite = () => {
   const navigate = useNavigate();
   const user = useAppSelector((state: RootState) => state.user.user);
   const [friends, setFriends] = useState<User[]>([]);
   const [referralCount, setReferralCount] = useState(0);
   const [referralEarnings, setReferralEarnings] = useState<ReferralEarnings[]>([]);
   const getCoinsEarned = (userId: number) => {
      const earnings = referralEarnings.find(earning => earning.id === userId);
      return earnings ? earnings.coinsEarned : 0;
    };
   useEffect(() => {
      const fetchReferrals = async () => {
         try {
           const response = await fetch(`https://coinfarm.club/user/${user.id}/referrals`);
           if (!response.ok) {
             throw new Error('Failed to fetch referrals');
           }
           const data: User[] = await response.json();
           const sortedUsers = data.sort((a, b) => b.coinsPerHour - a.coinsPerHour); // Сортировка по убыванию прибыли в час
           setFriends(sortedUsers);
           setReferralCount(data.length);
       
           const earningsResponse = await axios.get(`https://coinfarm.club/user/${user.id}/referrals/earnings`);
           setReferralEarnings(earningsResponse.data);
         } catch (error) {
           console.error('Error fetching referrals:', error);
         }
       };
       
    
      fetchReferrals();
    }, [user.id]);
   useEffect(() => {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);

   return (
      <div className={cn("wrap")}>
         <div className={cn("invite")}>
            <h2 className={`${cn("invite__title")}` + " textShadow"}>
               Invite friends
            </h2>
            <p className={`${cn("invite__subtitle")}` + " textShadow"}>
               You and your friend will receive bonuses
            </p>

            {/* Invite users blocks */}
            <div className={cn("invite__users")}>
               <div className={cn("inviteUsersBlock")}>
                  <div className={cn("inviteUsersBlock__left")}>
                     <b
                        className={`${cn(
                           "inviteUsersBlock__title"
                        )} + ' textShadow_center`}>
                        Invite user
                     </b>
                     <p
                        className={
                           `${cn("inviteUsersBlock__subtitle")}` +
                           " textShadow_center"
                        }>
                        Get a percentage of the invited user's earnings: 20%
                     </p>
                     {/* <div className={cn("inviteUsersBlock__coins")}>
                        <img src="img/coins/BTC.svg" alt="BTC" />
                        <span className="textShadow_center">+10 000</span>
                     </div> */}
                  </div>
                  <img
                     src="img/pages/invite/one-gift.svg"
                     className={cn("inviteUsersBlock__one-gift-img")}
                     alt="Gift"
                  />
               </div>

               <div className={cn("inviteUsersBlock")}>
                  <div className={cn("inviteUsersBlock__left")}>
                     <b
                        className={`${cn(
                           "inviteUsersBlock__title"
                        )} + ' textShadow_center`}>
                        Invite users
                     </b>
                     <p
                        className={
                           `${cn("inviteUsersBlock__subtitle")}` +
                           " textShadow_center"
                        }>
                        The second level:
                        Percentage of earnings of referrals of the first level: 10%
                     </p>
                     <p
                        className={
                           `${cn("inviteUsersBlock__subtitle")}` +
                           " textShadow_center"
                        }>
                        The third level:
                        Percentage of earnings of second-level referrals: 5%
                     </p>  
                     {/* <div className={cn("inviteUsersBlock__coins")}>
                        <img src="img/coins/BTC.svg" alt="BTC" />
                        <span className="textShadow_center">+60 000</span>
                     </div> */}
                  </div>
                  <img src="img/pages/invite/many-gifts.svg" alt="Gifts" />
               </div>
            </div>

            {/* Кол-во друзей и reload */}
            <div className={cn("invite__friends-control")}>
               <div className={cn("invite__friends-amount")}>
                  Your friends <span>{referralCount}</span>
               </div>
               <img src="img/pages/invite/reload.svg" alt="Reload" />
            </div>

            {/* Списко пользователей */}
            <PopupListWrap className={cn("invite__listWrap")} isOpen={true}>
            <PopupList
  className={cn("invite__list")}
  nodes={friends.map((user) => (
    <PersonBlock
      key={user.id}
      name={user.username}
      imgSrc={"img/pages/people/person.png"}
      earning={getCoinsEarned(user.id).toString()}
      coinAmount={user.coins.toString()}
    />
  ))}
  type="third"
/>

            </PopupListWrap>

            {/* Кнопки invite && CopyLink */}
            <div className={cn("invite__btns")}>
               <Button size="huge">Invite friends</Button>

               {/* TODO: Реализовать функционал копирования */}
               <Button className={cn("invite__copy")} size="huge">
                  Copy link
                  <img src="img/pages/invite/copy-link.svg" alt="Copy" />
               </Button>
            </div>

            {/* Звезды на заднем фоне */}
            <div className={cn("bg-elements")}>
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
               <img src="img/pages/people/star.svg" alt="star" />
            </div>
            <GreenBg />
         </div>

         {/* Кнопка закрытия страниц */}
         <img
            src="img/global/closeIcon.svg"
            onClick={() => navigate(Routes.HOME)}
            className={cn("close")}
            alt="Close"
         />
      </div>
   );
};

export default Invite;
