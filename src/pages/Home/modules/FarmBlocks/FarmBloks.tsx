

// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// const cn = classNames.bind(styles);

// import { selectEarthBlock } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   // Собирание пшеницы
//   useWheatTrunctaion();

//   return (
//     <div className={cn("farmBlockWrap")}>
//       <FarmBlock zIndex={9} id={1} league={league} />
//       <FarmBlock zIndex={9} id={2} league={league} />
//       <FarmBlock zIndex={9} id={3} league={league} />
//       <FarmBlock zIndex={8} id={4} league={league} />
//       <FarmBlock zIndex={7} id={5} league={league} />
//       <FarmBlock zIndex={6} id={6} league={league} />
//       <FarmBlock zIndex={6} id={7} league={league} />
//       <FarmBlock zIndex={5} id={8} league={league} />
//       <FarmBlock zIndex={4} id={9} league={league} />

//       {/* Тень */}
//       <img
//         src="img/pages/home/earth-blocks-bg.svg"
//         className={cn("farmBlock__shadow")}
//         alt=""
//       />
//     </div>
//   );
// };

// export default FarmBloks;

// interface IFarmBlockProps {
//   zIndex: number;
//   id: number;
//   league: TLiga;
// }

// const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league }) => {
//   const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));

//   if (farmBlock) {
//     return (
//       <div
//         className={cn("farmBlock")}
//         style={{
//           zIndex,
//         }}
//       >
//         <img
//           src={`img/leagueStages/${league}.png`}
//           className={cn("farmBlock__earth")}
//           alt={league}
//         />
//         <img
//           src={`img/growthStages/${farmBlock?.stage}.png`}
//           className={cn("farmBlock__growthStage", `_${farmBlock?.stage}`)}
//           alt="first"
//           id="growthStageImg"
//           // Dataset нужен, чтобы при событие touchmove на document
//           // Мы могли найти именно этот блок и срезать именно его
//           data-id={id}
//           data-stage={farmBlock?.stage}
//         />

//         {/* Монеты, которые будут улетать вверх при сборе пшеницы */}
//         <img
//           src="img/pages/home/money.svg"
//           className={cn("farmBlock__money")}
//         />
//       </div>
//     );
//   }
// };














// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import { selectEarthBlock, changeGrowthStage } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";

// const cn = classNames.bind(styles);

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();

//   // Собирание пшеницы
//   useWheatTrunctaion();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i }));
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [dispatch]);

//   return (
//     <div className={cn("farmBlockWrap")}>
//       <FarmBlock zIndex={9} id={1} league={league} />
//       <FarmBlock zIndex={9} id={2} league={league} />
//       <FarmBlock zIndex={9} id={3} league={league} />
//       <FarmBlock zIndex={8} id={4} league={league} />
//       <FarmBlock zIndex={7} id={5} league={league} />
//       <FarmBlock zIndex={6} id={6} league={league} />
//       <FarmBlock zIndex={6} id={7} league={league} />
//       <FarmBlock zIndex={5} id={8} league={league} />
//       <FarmBlock zIndex={4} id={9} league={league} />

//       {/* Тень */}
//       <img
//         src="img/pages/home/earth-blocks-bg.svg"
//         className={cn("farmBlock__shadow")}
//         alt=""
//       />
//     </div>
//   );
// };

// export default FarmBloks;

// interface IFarmBlockProps {
//   zIndex: number;
//   id: number;
//   league: TLiga;
// }

// const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league }) => {
//   const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));

//   if (farmBlock) {
//     return (
//       <div
//         className={cn("farmBlock")}
//         style={{
//           zIndex,
//         }}
//       >
//         <img
//           src={`img/leagueStages/${league}.png`}
//           className={cn("farmBlock__earth")}
//           alt={league}
//         />
//         <img
//           src={`img/growthStages/${farmBlock?.stage}.png`}
//           className={cn("farmBlock__growthStage", `_${farmBlock?.stage}`)}
//           alt="first"
//           id="growthStageImg"
//           // Dataset нужен, чтобы при событие touchmove на document
//           // Мы могли найти именно этот блок и срезать именно его
//           data-id={id}
//           data-stage={farmBlock?.stage}
//         />

//         {/* Монеты, которые будут улетать вверх при сборе пшеницы */}
//         <img
//           src="img/pages/home/money.svg"
//           className={cn("farmBlock__money")}
//         />
//       </div>
//     );
//   }

