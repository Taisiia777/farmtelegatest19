// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import {
//   selectEarthBlock,
//   changeGrowthStage,
//   pickWheat,
//   calculateGrassEarnings,
// } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
// import axios from "axios";

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
//   const [harvested, setHarvested] = useState(false);

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
//       setHarvested(true);
//       setTimeout(() => setHarvested(false), 400); // Сброс анимации после ее длительности
//     }
//   };

//   const handleInteraction = useCallback(
//     (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//       e.preventDefault(); // Предотвращение стандартного поведения для предотвращения нежелательной прокрутки

//       // Определение типа события
//       const eventType = e.type;

//       let target: HTMLElement | null = null;
//       if (eventType === "mousemove" || eventType === "touchmove") {
//         target = document.elementFromPoint(
//           (e as React.MouseEvent<HTMLDivElement>).clientX ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
//           (e as React.MouseEvent<HTMLDivElement>).clientY ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
//         ) as HTMLElement;
//       }

//       if (target) {
//         const blockId = target.getAttribute("data-id");
//         if (blockId) {
//           const id = parseInt(blockId, 10);
//           if (!touchedBlocks.has(id)) {
//             setTouchedBlocks((prev) => new Set(prev).add(id));
//             handlePickWheat(id);
//           }
//         }
//       }
//     },
//     [handlePickWheat, touchedBlocks]
//   );

//   const handleTouchEnd = useCallback(() => {
//     setTouchedBlocks(new Set()); // Сброс касаний при окончании взаимодействия
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
//         className={cn("farmBlock__money", { _anim: harvested })}
//       />
//     </div>
//   );
// };






















// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import {
//   selectEarthBlock,
//   changeGrowthStage,
//   pickWheat,
//   calculateGrassEarnings,
//   setGrowthStages
// } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
// import axios from "axios";

// const cn = classNames.bind(styles);
// type TGrowthStage = "first" | "second" | "third" | "fourth";

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
//   const hasFetchedGrowthStages = useRef(false); // Добавлено для отслеживания выполнения эффекта

//   useWheatTrunctaion();

//   useEffect(() => {
//     const fetchGrowthStages = async () => {
//       try {
//         const response = await axios.get(`https://coinfarm.club/user/${user.id}/grass-stages`);
//         alert(JSON.stringify(response.data));
//         dispatch(setGrowthStages(response.data)); // Добавление стадии роста
//       } catch (error) {
//         console.error('Failed to fetch grass growth stages:', error);
//       }
//     };

//     if (user && !hasFetchedGrowthStages.current) {
//       fetchGrowthStages();
//       hasFetchedGrowthStages.current = true; // Устанавливаем, что эффект был выполнен
//     }
//   }, [user, dispatch]); // Добавлены зависимости user и dispatch

//   useEffect(() => {
//     const updateGrowthStages = async () => {
//       try {
//         const stages = blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage);
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, { stages });
//       } catch (error) {
//         console.error('Failed to update grass growth stages:', error);
//       }
//     };

