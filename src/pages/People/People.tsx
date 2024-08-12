
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
  const [users, setUsers] = useState<User[]>([]);
  const user = useAppSelector((state: RootState) => state.user.user);
  
  const { friends } = useOutletContext<OutletContext>();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
    if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
    }
      // Сохраняем начальную позицию прокрутки
  const initialScrollPosition = window.scrollY;

  // Возвращаем позицию прокрутки в начальную точку при размонтировании компонента
  return () => {
    window.scrollTo(0, initialScrollPosition);
  };
  }, []);

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => navigate(-1));
    return () => tg.BackButton.hide();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://coinfarm.club/api/user/'); // Замените на реальный URL API
        const data: User[] = await response.json();
        const sortedUsers = data.sort((a, b) => b.totalEarnings - a.totalEarnings); // Сортировка по убыванию прибыли в час
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  
  // Функция для определения правильной формы слова "друг"
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
      {/* <h2 className={`${cn("people__title")}` + " textShadow"}>{friends.length} {t('friends')}</h2> */}
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
            nodes={friends.slice(-100).reverse().map((user) => ( 
                <PersonBlock
                  key={user.id}
                  name={user.username}
                  imgSrc={"img/pages/people/person.png"}
                  earning={Math.round((user?.coinsEarned ?? 0)).toString()}
                  coinAmount={Math.round(user.totalEarnings).toString()}
                  inviteMode
                />
              ))}
              type="second"
            />
          )}

          {activeTab === "LEADERBOARD" && (
            <PopupList
            nodes={users.slice(0, 100).map((user, index) => (
              <PersonBlock
                  key={user.id}
                  name={user.username}
                  imgSrc={"img/pages/people/person.png"}
                  earning={user.coinsPerHour.toString()}
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
          {/* Звезды на заднем фоне */}
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




