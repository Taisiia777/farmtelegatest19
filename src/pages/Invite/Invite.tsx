
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { tg } from "../../constants/app";

import GreenBg from "../../components/GreenBg/GreenBg";
// import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupList from "../../components/PopupList/PopupList";
import PersonBlock from "../../components/PersonBlock/PersonBlock";
import Button from "../../components/Button/Button";

import classNames from "classnames/bind";
import styles from "./Invite.module.scss";
import { Routes } from "../../routes/routes";
import { RootState } from "../../store";
import { useAppSelector } from "../../store";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
// import axios from "axios";
import { TelegramShareButton } from 'react-share';

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

// interface ReferralEarnings {
//   id: number;
//   coinsEarned: number;
// }
interface Friend extends User {
  coinsEarned?: number;
  // secondTierEarnings?: number; // Заработки с рефералов второго уровня
  // thirdTierEarnings?: number; // Заработки с рефералов третьего уровня
}

const Invite = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.user);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [referralCount, setReferralCount] = useState(0);
  const [notificationVisible, setNotificationVisible] = useState(false);
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
  //   const fetchReferralsAndEarnings = async () => {
  //     try {
  //       const referralsResponse = await fetch(`https://coinfarm.club/api/user/${user.id}/referrals`);
  //       if (!referralsResponse.ok) {
  //         throw new Error('Failed to fetch referrals');
  //       }
  //       const referralsData: Friend[] = await referralsResponse.json();
  
  //       const earningsResponse = await fetch(`https://coinfarm.club/api/user/${user.id}/referrals/earnings`);
  //       if (!earningsResponse.ok) {
  //         throw new Error('Failed to fetch earnings');
  //       }
  //       const earningsData = await earningsResponse.json();
  
  //       const friendsWithEarnings = await Promise.all(referralsData.map(async (friend) => {
  //         const earning = earningsData.find((e: any) => e.username === friend.username);
          
  //         // Fetch 2-tier and 3-tier referrals for the current friend
  //         const secondTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${friend.id}/referrals`);
  //         const secondTierReferrals: Friend[] = await secondTierReferralsResponse.json();
  
  //         let secondTierEarnings = 0;
  //         let thirdTierEarnings = 0;
  
  //         for (const secondTierReferral of secondTierReferrals) {
  //           const secondTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals/earnings`);
  //           const secondTierEarningsData = await secondTierEarningResponse.json();
  //           secondTierEarnings += secondTierEarningsData.reduce((sum: number, e: any) => sum + e.coinsEarned, 0);
  
  //           // Fetch 3-tier referrals for each 2-tier referral
  //           const thirdTierReferralsResponse = await fetch(`https://coinfarm.club/api/user/${secondTierReferral.id}/referrals`);
  //           const thirdTierReferrals: Friend[] = await thirdTierReferralsResponse.json();
  
  //           for (const thirdTierReferral of thirdTierReferrals) {
  //             const thirdTierEarningResponse = await fetch(`https://coinfarm.club/api/user/${thirdTierReferral.id}/referrals/earnings`);
  //             const thirdTierEarningsData = await thirdTierEarningResponse.json();
  //             thirdTierEarnings += thirdTierEarningsData.reduce((sum: number, e: any) => sum + e.coinsEarned, 0);
  //           }
  //         }
  
  //         return { ...friend, coinsEarned: earning ? earning.coinsEarned : 0, secondTierEarnings, thirdTierEarnings };
  //       }));
  //       const limitedFriends = friendsWithEarnings.slice(-20);
  //       setFriends(limitedFriends);
  //       setReferralCount(referralsData.length);
  //     } catch (error) {
  //       console.error('Error fetching referrals and earnings:', error);
  //     }
  //   };
  
  //   fetchReferralsAndEarnings();
  // }, [user.id]);
  
  useEffect(() => {
    const fetchReferralsAndEarnings = async () => {
      try {
        const referralsResponse = await fetch(`https://coinfarm.club/api/user/${user.id}/referrals`);
        if (!referralsResponse.ok) {
          throw new Error('Failed to fetch referrals');
        }
        const referralsData: Friend[] = await referralsResponse.json();

        const earningsResponse = await fetch(`https://coinfarm.club/api/user/${user.id}/referrals/earnings`);
        if (!earningsResponse.ok) {
          throw new Error('Failed to fetch earnings');
        }
        const earningsData = await earningsResponse.json();

        const friendsWithEarnings = referralsData.map(friend => {
          const earning = earningsData.find((e: any) => e.username === friend.username);
          return { ...friend, coinsEarned: earning ? earning.coinsEarned : 0 };
        });

        setFriends(friendsWithEarnings);
        setReferralCount(referralsData.length);
      } catch (error) {
        console.error('Error fetching referrals and earnings:', error);
      }
    };

    fetchReferralsAndEarnings();
  }, [user.id]);
  
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
  return (
    <div className={cn("wrap")}>
      <div className={cn("invite")}>
        <h2 className={`${cn("invite__title")}` + " textShadow"}>
        {t('invite_friends')}
        </h2>
        <p className={`${cn("invite__subtitle")}` + " textShadow"}>
        {t('invite_descr')}

        </p>

        {/* Invite users blocks */}
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
              <b className={`${cn("inviteUsersBlock__title")}` + ' textShadow_center'}>
              {t('invite_1')}
              </b>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center"}>
              {t('invite_2')}
              </p>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center"}>
              {t('invite_3')}
              </p>
              <p className={`${cn("inviteUsersBlock__subtitle")}` + " textShadow_center"}>
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
  <Button className={cn("invite__copy")} size="big" >
    {t('invite_friends')}
  </Button>
</TelegramShareButton>

          {/* TODO: Реализовать функционал копирования */}
          <Button className={cn("invite__copy")} size="big" onClick={handleCopyLink}>
          {t('copy_link')}
            <img src="img/pages/invite/copy-link.svg" alt="Copy" />
          </Button>
          {notificationVisible && (
        <div className={cn("invite__notification")}>
          {t('link_copied')}
        </div>
      )}
        </div>
        {/* Кол-во друзей и reload */}
        <div className={cn("invite__friends-control")}>
          <div className={cn("invite__friends-amount")}>
          {t('your_friends')} <span>{referralCount}</span>
          </div>
          <img src="img/pages/invite/reload.svg" alt="Reload" />
        </div>

        {/* Списко пользователей */}
       
  <PopupList
    className={cn("invite__list")}
    nodes={new Array(10).fill(friends).flat().map((user, index) => (
      <PersonBlock
        key={`${user.id}-${index}`}
        name={user.username}
        imgSrc={"img/pages/people/person.png"}
        earning={`${Math.round(user.coinsEarned ?? 0)}`}
        coinAmount={''}
      />
    ))}
    type="third"
  />


        {/* <PopupListWrap className={cn("invite__listWrap")} isOpen={true}>
          <PopupList
            className={cn("invite__list")}
            nodes={friends.map((user) => (
              <PersonBlock
                key={user.id}
                name={user.username}
                imgSrc={"img/pages/people/person.png"}
                earning={`${Math.round(user.coinsEarned ?? 0)}`}


                // earning={`1st: ${Math.round(user.coinsEarned ?? 0)}, 2nd: ${Math.round(user.secondTierEarnings ?? 0)}, 3rd: ${Math.round(user.thirdTierEarnings ?? 0)}`}
                // coinAmount={Math.round(user.totalEarnings).toString()}
                coinAmount={''}
              />
            ))}
            type="third"
          />
        </PopupListWrap> */}

        {/* <div className={cn("invite__btns")}>
        <TelegramShareButton
  url={`https://t.me/Coin_Farming_bot?start=${user.referralCode}`}
  title="Join me on Coin Farm!"
>
  <Button className={cn("invite__copy")} size="big" >
    Invite friends
  </Button>
</TelegramShareButton>

          <Button className={cn("invite__copy")} size="big" onClick={handleCopyLink}>
            Copy link
            <img src="img/pages/invite/copy-link.svg" alt="Copy" />
          </Button>
          {notificationVisible && (
        <div className={cn("invite__notification")}>
          Link copied to clipboard!
        </div>
      )}
        </div> */}

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
