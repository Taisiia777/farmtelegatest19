
import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { tg } from "../../constants/app";

import GreenBg from "../../components/GreenBg/GreenBg";
// import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupList from "../../components/PopupList/PopupList";
import PersonBlockRef from "../../components/PersonBlock/PersonBlockRef";
import Button from "../../components/Button/Button";

import classNames from "classnames/bind";
import styles from "./Invite.module.scss";
import { Routes } from "../../routes/routes";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
// import axios from "axios";
import { useOutletContext } from 'react-router-dom';
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";

import { TelegramShareButton } from 'react-share';
import LigaBlock from "../../components/LigaBlock/LigaBlock";

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
interface OutletContext {
  friends: Friend[];
}


interface Friend extends User {
  coinsEarned?: number;
}

const Invite = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.user);
  // const [friends, setFriends] = useState<Friend[]>([]);
  const { friends } = useOutletContext<OutletContext>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.label ?? "FRENDS");

  const [notificationVisible, setNotificationVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    // Добавляем класс при монтировании компонента
    document.body.classList.add('invite-page');
    document.documentElement.classList.add('invite-page');

  }, []);
  
  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
    }
    if (userLanguage !== 'en') {

    document.querySelectorAll('.textMenu').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '14px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textMenu2').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '18px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textMenu1').forEach(element => {
       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
         element.style.fontSize = '12px';
         element.style.fontWeight = '700';
       }
     });
     document.querySelectorAll('.textInvite').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '20px';
        element.style.fontWeight = '700';
      }
    });
    document.querySelectorAll('.textInvite1').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '15px';
        element.style.fontWeight = '400';
      }
    });
    document.querySelectorAll('.textInvite2').forEach(element => {
      if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
        element.style.fontSize = '12px';
        element.style.fontWeight = '700';
      }
    });
  }
  // Сохраняем начальную позицию прокрутки
  const initialScrollPosition = window.scrollY;

  // Возвращаем позицию прокрутки в начальную точку при размонтировании компонента
  return () => {
    window.scrollTo(0, initialScrollPosition);
  };
  }, []);
  const leagues = [
    { name: "Wooden", referralsRequired: 3, referralsTo: 0, harvest: 1 },
    { name: "Silver", referralsRequired: 10, referralsTo: 3, harvest: 1.5 },
    { name: "Gold", referralsRequired: 50, referralsTo: 10, harvest: 2 },
    { name: "Fire", referralsRequired: 200, referralsTo: 50, harvest: 3 },
    { name: "Diamond", referralsRequired: 1000, referralsTo: 200, harvest: 4 },
    { name: "Ruby", referralsRequired: 1001, referralsTo: 1000, harvest: 5 },
  ];
  type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond" ; // Определение типа TLiga

  const renderLeagues = () => {
    return leagues.map((league, index) => {
      let percent;
      if (index <= user.level) {
        percent = 100; // Прошедшие лиги имеют 100%
      } else if (index === user.level+1 && friends) {
        percent = (friends.length / league.referralsTo) * 100; // Текущая лига рассчитывается
      } else {
        percent = 0; // Будущие лиги имеют 0%
      }
  
      const isActive = index <= user.level;
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
    tg.BackButton.show();
    tg.BackButton.onClick(() => navigate(-1));
    return () => tg.BackButton.hide();
  }, [navigate]);
  const handleCopyLink = () => {
    const referralLink = `https://t.me/Coin_Farming_bot?start=${user.referralCode}`;
    const el = document.createElement('textarea');
    el.value = referralLink;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Referral link copied to clipboard:', referralLink);
    // Optionally, show a message to the user that the link was copied

    // Показать уведомление
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000); // Уведомление исчезает через 3 секунды
  };
  // const totalEarningsFirstTier = friends.reduce((sum, friend) => sum + (friend.coinsEarned || 0), 0);

  // const totalEarnings = totalEarningsFirstTier
  return (
    <div className={cn("wrap")}>
      <div className={cn("invite")}>
        <h2 className={`${cn("invite__title")}` + " textShadow textInvite"}>
        {t('invite_friends')}
        </h2>
        <p className={`${cn("invite__subtitle")}` + " textShadow textInvite1"}>
        {t('invite_descr')}

        </p>
        
        <PopupListWrap className={cn("invite__list")} isOpen={true}>
          <PopupListTabs
            labels={["FRENDS", "LEAGUES"]}
            activeTab={activeTab}
            onTabChange={(label) => setActiveTab(label)}
            labelClassName={cn("people__list-tab-label")}
          />
          {activeTab === "FRENDS" && (
            <PopupList
              nodes={[
              <>
                        <div className={cn("invite__users")}>
          {/* <div className={cn("inviteUsersBlock")}>
            <div className={cn("inviteUsersBlock__left")}>
              <b className={`${cn("inviteUsersBlock__title")}` + ' textShadow_center'}>
                Invite user
              </b>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center"}>
                Get a percentage of the invited user's earnings: 20%
              </p>
            </div>
            <img
              src="img/pages/invite/one-gift.svg"
              className={cn("inviteUsersBlock__one-gift-img")}
              alt="Gift"
            />
          </div> */}

          <div className={cn("inviteUsersBlock")}>
            <div className={cn("inviteUsersBlock__left")}>
              <b className={`${cn("inviteUsersBlock__title")}` + ' textShadow_center textMenu1'}>
              {t('invite_1')}
              </b>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center textInvite1"}>
              {t('invite_2')}
              </p>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center textInvite1"}>
              {t('invite_3')}
              </p>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center textInvite1"}>
              {t('invite_4')}
              </p>
            </div>
            <img src="img/pages/invite/many-gifts.svg" alt="Gifts" />
          </div>
        </div>
        <div className={cn("invite__btns")}>
        <TelegramShareButton
  url={`https://t.me/Coin_Farming_bot?start=${user.referralCode}`}
  title="Join me on Coin Farm!"
>
  <Button className={`${cn("invite__copy")}`+ ' textInvite2'} size="big" >
    {t('invite_friends')}
  </Button>
</TelegramShareButton>

          {/* TODO: Реализовать функционал копирования */}
          <Button className={`${cn("invite__copy")}`+ ' textInvite2'} size="big" onClick={handleCopyLink}>
          {t('copy_link')}
            <img src="img/pages/invite/copy-link.svg" alt="Copy" />
          </Button>
          {notificationVisible && (
        <div className={cn("invite__notification")}>
          {t('link_copied')}
        </div>
      )}
        </div>
        {/* <div className={cn("invite__btns")} style={{marginTop:'20px'}}>
          <b className={`${cn("inviteUsersBlock__title")}` + ' textShadow_center'}>
          {t('total')} {Math.round(totalEarnings)}
          </b>
        </div> */}
        {/* Кол-во друзей и reload */}
        <div className={cn("invite__friends-control")}>
          <div className={cn("invite__friends-amount")}>
          {t('your_friends')} <span>{friends.length}</span>
          </div>
          <img src="img/pages/invite/reload.svg" alt="Reload" />
        </div>




        <PopupList
  className={cn("invite__list")}
  nodes={friends.slice(-100).reverse().map((user) => (  // Используем slice(-100) и reverse() для отображения последних 100 элементов реверсивно
    <PersonBlockRef
      key={user.id}
      name={user.username}
      imgSrc={"img/pages/people/person.png"}
      earning={`${Math.round(user.coinsEarned ?? 0)}`}
      coinAmount={''}
    />
  ))}
  type="first"
/>


 
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
                
        </>  ]}
              type="second"
            />
          )}

          {activeTab === "LEAGUES" && (
            <PopupList
            className={cn("invite__list1")}
            nodes={renderLeagues()}
            type="first"
            />
          )}
        </PopupListWrap>
        {/* Invite users blocks */}

      </div>
        <GreenBg />

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