//     updateGrowthStages(); // Обновление стадий роста на сервере при изменении блоков
//   }, [blocks]); // Добавлена зависимость от blocks

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i })); // Изменение стадии роста для каждого блока
//       }
//       if (user) {
//         const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
//         dispatch(updateGrassEarnings(grassEarnings));
//         console.log('Новое значение прибыли: ', grassEarnings);
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
//   const [harvested, setHarvested] = useState(false);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

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
//        // Обновляем стадию роста на сервере после срезания
//        try {
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, {
//           stages: blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage),
//         });
//       } catch (error) {
//         console.error("Failed to update grass growth stage on server:", error);
//       }
//       setHarvested(true);
//       setTimeout(() => setHarvested(false), 400); // Сброс анимации после ее длительности
//     }
//   };

//   const handleInteraction = useCallback(
//     (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//       e.preventDefault(); // Предотвращение стандартного поведения для предотвращения нежелательной прокрутки

//       // Определение типа события
//       const eventType = e.type;

//       let target: HTMLElement | null = null;
//       if (eventType === "mousemove" || eventType === "touchmove") {
//         target = document.elementFromPoint(
//           (e as React.MouseEvent<HTMLDivElement>).clientX ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
//           (e as React.MouseEvent<HTMLDivElement>).clientY ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
//         ) as HTMLElement;
//       }

//       if (target) {
//         const blockId = target.getAttribute("data-id");
//         if (blockId) {
//           const id = parseInt(blockId, 10);
//           if (!touchedBlocks.has(id)) {
//             setTouchedBlocks((prev) => new Set(prev).add(id));
//             handlePickWheat(id);
//           }
//         }
//       }
//     },
//     [handlePickWheat, touchedBlocks]
//   );

//   const handleTouchEnd = useCallback(() => {
//     setTouchedBlocks(new Set()); // Сброс касаний при окончании взаимодействия
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
//         className={cn("farmBlock__money", { _anim: harvested })}
//       />
//     </div>
//   );
// };






// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import {
//   selectEarthBlock,
//   changeGrowthStage,
//   pickWheat,
//   calculateGrassEarnings,
//   setGrowthStages
// } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
// import axios from "axios";

// const cn = classNames.bind(styles);
// type TGrowthStage = "first" | "second" | "third" | "fourth";

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
//   const hasFetchedGrowthStages = useRef(false); // Добавлено для отслеживания выполнения эффекта

//   useWheatTrunctaion();

//   useEffect(() => {
//     const fetchGrowthStages = async () => {
//       try {
//         const response = await axios.get(`https://coinfarm.club/user/${user.id}/grass-stages`);
//         alert(JSON.stringify(response.data));
//         dispatch(setGrowthStages(response.data)); // Добавление стадии роста
//       } catch (error) {
//         console.error('Failed to fetch grass growth stages:', error);
//       }
//     };

//     if (user && !hasFetchedGrowthStages.current) {
//       fetchGrowthStages();
//       hasFetchedGrowthStages.current = true; // Устанавливаем, что эффект был выполнен
//     }
//   }, [user, dispatch]); // Добавлены зависимости user и dispatch

//   useEffect(() => {
//     const updateGrowthStages = async () => {
//       try {
//         const stages = blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage);
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, { stages });
//       } catch (error) {
//         console.error('Failed to update grass growth stages:', error);
//       }
//     };

//     updateGrowthStages(); // Обновление стадий роста на сервере при изменении блоков
//   }, [blocks]); // Добавлена зависимость от blocks

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i })); // Изменение стадии роста для каждого блока
//       }
//       if (user) {
//         const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
//         dispatch(updateGrassEarnings(grassEarnings));
//         console.log('Новое значение прибыли: ', grassEarnings);
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
//   const [harvested, setHarvested] = useState(false);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

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
//       setHarvested(true);
//       setTimeout(() => setHarvested(false), 200); // Сброс анимации после ее длительности
//       try {
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, {
//           stages: blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage),
//         });
//       } catch (error) {
//         console.error("Failed to update grass growth stage on server:", error);
//       }
//     }
//   };

//    const handleInteraction = useCallback(
//     (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//       e.preventDefault(); // Предотвращение стандартного поведения для предотвращения нежелательной прокрутки

//       // Определение типа события
//       const eventType = e.type;

//       let target: HTMLElement | null = null;
//       if (eventType === "mousemove" || eventType === "touchmove") {
//         target = document.elementFromPoint(
//           (e as React.MouseEvent<HTMLDivElement>).clientX ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
//           (e as React.MouseEvent<HTMLDivElement>).clientY ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
//         ) as HTMLElement;
//       }

//       if (target) {
//         const blockId = target.getAttribute("data-id");
//         if (blockId) {
//           const id = parseInt(blockId, 10);
//           if (!touchedBlocks.has(id)) {
//             setTouchedBlocks((prev) => new Set(prev).add(id));
//             handlePickWheat(id);
//           }
//         }
//       }
//     },
//     [handlePickWheat, touchedBlocks]
//   );

//   const handleTouchEnd = useCallback(() => {
//     setTouchedBlocks(new Set()); // Сброс касаний при окончании взаимодействия
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
//         className={cn("farmBlock__money", { _anim: harvested })}
//       />
//     </div>
//   );
// };




















// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useDispatch } from "react-redux";
// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// import {
//   selectEarthBlock,
//   changeGrowthStage,
//   pickWheat,
//   calculateGrassEarnings,
//   setGrowthStages
// } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
// import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
// import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
// import axios from "axios";

// const cn = classNames.bind(styles);
// type TGrowthStage = "first" | "second" | "third" | "fourth";

// type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

// interface FarmBlocksProps {
//   league: TLiga;
// }

// const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
//   const dispatch = useDispatch();
//   const user = useAppSelector((state: RootState) => state.user.user);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
//   const hasFetchedGrowthStages = useRef(false); // Добавлено для отслеживания выполнения эффекта

//   useWheatTrunctaion();

//   useEffect(() => {
//     const fetchGrowthStages = async () => {
//       try {
//         const response = await axios.get(`https://coinfarm.club/user/${user.id}/grass-stages`);
//         alert(JSON.stringify(response.data));
//         dispatch(setGrowthStages(response.data)); // Добавление стадии роста
//       } catch (error) {
//         console.error('Failed to fetch grass growth stages:', error);
//       }
//     };

//     if (user && !hasFetchedGrowthStages.current) {
//       fetchGrowthStages();
//       hasFetchedGrowthStages.current = true; // Устанавливаем, что эффект был выполнен
//     }
//   }, [user, dispatch]); // Добавлены зависимости user и dispatch

//   useEffect(() => {
//     const updateGrowthStages = async () => {
//       try {
//         const stages = blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage);
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, { stages });
//       } catch (error) {
//         console.error('Failed to update grass growth stages:', error);
//       }
//     };

