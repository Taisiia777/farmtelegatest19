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
import { useNavigate } from "react-router-dom";
const cn = classNames.bind(styles);

const People = () => {
   const navigate = useNavigate();

   const [activeTab, setActiveTab] = useState("FARM FRENS");

   useEffect(() => {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
      return () => tg.BackButton.hide();
   }, [navigate]);

   return (
      <div className={cn("wrap")}>
         <div className={cn("people")}>
            <h1 className={cn("people__title")}>4 frends</h1>
            <Coins quantity={"1 180 000"} />
            <div className={cn("people__invite-btn-wrap")}>
               <Button className={cn("people__invite-btn")} size="huge">
                  Invite freiend
               </Button>
            </div>

            <PopupListWrap className={cn("people__list")} isOpen={true}>
               <PopupListTabs
                  labels={["FARM FRENS", "LEADERBOARD"]}
                  activeTab={activeTab}
                  onTabChange={(label) => setActiveTab(label)}
               />
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
                  peopleMode
               />
            </PopupListWrap>

            <GreenBg />
         </div>
      </div>
   );
};

export default People;
