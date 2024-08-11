import React, { useEffect, useState, useRef } from "react";
import { useDispatch  } from "react-redux";
import styles from "./FarmBlocks.module.scss";
import classNames from "classnames/bind";
import {
  selectEarthBlock,
  changeGrowthStage,
  // pickWheat,
  calculateGrassEarnings,
  setGrowthStages,
} from "../../../../store/reducers/growthStages";
import { useAppSelector } from "../../../../store";
import useWheatTrunctaion from "../../hooks/useWheatTrunctation";
import { RootState } from "../../../../store";
// import { setUser } from "../../../../store/reducers/userSlice";
import { updateGrassEarnings} from "../../../../store/reducers/userSlice";
import axios from "axios";
// import { useGesture } from '@use-gesture/react';

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
        // const response = await axios.get(`https://coinfarm.club/api/user/${user.id}/grass-stages`);
        dispatch(setGrowthStages([
          "fourth",
          "fourth",
          "fourth",
          "fourth",
          "fourth",
          "fourth",
          "fourth",
          "fourth",
          "fourth"
      ])); // Добавление стадии роста
      } catch (error) {
        console.error('Failed to fetch grass growth stages:', error);
      }
    };

    if (user && !hasFetchedGrowthStages.current) {
      fetchGrowthStages();
      hasFetchedGrowthStages.current = true; // Устанавливаем, что эффект был выполнен
    }
  }, []); // Добавлены зависимости user и dispatch

  useEffect(() => {
    const updateGrowthStages = async () => {
      if (user) {
        try {
          const stages = blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage);
          await axios.patch(`https://coinfarm.club/api/user/${user.id}/grass-stages`, { stages });
        } catch (error) {
          console.error('Failed to update grass growth stages:', error);
        }
      }
    };
  
    updateGrowthStages(); // Обновление стадий роста на сервере при изменении блоков
  }, [blocks]); // Добавлена зависимость от user

  
  useEffect(() => {
    if (user && blocks) {
      const stages = ['first', 'second', 'third', 'fourth'];
      let currentStageIndex = 0; // Индекс текущей стадии в массиве stages

      const blockInterval = setInterval(() => {
        // Найти блоки, которые еще не достигли текущей стадии роста
        const blocksToUpdate = blocks.filter((block: { stage: string; }) => block.stage === stages[currentStageIndex]);

        if (blocksToUpdate.length > 0) {
          // Обновляем стадию роста первого блока, который еще не достиг текущей стадии
          dispatch(changeGrowthStage({ id: blocksToUpdate[0].id }));
        } else {
          // Если все блоки достигли текущей стадии, увеличиваем текущую стадию роста
          currentStageIndex = (currentStageIndex + 1) % stages.length;
        }

        // Вычисляем прибыль
        const grassEarnings = calculateGrassEarnings(blocks, user.coinsPerHour, user.incomeMultiplier);
        dispatch(updateGrassEarnings(grassEarnings));
        
        console.log('Новое значение прибыли: ', grassEarnings);
      }, (1000 * 60) / 27);

      const overallStageInterval = setInterval(() => {
        // Обновляем стадию роста всех блоков одновременно до текущей стадии
        blocks.forEach((block: { stage: string; id: number; }) => {
          if (stages.indexOf(block.stage) < currentStageIndex) {
            dispatch(changeGrowthStage({ id: block.id }));
          }
        });
      }, (1000 * 60) / 3);

      return () => {
        clearInterval(blockInterval);
        clearInterval(overallStageInterval);
      };
    }
  }, [blocks]);
  

  const handleHarvestAnimation = (blockId: number) => {
    setHarvestedBlocks((prev) => {
      const newSet = new Set(prev);
      newSet.add(blockId);
      return newSet;
    });
  
    // Удалить блок после анимации
    setTimeout(() => {
      setHarvestedBlocks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blockId);
        return newSet;
      });
    }, 300); // Анимация длится 0.3 секунды
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
interface Coin {
  name: string;
  value: number;
  cost: number
  // добавьте любые другие необходимые свойства
}
const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league, harvestedBlocks }) => {
  // const FarmBlock: React.FC<IFarmBlockProps> = ({ zIndex, id, league, harvestedBlocks, onHarvestAnimation }) => {

  const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));
  // const user = useAppSelector((state: RootState) => state.user.user);
  // const dispatch = useDispatch();
  // const [localCoins, setLocalCoins] = useState(user ? user.coins : 0);
  // const [touchedBlocks, setTouchedBlocks] = useState<Set<number>>(new Set());
  // const blocks = useAppSelector((state: RootState) => state.growthStages.blocks);
  const coins = useAppSelector((state: RootState) => state.userCoins.coins);

  const [lastCoin, setLastCoin] = useState<Coin | null>(null);
  console.log(lastCoin)
  if (!farmBlock) return null;
  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        // const response = await axios.get(`https://coinfarm.club/api/user/${user.id}/coins`);
        // const coins = response.data;

        if (coins.length > 0) {
          const mostExpensiveCoin = coins.reduce((prev: Coin, current: Coin) => (prev.cost > current.cost ? prev : current));
          setLastCoin(mostExpensiveCoin);
        }
      } catch (error) {
        console.error('Failed to fetch user coins:', error);
      }
    };
  
    fetchUserCoins();
  }, [coins]);
  // const handlePickWheat = async (blockId: number) => {
  //   if (farmBlock.stage !== "first" && user) {
  //     let rewardMultiplier = 0;
  
  //     switch (farmBlock.stage) {
  //       case "second":
  //         rewardMultiplier = 0.3;
  //         break;
  //       case "third":
  //         rewardMultiplier = 0.7;
  //         break;
  //       case "fourth":
  //         rewardMultiplier = 1;
  //         break;
  //       default:
  //         return; // Ничего не делать, если стадия "first"
  //     }
  
  //     const reward = ((user.coinsPerHour/9) * rewardMultiplier) * user?.incomeMultiplier;
  
  //     try {
  //       const response = await axios.patch(
  //         `https://coinfarm.club/api/user/${user.id}/earn/${reward}`
  //       );
  //       const updatedUser = response.data;
  
  //       // Обновление состояния пользователя и локальных монет
  //       dispatch(
  //         setUser({
  //           ...updatedUser,
  //           coins: parseFloat(updatedUser.coins),
  //           totalEarnings: parseFloat(updatedUser.totalEarnings),
  //         })
  //       );
  
  //       setLocalCoins(parseFloat(updatedUser.coins));
  //       console.log(localCoins);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  
  //     dispatch(pickWheat({ id: blockId }));
  //     onHarvestAnimation(blockId);
  
  //     try {
  //       await axios.patch(`https://coinfarm.club/api/user/${user.id}/grass-stages`, {
  //         stages: blocks.map((block: { id: number, stage: TGrowthStage }) => block.stage),
  //       });
  //     } catch (error) {
  //       console.error("Failed to update grass growth stage on server:", error);
  //     }
  //   }
  // };
  


  // const bind = useGesture({
  //   onDrag: ({ xy: [x, y], event }) => {
  //     event.preventDefault();

  //     const target = document.elementFromPoint(x, y) as HTMLElement;
  //     if (target) {
  //       const blockId = target.getAttribute("data-id");
  //       if (blockId) {
  //         const id = parseInt(blockId, 10);
  //         if (!touchedBlocks.has(id)) {
  //           setTouchedBlocks((prev) => new Set(prev).add(id));
  //           handlePickWheat(id);
  //         }
  //       }
  //     }
  //   },
  //   onDragEnd: () => {
  //     setTouchedBlocks(new Set());
  //   },
  // });



  
  const isHarvested = harvestedBlocks.has(id);

  return (
    <div
      className={cn("farmBlock")}
      style={{ zIndex }}
      data-id={id}
      data-stage={farmBlock.stage}
      // {...bind()}

      // onTouchMove={handleInteraction}
      // onTouchEnd={handleTouchEnd}
    >
      <img
        src={`img/leagueStages/${league}.png`}
        className={cn("farmBlock__earth")}
        alt={league}
      />
    <img
      src={lastCoin ? `img/growthStages/${lastCoin.name}/${farmBlock.stage}.png` : `img/growthStages/${farmBlock.stage}.png`}
      className={cn("farmBlock__growthStage", `_${farmBlock.stage}`)}
      alt="growth stage"
      data-id={id}
      data-stage={farmBlock.stage}
      id="growthStageImg" // добавляем id для определения элемента

    />

      <img
        src={lastCoin ? `img/pages/home/${lastCoin.name}/money.svg` : `img/pages/home/money.svg`}
        // src={`img/pages/home/money.png`}
        className={cn("farmBlock__money", { _anim: isHarvested })}
      />
    </div>
  );
};
