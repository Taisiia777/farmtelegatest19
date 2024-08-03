// import classNames from "classnames/bind";
// import styles from "./BoostBlock.module.scss";
// const cn = classNames.bind(styles);

// import { TBoostName, TLiga } from "../../types/globalTypes";

// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// import Button from "../Button/Button";

// import { useDispatch } from "react-redux";
// import { setBoostInfo } from "../../store/reducers/boost";

// interface IBoostBlockProps {
//    boostName: TBoostName;
//    price: string;
//    earning: string;
//    ligaName: TLiga;
//    isBlocked?: boolean;
//    isBought?: boolean;

// }

// const BoostBlock = ({
//    boostName,
//    price,
//    earning,
//    ligaName,
//    isBlocked = false,
//    isBought = false,

// }: IBoostBlockProps) => {
//    const dispatch = useDispatch();
//    console.log(userId)
//    console.log(boosterId)

//    function openBoostBuyPopup() {
//       dispatch(
//          setBoostInfo({
//             earning,
//             price,
//             name: boostName,
//             imgSrc: `img/boosts/${boostName}.svg`,
//          })
//       );
//    }

//    let content;

//    // Определяем тип контента
//    // в зависимости от того купленна ли она уже
//    // или может заблокирована
//    if (isBlocked) {
//       content = (
//          <>
//             <div className={cn("boost", '_blur')}>
//                <div className={cn("boost__left")}>
//                   <img
//                      src={`img/boosts/${boostName}.svg`}
//                      className={cn("boost__img")}
//                      alt={boostName}
//                   />
//                   <div className={cn("boost__info", "boostInfo")}>
//                      <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                         {boostName}
//                      </h3>
//                      <div className={cn("boostInfo__index")}>
//                         <img
//                            src={`img/leagueIcons/${ligaName}.png`}
//                            alt={ligaName}
//                         />
//                         <span className="textShadow">+ {earning}/h</span>
//                         <CoinWhiteBg size="small" iconName="BTC" />
//                      </div>
//                   </div>
//                </div>

//                <div className={cn("boost__right")} id="buyBoost">
//                   <Button
//                      className={cn("boost__price")}
//                      onClick={openBoostBuyPopup}>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                      <span className="textShadow">{price}</span>
//                   </Button>
//                </div>
//             </div>
//             <div className={cn("blocked")}>
//                <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
//                <strong className="textShadow">{ligaName} league</strong>
//             </div>
//          </>
//       );
//    } else if (isBought) {
//       content = (
//          <div className={cn("boost")}>
//             <div className={cn("boost__left")}>
//                <img
//                   src={`img/boosts/${boostName}.svg`}
//                   className={cn("boost__img")}
//                   alt={boostName}
//                />
//                <div className={cn("boost__info", "boostInfo")}>
//                   <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                      {boostName}
//                   </h3>
//                   <div className={cn("boostInfo__index")}>
//                      <img
//                         src={`img/leagueIcons/${ligaName}.png`}
//                         alt={ligaName}
//                      />
//                      <span className="textShadow">+ {earning}/h</span>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                   </div>
//                </div>
//             </div>
//             <div
//                className={cn("boost__right")}
//                style={{
//                   height: "45px",
//                }}>
//                <img
//                   src="img/global/checkbox/green.svg"
//                   className={cn("boost__checkbox")}
//                   alt="Bought"
//                />
//             </div>
//          </div>
//       );
//    } else {
//       content = (
//          <div className={cn("boost")}>
//             <div className={cn("boost__left")}>
//                <img
//                   src={`img/boosts/${boostName}.svg`}
//                   className={cn("boost__img")}
//                   alt={boostName}
//                />
//                <div className={cn("boost__info", "boostInfo")}>
//                   <h3 className={`${cn("boostInfo__name")}` + " textShadow"}>
//                      {boostName}
//                   </h3>
//                   <div className={cn("boostInfo__index")}>
//                      <img
//                         src={`img/leagueIcons/${ligaName}.png`}
//                         alt={ligaName}
//                      />
//                      <span className="textShadow">+ {earning}/h</span>
//                      <CoinWhiteBg size="small" iconName="BTC" />
//                   </div>
//                </div>
//             </div>