//     updateGrowthStages(); // Обновление стадий роста на сервере при изменении блоков
//   }, [blocks]); // Добавлена зависимость от blocks

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 1; i <= 9; i++) {
//         dispatch(changeGrowthStage({ id: i })); // Изменение стадии роста для каждого блока
//       }
//       if (user) {
//         const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
//         dispatch(updateGrassEarnings(grassEarnings));
//         console.log('Новое значение прибыли: ', grassEarnings);
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
//   const [harvested, setHarvested] = useState(false);
//   const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

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
//       setHarvested(true);
//       setTimeout(() => setHarvested(false), 200); // Сброс анимации после ее длительности
//       try {
//         await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, {
//           stages: blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage),
//         });
//       } catch (error) {
//         console.error("Failed to update grass growth stage on server:", error);
//       }
//     }
//   };

//    const handleInteraction = useCallback(
//     (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//       e.preventDefault(); // Предотвращение стандартного поведения для предотвращения нежелательной прокрутки

//       // Определение типа события
//       const eventType = e.type;

//       let target: HTMLElement | null = null;
//       if (eventType === "mousemove" || eventType === "touchmove") {
//         target = document.elementFromPoint(
//           (e as React.MouseEvent<HTMLDivElement>).clientX ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
//           (e as React.MouseEvent<HTMLDivElement>).clientY ||
//             (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
//         ) as HTMLElement;
//       }

//       if (target) {
//         const blockId = target.getAttribute("data-id");
//         if (blockId) {
//           const id = parseInt(blockId, 10);
//           if (!touchedBlocks.has(id)) {
//             setTouchedBlocks((prev) => new Set(prev).add(id));
//             handlePickWheat(id);
//           }
//         }
//       }
//     },
//     [handlePickWheat, touchedBlocks]
//   );

//   const handleTouchEnd = useCallback(() => {
//     setTouchedBlocks(new Set()); // Сброс касаний при окончании взаимодействия
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
//         className={cn("farmBlock__money", { _anim: harvested })}
//       />
//     </div>
//   );
// };




















  import React, { useEffect, useState, useCallback, useRef } from "react";
  import { useDispatch } from "react-redux";
  import styles from "./FarmBlocks.module.scss";
  import classNames from "classnames/bind";
  import {
    selectEarthBlock,
    changeGrowthStage,
    pickWheat,
    calculateGrassEarnings,
    setGrowthStages,
    incrementProgress
  } from "../../../../store/reducers/growthStages";
  import { useAppSelector } from "../../../../store";
  import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
  import { RootState } from "../../../../store";
  import { setUser } from "../../../../store/reducers/userSlice";
  import { updateGrassEarnings } from "../../../../store/reducers/userSlice";
  import axios from "axios";

  const cn = classNames.bind(styles);
  type TGrowthStage = "first" | "second" | "third" | "fourth";

  type TLiga = "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

  interface FarmBlocksProps {
    league: TLiga;
  }

  const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state: RootState) => state.user.user);
    const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
    const hasFetchedGrowthStages = useRef(false); // Добавлено для отслеживания выполнения эффекта
    const [harvestedBlocks, setHarvestedBlocks] = useState<Set<number>>(new Set());

    useWheatTrunctaion();

    useEffect(() => {
      const fetchGrowthStages = async () => {
        try {
          const response = await axios.get(`https://coinfarm.club/user/${user.id}/grass-stages`);
          alert(JSON.stringify(response.data));
          dispatch(setGrowthStages(response.data)); // Добавление стадии роста
        } catch (error) {
          console.error('Failed to fetch grass growth stages:', error);
        }
      };

      if (user && !hasFetchedGrowthStages.current) {
        fetchGrowthStages();
        hasFetchedGrowthStages.current = true; // Устанавливаем, что эффект был выполнен
      }
    }, [user, dispatch]); // Добавлены зависимости user и dispatch

    useEffect(() => {
      const updateGrowthStages = async () => {
        if (user) {
          try {
            const stages = blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage);
            await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, { stages });
          } catch (error) {
            console.error('Failed to update grass growth stages:', error);
          }
        }
      };
    
      updateGrowthStages(); // Обновление стадий роста на сервере при изменении блоков
    }, [blocks, user]); // Добавлена зависимость от user

    useEffect(() => {
      const progressInterval = setInterval(() => {
        dispatch(incrementProgress()); // Увеличение прогресса для всех блоков
      }, 1000); // Обновление прогресса каждую секунду
    
      return () => {
        clearInterval(progressInterval);
      };
    }, [dispatch]);
    
    useEffect(() => {
      const stageInterval = setInterval(() => {
        dispatch(changeGrowthStage()); // Изменение стадии роста для всех блоков
        if (user && blocks) {
          const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour);
          dispatch(updateGrassEarnings(grassEarnings));
          console.log('Новое значение прибыли: ', grassEarnings);
        }
      }, 5000); // Обновление стадий роста каждые 5 секунд
    
      return () => {
        clearInterval(stageInterval);
      };
    }, [dispatch, user, blocks]);
    
    const handleHarvestAnimation = (blockId: number) => {
      setHarvestedBlocks((prev) => {
        const newSet = new Set(prev);
        newSet.add(blockId);
        setTimeout(() => {
          setHarvestedBlocks((prev) => {
            const newSet = new Set(prev);
            newSet.delete(blockId);
            return newSet;
          });
        }, 200);
        return newSet;
      });
    };
    
    return (
      <div className={cn("farmBlockWrap")}>
      <FarmBlock zIndex={9} id={1} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={9} id={2} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={9} id={3} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={8} id={4} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={7} id={5} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={6} id={6} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={6} id={7} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={5} id={8} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
      <FarmBlock zIndex={4} id={9} league={league} harvestedBlocks={harvestedBlocks} onHarvestAnimation={handleHarvestAnimation} />
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
    harvestedBlocks: Set<number>;
    onHarvestAnimation: (blockId: number) => void;
  }

  const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league, harvestedBlocks, onHarvestAnimation }) => {
    const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));
    const user = useAppSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);
    const [touchedBlocks, setTouchedBlocks] = useState<Set<number>>(new Set());
    const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);

    if (!farmBlock) return null;

    const handlePickWheat = async (blockId: number) => {
      if (farmBlock.stage !== "first" && user) {
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
    
        const reward = user.coinsPerHour * rewardMultiplier;
    
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
    
        dispatch(pickWheat({ id: blockId }));
        onHarvestAnimation(blockId);
    
        try {
          await axios.patch(`https://coinfarm.club/user/${user.id}/grass-stages`, {
            stages: blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage),
          });
        } catch (error) {
          console.error("Failed to update grass growth stage on server:", error);
        }
      }
    };

    const handleInteraction = useCallback(
      (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения для предотвращения нежелательной прокрутки

        // Определение типа события
        const eventType = e.type;

        let target: HTMLElement | null = null;
        if (eventType === "mousemove" || eventType === "touchmove") {
          target = document.elementFromPoint(
            (e as React.MouseEvent<HTMLDivElement>).clientX ||
              (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
            (e as React.MouseEvent<HTMLDivElement>).clientY ||
              (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY
          ) as HTMLElement;
        }

        if (target) {
          const blockId = target.getAttribute("data-id");
          if (blockId) {
            const id = parseInt(blockId, 10);
            if (!touchedBlocks.has(id)) {
              setTouchedBlocks((prev) => new Set(prev).add(id));
              handlePickWheat(id);
            }
          }
        }
      },
      [handlePickWheat, touchedBlocks]
    );

    const handleTouchEnd = useCallback(() => {
      setTouchedBlocks(new Set()); // Сброс касаний при окончании взаимодействия
    }, []);

    const isHarvested = harvestedBlocks.has(id);

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
          className={cn("farmBlock__money", { _anim: isHarvested })}
        />
      </div>
    );
  };
