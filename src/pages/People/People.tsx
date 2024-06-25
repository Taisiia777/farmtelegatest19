import { useEffect, useState } from "react";

import GreenBg from "../../components/GreenBg/GreenBg";
import Coins from "./modules/Coins";
import Button from "../../components/Button/Button";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";
import PopupList from "../../components/PopupList/PopupList";
import PersonBlock from "../../components/PersonBlock/PersonBlock";

import styles from "./People.module.scss";
import classNames from "classnames/bind";
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import { tg } from "../../constants/app";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../routes/routes";
const cn = classNames.bind(styles);

const People = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const [activeTab, setActiveTab] = useState(
      location.state?.label ?? "FARM FRENDS"
   );

   useEffect(() => {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);

   return (
      <div className={cn("wrap")}>
         <div className={cn("people")}>
            <h2 className={`${cn("people__title")}` + " textShadow"}>
               4 frends
            </h2>
            <Coins quantity={"1 180 000"} />
            <div className={cn("people__invite-btn-wrap")}>
               <Button
                  className={cn("people__invite-btn")}
                  size="huge"
                  onClick={() => navigate(Routes.INVITE)}>
                  Invite freiend
               </Button>
            </div>

            {/* Списко пользователей */}
            <PopupListWrap className={cn("people__list")} isOpen={true}>
               <PopupListTabs
                  labels={["FARM FRENDS", "LEADERBOARD"]}
                  activeTab={activeTab}
                  onTabChange={(label) => setActiveTab(label)}
                  labelClassName={cn("people__list-tab-label")}
               />
               {activeTab === "FARM FRENDS" && (
                  <PopupList
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
                     type="second"
                  />
               )}

               {activeTab === "LEADERBOARD" && (
                  <PopupList
                     nodes={[
                        <PersonBlock
                           name="Nickname User"
                           imgSrc="img/pages/people/person.png"
                           earning="1 260 000"
                           coinAmount="983 124"
                           inviteMode
                           rating={1}
                        />,
                        <PersonBlock
                           name="Nickname User"
                           imgSrc="img/pages/people/person.png"
                           earning="1 260 000"
                           coinAmount="983 124"
                           inviteMode
                           rating={2}
                        />,
                        <PersonBlock
                           name="Nickname User"
                           imgSrc="img/pages/people/person.png"
                           earning="1 260 000"
                           coinAmount="983 124"
                           inviteMode
                           rating={3}
                        />,
                        <PersonBlock
                           name="Nickname User"
                           imgSrc="img/pages/people/person.png"
                           earning="1 260 000"
                           coinAmount="983 124"
                           inviteMode
                           rating={4}
                        />,
                        <PersonBlock
                           name="Nickname User"
                           imgSrc="img/pages/people/person.png"
                           earning="1 260 000"
                           coinAmount="983 124"
                           inviteMode
                           rating={5}
                        />,
                     ]}
                     type="second"
                  />
               )}
            </PopupListWrap>

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
      </div>
   );
};

export default People;