//             <div className={cn("boost__right")} id="buyBoost">
//                <Button
//                   className={cn("boost__price")}
//                   onClick={openBoostBuyPopup}>
//                   <CoinWhiteBg size="small" iconName="BTC" />
//                   <span className="textShadow">{price}</span>
//                </Button>
//             </div>
//          </div>
//       );
//    }
//    return content;
// };

// export default BoostBlock;




import classNames from "classnames/bind";
import styles from "./BoostBlock.module.scss";
import { TBoostName, TLiga } from "../../types/globalTypes";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setBoostInfo } from "../../store/reducers/boost";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

interface IBoostBlockProps {
  boostName: TBoostName;
  boostNameNew: string;

  price: string;
  earning: string;
  ligaName: TLiga;
  isBlocked?: boolean;
  isBought?: boolean;
  boosterId: number;
  userCoins: number; // Добавляем количество монет пользователя
}

const BoostBlock = ({
  boostName,
  price,
  earning,
  ligaName,
  isBlocked = false,
  isBought = false,
  boosterId,
  userCoins,
  boostNameNew
}: IBoostBlockProps) => {
  const dispatch = useDispatch();
  // let userId: number;
  // const { initData } = retrieveLaunchParams();
  const boosterPrice = parseInt(price.replace(/\D/g, ''), 10); // Преобразуем цену в число
  const { t } = useTranslation();
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
         element.style.fontSize = '13px';
         element.style.fontWeight = '700';
       }
     });
    }
  }, []);
  // async function applyBooster() {
  //   try {
  //     const user = initData?.user;
  //       const username = user?.username;
  //       if (username) {
  //         const response = await fetch(
  //           "https://coinfarm.club/api/user",
  //           { 
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Accept: "application/json",
  //             },
  //             body: JSON.stringify({
  //               username: username,
  //               coins: 0,
  //               totalEarnings: 0,
  //               incomeMultiplier: 1,
  //               coinsPerHour: 10,
  //               xp: 0,
  //               level: 0,
  //             }),
  //           }
  //         );

  //         if (response.status === 409) {
  //           const userData = await response.json();
  //           alert(`User already exists: ${JSON.stringify(userData)}`);
  //           userId = userData.id
  //           console.log('Existing user ID:', userData.id);
  //         } else if (!response.ok) {
  //           throw new Error("Something went wrong");
  //         } else {
  //           const newUser = await response.json();
  //           userId = newUser.id
  //           console.log('New user ID:', newUser.id);
  //         }
  //       }
  //   } catch (error) {
  //     console.error('Error applying booster:', error);
  //   }
  //   try {
  //     const response = await axios.post(`https://coinfarm.club/api/booster/apply/${userId}/${boosterId}`);
  //     console.log('Booster applied:', response.data);
  //   } catch (error) {
  //     console.error('Error applying booster:', error);
  //   }
  // }

  function openBoostBuyPopup() {
    dispatch(
      setBoostInfo({
        boostNameNew,
        earning,
        price,
        name: boostName,
        imgSrc: `img/boosts/${boostNameNew}1.svg`,
        boosterId: boosterId
      })
    );
    // applyBooster();
  }
  const canAfford = userCoins >= boosterPrice; // Проверяем, хватает ли монет
  let content;
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  if (isBlocked) {
    content = (
      <>
        <div className={cn("boost", '_blur')}>
          <div className={cn("boost__left")}>
            <img
              src={`img/boosts/${boostNameNew}.svg`}
              className={cn("boost__img")}
              alt={boostName}
            />
            <div className={cn("boost__info", "boostInfo")}>
              <h3 className={`${cn("boostInfo__name")}` + " textShadow textMenu2"}>
              {capitalizeFirstLetter(t(`${boostNameNew.toLocaleLowerCase()}`))}
              </h3>
              <div className={cn("boostInfo__index")}>
                <img
                  src={`img/leagueIcons/${ligaName}.png`}
                  alt={ligaName}
                />
                <span className="textShadow">+ {earning}/{t(`h`)}</span>
                <CoinWhiteBg size="small" iconName="BTC" />
              </div>
            </div>
          </div>

          <div className={cn("boost__right")} id="buyBoost">
            <Button
              className={cn("boost__price")}
              onClick={openBoostBuyPopup}
              disabled
            >
              <CoinWhiteBg size="small" iconName="BTC" />
              <span className="textShadow">{price}</span>
            </Button>
          </div>
        </div>
        <div className={cn("blocked")}>
          <img src={`img/leagueIcons/${ligaName}.png`} alt={ligaName} />
          <strong className="textShadow">{ligaName} league</strong>
        </div>
      </>
    );
  } else if (isBought) {
    content = (
      <div className={cn("boost")}>
        <div className={cn("boost__left")}>
          <img
            src={`img/boosts/${boostNameNew}.svg`}
            className={cn("boost__img")}
            alt={boostName}
          />
          <div className={cn("boost__info", "boostInfo")}>
            <h3 className={`${cn("boostInfo__name")}` + " textShadow textMenu2"}>
            {capitalizeFirstLetter(t(`${boostNameNew.toLocaleLowerCase()}`))}
            </h3>
            <div className={cn("boostInfo__index")}>
              {/* <img
                src={`img/leagueIcons/${ligaName}.png`}
                alt={ligaName}
              /> */}
              <span className="textShadow">+{earning} {t(`hour`)} ⏰</span>
              {/* <CoinWhiteBg size="small" iconName="BTC" /> */}
            </div>
          </div>
        </div>
        <div
          className={cn("boost__right")}
          style={{
            height: "45px",
          }}
        >
          <img
            src="img/global/checkbox/green.svg"
            className={cn("boost__checkbox")}
            alt="Bought"
          />
        </div>
      </div>
    );
  } else {
    content = (
      <div className={cn("boost")}>
        <div className={cn("boost__left")}>
          <img
            src={`img/boosts/${boostNameNew}.svg`}
            className={cn("boost__img")}
            alt={boostName}
          />
          <div className={cn("boost__info", "boostInfo")}>
            <h3 className={`${cn("boostInfo__name")}` + " textShadow textMenu2"}>
            {capitalizeFirstLetter(t(`${boostNameNew.toLocaleLowerCase()}`))}
            </h3>
            <div className={cn("boostInfo__index")}>
              {/* <img
                src={`img/leagueIcons/${ligaName}.png`}
                alt={ligaName}
              /> */}
              <span className="textShadow">+{earning} {t(`hour`)} ⏰</span>
              {/* <CoinWhiteBg size="small" iconName="BTC" /> */}
            </div>
          </div>
        </div>

        <div className={cn("boost__right")} id="buyBoost">
          {/* <Button
            className={cn("boost__price")}
            onClick={openBoostBuyPopup}
            disabled={!canAfford} // Делаем кнопку неактивной, если монет недостаточно
          >
            <CoinWhiteBg size="small" iconName="BTC" />
            <span className="textShadow">{price}</span>
          </Button> */}
          {canAfford ? (
            <Button
            className={cn("boost__price")}
            onClick={openBoostBuyPopup}
          >
            <CoinWhiteBg size="small" iconName="BTC" />
            <span className="textShadow">{price}</span>
          </Button>
          ) : (
            <Button
            className={cn("boost__price")}
            disabled={!canAfford} // Делаем кнопку неактивной, если монет недостаточно
          >
            <CoinWhiteBg size="small" iconName="BTC" />
            <span className="textShadow">{price}</span>
          </Button>
          )}
        </div>
      </div>
    );
  }
  return content;
};

export default BoostBlock;
