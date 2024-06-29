import { useEffect } from "react";
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
const cn = classNames.bind(styles);

const Invite = () => {
   const navigate = useNavigate();

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
                     <div className={cn("inviteUsersBlock__coins")}>
                        <img src="img/coins/BTC.svg" alt="BTC" />
                        <span className="textShadow_center">+10 000</span>
                     </div>
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
                        10% from every friend earnings
                     </p>
                     <div className={cn("inviteUsersBlock__coins")}>
                        <img src="img/coins/BTC.svg" alt="BTC" />
                        <span className="textShadow_center">+60 000</span>
                     </div>
                  </div>
                  <img src="img/pages/invite/many-gifts.svg" alt="Gifts" />
               </div>
            </div>

            {/* Кол-во друзей и reload */}
            <div className={cn("invite__friends-control")}>
               <div className={cn("invite__friends-amount")}>
                  Your friends <span>3</span>
               </div>
               <img src="img/pages/invite/reload.svg" alt="Reload" />
            </div>

            {/* Списко пользователей */}
            <PopupListWrap className={cn("invite__listWrap")} isOpen={true}>
               <PopupList
                  className={cn("invite__list")}
                  nodes={[
                     <PersonBlock
                        name="Nickname User"
                        imgSrc="img/pages/people/person.png"
                        earning="1 260 000"
                        coinAmount="983 124"
                     />,
                     <PersonBlock
                        name="Nickname User"
                        imgSrc="img/pages/people/person.png"
                        earning="1 260 000"
                        coinAmount="983 124"
                     />,
                     <PersonBlock
                        name="Nickname User"
                        imgSrc="img/pages/people/person.png"
                        earning="1 260 000"
                        coinAmount="983 124"
                     />,
                     <PersonBlock
                        name="Nickname User"
                        imgSrc="img/pages/people/person.png"
                        earning="1 260 000"
                        coinAmount="983 124"
                     />,
                     <PersonBlock
                        name="Nickname User"
                        imgSrc="img/pages/people/person.png"
                        earning="1 260 000"
                        coinAmount="983 124"
                     />,
                  ]}
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

         {/* Кнопка закрытия страницы */}
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
