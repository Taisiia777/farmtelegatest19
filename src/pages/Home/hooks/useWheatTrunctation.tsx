import { useEffect } from "react";

import { useAppDispatch } from "../../../store";
import { pickWheat } from "../../../store/reducers/growthStages";

import classNames from "classnames/bind";
import styles from "../modules/FarmBlocks/FarmBlocks.module.scss";
import { TGrowthStage } from "../../../types/globalTypes";
const cn = classNames.bind(styles);

// Замечает при touchmove пересечение с пшеницой и собирает ее
export default function useWheatTrunctaion() {
   const dispatch = useAppDispatch();

   function detectTrunctation(e: TouchEvent) {
      const xPos = e.touches[0].pageX;

      // Вычитаем 100 у "pageY", так как мы в "App" компоненте
      // добавляли 100px у body, в целью отключения закрытия tg при скролле вниз
      const yPos = e.touches[0].pageY - 100;

      const target = document.elementFromPoint(xPos, yPos);

      // Если target это картинка самой пшеницы
      if (target && target.closest("#growthStageImg")) {
         const farmBlockStage = target.getAttribute(
            "data-stage"
         ) as TGrowthStage;

         // Мы можем собирать пшеницу, только когда она в последней стадии,
         // то есть выросла
         if (farmBlockStage === "fourth") {
            const growthStageImgID = target.getAttribute("data-id");

            // Этот монеты, которые будут анимировано исчезать
            const moneyAnimation = target.nextElementSibling;

            // Применяем анимацию
            if (moneyAnimation) {
               moneyAnimation.classList.add(cn("_anim"));

               setTimeout(() => {
                  moneyAnimation.classList.remove(cn("_anim"));
               }, 500);
            }

            // Сбрасываем стадию на начальное зерно
            if (growthStageImgID)
               dispatch(pickWheat({ id: +growthStageImgID }));
         }
      }
   }

   useEffect(() => {
      document.addEventListener("touchmove", detectTrunctation);

      return () => document.removeEventListener("touchmove", detectTrunctation);
   });
}
