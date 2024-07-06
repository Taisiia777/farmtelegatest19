// import styles from "./FarmBlocks.module.scss";
// import classNames from "classnames/bind";
// const cn = classNames.bind(styles);

// import { selectEarthBlock } from "../../../../store/reducers/growthStages";
// import { useAppSelector } from "../../../../store";
// import useWheatTrunctaion from "../../hooks/useWheatTrunctation";

// const FarmBloks = () => {
//    // Собирание пшеницы
//    useWheatTrunctaion();

//    return (
//       <div className={cn("farmBlockWrap")}>
//          <FarmBlock zIndex={9} id={1} />
//          <FarmBlock zIndex={9} id={2} />
//          <FarmBlock zIndex={9} id={3} />
//          <FarmBlock zIndex={8} id={4} />
//          <FarmBlock zIndex={7} id={5} />
//          <FarmBlock zIndex={6} id={6} />
//          <FarmBlock zIndex={6} id={7} />
//          <FarmBlock zIndex={5} id={8} />
//          <FarmBlock zIndex={4} id={9} />

//          {/* Тень */}
//          <img
//             src="img/pages/home/earth-blocks-bg.svg"
//             className={cn("farmBlock__shadow")}
//             alt=""
//          />
//       </div>
//    );
// };

// export default FarmBloks;

// interface IFarmBlockProps {
//    zIndex: number;
//    id: number;
// }

// const FarmBlock = ({ zIndex, id }: IFarmBlockProps) => {
//    const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));

//    if (farmBlock) {
//       return (
//          <div
//             className={cn("farmBlock")}
//             style={{
//                zIndex,
//             }}>
//             <img
//                src="img/leagueStages/Fire.png"
//                className={cn("farmBlock__earth")}
//                alt="Wooden"
//             />
//             <img
//                src={`img/growthStages/${farmBlock?.stage}.png`}
//                className={cn("farmBlock__growthStage", `_${farmBlock?.stage}`)}
//                alt="first"
//                id="growthStageImg"
//                // Dataset нужен, чтобы при событие touchmove на document
//                // Мы могли найти именно этот блок и срезать именно его
//                data-id={id}
//                data-stage={farmBlock?.stage}
//             />

//             {/* Монеты, которые будут улетать вверх при сборе пшеницы */}
//             <img
//                src="img/pages/home/money.svg"
//                className={cn("farmBlock__money")}
//             />
//          </div>
//       );
//    }
// };



import styles from "./FarmBlocks.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

import { selectEarthBlock } from "../../../../store/reducers/growthStages";
import { useAppSelector } from "../../../../store";
import useWheatTrunctaion from "../../hooks/useWheatTrunctation";

type TLiga = "None" | "Wooden" | "Silver" | "Gold" | "Fire" | "Diamond"; // Определение типа TLiga

interface FarmBlocksProps {
  league: TLiga;
}

const FarmBloks: React.FC<FarmBlocksProps> = ({ league }) => {
  // Собирание пшеницы
  useWheatTrunctaion();

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

  if (farmBlock) {
    return (
      <div
        className={cn("farmBlock")}
        style={{
          zIndex,
        }}
      >
        <img
          src={`img/leagueStages/${league}.png`}
          className={cn("farmBlock__earth")}
          alt={league}
        />
        <img
          src={`img/growthStages/${farmBlock?.stage}.png`}
          className={cn("farmBlock__growthStage", `_${farmBlock?.stage}`)}
          alt="first"
          id="growthStageImg"
          // Dataset нужен, чтобы при событие touchmove на document
          // Мы могли найти именно этот блок и срезать именно его
          data-id={id}
          data-stage={farmBlock?.stage}
        />

        {/* Монеты, которые будут улетать вверх при сборе пшеницы */}
        <img
          src="img/pages/home/money.svg"
          className={cn("farmBlock__money")}
        />
      </div>
    );
  }
};