//   return null;
// };









































// import React, { useEffect, useState } from "react";
// import { useDispatch  } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import { selectEarthBlock, changeGrowthStage, pickWheat } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import axios from 'axios';
// const cn = classNames.bind(styles);

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();

//   // Собирание пшеницы
//   useWheatTrunctaion();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i }));
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [dispatch]);

//   return (
//     <div className={cn("farmBlockWrap")}>
//       <FarmBlock zIndex={9} id={1} league={league} />
//       <FarmBlock zIndex={9} id={2} league={league} />
//       <FarmBlock zIndex={9} id={3} league={league} />
//       <FarmBlock zIndex={8} id={4} league={league} />
//       <FarmBlock zIndex={7} id={5} league={league} />
//       <FarmBlock zIndex={6} id={6} league={league} />
//       <FarmBlock zIndex={6} id={7} league={league} />
//       <FarmBlock zIndex={5} id={8} league={league} />
//       <FarmBlock zIndex={4} id={9} league={league} />

//       {/* Тень */}
//       <img
//         src="img/pages/home/earth-blocks-bg.svg"
//         className={cn("farmBlock__shadow")}
//         alt=""
//       />
//     </div>
//   );
// };

// export default FarmBloks;

// interface IFarmBlockProps {
//   zIndex: number;
//   id: number;
//   league: TLiga;
// }

// const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league }) => {
//   const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
//   const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);

//   if (!farmBlock) return null;

//   const handlePickWheat = async () => {
//     if (farmBlock.stage !== "first") {
//       let rewardMultiplier = 0;

//     switch (farmBlock.stage) {
//       case "second":
//         rewardMultiplier = 1;
//         break;
//       case "third":
//         rewardMultiplier = 2;
//         break;
//       case "fourth":
//         rewardMultiplier = 3;
//         break;
//       default:
//         return; // Ничего не делать, если стадия "first"
//     }
//     const reward = user ? user.coinsPerHour * rewardMultiplier : 0;

//       if (user) {
//         try {
//           const response = await axios.patch(
//             `https://coinfarm.club/user/${user.id}/earn/${reward}`
//           );
//           const updatedUser = response.data;

//           // Обновление состояния пользователя и локальных монет
//           dispatch(
//             setUser({
//               ...updatedUser,
//               coins: parseFloat(updatedUser.coins),
//               totalEarnings: parseFloat(updatedUser.totalEarnings),
//             })
//           );

//           setLocalCoins(parseFloat(updatedUser.coins));
//           console.log(localCoins)
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//       dispatch(pickWheat({ id }));
//     }
//   };

//   return (
//     <div
//       className={cn("farmBlock")}
//       style={{ zIndex }}
//       onClick={handlePickWheat}
//     >
//       <img
//         src={`img/leagueStages/${league}.png`}
//         className={cn("farmBlock__earth")}
//         alt={league}
//       />
//       <img
//         src={`img/growthStages/${farmBlock.stage}.png`}
//         className={cn("farmBlock__growthStage", `_${farmBlock.stage}`)}
//         alt="growth stage"
//         data-id={id}
//         data-stage={farmBlock.stage}
//       />
//       <img
//         src="img/pages/home/money.svg"
//         className={cn("farmBlock__money")}
//         alt="money"
//       />
//     </div>
//   );
// };






























// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import { selectEarthBlock, changeGrowthStage, pickWheat, calculateGrassEarnings } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
// import axios from 'axios';

// const cn = classNames.bind(styles);

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

//   useWheatTrunctaion();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i }));
//       }
//       if (user) {
//         const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
//         dispatch(updateGrassEarnings(grassEarnings));
//         console.log("Новое значение прибыли: ", grassEarnings);
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [dispatch, user, blocks]);

//   return (
//     <div className={cn("farmBlockWrap")}>
//       <FarmBlock zIndex={9} id={1} league={league} />
//       <FarmBlock zIndex={9} id={2} league={league} />
//       <FarmBlock zIndex={9} id={3} league={league} />
//       <FarmBlock zIndex={8} id={4} league={league} />
//       <FarmBlock zIndex={7} id={5} league={league} />
//       <FarmBlock zIndex={6} id={6} league={league} />
//       <FarmBlock zIndex={6} id={7} league={league} />
//       <FarmBlock zIndex={5} id={8} league={league} />
//       <FarmBlock zIndex={4} id={9} league={league} />

