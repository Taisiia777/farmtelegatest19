


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./People.module.scss";
import classNames from "classnames/bind";
import { tg } from "../../constants/app";
import { Routes } from "../../routes/routes";
import GreenBg from "../../components/GreenBg/GreenBg";
import Coins from "./modules/Coins";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";
import PopupList from "../../components/PopupList/PopupList";
import PersonBlock from "../../components/PersonBlock/PersonBlock";
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

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
  referralsCount?: number; // Добавляем поле для количества рефералов
}

interface OutletContext {
  friends: Friend[];
}

interface Friend extends User {
  coinsEarned?: number;
}

const People = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.state?.label ?? "FARM FRENDS");
  const [usersByReferrals, setUsersByReferrals] = useState<User[]>([]);
  const [usersByEarnings, setUsersByEarnings] = useState<User[]>([]);
  const user = useAppSelector((state: RootState) => state.user.user);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const { friends } = useOutletContext<OutletContext>();

  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en';
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) {
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en');
    }

    const initialScrollPosition = window.scrollY;
    return () => {
      window.scrollTo(0, initialScrollPosition);
    };
  }, []);

  useEffect(() => {
    tg.BackButton.hide();
    tg.BackButton.onClick(() => navigate(-1));
    return () => tg.BackButton.hide();
  }, [navigate]);

  useEffect(() => {
    const fetchUsersAndReferrals = async () => {
      try {
        const [usersResponse, referralsResponse] = await Promise.all([
          fetch('https://coinfarm.club/api/user/'),
          fetch('https://coinfarm.club/api/referral')
        ]);

        const usersData: User[] = await usersResponse.json();
        const referralsData = await referralsResponse.json();

        // Считаем количество рефералов для каждого пользователя
        const referralCounts = referralsData.reduce((acc: Record<number, number>, referral: any) => {
          const refererId = referral.refererId;
          acc[refererId] = (acc[refererId] || 0) + 1;
          return acc;
        }, {});

        // Добавляем количество рефералов к каждому пользователю
        const usersWithReferrals = usersData.map(user => ({
          ...user,
          referralsCount: referralCounts[user.id] || 0,
        }));

        // Сортируем пользователей по убыванию количества рефералов и по общим заработкам
        const sortedByReferrals = [...usersWithReferrals]
        .filter(user => (user.referralsCount || 0) > 0)  // Оставляем только тех, у кого больше 0 рефералов
        .sort((a, b) => (b.referralsCount || 0) - (a.referralsCount || 0));
      
        const sortedByEarnings = [...usersWithReferrals].sort((a, b) => b.totalEarnings - a.totalEarnings);

        setUsersByReferrals(sortedByReferrals);
        setUsersByEarnings(sortedByEarnings);
      } catch (error) {
        console.error('Failed to fetch users or referrals', error);
      }
    };

    fetchUsersAndReferrals();
  }, []);

  const getFriendsLabel = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "друг";
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      return "друга";
    } else {
      return "друзей";
    }
  };
  const friendsLabel = currentLanguage === 'ru' ? getFriendsLabel(friends.length) : t('friends');

  return (
    <div className={cn("wrap")}>
      <div className={cn("people")}>
        <h2 className={`${cn("people__title")}` + " textShadow"}>
          {friends.length} {friendsLabel}
        </h2>
        <Coins quantity={Math.round(user.totalEarnings).toString()} />
        <div className={cn("people__invite-btn")} onClick={() => navigate(Routes.INVITE)}>
          <span className={cn("people__invite-btn-text")}> {t('invite_frirnd')}</span>
          <img src="img/pages/invite/btn.svg" alt="Invite friends" />
        </div>

        <PopupListWrap className={cn("people__list")} isOpen={true}>
          <PopupListTabs
            labels={["FARM FRENDS", "LEADERBOARD"]}
            activeTab={activeTab}
            onTabChange={(label) => setActiveTab(label)}
            labelClassName={cn("people__list-tab-label")}
          />
          {activeTab === "FARM FRENDS" && (
            <PopupList
              nodes={usersByReferrals.slice(0, 100).map((user, index) => (
                <PersonBlock
                  key={user.id}
                  name={user.username}
                  imgSrc={"img/pages/people/person.png"}
                  earning={(user.referralsCount || 0).toString()} // Отображаем количество рефералов
                  coinAmount={(user.referralsCount || 0).toString()}
                  inviteMode
                  rating={index + 1}
                />
              ))}
              type="second"
            />
          )}

          {activeTab === "LEADERBOARD" && (
            <PopupList
              nodes={usersByEarnings.slice(0, 100).map((user, index) => (
                <PersonBlock
                  key={user.id}
                  name={user.username}
                  imgSrc={"img/pages/people/person.png"}
                  earning={user.coinsPerHour.toString()} // Отображаем прибыль в час
                  coinAmount={Math.round(user.totalEarnings).toString()}
                  inviteMode
                  rating={index + 1}
                />
              ))}
              type="second"
            />
          )}
        </PopupListWrap>

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

      <img
        src="img/global/closeIcon.svg"
        onClick={() => navigate(Routes.HOME)}
        className={cn("close")}
        alt="Close"
      />
    </div>
  );
};

export default People;

