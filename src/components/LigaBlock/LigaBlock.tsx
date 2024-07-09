// import { TLiga } from "../../types/globalTypes";

// import classNames from "classnames/bind";
// import styles from "./LigaBlock.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// const cn = classNames.bind(styles);

// interface ILigaBlockProps {
//    ligaName: TLiga;
//    percent: number;
//    price: string;
//    acitve: boolean;
// }

// const LigaBlock = ({ ligaName, percent, price, acitve }: ILigaBlockProps) => {
//    let priceFontSize;

//    if (price.length < 7) {
//       priceFontSize = 16;
//    } else {
//       priceFontSize = 12;
//    }
//    return (
//       <div className={cn("ligaBlock")}>
//          <img
//             src={`img/leagueIcons/${ligaName}.png`}
//             className={cn("ligaBlock__ligaImg")}
//             alt={ligaName}
//          />
//          <div className={cn("ligaBlock__info", "ligaBlockInfo")}>
//             <div className={cn("ligaBlockInfo__top")}>
//                <h3
//                   className={
//                      `${cn("ligaBlockInfo__ligaName")}` + " textShadow"
//                   }>
//                   {ligaName}
//                </h3>
//                <Button
//                   className={cn("ligaBlockInfo__btn")}
//                   size="small"
//                   disabled={!acitve}>
//                   <CoinWhiteBg iconName="BTC" size="small" />
//                   <span
//                      className={cn("ligaBlockInfo__price") + " textShadow"}
//                      style={{
//                         fontSize: priceFontSize + "px",
//                      }}>
//                      +{price}
//                   </span>
//                </Button>
//             </div>
//             <div className={cn("ligaBlockInfo__bottom")}>
//                <img src="img/ligaBlock/percent.svg" alt="" />

//                {/* Заполнитель плашки */}
//                <div className={cn("ligaBlockInfo__percentWrap")}>
//                   <div
//                      className={cn("ligaBlockInfo__percent")}
//                      style={{
//                         width: percent + "%",
//                      }}></div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default LigaBlock;
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { useAppSelector } from '../../store';
import classNames from 'classnames/bind';
import styles from './LigaBlock.module.scss';
import Button from '../Button/Button';
import CoinWhiteBg from '../CoinWhiteBg/CoinWhiteBg';
import axios from 'axios';

const cn = classNames.bind(styles);
type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

interface ILigaBlockProps {
  ligaName: TLiga;
  percent: number;
  price: string;
  active: boolean;
}

const LigaBlock = ({ ligaName, percent, price, active }: ILigaBlockProps) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (!user?.id) return;
  
      try {
        const response = await axios.get(`https://coinfarm.club/reward/${user.id}`);
        const completedTasks = response.data;
  
        const rewardClaimed = completedTasks.some((task: any) => task.description === ligaName);
        setIsRewardClaimed(rewardClaimed);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };
  
    fetchCompletedTasks();
  }, [user?.id, ligaName]);

  const handleButtonClick = async () => {
    if (isRewardClaimed || !user?.id) {
      console.error('Reward already claimed or user ID is not available');
      return;
    }
  
    const routeMap = {
      Wooden: 'wood',
      Silver: 'silver',
      Gold: 'gold',
      Fire: 'fire',
      Diamond: 'diamond'
    };
  
    const route = routeMap[ligaName];
  
    try {
      const response = await fetch(`https://coinfarm.club/reward/${route}/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to give reward');
      }
  
      const updatedUser = await response.json();
      dispatch(setUser(updatedUser)); // Обновляем пользователя в Redux
      setIsRewardClaimed(true);
    } catch (error) {
      console.error('Error giving reward:', error);
    }
  };
  

  let priceFontSize;

  if (price.length < 7) {
    priceFontSize = 16;
  } else {
    priceFontSize = 12;
  }

  return (
    <div className={cn("ligaBlock")}>
      <img
        src={`img/leagueIcons/${ligaName}.png`}
        className={cn("ligaBlock__ligaImg")}
        alt={ligaName}
      />
      <div className={cn("ligaBlock__info", "ligaBlockInfo")}>
        <div className={cn("ligaBlockInfo__top")}>
          <h3 className={`${cn("ligaBlockInfo__ligaName")} textShadow`}>
            {ligaName}
          </h3>
          <Button
            className={cn("ligaBlockInfo__btn")}
            size="small"
            disabled={active || isRewardClaimed}
            onClick={handleButtonClick}
          >
            <CoinWhiteBg iconName="BTC" size="small" />
            <span
              className={`${cn("ligaBlockInfo__price")} textShadow`}
              style={{ fontSize: `${priceFontSize}px` }}
            >
              +{price}
            </span>
          </Button>
        </div>
        <div className={cn("ligaBlockInfo__bottom")}>
          <img src="img/ligaBlock/percent.svg" alt="" />
          <div className={cn("ligaBlockInfo__percentWrap")}>
            <div
              className={cn("ligaBlockInfo__percent")}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LigaBlock;