//       {/* Тень */}
//       <img
//         src="img/pages/home/earth-blocks-bg.svg"
//         className={cn("farmBlock__shadow")}
//         alt=""
//       />
//     </div>
//   );
// };

// export default FarmBloks;

// interface IFarmBlockProps {
//   zIndex: number;
//   id: number;
//   league: TLiga;
// }

// const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league }) => {
//   const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
//   const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);

//   const [touchedBlocks, setTouchedBlocks] = useState<Set<number>>(new Set());

//   if (!farmBlock) return null;

//   const handlePickWheat = async (blockId: number) => {
//     if (farmBlock.stage !== "first") {
//       let rewardMultiplier = 0;

//       switch (farmBlock.stage) {
//         case "second":
//           rewardMultiplier = 1;
//           break;
//         case "third":
//           rewardMultiplier = 2;
//           break;
//         case "fourth":
//           rewardMultiplier = 3;
//           break;
//         default:
//           return; // Ничего не делать, если стадия "first"
//       }

//       const reward = user ? user.coinsPerHour * rewardMultiplier : 0;

//       if (user) {
//         try {
//           const response = await axios.patch(
//             `https://coinfarm.club/user/${user.id}/earn/${reward}`
//           );
//           const updatedUser = response.data;

//           // Обновление состояния пользователя и локальных монет
//           dispatch(
//             setUser({
//               ...updatedUser,
//               coins: parseFloat(updatedUser.coins),
//               totalEarnings: parseFloat(updatedUser.totalEarnings),
//             })
//           );

//           setLocalCoins(parseFloat(updatedUser.coins));
//           console.log(localCoins);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//       dispatch(pickWheat({ id: blockId }));
//     }
//   };

//   const handleInteraction = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//     e.preventDefault(); // Prevent default behavior to avoid unwanted scrolling

//     // Determine the type of event
//     const eventType = e.type;

//     let target: HTMLElement | null = null;
//     if (eventType === 'mousemove' || eventType === 'touchmove') {
//       target = document.elementFromPoint(
//         (e as React.MouseEvent<HTMLDivElement>).clientX || (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
//         (e as React.MouseEvent<HTMLDivElement>).clientY || (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
//       ) as HTMLElement;
//     }

//     if (target) {
//       const blockId = target.getAttribute('data-id');
//       if (blockId) {
//         const id = parseInt(blockId, 10);
//         if (!touchedBlocks.has(id)) {
//           setTouchedBlocks(prev => new Set(prev).add(id));
//           handlePickWheat(id);
//         }
//       }
//     }
//   }, [handlePickWheat, touchedBlocks]);

//   const handleTouchEnd = useCallback(() => {
//     setTouchedBlocks(new Set()); // Reset touched blocks when touch ends
//   }, []);

//   return (
//     <div
//       className={cn("farmBlock")}
//       style={{ zIndex }}
//       data-id={id}
//       data-stage={farmBlock.stage}
//       onMouseMove={handleInteraction}
//       onTouchMove={handleInteraction}
//       onTouchEnd={handleTouchEnd}
//     >
//       <img
//         src={`img/leagueStages/${league}.png`}
//         className={cn("farmBlock__earth")}
//         alt={league}
//       />
//       <img
//         src={`img/growthStages/${farmBlock.stage}.png`}
//         className={cn("farmBlock__growthStage", `_${farmBlock.stage}`)}
//         alt="growth stage"
//         data-id={id}
//         data-stage={farmBlock.stage}
//       />
//       <img
//         src="img/pages/home/money.svg"
//         className={cn("farmBlock__money")}
//         alt="money"
//       />
//     </div>
//   );
// };
















import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./FarmBlocks.module.scss";
import classNames from "classnames/bind";
import { selectEarthBlock, changeGrowthStage, pickWheat, calculateGrassEarnings } from "../../../../store/reducers/growthStages";
import { useAppSelector } from "../../../../store";
import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
import { RootState } from "../../../../store";
import { setUser } from "../../../../store/reducers/userSlice";
import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
import axios from 'axios';

const cn = classNames.bind(styles);

type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

interface FarmBlocksProps {
  league: TLiga;
}

