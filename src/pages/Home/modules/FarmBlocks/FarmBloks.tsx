import { useEffect } from "react";

import styles from "./FarmBlocks.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

import {
   pickWheat,
   selectEarthBlock,
} from "../../../../store/reducers/growthStages";
import { useAppDispatch, useAppSelector } from "../../../../store";

const FarmBloks = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      document.addEventListener("touchmove", (e) => {
         var xPos = e.touches[0].pageX;

         // Вычитаем 100 у "pageY", так как мы в "App" компоненте
         // добавляли 100px у body, в целью отключения закрытия tg при сколе вних
         var yPos = e.touches[0].pageY - 100;

         const target = document.elementFromPoint(xPos, yPos);

         // Если это картинка самой пшеницы
         if (target && target.closest("#growthStageImg")) {
            const growthStageImgID = target.getAttribute("data-id");

            if (growthStageImgID)
               dispatch(pickWheat({ id: +growthStageImgID }));
         }
      });
   });
   return (
      <div className={cn("farmBlockWrap")}>
         <FarmBlock zIndex={9} id={1} />
         <FarmBlock zIndex={9} id={2} />
         <FarmBlock zIndex={9} id={3} />
         <FarmBlock zIndex={8} id={4} />
         <FarmBlock zIndex={7} id={5} />
         <FarmBlock zIndex={6} id={6} />
         <FarmBlock zIndex={6} id={7} />
         <FarmBlock zIndex={5} id={8} />
         <FarmBlock zIndex={4} id={9} />
      </div>
   );
};

export default FarmBloks;

interface IFarmBlockProps {
   zIndex: number;
   id: number;
}

const FarmBlock = ({ zIndex, id }: IFarmBlockProps) => {
   const farmBlock = useAppSelector((state) => selectEarthBlock(state, id));

   if (farmBlock) {
      return (
         <div
            className={cn("farmBlock")}
            style={{
               zIndex,
            }}>
            <img
               src="img/leagueStages/Fire.png"
               className={cn("farmBlock__earth")}
               alt="Wooden"
            />
            <img
               src={`img/growthStages/${farmBlock?.stage}.png`}
               className={cn("farmBlock__growthStage", `_${farmBlock?.stage}`)}
               alt="first"
               id="growthStageImg"
               // Dataset нужен, чтобы при событие touchmove на document
               // Мы могли найти именно этот блок и срезать именно его
               data-id={id}
            />
         </div>
      );
   }
};