const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

  useWheatTrunctaion();

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 1; i <= 9; i++) {
        dispatch(changeGrowthStage({ id: i }));
      }
      if (user) {
        const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
        dispatch(updateGrassEarnings(grassEarnings));
        console.log("Новое значение прибыли: ", grassEarnings);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, user, blocks]);

  return (
    <div className={cn("farmBlockWrap")}>
      <FarmBlock zIndex={9} id={1} league={league} />
      <FarmBlock zIndex={9} id={2} league={league} />
      <FarmBlock zIndex={9} id={3} league={league} />
      <FarmBlock zIndex={8} id={4} league={league} />
      <FarmBlock zIndex={7} id={5} league={league} />
      <FarmBlock zIndex={6} id={6} league={league} />
      <FarmBlock zIndex={6} id={7} league={league} />
      <FarmBlock zIndex={5} id={8} league={league} />
      <FarmBlock zIndex={4} id={9} league={league} />

      {/* Тень */}
      <img
        src="img/pages/home/earth-blocks-bg.svg"
        className={cn("farmBlock__shadow")}
        alt=""
      />
    </div>
  );
};

export default FarmBloks;

interface IFarmBlockProps {
  zIndex: number;
  id: number;
  league: TLiga;
}

const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league }) => {
  const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);

  const [touchedBlocks, setTouchedBlocks] = useState<Set<number>>(new Set());

  if (!farmBlock) return null;

  const handlePickWheat = async (blockId: number) => {
    if (farmBlock.stage !== "first") {
      let rewardMultiplier = 0;
  
      switch (farmBlock.stage) {
        case "second":
          rewardMultiplier = 1;
          break;
        case "third":
          rewardMultiplier = 2;
          break;
        case "fourth":
          rewardMultiplier = 3;
          break;
        default:
          return; // Ничего не делать, если стадия "first"
      }
  
      const reward = user ? user.coinsPerHour * rewardMultiplier : 0;
  
      if (user) {
        try {
          const response = await axios.patch(
            `https://coinfarm.club/user/${user.id}/earn/${reward}`
          );
          const updatedUser = response.data;
  
          // Обновление состояния пользователя и локальных монет
          dispatch(
            setUser({
              ...updatedUser,
              coins: parseFloat(updatedUser.coins),
              totalEarnings: parseFloat(updatedUser.totalEarnings),
            })
          );
  
          setLocalCoins(parseFloat(updatedUser.coins));
          console.log(localCoins);
        } catch (error) {
          console.error("Error:", error);
        }
      }
  
      // Добавление класса _anim
      const moneyElement = document.querySelector(`.farmBlock[data-id="${blockId}"] .farmBlock__money`);
      if (moneyElement) {
        moneyElement.classList.add('_anim');
        setTimeout(() => {
          moneyElement.classList.remove('_anim');
        }, 400); // Убедитесь, что время совпадает с продолжительностью анимации
      }
  
      dispatch(pickWheat({ id: blockId }));
    }
  };
  

  const handleInteraction = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior to avoid unwanted scrolling

    // Determine the type of event
    const eventType = e.type;

    let target: HTMLElement | null = null;
    if (eventType === 'mousemove' || eventType === 'touchmove') {
      target = document.elementFromPoint(
        (e as React.MouseEvent<HTMLDivElement>).clientX || (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
        (e as React.MouseEvent<HTMLDivElement>).clientY || (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
      ) as HTMLElement;
    }

    if (target) {
      const blockId = target.getAttribute('data-id');
      if (blockId) {
        const id = parseInt(blockId, 10);
        if (!touchedBlocks.has(id)) {
          setTouchedBlocks(prev => new Set(prev).add(id));
          handlePickWheat(id);
        }
      }
    }
  }, [handlePickWheat, touchedBlocks]);

  const handleTouchEnd = useCallback(() => {
    setTouchedBlocks(new Set()); // Reset touched blocks when touch ends
  }, []);

  return (
    <div
      className={cn("farmBlock")}
      style={{ zIndex }}
      data-id={id}
      data-stage={farmBlock.stage}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={`img/leagueStages/${league}.png`}
        className={cn("farmBlock__earth")}
        alt={league}
      />
      <img
        src={`img/growthStages/${farmBlock.stage}.png`}
        className={cn("farmBlock__growthStage", `_${farmBlock.stage}`)}
        alt="growth stage"
        data-id={id}
        data-stage={farmBlock.stage}
      />
      <img
        src="img/pages/home/money.svg"
        className={cn("farmBlock__money")}
        alt="money"
      />
    </div>
  );
};


